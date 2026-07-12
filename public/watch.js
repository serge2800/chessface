const watchGamesList = document.querySelector("#watchGamesList");
const watchBoard = document.querySelector("#watchBoard");
const watchMatchup = document.querySelector("#watchMatchup");
const watchWhitePlayer = document.querySelector("#watchWhitePlayer");
const watchBlackPlayer = document.querySelector("#watchBlackPlayer");
const watchMoveStatus = document.querySelector("#watchMoveStatus");
const watchSpectatorCount = document.querySelector("#watchSpectatorCount");
const watchChatStatus = document.querySelector("#watchChatStatus");
const watchChatMessages = document.querySelector("#watchChatMessages");
const watchChatForm = document.querySelector("#watchChatForm");
const watchChatInput = document.querySelector("#watchChatInput");
const watchChatSubmit = document.querySelector("#watchChatSubmit");
const watchProfileLink = document.querySelector("#watchProfileLink");
const watchLogoutButton = document.querySelector("#watchLogoutButton");
const watchLoginLink = document.querySelector("#watchLoginLink");
const refreshWatchButton = document.querySelector("#refreshWatchButton");

const token = localStorage.getItem("chessface:token");
let socket = null;
let me = null;
let liveGames = [];
let selectedGame = null;
let chatMessages = [];

renderNavigation();
renderEmptyBoard();

watchLogoutButton?.addEventListener("click", () => {
  localStorage.removeItem("chessface:token");
  localStorage.removeItem("chessface:user");
  window.location.assign("/");
});

refreshWatchButton?.addEventListener("click", () => socket?.emit("watch:list"));

watchChatForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = watchChatInput.value.trim();
  if (!text || !selectedGame) return;
  socket?.emit("watch:chat", { gameId: selectedGame.id, text });
  watchChatInput.value = "";
});

if (!token) {
  renderSignedOut();
} else {
  connectSocket();
}

function connectSocket() {
  socket = io({ auth: { token } });
  socket.on("connect", () => socket.emit("watch:list"));
  socket.on("connect_error", () => renderSignedOut("Please log in again to watch live games."));
  socket.on("profile", (user) => {
    me = user;
    localStorage.setItem("chessface:user", JSON.stringify(user));
    renderNavigation();
  });
  socket.on("watch:list", ({ games = [] } = {}) => {
    liveGames = games;
    renderGameList();
    if (!selectedGame && liveGames[0]) joinGame(liveGames[0].id);
    if (selectedGame && !liveGames.some((game) => game.id === selectedGame.id)) {
      selectedGame = null;
      chatMessages = [];
      renderSelectedGame();
      renderChat();
    }
  });
  socket.on("watch:game", (game) => {
    selectedGame = game;
    renderSelectedGame();
    renderGameList();
  });
  socket.on("watch:chat:history", ({ gameId, messages = [] } = {}) => {
    if (!selectedGame || gameId !== selectedGame.id) return;
    chatMessages = messages.slice(-80);
    renderChat();
  });
  socket.on("watch:chat", (message) => {
    if (!selectedGame || message.gameId !== selectedGame.id) return;
    chatMessages.push(message);
    chatMessages = chatMessages.slice(-80);
    renderChat();
  });
  socket.on("error:message", (message) => {
    watchMoveStatus.textContent = message || "Could not watch that game.";
  });
}

function renderNavigation() {
  const isLoggedIn = Boolean(token);
  watchProfileLink?.classList.toggle("hidden", !isLoggedIn);
  watchLogoutButton?.classList.toggle("hidden", !isLoggedIn);
  watchLoginLink?.classList.toggle("hidden", isLoggedIn);
}

function renderSignedOut(message = "Log in or play as guest to watch live games.") {
  watchGamesList.innerHTML = `<div class="watch-empty">${escapeHtml(message)}</div>`;
  watchMoveStatus.textContent = "Login required";
  watchChatStatus.textContent = "Closed";
  watchChatInput.disabled = true;
  watchChatSubmit.disabled = true;
}

function joinGame(gameId) {
  if (!gameId || selectedGame?.id === gameId) return;
  chatMessages = [];
  renderChat();
  socket?.emit("watch:join", { gameId });
}

function renderGameList() {
  if (!liveGames.length) {
    watchGamesList.innerHTML = '<div class="watch-empty">No live games right now.</div>';
    return;
  }
  watchGamesList.innerHTML = "";
  liveGames.forEach((game, index) => {
    const white = sideLabel(game.players?.white || []);
    const black = sideLabel(game.players?.black || []);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "watch-game-card";
    button.classList.toggle("active", selectedGame?.id === game.id);
    button.innerHTML = `
      <span class="watch-game-rank">#${index + 1}</span>
      <strong>${escapeHtml(white)} vs ${escapeHtml(black)}</strong>
      <span>${escapeHtml(game.timeControl || "")} · ${game.moveCount || 0} moves · ${game.ratingTotal || 0} combined rating</span>
      <small>${game.spectatorCount || 0} watching</small>
    `;
    button.addEventListener("click", () => joinGame(game.id));
    watchGamesList.append(button);
  });
}

function renderSelectedGame() {
  if (!selectedGame) {
    watchMatchup.innerHTML = `
      <p class="eyebrow">Spectator board</p>
      <h2>Select a live game</h2>
      <span>Games are sorted by combined player rating.</span>
    `;
    renderEmptyBoard();
    renderWatchPlayer(watchBlackPlayer, []);
    renderWatchPlayer(watchWhitePlayer, []);
    watchMoveStatus.textContent = "No game selected";
    watchSpectatorCount.textContent = "0 watching";
    watchChatStatus.textContent = "Closed";
    watchChatInput.disabled = true;
    watchChatSubmit.disabled = true;
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
  renderBoard(selectedGame.fen, selectedGame.lastMove);
  watchMoveStatus.textContent = selectedGame.status === "playing"
    ? `${selectedGame.turn === "white" ? "White" : "Black"} to move · ${selectedGame.moveCount || 0} moves`
    : "Game finished";
  watchSpectatorCount.textContent = `${selectedGame.spectatorCount || 0} watching`;
  watchChatStatus.textContent = selectedGame.status === "playing" ? "Live" : "Closed";
  watchChatInput.disabled = selectedGame.status !== "playing";
  watchChatSubmit.disabled = selectedGame.status !== "playing";
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

function renderChat() {
  watchChatMessages.innerHTML = "";
  if (!chatMessages.length) {
    const empty = document.createElement("p");
    empty.className = "chat-empty";
    empty.textContent = selectedGame ? "No spectator messages yet." : "Select a live game to chat with other spectators.";
    watchChatMessages.append(empty);
    return;
  }
  chatMessages.forEach((message) => {
    const row = document.createElement("div");
    const isMine = message.from === me?.id;
    row.className = `chat-message ${isMine ? "mine" : "theirs"}`;
    const name = document.createElement("strong");
    name.textContent = isMine ? "You" : message.username;
    const text = document.createElement("span");
    text.textContent = message.text;
    row.append(name, text);
    watchChatMessages.append(row);
  });
  watchChatMessages.scrollTop = watchChatMessages.scrollHeight;
}

function sideLabel(players) {
  return players.map((player) => player.username || "Player").join(" + ") || "Player";
}

function formatClock(seconds) {
  const value = Math.max(0, Math.floor(Number(seconds) || 0));
  const minutes = Math.floor(value / 60);
  const rest = String(value % 60).padStart(2, "0");
  return `${minutes}:${rest}`;
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
