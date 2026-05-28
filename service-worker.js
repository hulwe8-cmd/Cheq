const CACHE_NAME = "cheq-cache-v25";

const FILES_TO_CACHE = [
  "/Cheq/",
  "/Cheq/index.html",
  "/Cheq/style.css",
  "/Cheq/script.js",
  "/Cheq/manifest.json",
  "/Cheq/logo.svg",
  "/Cheq/icon-192.png",
  "/Cheq/icon-512.png"
];
self.addEventListener("install", event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
