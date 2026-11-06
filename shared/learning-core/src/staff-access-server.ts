import {
  createHash,
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";
import {
  createBlobStaffAccountStore,
  createStaffAccount,
  hashStaffPassword,
  normalizeStaffEmail,
  verifyStaffPassword,
  StaffAccountConflictError,
  StaffAccountValidationError,
  type StaffAccount,
  type StaffAccountDocument,
  type StaffAccountStore,
  type StaffRole,
} from "./staff-account-store";

export type { StaffRole } from "./staff-account-store";
export interface StaffConfig {
  sessionSecret?: string;
  setupSecret?: string;
  store?: StaffAccountStore;
}
export interface StaffSession {
  id: string;
  email: string;
  role: StaffRole;
  isOwner: boolean;
  version: number;
  expiresAt: number;
}
const cookieName = "language-staff-session";
const lifetime = 8 * 60 * 60;
const privateHeaders = {
  "Cache-Control": "private, no-store, max-age=0",
  Vary: "Cookie",
};
// حساب ناشناخته هم هزینهٔ scrypt می‌پردازد تا اختلاف زمان، فهرست ایمیل‌ها را آشکار نکند.
const unknownAccountHash = `scrypt$32768$8$1$${Buffer.alloc(32).toString("base64url")}$${Buffer.alloc(64).toString("base64url")}`;
type State = { document: StaffAccountDocument; etag: string } | null;

/** ورودی درخواست پراکسی است؛ خروجی مبدأ عمومی برای جلوگیری از خطای localhost و بررسی CSRF است. */
function publicOrigin(request: Request): string {
  const url = new URL(request.url);
  const host = request.headers.get("host");
  const forwarded = request.headers
    .get("x-forwarded-proto")
    ?.split(",")[0]
    ?.trim();
  const protocol = forwarded === "https" ? "https:" : url.protocol;
  return host && /^[a-zA-Z0-9.[\]:-]+$/u.test(host)
    ? new URL(`${protocol}//${host}`).origin
    : url.origin;
}
/** فقط متغیرهای خصوصی سرور خوانده می‌شوند؛ رمزهای قدیمیِ مشترک هیچ مسیر ورود جایگزینی ندارند. */
export function staffConfigFromEnvironment(): StaffConfig {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  return {
    ...(process.env.LANGUAGE_STAFF_SESSION_SECRET
      ? { sessionSecret: process.env.LANGUAGE_STAFF_SESSION_SECRET }
      : {}),
    ...(process.env.LANGUAGE_STAFF_SETUP_SECRET
      ? { setupSecret: process.env.LANGUAGE_STAFF_SETUP_SECRET }
      : {}),
    ...(token
      ? {
          store: createBlobStaffAccountStore(
            token,
            process.env.LANGUAGE_STAFF_ACCOUNTS_PATH,
          ),
        }
      : {}),
  };
}
/** مقایسهٔ رشته‌ها پس از هش ثابت‌اندازه انجام می‌شود تا زمان مقایسه طول راز را لو ندهد. */
function equal(a: string, b: string): boolean {
  const digest = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(digest(a), digest(b));
}
/** امضای نشست به کلید خصوصی سرور وابسته است؛ کلید کوتاه یا مفقود عمداً پذیرفته نمی‌شود. */
function signature(payload: string, config: StaffConfig): string | null {
  return config.sessionSecret && config.sessionSecret.length >= 32
    ? createHmac("sha256", config.sessionSecret)
        .update(payload)
        .digest("base64url")
    : null;
}
/** حساب و نسخهٔ امنیتی وارد کوکی امضاشده می‌شوند؛ ایمیل، رمز و هش رمز داخل کوکی نیستند. */
export function createStaffSession(
  account: StaffAccount,
  config: StaffConfig,
  now = Date.now(),
): string {
  const payload = Buffer.from(
    JSON.stringify({
      id: account.id,
      version: account.version,
      expires: now + lifetime * 1000,
      nonce: randomBytes(16).toString("base64url"),
    }),
  ).toString("base64url");
  const signed = signature(payload, config);
  if (!signed) throw new Error("staff_not_configured");
  return `${payload}.${signed}`;
}
/** سند جاری حساب‌ها تنها مرجع مجوز است؛ نبود مخزن یا کلید امضا خطاست و هرگز به حافظهٔ محلی برنمی‌گردد. */
async function loadState(config: StaffConfig): Promise<State> {
  if (!config.store || !signature("configuration-check", config))
    throw new Error("staff_storage_unavailable");
  return config.store.read();
}
/** کوکی و سندِ خوانده‌شده را تطبیق می‌دهد؛ تغییر نسخه یا غیرفعال‌شدن حساب همهٔ نشست‌های قدیمی را می‌بندد. */
function sessionFromState(
  value: string | null | undefined,
  state: State,
  config: StaffConfig,
  now: number,
): StaffSession | null {
  if (!value || value.length > 1024) return null;
  const [payload, signed, extra] = value.split(".");
  if (!payload || !signed || extra) return null;
  const expected = signature(payload, config);
  if (!expected || !equal(signed, expected)) return null;
  try {
    const data: unknown = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    );
    if (!data || typeof data !== "object") return null;
    const fields = data as Record<string, unknown>;
    if (
      typeof fields.id !== "string" ||
      !Number.isSafeInteger(fields.version) ||
      typeof fields.expires !== "number" ||
      !Number.isFinite(fields.expires) ||
      fields.expires <= now ||
      fields.expires > now + lifetime * 1000
    )
      return null;
    const account = state?.document.accounts.find(
      (candidate) =>
        candidate.id === fields.id &&
        candidate.active &&
        candidate.version === fields.version,
    );
    return account
      ? {
          id: account.id,
          email: account.email,
          role: account.role,
          isOwner: account.isOwner,
          version: account.version,
          expiresAt: fields.expires,
        }
      : null;
  } catch {
    return null;
  }
}
/** برای بررسی مستقل نشست، سند خصوصی بدون کش خوانده می‌شود؛ خطای مخزن به فراخواننده منتقل می‌شود. */
export async function readStaffSession(
  value: string | null | undefined,
  config: StaffConfig,
  now = Date.now(),
): Promise<StaffSession | null> {
  return sessionFromState(value, await loadState(config), config, now);
}
/** فقط کوکی HttpOnly نشست استخراج می‌شود؛ هیچ انتخاب یا دادهٔ زبان‌آموز خوانده یا نوشته نمی‌شود. */
function sessionCookie(request: Request): string | null {
  return (
    request.headers
      .get("cookie")
      ?.split(";")
      .map((part) => part.trim())
      .find((part) => part.startsWith(`${cookieName}=`))
      ?.slice(cookieName.length + 1) ?? null
  );
}
const both: readonly StaffRole[] = ["teacher", "developer"];
/** رمزگشایی چندباره و یکسان‌سازی مسیر مانع دورزدن کنترل با حروف بزرگ یا اسلش رمزگذاری‌شده می‌شود. */
function canonicalPath(path: string): string | null {
  try {
    let decoded = path;
    for (let index = 0; index < 3; index++) {
      const next = decodeURIComponent(decoded);
      if (next === decoded) break;
      decoded = next;
    }
    return (
      new URL(decoded.replaceAll("\\", "/"), "https://staff.invalid").pathname
        .toLowerCase()
        .replace(/\/+$/u, "") || "/"
    );
  } catch {
    return null;
  }
}
/** نقش لازم برای مسیر را برمی‌گرداند؛ null یعنی مسیر یادگیری یا صفحهٔ عمومی ورود است. */
export function requiredStaffRoles(path: string): readonly StaffRole[] | null {
  const decoded = canonicalPath(path);
  if (decoded === null) return ["developer"];
  if (decoded === "/staff") return null;
  if (/^\/staff\/developer(?:\/|$)/u.test(decoded)) return ["developer"];
  if (
    /^\/staff\//u.test(decoded) ||
    /^\/(teacher|lehrkraft)(?:\/|$)/u.test(decoded)
  )
    return both;
  if (
    [
      "/learning-core/content-review.html",
      "/assessment-readiness.html",
      "/assessment-readiness.json",
    ].includes(decoded)
  )
    return both;
  if (
    [
      "/roadmap.html",
      "/assessment-benchmarks.html",
      "/assessment-benchmarks.json",
      "/learning-core/feedback-review.html",
      "/api/learner-feedback/review",
      "/api/staff-accounts",
    ].includes(decoded)
  )
    return ["developer"];
  return null;
}
/** پاسخ‌های احراز هویت عمداً خصوصی و غیرقابل کش‌اند؛ متن خطای داخلی یا راز در خروجی برنمی‌گردد. */
function json(body: unknown, status = 200, cookie?: string): Response {
  return Response.json(body, {
    status,
    headers: { ...privateHeaders, ...(cookie ? { "Set-Cookie": cookie } : {}) },
  });
}
/** مسیرهای حرفه‌ای را پیش از رندر محافظت می‌کند؛ حتی نقش توسعه‌دهنده برای مدیریت حساب بدون مالکیت کافی نیست. */
export async function protectStaffRequest(
  request: Request,
  config: StaffConfig,
  now = Date.now(),
): Promise<Response | null> {
  const url = new URL(request.url);
  const roles = requiredStaffRoles(url.pathname);
  if (!roles) return null;
  let session: StaffSession | null = null;
  if (sessionCookie(request)) {
    try {
      session = await readStaffSession(sessionCookie(request), config, now);
    } catch {
      return json({ error: "storage_unavailable" }, 503);
    }
  }
  const ownerPath =
    canonicalPath(url.pathname)?.startsWith("/staff/developer/accounts") ||
    canonicalPath(url.pathname) === "/api/staff-accounts";
  if (
    session &&
    roles.includes(session.role) &&
    (!ownerPath || session.isOwner)
  )
    return null;
  if (url.pathname.endsWith(".json") || url.pathname.startsWith("/api/"))
    return json({ error: "staff_access_required" }, session ? 403 : 401);
  const target = new URL("/staff", publicOrigin(request));
  target.searchParams.set("returnTo", url.pathname + url.search);
  return new Response(null, {
    status: 307,
    headers: { ...privateHeaders, Location: target.href },
  });
}
const attempts = new Map<string, { start: number; count: number }>();
/** محدودیت کوتاه‌مدت IP و کل نمونهٔ سرور، هزینهٔ حدس رمز و scrypt را پیش از پردازش کاهش می‌دهد. */
function throttled(request: Request, now: number): boolean {
  for (const [key, value] of attempts)
    if (now - value.start > 60_000) attempts.delete(key);
  const key = createHash("sha256")
    .update(
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local",
    )
    .digest("hex");
  const global = attempts.get("all") ?? { start: now, count: 0 };
  const local = attempts.get(key) ?? { start: now, count: 0 };
  global.count++;
  local.count++;
  attempts.set("all", global);
  if (attempts.size < 1000 || attempts.has(key)) attempts.set(key, local);
  return global.count > 60 || local.count > 10;
}
/** فقط درخواست تغییرِ هم‌مبدأ پذیرفته می‌شود تا فرم یا اسکریپت سایت دیگر نتواند ورود یا حساب را تغییر دهد. */
function sameOrigin(request: Request): boolean {
  return (
    request.headers.get("origin") === publicOrigin(request) &&
    request.headers.get("sec-fetch-site") !== "cross-site"
  );
}
/** بدنه به چهار کیلوبایت محدود است؛ از انباشت JSON بزرگ در ورود و مدیریت حساب جلوگیری می‌کند. */
async function readBody(request: Request): Promise<Record<string, unknown>> {
  if (!request.body) throw new StaffAccountValidationError("invalid_request");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  try {
    for (;;) {
      const item = await reader.read();
      if (item.done) break;
      bytes += item.value.byteLength;
      if (bytes > 4096) {
        await reader.cancel();
        throw new StaffAccountValidationError("invalid_request");
      }
      chunks.push(item.value);
    }
  } finally {
    reader.releaseLock();
  }
  let body: unknown;
  try {
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw new StaffAccountValidationError("invalid_request");
  }
  if (!body || typeof body !== "object" || Array.isArray(body))
    throw new StaffAccountValidationError("invalid_request");
  return body as Record<string, unknown>;
}
/** ویژگی‌های کوکی به مبدأ عمومی وابسته‌اند؛ Secure فقط در HTTPS فعال و دسترسی جاوااسکریپت همیشه بسته است. */
function cookieAttributes(request: Request): string {
  return `Path=/; HttpOnly; SameSite=Strict${publicOrigin(request).startsWith("https:") ? "; Secure" : ""}`;
}
/** یک نشست تازه صادر می‌کند؛ در تغییر رمز خود مالک، همین پاسخ از قفل‌شدن نشست جاری جلوگیری می‌کند. */
function issueCookie(
  request: Request,
  account: StaffAccount,
  config: StaffConfig,
  now: number,
): string {
  return `${cookieName}=${createStaffSession(account, config, now)}; Max-Age=${lifetime}; ${cookieAttributes(request)}`;
}
/** فقط متادیتای قابل نمایش را می‌سازد؛ هش رمز و کلیدها هرگز در فهرست مدیریت صادر نمی‌شوند. */
function accountMetadata(account: StaffAccount) {
  return {
    id: account.id,
    email: account.email,
    role: account.role,
    isOwner: account.isOwner,
    active: account.active,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
  };
}
/** خطای اعتبارسنجی یا تعارض با کد قابل فهم UI برمی‌گردد؛ خطای مخزن همواره دسترسی را می‌بندد. */
function failure(error: unknown): Response {
  if (error instanceof StaffAccountValidationError)
    return json({ error: error.message }, 400);
  if (error instanceof StaffAccountConflictError)
    return json({ error: "account_conflict" }, 409);
  return json({ error: "storage_unavailable" }, 503);
}
/** GET وضعیت نشست، POST ورود ایمیلی و DELETE خروج را اجرا می‌کند؛ نقش از سند حساب تعیین می‌شود نه ورودی کاربر. */
export async function staffSessionResponse(
  request: Request,
  config: StaffConfig = staffConfigFromEnvironment(),
  now = Date.now(),
): Promise<Response> {
  if (request.method !== "GET" && !sameOrigin(request))
    return json({ error: "same_origin_required" }, 403);
  if (request.method === "DELETE")
    return json(
      { role: null },
      200,
      `${cookieName}=; Max-Age=0; ${cookieAttributes(request)}`,
    );
  if (request.method !== "GET" && request.method !== "POST")
    return json({ error: "method_not_allowed" }, 405);
  if (request.method === "POST" && throttled(request, now))
    return json({ error: "try_later" }, 429);
  try {
    const state = await loadState(config);
    if (request.method === "GET") {
      const session = sessionFromState(
        sessionCookie(request),
        state,
        config,
        now,
      );
      return json({
        role: session?.role ?? null,
        email: session?.email ?? null,
        isOwner: session?.isOwner ?? false,
        expiresAt: session?.expiresAt ?? null,
        configured: !!state,
        setupAvailable:
          !state && !!config.setupSecret && config.setupSecret.length >= 32,
      });
    }
    const data = await readBody(request);
    if (
      typeof data.email !== "string" ||
      typeof data.password !== "string" ||
      data.password.length > 128
    )
      return json({ error: "invalid_request" }, 400);
    const email = normalizeStaffEmail(data.email);
    const account = state?.document.accounts.find(
      (candidate) => candidate.email === email && candidate.active,
    );
    const passwordMatches = await verifyStaffPassword(
      data.password,
      account?.passwordHash ?? unknownAccountHash,
    );
    if (!account || !passwordMatches)
      return json({ error: "invalid_credentials" }, 401);
    let redirectTo = "/staff";
    if (
      typeof data.returnTo === "string" &&
      data.returnTo.startsWith("/") &&
      !data.returnTo.startsWith("//")
    ) {
      const target = new URL(data.returnTo, publicOrigin(request));
      const roles = requiredStaffRoles(target.pathname);
      if (
        target.origin === publicOrigin(request) &&
        roles?.includes(account.role) &&
        (!canonicalPath(target.pathname)?.startsWith(
          "/staff/developer/accounts",
        ) ||
          account.isOwner)
      )
        redirectTo = target.pathname + target.search;
    }
    return json(
      {
        role: account.role,
        email: account.email,
        isOwner: account.isOwner,
        redirectTo,
      },
      200,
      issueCookie(request, account, config, now),
    );
  } catch (error) {
    return failure(error);
  }
}
/** ایجاد اولین مالک فقط با کلید خصوصی راه‌اندازی و مخزن واقعاً خالی مجاز است؛ نوشتن CAS راه‌اندازی هم‌زمان را رد می‌کند. */
export async function staffSetupResponse(
  request: Request,
  config: StaffConfig = staffConfigFromEnvironment(),
  now = Date.now(),
): Promise<Response> {
  if (!sameOrigin(request)) return json({ error: "same_origin_required" }, 403);
  if (request.method !== "POST")
    return json({ error: "method_not_allowed" }, 405);
  if (throttled(request, now)) return json({ error: "try_later" }, 429);
  try {
    const data = await readBody(request);
    if (!config.setupSecret || config.setupSecret.length < 32)
      return json({ error: "setup_unavailable" }, 503);
    if (
      typeof data.setupKey !== "string" ||
      data.setupKey.length > 512 ||
      !equal(data.setupKey, config.setupSecret)
    )
      return json({ error: "invalid_credentials" }, 401);
    const state = await loadState(config);
    if (state) return json({ error: "already_configured" }, 409);
    if (typeof data.email !== "string" || typeof data.password !== "string")
      return json({ error: "invalid_request" }, 400);
    const owner = await createStaffAccount(
      {
        email: data.email,
        password: data.password,
        role: "developer",
        isOwner: true,
      },
      now,
    );
    await config.store!.write({ schemaVersion: 1, accounts: [owner] }, null);
    return json(
      {
        role: owner.role,
        email: owner.email,
        isOwner: true,
        redirectTo: "/staff/developer/accounts",
      },
      200,
      issueCookie(request, owner, config, now),
    );
  } catch (error) {
    return failure(error);
  }
}
/** مالک پس از تأیید رمز جاری حساب می‌سازد یا تغییر می‌دهد؛ CAS جلوی بازنویسی هم‌زمان و نسخهٔ امنیتی جلوی نشست قدیمی را می‌گیرد. */
export async function staffAccountsResponse(
  request: Request,
  config: StaffConfig = staffConfigFromEnvironment(),
  now = Date.now(),
): Promise<Response> {
  if (request.method !== "GET" && !sameOrigin(request))
    return json({ error: "same_origin_required" }, 403);
  if (request.method !== "GET" && request.method !== "POST")
    return json({ error: "method_not_allowed" }, 405);
  if (request.method === "POST" && throttled(request, now))
    return json({ error: "try_later" }, 429);
  try {
    const state = await loadState(config);
    const session = sessionFromState(
      sessionCookie(request),
      state,
      config,
      now,
    );
    if (!session) return json({ error: "staff_access_required" }, 401);
    if (!session.isOwner) return json({ error: "owner_required" }, 403);
    if (request.method === "GET")
      return json({ accounts: state!.document.accounts.map(accountMetadata) });
    const data = await readBody(request);
    const owner = state!.document.accounts.find(
      (account) => account.id === session.id,
    )!;
    if (
      typeof data.currentPassword !== "string" ||
      !(await verifyStaffPassword(data.currentPassword, owner.passwordHash))
    )
      return json({ error: "invalid_credentials" }, 401);
    const accounts = state!.document.accounts;
    let changed: StaffAccount;
    if (data.action === "create") {
      if (accounts.length >= 20) return json({ error: "account_limit" }, 400);
      if (
        typeof data.email !== "string" ||
        typeof data.password !== "string" ||
        (data.role !== "teacher" && data.role !== "developer")
      )
        return json({ error: "invalid_request" }, 400);
      changed = await createStaffAccount(
        { email: data.email, password: data.password, role: data.role },
        now,
      );
      if (accounts.some((account) => account.email === changed.email))
        return json({ error: "duplicate_email" }, 409);
      accounts.push(changed);
    } else if (data.action === "update" || data.action === "disable") {
      if (typeof data.id !== "string")
        return json({ error: "invalid_request" }, 400);
      const index = accounts.findIndex((account) => account.id === data.id);
      const original = accounts[index];
      if (!original) return json({ error: "account_not_found" }, 404);
      if (
        original.isOwner &&
        (data.action === "disable" ||
          (data.role !== undefined && data.role !== "developer") ||
          data.active === false)
      )
        return json({ error: "owner_protected" }, 400);
      if (
        data.role !== undefined &&
        data.role !== "teacher" &&
        data.role !== "developer"
      )
        return json({ error: "invalid_role" }, 400);
      if (data.active !== undefined && typeof data.active !== "boolean")
        return json({ error: "invalid_request" }, 400);
      changed = {
        ...original,
        ...(data.email === undefined
          ? {}
          : { email: normalizeStaffEmail(data.email) }),
        ...(data.role === undefined ? {} : { role: data.role }),
        ...(data.active === undefined ? {} : { active: data.active }),
        ...(data.action === "disable" ? { active: false } : {}),
        version: original.version + 1,
        updatedAt: now,
      };
      if (data.password !== undefined) {
        if (typeof data.password !== "string")
          return json({ error: "invalid_password" }, 400);
        changed.passwordHash = await hashStaffPassword(data.password);
      }
      if (
        accounts.some(
          (account) =>
            account.id !== changed.id && account.email === changed.email,
        )
      )
        return json({ error: "duplicate_email" }, 409);
      accounts[index] = changed;
    } else return json({ error: "invalid_request" }, 400);
    await config.store!.write({ schemaVersion: 1, accounts }, state!.etag);
    return json(
      { accounts: accounts.map(accountMetadata) },
      200,
      changed.id === owner.id
        ? issueCookie(request, changed, config, now)
        : undefined,
    );
  } catch (error) {
    return failure(error);
  }
}
