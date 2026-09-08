import type { Language } from "./model";
export const stepNames = {
  en: [
    "Learn one pattern",
    "Fix one error",
    "Retrieve aloud",
    "Use it in a real situation",
    "Write it yourself",
    "Listen, shadow, retell",
    "Review and save",
  ],
  de: [
    "Ein Muster lernen",
    "Einen Fehler korrigieren",
    "Schnell abrufen",
    "Im Alltag anwenden",
    "Selbst schreiben",
    "Hören, mitsprechen, neu erzählen",
    "Prüfen und sichern",
  ],
};
export const faSteps = [
  "یک الگو یاد بگیر",
  "یک خطا را اصلاح کن",
  "سریع و بلند پاسخ بده",
  "در موقعیت واقعی استفاده کن",
  "خودت بنویس",
  "گوش بده، همراهی کن و بازگو کن",
  "مرور و ذخیره کن",
];
export const text = (language: Language, de: string, en: string) =>
  language === "de" ? de : en;
export const escapeHtml = (value: unknown): string =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (s) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        s
      ]!,
  );
