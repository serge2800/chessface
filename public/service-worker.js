const CACHE_NAME = "chessface-shell-v264";
const NETWORK_FIRST_PATHS = new Set([
  "/",
  "/index.html",
  "/analysis.html",
  "/watch.html",
  "/app.js",
  "/watch.js",
  "/profile.js",
  "/styles.css",
  "/config/sounds.js",
  "/service-worker.js"
]);
const SHELL_ASSETS = [
  "/",
  "/index.html",
  "/rankings.html",
  "/watch.html",
  "/styles.css",
  "/pieces.js",
  "/app.js",
  "/watch.js",
  "/config/sounds.js",
  "/rankings.js",
  "/default-avatar.svg",
  "/app-icon.svg",
  "/assets/normal-chessboard.svg"
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
