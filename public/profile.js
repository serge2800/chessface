const token = localStorage.getItem("chessface:token");
const profileAvatar = document.querySelector("#profileAvatar");
const profileFlag = document.querySelector("#profileFlag");
const profileName = document.querySelector("#profileName");
const profileMeta = document.querySelector("#profileMeta");
const profileRating = document.querySelector("#profileRating");
const profileGames = document.querySelector("#profileGames");
const profileFriends = document.querySelector("#profileFriends");
const profileRd = document.querySelector("#profileRd");
const profileOnline = document.querySelector("#profileOnline");
const profileCountry = document.querySelector("#profileCountry");
const profileJoined = document.querySelector("#profileJoined");
const gameList = document.querySelector("#gameList");
const reviewPanel = document.querySelector("#reviewPanel");
const profileLogoutButton = document.querySelector("#profileLogoutButton");
const dashboardButton = document.querySelector("#dashboardButton");
const friendsButton = document.querySelector("#friendsButton");
const editProfileButton = document.querySelector("#editProfileButton");
const statsTabs = document.querySelector("#statsTabs");
const statsTitle = document.querySelector("#statsTitle");
const ratingChart = document.querySelector("#ratingChart");
const isAnalysisPage = document.body.classList.contains("analysis-page");

let me;
let games = [];
let selectedStatsTime = "3+0";
let selectedReviewPly = 0;
let selectedReviewGame;
let analysisRunId = 0;
let stockfishWorker;
let stockfishReadyPromise;
let stockfishSourceIndex = 0;
let stockfishEngineLabel = "";
const positionAnalysisCache = new Map();

const STOCKFISH_SOURCES = [
  {
    label: "Local Stockfish 18 lite",
    create: () => createLocalStockfishWorker("stockfish-18-lite-single.js", "stockfish-18-lite-single.wasm")
  },
  {
    label: "Local Stockfish 18 fallback",
    create: () => new Worker("/vendor/stockfish/stockfish-18-asm.js")
  },
  {
    label: "CDN Stockfish fallback",
    create: () => createImportScriptsWorker([
      "https://cdnjs.cloudflare.com/ajax/libs/stockfish.js/10.0.2/stockfish.js"
    ])
  }
];
const replayPieces = {
  p: "♟", r: "♜", n: "♞", b: "♝", q: "♛", k: "♚",
  P: "♙", R: "♖", N: "♘", B: "♗", Q: "♕", K: "♔"
};
const replayPieceArtMap = { p: "♟", r: "♜", n: "♞", b: "♝", q: "♛", k: "♚" };

bootProfile();

profileLogoutButton.addEventListener("click", () => {
  localStorage.removeItem("chessface:token");
  location.href = "/";
});

dashboardButton.addEventListener("click", () => {
  location.href = "/";
});

friendsButton.addEventListener("click", () => {
  location.href = "/friends.html";
});

editProfileButton.addEventListener("click", () => {
  location.href = "/edit-profile.html";
});

document.querySelector("#analysisProfileButton")?.addEventListener("click", () => {
  location.href = "/profile.html";
});

statsTabs?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-time]");
  if (!button) return;
  selectedStatsTime = button.dataset.time;
  statsTabs.querySelectorAll("button").forEach((item) => item.classList.toggle("active", item === button));
  renderChart();
});

async function bootProfile() {
  if (!token) {
    location.href = "/";
    return;
  }
  const [profileResponse, gamesResponse] = await Promise.all([
    fetch("/api/me", { headers: { Authorization: `Bearer ${token}` } }),
    fetch("/api/games", { headers: { Authorization: `Bearer ${token}` } })
  ]);
  if (!profileResponse.ok || !gamesResponse.ok) {
    location.href = "/";
    return;
  }
  me = (await profileResponse.json()).user;
  if (me.isGuest) {
    sessionStorage.setItem("chessface:notice", "Create a free account to view profiles, save history, and add a profile photo.");
    location.href = "/";
    return;
  }
  games = (await gamesResponse.json()).games;
  renderProfile();
  if (isAnalysisPage) {
    renderAnalysisPage();
    return;
  }
  renderChart();
  renderGames();
}

function renderProfile() {
  profileAvatar.src = me.avatarUrl;
  profileFlag.textContent = flagEmoji(me.countryCode);
  profileName.textContent = me.username;
  profileMeta.textContent = me.fullName || me.email || "";
  profileRating.textContent = me.rating;
  profileGames.textContent = me.gamesPlayed || 0;
  profileFriends.textContent = me.friendsCount || 0;
  profileRd.textContent = Math.round(me.ratingRd || 350);
  profileOnline.textContent = me.online ? "Online" : "Offline";
  profileOnline.classList.toggle("is-online", me.online);
  profileCountry.textContent = me.countryName || "Other";
  profileJoined.textContent = `Joined ${formatDateOnly(me.joinedAt)}`;
}

function renderGames() {
  if (!games.length) {
    gameList.innerHTML = '<div class="empty-history">No finished games yet.</div>';
    return;
  }
  const requestedGameId = new URLSearchParams(location.search).get("game");
  const activeGame = games.find((game) => game.id === requestedGameId) || games[0];
  gameList.innerHTML = "";
  games.forEach((game, index) => {
    const color = game.players.white.id === me.id ? "white" : "black";
    const firstPlayer = game.players.white;
    const secondPlayer = game.players.black;
    const change = game.ratingChanges?.[color]?.change || 0;
    const resultText = game.result === "draw" ? "Draw" : game.result === color ? "Win" : "Loss";
    const resultClass = resultText.toLowerCase();
    const beforeRating = game.ratingChanges?.[color]?.before || me.rating;
    const afterRating = game.ratingChanges?.[color]?.after || me.rating;
    const button = document.createElement("button");
    button.className = `game-card ${game.id === activeGame.id ? "is-active" : ""}`;
    button.innerHTML = `
      <span class="result-badge ${resultClass}">${resultText}</span>
      <div class="history-matchup">
        <span class="history-side">
          <img src="${escapeHtml(firstPlayer.avatarUrl || "/default-avatar.svg")}" alt="" />
          <strong>${escapeHtml(firstPlayer.username)}</strong>
        </span>
        <b class="history-dash">-</b>
        <span class="history-side">
          <strong>${escapeHtml(secondPlayer.username)}</strong>
          <img src="${escapeHtml(secondPlayer.avatarUrl || "/default-avatar.svg")}" alt="" />
        </span>
      </div>
      <div class="history-details">
        <strong>${game.timeControl}</strong>
        <span>${formatDate(game.playedAt)}</span>
      </div>
      <div class="history-rating">
        <span>${beforeRating} -> ${afterRating}</span>
        <b class="${change >= 0 ? "up" : "down"}">${change >= 0 ? "+" : ""}${change}</b>
      </div>
      <span class="review-chip">Review</span>
    `;
    button.addEventListener("click", () => {
      document.querySelectorAll(".game-card").forEach((card) => card.classList.remove("is-active"));
      button.classList.add("is-active");
      selectedReviewPly = 0;
      renderReview(game);
    });
    gameList.append(button);
  });
  selectedReviewPly = 0;
  renderReview(activeGame);
  if (new URLSearchParams(location.search).get("analyze") === "1") {
    setTimeout(() => openAnalysisWindow(activeGame), 150);
  }
}

function renderAnalysisPage() {
  const requestedGameId = new URLSearchParams(location.search).get("game");
  const activeGame = games.find((game) => game.id === requestedGameId) || games[0];
  if (!activeGame) {
    reviewPanel.innerHTML = '<p class="analysis-status">No finished games are available to analyze.</p>';
    return;
  }
  selectedReviewPly = 0;
  renderReview(activeGame);
  setTimeout(() => document.querySelector("#analyzeGameButton")?.click(), 150);
}

function openAnalysisWindow(game) {
  if (!game?.id) return;
  window.open(`/analysis.html?game=${encodeURIComponent(game.id)}&analyze=1`, "_blank", "noopener");
}

function renderChart() {
  statsTitle.textContent = `${selectedStatsTime} rating`;
  const points = games
    .filter((game) => game.timeControl === selectedStatsTime)
    .slice()
    .reverse()
    .map((game) => {
      const color = game.players.white.id === me.id ? "white" : "black";
      const rating = game.ratingChanges?.[color]?.after;
      return rating ? { rating, date: new Date(game.playedAt) } : null;
    })
    .filter(Boolean);

  ratingChart.innerHTML = "";
  const width = 720;
  const height = 260;
  const pad = { top: 24, right: 28, bottom: 38, left: 52 };
  const plotWidth = width - pad.left - pad.right;
  const plotHeight = height - pad.top - pad.bottom;
  const allRatings = points.length ? points.map((point) => point.rating) : [me.rating || 1000];
  const minRating = Math.max(0, Math.floor((Math.min(...allRatings) - 40) / 50) * 50);
  const maxRating = Math.ceil((Math.max(...allRatings) + 40) / 50) * 50;
  const yFor = (rating) => pad.top + (maxRating - rating) / Math.max(1, maxRating - minRating) * plotHeight;
  const xFor = (index) => pad.left + (points.length <= 1 ? plotWidth / 2 : index / (points.length - 1) * plotWidth);

  appendSvg("rect", { x: 0, y: 0, width, height, rx: 8, fill: "rgba(0,0,0,0.22)" });
  for (let i = 0; i <= 4; i += 1) {
    const y = pad.top + (plotHeight / 4) * i;
    const rating = Math.round(maxRating - ((maxRating - minRating) / 4) * i);
    appendSvg("line", { x1: pad.left, y1: y, x2: width - pad.right, y2: y, stroke: "rgba(255,255,255,0.12)" });
    appendSvg("text", { x: 12, y: y + 4, fill: "#b8aa95", "font-size": 12 }, rating);
  }

  if (!points.length) {
    appendSvg("text", { x: width / 2, y: height / 2, fill: "#b8aa95", "font-size": 18, "text-anchor": "middle" }, `No ${selectedStatsTime} games yet`);
    return;
  }

  const path = points.map((point, index) => `${index === 0 ? "M" : "L"} ${xFor(index)} ${yFor(point.rating)}`).join(" ");
  appendSvg("path", { d: path, fill: "none", stroke: "#f2c66d", "stroke-width": 4, "stroke-linecap": "round", "stroke-linejoin": "round" });
  points.forEach((point, index) => {
    appendSvg("circle", { cx: xFor(index), cy: yFor(point.rating), r: 5, fill: "#58d4bf", stroke: "#101816", "stroke-width": 2 });
  });
  const firstDate = points[0].date;
  const lastDate = points[points.length - 1].date;
  appendSvg("text", { x: pad.left, y: height - 12, fill: "#b8aa95", "font-size": 12 }, formatShortDate(firstDate));
  appendSvg("text", { x: width - pad.right, y: height - 12, fill: "#b8aa95", "font-size": 12, "text-anchor": "end" }, formatShortDate(lastDate));
}

function appendSvg(tag, attrs, text) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
  if (text !== undefined) node.textContent = text;
  ratingChart.append(node);
  return node;
}

function renderReview(game) {
  selectedReviewGame = game;
  const color = game.players.white.id === me.id ? "white" : "black";
  const opponent = color === "white" ? game.players.black : game.players.white;
  const change = game.ratingChanges?.[color]?.change || 0;
  const positions = Array.isArray(game.positions) && game.positions.length ? game.positions : [game.fen].filter(Boolean);
  const moves = Array.isArray(game.moves) ? game.moves : [];
  const cachedAnalysis = game.analysis || null;
  const isFocusedAnalysis = isAnalysisPage;
  selectedReviewPly = Math.min(selectedReviewPly, Math.max(0, positions.length - 1));
  reviewPanel.innerHTML = `
    <div class="${isFocusedAnalysis ? "analysis-game-head" : "review-game-head"}">
      <div>
        <p class="eyebrow">${isFocusedAnalysis ? "Engine review" : "Game review"}</p>
        <h2>${game.result === "draw" ? "Draw" : game.result === color ? "Win" : "Loss"} vs ${escapeHtml(opponent.username)}</h2>
      </div>
      <div class="review-game-meta">
        <span>${escapeHtml(game.timeControl)}</span>
        <span>${formatDate(game.playedAt)}</span>
        <span>Rating ${change >= 0 ? "+" : ""}${change}</span>
      </div>
    </div>
    <section class="analysis-board-stage">
      <div class="review-board" id="reviewBoard"></div>
    </section>
    <div class="review-controls">
      <button type="button" class="ghost" id="reviewStartButton">|&lt;</button>
      <button type="button" class="ghost" id="reviewPrevButton">&lt;</button>
      <span id="reviewMoveCount"></span>
      <button type="button" class="ghost" id="reviewNextButton">&gt;</button>
      <button type="button" class="ghost" id="reviewEndButton">&gt;|</button>
    </div>
    <div class="review-current" id="reviewCurrentMove"></div>
    <button type="button" class="primary analysis-button" id="analyzeGameButton">Analyze game</button>
    <div class="analysis-panel ${cachedAnalysis ? "" : "hidden"}" id="analysisPanel">
      ${cachedAnalysis ? renderAnalysisHtml(cachedAnalysis) : ""}
    </div>
    <div class="move-record">${escapeHtml(formatReviewPgn(game))}</div>
  `;
  const updateReplay = () => {
    const fen = positions[selectedReviewPly] || positions[0] || "8/8/8/8/8/8/8/8 w - - 0 1";
    renderReviewBoard(fen, color);
    const currentMove = moves[selectedReviewPly - 1];
    document.querySelector("#reviewMoveCount").textContent = `${selectedReviewPly} / ${Math.max(0, positions.length - 1)}`;
    document.querySelector("#reviewCurrentMove").textContent = currentMove
      ? `${currentMove.index}. ${currentMove.san}`
      : "Starting position";
    document.querySelector("#reviewStartButton").disabled = selectedReviewPly === 0;
    document.querySelector("#reviewPrevButton").disabled = selectedReviewPly === 0;
    document.querySelector("#reviewNextButton").disabled = selectedReviewPly >= positions.length - 1;
    document.querySelector("#reviewEndButton").disabled = selectedReviewPly >= positions.length - 1;
  };
  document.querySelector("#analyzeGameButton").addEventListener("click", () => {
    if (isAnalysisPage) analyzeGame(game);
    else openAnalysisWindow(game);
  });
  document.querySelector("#reviewStartButton").addEventListener("click", () => {
    selectedReviewPly = 0;
    updateReplay();
  });
  document.querySelector("#reviewPrevButton").addEventListener("click", () => {
    selectedReviewPly = Math.max(0, selectedReviewPly - 1);
    updateReplay();
  });
  document.querySelector("#reviewNextButton").addEventListener("click", () => {
    selectedReviewPly = Math.min(positions.length - 1, selectedReviewPly + 1);
    updateReplay();
  });
  document.querySelector("#reviewEndButton").addEventListener("click", () => {
    selectedReviewPly = Math.max(0, positions.length - 1);
    updateReplay();
  });
  bindAnalysisMoveClicks(game);
  updateReplay();
}

function formatReviewPgn(game) {
  const white = game.players?.white?.username || readPgnHeader(game.pgn, "White") || "White";
  const black = game.players?.black?.username || readPgnHeader(game.pgn, "Black") || "Black";
  const result = pgnResult(game.result) || readPgnHeader(game.pgn, "Result") || "*";
  const date = game.playedAt ? formatPgnDate(game.playedAt) : readPgnHeader(game.pgn, "Date") || "????.??.??";
  const moves = stripPgnHeaders(game.pgn).trim() || "No moves recorded.";
  return [
    `[White "${white}"]`,
    `[Black "${black}"]`,
    `[Result "${result}"]`,
    `[Date "${date}"]`,
    "",
    moves
  ].join("\n");
}

async function analyzeGame(game) {
  const panel = document.querySelector("#analysisPanel");
  const button = document.querySelector("#analyzeGameButton");
  const positions = Array.isArray(game.positions) && game.positions.length ? game.positions : [];
  const moves = Array.isArray(game.moves) ? game.moves : [];
  if (positions.length < 2 || !moves.length) {
    panel.classList.remove("hidden");
    panel.innerHTML = '<p class="analysis-status">No saved move positions are available for this game.</p>';
    return;
  }

  const runId = Date.now();
  analysisRunId = runId;
  button.disabled = true;
  panel.classList.remove("hidden");
  panel.innerHTML = '<p class="analysis-status">Starting Stockfish...</p>';

  try {
    await ensureStockfish();
    const positionResults = [];
    const reviewPositions = positions.slice(0, Math.min(positions.length, moves.length + 1));
    for (let index = 0; index < reviewPositions.length; index += 1) {
      if (analysisRunId !== runId || selectedReviewGame?.id !== game.id) return;
      panel.innerHTML = `<p class="analysis-status">Analyzing position ${index + 1} of ${reviewPositions.length} with ${escapeHtml(stockfishEngineLabel)}...</p>`;
      positionResults.push(await analyzeFenWithRecovery(reviewPositions[index], 650));
    }
    const reviewMoves = moves.slice(0, Math.max(0, reviewPositions.length - 1));
    const moveReviews = reviewMoves.map((move, index) => classifyMove(move, positionResults[index], positionResults[index + 1], reviewPositions[index]));
    const analysis = summarizeAnalysis(moveReviews);
    game.analysis = analysis;
    if (analysisRunId === runId && selectedReviewGame?.id === game.id) {
      panel.innerHTML = renderAnalysisHtml(analysis);
      bindAnalysisMoveClicks(game);
    }
  } catch (error) {
    panel.innerHTML = `<p class="analysis-status">Stockfish could not finish this review. Refresh and try again. ${escapeHtml(error.message || "")}</p>`;
  } finally {
    button.disabled = false;
  }
}

function bindAnalysisMoveClicks(game) {
  document.querySelectorAll(".analysis-move[data-ply]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedReviewPly = Number(button.dataset.ply) || 0;
      renderReview(game);
    });
  });
}

function ensureStockfish() {
  if (stockfishReadyPromise) return stockfishReadyPromise;
  stockfishReadyPromise = loadStockfishWorker()
    .catch((error) => {
      stockfishReadyPromise = null;
      throw error;
    });
  return stockfishReadyPromise;
}

async function loadStockfishWorker() {
  const errors = [];
  for (let offset = 0; offset < STOCKFISH_SOURCES.length; offset += 1) {
    const sourceIndex = (stockfishSourceIndex + offset) % STOCKFISH_SOURCES.length;
    const source = STOCKFISH_SOURCES[sourceIndex];
    try {
      stockfishSourceIndex = sourceIndex;
      stockfishEngineLabel = source.label;
      return await readyStockfishWorker(source.create(), source.label);
    } catch (error) {
      errors.push(`${source.label}: ${error.message || String(error)}`);
      stockfishWorker?.terminate?.();
      stockfishWorker = null;
    }
  }
  throw new Error(`engine failed to load (${errors.join("; ")})`);
}

function createImportScriptsWorker(urls) {
  const workerSource = `
    let loaded = false;
    const urls = ${JSON.stringify(urls)};
    for (const url of urls) {
      if (loaded) break;
      try {
        importScripts(url);
        loaded = true;
      } catch (error) {}
    }
    if (!loaded) postMessage("stockfish-load-error");
  `;
  return new Worker(URL.createObjectURL(new Blob([workerSource], { type: "application/javascript" })));
}

function createLocalStockfishWorker(scriptFile, wasmFile) {
  const scriptUrl = new URL(`/vendor/stockfish/${scriptFile}`, location.origin);
  if (wasmFile) {
    const wasmUrl = new URL(`/vendor/stockfish/${wasmFile}`, location.origin);
    scriptUrl.hash = `${encodeURIComponent(wasmUrl.href)},worker`;
  }
  return new Worker(scriptUrl.href);
}

function readyStockfishWorker(worker, label) {
  stockfishWorker = worker;
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error(`${label} timeout`));
    }, 12000);
    const cleanup = () => {
      clearTimeout(timeout);
      worker.removeEventListener("message", handleMessage);
      worker.removeEventListener("error", handleError);
    };
    const handleError = () => {
      cleanup();
      reject(new Error(`${label} blocked`));
    };
    const handleMessage = (event) => {
      const line = String(event.data || "");
      if (line === "stockfish-load-error") {
        cleanup();
        reject(new Error(`${label} failed`));
        return;
      }
      if (line === "uciok") worker.postMessage("isready");
      if (line === "readyok") {
        cleanup();
        worker.postMessage("setoption name Hash value 16");
        worker.postMessage("ucinewgame");
        resolve(worker);
      }
    };
    worker.addEventListener("message", handleMessage);
    worker.addEventListener("error", handleError);
    worker.postMessage("uci");
  });
}

async function analyzeFenWithRecovery(fen, moveTimeMs = 650) {
  try {
    return await analyzeFen(fen, moveTimeMs);
  } catch (error) {
    await switchStockfishSource();
    return analyzeFen(fen, moveTimeMs);
  }
}

function switchStockfishSource() {
  stockfishWorker?.terminate?.();
  stockfishWorker = null;
  stockfishReadyPromise = null;
  stockfishSourceIndex = (stockfishSourceIndex + 1) % STOCKFISH_SOURCES.length;
  return ensureStockfish();
}

function analyzeFen(fen, moveTimeMs = 650) {
  const cacheKey = `${fen}|movetime:${moveTimeMs}|${stockfishEngineLabel}`;
  if (positionAnalysisCache.has(cacheKey)) return Promise.resolve(positionAnalysisCache.get(cacheKey));
  return new Promise((resolve, reject) => {
    let bestMove = "";
    let score = { type: "cp", value: 0 };
    const timeout = setTimeout(() => {
      stockfishWorker.removeEventListener("message", handleMessage);
      reject(new Error(`${stockfishEngineLabel || "Stockfish"} did not answer`));
    }, Math.max(10000, moveTimeMs + 9000));
    const handleMessage = (event) => {
      const line = String(event.data || "");
      const scoreMatch = line.match(/\bscore\s+(cp|mate)\s+(-?\d+)/);
      if (scoreMatch) score = { type: scoreMatch[1], value: Number(scoreMatch[2]) };
      const bestMoveMatch = line.match(/^bestmove\s+(\S+)/);
      if (bestMoveMatch) {
        bestMove = bestMoveMatch[1];
        clearTimeout(timeout);
        stockfishWorker.removeEventListener("message", handleMessage);
        const result = { bestMove, score };
        positionAnalysisCache.set(cacheKey, result);
        resolve(result);
      }
    };
    stockfishWorker.addEventListener("message", handleMessage);
    stockfishWorker.postMessage("stop");
    stockfishWorker.postMessage(`position fen ${fen}`);
    stockfishWorker.postMessage(`go movetime ${moveTimeMs}`);
  });
}

function classifyMove(move, before, after, beforeFen) {
  const playedMove = moveToUci(move);
  const mover = beforeFen.split(" ")[1] === "w" ? "white" : "black";
  const bestBefore = scoreToCentipawns(before.score);
  const afterForMover = -scoreToCentipawns(after.score);
  const centipawnLoss = Math.max(0, Math.round(bestBefore - afterForMover));
  const isBest = before.bestMove && playedMove === before.bestMove;
  let label = "Good";
  if (isBest || centipawnLoss <= 15) label = "Best";
  else if (centipawnLoss <= 45) label = "Excellent";
  else if (centipawnLoss <= 90) label = "Good";
  else if (centipawnLoss <= 180) label = "Inaccuracy";
  else if (centipawnLoss <= 330) label = "Mistake";
  else label = "Blunder";
  return {
    index: move.index,
    san: move.san,
    color: mover,
    playedMove,
    bestMove: before.bestMove,
    centipawnLoss,
    label,
    beforeEval: bestBefore,
    afterEval: afterForMover
  };
}

function scoreToCentipawns(score) {
  if (!score) return 0;
  if (score.type === "mate") return Math.sign(score.value || 1) * (100000 - Math.min(999, Math.abs(score.value)) * 100);
  return score.value || 0;
}

function moveToUci(move) {
  const promotion = String(move.san || "").match(/=([QRBN])/i)?.[1]?.toLowerCase() || "";
  return `${move.from}${move.to}${promotion}`;
}

function summarizeAnalysis(moveReviews) {
  const counts = { Best: 0, Excellent: 0, Good: 0, Inaccuracy: 0, Mistake: 0, Blunder: 0 };
  let totalLoss = 0;
  moveReviews.forEach((review) => {
    counts[review.label] = (counts[review.label] || 0) + 1;
    totalLoss += Math.min(500, review.centipawnLoss);
  });
  const averageLoss = moveReviews.length ? Math.round(totalLoss / moveReviews.length) : 0;
  const accuracy = Math.max(0, Math.min(100, Math.round(100 - averageLoss / 5)));
  return { accuracy, averageLoss, counts, moves: moveReviews };
}

function renderAnalysisHtml(analysis) {
  return `
    <div class="analysis-summary">
      <span>Accuracy <strong>${analysis.accuracy}%</strong></span>
      <span>Avg loss <strong>${analysis.averageLoss}</strong></span>
      <span>Mistakes <strong>${analysis.counts.Mistake || 0}</strong></span>
      <span>Blunders <strong>${analysis.counts.Blunder || 0}</strong></span>
    </div>
    <div class="analysis-moves">
      ${analysis.moves.map(renderAnalyzedMove).join("")}
    </div>
  `;
}

function renderAnalyzedMove(move) {
  return `
    <button type="button" class="analysis-move ${move.label.toLowerCase()}" data-ply="${move.index}">
      <span>${move.index}. ${escapeHtml(move.san)}</span>
      <b>${move.label}</b>
      <small>Best: ${escapeHtml(move.bestMove || "-")} · loss ${move.centipawnLoss}</small>
    </button>
  `;
}

function readPgnHeader(pgn, key) {
  const match = String(pgn || "").match(new RegExp(`\\[${key}\\s+"([^"]*)"\\]`));
  return match?.[1];
}

function stripPgnHeaders(pgn) {
  return String(pgn || "")
    .split("\n")
    .filter((line) => !/^\[[A-Za-z]+\s+".*"\]$/.test(line.trim()))
    .join("\n")
    .trim();
}

function pgnResult(result) {
  if (result === "white") return "1-0";
  if (result === "black") return "0-1";
  if (result === "draw") return "1/2-1/2";
  return "*";
}

function formatPgnDate(value) {
  return new Date(value).toISOString().slice(0, 10).replaceAll("-", ".");
}

function renderReviewBoard(fen, viewerColor) {
  const board = document.querySelector("#reviewBoard");
  const rows = fen.split(" ")[0].split("/");
  const squares = [];
  rows.forEach((row, rankIndex) => {
    let fileIndex = 0;
    for (const char of row) {
      if (Number.isInteger(Number(char)) && Number(char) > 0) {
        fileIndex += Number(char);
        continue;
      }
      squares.push({ piece: char, file: fileIndex, rank: 7 - rankIndex });
      fileIndex += 1;
    }
  });

  const order = [];
  const ranks = viewerColor === "black" ? [0, 1, 2, 3, 4, 5, 6, 7] : [7, 6, 5, 4, 3, 2, 1, 0];
  const files = viewerColor === "black" ? [7, 6, 5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5, 6, 7];
  ranks.forEach((rank) => files.forEach((file) => order.push({ rank, file })));

  board.innerHTML = "";
  order.forEach(({ rank, file }) => {
    const square = document.createElement("div");
    square.className = `review-square ${(rank + file) % 2 === 0 ? "light" : "dark"}`;
    const item = squares.find((entry) => entry.rank === rank && entry.file === file);
    if (item) {
      square.append(renderReplayPieceImage(item.piece));
    }
    board.append(square);
  });
}

function renderReplayPieceImage(piece) {
  if (window.ChessFacePieces?.render) return window.ChessFacePieces.render(piece);
  const fallback = document.createElement("span");
  fallback.className = "piece-img";
  fallback.textContent = replayPieces[piece] || "";
  return fallback;
}

function formatShortDate(value) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric"
  }).format(value);
}

function formatDateOnly(value) {
  if (!value) return "recently";
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}

function flagEmoji(countryCode) {
  if (!countryCode || countryCode === "OTHER") return "🏳";
  return countryCode.toUpperCase().replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt()));
}

function formatDate(value) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
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
