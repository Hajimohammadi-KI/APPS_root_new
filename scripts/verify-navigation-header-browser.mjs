import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const require = createRequire(
  resolve(root, "Apps/English/English-Automaticity/package.json"),
);
const { chromium, expect } = require("@playwright/test");
const config = JSON.parse(
  await readFile(resolve(root, "shared/navigation-config.json"), "utf8"),
);
const browser = await chromium.launch({ channel: "msedge", headless: true });
const problems = [];

try {
  for (const [language, base] of [
    ["en", process.argv[2] ?? "http://127.0.0.1:3202"],
    ["de", process.argv[3] ?? "http://127.0.0.1:3210"],
  ]) {
    const context = await browser.newContext({
      viewport: { width: 390, height: 900 },
      serviceWorkers: "block",
    });
    const routes = [
      ...config[language].main,
      ...config[language].more,
      {
        href: config[language].settings,
        label: language === "de" ? "Einstellungen" : "Settings",
      },
      ...(language === "de"
        ? [
            { href: "/automatik", label: "Automatik" },
            { href: "/themen", label: "Themen" },
            { href: "/klassik", label: "Klassische Übungen" },
            { href: "/deutsch-mit-marija", label: "Deutsch mit Marija" },
          ]
        : []),
      { href: "/offline", label: "Offline" },
    ].filter((route) => !(language === "en" && route.href === "/notebook"));
    for (const route of routes) {
      const page = await context.newPage();
      page.setDefaultTimeout(1000);
      try {
        await page.goto(`${base}${route.href}`, {
          waitUntil: "domcontentloaded",
          timeout: 10000,
        });
        const header = page.locator(
          "header.app-topbar, header.german-app-topbar, header.topbar, header.standalone-learning-header",
        );
        await expect(header).toHaveCount(1);
        await expect(header).toBeVisible();
        const title = (await header.textContent()) ?? "";
        assert.ok(
          title.includes(route.label),
          `${route.href}: missing ${route.label} title`,
        );
        const menu = header
          .locator(
            '.mobile-menu, #menu, #menuBtn, [aria-label="Navigation öffnen"]',
          )
          .first();
        await expect(menu).toBeVisible();
        const sizes = await Promise.all(
          [header, menu].map(async (part) => {
            const box = await part.boundingBox();
            return box?.height ?? 0;
          }),
        );
        assert.ok(
          sizes[0] >= 64 && sizes[0] <= 80,
          `${route.href}: header height ${sizes[0]}`,
        );
        assert.ok(
          sizes[1] >= 44,
          `${route.href}: menu control height ${sizes[1]}`,
        );
      } catch (error) {
        problems.push(
          `${language} ${route.href}: ${error.message.split("\n")[0]}`,
        );
      } finally {
        await page.close();
      }
    }
    const page = await context.newPage();
    page.setDefaultTimeout(1000);
    try {
      await page.goto(base, { waitUntil: "domcontentloaded", timeout: 10000 });
      await page.evaluate(() =>
        localStorage.setItem("learner-sentinel", "keep"),
      );
      const pin = page.locator("[data-pin-home-menu]");
      await expect(pin).toHaveCount(0);
      await page
        .getByRole("button", {
          name: language === "de" ? "Navigation öffnen" : "Open navigation",
        })
        .click();
      await expect(pin).toBeVisible();
      await pin.click();
      await expect(page.locator("[data-pinned-home-navigation]")).toBeVisible();
      await page.reload({ waitUntil: "domcontentloaded", timeout: 10000 });
      await expect(page.locator("[data-pinned-home-navigation]")).toBeVisible();
      const stored = await page.evaluate(
        (key) => ({
          pinned: localStorage.getItem(key),
          learner: localStorage.getItem("learner-sentinel"),
        }),
        language === "de"
          ? "deutschflow:home-menu-pinned"
          : "english-automaticity:home-menu-pinned",
      );
      assert.deepEqual(stored, { pinned: "true", learner: "keep" });
      await page.goto(
        `${base}${language === "de" ? "/fortschritt" : "/progress"}`,
        { waitUntil: "domcontentloaded", timeout: 10000 },
      );
      await expect(page.locator("[data-pinned-home-navigation]")).toHaveCount(
        0,
      );
      await page.goto(base, { waitUntil: "domcontentloaded", timeout: 10000 });
      await expect(page.locator("[data-pinned-home-navigation]")).toBeVisible();
      await page.locator("[data-unpin-home-menu]").click();
      await expect(page.locator("[data-pinned-home-navigation]")).toHaveCount(
        0,
      );
    } catch (error) {
      problems.push(`${language} home pin: ${error.message.split("\n")[0]}`);
    }
    await page.close();
    for (const route of [
      "/",
      "/practice",
      language === "de" ? "/heute" : "/daily",
      language === "de" ? "/grammatik" : "/grammar",
      "/studio",
    ]) {
      const wide = await context.newPage();
      wide.setDefaultTimeout(1000);
      await wide.setViewportSize({ width: 1280, height: 900 });
      try {
        await wide.goto(`${base}${route}`, {
          waitUntil: "domcontentloaded",
          timeout: 10000,
        });
        const header = wide.locator(
          "header.app-topbar, header.german-app-topbar, header.topbar, header.standalone-learning-header",
        );
        await expect(header).toBeVisible();
        const box = await header.boundingBox();
        assert.ok(
          box && box.height >= 64 && box.height <= 80,
          `${route}: desktop header height ${box?.height}`,
        );
        const overflow = await wide.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth,
        );
        assert.ok(overflow <= 2, `${route}: ${overflow}px horizontal overflow`);
        await wide.evaluate(() => window.scrollTo(0, 600));
        const afterScroll = await header.boundingBox();
        assert.ok(
          afterScroll && afterScroll.y >= -1 && afterScroll.y <= 1,
          `${route}: header did not stay at top after scrolling`,
        );
      } catch (error) {
        problems.push(
          `${language} ${route} desktop: ${error.message.split("\n")[0]}`,
        );
      } finally {
        await wide.close();
      }
    }
    for (const width of [320, 900]) {
      const responsive = await context.newPage();
      responsive.setDefaultTimeout(1000);
      await responsive.setViewportSize({ width, height: 900 });
      try {
        await responsive.goto(base, {
          waitUntil: "domcontentloaded",
          timeout: 10000,
        });
        const header = responsive.locator(
          "header.app-topbar, header.german-app-topbar",
        );
        const sizing = await header.evaluate((element) => ({
          width: element.clientWidth,
          scrollWidth: element.scrollWidth,
          height: element.getBoundingClientRect().height,
        }));
        assert.ok(
          sizing.scrollWidth <= sizing.width + 2,
          `${width}px: header content overflows by ${sizing.scrollWidth - sizing.width}px`,
        );
        assert.ok(
          sizing.height >= 64 && sizing.height <= 80,
          `${width}px: header height ${sizing.height}`,
        );
        if (width < 900) {
          await responsive
            .getByRole("button", {
              name: language === "de" ? "Navigation öffnen" : "Open navigation",
            })
            .click();
          await responsive.locator(".ln-heading [data-pin-home-menu]").click();
          await expect(
            responsive.locator("[data-pinned-home-navigation]"),
          ).toBeVisible();
        } else {
          await expect(
            responsive.locator(
              language === "de"
                ? "aside.german-app-sidebar"
                : "aside.app-sidebar",
            ),
          ).toBeVisible();
          await expect(responsive.locator("[data-pin-home-menu]")).toHaveCount(
            0,
          );
        }
      } catch (error) {
        problems.push(
          `${language} ${width}px responsive: ${error.message.split("\n")[0]}`,
        );
      } finally {
        await responsive.close();
      }
    }
    await context.close();
  }
} finally {
  await browser.close();
}

assert.deepEqual(problems, [], problems.join("\n"));
console.log(
  "All learner routes have a matching mobile header and both home menus pin persistently.",
);
