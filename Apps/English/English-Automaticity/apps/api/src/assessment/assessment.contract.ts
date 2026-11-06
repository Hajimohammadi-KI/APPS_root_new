/** لایهٔ API؛ کنترلر، قرارداد و سرویس وظایف جدا دارند و پاسخ این مسیر به‌تنهایی وضعیت ذخیره‌شدهٔ زبان‌آموز را تغییر نمی‌دهد. */
import { z } from "zod";

/** متن دقیق انگلیسی را با سقف حجم و زبان مجاز می‌پذیرد؛ فاصلهٔ ورودی پاک نمی‌شود تا مکان‌های سرویس معتبر بمانند. */
export const assessmentRequestSchema = z.object({
  // Preserve the source exactly: provider offsets must address the learner's text.
  text: z
    .string()
    .min(1)
    .max(20_000)
    .refine(
      /** شرط تکمیلی بازه یا متن بررسی می‌شود؛ معتبر بودن نوع پایه به‌تنهایی کافی نیست. ورودی‌ها: text. */
      (text) => text.trim().length > 0,
    ),
  language: z.enum(["en-US", "en-GB"]).default("en-US"),
});

/** ساختار «AssessmentRequest» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export type AssessmentRequest = z.infer<typeof assessmentRequestSchema>;

/** ساختار «LanguageToolMatch» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export interface LanguageToolMatch {
  message: string;
  shortMessage?: string;
  offset: number;
  length: number;
  replacements: Array<{ value: string }>;
  context?: {
    text: string;
    offset: number;
    length: number;
  };
  rule?: {
    id: string;
    category?: { id?: string; name?: string };
  };
}

/** ساختار «AssessmentResponse» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export interface AssessmentResponse {
  original: string;
  corrected: string;
  changed: boolean;
  online: true;
  matches: LanguageToolMatch[];
}

/** مکان و طول باید عدد صحیح غیرمنفی باشند؛ کنترل درون‌متن بودن در مرحلهٔ اعتبارسنجی پاسخ انجام می‌شود. */
const positionSchema = z.number().int().nonnegative();
/** بازهٔ متنِ زمینه باید در همان زمینه جا شود؛ زمینهٔ تشخیصی با مکان ویرایش متن اصلی اشتباه نمی‌شود. */
const contextSchema = z
  .object({
    text: z.string(),
    offset: positionSchema,
    length: positionSchema,
  })
  .refine(
    /** شرط تکمیلی بازه یا متن بررسی می‌شود؛ معتبر بودن نوع پایه به‌تنهایی کافی نیست. ورودی‌ها: context. */
    (context) =>
      context.offset <= context.text.length &&
      context.length <= context.text.length - context.offset,
    "Invalid context span",
  );

/** پاسخ بالادستی را پالایش و پیشنهادهای بدون مقدار را حذف می‌کند؛ کنترل بازه و هم‌پوشانی بعداً روی متن دقیق اجرا می‌شود. */
const languageToolResponseSchema = z.object({
  matches: z.array(
    z.object({
      message: z.string(),
      shortMessage: z.string().optional(),
      offset: positionSchema,
      length: positionSchema,
      // LanguageTool permits a suggestion object without a value. It is not an edit.
      replacements: z
        .array(z.object({ value: z.string().optional() }))
        .transform(
          /** پیشنهاد فاقد مقدار قابل‌ویرایش حذف می‌شود؛ نبود مقدار با رشتهٔ خالیِ جایگزین اشتباه گرفته نمی‌شود. ورودی‌ها: items. */
          (items) =>
            items.flatMap(
              /** ردیف معتبر به خروجی نگاشت و ردیف نامعتبر حذف می‌شود؛ حذف دادهٔ ناقص قبولی تازه تولید نمی‌کند. ورودی‌ها: item. */
              (item) =>
                item.value === undefined ? [] : [{ value: item.value }],
            ),
        ),
      context: contextSchema.optional(),
      rule: z
        .object({
          id: z.string(),
          category: z
            .object({ id: z.string().optional(), name: z.string().optional() })
            .optional(),
        })
        .optional(),
    }),
  ),
});

/** Validate offsets against the exact submitted UTF-16 string before editing. */
/** پاسخ ناشناختهٔ سرویس و بازه‌های آن را نسبت به متن دقیق اعتبارسنجی می‌کند؛ مجموعهٔ معتبرِ بدون ویرایش هم‌پوشان را می‌دهد یا خطا می‌دهد. ورودی‌ها: payload، text. */
export function parseLanguageToolResponse(
  payload: unknown,
  text: string,
): LanguageToolMatch[] {
  const { matches } = languageToolResponseSchema.parse(payload);
  /* اعضا با ترتیب و سیاست فعلی پردازش می‌شوند؛ بررسی یا تبدیل این حلقه، ذخیرهٔ مستقل وضعیت زبان‌آموز نیست. */
  for (const match of matches) {
    /* بازهٔ پیشنهاد باید داخل متن اصلی UTF-16 باشد؛ خروج از محدوده پیش از هر برش یا جایگزینی رد می‌شود. */
    if (
      match.offset > text.length ||
      match.length > text.length - match.offset
    ) {
      throw new Error("Invalid assessment source span");
    }
  }
  // Diagnostic spans may overlap. Proposed automatic edits must be unambiguous.
  const edits = matches
    .filter(
      /** در parseLanguageToolResponse، فقط اعضای مطابق شرط این مرحله انتخاب می‌شوند؛ خروجی زیرمجموعهٔ ورودی است و عضو تازه ساخته نمی‌شود. ورودی‌ها: match. */
      (match) => match.replacements.length > 0,
    )
    .toSorted(
      /** در parseLanguageToolResponse، مقایسهٔ عددی یک ترتیب تازه می‌سازد و آرایهٔ ورودی تغییر نمی‌کند. ورودی‌ها: left، right. */
      (left, right) => left.offset - right.offset,
    );
  let previous: LanguageToolMatch | undefined;
  /* اعضا با ترتیب و سیاست فعلی پردازش می‌شوند؛ بررسی یا تبدیل این حلقه، ذخیرهٔ مستقل وضعیت زبان‌آموز نیست. */
  for (const current of edits) {
    /* ویرایش هم‌مکان یا هم‌پوشان مبهم است و پیش از اعمال رد می‌شود؛ ترتیب ویرایش ابهام را مجاز نمی‌کند. */
    if (
      previous &&
      (current.offset === previous.offset ||
        current.offset < previous.offset + previous.length)
    ) {
      throw new Error("Overlapping assessment edits");
    }
    previous = current;
  }
  return matches;
}
