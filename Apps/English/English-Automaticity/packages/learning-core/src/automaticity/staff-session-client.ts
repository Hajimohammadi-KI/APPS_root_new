export type StaffRole = "teacher" | "developer";
const logoutSignal = "language-staff-logout";
const privateDocuments = [
  "/roadmap.html",
  "/assessment-readiness.html",
  "/assessment-benchmarks.html",
  "/learning-core/content-review.html",
  "/learning-core/feedback-review.html",
];
export function staffDocument(path: string): boolean {
  return (
    /^\/(staff|teacher|lehrkraft)(?:\/|$)/u.test(path) ||
    privateDocuments.includes(path)
  );
}
export function staffRoleAllowed(path: string, role: StaffRole): boolean {
  return (
    !(
      path.startsWith("/staff/developer") ||
      [
        "/roadmap.html",
        "/assessment-benchmarks.html",
        "/learning-core/feedback-review.html",
      ].includes(path)
    ) || role === "developer"
  );
}
export function broadcastStaffLogout(): void {
  try {
    localStorage.setItem(logoutSignal, String(Date.now()));
  } catch {
    /* The cookie remains the authority. */
  }
  if (typeof window.BroadcastChannel === "function") {
    const channel = new window.BroadcastChannel(logoutSignal);
    channel.postMessage("logout");
    channel.close();
  }
  window.dispatchEvent(new Event(logoutSignal));
}
export function watchStaffSession(
  path: string,
  verified: (data: {
    role: StaffRole | null;
    configured: boolean;
    email: string | null;
    isOwner: boolean;
    setupAvailable: boolean;
  }) => void,
  invalid: (reason: "logout" | "expired" | "unavailable") => void,
): () => void {
  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout> | undefined;
  let checking = false;
  let hidden = false;
  let revoked = false;
  let originalVisibility = "";
  let originalInert = false;
  const cover = (hide: boolean) => {
    const body = document.body;
    if (!body || hide === hidden) return;
    if (hide) {
      originalVisibility = body.style.visibility;
      originalInert = body.inert;
      body.style.visibility = "hidden";
      body.inert = true;
    } else {
      body.style.visibility = originalVisibility;
      body.inert = originalInert;
    }
    hidden = hide;
  };
  const revoke = (reason: "logout" | "expired" | "unavailable") => {
    if (controller.signal.aborted) return;
    revoked = true;
    controller.abort();
    clearTimeout(timer);
    if (path !== "/staff") cover(true);
    invalid(reason);
  };
  const check = async (privateRecheck = false) => {
    if (checking || controller.signal.aborted) return;
    checking = true;
    if (privateRecheck && path !== "/staff") cover(true);
    try {
      const response = await fetch("/api/staff-session", {
        cache: "no-store",
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Session unavailable");
      const value: unknown = await response.json();
      const data =
        value && typeof value === "object"
          ? (value as Record<string, unknown>)
          : {};
      const role =
        data.role === "teacher" || data.role === "developer" ? data.role : null;
      if (controller.signal.aborted) return;
      if (role && !staffRoleAllowed(path, role)) {
        revoke("expired");
        return;
      }
      verified({
        role,
        configured: data.configured === true,
        email: role && typeof data.email === "string" ? data.email : null,
        isOwner: role === "developer" && data.isOwner === true,
        setupAvailable:
          !role && data.configured !== true && data.setupAvailable === true,
      });
      clearTimeout(timer);
      if (role && typeof data.expiresAt === "number")
        timer = setTimeout(
          () => revoke("expired"),
          Math.max(0, data.expiresAt - Date.now()),
        );
      if (!role && path !== "/staff") revoke("expired");
    } catch {
      revoke("unavailable");
    } finally {
      checking = false;
      if (!revoked) cover(false);
    }
  };
  const focus = () => {
    void check(true);
  };
  const pageShow = (event: PageTransitionEvent) => {
    if (event.persisted) void check(true);
  };
  const storage = (event: StorageEvent) => {
    if (event.key === logoutSignal) revoke("logout");
  };
  const logout = () => revoke("logout");
  const channel =
    typeof window.BroadcastChannel === "function"
      ? new window.BroadcastChannel(logoutSignal)
      : null;
  if (channel)
    channel.onmessage = (event) => {
      if (event.data === "logout") revoke("logout");
    };
  window.addEventListener("focus", focus);
  window.addEventListener("pageshow", pageShow);
  window.addEventListener("storage", storage);
  window.addEventListener(logoutSignal, logout);
  void check();
  return () => {
    controller.abort();
    clearTimeout(timer);
    cover(false);
    channel?.close();
    window.removeEventListener("focus", focus);
    window.removeEventListener("pageshow", pageShow);
    window.removeEventListener("storage", storage);
    window.removeEventListener(logoutSignal, logout);
  };
}
