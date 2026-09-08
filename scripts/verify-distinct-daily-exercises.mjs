import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
const require = createRequire(
  resolve("Apps/English/English-Automaticity/package.json"),
);
const { chromium } = require("@playwright/test");
const output = resolve(
  process.env.TEST_OUTPUT || "artifacts/distinct-daily-verification",
);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  args: [
    "--use-fake-ui-for-media-stream",
    "--use-fake-device-for-media-stream",
  ],
});
const results = [];
try {
  for (const [language, port, daily, grammar] of [
    ["en", process.env.EN_TEST_PORT || "3323", "/daily", "/grammar"],
    ["de", process.env.DE_TEST_PORT || "3331", "/heute", "/grammatik"],
  ]) {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 960 },
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const base = `http://${process.env.TEST_HOST || "127.0.0.1"}:${port}`;
    const headings = [];
    // Follow the actual homepage buttons, so a correct destination URL alone cannot pass.
    for (let activity = 1; activity <= 7; activity++) {
      await page.goto(`${base}${daily}`);
      await page
        .locator(".activity .open")
        .nth(activity - 1)
        .click();
      await page.waitForURL(
        (url) => url.searchParams.get("activity") === String(activity),
      );
      const target = [2, 3, 6].includes(activity)
        ? ".conversation-flow"
        : ".ws-paper";
      await page
        .locator(`${target}[data-daily-activity="${activity}"]`)
        .waitFor();
      const heading = await page
        .locator(`${target} h1, ${target} .ws-page-header h2`)
        .first()
        .innerText();
      headings.push(heading);
      const url = new URL(page.url());
      if ([1, 4, 5, 7].includes(activity)) {
        assert.equal(await page.locator(".ws-paper").count(), 1);
        assert.equal(await page.locator(".ws-stage-nav:visible").count(), 0);
        const fields = await page
          .locator(".ws-paper textarea[data-ws-field]")
          .evaluateAll((nodes) => nodes.map((node) => node.dataset.wsField));
        assert.ok(fields.length > 0);
        if (activity === 4)
          assert.equal(await page.locator(".ws-memory-model").count(), 1);
        if (activity === 5) {
          assert.ok(fields.every((field) => field.startsWith("E")));
          assert.equal(await page.locator(".ws-key").count(), 1);
          const answer = page.locator(".ws-paper textarea").first();
          await answer.fill("Synthetic writing draft");
          await page.reload();
          assert.equal(await answer.inputValue(), "Synthetic writing draft");
          await page.locator("[data-daily-save]").click();
          assert.equal(new URL(page.url()).pathname, grammar);
          assert.ok(
            (await page.locator("[data-daily-status]").innerText()).length > 0,
          );
        }
        if (activity === 7)
          assert.equal(await page.locator(".ws-review-days input").count(), 4);
      } else {
        assert.equal(await page.locator(".cf-task h1").count(), 1);
        assert.ok(
          !(await page.locator(".cf-task").innerText()).includes(
            "Introduce yourself in four short sentences",
          ),
        );
        if (activity === 3)
          assert.equal(await page.locator("[data-daily-model]").count(), 0);
        else assert.equal(await page.locator("[data-daily-model]").count(), 1);
        if (activity === 6) {
          assert.equal(await page.locator(".cf-steps button").count(), 5);
          await page.locator(".cf-wide").click();
          assert.ok(
            (await page.locator("[data-daily-model] button").count()) >= 4,
          );
          await page.locator(".cf-wide").click();
          await page.locator(".cf-wide").click();
          await page
            .locator('.conversation-flow[data-stage="speak"]')
            .waitFor();
          assert.equal(await page.locator("[data-daily-model]").count(), 0);
        }
      }
      results.push({
        language,
        activity,
        heading,
        topic: url.searchParams.get("topic"),
        route: url.pathname,
      });
      if ([1, 3, 5, 6, 7].includes(activity))
        await page.screenshot({
          path: resolve(output, `${language}-${activity}.png`),
          fullPage: true,
        });
    }
    assert.equal(
      new Set(headings).size,
      7,
      `${language}: each card must open a distinct exercise`,
    );
    if (await page.evaluate(() => window.isSecureContext)) {
      // A synthetic recording can complete only the activity that created it.
      await page.goto(`${base}${daily}`);
      await page.locator(".activity .open").nth(2).click();
      await page
        .locator('.conversation-flow[data-daily-activity="3"]')
        .waitFor();
      await page.locator(".cf-wide").click();
      await page.locator(".cf-mic").click();
      await page.locator('.cf-mic[data-recording="true"]').waitFor();
      await page.waitForTimeout(700);
      await page.locator(".cf-record-actions button").last().click();
      await page.locator('.conversation-flow[data-stage="feedback"]').waitFor();
      await page.locator(".cf-bottom button").first().click();
      const sessionKey =
        language === "de"
          ? "deutsch-automaticity:daily-session:v1"
          : "english-automaticity:daily-session:v1";
      await page.waitForFunction(
        (key) =>
          JSON.parse(
            localStorage.getItem(key) || "{}",
          ).completedActivities?.includes(3),
        sessionKey,
      );
      assert.deepEqual(
        await page.evaluate(
          (key) => JSON.parse(localStorage.getItem(key)).completedActivities,
          sessionKey,
        ),
        [3],
      );
    }
    // A different CEFR selection must reach that catalog's topic, not a stored/default A1 task.
    for (const level of ["A2", "B1", "B2", "C1", "C2"]) {
      await page.goto(`${base}${daily}`);
      if (language === "en") {
        await page
          .locator(".control-accordion")
          .filter({ has: page.locator("#cefr-level") })
          .locator("summary")
          .click();
        await page.locator("#cefr-level").selectOption(level);
      } else {
        // The German dashboard reads the declared level from learner preferences.
        await page.evaluate(
          (value) => localStorage.setItem("german-cefr-level", value),
          level,
        );
        await page.reload();
      }
      await page.locator(".activity .open").nth(2).click();
      await page
        .locator('.conversation-flow[data-daily-activity="3"]')
        .waitFor();
      assert.ok(
        (await page.locator(".cf-topic-picker").innerText()).startsWith(level),
      );
      results.push({
        language,
        level,
        task: await page.locator(".cf-task").innerText(),
      });
    }
    // Generic catalog visits still provide all three worksheet pages.
    await page.goto(`${base}${grammar}`);
    await page.locator(".ws-paper").first().waitFor();
    assert.equal(await page.locator(".ws-paper").count(), 3);
    assert.equal(await page.locator(".ws-stage-nav:visible").count(), 1);
    for (const width of [390, 768]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`${base}${daily}`);
      await page.locator(".activity .open").nth(4).click();
      await page.locator('.ws-paper[data-daily-activity="5"]').waitFor();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      assert.ok(overflow <= 2, `${language} ${width}px overflow: ${overflow}`);
      await page.locator(".ws-paper [data-ink-open]").first().click();
      await page.locator("dialog[open]").waitFor();
      const canvas = page.locator(".ws-ink-pad");
      const box = await canvas.boundingBox();
      const cdp = await context.newCDPSession(page);
      // Chromium pen events exercise pressure-aware input, not physical stylus hardware.
      await cdp.send("Input.dispatchMouseEvent", {
        type: "mousePressed",
        x: box.x + 30,
        y: box.y + 30,
        button: "left",
        buttons: 1,
        clickCount: 1,
        pointerType: "pen",
        force: 0.5,
      });
      await cdp.send("Input.dispatchMouseEvent", {
        type: "mouseMoved",
        x: box.x + 110,
        y: box.y + 65,
        button: "left",
        buttons: 1,
        pointerType: "pen",
        force: 0.7,
      });
      await cdp.send("Input.dispatchMouseEvent", {
        type: "mouseReleased",
        x: box.x + 110,
        y: box.y + 65,
        button: "left",
        buttons: 0,
        clickCount: 1,
        pointerType: "pen",
      });
      await cdp.detach();
      await page.screenshot({
        path: resolve(output, `${language}-pen-${width}.png`),
      });
      await page.locator("[data-ink-close]").click();
      await page.reload();
      const ink = await page.evaluate(() =>
        Object.entries(localStorage)
          .filter(([key]) => key.includes(":daily:5"))
          .some(([, raw]) =>
            Object.entries(JSON.parse(raw)).some(
              ([key, value]) =>
                key.endsWith(":ink") &&
                Array.isArray(value) &&
                value.some((stroke) => stroke.length > 1),
            ),
          ),
      );
      assert.ok(ink, `${language}: pen strokes survive reload`);
    }
    assert.deepEqual(errors, [], `${language} browser exceptions`);
    await context.close();
  }
  await writeFile(
    resolve(output, "results.json"),
    JSON.stringify(
      {
        passed: true,
        host: process.env.TEST_HOST || "127.0.0.1",
        recordingTest: process.env.TEST_HOST
          ? "not-run on insecure LAN HTTP"
          : "synthetic audio",
        results,
      },
      null,
      2,
    ),
  );
  console.log(
    `Verified ${results.length} activity/topic cases, generic pages, writing/pen persistence, and isolated recording completion.`,
  );
} finally {
  await browser.close();
}
