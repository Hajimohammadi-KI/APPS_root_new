import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { resolve } from "node:path";

const require = createRequire(
  resolve(
    import.meta.dirname,
    "../Apps/Deutsch/Deutsch-Automaticity/package.json",
  ),
);
const { chromium, expect } = require("@playwright/test");
const base = (process.argv[2] ?? "http://127.0.0.1:3210").replace(/\/$/, "");
const browser = await chromium.launch({
  args: [
    "--use-fake-ui-for-media-stream",
    "--use-fake-device-for-media-stream",
  ],
});

try {
  const context = await browser.newContext({ permissions: ["microphone"] });
  const page = await context.newPage();
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.addInitScript(() => {
    window.__recognitionRuns = [];
    class FakeRecognition {
      lang = "";
      continuous = false;
      interimResults = false;
      maxAlternatives = 1;
      onresult = null;
      onerror = null;
      constructor() {
        window.__recognitionRuns.push(this);
      }
      start() {}
      stop() {}
    }
    window.SpeechRecognition = FakeRecognition;
    window.webkitSpeechRecognition = FakeRecognition;
  });
  await page.goto(base + "/studio", { waitUntil: "networkidle" });
  const transcript = page.getByRole("textbox", { name: "Dein Transkript" });
  await page.getByRole("button", { name: "Record", exact: true }).click();
  await expect
    .poll(() => page.evaluate(() => window.__recognitionRuns.length))
    .toBe(1);
  await page.evaluate(() =>
    window.__recognitionRuns[0].onresult({
      resultIndex: 0,
      results: [{ isFinal: false, 0: { transcript: "Hallo" } }],
    }),
  );
  await expect(transcript).toHaveValue(/Hallo/);
  await page.getByRole("button", { name: "Pause" }).click();
  await page.getByRole("button", { name: "Resume" }).click();
  await expect
    .poll(() => page.evaluate(() => window.__recognitionRuns.length))
    .toBe(2);
  await page.evaluate(() =>
    window.__recognitionRuns[1].onresult({
      resultIndex: 0,
      results: [{ isFinal: true, 0: { transcript: "Hallo" } }],
    }),
  );
  await expect(transcript).toHaveValue("Hallo");
  await page.evaluate(() =>
    window.__recognitionRuns[0].onresult({
      resultIndex: 0,
      results: [{ isFinal: true, 0: { transcript: "Hallo" } }],
    }),
  );
  await expect(transcript).toHaveValue("Hallo");
  await page.evaluate(() =>
    window.__recognitionRuns[1].onresult({
      resultIndex: 0,
      results: [
        { isFinal: true, 0: { transcript: "Hallo" } },
        { isFinal: true, 0: { transcript: "Hallo" } },
      ],
    }),
  );
  await expect(transcript).toHaveValue("Hallo Hallo");
  await transcript.fill("Mein eigener Text");
  await page.evaluate(() =>
    window.__recognitionRuns[1].onresult({
      resultIndex: 0,
      results: [{ isFinal: true, 0: { transcript: "Hallo" } }],
    }),
  );
  await expect(transcript).toHaveValue("Mein eigener Text");
  await page.getByRole("button", { name: "Stop" }).click();
  assert.deepEqual(pageErrors, []);
  console.log(
    "PASS German Studio pause/resume keeps one word once and real repetition twice",
  );
  await context.close();
} finally {
  await browser.close();
}
