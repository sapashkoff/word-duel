// Service worker: хранит файлы игры в телефоне, чтобы она открывалась быстро и без интернета.
// Если добавишь новый файл в проект, впиши его в список FILES и увеличь номер в CACHE.
const CACHE = "word-duel-v2";
const FILES = [
  "./",
  "index.html",
  "css/style.css",
  "js/words.js",
  "js/words-extra.js",
  "js/app.js",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/apple-touch-icon.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Сначала отдаём то, что в памяти (быстро), а в фоне скачиваем свежую версию.
// Поэтому после обновления новая версия появляется при следующем открытии игры.
self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;

  event.respondWith(
    caches.match(req).then(cached => {
      const network = fetch(req)
        .then(res => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then(cache => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
