import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const require = createRequire(
  resolve(root, "Apps/English/English-Automaticity/package.json"),
);
const { chromium, expect } = require("@playwright/test");
const browser = await chromium.launch({ channel: "msedge", headless: true });

try {
  for (const [language, base] of [
    ["en", process.argv[2] ?? "http://127.0.0.1:3202"],
    ["de", process.argv[3] ?? "http://127.0.0.1:3210"],
  ]) {
    for (const width of [320, 390]) {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        serviceWorkers: "block",
      });
      const page = await context.newPage();
      await page.goto(base, { waitUntil: "domcontentloaded" });
      await expect(page.locator("[data-pin-home-menu]")).toHaveCount(0);
      await page
        .getByRole("button", {
          name: language === "de" ? "Navigation öffnen" : "Open navigation",
        })
        .click();
      const panel =
        language === "de"
          ? page.getByRole("dialog")
          : page.locator("aside.app-sidebar[data-open='true']");
      const panelBox = await panel.boundingBox();
      assert.ok(
        panelBox &&
          panelBox.y >= 60 &&
          panelBox.y <= 85 &&
          panelBox.width <= 320 &&
          panelBox.height < 700,
        `${language} ${width}: menu should be a compact box below the header`,
      );
      const pin = panel.locator(".ln-heading [data-pin-home-menu]");
      await expect(pin).toBeVisible();
      await panel
        .locator(".learning-navigation a[aria-current='page']")
        .hover();
      await page.waitForTimeout(350);
      await expect(
        page.locator(
          language === "de"
            ? "#deutschflow-kontexthilfe"
            : "#english-automaticity-context-help",
        ),
      ).toBeHidden();
      await pin.click();
      const card = page.locator("[data-pinned-home-navigation]");
      await expect(card).toBeVisible();
      await expect(
        card.locator(".ln-heading [data-unpin-home-menu]"),
      ).toBeVisible();
      const sizes = await card.evaluate((node) => {
        const cardBox = node.getBoundingClientRect();
        const buttonBox = node
          .querySelector("[data-unpin-home-menu]")
          .getBoundingClientRect();
        const navBox = node
          .querySelector(".learning-navigation")
          .getBoundingClientRect();
        return {
          cardWidth: cardBox.width,
          navWidth: navBox.width,
          buttonInside:
            buttonBox.left >= cardBox.left &&
            buttonBox.right <= cardBox.right &&
            buttonBox.top >= cardBox.top &&
            buttonBox.bottom <= cardBox.bottom,
        };
      });
      assert.ok(
        sizes.buttonInside,
        `${language} ${width}: pin control is outside menu card`,
      );
      assert.ok(
        sizes.cardWidth <= Math.min(340, width - 32),
        `${language} ${width}: menu card is ${sizes.cardWidth}px wide`,
      );
      assert.ok(
        sizes.cardWidth <= sizes.navWidth + 90,
        `${language} ${width}: menu card has excessive blank width`,
      );
      await page.reload({ waitUntil: "domcontentloaded" });
      await expect(page.locator("[data-pinned-home-navigation]")).toBeVisible();
      await page.locator("[data-unpin-home-menu]").click();
      await expect(page.locator("[data-pinned-home-navigation]")).toHaveCount(
        0,
      );
      await context.close();
    }
  }
  console.log(
    "Pin controls stay inside the menu and the Home card fits its contents.",
  );
} finally {
  await browser.close();
}
