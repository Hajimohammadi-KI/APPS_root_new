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
      viewport: { width: 1090, height: 850 },
      serviceWorkers: "block",
    });
    const routes = [
      ...config[language].main,
      ...config[language].more,
      {
        href: config[language].settings,
        label: language === "en" ? "Settings" : "Einstellungen",
      },
      ...(language === "de"
        ? [
            { href: "/automatik", label: "Automatik", outsideMenu: true },
            { href: "/themen", label: "Themen", outsideMenu: true },
            {
              href: "/klassik",
              label: "Klassische Übungen",
              outsideMenu: true,
            },
            {
              href: "/deutsch-mit-marija",
              label: "Deutsch mit Marija",
              outsideMenu: true,
            },
          ]
        : []),
      { href: "/offline", label: "Offline" },
    ].filter((route) => !(language === "en" && route.href === "/notebook"));
    for (const route of routes) {
      const page = await context.newPage();
      try {
        await page.goto(`${base}${route.href}`, {
          waitUntil: "domcontentloaded",
        });
        await page.waitForFunction(
          () =>
            document.querySelector(
              "aside.app-sidebar, aside.german-app-sidebar, aside.standalone-learning-sidebar, aside.calm-practice-sidebar, body.daily-workspace nav.side, body.language-workspace .sidebar",
            ) !== null,
        );
        const result = await page.evaluate(() => {
          const selectors = [
            "aside.app-sidebar",
            "aside.german-app-sidebar",
            "aside.standalone-learning-sidebar",
            "aside.calm-practice-sidebar",
            ".sidebar",
            "nav.side",
          ];
          const rail = selectors
            .flatMap((selector) => [...document.querySelectorAll(selector)])
            .find((element) => {
              const style = getComputedStyle(element);
              const box = element.getBoundingClientRect();
              return (
                style.display !== "none" &&
                style.visibility !== "hidden" &&
                box.width > 100 &&
                box.height > 200
              );
            });
          const header = document.querySelector(
            "header.app-topbar, header.german-app-topbar, header.topbar, header.standalone-learning-header",
          );
          const box = rail?.getBoundingClientRect();
          const headerBox = header?.getBoundingClientRect();
          return {
            railWidth: box?.width ?? 0,
            railRight: box?.right ?? 0,
            headerLeft: headerBox?.left ?? 0,
            overflow: document.documentElement.scrollWidth - innerWidth,
          };
        });
        assert.ok(
          Math.abs(result.railWidth - 264) <= 2,
          `${language} ${route.href}: sidebar width ${result.railWidth}, expected 264`,
        );
        assert.ok(
          result.headerLeft >= result.railRight - 2,
          `${language} ${route.href}: header ${result.headerLeft} overlaps sidebar ${result.railRight}`,
        );
        assert.ok(
          result.overflow <= 2,
          `${language} ${route.href}: ${result.overflow}px overflow`,
        );
        if (route.href !== "/offline" && !route.outsideMenu)
          await expect(
            page.getByRole("link", { name: route.label, exact: true }).first(),
          ).toBeVisible();
      } catch (error) {
        problems.push(
          `${language} ${route.href}: ${error.message.split("\n")[0]}`,
        );
      }
      await page.close();
    }
    await context.close();
  }
  assert.deepEqual(problems, []);
  console.log(
    "All learner routes use the same compact desktop sidebar and aligned header.",
  );
} finally {
  await browser.close();
}
