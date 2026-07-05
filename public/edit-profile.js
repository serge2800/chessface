const token = localStorage.getItem("chessface:token");
const editProfileForm = document.querySelector("#editProfileForm");
const editAvatarPreview = document.querySelector("#editAvatarPreview");
const editUsername = document.querySelector("#editUsername");
const editName = document.querySelector("#editName");
const editCountry = document.querySelector("#editCountry");
const editFlag = document.querySelector("#editFlag");
const editAvatar = document.querySelector("#editAvatar");
const editProfileNotice = document.querySelector("#editProfileNotice");
const dashboardButton = document.querySelector("#dashboardButton");

bootEditProfile();

dashboardButton.addEventListener("click", () => {
  location.href = "/";
});

editCountry.addEventListener("change", () => {
  editFlag.textContent = flagEmoji(editCountry.value);
});

editAvatar.addEventListener("change", () => {
  const file = editAvatar.files[0];
  if (file) editAvatarPreview.src = URL.createObjectURL(file);
});

editProfileForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  editProfileNotice.textContent = "";
  const response = await fetch("/api/profile", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: new FormData(editProfileForm)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    editProfileNotice.textContent = data.error || "Could not save profile.";
    return;
  }
  editAvatarPreview.src = data.user.avatarUrl;
  editFlag.textContent = flagEmoji(data.user.countryCode);
  editProfileNotice.textContent = "Profile saved.";
});

async function bootEditProfile() {
  if (!token) {
    location.href = "/";
    return;
  }
  const response = await fetch("/api/me", { headers: { Authorization: `Bearer ${token}` } });
  if (!response.ok) {
    location.href = "/";
    return;
  }
  const { user } = await response.json();
  if (user.isGuest) {
    sessionStorage.setItem("chessface:notice", "Create a free account to add a profile photo or edit profile details.");
    location.href = "/";
    return;
  }
  editAvatarPreview.src = user.avatarUrl;
  editUsername.textContent = user.username;
  editName.textContent = user.fullName || "";
  editCountry.value = user.countryCode || "US";
  editFlag.textContent = flagEmoji(user.countryCode);
}

function flagEmoji(countryCode) {
  if (!countryCode || countryCode === "OTHER") return "🏳";
  return countryCode.toUpperCase().replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt()));
}
