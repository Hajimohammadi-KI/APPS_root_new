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
        const menu = page.locator(".app-tools");
        await menu.locator("summary").click();
        const languageSelect = menu.locator("[data-native-language-select]");
        await expect(languageSelect).toBeVisible();
        await expect(languageSelect.locator("option")).toHaveCount(3);
        await expect(page.locator('a[href="/roadmap.html"]')).toHaveCount(0);
        await languageSelect.selectOption("en");
        const stored = await page.evaluate(
          (target) =>
            localStorage.getItem(
              target === "de"
                ? "deutsch-automaticity:explanation-language"
                : "english-explanation-language",
            ),
          language,
        );
        assert.equal(stored, language === "de" ? "English" : "en");
        await page.reload({ waitUntil: "networkidle" });
        await page.locator(".app-tools summary").click();
        await expect(
          page.locator(".app-tools [data-native-language-select]"),
        ).toHaveValue("en");
        await page
          .locator(".app-tools [data-native-language-select]")
          .selectOption("fa");
        await expect(
          page.getByRole("region", { name: "راهنمای فارسی این صفحه" }),
        ).toBeVisible();

        const staticPath = language === "de" ? "heute" : "daily";
        await page.goto(`${base}/${staticPath}`, { waitUntil: "networkidle" });
        const staticMenu = page.locator(".calm-header-tools");
        await staticMenu.locator("summary").click();
        await expect(
          staticMenu.locator("[data-native-language-select]"),
        ).toBeVisible();
        await expect(page.locator('a[href="/roadmap.html"]')).toHaveCount(0);
        await staticMenu
          .locator("[data-native-language-select]")
          .selectOption("de");
        await expect(
          page.locator(".support-language-guide select"),
        ).toHaveValue("de");
        await staticMenu
          .locator("[data-native-language-select]")
          .selectOption("fa");
        await expect(
          page.locator(".support-language-guide select"),
        ).toHaveValue("fa");

        const grammarPath = language === "de" ? "grammatik" : "grammar";
        await page.goto(`${base}/${grammarPath}`, { waitUntil: "networkidle" });
        await expect(page.locator('a[href="/roadmap.html"]')).toHaveCount(0);
        assert.deepEqual(errors, [], `${language} ${width}px page errors`);
        console.log(
          `${language} ${width}px: native-language menu and learner navigation passed`,
        );
      } finally {
        await context.close();
      }
    }
  }
} finally {
  await browser.close();
}
