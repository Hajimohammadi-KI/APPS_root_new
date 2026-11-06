"use client";

import { useState, type FormEvent } from "react";

/**
 * ورودی: زبان رابط همان اپ؛ ایمیل و رمز از فرم و فقط با انتخاب مالک دریافت می‌شوند.
 * خروجی: فرم راه‌اندازی اولیه یا پیام خطای قابل اقدام؛ هیچ حساب پیش‌فرضی نمی‌سازد.
 * ارتباط: /api/staff-setup کلید خصوصی و خالی‌بودن مخزن مشترک را سمت سرور کنترل می‌کند.
 * وضعیت‌های React موقتی‌اند؛ رمز و کلید در localStorage، گزارش یا URL نوشته نمی‌شوند.
 */
export function StaffOwnerSetup({ language }: { language: "en" | "de" }) {
  const t = (en: string, de: string) => (language === "en" ? en : de);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [setupKey, setSetupKey] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  /** ورودی رویداد فرم است؛ خروجی Promise<void>. فقط پس از تأیید رمز، درخواست راه‌اندازی می‌فرستد. */
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    // از ساخت حساب با رمز تایپ‌شدهٔ اشتباه جلوگیری می‌کنیم؛ اعتبارسنجی امنیتی سرور نیز مستقل باقی است.
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
      // ارسال به مبدأ خود اپ است؛ کلید فعال‌سازی اجازهٔ مالکیت می‌دهد، ایمیل به‌تنهایی مجوز نیست.
      const response = await fetch("/api/staff-setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, setupKey }),
      });
      // پاسخ ناموفق، فرم را حفظ می‌کند تا مالک خطا را اصلاح کند؛ متن خام خطای سرور نمایش داده نمی‌شود.
      if (!response.ok) {
        setMessage(
          response.status === 409
            ? t(
                "An owner account already exists. Sign in instead.",
                "Ein Eigentümerkonto besteht bereits. Bitte anmelden.",
              )
            : response.status === 429
              ? t(
                  "Too many attempts. Please try again in a minute.",
                  "Zu viele Versuche. Bitte in einer Minute erneut versuchen.",
                )
              : response.status === 503
                ? t(
                    "Account storage is unavailable. Please try again later.",
                    "Der Kontospeicher ist nicht erreichbar. Bitte später erneut versuchen.",
                  )
                : t(
                    "Setup failed. Check the activation key, email and password requirements.",
                    "Einrichtung fehlgeschlagen. Aktivierungsschlüssel, E-Mail und Passwortvorgaben prüfen.",
                  ),
        );
        return;
      }
      // پس از دریافت کوکی HttpOnly از سرور، اطلاعات حساس را از حافظهٔ فرم پاک و منوی حرفه‌ای را باز می‌کنیم.
      setPassword("");
      setConfirmation("");
      setSetupKey("");
      location.assign("/staff");
    } catch {
      // قطع شبکه با ایجاد موفق حساب اشتباه گرفته نمی‌شود و رمز در پیام خطا قرار نمی‌گیرد.
      setMessage(
        t(
          "Could not connect. Please try again.",
          "Keine Verbindung. Bitte erneut versuchen.",
        ),
      );
    } finally {
      // در موفقیت و شکست، قفل دکمه آزاد می‌شود تا درخواست معلقِ ظاهری باقی نماند.
      setPending(false);
    }
  }
  return (
    <section lang={language} dir="ltr">
      <h2>{t("Create owner account", "Eigentümerkonto erstellen")}</h2>
      <p>
        {t(
          "Choose your own email and password. This account manages staff access for both apps. The private activation key prevents anyone else from claiming ownership.",
          "Eigene E-Mail-Adresse und eigenes Passwort festlegen. Dieses Konto verwaltet den Zugang für beide Apps. Der private Aktivierungsschlüssel schützt die erstmalige Einrichtung.",
        )}
      </p>
      <form
        onSubmit={(event) => void submit(event)}
        style={{ display: "grid", gap: 16, maxWidth: 520 }}
      >
        <fieldset disabled={pending} style={{ display: "contents" }}>
          <label>
            {t("Your email", "Eigene E-Mail-Adresse")}
            <input
              name="email"
              type="email"
              autoComplete="username"
              maxLength={254}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label>
            {t(
              "Choose password (12–128 characters)",
              "Passwort wählen (12–128 Zeichen)",
            )}
            <input
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={12}
              maxLength={128}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          <label>
            {t("Confirm password", "Passwort bestätigen")}
            <input
              name="confirmation"
              type="password"
              autoComplete="new-password"
              minLength={12}
              maxLength={128}
              value={confirmation}
              onChange={(event) => setConfirmation(event.target.value)}
              required
            />
          </label>
          <label>
            {t("Private activation key", "Privater Aktivierungsschlüssel")}
            <input
              name="setupKey"
              type="password"
              autoComplete="off"
              maxLength={512}
              value={setupKey}
              onChange={(event) => setSetupKey(event.target.value)}
              required
            />
          </label>
          <p>
            {t(
              "The activation key is in the owner's private activation file on the setup computer. It works only before the first owner account is created. Passwords are stored as protected hashes on the server, not as readable text in the app.",
              "Der Schlüssel steht in der privaten Aktivierungsdatei auf dem Einrichtungscomputer. Er funktioniert nur vor dem ersten Eigentümerkonto. Passwörter werden als geschützte Hashwerte auf dem Server gespeichert, nicht als lesbarer Text in der App.",
            )}
          </p>
          <button type="submit" disabled={pending}>
            {pending
              ? t("Creating account…", "Konto wird erstellt…")
              : t("Create owner account", "Eigentümerkonto erstellen")}
          </button>
        </fieldset>
        {message ? <p role="alert">{message}</p> : null}
      </form>
    </section>
  );
}
