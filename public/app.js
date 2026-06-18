const authView = document.querySelector("#authView");
const appView = document.querySelector("#appView");
const marketingView = document.querySelector("#marketingView");
const authForm = document.querySelector("#authForm");
const authNotice = document.querySelector("#authNotice");
const authSubmit = document.querySelector("#authSubmit");
const guestButton = document.querySelector("#guestButton");
const passwordInput = authForm.querySelector("[name='password']");
const passwordToggle = document.querySelector("#passwordToggle");
const avatarField = document.querySelector("#avatarField");
const signupFields = document.querySelector("#signupFields");
const loginUsernameField = document.querySelector("#loginUsernameField");
const tabs = document.querySelectorAll(".tab");
const timeButtons = document.querySelectorAll(".time-card");
const seekButton = document.querySelector("#seekButton");
const seekTeamButton = document.querySelector("#seekTeamButton");
const playFriendButton = document.querySelector("#playFriendButton");
const cancelSeekButton = document.querySelector("#cancelSeekButton");
const friendChallengePanel = document.querySelector("#friendChallengePanel");
const onlineFriendsList = document.querySelector("#onlineFriendsList");
const closeFriendChallengeButton = document.querySelector("#closeFriendChallengeButton");
const challengeBox = document.querySelector("#challengeBox");
const challengeText = document.querySelector("#challengeText");
const acceptChallengeButton = document.querySelector("#acceptChallengeButton");
const declineChallengeButton = document.querySelector("#declineChallengeButton");
const openChallengeList = document.querySelector("#openChallengeList");
const openChallengeCount = document.querySelector("#openChallengeCount");
const lobby = document.querySelector("#lobby");
const seekingPanel = document.querySelector("#seekingPanel");
const seekingTitle = document.querySelector("#seekingTitle");
const cancelSeekPanelButton = document.querySelector("#cancelSeekPanelButton");
const matchmakingImage = document.querySelector("#matchmakingImage");
const matchmakingCaption = document.querySelector("#matchmakingCaption");
const gameLayout = document.querySelector("#gameLayout");
const board = document.querySelector("#board");
const boardWrap = document.querySelector(".board-wrap");
const boardMeta = document.querySelector("#boardMeta");
const turnAlarmButton = document.querySelector("#turnAlarmButton");
const statusTitle = document.querySelector("#statusTitle");
const gameStatus = document.querySelector("#gameStatus");
const playerColor = document.querySelector("#playerColor");
const drawBox = document.querySelector("#drawBox");
const drawText = document.querySelector("#drawText");
const videoGrid = document.querySelector("#videoGrid");
const localVideo = document.querySelector("#localVideo");
const remoteVideo = document.querySelector("#remoteVideo");
const localVideoLabel = document.querySelector("#localVideoLabel");
const remoteVideoLabel = document.querySelector("#remoteVideoLabel");
const videoDebug = document.querySelector("#videoDebug");
const videoDebugText = document.querySelector("#videoDebugText");
const mobileVideoDebugButton = document.querySelector("#mobileVideoDebugButton");
const videoDebugModal = document.querySelector("#videoDebugModal");
const videoDebugModalText = document.querySelector("#videoDebugModalText");
const closeVideoDebugButton = document.querySelector("#closeVideoDebugButton");
const micButton = document.querySelector("#micButton");
const opponentMuteButton = document.querySelector("#opponentMuteButton");
const gameChatForm = document.querySelector("#gameChatForm");
const gameChatInput = document.querySelector("#gameChatInput");
const gameChatMessages = document.querySelector("#gameChatMessages");
const gameChatSubmit = gameChatForm?.querySelector("button[type='submit']");
const emojiToggle = document.querySelector("#emojiToggle");
const emojiPanel = document.querySelector("#emojiPanel");
const chatStatus = document.querySelector("#chatStatus");
const teamRoster = document.querySelector("#teamRoster");
const faceFilterSelect = document.querySelector("#faceFilterSelect");
const profileButton = document.querySelector("#profileButton");
const logoutButton = document.querySelector("#logoutButton");
const settingsButton = document.querySelector("#settingsButton");
const settingsModal = document.querySelector("#settingsModal");
const closeSettingsButton = document.querySelector("#closeSettingsButton");
const boardThemeButtons = document.querySelectorAll(".board-choice");
const highlightMovesSetting = document.querySelector("#highlightMovesSetting");
const legalMovesSetting = document.querySelector("#legalMovesSetting");
const coordinatesSetting = document.querySelector("#coordinatesSetting");
const moveSoundSetting = document.querySelector("#moveSoundSetting");
const capturedPiecesSetting = document.querySelector("#capturedPiecesSetting");
const confirmActionsSetting = document.querySelector("#confirmActionsSetting");
const allowChallengesSetting = document.querySelector("#allowChallengesSetting");
const installPrompt = document.querySelector("#installPrompt");
const gameResultModal = document.querySelector("#gameResultModal");
const gameResultReason = document.querySelector("#gameResultReason");
const gameResultTitle = document.querySelector("#gameResultTitle");
const gameResultScore = document.querySelector("#gameResultScore");
const gameResultDetails = document.querySelector("#gameResultDetails");
const gameResultCloseButton = document.querySelector("#gameResultCloseButton");
const gameResultNewGameButton = document.querySelector("#gameResultNewGameButton");

const pieceMap = {
  p: "♟", r: "♜", n: "♞", b: "♝", q: "♛", k: "♚",
  P: "♙", R: "♖", N: "♘", B: "♗", Q: "♕", K: "♔"
};
const pieceArtMap = { p: "♟", r: "♜", n: "♞", b: "♝", q: "♛", k: "♚" };
const chatEmojis = [
  "😀", "😂", "😊", "😎", "🤔", "😅", "🙃", "😉", "😍", "😮", "😭", "😤",
  "👍", "👏", "🙏", "🤝", "💪", "🔥", "✨", "🎉", "🏆", "💯", "👀", "❤️",
  "♟️", "♞", "♜", "♛", "♚", "✅", "❌", "⚡", "🤯", "😬", "😇", "🥳",
  "🍓", "👑", "🎩", "🕶️", "🤣", "😱", "😜", "🥲", "😈", "🫡", "🤌", "🌟"
];

const defaultSettings = {
  boardTheme: "green",
  highlightMoves: true,
  legalMoves: true,
  coordinates: true,
  moveSound: true,
  capturedPieces: true,
  confirmActions: true,
  allowChallenges: true
};

const VIDEO_OUTPUT_WIDTH = 360;
const VIDEO_OUTPUT_HEIGHT = 270;
const VIDEO_FRAME_RATE = 20;
const VIDEO_MAX_BITRATE = 650000;
const APP_VERSION = "2026-06-18-livekit-debug-v57";
const LIVEKIT_CLIENT_URL = "https://cdn.jsdelivr.net/npm/livekit-client/+esm";
const VIDEO_CONSTRAINTS = {
  width: { ideal: VIDEO_OUTPUT_WIDTH, max: 480 },
  height: { ideal: VIDEO_OUTPUT_HEIGHT, max: 360 },
  frameRate: { ideal: VIDEO_FRAME_RATE, max: VIDEO_FRAME_RATE },
  facingMode: "user"
};

let mode = "login";
let token = localStorage.getItem("chessface:token");
let settings = loadSettings();
let socket;
let me;
let selectedTime = "5+0";
let currentGame;
let selectedSquare;
let dragMove;
let noticeTimer;
let rawLocalStream;
let localStream;
let peerConnections = new Map();
let pendingSignals = new Map();
let pendingIceCandidates = new Map();
let videoReconnectTimers = new Map();
let peerVideoElements = new Map();
let peerAudioElements = new Map();
let peerVideoTiles = new Map();
let videoPeersById = new Map();
let peerNegotiationInFlight = new Set();
let liveKitModulePromise;
let liveKitRoom;
let liveKitTrackElements = new Map();
let liveKitReconnectTimer;
let liveKitReconnectAttempts = 0;
let liveKitState = {
  mode: "not started",
  room: "",
  connectionState: "",
  localVideoPublished: false,
  localAudioPublished: false,
  remoteParticipants: 0,
  remoteVideoTracks: 0,
  remoteAudioTracks: 0,
  lastError: "",
  updatedAt: ""
};
let iceServersCache;
let matchmakingTimer;
let matchmakingIndex = 0;
let audioContext;
let pendingChallengeId;
let openChallenges = { normal: [], team: [] };
let meAudioMuted = false;
let opponentAudioMuted = false;
let currentFaceFilter = "none";
let rawLocalVideo;
let filteredLocalStream;
let filterCanvas;
let filterContext;
let filterAnimationId;
let faceLandmarker;
let faceLandmarkerPromise;
let lastFaceBox;
let deferredInstallPrompt;
let gameChat = [];
let shownResultDialogKey = "";

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("verified") === "1") {
  authNotice.textContent = "Email confirmed. You can log in now.";
}

const matchmakingCaptions = [
  "Checking video-ready opponents",
  "Scanning live player queues",
  "Preparing a face-to-face board",
  "Looking for a fair rating match",
  "Finding someone ready to play",
  "Opening a live chess table"
];

const matchmakingSlides = Array.from({ length: 30 }, (_, index) => ({
  image: `assets/matchmaking-${String(index + 1).padStart(2, "0")}.jpg`,
  caption: matchmakingCaptions[index % matchmakingCaptions.length]
}));

matchmakingSlides.forEach((slide) => {
  const image = new Image();
  image.src = slide.image;
});

document.addEventListener("pointerdown", unlockAudio, { once: true });

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").catch(() => {});
  });
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  if (!token) installPrompt?.classList.remove("hidden");
});

installPrompt?.addEventListener("click", async () => {
  if (!deferredInstallPrompt) return;
  installPrompt.classList.add("hidden");
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice.catch(() => {});
  deferredInstallPrompt = null;
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setAuthMode(tab.dataset.mode);
  });
});

passwordToggle.addEventListener("click", () => {
  const showingPassword = passwordInput.type === "text";
  passwordInput.type = showingPassword ? "password" : "text";
  passwordToggle.classList.toggle("is-visible", !showingPassword);
  passwordToggle.setAttribute("aria-label", showingPassword ? "Show password" : "Hide password");
  passwordToggle.title = showingPassword ? "Show password" : "Hide password";
});

function setAuthMode(nextMode) {
  mode = nextMode;
  tabs.forEach((item) => item.classList.toggle("active", item.dataset.mode === mode));
  authSubmit.textContent = mode === "signup" ? "Create account" : "Log in";
  avatarField.classList.toggle("hidden", mode === "login");
  signupFields.classList.toggle("hidden", mode === "login");
  loginUsernameField.classList.toggle("hidden", mode === "signup");
  authForm.querySelector("[name='username']").required = mode === "signup";
  authForm.querySelector("[name='fullName']").required = mode === "signup";
  authForm.querySelector("[name='email']").required = mode === "signup";
  authForm.querySelector("[name='emailConfirm']").required = mode === "signup";
  authForm.querySelector("[name='dateOfBirth']").required = mode === "signup";
  authForm.querySelector("[name='countryCode']").required = mode === "signup";
  authForm.querySelector("[name='loginUsername']").required = mode === "login";
  authNotice.textContent = "";
}

timeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedTime = button.dataset.time;
    timeButtons.forEach((item) => item.classList.toggle("active", item === button));
  });
});

async function readAuthResponse(response, authMode) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    try {
      return await response.json();
    } catch (error) {
      console.warn("Invalid JSON auth response", response.status, error);
      return { error: "Login failed because the server returned a webpage instead of a login response. Restart Node.js in Plesk, then try again." };
    }
  }

  const text = await response.text().catch(() => "");
  console.warn("Unexpected auth response", response.status, text.slice(0, 180));
  if (response.status === 413) {
    return { error: "Profile picture is too large. Try a smaller image." };
  }
  if (authMode === "login") {
    return { error: "Login failed because the server returned an unexpected response. Make sure Node.js is running, then try again." };
  }
  return { error: "Signup failed. Check the required fields or try a smaller profile photo." };
}

authForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  authNotice.textContent = "";
  authSubmit.disabled = true;
  try {
    const endpoint = mode === "signup" ? "/api/signup" : "/api/login";
    const formValues = Object.fromEntries(new FormData(authForm));
    const loginBody = {
      username: String(formValues.loginUsername || "").trim(),
      password: formValues.password
    };
    const options = mode === "signup"
      ? { method: "POST", body: new FormData(authForm) }
      : {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginBody)
      };
    const response = await fetch(endpoint, options);
    const data = await readAuthResponse(response, mode);
    if (!response.ok) throw new Error(data.error || "Something went wrong.");
    if (mode === "signup" && data.needsEmailVerification) {
      authForm.reset();
      setAuthMode("login");
      authNotice.textContent = data.message || "Account created. Check your email before logging in.";
      return;
    }
    token = data.token;
    me = data.user;
    localStorage.setItem("chessface:token", token);
    showApp();
  } catch (error) {
    authNotice.textContent = error.message;
  } finally {
    authSubmit.disabled = false;
  }
});

guestButton?.addEventListener("click", async () => {
  authNotice.textContent = "";
  guestButton.disabled = true;
  authSubmit.disabled = true;
  try {
    const response = await fetch("/api/guest", { method: "POST" });
    const data = await readAuthResponse(response, "guest");
    if (!response.ok) throw new Error(data.error || "Could not start guest play.");
    token = data.token;
    me = data.user;
    localStorage.setItem("chessface:token", token);
    showApp();
  } catch (error) {
    authNotice.textContent = error.message;
  } finally {
    guestButton.disabled = false;
    authSubmit.disabled = false;
  }
});

seekButton.addEventListener("click", () => {
  socket.emit("queue:join", selectedTime);
  seekButton.disabled = true;
  seekTeamButton.disabled = true;
  cancelSeekButton.classList.remove("hidden");
  showSeeking(selectedTime);
});

seekTeamButton.addEventListener("click", () => {
  socket.emit("teamQueue:join", selectedTime);
  seekButton.disabled = true;
  seekTeamButton.disabled = true;
  cancelSeekButton.classList.remove("hidden");
  showSeeking(`${selectedTime} team`);
});

playFriendButton.addEventListener("click", loadOnlineFriends);
closeFriendChallengeButton.addEventListener("click", () => friendChallengePanel.classList.add("hidden"));
acceptChallengeButton.addEventListener("click", () => {
  if (!pendingChallengeId) return;
  socket.emit("challenge:accept", pendingChallengeId);
  challengeBox.classList.add("hidden");
  pendingChallengeId = null;
});
declineChallengeButton.addEventListener("click", () => {
  if (!pendingChallengeId) return;
  socket.emit("challenge:decline", pendingChallengeId);
  challengeBox.classList.add("hidden");
  pendingChallengeId = null;
});
cancelSeekButton.addEventListener("click", () => socket.emit("queue:leave"));
cancelSeekPanelButton.addEventListener("click", () => socket.emit("queue:leave"));
document.querySelector("#offerDrawButton").addEventListener("click", () => {
  if (settings.confirmActions && !window.confirm("Offer a draw?")) return;
  socket.emit("game:draw:offer");
});
document.querySelector("#abortGameButton").addEventListener("click", () => {
  if (settings.confirmActions && !window.confirm("Abort this game? No rating will change.")) return;
  socket.emit("game:abort");
});
document.querySelector("#acceptDrawButton").addEventListener("click", () => socket.emit("game:draw:accept"));
document.querySelector("#declineDrawButton").addEventListener("click", () => socket.emit("game:draw:decline"));
document.querySelector("#resignButton").addEventListener("click", () => {
  if (settings.confirmActions && !window.confirm("Resign this game?")) return;
  socket.emit("game:resign");
});
document.querySelector("#addOpponentButton").addEventListener("click", addCurrentOpponent);
document.querySelector("#analyzeFinishedGameButton").addEventListener("click", () => {
  if (!currentGame?.id) return;
  if (me?.isGuest) {
    showAccountGate("analyze finished games and save your history");
    return;
  }
  window.open(`/analysis.html?game=${encodeURIComponent(currentGame.id)}&analyze=1`, "_blank", "noopener");
});
document.querySelector(".board-player-top").addEventListener("click", (event) => {
  if (event.currentTarget.dataset.isOpponent === "true" && currentGame?.status === "playing") addCurrentOpponent();
});
document.querySelector(".board-player-bottom").addEventListener("click", (event) => {
  if (event.currentTarget.dataset.isOpponent === "true" && currentGame?.status === "playing") addCurrentOpponent();
});
document.querySelector("#newGameButton").addEventListener("click", resetToLobby);
gameResultCloseButton?.addEventListener("click", () => gameResultModal?.classList.add("hidden"));
gameResultNewGameButton?.addEventListener("click", resetToLobby);
mobileVideoDebugButton?.addEventListener("click", () => {
  updateVideoDebug();
  videoDebugModal?.classList.remove("hidden");
});
closeVideoDebugButton?.addEventListener("click", () => videoDebugModal?.classList.add("hidden"));
videoDebugModal?.addEventListener("click", (event) => {
  if (event.target === videoDebugModal) videoDebugModal.classList.add("hidden");
});
micButton.addEventListener("click", toggleMic);
opponentMuteButton.addEventListener("click", toggleOpponentAudio);
faceFilterSelect?.addEventListener("change", () => {
  applyFaceFilterSelection(faceFilterSelect.value);
});
document.querySelector("#cameraButton").addEventListener("click", toggleCamera);
document.querySelector("#hangupVideoButton").addEventListener("click", hangupVideoCall);
document.querySelector("#requestVideoButton").addEventListener("click", () => socket.emit("video:request"));
document.querySelector("#acceptVideoButton").addEventListener("click", () => socket.emit("video:accept"));
document.querySelector("#declineVideoButton").addEventListener("click", () => socket.emit("video:decline"));
renderEmojiPicker();
emojiToggle?.addEventListener("click", () => {
  if (emojiToggle.disabled) return;
  emojiPanel.classList.toggle("hidden");
});
document.addEventListener("click", (event) => {
  if (!emojiPanel || emojiPanel.classList.contains("hidden")) return;
  if (event.target === emojiToggle || emojiPanel.contains(event.target)) return;
  emojiPanel.classList.add("hidden");
});
gameChatForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = gameChatInput.value.trim();
  if (!text || !currentGame || currentGame.status !== "playing") return;
  socket.emit("game:chat", text);
  gameChatInput.value = "";
});

function renderEmojiPicker() {
  if (!emojiPanel) return;
  emojiPanel.innerHTML = "";
  chatEmojis.forEach((emoji) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = emoji;
    button.addEventListener("click", () => insertChatEmoji(emoji));
    emojiPanel.append(button);
  });
}

function insertChatEmoji(emoji) {
  const start = gameChatInput.selectionStart ?? gameChatInput.value.length;
  const end = gameChatInput.selectionEnd ?? gameChatInput.value.length;
  const before = gameChatInput.value.slice(0, start);
  const after = gameChatInput.value.slice(end);
  const nextValue = `${before}${emoji}${after}`.slice(0, gameChatInput.maxLength || 240);
  gameChatInput.value = nextValue;
  const cursor = Math.min(nextValue.length, start + emoji.length);
  gameChatInput.focus();
  gameChatInput.setSelectionRange(cursor, cursor);
}

function requireRealAccount(action = "use this feature") {
  if (!me?.isGuest) return false;
  showNotice(`Create a free account to ${action}. Guest mode is for quick games only.`);
  return true;
}

function showAccountGate(action = "use this feature") {
  let gate = document.querySelector("#accountGate");
  if (!gate) {
    gate = document.createElement("div");
    gate.id = "accountGate";
    gate.className = "account-gate hidden";
    gate.innerHTML = `
      <section class="account-gate-card" role="dialog" aria-modal="true" aria-labelledby="accountGateTitle">
        <p class="eyebrow">Account needed</p>
        <h3 id="accountGateTitle"></h3>
        <p id="accountGateText"></p>
        <div class="account-gate-actions">
          <button type="button" class="primary" data-account-mode="signup">Create account</button>
          <button type="button" class="ghost" data-account-mode="login">Log in</button>
          <button type="button" class="ghost" data-account-close>Not now</button>
        </div>
      </section>
    `;
    gate.addEventListener("click", (event) => {
      if (event.target === gate || event.target.closest("[data-account-close]")) {
        gate.classList.add("hidden");
        return;
      }
      const modeButton = event.target.closest("[data-account-mode]");
      if (!modeButton) return;
      openAuthFromAccountGate(modeButton.dataset.accountMode);
    });
    document.body.append(gate);
  }
  gate.querySelector("#accountGateTitle").textContent = "Create a free account or log in";
  gate.querySelector("#accountGateText").textContent = `Guest games are quick temporary games. To ${action}, use a real account.`;
  gate.classList.remove("hidden");
}

function openAuthFromAccountGate(nextMode) {
  document.querySelector("#accountGate")?.classList.add("hidden");
  logout();
  setAuthMode(nextMode === "signup" ? "signup" : "login");
  authNotice.textContent = nextMode === "signup"
    ? "Create a free account to analyze games and keep your history."
    : "Log in to analyze games and keep your history.";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openProfile(event) {
  event?.preventDefault();
  if (requireRealAccount("view profiles and save your history")) return;
  window.location.assign("/profile.html");
}

profileButton.addEventListener("click", openProfile);
logoutButton.addEventListener("click", logout);
if (settingsButton && settingsModal) settingsButton.addEventListener("click", () => settingsModal.classList.remove("hidden"));
if (closeSettingsButton && settingsModal) closeSettingsButton.addEventListener("click", () => settingsModal.classList.add("hidden"));
if (settingsModal) {
  settingsModal.addEventListener("click", (event) => {
    if (event.target === settingsModal) settingsModal.classList.add("hidden");
  });
}

[
  highlightMovesSetting,
  legalMovesSetting,
  coordinatesSetting,
  moveSoundSetting,
  capturedPiecesSetting,
  confirmActionsSetting,
  allowChallengesSetting
].filter(Boolean).forEach((control) => control.addEventListener("input", updateSettingsFromControls));

boardThemeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    settings.boardTheme = button.dataset.boardTheme;
    saveSettings();
    applySettings();
    syncSettingsControls();
  });
});

async function boot() {
  if (!token) return;
  try {
    const response = await fetch("/api/me", { headers: { Authorization: `Bearer ${token}` } });
    if (!response.ok) throw new Error("Expired");
    const data = await response.json();
    me = data.user;
    showApp();
  } catch {
    localStorage.removeItem("chessface:token");
    token = null;
  }
}

function showApp() {
  authView.classList.add("hidden");
  marketingView?.classList.add("hidden");
  appView.classList.remove("hidden");
  installPrompt?.classList.add("hidden");
  document.querySelector("#myAvatar").src = me.avatarUrl;
  document.querySelector("#myCountryFlag").textContent = flagEmoji(me.countryCode);
  document.querySelector("#myName").textContent = me.username;
  document.querySelector("#myRating").textContent = `${me.rating} rating · ${me.gamesPlayed || 0} games`;
  connectSocket();
  const pendingNotice = sessionStorage.getItem("chessface:notice");
  if (pendingNotice) {
    sessionStorage.removeItem("chessface:notice");
    showNotice(pendingNotice);
  }
}

function flagEmoji(countryCode) {
  if (!countryCode || countryCode === "OTHER") return "🏳";
  return countryCode.toUpperCase().replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt()));
}

function handleErrorMessage(message) {
  if (String(message || "").toLowerCase().includes("illegal move")) {
    playIllegalMoveSound();
    if (currentGame) renderBoard(currentGame.fen, currentGame.color);
    return;
  }
  showNotice(message);
}

function connectSocket() {
  if (socket) socket.disconnect();
  socket = io({ auth: { token } });
  socket.on("connect_error", (error) => showNotice(error.message));
  socket.on("error:message", handleErrorMessage);
  socket.on("queue:waiting", (time) => {
    statusTitle.textContent = `Seeking ${time}`;
    showSeeking(time);
  });
  socket.on("queue:left", () => {
    statusTitle.textContent = "Choose a time control";
    seekButton.disabled = false;
    seekTeamButton.disabled = false;
    cancelSeekButton.classList.add("hidden");
    hideSeeking();
  });
  socket.on("teamQueue:waiting", (time) => {
    statusTitle.textContent = `Seeking ${time} team`;
    showSeeking(`${time} team`);
  });
  socket.on("openChallenges:update", (payload) => {
    openChallenges = payload || { normal: [], team: [] };
    renderOpenChallenges();
  });
  socket.on("friend:request", ({ from }) => showNotice(`${from.username} sent you a friend request. Open Friends to accept.`));
  socket.on("friend:accepted", ({ by }) => showNotice(`${by.username} accepted your friend request.`));
  socket.on("challenge:sent", ({ to, timeControl }) => showNotice(`Challenge sent to ${to} for ${timeControl}.`));
  socket.on("challenge:declined", ({ from }) => showNotice(`${from} declined your challenge.`));
  socket.on("challenge:received", ({ id, from, timeControl }) => {
    if (!settings.allowChallenges) {
      socket.emit("challenge:decline", id);
      return;
    }
    pendingChallengeId = id;
    challengeText.textContent = `${from.username} challenged you to ${timeControl}.`;
    challengeBox.classList.remove("hidden");
  });
  socket.on("match:found", enterGame);
  socket.on("active-game:found", async (game) => {
    showNotice("Active game restored.");
    await enterGame(game);
  });
  socket.on("game:update", renderGame);
  socket.on("game:chat", addGameChatMessage);
  socket.on("webrtc:signal", handleSignal);
  socket.on("webrtc:start", ({ gameId, peerId, initiator }) => {
    if (!currentGame || currentGame.id !== gameId || currentGame.videoOff || liveKitRoom || requiresLiveKitVideo(currentGame)) return;
    beginWebrtcNegotiation(peerId || currentGame.videoPeerId, Boolean(initiator));
  });
  socket.on("webrtc:reset", async ({ gameId }) => {
    if (!currentGame || currentGame.id !== gameId || currentGame.videoOff || currentGame.status !== "playing") return;
    await startMediaAndPeer();
  });
  socket.on("video:hangup", () => {
    closePeer();
    markVideoOffLocally();
    showNotice("Video call ended. The chess game continues.");
  });
  socket.on("video:restart", async () => {
    if (!currentGame || currentGame.status !== "playing") return;
    currentGame = { ...currentGame, videoOff: false, videoRequestFrom: null };
    renderVideoControls(currentGame);
    await startMediaAndPeer();
  });
}

async function enterGame(game) {
  currentGame = game;
  gameChat = [];
  renderGameChat();
  hideSeeking();
  lobby.classList.add("hidden");
  friendChallengePanel.classList.add("hidden");
  challengeBox.classList.add("hidden");
  gameLayout.classList.remove("hidden");
  seekButton.disabled = false;
  seekTeamButton.disabled = false;
  cancelSeekButton.classList.add("hidden");
  renderGame(game);
  await startMediaAndPeer();
}

async function loadOnlineFriends() {
  if (requireRealAccount("challenge friends")) return;
  friendChallengePanel.classList.remove("hidden");
  onlineFriendsList.innerHTML = '<p class="muted-line">Loading online friends...</p>';
  const response = await fetch("/api/friends/online", { headers: { Authorization: `Bearer ${token}` } });
  const data = await response.json().catch(() => ({ friends: [] }));
  if (!response.ok) {
    onlineFriendsList.innerHTML = '<p class="muted-line">Could not load friends.</p>';
    return;
  }
  if (!data.friends.length) {
    onlineFriendsList.innerHTML = '<p class="muted-line">No friends online right now.</p>';
    return;
  }
  onlineFriendsList.innerHTML = "";
  data.friends.forEach((friend) => {
    const row = document.createElement("button");
    row.type = "button";
    row.className = "online-friend-row";
    row.innerHTML = `
      <img src="${friend.avatarUrl || "/default-avatar.svg"}" alt="" />
      <span>${flagEmoji(friend.countryCode)} ${friend.username}</span>
      <b>${friend.rating}</b>
    `;
    row.addEventListener("click", () => {
      socket.emit("challenge:send", { friendId: friend.id, timeControl: selectedTime });
      friendChallengePanel.classList.add("hidden");
    });
    onlineFriendsList.append(row);
  });
}

function renderOpenChallenges() {
  if (!openChallengeList || !openChallengeCount) return;
  const normal = openChallenges.normal || [];
  const team = openChallenges.team || [];
  const total = normal.length + team.length;
  openChallengeCount.textContent = `${total} waiting`;
  openChallengeList.innerHTML = "";

  if (!total) {
    const empty = document.createElement("p");
    empty.className = "muted-line";
    empty.textContent = "No open games yet. Create one and other players will see it here.";
    openChallengeList.append(empty);
    return;
  }

  normal.forEach((challenge) => {
    const isMine = challenge.host?.id === me?.id;
    const row = document.createElement("article");
    row.className = "open-challenge-row";
    const avatar = document.createElement("img");
    avatar.src = challenge.host?.avatarUrl || "/default-avatar.svg";
    avatar.alt = "";
    const body = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = `${flagEmoji(challenge.host?.countryCode)} ${challenge.host?.username || "Player"}`;
    const meta = document.createElement("span");
    meta.textContent = `${challenge.timeControl} one-on-one game`;
    body.append(title, meta);
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = isMine ? "Cancel" : "Join";
    button.addEventListener("click", () => {
      if (isMine) {
        socket.emit("queue:leave");
        return;
      }
      socket.emit("openChallenge:join", {
        mode: "normal",
        timeControl: challenge.timeControl,
        hostSocketId: challenge.id
      });
    });
    row.append(avatar, body, button);
    openChallengeList.append(row);
  });

  team.forEach((challenge) => {
    const alreadyJoined = challenge.players?.some((player) => player.id === me?.id);
    const row = document.createElement("article");
    row.className = "open-challenge-row team-open-row";
    const icon = document.createElement("div");
    icon.className = "team-open-icon";
    icon.textContent = "2v2";
    const body = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = `${challenge.timeControl} four-player team game`;
    const meta = document.createElement("span");
    const playerNames = (challenge.players || []).map((player) => `${flagEmoji(player.countryCode)} ${player.username}`).join(", ");
    meta.textContent = `${challenge.joined}/4 joined${playerNames ? ` · ${playerNames}` : ""}`;
    body.append(title, meta);
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = alreadyJoined ? "Cancel" : "Join";
    button.addEventListener("click", () => {
      if (alreadyJoined) {
        socket.emit("queue:leave");
        return;
      }
      socket.emit("openChallenge:join", {
        mode: "team",
        timeControl: challenge.timeControl,
        hostSocketId: challenge.id
      });
    });
    row.append(icon, body, button);
    openChallengeList.append(row);
  });
}

function showSeeking(timeControl) {
  seekingTitle.textContent = `Searching for a ${timeControl} match`;
  lobby.classList.add("hidden");
  seekingPanel.classList.remove("hidden");
  gameLayout.classList.add("hidden");
  startMatchmakingRotation();
}

function hideSeeking() {
  stopMatchmakingRotation();
  seekingPanel.classList.add("hidden");
  if (!currentGame) lobby.classList.remove("hidden");
}

function startMatchmakingRotation() {
  if (matchmakingTimer) return;
  applyMatchmakingSlide(matchmakingIndex);
  matchmakingTimer = setInterval(() => {
    matchmakingIndex = (matchmakingIndex + 1) % matchmakingSlides.length;
    matchmakingImage.classList.add("is-switching");
    setTimeout(() => {
      applyMatchmakingSlide(matchmakingIndex);
      matchmakingImage.classList.remove("is-switching");
    }, 120);
  }, 650);
}

function stopMatchmakingRotation() {
  clearInterval(matchmakingTimer);
  matchmakingTimer = null;
  matchmakingImage.classList.remove("is-switching");
}

function applyMatchmakingSlide(index) {
  const slide = matchmakingSlides[index];
  matchmakingImage.src = slide.image;
  matchmakingCaption.textContent = slide.caption;
}

function renderGame(game) {
  const previousFen = currentGame?.fen;
  currentGame = game;
  gameLayout?.classList.toggle("team-game-layout", game.kind === "team");
  boardWrap?.classList.toggle("team-game", game.kind === "team");
  boardMeta?.classList.toggle("team-turn-panel", game.kind === "team");
  if (previousFen && previousFen !== game.fen) {
    finishPieceDrag();
    selectedSquare = null;
  }
  if (previousFen && previousFen !== game.fen && settings.moveSound) playMoveSound();
  statusTitle.textContent = game.status === "playing"
    ? `${game.timeControl}${game.kind === "team" ? " team" : ""} game`
    : "Game over";
  gameStatus.textContent = statusText(game);
  playerColor.textContent = playerTurnText(game);
  renderBoardPlayers(game);
  renderTeamRoster(game);
  updateOpponentProfileActions(game);
  renderBoard(game.fen, game.color);
  renderVideoControls(game);
  if (liveKitRoom && game.status === "playing" && !game.videoOff) scheduleLiveKitSync(liveKitRoom);
  if (!requiresLiveKitVideo(game)) syncPeerNegotiations();
  updateVideoDebug();
  renderChatState(game);

  const drawFromOpponent = game.drawOfferFrom && game.drawOfferFrom !== me.id && game.status === "playing";
  const drawFromMe = game.drawOfferFrom === me.id && game.status === "playing";
  drawBox.classList.toggle("hidden", !drawFromOpponent && !drawFromMe);
  drawText.textContent = drawFromOpponent ? "Opponent offered a draw." : "Draw offer sent.";
  document.querySelector("#acceptDrawButton").classList.toggle("hidden", !drawFromOpponent);
  document.querySelector("#declineDrawButton").classList.toggle("hidden", !drawFromOpponent);
  document.querySelector("#offerDrawButton").disabled = game.status !== "playing" || drawFromMe;
  document.querySelector("#abortGameButton").classList.toggle("hidden", !game.canAbort);
  const myTurn = isMyTurn(game);
  turnAlarmButton?.classList.toggle("hidden", !(myTurn && game.kind === "team"));
  document.querySelector("#resignButton").disabled = !myTurn;
  document.querySelector("#resignButton").title = myTurn ? "" : "Only the player whose turn it is can resign.";
  const addOpponentButton = document.querySelector("#addOpponentButton");
  const opponent = opponentForGame(game);
  addOpponentButton.disabled = game.status !== "playing" || game.kind === "team" || isGuestPlayer(opponent);
  addOpponentButton.title = isGuestPlayer(opponent)
    ? "Guest players need accounts before they can receive friend requests."
    : "";
  document.querySelector("#analyzeFinishedGameButton").classList.toggle("hidden", game.status !== "finished");
  document.querySelector("#newGameButton").classList.toggle("hidden", game.status === "playing");

  if (game.status === "finished") {
    maybeShowGameResultDialog(game);
    if (game.kind !== "team") {
      me.rating = game.color === "white" ? game.players.white.rating : game.players.black.rating;
      me.gamesPlayed = (me.gamesPlayed || 0) + 1;
      document.querySelector("#myRating").textContent = `${me.rating} rating · ${me.gamesPlayed} games`;
    }
    closePeer();
  }
}

function maybeShowGameResultDialog(game) {
  if (!gameResultModal || !["checkmate", "draw", "agreement", "timeout"].includes(game.reason)) return;
  const key = `${game.id}:${game.result}:${game.reason}`;
  if (shownResultDialogKey === key) return;
  shownResultDialogKey = key;

  const score = gameResultScoreText(game.result);
  const isDraw = game.result === "draw";
  const won = !isDraw && game.result === game.color;
  const winningSide = game.result === "white" ? "White" : game.result === "black" ? "Black" : "";
  const losingSide = game.result === "white" ? "Black" : game.result === "black" ? "White" : "";
  const sideLabel = game.kind === "team" ? " team" : "";

  if (game.reason === "timeout") {
    gameResultReason.textContent = `${losingSide}${sideLabel} lost on time`;
    gameResultTitle.textContent = won ? "You won" : "You lost on time";
    gameResultScore.textContent = score;
    gameResultDetails.textContent = won
      ? `${winningSide}${sideLabel} won because ${losingSide}${sideLabel} ran out of time.`
      : `${winningSide}${sideLabel} won because ${losingSide}${sideLabel} ran out of time.`;
    gameResultModal.classList.remove("hidden");
    return;
  }

  gameResultReason.textContent = isDraw ? "Game drawn" : "Checkmate";
  gameResultTitle.textContent = isDraw ? "Draw" : won ? "You won" : "You lost";
  gameResultScore.textContent = score;
  gameResultDetails.textContent = isDraw ? `Final score ${score}` : `${score} by checkmate`;
  gameResultModal.classList.remove("hidden");
}

function gameResultScoreText(result) {
  if (result === "white") return "1-0";
  if (result === "black") return "0-1";
  if (result === "draw") return "1/2-1/2";
  return "*";
}

function playerTurnText(game) {
  if (game.kind !== "team") return `You are ${game.color}`;
  if (game.status !== "playing") return `You played for the ${game.color} team`;
  if (game.turn !== game.color) return `${game.turn === "white" ? "White" : "Black"} team to move`;
  if (game.activePlayerId === me.id) return `Your move for the ${game.color} team`;
  return `${game.activePlayerName || "Your teammate"} moves for your team`;
}

function isMyTurn(game) {
  if (!game || game.status !== "playing") return false;
  if (game.kind === "team") return game.activePlayerId === me.id;
  return game.turn === game.color;
}

function renderChatState(game) {
  const live = game.status === "playing";
  chatStatus.textContent = live ? (game.kind === "team" ? "Team chat" : "Live") : "Closed";
  gameChatInput.disabled = !live;
  if (gameChatSubmit) gameChatSubmit.disabled = !live;
  if (emojiToggle) emojiToggle.disabled = !live;
  if (!live) emojiPanel?.classList.add("hidden");
}

function addGameChatMessage(message) {
  if (!currentGame || message.gameId !== currentGame.id) return;
  gameChat.push(message);
  gameChat = gameChat.slice(-80);
  renderGameChat();
}

function renderGameChat() {
  gameChatMessages.innerHTML = "";
  if (!gameChat.length) {
    const empty = document.createElement("p");
    empty.className = "chat-empty";
    empty.textContent = "Say hi, ask for a rematch, or just enjoy the game.";
    gameChatMessages.append(empty);
    return;
  }
  gameChat.forEach((message) => {
    const row = document.createElement("div");
    const isMine = message.from === me.id;
    row.className = `chat-message ${isMine ? "mine" : "theirs"}`;
    const name = document.createElement("strong");
    name.textContent = isMine ? "You" : message.username;
    const text = document.createElement("span");
    text.textContent = message.text;
    row.append(name, text);
    gameChatMessages.append(row);
  });
  gameChatMessages.scrollTop = gameChatMessages.scrollHeight;
}

function updateOpponentProfileActions(game) {
  const whiteCard = document.querySelector(".board-player-bottom");
  const blackCard = document.querySelector(".board-player-top");
  if (game.kind === "team") {
    whiteCard.classList.remove("opponent-profile-card");
    blackCard.classList.remove("opponent-profile-card");
    whiteCard.dataset.isOpponent = "false";
    blackCard.dataset.isOpponent = "false";
    whiteCard.title = "";
    blackCard.title = "";
    return;
  }
  [whiteCard, blackCard].forEach((card) => {
    const color = card.dataset.color;
    const isOpponent = card.dataset.isOpponent === "true" && game.status === "playing";
    card.classList.toggle("opponent-profile-card", isOpponent);
    card.title = isOpponent && color ? opponentFriendTitle(game.players[color]) : "";
  });
}

function opponentFriendTitle(player) {
  return isGuestPlayer(player)
    ? "Guest players need accounts before friend requests."
    : "Click to send a friend request";
}

function renderVideoControls(game) {
  renderVideoTiles(game);
  const requestFromMe = game.videoRequestFrom === me.id;
  const requestFromOpponent = game.videoRequestFrom && game.videoRequestFrom !== me.id;
  mobileVideoDebugButton?.classList.toggle("hidden", game.status !== "playing");
  document.querySelector("#hangupVideoButton").classList.toggle("hidden", game.videoOff || game.status !== "playing");
  opponentMuteButton.classList.toggle("hidden", game.videoOff || game.status !== "playing");
  micButton.classList.toggle("hidden", game.videoOff || game.status !== "playing");
  document.querySelector("#cameraButton").classList.toggle("hidden", game.videoOff || game.status !== "playing");
  document.querySelector("#requestVideoButton").classList.toggle("hidden", !game.videoOff || requestFromMe || requestFromOpponent || game.status !== "playing");
  const acceptVideoButton = document.querySelector("#acceptVideoButton");
  acceptVideoButton.classList.toggle("hidden", !requestFromOpponent);
  acceptVideoButton.classList.toggle("video-request-alert", Boolean(requestFromOpponent));
  document.querySelector("#declineVideoButton").classList.toggle("hidden", !requestFromOpponent);
  if (game.videoOff) {
    closePeer();
    const message = requestFromMe ? "Waiting for opponent to accept video." : requestFromOpponent ? "Opponent wants to turn video back on." : "Video call is off. The chess game continues.";
    remoteVideo.removeAttribute("src");
    localVideo.removeAttribute("src");
    remoteVideo.poster = "";
    localVideo.poster = "";
    playerColor.textContent = message;
  }
  applyOpponentAudioState();
  updateVideoDebug();
}

function renderVideoTiles(game) {
  if (!videoGrid) return;
  const peers = videoPeers(game);
  videoPeersById = new Map(peers.map((peer) => [peer.id, peer]));
  videoGrid.classList.toggle("team-video-grid", game.kind === "team");
  videoGrid.classList.toggle("is-video-off", Boolean(game.videoOff));
  const primaryPeer = game.kind === "team"
    ? peers.find((peer) => !peer.isTeammate) || peers[0]
    : peers[0];
  const activePeerIds = new Set(peers.map((peer) => peer.id));
  const primaryTile = remoteVideo.closest(".video-tile");
  peerVideoTiles.forEach((tile, peerId) => {
    if (!activePeerIds.has(peerId) || (tile === primaryTile && peerId !== primaryPeer?.id)) {
      if (tile !== primaryTile) {
        tile.remove();
      } else {
        remoteVideo.srcObject = null;
      }
      peerVideoTiles.delete(peerId);
      peerVideoElements.delete(peerId);
      peerAudioElements.get(peerId)?.remove();
      peerAudioElements.delete(peerId);
    }
  });
  primaryTile?.classList.toggle("hidden", !primaryPeer);
  if (primaryPeer) {
    attachPeerVideoElement(primaryPeer.id, remoteVideo, primaryTile);
    renderVideoTile(primaryTile, remoteVideoLabel, primaryPeer);
  }
  localVideoLabel.textContent = game.kind === "team" ? `${flagEmoji(me.countryCode)} You · ${game.color} team` : "You";
  localVideo.closest(".video-tile")?.classList.toggle("is-my-team", game.kind === "team");
  localVideo.closest(".video-tile")?.classList.toggle("is-opponent-team", false);
  const extraPeers = peers.filter((peer) => peer.id !== primaryPeer?.id);
  extraPeers.sort((a, b) => Number(a.isTeammate) - Number(b.isTeammate));
  extraPeers.forEach((peer) => {
    const tile = ensurePeerVideoTile(peer);
    renderVideoTile(tile, tile.querySelector("span"), peer);
  });
}

function videoPeers(game) {
  if (!game) return [];
  if (Array.isArray(game.videoPeers) && game.videoPeers.length) return game.videoPeers;
  const opponent = opponentForGame(game);
  return opponent ? [{
    id: opponent.id,
    username: opponent.username,
    avatarUrl: opponent.avatarUrl,
    countryCode: opponent.countryCode || "OTHER",
    isTeammate: false,
    teamColor: game.color === "white" ? "black" : "white"
  }] : [];
}

function ensurePeerVideoTile(peer) {
  let tile = peerVideoTiles.get(peer.id);
  if (tile) return tile;
  tile = document.createElement("div");
  tile.className = "video-tile team-video-tile";
  tile.dataset.peerId = peer.id;
  const video = document.createElement("video");
  prepareVideoElement(video, { muted: true });
  const label = document.createElement("span");
  tile.append(video, label);
  videoGrid.append(tile);
  attachPeerVideoElement(peer.id, video, tile);
  return tile;
}

function prepareVideoElement(video, options = {}) {
  if (!video) return;
  video.autoplay = true;
  video.playsInline = true;
  video.setAttribute("autoplay", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  if (options.muted) {
    video.muted = true;
    video.volume = 0;
    video.setAttribute("muted", "");
  }
}

function attachPeerVideoElement(peerId, video, tile) {
  prepareVideoElement(video, { muted: true });
  peerVideoElements.set(peerId, video);
  if (tile) peerVideoTiles.set(peerId, tile);
}

function ensurePeerAudioElement(peerId, tile) {
  let audio = peerAudioElements.get(peerId);
  if (audio) return audio;
  audio = document.createElement("audio");
  audio.autoplay = true;
  audio.playsInline = true;
  audio.dataset.peerId = peerId;
  (tile || videoGrid)?.append(audio);
  peerAudioElements.set(peerId, audio);
  return audio;
}

function renderVideoTile(tile, label, peer) {
  if (!tile || !label || !peer) return;
  tile.classList.toggle("is-my-team", Boolean(peer.isTeammate));
  tile.classList.toggle("is-opponent-team", !peer.isTeammate);
  const role = peer.isTeammate ? "teammate" : "opponent";
  const team = peer.teamName || `${peer.teamColor || "other"} team`;
  label.textContent = `${flagEmoji(peer.countryCode)} ${peer.username} · ${team} · ${role}`;
}

function renderTeamRoster(game) {
  if (!teamRoster) return;
  if (game.kind !== "team" || !game.teams) {
    teamRoster.classList.add("hidden");
    teamRoster.innerHTML = "";
    return;
  }
  teamRoster.classList.remove("hidden");
  teamRoster.innerHTML = "";
  [["white team", game.teams.white, "white"], ["black team", game.teams.black, "black"]].forEach(([label, players, color]) => {
    const group = document.createElement("div");
    group.className = "team-roster-group";
    group.classList.toggle("is-my-team", color === game.color);
    const title = document.createElement("strong");
    title.textContent = color === game.color ? `${label} · your team` : label;
    group.append(title);
    players.forEach((player) => {
      const card = document.createElement("span");
      card.className = "team-roster-player";
      card.classList.toggle("active", player.id === game.activePlayerId);
      card.textContent = `${flagEmoji(player.countryCode)} ${player.username}`;
      group.append(card);
    });
    teamRoster.append(group);
  });
}

function renderBoardPlayers(game) {
  const bottomColor = game.color === "black" ? "black" : "white";
  const topColor = bottomColor === "white" ? "black" : "white";
  renderPlayerSlot("top", topColor, game.players[topColor], game.clocks[topColor], topColor !== game.color);
  renderPlayerSlot("bottom", bottomColor, game.players[bottomColor], game.clocks[bottomColor], false);
}

function renderPlayerSlot(position, color, player, clock, isOpponent) {
  const card = document.querySelector(`.board-player-${position}`);
  if (!card || !player) return;
  card.dataset.color = color;
  card.dataset.isOpponent = String(Boolean(isOpponent));
  const avatar = card.querySelector("img");
  const flag = card.querySelector("strong span:first-child");
  const name = card.querySelector("strong span:last-child");
  const rating = card.querySelector("div > span:not(.captured-row)");
  const captured = card.querySelector(".captured-row");
  const clockNode = card.querySelector("b");
  if (avatar) {
    avatar.id = `${color}Avatar`;
    avatar.src = player.avatarUrl;
  }
  if (flag) {
    flag.id = `${color}Flag`;
    flag.textContent = flagEmoji(player.countryCode);
  }
  if (name) {
    name.id = `${color}Name`;
    name.textContent = player.username;
  }
  if (rating) {
    rating.id = `${color}Rating`;
    rating.textContent = `${player.rating} rating`;
  }
  if (captured) captured.id = `${color}Captured`;
  if (clockNode) {
    clockNode.id = `${color}Clock`;
    clockNode.textContent = formatClock(clock);
  }
}

function renderBoard(fen, color) {
  board.innerHTML = "";
  board.classList.toggle("show-coordinates", settings.coordinates);
  board.dataset.orientation = color;
  const rows = fen.split(" ")[0].split("/");
  const ranks = color === "white" ? [8, 7, 6, 5, 4, 3, 2, 1] : [1, 2, 3, 4, 5, 6, 7, 8];
  const files = color === "white" ? ["a", "b", "c", "d", "e", "f", "g", "h"] : ["h", "g", "f", "e", "d", "c", "b", "a"];
  const pieceAt = {};

  rows.forEach((row, index) => {
    let fileIndex = 0;
    for (const char of row) {
      if (Number.isInteger(Number(char))) {
        fileIndex += Number(char);
      } else {
        pieceAt[`${"abcdefgh"[fileIndex]}${8 - index}`] = char;
        fileIndex += 1;
      }
    }
  });
  renderCapturedPieces(pieceAt);

  for (const rank of ranks) {
    for (const file of files) {
      const squareName = `${file}${rank}`;
      const square = document.createElement("button");
      square.className = `square ${((files.indexOf(file) + ranks.indexOf(rank)) % 2 === 0) ? "light" : "dark"}`;
      if (pieceAt[squareName]) square.classList.add(pieceAt[squareName] === pieceAt[squareName].toUpperCase() ? "white-piece" : "black-piece");
      if (selectedSquare === squareName) square.classList.add("selected");
      if (settings.highlightMoves && currentGame?.lastMove && (currentGame.lastMove.from === squareName || currentGame.lastMove.to === squareName)) {
        square.classList.add("last-move");
      }
      if (settings.legalMoves && selectedSquare && currentGame?.legalMoves?.some((move) => move.from === selectedSquare && move.to === squareName)) {
        square.classList.add("target");
      }
      square.dataset.square = squareName;
      square.dataset.file = file;
      square.dataset.rank = rank;
      square.draggable = false;
      if (pieceAt[squareName]) square.append(renderPieceImage(pieceAt[squareName]));
      square.addEventListener("pointerdown", (event) => startPieceDrag(event, squareName, pieceAt[squareName]));
      board.appendChild(square);
    }
  }
  if (settings.coordinates) renderBoardCoordinates(files, ranks);
}

function renderPieceImage(piece) {
  if (window.ChessFacePieces?.render) return window.ChessFacePieces.render(piece);
  const fallback = document.createElement("span");
  fallback.className = "piece-img";
  fallback.textContent = pieceMap[piece] || "";
  return fallback;
}

function renderBoardCoordinates(files, ranks) {
  files.forEach((file, index) => {
    const label = document.createElement("span");
    label.className = "board-coordinate file-label";
    label.style.left = `calc(var(--board-pad) + (100% - var(--board-pad) * 2) * ${index + 0.5} / 8)`;
    label.textContent = file;
    board.append(label);
  });
  ranks.forEach((rank, index) => {
    const label = document.createElement("span");
    label.className = "board-coordinate rank-label";
    label.style.top = `calc(var(--board-pad) + (100% - var(--board-pad) * 2) * ${index + 0.5} / 8)`;
    label.textContent = rank;
    board.append(label);
  });
}

function handleSquareClick(square, piece) {
  if (!currentGame || currentGame.status !== "playing") return;
  if (!selectedSquare) {
    if (!piece) return;
    if (!canMovePiece(piece)) {
      showMoveBlockedNotice(piece);
      return;
    }
    selectedSquare = square;
    renderBoard(currentGame.fen, currentGame.color);
    return;
  }
  if (selectedSquare === square) {
    selectedSquare = null;
    renderBoard(currentGame.fen, currentGame.color);
    return;
  }
  makeMove(selectedSquare, square);
  selectedSquare = null;
}

function canMovePiece(piece) {
  if (!piece || !currentGame || currentGame.status !== "playing") return false;
  return isOwnPiece(piece);
}

function makeMove(from, to) {
  if (!from || !to || from === to) return;
  if (!isLegalMove(from, to)) {
    playIllegalMoveSound();
    if (currentGame) renderBoard(currentGame.fen, currentGame.color);
    return;
  }
  socket.emit("game:move", { from, to, promotion: "q" });
}

function startPieceDrag(event, square, piece) {
  if (event.button !== undefined && event.button !== 0) return;
  if (!currentGame || currentGame.status !== "playing") return;

  if (selectedSquare && selectedSquare !== square && (!piece || !isOwnPiece(piece))) {
    event.preventDefault();
    moveSelectedPieceTo(square);
    return;
  }

  if (!piece) return;
  if (!canMovePiece(piece)) {
    event.preventDefault();
    showMoveBlockedNotice(piece);
    return;
  }

  const pieceImage = event.currentTarget.querySelector(".piece-img");
  if (!pieceImage) return;
  if (dragMove) finishPieceDrag();
  event.preventDefault();
  event.currentTarget.setPointerCapture?.(event.pointerId);
  const wasSelected = selectedSquare === square;
  selectedSquare = square;
  dragMove = {
    pointerId: event.pointerId,
    from: square,
    piece,
    startX: event.clientX,
    startY: event.clientY,
    moved: false,
    wasSelected,
    source: event.currentTarget,
    ghost: null
  };
  dragMove.source.classList.add("dragging-source", "selected");
  document.addEventListener("pointermove", dragPiece, true);
  document.addEventListener("pointerup", dropPiece, true);
  document.addEventListener("pointercancel", cancelPieceDrag, true);
}

function dragPiece(event) {
  if (!dragMove || event.pointerId !== dragMove.pointerId) return;
  event.preventDefault();
  const distance = Math.hypot(event.clientX - dragMove.startX, event.clientY - dragMove.startY);
  if (!dragMove.moved && distance < 12) return;
  if (!dragMove.moved) {
    dragMove.moved = true;
    dragMove.ghost = renderPieceImage(dragMove.piece);
    dragMove.ghost.classList.add("piece-drag-ghost");
    document.body.append(dragMove.ghost);
  }
  moveDragGhost(event.clientX, event.clientY);
  highlightDragTarget(squareFromClientPoint(event.clientX, event.clientY));
}

function dropPiece(event) {
  if (!dragMove || event.pointerId !== dragMove.pointerId) return;
  const wasTap = !dragMove.moved;
  const target = dragMove.moved ? squareFromClientPoint(event.clientX, event.clientY) : null;
  const from = dragMove.from;
  const wasSelected = dragMove.wasSelected;
  finishPieceDrag();
  if (wasTap) {
    selectedSquare = wasSelected ? null : from;
    renderBoard(currentGame.fen, currentGame.color);
    return;
  }
  if (target && target !== from) {
    selectedSquare = null;
    makeMove(from, target);
    return;
  }
  selectedSquare = from;
  renderBoard(currentGame.fen, currentGame.color);
}

function cancelPieceDrag() {
  selectedSquare = null;
  finishPieceDrag();
  if (currentGame) renderBoard(currentGame.fen, currentGame.color);
}

function finishPieceDrag() {
  if (!dragMove) return;
  const move = dragMove;
  dragMove = null;
  try {
    if (move.source?.hasPointerCapture?.(move.pointerId)) move.source.releasePointerCapture(move.pointerId);
  } catch {
    // The board can re-render while a pointer is active; cleanup should still complete.
  }
  move.source?.classList.remove("dragging-source", "selected");
  move.ghost?.remove();
  document.querySelectorAll(".square.drag-over").forEach((item) => item.classList.remove("drag-over"));
  document.removeEventListener("pointermove", dragPiece, true);
  document.removeEventListener("pointerup", dropPiece, true);
  document.removeEventListener("pointercancel", cancelPieceDrag, true);
}

function moveSelectedPieceTo(targetSquare) {
  const from = selectedSquare;
  selectedSquare = null;
  renderBoard(currentGame.fen, currentGame.color);
  makeMove(from, targetSquare);
}

function isOwnPiece(piece) {
  if (!piece || !currentGame) return false;
  const isWhitePiece = piece === piece.toUpperCase();
  return (currentGame.color === "white") === isWhitePiece;
}

function showMoveBlockedNotice(piece) {
  if (!currentGame || currentGame.status !== "playing") return;
  if (currentGame.turn !== currentGame.color) {
    showNotice(`${currentGame.turn === "white" ? "White" : "Black"} to move.`);
    return;
  }
  if (currentGame.kind === "team" && currentGame.activePlayerId !== me.id) {
    showNotice(`${currentGame.activePlayerName || "Your teammate"} moves for your team.`);
    return;
  }
  if (piece) showNotice("Pick one of your pieces.");
}

function moveDragGhost(clientX, clientY) {
  if (!dragMove?.ghost) return;
  dragMove.ghost.style.left = `${clientX}px`;
  dragMove.ghost.style.top = `${clientY}px`;
}

function highlightDragTarget(square) {
  document.querySelectorAll(".square.drag-over").forEach((item) => item.classList.remove("drag-over"));
  if (!square) return;
  board.querySelector(`[data-square="${square}"]`)?.classList.add("drag-over");
}

function squareFromClientPoint(clientX, clientY) {
  const square = squareFromPoint(clientX, clientY);
  if (square) return square;
  const element = document.elementFromPoint(clientX, clientY)?.closest?.(".square");
  return element && board.contains(element) ? element.dataset.square : null;
}

function squareFromPoint(clientX, clientY) {
  const rect = board.getBoundingClientRect();
  const pad = Number.parseFloat(getComputedStyle(board).getPropertyValue("--board-pad")) || 0;
  const left = rect.left + pad;
  const top = rect.top + pad;
  const size = rect.width - pad * 2;
  if (clientX < left || clientX > left + size || clientY < top || clientY > top + size) return null;
  const fileIndex = Math.min(7, Math.max(0, Math.floor(((clientX - left) / size) * 8)));
  const rankIndex = Math.min(7, Math.max(0, Math.floor(((clientY - top) / size) * 8)));
  const files = currentGame?.color === "black" ? ["h", "g", "f", "e", "d", "c", "b", "a"] : ["a", "b", "c", "d", "e", "f", "g", "h"];
  const ranks = currentGame?.color === "black" ? [1, 2, 3, 4, 5, 6, 7, 8] : [8, 7, 6, 5, 4, 3, 2, 1];
  return `${files[fileIndex]}${ranks[rankIndex]}`;
}

function isLegalMove(from, to) {
  if (!currentGame?.legalMoves?.length) return true;
  return currentGame.legalMoves.some((move) => move.from === from && move.to === to);
}

function requiresLiveKitVideo(game = currentGame) {
  return game?.kind === "team";
}

function setLiveKitState(patch = {}) {
  liveKitState = {
    ...liveKitState,
    ...patch,
    updatedAt: new Date().toLocaleTimeString()
  };
  updateVideoDebug();
}

function liveKitRemoteParticipants(room = liveKitRoom) {
  const remote = room?.remoteParticipants;
  if (!remote) return [];
  if (remote instanceof Map) return [...remote.values()];
  if (typeof remote.forEach === "function") {
    const participants = [];
    remote.forEach((participant) => participants.push(participant));
    return participants;
  }
  return Array.isArray(remote) ? remote : Object.values(remote);
}

function liveKitPublicationKind(publication) {
  const source = String(publication?.source || "").toLowerCase();
  const kind = String(publication?.kind || publication?.track?.kind || publication?.track?.mediaStreamTrack?.kind || "").toLowerCase();
  if (kind === "video" || source === "camera") return "video";
  if (kind === "audio" || source === "microphone") return "audio";
  return kind || source || "unknown";
}

function refreshLiveKitState(room = liveKitRoom, patch = {}) {
  const participants = liveKitRemoteParticipants(room);
  let remoteVideoTracks = 0;
  let remoteAudioTracks = 0;
  participants.forEach((participant) => {
    liveKitPublications(participant).forEach((publication) => {
      const kind = liveKitPublicationKind(publication);
      if (kind === "video" && (publication.track || publication.isSubscribed)) remoteVideoTracks += 1;
      if (kind === "audio" && (publication.track || publication.isSubscribed)) remoteAudioTracks += 1;
    });
  });
  setLiveKitState({
    connectionState: String(room?.state || room?.connectionState || "not connected"),
    remoteParticipants: participants.length,
    remoteVideoTracks,
    remoteAudioTracks,
    ...patch
  });
  scheduleLiveKitRepair(room, participants.length);
}

function scheduleLiveKitRepair(room, remoteParticipantCount) {
  if (!room || liveKitRoom !== room || !currentGame || currentGame.videoOff || currentGame.status !== "playing") return;
  const expectedRemote = videoPeers(currentGame).length;
  if (!expectedRemote) return;
  if (remoteParticipantCount > 0) {
    liveKitReconnectAttempts = 0;
    clearTimeout(liveKitReconnectTimer);
    liveKitReconnectTimer = null;
    return;
  }
  if (liveKitReconnectTimer || liveKitReconnectAttempts >= 3) return;
  liveKitReconnectTimer = window.setTimeout(async () => {
    liveKitReconnectTimer = null;
    if (liveKitRoom !== room || !currentGame || currentGame.videoOff || currentGame.status !== "playing") return;
    if (liveKitRemoteParticipants(room).length > 0 || !videoPeers(currentGame).length) return;
    liveKitReconnectAttempts += 1;
    setLiveKitState({
      mode: "reconnecting LiveKit",
      lastError: `No remote LiveKit participant received. Reconnect attempt ${liveKitReconnectAttempts}/3.`
    });
    await reconnectLiveKitRoom();
    if (liveKitReconnectAttempts >= 3 && liveKitRemoteParticipants(liveKitRoom).length === 0) {
      setLiveKitState({
        lastError: "Still no remote LiveKit participant. The other device may be cached, blocked, or not in this LiveKit room."
      });
    }
  }, 8000);
}

async function reconnectLiveKitRoom() {
  if (!currentGame || !localStream || currentGame.videoOff || currentGame.status !== "playing") return;
  closeLiveKitRoom();
  await startLiveKitRoom();
}

function buildVideoDebugReport() {
  const game = currentGame;
  const expectedRemote = videoPeers(game).length;
  const localTracks = localStream?.getTracks?.() || [];
  const localVideoTracks = localTracks.filter((track) => track.kind === "video" && track.readyState !== "ended").length;
  const localAudioTracks = localTracks.filter((track) => track.kind === "audio" && track.readyState !== "ended").length;
  const attachedRemoteVideos = [...peerVideoElements.values()].filter((video) => (
    video?.srcObject instanceof MediaStream
      && video.srcObject.getVideoTracks().some((track) => track.readyState !== "ended")
  )).length;
  const attachedRemoteAudios = [...peerAudioElements.values()].filter((audio) => (
    audio?.srcObject instanceof MediaStream
      && audio.srcObject.getAudioTracks().some((track) => track.readyState !== "ended")
  )).length;
  const mode = game?.videoOff
    ? "video ended"
    : liveKitRoom
      ? "LiveKit"
      : requiresLiveKitVideo(game)
        ? "LiveKit required"
        : localStream
          ? "WebRTC fallback"
          : "not started";
  return [
    `App version: ${APP_VERSION}`,
    `Mode: ${mode}`,
    `Game: ${game?.kind || "none"} ${game?.id ? `#${game.id}` : ""}`,
    `Room: ${liveKitState.room || "none"}`,
    `Connection: ${liveKitState.connectionState || "none"}`,
    `Local camera track: ${localVideoTracks ? "yes" : "no"}`,
    `Local mic track: ${localAudioTracks ? "yes" : "no"}`,
    `Published camera: ${liveKitState.localVideoPublished ? "yes" : "no"}`,
    `Published mic: ${liveKitState.localAudioPublished ? "yes" : "no"}`,
    `Remote players expected: ${expectedRemote}`,
    `LiveKit remote participants: ${liveKitState.remoteParticipants}`,
    `LiveKit remote video tracks: ${liveKitState.remoteVideoTracks}`,
    `LiveKit remote audio tracks: ${liveKitState.remoteAudioTracks}`,
    `Attached remote video tiles: ${attachedRemoteVideos}`,
    `Attached remote audio tracks: ${attachedRemoteAudios}`,
    `Last error: ${liveKitState.lastError || "none"}`,
    `Updated: ${liveKitState.updatedAt || "never"}`
  ].join("\n");
}

function updateVideoDebug() {
  const report = buildVideoDebugReport();
  if (videoDebugText) videoDebugText.textContent = report;
  if (videoDebugModalText) videoDebugModalText.textContent = report;
}

async function startMediaAndPeer() {
  if (currentGame?.videoOff) return;
  closePeerConnections();
  clearPendingVideoSignals();
  liveKitReconnectAttempts = 0;
  clearTimeout(liveKitReconnectTimer);
  liveKitReconnectTimer = null;
  setLiveKitState({
    mode: "requesting media",
    localVideoPublished: false,
    localAudioPublished: false,
    remoteParticipants: 0,
    remoteVideoTracks: 0,
    remoteAudioTracks: 0,
    lastError: ""
  });
  try {
    rawLocalStream = await navigator.mediaDevices.getUserMedia({
      video: VIDEO_CONSTRAINTS,
      audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }
    });
    rawLocalStream.getVideoTracks().forEach((track) => {
      track.contentHint = "motion";
    });
    localStream = await buildOutgoingMediaStream(rawLocalStream);
    prepareVideoElement(localVideo, { muted: true });
    localVideo.srcObject = localStream;
    localVideo.play?.().catch(() => {});
  } catch {
    showNotice("Camera or microphone was blocked. Chess still works; video will be off.");
    localStream = new MediaStream();
    localVideo.srcObject = localStream;
    setLiveKitState({ lastError: "Camera or microphone permission was blocked." });
  }
  applyLocalAudioState();
  const liveKitStatus = await startLiveKitRoom();
  if (liveKitStatus === "started") return;
  if (liveKitStatus === "failed") {
    showNotice("Live video could not connect. Refresh the game page and allow camera/microphone.");
    return;
  }
  if (requiresLiveKitVideo()) {
    setLiveKitState({
      mode: "LiveKit required",
      lastError: "Team games require LiveKit. Check LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET, then restart Node.js."
    });
    showNotice("Team video needs LiveKit. Open Video debug for details.");
    return;
  }
  setLiveKitState({ mode: "WebRTC fallback", connectionState: "fallback" });
  socket.emit("webrtc:ready", { gameId: currentGame.id });
  await syncPeerNegotiations();
}

async function startLiveKitRoom() {
  if (!currentGame || currentGame.videoOff || currentGame.status !== "playing" || !localStream) return "disabled";
  let session;
  try {
    setLiveKitState({ mode: "fetching LiveKit token", lastError: "" });
    const response = await fetch("/api/livekit-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ gameId: currentGame.id })
    });
    session = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(session.error || "LiveKit token rejected.");
    if (!session.enabled) {
      setLiveKitState({
        mode: "LiveKit disabled",
        lastError: "The server did not return LiveKit credentials."
      });
      return "disabled";
    }
  } catch (error) {
    console.warn("[ChessFace] LiveKit token unavailable:", error);
    setLiveKitState({ mode: "LiveKit token failed", lastError: error.message || "LiveKit token unavailable." });
    return "disabled";
  }

  try {
    const LiveKit = await loadLiveKitClient();
    closeLiveKitRoom();
    const room = new LiveKit.Room({
      adaptiveStream: true,
      dynacast: true,
      disconnectOnPageLeave: false,
      videoCaptureDefaults: VIDEO_CONSTRAINTS,
      publishDefaults: {
        simulcast: false,
        videoEncoding: {
          maxBitrate: VIDEO_MAX_BITRATE,
          maxFramerate: VIDEO_FRAME_RATE
        }
      }
    });

    wireLiveKitRoom(room, LiveKit);
    liveKitRoom = room;
    setLiveKitState({ mode: "connecting LiveKit", room: session.room || currentGame.id, connectionState: "connecting" });
    await room.connect(session.url, session.token, { autoSubscribe: true });
    refreshLiveKitState(room, { mode: "LiveKit connected", room: session.room || currentGame.id, lastError: "" });
    await publishLiveKitTracks(room, LiveKit);
    syncLiveKitParticipants(room);
    scheduleLiveKitSync(room);
    applyOpponentAudioState();
    refreshLiveKitState(room, { mode: "LiveKit connected" });
    return "started";
  } catch (error) {
    console.warn("[ChessFace] LiveKit failed:", error);
    setLiveKitState({ mode: "LiveKit failed", lastError: error.message || "LiveKit failed." });
    closeLiveKitRoom();
    return "failed";
  }
}

function loadLiveKitClient() {
  liveKitModulePromise ||= import(LIVEKIT_CLIENT_URL);
  return liveKitModulePromise;
}

function wireLiveKitRoom(room, LiveKit) {
  const RoomEvent = LiveKit.RoomEvent || {};
  room.on(RoomEvent.TrackSubscribed || "trackSubscribed", (track, _publication, participant) => {
    attachLiveKitTrack(track, participant);
    refreshLiveKitState(room);
  });
  room.on(RoomEvent.TrackPublished || "trackPublished", (publication, participant) => {
    subscribeLiveKitPublication(publication, participant);
    syncLiveKitParticipant(participant);
    scheduleLiveKitSync(room);
    refreshLiveKitState(room);
  });
  room.on(RoomEvent.TrackUnsubscribed || "trackUnsubscribed", (track, _publication, participant) => {
    detachLiveKitTrack(track, participant);
    refreshLiveKitState(room);
  });
  room.on(RoomEvent.TrackMuted || "trackMuted", (_publication, participant) => {
    syncLiveKitParticipant(participant);
    refreshLiveKitState(room);
  });
  room.on(RoomEvent.TrackUnmuted || "trackUnmuted", (publication, participant) => {
    subscribeLiveKitPublication(publication, participant);
    syncLiveKitParticipant(participant);
    scheduleLiveKitSync(room);
    refreshLiveKitState(room);
  });
  room.on(RoomEvent.TrackSubscriptionStatusChanged || "trackSubscriptionStatusChanged", (publication, _status, participant) => {
    subscribeLiveKitPublication(publication, participant);
    syncLiveKitParticipant(participant);
    refreshLiveKitState(room);
  });
  room.on(RoomEvent.ParticipantMetadataChanged || "participantMetadataChanged", (_metadata, participant) => {
    syncLiveKitParticipant(participant);
    refreshLiveKitState(room);
  });
  room.on(RoomEvent.ParticipantConnected || "participantConnected", (participant) => {
    syncLiveKitParticipant(participant);
    scheduleLiveKitSync(room);
    refreshLiveKitState(room);
  });
  room.on(RoomEvent.ParticipantDisconnected || "participantDisconnected", (participant) => {
    clearLiveKitParticipant(participant.identity);
    refreshLiveKitState(room);
  });
  room.on(RoomEvent.ConnectionStateChanged || "connectionStateChanged", () => {
    syncLiveKitParticipants(room);
    refreshLiveKitState(room);
  });
  room.on(RoomEvent.Disconnected || "disconnected", () => {
    peerAudioElements.forEach((audio) => {
      audio.srcObject = null;
    });
    liveKitTrackElements.clear();
    setLiveKitState({ mode: "LiveKit disconnected", connectionState: "disconnected" });
  });
}

async function publishLiveKitTracks(room, LiveKit) {
  const Track = LiveKit.Track || {};
  const videoTrack = localStream.getVideoTracks()[0];
  const audioTrack = localStream.getAudioTracks()[0];
  if (videoTrack) {
    try {
      await room.localParticipant.publishTrack(videoTrack, {
        source: Track.Source?.Camera || "camera",
        simulcast: false,
        videoEncoding: {
          maxBitrate: VIDEO_MAX_BITRATE,
          maxFramerate: VIDEO_FRAME_RATE
        }
      });
      setLiveKitState({ localVideoPublished: true });
    } catch (error) {
      console.warn("[ChessFace] LiveKit camera publish failed:", error);
      setLiveKitState({ localVideoPublished: false, lastError: error.message || "Camera publish failed." });
      showNotice("Your camera could not be sent, but you can still see the other players.");
    }
  }
  if (audioTrack) {
    try {
      await room.localParticipant.publishTrack(audioTrack, {
        source: Track.Source?.Microphone || "microphone"
      });
      setLiveKitState({ localAudioPublished: true });
    } catch (error) {
      console.warn("[ChessFace] LiveKit microphone publish failed:", error);
      setLiveKitState({ localAudioPublished: false, lastError: error.message || "Microphone publish failed." });
    }
  }
}

function syncLiveKitParticipants(room) {
  liveKitRemoteParticipants(room).forEach((participant) => syncLiveKitParticipant(participant));
  refreshLiveKitState(room);
}

function syncLiveKitParticipant(participant) {
  const peerId = String(participant?.identity || "");
  if (peerId && peerId !== String(me?.id)) {
    const peer = liveKitPeerForParticipant(participant);
    const tile = peerVideoTiles.get(peerId) || ensurePeerVideoTile(peer);
    renderVideoTile(tile, tile.querySelector("span"), peer);
  }
  for (const publication of liveKitPublications(participant)) {
    subscribeLiveKitPublication(publication, participant);
    if (publication?.track && (publication.isSubscribed ?? true)) {
      attachLiveKitTrack(publication.track, participant);
    }
  }
}

function scheduleLiveKitSync(room) {
  [300, 1000, 2500, 5000, 9000, 15000, 25000, 40000].forEach((delay) => {
    window.setTimeout(() => {
      if (liveKitRoom === room) syncLiveKitParticipants(room);
    }, delay);
  });
}

function subscribeLiveKitPublication(publication, participant) {
  if (!publication) return;
  if (publication.track && (publication.isSubscribed ?? true)) {
    attachLiveKitTrack(publication.track, participant);
    return;
  }
  if (typeof publication.setSubscribed !== "function") return;
  try {
    const result = publication.setSubscribed(true);
    if (result?.then) {
      result.then(() => {
        if (publication.track) attachLiveKitTrack(publication.track, participant);
      }).catch((error) => {
        console.warn("[ChessFace] LiveKit subscribe failed:", error);
        setLiveKitState({ lastError: error.message || "LiveKit subscribe failed." });
      });
    } else if (publication.track) {
      attachLiveKitTrack(publication.track, participant);
    }
  } catch (error) {
    console.warn("[ChessFace] LiveKit subscribe failed:", error);
    setLiveKitState({ lastError: error.message || "LiveKit subscribe failed." });
  }
}

function liveKitPublications(participant) {
  if (!participant) return [];
  if (typeof participant.getTrackPublications === "function") return participant.getTrackPublications();
  const maps = [participant.trackPublications, participant.videoTrackPublications, participant.audioTrackPublications].filter(Boolean);
  return maps.flatMap((items) => items instanceof Map ? [...items.values()] : Object.values(items));
}

function liveKitPeerForParticipant(participant) {
  const peerId = String(participant?.identity || "");
  const known = videoPeersById.get(peerId);
  if (known) return known;
  let metadata = {};
  try {
    metadata = participant?.metadata ? JSON.parse(participant.metadata) : {};
  } catch {
    metadata = {};
  }
  return {
    id: peerId,
    username: metadata.username || participant?.name || "Player",
    avatarUrl: metadata.avatarUrl || "/default-avatar.svg",
    countryCode: metadata.countryCode || "OTHER",
    teamColor: metadata.teamColor || "other",
    teamName: metadata.teamColor ? `${metadata.teamColor} team` : "other team",
    isTeammate: currentGame?.kind === "team" && metadata.teamColor === currentGame.color
  };
}

function attachLiveKitTrack(track, participant) {
  const peerId = String(participant?.identity || "");
  if (!peerId || peerId === String(me?.id)) return;
  const peer = liveKitPeerForParticipant(participant);
  const tile = peerVideoTiles.get(peerId) || ensurePeerVideoTile(peer);
  const video = peerVideoElements.get(peerId) || tile.querySelector("video");
  if (!video) return;

  const mediaTrack = track.mediaStreamTrack;
  if (mediaTrack) {
    if (mediaTrack.kind === "audio") {
      const audio = ensurePeerAudioElement(peerId, tile);
      const existingAudio = liveKitTrackElements.get(`${peerId}:audio`);
      if (existingAudio?.track === mediaTrack && audio.srcObject instanceof MediaStream && audio.srcObject.getAudioTracks().includes(mediaTrack)) {
        applyOpponentAudioState();
        if (audio.paused) audio.play?.().catch(() => {});
        return;
      }
      const stream = audio.srcObject instanceof MediaStream ? audio.srcObject : new MediaStream();
      stream.getTracks().filter((item) => item.kind === "audio").forEach((item) => stream.removeTrack(item));
      stream.addTrack(mediaTrack);
      audio.srcObject = stream;
      liveKitTrackElements.set(`${peerId}:audio`, { element: audio, track: mediaTrack });
      applyOpponentAudioState();
      audio.play?.().catch(() => {});
      return;
    }
    const existingVideo = liveKitTrackElements.get(`${peerId}:video`);
    if (existingVideo?.track === mediaTrack && video.srcObject instanceof MediaStream && video.srcObject.getVideoTracks().includes(mediaTrack)) {
      applyOpponentAudioState();
      if (video.paused) video.play().catch(() => {});
      refreshLiveKitState(liveKitRoom);
      return;
    }
    const stream = video.srcObject instanceof MediaStream ? video.srcObject : new MediaStream();
    stream.getTracks().filter((item) => item.kind === "video").forEach((item) => stream.removeTrack(item));
    stream.addTrack(mediaTrack);
    video.srcObject = stream;
    video.muted = true;
    video.volume = 0;
    liveKitTrackElements.set(`${peerId}:video`, { element: video, track: mediaTrack });
  } else if (typeof track.attach === "function") {
    const existingVideo = liveKitTrackElements.get(`${peerId}:video`);
    if (existingVideo?.track === track && video.srcObject) {
      applyOpponentAudioState();
      if (video.paused) video.play().catch(() => {});
      refreshLiveKitState(liveKitRoom);
      return;
    }
    const element = track.attach(video);
    if (element && element !== video && element.srcObject) video.srcObject = element.srcObject;
    liveKitTrackElements.set(`${peerId}:video`, { element: video, track });
  }
  applyOpponentAudioState();
  video.play().catch(() => {});
  refreshLiveKitState(liveKitRoom);
}

function detachLiveKitTrack(track, participant) {
  const peerId = String(participant?.identity || "");
  const video = peerVideoElements.get(peerId);
  const mediaTrack = track?.mediaStreamTrack;
  if (mediaTrack?.kind === "audio") {
    const audio = peerAudioElements.get(peerId);
    if (audio?.srcObject instanceof MediaStream) {
      audio.srcObject.removeTrack(mediaTrack);
      if (!audio.srcObject.getTracks().length) audio.srcObject = null;
    }
  } else if (video?.srcObject instanceof MediaStream && mediaTrack) {
    video.srcObject.removeTrack(mediaTrack);
    if (!video.srcObject.getTracks().length) video.srcObject = null;
  }
  liveKitTrackElements.delete(`${peerId}:${mediaTrack?.kind}`);
  refreshLiveKitState(liveKitRoom);
}

function clearLiveKitParticipant(peerId) {
  const video = peerVideoElements.get(String(peerId));
  if (video) video.srcObject = null;
  const audio = peerAudioElements.get(String(peerId));
  if (audio) audio.srcObject = null;
  [...liveKitTrackElements.keys()]
    .filter((key) => key.startsWith(`${peerId}:`))
    .forEach((key) => liveKitTrackElements.delete(key));
  updateVideoDebug();
}

function closeLiveKitRoom() {
  if (!liveKitRoom) return;
  try {
    liveKitRoom.disconnect(false);
  } catch {
    try {
      liveKitRoom.disconnect();
    } catch {
      // Room may already be closed.
    }
  }
  liveKitRoom = null;
  peerAudioElements.forEach((audio) => {
    audio.srcObject = null;
  });
  liveKitTrackElements.clear();
  setLiveKitState({
    mode: "closed",
    connectionState: "closed",
    room: "",
    localVideoPublished: false,
    localAudioPublished: false,
    remoteParticipants: 0,
    remoteVideoTracks: 0,
    remoteAudioTracks: 0
  });
}

async function loadIceServers() {
  if (iceServersCache) return iceServersCache;
  const fallback = [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:global.stun.twilio.com:3478" }
  ];
  try {
    const response = await fetch("/api/ice-servers", { cache: "no-store" });
    const data = await response.json();
    iceServersCache = Array.isArray(data.iceServers) && data.iceServers.length ? data.iceServers : fallback;
  } catch {
    iceServersCache = fallback;
  }
  return iceServersCache;
}

async function beginWebrtcNegotiation(peerId, isInitiator) {
  if (!peerId || currentGame?.videoOff || liveKitRoom || requiresLiveKitVideo()) return;
  const peerConnection = await ensurePeerConnection(peerId);
  if (!peerConnection) return;
  await flushPendingSignals(peerId);
  if (isInitiator) await createAndSendOffer(peerId);
}

async function syncPeerNegotiations() {
  if (!currentGame || currentGame.videoOff || currentGame.status !== "playing" || !localStream || liveKitRoom || requiresLiveKitVideo()) return;
  const peers = videoPeers(currentGame);
  for (const peer of peers) {
    if (!peer?.id || peerNegotiationInFlight.has(peer.id)) continue;
    const existing = peerConnections.get(peer.id);
    const needsConnection = !existing
      || existing.connectionState === "failed"
      || existing.connectionState === "closed"
      || existing.iceConnectionState === "failed"
      || existing.iceConnectionState === "closed";
    if (!needsConnection) {
      flushPendingSignals(peer.id).catch(() => {});
      continue;
    }
    if (existing) {
      existing.close();
      peerConnections.delete(peer.id);
    }
    peerNegotiationInFlight.add(peer.id);
    try {
      await beginWebrtcNegotiation(peer.id, shouldInitiatePeer(peer));
    } finally {
      peerNegotiationInFlight.delete(peer.id);
    }
  }
}

function shouldInitiatePeer(peer) {
  if (typeof peer?.initiator === "boolean") return peer.initiator;
  if (!me?.id || !peer?.id) return false;
  return String(me.id) < String(peer.id);
}

async function ensurePeerConnection(peerId) {
  if (!peerId || currentGame?.videoOff || liveKitRoom || requiresLiveKitVideo()) return null;
  if (peerConnections.has(peerId)) return peerConnections.get(peerId);
  const peerConnection = new RTCPeerConnection({ iceServers: await loadIceServers() });
  peerConnections.set(peerId, peerConnection);
  if (!localStream?.getVideoTracks().length) peerConnection.addTransceiver("video", { direction: "recvonly" });
  if (!localStream?.getAudioTracks().length) peerConnection.addTransceiver("audio", { direction: "recvonly" });
  localStream?.getTracks().forEach((track) => {
    const sender = peerConnection.addTrack(track, localStream);
    if (track.kind === "video") limitVideoSender(sender);
  });
  peerConnection.ontrack = (event) => {
    const video = peerVideoElements.get(peerId);
    if (!video) return;
    if (event.streams?.[0]) {
      video.srcObject = event.streams[0];
    } else {
      const stream = video.srcObject instanceof MediaStream ? video.srcObject : new MediaStream();
      stream.addTrack(event.track);
      video.srcObject = stream;
    }
    applyOpponentAudioState();
    video.play().catch(() => {});
  };
  peerConnection.onconnectionstatechange = () => {
    const state = peerConnection.connectionState;
    if (state === "failed" || state === "disconnected") {
      showNotice("Video connection is weak. The chess game continues.");
      scheduleVideoReconnect(peerId);
    }
  };
  peerConnection.oniceconnectionstatechange = () => {
    const state = peerConnection.iceConnectionState;
    if (state === "failed" || state === "disconnected") scheduleVideoReconnect(peerId);
  };
  peerConnection.onicecandidate = (event) => {
    if (event.candidate) sendSignal(peerId, { candidate: event.candidate });
  };
  return peerConnection;
}

async function createAndSendOffer(peerId, options = {}) {
  const peerConnection = peerConnections.get(peerId);
  if (!peerConnection || currentGame?.videoOff || peerConnection.signalingState !== "stable") return;
  try {
    const offer = await peerConnection.createOffer({ iceRestart: Boolean(options.iceRestart) });
    await peerConnection.setLocalDescription(offer);
    sendSignal(peerId, { description: peerConnection.localDescription });
  } catch {
    showNotice("Video connection is retrying. The chess game continues.");
  }
}

function scheduleVideoReconnect(peerId) {
  clearTimeout(videoReconnectTimers.get(peerId));
  if (!peerId || currentGame?.videoOff) return;
  const timer = window.setTimeout(() => {
    const peerConnection = peerConnections.get(peerId);
    const state = peerConnection?.iceConnectionState || peerConnection?.connectionState;
    if (state === "failed" || state === "disconnected") createAndSendOffer(peerId, { iceRestart: true });
  }, 2500);
  videoReconnectTimers.set(peerId, timer);
}

async function handleSignal({ from, signal }) {
  if (currentGame?.videoOff || liveKitRoom || requiresLiveKitVideo()) return;
  const peerId = from || currentGame?.videoPeerId;
  if (!peerId) return;
  if (!localStream) {
    pushPendingSignal(peerId, signal);
    return;
  }
  try {
    await ensurePeerConnection(peerId);
    await applySignal(peerId, signal);
  } catch {
    showNotice("Video connection is retrying. The chess game continues.");
  }
}

function pushPendingSignal(peerId, signal) {
  const signals = pendingSignals.get(peerId) || [];
  signals.push(signal);
  pendingSignals.set(peerId, signals);
}

async function flushPendingSignals(peerId) {
  const signals = pendingSignals.get(peerId) || [];
  pendingSignals.set(peerId, []);
  for (const signal of signals) {
    try {
      await applySignal(peerId, signal);
    } catch {
      // Stale signals can arrive after reconnects; the next ready/start handshake will retry.
    }
  }
}

async function applySignal(peerId, signal) {
  const peerConnection = peerConnections.get(peerId);
  if (!peerConnection || currentGame?.videoOff) return;
  if (signal.description) {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(signal.description));
    await flushPendingIceCandidates(peerId);
    if (signal.description.type === "offer") {
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      sendSignal(peerId, { description: peerConnection.localDescription });
    }
  }
  if (signal.candidate) {
    if (!peerConnection.remoteDescription) {
      const candidates = pendingIceCandidates.get(peerId) || [];
      candidates.push(signal.candidate);
      pendingIceCandidates.set(peerId, candidates);
      return;
    }
    await addIceCandidate(peerId, signal.candidate);
  }
}

async function flushPendingIceCandidates(peerId) {
  const candidates = pendingIceCandidates.get(peerId) || [];
  pendingIceCandidates.set(peerId, []);
  for (const candidate of candidates) {
    await addIceCandidate(peerId, candidate);
  }
}

async function addIceCandidate(peerId, candidate) {
  const peerConnection = peerConnections.get(peerId);
  if (!peerConnection) return;
  try {
    await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  } catch {
    // ICE candidates can arrive during connection teardown.
  }
}

async function limitVideoSender(sender) {
  if (!sender?.getParameters || !sender?.setParameters) return;
  try {
    const parameters = sender.getParameters();
    parameters.encodings = parameters.encodings?.length ? parameters.encodings : [{}];
    parameters.encodings[0].maxBitrate = VIDEO_MAX_BITRATE;
    parameters.encodings[0].maxFramerate = VIDEO_FRAME_RATE;
    parameters.degradationPreference = "maintain-framerate";
    await sender.setParameters(parameters);
  } catch {
    // Some browsers ignore sender encoding hints; the 360p canvas still limits outgoing resolution.
  }
}

function closePeerConnections() {
  closeLiveKitRoom();
  videoReconnectTimers.forEach((timer) => clearTimeout(timer));
  videoReconnectTimers.clear();
  peerNegotiationInFlight.clear();
  peerConnections.forEach((connection) => connection.close());
  peerConnections.clear();
}

function clearPendingVideoSignals() {
  pendingSignals.clear();
  pendingIceCandidates.clear();
}

function clearRemoteVideoElements() {
  peerVideoElements.forEach((video) => {
    video.pause?.();
    video.srcObject = null;
    video.muted = true;
    video.volume = 0;
  });
  peerAudioElements.forEach((audio) => {
    audio.pause?.();
    audio.srcObject = null;
    audio.muted = true;
    audio.volume = 0;
  });
}

function unlockAudio() {
  const context = getAudioContext();
  if (context.state === "suspended") context.resume();
}

function getAudioContext() {
  audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
  return audioContext;
}

function playMoveSound() {
  const context = getAudioContext();
  if (context.state === "suspended") context.resume();
  const now = context.currentTime;
  const output = context.createGain();
  output.gain.setValueAtTime(0.0001, now);
  output.gain.exponentialRampToValueAtTime(0.46, now + 0.006);
  output.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);
  output.connect(context.destination);

  const low = context.createOscillator();
  low.type = "triangle";
  low.frequency.setValueAtTime(180, now);
  low.frequency.exponentialRampToValueAtTime(92, now + 0.11);
  low.connect(output);

  const knock = context.createOscillator();
  knock.type = "square";
  knock.frequency.setValueAtTime(720, now);
  knock.frequency.exponentialRampToValueAtTime(290, now + 0.026);
  const knockGain = context.createGain();
  knockGain.gain.setValueAtTime(0.19, now);
  knockGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
  knock.connect(knockGain).connect(output);

  low.start(now);
  knock.start(now);
  low.stop(now + 0.145);
  knock.stop(now + 0.035);
}

function playIllegalMoveSound() {
  const context = getAudioContext();
  if (context.state === "suspended") context.resume();
  const now = context.currentTime;
  const output = context.createGain();
  output.gain.setValueAtTime(0.0001, now);
  output.gain.exponentialRampToValueAtTime(0.38, now + 0.01);
  output.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
  output.connect(context.destination);

  const buzz = context.createOscillator();
  buzz.type = "sawtooth";
  buzz.frequency.setValueAtTime(120, now);
  buzz.frequency.setValueAtTime(88, now + 0.08);
  buzz.connect(output);

  const wobble = context.createOscillator();
  wobble.type = "square";
  wobble.frequency.setValueAtTime(38, now);
  const wobbleGain = context.createGain();
  wobbleGain.gain.setValueAtTime(18, now);
  wobble.connect(wobbleGain).connect(buzz.frequency);

  buzz.start(now);
  wobble.start(now);
  buzz.stop(now + 0.19);
  wobble.stop(now + 0.19);
}

function sendSignal(peerId, signal) {
  if (!currentGame || !peerId) return;
  socket.emit("webrtc:signal", { gameId: currentGame.id, to: peerId, signal });
}

async function createFilteredStream(sourceStream) {
  const videoTrack = sourceStream.getVideoTracks()[0];
  if (!videoTrack || !HTMLCanvasElement.prototype.captureStream) return sourceStream;

  rawLocalVideo = document.createElement("video");
  rawLocalVideo.muted = true;
  rawLocalVideo.playsInline = true;
  rawLocalVideo.setAttribute("playsinline", "");
  rawLocalVideo.setAttribute("webkit-playsinline", "");
  rawLocalVideo.setAttribute("muted", "");
  rawLocalVideo.srcObject = sourceStream;
  await rawLocalVideo.play().catch(() => {});
  await waitForVideoReady(rawLocalVideo);

  filterCanvas = document.createElement("canvas");
  filterContext = filterCanvas.getContext("2d");
  filterCanvas.width = VIDEO_OUTPUT_WIDTH;
  filterCanvas.height = VIDEO_OUTPUT_HEIGHT;
  const canvasStream = filterCanvas.captureStream(VIDEO_FRAME_RATE);
  const canvasVideoTrack = canvasStream.getVideoTracks()[0];
  if (canvasVideoTrack) canvasVideoTrack.contentHint = "motion";
  sourceStream.getAudioTracks().forEach((track) => canvasStream.addTrack(track));
  startFilterLoop();
  return canvasStream;
}

async function buildOutgoingMediaStream(sourceStream) {
  stopFilteredStream();
  if (currentFaceFilter === "none") {
    stopFilterRenderer();
    return sourceStream;
  }
  await loadFaceLandmarker().catch(() => null);
  filteredLocalStream = await createFilteredStream(sourceStream);
  return filteredLocalStream;
}

async function applyFaceFilterSelection(value) {
  currentFaceFilter = value || "none";
  if (currentFaceFilter !== "none") loadFaceLandmarker().catch(() => {});
  if (!currentGame || currentGame.status !== "playing" || currentGame.videoOff || !rawLocalStream) return;
  showNotice(currentFaceFilter === "none" ? "Face filter cleared." : "Applying face filter...");
  await restartMediaPipeline();
}

async function restartMediaPipeline() {
  if (!currentGame || currentGame.videoOff || currentGame.status !== "playing") return;
  if (!rawLocalStream?.getVideoTracks().length) {
    await startMediaAndPeer();
    return;
  }
  const oldFilteredStream = filteredLocalStream;
  filteredLocalStream = null;
  const nextStream = await buildOutgoingMediaStream(rawLocalStream);
  const nextVideoTrack = nextStream.getVideoTracks()[0];
  if (!nextVideoTrack) return;
  localStream = nextStream;
  prepareVideoElement(localVideo, { muted: true });
  localVideo.srcObject = localStream;
  localVideo.play?.().catch(() => {});
  await replaceOutgoingVideoTrack(nextVideoTrack);
  oldFilteredStream?.getVideoTracks().forEach((track) => {
    if (track !== nextVideoTrack) track.stop();
  });
  applyLocalAudioState();
  setLiveKitState({ localVideoPublished: Boolean(nextVideoTrack) });
  showNotice(currentFaceFilter === "none" ? "Face filter cleared." : "Face filter applied.");
}

async function replaceOutgoingVideoTrack(videoTrack) {
  if (!videoTrack) return;
  videoTrack.contentHint = "motion";
  if (liveKitRoom?.localParticipant) {
    await replaceLiveKitVideoTrack(videoTrack);
  }
  for (const peerConnection of peerConnections.values()) {
    const sender = peerConnection.getSenders?.().find((item) => item.track?.kind === "video");
    if (!sender?.replaceTrack) continue;
    await sender.replaceTrack(videoTrack).catch(() => {});
    limitVideoSender(sender);
  }
}

async function replaceLiveKitVideoTrack(videoTrack) {
  const participant = liveKitRoom?.localParticipant;
  if (!participant || !videoTrack) return;
  const Track = (await loadLiveKitClient()).Track || {};
  const publications = liveKitPublications(participant);
  const cameraPublication = publications.find((publication) => {
    const source = String(publication?.source || publication?.track?.source || "").toLowerCase();
    const kind = publication?.kind || publication?.track?.kind || publication?.track?.mediaStreamTrack?.kind;
    return kind === "video" || source.includes("camera");
  });
  const localTrack = cameraPublication?.track;
  if (localTrack?.replaceTrack) {
    await localTrack.replaceTrack(videoTrack);
    return;
  }
  try {
    if (localTrack && typeof participant.unpublishTrack === "function") {
      await participant.unpublishTrack(localTrack);
    }
    await participant.publishTrack(videoTrack, {
      source: Track.Source?.Camera || "camera",
      simulcast: false,
      videoEncoding: {
        maxBitrate: VIDEO_MAX_BITRATE,
        maxFramerate: VIDEO_FRAME_RATE
      }
    });
  } catch (error) {
    console.warn("[ChessFace] LiveKit camera replacement failed:", error);
    setLiveKitState({ lastError: error.message || "Camera replacement failed." });
  }
}

function stopFilteredStream() {
  if (!filteredLocalStream) return;
  filteredLocalStream.getVideoTracks().forEach((track) => track.stop());
  filteredLocalStream = null;
}

function stopFilterRenderer() {
  cancelAnimationFrame(filterAnimationId);
  filterAnimationId = null;
  rawLocalVideo = null;
  filterCanvas = null;
  filterContext = null;
  lastFaceBox = null;
}

function stopLocalMedia() {
  stopFilterRenderer();
  stopFilteredStream();
  if (rawLocalStream) {
    rawLocalStream.getTracks().forEach((track) => track.stop());
  } else if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
  }
  localStream = null;
  rawLocalStream = null;
}

function waitForVideoReady(video) {
  if (!video || video.readyState >= 2) return Promise.resolve();
  return new Promise((resolve) => {
    const done = () => {
      video.removeEventListener("loadedmetadata", done);
      video.removeEventListener("canplay", done);
      resolve();
    };
    video.addEventListener("loadedmetadata", done, { once: true });
    video.addEventListener("canplay", done, { once: true });
    window.setTimeout(done, 1200);
  });
}

function startFilterLoop() {
  cancelAnimationFrame(filterAnimationId);
  const draw = () => {
    drawFilteredFrame();
    filterAnimationId = requestAnimationFrame(draw);
  };
  draw();
}

function drawFilteredFrame() {
  if (!rawLocalVideo || !filterCanvas || !filterContext) return;
  const width = VIDEO_OUTPUT_WIDTH;
  const height = VIDEO_OUTPUT_HEIGHT;
  if (filterCanvas.width !== width || filterCanvas.height !== height) {
    filterCanvas.width = width;
    filterCanvas.height = height;
  }
  if (rawLocalVideo.readyState < 2) {
    filterContext.fillStyle = "#050708";
    filterContext.fillRect(0, 0, width, height);
    return;
  }
  drawVideoCover(filterContext, rawLocalVideo, width, height);
  if (currentFaceFilter === "none") return;

  const faceBox = detectFaceBox(width, height);
  drawFaceFilter(filterContext, faceBox, currentFaceFilter);
}

function drawVideoCover(ctx, video, width, height) {
  const sourceWidth = video.videoWidth || width;
  const sourceHeight = video.videoHeight || height;
  const sourceRatio = sourceWidth / sourceHeight;
  const targetRatio = width / height;
  let cropWidth = sourceWidth;
  let cropHeight = sourceHeight;
  let cropX = 0;
  let cropY = 0;

  if (sourceRatio > targetRatio) {
    cropWidth = sourceHeight * targetRatio;
    cropX = (sourceWidth - cropWidth) / 2;
  } else {
    cropHeight = sourceWidth / targetRatio;
    cropY = (sourceHeight - cropHeight) / 2;
  }

  ctx.drawImage(video, cropX, cropY, cropWidth, cropHeight, 0, 0, width, height);
}

function detectFaceBox(width, height) {
  if (faceLandmarker && rawLocalVideo?.readyState >= 2) {
    try {
      const results = faceLandmarker.detectForVideo(rawLocalVideo, performance.now());
      const landmarks = results.faceLandmarks?.[0];
      if (landmarks?.length) {
        const xs = landmarks.map((point) => point.x * width);
        const ys = landmarks.map((point) => point.y * height);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);
        const faceWidth = maxX - minX;
        const faceHeight = maxY - minY;
        const leftEye = midpoint(
          landmarkPoint(landmarks, 33, width, height),
          landmarkPoint(landmarks, 133, width, height)
        );
        const rightEye = midpoint(
          landmarkPoint(landmarks, 362, width, height),
          landmarkPoint(landmarks, 263, width, height)
        );
        const eyeCenter = midpoint(leftEye, rightEye);
        const eyeDistance = distance(leftEye, rightEye) || faceWidth * 0.45;
        const mouthLeft = landmarkPoint(landmarks, 61, width, height);
        const mouthRight = landmarkPoint(landmarks, 291, width, height);
        lastFaceBox = {
          x: minX,
          y: minY,
          width: faceWidth,
          height: faceHeight,
          cx: minX + faceWidth / 2,
          cy: minY + faceHeight / 2,
          leftEye,
          rightEye,
          eyeCenter,
          eyeDistance,
          angle: Math.atan2(rightEye.y - leftEye.y, rightEye.x - leftEye.x),
          forehead: landmarkPoint(landmarks, 10, width, height),
          chin: landmarkPoint(landmarks, 152, width, height),
          nose: landmarkPoint(landmarks, 1, width, height),
          mouth: midpoint(landmarkPoint(landmarks, 13, width, height), landmarkPoint(landmarks, 14, width, height)),
          mouthLeft,
          mouthRight,
          mouthWidth: distance(mouthLeft, mouthRight) || eyeDistance * 0.86
        };
        return lastFaceBox;
      }
    } catch {
      // Keep the previous box or centered fallback if frame analysis fails.
    }
  }
  return lastFaceBox || fallbackFaceBox(width, height);
}

function fallbackFaceBox(width, height) {
  const box = {
    x: width * 0.31,
    y: height * 0.18,
    width: width * 0.38,
    height: height * 0.5,
    cx: width / 2,
    cy: height * 0.43,
    angle: 0
  };
  box.eyeDistance = box.width * 0.52;
  box.eyeCenter = { x: box.cx, y: box.y + box.height * 0.42 };
  box.leftEye = { x: box.eyeCenter.x - box.eyeDistance / 2, y: box.eyeCenter.y };
  box.rightEye = { x: box.eyeCenter.x + box.eyeDistance / 2, y: box.eyeCenter.y };
  box.forehead = { x: box.cx, y: box.y + box.height * 0.06 };
  box.chin = { x: box.cx, y: box.y + box.height };
  box.nose = { x: box.cx, y: box.y + box.height * 0.56 };
  box.mouth = { x: box.cx, y: box.y + box.height * 0.72 };
  box.mouthLeft = { x: box.cx - box.eyeDistance * 0.38, y: box.mouth.y };
  box.mouthRight = { x: box.cx + box.eyeDistance * 0.38, y: box.mouth.y };
  box.mouthWidth = box.eyeDistance * 0.76;
  return box;
}

function landmarkPoint(landmarks, index, width, height) {
  const point = landmarks[index];
  return point ? { x: point.x * width, y: point.y * height } : { x: width / 2, y: height / 2 };
}

function midpoint(a, b) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

async function loadFaceLandmarker() {
  if (faceLandmarker) return faceLandmarker;
  if (faceLandmarkerPromise) return faceLandmarkerPromise;
  faceLandmarkerPromise = import("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/+esm")
    .then(async ({ FaceLandmarker, FilesetResolver }) => {
      const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm");
      faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
          delegate: "GPU"
        },
        runningMode: "VIDEO",
        numFaces: 1
      });
      return faceLandmarker;
    })
    .catch((error) => {
      console.warn("Face tracking unavailable; using centered filters.", error);
      faceLandmarkerPromise = null;
      return null;
    });
  return faceLandmarkerPromise;
}

function drawFaceFilter(ctx, box, type) {
  switch (type) {
    case "glasses":
      drawGlassesFilter(ctx, box, "clear");
      break;
    case "sunglasses":
      drawGlassesFilter(ctx, box, "dark");
      break;
    case "party-glasses":
      drawPartyGlassesFilter(ctx, box);
      break;
    case "hat":
      drawHatFilter(ctx, box);
      break;
    case "crown":
      drawCrownFilter(ctx, box);
      break;
    case "halo":
      drawHaloFilter(ctx, box);
      break;
    case "strawberry":
      drawStrawberryFilter(ctx, box);
      break;
    case "cat":
      drawCatFilter(ctx, box);
      break;
    case "bunny":
      drawBunnyFilter(ctx, box);
      break;
    case "mustache":
      drawMustacheFilter(ctx, box);
      break;
    case "pirate":
      drawPirateFilter(ctx, box);
      break;
    case "robot":
      drawRobotFilter(ctx, box);
      break;
    case "sparkles":
      drawSparklesFilter(ctx, box);
      break;
  }
}

function drawStrawberryFilter(ctx, box) {
  const radius = box.width * 0.62;
  const top = box.forehead.y - radius * 0.34;
  ctx.save();
  ctx.translate(box.cx, top + radius * 0.56);
  ctx.rotate(box.angle);
  ctx.fillStyle = "rgba(222, 42, 60, 0.82)";
  ctx.strokeStyle = "rgba(90, 8, 20, 0.7)";
  ctx.lineWidth = Math.max(4, box.width * 0.035);
  ctx.beginPath();
  ctx.moveTo(0, radius * 0.92);
  ctx.bezierCurveTo(-radius * 0.96, radius * 0.28, -radius * 0.7, -radius * 0.75, 0, -radius * 0.56);
  ctx.bezierCurveTo(radius * 0.7, -radius * 0.75, radius * 0.96, radius * 0.28, 0, radius * 0.92);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#fff4b8";
  for (let row = -2; row <= 3; row += 1) {
    for (let col = -2; col <= 2; col += 1) {
      if (Math.abs(col) + Math.abs(row) > 4) continue;
      ctx.beginPath();
      ctx.ellipse(col * radius * 0.2, row * radius * 0.18, radius * 0.028, radius * 0.052, 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.fillStyle = "#46b963";
  for (let i = -2; i <= 2; i += 1) {
    ctx.save();
    ctx.rotate(i * 0.42);
    ctx.beginPath();
    ctx.moveTo(0, -radius * 0.62);
    ctx.lineTo(radius * 0.16, -radius * 1.02);
    ctx.lineTo(-radius * 0.16, -radius * 0.96);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  drawEyes(ctx, radius);
  ctx.restore();
}

function drawEyes(ctx, radius) {
  [-0.28, 0.28].forEach((offset) => {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.ellipse(offset * radius, -radius * 0.05, radius * 0.13, radius * 0.17, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#171717";
    ctx.beginPath();
    ctx.arc(offset * radius + radius * 0.03, -radius * 0.02, radius * 0.055, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawHatFilter(ctx, box) {
  const width = box.eyeDistance * 2.1;
  const height = box.eyeDistance * 0.96;
  ctx.save();
  ctx.translate(box.forehead.x, box.forehead.y - height * 0.66);
  ctx.rotate(box.angle);
  ctx.fillStyle = "#171717";
  ctx.strokeStyle = "#050505";
  ctx.lineWidth = Math.max(4, box.width * 0.035);
  roundRect(ctx, -width * 0.26, -height * 0.46, width * 0.52, height * 0.9, 10);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#101010";
  roundRect(ctx, -width * 0.5, height * 0.18, width, height * 0.28, 999);
  ctx.fill();
  ctx.fillStyle = "#d8b35a";
  ctx.fillRect(-width * 0.24, height * 0.02, width * 0.48, height * 0.12);
  ctx.restore();
}

function drawCrownFilter(ctx, box) {
  const width = box.eyeDistance * 1.92;
  const height = box.eyeDistance * 0.68;
  ctx.save();
  ctx.translate(box.forehead.x, box.forehead.y - height * 0.42);
  ctx.rotate(box.angle);
  ctx.fillStyle = "#f2c66d";
  ctx.strokeStyle = "#704a0d";
  ctx.lineWidth = Math.max(3, box.width * 0.025);
  ctx.beginPath();
  ctx.moveTo(-width / 2, height * 0.35);
  ctx.lineTo(-width * 0.4, -height * 0.35);
  ctx.lineTo(-width * 0.2, height * 0.06);
  ctx.lineTo(0, -height * 0.55);
  ctx.lineTo(width * 0.2, height * 0.06);
  ctx.lineTo(width * 0.4, -height * 0.35);
  ctx.lineTo(width / 2, height * 0.35);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ["#58d4bf", "#ff766d", "#fff4b8"].forEach((color, index) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(width * [-0.32, 0, 0.32][index], height * [-0.25, -0.46, -0.25][index], height * 0.09, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

function drawGlassesFilter(ctx, box, style) {
  const lens = box.eyeDistance * 0.46;
  ctx.save();
  ctx.translate(box.eyeCenter.x, box.eyeCenter.y);
  ctx.rotate(box.angle);
  ctx.lineWidth = Math.max(5, box.width * 0.045);
  ctx.strokeStyle = style === "dark" ? "#0c0c0c" : "#171717";
  ctx.fillStyle = style === "dark" ? "rgba(0, 0, 0, 0.72)" : "rgba(210, 255, 246, 0.18)";
  [-box.eyeDistance / 2, box.eyeDistance / 2].forEach((x) => {
    roundRect(ctx, x - lens / 2, -lens * 0.34, lens, lens * 0.62, lens * 0.18);
    ctx.fill();
    ctx.stroke();
    if (style === "clear") {
      ctx.strokeStyle = "rgba(255,255,255,0.62)";
      ctx.lineWidth = Math.max(2, box.width * 0.012);
      ctx.beginPath();
      ctx.moveTo(x - lens * 0.28, -lens * 0.18);
      ctx.lineTo(x + lens * 0.18, -lens * 0.28);
      ctx.stroke();
      ctx.strokeStyle = "#171717";
      ctx.lineWidth = Math.max(5, box.width * 0.045);
    }
  });
  ctx.beginPath();
  ctx.moveTo(-box.eyeDistance / 2 + lens / 2, -lens * 0.05);
  ctx.lineTo(box.eyeDistance / 2 - lens / 2, -lens * 0.05);
  ctx.stroke();
  ctx.restore();
}

function drawPartyGlassesFilter(ctx, box) {
  const lens = box.eyeDistance * 0.48;
  ctx.save();
  ctx.translate(box.eyeCenter.x, box.eyeCenter.y);
  ctx.rotate(box.angle);
  [["#ff5a7a", -box.eyeDistance / 2], ["#58d4bf", box.eyeDistance / 2]].forEach(([color, x]) => {
    ctx.fillStyle = color;
    ctx.strokeStyle = "#10100d";
    ctx.lineWidth = Math.max(4, box.width * 0.035);
    ctx.beginPath();
    for (let i = 0; i < 5; i += 1) {
      const angle = -Math.PI / 2 + i * (Math.PI * 2 / 5);
      const outer = lens * 0.48;
      const inner = lens * 0.23;
      ctx.lineTo(x + Math.cos(angle) * outer, Math.sin(angle) * outer);
      ctx.lineTo(x + Math.cos(angle + Math.PI / 5) * inner, Math.sin(angle + Math.PI / 5) * inner);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  });
  ctx.beginPath();
  ctx.moveTo(-box.eyeDistance / 2 + lens * 0.25, 0);
  ctx.lineTo(box.eyeDistance / 2 - lens * 0.25, 0);
  ctx.stroke();
  ctx.restore();
}

function drawHaloFilter(ctx, box) {
  const width = box.eyeDistance * 1.7;
  const height = box.eyeDistance * 0.34;
  ctx.save();
  ctx.translate(box.forehead.x, box.forehead.y - box.eyeDistance * 0.72);
  ctx.rotate(box.angle);
  ctx.strokeStyle = "rgba(255, 231, 130, 0.94)";
  ctx.lineWidth = Math.max(6, box.width * 0.04);
  ctx.shadowColor = "rgba(255, 231, 130, 0.85)";
  ctx.shadowBlur = box.eyeDistance * 0.18;
  ctx.beginPath();
  ctx.ellipse(0, 0, width / 2, height / 2, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawCatFilter(ctx, box) {
  ctx.save();
  ctx.translate(box.forehead.x, box.forehead.y + box.eyeDistance * 0.05);
  ctx.rotate(box.angle);
  const earW = box.eyeDistance * 0.38;
  const earH = box.eyeDistance * 0.72;
  [[-box.eyeDistance * 0.52, -box.eyeDistance * 0.46], [box.eyeDistance * 0.52, -box.eyeDistance * 0.46]].forEach(([x, y]) => {
    ctx.fillStyle = "#2d2b28";
    ctx.strokeStyle = "#0c0c0c";
    ctx.lineWidth = Math.max(4, box.width * 0.028);
    ctx.beginPath();
    ctx.moveTo(x, y - earH * 0.5);
    ctx.lineTo(x - earW * 0.58, y + earH * 0.42);
    ctx.lineTo(x + earW * 0.58, y + earH * 0.42);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#f19aa8";
    ctx.beginPath();
    ctx.moveTo(x, y - earH * 0.18);
    ctx.lineTo(x - earW * 0.26, y + earH * 0.28);
    ctx.lineTo(x + earW * 0.26, y + earH * 0.28);
    ctx.closePath();
    ctx.fill();
  });
  ctx.restore();
  drawCatNoseAndWhiskers(ctx, box);
}

function drawCatNoseAndWhiskers(ctx, box) {
  ctx.save();
  ctx.translate(box.nose.x, box.nose.y + box.eyeDistance * 0.1);
  ctx.rotate(box.angle);
  ctx.fillStyle = "#111";
  ctx.beginPath();
  ctx.moveTo(0, box.eyeDistance * 0.12);
  ctx.lineTo(-box.eyeDistance * 0.11, 0);
  ctx.lineTo(box.eyeDistance * 0.11, 0);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.82)";
  ctx.lineWidth = Math.max(2, box.width * 0.012);
  [-1, 1].forEach((side) => {
    [-0.15, 0.02, 0.19].forEach((y) => {
      ctx.beginPath();
      ctx.moveTo(side * box.eyeDistance * 0.12, box.eyeDistance * y);
      ctx.lineTo(side * box.eyeDistance * 0.78, box.eyeDistance * (y - 0.08));
      ctx.stroke();
    });
  });
  ctx.restore();
}

function drawBunnyFilter(ctx, box) {
  ctx.save();
  ctx.translate(box.forehead.x, box.forehead.y - box.eyeDistance * 0.28);
  ctx.rotate(box.angle);
  const earW = box.eyeDistance * 0.36;
  const earH = box.eyeDistance * 1.25;
  [[-box.eyeDistance * 0.38, -box.eyeDistance * 0.42, -0.18], [box.eyeDistance * 0.38, -box.eyeDistance * 0.42, 0.18]].forEach(([x, y, rot]) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.fillStyle = "#f8f5ea";
    ctx.strokeStyle = "#4f4c45";
    ctx.lineWidth = Math.max(4, box.width * 0.026);
    roundRect(ctx, -earW / 2, -earH / 2, earW, earH, earW);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#f0a9b8";
    roundRect(ctx, -earW * 0.22, -earH * 0.34, earW * 0.44, earH * 0.62, earW);
    ctx.fill();
    ctx.restore();
  });
  ctx.restore();
}

function drawMustacheFilter(ctx, box) {
  ctx.save();
  ctx.translate(box.mouth.x, box.mouth.y - box.eyeDistance * 0.12);
  ctx.rotate(box.angle);
  ctx.fillStyle = "#17120d";
  [-1, 1].forEach((side) => {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(side * box.eyeDistance * 0.22, -box.eyeDistance * 0.22, side * box.eyeDistance * 0.62, -box.eyeDistance * 0.1, side * box.eyeDistance * 0.82, 0);
    ctx.bezierCurveTo(side * box.eyeDistance * 0.62, box.eyeDistance * 0.18, side * box.eyeDistance * 0.23, box.eyeDistance * 0.14, 0, 0);
    ctx.fill();
  });
  ctx.restore();
}

function drawPirateFilter(ctx, box) {
  ctx.save();
  ctx.strokeStyle = "#111";
  ctx.lineWidth = Math.max(5, box.width * 0.04);
  ctx.beginPath();
  ctx.moveTo(box.leftEye.x - box.eyeDistance * 0.75, box.leftEye.y - box.eyeDistance * 0.32);
  ctx.lineTo(box.rightEye.x + box.eyeDistance * 0.75, box.rightEye.y + box.eyeDistance * 0.28);
  ctx.stroke();
  ctx.translate(box.rightEye.x, box.rightEye.y);
  ctx.rotate(box.angle);
  ctx.fillStyle = "#050505";
  ctx.beginPath();
  ctx.ellipse(0, 0, box.eyeDistance * 0.28, box.eyeDistance * 0.24, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawRobotFilter(ctx, box) {
  ctx.save();
  ctx.translate(box.eyeCenter.x, box.eyeCenter.y);
  ctx.rotate(box.angle);
  const width = box.eyeDistance * 1.75;
  const height = box.eyeDistance * 0.72;
  ctx.fillStyle = "rgba(72, 83, 92, 0.84)";
  ctx.strokeStyle = "#101820";
  ctx.lineWidth = Math.max(4, box.width * 0.03);
  roundRect(ctx, -width / 2, -height / 2, width, height, height * 0.18);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#6fffe9";
  [-0.24, 0.24].forEach((offset) => {
    ctx.beginPath();
    ctx.arc(width * offset, -height * 0.03, height * 0.14, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.strokeStyle = "#f2c66d";
  ctx.lineWidth = Math.max(2, box.width * 0.012);
  for (let i = -2; i <= 2; i += 1) {
    ctx.beginPath();
    ctx.moveTo(width * -0.38, height * (0.2 + i * 0.04));
    ctx.lineTo(width * 0.38, height * (0.2 + i * 0.04));
    ctx.stroke();
  }
  ctx.restore();
}

function drawSparklesFilter(ctx, box) {
  ctx.save();
  const time = performance.now() / 800;
  const spots = [
    [-0.62, -0.18, "#f2c66d"],
    [0.64, -0.12, "#8cf7e5"],
    [-0.48, 0.34, "#ffaaa3"],
    [0.5, 0.36, "#fff4b8"],
    [0.02, -0.42, "#ffffff"]
  ];
  spots.forEach(([ox, oy, color], index) => {
    const size = box.eyeDistance * (0.09 + 0.025 * Math.sin(time + index));
    drawSparkle(ctx, box.cx + ox * box.width, box.cy + oy * box.height, size, color);
  });
  ctx.restore();
}

function drawSparkle(ctx, x, y, size, color) {
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = size * 1.3;
  ctx.beginPath();
  ctx.moveTo(x, y - size);
  ctx.lineTo(x + size * 0.26, y - size * 0.26);
  ctx.lineTo(x + size, y);
  ctx.lineTo(x + size * 0.26, y + size * 0.26);
  ctx.lineTo(x, y + size);
  ctx.lineTo(x - size * 0.26, y + size * 0.26);
  ctx.lineTo(x - size, y);
  ctx.lineTo(x - size * 0.26, y - size * 0.26);
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function hangupVideoCall() {
  closePeer();
  markVideoOffLocally();
  socket.emit("video:hangup");
}

function markVideoOffLocally() {
  if (!currentGame) return;
  currentGame = { ...currentGame, videoOff: true, videoRequestFrom: null };
  renderVideoControls(currentGame);
}

async function addCurrentOpponent() {
  if (!currentGame) return;
  if (requireRealAccount("send friend requests")) return;
  const opponent = opponentForGame(currentGame);
  if (isGuestPlayer(opponent)) {
    showNotice("Guest players need to create an account before they can receive friend requests.");
    return;
  }
  const response = await fetch("/api/friends", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ username: opponent.username })
  });
  const data = await response.json().catch(() => ({}));
  showNotice(response.ok
    ? data.accepted
      ? `${opponent.username} is now your friend.`
      : `Friend request sent to ${opponent.username}.`
    : data.error || "Could not send friend request.");
}

function opponentForGame(game) {
  if (!game || game.kind === "team") return null;
  return game.color === "white" ? game.players.black : game.players.white;
}

function isGuestPlayer(player) {
  return Boolean(player?.isGuest || player?.username?.startsWith("guest-"));
}

function toggleMic() {
  meAudioMuted = !meAudioMuted;
  applyLocalAudioState();
}

function applyLocalAudioState() {
  const audio = localStream?.getAudioTracks()[0];
  if (audio) audio.enabled = !meAudioMuted;
  micButton.textContent = meAudioMuted ? "Unmute me" : "Mute me";
}

async function toggleOpponentAudio() {
  opponentAudioMuted = !opponentAudioMuted;
  applyOpponentAudioState();
  if (!opponentAudioMuted) {
    const audibleVideos = [...peerVideoElements.entries()]
      .filter(([peerId]) => currentGame?.kind !== "team" || videoPeersById.get(peerId)?.isTeammate)
      .map(([, video]) => video);
    try {
      await Promise.all(audibleVideos.map((video) => video.play().catch(() => null)));
    } catch {
      showNotice("Tap again if the browser blocks sound.");
    }
  }
}

function applyOpponentAudioState() {
  peerVideoElements.forEach((video, peerId) => {
    const peer = videoPeersById.get(peerId);
    const shouldMute = currentGame?.kind === "team"
      ? !peer?.isTeammate || opponentAudioMuted
      : opponentAudioMuted;
    video.muted = true;
    video.volume = 0;
    video.play?.().catch(() => {});
    video.closest(".video-tile")?.classList.toggle("is-muted", shouldMute);
  });
  peerAudioElements.forEach((audio, peerId) => {
    const peer = videoPeersById.get(peerId);
    const shouldMute = currentGame?.kind === "team"
      ? !peer?.isTeammate || opponentAudioMuted
      : opponentAudioMuted;
    audio.muted = shouldMute;
    audio.volume = shouldMute ? 0 : 1;
    if (!shouldMute) audio.play?.().catch(() => {});
  });
  const target = currentGame?.kind === "team" ? "teammate" : "opponent";
  opponentMuteButton.textContent = opponentAudioMuted ? `Unmute ${target}` : `Mute ${target}`;
}

function toggleCamera() {
  const rawVideo = rawLocalStream?.getVideoTracks()[0];
  const sentVideo = localStream?.getVideoTracks()[0];
  const video = rawVideo || sentVideo;
  if (!video) return;
  const enabled = !video.enabled;
  if (rawVideo) rawVideo.enabled = enabled;
  if (sentVideo) sentVideo.enabled = enabled;
  document.querySelector("#cameraButton").textContent = enabled ? "Camera off" : "Camera on";
}

function closePeer() {
  closePeerConnections();
  clearPendingVideoSignals();
  stopLocalMedia();
  localVideo.srcObject = null;
  clearRemoteVideoElements();
  updateVideoDebug();
}

function resetToLobby() {
  closePeer();
  currentGame = null;
  gameChat = [];
  gameResultModal?.classList.add("hidden");
  videoDebugModal?.classList.add("hidden");
  mobileVideoDebugButton?.classList.add("hidden");
  renderGameChat();
  selectedSquare = null;
  gameLayout.classList.add("hidden");
  lobby.classList.remove("hidden");
  statusTitle.textContent = "Choose a time control";
}

function logout() {
  closePeer();
  if (socket) socket.disconnect();
  localStorage.removeItem("chessface:token");
  token = null;
  me = null;
  currentGame = null;
  gameChat = [];
  gameResultModal?.classList.add("hidden");
  renderGameChat();
  appView.classList.add("hidden");
  authView.classList.remove("hidden");
  authForm.reset();
  setAuthMode("login");
}

function statusText(game) {
  if (game.status === "playing") return `${game.turn} to move`;
  if (game.result === "aborted") return "Game aborted";
  if (game.result === "draw") return `Draw by ${game.reason}`;
  return `${game.result} wins by ${game.reason}`;
}

function formatClock(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function showNotice(message) {
  if (!message) return;
  let notice = document.querySelector("#appNotice");
  if (!notice) {
    notice = document.createElement("div");
    notice.id = "appNotice";
    notice.className = "app-toast";
    notice.setAttribute("role", "status");
    notice.setAttribute("aria-live", "polite");
    document.body.append(notice);
  }
  notice.textContent = message;
  notice.classList.add("show");
  clearTimeout(noticeTimer);
  noticeTimer = window.setTimeout(() => {
    notice.classList.remove("show");
  }, 4200);
}

function loadSettings() {
  try {
    return { ...defaultSettings, ...JSON.parse(localStorage.getItem("chessface:settings") || "{}") };
  } catch {
    return { ...defaultSettings };
  }
}

function saveSettings() {
  localStorage.setItem("chessface:settings", JSON.stringify(settings));
}

function syncSettingsControls() {
  boardThemeButtons.forEach((button) => {
    const active = button.dataset.boardTheme === settings.boardTheme;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  highlightMovesSetting.checked = settings.highlightMoves;
  legalMovesSetting.checked = settings.legalMoves;
  coordinatesSetting.checked = settings.coordinates;
  moveSoundSetting.checked = settings.moveSound;
  capturedPiecesSetting.checked = settings.capturedPieces;
  confirmActionsSetting.checked = settings.confirmActions;
  allowChallengesSetting.checked = settings.allowChallenges;
}

function updateSettingsFromControls() {
  settings = {
    ...settings,
    highlightMoves: highlightMovesSetting.checked,
    legalMoves: legalMovesSetting.checked,
    coordinates: coordinatesSetting.checked,
    moveSound: moveSoundSetting.checked,
    capturedPieces: capturedPiecesSetting.checked,
    confirmActions: confirmActionsSetting.checked,
    allowChallenges: allowChallengesSetting.checked
  };
  saveSettings();
  applySettings();
}

function applySettings() {
  document.body.dataset.boardTheme = settings.boardTheme;
  document.body.classList.toggle("hide-captured", !settings.capturedPieces);
  if (currentGame) renderBoard(currentGame.fen, currentGame.color);
}

function renderCapturedPieces(pieceAt) {
  const starting = { p: 8, r: 2, n: 2, b: 2, q: 1, k: 1 };
  const onBoard = { white: { p: 0, r: 0, n: 0, b: 0, q: 0, k: 0 }, black: { p: 0, r: 0, n: 0, b: 0, q: 0, k: 0 } };
  Object.values(pieceAt).forEach((piece) => {
    const color = piece === piece.toUpperCase() ? "white" : "black";
    onBoard[color][piece.toLowerCase()] += 1;
  });
  document.querySelector("#whiteCaptured").textContent = capturedText("black", onBoard.black, starting);
  document.querySelector("#blackCaptured").textContent = capturedText("white", onBoard.white, starting);
}

function capturedText(color, onBoard, starting) {
  const order = color === "white" ? ["q", "r", "b", "n", "p"] : ["q", "r", "b", "n", "p"];
  const pieces = [];
  order.forEach((piece) => {
    const missing = starting[piece] - onBoard[piece];
    for (let index = 0; index < missing; index += 1) {
      pieces.push(pieceArtMap[piece]);
    }
  });
  return pieces.length ? `Captured ${pieces.join(" ")}` : "No captures";
}

syncSettingsControls();
applySettings();
boot();
setAuthMode(mode);
