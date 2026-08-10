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
const matchIntro = document.querySelector("#matchIntro");
const matchIntroTitle = document.querySelector("#matchIntroTitle");
const matchIntroYou = document.querySelector("#matchIntroYou");
const matchIntroOpponent = document.querySelector("#matchIntroOpponent");
const matchIntroLine = document.querySelector("#matchIntroLine");
const gameLayout = document.querySelector("#gameLayout");
const board = document.querySelector("#board");
const evalBarFill = document.querySelector("#evalBarFill");
const evalBarLabel = document.querySelector("#evalBarLabel");
const topDonkeyMood = document.querySelector("#topDonkeyMood");
const bottomDonkeyMood = document.querySelector("#bottomDonkeyMood");
const boardWrap = document.querySelector(".board-wrap");
const boardMeta = document.querySelector("#boardMeta");
const turnAlarmButton = document.querySelector("#turnAlarmButton");
const turnRandomSoundButton = document.querySelector("#turnRandomSoundButton");
const turnCustomSoundControl = document.querySelector("#turnCustomSoundControl");
const turnCustomSoundButton = document.querySelector("#turnCustomSoundButton");
const turnCustomSoundMenuButton = document.querySelector("#turnCustomSoundMenuButton");
const turnCustomSoundSetting = document.querySelector("#turnCustomSoundSetting");
const turnCustomSoundLabel = document.querySelector("#turnCustomSoundLabel");
const turnCustomSoundMenu = document.querySelector("#turnCustomSoundMenu");
const faceMeshButton = document.querySelector("#faceMeshButton");
const takebackRequestButton = document.querySelector("#takebackRequestButton");
const turnStatusButton = document.querySelector("#turnStatusButton");
const acceptBegTakebackButton = document.querySelector("#acceptBegTakebackButton");
const statusTitle = document.querySelector("#statusTitle");
const gameStatus = document.querySelector("#gameStatus");
const playerColor = document.querySelector("#playerColor");
const drawBox = document.querySelector("#drawBox");
const drawText = document.querySelector("#drawText");
const takebackRequestModal = document.querySelector("#takebackRequestModal");
const takebackRequestCard = takebackRequestModal?.querySelector(".takeback-request-card");
const takebackRequestPrompt = takebackRequestModal?.querySelector("p");
const takebackRequestActions = takebackRequestModal?.querySelector(".takeback-request-actions");
const acceptTakebackButton = document.querySelector("#acceptTakebackButton");
const rejectTakebackButton = document.querySelector("#rejectTakebackButton");
const begTakebackButton = document.querySelector("#begTakebackButton");
const videoGrid = document.querySelector("#videoGrid");
const localVideo = document.querySelector("#localVideo");
const remoteVideo = document.querySelector("#remoteVideo");
const localVideoLabel = document.querySelector("#localVideoLabel");
const remoteVideoLabel = document.querySelector("#remoteVideoLabel");
const micButton = document.querySelector("#micButton");
const opponentMuteButton = document.querySelector("#opponentMuteButton");
const cameraButton = document.querySelector("#cameraButton");
const gameChatForm = document.querySelector("#gameChatForm");
const gameChatInput = document.querySelector("#gameChatInput");
const gameChatMessages = document.querySelector("#gameChatMessages");
const gameChatSubmit = gameChatForm?.querySelector("button[type='submit']");
const emojiToggle = document.querySelector("#emojiToggle");
const emojiPanel = document.querySelector("#emojiPanel");
const chatStatus = document.querySelector("#chatStatus");
const teamRoster = document.querySelector("#teamRoster");
const profileButton = document.querySelector("#profileButton");
const logoutButton = document.querySelector("#logoutButton");
const settingsButton = document.querySelector("#settingsButton");
const settingsModal = document.querySelector("#settingsModal");
const closeSettingsButton = document.querySelector("#closeSettingsButton");
const boardThemeButtons = document.querySelectorAll(".board-choice");
const highlightMovesSetting = document.querySelector("#highlightMovesSetting");
const legalMovesSetting = document.querySelector("#legalMovesSetting");
const premovesSetting = document.querySelector("#premovesSetting");
const coordinatesSetting = document.querySelector("#coordinatesSetting");
const moveSoundSetting = document.querySelector("#moveSoundSetting");
const faceMeshAlwaysOnSetting = document.querySelector("#faceMeshAlwaysOnSetting");
const capturedPiecesSetting = document.querySelector("#capturedPiecesSetting");
const confirmActionsSetting = document.querySelector("#confirmActionsSetting");
const allowChallengesSetting = document.querySelector("#allowChallengesSetting");
const autoPromoteQueenSetting = document.querySelector("#autoPromoteQueenSetting");
const checkSoundSearch = document.querySelector("#checkSoundSearch");
const checkSoundResults = document.querySelector("#checkSoundResults");
const checkSoundSetting = document.querySelector("#checkSoundSetting");
const checkmateSoundSearch = document.querySelector("#checkmateSoundSearch");
const checkmateSoundResults = document.querySelector("#checkmateSoundResults");
const checkmateSoundSetting = document.querySelector("#checkmateSoundSetting");
const installPrompt = document.querySelector("#installPrompt");
const gameResultModal = document.querySelector("#gameResultModal");
const gameResultReason = document.querySelector("#gameResultReason");
const gameResultTitle = document.querySelector("#gameResultTitle");
const gameResultScore = document.querySelector("#gameResultScore");
const gameResultDetails = document.querySelector("#gameResultDetails");
const gameResultRematchButton = document.querySelector("#gameResultRematchButton");
const gameResultDashboardButton = document.querySelector("#gameResultDashboardButton");
const gameResultContinueVideoButton = document.querySelector("#gameResultContinueVideoButton");
const gameResultEndCallButton = document.querySelector("#gameResultEndCallButton");
const gameResultAnalysisButton = document.querySelector("#gameResultAnalysisButton");
const gameResultShareButton = document.querySelector("#gameResultShareButton");
const resultSharePanel = document.querySelector("#resultSharePanel");
const resultShareLink = document.querySelector("#resultShareLink");
const copyResultLinkButton = document.querySelector("#copyResultLinkButton");
const facebookShareResultButton = document.querySelector("#facebookShareResultButton");
const whatsappShareResultButton = document.querySelector("#whatsappShareResultButton");
const xShareResultButton = document.querySelector("#xShareResultButton");
const copySocialResultButton = document.querySelector("#copySocialResultButton");
const rematchRequestModal = document.querySelector("#rematchRequestModal");
const rematchRequestTitle = document.querySelector("#rematchRequestTitle");
const rematchRequestText = document.querySelector("#rematchRequestText");
const acceptRematchButton = document.querySelector("#acceptRematchButton");
const declineRematchButton = document.querySelector("#declineRematchButton");
const accuracyAnalysisStatus = document.querySelector("#accuracyAnalysisStatus");
const accuracyAnalysisPanel = document.querySelector("#accuracyAnalysisPanel");

const pieceMap = {
  p: "♟", r: "♜", n: "♞", b: "♝", q: "♛", k: "♚",
  P: "♙", R: "♖", N: "♘", B: "♗", Q: "♕", K: "♔"
};
const pieceArtMap = { p: "♟", r: "♜", n: "♞", b: "♝", q: "♛", k: "♚" };
const chatEmojis = [
  "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "🙂", "🙃", "😉",
  "😍", "🥰", "😘", "😎", "🤓", "🧐", "🤔", "🤨", "😮", "😯", "😲", "😳",
  "😬", "😤", "😭", "🥲", "😱", "🤯", "😈", "😇", "🥳", "🫡", "🤌", "🤝",
  "👍", "👎", "👏", "🙌", "🙏", "💪", "👀", "🧠", "☕", "🔥", "✨", "⚡",
  "🎉", "🏆", "💯", "❤️", "💛", "💚", "💙", "💜", "👑", "🎩", "🕶️", "🍓",
  "♟️", "♞", "♜", "♛", "♚", "⚔️", "🛡️", "🥷", "🧨", "💣", "🚀",
  "✅", "❌", "📈", "📉", "⏰", "💀", "🤡", "🙈", "🙉", "🙊", "🫠", "😵‍💫"
];

const defaultSettings = {
  boardTheme: "green",
  highlightMoves: true,
  legalMoves: true,
  premoves: false,
  coordinates: true,
  moveSound: true,
  faceMeshAlwaysOn: false,
  capturedPieces: true,
  confirmActions: true,
  allowChallenges: true,
  autoPromoteQueen: false
};

const VIDEO_OUTPUT_WIDTH = 320;
const VIDEO_OUTPUT_HEIGHT = 240;
const VIDEO_FRAME_RATE = 12;
const VIDEO_MAX_BITRATE = 280000;
const APP_VERSION = "2026-08-10-left-rail-no-white-lines-v2";
const STYLE_VERSION = "2026-08-10-left-rail-no-white-lines-v2";
const LIVEKIT_CLIENT_URL = "https://cdn.jsdelivr.net/npm/livekit-client/+esm";
const MEDIAPIPE_FACE_MESH_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js";
const MEDIAPIPE_DRAWING_UTILS_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js";
const BAD_BLUNDER_CP_DROP = 350;
const FACE_ZOOM_MS = 1000;
const MATCH_INTRO_MS = 2000;
const MATCH_INTRO_SOUND_URL = "/assets/ninja-intro.m4a?v=2026-07-13";
const TIME_TROUBLE_SECONDS = 10;
const HEARTBEAT_COOLDOWN_MS = 850;
const VIDEO_CONSTRAINTS = {
  width: { ideal: VIDEO_OUTPUT_WIDTH, max: 480 },
  height: { ideal: VIDEO_OUTPUT_HEIGHT, max: 360 },
  frameRate: { ideal: VIDEO_FRAME_RATE, max: VIDEO_FRAME_RATE },
  facingMode: "user"
};

let mode = "login";
let token = localStorage.getItem("chessface:token");
let cachedUser = loadCachedUser();
let settings = loadSettings();
let socket;
let me;
let appShown = false;
let selectedTime = "5+0";
let currentGame;
let boardHistoryIndex = null;
let postGameVideoTimer;
let postGameTimeControl = "5+0";
let pendingRematchGameId = null;
let liveEvalWorker = null;
let liveEvalReadyPromise = null;
let liveEvalCleanup = null;
let liveEvalTimer = null;
let liveEvalSearchId = 0;
let liveEvalSourceIndex = 0;
let accuracyAnalysisServicePromise = null;
let lastFaceZoomEval = null;
let lastFaceZoomMoveKey = "";
let lastHeartbeatAt = 0;
let lastHeartbeatKey = "";
const LIVE_STOCKFISH_SOURCES = [
  {
    label: "Local Stockfish 18 lite",
    create: () => createLocalStockfishWorker("stockfish-18-lite-single.js", "stockfish-18-lite-single.wasm")
  },
  {
    label: "Local Stockfish 18 fallback",
    create: () => createLocalStockfishWorker("stockfish-18-asm.js")
  }
];
const DONKEY_MOODS = [
  { id: "10-losing-crushed", webm: "/assets/eval-optimized/10.webm", mp4: "/assets/eval-optimized/10.mp4", label: "Losing badly", max: -800 },
  { id: "9-losing-horrible", webm: "/assets/eval-optimized/9.webm", mp4: "/assets/eval-optimized/9.mp4", label: "Very bad", max: -500 },
  { id: "8-losing-danger", webm: "/assets/eval-optimized/8.webm", mp4: "/assets/eval-optimized/8.mp4", label: "In danger", max: -300 },
  { id: "7-losing-worse", webm: "/assets/eval-optimized/7.webm", mp4: "/assets/eval-optimized/7.mp4", label: "Worse", max: -150 },
  { id: "6-losing-slightly", webm: "/assets/eval-optimized/6.webm", mp4: "/assets/eval-optimized/6.mp4", label: "Slightly worse", max: -30 },
  { id: "5-balanced", webm: "/assets/eval-optimized/5.webm", mp4: "/assets/eval-optimized/5.mp4", label: "Balanced", max: 30 },
  { id: "4-winning-slightly", webm: "/assets/eval-optimized/4.webm", mp4: "/assets/eval-optimized/4.mp4", label: "Slightly better", max: 150 },
  { id: "3-winning-good", webm: "/assets/eval-optimized/3.webm", mp4: "/assets/eval-optimized/3.mp4", label: "Good", max: 300 },
  { id: "2-winning-very-good", webm: "/assets/eval-optimized/2.webm", mp4: "/assets/eval-optimized/2.mp4", label: "Very good", max: 500 },
  { id: "1-winning-happiest", webm: "/assets/eval-optimized/1.webm", mp4: "/assets/eval-optimized/1.mp4", label: "Winning big", max: Infinity }
];
const DONKEY_VIDEO_FALLBACK_MOOD = DONKEY_MOODS[5];
const donkeyVideoPreloads = new Map();
let donkeyVideoFormat = null;
let donkeyVideoWarmupStarted = false;
let matchmakingSlidesPreloaded = false;
let selectedSquare;
let pendingPremove = null;
let playingPremove = false;
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
let liveKitPublishRepairTimer;
let faceMeshEnabled = false;
let faceMeshModulePromise;
let faceMeshInstance = null;
let faceMeshRenderer = null;
let faceMeshFrameInFlight = false;
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
let filteredLocalStream;
let deferredInstallPrompt;
let gameChat = [];
let shownResultDialogKey = "";
let soundSettings = loadSoundSettings();
let playerSoundSettings = new Map();
let lastPlayedSoundEventId = "";
let randomSoundMicSuppressionActive = false;
let accuracyAnalysisRunId = 0;
let analyzingAccuracyGameId = "";

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("verified") === "1") {
  authNotice.textContent = "Email confirmed. You can log in now.";
}

function ensureFreshAssetLinks() {
  const stylesheet = document.querySelector('link[rel="stylesheet"][href^="styles.css"]');
  if (stylesheet && !stylesheet.href.includes(`v=${STYLE_VERSION}`)) {
    stylesheet.href = `styles.css?v=${encodeURIComponent(STYLE_VERSION)}`;
  }
  const currentScript = document.currentScript;
  if (currentScript?.src && !currentScript.src.includes(`v=${APP_VERSION}`)) {
    currentScript.dataset.loadedFromStaleHtml = "true";
  }
}

ensureFreshAssetLinks();

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

document.addEventListener("pointerdown", unlockAudio, { once: true });
document.addEventListener("touchstart", unlockAudio, { once: true, passive: true });

function forceFreshBuildWhenVersionChanges() {
  const versionKey = "chessface:app-version";
  const reloadKey = `chessface:reloaded:${APP_VERSION}`;
  const previousVersion = localStorage.getItem(versionKey);
  localStorage.setItem(versionKey, APP_VERSION);
  if (!previousVersion || previousVersion === APP_VERSION || sessionStorage.getItem(reloadKey)) return;

  sessionStorage.setItem(reloadKey, "1");
  const refreshUrl = new URL(window.location.href);
  refreshUrl.searchParams.set("v", APP_VERSION);
  const refresh = () => window.location.replace(refreshUrl.toString());

  if (!("serviceWorker" in navigator)) {
    refresh();
    return;
  }

  navigator.serviceWorker.getRegistrations()
    .then((registrations) => Promise.all(registrations.map((registration) => registration.unregister().catch(() => null))))
    .finally(refresh);
}

forceFreshBuildWhenVersionChanges();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(`/service-worker.js?v=${encodeURIComponent(APP_VERSION)}`).catch(() => {});
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
    saveCachedUser(me);
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
    saveCachedUser(me);
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
cancelSeekButton.addEventListener("click", leaveQueue);
cancelSeekPanelButton.addEventListener("click", leaveQueue);
document.querySelector("#offerDrawButton").addEventListener("click", () => {
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
turnRandomSoundButton?.addEventListener("click", () => {
  if (!currentGame?.canUseRandomSound) return;
  socket.emit("sound:random-turn", { soundId: "random" });
});
turnCustomSoundButton?.addEventListener("click", () => {
  if (!currentGame?.canUseRandomSound) return;
  socket.emit("sound:random-turn", { soundId: soundSettings.turnSound || "random" });
});
turnCustomSoundMenuButton?.addEventListener("click", (event) => {
  event.stopPropagation();
  if (turnCustomSoundMenuButton.disabled) return;
  loadSoundManifest();
  toggleTurnCustomSoundMenu();
});
document.addEventListener("click", (event) => {
  if (!turnCustomSoundMenu || turnCustomSoundMenu.classList.contains("hidden")) return;
  if (turnCustomSoundControl?.contains(event.target)) return;
  closeTurnCustomSoundMenu();
});
takebackRequestButton?.addEventListener("click", () => {
  socket?.emit("game:takeback:request");
});
acceptTakebackButton?.addEventListener("click", () => socket?.emit("game:takeback:respond", { action: "accept" }));
rejectTakebackButton?.addEventListener("click", () => socket?.emit("game:takeback:respond", { action: "reject" }));
begTakebackButton?.addEventListener("click", () => socket?.emit("game:takeback:respond", { action: "beg" }));
acceptBegTakebackButton?.addEventListener("click", () => socket?.emit("game:takeback:respond", { action: "accept" }));
document.querySelector("#addOpponentButton").addEventListener("click", addCurrentOpponent);
document.querySelector("#analyzeFinishedGameButton").addEventListener("click", () => {
  openCurrentGameAnalysis();
});
document.querySelector(".board-player-top").addEventListener("click", (event) => {
  if (event.currentTarget.dataset.isOpponent === "true" && currentGame?.status === "playing") addCurrentOpponent();
});
document.querySelector(".board-player-bottom").addEventListener("click", (event) => {
  if (event.currentTarget.dataset.isOpponent === "true" && currentGame?.status === "playing") addCurrentOpponent();
});
document.querySelector("#newGameButton").addEventListener("click", resetToLobby);
gameResultRematchButton?.addEventListener("click", requestPostGameRematch);
gameResultDashboardButton?.addEventListener("click", goToDashboardFromPostGame);
gameResultContinueVideoButton?.addEventListener("click", continuePostGameVideoTemporarily);
gameResultEndCallButton?.addEventListener("click", endPostGameAndCall);
gameResultAnalysisButton?.addEventListener("click", openCurrentGameAnalysis);
gameResultShareButton?.addEventListener("click", shareAccuracyResult);
copyResultLinkButton?.addEventListener("click", () => copyResultShareText({ social: false }));
copySocialResultButton?.addEventListener("click", () => copyResultShareText({ social: true }));
facebookShareResultButton?.addEventListener("click", () => openShareUrl("facebook"));
whatsappShareResultButton?.addEventListener("click", () => openShareUrl("whatsapp"));
xShareResultButton?.addEventListener("click", () => openShareUrl("x"));
acceptRematchButton?.addEventListener("click", acceptIncomingRematch);
declineRematchButton?.addEventListener("click", goToDashboardFromPostGame);
micButton.addEventListener("click", toggleMic);
opponentMuteButton.addEventListener("click", toggleOpponentAudio);
cameraButton.addEventListener("click", toggleCamera);
faceMeshButton?.addEventListener("click", toggleFaceMesh);
document.querySelector("#requestVideoButton").addEventListener("click", () => socket.emit("video:request"));
document.querySelector("#acceptVideoButton").addEventListener("click", () => socket.emit("video:accept"));
document.querySelector("#declineVideoButton").addEventListener("click", () => socket.emit("video:decline"));
renderEmojiPicker();
emojiToggle?.addEventListener("click", (event) => {
  event.stopPropagation();
  if (emojiToggle.disabled) return;
  const open = emojiPanel.classList.toggle("hidden") === false;
  emojiToggle.setAttribute("aria-expanded", String(open));
});
document.addEventListener("click", (event) => {
  if (!emojiPanel || emojiPanel.classList.contains("hidden")) return;
  if (event.target === emojiToggle || emojiPanel.contains(event.target)) return;
  emojiPanel.classList.add("hidden");
  emojiToggle?.setAttribute("aria-expanded", "false");
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
    button.setAttribute("aria-label", `Add ${emoji}`);
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
if (settingsButton && settingsModal) {
  settingsButton.addEventListener("click", () => {
    settingsModal.classList.remove("hidden");
    loadSoundManifest();
  });
}
if (closeSettingsButton && settingsModal) closeSettingsButton.addEventListener("click", () => settingsModal.classList.add("hidden"));
if (settingsModal) {
  settingsModal.addEventListener("click", (event) => {
    if (event.target === settingsModal) settingsModal.classList.add("hidden");
  });
}

[
  highlightMovesSetting,
  legalMovesSetting,
  premovesSetting,
  coordinatesSetting,
  moveSoundSetting,
  faceMeshAlwaysOnSetting,
  capturedPiecesSetting,
  confirmActionsSetting,
  allowChallengesSetting,
  autoPromoteQueenSetting
].filter(Boolean).forEach((control) => control.addEventListener("input", updateSettingsFromControls));

[checkSoundSetting, checkmateSoundSetting].filter(Boolean).forEach((control) => {
  control.addEventListener("input", updateSoundSettingsFromControls);
});
turnCustomSoundSetting?.addEventListener("input", updateSoundSettingsFromControls);
turnCustomSoundSetting?.addEventListener("focus", loadSoundManifest);
if (checkSoundSearch) {
  checkSoundSearch.addEventListener("input", () => {
    loadSoundManifest();
    populateSoundDropdown(checkSoundSetting, soundSettings.checkSound, {
      includeNone: true,
      includeRandom: true,
      query: checkSoundSearch.value
    });
    renderSoundSearchResults(checkSoundResults, checkSoundSetting, soundSettings.checkSound, {
      query: checkSoundSearch.value,
      searchInput: checkSoundSearch
    });
  });
}
if (checkmateSoundSearch) {
  checkmateSoundSearch.addEventListener("input", () => {
    loadSoundManifest();
    populateSoundDropdown(checkmateSoundSetting, soundSettings.checkmateSound, {
      includeNone: false,
      includeRandom: true,
      query: checkmateSoundSearch.value
    });
    renderSoundSearchResults(checkmateSoundResults, checkmateSoundSetting, soundSettings.checkmateSound, {
      query: checkmateSoundSearch.value,
      searchInput: checkmateSoundSearch
    });
  });
}

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
  if (cachedUser) {
    me = cachedUser;
    showApp({ refreshOnly: false });
  }
  try {
    const response = await fetch("/api/me", { headers: { Authorization: `Bearer ${token}` } });
    if (!response.ok) throw new Error("Expired");
    const data = await response.json();
    me = data.user;
    saveCachedUser(me);
    showApp({ refreshOnly: appShown });
  } catch {
    localStorage.removeItem("chessface:token");
    localStorage.removeItem("chessface:user");
    token = null;
    if (!appShown) return;
    location.href = "/";
  }
}

function showApp({ refreshOnly = false } = {}) {
  appShown = true;
  authView.classList.add("hidden");
  marketingView?.classList.add("hidden");
  appView.classList.remove("hidden");
  installPrompt?.classList.add("hidden");
  document.querySelector("#myAvatar").src = me.avatarUrl;
  document.querySelector("#myCountryFlag").textContent = flagEmoji(me.countryCode);
  document.querySelector("#myName").textContent = me.username;
  document.querySelector("#myRating").textContent = `${me.rating} rating · ${me.gamesPlayed || 0} games`;
  if (!refreshOnly || !socket) connectSocket();
  const pendingNotice = sessionStorage.getItem("chessface:notice");
  if (pendingNotice) {
    sessionStorage.removeItem("chessface:notice");
    showNotice(pendingNotice);
  }
}

function loadCachedUser() {
  try {
    return JSON.parse(localStorage.getItem("chessface:user") || "null");
  } catch {
    return null;
  }
}

function saveCachedUser(user) {
  if (!user) return;
  localStorage.setItem("chessface:user", JSON.stringify(user));
}

function flagEmoji(countryCode) {
  if (!countryCode || countryCode === "OTHER") return "🏳";
  return countryCode.toUpperCase().replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt()));
}

function handleErrorMessage(message) {
  if (String(message || "").toLowerCase().includes("illegal move")) {
    playIllegalMoveSound();
    renderCurrentBoard();
    return;
  }
  showNotice(message);
}

function connectSocket() {
  if (socket) socket.disconnect();
  socket = io({ auth: { token } });
  socket.on("connect", sendSoundSettings);
  socket.on("connect_error", handleSocketConnectError);
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
  socket.on("rematch:requested", showRematchRequest);
  socket.on("match:found", (game) => enterGame(game, { intro: true }));
  socket.on("active-game:found", async (game) => {
    showNotice("Active game restored.");
    await enterGame(game);
  });
  socket.on("game:update", renderGame);
  socket.on("takeback:notice", ({ message, board, duration }) => {
    if (board) showBoardMessage(message, duration || 1000);
    else showNotice(message);
  });
  socket.on("sound:settings", ({ userId, settings: nextSettings }) => {
    if (!userId) return;
    playerSoundSettings.set(String(userId), normalizeSoundSettings(nextSettings));
  });
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
  socket.on("video:restart", async () => {
    if (!currentGame || currentGame.status !== "playing") return;
    currentGame = { ...currentGame, videoOff: false, videoRequestFrom: null };
    renderVideoControls(currentGame);
    await startMediaAndPeer();
  });
}

function handleSocketConnectError(error) {
  const message = String(error?.message || "");
  if (message.toLowerCase().includes("unauthorized")) {
    localStorage.removeItem("chessface:token");
    localStorage.removeItem("chessface:user");
    sessionStorage.setItem("chessface:notice", "Your session expired. Please log in again.");
    location.href = "/";
    return;
  }
  if (message.toLowerCase().includes("xhr post error")) return;
  showNotice(message || "Connection interrupted.");
}

async function enterGame(game, { intro = false } = {}) {
  clearPostGameVideoTimer();
  resetIncomingGameBoardState();
  gameResultModal?.classList.add("hidden");
  rematchRequestModal?.classList.add("hidden");
  pendingRematchGameId = null;
  if (gameResultRematchButton) {
    gameResultRematchButton.disabled = false;
    gameResultRematchButton.textContent = "Rematch";
  }
  gameChat = [];
  renderGameChat();
  hideSeeking();
  lobby.classList.add("hidden");
  friendChallengePanel.classList.add("hidden");
  challengeBox.classList.add("hidden");
  gameLayout.classList.add("hidden");
  if (intro) await showMatchIntro(game);
  scheduleDonkeyVideoWarmup();
  seekButton.disabled = false;
  seekTeamButton.disabled = false;
  cancelSeekButton.classList.add("hidden");
  hideMatchIntro();
  document.body.classList.add("in-game");
  gameLayout.classList.remove("hidden");
  renderGame(game);
  updateDonkeyMoods(0);
  scrollGameIntoViewOnStart();
  sendSoundSettings();
  await startMediaAndPeer();
}

function resetIncomingGameBoardState() {
  finishPieceDrag();
  selectedSquare = null;
  clearPendingPremove();
  playingPremove = false;
  currentGame = null;
  if (board) board.innerHTML = "";
  accuracyAnalysisRunId += 1;
  analyzingAccuracyGameId = "";
}

function scrollGameIntoViewOnStart() {
  const alignToGameTop = () => {
    const target = document.querySelector(".board-stage") || document.querySelector(".video-grid");
    if (!target || !target.getClientRects().length) return;
    const top = target.getBoundingClientRect().top;
    const scrollTop = Math.max(0, window.scrollY + top);
    window.scrollTo({ top: scrollTop, behavior: "smooth" });
  };

  requestAnimationFrame(() => {
    alignToGameTop();
    window.setTimeout(alignToGameTop, 260);
  });
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
  hideMatchIntro();
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

function showMatchIntro(game) {
  if (!matchIntro) return Promise.resolve();
  const myColor = game.color === "black" ? "black" : "white";
  const opponentColor = myColor === "white" ? "black" : "white";
  const meName = game.players?.[myColor]?.username || "You";
  const opponentName = game.players?.[opponentColor]?.username || "Opponent";
  if (matchIntroTitle) matchIntroTitle.textContent = "⚔️";
  if (matchIntroYou) matchIntroYou.textContent = meName;
  if (matchIntroOpponent) matchIntroOpponent.textContent = opponentName;
  if (matchIntroLine) matchIntroLine.textContent = "Fight!";
  lobby.classList.add("hidden");
  seekingPanel.classList.add("hidden");
  matchIntro.classList.remove("hidden");
  playMatchIntroSound();
  return new Promise((resolve) => window.setTimeout(resolve, MATCH_INTRO_MS));
}

function hideMatchIntro() {
  matchIntro?.classList.add("hidden");
}

function leaveQueue() {
  seekButton.disabled = false;
  seekTeamButton.disabled = false;
  cancelSeekButton.classList.add("hidden");
  statusTitle.textContent = "Choose a time control";
  hideSeeking();
  socket.emit("queue:leave");
}

function startMatchmakingRotation() {
  if (matchmakingTimer) return;
  preloadMatchmakingSlides();
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

function preloadMatchmakingSlides() {
  if (matchmakingSlidesPreloaded) return;
  matchmakingSlidesPreloaded = true;
  matchmakingSlides.forEach((slide) => {
    const image = new Image();
    image.src = slide.image;
  });
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

function latestPositionIndex(game = currentGame) {
  return Math.max(0, (Array.isArray(game?.positions) ? game.positions.length : 1) - 1);
}

function displayedPositionIndex(game = currentGame) {
  const latestIndex = latestPositionIndex(game);
  if (boardHistoryIndex === null) return latestIndex;
  return Math.max(0, Math.min(boardHistoryIndex, latestIndex));
}

function displayedFenForGame(game = currentGame) {
  if (!game) return "";
  const positions = Array.isArray(game.positions) ? game.positions : [];
  const index = displayedPositionIndex(game);
  return positions[index] || game.fen;
}

function displayedLastMoveForGame(game = currentGame) {
  if (!game) return null;
  if (boardHistoryIndex === null) return game.lastMove || null;
  const move = Array.isArray(game.moves) ? game.moves[displayedPositionIndex(game) - 1] : null;
  return move ? { from: move.from, to: move.to } : null;
}

function isViewingHistoricalPosition(game = currentGame) {
  return Boolean(game && boardHistoryIndex !== null && displayedPositionIndex(game) < latestPositionIndex(game));
}

function renderCurrentBoard() {
  if (!currentGame) return;
  renderBoard(displayedFenForGame(currentGame), currentGame.color);
}

function setBoardHistoryIndex(index) {
  if (!currentGame || !Array.isArray(currentGame.positions) || !currentGame.positions.length) return false;
  const latestIndex = latestPositionIndex(currentGame);
  const currentIndex = displayedPositionIndex(currentGame);
  const nextIndex = Math.max(0, Math.min(index, latestIndex));
  if (nextIndex === currentIndex) return false;
  boardHistoryIndex = nextIndex >= latestIndex ? null : nextIndex;
  selectedSquare = null;
  finishPieceDrag();
  renderCurrentBoard();
  requestLiveEvaluation(displayedFenForGame(currentGame));
  return true;
}

function stepBoardHistory(delta) {
  if (!currentGame || !Array.isArray(currentGame.positions) || currentGame.positions.length < 2) return false;
  return setBoardHistoryIndex(displayedPositionIndex(currentGame) + delta);
}

function handleBoardHistoryKeydown(event) {
  if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
  if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
  const target = event.target;
  if (target?.closest?.("input, textarea, select, [contenteditable='true']")) return;
  if (!currentGame || gameResultModal?.contains(target)) return;
  event.preventDefault();
  if (stepBoardHistory(event.key === "ArrowLeft" ? -1 : 1) && settings.moveSound) playMoveSound();
}

function renderGame(game) {
  const previousGameId = currentGame?.id;
  if (previousGameId && previousGameId !== game.id) {
    boardHistoryIndex = null;
    lastFaceZoomEval = null;
    lastFaceZoomMoveKey = "";
  }
  const previousFen = currentGame?.fen;
  const previousDisplayedFen = currentGame ? displayedFenForGame(currentGame) : null;
  const previousColor = currentGame?.color;
  const nextDisplayedFen = displayedFenForGame(game);
  const boardNeedsRender = !board?.querySelector(".square") || !previousDisplayedFen || previousDisplayedFen !== nextDisplayedFen || previousColor !== game.color;
  syncPlayerSoundSettings(game.soundSettings);
  currentGame = game;
  if (boardHistoryIndex !== null && boardHistoryIndex >= latestPositionIndex(game)) boardHistoryIndex = null;
  gameLayout?.classList.toggle("team-game-layout", game.kind === "team");
  boardWrap?.classList.toggle("team-game", game.kind === "team");
  boardMeta?.classList.toggle("team-turn-panel", game.kind === "team");
  if (previousFen && previousFen !== game.fen) {
    finishPieceDrag();
    selectedSquare = null;
  }
  if (previousFen && previousFen !== game.fen && settings.moveSound && !game.soundEvent) playMoveSound();
  playMoveResultSound(game, previousFen);
  statusTitle.textContent = game.status === "playing"
    ? `${game.timeControl}${game.kind === "team" ? " team" : ""} game`
    : "Game over";
  gameStatus.textContent = statusText(game);
  playerColor.textContent = playerTurnText(game);
  renderBoardPlayers(game);
  updateTimeTrouble(game);
  renderTeamRoster(game);
  updateOpponentProfileActions(game);
  if (boardNeedsRender) renderBoard(nextDisplayedFen, game.color);
  if (game.status === "playing" && (!previousDisplayedFen || previousDisplayedFen !== nextDisplayedFen)) requestLiveEvaluation(nextDisplayedFen);
  renderVideoControls(game);
  if (liveKitRoom && game.status === "playing" && !game.videoOff) scheduleLiveKitSync(liveKitRoom);
  if (!requiresLiveKitVideo(game)) syncPeerNegotiations();
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
  if (game.status !== "playing" || game.kind === "team") clearPendingPremove();
  if (!myTurn && selectedSquare && !canUsePremoves(game)) selectedSquare = null;
  turnAlarmButton?.classList.toggle("hidden", !(myTurn && game.kind === "team"));
  updateTurnRandomSoundButton(game, myTurn);
  updateTakebackControls(game, myTurn);
  updateTurnStatusButton(game, myTurn);
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
  maybePlayPendingPremove(game, myTurn);

  if (game.status === "finished") {
    postGameTimeControl = game.timeControl || postGameTimeControl || selectedTime;
    maybeShowGameResultDialog(game);
    updateRematchButton(game);
    maybeStartAccuracyAnalysis(game);
    if (game.kind !== "team") {
      me.rating = game.color === "white" ? game.players.white.rating : game.players.black.rating;
      me.gamesPlayed = (me.gamesPlayed || 0) + 1;
      document.querySelector("#myRating").textContent = `${me.rating} rating · ${me.gamesPlayed} games`;
    }
  }
}

function maybeShowGameResultDialog(game) {
  if (!gameResultModal || game.status !== "finished") return;
  const key = `${game.id}:${game.result}:${game.reason}`;
  if (shownResultDialogKey === key) return;
  shownResultDialogKey = key;

  const score = gameResultScoreText(game.result);
  const isDraw = game.result === "draw";
  const won = !isDraw && game.result === game.color;
  const resultLine = gameResultLine(game);
  gameResultReason.textContent = "Game Over";
  gameResultTitle.textContent = "Accuracy Analysis";
  gameResultScore.textContent = score;
  gameResultDetails.textContent = isDraw ? resultLine : `${resultLine}${won ? " You win!" : ""}`;
  accuracyAnalysisPanel?.classList.add("hidden");
  resultSharePanel?.classList.add("hidden");
  if (resultShareLink) resultShareLink.value = "";
  if (accuracyAnalysisStatus) accuracyAnalysisStatus.textContent = game.accuracyAnalysis ? "Accuracy analysis complete." : "Analyzing accuracy...";
  updateRematchButton(game);
  gameResultModal.classList.remove("hidden");
}

function updateRematchButton(game) {
  if (!gameResultRematchButton) return;
  const available = Boolean(game && game.status === "finished" && game.kind !== "team");
  gameResultRematchButton.classList.toggle("hidden", !available);
  if (!available) return;
  const requested = Boolean(game.rematch?.requestedByViewer);
  gameResultRematchButton.disabled = requested;
  gameResultRematchButton.textContent = requested ? "Waiting..." : "Rematch";
  if (game.rematch?.requestedByOpponent && !requested && rematchRequestModal?.classList.contains("hidden")) {
    showRematchRequest({ gameId: game.id, from: game.rematch.requester });
  }
}

function gameResultLine(game) {
  const sideLabel = game.kind === "team" ? " team" : "";
  const winner = game.result === "white" ? `White${sideLabel}` : game.result === "black" ? `Black${sideLabel}` : "";
  const loser = game.result === "white" ? `Black${sideLabel}` : game.result === "black" ? `White${sideLabel}` : "";
  if (game.result === "draw") {
    if (game.reason === "agreement") return "Draw by agreement.";
    if (game.reason === "stalemate") return "Draw by stalemate.";
    return "Game drawn.";
  }
  if (game.reason === "timeout") return `${winner} won on time. ${loser} ran out of time.`;
  if (game.reason === "resignation") return `${winner} won by resignation.`;
  if (game.reason === "abort") return "Game aborted.";
  if (game.reason === "checkmate") return `${winner} won by checkmate.`;
  return `${winner} won.`;
}

function gameResultScoreText(result) {
  if (result === "white") return "1-0";
  if (result === "black") return "0-1";
  if (result === "draw") return "1/2-1/2";
  return "*";
}

async function maybeStartAccuracyAnalysis(game) {
  if (!accuracyAnalysisPanel || !accuracyAnalysisStatus || game.reason === "abort") {
    if (accuracyAnalysisStatus) accuracyAnalysisStatus.textContent = "";
    return;
  }
  if (game.accuracyAnalysis) {
    renderAccuracyAnalysis(game, game.accuracyAnalysis);
    return;
  }
  if (analyzingAccuracyGameId === game.id) return;
  analyzingAccuracyGameId = game.id;
  const runId = Date.now();
  accuracyAnalysisRunId = runId;
  accuracyAnalysisPanel.classList.add("hidden");
  accuracyAnalysisStatus.textContent = "Starting Stockfish accuracy analysis...";
  try {
    const accuracyService = await loadAccuracyAnalysisService();
    const analysis = await accuracyService.analyzeGame(game, ({ message }) => {
      if (accuracyAnalysisRunId === runId && currentGame?.id === game.id) {
        accuracyAnalysisStatus.textContent = message;
      }
    });
    if (accuracyAnalysisRunId !== runId || currentGame?.id !== game.id) return;
    currentGame = { ...currentGame, accuracyAnalysis: analysis };
    renderAccuracyAnalysis(currentGame, analysis);
    socket?.emit("game:accuracy:save", { gameId: game.id, analysis });
  } catch (error) {
    console.warn("[ChessFace] Accuracy analysis failed:", error);
    if (accuracyAnalysisRunId === runId && currentGame?.id === game.id) {
      accuracyAnalysisStatus.textContent = "Accuracy analysis could not be completed.";
      accuracyAnalysisPanel.classList.add("hidden");
    }
  } finally {
    if (accuracyAnalysisRunId === runId) analyzingAccuracyGameId = "";
  }
}

function loadAccuracyAnalysisService() {
  if (window.ChessFaceAccuracyAnalysis) return Promise.resolve(window.ChessFaceAccuracyAnalysis);
  if (accuracyAnalysisServicePromise) return accuracyAnalysisServicePromise;
  accuracyAnalysisServicePromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `stockfish-analysis-service.js?v=${encodeURIComponent(APP_VERSION)}`;
    script.async = true;
    script.onload = () => window.ChessFaceAccuracyAnalysis ? resolve(window.ChessFaceAccuracyAnalysis) : reject(new Error("Accuracy analysis service unavailable."));
    script.onerror = () => reject(new Error("Accuracy analysis service failed to load."));
    document.head.append(script);
  }).catch((error) => {
    accuracyAnalysisServicePromise = null;
    throw error;
  });
  return accuracyAnalysisServicePromise;
}

function renderAccuracyAnalysis(game, analysis) {
  if (!accuracyAnalysisPanel || !accuracyAnalysisStatus || !analysis) return;
  accuracyAnalysisStatus.textContent = "Accuracy analysis complete.";
  accuracyAnalysisPanel.classList.remove("hidden");
  const myColor = game.color === "black" ? "black" : "white";
  const myAccuracy = analysis[myColor]?.accuracy || 0;
  const myCreature = analysis.creatures?.[myColor] || accuracyCreatureFor(myAccuracy);
  accuracyAnalysisPanel.innerHTML = `
    <section class="accuracy-scoreboard">
      ${renderAccuracySide("White", analysis.white, game.players?.white)}
      <div class="accuracy-counts-card">
        ${renderAccuracyCounts("White", analysis.white)}
        ${renderAccuracyCounts("Black", analysis.black)}
      </div>
      ${renderAccuracySide("Black", analysis.black, game.players?.black)}
    </section>
    <section class="accuracy-universe">
      <div class="accuracy-section-head">
        <h3>Accuracy Evolution</h3>
        <p>Where do you stand?</p>
      </div>
      <div class="creature-strip">
        ${accuracyCreatures().map(renderCreatureTick).join("")}
      </div>
      <div class="accuracy-meter">
        <span class="accuracy-marker white-marker" style="left: ${clampPercent(analysis.white.accuracy)}%">
          <b>White</b><strong>${analysis.white.accuracy}%</strong>
        </span>
        <span class="accuracy-marker black-marker" style="left: ${clampPercent(analysis.black.accuracy)}%">
          <b>Black</b><strong>${analysis.black.accuracy}%</strong>
        </span>
      </div>
    </section>
    <section class="accuracy-reveal">
      <div>
        <p>You are</p>
        <h3>${escapeHtml(myCreature.name)}</h3>
        <strong>${escapeHtml(myCreature.range)}%</strong>
        <span>Accuracy: ${myAccuracy}%</span>
        <small>${escapeHtml(myCreature.description)}</small>
      </div>
      <div class="accuracy-creature-large" aria-hidden="true">${escapeHtml(myCreature.icon)}</div>
      <aside class="accuracy-next">
        <h4>Keep climbing!</h4>
        ${accuracyCreatures().filter((creature) => creature.min > myAccuracy).slice(0, 3).map((creature) => `
          <div><span>${escapeHtml(creature.icon)}</span><b>${escapeHtml(creature.range)}%</b><strong>${escapeHtml(creature.name)}</strong></div>
        `).join("") || "<div><span>🌟</span><b>98-100%</b><strong>Supreme already.</strong></div>"}
      </aside>
    </section>
  `;
}

function renderAccuracySide(label, summary, player) {
  return `
    <article class="accuracy-player ${label.toLowerCase()}">
      <img src="${escapeHtml(player?.avatarUrl || "/default-avatar.svg")}" alt="" />
      <span>${escapeHtml(label)}</span>
      <strong>${Number(summary?.accuracy || 0)}%</strong>
    </article>
  `;
}

function renderAccuracyCounts(label, summary = {}) {
  const counts = summary.counts || {};
  return `
    <div>
      <h4>${escapeHtml(label)}</h4>
      ${["Excellent", "Good", "Inaccuracy", "Mistake", "Blunder"].map((name) => `
        <p class="${name.toLowerCase()}"><span>${name === "Inaccuracy" ? "Inaccuracies" : name}</span><b>${Number(counts[name] || 0)}</b></p>
      `).join("")}
    </div>
  `;
}

function renderCreatureTick(creature) {
  return `
    <div class="creature-tick">
      <b>${escapeHtml(creature.range)}%</b>
      <span>${escapeHtml(creature.icon)}</span>
      <strong>${escapeHtml(creature.name)}</strong>
    </div>
  `;
}

function accuracyCreatures() {
  return window.ChessFaceAccuracyAnalysis?.creatures || [];
}

function accuracyCreatureFor(accuracy) {
  return accuracyCreatures().find((creature) => accuracy >= creature.min && accuracy <= creature.max)
    || { name: "Mystery Glorbo", range: "0-100", icon: "✨", description: "A mysterious creature from the analysis nebula." };
}

function clampPercent(value) {
  return Math.max(0, Math.min(100, Number(value || 0)));
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

function openCurrentGameAnalysis() {
  if (!currentGame?.id) return;
  if (me?.isGuest) {
    showAccountGate("analyze finished games and save your history");
    return;
  }
  window.open(`/analysis.html?game=${encodeURIComponent(currentGame.id)}&analyze=1`, "_blank", "noopener");
}

async function shareAccuracyResult() {
  showResultSharePanel();
}

function resultShareUrl() {
  const url = new URL("/analysis.html", window.location.origin);
  if (currentGame?.id) url.searchParams.set("game", currentGame.id);
  url.searchParams.set("analyze", "1");
  return url.toString();
}

function resultShareText() {
  const analysis = currentGame?.accuracyAnalysis;
  return analysis
    ? `ChessFace Accuracy: White ${analysis.white.accuracy}% vs Black ${analysis.black.accuracy}%`
    : `ChessFace result: ${gameResultLine(currentGame || {})}`;
}

function showResultSharePanel() {
  if (!resultSharePanel || !resultShareLink) return;
  resultShareLink.value = resultShareUrl();
  resultSharePanel.classList.remove("hidden");
  requestAnimationFrame(() => {
    resultSharePanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

async function copyResultShareText({ social = false } = {}) {
  const text = resultShareText();
  const url = resultShareUrl();
  if (!social) {
    await copyToClipboard(url);
    showNotice("Result link copied.");
    return;
  }
  const suffix = social ? "\n\nPaste this into your Instagram post, story, or DM." : "";
  await copyToClipboard(`${text}\n${url}${suffix}`);
  showNotice("Result copied for Instagram.");
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard?.writeText(text);
  } catch {
    const helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.left = "-9999px";
    document.body.append(helper);
    helper.select();
    document.execCommand("copy");
    helper.remove();
  }
}

function openShareUrl(platform) {
  const text = resultShareText();
  const url = resultShareUrl();
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(`${text} ${url}`);
  const links = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedText}`,
    x: `https://twitter.com/intent/tweet?text=${encodedText}`
  };
  const shareUrl = links[platform];
  if (shareUrl) window.open(shareUrl, "_blank", "noopener,noreferrer");
}

function clearPostGameVideoTimer() {
  clearTimeout(postGameVideoTimer);
  postGameVideoTimer = null;
}

function requestPostGameRematch() {
  if (!currentGame?.id) return;
  clearPostGameVideoTimer();
  socket?.emit("game:rematch", { gameId: currentGame.id });
  updateRematchButton({ ...currentGame, rematch: { ...currentGame.rematch, requestedByViewer: true } });
  showNotice("Rematch requested. Waiting for your opponent.");
}

function showRematchRequest({ gameId, from } = {}) {
  if (!gameId || currentGame?.id !== gameId || currentGame?.status !== "finished") return;
  pendingRematchGameId = gameId;
  const name = from?.username || "Your opponent";
  if (rematchRequestTitle) rematchRequestTitle.textContent = `${name} wants a rematch`;
  if (rematchRequestText) rematchRequestText.textContent = "Accept to start a new game with the same player.";
  rematchRequestModal?.classList.remove("hidden");
}

function acceptIncomingRematch() {
  const gameId = pendingRematchGameId || currentGame?.id;
  if (!gameId) return;
  rematchRequestModal?.classList.add("hidden");
  pendingRematchGameId = null;
  clearPostGameVideoTimer();
  socket?.emit("game:rematch", { gameId });
  showNotice("Rematch accepted.");
}

function goToDashboardFromPostGame() {
  pendingRematchGameId = null;
  rematchRequestModal?.classList.add("hidden");
  resetToLobby();
}

function continuePostGameVideoTemporarily() {
  gameResultModal?.classList.add("hidden");
  clearPostGameVideoTimer();
  showNotice("Video will stay on for 2 minutes. Rematch stays available.");
  postGameVideoTimer = setTimeout(() => {
    if (!currentGame || currentGame.status !== "finished") return;
    closePeer();
    markVideoOffLocally();
    showNotice("Post-game video ended. You can still start a rematch.");
  }, 120000);
}

function endPostGameAndCall() {
  clearPostGameVideoTimer();
  gameResultModal?.classList.add("hidden");
  resetToLobby();
}

function updateTurnRandomSoundButton(game, myTurn) {
  if (!turnRandomSoundButton && !turnCustomSoundButton) return;
  const visible = game.status === "playing";
  const locked = Boolean(game.randomSoundLocked);
  const usable = Boolean(myTurn && game.canUseRandomSound);
  turnRandomSoundButton?.classList.toggle("hidden", !visible);
  turnCustomSoundControl?.classList.toggle("hidden", !visible);
  if (turnRandomSoundButton) turnRandomSoundButton.disabled = !usable;
  if (turnCustomSoundButton) turnCustomSoundButton.disabled = !usable;
  if (turnCustomSoundMenuButton) turnCustomSoundMenuButton.disabled = !visible;
  if (turnCustomSoundSetting) turnCustomSoundSetting.disabled = !visible;
  if (!visible) closeTurnCustomSoundMenu();
  const title = locked
    ? "Wait for the current sound to finish."
    : !myTurn
      ? "You can use this on your turn."
      : usable
        ? ""
        : "You already used a sound this turn.";
  if (turnRandomSoundButton) turnRandomSoundButton.title = title || "Play a random sound.";
  if (turnCustomSoundButton) turnCustomSoundButton.title = title || "Play your selected custom sound.";
  if (turnCustomSoundMenuButton) turnCustomSoundMenuButton.title = visible ? "Choose custom sound." : "";
}

function updateTurnStatusButton(game, myTurn) {
  if (!turnStatusButton) return;
  const visible = game.status === "playing";
  const shouldBegNow = shouldShowBegNowTurnPrompt(game);
  turnStatusButton.classList.toggle("hidden", !visible);
  turnStatusButton.classList.toggle("is-your-turn", Boolean(visible && myTurn));
  turnStatusButton.classList.toggle("is-beg-now", Boolean(visible && shouldBegNow));
  turnStatusButton.textContent = shouldBegNow ? "BEG NOW" : myTurn ? "Your Turn" : opponentTurnLabel(game);
}

function boardPositionForColor(color) {
  return document.querySelector(".board-player-bottom")?.dataset.color === color ? "bottom" : "top";
}

function shouldShowBegNowTurnPrompt(game) {
  const request = game?.takeback?.request;
  return Boolean(game?.status === "playing" && request?.status === "begging" && request.isRequester);
}

function updateTakebackControls(game, myTurn) {
  const takeback = game?.takeback || {};
  const request = takeback.request;
  const isReceiver = Boolean(request?.isReceiver);
  const canShowRequest = game?.status === "playing" && game.kind !== "team";
  const isPendingRequest = Boolean(canShowRequest && isReceiver && request?.status === "pending");
  const isBeggingRequest = Boolean(canShowRequest && isReceiver && request?.status === "begging");
  if (takebackRequestButton) {
    takebackRequestButton.classList.toggle("hidden", !canShowRequest);
    const outOfRequests = Number(takeback.remaining || 0) <= 0;
    const activeRequest = request && request.status !== "expired";
    const blocked = !canShowRequest || myTurn || Boolean(activeRequest) || takeback.requestedThisMove || game.moveCount <= 0;
    takebackRequestButton.disabled = blocked && !outOfRequests;
    takebackRequestButton.textContent = `Takeback (${Math.max(0, takeback.remaining ?? 0)})`;
    takebackRequestButton.title = myTurn
      ? "You can request a takeback only when it is not your turn."
      : takeback.requestedThisMove
        ? "You already requested a takeback for this move."
        : outOfRequests
          ? "You ran out of takeback requests."
          : "Request to undo your last move.";
  }
  if (takebackRequestModal) {
    takebackRequestModal.classList.toggle("hidden", !(isPendingRequest || isBeggingRequest));
  }
  takebackRequestCard?.classList.toggle("is-final-decision", isBeggingRequest);
  takebackRequestActions?.classList.toggle("is-final-decision", isBeggingRequest);
  if (takebackRequestPrompt) {
    takebackRequestPrompt.textContent = isBeggingRequest
      ? "Decide whether to approve the takeback after the beg."
      : "Your opponent requests a takeback.";
  }
  if (acceptTakebackButton) {
    acceptTakebackButton.textContent = isBeggingRequest ? "Approve takeback" : "Accept";
  }
  if (rejectTakebackButton) {
    rejectTakebackButton.textContent = isBeggingRequest ? "Reject takeback" : "Reject";
  }
  if (begTakebackButton) {
    begTakebackButton.classList.toggle("hidden", !isPendingRequest);
  }
  if (acceptBegTakebackButton) {
    acceptBegTakebackButton.classList.add("hidden");
    acceptBegTakebackButton.classList.remove("is-begging");
    acceptBegTakebackButton.disabled = true;
    acceptBegTakebackButton.textContent = "Approve beg";
  }
}

function opponentTurnLabel(game) {
  const name = activeOtherTurnName(game);
  return name + "'s turn";
}

function activeOtherTurnName(game) {
  if (game.kind === "team") return game.activePlayerName || "Opponent";
  const player = game.turn === "white" ? game.players?.white : game.players?.black;
  return player?.username || player?.fullName || "Opponent";
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
  chatStatus.textContent = live ? (game.kind === "team" ? "All chat" : "Live") : "Closed";
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
  const videoCanStayOpen = game.status === "playing" || game.status === "finished";
  opponentMuteButton.classList.toggle("hidden", game.videoOff || !videoCanStayOpen);
  micButton.classList.toggle("hidden", game.videoOff || !videoCanStayOpen);
  cameraButton.classList.toggle("hidden", game.videoOff || !videoCanStayOpen);
  updateFaceMeshButton();
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
}

function renderVideoTiles(game) {
  if (!videoGrid) return;
  const peers = videoPeers(game);
  videoPeersById = new Map(peers.map((peer) => [String(peer.id), peer]));
  videoGrid.classList.toggle("team-video-grid", game.kind === "team");
  videoGrid.classList.toggle("is-video-off", Boolean(game.videoOff));
  const primaryPeer = game.kind === "team"
    ? peers.find((peer) => !peer.isTeammate) || peers[0]
    : peers[0];
  const activePeerIds = new Set(peers.map((peer) => String(peer.id)));
  const primaryTile = remoteVideo.closest(".video-tile");
  peerVideoTiles.forEach((tile, peerId) => {
    if (!activePeerIds.has(String(peerId)) || (tile === primaryTile && String(peerId) !== String(primaryPeer?.id))) {
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
  const extraPeers = peers.filter((peer) => String(peer.id) !== String(primaryPeer?.id));
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
  const peerId = String(peer.id);
  let tile = peerVideoTiles.get(peerId);
  if (tile) return tile;
  tile = document.createElement("div");
  tile.className = "video-tile team-video-tile";
  tile.dataset.peerId = peerId;
  const video = document.createElement("video");
  prepareVideoElement(video, { muted: true });
  const label = document.createElement("span");
  tile.append(video, label);
  videoGrid.append(tile);
  attachPeerVideoElement(peerId, video, tile);
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
  } else {
    video.muted = false;
    video.volume = 1;
    video.removeAttribute("muted");
  }
}

function attachPeerVideoElement(peerId, video, tile) {
  peerId = String(peerId);
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
  tile.classList.toggle("is-opponent-team", false);
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

function createLocalStockfishWorker(scriptFile, wasmFile) {
  const scriptUrl = new URL(`/vendor/stockfish/${scriptFile}`, location.origin);
  if (wasmFile) {
    const wasmUrl = new URL(`/vendor/stockfish/${wasmFile}`, location.origin);
    scriptUrl.hash = `${encodeURIComponent(wasmUrl.href)},worker`;
  }
  return new Worker(scriptUrl.href);
}

function ensureLiveStockfish() {
  if (liveEvalReadyPromise) return liveEvalReadyPromise;
  liveEvalReadyPromise = loadLiveStockfishWorker().catch((error) => {
    liveEvalReadyPromise = null;
    if (evalBarLabel) evalBarLabel.textContent = "--";
    throw error;
  });
  return liveEvalReadyPromise;
}

async function loadLiveStockfishWorker() {
  const errors = [];
  for (let offset = 0; offset < LIVE_STOCKFISH_SOURCES.length; offset += 1) {
    const nextIndex = (liveEvalSourceIndex + offset) % LIVE_STOCKFISH_SOURCES.length;
    const source = LIVE_STOCKFISH_SOURCES[nextIndex];
    try {
      liveEvalSourceIndex = nextIndex;
      return await readyLiveStockfishWorker(source.create(), source.label);
    } catch (error) {
      errors.push(`${source.label}: ${error.message || String(error)}`);
      liveEvalWorker?.terminate?.();
      liveEvalWorker = null;
    }
  }
  throw new Error(`live engine failed to load (${errors.join("; ")})`);
}

function readyLiveStockfishWorker(nextWorker, label) {
  liveEvalWorker = nextWorker;
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error(`${label} timeout`));
    }, 12000);
    const cleanup = () => {
      clearTimeout(timeout);
      nextWorker.removeEventListener("message", handleReady);
      nextWorker.removeEventListener("error", handleError);
    };
    const handleError = () => {
      cleanup();
      reject(new Error(`${label} blocked`));
    };
    const handleReady = (event) => {
      const line = String(event.data || "");
      if (line === "uciok") nextWorker.postMessage("isready");
      if (line === "readyok") {
        cleanup();
        nextWorker.postMessage("setoption name Hash value 16");
        nextWorker.postMessage("setoption name Threads value 1");
        nextWorker.postMessage("ucinewgame");
        resolve(nextWorker);
      }
    };
    nextWorker.addEventListener("message", handleReady);
    nextWorker.addEventListener("error", handleError);
    nextWorker.postMessage("uci");
  });
}

function requestLiveEvaluation(fen) {
  if (!evalBarFill || !fen) return;
  clearTimeout(liveEvalTimer);
  stopLiveEvaluation();
  if (evalBarLabel) evalBarLabel.textContent = "...";
  liveEvalTimer = setTimeout(() => analyzeLiveFen(fen), 120);
}

function stopLiveEvaluation() {
  liveEvalSearchId += 1;
  liveEvalCleanup?.();
  liveEvalCleanup = null;
  liveEvalWorker?.postMessage?.("stop");
}

async function analyzeLiveFen(fen) {
  const searchId = liveEvalSearchId;
  try {
    const engine = await ensureLiveStockfish();
    if (searchId !== liveEvalSearchId) return;
    liveEvalCleanup?.();
    let score = { type: "cp", value: 0 };
    const cleanup = () => {
      engine.removeEventListener("message", handleMessage);
      clearTimeout(timeout);
      liveEvalCleanup = null;
    };
    const timeout = setTimeout(cleanup, 5000);
    const handleMessage = (event) => {
      if (searchId !== liveEvalSearchId) return;
      const line = String(event.data || "");
      const scoreMatch = line.match(/\bscore\s+(cp|mate)\s+(-?\d+)/);
      if (scoreMatch) {
        score = { type: scoreMatch[1], value: Number(scoreMatch[2]) };
        updateEvalBar(score, fen);
      }
      if (/^bestmove\s+/.test(line)) {
        updateEvalBar(score, fen);
        cleanup();
      }
    };
    liveEvalCleanup = cleanup;
    engine.addEventListener("message", handleMessage);
    engine.postMessage("stop");
    engine.postMessage(`position fen ${fen}`);
    engine.postMessage("go depth 4");
  } catch (error) {
    console.warn("Live Stockfish evaluation unavailable", error);
  }
}

function updateEvalBar(score, fen, { updateMoods = true } = {}) {
  const whiteCentipawns = scoreToWhiteCentipawns(score, fen);
  const whiteHeight = Math.max(6, Math.min(94, 50 + Math.tanh(whiteCentipawns / 600) * 44));
  evalBarFill.style.height = `${whiteHeight}%`;
  if (evalBarLabel) evalBarLabel.textContent = formatEvalScore(score, fen);
  if (updateMoods) {
    updateDonkeyMoods(whiteCentipawns);
    maybeTriggerFaceZoom(whiteCentipawns, fen);
  }
}

function updateDonkeyMoods(whiteCentipawns) {
  const topColor = document.querySelector(".board-player-top")?.dataset.color || "black";
  const bottomColor = document.querySelector(".board-player-bottom")?.dataset.color || "white";
  setDonkeyMood(topDonkeyMood, donkeyMoodForColor(topColor, whiteCentipawns));
  setDonkeyMood(bottomDonkeyMood, donkeyMoodForColor(bottomColor, whiteCentipawns));
}

function maybeTriggerFaceZoom(whiteCentipawns, fen) {
  if (!currentGame || currentGame.status !== "playing" || currentGame.kind !== "normal") {
    lastFaceZoomEval = null;
    lastFaceZoomMoveKey = "";
    return;
  }
  if (fen !== currentGame.fen || isViewingHistoricalPosition()) return;
  const moveKey = `${currentGame.id}:${currentGame.moveCount || 0}`;
  const previous = lastFaceZoomEval;
  if (previous?.fen && previous.fen !== fen && previous.moveKey !== moveKey && currentGame.moveCount > 0) {
    const sideToMove = String(fen || "").split(" ")[1] || "w";
    const moverColor = sideToMove === "b" ? "white" : "black";
    const moverDrop = moverColor === "white"
      ? previous.whiteCentipawns - whiteCentipawns
      : whiteCentipawns - previous.whiteCentipawns;
    if (moverDrop >= BAD_BLUNDER_CP_DROP && lastFaceZoomMoveKey !== moveKey) {
      lastFaceZoomMoveKey = moveKey;
      triggerFaceZoomForColor(moverColor);
    }
  }
  lastFaceZoomEval = { fen, whiteCentipawns, moveKey };
}

function triggerFaceZoomForColor(color) {
  const tile = videoTileForColor(color);
  if (!tile) return;
  tile.classList.remove("face-zoom");
  void tile.offsetWidth;
  tile.classList.add("face-zoom");
  window.setTimeout(() => tile.classList.remove("face-zoom"), FACE_ZOOM_MS);
}

function videoTileForColor(color) {
  if (!currentGame || currentGame.kind !== "normal") return null;
  if (color === currentGame.color) return localVideo?.closest(".video-tile") || null;
  return remoteVideo?.closest(".video-tile") || null;
}

function donkeyMoodForColor(color, whiteCentipawns) {
  const playerCentipawns = color === "black" ? -whiteCentipawns : whiteCentipawns;
  return DONKEY_MOODS.find((mood) => playerCentipawns <= mood.max) || DONKEY_MOODS[5];
}

async function setDonkeyMood(video, mood) {
  if (!video || !mood) return;
  ensureDonkeyVideoPair(video);
  const slot = video.parentElement;
  if (!slot) return;
  const active = activeDonkeyVideo(video);
  if (active?.dataset.mood === mood.id) return;
  const next = inactiveDonkeyVideo(video) || active;
  const source = donkeyVideoSource(mood);
  const requestId = `${mood.id}:${Date.now()}:${Math.random()}`;
  slot.dataset.moodRequest = requestId;
  next.dataset.mood = mood.id;
  next.setAttribute("aria-label", mood.label + " position mood");
  next.classList.add("is-changing");
  if (!next.currentSrc.endsWith(source) && !next.src.endsWith(source)) {
    next.src = source;
    next.load();
  }
  const ready = await waitForDonkeyVideoReady(next, 1200);
  if (slot.dataset.moodRequest !== requestId) return;
  if (!ready) return;
  try {
    next.currentTime = 0;
  } catch (_) {}
  next.play?.().catch(() => {});
  next.classList.add("is-active");
  active?.classList.remove("is-active");
  window.setTimeout(() => {
    next.classList.remove("is-changing");
    if (active && !active.classList.contains("is-active")) active.pause?.();
  }, 180);
}

function ensureDonkeyVideoPair(video) {
  if (!video || video.dataset.bufferReady) return;
  const slot = video.parentElement;
  if (!slot) return;
  video.classList.add("is-active");
  video.preload = "auto";
  const buffer = video.cloneNode(false);
  buffer.removeAttribute("id");
  buffer.removeAttribute("aria-label");
  buffer.classList.remove("is-active", "is-changing");
  buffer.classList.add("is-buffer");
  buffer.muted = true;
  buffer.autoplay = true;
  buffer.loop = true;
  buffer.playsInline = true;
  buffer.preload = "auto";
  buffer.addEventListener("error", () => recoverDonkeyVideo(buffer));
  video.dataset.bufferReady = "1";
  buffer.dataset.bufferReady = "1";
  slot.appendChild(buffer);
}

function activeDonkeyVideo(video) {
  return video?.parentElement?.querySelector(".eval-donkey-mood.is-active") || video;
}

function inactiveDonkeyVideo(video) {
  return Array.from(video?.parentElement?.querySelectorAll(".eval-donkey-mood") || []).find((candidate) => !candidate.classList.contains("is-active"));
}

function waitForDonkeyVideoReady(video, timeoutMs = 1200) {
  if (!video) return Promise.resolve(false);
  if (video.readyState >= 2) return Promise.resolve(true);
  return new Promise((resolve) => {
    let done = false;
    const finish = (ready) => {
      if (done) return;
      done = true;
      video.removeEventListener("canplay", markReady);
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("error", markFailed);
      resolve(Boolean(ready) || video.readyState >= 2);
    };
    const markReady = () => finish(true);
    const markFailed = () => finish(false);
    video.addEventListener("canplay", markReady, { once: true });
    video.addEventListener("loadeddata", markReady, { once: true });
    video.addEventListener("error", markFailed, { once: true });
    window.setTimeout(markFailed, timeoutMs);
  });
}

function scheduleDonkeyVideoWarmup() {
  if (donkeyVideoWarmupStarted) return;
  donkeyVideoWarmupStarted = true;
  const run = () => DONKEY_MOODS.map(donkeyVideoSource).forEach(preloadDonkeyVideo);
  if ("requestIdleCallback" in window) {
    window.setTimeout(() => window.requestIdleCallback(run, { timeout: 2500 }), 400);
  } else {
    window.setTimeout(run, 800);
  }
}

[topDonkeyMood, bottomDonkeyMood].forEach((video) => {
  video?.addEventListener("error", () => recoverDonkeyVideo(video));
});

function recoverDonkeyVideo(video) {
  const fallback = donkeyVideoSource(DONKEY_VIDEO_FALLBACK_MOOD);
  if (!video || video.src.endsWith(fallback)) return;
  video.src = fallback;
  video.dataset.mood = DONKEY_VIDEO_FALLBACK_MOOD.id;
  video.load();
  video.play?.().catch(() => {});
}

function donkeyVideoSource(mood) {
  if (!donkeyVideoFormat) {
    const probe = document.createElement("video");
    donkeyVideoFormat = probe.canPlayType('video/webm; codecs="vp9"') ? "webm" : "mp4";
  }
  return mood?.[donkeyVideoFormat] || mood?.mp4 || DONKEY_VIDEO_FALLBACK_MOOD.mp4;
}

function preloadDonkeyVideo(src) {
  if (!src || donkeyVideoPreloads.has(src)) return;
  const video = document.createElement("video");
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = "auto";
  video.src = src;
  video.load();
  donkeyVideoPreloads.set(src, video);
}

function scoreToWhiteCentipawns(score, fen) {
  const sideToMove = String(fen || "").split(" ")[1] || "w";
  const sideScore = scoreToCentipawns(score);
  return sideToMove === "w" ? sideScore : -sideScore;
}

function scoreToCentipawns(score) {
  if (!score) return 0;
  if (score.type === "mate") return Math.sign(score.value || 1) * (100000 - Math.min(999, Math.abs(score.value)) * 100);
  return Number(score.value || 0);
}

function formatEvalScore(score, fen) {
  if (!score) return "0.0";
  const whiteCentipawns = scoreToWhiteCentipawns(score, fen);
  if (score.type === "mate") return `M${Math.abs(score.value)}`;
  const pawns = Math.abs(whiteCentipawns / 100).toFixed(1);
  return whiteCentipawns >= 0 ? `+${pawns}` : `-${pawns}`;
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

function updateTimeTrouble(game) {
  const turnColor = game?.turn;
  const seconds = Number(game?.clocks?.[turnColor] ?? Infinity);
  const active = Boolean(game?.status === "playing" && turnColor && seconds > 0 && seconds <= TIME_TROUBLE_SECONDS);
  boardWrap?.classList.toggle("time-trouble", active);
  board?.classList.toggle("time-trouble", active);
  document.querySelectorAll(".board-player b").forEach((clock) => clock.classList.remove("time-trouble-clock"));
  if (!active) return;
  document.querySelector(`#${turnColor}Clock`)?.classList.add("time-trouble-clock");
  playHeartbeatForTimeTrouble(game, turnColor, seconds);
}

function clearTimeTrouble() {
  boardWrap?.classList.remove("time-trouble");
  board?.classList.remove("time-trouble");
  document.querySelectorAll(".board-player b").forEach((clock) => clock.classList.remove("time-trouble-clock"));
  lastHeartbeatKey = "";
  lastHeartbeatAt = 0;
}

function playHeartbeatForTimeTrouble(game, color, seconds) {
  if (!settings.moveSound) return;
  const nowMs = Date.now();
  const beatKey = `${game.id}:${color}:${seconds}`;
  if (beatKey === lastHeartbeatKey || nowMs - lastHeartbeatAt < HEARTBEAT_COOLDOWN_MS) return;
  lastHeartbeatKey = beatKey;
  lastHeartbeatAt = nowMs;
  playHeartbeatSound(Math.max(0.45, Math.min(1, seconds / TIME_TROUBLE_SECONDS)));
}

function renderBoard(fen, color) {
  board.innerHTML = "";
  board.classList.toggle("show-coordinates", settings.coordinates);
  board.dataset.orientation = color;
  board.classList.toggle("reviewing-history", isViewingHistoricalPosition());
  const displayedLastMove = displayedLastMoveForGame();
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
      if (settings.highlightMoves && displayedLastMove && (displayedLastMove.from === squareName || displayedLastMove.to === squareName)) {
        square.classList.add("last-move");
      }
      if (pendingPremove && currentGame?.id === pendingPremove.gameId && (pendingPremove.from === squareName || pendingPremove.to === squareName)) {
        square.classList.add("premove-square");
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
  if (isViewingHistoricalPosition()) {
    showNotice("Use the right arrow key to return to the live position.");
    return;
  }
  if (!selectedSquare) {
    if (!piece) return;
    if (!canMovePiece(piece)) {
      showMoveBlockedNotice(piece);
      return;
    }
    selectedSquare = square;
    renderCurrentBoard();
    return;
  }
  if (selectedSquare === square) {
    selectedSquare = null;
    renderCurrentBoard();
    return;
  }
  if (piece && isOwnPiece(piece) && canMovePiece(piece)) {
    selectedSquare = square;
    renderCurrentBoard();
    return;
  }
  makeMove(selectedSquare, square);
  selectedSquare = null;
}

function pieceAtSquare(square, fen = currentGame?.fen) {
  if (!square || !fen) return "";
  const file = square.charCodeAt(0) - 97;
  const rank = Number(square[1]);
  if (file < 0 || file > 7 || rank < 1 || rank > 8) return "";
  const row = fen.split(" ")[0].split("/")[8 - rank];
  if (!row) return "";
  let fileIndex = 0;
  for (const char of row) {
    if (/\d/.test(char)) {
      fileIndex += Number(char);
    } else {
      if (fileIndex === file) return char;
      fileIndex += 1;
    }
  }
  return "";
}

function fenBoardToSquares(fen) {
  const squares = {};
  const rows = String(fen || "").split(" ")[0].split("/");
  rows.forEach((row, rowIndex) => {
    let fileIndex = 0;
    for (const char of row) {
      if (/\d/.test(char)) {
        fileIndex += Number(char);
      } else {
        squares[`${"abcdefgh"[fileIndex]}${8 - rowIndex}`] = char;
        fileIndex += 1;
      }
    }
  });
  return squares;
}

function squaresToFenBoard(squares) {
  const rows = [];
  for (let rank = 8; rank >= 1; rank -= 1) {
    let row = "";
    let empty = 0;
    for (const file of "abcdefgh") {
      const piece = squares[`${file}${rank}`];
      if (!piece) {
        empty += 1;
      } else {
        if (empty) row += String(empty);
        empty = 0;
        row += piece;
      }
    }
    if (empty) row += String(empty);
    rows.push(row);
  }
  return rows.join("/");
}

function optimisticFenAfterMove(fen, from, to, promotion = "") {
  if (!fen || !from || !to) return "";
  const parts = fen.split(" ");
  const squares = fenBoardToSquares(fen);
  const piece = squares[from];
  if (!piece) return "";
  const fromFile = from.charCodeAt(0);
  const toFile = to.charCodeAt(0);
  const fromRank = Number(from[1]);
  const toRank = Number(to[1]);
  const isWhitePiece = piece === piece.toUpperCase();
  delete squares[from];

  if (piece.toLowerCase() === "p" && fromFile !== toFile && !squares[to]) {
    delete squares[`${to[0]}${fromRank}`];
  }

  if (piece.toLowerCase() === "k" && Math.abs(toFile - fromFile) === 2) {
    const rank = from[1];
    if (toFile > fromFile) {
      squares[`f${rank}`] = squares[`h${rank}`];
      delete squares[`h${rank}`];
    } else {
      squares[`d${rank}`] = squares[`a${rank}`];
      delete squares[`a${rank}`];
    }
  }

  const promotedPiece = promotion && piece.toLowerCase() === "p" && (toRank === 1 || toRank === 8)
    ? (isWhitePiece ? promotion.toUpperCase() : promotion.toLowerCase())
    : piece;
  squares[to] = promotedPiece;
  parts[0] = squaresToFenBoard(squares);
  return parts.join(" ");
}

function canMovePiece(piece) {
  if (!piece || !currentGame || currentGame.status !== "playing") return false;
  if (isViewingHistoricalPosition()) return false;
  return isOwnPiece(piece) && (isMyTurn(currentGame) || canUsePremoves(currentGame));
}

function canUsePremoves(game = currentGame) {
  return Boolean(settings.premoves && game?.status === "playing" && game.kind !== "team" && game.turn !== game.color);
}

function clearPendingPremove() {
  pendingPremove = null;
}

function queuePremove(from, to) {
  if (!canUsePremoves(currentGame) || !from || !to || from === to) return false;
  const targetPiece = pieceAtSquare(to);
  if (targetPiece && isOwnPiece(targetPiece)) {
    showNotice("Choose an empty square or an opponent piece for your premove.");
    renderCurrentBoard();
    return true;
  }
  pendingPremove = { gameId: currentGame.id, from, to };
  selectedSquare = null;
  showNotice("Premove set.");
  renderCurrentBoard();
  return true;
}

function maybePlayPendingPremove(game, myTurn) {
  if (!pendingPremove || playingPremove || !myTurn || game.kind === "team" || game.status !== "playing") return;
  if (pendingPremove.gameId !== game.id) {
    clearPendingPremove();
    return;
  }
  const move = pendingPremove;
  playingPremove = true;
  clearPendingPremove();
  window.setTimeout(async () => {
    try {
      if (!currentGame || currentGame.id !== move.gameId || !isMyTurn(currentGame)) return;
      await makeMove(move.from, move.to);
    } finally {
      playingPremove = false;
      renderCurrentBoard();
    }
  }, 0);
}

async function makeMove(from, to) {
  if (!from || !to || from === to) return;
  if (isViewingHistoricalPosition()) {
    showNotice("Use the right arrow key to return to the live position.");
    renderCurrentBoard();
    return;
  }
  if (!isMyTurn(currentGame)) {
    if (queuePremove(from, to)) return;
    showMoveBlockedNotice();
    renderCurrentBoard();
    return;
  }
  if (!isLegalMove(from, to)) {
    playIllegalMoveSound();
    if (playingPremove) showNotice("Premove was not legal anymore.");
    renderCurrentBoard();
    return;
  }
  const promotion = await promotionForMove(from, to);
  if (promotion === null) {
    renderCurrentBoard();
    return;
  }
  socket.emit("game:move", { from, to, ...(promotion ? { promotion } : {}) });
  const optimisticFen = optimisticFenAfterMove(currentGame.fen, from, to, promotion);
  selectedSquare = null;
  if (optimisticFen) renderBoard(optimisticFen, currentGame.color);
}

async function promotionForMove(from, to) {
  const promotionMoves = (currentGame?.legalMoves || []).filter((move) => move.from === from && move.to === to && move.promotion);
  if (!promotionMoves.length) return "";
  if (settings.autoPromoteQueen) return "q";
  const choices = ["n", "r", "b", "q"].filter((piece) => promotionMoves.some((move) => move.promotion === piece));
  return choosePromotionPiece(choices.length ? choices : ["n", "r", "b", "q"], { from, to });
}

function choosePromotionPiece(choices, move = {}) {
  return new Promise((resolve) => {
    const existing = document.querySelector("#promotionChoiceModal");
    existing?.remove();
    const modal = document.createElement("section");
    modal.id = "promotionChoiceModal";
    modal.className = "promotion-choice-modal";
    modal.setAttribute("aria-label", "Choose promotion piece");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("role", "dialog");

    const menu = document.createElement("div");
    menu.className = "promotion-choice-menu";
    menu.setAttribute("aria-label", "Choose promotion piece");
    const labels = { n: "Knight", r: "Rook", b: "Bishop", q: "Queen" };
    const pawn = pieceAtSquare(move.from);
    const promoteAsWhite = pawn ? pawn === pawn.toUpperCase() : currentGame?.color !== "black";
    const orderedChoices = ["q", "n", "r", "b"].filter((piece) => choices.includes(piece));

    orderedChoices.forEach((piece) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.promotion = piece;
      button.setAttribute("aria-label", `Promote to ${labels[piece]}`);
      button.title = labels[piece];
      button.append(renderPieceImage(promoteAsWhite ? piece.toUpperCase() : piece));
      menu.append(button);
    });

    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.className = "promotion-choice-cancel";
    cancelButton.setAttribute("aria-label", "Cancel promotion");
    cancelButton.title = "Cancel";
    cancelButton.textContent = "x";
    menu.append(cancelButton);
    modal.append(menu);

    const positionMenu = () => positionPromotionChoiceMenu(menu, move.to, orderedChoices.length + 1);
    const close = (value) => {
      window.removeEventListener("resize", positionMenu);
      document.removeEventListener("keydown", onKeyDown, true);
      modal.remove();
      resolve(value);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") close(null);
    };
    modal.addEventListener("click", (event) => {
      const button = event.target.closest("[data-promotion]");
      if (button && modal.contains(button)) {
        close(button.dataset.promotion);
        return;
      }
      if (event.target.closest(".promotion-choice-cancel")) close(null);
    });
    document.addEventListener("keydown", onKeyDown, true);
    window.addEventListener("resize", positionMenu);
    document.body.append(modal);
    positionMenu();
    menu.querySelector("button")?.focus();
  });
}

function positionPromotionChoiceMenu(menu, square, itemCount) {
  const target = square ? board?.querySelector(`[data-square="${square}"]`) : null;
  const boardRect = board?.getBoundingClientRect();
  const targetRect = target?.getBoundingClientRect();
  const squareSize = targetRect?.width || (boardRect ? boardRect.width / 8 : 76);
  const menuWidth = Math.max(54, Math.min(squareSize, 96));
  const menuHeight = menuWidth * itemCount;
  const viewportPad = 10;
  let left = targetRect ? targetRect.left : ((window.innerWidth - menuWidth) / 2);
  let top = targetRect ? targetRect.top : ((window.innerHeight - menuHeight) / 2);

  if (boardRect && targetRect && top + menuHeight > boardRect.bottom + 1) {
    top = targetRect.bottom - menuHeight;
  }
  left = Math.max(viewportPad, Math.min(left, window.innerWidth - menuWidth - viewportPad));
  top = Math.max(viewportPad, Math.min(top, window.innerHeight - menuHeight - viewportPad));

  menu.style.setProperty("--promotion-square-size", `${menuWidth}px`);
  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
}


function startPieceDrag(event, square, piece) {
  if (event.button !== undefined && event.button !== 0) return;
  if (!currentGame || currentGame.status !== "playing") return;
  if (isViewingHistoricalPosition()) {
    event.preventDefault();
    showNotice("Use the right arrow key to return to the live position.");
    return;
  }

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
  const pieceRect = pieceImage.getBoundingClientRect();
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
    offsetX: event.clientX - pieceRect.left,
    offsetY: event.clientY - pieceRect.top,
    ghostWidth: pieceRect.width,
    ghostHeight: pieceRect.height,
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
    dragMove.ghost.style.width = `${dragMove.ghostWidth}px`;
    dragMove.ghost.style.height = `${dragMove.ghostHeight}px`;
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
    renderCurrentBoard();
    return;
  }
  if (target && target !== from) {
    selectedSquare = null;
    makeMove(from, target);
    return;
  }
  selectedSquare = from;
  renderCurrentBoard();
}

function cancelPieceDrag() {
  selectedSquare = null;
  finishPieceDrag();
  renderCurrentBoard();
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
  renderCurrentBoard();
  makeMove(from, targetSquare);
}

function isOwnPiece(piece) {
  if (!piece || !currentGame) return false;
  const isWhitePiece = piece === piece.toUpperCase();
  return (currentGame.color === "white") === isWhitePiece;
}

function showMoveBlockedNotice(piece) {
  if (!currentGame || currentGame.status !== "playing") return;
  playIllegalMoveSound();
  if (currentGame.turn !== currentGame.color) {
    showNotice(canUsePremoves(currentGame) ? "Pick one of your pieces to set a premove." : `${currentGame.turn === "white" ? "White" : "Black"} to move. Wait for your turn.`);
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
  dragMove.ghost.style.left = `${clientX - dragMove.offsetX}px`;
  dragMove.ghost.style.top = `${clientY - dragMove.offsetY}px`;
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
  if (remoteParticipantCount >= expectedRemote) {
    liveKitReconnectAttempts = 0;
    clearTimeout(liveKitReconnectTimer);
    liveKitReconnectTimer = null;
    return;
  }
  if (liveKitReconnectTimer || liveKitReconnectAttempts >= 3) return;
  liveKitReconnectTimer = window.setTimeout(async () => {
    liveKitReconnectTimer = null;
    if (liveKitRoom !== room || !currentGame || currentGame.videoOff || currentGame.status !== "playing") return;
    const nextExpectedRemote = videoPeers(currentGame).length;
    const nextRemoteCount = liveKitRemoteParticipants(room).length;
    if (!nextExpectedRemote || nextRemoteCount >= nextExpectedRemote) return;
    liveKitReconnectAttempts += 1;
    setLiveKitState({
      mode: "reconnecting LiveKit",
      lastError: `Only ${nextRemoteCount}/${nextExpectedRemote} remote LiveKit participants received. Reconnect attempt ${liveKitReconnectAttempts}/3.`
    });
    await reconnectLiveKitRoom();
    if (liveKitReconnectAttempts >= 3 && liveKitRemoteParticipants(liveKitRoom).length < videoPeers(currentGame).length) {
      setLiveKitState({
        lastError: "Still missing one or more LiveKit participants. The other device may be cached, blocked, or not in this LiveKit room."
      });
    }
  }, 8000);
}

async function reconnectLiveKitRoom() {
  if (!currentGame || !localStream || currentGame.videoOff || currentGame.status !== "playing") return;
  closeLiveKitRoom();
  await startLiveKitRoom();
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
    faceMeshEnabled = Boolean(settings.faceMeshAlwaysOn);
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
    showNotice("Team video needs LiveKit. Please check the video service configuration.");
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
      adaptiveStream: false,
      dynacast: false,
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
    await publishLiveKitTracks(room, LiveKit, { retries: 1 });
    scheduleLiveKitPublishRepair(room, LiveKit);
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

function sleep(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function publishLiveKitTracks(room, LiveKit, options = {}) {
  const Track = LiveKit.Track || {};
  const videoTrack = localStream.getVideoTracks()[0];
  const audioTrack = localStream.getAudioTracks()[0];
  if (videoTrack) {
    try {
      await publishLiveKitVideoTrack(room, Track, videoTrack, options.retries ?? 0);
      setLiveKitState({ localVideoPublished: true });
    } catch (error) {
      console.warn("[ChessFace] LiveKit camera publish failed:", error);
      setLiveKitState({ localVideoPublished: false, lastError: error.message || "Camera publish failed." });
      if (!options.silent) showNotice("Your camera could not be sent, but you can still see the other players.");
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

async function publishLiveKitVideoTrack(room, Track, videoTrack, retries = 0) {
  try {
    await room.localParticipant.publishTrack(videoTrack, {
      source: Track.Source?.Camera || "camera",
      simulcast: false,
      videoEncoding: {
        maxBitrate: VIDEO_MAX_BITRATE,
        maxFramerate: VIDEO_FRAME_RATE
      }
    });
  } catch (error) {
    const hasCameraPublication = liveKitPublications(room?.localParticipant)
      .some((publication) => liveKitPublicationKind(publication) === "video");
    if (hasCameraPublication) return;
    if (retries <= 0) throw error;
    await sleep(700);
    return publishLiveKitVideoTrack(room, Track, videoTrack, retries - 1);
  }
}

function scheduleLiveKitPublishRepair(room, LiveKit) {
  clearInterval(liveKitPublishRepairTimer);
  liveKitPublishRepairTimer = window.setInterval(() => {
    if (liveKitRoom !== room || !currentGame || currentGame.videoOff || currentGame.status !== "playing") {
      clearInterval(liveKitPublishRepairTimer);
      liveKitPublishRepairTimer = null;
      return;
    }
    repairLiveKitLocalPublish(room, LiveKit);
  }, 5000);
}

async function repairLiveKitLocalPublish(room, LiveKit) {
  const publications = liveKitPublications(room?.localParticipant);
  const hasCameraPublication = publications.some((publication) => liveKitPublicationKind(publication) === "video");
  const hasMicPublication = publications.some((publication) => liveKitPublicationKind(publication) === "audio");
  const videoTrack = localStream?.getVideoTracks?.()[0];
  const audioTrack = localStream?.getAudioTracks?.()[0];
  if ((videoTrack && !hasCameraPublication) || (audioTrack && !hasMicPublication)) {
    await publishLiveKitTracks(room, LiveKit, { silent: true, retries: 1 });
    syncLiveKitParticipants(room);
    refreshLiveKitState(room, { mode: "LiveKit republished local media" });
  }
}

function syncLiveKitParticipants(room) {
  liveKitRemoteParticipants(room).forEach((participant) => syncLiveKitParticipant(participant));
  refreshLiveKitState(room);
}

function syncLiveKitParticipant(participant) {
  const peerId = String(participant?.identity || "");
  if (isLiveKitSpectatorParticipant(participant)) {
    removePeerVideoTile(peerId);
    return;
  }
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
  if (typeof publication.setEnabled === "function") {
    try {
      publication.setEnabled(true);
    } catch {
      // Some LiveKit publication types do not expose setEnabled in this version.
    }
  }
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

function liveKitTrackKind(track) {
  const source = String(track?.source || "").toLowerCase();
  const kind = String(track?.kind || track?.mediaStreamTrack?.kind || "").toLowerCase();
  if (kind === "audio" || source === "microphone") return "audio";
  if (kind === "video" || source === "camera") return "video";
  return kind || source || "";
}

function liveKitPeerForParticipant(participant) {
  const peerId = String(participant?.identity || "");
  const known = videoPeersById.get(peerId);
  if (known) return known;
  const metadata = liveKitParticipantMetadata(participant);
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
  if (isLiveKitSpectatorParticipant(participant)) {
    removePeerVideoTile(peerId);
    return;
  }
  if (!peerId || peerId === String(me?.id)) return;
  const peer = liveKitPeerForParticipant(participant);
  const tile = peerVideoTiles.get(peerId) || ensurePeerVideoTile(peer);
  const video = peerVideoElements.get(peerId) || tile.querySelector("video");
  if (!video) return;

  const mediaTrack = track.mediaStreamTrack;
  const kind = liveKitTrackKind(track) || mediaTrack?.kind;
  if (kind === "audio") {
    const audio = ensurePeerAudioElement(peerId, tile);
    const existingAudio = liveKitTrackElements.get(`${peerId}:audio`);
    if (
      mediaTrack
        && existingAudio?.track === mediaTrack
        && audio.srcObject instanceof MediaStream
        && audio.srcObject.getAudioTracks().includes(mediaTrack)
    ) {
      applyOpponentAudioState();
      if (audio.paused) audio.play?.().catch(() => {});
      if (video.paused) video.play?.().catch(() => {});
      return;
    }
    if (mediaTrack) {
      ensureTrackInMediaElement(audio, mediaTrack, "audio");
      liveKitTrackElements.set(`${peerId}:audio`, { element: audio, track: mediaTrack });
    } else if (typeof track.attach === "function") {
      const element = track.attach(audio);
      if (element && element !== audio && element.srcObject) audio.srcObject = element.srcObject;
      liveKitTrackElements.set(`${peerId}:audio`, { element: audio, track });
    }
    applyOpponentAudioState();
    audio.play?.().catch(() => {});
    video.play?.().catch(() => {});
    refreshLiveKitState(liveKitRoom);
    return;
  }
  if (mediaTrack) {
    const existingVideo = liveKitTrackElements.get(`${peerId}:video`);
    if (existingVideo?.track === mediaTrack && video.srcObject instanceof MediaStream && video.srcObject.getVideoTracks().includes(mediaTrack)) {
      applyOpponentAudioState();
      if (video.paused) video.play().catch(() => {});
      refreshLiveKitState(liveKitRoom);
      return;
    }
    ensureTrackInMediaElement(video, mediaTrack, "video");
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

function liveKitParticipantMetadata(participant) {
  try {
    return participant?.metadata ? JSON.parse(participant.metadata) : {};
  } catch {
    return {};
  }
}

function isLiveKitSpectatorParticipant(participant) {
  const identity = String(participant?.identity || "");
  if (identity.startsWith("watcher:")) return true;
  const metadata = liveKitParticipantMetadata(participant);
  return metadata.role === "spectator" || metadata.teamColor === "spectator";
}

function removePeerVideoTile(peerId) {
  const id = String(peerId || "");
  if (!id) return;
  const tile = peerVideoTiles.get(id);
  const primaryTile = remoteVideo?.closest(".video-tile");
  if (tile && tile !== primaryTile) tile.remove();
  const video = peerVideoElements.get(id);
  if (video) video.srcObject = null;
  const audio = peerAudioElements.get(id);
  if (audio) audio.remove();
  peerVideoTiles.delete(id);
  peerVideoElements.delete(id);
  peerAudioElements.delete(id);
  [...liveKitTrackElements.keys()]
    .filter((key) => key.startsWith(`${id}:`))
    .forEach((key) => liveKitTrackElements.delete(key));
}

function ensureTrackInMediaElement(element, track, kind = track?.kind) {
  if (!element || !track) return;
  const stream = element.srcObject instanceof MediaStream ? element.srcObject : new MediaStream();
  stream.getTracks()
    .filter((item) => item.kind === kind && item !== track)
    .forEach((item) => stream.removeTrack(item));
  if (!stream.getTracks().includes(track)) stream.addTrack(track);
  element.srcObject = stream;
}

function playMediaElement(element) {
  if (!element?.play) return;
  const tryPlay = () => element.play().catch(() => {});
  tryPlay();
  element.addEventListener("loadedmetadata", tryPlay, { once: true });
  element.addEventListener("canplay", tryPlay, { once: true });
}

function attachRemotePeerTrack(peerId, event) {
  const track = event.track;
  if (!track) return;
  if (track.kind === "audio") {
    const tile = peerVideoTiles.get(String(peerId)) || peerVideoElements.get(String(peerId))?.closest(".video-tile");
    const audio = ensurePeerAudioElement(peerId, tile);
    ensureTrackInMediaElement(audio, track, "audio");
    applyOpponentAudioState();
    playMediaElement(audio);
    return;
  }

  if (track.kind !== "video") return;
  const video = peerVideoElements.get(String(peerId));
  if (!video) return;
  prepareVideoElement(video, { muted: true });
  ensureTrackInMediaElement(video, track, "video");
  applyOpponentAudioState();
  playMediaElement(video);
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
  if (String(peerId || "").startsWith("watcher:")) {
    removePeerVideoTile(peerId);
    return;
  }
  const video = peerVideoElements.get(String(peerId));
  if (video) video.srcObject = null;
  const audio = peerAudioElements.get(String(peerId));
  if (audio) audio.srcObject = null;
  [...liveKitTrackElements.keys()]
    .filter((key) => key.startsWith(`${peerId}:`))
    .forEach((key) => liveKitTrackElements.delete(key));
}

function closeLiveKitRoom() {
  clearInterval(liveKitPublishRepairTimer);
  liveKitPublishRepairTimer = null;
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
  preferSafariFriendlyVideoCodecs(peerConnection);
  peerConnection.ontrack = (event) => {
    attachRemotePeerTrack(peerId, event);
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

function preferSafariFriendlyVideoCodecs(peerConnection) {
  const capabilities = window.RTCRtpSender?.getCapabilities?.("video");
  const codecs = capabilities?.codecs;
  if (!codecs?.length) return;
  const h264 = codecs.filter((codec) => codec.mimeType?.toLowerCase() === "video/h264");
  if (!h264.length) return;
  const preferred = [
    ...h264,
    ...codecs.filter((codec) => codec.mimeType?.toLowerCase() !== "video/h264")
  ];
  peerConnection.getTransceivers?.()
    .filter((transceiver) => transceiver.receiver?.track?.kind === "video" || transceiver.sender?.track?.kind === "video")
    .forEach((transceiver) => {
      try {
        transceiver.setCodecPreferences(preferred);
      } catch {
        // Older Safari builds either lack this API or reject unsupported preference lists.
      }
    });
}

async function createAndSendOffer(peerId, options = {}) {
  const peerConnection = peerConnections.get(peerId);
  if (!peerConnection || currentGame?.videoOff || peerConnection.signalingState !== "stable") return;
  try {
    preferSafariFriendlyVideoCodecs(peerConnection);
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
      preferSafariFriendlyVideoCodecs(peerConnection);
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
  window.ChessFaceSounds?.unlockAudio?.();
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

function playHeartbeatSound(intensity = 0.8) {
  const context = getAudioContext();
  if (context.state === "suspended") context.resume();
  const now = context.currentTime;
  const master = context.createGain();
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.28 + intensity * 0.18, now + 0.012);
  master.gain.exponentialRampToValueAtTime(0.0001, now + 0.36);
  master.connect(context.destination);

  [0, 0.18].forEach((offset, index) => {
    const beat = context.createOscillator();
    beat.type = "sine";
    const beatGain = context.createGain();
    const start = now + offset;
    beat.frequency.setValueAtTime(index === 0 ? 72 : 58, start);
    beat.frequency.exponentialRampToValueAtTime(index === 0 ? 46 : 38, start + 0.09);
    beatGain.gain.setValueAtTime(0.0001, start);
    beatGain.gain.exponentialRampToValueAtTime(index === 0 ? 1 : 0.72, start + 0.01);
    beatGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.12);
    beat.connect(beatGain).connect(master);
    beat.start(start);
    beat.stop(start + 0.13);
  });
}

function playMatchIntroSound() {
  if (!settings.moveSound) return;
  try {
    const audio = new Audio(MATCH_INTRO_SOUND_URL);
    audio.volume = 0.72;
    audio.preload = "auto";
    audio.play().catch(() => playFallbackMatchIntroSound());
    return;
  } catch {
    playFallbackMatchIntroSound();
  }
}

function playFallbackMatchIntroSound() {
  const context = getAudioContext();
  if (context.state === "suspended") context.resume();
  const now = context.currentTime;
  const master = context.createGain();
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.38, now + 0.018);
  master.gain.exponentialRampToValueAtTime(0.0001, now + 0.86);
  master.connect(context.destination);

  [0, 0.055].forEach((offset, index) => {
    const scrape = context.createOscillator();
    scrape.type = index === 0 ? "sawtooth" : "triangle";
    const scrapeGain = context.createGain();
    const start = now + offset;
    scrape.frequency.setValueAtTime(index === 0 ? 1180 : 1720, start);
    scrape.frequency.exponentialRampToValueAtTime(index === 0 ? 3520 : 4120, start + 0.23);
    scrapeGain.gain.setValueAtTime(0.0001, start);
    scrapeGain.gain.exponentialRampToValueAtTime(index === 0 ? 0.42 : 0.24, start + 0.018);
    scrapeGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.34);
    scrape.connect(scrapeGain).connect(master);
    scrape.start(start);
    scrape.stop(start + 0.36);
  });

  const clash = context.createOscillator();
  clash.type = "square";
  const clashGain = context.createGain();
  const clashAt = now + 0.34;
  clash.frequency.setValueAtTime(240, clashAt);
  clash.frequency.exponentialRampToValueAtTime(82, clashAt + 0.18);
  clashGain.gain.setValueAtTime(0.0001, clashAt);
  clashGain.gain.exponentialRampToValueAtTime(0.55, clashAt + 0.012);
  clashGain.gain.exponentialRampToValueAtTime(0.0001, clashAt + 0.24);
  clash.connect(clashGain).connect(master);
  clash.start(clashAt);
  clash.stop(clashAt + 0.26);
}

function sendSignal(peerId, signal) {
  if (!currentGame || !peerId) return;
  socket.emit("webrtc:signal", { gameId: currentGame.id, to: peerId, signal });
}

async function buildOutgoingMediaStream(sourceStream) {
  stopFilterRenderer();
  stopFilteredStream();
  if (!faceMeshEnabled) return sourceStream;
  try {
    return await buildFaceMeshStream(sourceStream);
  } catch (error) {
    console.warn("[ChessFace] Face mesh unavailable:", error);
    faceMeshEnabled = false;
    updateFaceMeshButton();
    showNotice("Face mesh could not start. Camera stayed normal.");
    return sourceStream;
  }
}

async function loadFaceMeshModule() {
  if (window.FaceMesh && window.drawConnectors) return { FaceMesh: window.FaceMesh };
  if (faceMeshModulePromise) return faceMeshModulePromise;
  faceMeshModulePromise = loadScript(MEDIAPIPE_DRAWING_UTILS_URL)
    .then(() => loadScript(MEDIAPIPE_FACE_MESH_URL))
    .then(() => {
      if (!window.FaceMesh) throw new Error("MediaPipe FaceMesh did not load");
      return { FaceMesh: window.FaceMesh };
    });
  return faceMeshModulePromise;
}

function loadScript(src) {
  const existing = document.querySelector(`script[src="${src}"]`);
  if (existing) {
    return existing.dataset.loaded === "true"
      ? Promise.resolve()
      : new Promise((resolve, reject) => {
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", reject, { once: true });
      });
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.addEventListener("load", () => {
      script.dataset.loaded = "true";
      resolve();
    }, { once: true });
    script.addEventListener("error", () => reject(new Error(`Could not load ${src}`)), { once: true });
    document.head.append(script);
  });
}

async function buildFaceMeshStream(sourceStream) {
  const sourceVideoTrack = sourceStream.getVideoTracks()[0];
  if (!sourceVideoTrack) return sourceStream;
  const { FaceMesh } = await loadFaceMeshModule();
  const sourceVideo = document.createElement("video");
  sourceVideo.muted = true;
  sourceVideo.playsInline = true;
  sourceVideo.srcObject = new MediaStream([sourceVideoTrack]);
  await sourceVideo.play().catch(() => {});
  await waitForVideoReady(sourceVideo);

  const settings = sourceVideoTrack.getSettings?.() || {};
  const width = settings.width || sourceVideo.videoWidth || VIDEO_OUTPUT_WIDTH;
  const height = settings.height || sourceVideo.videoHeight || VIDEO_OUTPUT_HEIGHT;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { alpha: false });
  const outputStream = canvas.captureStream(VIDEO_FRAME_RATE);
  sourceStream.getAudioTracks().forEach((track) => outputStream.addTrack(track));
  filteredLocalStream = outputStream;

  const mesh = new FaceMesh({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
  });
  mesh.setOptions({
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  });
  faceMeshInstance = mesh;
  let latestResults = null;
  mesh.onResults((results) => {
    latestResults = results;
  });

  let stopped = false;
  const render = async () => {
    if (stopped || !faceMeshEnabled || !rawLocalStream) return;
    context.drawImage(sourceVideo, 0, 0, width, height);
    const landmarks = latestResults?.multiFaceLandmarks?.[0];
    if (landmarks && window.drawConnectors) {
      const connectors = window.FACEMESH_TESSELATION || [];
      const contours = window.FACEMESH_CONTOURS || [];
      window.drawConnectors(context, landmarks, connectors, { color: "rgba(88, 212, 191, 0.32)", lineWidth: 1 });
      window.drawConnectors(context, landmarks, contours, { color: "rgba(242, 198, 109, 0.9)", lineWidth: 2 });
    }
    if (!faceMeshFrameInFlight && sourceVideo.readyState >= 2) {
      faceMeshFrameInFlight = true;
      mesh.send({ image: sourceVideo }).catch(() => {}).finally(() => {
        faceMeshFrameInFlight = false;
      });
    }
    faceMeshRenderer.frame = requestAnimationFrame(render);
  };
  faceMeshRenderer = {
    frame: 0,
    stop: () => {
      stopped = true;
      cancelAnimationFrame(faceMeshRenderer?.frame);
      sourceVideo.pause?.();
      sourceVideo.srcObject = null;
    }
  };
  render();
  return outputStream;
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
  showNotice("Camera updated.");
}

async function toggleFaceMesh() {
  if (!currentGame || currentGame.videoOff || currentGame.status !== "playing") return;
  if (!rawLocalStream?.getVideoTracks().length) {
    showNotice("Turn on your camera before using Face mesh.");
    return;
  }
  faceMeshEnabled = !faceMeshEnabled;
  updateFaceMeshButton(true);
  try {
    await restartMediaPipeline();
    showNotice(faceMeshEnabled ? "Face mesh is on." : "Face mesh is off.");
  } catch (error) {
    console.warn("[ChessFace] Face mesh toggle failed:", error);
    faceMeshEnabled = false;
    stopFilterRenderer();
    stopFilteredStream();
    updateFaceMeshButton();
    showNotice("Face mesh could not start.");
  } finally {
    updateFaceMeshButton();
  }
}

function updateFaceMeshButton(loading = false) {
  if (!faceMeshButton) return;
  const visible = Boolean(currentGame && !currentGame.videoOff && currentGame.status === "playing");
  faceMeshButton.classList.toggle("hidden", !visible);
  faceMeshButton.classList.toggle("is-active", faceMeshEnabled);
  faceMeshButton.disabled = loading || !visible;
  faceMeshButton.textContent = loading ? "Loading mesh..." : faceMeshEnabled ? "Normal face" : "Face mesh";
  faceMeshButton.setAttribute("aria-pressed", String(faceMeshEnabled));
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
  faceMeshRenderer?.stop?.();
  faceMeshRenderer = null;
  faceMeshInstance?.close?.();
  faceMeshInstance = null;
  faceMeshFrameInFlight = false;
}

function stopLocalMedia() {
  faceMeshEnabled = false;
  updateFaceMeshButton();
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
  if (audio) audio.enabled = !meAudioMuted && !randomSoundMicSuppressionActive;
  setVideoIconButton(micButton, meAudioMuted ? "Unmute me" : "Mute me", meAudioMuted);
}

function beginRandomSoundMicSuppression() {
  if (meAudioMuted) return;
  randomSoundMicSuppressionActive = true;
  applyLocalAudioState();
}

function endRandomSoundMicSuppression() {
  if (!randomSoundMicSuppressionActive) return;
  randomSoundMicSuppressionActive = false;
  applyLocalAudioState();
}

async function toggleOpponentAudio() {
  opponentAudioMuted = !opponentAudioMuted;
  applyOpponentAudioState();
  if (!opponentAudioMuted) {
    const audibleAudioElements = [...peerAudioElements.values()];
    try {
      await Promise.all(audibleAudioElements.map((audio) => audio.play().catch(() => null)));
    } catch {
      showNotice("Tap again if the browser blocks sound.");
    }
  }
}

function applyOpponentAudioState() {
  peerVideoElements.forEach((video, peerId) => {
    const shouldMute = opponentAudioMuted;
    video.muted = true;
    video.volume = 0;
    video.play?.().catch(() => {});
    video.closest(".video-tile")?.classList.toggle("is-muted", shouldMute);
  });
  peerAudioElements.forEach((audio, peerId) => {
    const shouldMute = opponentAudioMuted;
    audio.muted = shouldMute;
    audio.volume = shouldMute ? 0 : 1;
    if (!shouldMute) audio.play?.().catch(() => {});
  });
  const target = currentGame?.kind === "team" ? "others" : "opponent";
  setVideoIconButton(opponentMuteButton, opponentAudioMuted ? `Unmute ${target}` : `Mute ${target}`, opponentAudioMuted);
}

function toggleCamera() {
  const rawVideo = rawLocalStream?.getVideoTracks()[0];
  const sentVideo = localStream?.getVideoTracks()[0];
  const video = rawVideo || sentVideo;
  if (!video) return;
  const enabled = !video.enabled;
  if (rawVideo) rawVideo.enabled = enabled;
  if (sentVideo) sentVideo.enabled = enabled;
  setVideoIconButton(cameraButton, enabled ? "Camera off" : "Camera on", !enabled);
}

function setVideoIconButton(button, label, active = false) {
  if (!button) return;
  button.setAttribute("aria-label", label);
  button.title = label;
  button.classList.toggle("is-active", active);
}

function closePeer() {
  closePeerConnections();
  clearPendingVideoSignals();
  stopLocalMedia();
  localVideo.srcObject = null;
  clearRemoteVideoElements();
}

function resetToLobby() {
  clearPostGameVideoTimer();
  closePeer();
  currentGame = null;
  gameChat = [];
  gameResultModal?.classList.add("hidden");
  rematchRequestModal?.classList.add("hidden");
  pendingRematchGameId = null;
  renderGameChat();
  selectedSquare = null;
  clearTimeTrouble();
  hideMatchIntro();
  document.body.classList.remove("in-game");
  gameLayout.classList.add("hidden");
  lobby.classList.remove("hidden");
  statusTitle.textContent = "Choose a time control";
}

function logout() {
  clearPostGameVideoTimer();
  closePeer();
  if (socket) socket.disconnect();
  localStorage.removeItem("chessface:token");
  localStorage.removeItem("chessface:user");
  token = null;
  me = null;
  currentGame = null;
  gameChat = [];
  gameResultModal?.classList.add("hidden");
  rematchRequestModal?.classList.add("hidden");
  pendingRematchGameId = null;
  renderGameChat();
  clearTimeTrouble();
  hideMatchIntro();
  document.body.classList.remove("in-game");
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

function showBoardMessage(message, duration = 1000) {
  if (!message) return;
  let notice = document.querySelector("#boardNotice");
  if (!notice) {
    notice = document.createElement("div");
    notice.id = "boardNotice";
    notice.className = "board-notice";
    notice.setAttribute("role", "status");
    notice.setAttribute("aria-live", "polite");
    document.body.append(notice);
  }
  notice.textContent = message;
  notice.classList.add("show");
  window.clearTimeout(notice.hideTimer);
  notice.hideTimer = window.setTimeout(() => notice.classList.remove("show"), duration);
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

function soundOptions() {
  return window.ChessFaceSounds?.soundOptions || [{ id: "random", label: "Random", file: null }];
}

function groupedSoundOptions() {
  return soundOptions().filter((sound) => sound.id !== "none" && sound.id !== "random" && sound.file);
}

function soundMatchesQuery(sound, query) {
  if (!query) return true;
  const normalizedQuery = String(query).toLowerCase();
  const label = String(sound.label || "").toLowerCase();
  const words = label.split(/\s+/).filter(Boolean);
  if (label.startsWith(normalizedQuery) || words.some((word) => word.startsWith(normalizedQuery))) return true;
  const haystack = [sound.label, sound.category, sound.id].filter(Boolean).join(" ").toLowerCase();
  return haystack.includes(normalizedQuery);
}

async function loadSoundManifest() {
  if (window.ChessFaceSounds?.loadedRemoteManifest) return;
  try {
    const response = await fetch("/api/sounds", { cache: "no-store" });
    if (!response.ok) throw new Error(`Sound manifest failed with ${response.status}`);
    const payload = await response.json();
    const nextSounds = Array.isArray(payload.sounds) ? payload.sounds : [];
    if (!nextSounds.length) return;
    window.ChessFaceSounds?.setSoundOptions?.([
      { id: "random", label: "Random", file: null },
      ...nextSounds
    ]);
    if (window.ChessFaceSounds) window.ChessFaceSounds.loadedRemoteManifest = true;
    soundSettings = normalizeSoundSettings(soundSettings);
    saveSoundSettings();
    syncSoundControls();
  } catch (error) {
    console.warn("Sound manifest could not be loaded:", error);
  }
}

function playConfiguredSound(soundId, options = {}) {
  window.ChessFaceSounds?.playSound?.(soundId, options);
}

function normalizeSoundSettings(nextSettings = {}) {
  const validIds = new Set(["none", ...soundOptions().map((sound) => sound.id)]);
  const checkSound = validIds.has(nextSettings.checkSound) ? nextSettings.checkSound : "none";
  const checkmateSound = validIds.has(nextSettings.checkmateSound) ? nextSettings.checkmateSound : "random";
  const turnSound = validIds.has(nextSettings.turnSound) && nextSettings.turnSound !== "none" ? nextSettings.turnSound : "random";
  return { checkSound, checkmateSound, turnSound };
}

function loadSoundSettings() {
  return {
    checkSound: localStorage.getItem("chessface_check_sound") || "none",
    checkmateSound: localStorage.getItem("chessface_checkmate_sound") || "random",
    turnSound: localStorage.getItem("chessface_turn_sound") || "random"
  };
}

function saveSoundSettings() {
  localStorage.setItem("chessface_check_sound", soundSettings.checkSound);
  localStorage.setItem("chessface_checkmate_sound", soundSettings.checkmateSound);
  localStorage.setItem("chessface_turn_sound", soundSettings.turnSound);
}

function createSoundOption(sound) {
  const option = document.createElement("option");
  option.value = sound.id;
  option.textContent = sound.label;
  return option;
}

function soundGroups(sounds) {
  const groups = new Map();
  sounds.forEach((sound) => {
    const category = sound.category || "Sounds";
    if (!groups.has(category)) groups.set(category, []);
    groups.get(category).push(sound);
  });
  return groups;
}

function appendGroupedSoundOptions(select, sounds) {
  soundGroups(sounds).forEach((items, category) => {
    const group = document.createElement("optgroup");
    group.label = category;
    items.forEach((sound) => group.append(createSoundOption(sound)));
    select.append(group);
  });
}

function renderSoundSearchResults(results, select, value, options = {}) {
  if (!results || !select) return;
  const query = String(options.query || "").trim();
  results.innerHTML = "";
  results.classList.add("hidden");
  if (!query) return;

  const matches = groupedSoundOptions()
    .filter((sound) => soundMatchesQuery(sound, query))
    .slice(0, 24);

  if (!matches.length) {
    const empty = document.createElement("div");
    empty.className = "sound-search-empty";
    empty.textContent = "No matching sounds";
    results.append(empty);
    results.classList.remove("hidden");
    return;
  }

  soundGroups(matches).forEach((items, category) => {
    const heading = document.createElement("div");
    heading.className = "sound-search-category";
    heading.textContent = category;
    results.append(heading);

    items.forEach((sound) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "sound-search-result";
      button.dataset.soundId = sound.id;
      button.textContent = sound.label;
      button.setAttribute("aria-pressed", sound.id === value ? "true" : "false");
      button.addEventListener("click", () => {
        select.value = sound.id;
        options.searchInput.value = sound.label;
        results.classList.add("hidden");
        updateSoundSettingsFromControls();
      });
      results.append(button);
    });
  });
  results.classList.remove("hidden");
}

function toggleTurnCustomSoundMenu(forceOpen = null) {
  if (!turnCustomSoundMenu) return;
  const open = forceOpen ?? turnCustomSoundMenu.classList.contains("hidden");
  turnCustomSoundMenu.classList.toggle("hidden", !open);
  turnCustomSoundControl?.classList.toggle("menu-open", open);
  turnCustomSoundMenuButton?.setAttribute("aria-expanded", String(open));
  if (open) renderTurnCustomSoundMenu();
}

function closeTurnCustomSoundMenu() {
  if (!turnCustomSoundMenu) return;
  turnCustomSoundMenu.classList.add("hidden");
  turnCustomSoundControl?.classList.remove("menu-open");
  turnCustomSoundMenuButton?.setAttribute("aria-expanded", "false");
}

function renderTurnCustomSoundMenu() {
  if (!turnCustomSoundMenu) return;
  const selectedValue = soundSettings.turnSound || "random";
  turnCustomSoundMenu.innerHTML = "";

  const randomButton = createTurnCustomSoundMenuButton({ id: "random", label: "Random", category: "Custom sound" }, selectedValue);
  turnCustomSoundMenu.append(randomButton);

  const sounds = groupedSoundOptions();
  if (!sounds.length) {
    const empty = document.createElement("div");
    empty.className = "turn-custom-sound-empty";
    empty.textContent = "Loading sounds...";
    turnCustomSoundMenu.append(empty);
    return;
  }

  soundGroups(sounds).forEach((items, category) => {
    const heading = document.createElement("div");
    heading.className = "turn-custom-sound-category";
    heading.textContent = category;
    turnCustomSoundMenu.append(heading);
    items.forEach((sound) => turnCustomSoundMenu.append(createTurnCustomSoundMenuButton(sound, selectedValue)));
  });
}

function createTurnCustomSoundMenuButton(sound, selectedValue) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "turn-custom-sound-option";
  button.dataset.soundId = sound.id;
  button.textContent = sound.label;
  button.setAttribute("role", "menuitemradio");
  button.setAttribute("aria-checked", sound.id === selectedValue ? "true" : "false");
  button.addEventListener("click", () => {
    if (turnCustomSoundSetting) turnCustomSoundSetting.value = sound.id;
    soundSettings = normalizeSoundSettings({
      ...soundSettings,
      turnSound: sound.id
    });
    saveSoundSettings();
    updateTurnCustomSoundLabel();
    renderTurnCustomSoundMenu();
    closeTurnCustomSoundMenu();
    if (me?.id) playerSoundSettings.set(String(me.id), soundSettings);
    sendSoundSettings();
  });
  return button;
}

function populateSoundDropdown(select, value, options = {}) {
  if (!select) return;
  const query = String(options.query || "").trim().toLowerCase();
  const includeNone = Boolean(options.includeNone);
  const includeRandom = options.includeRandom !== false;
  const selectedValue = value || (includeRandom ? "random" : "none");
  const sounds = groupedSoundOptions().filter((sound) => soundMatchesQuery(sound, query));
  select.innerHTML = "";

  if (includeNone) select.append(createSoundOption({ id: "none", label: "No sound" }));
  if (includeRandom) select.append(createSoundOption({ id: "random", label: "Random" }));
  appendGroupedSoundOptions(select, sounds);

  const hasSelectedOption = [...select.options].some((option) => option.value === selectedValue);
  if (!hasSelectedOption && selectedValue !== "none" && selectedValue !== "random") {
    const selectedSound = groupedSoundOptions().find((sound) => sound.id === selectedValue);
    if (selectedSound) select.prepend(createSoundOption({ ...selectedSound, label: `Selected: ${selectedSound.label}` }));
  }

  select.value = [...select.options].some((option) => option.value === selectedValue)
    ? selectedValue
    : (includeRandom ? "random" : "none");
}

function syncSoundControls() {
  soundSettings = normalizeSoundSettings(soundSettings);
  populateSoundDropdown(turnCustomSoundSetting, soundSettings.turnSound, {
    includeNone: false,
    includeRandom: true
  });
  updateTurnCustomSoundLabel();
  renderTurnCustomSoundMenu();
  populateSoundDropdown(checkSoundSetting, soundSettings.checkSound, {
    includeNone: true,
    includeRandom: true,
    query: checkSoundSearch?.value || ""
  });
  renderSoundSearchResults(checkSoundResults, checkSoundSetting, soundSettings.checkSound, {
    query: checkSoundSearch?.value || "",
    searchInput: checkSoundSearch
  });
  populateSoundDropdown(checkmateSoundSetting, soundSettings.checkmateSound, {
    includeNone: false,
    includeRandom: true,
    query: checkmateSoundSearch?.value || ""
  });
  renderSoundSearchResults(checkmateSoundResults, checkmateSoundSetting, soundSettings.checkmateSound, {
    query: checkmateSoundSearch?.value || "",
    searchInput: checkmateSoundSearch
  });
}

function updateSoundSettingsFromControls() {
  soundSettings = normalizeSoundSettings({
    turnSound: turnCustomSoundSetting?.value || "random",
    checkSound: checkSoundSetting?.value || "none",
    checkmateSound: checkmateSoundSetting?.value || "none"
  });
  saveSoundSettings();
  updateTurnCustomSoundLabel();
  renderTurnCustomSoundMenu();
  if (me?.id) playerSoundSettings.set(String(me.id), soundSettings);
  sendSoundSettings();
}

function updateTurnCustomSoundLabel() {
  if (!turnCustomSoundLabel) return;
  const selected = soundOptions().find((sound) => sound.id === soundSettings.turnSound);
  turnCustomSoundLabel.textContent = selected?.label || "Random";
}

function sendSoundSettings() {
  if (!socket?.connected) return;
  socket.emit("sound:settings", soundSettings);
}

function syncPlayerSoundSettings(settingsByPlayer = {}) {
  if (me?.id) playerSoundSettings.set(String(me.id), soundSettings);
  Object.entries(settingsByPlayer || {}).forEach(([userId, nextSettings]) => {
    playerSoundSettings.set(String(userId), normalizeSoundSettings(nextSettings));
  });
}

function playMoveResultSound(game, previousFen) {
  const soundEvent = game?.soundEvent;
  if (!soundEvent?.id || lastPlayedSoundEventId === soundEvent.id) return;
  if (soundEvent.type === "random") {
    lastPlayedSoundEventId = soundEvent.id;
    playConfiguredSound(soundEvent.soundId || "random", (
      String(soundEvent.playerId) === String(me?.id)
        ? { onStart: beginRandomSoundMicSuppression, onEnd: endRandomSoundMicSuppression }
        : {}
    ));
    return;
  }
  if (!previousFen || previousFen === game?.fen) return;
  lastPlayedSoundEventId = soundEvent.id;
  if (soundEvent.type !== "check" && soundEvent.type !== "checkmate") return;
  const ownerSettings = normalizeSoundSettings(soundEvent.settings || playerSoundSettings.get(String(soundEvent.playerId)));
  const soundId = soundEvent.type === "checkmate" ? ownerSettings.checkmateSound : ownerSettings.checkSound;
  playConfiguredSound(soundId);
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
  premovesSetting.checked = settings.premoves;
  coordinatesSetting.checked = settings.coordinates;
  moveSoundSetting.checked = settings.moveSound;
  faceMeshAlwaysOnSetting.checked = settings.faceMeshAlwaysOn;
  capturedPiecesSetting.checked = settings.capturedPieces;
  confirmActionsSetting.checked = settings.confirmActions;
  allowChallengesSetting.checked = settings.allowChallenges;
  autoPromoteQueenSetting.checked = settings.autoPromoteQueen;
}

function updateSettingsFromControls() {
  const previousFaceMeshAlwaysOn = Boolean(settings.faceMeshAlwaysOn);
  settings = {
    ...settings,
    highlightMoves: highlightMovesSetting.checked,
    legalMoves: legalMovesSetting.checked,
    premoves: premovesSetting.checked,
    coordinates: coordinatesSetting.checked,
    moveSound: moveSoundSetting.checked,
    faceMeshAlwaysOn: faceMeshAlwaysOnSetting.checked,
    capturedPieces: capturedPiecesSetting.checked,
    confirmActions: confirmActionsSetting.checked,
    allowChallenges: allowChallengesSetting.checked,
    autoPromoteQueen: autoPromoteQueenSetting.checked
  };
  if (!settings.premoves) clearPendingPremove();
  saveSettings();
  applySettings();
  if (previousFaceMeshAlwaysOn !== Boolean(settings.faceMeshAlwaysOn)) applyFaceMeshDefaultDuringGame();
}

function applySettings() {
  document.body.dataset.boardTheme = settings.boardTheme;
  document.body.classList.toggle("hide-captured", !settings.capturedPieces);
  renderCurrentBoard();
}

function applyFaceMeshDefaultDuringGame() {
  if (!currentGame || currentGame.videoOff || currentGame.status !== "playing" || !rawLocalStream?.getVideoTracks().length) {
    faceMeshEnabled = Boolean(settings.faceMeshAlwaysOn);
    updateFaceMeshButton();
    return;
  }
  faceMeshEnabled = Boolean(settings.faceMeshAlwaysOn);
  updateFaceMeshButton(true);
  restartMediaPipeline()
    .catch((error) => {
      console.warn("[ChessFace] Could not apply Face mesh setting:", error);
      faceMeshEnabled = false;
      updateFaceMeshButton();
      showNotice("Face mesh setting could not be applied.");
    })
    .finally(() => updateFaceMeshButton());
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
syncSoundControls();
applySettings();
document.addEventListener("keydown", handleBoardHistoryKeydown);
boot();
setAuthMode(mode);
