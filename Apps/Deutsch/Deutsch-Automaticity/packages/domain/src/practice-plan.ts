/** منطق خالص دامنهٔ آلمانی؛ این ماژول مستقیماً شبکه، حافظهٔ مرورگر یا حساب کاربری را تغییر نمی‌دهد. */
/** ساختار «DailyPracticeStep» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export interface DailyPracticeStep {
  readonly id: "grammar" | "read_aloud" | "coach_conversation";
  readonly label: string;
  readonly description: string;
  readonly minutes: number;
}

/** شناسه، متن و زمان فعالیت‌های معرفی‌شده را تعریف می‌کند؛ تعریف مرحله ثبت تکمیل یا ارزیابی آن نیست. */
export const DAILY_PRACTICE_STEPS = [
  {
    id: "grammar",
    label: "Aktivieren & anwenden",
    description:
      "Rufe die Struktur ohne Hilfe ab und nutze sie in einem eigenen Satz.",
    minutes: 3,
  },
  {
    id: "read_aloud",
    label: "Laut automatisieren",
    description:
      "Lies den korrigierten Satz zweimal mit natürlichem Rhythmus laut vor.",
    minutes: 4,
  },
  {
    id: "coach_conversation",
    label: "Frei übertragen",
    description:
      "Gib eine persönliche Antwort ohne Vorlage und speichere den Sprechnachweis.",
    minutes: 5,
  },
] as const satisfies readonly DailyPracticeStep[];
