import {
  buildDailyReminderCalendar,
  loadProfile,
  replaceImplementationIntentions,
  replaceNudgeOptIn,
  saveProfile,
  type AdherenceProfileV1,
  type ImplementationIntention,
} from "../adherence";
import type { Language } from "./contracts";
import { readSupportLanguage } from "./support-language";

function chosenTime(
  profile: AdherenceProfileV1,
): ImplementationIntention | null {
  return (
    profile.intentions.find((row) => row.id === "daily-practice-reminder") ??
    profile.intentions.find(
      (row) => row.active && row.trigger === "time" && row.action !== "skip_ok",
    ) ??
    null
  );
}

function profileNow(): AdherenceProfileV1 {
  return loadProfile(localStorage, {
    now: new Date().toISOString(),
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
  });
}

/** The chosen hour is local; calendar import is the reliable closed-app route. */
export function mountDailyReminder(language: Language): {
  element: HTMLElement;
  stop: () => void;
} {
  const t = (en: string, de: string, fa: string) => {
    const support = readSupportLanguage(language);
    return support === "fa" ? fa : support === "de" ? de : en;
  };
  const section = document.createElement("section");
  section.id = "daily-reminder";
  section.dataset.dailyReminder = "";
  section.style.cssText =
    "display:grid;gap:8px;padding-top:14px;border-top:1px solid #cfe0e4";
  const heading = document.createElement("h3");
  heading.textContent = t(
    "Choose a daily practice time",
    "Tägliche Übungszeit wählen",
    "زمان تمرین روزانه را انتخاب کن",
  );
  heading.style.margin = "0";
  const explanation = document.createElement("p");
  explanation.textContent = t(
    "The app can show a prompt while it is open. For a reminder when it is closed, import the calendar file on your device.",
    "Die App kann einen Hinweis zeigen, solange sie geöffnet ist. Für eine Erinnerung bei geschlossener App importiere die Kalenderdatei auf deinem Gerät.",
    "وقتی اپ باز باشد می‌تواند یادآوری نشان بدهد. برای یادآوری پس از بستن اپ، فایل را در تقویم دستگاه خود وارد کن.",
  );
  explanation.style.margin = "0";
  const controls = document.createElement("div");
  controls.style.cssText =
    "display:flex;flex-wrap:wrap;align-items:end;gap:8px";
  const label = document.createElement("label");
  label.textContent = t("My time", "Meine Uhrzeit", "ساعت من");
  label.style.cssText = "display:grid;gap:4px;font-weight:600";
  const input = document.createElement("input");
  input.type = "time";
  input.dataset.dailyReminderTime = "";
  input.required = true;
  input.style.cssText =
    "min-height:44px;padding:7px 10px;border:1px solid #9ccbd0;border-radius:10px;background:#fff;color:#08364a";
  label.append(input);
  const save = document.createElement("button");
  save.type = "button";
  save.textContent = t("Save time", "Uhrzeit speichern", "ذخیرهٔ ساعت");
  save.dataset.dailyReminderSave = "";
  save.style.cssText =
    "min-height:44px;padding:8px 14px;border:0;border-radius:10px;background:#007f83;color:#fff;font-weight:700;cursor:pointer";
  const calendar = document.createElement("button");
  calendar.type = "button";
  calendar.textContent = t(
    "Add to calendar",
    "Zum Kalender hinzufügen",
    "افزودن به تقویم",
  );
  calendar.dataset.dailyReminderCalendar = "";
  calendar.style.cssText =
    "min-height:44px;padding:8px 14px;border:1px solid #9ccbd0;border-radius:10px;background:#fff;color:#08364a;font-weight:700;cursor:pointer";
  const status = document.createElement("p");
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  status.dataset.dailyReminderStatus = "";
  status.style.margin = "0";
  controls.append(label, save, calendar);
  section.append(heading, explanation, controls, status);
  let savedTime: string | null = null;
  const refresh = () => {
    const hasUnsavedEdit =
      input.value !== "" && input.value !== (savedTime ?? "18:00");
    const support = readSupportLanguage(language);
    section.lang = support;
    section.dir = support === "fa" ? "rtl" : "ltr";
    heading.textContent = t(
      "Choose a daily practice time",
      "Tägliche Übungszeit wählen",
      "زمان تمرین روزانه را انتخاب کن",
    );
    explanation.textContent = t(
      "The app can show a prompt while it is open. For a reminder when it is closed, import the calendar file on your device.",
      "Die App kann einen Hinweis zeigen, solange sie geöffnet ist. Für eine Erinnerung bei geschlossener App importiere die Kalenderdatei auf deinem Gerät.",
      "وقتی اپ باز باشد می‌تواند یادآوری نشان بدهد. برای یادآوری پس از بستن اپ، فایل را در تقویم دستگاه خود وارد کن.",
    );
    label.firstChild!.textContent = t("My time", "Meine Uhrzeit", "ساعت من");
    save.textContent = t("Save time", "Uhrzeit speichern", "ذخیرهٔ ساعت");
    calendar.textContent = t(
      "Add to calendar",
      "Zum Kalender hinzufügen",
      "افزودن به تقویم",
    );
    const plan = chosenTime(profileNow());
    savedTime =
      plan?.active && plan.trigger === "time" ? plan.triggerLabel : null;
    if (!hasUnsavedEdit) input.value = savedTime ?? "18:00";
    calendar.disabled = !savedTime || input.value !== savedTime;
    status.textContent = savedTime
      ? t(
          `Saved for ${savedTime} on this device.`,
          `Für ${savedTime} auf diesem Gerät gespeichert.`,
          `ساعت ${savedTime} روی این دستگاه ذخیره شده است.`,
        )
      : t(
          "No reminder time saved yet.",
          "Noch keine Erinnerungszeit gespeichert.",
          "هنوز ساعتی برای یادآوری ذخیره نشده است.",
        );
  };
  const inputChanged = () => {
    calendar.disabled = !savedTime || input.value !== savedTime;
  };
  const saveTime = () => {
    const time = input.value;
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) {
      status.textContent = t(
        "Choose a valid time.",
        "Wähle eine gültige Uhrzeit.",
        "یک ساعت معتبر انتخاب کن.",
      );
      return;
    }
    const now = new Date().toISOString();
    const profile = profileNow();
    const current = chosenTime(profile);
    if (!current && profile.intentions.length >= 5) {
      status.textContent = t(
        "Five plans are already saved. Remove one in Settings first.",
        "Es sind bereits fünf Pläne gespeichert. Entferne zuerst einen in den Einstellungen.",
        "پنج برنامه ذخیره شده است. ابتدا یکی را در تنظیمات حذف کن.",
      );
      return;
    }
    const plans = current
      ? profile.intentions.map((row) =>
          row.id === current.id
            ? {
                ...row,
                trigger: "time" as const,
                triggerLabel: time,
                active: true,
              }
            : row,
        )
      : [
          ...profile.intentions,
          {
            id: "daily-practice-reminder",
            trigger: "time" as const,
            triggerLabel: time,
            action: "full_session" as const,
            active: true,
          },
        ];
    try {
      const next = replaceNudgeOptIn(
        replaceImplementationIntentions(profile, plans, now),
        true,
        now,
      );
      saveProfile(localStorage, next);
      savedTime = time;
      calendar.disabled = false;
      status.textContent = t(
        `Saved for ${time}. In-app prompts are on; add the calendar event for closed-app reminders.`,
        `Für ${time} gespeichert. Hinweise in der App sind an; für Erinnerungen bei geschlossener App füge den Kalendereintrag hinzu.`,
        `ساعت ${time} ذخیره شد. یادآوری داخل اپ روشن است؛ برای زمان بسته‌بودن اپ، آن را به تقویم اضافه کن.`,
      );
      window.dispatchEvent(new Event("adherence-reminder-changed"));
    } catch {
      status.textContent = t(
        "The time could not be saved on this device.",
        "Die Uhrzeit konnte auf diesem Gerät nicht gespeichert werden.",
        "ذخیرهٔ ساعت روی این دستگاه ممکن نشد.",
      );
    }
  };
  const downloadCalendar = () => {
    if (!savedTime || input.value !== savedTime) return;
    const content = buildDailyReminderCalendar({
      language,
      time: savedTime,
      now: new Date(),
    });
    const url = URL.createObjectURL(
      new Blob([content], { type: "text/calendar" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${language}-daily-practice-reminder.ics`;
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    status.textContent = t(
      "Import the file into your calendar. If you change or stop the time later, also change or remove the calendar event there.",
      "Importiere die Datei in deinen Kalender. Wenn du die Uhrzeit später änderst oder stoppst, ändere oder lösche auch dort den Kalendereintrag.",
      "فایل را در تقویم وارد کن. اگر بعداً ساعت را عوض یا خاموش کردی، رویداد تقویم را هم تغییر بده یا حذف کن.",
    );
  };
  input.addEventListener("input", inputChanged);
  save.addEventListener("click", saveTime);
  calendar.addEventListener("click", downloadCalendar);
  window.addEventListener("pageshow", refresh);
  window.addEventListener("automaticity:support-language", refresh);
  refresh();
  return {
    element: section,
    stop: () => {
      input.removeEventListener("input", inputChanged);
      save.removeEventListener("click", saveTime);
      calendar.removeEventListener("click", downloadCalendar);
      window.removeEventListener("pageshow", refresh);
      window.removeEventListener("automaticity:support-language", refresh);
    },
  };
}
