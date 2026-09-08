import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { assertTestTarget } from "../device-access/browser-target.mjs";
const root = resolve(import.meta.dirname, "../..");
const require = createRequire(
  resolve(root, "Apps/English/English-Automaticity/package.json"),
);
const { chromium, expect } = require("@playwright/test");
const host = process.env.DEVICE_TEST_HOST;
assert(host, "Set DEVICE_TEST_HOST to the authorized LAN address.");
const out = resolve(root, "artifacts/seven-step-flow/browser");
await mkdir(out, { recursive: true });
const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--autoplay-policy=no-user-gesture-required"],
});
const reports = [];
try {
  for (const language of ["en", "de"]) {
    const app = `http://${host}:${language === "en" ? 3203 : 3211}`;
    assertTestTarget(app);
    // A fresh isolated browser context never changes the learner's browser profile.
    const context = await browser.newContext({
      viewport: { width: 1117, height: 900 },
      ignoreHTTPSErrors: true,
    });
    const page = await context.newPage(),
      errors = [];
    page.on("pageerror", (error) => errors.push(String(error)));
    const action = (name) => page.locator(`[data-action="${name}"]`).first();
    const loaded = () => expect(page.locator("#flow-main")).toBeVisible();
    const state = () =>
      page.evaluate(() => {
        const lang = document.documentElement.lang,
          prefix = `automaticity:v2:${lang}:seven-step:`;
        return JSON.parse(
          localStorage.getItem(prefix + localStorage.getItem(prefix + "last")),
        );
      });
    const step = async (n) => {
      await action("overview").click();
      await page.locator(`[data-action="step"][data-step="${n}"]`).click();
      await expect(page.locator("#flow-main")).toHaveAttribute(
        "data-step",
        String(n),
      );
    };
    const fill = async (
      answer = "Synthetic learner response.",
      why = "Synthetic trigger explanation.",
    ) => {
      await page.locator("textarea[data-field$=':answer']").fill(answer);
      await page.locator("textarea[data-field$=':why']").fill(why);
    };
    await page.goto(app);
    await loaded();
    await expect(page.locator(".step-card")).toHaveCount(7);
    const coverage = await page.evaluate(
      () => window.GrammarWorksheets.worksheets.length,
    );
    assert.equal(coverage, language === "en" ? 112 : 144);
    for (const width of [390, 768, 1117]) {
      await page.setViewportSize({ width, height: 900 });
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      );
      await page.screenshot({
        path: resolve(out, `${language}-overview-${width}.png`),
        fullPage: true,
      });
    }
    await page.setViewportSize({ width: 390, height: 900 });
    await step(1);
    const expected = await page.evaluate(
      () => window.GrammarWorksheets.worksheets[0].learn[0].answer,
    );
    await fill(
      expected,
      language === "de"
        ? "Das Signal bestimmt die Form."
        : "The cue determines the form.",
    );
    await action("submit").click();
    await expect(page.locator("[data-answer-key]")).toBeVisible();
    assert.equal((await state()).completed.length, 0);
    // Exercise the real ink control with a CDP pen pointer and pressure.
    await page.locator("[data-ink-open]").first().click();
    await expect(page.locator(".ws-ink-dialog")).toBeVisible();
    const pad = await page.locator(".ws-ink-pad").boundingBox(),
      cdp = await context.newCDPSession(page);
    const x = pad.x + 30,
      y = pad.y + 50;
    await cdp.send("Input.dispatchMouseEvent", {
      type: "mousePressed",
      x,
      y,
      button: "left",
      buttons: 1,
      clickCount: 1,
      pointerType: "pen",
      force: 0.4,
    });
    await cdp.send("Input.dispatchMouseEvent", {
      type: "mouseMoved",
      x: x + 65,
      y: y + 20,
      button: "left",
      buttons: 1,
      pointerType: "pen",
      force: 0.8,
    });
    await cdp.send("Input.dispatchMouseEvent", {
      type: "mouseReleased",
      x: x + 65,
      y: y + 20,
      button: "left",
      buttons: 0,
      clickCount: 1,
      pointerType: "pen",
      force: 0,
    });
    await page.locator("[data-ink-close]").click();
    const first = await state(),
      ink = first.fields["1:0:0:answer:ink"];
    assert(ink?.length > 0);
    assert(ink[0].some((point) => point.p > 0.7));
    await action("next-item").click();
    await expect(page.locator(".ws-exercise .eyebrow")).toContainText("2 / ");
    await page.reload();
    await loaded();
    assert.equal((await state()).position, 1);
    await action("previous-item").click();
    await expect(page.locator("textarea[data-field$=':answer']")).toHaveValue(
      expected,
    );
    assert.deepEqual((await state()).fields["1:0:0:answer:ink"], ink);
    await page.screenshot({
      path: resolve(out, `${language}-learn-mobile.png`),
      fullPage: true,
    });
    await step(2);
    await expect(page.locator("[data-rule]")).toHaveCount(0);
    await expect(page.locator(".ws-exercise h2")).toBeVisible();
    await page.screenshot({
      path: resolve(out, `${language}-repair-mobile.png`),
      fullPage: true,
    });
    await step(3);
    await expect(page.locator("textarea")).toHaveCount(0);
    await action("prepare-speak").click();
    await expect(page.locator("[data-production]")).toBeVisible();
    await action("record").click();
    await expect(page.locator("#flow-status")).toContainText("HTTPS");
    await step(4);
    await expect(page.locator("textarea")).toHaveCount(0);
    await action("manual").click();
    await fill();
    await action("submit").click();
    await expect(page.locator("#flow-status")).not.toBeEmpty();
    await step(5);
    await fill("My original personal text.");
    await page.reload();
    await loaded();
    await expect(page.locator("textarea[data-field$=':answer']")).toHaveValue(
      "My original personal text.",
    );
    await page.screenshot({
      path: resolve(out, `${language}-writing-mobile.png`),
      fullPage: true,
    });
    await step(6);
    await expect(page.locator("[data-transcript]")).toHaveCount(0);
    await page.locator('[data-setting="rate"]').selectOption("0.75");
    await fill("My listening gist.");
    await action("submit").click();
    await expect
      .poll(async () =>
        (await state()).submissions.some((s) => s.itemId === "shadow-0"),
      )
      .toBe(true);
    await action("shadow-next").click();
    await expect(page.locator("[data-transcript]")).toBeVisible();
    await expect(page.locator('[data-setting="rate"]')).toHaveValue("0.75");
    await page.screenshot({
      path: resolve(out, `${language}-listening-mobile.png`),
      fullPage: true,
    });
    await step(7);
    await expect(
      page.locator("[data-rule],[data-answer-key],[data-transcript]"),
    ).toHaveCount(0);
    await fill("Three new exit-check sentences.");
    await action("submit").click();
    await expect(action("close-session")).toBeVisible();
    await action("close-session").click();
    const scheduled = await state();
    assert.deepEqual(
      scheduled.reviews.map((r) => r.day),
      [1, 3, 7, 14, 30],
    );
    assert(scheduled.reviews.every((r) => !r.completedAt));
    for (const button of await page.locator('[data-action="review"]').all())
      await expect(button).toBeDisabled();
    // Only synthetic context data is moved to a due date; no learner record is altered.
    await page.evaluate(() => {
      const lang = document.documentElement.lang,
        p = `automaticity:v2:${lang}:seven-step:`,
        k = p + localStorage.getItem(p + "last"),
        s = JSON.parse(localStorage.getItem(k));
      s.reviews[0].dueAt = new Date(Date.now() - 1000).toISOString();
      localStorage.setItem(k, JSON.stringify(s));
    });
    await page.reload();
    await loaded();
    await page.locator('[data-action="review"][data-day="1"]').click();
    await expect(page.locator("[data-answer-key],[data-rule]")).toHaveCount(0);
    await expect(page.locator("textarea[data-field$=':answer']")).toHaveValue(
      "",
    );
    await fill("A new delayed response.");
    await action("submit-review").click();
    await expect
      .poll(async () => Boolean((await state()).reviews[0].completedAt))
      .toBe(true);
    const ledger = await page.evaluate(() =>
      Object.keys(localStorage)
        .filter((k) => k.includes(":event:"))
        .map((k) => JSON.parse(localStorage.getItem(k))),
    );
    assert(
      ledger.length > 0 &&
        ledger.every(
          (e) => e.type === "attempt" && e.task.partition === "practice",
        ),
    );
    assert(!("mastered" in (await state())));
    // Topic changes have independent keys and restore the former lesson's text and ink.
    const firstLesson = (await state()).lessonId;
    const secondId = await page
      .locator('[data-setting="lesson"] option')
      .nth(1)
      .getAttribute("value");
    await page.locator('[data-setting="lesson"]').selectOption(secondId);
    assert.equal((await state()).submissions.length, 0);
    await page.locator('[data-setting="lesson"]').selectOption(firstLesson);
    assert.deepEqual((await state()).fields["1:0:0:answer:ink"], ink);
    // HTTPS capture uses a synthetic tone through real MediaRecorder, not a microphone claim.
    const secure = `https://${host}:${language === "en" ? 3204 : 3212}`;
    assertTestTarget(secure);
    await page.addInitScript(() => {
      if (!window.isSecureContext) return;
      navigator.mediaDevices.getUserMedia = async () => {
        const context = new AudioContext(),
          osc = context.createOscillator(),
          destination = context.createMediaStreamDestination();
        osc.frequency.value = 220;
        osc.connect(destination);
        osc.start();
        await context.resume();
        return destination.stream;
      };
      class SyntheticRecognition {
        lang = "";
        continuous = true;
        interimResults = false;
        onresult = null;
        onerror = null;
        onend = null;
        start() {
          setTimeout(
            () =>
              this.onresult?.({
                resultIndex: 0,
                results: [
                  {
                    isFinal: true,
                    0: { transcript: "Synthetic spoken response." },
                  },
                ],
              }),
            250,
          );
        }
        stop() {
          this.onend?.();
        }
      }
      window.SpeechRecognition = SyntheticRecognition;
    });
    await page.goto(`${secure}/?step=4`);
    await loaded();
    await action("prepare-speak").click();
    await action("record").click();
    await expect(page.locator("#record-time")).not.toHaveText("0:00");
    await expect(page.locator("textarea,[data-rule],.key")).toHaveCount(0);
    await action("pause").click();
    const frozen = await page.locator("#record-time").textContent();
    await page.waitForTimeout(500);
    const frozenLater = await page.locator("#record-time").textContent();
    // Re-rendered timer can settle once from the recorder's next tick; it then stays stable.
    await page.waitForTimeout(500);
    assert.equal(await page.locator("#record-time").textContent(), frozenLater);
    await action("pause").click();
    await page.waitForTimeout(500);
    await action("stop").click();
    await expect(page.locator("audio")).toBeVisible();
    const records = () =>
      page.evaluate(
        () =>
          new Promise((resolve, reject) => {
            const r = indexedDB.open("conversation-studio", 2);
            r.onsuccess = () => {
              const db = r.result,
                q = db
                  .transaction("attempts-v2")
                  .objectStore("attempts-v2")
                  .getAll();
              q.onsuccess = async () => {
                const rows = await Promise.all(
                  q.result.map(async (a) => ({
                    id: a.id,
                    parentId: a.parentId,
                    kind: a.kind,
                    raw: a.rawTranscript,
                    edited: a.editedTranscript,
                    size: a.audio.size,
                    hash: Array.from(
                      new Uint8Array(
                        await crypto.subtle.digest(
                          "SHA-256",
                          await a.audio.arrayBuffer(),
                        ),
                      ),
                    ).join(","),
                  })),
                );
                db.close();
                resolve(rows);
              };
              q.onerror = () => reject(q.error);
            };
          }),
      );
    const original = (await records())[0];
    assert(original.size > 0);
    await page
      .locator("textarea[data-field^='transcript:']")
      .fill("Edited text, kept separately.");
    await action("confirm").click();
    await expect(action("evaluate")).toBeEnabled();
    await page.locator('[data-setting="rate"]').selectOption("1.5");
    assert.equal(
      await page.locator("audio").evaluate((a) => a.playbackRate),
      1.5,
    );
    await page.locator("textarea[data-field$=':why']").fill("My trigger.");
    await action("submit").click();
    await expect.poll(async () => (await state()).submissions.length).toBe(1);
    await action("retry").click();
    await action("record").click();
    await page.waitForTimeout(1300);
    await action("stop").click();
    await expect(page.locator("audio")).toBeVisible();
    const retained = await records();
    assert.equal(retained.length, 2);
    assert.equal(
      retained.find((a) => a.id === original.id).hash,
      original.hash,
    );
    assert.equal(retained.find((a) => a.id === original.id).raw, original.raw);
    assert.equal(
      retained.find((a) => a.id !== original.id).parentId,
      original.id,
    );
    await page.screenshot({
      path: resolve(out, `${language}-feedback-mobile.png`),
      fullPage: true,
    });
    await action("overview").click();
    const downloadPromise = page.waitForEvent("download");
    await action("backup").click();
    const download = await downloadPromise;
    const backup = JSON.parse(await readFile(await download.path(), "utf8"));
    assert.equal(backup.kind, "automaticity.complete-backup");
    assert(backup.localStorage.some(([key]) => key.includes(":seven-step:")));
    const audioRecords = backup.databases
      .find((db) => db.name === "conversation-studio")
      .stores.find((store) => store.name === "attempts-v2").records;
    assert.equal(audioRecords.length, 2);
    const audioHashes = audioRecords.map(
      (record) =>
        record.value.entries.find(([key]) => key === "audio")[1].sha256,
    );
    const originalHex = original.hash
      .split(",")
      .map((n) => Number(n).toString(16).padStart(2, "0"))
      .join("");
    assert(audioHashes.includes(originalHex));
    assert.deepEqual(errors, []);
    reports.push({
      language,
      app,
      status: "PASS",
      topics: coverage,
      widths: [390, 768, 1117],
      pen: "synthetic pressure pointer; reload retained",
      recording: "real MediaRecorder with synthetic input",
      retainedOriginalHash: original.hash,
      checks: [
        "seven exclusive steps",
        "single-target authored content",
        "typed and ink reload",
        "exact item resume",
        "topic isolation",
        "HTTP mic limitation",
        "model-hidden review",
        "due-date gating",
        "no mastery from completion",
        "immutable attempt ledger",
        "pause",
        "separate ASR and edits",
        "retry retains first recording",
        "playback speed",
        "complete backup contains session and original audio hashes",
      ],
      runtimeErrors: errors,
    });
    await context.close();
  }
  await writeFile(
    resolve(out, "verification.json"),
    JSON.stringify(reports, null, 2),
  );
  console.log(JSON.stringify(reports));
} finally {
  await browser.close();
}
