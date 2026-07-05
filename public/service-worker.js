const CACHE_NAME = "chessface-shell-v168";
const NETWORK_FIRST_PATHS = new Set([
  "/",
  "/index.html",
  "/app.js",
  "/styles.css",
  "/config/sounds.js",
  "/service-worker.js"
]);
const SHELL_ASSETS = [
  "/",
  "/index.html",
  "/profile.html",
  "/analysis.html",
  "/rankings.html",
  "/friends.html",
  "/edit-profile.html",
  "/styles.css",
  "/pieces.js",
  "/app.js",
  "/config/sounds.js",
  "/stockfish-analysis-service.js",
  "/profile.js",
  "/vendor/stockfish/stockfish-18-lite-single.js",
  "/vendor/stockfish/stockfish-18-lite-single.wasm",
  "/vendor/stockfish/stockfish-18-asm.js",
  "/rankings.js",
  "/friends.js",
  "/edit-profile.js",
  "/default-avatar.svg",
  "/app-icon.svg",
  "/assets/chess-hero.png",
  "/assets/normal-chessboard.svg",
  "/assets/random_sound.png",
  "/assets/donkeys/01-about-to-get-mated.png",
  "/assets/donkeys/02-terrified.png",
  "/assets/donkeys/03-panicking.png",
  "/assets/donkeys/04-worried.png",
  "/assets/donkeys/05-slightly-bad.png",
  "/assets/donkeys/06-balanced.png",
  "/assets/donkeys/07-slightly-good.png",
  "/assets/donkeys/08-happy.png",
  "/assets/donkeys/09-very-good.png",
  "/assets/donkeys/10-about-to-mate.png",
  "/assets/chessface-mobile-play.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== location.origin) return;
  if (requestUrl.pathname.startsWith("/api/") || requestUrl.pathname.startsWith("/socket.io/") || requestUrl.pathname.startsWith("/uploads/")) {
    return;
  }
  if (event.request.method !== "GET") return;

  if (NETWORK_FIRST_PATHS.has(requestUrl.pathname)) {
    event.respondWith(
      fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      return response;
    }))
  );
});
