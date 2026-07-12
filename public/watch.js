const watchGamesList = document.querySelector("#watchGamesList");
const watchProfileLink = document.querySelector("#watchProfileLink");
const watchLogoutButton = document.querySelector("#watchLogoutButton");
const watchLoginLink = document.querySelector("#watchLoginLink");
const refreshWatchButton = document.querySelector("#refreshWatchButton");

const token = localStorage.getItem("chessface:token");
let socket = null;
let liveGames = [];

renderNavigation();

watchLogoutButton?.addEventListener("click", () => {
  localStorage.removeItem("chessface:token");
  localStorage.removeItem("chessface:user");
  window.location.assign("/");
});

refreshWatchButton?.addEventListener("click", () => socket?.emit("watch:list"));

if (!token) {
  renderSignedOut();
} else {
  connectSocket();
}

function connectSocket() {
  socket = io({ auth: { token } });
  socket.on("connect", () => socket.emit("watch:list"));
  socket.on("connect_error", () => renderSignedOut("Please log in again to see live games."));
  socket.on("profile", (user) => {
    localStorage.setItem("chessface:user", JSON.stringify(user));
    renderNavigation();
  });
  socket.on("watch:list", ({ games = [] } = {}) => {
    liveGames = games;
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
      <tr>
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
      </tr>
    `;
  }).join("");

  watchGamesList.innerHTML = `
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
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
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

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}
