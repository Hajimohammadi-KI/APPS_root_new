/** منطق خالص دامنهٔ آلمانی؛ این ماژول مستقیماً شبکه، حافظهٔ مرورگر یا حساب کاربری را تغییر نمی‌دهد. */
/** واحد ثابت روز برای محاسبهٔ فاصله است؛ محاسبهٔ این ماژول تقویم محلی یا تغییر ساعت تابستانی را حدس نمی‌زند. */
const DAY_IN_MILLISECONDS = 86_400_000;

/** فاصله‌های مرور مصوب را به روز نگه می‌دارد؛ تغییر آن موعدها را تغییر می‌دهد و در این کار انجام نمی‌شود. */
export const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30] as const;

/** از تاریخ مبنا و تعداد روز، تاریخ تازه با فاصلهٔ میلی‌ثانیه‌ای ثابت می‌سازد؛ شیء ورودی تغییر نمی‌کند. ورودی‌ها: date، days. */
function addUtcDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * DAY_IN_MILLISECONDS);
}

/** همهٔ موعدهای مرور را از تاریخ پایان و فاصله‌های مصوب می‌سازد؛ ساخت موعد، مرور موفق یا اعلان زمان‌بندی‌شده نیست. ورودی‌ها: completedAt. */
export function getReviewSchedule(completedAt: Date): readonly Date[] {
  return REVIEW_INTERVAL_DAYS.map(
    /** در getReviewSchedule، هر عضو به شکل مورد نیاز مرحلهٔ بعد نگاشت می‌شود؛ ترتیب حفظ و ورودی بازنویسی نمی‌شود. ورودی‌ها: days. */
    (days) => addUtcDays(completedAt, days),
  );
}

/** تاریخ مبنا و شمار مرورها را به موعد فاصلهٔ بعدی تبدیل می‌کند؛ پایان جدول فاصله‌ها null می‌دهد. ورودی‌ها: completedAt، completedReviews. */
export function getNextReviewDate(
  completedAt: Date,
  completedReviews: number,
): Date | null {
  const interval = REVIEW_INTERVAL_DAYS[completedReviews];

  return interval === undefined ? null : addUtcDays(completedAt, interval);
}

/** ساختار «ReviewProgress» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export interface ReviewProgress {
  readonly stage: number;
  readonly dueAt: Date | null;
}

/** ساختار «ReviewConfidence» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export type ReviewConfidence = "hard" | "good" | "easy";

/** نتیجه، اعتماد و شمار مرور قبلی را به مرحله و موعد تازه تبدیل می‌کند؛ پیشروی/بازگشت از سیاست فعلی تبعیت می‌کند. ورودی‌ها: completedReviews، successful، now، confidence. */
export function getReviewProgressAfterResult(
  completedReviews: number,
  successful: boolean,
  now = new Date(),
  confidence: ReviewConfidence = "good",
): ReviewProgress {
  const successfulAdvance =
    confidence === "easy" ? 2 : confidence === "hard" ? 0 : 1;
  const stage = successful
    ? Math.min(
        REVIEW_INTERVAL_DAYS.length,
        completedReviews + successfulAdvance,
      )
    : Math.max(0, completedReviews - 1);
  return {
    stage,
    dueAt: getNextReviewDate(now, stage),
  };
}
