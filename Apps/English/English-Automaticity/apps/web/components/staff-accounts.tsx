"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useStaffAccess } from "./staff-access";

type Language = "en" | "de";
/** نمای قابل نمایش حساب؛ عامدانه شامل passwordHash، نمک رمز یا کلید مخزن نیست. */
export interface StaffAccountSummary {
  id: string;
  email: string;
  role: "teacher" | "developer";
  isOwner: boolean;
  active: boolean;
}
type Action = "create" | "update" | "disable";
/**
 * ورودی: زبان، فهرست امن حساب‌ها و callback بارگذاری مجدد پس از ذخیره.
 * خروجی: فرم ساخت/تغییر/غیرفعال‌سازی؛ مجوز نهایی در /api/staff-accounts بررسی می‌شود.
 * رمز فعلیِ مالک برای هر تغییر لازم است تا داشتن یک تب باز به‌تنهایی اجازهٔ تغییر دسترسی ندهد.
 */
export function StaffAccountForm({
  language,
  accounts,
  onSaved,
}: {
  language: Language;
  accounts: readonly StaffAccountSummary[];
  onSaved: () => void;
}) {
  const t = (en: string, de: string) => (language === "en" ? en : de);
  const [action, setAction] = useState<Action>("create");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"teacher" | "developer">("teacher");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const selected = accounts.find((account) => account.id === id);
  /** شناسهٔ حساب را می‌گیرد؛ فیلدهای عمومی را بارگذاری و رمز تازه و تأیید آن را پاک می‌کند؛ خروجی ندارد. */
  function choose(nextId: string) {
    const account = accounts.find((item) => item.id === nextId);
    setId(nextId);
    setEmail(account?.email ?? "");
    setRole(account?.role ?? "teacher");
    setPassword("");
    setConfirmation("");
    setMessage("");
  }
  /** رویداد submit را به درخواست محدود مدیریت حساب تبدیل می‌کند؛ فقط موفقیت سرور باعث refresh می‌شود. */
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    // تأیید رمز جلوی اشتباه تایپی را می‌گیرد؛ در تغییر صرف ایمیل، هر دو فیلد رمز خالی می‌مانند.
    if (password !== confirmation) {
      setMessage(
        t(
          "The passwords do not match.",
          "Die Passwörter stimmen nicht überein.",
        ),
      );
      return;
    }
    setPending(true);
    setMessage("");
    try {
      const response = await fetch("/api/staff-accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // در غیرفعال‌سازی، ایمیل/نقش/رمز تازه ارسال نمی‌شوند؛ رمز خالی نیز رمز قبلی را جایگزین نمی‌کند.
        body: JSON.stringify({
          action,
          currentPassword,
          ...(action !== "create" ? { id } : {}),
          ...(action !== "disable"
            ? { email, role, ...(password ? { password } : {}) }
            : {}),
        }),
      });
      // تعارض هم‌زمان، مجوز نامعتبر و رمز اشتباه را موفقیت اعلام نمی‌کنیم؛ ذخیره تأیید نشده است و در تعارض باید داده دوباره خوانده شود.
      if (!response.ok) {
        setMessage(
          response.status === 401
            ? t(
                "Your current owner password is incorrect.",
                "Das aktuelle Eigentümerpasswort ist falsch.",
              )
            : response.status === 409
              ? t(
                  "The account changed or this email is already used. Reload and try again.",
                  "Das Konto wurde geändert oder die E-Mail wird bereits verwendet. Neu laden und erneut versuchen.",
                )
              : response.status === 403
                ? t(
                    "Only the owner can manage accounts. The owner account cannot be deactivated.",
                    "Nur der Eigentümer darf Konten verwalten. Das Eigentümerkonto darf nicht deaktiviert werden.",
                  )
                : response.status === 429
                  ? t(
                      "Too many attempts. Please wait a minute.",
                      "Zu viele Versuche. Bitte eine Minute warten.",
                    )
                  : t(
                      "Could not save. Check the fields and try again.",
                      "Speichern fehlgeschlagen. Angaben prüfen und erneut versuchen.",
                    ),
        );
        return;
      }
      // اطلاعات حساس پس از ذخیره حذف می‌شوند؛ callback فهرست حساب‌ها را دوباره از منبع معتبر می‌خواند.
      setCurrentPassword("");
      setPassword("");
      setConfirmation("");
      setMessage(
        t(
          "Saved for both apps. Previous sessions for this account have expired.",
          "Für beide Apps gespeichert. Frühere Sitzungen dieses Kontos sind abgelaufen.",
        ),
      );
      onSaved();
      // اگر مالک رمز خودش را عوض کرده باشد، watcher با کوکی تازه متادیتای نشست را همگام می‌کند.
      window.dispatchEvent(new Event("focus"));
    } catch {
      setMessage(
        t(
          "Could not connect. Please try again.",
          "Keine Verbindung. Bitte erneut versuchen.",
        ),
      );
    } finally {
      setPending(false);
    }
  }
  return (
    <form
      lang={language}
      dir="ltr"
      onSubmit={(event) => void save(event)}
      style={{ display: "grid", gap: 16, maxWidth: 600 }}
    >
      {/* هنگام ذخیره، انتخاب حساب ثابت می‌ماند تا نتیجه به حساب دیگری نسبت داده نشود. */}
      <fieldset disabled={pending} style={{ display: "contents" }}>
        <label>
          {t("Action", "Aktion")}
          <select
            value={action}
            onChange={(event) => {
              setAction(event.target.value as Action);
              choose("");
            }}
          >
            <option value="create">
              {t("Create account", "Konto erstellen")}
            </option>
            <option value="update">
              {t("Change email or password", "E-Mail oder Passwort ändern")}
            </option>
            <option value="disable">
              {t("Deactivate account", "Konto deaktivieren")}
            </option>
          </select>
        </label>
        {action !== "create" ? (
          <label>
            {t("Account", "Konto")}
            <select
              value={id}
              onChange={(event) => choose(event.target.value)}
              required
            >
              <option value="">
                {t("Choose an account", "Konto auswählen")}
              </option>
              {accounts
                .filter((account) => action !== "disable" || !account.isOwner)
                .map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.email}
                    {account.isOwner ? t(" (owner)", " (Eigentümer)") : ""}
                    {!account.active ? t(" (inactive)", " (inaktiv)") : ""}
                  </option>
                ))}
            </select>
          </label>
        ) : null}
        {action !== "disable" ? (
          <>
            <label>
              {t("Account email", "E-Mail-Adresse des Kontos")}
              <input
                name="email"
                type="email"
                autoComplete="off"
                maxLength={254}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
            <label>
              {t("Access", "Zugriff")}
              <select
                value={role}
                disabled={selected?.isOwner}
                onChange={(event) =>
                  setRole(
                    event.target.value === "developer"
                      ? "developer"
                      : "teacher",
                  )
                }
              >
                <option value="teacher">{t("Teacher", "Lehrkraft")}</option>
                <option value="developer">
                  {t("Developer", "Entwicklung")}
                </option>
              </select>
            </label>
            <label>
              {action === "create"
                ? t(
                    "Choose password (12–128 characters)",
                    "Passwort wählen (12–128 Zeichen)",
                  )
                : t(
                    "New password (leave empty to keep it)",
                    "Neues Passwort (leer lassen zum Beibehalten)",
                  )}
              <input
                name="password"
                type="password"
                autoComplete="new-password"
                minLength={12}
                maxLength={128}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required={action === "create"}
              />
            </label>
            <label>
              {t("Confirm new password", "Neues Passwort bestätigen")}
              <input
                name="confirmation"
                type="password"
                autoComplete="new-password"
                minLength={12}
                maxLength={128}
                value={confirmation}
                onChange={(event) => setConfirmation(event.target.value)}
                required={action === "create" || !!password}
              />
            </label>
          </>
        ) : (
          <p>
            {t(
              "This blocks sign-in and expires the account's existing sessions.",
              "Dies sperrt die Anmeldung und beendet bestehende Sitzungen dieses Kontos.",
            )}
          </p>
        )}
        <label>
          {t("Your current owner password", "Aktuelles Eigentümerpasswort")}
          <input
            name="currentPassword"
            type="password"
            autoComplete="current-password"
            maxLength={128}
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={pending}>
          {pending
            ? t("Saving…", "Wird gespeichert…")
            : t("Save for both apps", "Für beide Apps speichern")}
        </button>
      </fieldset>
      {message ? <p role="status">{message}</p> : null}
    </form>
  );
}

/**
 * ورودی: زبان اپ. خروجی: رابط مدیریت فقط برای مالکِ تأییدشده، یا پیام منع دسترسی.
 * ارتباط: StaffAccessProvider هویت را از سرور می‌گیرد؛ این guard صرفاً نمایش را کنترل می‌کند.
 * API مستقل از این مؤلفه مجوز مالک را کنترل می‌کند، بنابراین مخفی‌کردن فرم جای احراز هویت نیست.
 */
export function StaffAccountsScreen({ language }: { language: Language }) {
  const access = useStaffAccess();
  const t = (en: string, de: string) => (language === "en" ? en : de);
  const [accounts, setAccounts] = useState<StaffAccountSummary[]>([]);
  const [message, setMessage] = useState("");
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    // حساب معلم/توسعه‌دهندهٔ عادی حتی درخواست فهرست حساب‌ها را از این رابط ارسال نمی‌کند.
    if (!access.active || !access.isOwner) return;
    const controller = new AbortController();
    /** خروجی Promise<void>؛ متادیتای بدون رمز را می‌خواند و نتیجهٔ درخواست منقضی‌شده را نادیده می‌گیرد. */
    async function load() {
      try {
        const response = await fetch("/api/staff-accounts", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("unavailable");
        const data = (await response.json()) as {
          accounts: StaffAccountSummary[];
        };
        // تغییر مسیر یا خروج، نباید اجازه دهد پاسخ دیررس وضعیت صفحهٔ تازه را بازنویسی کند.
        if (!controller.signal.aborted) {
          setAccounts(data.accounts);
          setMessage("");
        }
      } catch {
        if (!controller.signal.aborted)
          setMessage(
            language === "en"
              ? "Could not load accounts. Reload the page to try again."
              : "Konten konnten nicht geladen werden. Bitte die Seite neu laden.",
          );
      }
    }
    void load();
    return () => controller.abort();
  }, [access.active, access.isOwner, language, revision]);
  if (!access.active || !access.isOwner)
    return (
      <main>
        <p>
          {t(
            "Only the site owner can manage accounts.",
            "Nur der Eigentümer darf Konten verwalten.",
          )}
        </p>
      </main>
    );
  return (
    <main
      className="staff-workspace"
      lang={language}
      dir="ltr"
      style={{ maxWidth: 1000, margin: "32px auto", padding: 24 }}
    >
      <h1>
        {t("Staff accounts and passwords", "Personalkonten und Passwörter")}
      </h1>
      <p>
        {t(
          "You choose each account's email, password and access. The same accounts work in both apps. Existing passwords cannot be displayed; choose a new one to reset access.",
          "Hier werden E-Mail, Passwort und Zugriff jedes Kontos festgelegt. Dieselben Konten gelten für beide Apps. Vorhandene Passwörter können nicht angezeigt werden; zum Zurücksetzen ein neues wählen.",
        )}
      </p>
      {message ? (
        <p role="alert">{message}</p>
      ) : (
        <StaffAccountForm
          language={language}
          accounts={accounts}
          onSaved={() => setRevision((value) => value + 1)}
        />
      )}
      <details>
        <summary>
          {t(
            "Manage from the setup computer",
            "Am Einrichtungscomputer verwalten",
          )}
        </summary>
        <p>
          {t(
            "Open START-LANGUAGE-STAFF-ADMIN.cmd on the owner's computer. The private tool asks for email and passwords and updates the same accounts. Passwords are never shown or passed as command-line arguments.",
            "Auf dem Computer des Eigentümers START-LANGUAGE-STAFF-ADMIN.cmd öffnen. Das private Werkzeug fragt E-Mail und Passwörter ab und verwaltet dieselben Konten. Passwörter werden weder angezeigt noch als Befehlszeilenargument übergeben.",
          )}
        </p>
      </details>
      <p>
        <a href="/staff">
          {t("Back to staff menu", "Zurück zum Personalmenü")}
        </a>
      </p>
    </main>
  );
}
