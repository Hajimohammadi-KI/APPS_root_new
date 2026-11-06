import { expect, test } from "bun:test";
import { createStaffSession, readStaffSession, requiredStaffRoles, staffSessionResponse, protectStaffRequest, staffAccountsResponse, staffSetupResponse, type StaffConfig } from "./staff-access-server";
import { createStaffAccount, type StaffAccountDocument, type StaffAccountStore, StaffAccountConflictError } from "./staff-account-store";
const now = 1_800_000_000_000;
const password = "private-test-password-123456";
const secret = "test-only-session-secret-at-least-thirty-two-characters";
let requestSequence = 0;
function request(path: string, body?: unknown, cookie?: string, origin = "https://app.test") {
  return new Request(`https://app.test${path}`, { method: body === undefined ? "GET" : "POST", headers: { origin, "content-type": "application/json", "x-forwarded-for": `test-${requestSequence++}`, ...(cookie ? { cookie } : {}) }, ...(body === undefined ? {} : { body: typeof body === "string" ? body : JSON.stringify(body) }) });
}
function memoryStore(initial: StaffAccountDocument | null = null) {
  let document = initial;
  let revision = 0;
  const store: StaffAccountStore = {
    async read() { return document ? { document: structuredClone(document), etag: `${revision}` } : null; },
    async write(next, expected) { if (expected !== (document ? `${revision}` : null)) throw new StaffAccountConflictError("conflict"); document = structuredClone(next); revision++; },
  };
  return { store, value: () => document };
}
async function fixture() {
  const owner = await createStaffAccount({ email: "owner@example.test", password, role: "developer", isOwner: true }, now);
  const teacher = await createStaffAccount({ email: "teacher@example.test", password, role: "teacher" }, now);
  const memory = memoryStore({ schemaVersion: 1, accounts: [owner, teacher] });
  const config: StaffConfig = { sessionSecret: secret, store: memory.store };
  return { owner, teacher, memory, config };
}
test("signed account sessions reject tampering, expiry, rotation and disabled accounts", async () => {
  const { owner, teacher, config, memory } = await fixture();
  const token = createStaffSession(teacher, config, now);
  expect((await readStaffSession(token, config, now))?.role).toBe("teacher");
  expect(await readStaffSession(token + "x", config, now)).toBeNull();
  expect(await readStaffSession(token, config, now + 9 * 3600_000)).toBeNull();
  expect(await readStaffSession(token, { ...config, sessionSecret: "different-long-secret-value-12345678" }, now)).toBeNull();
  const [payload, signature] = token.split("."); const fields = JSON.parse(Buffer.from(payload!, "base64url").toString()); fields.id = owner.id;
  expect(await readStaffSession(`${Buffer.from(JSON.stringify(fields)).toString("base64url")}.${signature}`, config, now)).toBeNull();
  const current = (await memory.store.read())!; current.document.accounts[1]!.version++; await memory.store.write(current.document, current.etag);
  expect(await readStaffSession(token, config, now)).toBeNull();
  const disabled = createStaffSession({ ...teacher, version: 2 }, config, now); const next = (await memory.store.read())!; next.document.accounts[1]!.active = false; await memory.store.write(next.document, next.etag);
  expect(await readStaffSession(disabled, config, now)).toBeNull();
});
test("learner pages stay public and professional access comes from the stored role", async () => {
  const { teacher, config } = await fixture();
  expect(requiredStaffRoles("/practice")).toBeNull(); expect(requiredStaffRoles("/staff")).toBeNull();
  for (const path of ["/staff/developer", "/roadmap.html", "/staff%252Fdeveloper", "/ROADMAP.HTML", "/api/staff-accounts"]) expect(requiredStaffRoles(path)).toEqual(["developer"]);
  expect((await protectStaffRequest(request("/teacher"), config, now))?.status).toBe(307);
  const cookie = `language-staff-session=${createStaffSession(teacher, config, now)}`;
  expect(await protectStaffRequest(request("/teacher", undefined, cookie), config, now)).toBeNull();
  expect((await protectStaffRequest(request("/roadmap.html", undefined, cookie), config, now))?.status).toBe(307);
  const response = await staffSessionResponse(request("/api/staff-session", { email: " TEACHER@example.test ", password, role: "developer", returnTo: "/roadmap.html" }), config, now);
  expect(await response.json()).toMatchObject({ role: "teacher", email: "teacher@example.test", isOwner: false, redirectTo: "/staff" });
});
test("email login rejects legacy role-only, invalid, cross-origin, oversized and repeated guesses", async () => {
  const { config } = await fixture();
  for (const body of [{ role: "developer", password }, "not json", "x".repeat(5000)]) expect((await staffSessionResponse(request("/api/staff-session", body), config, now)).status).toBe(400);
  const crossSite = await staffSessionResponse(request("/api/staff-session", { email: "owner@example.test", password }, undefined, "https://evil.test"), config, now);
  expect(crossSite.status).toBe(403); expect(crossSite.headers.get("set-cookie")).toBeNull();
  expect((await staffSessionResponse(request("/api/staff-session", { email: "owner@example.test", password: "wrong" }), config, now)).status).toBe(401);
  for (let index = 0; index < 11; index++) {
    const guessing = new Request("https://app.test/api/staff-session", { method: "POST", headers: { origin: "https://app.test", "x-forwarded-for": "repeated-guesses" }, body: JSON.stringify({ email: "unknown@example.test", password: "wrong" }) });
    expect((await staffSessionResponse(guessing, config, now + 120_000)).status).toBe(index < 10 ? 401 : 429);
  }
});
test("login sets private HttpOnly cookie, logout clears it and public Host controls origin", async () => {
  const { config } = await fixture();
  const response = await staffSessionResponse(new Request("http://localhost:3000/api/staff-session", { method: "POST", headers: { host: "app.test", origin: "https://app.test", "x-forwarded-proto": "https", "x-forwarded-for": "public-host" }, body: JSON.stringify({ email: "owner@example.test", password, returnTo: "https://evil.test" }) }), config, now + 300_000);
  expect(response.status).toBe(200); for (const value of ["HttpOnly", "Secure", "SameSite=Strict"]) expect(response.headers.get("set-cookie")).toContain(value);
  expect(response.headers.get("cache-control")).toContain("no-store"); expect(await response.json()).toMatchObject({ role: "developer", isOwner: true, redirectTo: "/staff" });
  const logout = await staffSessionResponse(new Request("https://app.test/api/staff-session", { method: "DELETE", headers: { origin: "https://app.test" } }), config, now); expect(logout.headers.get("set-cookie")).toContain("Max-Age=0");
});
test("storage outage fails closed without legacy-password fallback", async () => {
  const unavailable: StaffConfig = { sessionSecret: secret, store: { async read() { throw new Error("offline"); }, async write() { throw new Error("offline"); } } };
  expect((await staffSessionResponse(request("/api/staff-session"), unavailable, now)).status).toBe(503); expect((await protectStaffRequest(request("/teacher"), unavailable, now))?.status).toBe(503); expect(await protectStaffRequest(request("/practice"), unavailable, now)).toBeNull();
});
test("only the owner can list or mutate accounts after current-password reauthentication", async () => {
  const { owner, teacher, config } = await fixture();
  const ownerCookie = `language-staff-session=${createStaffSession(owner, config, now)}`; const teacherCookie = `language-staff-session=${createStaffSession(teacher, config, now)}`;
  expect((await staffAccountsResponse(request("/api/staff-accounts"), config, now)).status).toBe(401); expect((await staffAccountsResponse(request("/api/staff-accounts", undefined, teacherCookie), config, now)).status).toBe(403);
  const listing = await staffAccountsResponse(request("/api/staff-accounts", undefined, ownerCookie), config, now); const text = await listing.text(); expect(text).toContain("owner@example.test"); expect(text).not.toContain("passwordHash"); expect(text).not.toContain("scrypt");
  expect((await staffAccountsResponse(request("/api/staff-accounts", { action: "create", email: "new@example.test", password, role: "teacher", currentPassword: "wrong" }, ownerCookie), config, now)).status).toBe(401);
  expect((await staffAccountsResponse(request("/api/staff-accounts", { action: "create", email: "new@example.test", password, role: "teacher", currentPassword: password }, ownerCookie), config, now)).status).toBe(200);
  expect((await staffAccountsResponse(request("/api/staff-accounts", { action: "create", email: "NEW@example.test", password, role: "teacher", currentPassword: password }, ownerCookie), config, now)).status).toBe(409);
  expect((await staffAccountsResponse(request("/api/staff-accounts", { action: "disable", id: owner.id, currentPassword: password }, ownerCookie), config, now)).status).toBe(400);
  expect((await staffAccountsResponse(request("/api/staff-accounts", { action: "update", id: owner.id, role: "teacher", currentPassword: password }, ownerCookie), config, now)).status).toBe(400);
});
test("password changes invalidate old sessions and refresh the owner's current session", async () => {
  const { owner, teacher, config } = await fixture(); const ownerCookie = `language-staff-session=${createStaffSession(owner, config, now)}`; const teacherToken = createStaffSession(teacher, config, now);
  expect((await staffAccountsResponse(request("/api/staff-accounts", { action: "update", id: teacher.id, password: "new-private-password-1234", currentPassword: password }, ownerCookie), config, now)).status).toBe(200); expect(await readStaffSession(teacherToken, config, now)).toBeNull();
  const ownChange = await staffAccountsResponse(request("/api/staff-accounts", { action: "update", id: owner.id, email: "renamed@example.test", password: "new-owner-password-1234", currentPassword: password }, ownerCookie), config, now);
  expect(ownChange.status).toBe(200); expect(ownChange.headers.get("set-cookie")).toContain("HttpOnly"); const nextToken = ownChange.headers.get("set-cookie")!.split(";")[0]!.split("=")[1]!;
  expect((await readStaffSession(nextToken, config, now))?.email).toBe("renamed@example.test"); expect(await readStaffSession(ownerCookie.split("=")[1], config, now)).toBeNull();
});
test("first-owner setup needs the private key and cannot reopen registration", async () => {
  const memory = memoryStore(); const config: StaffConfig = { sessionSecret: secret, setupSecret: "private-setup-key-with-at-least-32-characters", store: memory.store };
  expect(await (await staffSessionResponse(request("/api/staff-session"), config, now)).json()).toMatchObject({ configured: false, setupAvailable: true, role: null });
  expect((await staffSetupResponse(request("/api/staff-setup", { email: "owner@example.test", password, setupKey: "wrong" }), config, now)).status).toBe(401);
  const setup = await staffSetupResponse(request("/api/staff-setup", { email: "owner@example.test", password, setupKey: config.setupSecret }), config, now);
  expect(setup.status).toBe(200); expect(setup.headers.get("set-cookie")).toContain("HttpOnly"); expect(memory.value()?.accounts[0]).toMatchObject({ email: "owner@example.test", role: "developer", isOwner: true });
  expect((await staffSetupResponse(request("/api/staff-setup", { email: "attacker@example.test", password, setupKey: config.setupSecret }), config, now)).status).toBe(409);
  expect(await (await staffSessionResponse(request("/api/staff-session"), config, now)).json()).toMatchObject({ configured: true, setupAvailable: false });
});
