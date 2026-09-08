import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { assertTestTarget } from "../device-access/browser-target.mjs";

const root = resolve(import.meta.dirname, "../..");
const require = createRequire(
  resolve(root, "Apps/English/English-Automaticity/package.json"),
);
const { chromium, expect } = require("@playwright/test");
const host = process.env.DEVICE_TEST_HOST;
assert(host, "Set DEVICE_TEST_HOST to the authorized LAN address.");
const packages = JSON.parse(
  await readFile(
    resolve(root, "artifacts/seven-step-flow/package-verification.json"),
    "utf8",
  ),
);
const output = resolve(root, "artifacts/seven-step-flow");
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = { checkedAt: new Date().toISOString(), apps: [], roadmap: {} };
try {
  // Use isolated contexts so runtime verification cannot change learner profiles.
  for (const pkg of packages) {
    const base = `http://${host}:${pkg.language === "en" ? 3203 : 3211}`;
    assertTestTarget(base);
    const context = await browser.newContext();
    const page = await context.newPage();
    const response = await page.goto(base);
    assert.equal(response.status(), 200);
    await expect(page.locator("#flow-main")).toBeVisible();
    const assets = {};
    // Compare live bytes against hashes from the actual installer payload.
    for (const [name, expected] of Object.entries(pkg.assets)) {
      const asset = await context.request.get(
        `${base}/replacements/${pkg.language}/${name}`,
      );
      assert.equal(asset.status(), 200);
      const hash = createHash("sha256")
        .update(await asset.body())
        .digest("hex");
      assert.equal(hash, expected, `${pkg.language}/${name} is stale`);
      assets[name] = hash;
    }
    report.apps.push({
      url: base,
      version: pkg.version,
      status: "PASS",
      assets,
    });
    await context.close();
  }
  const url = `http://${host}:3317/LANGUAGE-AUTOMATICITY-ROADMAP.html`;
  assertTestTarget(url);
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(String(error)));
  assert.equal((await page.goto(url)).status(), 200);
  await expect(page.locator("#seven-step-release")).toBeVisible();
  await expect(page.locator("#release")).toContainText("27.3.45");
  await expect(page.locator("#release")).toContainText("20.8.50");
  await expect(page.locator("#release")).toContainText(
    "isolated installer data",
  );
  await expect(page.locator("#error")).toBeHidden();
  const backlog = await page
    .locator("#roadmap-data")
    .evaluate((node) => JSON.parse(node.textContent).backlog);
  assert.equal(
    backlog.tasks.find((task) => task.id === "U06").status,
    "verified",
  );
  const widths = [390, 768, 1117];
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    assert(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `Roadmap overflow at ${width}`,
    );
    await page.screenshot({ path: resolve(output, `roadmap-${width}.png`) });
  }
  assert.deepEqual(errors, []);
  report.roadmap = {
    url,
    status: "PASS",
    widths,
    task: "U06",
    versions: backlog.technicalRelease.versions,
    consoleErrors: errors,
  };
  await context.close();
} finally {
  await browser.close();
}
await writeFile(
  resolve(output, "live-verification.json"),
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
