import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
for (const app of [
  "English/English-Automaticity",
  "Deutsch/Deutsch-Automaticity",
]) {
  const source = readFileSync(
    new URL(`../Apps/${app}/apps/web/public/sw.js`, import.meta.url),
    "utf8",
  );
  function setup() {
    const listeners = new Map(),
      cached = [];
    runInNewContext(source, {
      URL,
      fetch: async () => ({
        ok: true,
        headers: { get: () => null },
        clone() {
          return this;
        },
      }),
      self: {
        location: { origin: "https://app.test" },
        skipWaiting() {},
        addEventListener: (name, callback) => listeners.set(name, callback),
      },
      caches: {
        open: async () => ({
          addAll: async (paths) => cached.push(...paths),
          add: async (path) => cached.push(path),
        }),
      },
    });
    return { listeners, cached };
  }
  test(`${app}: private staff pages never enter learner offline installation`, async () => {
    const { listeners, cached } = setup();
    let pending;
    listeners.get("install")({ waitUntil: (value) => (pending = value) });
    await pending;
    expect(cached).not.toContain("/assessment-benchmarks.html");
    expect(cached).not.toContain("/roadmap.html");
  });
  test(`${app}: service worker does not serve private pages or APIs from caches`, () => {
    const { listeners } = setup();
    for (const path of [
      "/staff/settings",
      "/teacher",
      "/lehrkraft",
      "/roadmap.html",
      "/assessment-benchmarks.html",
      "/assessment-readiness.html",
      "/learning-core/content-review.html",
      "/api/staff-session",
      "/api/learner-feedback/review",
    ]) {
      let intercepted = false;
      listeners.get("fetch")({
        request: {
          method: "GET",
          url: `https://app.test${path}`,
          headers: { get: () => null },
        },
        respondWith: () => (intercepted = true),
      });
      expect(intercepted, path).toBe(false);
    }
  });
}
