window.ChessFaceAccuracyAnalysis = (() => {
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
      create: () => createImportScriptsWorker(["https://cdnjs.cloudflare.com/ajax/libs/stockfish.js/10.0.2/stockfish.js"])
    }
  ];

  const CREATURES = [
    ["0-4", "Potato", "🥔", "A humble sprout still finding legal squares."],
    ["5-9", "Eggplant", "🍆", "A dramatic vegetable with bold but mysterious plans."],
    ["10-14", "Pebblo", "🪨", "A grumpy rock creature that defends by sitting still."],
    ["15-19", "Slurbo", "🐌", "A worm-snail alien that calculates one square at a time."],
    ["20-24", "Wigglo", "🐛", "A goofy green worm with surprising tactical wiggles."],
    ["25-29", "Blorp", "👁️", "A tiny one-eyed blob that sees half the board perfectly."],
    ["30-34", "Grumpit", "👾", "A funny alien powered by stubborn optimism."],
    ["35-39", "Zoggo", "🟠", "A fuzzy monster that attacks with cheerful chaos."],
    ["40-44", "Flooble", "🟣", "A purple three-eared creature listening for blunders."],
    ["45-49", "Snorg", "🔵", "A chubby four-eyed alien with practical instincts."],
    ["50-54", "Woblox", "🪼", "A floating jelly alien drifting toward good moves."],
    ["55-59", "Krungo", "🦾", "A muscular goofball who sometimes finds tactics."],
    ["60-64", "Gloopar", "🐙", "A tentacled strategist beginning to squeeze the board."],
    ["65-69", "Brakko", "🛡️", "An armored space creature with disciplined threats."],
    ["70-74", "Veltron", "🤖", "A cyber alien that calculates with neon confidence."],
    ["75-79", "Xandor", "💎", "A glowing crystal creature with sharp positional instincts."],
    ["80-84", "Nebulon", "🌌", "A mysterious cosmic being that senses hidden tactics."],
    ["85-89", "Astravax", "☄️", "A powerful energy being that sees the board in eight dimensions."],
    ["90-94", "Mythron", "🐉", "A legendary cosmic dragon breathing fire on weak squares."],
    ["95-97", "Grand Glorbo", "👑", "The king of Glorbos, royal and almost untouchable."],
    ["98-100", "Supreme Glorbo", "🌟", "The ultimate ChessFace legend from the accuracy cosmos."]
  ].map(([range, name, icon, description], index) => {
    const [min, max] = range.split("-").map(Number);
    return { id: name.toLowerCase().replace(/\s+/g, "-"), range, min, max, name, icon, description, index };
  });

  let worker;
  let readyPromise;
  let sourceIndex = 0;
  let engineLabel = "";
  let queue = Promise.resolve();
  const cache = new Map();

  function analyzeGame(game, onProgress = () => {}) {
    queue = queue.catch(() => {}).then(() => runAccuracyAnalysis(game, onProgress));
    return queue;
  }

  async function runAccuracyAnalysis(game, onProgress) {
    const moves = Array.isArray(game.moves) ? game.moves : [];
    const positions = Array.isArray(game.positions) ? game.positions : [];
    if (!moves.length || positions.length < moves.length + 1) {
      return emptyAnalysis(game);
    }
    await ensureStockfish();
    const evaluations = [];
    for (let index = 0; index < positions.length; index += 1) {
      const moveNumber = Math.min(index + 1, moves.length);
      onProgress({ index: moveNumber, total: moves.length, message: `Analyzing move ${moveNumber} of ${moves.length}...` });
      evaluations.push(await analyzeFenWithRecovery(positions[index], 10));
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
    const moveReviews = moves.map((move, index) => reviewMove(move, evaluations[index], evaluations[index + 1], positions[index]));
    return summarize(game, moveReviews);
  }

  function emptyAnalysis(game) {
    const empty = emptyColorSummary();
    return {
      version: 1,
      depth: 10,
      gameId: game?.id,
      engine: "Stockfish",
      white: empty,
      black: empty,
      moves: [],
      creatures: {
        white: creatureForAccuracy(0),
        black: creatureForAccuracy(0)
      },
      createdAt: new Date().toISOString()
    };
  }

  function reviewMove(move, before, after, beforeFen) {
    const beforeWhite = scoreToWhiteCentipawns(before.score, beforeFen);
    const afterWhite = scoreToWhiteCentipawns(after.score, after.fen || "");
    const mover = move.color === "black" ? "black" : "white";
    const beforeForMover = mover === "white" ? beforeWhite : -beforeWhite;
    const afterForMover = mover === "white" ? afterWhite : -afterWhite;
    const loss = Math.max(0, Math.round(beforeForMover - afterForMover));
    return {
      index: move.index,
      san: move.san,
      color: mover,
      from: move.from,
      to: move.to,
      bestMove: before.bestMove,
      beforeEval: Math.round(beforeForMover),
      afterEval: Math.round(afterForMover),
      centipawnLoss: loss,
      accuracy: accuracyForLoss(loss),
      classification: classificationForLoss(loss)
    };
  }

  function summarize(game, moveReviews) {
    const whiteMoves = moveReviews.filter((move) => move.color === "white");
    const blackMoves = moveReviews.filter((move) => move.color === "black");
    const white = summarizeColor(whiteMoves);
    const black = summarizeColor(blackMoves);
    return {
      version: 1,
      depth: 10,
      gameId: game.id,
      engine: engineLabel || "Stockfish",
      white,
      black,
      moves: moveReviews,
      creatures: {
        white: creatureForAccuracy(white.accuracy),
        black: creatureForAccuracy(black.accuracy)
      },
      createdAt: new Date().toISOString()
    };
  }

  function summarizeColor(moves) {
    const summary = emptyColorSummary();
    moves.forEach((move) => {
      summary.counts[move.classification] += 1;
      summary.totalAccuracy += move.accuracy;
    });
    summary.moveCount = moves.length;
    summary.accuracy = moves.length ? Math.round(summary.totalAccuracy / moves.length) : 0;
    delete summary.totalAccuracy;
    return summary;
  }

  function emptyColorSummary() {
    return {
      accuracy: 0,
      moveCount: 0,
      totalAccuracy: 0,
      counts: {
        Excellent: 0,
        Good: 0,
        Inaccuracy: 0,
        Mistake: 0,
        Blunder: 0
      }
    };
  }

  function accuracyForLoss(loss) {
    if (loss <= 10) return 100;
    if (loss <= 25) return 98;
    if (loss <= 50) return 95;
    if (loss <= 100) return 90;
    if (loss <= 200) return 80;
    if (loss <= 400) return 65;
    if (loss <= 700) return 45;
    if (loss <= 1000) return 25;
    return 5;
  }

  function classificationForLoss(loss) {
    if (loss <= 25) return "Excellent";
    if (loss <= 75) return "Good";
    if (loss <= 150) return "Inaccuracy";
    if (loss <= 350) return "Mistake";
    return "Blunder";
  }

  function creatureForAccuracy(accuracy) {
    return CREATURES.find((creature) => accuracy >= creature.min && accuracy <= creature.max) || CREATURES.at(-1);
  }

  function scoreToWhiteCentipawns(score, fen) {
    const sideToMove = String(fen || "").split(" ")[1] || "w";
    const sideScore = scoreToCentipawns(score);
    return sideToMove === "w" ? sideScore : -sideScore;
  }

  function scoreToCentipawns(score) {
    if (!score) return 0;
    if (score.type === "mate") return Math.sign(score.value || 1) * (100000 - Math.min(999, Math.abs(score.value)) * 100);
    return score.value || 0;
  }

  function ensureStockfish() {
    if (readyPromise) return readyPromise;
    readyPromise = loadStockfishWorker().catch((error) => {
      readyPromise = null;
      throw error;
    });
    return readyPromise;
  }

  async function loadStockfishWorker() {
    const errors = [];
    for (let offset = 0; offset < STOCKFISH_SOURCES.length; offset += 1) {
      const nextIndex = (sourceIndex + offset) % STOCKFISH_SOURCES.length;
      const source = STOCKFISH_SOURCES[nextIndex];
      try {
        sourceIndex = nextIndex;
        engineLabel = source.label;
        return await readyStockfishWorker(source.create(), source.label);
      } catch (error) {
        errors.push(`${source.label}: ${error.message || String(error)}`);
        worker?.terminate?.();
        worker = null;
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

  function readyStockfishWorker(nextWorker, label) {
    worker = nextWorker;
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        cleanup();
        reject(new Error(`${label} timeout`));
      }, 12000);
      const cleanup = () => {
        clearTimeout(timeout);
        nextWorker.removeEventListener("message", handleMessage);
        nextWorker.removeEventListener("error", handleError);
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
        if (line === "uciok") nextWorker.postMessage("isready");
        if (line === "readyok") {
          cleanup();
          nextWorker.postMessage("setoption name Hash value 32");
          nextWorker.postMessage("ucinewgame");
          resolve(nextWorker);
        }
      };
      nextWorker.addEventListener("message", handleMessage);
      nextWorker.addEventListener("error", handleError);
      nextWorker.postMessage("uci");
    });
  }

  async function analyzeFenWithRecovery(fen, depth) {
    try {
      return await analyzeFen(fen, depth);
    } catch (error) {
      await switchStockfishSource();
      return analyzeFen(fen, depth);
    }
  }

  function switchStockfishSource() {
    worker?.terminate?.();
    worker = null;
    readyPromise = null;
    sourceIndex = (sourceIndex + 1) % STOCKFISH_SOURCES.length;
    return ensureStockfish();
  }

  function analyzeFen(fen, depth) {
    const cacheKey = `${fen}|depth:${depth}|${engineLabel}`;
    if (cache.has(cacheKey)) return Promise.resolve(cache.get(cacheKey));
    return new Promise((resolve, reject) => {
      let bestMove = "";
      let score = { type: "cp", value: 0 };
      const timeout = setTimeout(() => {
        cleanup();
        reject(new Error(`${engineLabel || "Stockfish"} did not answer`));
      }, 30000);
      const cleanup = () => {
        clearTimeout(timeout);
        worker.removeEventListener("message", handleMessage);
      };
      const handleMessage = (event) => {
        const line = String(event.data || "");
        const scoreMatch = line.match(/\bscore\s+(cp|mate)\s+(-?\d+)/);
        if (scoreMatch) score = { type: scoreMatch[1], value: Number(scoreMatch[2]) };
        const bestMoveMatch = line.match(/^bestmove\s+(\S+)/);
        if (bestMoveMatch) {
          bestMove = bestMoveMatch[1];
          cleanup();
          const result = { fen, bestMove, score };
          cache.set(cacheKey, result);
          resolve(result);
        }
      };
      worker.addEventListener("message", handleMessage);
      worker.postMessage("stop");
      worker.postMessage(`position fen ${fen}`);
      worker.postMessage(`go depth ${depth}`);
    });
  }

  return { analyzeGame, creatures: CREATURES };
})();
