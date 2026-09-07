// Use only local, valid assets so installation can complete without unretrievable LFS media.
const CACHE = "deutschflow-automaticity-v2-20260908-worksheets-ink";
const CORE = [
  "/practice",
  "/learning-core/practice.js",
  "/learning-core/overview.js",
  "/learning-core/practice.css",
  "/learning-core/curriculum-de.json",
  "/",
  "/audio",
  "/fehler",
  "/heute",
  "/studio",
  "/grammatik",
  // Keep the worksheet shell and its exact versioned imports usable after an offline restart.
  "/replacements/de/grammar-catalog.js?v=20260902-valency-1",
  "/replacements/de/grammar-runtime.js?v=20260908-worksheets-ink-1",
  "/replacements/de/grammar-worksheet-ink.js?v=20260908-2",
  "/replacements/de/grammar-worksheets.js?v=20260908-2",
  "/replacements/de/grammar-worksheet-runtime.js?v=20260908-2",
  "/replacements/de/grammar-worksheets.css?v=20260908-2",
  ...["book", "repeat", "timer", "pencil", "search", "clipboard", "calendar", "arrow", "printer"].map((name) => `/replacements/de/worksheet-icons/${name}.svg`),
  "/wiederholungen",
  "/ressourcen",
  "/einstellungen",
  "/manifest.webmanifest",
  "/offline.html",
  "/icons/deutschflow.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) =>
        Promise.allSettled(CORE.map((asset) => cache.add(asset))),
      ),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE && key.startsWith("deutschflow-"))
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok && new URL(event.request.url).origin === self.location.origin) {
          const copy = response.clone();
          event.waitUntil(
            caches.open(CACHE).then((cache) => cache.put(event.request, copy)),
          );
        }
        return response;
      })
      .catch(async () => {
        // Task query parameters select local state within the cached practice shell.
        const pathname = new URL(event.request.url).pathname;
        if (event.request.mode === "navigate" && ["/practice", "/grammatik"].includes(pathname)) {
          const practice = await caches.match(pathname);
          if (practice) return practice;
        }
        const cached = await caches.match(event.request);
        if (cached) {
          return cached;
        }
        if (event.request.mode === "navigate") {
          return (
            (await caches.match("/offline.html")) ??
            new Response("Offline", {
              status: 503,
              headers: { "content-type": "text/plain; charset=utf-8" },
            })
          );
        }
        return new Response("", { status: 503 });
      }),
  );
});
