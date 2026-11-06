import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
const require = createRequire(
  resolve(
    import.meta.dirname,
    "../Apps/English/English-Automaticity/package.json",
  ),
);
const { chromium, expect } = require("@playwright/test");
const base = (process.argv[2] ?? "http://127.0.0.1:3202").replace(/\/$/, "");
const wav = resolve(
  process.argv[3] ??
    "C:/Users/Elahe/AppData/Local/Temp/language-w26-experiment/speechocean762/WAVE/SPEAKER0001/000010011.WAV",
);
assert.ok(existsSync(wav), "Supply a nonprivate test WAV");
const waitMs = Number(process.env.TRANSCRIPTION_WAIT_MS ?? 15000);
const recordMs = Number(process.env.TRANSCRIPTION_RECORD_MS ?? 4500);
const expectedDraft = process.env.TRANSCRIPTION_EXPECT;
const browser = await chromium.launch({
  channel: "msedge",
  headless: true,
  args: [
    "--use-fake-ui-for-media-stream",
    "--use-fake-device-for-media-stream",
    "--use-file-for-fake-audio-capture=" + wav,
  ],
});
try {
  const context = await browser.newContext({
    viewport: { width: 390, height: 900 },
    permissions: ["microphone"],
  });
  const page = await context.newPage();
  const requests = [];
  const errors = [];
  context.on("request", (r) =>
    requests.push({
      url: r.url(),
      method: r.method(),
      body: r.postDataBuffer()?.length ?? 0,
    }),
  );
  page.on("pageerror", (e) => errors.push(e.message));
  await page.addInitScript(() => {
    window.cloudRecognitionStarts = 0;
    const forbidden = class {
      constructor() {
        window.cloudRecognitionStarts++;
        throw Error("Cloud browser transcription must stay disabled");
      }
    };
    window.SpeechRecognition = forbidden;
    window.webkitSpeechRecognition = forbidden;
  });
  await page.goto(base + "/studio", { waitUntil: "networkidle" });
  const workerResponse = await context.request.get(
    base + "/local-transcription/worker.js",
  );
  assert.equal(workerResponse.status(), 200);
  assert.match(
    workerResponse.headers()["content-security-policy"] ?? "",
    /connect-src 'self'(?:;|$)/,
    "The transcription worker must not connect to other origins",
  );
  await expect
    .poll(
      () => page.evaluate(() => Boolean(navigator.serviceWorker?.controller)),
      { timeout: 15000 },
    )
    .toBe(true);
  const box = page.getByRole("textbox", {
    name: "Your transcript",
    exact: true,
  });
  await expect(box).toHaveValue("");
  await page.getByRole("button", { name: "Record", exact: true }).click();
  await page.waitForTimeout(recordMs);
  await page.locator(".record-controls button", { hasText: /Stop/ }).click();
  await expect(page.getByLabel("Recorded answer")).toBeVisible();
  await expect
    .poll(() => box.inputValue(), {
      timeout: waitMs,
      message:
        "Recording should produce an editable local draft transcript automatically",
    })
    .toMatch(/[A-Za-z]{2}/);
  const draft = await box.inputValue();
  if (expectedDraft) assert.match(draft, new RegExp(expectedDraft, "i"));
  await expect(
    page.getByRole("button", { name: "Confirm transcript" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Check transcript grammar" }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Confirm transcript" }).click();
  await expect(box).toHaveValue(draft);
  await expect(
    page.getByRole("button", { name: "Check transcript grammar" }),
  ).toBeEnabled();
  await page.getByRole("button", { name: "Record", exact: true }).click();
  await page.waitForTimeout(recordMs);
  await page.locator(".record-controls button", { hasText: /Stop/ }).click();
  await expect(box).toHaveValue(draft);
  await expect(
    page.getByRole("button", { name: "Check transcript grammar" }),
  ).toBeDisabled();
  await page
    .getByRole("button", { name: "Confirm transcript for this recording" })
    .click();
  await expect(
    page.getByRole("button", { name: "Check transcript grammar" }),
  ).toBeEnabled();
  await page
    .getByRole("button", { name: "Clear transcript for this recording" })
    .click();
  await expect(box).toHaveValue("");
  await page.getByRole("button", { name: "Record", exact: true }).click();
  await page.waitForTimeout(recordMs);
  await page.locator(".record-controls button", { hasText: /Stop/ }).click();
  await expect
    .poll(() => box.inputValue(), { timeout: waitMs })
    .toMatch(/[A-Za-z]{2}/);
  await page.context().setOffline(true);
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(box).toHaveValue("");
  await page.getByRole("button", { name: "Record", exact: true }).click();
  await page.waitForTimeout(recordMs);
  await page.locator(".record-controls button", { hasText: /Stop/ }).click();
  await expect
    .poll(() => box.inputValue(), { timeout: waitMs })
    .toMatch(/[A-Za-z]{2}/);
  await box.fill("I said these exact words myself.");
  await page.waitForTimeout(1500);
  await expect(box).toHaveValue("I said these exact words myself.");
  assert.equal(await page.evaluate(() => window.cloudRecognitionStarts), 0);
  assert.equal(
    requests.filter((r) => r.method !== "GET" || r.body > 0).length,
    0,
    "No recording or transcript uploads",
  );
  assert.deepEqual(
    requests.filter((r) => {
      const u = new URL(r.url);
      return u.protocol !== "edge:" && u.origin !== new URL(base).origin;
    }),
    [],
    "No external runtime request",
  );
  assert.deepEqual(errors, []);
  console.log(
    JSON.stringify({
      draft,
      offlineDraft: true,
      manualTextPreserved: true,
      cloudRecognitionStarts: 0,
      uploads: 0,
      externalRequests: 0,
      passed: true,
    }),
  );
  await context.close();
} finally {
  await browser.close();
}
