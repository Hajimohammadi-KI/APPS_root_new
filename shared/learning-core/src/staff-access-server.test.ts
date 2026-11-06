import { expect, test } from "bun:test";
import {
  createStaffSession,
  readStaffSession,
  requiredStaffRoles,
  staffSessionResponse,
  protectStaffRequest,
} from "./staff-access-server";

const config = {
  teacherPassword: "test-teacher-password-123456",
  developerPassword: "test-developer-password-789012",
  sessionSecret: "test-only-session-secret-at-least-thirty-two-characters",
};
const now = 1_800_000_000_000;
test("staff sessions are signed, expire and cannot change roles", () => {
  const cookie = createStaffSession("teacher", config, now);
  expect(readStaffSession(cookie, config, now)?.role).toBe("teacher");
  expect(readStaffSession(cookie + "x", config, now)).toBeNull();
  expect(readStaffSession(cookie, config, now + 9 * 60 * 60 * 1000)).toBeNull();
  expect(
    readStaffSession(
      cookie,
      { ...config, teacherPassword: "rotated-long-password" },
      now,
    ),
  ).toBeNull();
  const [payload, signed] = cookie.split(".");
  const fields = JSON.parse(
    Buffer.from(payload!, "base64url").toString("utf8"),
  );
  fields.role = "developer";
  expect(
    readStaffSession(
      `${Buffer.from(JSON.stringify(fields)).toString("base64url")}.${signed}`,
      config,
      now,
    ),
  ).toBeNull();
});
test("learner routes stay public and teacher/developer routes require the appropriate role", () => {
  expect(requiredStaffRoles("/practice")).toBeNull();
  expect(requiredStaffRoles("/staff")).toBeNull();
  expect(requiredStaffRoles("/teacher")).toContain("teacher");
  expect(requiredStaffRoles("/lehrkraft")).toContain("teacher");
  expect(requiredStaffRoles("/staff/developer")).toEqual(["developer"]);
  expect(requiredStaffRoles("/roadmap.html")).toEqual(["developer"]);
  expect(requiredStaffRoles("/api/learner-feedback/review")).toEqual([
    "developer",
  ]);
  expect(requiredStaffRoles("/staff%2Fdeveloper")).toEqual(["developer"]);
  expect(requiredStaffRoles("/staff%252Fdeveloper")).toEqual(["developer"]);
  expect(requiredStaffRoles("/ROADMAP.HTML")).toEqual(["developer"]);
  expect(
    protectStaffRequest(new Request("https://app.test/teacher"), config, now)
      ?.status,
  ).toBe(307);
  const cookie = `language-staff-session=${createStaffSession("teacher", config, now)}`;
  expect(
    protectStaffRequest(
      new Request("https://app.test/teacher", { headers: { cookie } }),
      config,
      now,
    ),
  ).toBeNull();
  expect(
    protectStaffRequest(
      new Request("https://app.test/roadmap.html", { headers: { cookie } }),
      config,
      now,
    )?.status,
  ).toBe(307);
});

test("malformed and excessive login bodies fail closed and repeated guessing is limited", async () => {
  const base = now + 120_000;
  const request = (body: string, ip: string) =>
    new Request("https://app.test/api/staff-session", {
      method: "POST",
      headers: {
        origin: "https://app.test",
        "content-type": "application/json",
        "x-forwarded-for": ip,
      },
      body,
    });
  expect(
    (await staffSessionResponse(request("not json", "bad-body"), config, base))
      .status,
  ).toBe(400);
  expect(
    (
      await staffSessionResponse(
        request("x".repeat(5000), "large-body"),
        config,
        base,
      )
    ).status,
  ).toBe(400);
  for (let index = 0; index < 10; index++)
    expect(
      (
        await staffSessionResponse(
          request(
            JSON.stringify({ role: "teacher", password: "wrong" }),
            "guesses",
          ),
          config,
          base,
        )
      ).status,
    ).toBe(401);
  expect(
    (
      await staffSessionResponse(
        request(
          JSON.stringify({ role: "teacher", password: config.teacherPassword }),
          "guesses",
        ),
        config,
        base,
      )
    ).status,
  ).toBe(429);
});
test("login rejects wrong passwords and cross-site requests without issuing cookies", async () => {
  for (const [origin, password] of [
    ["https://evil.test", config.teacherPassword],
    ["https://app.test", "wrong"],
  ]) {
    const result = await staffSessionResponse(
      new Request("https://app.test/api/staff-session", {
        method: "POST",
        headers: { origin, "content-type": "application/json" },
        body: JSON.stringify({ role: "teacher", password }),
      }),
      config,
      now,
    );
    expect(result.status).toBe(origin.includes("evil") ? 403 : 401);
    expect(result.headers.get("set-cookie")).toBeNull();
  }
});
test("login uses an HttpOnly cookie and logout clears it; configuration absence fails closed", async () => {
  const request = new Request("https://app.test/api/staff-session", {
    method: "POST",
    headers: { origin: "https://app.test", "content-type": "application/json" },
    body: JSON.stringify({
      role: "developer",
      password: config.developerPassword,
      returnTo: "https://evil.test",
    }),
  });
  const response = await staffSessionResponse(request, config, now);
  expect(response.status).toBe(200);
  expect(response.headers.get("set-cookie")).toContain("HttpOnly");
  expect(response.headers.get("set-cookie")).toContain("Secure");
  expect(response.headers.get("set-cookie")).toContain("SameSite=Strict");
  expect(await response.json()).toMatchObject({
    role: "developer",
    redirectTo: "/staff",
  });
  const logout = await staffSessionResponse(
    new Request("https://app.test/api/staff-session", {
      method: "DELETE",
      headers: { origin: "https://app.test" },
    }),
    config,
    now,
  );
  expect(logout.headers.get("set-cookie")).toContain("Max-Age=0");
  expect(
    readStaffSession(createStaffSession("teacher", config, now), {}, now),
  ).toBeNull();
});
