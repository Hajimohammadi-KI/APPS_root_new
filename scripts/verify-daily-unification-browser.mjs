import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { resolve } from "node:path";

const require = createRequire(
  resolve(
    import.meta.dirname,
    "../Apps/English/English-Automaticity/package.json",
  ),
);
const { chromium, expect } = require("@playwright/test");
const browser = await chromium.launch({ channel: "msedge", headless: true });

async function links(page, selector) {
  return page.locator(selector).evaluateAll((anchors) =>
    anchors.map((anchor) => {
      const copy = anchor.cloneNode(true);
      copy
        .querySelectorAll('[aria-hidden="true"]')
        .forEach((icon) => icon.remove());
      return {
        href: anchor.getAttribute("href"),
        label: copy.textContent.trim(),
      };
    }),
  );
}

try {
  for (const [language, base] of [
    ["en", process.argv[2] ?? "http://127.0.0.1:3202"],
    ["de", process.argv[3] ?? "http://127.0.0.1:3210"],
  ]) {
    for (const width of [390, 1280]) {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        serviceWorkers: "block",
      });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      try {
        await page.goto(base, { waitUntil: "networkidle" });
        const main = await links(page, ".learning-navigation > ul > li a");
        const more = await links(page, ".learning-navigation .ln-more ul a");
        await page.goto(`${base}/${language === "de" ? "heute" : "daily"}`, {
          waitUntil: "networkidle",
        });
        const dailyMain = await links(page, ".calm-primary-nav a");
        const dailyMore = await links(page, ".calm-nav-more section a");
        assert.deepEqual(
          dailyMain,
          main,
          `${language}: primary navigation differs`,
        );
        assert.deepEqual(dailyMore, more, `${language}: submenu differs`);
        await expect(page.locator(".calm-settings-link")).toHaveAttribute(
          "href",
          language === "de" ? "/einstellungen" : "/settings",
        );
        const greeting = await page.locator(".greeting").textContent();
        assert.doesNotMatch(greeting ?? "", /Willkommen|Welcome|Good morning/i);
        await expect(
          page.locator("main [data-learning-path-primary]"),
        ).toHaveCount(1);
        await expect(page.locator("main .learning-path-link")).toHaveCount(0);
        await page.goto(
          `${base}/${language === "de" ? "grammatik" : "grammar"}`,
          {
            waitUntil: "networkidle",
          },
        );
        assert.deepEqual(
          await links(page, ".calm-primary-nav a"),
          main,
          `${language}: grammar primary navigation differs`,
        );
        assert.deepEqual(
          await links(page, ".calm-nav-more section a"),
          more,
          `${language}: grammar submenu differs`,
        );
        await expect(page.locator(".calm-settings-link")).toHaveAttribute(
          "href",
          language === "de" ? "/einstellungen" : "/settings",
        );
        assert.deepEqual(errors, [], `${language} ${width}px page errors`);
        console.log(
          `${language} ${width}px: one daily path and matching navigation passed`,
        );
      } finally {
        await context.close();
      }
    }
  }
} finally {
  await browser.close();
}
