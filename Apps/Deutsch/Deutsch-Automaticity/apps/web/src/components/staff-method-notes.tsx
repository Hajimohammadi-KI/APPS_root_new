import { notebookCopy } from "@automaticity/learning-core/automaticity";
export function StaffMethodNotes({ language }: { language: "en" | "de" }) {
  const notes = notebookCopy(language);
  return (
    <section
      lang="fa"
      dir="rtl"
      style={{
        marginBlock: 24,
        padding: 24,
        border: "1px solid #cfe2e3",
        borderRadius: 16,
        lineHeight: 1.9,
      }}
    >
      <h2>روش ارزیابی و منشأ تمرین‌ها</h2>
      <h3>دفتر خطا</h3>
      <p lang={language} dir="ltr">
        {notes.source}
      </p>
      <p lang={language} dir="ltr">
        {notes.progressBasis}
      </p>
      <p>
        شمار پیشرفت بر اساس آخرین پاسخ به نسخهٔ فعال هر تمرین است؛ پاسخِ تازهٔ
        نیازمند اصلاح، قبولیِ قبلی را در شمار فعلی جایگزین می‌کند. سابقهٔ اصلی
        حذف نمی‌شود.
      </p>
      <h3>حدود گزارش</h3>
      <p>
        انجام تمرین، ارزیابی مستقل، انتقال به موقعیت تازه و بازیابی پس از فاصلهٔ
        زمانی جدا ثبت می‌شوند. پاسخ آزاد یا رونویسی خودکار، به‌تنهایی تأیید صحت
        گفتار یا سطح CEFR نیست.
      </p>
      <p>
        منشأ داده، روش محاسبه، معیارهای کیفیت، وضعیت داوری و جزئیات مدل در همین
        محیط حرفه‌ای بررسی می‌شوند. در محیط زبان‌آموز فقط نتیجهٔ کاربردی و
        راهنمای قدم بعدی نمایش داده می‌شود.
      </p>
    </section>
  );
}
