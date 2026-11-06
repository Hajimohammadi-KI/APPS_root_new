/** لایهٔ API؛ کنترلر، قرارداد و سرویس وظایف جدا دارند و پاسخ این مسیر به‌تنهایی وضعیت ذخیره‌شدهٔ زبان‌آموز را تغییر نمی‌دهد. */
// Explicit origin allowlist for the assessment API (roadmap R90). A pattern
// such as *.vercel.app would let every Vercel-hosted site call this API, so
// only the local development hosts and the canonical production URL are
// accepted unless CORS_ORIGINS overrides the list.
/** فهرست صریح مبدأهای محلی و دامنهٔ اصلی است؛ wildcard دامنه‌های میزبانی به آن افزوده نمی‌شود. */
export const DEFAULT_CORS_ORIGINS = [
  "http://127.0.0.1:3202",
  "http://localhost:3202",
  "http://127.0.0.1:3201",
  "http://localhost:3201",
  "http://127.0.0.1:3000",
  "http://localhost:3000",
  "https://english-grammar-automaticity-pwa.vercel.app",
];

/** رشتهٔ تنظیمات را به فهرست مبدأ مجاز CORS تبدیل می‌کند؛ در نبود مقدار قابل‌استفاده کپی پیش‌فرض برمی‌گردد و دامنه‌ای حدس زده نمی‌شود. ورودی‌ها: configured. */
export function allowedOrigins(configured = process.env.CORS_ORIGINS) {
  const origins = (configured ?? "")
    .split(",")
    .map(
      /** فاصلهٔ اطراف هر مبدأ تنظیم‌شده حذف می‌شود؛ wildcard یا دامنهٔ تازه‌ای به فهرست مجاز اضافه نمی‌شود. ورودی‌ها: origin. */
      (origin) => origin.trim(),
    )
    .filter(Boolean);
  return origins.length > 0 ? origins : [...DEFAULT_CORS_ORIGINS];
}
