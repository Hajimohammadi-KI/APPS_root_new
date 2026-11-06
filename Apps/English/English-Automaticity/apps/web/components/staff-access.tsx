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
import { StaffOwnerSetup } from "./staff-owner-setup";

type StaffRole = "teacher" | "developer";
type Language = "en" | "de";
type Access = {
  role: StaffRole | null;
  active: boolean;
  loading: boolean;
  configured: boolean;
  email: string | null;
  isOwner: boolean;
  setupAvailable: boolean;
};
type StaffContext = Access & { language: Language };
const emptyAccess: Access = {
  role: null,
  active: false,
  loading: false,
  configured: true,
  email: null,
  isOwner: false,
  setupAvailable: false,
};
const Context = createContext<StaffContext>({ ...emptyAccess, language: "en" });

/** ورودی مسیر فعلی است؛ خروجی فقط مشخص می‌کند آیا رابط حرفه‌ای باید جلسهٔ سرور را بررسی کند. */
const professionalPath = (path: string) =>
  path === "/staff" ||
  path.startsWith("/staff/") ||
  /^\/(teacher|lehrkraft)(?:\/|$)/u.test(path);

/**
 * ورودی فرزندان و زبان ثابت اپ است؛ خروجی context دسترسی تأییدشده برای همان مسیر است.
 * نقش، ایمیل و مالکیت فقط از /api/staff-session می‌آیند؛ هیچ ترجیح یادگیرنده مجوز ورود نیست.
 * watchStaffSession انقضا و خروج تب‌های دیگر را کنترل می‌کند و پاک‌سازی effect ناظر قبلی را می‌بندد.
 */
export function StaffAccessProvider({
  children,
  language = "en",
}: {
  children: ReactNode;
  language?: Language;
}) {
  const pathname = usePathname() ?? "/";
  const workspace = professionalPath(pathname);
  const [access, setAccess] = useState<Access>({
    ...emptyAccess,
    loading: workspace,
  });
  const [verifiedPath, setVerifiedPath] = useState("");
  useEffect(() => {
    document.documentElement.removeAttribute("data-staff-role");
    // ورود به مسیر یادگیری، نمایش حرفه‌ای را خاموش می‌کند؛ داده و انتخاب ذخیره‌شده دست‌نخورده می‌مانند.
    if (!workspace) {
      setAccess({ ...emptyAccess });
      return;
    }
    setAccess({ ...emptyAccess, loading: true });
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
          email: data.email,
          isOwner: data.isOwner,
          setupAvailable: data.setupAvailable,
        });
      },
      (reason) => {
        document.documentElement.removeAttribute("data-staff-role");
        setVerifiedPath("");
        setAccess({ ...emptyAccess });
        // خروج به یادگیری می‌رود؛ انقضا در مسیر خصوصی، مقصد قبلی را برای ورود دوباره نگه می‌دارد.
        if (reason === "logout") location.replace("/");
        else if (pathname !== "/staff")
          location.replace(
            `/staff?returnTo=${encodeURIComponent(pathname + location.search)}`,
          );
      },
    );
  }, [workspace, pathname]);
  // نقش مسیر قبلی حتی برای یک رندر نباید روی مسیر تازه استفاده شود.
  const verified = workspace && verifiedPath === pathname;
  return (
    <Context.Provider
      value={{
        ...access,
        language,
        role: verified ? access.role : null,
        active: verified && access.active,
        isOwner: verified && access.isOwner,
      }}
    >
      {children}
    </Context.Provider>
  );
}

/** ورودی فرزندان خصوصی است؛ خروجی محتوای مجاز یا راهنمای ورود است. مجوز واقعی همچنان سمت سرور کنترل می‌شود. */
export function StaffRouteGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const access = useStaffAccess();
  const t = (en: string, de: string) => (access.language === "en" ? en : de);
  if (pathname === "/staff" || pathname === "/staff/") return children;
  if (
    access.active &&
    (!pathname?.startsWith("/staff/developer") || access.role === "developer")
  )
    return children;
  return (
    <main dir="ltr" lang={access.language} style={{ padding: 24 }}>
      <p role="status">
        {access.loading
          ? t("Checking sign-in…", "Anmeldung wird geprüft…")
          : t(
              "Sign in to open this workspace.",
              "Melde dich an, um diesen Bereich zu öffnen.",
            )}
      </p>
      <a href="/staff">
        {t(
          "Teacher and developer sign-in",
          "Anmeldung für Lehrkräfte und Entwicklung",
        )}
      </a>
    </main>
  );
}

/** خروجی context جاری است؛ مصرف‌کننده حق ندارد با تغییر محلی این مقدار، مجوز سرور بسازد. */
export const useStaffAccess = () => useContext(Context);

/** ورودی محتوا و نقش‌های مجاز اختیاری است؛ خروجی فقط در جلسهٔ تأییدشده نمایش داده می‌شود. */
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

/** ورودی محتوای زبان‌آموز است؛ خروجی در محیط حرفه‌ای پنهان می‌ماند تا توضیحات دو مخاطب مخلوط نشوند. */
export function LearnerOnly({ children }: { children: ReactNode }) {
  return useStaffAccess().active ? null : children;
}

/**
 * ورودی زبان اپ است؛ خروجی ورود ایمیل/رمز، راه‌اندازی نخستین مالک یا منوی نقش تأییدشده است.
 * فرم نقش را انتخاب نمی‌کند؛ سرور نقش و مالکیت حسابِ ایمیل را تعیین می‌کند.
 * رمز فقط در state موقت و بدنهٔ درخواست هم‌مبدأ استفاده می‌شود؛ در URL یا ذخیرهٔ مرورگر نوشته نمی‌شود.
 */
export function StaffPortal({ language }: { language: Language }) {
  const access = useStaffAccess();
  const t = (en: string, de: string) => (language === "en" ? en : de);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  /** رویداد فرم را به درخواست ایمیل/رمز تبدیل می‌کند؛ خروجی Promise<void> و مقصد فقط هم‌مبدأ است. */
  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage("");
    try {
      const response = await fetch("/api/staff-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          returnTo: new URLSearchParams(location.search).get("returnTo"),
        }),
      });
      if (!response.ok) {
        setMessage(
          response.status === 429
            ? t(
                "Too many attempts. Try again in one minute.",
                "Zu viele Versuche. Bitte in einer Minute erneut versuchen.",
              )
            : response.status === 503
              ? t(
                  "Sign-in is not available yet. Contact the site owner.",
                  "Die Anmeldung ist noch nicht verfügbar. Wende dich an den Betreiber.",
                )
              : t(
                  "The email address or password is incorrect.",
                  "E-Mail-Adresse oder Passwort ist nicht korrekt.",
                ),
        );
        return;
      }
      const data = (await response.json()) as { redirectTo?: string };
      setPassword("");
      const target = new URL(data.redirectTo ?? "/staff", location.origin);
      // فقط مسیر معتبر همین سایت را دنبال می‌کنیم؛ سرور نیز مقصد را با نقش حساب تطبیق می‌دهد.
      location.assign(
        target.origin === location.origin
          ? target.pathname + target.search
          : "/staff",
      );
    } catch {
      // متن خطای شبکه و بدنهٔ خام سرور ممکن است فنی باشد؛ پیام قابل اقدامِ زبان اپ نمایش داده می‌شود.
      setMessage(
        t(
          "Sign-in failed. Check your connection and try again.",
          "Anmeldung fehlgeschlagen. Prüfe die Verbindung und versuche es erneut.",
        ),
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <main
      className="staff-workspace"
      lang={language}
      dir="ltr"
      style={{
        maxWidth: 1000,
        margin: "32px auto",
        padding: 24,
        lineHeight: 1.7,
      }}
    >
      <h1>
        {t(
          "Teacher and developer workspace",
          "Bereich für Lehrkräfte und Entwicklung",
        )}
      </h1>
      <p>
        {t(
          "Supervision, content review and technical settings are available here.",
          "Hier findest du Betreuung, Inhaltsprüfung und technische Einstellungen.",
        )}
      </p>
      {access.loading ? (
        <p role="status">{t("Checking sign-in…", "Anmeldung wird geprüft…")}</p>
      ) : !access.configured && access.setupAvailable ? (
        <StaffOwnerSetup language={language} />
      ) : !access.active ? (
        <>
          <p>
            {t(
              "The site owner creates accounts and provides the email address and initial password. There is no public registration.",
              "Der Betreiber legt Konten an und vergibt E-Mail-Adresse und erstes Passwort. Eine öffentliche Registrierung gibt es nicht.",
            )}
          </p>
          <form
            onSubmit={(event) => void login(event)}
            style={{ display: "grid", gap: 16, maxWidth: 440 }}
          >
            <label>
              {t("Email address", "E-Mail-Adresse")}
              <input
                type="email"
                name="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                maxLength={254}
              />
            </label>
            <label>
              {t("Password", "Passwort")}
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
              {pending
                ? t("Signing in…", "Anmeldung läuft…")
                : t("Sign in", "Anmelden")}
            </button>
            {!access.configured ? (
              <p role="status">
                {t(
                  "Sign-in is not available yet. Contact the site owner.",
                  "Die Anmeldung ist noch nicht verfügbar. Wende dich an den Betreiber.",
                )}
              </p>
            ) : null}
            {message ? <p role="alert">{message}</p> : null}
          </form>
        </>
      ) : (
        <>
          <p>
            {t("Signed in as", "Angemeldet als")} {access.email}
          </p>
          <section>
            <h2>{t("Teacher menu", "Menü für Lehrkräfte")}</h2>
            <ul>
              <li>
                <a href={language === "en" ? "/teacher" : "/lehrkraft"}>
                  {t(
                    "Teacher studio, assignments and response review",
                    "Lehrkraft-Studio, Aufgaben und Antworten prüfen",
                  )}
                </a>
              </li>
              <li>
                <a href="/learning-core/content-review.html">
                  {t(
                    "Review questions and learning content",
                    "Fragen und Lerninhalte prüfen",
                  )}
                </a>
              </li>
              <li>
                <a href="/staff/practice?review=1">
                  {t(
                    "Review saved responses and practice reports",
                    "Gespeicherte Antworten und Übungsberichte prüfen",
                  )}
                </a>
              </li>
              <li>
                <a href="/staff/progress">
                  {t(
                    "Detailed progress and calculation method",
                    "Ausführlicher Fortschritt und Berechnungsmethode",
                  )}
                </a>
              </li>
              <li>
                <a href="/staff/settings">
                  {t(
                    "Study, research and review settings",
                    "Einstellungen für Lernen, Forschung und Prüfung",
                  )}
                </a>
              </li>
              <li>
                <a href="/staff/studio">
                  {t(
                    "Recordings and studio details",
                    "Aufnahmen und Studio-Details",
                  )}
                </a>
              </li>
              <li>
                <a href="/staff/activities">
                  {t(
                    "Quality criteria and activity reports",
                    "Qualitätskriterien und Aktivitätsberichte",
                  )}
                </a>
              </li>
              <li>
                <a href="/assessment-readiness.html">
                  {t(
                    "Review status and assessment readiness",
                    "Prüfstatus und Bewertungsbereitschaft",
                  )}
                </a>
              </li>
            </ul>
          </section>
          <StaffOnly roles={["developer"]}>
            <section>
              <h2>{t("Developer menu", "Entwicklungsmenü")}</h2>
              <ul>
                <li>
                  <a href="/staff/developer">
                    {t(
                      "Technical notes and data sources",
                      "Technische Hinweise und Datenquellen",
                    )}
                  </a>
                </li>
                <li>
                  <a href="/assessment-benchmarks.html">
                    {t("Evaluator benchmarks", "Bewertungs-Benchmarks")}
                  </a>
                </li>
                <li>
                  <a href="/roadmap.html">
                    {t("Development roadmap", "Entwicklungsplan")}
                  </a>
                </li>
                <li>
                  <a href="/learning-core/feedback-review.html">
                    {t("Review user reports", "Nutzerrückmeldungen prüfen")}
                  </a>
                </li>
                {access.isOwner ? (
                  <li>
                    <a href="/staff/developer/accounts">
                      {t(
                        "Manage accounts and passwords",
                        "Konten und Passwörter verwalten",
                      )}
                    </a>
                  </li>
                ) : null}
              </ul>
            </section>
          </StaffOnly>
        </>
      )}
      <p>
        <a href="/">{t("Back to learning", "Zurück zum Lernen")}</a>
      </p>
    </main>
  );
}

/** خروجی نوار نقشِ تأییدشده با زبان اپ است؛ خروج موفق کوکی را پاک و ناظرهای تمام تب‌ها را باخبر می‌کند. */
export function StaffWorkspaceBar() {
  const access = useStaffAccess();
  const t = (en: string, de: string) => (access.language === "en" ? en : de);
  const [logoutError, setLogoutError] = useState("");
  if (!access.active) return null;
  /** بدون ورودی؛ خروجی Promise<void>. خطای خروج، نقش را محلی جعل یا کوکی سرور را معتبر فرض نمی‌کند. */
  async function logout() {
    try {
      setLogoutError("");
      const response = await fetch("/api/staff-session", { method: "DELETE" });
      if (!response.ok) throw new Error("logout_failed");
      broadcastStaffLogout();
      document.documentElement.removeAttribute("data-staff-role");
      location.replace("/");
    } catch {
      setLogoutError(
        t(
          "Sign-out failed. Check your connection and try again.",
          "Abmeldung fehlgeschlagen. Prüfe die Verbindung und versuche es erneut.",
        ),
      );
    }
  }
  return (
    <nav
      aria-label={t("Staff workspace menu", "Menü des geschützten Bereichs")}
      dir="ltr"
      lang={access.language}
      style={{
        display: "flex",
        gap: 20,
        flexWrap: "wrap",
        padding: "16px 24px",
        background: "#e9f4f4",
      }}
    >
      <a href="/staff">
        {t("Teacher and developer menu", "Menü für Lehrkräfte und Entwicklung")}
      </a>
      <a href="/">{t("Learning", "Lernen")}</a>
      <button type="button" onClick={() => void logout()}>
        {t(
          "Sign out and hide staff tools",
          "Abmelden und geschützten Bereich schließen",
        )}
      </button>
      {logoutError ? <span role="alert">{logoutError}</span> : null}
    </nav>
  );
}
