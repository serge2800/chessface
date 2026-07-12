const watchGamesList = document.querySelector("#watchGamesList");
const watchDetailSection = document.querySelector("#watchDetailSection");
const watchBoard = document.querySelector("#watchBoard");
const watchMatchup = document.querySelector("#watchMatchup");
const watchWhitePlayer = document.querySelector("#watchWhitePlayer");
const watchBlackPlayer = document.querySelector("#watchBlackPlayer");
const watchMoveStatus = document.querySelector("#watchMoveStatus");
const watchSpectatorCount = document.querySelector("#watchSpectatorCount");
const watchEvalBarFill = document.querySelector("#watchEvalBarFill");
const watchEvalBarLabel = document.querySelector("#watchEvalBarLabel");
const watchWhiteVideo = document.querySelector("#watchWhiteVideo");
const watchBlackVideo = document.querySelector("#watchBlackVideo");
const watchWhiteVideoLabel = document.querySelector("#watchWhiteVideoLabel");
const watchBlackVideoLabel = document.querySelector("#watchBlackVideoLabel");
const watchChatForm = document.querySelector("#watchChatForm");
const watchChatInput = document.querySelector("#watchChatInput");
const watchChatMessages = document.querySelector("#watchChatMessages");
const watchChatStatus = document.querySelector("#watchChatStatus");
const watchProfileLink = document.querySelector("#watchProfileLink");
const watchLogoutButton = document.querySelector("#watchLogoutButton");
const watchLoginLink = document.querySelector("#watchLoginLink");
const refreshWatchButton = document.querySelector("#refreshWatchButton");

const LIVEKIT_CLIENT_URL = "https://cdn.jsdelivr.net/npm/livekit-client/+esm";
const WATCH_PIECE_VALUES = { p: 100, n: 320, b: 330, r: 500, q: 900 };
const token = localStorage.getItem("chessface:token");
let socket = null;
let liveGames = [];
let selectedGame = null;
let watchNotice = "";
let watchChat = [];
let liveKitModulePromise = null;
let watchLiveKitRoom = null;
let watchLiveKitGameId = "";
let watchLiveKitTracks = new Map();
let watchCameraStatusTimer = null;

renderNavigation();

watchLogoutButton?.addEventListener("click", () => {
  localStorage.removeItem("chessface:token");
  localStorage.removeItem("chessface:user");
  window.location.assign("/");
});

refreshWatchButton?.addEventListener("click", () => socket?.emit("watch:list"));
watchChatForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = watchChatInput.value.trim();
  if (!text || !selectedGame?.id || selectedGame.status !== "playing") return;
  socket?.emit("watch:chat", { gameId: selectedGame.id, text });
  watchChatInput.value = "";
});
watchGamesList?.addEventListener("click", (event) => {
  const row = event.target instanceof Element ? event.target.closest("[data-game-id]") : null;
  if (!row || !watchGamesList.contains(row)) return;
  joinGame(row.dataset.gameId);
});
watchGamesList?.addEventListener("keydown", (event) => {
  const row = event.target instanceof Element ? event.target.closest("[data-game-id]") : null;
  if (!row || !watchGamesList.contains(row)) return;
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    joinGame(row.dataset.gameId);
  }
});

if (!token) {
  renderSignedOut();
} else {
  connectSocket();
}

function connectSocket() {
  socket = io({ auth: { token } });
  socket.on("connect", () => socket.emit("watch:list"));
  socket.on("connect_error", () => renderSignedOut("Please log in again to see live games."));
  socket.on("error:message", (message) => showWatchNotice(message || "That game could not be opened."));
  socket.on("profile", (user) => {
    localStorage.setItem("chessface:user", JSON.stringify(user));
    renderNavigation();
  });
  socket.on("watch:list", ({ games = [] } = {}) => {
    liveGames = games;
    renderGameTable();
    if (selectedGame && !liveGames.some((game) => game.id === selectedGame.id)) {
      selectedGame = null;
      renderSelectedGame();
    }
  });
  socket.on("watch:game", (game) => {
    selectedGame = game;
    renderSelectedGame();
    renderGameTable();
    startWatchLiveKit(game);
  });
  socket.on("watch:chat:history", ({ gameId, messages = [] } = {}) => {
    if (!selectedGame || gameId !== selectedGame.id) return;
    watchChat = messages.slice(-80);
    renderWatchChat();
  });
  socket.on("watch:chat", addWatchChatMessage);
  socket.on("disconnect", () => {
    closeWatchLiveKit();
    renderWatchVideoStatus("Camera connection closed");
  });
}

function renderNavigation() {
  const isLoggedIn = Boolean(token);
  watchProfileLink?.classList.toggle("hidden", !isLoggedIn);
  watchLogoutButton?.classList.toggle("hidden", !isLoggedIn);
  watchLoginLink?.classList.toggle("hidden", isLoggedIn);
}

function renderSignedOut(message = "Log in or play as guest to see live games.") {
  watchGamesList.innerHTML = `<div class="watch-empty">${escapeHtml(message)}</div>`;
}

function renderGameTable() {
  if (!liveGames.length) {
    watchGamesList.innerHTML = '<div class="watch-empty">No games are being played right now.</div>';
    return;
  }

  const rows = liveGames.map((game, index) => {
    const white = firstPlayer(game.players?.white);
    const black = firstPlayer(game.players?.black);
    return `
      <tr data-game-id="${escapeHtml(game.id)}" class="${selectedGame?.id === game.id ? "selected" : ""}" tabindex="0">
        <td class="watch-rank">${index + 1}</td>
        <td>
          <strong>${escapeHtml(white.username)}</strong>
          <span>${escapeHtml(countryLabel(white))}</span>
        </td>
        <td class="watch-rating">${formatRating(white.rating)}</td>
        <td>
          <strong>${escapeHtml(black.username)}</strong>
          <span>${escapeHtml(countryLabel(black))}</span>
        </td>
        <td class="watch-rating">${formatRating(black.rating)}</td>
        <td>${escapeHtml(game.timeControl || "-")}</td>
        <td>${game.moveCount || 0}</td>
        <td><button type="button" class="watch-open-button">Watch</button></td>
      </tr>
    `;
  }).join("");

  watchGamesList.innerHTML = `
    ${watchNotice ? `<div class="watch-inline-notice">${escapeHtml(watchNotice)}</div>` : ""}
    <div class="watch-table-wrap">
      <table class="watch-table">
        <thead>
          <tr>
            <th>#</th>
            <th>White</th>
            <th>White rating</th>
            <th>Black</th>
            <th>Black rating</th>
            <th>Time</th>
            <th>Moves</th>
            <th></th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function joinGame(gameId) {
  if (!gameId) return;
  if (!socket?.connected) {
    showWatchNotice("Connecting to live games. Try again in a moment.");
    return;
  }
  watchNotice = "";
  const summary = liveGames.find((game) => game.id === gameId);
  if (summary) {
    selectedGame = { ...summary, loading: true };
    renderSelectedGame();
    renderGameTable();
  }
  socket.timeout(3000).emit("watch:join", { gameId }, (error, response) => {
    if (error) {
      showWatchNotice("Opening that game took too long. Tap Watch again.");
      return;
    }
    if (!response?.ok) {
      showWatchNotice(response?.message || "That game is no longer available to watch.");
      return;
    }
    selectedGame = response.game;
    watchChat = [];
    renderSelectedGame();
    renderGameTable();
    startWatchLiveKit(response.game);
  });
}

function renderSelectedGame() {
  watchDetailSection?.classList.toggle("hidden", !selectedGame);
  document.body.classList.toggle("is-watching-game", Boolean(selectedGame));
  if (!selectedGame) {
    closeWatchLiveKit();
    renderEmptyBoard();
    watchMoveStatus.textContent = "No game selected";
    watchSpectatorCount.textContent = "0 watching";
    watchChat = [];
    renderWatchChatState();
    renderWatchChat();
    return;
  }
  const white = selectedGame.players?.white || [];
  const black = selectedGame.players?.black || [];
  watchMatchup.innerHTML = `
    <p class="eyebrow">${escapeHtml(selectedGame.timeControl || "Live game")}</p>
    <h2>${escapeHtml(sideLabel(white))} vs ${escapeHtml(sideLabel(black))}</h2>
    <span>${selectedGame.ratingTotal || 0} combined rating</span>
  `;
  renderWatchPlayer(watchBlackPlayer, black, selectedGame.clocks?.black);
  renderWatchPlayer(watchWhitePlayer, white, selectedGame.clocks?.white);
  if (selectedGame.loading && !selectedGame.fen) {
    renderEmptyBoard();
    updateWatchEvaluation(0);
  } else {
    renderBoard(selectedGame.fen, selectedGame.lastMove);
    updateWatchEvaluation(materialCentipawnsFromFen(selectedGame.fen));
  }
  watchMoveStatus.textContent = selectedGame.status === "playing"
    ? `${selectedGame.loading ? "Opening game" : selectedGame.turn === "white" ? "White" : "Black"}${selectedGame.loading ? "" : " to move"} · ${selectedGame.moveCount || 0} moves`
    : "Game finished";
  watchSpectatorCount.textContent = `${selectedGame.spectatorCount || 0} watching`;
  watchDetailSection?.scrollIntoView({ block: "start", behavior: "smooth" });
  renderWatchChatState();
  renderWatchChat();
  renderWatchVideoPlaceholders();
}

function showWatchNotice(message) {
  watchNotice = message;
  renderGameTable();
}

function updateWatchEvaluation(whiteCentipawns) {
  const value = Number(whiteCentipawns) || 0;
  const whiteHeight = Math.max(6, Math.min(94, 50 + Math.tanh(value / 600) * 44));
  if (watchEvalBarFill) watchEvalBarFill.style.height = `${whiteHeight}%`;
  if (watchEvalBarLabel) {
    const pawns = Math.abs(value / 100).toFixed(1);
    watchEvalBarLabel.textContent = value >= 0 ? `+${pawns}` : `-${pawns}`;
  }
}

function materialCentipawnsFromFen(fen) {
  const boardFen = String(fen || "").split(" ")[0];
  let score = 0;
  for (const char of boardFen) {
    const value = WATCH_PIECE_VALUES[char.toLowerCase()];
    if (!value) continue;
    score += char === char.toUpperCase() ? value : -value;
  }
  return score;
}

function addWatchChatMessage(message) {
  if (!selectedGame || message.gameId !== selectedGame.id) return;
  watchChat.push(message);
  watchChat = watchChat.slice(-80);
  renderWatchChat();
}

function renderWatchChatState() {
  const live = selectedGame?.status === "playing";
  if (watchChatStatus) watchChatStatus.textContent = live ? "Live" : "Closed";
  if (watchChatInput) watchChatInput.disabled = !live;
  const button = watchChatForm?.querySelector("button[type='submit']");
  if (button) button.disabled = !live;
}

function renderWatchChat() {
  if (!watchChatMessages) return;
  watchChatMessages.innerHTML = "";
  if (!watchChat.length) {
    const empty = document.createElement("p");
    empty.className = "chat-empty";
    empty.textContent = selectedGame ? "Say hi to the players and other watchers." : "Open a game to join the conversation.";
    watchChatMessages.append(empty);
    return;
  }
  watchChat.forEach((message) => {
    const row = document.createElement("div");
    const isMine = message.from && getCurrentUserId() === String(message.from);
    row.className = `chat-message ${isMine ? "mine" : "theirs"}`;
    const name = document.createElement("strong");
    name.textContent = isMine ? "You" : message.username || "Watcher";
    const text = document.createElement("span");
    text.textContent = message.text || "";
    row.append(name, text);
    watchChatMessages.append(row);
  });
  watchChatMessages.scrollTop = watchChatMessages.scrollHeight;
}

function getCurrentUserId() {
  try {
    return String(JSON.parse(localStorage.getItem("chessface:user") || "null")?.id || "");
  } catch {
    return "";
  }
}

function renderWatchVideoPlaceholders() {
  const white = firstPlayer(selectedGame?.players?.white);
  const black = firstPlayer(selectedGame?.players?.black);
  if (watchWhiteVideoLabel) watchWhiteVideoLabel.textContent = `${white.username} · white`;
  if (watchBlackVideoLabel) watchBlackVideoLabel.textContent = `${black.username} · black`;
}

function renderWatchVideoStatus(message) {
  if (watchWhiteVideoLabel) watchWhiteVideoLabel.textContent = message;
  if (watchBlackVideoLabel) watchBlackVideoLabel.textContent = message;
}

function renderWatchVideoSideStatus(side, message) {
  const label = side === "black" ? watchBlackVideoLabel : watchWhiteVideoLabel;
  if (label) label.textContent = message;
}

function loadLiveKitClient() {
  liveKitModulePromise ||= import(LIVEKIT_CLIENT_URL);
  return liveKitModulePromise;
}

async function startWatchLiveKit(game) {
  if (!game?.id || game.status !== "playing" || !token) return;
  if (watchLiveKitRoom && watchLiveKitGameId === game.id) {
    syncWatchLiveKitParticipants(watchLiveKitRoom);
    scheduleWatchCameraStatusCheck();
    return;
  }
  closeWatchLiveKit();
  watchLiveKitGameId = game.id;
  renderWatchVideoPlaceholders();
  renderWatchVideoStatus("Connecting cameras...");
  try {
    const response = await fetch("/api/livekit-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ gameId: game.id })
    });
    const session = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(session.error || "Camera room unavailable.");
    if (!session.enabled) {
      renderWatchVideoStatus("Cameras require LiveKit");
      return;
    }
    const LiveKit = await loadLiveKitClient();
    const room = new LiveKit.Room({
      adaptiveStream: true,
      dynacast: true,
      disconnectOnPageLeave: false
    });
    wireWatchLiveKitRoom(room, LiveKit);
    watchLiveKitRoom = room;
    await room.connect(session.url, session.token, { autoSubscribe: true });
    syncWatchLiveKitParticipants(room);
    scheduleWatchLiveKitSync(room);
    scheduleWatchCameraStatusCheck();
  } catch (error) {
    console.warn("[ChessFace] Watch cameras unavailable:", error);
    closeWatchLiveKit();
    renderWatchVideoStatus("Cameras unavailable");
  }
}

function wireWatchLiveKitRoom(room, LiveKit) {
  const RoomEvent = LiveKit.RoomEvent || {};
  room.on(RoomEvent.TrackSubscribed || "trackSubscribed", (track, _publication, participant) => {
    attachWatchLiveKitTrack(track, participant);
  });
  room.on(RoomEvent.TrackPublished || "trackPublished", (publication, participant) => {
    subscribeWatchPublication(publication, participant);
    syncWatchParticipant(participant);
  });
  room.on(RoomEvent.TrackUnmuted || "trackUnmuted", (publication, participant) => {
    subscribeWatchPublication(publication, participant);
    syncWatchParticipant(participant);
  });
  room.on(RoomEvent.TrackSubscriptionStatusChanged || "trackSubscriptionStatusChanged", (publication, _status, participant) => {
    subscribeWatchPublication(publication, participant);
    syncWatchParticipant(participant);
  });
  room.on(RoomEvent.ParticipantMetadataChanged || "participantMetadataChanged", (_metadata, participant) => {
    syncWatchParticipant(participant);
  });
  room.on(RoomEvent.ParticipantConnected || "participantConnected", (participant) => {
    syncWatchParticipant(participant);
  });
  room.on(RoomEvent.TrackUnsubscribed || "trackUnsubscribed", (track, _publication, participant) => {
    detachWatchLiveKitTrack(track, participant);
  });
  room.on(RoomEvent.ParticipantDisconnected || "participantDisconnected", (participant) => {
    clearWatchParticipant(participant);
  });
  room.on(RoomEvent.ConnectionStateChanged || "connectionStateChanged", () => {
    syncWatchLiveKitParticipants(room);
    scheduleWatchCameraStatusCheck();
  });
  room.on(RoomEvent.Disconnected || "disconnected", () => {
    watchLiveKitTracks.clear();
    [watchWhiteVideo, watchBlackVideo].forEach((video) => {
      if (video) video.srcObject = null;
    });
  });
}

function syncWatchLiveKitParticipants(room) {
  liveKitRemoteParticipants(room).forEach(syncWatchParticipant);
}

function scheduleWatchLiveKitSync(room) {
  [250, 750, 1500, 3000, 6000, 10000, 16000].forEach((delay) => {
    window.setTimeout(() => {
      if (watchLiveKitRoom === room) syncWatchLiveKitParticipants(room);
    }, delay);
  });
}

function syncWatchParticipant(participant) {
  for (const publication of liveKitPublications(participant)) {
    subscribeWatchPublication(publication, participant);
    if (publication?.track && (publication.isSubscribed ?? true)) attachWatchLiveKitTrack(publication.track, participant);
  }
}

function subscribeWatchPublication(publication, participant) {
  if (!publication) return;
  if (typeof publication.setEnabled === "function") {
    try {
      publication.setEnabled(true);
    } catch {
      // Older LiveKit publication objects may not support this.
    }
  }
  if (publication.track && (publication.isSubscribed ?? true)) {
    attachWatchLiveKitTrack(publication.track, participant);
    return;
  }
  if (typeof publication.setSubscribed !== "function") return;
  try {
    const result = publication.setSubscribed(true);
    if (result?.then) {
      result.then(() => {
        if (publication.track) attachWatchLiveKitTrack(publication.track, participant);
      }).catch(() => {});
    } else if (publication.track) {
      attachWatchLiveKitTrack(publication.track, participant);
    }
  } catch {
    // Keep the board and chat alive even if a camera subscription fails.
  }
}

function attachWatchLiveKitTrack(track, participant) {
  const kind = liveKitTrackKind(track);
  if (kind !== "video") return;
  const side = watchSideForParticipant(participant);
  const video = side === "black" ? watchBlackVideo : side === "white" ? watchWhiteVideo : null;
  if (!video) return;
  const mediaTrack = track.mediaStreamTrack;
  if (mediaTrack) {
    const stream = video.srcObject instanceof MediaStream ? video.srcObject : new MediaStream();
    stream.getVideoTracks().filter((item) => item !== mediaTrack).forEach((item) => stream.removeTrack(item));
    if (!stream.getTracks().includes(mediaTrack)) stream.addTrack(mediaTrack);
    video.srcObject = stream;
    watchLiveKitTracks.set(`${participant.identity}:video`, { element: video, track: mediaTrack });
  } else if (typeof track.attach === "function") {
    const element = track.attach(video);
    if (element && element !== video && element.srcObject) video.srcObject = element.srcObject;
    watchLiveKitTracks.set(`${participant.identity}:video`, { element: video, track });
  }
  video.muted = true;
  video.volume = 0;
  video.play?.().catch(() => {});
  renderWatchVideoSideStatus(side, side === "white" ? `${firstPlayer(selectedGame?.players?.white).username} · white` : `${firstPlayer(selectedGame?.players?.black).username} · black`);
}

function detachWatchLiveKitTrack(track, participant) {
  const side = watchSideForParticipant(participant);
  const video = side === "black" ? watchBlackVideo : side === "white" ? watchWhiteVideo : null;
  const mediaTrack = track?.mediaStreamTrack;
  if (video?.srcObject instanceof MediaStream && mediaTrack) {
    video.srcObject.removeTrack(mediaTrack);
    if (!video.srcObject.getTracks().length) video.srcObject = null;
  }
  watchLiveKitTracks.delete(`${participant?.identity}:video`);
}

function clearWatchParticipant(participant) {
  const side = watchSideForParticipant(participant);
  const video = side === "black" ? watchBlackVideo : side === "white" ? watchWhiteVideo : null;
  if (video) video.srcObject = null;
  [...watchLiveKitTracks.keys()]
    .filter((key) => key.startsWith(`${participant?.identity}:`))
    .forEach((key) => watchLiveKitTracks.delete(key));
}

function watchSideForParticipant(participant) {
  const identity = String(participant?.identity || "");
  if (!identity || identity.startsWith("watcher:")) return "";
  if (selectedGame?.players?.white?.some((player) => String(player.id) === identity)) return "white";
  if (selectedGame?.players?.black?.some((player) => String(player.id) === identity)) return "black";
  const metadata = parseParticipantMetadata(participant);
  return metadata.teamColor === "white" || metadata.teamColor === "black" ? metadata.teamColor : "";
}

function parseParticipantMetadata(participant) {
  try {
    return participant?.metadata ? JSON.parse(participant.metadata) : {};
  } catch {
    return {};
  }
}

function liveKitRemoteParticipants(room = watchLiveKitRoom) {
  if (!room) return [];
  const remote = room.remoteParticipants;
  if (remote instanceof Map) return [...remote.values()];
  return Object.values(remote || {});
}

function liveKitPublications(participant) {
  if (!participant) return [];
  if (typeof participant.getTrackPublications === "function") return participant.getTrackPublications();
  const maps = [participant.trackPublications, participant.videoTrackPublications, participant.audioTrackPublications].filter(Boolean);
  return maps.flatMap((items) => items instanceof Map ? [...items.values()] : Object.values(items));
}

function liveKitTrackKind(track) {
  const source = String(track?.source || "").toLowerCase();
  const kind = String(track?.kind || track?.mediaStreamTrack?.kind || "").toLowerCase();
  if (kind === "video" || source === "camera") return "video";
  if (kind === "audio" || source === "microphone") return "audio";
  return kind || source || "";
}

function closeWatchLiveKit() {
  clearTimeout(watchCameraStatusTimer);
  watchCameraStatusTimer = null;
  watchLiveKitGameId = "";
  if (!watchLiveKitRoom) return;
  try {
    watchLiveKitRoom.disconnect(false);
  } catch {
    try {
      watchLiveKitRoom.disconnect();
    } catch {
      // Already disconnected.
    }
  }
  watchLiveKitRoom = null;
  watchLiveKitTracks.clear();
  [watchWhiteVideo, watchBlackVideo].forEach((video) => {
    if (video) video.srcObject = null;
  });
}

function scheduleWatchCameraStatusCheck() {
  clearTimeout(watchCameraStatusTimer);
  watchCameraStatusTimer = window.setTimeout(() => {
    if (!watchLiveKitRoom || !selectedGame) return;
    if (!watchWhiteVideo?.srcObject) renderWatchVideoSideStatus("white", "Waiting for white camera");
    if (!watchBlackVideo?.srcObject) renderWatchVideoSideStatus("black", "Waiting for black camera");
  }, 3500);
}

function renderWatchPlayer(container, players, clock) {
  container.innerHTML = "";
  if (!players.length) {
    container.innerHTML = "<span>No player</span>";
    return;
  }
  const avatar = document.createElement("img");
  avatar.src = players[0].avatarUrl || "/default-avatar.svg";
  avatar.alt = "";
  const text = document.createElement("div");
  const names = sideLabel(players);
  const rating = players.reduce((sum, player) => sum + (player.rating || 1000), 0);
  text.innerHTML = `<strong>${escapeHtml(names)}</strong><span>${rating} rating${players.length > 1 ? " total" : ""}</span>`;
  const clockNode = document.createElement("b");
  clockNode.textContent = formatClock(clock);
  container.append(avatar, text, clockNode);
}

function renderBoard(fen, lastMove) {
  watchBoard.innerHTML = "";
  const rows = String(fen || "").split(" ")[0].split("/");
  if (rows.length !== 8) return renderEmptyBoard();
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const ranks = [8, 7, 6, 5, 4, 3, 2, 1];
  const pieceAt = {};
  rows.forEach((row, index) => {
    let fileIndex = 0;
    for (const char of row) {
      if (Number.isInteger(Number(char))) {
        fileIndex += Number(char);
      } else {
        pieceAt[`${files[fileIndex]}${8 - index}`] = char;
        fileIndex += 1;
      }
    }
  });
  ranks.forEach((rank) => {
    files.forEach((file) => {
      const squareName = `${file}${rank}`;
      const square = document.createElement("div");
      square.className = `square ${((files.indexOf(file) + ranks.indexOf(rank)) % 2 === 0) ? "light" : "dark"}`;
      if (lastMove && (lastMove.from === squareName || lastMove.to === squareName)) square.classList.add("last-move");
      const piece = pieceAt[squareName];
      if (piece) {
        square.classList.add(piece === piece.toUpperCase() ? "white-piece" : "black-piece");
        square.append(renderPiece(piece));
      }
      watchBoard.append(square);
    });
  });
}

function renderEmptyBoard() {
  if (!watchBoard) return;
  watchBoard.innerHTML = "";
  for (let index = 0; index < 64; index += 1) {
    const square = document.createElement("div");
    square.className = `square ${((Math.floor(index / 8) + index) % 2 === 0) ? "light" : "dark"}`;
    watchBoard.append(square);
  }
}

function renderPiece(piece) {
  if (window.ChessFacePieces?.render) return window.ChessFacePieces.render(piece);
  const fallback = document.createElement("span");
  fallback.className = "piece-img";
  fallback.textContent = piece;
  return fallback;
}

function firstPlayer(players = []) {
  return players[0] || { username: "Player", rating: 1000, countryCode: "OTHER" };
}

function countryLabel(player) {
  return player.countryCode && player.countryCode !== "OTHER" ? player.countryCode : "";
}

function formatRating(rating) {
  return String(Math.round(Number(rating) || 1000));
}

function formatClock(seconds) {
  const value = Math.max(0, Math.floor(Number(seconds) || 0));
  const minutes = Math.floor(value / 60);
  const rest = String(value % 60).padStart(2, "0");
  return `${minutes}:${rest}`;
}

function sideLabel(players = []) {
  return players.map((player) => player.username || "Player").join(" + ") || "Player";
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}
