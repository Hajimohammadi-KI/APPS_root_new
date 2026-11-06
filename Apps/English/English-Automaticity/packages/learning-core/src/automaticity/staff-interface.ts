export type StaffRole = "teacher" | "developer";
export function professionalWorkspace(path: string): boolean {
  return (
    path.startsWith("/staff/") ||
    path === "/staff" ||
    /^\/(teacher|lehrkraft)(?:\/|$)/u.test(path)
  );
}
let role: StaffRole | null = null;
let pending: Promise<StaffRole | null> | null = null;
export function readStaffWorkspaceRole(): StaffRole | null {
  return role;
}
/** Presentation follows a verified server session; no learner preference is changed. */
export function initializeStaffWorkspace(): Promise<StaffRole | null> {
  if (
    typeof location === "undefined" ||
    !professionalWorkspace(location.pathname)
  ) {
    role = null;
    pending = null;
    return Promise.resolve(null);
  }
  if (pending) return pending;
  const path = location.pathname;
  pending = fetch("/api/staff-session", { cache: "no-store" })
    .then(async (response) => {
      if (!response.ok) return null;
      const value: unknown = await response.json();
      const data =
        value && typeof value === "object"
          ? (value as Record<string, unknown>)
          : {};
      if (location.pathname !== path) return null;
      role =
        data.role === "teacher" || data.role === "developer" ? data.role : null;
      return role;
    })
    .catch(() => {
      role = null;
      return null;
    });
  return pending;
}
