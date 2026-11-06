import { afterEach, expect, test } from "bun:test";
import { watchStaffSession, staffRoleAllowed } from "./staff-session-client";

const original = new Map<string, PropertyDescriptor | undefined>();
let stop: (() => void) | undefined;
function put(key: string, value: unknown) {
  if (!original.has(key))
    original.set(key, Object.getOwnPropertyDescriptor(globalThis, key));
  Object.defineProperty(globalThis, key, {
    value,
    configurable: true,
    writable: true,
  });
}
afterEach(() => {
  stop?.();
  stop = undefined;
  for (const [key, value] of original) {
    if (value) Object.defineProperty(globalThis, key, value);
    else Reflect.deleteProperty(globalThis, key);
  }
  original.clear();
});
const settle = () => new Promise((resolve) => setTimeout(resolve, 0));
function setup(initial: { role: string | null; expiresAt?: number }) {
  const target = new EventTarget();
  const body = { style: { visibility: "" }, inert: false };
  let session = initial;
  put("window", {
    addEventListener: target.addEventListener.bind(target),
    removeEventListener: target.removeEventListener.bind(target),
  });
  put("document", { body });
  put("fetch", async () => Response.json(session));
  return {
    target,
    body,
    update: (value: typeof initial) => {
      session = value;
    },
  };
}
test("logout in another tab revokes an already-open professional workspace", async () => {
  const { target } = setup({ role: "developer" });
  const reasons: string[] = [];
  stop = watchStaffSession(
    "/staff/developer",
    () => {},
    (reason) => reasons.push(reason),
  );
  await settle();
  target.dispatchEvent(new Event("language-staff-logout"));
  expect(reasons).toContain("logout");
});
test("returning to a professional tab rechecks cookie authorization", async () => {
  const { target, body, update } = setup({ role: "teacher" });
  const reasons: string[] = [];
  stop = watchStaffSession(
    "/staff/settings",
    () => {},
    (reason) => reasons.push(reason),
  );
  await settle();
  update({ role: null });
  target.dispatchEvent(new Event("focus"));
  expect(body.style.visibility).toBe("hidden");
  await settle();
  expect(reasons).toContain("expired");
});
test("session expiry closes access without requiring navigation", async () => {
  setup({ role: "developer", expiresAt: Date.now() + 20 });
  const reasons: string[] = [];
  stop = watchStaffSession(
    "/staff/developer",
    () => {},
    (reason) => reasons.push(reason),
  );
  await new Promise((resolve) => setTimeout(resolve, 40));
  expect(reasons).toContain("expired");
  expect(staffRoleAllowed("/staff/developer", "teacher")).toBe(false);
});

test("an earlier pending verification cannot restore a role after logout", async () => {
  const { target, body } = setup({ role: "developer" });
  let respond: (value: Response) => void = () => {};
  put(
    "fetch",
    () =>
      new Promise<Response>((resolve) => {
        respond = resolve;
      }),
  );
  const events: string[] = [];
  stop = watchStaffSession(
    "/staff/developer",
    (data) => events.push(`verified:${data.role}`),
    (reason) => events.push(`invalid:${reason}`),
  );
  target.dispatchEvent(new Event("language-staff-logout"));
  respond(Response.json({ role: "developer" }));
  await settle();
  expect(events).toEqual(["invalid:logout"]);
  expect(body.style.visibility).toBe("hidden");
});

test("verified server metadata determines account ownership and first setup availability", async () => {
  setup({ role: null });
  put("fetch", async () =>
    Response.json({
      role: null,
      email: "ignored@example.org",
      isOwner: true,
      configured: false,
      setupAvailable: true,
    }),
  );
  const values: unknown[] = [];
  stop = watchStaffSession(
    "/staff",
    (data) => values.push(data),
    () => {},
  );
  await settle();
  expect(values[0]).toEqual({
    role: null,
    email: null,
    isOwner: false,
    configured: false,
    setupAvailable: true,
  });
});
