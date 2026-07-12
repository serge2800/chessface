const watchGamesList = document.querySelector("#watchGamesList");
const watchDetailSection = document.querySelector("#watchDetailSection");
const watchBoard = document.querySelector("#watchBoard");
const watchMatchup = document.querySelector("#watchMatchup");
const watchWhitePlayer = document.querySelector("#watchWhitePlayer");
const watchBlackPlayer = document.querySelector("#watchBlackPlayer");
const watchMoveStatus = document.querySelector("#watchMoveStatus");
const watchSpectatorCount = document.querySelector("#watchSpectatorCount");
const watchProfileLink = document.querySelector("#watchProfileLink");
const watchLogoutButton = document.querySelector("#watchLogoutButton");
const watchLoginLink = document.querySelector("#watchLoginLink");
const refreshWatchButton = document.querySelector("#refreshWatchButton");

const token = localStorage.getItem("chessface:token");
let socket = null;
let liveGames = [];
let selectedGame = null;
let watchNotice = "";

renderNavigation();

watchLogoutButton?.addEventListener("click", () => {
  localStorage.removeItem("chessface:token");
  localStorage.removeItem("chessface:user");
  window.location.assign("/");
});

refreshWatchButton?.addEventListener("click", () => socket?.emit("watch:list"));
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
    renderSelectedGame();
    renderGameTable();
  });
}

function renderSelectedGame() {
  watchDetailSection?.classList.toggle("hidden", !selectedGame);
  if (!selectedGame) {
    renderEmptyBoard();
    watchMoveStatus.textContent = "No game selected";
    watchSpectatorCount.textContent = "0 watching";
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
  } else {
    renderBoard(selectedGame.fen, selectedGame.lastMove);
  }
  watchMoveStatus.textContent = selectedGame.status === "playing"
    ? `${selectedGame.loading ? "Opening game" : selectedGame.turn === "white" ? "White" : "Black"}${selectedGame.loading ? "" : " to move"} · ${selectedGame.moveCount || 0} moves`
    : "Game finished";
  watchSpectatorCount.textContent = `${selectedGame.spectatorCount || 0} watching`;
  watchDetailSection?.scrollIntoView({ block: "start", behavior: "smooth" });
}

function showWatchNotice(message) {
  watchNotice = message;
  renderGameTable();
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
