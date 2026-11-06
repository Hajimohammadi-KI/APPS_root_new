import {
  createHash,
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";

export type StaffRole = "teacher" | "developer";
export interface StaffConfig {
  teacherPassword?: string;
  developerPassword?: string;
  sessionSecret?: string;
}
const cookieName = "language-staff-session";
const lifetime = 8 * 60 * 60;
const privateHeaders = {
  "Cache-Control": "private, no-store, max-age=0",
  Vary: "Cookie",
};

export function staffConfigFromEnvironment(): StaffConfig {
  return {
    ...(process.env.LANGUAGE_TEACHER_PASSWORD
      ? { teacherPassword: process.env.LANGUAGE_TEACHER_PASSWORD }
      : {}),
    ...(process.env.LANGUAGE_DEVELOPER_PASSWORD
      ? { developerPassword: process.env.LANGUAGE_DEVELOPER_PASSWORD }
      : {}),
    ...(process.env.LANGUAGE_STAFF_SESSION_SECRET
      ? { sessionSecret: process.env.LANGUAGE_STAFF_SESSION_SECRET }
      : {}),
  };
}
function passwordFor(role: StaffRole, config: StaffConfig): string | null {
  const value =
    role === "teacher" ? config.teacherPassword : config.developerPassword;
  return value &&
    value.length >= 12 &&
    config.sessionSecret &&
    config.sessionSecret.length >= 32
    ? value
    : null;
}
function signature(
  payload: string,
  role: StaffRole,
  config: StaffConfig,
): string | null {
  const password = passwordFor(role, config);
  if (!password || !config.sessionSecret) return null;
  // Rotating either the role password or server secret invalidates old sessions.
  return createHmac("sha256", config.sessionSecret)
    .update(`${role}\0${password}\0${payload}`)
    .digest("base64url");
}
function equal(a: string, b: string): boolean {
  const hash = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(hash(a), hash(b));
}
export function createStaffSession(
  role: StaffRole,
  config: StaffConfig,
  now = Date.now(),
): string {
  const payload = Buffer.from(
    JSON.stringify({
      role,
      expires: now + lifetime * 1000,
      nonce: randomBytes(16).toString("base64url"),
    }),
  ).toString("base64url");
  const signed = signature(payload, role, config);
  if (!signed) throw new Error("Staff access is not configured");
  return `${payload}.${signed}`;
}
export function readStaffSession(
  value: string | null | undefined,
  config: StaffConfig,
  now = Date.now(),
): { role: StaffRole } | null {
  if (!value || value.length > 1024) return null;
  const [payload, signed, extra] = value.split(".");
  if (!payload || !signed || extra) return null;
  try {
    const data: unknown = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    );
    if (!data || typeof data !== "object") return null;
    const fields = data as Record<string, unknown>;
    if (fields.role !== "teacher" && fields.role !== "developer") return null;
    if (
      typeof fields.expires !== "number" ||
      fields.expires <= now ||
      fields.expires > now + lifetime * 1000
    )
      return null;
    const expected = signature(payload, fields.role, config);
    return expected && equal(signed, expected) ? { role: fields.role } : null;
  } catch {
    return null;
  }
}
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
/** Shared with proxy, tests and SW policy. Only the login page stays public. */
export function requiredStaffRoles(path: string): readonly StaffRole[] | null {
  let decoded: string;
  try {
    decoded = path;
    for (let index = 0; index < 3; index++) {
      const next = decodeURIComponent(decoded);
      if (next === decoded) break;
      decoded = next;
    }
    decoded =
      new URL(decoded.replaceAll("\\", "/"), "https://staff.invalid").pathname
        .toLowerCase()
        .replace(/\/+$/u, "") || "/";
  } catch {
    return ["developer"];
  }
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
    ].includes(decoded)
  )
    return ["developer"];
  return null;
}
export function protectStaffRequest(
  request: Request,
  config: StaffConfig,
  now = Date.now(),
): Response | null {
  const url = new URL(request.url);
  const roles = requiredStaffRoles(url.pathname);
  if (!roles) return null;
  const session = readStaffSession(sessionCookie(request), config, now);
  if (session && roles.includes(session.role)) return null;
  if (url.pathname.endsWith(".json") || url.pathname.startsWith("/api/"))
    return Response.json(
      { error: "staff_access_required" },
      { status: session ? 403 : 401, headers: privateHeaders },
    );
  const target = new URL("/staff", url);
  target.searchParams.set("returnTo", url.pathname + url.search);
  return new Response(null, {
    status: 307,
    headers: { ...privateHeaders, Location: target.href },
  });
}
const attempts = new Map<string, { start: number; count: number }>();
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
async function readBody(request: Request): Promise<unknown> {
  if (!request.body) throw new Error("Missing body");
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
        throw new Error("Body too large");
      }
      chunks.push(item.value);
    }
  } finally {
    reader.releaseLock();
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown;
}
export async function staffSessionResponse(
  request: Request,
  config: StaffConfig = staffConfigFromEnvironment(),
  now = Date.now(),
): Promise<Response> {
  const json = (body: unknown, status = 200, cookie?: string) =>
    Response.json(body, {
      status,
      headers: {
        ...privateHeaders,
        ...(cookie ? { "Set-Cookie": cookie } : {}),
      },
    });
  if (request.method === "GET")
    return json({
      role: readStaffSession(sessionCookie(request), config, now)?.role ?? null,
      configured:
        !!passwordFor("teacher", config) || !!passwordFor("developer", config),
    });
  const origin = request.headers.get("origin");
  if (
    origin !== new URL(request.url).origin ||
    request.headers.get("sec-fetch-site") === "cross-site"
  )
    return json({ error: "same_origin_required" }, 403);
  const attributes = `Path=/; HttpOnly; SameSite=Strict${new URL(request.url).protocol === "https:" ? "; Secure" : ""}`;
  if (request.method === "DELETE")
    return json(
      { role: null },
      200,
      `${cookieName}=; Max-Age=0; ${attributes}`,
    );
  if (request.method !== "POST")
    return json({ error: "method_not_allowed" }, 405);
  if (throttled(request, now)) return json({ error: "try_later" }, 429);
  let body: unknown;
  try {
    body = await readBody(request);
  } catch {
    return json({ error: "invalid_request" }, 400);
  }
  if (!body || typeof body !== "object")
    return json({ error: "invalid_request" }, 400);
  const data = body as Record<string, unknown>;
  if (
    (data.role !== "teacher" && data.role !== "developer") ||
    typeof data.password !== "string" ||
    data.password.length > 512
  )
    return json({ error: "invalid_request" }, 400);
  const expected = passwordFor(data.role, config);
  if (!expected) return json({ error: "not_configured" }, 503);
  if (!equal(data.password, expected))
    return json({ error: "invalid_credentials" }, 401);
  let redirectTo = "/staff";
  if (
    typeof data.returnTo === "string" &&
    data.returnTo.startsWith("/") &&
    !data.returnTo.startsWith("//")
  ) {
    const target = new URL(data.returnTo, request.url);
    const roles = requiredStaffRoles(target.pathname);
    if (
      target.origin === new URL(request.url).origin &&
      roles?.includes(data.role)
    )
      redirectTo = target.pathname + target.search;
  }
  return json(
    { role: data.role, redirectTo },
    200,
    `${cookieName}=${createStaffSession(data.role, config, now)}; Max-Age=${lifetime}; ${attributes}`,
  );
}
