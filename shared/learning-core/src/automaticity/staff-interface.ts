export type StaffRole = "teacher" | "developer";
import { watchStaffSession, staffDocument } from "./staff-session-client";
export function professionalWorkspace(path: string): boolean {
  return staffDocument(path);
}
let role: StaffRole | null = null;
let pending: Promise<StaffRole | null> | null = null;
let stop: (() => void) | null = null;
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
    stop?.();
    stop = null;
    return Promise.resolve(null);
  }
  if (pending) return pending;
  const path = location.pathname;
  pending = new Promise((resolve) => {
    stop = watchStaffSession(
      path,
      (data) => {
        if (location.pathname !== path) {
          resolve(null);
          return;
        }
        role = data.role;
        resolve(role);
      },
      (reason) => {
        role = null;
        pending = null;
        resolve(null);
        if (typeof location.replace === "function")
          location.replace(
            reason === "logout"
              ? "/"
              : "/staff?returnTo=" + encodeURIComponent(path + location.search),
          );
      },
    );
  });
  return pending;
}
