import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const require = createRequire(
  resolve(
    import.meta.dirname,
    "../Apps/English/English-Automaticity/package.json",
  ),
);
const { chromium, expect } = require("@playwright/test");
const credentials = JSON.parse(
  readFileSync(
    resolve(
      import.meta.dirname,
      "../artifacts/private/language-staff-access.json",
    ),
    "utf8",
  ),
);
const browser = await chromium.launch({ channel: "msedge", headless: true });
const report = [];
mkdirSync(resolve(import.meta.dirname, "../artifacts/staff-workspace"), {
  recursive: true,
});
try {
  for (const [language, base] of [
    ["en", process.argv[2] ?? "http://127.0.0.1:3202"],
    ["de", process.argv[3] ?? "http://127.0.0.1:3210"],
  ]) {
    for (const width of [390, 1280]) {
      const context = await browser.newContext({
        viewport: { width, height: 1000 },
      });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      const teacherPath = language === "en" ? "/teacher" : "/lehrkraft";
      try {
        for (const path of [
          teacherPath,
          "/staff/settings",
          "/staff/developer",
          "/learning-core/content-review.html",
          "/roadmap.html",
          "/assessment-benchmarks.html",
        ]) {
          const response = await context.request.get(`${base}${path}`, {
            maxRedirects: 0,
          });
          assert.equal(response.status(), 307, `${path}: guest must sign in`);
          assert.match(response.headers()["cache-control"], /no-store/u);
        }
        assert.equal(
          (
            await context.request.get(`${base}/api/learner-feedback/review`, {
              maxRedirects: 0,
            })
          ).status(),
          401,
        );
        await page.goto(`${base}/practice?notebook=1`, {
          waitUntil: "domcontentloaded",
        });
        const notebook = page.locator(".practice-notebook");
        await expect(notebook).toBeVisible();
        await expect(notebook).not.toContainText(
          /anonymisierten|Transkripte|Zählung|latest response|real writing errors|mastery|Beherrschung/u,
        );
        await expect(
          page.locator('a[href="/assessment-benchmarks.html"]'),
        ).toHaveCount(0);
        await expect(page.locator(".practice-review-export")).toHaveCount(0);
        await notebook.screenshot({
          path: resolve(
            import.meta.dirname,
            `../artifacts/staff-workspace/${language}-learner-${width}.png`,
          ),
        });
        const answer = page.locator("#practice-response");
        const draft =
          language === "de"
            ? "Mein gespeicherter Entwurf bleibt erhalten."
            : "My saved draft stays on this device.";
        await answer.fill(draft);
        await page.reload({ waitUntil: "domcontentloaded" });
        await expect(answer).toHaveValue(draft);
        await page.goto(
          `${base}${language === "en" ? "/settings" : "/einstellungen"}`,
          { waitUntil: "domcontentloaded" },
        );
        await expect(
          page.locator('a[href="/learning-core/content-review.html"]'),
        ).toHaveCount(0);
        await page.goto(`${base}/`, { waitUntil: "domcontentloaded" });
        await expect(page.locator(`a[href="${teacherPath}"]`)).toHaveCount(0);

        async function login(role, destination) {
          await page.goto(
            `${base}/staff${destination ? "?returnTo=" + encodeURIComponent(destination) : ""}`,
            { waitUntil: "domcontentloaded" },
          );
          await page.getByLabel("نقش ورود", { exact: true }).selectOption(role);
          await page
            .getByLabel("رمز ورود", { exact: true })
            .fill(
              role === "teacher"
                ? credentials.teacherPassword
                : credentials.developerPassword,
            );
          await page
            .getByRole("button", { name: "ورود به محیط حرفه‌ای", exact: true })
            .click();
          if (destination) {
            await expect(page).toHaveURL(`${base}${destination}`);
            await page.goto(`${base}/staff`, { waitUntil: "domcontentloaded" });
          }
          await expect(
            page.getByRole("navigation", { name: "منوی محیط حرفه‌ای" }),
          ).toBeVisible();
        }
        await login(
          "teacher",
          `/learning-core/content-review.html?unit=${language}.c.001&focus=cycle`,
        );
        await expect(
          page.getByRole("heading", { name: "منوی معلم ناظر", exact: true }),
        ).toBeVisible();
        await expect(
          page.getByRole("heading", { name: "منوی توسعه‌دهنده", exact: true }),
        ).toHaveCount(0);
        const teacherResponse = await context.request.get(
          `${base}${teacherPath}`,
          { maxRedirects: 0 },
        );
        assert.equal(teacherResponse.status(), 200);
        assert.match(teacherResponse.headers()["cache-control"], /no-store/u);
        assert.equal(
          (
            await context.request.get(`${base}/staff/developer`, {
              maxRedirects: 0,
            })
          ).status(),
          307,
        );
        await page.goto(`${base}/staff/progress`, {
          waitUntil: "domcontentloaded",
        });
        await expect(
          page.getByText("روش ارزیابی و منشأ تمرین‌ها", { exact: true }),
        ).toBeVisible();
        await expect(
          page.getByText(
            language === "en"
              ? /Counts use the latest response/u
              : /Die Zählung folgt/u,
          ),
        ).toBeVisible();
        const mirror = await context.newPage();
        await mirror.goto(`${base}/staff/settings`, {
          waitUntil: "domcontentloaded",
        });
        await expect(
          mirror.getByRole("navigation", { name: "منوی محیط حرفه‌ای" }),
        ).toBeVisible();
        const staticMirror = await context.newPage();
        await staticMirror.goto(`${base}/assessment-readiness.html`, {
          waitUntil: "domcontentloaded",
        });
        await page
          .getByRole("button", {
            name: "خروج و پنهان‌کردن بخش حرفه‌ای",
            exact: true,
          })
          .click();
        await expect(page).toHaveURL(`${base}/`);
        await expect(mirror).toHaveURL(`${base}/`);
        await expect(staticMirror).toHaveURL(`${base}/`);
        await mirror.close();
        await staticMirror.close();
        assert.equal(
          (
            await context.request.get(`${base}${teacherPath}`, {
              maxRedirects: 0,
            })
          ).status(),
          307,
        );

        await login("developer");
        await expect(
          page.getByRole("heading", { name: "منوی توسعه‌دهنده", exact: true }),
        ).toBeVisible();
        const cookies = await context.cookies();
        const session = cookies.find(
          (cookie) => cookie.name === "language-staff-session",
        );
        assert.ok(session?.httpOnly && session.sameSite === "Strict");
        if (base.startsWith("https:")) assert.equal(session.secure, true);
        await page.goto(`${base}/staff/developer`, {
          waitUntil: "domcontentloaded",
        });
        await expect(
          page.getByText("روش ارزیابی و منشأ تمرین‌ها", { exact: true }),
        ).toBeVisible();
        assert.equal(
          (
            await context.request.get(`${base}/roadmap.html`, {
              maxRedirects: 0,
            })
          ).status(),
          200,
        );
        await page
          .getByRole("button", {
            name: "خروج و پنهان‌کردن بخش حرفه‌ای",
            exact: true,
          })
          .click();
        await expect(page).toHaveURL(`${base}/`);
        await page.goto(`${base}/practice?notebook=1`, {
          waitUntil: "domcontentloaded",
        });
        await expect(page.locator("#practice-response")).toHaveValue(draft);
        await expect(page.locator(".practice-notebook")).not.toContainText(
          /Zählung|latest response/u,
        );
        await page.evaluate(async () => {
          if ("serviceWorker" in navigator) await navigator.serviceWorker.ready;
        });
        const cachedPrivate = await page.evaluate(async () => {
          const requests = (
            await Promise.all(
              (await caches.keys()).map(async (key) =>
                (await caches.open(key)).keys(),
              ),
            )
          ).flat();
          return requests
            .map((request) => new URL(request.url).pathname)
            .filter(
              (path) =>
                /^\/(staff|teacher|lehrkraft)(?:\/|$)/u.test(path) ||
                /roadmap\.html|assessment-benchmarks|assessment-readiness|content-review\.html|feedback-review\.html/u.test(
                  path,
                ),
            );
        });
        assert.deepEqual(cachedPrivate, []);
        await context.setOffline(true);
        const offline = await context.newPage();
        let failedOffline = false;
        try {
          await offline.goto(`${base}/staff/developer`, {
            waitUntil: "domcontentloaded",
            timeout: 8000,
          });
        } catch {
          failedOffline = true;
        }
        assert.equal(
          failedOffline,
          true,
          "Private workspace must not reopen from offline cache after logout",
        );
        await offline.close();
        await context.setOffline(false);
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
          learnerClean: true,
          rolesProtected: true,
          privateCacheEmpty: true,
          draftPreserved: true,
        });
        console.log(
          `${language} ${width}: learner/staff roles, logout, private cache and saved draft passed`,
        );
      } finally {
        await context.close();
      }
    }
  }
} catch (error) {
  let message =
    error instanceof Error ? (error.stack ?? error.message) : String(error);
  for (const value of Object.values(credentials))
    message = message.replaceAll(value, "[redacted]");
  console.error(message);
  process.exitCode = 1;
} finally {
  await browser.close();
}
console.log(JSON.stringify(report, null, 2));
