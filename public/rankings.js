const rankingsList = document.querySelector("#rankingsList");
const rankingTotal = document.querySelector("#rankingTotal");
const rankingOnline = document.querySelector("#rankingOnline");
const rankingTop = document.querySelector("#rankingTop");
const rankingsUpdated = document.querySelector("#rankingsUpdated");
const refreshRankingsButton = document.querySelector("#refreshRankingsButton");
const rankingsProfileLink = document.querySelector("#rankingsProfileLink");
const rankingsLogoutButton = document.querySelector("#rankingsLogoutButton");
const rankingsLoginLink = document.querySelector("#rankingsLoginLink");

refreshRankingsButton.addEventListener("click", loadRankings);
rankingsLogoutButton.addEventListener("click", () => {
  localStorage.removeItem("chessface:token");
  window.location.assign("/");
});

renderNavigation();
loadRankings();

function renderNavigation() {
  const isLoggedIn = Boolean(localStorage.getItem("chessface:token"));
  rankingsProfileLink.classList.toggle("hidden", !isLoggedIn);
  rankingsLogoutButton.classList.toggle("hidden", !isLoggedIn);
  rankingsLoginLink.classList.toggle("hidden", isLoggedIn);
}

async function loadRankings() {
  refreshRankingsButton.disabled = true;
  rankingsUpdated.textContent = "Loading...";
  try {
    const response = await fetch("/api/rankings");
    const data = await readJsonResponse(response);
    if (!response.ok) throw new Error(data.error || "Rankings are not available right now.");
    renderRankings(data);
  } catch (error) {
    rankingsList.innerHTML = `<div class="ranking-empty">${escapeHtml(error.message || "Could not load rankings.")}</div>`;
    rankingsUpdated.textContent = "Needs refresh";
  } finally {
    refreshRankingsButton.disabled = false;
  }
}

async function readJsonResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return { error: "The server returned a webpage instead of rankings. Restart Node.js in Plesk, then try again." };
  }
  return response.json();
}

function renderRankings(data) {
  const players = Array.isArray(data.players) ? data.players : [];
  rankingTotal.textContent = data.totalPlayers || players.length || 0;
  rankingOnline.textContent = data.onlinePlayers || players.filter((player) => player.online).length;
  rankingTop.textContent = players[0]?.rating || "-";
  rankingsUpdated.textContent = `Updated ${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;

  if (!players.length) {
    rankingsList.innerHTML = '<div class="ranking-empty">No registered players yet.</div>';
    return;
  }

  rankingsList.innerHTML = players.map(renderPlayer).join("");
}

function renderPlayer(player) {
  const podiumClass = player.rank <= 3 ? ` podium podium-${player.rank}` : "";
  return `
    <article class="ranking-row${podiumClass}">
      <div class="ranking-place">#${player.rank}</div>
      <img class="ranking-avatar" src="${escapeHtml(player.avatarUrl || "/default-avatar.svg")}" alt="" />
      <div class="ranking-player">
        <strong>${flagEmoji(player.countryCode)} ${escapeHtml(player.username || "Player")}</strong>
        <span>${escapeHtml(player.fullName || player.countryName || "ChessFace player")}</span>
      </div>
      <div class="ranking-stat ranking-rating">
        <span>Rating</span>
        <strong>${Number(player.rating || 1000)}</strong>
      </div>
      <div class="ranking-stat ranking-games">
        <span>Games</span>
        <strong>${Number(player.gamesPlayed || 0)}</strong>
      </div>
      <div class="ranking-stat ranking-friends">
        <span>Friends</span>
        <strong>${Number(player.friendsCount || 0)}</strong>
      </div>
      <div class="ranking-status ${player.online ? "online" : ""}">
        ${player.online ? "Online" : "Offline"}
      </div>
      <div class="ranking-joined">${formatJoined(player.joinedAt)}</div>
    </article>
  `;
}

function formatJoined(value) {
  if (!value) return "Joined recently";
  return `Joined ${new Date(value).toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })}`;
}

function flagEmoji(countryCode) {
  if (!countryCode || countryCode === "OTHER") return "";
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt()));
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}
