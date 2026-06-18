const token = localStorage.getItem("chessface:token");
const friendsMeta = document.querySelector("#friendsMeta");
const friendsGrid = document.querySelector("#friendsGrid");
const friendForm = document.querySelector("#friendForm");
const friendNotice = document.querySelector("#friendNotice");
const messagePanel = document.querySelector("#messagePanel");
const dashboardButton = document.querySelector("#dashboardButton");
const requestPanel = document.querySelector("#requestPanel");

let friends = [];
let incomingRequests = [];
let outgoingRequests = [];
let activeFriendId;

bootFriends();

dashboardButton.addEventListener("click", () => {
  location.href = "/";
});

friendForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  friendNotice.textContent = "";
  const username = new FormData(friendForm).get("username");
  const response = await fetch("/api/friends", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ username })
  });
  const data = await response.json();
  if (!response.ok) {
    friendNotice.textContent = data.error || "Could not add friend.";
    return;
  }
  friendNotice.textContent = data.accepted ? "Friend request accepted." : "Friend request sent.";
  friendForm.reset();
  await bootFriends();
});

async function bootFriends() {
  if (!token) {
    location.href = "/";
    return;
  }
  const profileResponse = await fetch("/api/me", { headers: { Authorization: `Bearer ${token}` } });
  if (!profileResponse.ok) {
    location.href = "/";
    return;
  }
  const { user } = await profileResponse.json();
  if (user.isGuest) {
    sessionStorage.setItem("chessface:notice", "Create a free account to add friends, message players, and view profiles.");
    location.href = "/";
    return;
  }
  const response = await fetch("/api/friends", { headers: { Authorization: `Bearer ${token}` } });
  if (!response.ok) {
    location.href = "/";
    return;
  }
  const data = await response.json();
  friends = data.friends;
  incomingRequests = data.incomingRequests || [];
  outgoingRequests = data.outgoingRequests || [];
  renderRequests();
  renderFriends();
}

function renderRequests() {
  const hasRequests = incomingRequests.length || outgoingRequests.length;
  requestPanel.classList.toggle("hidden", !hasRequests);
  if (!hasRequests) {
    requestPanel.innerHTML = "";
    return;
  }
  requestPanel.innerHTML = `
    ${incomingRequests.length ? `
      <div>
        <p class="eyebrow">Friend requests</p>
        <div class="request-list">
          ${incomingRequests.map((player) => renderRequestRow(player, "incoming")).join("")}
        </div>
      </div>
    ` : ""}
    ${outgoingRequests.length ? `
      <div>
        <p class="eyebrow">Sent requests</p>
        <div class="request-list">
          ${outgoingRequests.map((player) => renderRequestRow(player, "outgoing")).join("")}
        </div>
      </div>
    ` : ""}
  `;
  requestPanel.querySelectorAll("button[data-request-action]").forEach((button) => {
    button.addEventListener("click", async () => {
      const id = button.dataset.playerId;
      const action = button.dataset.requestAction;
      if (action === "accept") await acceptRequest(id);
      if (action === "decline" || action === "cancel") await removeRequest(id);
    });
  });
}

function renderRequestRow(player, type) {
  const actions = type === "incoming"
    ? `
      <button type="button" data-request-action="accept" data-player-id="${player.id}">Accept</button>
      <button type="button" class="danger" data-request-action="decline" data-player-id="${player.id}">Decline</button>
    `
    : `<button type="button" class="danger" data-request-action="cancel" data-player-id="${player.id}">Cancel</button>`;
  return `
    <article class="request-row">
      <img src="${escapeHtml(player.avatarUrl || "/default-avatar.svg")}" alt="" />
      <div>
        <strong>${flagEmoji(player.countryCode)} ${escapeHtml(player.username)}</strong>
        <span>${player.rating} rating</span>
      </div>
      <div class="request-actions">${actions}</div>
    </article>
  `;
}

async function acceptRequest(playerId) {
  await fetch(`/api/friends/requests/${playerId}/accept`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  });
  await bootFriends();
}

async function removeRequest(playerId) {
  await fetch(`/api/friends/requests/${playerId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  await bootFriends();
}

function renderFriends() {
  friendsMeta.textContent = `${friends.length} friend${friends.length === 1 ? "" : "s"}`;
  if (!friends.length) {
    friendsGrid.innerHTML = '<div class="empty-history">No friends yet. Add someone by name or nickname.</div>';
    return;
  }
  friendsGrid.innerHTML = "";
  friends.forEach((friend) => {
    const card = document.createElement("article");
    card.className = `friend-card ${friend.id === activeFriendId ? "is-active" : ""}`;
    card.innerHTML = `
      <div class="friend-main">
        <img src="${escapeHtml(friend.avatarUrl || "/default-avatar.svg")}" alt="" />
        <div>
          <h2>${flagEmoji(friend.countryCode)} ${escapeHtml(friend.username)}</h2>
          <p>${escapeHtml(friend.fullName || friend.countryName || "Player")} · Joined ${formatDateOnly(friend.joinedAt)}</p>
          <span class="status-pill ${friend.online ? "online" : ""}">${friend.online ? "Online" : "Offline"}</span>
        </div>
      </div>
      <div class="friend-stats">
        <span>Rating <strong>${friend.rating}</strong></span>
        <span>Games <strong>${friend.gamesPlayed || 0}</strong></span>
        <span>Friends <strong>${friend.friendsCount || 0}</strong></span>
      </div>
      <div class="friend-games">
        <h3>Recent games</h3>
        ${friend.recentGames.length ? friend.recentGames.map(renderRecentGame).join("") : '<p>No games yet.</p>'}
      </div>
      <div class="friend-actions">
        <button type="button" data-action="message">Message</button>
        <button type="button" class="danger" data-action="remove">Remove</button>
      </div>
    `;
    card.addEventListener("click", async (event) => {
      const action = event.target.closest("button")?.dataset.action;
      if (action === "remove") return removeFriend(friend.id);
      if (action === "message") return openMessages(friend.id);
    });
    friendsGrid.append(card);
  });
}

async function removeFriend(friendId) {
  await fetch(`/api/friends/${friendId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  if (activeFriendId === friendId) {
    activeFriendId = null;
    messagePanel.innerHTML = "<p>Select a friend to open messages.</p>";
  }
  await bootFriends();
}

async function openMessages(friendId) {
  activeFriendId = friendId;
  renderFriends();
  const friend = friends.find((item) => item.id === friendId);
  const response = await fetch(`/api/messages/${friendId}`, { headers: { Authorization: `Bearer ${token}` } });
  const data = await response.json();
  messagePanel.innerHTML = `
    <div class="message-heading">
      <div>
        <p class="eyebrow">Messages</p>
        <h2>${flagEmoji(friend.countryCode)} ${escapeHtml(friend.username)}</h2>
      </div>
      <span class="status-pill ${friend.online ? "online" : ""}">${friend.online ? "Online" : "Offline"}</span>
    </div>
    <div class="message-list" id="messageList">
      ${data.messages.length ? data.messages.map((message) => renderMessage(message, friendId)).join("") : '<p>No messages yet.</p>'}
    </div>
    <form class="message-form" id="messageForm">
      <input name="text" placeholder="Write a message" maxlength="600" required />
      <button class="primary" type="submit">Send</button>
    </form>
  `;
  messagePanel.querySelector("#messageForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const text = new FormData(event.currentTarget).get("text");
    await fetch(`/api/messages/${friendId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ text })
    });
    await openMessages(friendId);
  });
  const list = messagePanel.querySelector("#messageList");
  list.scrollTop = list.scrollHeight;
}

function renderMessage(message, friendId) {
  const mine = message.from !== friendId;
  return `
    <div class="message-bubble ${mine ? "mine" : ""}">
      <p>${escapeHtml(message.text)}</p>
      <span>${formatMessageTime(message.sentAt)}</span>
    </div>
  `;
}

function renderRecentGame(game) {
  const change = game.ratingChange || 0;
  return `
    <div class="friend-game-row">
      <span>${escapeHtml(game.result)} vs ${escapeHtml(game.opponent)}</span>
      <span>${game.timeControl}</span>
      <b class="${change >= 0 ? "up" : "down"}">${change >= 0 ? "+" : ""}${change}</b>
    </div>
  `;
}

function formatDateOnly(value) {
  if (!value) return "recently";
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}

function formatMessageTime(value) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
}

function flagEmoji(countryCode) {
  if (!countryCode || countryCode === "OTHER") return "🏳";
  return countryCode.toUpperCase().replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt()));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}
