"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import {
  watchStaffSession,
  broadcastStaffLogout,
} from "@automaticity/learning-core/automaticity";

type StaffRole = "teacher" | "developer";
type Access = {
  role: StaffRole | null;
  active: boolean;
  loading: boolean;
  configured: boolean;
};
const Context = createContext<Access>({
  role: null,
  active: false,
  loading: false,
  configured: true,
});
const professionalPath = (path: string) =>
  path === "/staff" ||
  path.startsWith("/staff/") ||
  /^\/(teacher|lehrkraft)(?:\/|$)/u.test(path);

export function StaffAccessProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "/";
  const workspace = professionalPath(pathname);
  const [access, setAccess] = useState<Access>({
    role: null,
    active: false,
    loading: workspace,
    configured: true,
  });
  const [verifiedPath, setVerifiedPath] = useState("");
  useEffect(() => {
    document.documentElement.removeAttribute("data-staff-role");
    if (!workspace) {
      setAccess({
        role: null,
        active: false,
        loading: false,
        configured: true,
      });
      return;
    }
    setAccess({ role: null, active: false, loading: true, configured: true });
    return watchStaffSession(
      pathname,
      (data) => {
        if (data.role) document.documentElement.dataset.staffRole = data.role;
        else document.documentElement.removeAttribute("data-staff-role");
        setVerifiedPath(pathname);
        setAccess({
          role: data.role,
          active: !!data.role,
          loading: false,
          configured: data.configured,
        });
      },
      (reason) => {
        document.documentElement.removeAttribute("data-staff-role");
        setVerifiedPath("");
        setAccess({
          role: null,
          active: false,
          loading: false,
          configured: true,
        });
        if (reason === "logout") location.replace("/");
        else if (pathname !== "/staff")
          location.replace(
            "/staff?returnTo=" + encodeURIComponent(pathname + location.search),
          );
      },
    );
  }, [workspace, pathname]);
  const verified = workspace && verifiedPath === pathname;
  return (
    <Context.Provider
      value={{
        ...access,
        role: verified ? access.role : null,
        active: verified && access.active,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function StaffRouteGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const access = useStaffAccess();
  if (pathname === "/staff" || pathname === "/staff/") return children;
  if (
    access.active &&
    (!pathname?.startsWith("/staff/developer") || access.role === "developer")
  )
    return children;
  return (
    <main dir="rtl" lang="fa" style={{ padding: 24 }}>
      <p role="status">
        {access.loading
          ? "در حال بررسی ورود…"
          : "برای بازکردن این بخش وارد محیط حرفه‌ای شوید."}
      </p>
      <a href="/staff">ورود معلم و توسعه‌دهنده</a>
    </main>
  );
}
export const useStaffAccess = () => useContext(Context);
export function StaffOnly({
  children,
  roles,
}: {
  children: ReactNode;
  roles?: readonly StaffRole[];
}) {
  const access = useStaffAccess();
  return access.active && access.role && (!roles || roles.includes(access.role))
    ? children
    : null;
}
export function LearnerOnly({ children }: { children: ReactNode }) {
  return useStaffAccess().active ? null : children;
}
export function StaffPortal({ language }: { language: "en" | "de" }) {
  const access = useStaffAccess();
  const [role, setRole] = useState<StaffRole>("teacher");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage("");
    try {
      const response = await fetch("/api/staff-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          password,
          returnTo: new URLSearchParams(location.search).get("returnTo"),
        }),
      });
      if (!response.ok)
        throw new Error(
          response.status === 429
            ? "تعداد تلاش‌ها زیاد است؛ یک دقیقه بعد دوباره امتحان کن."
            : response.status === 503
              ? "ورود این محیط هنوز فعال نشده است."
              : "نقش یا رمز ورود درست نیست.",
        );
      const data = (await response.json()) as { redirectTo?: string };
      setPassword("");
      const target = new URL(data.redirectTo ?? "/staff", location.origin);
      location.assign(
        target.origin === location.origin
          ? target.pathname + target.search
          : "/staff",
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "ورود ممکن نشد؛ دوباره تلاش کن.",
      );
    } finally {
      setPending(false);
    }
  }
  return (
    <main
      className="staff-workspace"
      lang="fa"
      dir="rtl"
      style={{
        maxWidth: 1000,
        margin: "32px auto",
        padding: 24,
        lineHeight: 1.9,
      }}
    >
      <h1>محیط معلم و توسعه‌دهنده</h1>
      <p>ابزارهای نظارت، بازبینی محتوا و تنظیمات فنی در این بخش قرار دارند.</p>
      {access.loading ? (
        <p role="status">در حال بررسی ورود…</p>
      ) : !access.active ? (
        <form
          onSubmit={(event) => void login(event)}
          style={{ display: "grid", gap: 16, maxWidth: 440 }}
        >
          <label>
            نقش ورود
            <select
              aria-label="نقش ورود"
              value={role}
              onChange={(event) =>
                setRole(
                  event.target.value === "developer" ? "developer" : "teacher",
                )
              }
            >
              <option value="teacher">معلم ناظر</option>
              <option value="developer">توسعه‌دهنده</option>
            </select>
          </label>
          <label>
            رمز ورود
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              maxLength={512}
            />
          </label>
          <button type="submit" disabled={pending || !access.configured}>
            {pending ? "در حال ورود…" : "ورود به محیط حرفه‌ای"}
          </button>
          {!access.configured ? (
            <p role="status">ورود این محیط هنوز فعال نشده است.</p>
          ) : null}
          {message ? <p role="alert">{message}</p> : null}
        </form>
      ) : (
        <>
          <section>
            <h2>منوی معلم ناظر</h2>
            <ul>
              <li>
                <a href={language === "en" ? "/teacher" : "/lehrkraft"}>
                  استودیوی معلم، تکلیف و بازبینی پاسخ‌ها
                </a>
              </li>
              <li>
                <a href="/learning-core/content-review.html">
                  بازبینی تخصصی سؤال‌ها و محتوای آموزشی
                </a>
              </li>
              <li>
                <a href="/staff/practice?review=1">
                  داوری پاسخ‌های ذخیره‌شده و گزارش تمرین
                </a>
              </li>
              <li>
                <a href="/staff/progress">گزارش تفصیلی پیشرفت و روش محاسبه</a>
              </li>
              <li>
                <a href="/staff/settings">تنظیمات مطالعه، پژوهش و بازبینی</a>
              </li>
              <li>
                <a href="/staff/studio">بررسی ضبط و جزئیات استودیو</a>
              </li>
              <li>
                <a href="/staff/activities">معیارهای کیفیت و گزارش فعالیت‌ها</a>
              </li>
              <li>
                <a href="/assessment-readiness.html">
                  وضعیت داوری و آمادگی ارزیابی
                </a>
              </li>
            </ul>
          </section>
          <StaffOnly roles={["developer"]}>
            <section>
              <h2>منوی توسعه‌دهنده</h2>
              <ul>
                <li>
                  <a href="/staff/developer">توضیحات فنی و منشأ داده‌ها</a>
                </li>
                <li>
                  <a href="/assessment-benchmarks.html">آزمون‌های فنی ارزیاب</a>
                </li>
                <li>
                  <a href="/roadmap.html">نقشهٔ راه توسعه</a>
                </li>
                <li>
                  <a href="/learning-core/feedback-review.html">
                    رسیدگی به گزارش‌های کاربران
                  </a>
                </li>
              </ul>
            </section>
          </StaffOnly>
        </>
      )}
      <p>
        <a href="/">بازگشت به یادگیری</a>
      </p>
    </main>
  );
}
export function StaffWorkspaceBar() {
  const access = useStaffAccess();
  const [logoutError, setLogoutError] = useState("");
  if (!access.active) return null;
  async function logout() {
    try {
      setLogoutError("");
      const response = await fetch("/api/staff-session", { method: "DELETE" });
      if (!response.ok)
        throw new Error("خروج انجام نشد؛ اتصال را بررسی کن و دوباره تلاش کن.");
      broadcastStaffLogout();
      document.documentElement.removeAttribute("data-staff-role");
      location.replace("/");
    } catch {
      setLogoutError("خروج انجام نشد؛ اتصال را بررسی کن و دوباره تلاش کن.");
    }
  }
  return (
    <nav
      aria-label="منوی محیط حرفه‌ای"
      dir="rtl"
      lang="fa"
      style={{
        display: "flex",
        gap: 20,
        flexWrap: "wrap",
        padding: "16px 24px",
        background: "#e9f4f4",
      }}
    >
      <a href="/staff">منوی معلم و توسعه‌دهنده</a>
      <a href="/">یادگیری</a>
      <button type="button" onClick={() => void logout()}>
        خروج و پنهان‌کردن بخش حرفه‌ای
      </button>
      {logoutError ? <span role="alert">{logoutError}</span> : null}
    </nav>
  );
}
