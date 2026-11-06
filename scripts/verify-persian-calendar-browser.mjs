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
const results = [];

try {
  for (const [language, base] of [
    ["en", process.argv[2] ?? "http://127.0.0.1:3202"],
    ["de", process.argv[3] ?? "http://127.0.0.1:3210"],
  ]) {
    const pack = await (
      await fetch(`${base}/learning-core/curriculum-${language}.json`)
    ).json();
    const unit = pack.units.find((row) => row.learningCycle);
    assert.ok(unit, `${language}: no learning cycle`);
    const taskId = unit.learningCycle.steps.find(
      (row) => row.stage === "retrieve",
    )?.taskId;
    assert.ok(taskId, `${language}: no retrieval task`);
    for (const width of [390, 1280]) {
      const context = await browser.newContext({
        viewport: { width, height: 950 },
        serviceWorkers: "block",
      });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      try {
        await page.goto(base, { waitUntil: "networkidle" });
        await expect(page.locator(".lh-days time")).toHaveCount(7);
        await expect(page.getByText("از اینجا شروع کن")).toBeVisible();
        const seed = await page.evaluate((lang) => {
          const now = new Date().toISOString();
          const key = `calendar-fixture-${lang}`;
          const storageKey = "automaticity:learning-evidence:v1";
          const original = localStorage.getItem(storageKey);
          localStorage.setItem(
            storageKey,
            JSON.stringify({
              schemaVersion: "1.0.0",
              contentUnits: [{ id: key, language: lang }],
              dailyPlans: [],
              responses: [
                {
                  id: `${key}:response`,
                  contentUnitId: key,
                  submittedAt: now,
                  inputText: "Recorded conversation response.",
                },
              ],
              evidence: [],
              events: [],
            }),
          );
          return original;
        }, language);
        await page.reload({ waitUntil: "networkidle" });
        await expect(
          page.locator(".lh-days li").last().locator(".lh-day-count"),
        ).toHaveText("1");
        await page.evaluate((original) => {
          const key = "automaticity:learning-evidence:v1";
          if (original === null) localStorage.removeItem(key);
          else localStorage.setItem(key, original);
        }, seed);

        await page.goto(`${base}/practice?task=${encodeURIComponent(taskId)}`, {
          waitUntil: "networkidle",
        });
        await expect(
          page.locator(".support-language-guide[open]"),
        ).toBeVisible();
        await expect(page.locator(".practice-task-steps")).toContainText(
          "از من چه پاسخی خواسته شده؟",
        );
        await expect(page.locator(".learning-cycle-goals[open]")).toBeVisible();
        await expect(
          page.locator(".practice-stage-options[open]"),
        ).toBeVisible();
        const response = page.locator("#practice-response");
        await response.fill(
          language === "de" ? "Ich bin Studentin." : "I am ready.",
        );
        await page
          .locator(".support-language-guide select")
          .selectOption(language);
        await expect(page.locator(".practice-task-steps")).toHaveCount(0);
        await expect(response).toHaveValue(
          language === "de" ? "Ich bin Studentin." : "I am ready.",
        );
        await page.locator(".support-language-guide select").selectOption("fa");
        await expect(page.locator(".practice-task-steps")).toBeVisible();
        await expect(response).toHaveValue(
          language === "de" ? "Ich bin Studentin." : "I am ready.",
        );

        await page.goto(`${base}/studio`, { waitUntil: "networkidle" });
        await expect(page.locator(".studio-persian-task-guide")).toBeVisible();
        await expect(
          page.getByRole("region", { name: "راهنمای فارسی این صفحه" }),
        ).toBeVisible();
        await expect(page.locator(".studio-step-picker")).toContainText(
          "پاسخ بده",
        );
        await page.goto(
          language === "de" ? `${base}/automatik` : `${base}/flashcards`,
          { waitUntil: "networkidle" },
        );
        await expect(
          page.getByRole("region", { name: "راهنمای فارسی این صفحه" }),
        ).toBeVisible();
        if (language === "de") {
          await expect(
            page.locator(".automatik-persian-exercise-guide"),
          ).toHaveCount(3);
          await page
            .getByRole("button", { name: /2\. Automatisieren/ })
            .click();
          await expect(
            page.getByRole("region", { name: "راهنمای فارسی نوشتن" }),
          ).toBeVisible();
          await page.getByRole("button", { name: /3\. Frei sprechen/ }).click();
          await expect(
            page.getByRole("region", { name: "راهنمای فارسی گفتن" }),
          ).toBeVisible();
        }
        await page.goto(
          language === "de" ? `${base}/lehrkraft` : `${base}/teacher`,
          { waitUntil: "networkidle" },
        );
        await expect(
          page.getByRole("region", { name: "راهنمای فارسی این صفحه" }),
        ).toBeVisible();
        const daily = language === "de" ? "heute" : "daily";
        await page.goto(`${base}/${daily}`, { waitUntil: "networkidle" });
        await expect(
          page.locator(".native-language-guide-host > .support-language-copy"),
        ).toBeVisible();
        const grammar = language === "de" ? "grammatik" : "grammar";
        await page.goto(`${base}/${grammar}`, { waitUntil: "networkidle" });
        await expect(
          page.locator(".native-language-guide-host > .support-language-copy"),
        ).toBeVisible();
        assert.deepEqual(errors, [], `${language} ${width}px page errors`);
        results.push(
          `${language} ${width}px: calendar, Persian practice, studio, daily and grammar passed`,
        );
      } finally {
        await context.close();
      }
    }
  }
} finally {
  await browser.close();
}

console.log(results.join("\n"));
