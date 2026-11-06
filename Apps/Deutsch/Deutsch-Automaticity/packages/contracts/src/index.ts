/** قرارداد مشترک API آلمانی؛ اعتبارسنجی شکل داده از تصمیم آموزشی و ذخیرهٔ وضعیت زبان‌آموز جداست. */
import { z } from "zod";

/** شناسهٔ نسخهٔ قرارداد API است؛ تغییر آن تصمیم انتشار است و نباید از دادهٔ درخواست گرفته شود. */
export const apiVersion = "v1" as const;

/** فهرست برچسب‌های سطح مجاز در قرارداد است؛ حضور یک برچسب، تأیید واقعی سطح زبان‌آموز نیست. */
export const cefrLevelSchema = z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]);

/** شکل وضعیت سلامت و تاریخ پاسخ را می‌سنجد؛ سلامت شبکه را از نتیجهٔ آموزشی جدا نگه می‌دارد. */
export const healthResponseSchema = z.object({
  status: z.literal("ok"),
  service: z.literal("grammar-api"),
  version: z.string().min(1),
  timestamp: z.iso.datetime(),
});

/** دادهٔ آغاز رابط، اندازهٔ کاتالوگ و قابلیت‌های واقعی فعلی را می‌سنجد؛ قابلیت برنامه‌ریزی‌شده فعال اعلام نمی‌شود. */
export const bootstrapResponseSchema = z.object({
  apiVersion: z.literal(apiVersion),
  product: z.object({
    name: z.string().min(1),
    locale: z.literal("de"),
  }),
  content: z.object({
    topics: z.number().int().nonnegative(),
    grammarUnits: z.number().int().nonnegative(),
    levels: z.array(cefrLevelSchema),
  }),
  learning: z.object({
    dailySteps: z.array(
      z.object({
        id: z.string().min(1),
        label: z.string().min(1),
        minutes: z.number().int().positive(),
      }),
    ),
    reviewIntervalsDays: z.array(z.number().int().positive()),
  }),
  capabilities: z.object({
    persistence: z.literal("local-first"),
    sync: z.literal("planned"),
    languageFeedback: z.literal("external"),
  }),
});

/** نوع‌های تکلیف پذیرفته‌شدهٔ API را محدود می‌کند تا شاخهٔ ارزیابی نامعلوم وارد دامنه نشود. */
export const evaluationKindSchema = z.enum([
  "conversation",
  "free",
  "recall",
  "review",
  "sentences",
  "why",
]);

/** وضعیت‌های گزارش، از جمله زبان نامطمئن و نیاز به اصلاح، را صریح نگه می‌دارد؛ همهٔ آن‌ها قبولی نیستند. */
export const feedbackStatusSchema = z.enum([
  "correct",
  "nearly_correct",
  "wrong_language",
  "language_uncertain",
  "incomplete",
  "needs_revision",
]);

/** دسته‌های بازخورد قابل‌انتقال میان API و رابط را یکسان می‌کند؛ این دسته‌بندی جای پاسخ مرجع نیست. */
export const feedbackCategorySchema = z.enum([
  "wrong_output_language",
  "missing_word",
  "wrong_article",
  "wrong_case",
  "wrong_noun_ending",
  "wrong_plural_form",
  "wrong_verb_conjugation",
  "wrong_tense",
  "wrong_word_order",
  "wrong_preposition",
  "wrong_adjective_ending",
  "incomplete_sentence",
  "spelling_or_typo",
  "vocabulary_or_meaning",
  "register_or_style",
]);

/** متن عنوان، قاعده و مثال‌های هدف را با سقف حجم می‌پذیرد تا ورودی نامحدود به ارزیاب نرسد. */
export const grammarTargetSchema = z.object({
  title: z.string().min(1).max(300),
  rule: z.string().min(1).max(5_000),
  examples: z.array(z.string().max(2_000)).max(20),
});

/** متن، نوع تکلیف و هدف دستوری را پیش از سرویس بررسی می‌کند؛ فیلدهای آموزشی نامعتبر وارد دامنه نمی‌شوند. */
export const evaluationRequestSchema = z.object({
  text: z.string().trim().min(1).max(10_000),
  grammar: grammarTargetSchema,
  kind: evaluationKindSchema,
  taskPrompt: z.string().trim().max(2_000).optional(),
});

/** شکل تطبیق بالادستی و پیشنهاد اختیاری را تعریف می‌کند؛ وجود تطبیق لزوماً پیشنهاد قابل‌اعمال نیست. */
export const languageToolMatchSchema = z.object({
  offset: z.number().int().nonnegative(),
  length: z.number().int().nonnegative(),
  message: z.string().optional(),
  context: z
    .object({
      text: z.string().optional(),
    })
    .optional(),
  replacements: z
    .array(
      z.object({
        value: z.string().optional(),
      }),
    )
    .optional(),
  rule: z
    .object({
      issueType: z.string().optional(),
    })
    .optional(),
});

/** ساختار مشکل، شدت و راهنمای اختیاری را برای مصرف رابط محدود می‌کند؛ متن اصلی از متن پیشنهادی جداست. */
export const evaluationIssueSchema = z.object({
  type: z.string(),
  message: z.string(),
  context: z.string().optional(),
  suggestion: z.string().optional(),
  errorClass: z.enum([
    "word_order",
    "case",
    "article",
    "auxiliary",
    "ending",
    "tense",
    "agreement",
    "spelling",
    "target_grammar",
    "other",
  ]),
  severity: z.enum(["minor", "major", "critical"]),
  category: feedbackCategorySchema.optional(),
  userText: z.string().optional(),
  correctedText: z.string().optional(),
  explanation: z.string().optional(),
  hint: z.string().optional(),
});

/** هم شکل گزارش و هم سازگاری نمره/تأیید/زبان را کنترل می‌کند تا بی‌نمره به موفق تبدیل نشود. */
export const evaluationResponseSchema = z
  .object({
    original: z.string(),
    corrected: z.string(),
    changed: z.boolean(),
    matches: z.array(languageToolMatchSchema),
    online: z.boolean(),
    networkError: z.string().optional(),
    issues: z.array(evaluationIssueSchema),
    practiceReady: z.boolean(),
    verified: z.boolean(),
    ok: z.boolean(),
    targetHit: z.boolean(),
    relevant: z.boolean(),
    accuracyScore: z.number().min(0).max(100).nullable(),
    nextAction: z.enum(["repeat", "repair", "transfer", "schedule_review"]),
    status: feedbackStatusSchema.optional(),
    answerLanguage: z.enum(["de", "fa", "en", "other"]).optional(),
    correctParts: z.array(z.string()).optional(),
    nextActionText: z.string().optional(),
  })
  .superRefine(
    /** سازگاری نمره، تأیید و وضعیت زبان میان فیلدهای گزارش بررسی و تناقض به خطای قرارداد تبدیل می‌شود. ورودی‌ها: report، context. */
    (report, context) => {
      /* گزارش بی‌نمره نمی‌تواند تأییدشده یا موفق باشد؛ این تناقض قرارداد را رد می‌کند. */
      if (report.accuracyScore === null && (report.verified || report.ok)) {
        context.addIssue({
          code: "custom",
          path: ["accuracyScore"],
          message: "Unassessed answers cannot be verified or successful.",
        });
      }
      /* زبان نامطمئن باید نمرهٔ null داشته باشد؛ نمرهٔ عددی برای این وضعیت مجاز نیست. */
      if (
        report.status === "language_uncertain" &&
        report.accuracyScore !== null
      ) {
        context.addIssue({
          code: "custom",
          path: ["accuracyScore"],
          message: "Uncertain language has no grammar accuracy score.",
        });
      }
    },
  );

/** ساختار «CefrLevel» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export type CefrLevel = z.infer<typeof cefrLevelSchema>;
/** ساختار «HealthResponse» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export type HealthResponse = z.infer<typeof healthResponseSchema>;
/** ساختار «BootstrapResponse» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export type BootstrapResponse = z.infer<typeof bootstrapResponseSchema>;
/** ساختار «EvaluationKind» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export type EvaluationKind = z.infer<typeof evaluationKindSchema>;
/** ساختار «FeedbackStatus» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export type FeedbackStatus = z.infer<typeof feedbackStatusSchema>;
/** ساختار «FeedbackCategory» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export type FeedbackCategory = z.infer<typeof feedbackCategorySchema>;
/** ساختار «GrammarTarget» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export type GrammarTarget = z.infer<typeof grammarTargetSchema>;
/** ساختار «EvaluationRequest» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export type EvaluationRequest = z.infer<typeof evaluationRequestSchema>;
/** ساختار «EvaluationResponse» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export type EvaluationResponse = z.infer<typeof evaluationResponseSchema>;
