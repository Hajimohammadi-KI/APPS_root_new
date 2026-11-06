import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { randomBytes } from "node:crypto";

// این آزمون فقط مخزن QA سرور محلی را تغییر می‌دهد؛ هیچ حساب واقعی مالک تولید نمی‌شود.
const require = createRequire(
  resolve(
    import.meta.dirname,
    "../Apps/English/English-Automaticity/package.json",
  ),
);
const { chromium, expect } = require("@playwright/test");
const privateConfig = JSON.parse(
  readFileSync(
    resolve(
      import.meta.dirname,
      "../artifacts/private/language-staff-admin.json",
    ),
    "utf8",
  ),
);
const bases = [
  process.argv[2] ?? "http://127.0.0.1:3202",
  process.argv[3] ?? "http://127.0.0.1:3210",
];
if (
  bases.some(
    (base) => !["127.0.0.1", "localhost"].includes(new URL(base).hostname),
  )
)
  throw Error("Account mutation tests require isolated localhost QA servers");
const nonce = randomBytes(8).toString("hex");
const ownerEmail = `owner-${nonce}@example.invalid`;
const teacherEmail = `teacher-${nonce}@example.invalid`;
const developerEmail = `developer-${nonce}@example.invalid`;
const ownerPassword = randomBytes(24).toString("base64url");
const teacherPassword = randomBytes(24).toString("base64url");
const developerPassword = randomBytes(24).toString("base64url");
const nextPassword = randomBytes(24).toString("base64url");
const secrets = [
  privateConfig.setupSecret,
  ownerPassword,
  teacherPassword,
  developerPassword,
  nextPassword,
];
const browser = await chromium.launch({ channel: "msedge", headless: true });
mkdirSync(resolve(import.meta.dirname, "../artifacts/staff-accounts"), {
  recursive: true,
});

/** ایمیل و رمز را فقط به فرم محلی می‌دهد؛ خروجی، منوی تأییدشدهٔ همان نشست است. */
async function login(page, base, email, password) {
  await page.goto(base + "/staff");
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill(password);
  await page.locator('button[type="submit"]').click();
  await expect(page.locator('nav[aria-label] a[href="/staff"]')).toBeVisible();
}

try {
  // فقط سندِ صریحاً نام‌گذاری‌شدهٔ QA پاک می‌شود؛ مخزن واقعی و انتخاب ایمیل مالک دست‌نخورده‌اند.
  const qa = JSON.parse(
    readFileSync(
      resolve(
        import.meta.dirname,
        "../artifacts/private/language-staff-qa.json",
      ),
      "utf8",
    ),
  );
  assert.match(qa.pathname, /^language-staff\/qa-\d+\.json$/u);
  const blob = createRequire(
    resolve(import.meta.dirname, "../shared/learning-core/package.json"),
  )("@vercel/blob");
  const existing = await blob.get(qa.pathname, {
    access: "private",
    token: privateConfig.blobToken,
    useCache: false,
  });
  if (existing) {
    const metadata = await blob.head(qa.pathname, {
      token: privateConfig.blobToken,
    });
    assert.equal(existing.blob.etag.replace(/^W\//u, ""), metadata.etag);
    await blob.del(qa.pathname, {
      token: privateConfig.blobToken,
      ifMatch: metadata.etag,
    });
  }
  const ownerContext = await browser.newContext({
    viewport: { width: 1280, height: 1000 },
  });
  const page = await ownerContext.newPage();
  page.on("response", async (response) => {
    if (
      response.url().endsWith("/api/staff-accounts") &&
      response.request().method() === "POST" &&
      !response.ok()
    ) {
      const value = await response.json().catch(() => ({}));
      console.log(
        "Account mutation error:",
        response.status(),
        typeof value.error === "string" ? value.error : "unknown",
      );
    }
  });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(bases[0] + "/staff");
  await expect(
    page.getByRole("heading", { name: "Create owner account" }),
  ).toBeVisible();
  await page.locator('input[name="email"]').fill(ownerEmail);
  await page.locator('input[name="password"]').fill(ownerPassword);
  await page.locator('input[name="confirmation"]').fill(ownerPassword);
  await page.locator('input[name="setupKey"]').fill(privateConfig.setupSecret);
  await page.locator('button[type="submit"]').click();
  await expect(
    page.locator('a[href="/staff/developer/accounts"]'),
  ).toBeVisible();
  const setupAgain = await ownerContext.request.post(
    bases[0] + "/api/staff-setup",
    {
      headers: { origin: bases[0] },
      data: {
        email: ownerEmail,
        password: ownerPassword,
        setupKey: privateConfig.setupSecret,
      },
    },
  );
  assert.equal(setupAgain.status(), 409);

  // مالک نقش و رمز دو حساب تازه را تعیین می‌کند؛ نتیجه باید در هر دو اپ همان حساب مشترک باشد.
  for (const [email, password, role] of [
    [teacherEmail, teacherPassword, "teacher"],
    [developerEmail, developerPassword, "developer"],
  ]) {
    await page.goto(bases[0] + "/staff/developer/accounts");
    await page.locator('input[name="email"]').fill(email);
    await page.locator("select").nth(1).selectOption(role);
    await page.locator('input[name="password"]').fill(password);
    await page.locator('input[name="confirmation"]').fill(password);
    await page.locator('input[name="currentPassword"]').fill(ownerPassword);
    await page.locator('button[type="submit"]').click();
    await expect(page.getByRole("status")).toContainText("Saved for both apps");
  }
  const teacherContext = await browser.newContext();
  const teacher = await teacherContext.newPage();
  await login(teacher, bases[1], teacherEmail, teacherPassword);
  await expect(
    teacher.getByRole("heading", { name: "Menü für Lehrkräfte" }),
  ).toBeVisible();
  await expect(
    teacher.locator('a[href="/staff/developer/accounts"]'),
  ).toHaveCount(0);
  const teacherDenied = await teacherContext.request.get(
    bases[1] + "/api/staff-accounts",
  );
  assert.equal(teacherDenied.status(), 403);
  const developerContext = await browser.newContext();
  const developer = await developerContext.newPage();
  await login(developer, bases[0], developerEmail, developerPassword);
  assert.equal(
    (
      await developerContext.request.get(bases[0] + "/api/staff-accounts")
    ).status(),
    403,
  );
  await expect(
    developer.locator('a[href="/staff/developer/accounts"]'),
  ).toHaveCount(0);

  // کوکی به پورت وابسته نیست؛ زمینهٔ جدا، دو دستگاه/دامنهٔ مستقل را روی localhost شبیه‌سازی می‌کند.
  const germanOwnerContext = await browser.newContext();
  const germanOwner = await germanOwnerContext.newPage();
  await login(germanOwner, bases[1], ownerEmail, ownerPassword);
  await expect(
    germanOwner.locator('a[href="/staff/developer/accounts"]'),
  ).toBeVisible();
  const metadata = await ownerContext.request.get(
    bases[0] + "/api/staff-accounts",
  );
  const data = await metadata.json();
  assert.ok(!JSON.stringify(data).includes("passwordHash"));
  const ownerId = data.accounts.find(
    (account) => account.email === ownerEmail,
  ).id;
  await page.goto(bases[0] + "/staff/developer/accounts");
  await page.locator("select").first().selectOption("update");
  await page.locator("select").nth(1).selectOption(ownerId);
  await expect(page.locator('input[name="email"]')).toHaveValue(ownerEmail);
  await page.locator('input[name="password"]').fill(nextPassword);
  await page.locator('input[name="confirmation"]').fill(nextPassword);
  await page.locator('input[name="currentPassword"]').fill(ownerPassword);
  await page.locator('button[type="submit"]').click();
  await expect(page.getByRole("status")).toContainText("Saved for both apps");
  const staleSession = await germanOwnerContext.request.get(
    bases[1] + "/staff/settings",
    { maxRedirects: 0 },
  );
  assert.equal(staleSession.status(), 307);
  const oldLogin = await ownerContext.request.post(
    bases[0] + "/api/staff-session",
    {
      headers: { origin: bases[0] },
      data: { email: ownerEmail, password: ownerPassword },
    },
  );
  assert.equal(oldLogin.status(), 401);
  await login(germanOwner, bases[1], ownerEmail, nextPassword);

  // نمایش زبان/جهت و نبود شمارنده در همهٔ اندازه‌ها بررسی می‌شود؛ ذخیرهٔ یادگیرنده هرگز دست‌کاری نمی‌شود.
  for (const [index, base] of bases.entries()) {
    for (const width of [390, 1280]) {
      const context = await browser.newContext({
        viewport: { width, height: 1000 },
      });
      const guest = await context.newPage();
      await guest.goto(base + "/staff");
      await expect(guest.locator("main.staff-workspace")).toHaveAttribute(
        "lang",
        index === 0 ? "en" : "de",
      );
      await expect(guest.locator("main.staff-workspace")).toHaveAttribute(
        "dir",
        "ltr",
      );
      assert.ok(
        !/[\u0600-\u06ff]/u.test(
          await guest.locator("main.staff-workspace").innerText(),
        ),
      );
      await guest.goto(base + "/practice?notebook=1");
      const card = guest.locator(".practice-notebook");
      await expect(card).toBeVisible();
      assert.ok(!/\d+\s+(?:von|of)\s+\d+/u.test(await card.innerText()));
      await expect(card.locator("button,a").first()).toBeVisible();
      assert.ok(
        await guest.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      );
      await guest.screenshot({
        path: resolve(
          import.meta.dirname,
          `../artifacts/staff-accounts/${index === 0 ? "en" : "de"}-${width}.png`,
        ),
      });
      await context.close();
    }
  }
  assert.deepEqual(errors, []);
  await ownerContext.close();
  await germanOwnerContext.close();
  await teacherContext.close();
  await developerContext.close();
  console.log(
    "Owner setup, email login, shared roles, owner-only account management, password rotation, native language and notebook cleanup passed.",
  );
} catch (error) {
  let safe =
    error instanceof Error ? (error.stack ?? error.message) : String(error);
  for (const secret of secrets) safe = safe.replaceAll(secret, "[redacted]");
  console.error(safe);
  process.exitCode = 1;
} finally {
  await browser.close();
}
