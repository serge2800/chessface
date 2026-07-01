const express = require("express");
const http = require("http");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const multer = require("multer");
const bcrypt = require("bcryptjs");
let nodemailer = null;
try {
  nodemailer = require("nodemailer");
} catch (_error) {
  console.warn("[ChessFace] nodemailer is not installed. Email verification will stay disabled.");
}
const { Server } = require("socket.io");
const { Chess } = require("chess.js");
const { v4: uuid } = require("uuid");

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, "data");
const UPLOAD_DIR = path.join(__dirname, "uploads");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const GAMES_FILE = path.join(DATA_DIR, "games.json");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");
const EMAIL_TOKEN_HOURS = 24;
const START_RATING = 1000;
const START_RD = 350;
const MIN_RD = 35;
const MAX_RD = 350;
const RD_INCREASE_PER_MONTH = 45;
const TIME_CONTROLS = {
  "3+0": { label: "3+0 Blitz", seconds: 180, increment: 0 },
  "3+2": { label: "3+2 Blitz", seconds: 180, increment: 2 },
  "5+0": { label: "5+0 Rapid", seconds: 300, increment: 0 },
  "10+0": { label: "10+0 Classic", seconds: 600, increment: 0 }
};
const DEFAULT_ICE_SERVERS = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
  { urls: "stun:global.stun.twilio.com:3478" }
];
const COUNTRY_NAMES = {
  US: "United States",
  AM: "Armenia",
  CA: "Canada",
  GB: "United Kingdom",
  FR: "France",
  DE: "Germany",
  ES: "Spain",
  IT: "Italy",
  RU: "Russia",
  CN: "China",
  IN: "India",
  IR: "Iran",
  BR: "Brazil",
  AU: "Australia",
  OTHER: "Other"
};

fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(UPLOAD_DIR, { recursive: true });
if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, "[]");
if (!fs.existsSync(GAMES_FILE)) fs.writeFileSync(GAMES_FILE, "[]");
if (!fs.existsSync(MESSAGES_FILE)) fs.writeFileSync(MESSAGES_FILE, "[]");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const upload = multer({
  dest: UPLOAD_DIR,
  limits: { fileSize: 12 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) return cb(new Error("Only image uploads are allowed."));
    cb(null, true);
  }
});

const sessions = new Map();
const sockets = new Map();
const queues = new Map();
const teamQueues = new Map();
const games = new Map();
const challenges = new Map();

function liveQueuedSockets(queue, socketId) {
  return [...queue].filter((id) => {
    if (id === socketId) return false;
    const peerSocket = io.sockets.sockets.get(id);
    const peerState = sockets.get(id);
    if (!peerSocket || !peerState || peerState.gameId) {
      queue.delete(id);
      if (peerState) peerState.queuedFor = null;
      return false;
    }
    return true;
  });
}

function queuedSockets(queue) {
  return [...queue].filter((id) => {
    const queuedSocket = io.sockets.sockets.get(id);
    const queuedState = sockets.get(id);
    if (!queuedSocket || !queuedState || queuedState.gameId) {
      queue.delete(id);
      if (queuedState) queuedState.queuedFor = null;
      return false;
    }
    return true;
  });
}

function openChallengesPayload() {
  const normal = [];
  for (const [timeControl, queue] of queues.entries()) {
    for (const socketId of queuedSockets(queue)) {
      const queuedSocket = io.sockets.sockets.get(socketId);
      if (!queuedSocket) continue;
      normal.push({
        id: socketId,
        mode: "normal",
        timeControl,
        host: queuedSocket.user,
        playersNeeded: 1
      });
    }
  }

  const team = [];
  for (const [timeControl, queue] of teamQueues.entries()) {
    const socketIds = queuedSockets(queue);
    if (!socketIds.length) continue;
    team.push({
      id: `team:${timeControl}`,
      mode: "team",
      timeControl,
      joined: socketIds.length,
      needed: Math.max(0, 4 - socketIds.length),
      players: socketIds.map((socketId) => io.sockets.sockets.get(socketId)?.user).filter(Boolean)
    });
  }
  return { normal, team };
}

function broadcastOpenChallenges() {
  io.emit("openChallenges:update", openChallengesPayload());
}

app.use(express.json());
app.set("trust proxy", 1);
app.use("/uploads", express.static(UPLOAD_DIR));
app.use("/vendor/stockfish", express.static(path.join(__dirname, "public/vendor/stockfish"), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith(".wasm")) res.setHeader("Content-Type", "application/wasm");
  }
}));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, app: "chessface", time: new Date().toISOString() });
});

app.get("/api/ice-servers", (_req, res) => {
  res.json({ iceServers: iceServersConfig() });
});

app.post("/api/livekit-token", requireSession, (req, res) => {
  const config = liveKitConfig();
  if (!config) return res.json({ enabled: false });

  const gameId = String(req.body?.gameId || "");
  const game = games.get(gameId);
  if (!game || game.status !== "playing") return res.status(404).json({ error: "Game not found." });

  const player = gamePlayers(game).find((item) => item.id === req.user.id);
  if (!player) return res.status(403).json({ error: "You are not in this game." });

  const now = Math.floor(Date.now() / 1000);
  const room = liveKitRoomName(game);
  const token = signLiveKitJwt({
    iss: config.apiKey,
    sub: String(req.user.id),
    name: req.user.username,
    metadata: JSON.stringify({
      userId: req.user.id,
      username: req.user.username,
      avatarUrl: req.user.avatarUrl,
      countryCode: req.user.countryCode || "OTHER",
      teamColor: colorForUser(game, req.user.id),
      isGuest: Boolean(req.user.isGuest)
    }),
    video: {
      room,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
      canPublishData: false,
      canUpdateOwnMetadata: false
    },
    nbf: now - 10,
    exp: now + 60 * 60 * 2
  }, config.apiSecret);

  res.json({
    enabled: true,
    url: config.url,
    room,
    identity: String(req.user.id),
    token
  });
});

app.use(express.static(path.join(__dirname, "public"), {
  setHeaders: (res, filePath) => {
    if (/\.(html|js|css)$/i.test(filePath) || filePath.endsWith("service-worker.js")) {
      res.setHeader("Cache-Control", "no-store, max-age=0");
    }
  }
}));

function readUsers() {
  const users = JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
  let changed = false;
  for (const user of users) {
    if (typeof user.rating !== "number") {
      user.rating = START_RATING;
      changed = true;
    }
    if (typeof user.ratingRd !== "number") {
      user.ratingRd = START_RD;
      changed = true;
    }
    if (typeof user.gamesPlayed !== "number") {
      user.gamesPlayed = 0;
      changed = true;
    }
    if (!user.countryCode) {
      user.countryCode = "US";
      changed = true;
    }
    if (typeof user.friendsCount !== "number") {
      user.friendsCount = 0;
      changed = true;
    }
    if (!Array.isArray(user.friends)) {
      user.friends = [];
      changed = true;
    }
    if (!Array.isArray(user.incomingFriendRequests)) {
      user.incomingFriendRequests = [];
      changed = true;
    }
    if (!Array.isArray(user.outgoingFriendRequests)) {
      user.outgoingFriendRequests = [];
      changed = true;
    }
    if (typeof user.emailVerified !== "boolean") {
      user.emailVerified = true;
      changed = true;
    }
    if (user.friendsCount !== user.friends.length) {
      user.friendsCount = user.friends.length;
      changed = true;
    }
  }
  if (changed) writeUsers(users);
  return users;
}

function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function readGameRecords() {
  return JSON.parse(fs.readFileSync(GAMES_FILE, "utf8"));
}

function writeGameRecords(records) {
  fs.writeFileSync(GAMES_FILE, JSON.stringify(records, null, 2));
}

function readMessages() {
  return JSON.parse(fs.readFileSync(MESSAGES_FILE, "utf8"));
}

function writeMessages(messages) {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
}

function publicUser(user) {
  const online = [...sockets.values()].some((socketState) => socketState.userId === user.id);
  return {
    id: user.id,
    fullName: user.fullName,
    username: user.username,
    email: user.email,
    dateOfBirth: user.dateOfBirth,
    rating: user.rating,
    ratingRd: Math.round(user.ratingRd || START_RD),
    gamesPlayed: user.gamesPlayed || 0,
    friendsCount: user.friendsCount || 0,
    countryCode: user.countryCode || "US",
    countryName: COUNTRY_NAMES[user.countryCode || "US"] || "Other",
    joinedAt: user.createdAt,
    online,
    isGuest: Boolean(user.isGuest),
    avatarUrl: user.avatarUrl || "/default-avatar.svg"
  };
}

function guestUsername(users) {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const candidate = `guest-${crypto.randomInt(100000, 999999)}`;
    if (!users.some((user) => user.username.toLowerCase() === candidate)) return candidate;
  }
  return `guest-${Date.now().toString(36)}`;
}

function tokenHash(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function appBaseUrl(req) {
  return (process.env.APP_URL || `${req.protocol}://${req.get("host")}`).replace(/\/$/, "");
}

function createVerificationToken(user) {
  const token = crypto.randomBytes(32).toString("hex");
  user.emailVerificationTokenHash = tokenHash(token);
  user.emailVerificationExpiresAt = new Date(Date.now() + EMAIL_TOKEN_HOURS * 60 * 60 * 1000).toISOString();
  return token;
}

function mailTransport() {
  if (!nodemailer) return null;
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || "").toLowerCase() === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

function emailVerificationEnabled() {
  return Boolean(nodemailer && process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function iceServersConfig() {
  const iceServers = [...DEFAULT_ICE_SERVERS];
  const turnUrls = String(process.env.TURN_URLS || process.env.TURN_URL || "")
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean);
  if (turnUrls.length && process.env.TURN_USERNAME && process.env.TURN_CREDENTIAL) {
    iceServers.push({
      urls: turnUrls,
      username: process.env.TURN_USERNAME,
      credential: process.env.TURN_CREDENTIAL
    });
  }
  const staticAuthServer = staticAuthIceServer();
  if (staticAuthServer) iceServers.push(staticAuthServer);
  return iceServers;
}

function staticAuthIceServer() {
  const secret = String(process.env.TURN_STATIC_AUTH_SECRET || "").trim();
  const host = String(process.env.TURN_STATIC_AUTH_HOST || "").trim().replace(/^turns?:\/\//, "").replace(/\/.*$/, "");
  if (!secret || !host) return null;
  const ttlSeconds = Math.max(300, Number(process.env.TURN_STATIC_AUTH_TTL || 86400));
  const username = String(Math.floor(Date.now() / 1000) + ttlSeconds);
  const credential = crypto.createHmac("sha1", secret).update(username).digest("base64");
  const urls = String(process.env.TURN_STATIC_AUTH_URLS || "")
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean);
  return {
    urls: urls.length ? urls : [
      `turn:${host}:80`,
      `turn:${host}:80?transport=tcp`,
      `turn:${host}:443`,
      `turn:${host}:443?transport=tcp`,
      `turns:${host}:443`
    ],
    username,
    credential
  };
}

function liveKitConfig() {
  const url = String(process.env.LIVEKIT_URL || "").trim();
  const apiKey = String(process.env.LIVEKIT_API_KEY || "").trim();
  const apiSecret = String(process.env.LIVEKIT_API_SECRET || "").trim();
  if (!url || !apiKey || !apiSecret) return null;
  return {
    url: normalizeLiveKitUrl(url),
    apiKey,
    apiSecret
  };
}

function normalizeLiveKitUrl(url) {
  if (/^wss?:\/\//i.test(url)) return url;
  if (/^https:\/\//i.test(url)) return url.replace(/^https:/i, "wss:");
  if (/^http:\/\//i.test(url)) return url.replace(/^http:/i, "ws:");
  return `wss://${url}`;
}

function liveKitRoomName(game) {
  return `chessface-${game.id}`;
}

function base64Url(value) {
  return Buffer.from(value).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function signLiveKitJwt(payload, secret) {
  const header = { alg: "HS256", typ: "JWT" };
  const body = `${base64Url(JSON.stringify(header))}.${base64Url(JSON.stringify(payload))}`;
  const signature = crypto.createHmac("sha256", secret).update(body).digest("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  return `${body}.${signature}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  }[char]));
}

async function sendVerificationEmail(req, user, token) {
  const verifyUrl = `${appBaseUrl(req)}/verify-email?token=${encodeURIComponent(token)}`;
  const transporter = mailTransport();
  if (!transporter) {
    console.log(`[ChessFace] Email verification link for ${user.email}: ${verifyUrl}`);
    return false;
  }

  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: user.email,
      subject: "Confirm your ChessFace email",
      text: `Welcome to ChessFace, ${user.username}.\n\nConfirm your email here:\n${verifyUrl}\n\nThis link expires in ${EMAIL_TOKEN_HOURS} hours.`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111">
          <h2>Confirm your ChessFace email</h2>
          <p>Welcome, <strong>${escapeHtml(user.username)}</strong>.</p>
          <p>Click the button below to activate your account.</p>
          <p><a href="${verifyUrl}" style="display:inline-block;padding:12px 18px;background:#f2c66d;color:#111;text-decoration:none;border-radius:8px;font-weight:bold">Confirm email</a></p>
          <p>This link expires in ${EMAIL_TOKEN_HOURS} hours.</p>
        </div>
      `
    });
    return true;
  } catch (error) {
    console.error(`[ChessFace] Could not send verification email to ${user.email}:`, error.message);
    console.log(`[ChessFace] Email verification link for ${user.email}: ${verifyUrl}`);
    return false;
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function ageFromDate(dateString) {
  const dob = new Date(`${dateString}T00:00:00Z`);
  if (Number.isNaN(dob.getTime())) return null;
  const today = new Date();
  let age = today.getUTCFullYear() - dob.getUTCFullYear();
  const monthDelta = today.getUTCMonth() - dob.getUTCMonth();
  if (monthDelta < 0 || (monthDelta === 0 && today.getUTCDate() < dob.getUTCDate())) age -= 1;
  return age;
}

function requireSession(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const userId = sessions.get(token);
  if (!userId) return res.status(401).json({ error: "Please sign in first." });
  const user = readUsers().find((item) => item.id === userId);
  if (!user) return res.status(401).json({ error: "Session expired." });
  req.user = user;
  req.token = token;
  next();
}

function requireRegisteredUser(req, res, next) {
  if (req.user?.isGuest) return res.status(403).json({ error: "Create a free account to use this feature." });
  next();
}

function inflateRd(user) {
  const rd = user.ratingRd || START_RD;
  if (!user.lastPlayedAt) return rd;
  const monthsIdle = Math.max(0, (Date.now() - new Date(user.lastPlayedAt).getTime()) / (1000 * 60 * 60 * 24 * 30));
  return Math.min(MAX_RD, Math.sqrt(rd ** 2 + (RD_INCREASE_PER_MONTH ** 2) * monthsIdle));
}

function glickoChange(player, opponent, score) {
  const q = Math.log(10) / 400;
  const rating = player.rating || START_RATING;
  const rd = inflateRd(player);
  const opponentRating = opponent.rating || START_RATING;
  const opponentRd = inflateRd(opponent);
  const g = 1 / Math.sqrt(1 + (3 * q ** 2 * opponentRd ** 2) / Math.PI ** 2);
  const expected = 1 / (1 + 10 ** ((-g * (rating - opponentRating)) / 400));
  const variance = 1 / (q ** 2 * g ** 2 * expected * (1 - expected));
  const newRating = rating + (q / (1 / rd ** 2 + 1 / variance)) * g * (score - expected);
  const newRd = Math.sqrt(1 / (1 / rd ** 2 + 1 / variance));
  return {
    rating: Math.max(100, Math.round(newRating)),
    ratingRd: Math.round(Math.max(MIN_RD, Math.min(MAX_RD, newRd)))
  };
}

function updateRatings(result, whiteId, blackId) {
  const users = readUsers();
  const white = users.find((user) => user.id === whiteId);
  const black = users.find((user) => user.id === blackId);
  if (!white || !black) return null;

  const before = {
    white: { rating: white.rating, ratingRd: Math.round(white.ratingRd || START_RD) },
    black: { rating: black.rating, ratingRd: Math.round(black.ratingRd || START_RD) }
  };
  const whiteScore = result === "draw" ? 0.5 : result === "white" ? 1 : 0;
  const blackScore = result === "draw" ? 0.5 : result === "black" ? 1 : 0;
  const whiteUpdate = glickoChange(white, black, whiteScore);
  const blackUpdate = glickoChange(black, white, blackScore);
  const now = new Date().toISOString();
  Object.assign(white, whiteUpdate, { gamesPlayed: (white.gamesPlayed || 0) + 1, lastPlayedAt: now });
  Object.assign(black, blackUpdate, { gamesPlayed: (black.gamesPlayed || 0) + 1, lastPlayedAt: now });
  writeUsers(users);
  return {
    white: { before: before.white.rating, after: white.rating, change: white.rating - before.white.rating, rd: white.ratingRd },
    black: { before: before.black.rating, after: black.rating, change: black.rating - before.black.rating, rd: black.ratingRd }
  };
}

function buildReplayFromChess(chess) {
  const replay = new Chess();
  const positions = [replay.fen()];
  const moves = chess.history({ verbose: true }).map((move, index) => {
    const played = replay.move(move.san);
    if (played) positions.push(replay.fen());
    return {
      index: index + 1,
      san: move.san,
      from: move.from,
      to: move.to,
      color: move.color === "w" ? "white" : "black"
    };
  });
  return { moves, positions };
}

function buildReplayFromPgn(pgn) {
  if (!pgn) return { moves: [], positions: [] };
  try {
    const chess = new Chess();
    chess.loadPgn(pgn);
    return buildReplayFromChess(chess);
  } catch (_error) {
    return { moves: [], positions: [] };
  }
}

function withReplay(record) {
  if (Array.isArray(record.positions) && record.positions.length) return record;
  const replay = buildReplayFromPgn(record.pgn);
  return { ...record, ...replay };
}

function pgnResult(result) {
  if (result === "white") return "1-0";
  if (result === "black") return "0-1";
  if (result === "draw") return "1/2-1/2";
  return "*";
}

function pgnDate(value) {
  return new Date(value).toISOString().slice(0, 10).replaceAll("-", ".");
}

function buildCleanPgn(game, playedAt) {
  const result = pgnResult(game.result);
  const moves = game.chess.pgn().split(/\n\n/).pop() || "";
  return [
    `[White "${game.white.username || "White"}"]`,
    `[Black "${game.black.username || "Black"}"]`,
    `[Result "${result}"]`,
    `[Date "${pgnDate(playedAt)}"]`,
    "",
    moves.replace(/\s\*$/, ` ${result}`).replace(/\s(1-0|0-1|1\/2-1\/2)$/, ` ${result}`)
  ].join("\n");
}

function saveGameRecord(game, ratingChanges) {
  const records = readGameRecords();
  const replay = buildReplayFromChess(game.chess);
  game.replay = replay;
  const playedAt = new Date().toISOString();
  const cleanPgn = buildCleanPgn(game, playedAt);
  records.unshift({
    id: game.id,
    playedAt,
    timeControl: game.timeControl,
    result: game.result,
    reason: game.reason,
    fen: game.chess.fen(),
    pgn: cleanPgn,
    moves: replay.moves,
    positions: replay.positions,
    accuracyAnalysis: game.accuracyAnalysis || null,
    clocks: game.clocks,
    ratingChanges,
    players: {
      white: {
        id: game.white.id,
        username: game.white.username,
        fullName: game.white.fullName,
        avatarUrl: game.white.avatarUrl,
        rating: game.white.rating
      },
      black: {
        id: game.black.id,
        username: game.black.username,
        fullName: game.black.fullName,
        avatarUrl: game.black.avatarUrl,
        rating: game.black.rating
      }
    }
  });
  writeGameRecords(records.slice(0, 1000));
}

function saveAccuracyAnalysis(game, analysis) {
  if (!game || !analysis || typeof analysis !== "object") return;
  game.accuracyAnalysis = {
    ...analysis,
    savedAt: new Date().toISOString()
  };
  const records = readGameRecords();
  const record = records.find((item) => item.id === game.id);
  if (record) {
    record.accuracyAnalysis = game.accuracyAnalysis;
    writeGameRecords(records);
  }
}

function gamePayload(game, viewerId) {
  const isTeamGame = game.kind === "team";
  const color = colorForUser(game, viewerId);
  const moveCount = game.chess.history().length;
  const activePlayer = isTeamGame ? currentTeamMover(game) : null;
  const teammate = isTeamGame ? teammateForUser(game, viewerId) : null;
  const allPlayers = gamePlayers(game);
  const replay = game.replay || buildReplayFromChess(game.chess);
  return {
    id: game.id,
    kind: game.kind || "normal",
    fen: game.chess.fen(),
    pgn: game.chess.pgn(),
    moves: replay.moves,
    positions: replay.positions,
    moveCount,
    canAbort: game.status === "playing" && moveCount === 0,
    legalMoves: game.chess.moves({ verbose: true }).map((move) => ({ from: move.from, to: move.to })),
    lastMove: (() => {
      const move = game.chess.history({ verbose: true }).at(-1);
      return move ? { from: move.from, to: move.to } : null;
    })(),
    turn: game.chess.turn() === "w" ? "white" : "black",
    color,
    activePlayerId: activePlayer?.id || null,
    activePlayerName: activePlayer?.username || null,
    videoPeerId: teammate?.id || null,
    videoInitiator: teammate ? viewerId < teammate.id : color === "white",
    videoPeers: allPlayers
      .filter((player) => player.id !== viewerId)
      .map((player) => videoPeerPayload(game, viewerId, player)),
    status: game.status,
    result: game.result,
    reason: game.reason,
    timeControl: game.timeControl,
    clocks: game.clocks,
    players: {
      white: isTeamGame ? teamDisplay(game.whiteTeam, "white team") : game.white,
      black: isTeamGame ? teamDisplay(game.blackTeam, "black team") : game.black
    },
    teams: isTeamGame ? {
      white: game.whiteTeam,
      black: game.blackTeam
    } : null,
    drawOfferFrom: game.drawOfferFrom,
    videoOff: game.videoOff,
    videoRequestFrom: game.videoRequestFrom,
    soundSettings: soundSettingsPayload(game),
    soundEvent: game.soundEvent || null,
    accuracyAnalysis: game.accuracyAnalysis || null
  };
}

function normalizeSoundSettings(settings = {}) {
  const validIds = new Set(["none", "fart", "laugh", "bell", "dramatic"]);
  const checkSound = validIds.has(settings.checkSound) ? settings.checkSound : "none";
  const checkmateSound = validIds.has(settings.checkmateSound) ? settings.checkmateSound : "none";
  return { checkSound, checkmateSound };
}

function soundSettingsPayload(game) {
  return Object.fromEntries(gamePlayers(game).map((player) => [
    player.id,
    normalizeSoundSettings(sockets.get(player.socketId)?.soundSettings)
  ]));
}

function videoPeerPayload(game, viewerId, player) {
  const peerColor = colorForUser(game, player.id);
  return {
    id: player.id,
    username: player.username,
    avatarUrl: player.avatarUrl,
    countryCode: player.countryCode || "OTHER",
    teamColor: peerColor,
    teamName: peerColor === "white" ? "white team" : "black team",
    isTeammate: sameTeam(game, viewerId, player.id),
    initiator: String(viewerId) < String(player.id)
  };
}

function emitGame(game) {
  for (const player of gamePlayers(game)) {
    io.to(player.socketId).emit("game:update", gamePayload(game, player.id));
  }
}

function gamePlayers(game) {
  return game.kind === "team" ? [...game.whiteTeam, ...game.blackTeam] : [game.white, game.black];
}

function resetVideoHandshake(game) {
  game.videoReady = new Set();
  game.videoStartedPairs = new Set();
}

function playerCanSignal(game, socketId) {
  return gamePlayers(game).some((player) => player.socketId === socketId);
}

function videoPairs(game) {
  if (game.kind !== "team") return [[game.white, game.black]];
  const players = gamePlayers(game);
  const pairs = [];
  for (let i = 0; i < players.length; i += 1) {
    for (let j = i + 1; j < players.length; j += 1) {
      pairs.push([players[i], players[j]]);
    }
  }
  return pairs;
}

function videoPairKey(pair) {
  return pair.map((player) => player.socketId).sort().join(":");
}

function emitWebrtcStartIfReady(game) {
  game.videoReady ||= new Set();
  game.videoStartedPairs ||= new Set();
  for (const pair of videoPairs(game)) {
    if (pair.length < 2) continue;
    const socketIds = pair.map((player) => player.socketId);
    if (!socketIds.every((socketId) => game.videoReady.has(socketId))) continue;
    const key = videoPairKey(pair);
    if (game.videoStartedPairs.has(key)) continue;
    game.videoStartedPairs.add(key);
    for (const player of pair) {
      const peer = pair.find((item) => item.id !== player.id);
      const initiator = game.kind === "team" ? player.id < peer.id : colorForUser(game, player.id) === "white";
      io.to(player.socketId).emit("webrtc:start", {
        gameId: game.id,
        peerId: peer.id,
        peerName: peer.username,
        initiator
      });
    }
  }
}

function findActiveGameForUser(userId) {
  for (const game of games.values()) {
    if (game.status === "playing" && gamePlayers(game).some((player) => player.id === userId)) return game;
  }
  return null;
}

function rebindGameSocket(game, userId, socketId) {
  for (const player of gamePlayers(game)) {
    if (player.id === userId) player.socketId = socketId;
  }
  resetVideoHandshake(game);
}

function colorForUser(game, userId) {
  if (game.kind === "team") {
    if (game.whiteTeam.some((player) => player.id === userId)) return "white";
    if (game.blackTeam.some((player) => player.id === userId)) return "black";
    return null;
  }
  return game.white.id === userId ? "white" : "black";
}

function colorForSocket(game, socketId) {
  if (game.kind === "team") {
    if (game.whiteTeam.some((player) => player.socketId === socketId)) return "white";
    if (game.blackTeam.some((player) => player.socketId === socketId)) return "black";
    return null;
  }
  return game.white.socketId === socketId ? "white" : "black";
}

function playersForColor(game, color) {
  if (game.kind === "team") return color === "white" ? game.whiteTeam : game.blackTeam;
  return [color === "white" ? game.white : game.black];
}

function teammateForUser(game, userId) {
  if (game.kind !== "team") return null;
  const color = colorForUser(game, userId);
  return playersForColor(game, color).find((player) => player.id !== userId) || null;
}

function sameTeam(game, aUserId, bUserId) {
  if (game.kind !== "team") return aUserId === bUserId;
  return colorForUser(game, aUserId) === colorForUser(game, bUserId);
}

function leaveAllQueues(socketId) {
  const state = sockets.get(socketId);
  for (const queue of queues.values()) queue.delete(socketId);
  for (const queue of teamQueues.values()) queue.delete(socketId);
  if (state) state.queuedFor = null;
}

function joinTeamQueue(socket, timeControl) {
  if (!TIME_CONTROLS[timeControl]) return socket.emit("error:message", "Unknown time control.");
  const state = sockets.get(socket.id);
  if (state.gameId) return;
  leaveAllQueues(socket.id);

  const queue = teamQueues.get(timeControl) || new Set();
  teamQueues.set(timeControl, queue);
  queue.add(socket.id);
  state.queuedFor = `team:${timeControl}`;
  const uniqueReady = [...new Set([socket.id, ...liveQueuedSockets(queue, socket.id)])]
    .map((id) => io.sockets.sockets.get(id))
    .filter((queuedSocket) => queuedSocket);
  const seenUsers = new Set();
  const candidates = uniqueReady.filter((queuedSocket) => {
    if (seenUsers.has(queuedSocket.user.id)) return false;
    seenUsers.add(queuedSocket.user.id);
    return true;
  }).slice(0, 4);
  if (candidates.length < 4) {
    socket.emit("teamQueue:waiting", timeControl);
    broadcastOpenChallenges();
    return;
  }
  candidates.forEach((queuedSocket) => {
    queue.delete(queuedSocket.id);
    const queuedState = sockets.get(queuedSocket.id);
    if (queuedState) queuedState.queuedFor = null;
  });
  createTeamGame(
    candidates.map((queuedSocket) => ({ ...queuedSocket.user, socketId: queuedSocket.id })),
    timeControl
  );
  broadcastOpenChallenges();
}

function teamDisplay(team, label) {
  const rating = Math.round(team.reduce((sum, player) => sum + (player.rating || START_RATING), 0) / team.length);
  return {
    id: team.map((player) => player.id).join(":"),
    username: label,
    fullName: team.map((player) => player.username).join(" + "),
    rating,
    gamesPlayed: team.reduce((sum, player) => sum + (player.gamesPlayed || 0), 0),
    countryCode: team[0]?.countryCode || "OTHER",
    avatarUrl: team[0]?.avatarUrl || "/default-avatar.svg"
  };
}

function currentTeamMover(game) {
  if (game.kind !== "team") return null;
  const color = game.chess.turn() === "w" ? "white" : "black";
  const team = color === "white" ? game.whiteTeam : game.blackTeam;
  const plyForColor = game.chess.history({ verbose: true }).filter((move) => move.color === (color === "white" ? "w" : "b")).length;
  return team[plyForColor % team.length];
}

function finishGame(game, result, reason) {
  if (game.status === "finished") return;
  game.status = "finished";
  game.result = result;
  game.reason = reason;
  clearInterval(game.timer);
  if (game.kind === "team") {
    emitGame(game);
    return;
  }
  const ratingChanges = updateRatings(result, game.white.id, game.black.id);
  const users = readUsers();
  game.white.rating = users.find((user) => user.id === game.white.id)?.rating || game.white.rating;
  game.black.rating = users.find((user) => user.id === game.black.id)?.rating || game.black.rating;
  if (ratingChanges) saveGameRecord(game, ratingChanges);
  emitGame(game);
}

function abortGame(game) {
  if (!game || game.status !== "playing" || game.chess.history().length > 0) return false;
  game.status = "finished";
  game.result = "aborted";
  game.reason = "abort";
  clearInterval(game.timer);
  emitGame(game);
  return true;
}

function settleGameClock(game, { emit = false } = {}) {
  if (game.status !== "playing") return;
  const now = Date.now();
  const elapsed = Math.floor((now - game.lastTickAt) / 1000);
  if (elapsed <= 0) return;
  game.lastTickAt += elapsed * 1000;
  const turnColor = game.chess.turn() === "w" ? "white" : "black";
  game.clocks[turnColor] = Math.max(0, game.clocks[turnColor] - elapsed);
  if (game.clocks[turnColor] <= 0) {
    finishGame(game, turnColor === "white" ? "black" : "white", "timeout");
  } else if (emit) {
    emitGame(game);
  }
}

function tickGame(game) {
  settleGameClock(game, { emit: true });
}

function createGame(a, b, timeKey) {
  const whiteFirst = Math.random() > 0.5;
  const white = whiteFirst ? a : b;
  const black = whiteFirst ? b : a;
  const tc = TIME_CONTROLS[timeKey];
  const game = {
    id: uuid(),
    kind: "normal",
    chess: new Chess(),
    white,
    black,
    status: "playing",
    result: null,
    reason: null,
    timeControl: timeKey,
    clocks: { white: tc.seconds, black: tc.seconds },
    increment: tc.increment,
    drawOfferFrom: null,
    videoOff: false,
    videoRequestFrom: null,
    videoReady: new Set(),
    videoStartedPairs: new Set(),
    lastTickAt: Date.now(),
    timer: null
  };
  game.timer = setInterval(() => tickGame(game), 1000);
  games.set(game.id, game);
  sockets.get(white.socketId).gameId = game.id;
  sockets.get(black.socketId).gameId = game.id;
  io.to(white.socketId).emit("match:found", gamePayload(game, white.id));
  io.to(black.socketId).emit("match:found", gamePayload(game, black.id));
}

function createTeamGame(players, timeKey) {
  const shuffled = [...players].sort(() => Math.random() - 0.5);
  const whiteTeam = [shuffled[0], shuffled[1]];
  const blackTeam = [shuffled[2], shuffled[3]];
  const tc = TIME_CONTROLS[timeKey];
  const game = {
    id: uuid(),
    kind: "team",
    chess: new Chess(),
    whiteTeam,
    blackTeam,
    status: "playing",
    result: null,
    reason: null,
    timeControl: timeKey,
    clocks: { white: tc.seconds, black: tc.seconds },
    increment: tc.increment,
    drawOfferFrom: null,
    videoOff: false,
    videoRequestFrom: null,
    videoReady: new Set(),
    videoStartedPairs: new Set(),
    lastTickAt: Date.now(),
    timer: null
  };
  game.timer = setInterval(() => tickGame(game), 1000);
  games.set(game.id, game);
  for (const player of [...whiteTeam, ...blackTeam]) {
    const state = sockets.get(player.socketId);
    if (state) {
      state.gameId = game.id;
      state.queuedFor = null;
    }
    io.to(player.socketId).emit("match:found", gamePayload(game, player.id));
  }
}

function socketForUser(userId) {
  const entry = [...sockets.entries()].find(([, state]) => state.userId === userId);
  return entry ? io.sockets.sockets.get(entry[0]) : null;
}

app.post("/api/signup", upload.single("avatar"), async (req, res) => {
  const fullName = String(req.body.fullName || "").trim();
  const username = String(req.body.username || "").trim();
  const email = String(req.body.email || "").trim().toLowerCase();
  const emailConfirm = String(req.body.emailConfirm || "").trim().toLowerCase();
  const dateOfBirth = String(req.body.dateOfBirth || "").trim();
  const countryCode = COUNTRY_NAMES[req.body.countryCode] ? req.body.countryCode : "OTHER";
  const password = String(req.body.password || "");
  if (fullName.length < 2) return res.status(400).json({ error: "Please enter your name." });
  if (username.length < 3) return res.status(400).json({ error: "Username must be at least 3 characters." });
  if (!isValidEmail(email)) return res.status(400).json({ error: "Please enter a valid email address." });
  if (email !== emailConfirm) return res.status(400).json({ error: "Email addresses do not match." });
  const age = ageFromDate(dateOfBirth);
  if (age === null) return res.status(400).json({ error: "Please enter a valid date of birth." });
  if (age < 13) return res.status(400).json({ error: "Players must be at least 13 years old." });
  if (password.length < 6) return res.status(400).json({ error: "Password must be at least 6 characters." });

  const users = readUsers();
  if (users.some((user) => user.username.toLowerCase() === username.toLowerCase())) {
    return res.status(409).json({ error: "That username is already taken." });
  }
  if (users.some((user) => user.email === email)) {
    return res.status(409).json({ error: "That email is already registered." });
  }

  const user = {
    id: uuid(),
    fullName,
    username,
    email,
    dateOfBirth,
    countryCode,
    passwordHash: await bcrypt.hash(password, 10),
    rating: START_RATING,
    ratingRd: START_RD,
    gamesPlayed: 0,
    friendsCount: 0,
    friends: [],
    incomingFriendRequests: [],
    outgoingFriendRequests: [],
    emailVerified: !emailVerificationEnabled(),
    avatarUrl: req.file ? `/uploads/${req.file.filename}` : "/default-avatar.svg",
    createdAt: new Date().toISOString()
  };
  users.push(user);
  if (!emailVerificationEnabled()) {
    writeUsers(users);
    const token = uuid();
    sessions.set(token, user.id);
    return res.json({
      token,
      user: publicUser(user),
      message: "Account created. Email verification is off until SMTP email is configured."
    });
  }

  const verificationToken = createVerificationToken(user);
  writeUsers(users);
  const emailSent = await sendVerificationEmail(req, user, verificationToken);
  res.json({
    needsEmailVerification: true,
    emailSent,
    message: emailSent
      ? "Account created. Check your email and click the verification link before logging in."
      : "Account created. Email sending is not configured yet, so check the Node.js logs for the verification link."
  });
});

app.post("/api/guest", (_req, res) => {
  const users = readUsers();
  const username = guestUsername(users);
  const user = {
    id: uuid(),
    fullName: "Guest Player",
    username,
    email: `${username}@guest.chessface.local`,
    dateOfBirth: "",
    countryCode: "OTHER",
    passwordHash: "",
    rating: START_RATING,
    ratingRd: START_RD,
    gamesPlayed: 0,
    friendsCount: 0,
    friends: [],
    incomingFriendRequests: [],
    outgoingFriendRequests: [],
    emailVerified: true,
    isGuest: true,
    avatarUrl: "/default-avatar.svg",
    createdAt: new Date().toISOString()
  };
  users.push(user);
  writeUsers(users);
  const token = uuid();
  sessions.set(token, user.id);
  res.json({ token, user: publicUser(user) });
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();
  const user = users.find((item) => item.username.toLowerCase() === String(username || "").toLowerCase());
  if (user?.isGuest) return res.status(401).json({ error: "Guest accounts are temporary. Create a free account to come back later." });
  if (!user || !(await bcrypt.compare(String(password || ""), user.passwordHash))) {
    return res.status(401).json({ error: "Invalid username or password." });
  }
  if (!user.emailVerified) {
    if (!emailVerificationEnabled()) {
      user.emailVerified = true;
      delete user.emailVerificationTokenHash;
      delete user.emailVerificationExpiresAt;
      writeUsers(users);
    } else {
    return res.status(403).json({ error: "Please confirm your email before logging in." });
    }
  }
  const token = uuid();
  sessions.set(token, user.id);
  res.json({ token, user: publicUser(user) });
});

app.get("/verify-email", (req, res) => {
  const token = String(req.query.token || "");
  if (!token) return res.status(400).send("Missing verification token.");

  const users = readUsers();
  const hashed = tokenHash(token);
  const user = users.find((item) => item.emailVerificationTokenHash === hashed);
  if (!user) return res.status(400).send("This verification link is invalid or was already used.");
  if (new Date(user.emailVerificationExpiresAt).getTime() < Date.now()) {
    return res.status(400).send("This verification link expired. Please request a new one.");
  }

  user.emailVerified = true;
  delete user.emailVerificationTokenHash;
  delete user.emailVerificationExpiresAt;
  writeUsers(users);
  res.redirect("/?verified=1");
});

app.post("/api/resend-verification", async (req, res) => {
  const identifier = String(req.body.email || req.body.username || "").trim().toLowerCase();
  const users = readUsers();
  const user = users.find((item) => item.email === identifier || item.username.toLowerCase() === identifier);
  if (!user) return res.status(404).json({ error: "No account found." });
  if (user.emailVerified) return res.json({ message: "That account is already verified." });
  const verificationToken = createVerificationToken(user);
  writeUsers(users);
  const emailSent = await sendVerificationEmail(req, user, verificationToken);
  res.json({
    emailSent,
    message: emailSent
      ? "Verification email sent."
      : "Email sending is not configured yet, so check the Node.js logs for the verification link."
  });
});

app.get("/api/me", requireSession, (req, res) => {
  res.json({ user: publicUser(req.user), timeControls: TIME_CONTROLS });
});

app.get("/api/rankings", (_req, res) => {
  const players = readUsers()
    .filter((user) => !user.isGuest)
    .sort((a, b) => {
      const ratingDiff = (b.rating || START_RATING) - (a.rating || START_RATING);
      if (ratingDiff) return ratingDiff;
      const gamesDiff = (b.gamesPlayed || 0) - (a.gamesPlayed || 0);
      if (gamesDiff) return gamesDiff;
      return String(a.username || "").localeCompare(String(b.username || ""));
    })
    .slice(0, 200)
    .map((user, index) => {
      const publicRecord = publicUser(user);
      return {
        rank: index + 1,
        id: publicRecord.id,
        username: publicRecord.username,
        fullName: publicRecord.fullName,
        rating: publicRecord.rating,
        ratingRd: publicRecord.ratingRd,
        gamesPlayed: publicRecord.gamesPlayed,
        friendsCount: publicRecord.friendsCount,
        countryCode: publicRecord.countryCode,
        countryName: publicRecord.countryName,
        joinedAt: publicRecord.joinedAt,
        online: publicRecord.online,
        avatarUrl: publicRecord.avatarUrl
      };
    });
  res.json({
    players,
    totalPlayers: players.length,
    onlinePlayers: players.filter((player) => player.online).length
  });
});

app.post("/api/profile", requireSession, requireRegisteredUser, upload.single("avatar"), (req, res) => {
  const users = readUsers();
  const user = users.find((item) => item.id === req.user.id);
  const countryCode = COUNTRY_NAMES[req.body.countryCode] ? req.body.countryCode : user.countryCode || "US";
  user.countryCode = countryCode;
  if (req.file) user.avatarUrl = `/uploads/${req.file.filename}`;
  writeUsers(users);
  res.json({ user: publicUser(user) });
});

app.get("/api/games", requireSession, (req, res) => {
  const records = readGameRecords()
    .filter((game) => game.players.white.id === req.user.id || game.players.black.id === req.user.id)
    .slice(0, 100)
    .map(withReplay);
  res.json({ games: records });
});

app.get("/api/friends", requireSession, requireRegisteredUser, (req, res) => {
  const users = readUsers();
  const me = users.find((user) => user.id === req.user.id);
  const records = readGameRecords();
  const friends = (me.friends || [])
    .map((friendId) => users.find((user) => user.id === friendId))
    .filter(Boolean)
    .map((friend) => ({
      ...publicUser(friend),
      recentGames: records
        .filter((game) => game.players.white.id === friend.id || game.players.black.id === friend.id)
        .slice(0, 5)
        .map((game) => {
          const color = game.players.white.id === friend.id ? "white" : "black";
          const opponent = color === "white" ? game.players.black : game.players.white;
          return {
            id: game.id,
            playedAt: game.playedAt,
            timeControl: game.timeControl,
            result: game.result === "draw" ? "Draw" : game.result === color ? "Win" : "Loss",
            opponent: opponent.username,
            ratingChange: game.ratingChanges?.[color]?.change || 0
          };
        })
    }));
  const incomingRequests = (me.incomingFriendRequests || [])
    .map((requesterId) => users.find((user) => user.id === requesterId))
    .filter(Boolean)
    .map(publicUser);
  const outgoingRequests = (me.outgoingFriendRequests || [])
    .map((targetId) => users.find((user) => user.id === targetId))
    .filter(Boolean)
    .map(publicUser);
  res.json({ friends, incomingRequests, outgoingRequests });
});

app.get("/api/friends/online", requireSession, requireRegisteredUser, (req, res) => {
  const users = readUsers();
  const me = users.find((user) => user.id === req.user.id);
  const friends = (me.friends || [])
    .map((friendId) => users.find((user) => user.id === friendId))
    .filter((friend) => friend && socketForUser(friend.id))
    .map(publicUser);
  res.json({ friends });
});

app.post("/api/friends", requireSession, requireRegisteredUser, (req, res) => {
  const username = String(req.body.username || "").trim();
  const search = username.toLowerCase();
  const users = readUsers();
  const me = users.find((user) => user.id === req.user.id);
  const friend = users.find((user) => (
    user.username.toLowerCase() === search ||
    user.fullName?.toLowerCase() === search ||
    user.username.toLowerCase().includes(search) ||
    user.fullName?.toLowerCase().includes(search)
  ));
  if (!friend) return res.status(404).json({ error: "No player found with that nickname." });
  if (friend.id === me.id) return res.status(400).json({ error: "You cannot add yourself." });
  if (friend.isGuest) return res.status(403).json({ error: "Guest players need to create an account before they can receive friend requests." });
  me.friends ||= [];
  me.outgoingFriendRequests ||= [];
  friend.incomingFriendRequests ||= [];
  friend.outgoingFriendRequests ||= [];
  me.incomingFriendRequests ||= [];
  if (me.friends.includes(friend.id)) return res.status(409).json({ error: "That player is already in your friend list." });
  if (me.outgoingFriendRequests.includes(friend.id)) return res.status(409).json({ error: "Friend request already sent." });
  if (me.incomingFriendRequests.includes(friend.id)) {
    me.incomingFriendRequests = me.incomingFriendRequests.filter((id) => id !== friend.id);
    friend.outgoingFriendRequests = friend.outgoingFriendRequests.filter((id) => id !== me.id);
    me.friends.push(friend.id);
    friend.friends ||= [];
    if (!friend.friends.includes(me.id)) friend.friends.push(me.id);
    me.friendsCount = me.friends.length;
    friend.friendsCount = friend.friends.length;
    writeUsers(users);
    return res.json({ user: publicUser(me), friend: publicUser(friend), accepted: true });
  }
  me.outgoingFriendRequests.push(friend.id);
  friend.incomingFriendRequests.push(me.id);
  writeUsers(users);
  const friendSocket = socketForUser(friend.id);
  if (friendSocket) friendSocket.emit("friend:request", { from: publicUser(me) });
  res.json({ user: publicUser(me), friend: publicUser(friend), requested: true });
});

app.post("/api/friends/requests/:fromId/accept", requireSession, requireRegisteredUser, (req, res) => {
  const users = readUsers();
  const me = users.find((user) => user.id === req.user.id);
  const requester = users.find((user) => user.id === req.params.fromId);
  if (!requester) return res.status(404).json({ error: "Requesting player was not found." });
  me.incomingFriendRequests ||= [];
  requester.outgoingFriendRequests ||= [];
  if (!me.incomingFriendRequests.includes(requester.id)) return res.status(404).json({ error: "No pending request from this player." });
  me.incomingFriendRequests = me.incomingFriendRequests.filter((id) => id !== requester.id);
  requester.outgoingFriendRequests = requester.outgoingFriendRequests.filter((id) => id !== me.id);
  me.friends ||= [];
  requester.friends ||= [];
  if (!me.friends.includes(requester.id)) me.friends.push(requester.id);
  if (!requester.friends.includes(me.id)) requester.friends.push(me.id);
  me.friendsCount = me.friends.length;
  requester.friendsCount = requester.friends.length;
  writeUsers(users);
  const requesterSocket = socketForUser(requester.id);
  if (requesterSocket) requesterSocket.emit("friend:accepted", { by: publicUser(me) });
  res.json({ user: publicUser(me), friend: publicUser(requester) });
});

app.delete("/api/friends/requests/:otherId", requireSession, requireRegisteredUser, (req, res) => {
  const users = readUsers();
  const me = users.find((user) => user.id === req.user.id);
  const other = users.find((user) => user.id === req.params.otherId);
  if (!other) return res.status(404).json({ error: "Player was not found." });
  me.incomingFriendRequests = (me.incomingFriendRequests || []).filter((id) => id !== other.id);
  me.outgoingFriendRequests = (me.outgoingFriendRequests || []).filter((id) => id !== other.id);
  other.incomingFriendRequests = (other.incomingFriendRequests || []).filter((id) => id !== me.id);
  other.outgoingFriendRequests = (other.outgoingFriendRequests || []).filter((id) => id !== me.id);
  writeUsers(users);
  res.json({ user: publicUser(me) });
});

app.delete("/api/friends/:id", requireSession, requireRegisteredUser, (req, res) => {
  const users = readUsers();
  const me = users.find((user) => user.id === req.user.id);
  const friend = users.find((user) => user.id === req.params.id);
  me.friends = (me.friends || []).filter((friendId) => friendId !== req.params.id);
  me.friendsCount = me.friends.length;
  if (friend) {
    friend.friends = (friend.friends || []).filter((friendId) => friendId !== me.id);
    friend.friendsCount = friend.friends.length;
  }
  writeUsers(users);
  res.json({ user: publicUser(me) });
});

app.get("/api/messages/:friendId", requireSession, requireRegisteredUser, (req, res) => {
  const users = readUsers();
  const me = users.find((user) => user.id === req.user.id);
  if (!(me.friends || []).includes(req.params.friendId)) return res.status(403).json({ error: "Add this player as a friend first." });
  const thread = readMessages()
    .filter((message) => (
      (message.from === req.user.id && message.to === req.params.friendId) ||
      (message.from === req.params.friendId && message.to === req.user.id)
    ))
    .slice(-100);
  res.json({ messages: thread });
});

app.post("/api/messages/:friendId", requireSession, requireRegisteredUser, (req, res) => {
  const text = String(req.body.text || "").trim().slice(0, 600);
  if (!text) return res.status(400).json({ error: "Message cannot be empty." });
  const users = readUsers();
  const me = users.find((user) => user.id === req.user.id);
  if (!(me.friends || []).includes(req.params.friendId)) return res.status(403).json({ error: "Add this player as a friend first." });
  const friend = users.find((user) => user.id === req.params.friendId);
  if (!friend) return res.status(404).json({ error: "Friend not found." });
  const messages = readMessages();
  const message = { id: uuid(), from: req.user.id, to: friend.id, text, sentAt: new Date().toISOString() };
  messages.push(message);
  writeMessages(messages.slice(-2000));
  res.json({ message });
});

io.use((socket, next) => {
  const userId = sessions.get(socket.handshake.auth?.token);
  if (!userId) return next(new Error("Unauthorized"));
  const user = readUsers().find((item) => item.id === userId);
  if (!user) return next(new Error("Unauthorized"));
  socket.user = publicUser(user);
  next();
});

io.on("connection", (socket) => {
  sockets.set(socket.id, {
    userId: socket.user.id,
    gameId: null,
    queuedFor: null,
    soundSettings: normalizeSoundSettings()
  });
  socket.emit("profile", socket.user);
  socket.emit("openChallenges:update", openChallengesPayload());
  const activeGame = findActiveGameForUser(socket.user.id);
  if (activeGame) {
    rebindGameSocket(activeGame, socket.user.id, socket.id);
    sockets.get(socket.id).gameId = activeGame.id;
    for (const player of gamePlayers(activeGame)) {
      if (player.socketId !== socket.id) io.to(player.socketId).emit("webrtc:reset", { gameId: activeGame.id });
    }
    socket.emit("active-game:found", gamePayload(activeGame, socket.user.id));
    emitGame(activeGame);
  }

  socket.on("queue:join", (timeControl) => {
    if (!TIME_CONTROLS[timeControl]) return socket.emit("error:message", "Unknown time control.");
    const state = sockets.get(socket.id);
    if (state.gameId) return;
    leaveAllQueues(socket.id);

    const queue = queues.get(timeControl) || new Set();
    queues.set(timeControl, queue);
    const opponentId = liveQueuedSockets(queue, socket.id).find((id) => sockets.get(id)?.userId !== socket.user.id);
    if (!opponentId) {
      queue.add(socket.id);
      state.queuedFor = timeControl;
      socket.emit("queue:waiting", timeControl);
      broadcastOpenChallenges();
      return;
    }

    queue.delete(opponentId);
    state.queuedFor = null;
    const opponentSocket = io.sockets.sockets.get(opponentId);
    const opponentState = sockets.get(opponentId);
    if (!opponentSocket || !opponentState) {
      queue.add(socket.id);
      state.queuedFor = timeControl;
      socket.emit("queue:waiting", timeControl);
      broadcastOpenChallenges();
      return;
    }
    opponentState.queuedFor = null;
    createGame(
      { ...socket.user, socketId: socket.id },
      { ...opponentSocket.user, socketId: opponentId },
      timeControl
    );
    broadcastOpenChallenges();
  });

  socket.on("queue:leave", () => {
    leaveAllQueues(socket.id);
    socket.emit("queue:left");
    broadcastOpenChallenges();
  });

  socket.on("teamQueue:join", (timeControl) => {
    joinTeamQueue(socket, timeControl);
  });

  socket.on("openChallenge:join", ({ mode, timeControl, hostSocketId }) => {
    if (!TIME_CONTROLS[timeControl]) return socket.emit("error:message", "Unknown time control.");
    const state = sockets.get(socket.id);
    if (!state || state.gameId) return;
    if (mode === "team") return joinTeamQueue(socket, timeControl);

    const queue = queues.get(timeControl);
    if (!queue || !queue.has(hostSocketId) || hostSocketId === socket.id) {
      return socket.emit("error:message", "That open challenge is no longer available.");
    }
    const hostSocket = io.sockets.sockets.get(hostSocketId);
    const hostState = sockets.get(hostSocketId);
    if (!hostSocket || !hostState || hostState.gameId || hostSocket.user.id === socket.user.id) {
      queue.delete(hostSocketId);
      broadcastOpenChallenges();
      return socket.emit("error:message", "That open challenge is no longer available.");
    }
    leaveAllQueues(socket.id);
    queue.delete(hostSocketId);
    hostState.queuedFor = null;
    createGame(
      { ...hostSocket.user, socketId: hostSocket.id },
      { ...socket.user, socketId: socket.id },
      timeControl
    );
    broadcastOpenChallenges();
  });

  socket.on("challenge:send", ({ friendId, timeControl }) => {
    if (!TIME_CONTROLS[timeControl]) return socket.emit("error:message", "Unknown time control.");
    const users = readUsers();
    const me = users.find((user) => user.id === socket.user.id);
    if (!(me.friends || []).includes(friendId)) return socket.emit("error:message", "Add this player as a friend first.");
    const friendSocket = socketForUser(friendId);
    if (!friendSocket) return socket.emit("error:message", "That friend is not online.");
    if (sockets.get(socket.id)?.gameId || sockets.get(friendSocket.id)?.gameId) return socket.emit("error:message", "One of you is already in a game.");
    const challenge = {
      id: uuid(),
      fromSocketId: socket.id,
      toSocketId: friendSocket.id,
      fromUser: socket.user,
      timeControl,
      createdAt: Date.now()
    };
    challenges.set(challenge.id, challenge);
    socket.emit("challenge:sent", { to: friendSocket.user.username, timeControl });
    friendSocket.emit("challenge:received", {
      id: challenge.id,
      from: socket.user,
      timeControl
    });
  });

  socket.on("challenge:accept", (challengeId) => {
    const challenge = challenges.get(challengeId);
    if (!challenge || challenge.toSocketId !== socket.id) return;
    const challengerSocket = io.sockets.sockets.get(challenge.fromSocketId);
    if (!challengerSocket) return challenges.delete(challengeId);
    challenges.delete(challengeId);
    createGame(
      { ...challenge.fromUser, socketId: challengerSocket.id },
      { ...socket.user, socketId: socket.id },
      challenge.timeControl
    );
  });

  socket.on("challenge:decline", (challengeId) => {
    const challenge = challenges.get(challengeId);
    if (!challenge || challenge.toSocketId !== socket.id) return;
    challenges.delete(challengeId);
    io.to(challenge.fromSocketId).emit("challenge:declined", { from: socket.user.username });
  });

  socket.on("sound:settings", (nextSettings) => {
    const state = sockets.get(socket.id);
    if (!state) return;
    state.soundSettings = normalizeSoundSettings(nextSettings);
    const game = games.get(state.gameId);
    if (!game) return;
    for (const player of gamePlayers(game)) {
      io.to(player.socketId).emit("sound:settings", {
        userId: socket.user.id,
        settings: state.soundSettings
      });
    }
  });

  socket.on("game:accuracy:save", ({ gameId, analysis }) => {
    const state = sockets.get(socket.id);
    const game = games.get(gameId || state?.gameId);
    if (!game || game.status !== "finished") return;
    if (!gamePlayers(game).some((player) => player.id === socket.user.id)) return;
    if (game.accuracyAnalysis) {
      socket.emit("game:update", gamePayload(game, socket.user.id));
      return;
    }
    saveAccuracyAnalysis(game, analysis);
    emitGame(game);
  });

  socket.on("game:move", ({ from, to, promotion }) => {
    const state = sockets.get(socket.id);
    const game = games.get(state?.gameId);
    if (!game || game.status !== "playing") return;
    settleGameClock(game);
    if (game.status !== "playing") return;
    const color = colorForUser(game, socket.user.id);
    if (!color) return;
    const expectedColor = game.chess.turn() === "w" ? "white" : "black";
    if (color !== expectedColor) return socket.emit("error:message", "It is not your turn.");
    if (game.kind === "team" && currentTeamMover(game)?.id !== socket.user.id) {
      return socket.emit("error:message", `It is ${currentTeamMover(game)?.username || "your teammate"}'s move for your team.`);
    }

    let move = null;
    try {
      move = game.chess.move({ from, to, promotion: promotion || "q" });
    } catch {
      move = null;
    }
    if (!move) {
      socket.emit("error:message", "Illegal move.");
      socket.emit("game:update", gamePayload(game, socket.user.id));
      return;
    }
    game.clocks[color] += game.increment;
    game.drawOfferFrom = null;
    game.lastTickAt = Date.now();
    const moveCount = game.chess.history().length;
    game.soundEvent = null;

    if (game.chess.isCheckmate()) {
      game.soundEvent = {
        id: `${game.id}:${moveCount}:checkmate`,
        type: "checkmate",
        playerId: socket.user.id,
        color
      };
      finishGame(game, color, "checkmate");
    }
    else if (game.chess.isDraw()) finishGame(game, "draw", "draw");
    else {
      if (game.chess.isCheck()) {
        game.soundEvent = {
          id: `${game.id}:${moveCount}:check`,
          type: "check",
          playerId: socket.user.id,
          color
        };
      }
      emitGame(game);
    }
  });

  socket.on("game:resign", () => {
    const game = games.get(sockets.get(socket.id)?.gameId);
    if (!game || game.status !== "playing") return;
    settleGameClock(game);
    if (game.status !== "playing") return;
    const color = colorForUser(game, socket.user.id);
    const expectedColor = game.chess.turn() === "w" ? "white" : "black";
    if (!color || color !== expectedColor) return socket.emit("error:message", "Only the player whose turn it is can resign.");
    if (game.kind === "team" && currentTeamMover(game)?.id !== socket.user.id) {
      return socket.emit("error:message", `Only ${currentTeamMover(game)?.username || "the active teammate"} can resign right now.`);
    }
    const result = color === "white" ? "black" : "white";
    finishGame(game, result, "resignation");
  });

  socket.on("game:abort", () => {
    const game = games.get(sockets.get(socket.id)?.gameId);
    if (!abortGame(game)) socket.emit("error:message", "This game can no longer be aborted.");
  });

  socket.on("game:draw:offer", () => {
    const game = games.get(sockets.get(socket.id)?.gameId);
    if (!game || game.status !== "playing") return;
    game.drawOfferFrom = socket.user.id;
    emitGame(game);
  });

  socket.on("game:draw:accept", () => {
    const game = games.get(sockets.get(socket.id)?.gameId);
    if (!game || game.status !== "playing" || !game.drawOfferFrom || sameTeam(game, game.drawOfferFrom, socket.user.id)) return;
    finishGame(game, "draw", "agreement");
  });

  socket.on("game:draw:decline", () => {
    const game = games.get(sockets.get(socket.id)?.gameId);
    if (!game || game.status !== "playing") return;
    game.drawOfferFrom = null;
    emitGame(game);
  });

  socket.on("game:chat", (messageText) => {
    const game = games.get(sockets.get(socket.id)?.gameId);
    if (!game || game.status !== "playing") return;
    const text = String(messageText || "").trim().slice(0, 240);
    if (!text) return;
    const message = {
      id: uuid(),
      gameId: game.id,
      from: socket.user.id,
      username: socket.user.username,
      text,
      sentAt: new Date().toISOString()
    };
    const recipients = gamePlayers(game);
    for (const player of recipients) io.to(player.socketId).emit("game:chat", message);
  });

  socket.on("video:hangup", () => {
    const game = games.get(sockets.get(socket.id)?.gameId);
    if (!game || game.status !== "playing") return;
    game.videoOff = true;
    game.videoRequestFrom = null;
    resetVideoHandshake(game);
    emitGame(game);
    for (const player of gamePlayers(game)) io.to(player.socketId).emit("video:hangup");
  });

  socket.on("video:request", () => {
    const game = games.get(sockets.get(socket.id)?.gameId);
    if (!game || game.status !== "playing" || !game.videoOff) return;
    game.videoRequestFrom = socket.user.id;
    emitGame(game);
  });

  socket.on("video:accept", () => {
    const game = games.get(sockets.get(socket.id)?.gameId);
    if (!game || game.status !== "playing" || !game.videoOff || !game.videoRequestFrom || game.videoRequestFrom === socket.user.id) return;
    game.videoOff = false;
    game.videoRequestFrom = null;
    resetVideoHandshake(game);
    emitGame(game);
    for (const player of gamePlayers(game)) io.to(player.socketId).emit("video:restart");
  });

  socket.on("video:decline", () => {
    const game = games.get(sockets.get(socket.id)?.gameId);
    if (!game || game.status !== "playing" || game.videoRequestFrom === socket.user.id) return;
    game.videoRequestFrom = null;
    emitGame(game);
  });

  socket.on("webrtc:ready", ({ gameId }) => {
    const game = games.get(gameId);
    if (!game || game.status !== "playing" || game.videoOff || !playerCanSignal(game, socket.id)) return;
    game.videoReady ||= new Set();
    game.videoReady.add(socket.id);
    emitWebrtcStartIfReady(game);
  });

  socket.on("webrtc:signal", ({ gameId, to, signal }) => {
    const game = games.get(gameId);
    if (!game || game.videoOff || !playerCanSignal(game, socket.id)) return;
    const sender = gamePlayers(game).find((player) => player.socketId === socket.id);
    const peer = to
      ? gamePlayers(game).find((player) => player.id === to)
      : game.kind === "team"
        ? null
        : game.white.socketId === socket.id ? game.black : game.white;
    if (!sender || !peer || peer.socketId === socket.id) return;
    io.to(peer.socketId).emit("webrtc:signal", { from: sender.id, signal });
  });

  socket.on("disconnect", () => {
    const state = sockets.get(socket.id);
    leaveAllQueues(socket.id);
    for (const [id, challenge] of challenges.entries()) {
      if (challenge.fromSocketId === socket.id || challenge.toSocketId === socket.id) challenges.delete(id);
    }
    sockets.delete(socket.id);
    broadcastOpenChallenges();
  });
});

app.use("/api", (_req, res) => {
  res.status(404).json({ error: "API route not found. Node.js is running." });
});

server.listen(PORT, () => {
  console.log(`Video Chess running at http://localhost:${PORT}`);
});
