// Use only local, valid assets so installation can complete without unretrievable LFS media.
const CACHE = "english-automaticity-automaticity-v2-20260905e";
const PRECACHE = [
  "/practice",
  "/learning-core/practice.js",
  "/learning-core/practice.css",
  "/learning-core/curriculum-en.json",
  "/",
  "/daily",
  "/studio",
  "/grammar",
  "/replacements/en/grammar-curriculum.js",
  "/offline",
  "/manifest.webmanifest",
  "/icons/automaticity.svg",
  "/dashboard-banner.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)));
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE && key.startsWith("english-automaticity-")).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  if (new URL(event.request.url).pathname.startsWith("/api/")) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok && new URL(event.request.url).origin === self.location.origin) {
          const copy = response.clone();
          event.waitUntil(caches.open(CACHE).then((cache) => cache.put(event.request, copy)));
        }
        return response;
      })
      .catch(async () => {
        // Task selection lives in the query string; every task uses this same shell.
        if (event.request.mode === "navigate" && new URL(event.request.url).pathname === "/practice") {
          const practice = await caches.match("/practice");
          if (practice) return practice;
        }
        return (
          (await caches.match(event.request)) ??
          (event.request.mode === "navigate"
            ? ((await caches.match("/")) ?? (await caches.match("/offline")))
            : Response.error())
        );
      }),
  );
});
