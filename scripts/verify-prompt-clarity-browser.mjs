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
const report = [];
try {
  for (const [language, base] of [
    ["en", process.argv[2] ?? "http://127.0.0.1:3202"],
    ["de", process.argv[3] ?? "http://127.0.0.1:3210"],
  ]) {
    const pack = await (
      await fetch(`${base}/learning-core/curriculum-${language}.json`)
    ).json();
    for (const width of [390, 1280]) {
      const context = await browser.newContext({
        viewport: { width, height: 1000 },
        serviceWorkers: "block",
      });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      let reviewed = 0;
      try {
        for (const unit of pack.units.filter((row) => row.learningCycle)) {
          for (const stage of ["notice", "produce", "transfer"]) {
            const step = unit.learningCycle.steps.find(
              (row) => row.stage === stage,
            );
            const task = unit.tasks.find((row) => row.id === step.taskId);
            await page.goto(
              `${base}/practice?task=${encodeURIComponent(task.id)}`,
              { waitUntil: "domcontentloaded" },
            );
            const guide = page.locator("#practice-task-instructions");
            await expect(guide).toBeVisible();
            await expect(guide.locator("li")).toHaveCount(
              unit.id.endsWith(".001") && stage === "produce" ? 4 : 3,
            );
            await expect(page.locator("#practice-prompt")).toHaveText(
              task.prompt,
            );
            await expect(page.locator(".practice-prompt-heading")).toHaveText(
              "صورت سؤال",
            );
            await expect(page.locator("#practice-response")).toHaveAttribute(
              "aria-describedby",
              /practice-task-instructions/,
            );
            if (unit.id.endsWith(".001") && stage === "produce") {
              await expect(guide).toContainText("نام یا نقش");
              await expect(guide).toContainText("امروز");
              const answer = page.locator("#practice-response");
              const draft =
                language === "de"
                  ? "Ich bin Sara. Heute bin ich müde."
                  : "I am Sara. I am tired today.";
              await answer.fill(draft);
              await page
                .locator(".support-language-guide select")
                .selectOption(language);
              await expect(answer).toHaveValue(draft);
              await expect(
                page.locator("#practice-task-instructions"),
              ).toHaveCount(0);
              await page
                .locator(".support-language-guide select")
                .selectOption("fa");
              await expect(answer).toHaveValue(draft);
              await page.reload({ waitUntil: "domcontentloaded" });
              await expect(page.locator("#practice-response")).toHaveValue(
                draft,
              );
              await expect(
                page.locator("#practice-task-instructions"),
              ).toContainText("پاسخ شخصی");
            }
            const overflow = await page.evaluate(
              () => document.documentElement.scrollWidth > innerWidth + 1,
            );
            assert.equal(
              overflow,
              false,
              `${language} ${width} ${task.id}: horizontal overflow`,
            );
            reviewed++;
          }
        }
        const revisedTransfer = pack.units
          .flatMap((unit) => unit.tasks)
          .find((task) =>
            /\.transfer\.0\.writing\.clarity-202611064$/u.test(task.id),
          );
        assert.ok(revisedTransfer);
        await page.goto(
          `${base}/practice?task=${encodeURIComponent(revisedTransfer.id)}`,
          { waitUntil: "domcontentloaded" },
        );
        await expect(page.locator("#practice-task-instructions")).toContainText(
          "هم‌کلاسی تازه",
        );
        await expect(page.locator("#practice-task-instructions")).toContainText(
          "دو جمله",
        );
        await page.goto(
          `${base}/practice?task=${encodeURIComponent(revisedTransfer.id.replace(/\.clarity-202611064$/u, ""))}`,
          { waitUntil: "domcontentloaded" },
        );
        await expect(page.locator("#practice-task-instructions")).toContainText(
          "هم‌کلاسی تازه",
        );
        await expect(page.locator("textarea[readonly]")).toHaveCount(1);
        if (language === "de") {
          for (const [unitId, model] of [
            ["de.c.153", "der Kindergarten"],
            ["de.c.155", "Nichts ist passiert."],
          ]) {
            const task = pack.units
              .find((unit) => unit.id === unitId)
              .tasks.find((task) =>
                task.id.includes("distinct-202611022.speaking.clarity"),
              );
            await page.goto(
              `${base}/practice?task=${encodeURIComponent(task.id)}`,
              { waitUntil: "domcontentloaded" },
            );
            await page
              .getByRole("button", { name: "Musterlösung zeigen", exact: true })
              .click();
            await expect(page.locator(".reference")).toHaveText(model);
          }
        }
        const library =
          language === "de"
            ? "/replacements/de/grammatik.html"
            : "/replacements/en/grammar.html";
        await page.goto(`${base}${library}`, { waitUntil: "domcontentloaded" });
        await expect(page.locator("#library-task-instructions")).toBeVisible();
        await expect(page.locator("#library-task-instructions")).toContainText(
          "از من چه پاسخی خواسته شده؟",
        );
        const originalPrompt = await page
          .locator("#exercisePrompt")
          .textContent();
        await page.locator("#answerInput").fill("Preserved library draft");
        await page.reload({ waitUntil: "domcontentloaded" });
        await expect(page.locator("#answerInput")).toHaveValue(
          "Preserved library draft",
        );
        const catalogToggle = page.locator('[aria-controls="catalogContents"]');
        if (await catalogToggle.isVisible()) {
          if ((await catalogToggle.getAttribute("aria-expanded")) !== "true")
            await catalogToggle.click();
        }
        await page.locator(".topic:visible").nth(1).click();
        await expect(page.locator("#exercisePrompt")).not.toHaveText(
          originalPrompt,
        );
        await expect(page.locator("#library-task-instructions")).toBeVisible();
        if (language === "de") {
          for (
            let index = 0;
            index < 10 && !(await page.locator("#intentField").isVisible());
            index++
          ) {
            await expect(page.locator("#nextBtn")).toBeEnabled();
            await page.locator("#nextBtn").click();
          }
          await expect(page.locator("#intentField")).toBeVisible();
          await expect(
            page.locator("#library-task-instructions"),
          ).toContainText("کادر فارسی");
          await expect(
            page.locator("#library-task-instructions"),
          ).not.toContainText("از حافظه پیدا کن");
        }
        assert.equal(
          await page.evaluate(
            () => document.documentElement.scrollWidth > innerWidth + 1,
          ),
          false,
        );
        assert.deepEqual(errors, []);
        report.push({
          language,
          width,
          reviewed,
          draftPreserved: true,
          overflow: false,
          pageErrors: 0,
        });
      } finally {
        await context.close();
      }
    }
  }
} finally {
  await browser.close();
}
console.log(JSON.stringify(report, null, 2));
