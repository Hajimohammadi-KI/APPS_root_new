/** منطق خالص دامنهٔ آلمانی؛ این ماژول مستقیماً شبکه، حافظهٔ مرورگر یا حساب کاربری را تغییر نمی‌دهد. */
import {
  calculateAutomaticityScore,
  calculateMasteryStatus,
  createEmptyMasteryRecord,
  setMasteryCriticalErrors,
  MASTERY_MODES,
  type MasteryMode,
  type MasteryRecord,
  type MasteryScores,
} from "./mastery";

export const LEGACY_STORAGE_KEY = "GrammarAutomaticityV11_de";

/** ساختار «LearnerSettings» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export interface LearnerSettings {
  readonly dailyStudyMinutes: 15 | 30 | 45 | 60;
  readonly minWords: number;
  readonly saveAudio: boolean;
  readonly grammarEngine: "languagetool";
  readonly readingProfile: "standard" | "dyslexia";
  readonly textScale: 100 | 112 | 125;
  readonly readingRuler: boolean;
  readonly lowStimulation: boolean;
  readonly timedChallenges: boolean;
  readonly showStreaks: boolean;
  readonly movementBreaks: boolean;
  readonly ttsRate: number;
  readonly spellingAffectsMastery: boolean;
}

export const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
/** ساختار «CefrLevel» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export type CefrLevel = (typeof CEFR_LEVELS)[number];
export const PLACEMENT_MODES = ["not_set", "manual", "optional_test"] as const;
/** ساختار «PlacementMode» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export type PlacementMode = (typeof PLACEMENT_MODES)[number];

/** ساختار «LearnerProfilePreferences» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export interface LearnerProfilePreferences {
  readonly displayName: string;
  readonly avatarDataUrl: string;
  readonly selfDeclaredLevel: CefrLevel | null;
  readonly verifiedLevel: CefrLevel | null;
  readonly placementMode: PlacementMode;
  readonly placementCheckedAt: string | null;
  readonly shareAcrossApps: boolean;
  readonly allowOnlineAI: boolean;
  readonly includeEvidenceInExport: boolean;
}

/** ساختار «OutcomeEvidence» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export interface OutcomeEvidence {
  readonly goal: string;
  readonly baselineScore: number | null;
  readonly followupScore: number | null;
  readonly retentionScore: number | null;
  readonly independentlyRated: boolean;
  readonly assessorNote: string;
}

export const ERROR_CLASSES = [
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
] as const;

/** ساختار «ErrorClass» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export type ErrorClass = (typeof ERROR_CLASSES)[number];

export const errorClassLabels: Readonly<Record<ErrorClass, string>> = {
  word_order: "Wortstellung",
  case: "Kasus",
  article: "Artikel",
  auxiliary: "Hilfsverb",
  ending: "Endung",
  tense: "Zeitform",
  agreement: "Kongruenz",
  spelling: "Rechtschreibung",
  target_grammar: "Zielgrammatik",
  other: "Sonstiger Fehler",
};

export const REPAIR_STATUSES = [
  "new",
  "scheduled",
  "improving",
  "fixed",
] as const;

/** ساختار «RepairStatus» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export type RepairStatus = (typeof REPAIR_STATUSES)[number];

/** نسخهٔ سیاست تطبیق مرجع سخت‌گیرانه را از سیاست قدیمی جدا می‌کند تا موفقیت‌های تاریخی مجوز تازه نسازند. */
export const STRICT_REPAIR_POLICY_VERSION =
  "reference-answer-case-punctuation-v1";

/** فاصلهٔ لازم از آخرین دیدن/شنیدن راهنما را تعریف می‌کند تا پاسخ با کمک، بازیابی مستقل شمرده نشود. */
const REPAIR_RECALL_DELAY_MS = 86_400_000;

/** ساختار «HistoricalRepairEvidence» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export interface HistoricalRepairEvidence {
  readonly policyVersion: string;
  readonly repairStatus: RepairStatus;
  readonly successfulRepairs: number;
}

export const repairStatusLabels: Readonly<Record<RepairStatus, string>> = {
  new: "Neu",
  scheduled: "Eingeplant",
  improving: "In Reparatur",
  fixed: "Stabil repariert",
};

/** ساختار «ErrorRecord» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export interface ErrorRecord {
  readonly id: string;
  readonly date: string;
  readonly topic: string;
  readonly original: string;
  readonly corrected: string;
  readonly errorClass: ErrorClass;
  readonly explanation: string;
  readonly occurrenceCount: number;
  readonly lastSeenAt: number;
  readonly repairStatus: RepairStatus;
  readonly nextRepairAt: number;
  readonly successfulRepairs: number;
  readonly repairPolicyVersion?: string;
  readonly repairHistory?: readonly HistoricalRepairEvidence[];
  readonly lastRepairHelpAt?: number;
  readonly repairHelpOpen?: boolean;
  readonly critical: boolean;
}

/** Old matching policies remain readable, but cannot qualify a fresh repair. */
/** رکورد خطا را با سیاست فعلی سازگار می‌کند؛ سابقهٔ قدیمی حفظ و موفقیت سیاست قبلی برای قبولی تازه مصرف نمی‌شود. ورودی‌ها: error. */
function withCurrentRepairPolicy(error: ErrorRecord): ErrorRecord {
  const nextRepairAt = Math.max(
    error.nextRepairAt,
    error.lastRepairHelpAt === undefined
      ? 0
      : error.lastRepairHelpAt + REPAIR_RECALL_DELAY_MS,
  );
  const current =
    nextRepairAt === error.nextRepairAt ? error : { ...error, nextRepairAt };
  /* نسخهٔ فعلی فقط از نظر شمار لازم سازگار می‌شود؛ نسخهٔ قدیمی در شاخهٔ بعد سابقهٔ مستقل نگه می‌دارد. */
  if (current.repairPolicyVersion === STRICT_REPAIR_POLICY_VERSION) {
    return current.repairStatus === "fixed" && current.successfulRepairs < 2
      ? {
          ...current,
          repairStatus:
            current.successfulRepairs === 1 ? "improving" : "scheduled",
        }
      : current;
  }
  return {
    ...current,
    repairPolicyVersion: STRICT_REPAIR_POLICY_VERSION,
    successfulRepairs: 0,
    repairStatus: current.repairStatus === "new" ? "new" : "scheduled",
    repairHistory: [
      ...(current.repairHistory ?? []),
      {
        policyVersion: current.repairPolicyVersion ?? "legacy-unversioned",
        repairStatus: current.repairStatus,
        successfulRepairs: current.successfulRepairs,
      },
    ],
  };
}

/** ساختار «ErrorRepairResult» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export interface ErrorRepairResult {
  readonly source: "strict_reference" | "legacy_review";
  readonly successful: boolean;
  readonly checkedAt: number;
  readonly nextRepairAt: number;
}

/** Seeing or hearing the correction requires another delayed recall attempt. */
/** دیدن/شنیدن راهنما را در نسخهٔ تازهٔ رکورد ثبت می‌کند و بازیابی مستقل بعدی را تا گذشت فاصلهٔ مقرر عقب می‌اندازد. ورودی‌ها: error، helpedAt. */
export function applyErrorRepairHelp(
  error: ErrorRecord,
  helpedAt: number,
): ErrorRecord {
  const current = withCurrentRepairPolicy(error);
  const lastRepairHelpAt = Math.max(current.lastRepairHelpAt ?? 0, helpedAt);
  return {
    ...current,
    lastRepairHelpAt,
    repairHelpOpen: true,
    nextRepairAt: Math.max(
      current.nextRepairAt,
      lastRepairHelpAt + REPAIR_RECALL_DELAY_MS,
    ),
  };
}

/** Delay starts after the last exposure, including help left open overnight. */
/** بسته‌شدن راهنمای باز را آخرین مواجهه محسوب می‌کند و موعد بازیابی تازه می‌دهد؛ بستن دوبارهٔ راهنمای بسته اثری ندارد. ورودی‌ها: error، closedAt. */
export function closeErrorRepairHelp(
  error: ErrorRecord,
  closedAt: number,
): ErrorRecord {
  const current = withCurrentRepairPolicy(error);
  /* بستن دوبارهٔ راهنمای بسته نباید زمان مواجهه و موعد بازیابی را مصنوعی جابه‌جا کند. */
  if (!current.repairHelpOpen) return current;
  return {
    ...applyErrorRepairHelp(current, closedAt),
    repairHelpOpen: false,
  };
}

/** Only a strict reference check may advance the current repair streak. */
/** نتیجهٔ اصلاح را به وضعیت تازه تبدیل می‌کند؛ فقط مرجع سخت‌گیرانه در زمان مجاز می‌تواند زنجیرهٔ موفقیت فعلی را جلو ببرد. ورودی‌ها: error، result. */
export function applyErrorRepairResult(
  error: ErrorRecord,
  result: ErrorRepairResult,
): ErrorRecord {
  const current = withCurrentRepairPolicy(error);
  /* موفقیت مرور قدیمی فقط موعد را عقب می‌برد و برای سیاست سخت‌گیرانه زنجیرهٔ موفقیت تازه نمی‌سازد. */
  if (result.source === "legacy_review" && result.successful) {
    return {
      ...current,
      nextRepairAt: Math.max(current.nextRepairAt, result.nextRepairAt),
    };
  }
  /* پاسخ موفقِ زودهنگام یا همراه راهنمای باز بازیابی مستقل نیست و رکورد فعلی حفظ می‌شود. */
  if (
    result.successful &&
    (current.repairHelpOpen || result.checkedAt < current.nextRepairAt)
  ) {
    return current;
  }
  const successfulRepairs = result.successful
    ? current.successfulRepairs + 1
    : 0;
  return {
    ...current,
    successfulRepairs,
    repairStatus: !result.successful
      ? "scheduled"
      : successfulRepairs >= 2
        ? "fixed"
        : "improving",
    nextRepairAt: result.nextRepairAt,
  };
}

export const REVIEW_SOURCE_TYPES = ["grammar_topic", "error_item"] as const;
/** ساختار «ReviewSourceType» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export type ReviewSourceType = (typeof REVIEW_SOURCE_TYPES)[number];

export const REVIEW_MODES = ["mixed", "repair", "production", "timed"] as const;
/** ساختار «ReviewMode» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export type ReviewMode = (typeof REVIEW_MODES)[number];

export const reviewModeLabels: Readonly<Record<ReviewMode, string>> = {
  mixed: "Gemischt",
  repair: "Reparatur",
  production: "Produktion",
  timed: "8-Sekunden-Abruf",
};

/** ساختار «ReviewRecord» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export interface ReviewRecord {
  readonly id: string;
  readonly due: number;
  readonly stage: number;
  readonly topic: string;
  readonly original: string;
  readonly corrected: string;
  readonly mastered?: boolean;
  readonly lastSuccess?: number;
  readonly sourceType: ReviewSourceType;
  readonly sourceId: string;
  readonly successStreak: number;
  readonly stabilityScore: number;
  readonly reviewMode: ReviewMode;
}

/** ساختار «SessionRecord» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export interface SessionRecord {
  readonly id: string;
  readonly date: string;
  readonly topic: {
    readonly topic?: string;
    readonly level?: string;
    readonly category?: string;
  } | null;
  readonly transcript: string;
  readonly corrected: string;
  readonly accuracyScore?: number;
  readonly fluencyScore?: number;
  readonly latencyMs?: number;
}

/** ساختار «UserAttempt» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export interface UserAttempt {
  readonly id: string;
  readonly date: string;
  readonly topic: string;
  readonly mode: MasteryMode;
  readonly inputText: string;
  readonly correctedText: string;
  readonly targetHit: boolean;
  /** False for self-report or unverified offline assessment. */
  readonly verified?: boolean;
  readonly accuracyScore: number;
  readonly fluencyScore?: number;
  readonly latencyMs?: number;
  readonly audioPath?: string;
}

/** ساختار «DailyPlanRecord» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export interface DailyPlanRecord {
  readonly completed: readonly number[];
  readonly answers: Readonly<Record<string, string>>;
}

/** ساختار «TodayGrammarRecord» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export interface TodayGrammarRecord {
  readonly title: string;
  readonly level: string;
  readonly date: string;
}

/** ساختار «LearnerState» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export interface LearnerState {
  readonly settings: LearnerSettings;
  readonly learner: LearnerProfilePreferences;
  readonly outcomes: OutcomeEvidence;
  readonly errors: readonly ErrorRecord[];
  readonly activity: Readonly<Record<string, number>>;
  readonly reviews: readonly ReviewRecord[];
  readonly sessions: readonly SessionRecord[];
  readonly attempts: readonly UserAttempt[];
  readonly mastery: Readonly<Record<string, MasteryRecord>>;
  readonly dailyPlans: Readonly<Record<string, DailyPlanRecord>>;
  readonly learningLevel?: string | null;
  readonly todayGrammar?: TodayGrammarRecord | null;
}

/** پیش‌فرض‌های نبود/نامعتبر بودن تنظیمات‌اند؛ انتخاب معتبر خوانده‌شده در نرمال‌سازی به‌جای آن‌ها حفظ می‌شود. */
const DEFAULT_SETTINGS: LearnerSettings = {
  dailyStudyMinutes: 15,
  minWords: 12,
  saveAudio: false,
  grammarEngine: "languagetool",
  readingProfile: "dyslexia",
  textScale: 112,
  readingRuler: false,
  lowStimulation: false,
  timedChallenges: false,
  showStreaks: false,
  movementBreaks: true,
  ttsRate: 0.9,
  spellingAffectsMastery: false,
};

/** پروفایل آغازین بدون تأیید سطح یا رضایت ساختگی است؛ مقدار معتبر پروفایل واردشده جدا بررسی می‌شود. */
const DEFAULT_LEARNER_PROFILE: LearnerProfilePreferences = {
  displayName: "",
  avatarDataUrl: "",
  selfDeclaredLevel: null,
  verifiedLevel: null,
  placementMode: "not_set",
  placementCheckedAt: null,
  shareAcrossApps: true,
  allowOnlineAI: false,
  includeEvidenceInExport: true,
};

/** شواهد نتیجه در آغاز اندازه‌گیری نشده‌اند؛ null را نباید امتیاز صفر یا اثر اثبات‌شده دانست. */
const DEFAULT_OUTCOME_EVIDENCE: OutcomeEvidence = {
  goal: "Deutsch spontan, korrekt und verständlich sprechen und schreiben",
  baselineScore: null,
  followupScore: null,
  retentionScore: null,
  independentlyRated: false,
  assessorNote: "",
};

/** مجموعهٔ مقادیر مجاز برای گاردهای دادهٔ واردشده است؛ عضویت فقط اعتبار برچسب را می‌سنجد و شاهد آموزشی نمی‌سازد. */
const LEARNING_LEVELS = new Set<string>(CEFR_LEVELS);
/** مجموعهٔ مقادیر مجاز برای گاردهای دادهٔ واردشده است؛ عضویت فقط اعتبار برچسب را می‌سنجد و شاهد آموزشی نمی‌سازد. */
const PLACEMENT_MODE_SET = new Set<string>(PLACEMENT_MODES);
/** مجموعهٔ مقادیر مجاز برای گاردهای دادهٔ واردشده است؛ عضویت فقط اعتبار برچسب را می‌سنجد و شاهد آموزشی نمی‌سازد. */
const ERROR_CLASS_SET = new Set<string>(ERROR_CLASSES);
/** مجموعهٔ مقادیر مجاز برای گاردهای دادهٔ واردشده است؛ عضویت فقط اعتبار برچسب را می‌سنجد و شاهد آموزشی نمی‌سازد. */
const REPAIR_STATUS_SET = new Set<string>(REPAIR_STATUSES);
/** مجموعهٔ مقادیر مجاز برای گاردهای دادهٔ واردشده است؛ عضویت فقط اعتبار برچسب را می‌سنجد و شاهد آموزشی نمی‌سازد. */
const REVIEW_SOURCE_TYPE_SET = new Set<string>(REVIEW_SOURCE_TYPES);
/** مجموعهٔ مقادیر مجاز برای گاردهای دادهٔ واردشده است؛ عضویت فقط اعتبار برچسب را می‌سنجد و شاهد آموزشی نمی‌سازد. */
const REVIEW_MODE_SET = new Set<string>(REVIEW_MODES);
/** مجموعهٔ مقادیر مجاز برای گاردهای دادهٔ واردشده است؛ عضویت فقط اعتبار برچسب را می‌سنجد و شاهد آموزشی نمی‌سازد. */
const MASTERY_MODE_SET = new Set<string>(MASTERY_MODES);

/** شیء غیرتهی و غیرآرایه را از ورودی ناشناخته تشخیص می‌دهد؛ گارد نوع برای خواندن امن فیلدهای واردشده است. ورودی‌ها: value. */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** نوع رشته را بررسی می‌کند؛ هیچ تبدیل اجباری یا اصلاح متن در این گارد انجام نمی‌شود. ورودی‌ها: value. */
function isString(value: unknown): value is string {
  return typeof value === "string";
}

/** امتیاز را گرد و به صفر تا صد محدود می‌کند؛ در مسیر ورودی ناشناخته، مقدار نامعتبر از پیش‌فرض تعیین‌شده استفاده می‌کند. ورودی‌ها: value، fallback. */
function clampScore(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value)
    ? Math.round(Math.min(100, Math.max(0, value)))
    : fallback;
}

/** عدد معتبر را گرد و محدود می‌کند؛ مقدار نامعتبر null می‌ماند تا نبود سنجش با صفرِ سنجیده‌شده اشتباه نشود. ورودی‌ها: value. */
function normalizeOutcomeScore(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value)
    ? Math.round(Math.min(100, Math.max(0, value)))
    : null;
}

/** رشته بودن و عضویت در مجموعهٔ مجاز را هم‌زمان بررسی می‌کند؛ عدد یا شیء به برچسب معتبر تبدیل نمی‌شود. ورودی‌ها: value، values. */
function isStringInSet(value: unknown, values: ReadonlySet<string>): boolean {
  return isString(value) && values.has(value);
}

/** ردیف‌های معتبر تاریخچهٔ سیاست اصلاح را با شمار غیرمنفی نگه می‌دارد؛ این سابقه از نتیجهٔ سیاست فعلی جدا باقی می‌ماند. ورودی‌ها: value. */
function normalizeRepairHistory(
  value: unknown,
): readonly HistoricalRepairEvidence[] {
  /* ورودی غیرآرایه به مجموعهٔ خالی برمی‌گردد؛ شیء یا متن به سابقهٔ ساختگی تبدیل نمی‌شود. */
  if (!Array.isArray(value)) return [];
  return value.flatMap(
    /** در normalizeRepairHistory، ردیف معتبر به خروجی نگاشت و ردیف نامعتبر حذف می‌شود؛ حذف دادهٔ ناقص قبولی تازه تولید نمی‌کند. ورودی‌ها: row. */
    (row) =>
      isRecord(row) &&
      isString(row.policyVersion) &&
      isStringInSet(row.repairStatus, REPAIR_STATUS_SET) &&
      typeof row.successfulRepairs === "number" &&
      Number.isFinite(row.successfulRepairs)
        ? [
            {
              policyVersion: row.policyVersion,
              repairStatus: row.repairStatus as RepairStatus,
              successfulRepairs: Math.max(0, Math.floor(row.successfulRepairs)),
            },
          ]
        : [],
  );
}

/** رکوردهای ذخیره‌شده را پالایش و با سیاست فعلی سازگار می‌کند؛ متن اصلی/اصلاح‌شدهٔ معتبر حفظ و فیلدهای کمکی نامعتبر محدود می‌شوند. ورودی‌ها: value. */
function normalizeErrors(value: unknown): readonly ErrorRecord[] {
  /* ورودی غیرآرایه به مجموعهٔ خالی برمی‌گردد؛ شیء یا متن به سابقهٔ ساختگی تبدیل نمی‌شود. */
  if (!Array.isArray(value)) {
    return [];
  }
  return value.flatMap(
    /** در normalizeErrors، ردیف معتبر به خروجی نگاشت و ردیف نامعتبر حذف می‌شود؛ حذف دادهٔ ناقص قبولی تازه تولید نمی‌کند. ورودی‌ها: row، index. */
    (row, index) => {
      /* ردیف فاقد شکل یا فیلدهای اجباری از خروجی حذف می‌شود؛ مقدار ناقص شاهد معتبر نمی‌شود. */
      if (
        !isRecord(row) ||
        !isString(row.date) ||
        !isString(row.topic) ||
        !isString(row.original) ||
        !isString(row.corrected)
      ) {
        return [];
      }
      const seenAt =
        typeof row.lastSeenAt === "number"
          ? row.lastSeenAt
          : Date.parse(row.date) || Date.now();
      const errorClass = isStringInSet(row.errorClass, ERROR_CLASS_SET)
        ? (row.errorClass as ErrorClass)
        : "other";
      const repairStatus = isStringInSet(row.repairStatus, REPAIR_STATUS_SET)
        ? (row.repairStatus as RepairStatus)
        : "new";
      const lastRepairHelpAt =
        typeof row.lastRepairHelpAt === "number" &&
        Number.isFinite(row.lastRepairHelpAt) &&
        row.lastRepairHelpAt >= 0
          ? row.lastRepairHelpAt
          : undefined;
      return [
        withCurrentRepairPolicy({
          id: isString(row.id) ? row.id : `legacy-error-${index}`,
          date: row.date,
          topic: row.topic,
          original: row.original,
          corrected: row.corrected,
          errorClass,
          explanation: isString(row.explanation)
            ? row.explanation
            : "Diese Korrektur wurde aus dem bisherigen Fehlerspeicher übernommen.",
          occurrenceCount:
            typeof row.occurrenceCount === "number"
              ? Math.max(1, Math.floor(row.occurrenceCount))
              : 1,
          lastSeenAt: seenAt,
          repairStatus,
          nextRepairAt: Math.max(
            typeof row.nextRepairAt === "number" &&
              Number.isFinite(row.nextRepairAt)
              ? row.nextRepairAt
              : seenAt,
            lastRepairHelpAt === undefined
              ? 0
              : lastRepairHelpAt + REPAIR_RECALL_DELAY_MS,
          ),
          successfulRepairs:
            typeof row.successfulRepairs === "number" &&
            Number.isFinite(row.successfulRepairs)
              ? Math.max(0, Math.floor(row.successfulRepairs))
              : 0,
          ...(isString(row.repairPolicyVersion)
            ? { repairPolicyVersion: row.repairPolicyVersion }
            : {}),
          repairHistory: normalizeRepairHistory(row.repairHistory),
          ...(lastRepairHelpAt === undefined ? {} : { lastRepairHelpAt }),
          ...(typeof row.repairHelpOpen === "boolean"
            ? { repairHelpOpen: row.repairHelpOpen }
            : {}),
          critical:
            typeof row.critical === "boolean"
              ? row.critical
              : errorClass !== "spelling" && errorClass !== "other",
        }),
      ];
    },
  );
}

/** مرورها را اعتبارسنجی و فیلدهای سازگاری را تکمیل می‌کند؛ حذف ردیف ناقص هیچ قبولی تازه‌ای تولید نمی‌کند. ورودی‌ها: value. */
function normalizeReviews(value: unknown): readonly ReviewRecord[] {
  /* ورودی غیرآرایه به مجموعهٔ خالی برمی‌گردد؛ شیء یا متن به سابقهٔ ساختگی تبدیل نمی‌شود. */
  if (!Array.isArray(value)) {
    return [];
  }
  return value.flatMap(
    /** در normalizeReviews، ردیف معتبر به خروجی نگاشت و ردیف نامعتبر حذف می‌شود؛ حذف دادهٔ ناقص قبولی تازه تولید نمی‌کند. ورودی‌ها: row، index. */
    (row, index) => {
      /* ردیف فاقد شکل یا فیلدهای اجباری از خروجی حذف می‌شود؛ مقدار ناقص شاهد معتبر نمی‌شود. */
      if (
        !isRecord(row) ||
        !isString(row.topic) ||
        !isString(row.original) ||
        !isString(row.corrected)
      ) {
        return [];
      }
      return [
        {
          id: isString(row.id) ? row.id : `legacy-review-${index}`,
          due: typeof row.due === "number" ? row.due : Date.now(),
          stage:
            typeof row.stage === "number"
              ? Math.max(0, Math.floor(row.stage))
              : 0,
          topic: row.topic,
          original: row.original,
          corrected: row.corrected,
          ...(typeof row.mastered === "boolean"
            ? { mastered: row.mastered }
            : {}),
          ...(typeof row.lastSuccess === "number"
            ? { lastSuccess: row.lastSuccess }
            : {}),
          sourceType: isStringInSet(row.sourceType, REVIEW_SOURCE_TYPE_SET)
            ? (row.sourceType as ReviewSourceType)
            : "grammar_topic",
          sourceId: isString(row.sourceId) ? row.sourceId : row.topic,
          successStreak:
            typeof row.successStreak === "number"
              ? Math.max(0, Math.floor(row.successStreak))
              : 0,
          stabilityScore: clampScore(row.stabilityScore),
          reviewMode: isStringInSet(row.reviewMode, REVIEW_MODE_SET)
            ? (row.reviewMode as ReviewMode)
            : "production",
        },
      ];
    },
  );
}

/** جلسه‌های دارای متن و تاریخ معتبر را بازسازی می‌کند؛ تنها فراداده و امتیاز دارای نوع مجاز نگه داشته می‌شود. ورودی‌ها: value. */
function normalizeSessions(value: unknown): readonly SessionRecord[] {
  /* ورودی غیرآرایه به مجموعهٔ خالی برمی‌گردد؛ شیء یا متن به سابقهٔ ساختگی تبدیل نمی‌شود. */
  if (!Array.isArray(value)) {
    return [];
  }
  return value.flatMap(
    /** در normalizeSessions، ردیف معتبر به خروجی نگاشت و ردیف نامعتبر حذف می‌شود؛ حذف دادهٔ ناقص قبولی تازه تولید نمی‌کند. ورودی‌ها: row، index. */
    (row, index) => {
      /* ردیف فاقد شکل یا فیلدهای اجباری از خروجی حذف می‌شود؛ مقدار ناقص شاهد معتبر نمی‌شود. */
      if (
        !isRecord(row) ||
        !isString(row.date) ||
        !isString(row.transcript) ||
        !isString(row.corrected)
      ) {
        return [];
      }
      const topic = isRecord(row.topic)
        ? {
            ...(isString(row.topic.topic) ? { topic: row.topic.topic } : {}),
            ...(isString(row.topic.level) ? { level: row.topic.level } : {}),
            ...(isString(row.topic.category)
              ? { category: row.topic.category }
              : {}),
          }
        : null;
      return [
        {
          id: isString(row.id) ? row.id : `legacy-session-${index}`,
          date: row.date,
          topic,
          transcript: row.transcript,
          corrected: row.corrected,
          ...(typeof row.accuracyScore === "number"
            ? { accuracyScore: clampScore(row.accuracyScore) }
            : {}),
          ...(typeof row.fluencyScore === "number"
            ? { fluencyScore: clampScore(row.fluencyScore) }
            : {}),
          ...(typeof row.latencyMs === "number"
            ? { latencyMs: Math.max(0, Math.round(row.latencyMs)) }
            : {}),
        },
      ];
    },
  );
}

/** تلاش‌های ذخیره‌شده را پالایش می‌کند؛ تأیید فقط از verified صریح true می‌آید و متن پاسخ با پیشنهاد جایگزین نمی‌شود. ورودی‌ها: value. */
function normalizeAttempts(value: unknown): readonly UserAttempt[] {
  /* ورودی غیرآرایه به مجموعهٔ خالی برمی‌گردد؛ شیء یا متن به سابقهٔ ساختگی تبدیل نمی‌شود. */
  if (!Array.isArray(value)) {
    return [];
  }
  return value.flatMap(
    /** در normalizeAttempts، ردیف معتبر به خروجی نگاشت و ردیف نامعتبر حذف می‌شود؛ حذف دادهٔ ناقص قبولی تازه تولید نمی‌کند. ورودی‌ها: row، index. */
    (row, index) => {
      /* ردیف فاقد شکل یا فیلدهای اجباری از خروجی حذف می‌شود؛ مقدار ناقص شاهد معتبر نمی‌شود. */
      if (
        !isRecord(row) ||
        !isString(row.date) ||
        !isString(row.topic) ||
        !isString(row.inputText) ||
        !isString(row.correctedText) ||
        !isStringInSet(row.mode, MASTERY_MODE_SET) ||
        typeof row.targetHit !== "boolean"
      ) {
        return [];
      }

      return [
        {
          id: isString(row.id) ? row.id : `legacy-attempt-${index}`,
          date: row.date,
          topic: row.topic,
          mode: row.mode as MasteryMode,
          inputText: row.inputText,
          correctedText: row.correctedText,
          targetHit: row.targetHit,
          verified: row.verified === true,
          accuracyScore: clampScore(row.accuracyScore),
          ...(typeof row.fluencyScore === "number"
            ? { fluencyScore: clampScore(row.fluencyScore) }
            : {}),
          ...(typeof row.latencyMs === "number"
            ? { latencyMs: Math.max(0, Math.round(row.latencyMs)) }
            : {}),
          ...(isString(row.audioPath) ? { audioPath: row.audioPath } : {}),
        },
      ];
    },
  );
}

/** نگاشت روز و شمار فعالیت را به اعداد متناهی غیرمنفی محدود می‌کند؛ این آمار فعالیت است و اثبات تسلط نیست. ورودی‌ها: value. */
function normalizeActivity(value: unknown): Readonly<Record<string, number>> {
  /* ورودی فاقد ساختار شیء/نگاشت به پیش‌فرض همین بخش برمی‌گردد؛ دادهٔ حدسی ساخته نمی‌شود. */
  if (!isRecord(value)) {
    return {};
  }
  return Object.fromEntries(
    Object.entries(value).flatMap(
      /** در normalizeActivity، ردیف معتبر به خروجی نگاشت و ردیف نامعتبر حذف می‌شود؛ حذف دادهٔ ناقص قبولی تازه تولید نمی‌کند. ورودی‌ها: [date, amount]. */
      ([date, amount]) =>
        typeof amount === "number" && Number.isFinite(amount)
          ? [[date, Math.max(0, Math.floor(amount))]]
          : [],
    ),
  );
}

/** گزارش مهارت را از شواهد موجود بازحساب می‌کند؛ پرچم قدیمی به‌تنهایی وضعیت خودکاری نمی‌دهد و فهرست تأخیر محدود می‌ماند. ورودی‌ها: value. */
function normalizeMastery(
  value: unknown,
): Readonly<Record<string, MasteryRecord>> {
  /* ورودی فاقد ساختار شیء/نگاشت به پیش‌فرض همین بخش برمی‌گردد؛ دادهٔ حدسی ساخته نمی‌شود. */
  if (!isRecord(value)) {
    return {};
  }
  return Object.fromEntries(
    Object.entries(value).flatMap(
      /** در normalizeMastery، ردیف معتبر به خروجی نگاشت و ردیف نامعتبر حذف می‌شود؛ حذف دادهٔ ناقص قبولی تازه تولید نمی‌کند. ورودی‌ها: [title, row]. */
      ([title, row]) => {
        /* ردیف فاقد شکل یا فیلدهای اجباری از خروجی حذف می‌شود؛ مقدار ناقص شاهد معتبر نمی‌شود. */
        if (!isRecord(row)) {
          return [];
        }

        const controlled =
          typeof row.controlled === "boolean" ? row.controlled : false;
        const free = typeof row.free === "boolean" ? row.free : false;
        const spoken = typeof row.spoken === "boolean" ? row.spoken : undefined;
        const rawScores = isRecord(row.scores) ? row.scores : null;
        /** امتیازهای جدید بر پرچم سازگاری قدیمی مقدم‌اند؛ بازسازی پرچم‌های قدیمی به‌تنهایی آستانهٔ خودکاری را باز نمی‌کند. */
        const baseScores: Omit<MasteryScores, "automaticity"> = rawScores
          ? {
              recognition: clampScore(rawScores.recognition),
              writing: clampScore(rawScores.writing),
              speaking: clampScore(rawScores.speaking),
              repair: clampScore(rawScores.repair),
              transfer: clampScore(rawScores.transfer),
            }
          : {
              recognition: controlled ? 100 : 0,
              writing: free ? 80 : 0,
              speaking: spoken ? 80 : 0,
              repair: 0,
              transfer: 0,
            };
        const successfulReviews =
          typeof row.successfulReviews === "number"
            ? Math.max(0, Math.floor(row.successfulReviews))
            : 0;
        const activeCriticalErrors =
          typeof row.activeCriticalErrors === "number"
            ? Math.max(0, Math.floor(row.activeCriticalErrors))
            : 0;
        const responseLatenciesMs = Array.isArray(row.responseLatenciesMs)
          ? row.responseLatenciesMs
              .filter(
                /** در normalizeMastery، فقط اعضای مطابق شرط این مرحله انتخاب می‌شوند؛ خروجی زیرمجموعهٔ ورودی است و عضو تازه ساخته نمی‌شود. ورودی‌ها: latency. */
                (latency): latency is number =>
                  typeof latency === "number" && Number.isFinite(latency),
              )
              .map(
                /** در normalizeMastery، هر عضو به شکل مورد نیاز مرحلهٔ بعد نگاشت می‌شود؛ ترتیب حفظ و ورودی بازنویسی نمی‌شود. ورودی‌ها: latency. */
                (latency) => Math.max(0, Math.round(latency)),
              )
              .slice(-10)
          : [];
        const scores: MasteryScores = {
          ...baseScores,
          automaticity: calculateAutomaticityScore(
            baseScores,
            successfulReviews,
            activeCriticalErrors,
            responseLatenciesMs,
          ),
        };
        const calculatedStatus = calculateMasteryStatus(
          scores,
          successfulReviews,
          activeCriticalErrors,
          responseLatenciesMs,
        );
        const empty = createEmptyMasteryRecord();

        return [
          [
            title,
            {
              ...empty,
              status: calculatedStatus,
              scores,
              successfulReviews,
              activeCriticalErrors,
              responseLatenciesMs,
              controlled,
              free,
              ...(spoken === undefined ? {} : { spoken }),
              ...(typeof row.completedAt === "number"
                ? { completedAt: row.completedAt }
                : {}),
              ...(typeof row.lastSuccessAt === "number"
                ? { lastSuccessAt: row.lastSuccessAt }
                : {}),
            },
          ],
        ];
      },
    ),
  );
}

/** پاسخ‌های رشته‌ای روزانه را دست‌نخورده نگه می‌دارد و مرحله‌های معتبر را بدون تکرار مرتب می‌کند؛ دادهٔ ناقص شاهد تکمیل نمی‌شود. ورودی‌ها: value. */
function normalizeDailyPlans(
  value: unknown,
): Readonly<Record<string, DailyPlanRecord>> {
  /* ورودی فاقد ساختار شیء/نگاشت به پیش‌فرض همین بخش برمی‌گردد؛ دادهٔ حدسی ساخته نمی‌شود. */
  if (!isRecord(value)) {
    return {};
  }
  return Object.fromEntries(
    Object.entries(value).flatMap(
      /** در normalizeDailyPlans، ردیف معتبر به خروجی نگاشت و ردیف نامعتبر حذف می‌شود؛ حذف دادهٔ ناقص قبولی تازه تولید نمی‌کند. ورودی‌ها: [date, row]. */
      ([date, row]) => {
        /* ردیف فاقد شکل یا فیلدهای اجباری از خروجی حذف می‌شود؛ مقدار ناقص شاهد معتبر نمی‌شود. */
        if (!isRecord(row)) {
          return [];
        }
        const answers = isRecord(row.answers)
          ? Object.fromEntries(
              Object.entries(row.answers).flatMap(
                /** در normalizeDailyPlans، ردیف معتبر به خروجی نگاشت و ردیف نامعتبر حذف می‌شود؛ حذف دادهٔ ناقص قبولی تازه تولید نمی‌کند. ورودی‌ها: [key, answer]. */
                ([key, answer]) => (isString(answer) ? [[key, answer]] : []),
              ),
            )
          : {};
        const completed = Array.isArray(row.completed)
          ? [
              ...new Set(
                row.completed.filter(
                  /** در normalizeDailyPlans، فقط اعضای مطابق شرط این مرحله انتخاب می‌شوند؛ خروجی زیرمجموعهٔ ورودی است و عضو تازه ساخته نمی‌شود. ورودی‌ها: step. */
                  (step): step is number =>
                    typeof step === "number" &&
                    Number.isInteger(step) &&
                    step >= 0 &&
                    step <= 6,
                ),
              ),
            ].sort(
              /** در normalizeDailyPlans، مقایسهٔ عددی ترتیب لازم محاسبه را مشخص می‌کند؛ مرتب‌شدن امتیاز تازه‌ای ایجاد نمی‌کند. ورودی‌ها: left، right. */
              (left, right) => left - right,
            )
          : [];
        return [[date, { completed, answers }]];
      },
    ),
  );
}

/** وضعیت اولیه با تنظیمات فعلی و سابقهٔ خالی می‌سازد؛ هیچ نوشتن یا پاک‌سازی حافظهٔ زبان‌آموز در این تابع رخ نمی‌دهد. */
export function createInitialLearnerState(): LearnerState {
  return {
    settings: DEFAULT_SETTINGS,
    learner: DEFAULT_LEARNER_PROFILE,
    outcomes: DEFAULT_OUTCOME_EVIDENCE,
    errors: [],
    activity: {},
    reviews: [],
    sessions: [],
    attempts: [],
    mastery: {},
    dailyPlans: {},
    learningLevel: null,
  };
}

/** کل وضعیت ناشناخته را به ساختار فعلی تبدیل می‌کند؛ انتخاب معتبر حفظ و خطاهای بحرانیِ مرتبط با گزارش مهارت هماهنگ می‌شوند. ورودی‌ها: value. */
export function normalizeLearnerState(value: unknown): LearnerState {
  const initial = createInitialLearnerState();
  /* ورودی فاقد ساختار شیء/نگاشت به پیش‌فرض همین بخش برمی‌گردد؛ دادهٔ حدسی ساخته نمی‌شود. */
  if (!isRecord(value)) {
    return initial;
  }

  const settings = isRecord(value.settings) ? value.settings : {};
  const learner = isRecord(value.learner) ? value.learner : {};
  const outcomes = isRecord(value.outcomes) ? value.outcomes : {};
  const todayGrammar = isRecord(value.todayGrammar) ? value.todayGrammar : null;
  const errors = normalizeErrors(value.errors);
  const previousMastery = normalizeMastery(value.mastery);
  const topicsWithErrors = new Set(
    errors.map(
      /** در normalizeLearnerState، هر عضو به شکل مورد نیاز مرحلهٔ بعد نگاشت می‌شود؛ ترتیب حفظ و ورودی بازنویسی نمی‌شود. ورودی‌ها: error. */
      (error) => error.topic,
    ),
  );
  /** خطاهای بحرانی موضوع‌های دارای رکورد با مهارت هماهنگ می‌شوند؛ نبود جزئیات نباید خطاهای بحرانی تاریخی را پاک و قفل مهارت را باز کند. */
  const mastery = {
    // An imported aggregate can outlive its detailed records. Missing detail
    // must not erase its historical critical errors and unlock mastery.
    ...previousMastery,
    ...Object.fromEntries(
      [...topicsWithErrors].map(
        /** در normalizeLearnerState، هر عضو به شکل مورد نیاز مرحلهٔ بعد نگاشت می‌شود؛ ترتیب حفظ و ورودی بازنویسی نمی‌شود. ورودی‌ها: topic. */
        (topic) => [
          topic,
          setMasteryCriticalErrors(
            previousMastery[topic],
            errors.filter(
              /** در normalizeLearnerState، فقط اعضای مطابق شرط این مرحله انتخاب می‌شوند؛ خروجی زیرمجموعهٔ ورودی است و عضو تازه ساخته نمی‌شود. ورودی‌ها: error. */
              (error) =>
                error.topic === topic &&
                error.critical &&
                error.repairStatus !== "fixed",
            ).length,
          ),
        ],
      ),
    ),
  };

  return {
    ...initial,
    settings: {
      ...DEFAULT_SETTINGS,
      ...settings,
      grammarEngine: "languagetool",
      dailyStudyMinutes:
        settings.dailyStudyMinutes === 30 ||
        settings.dailyStudyMinutes === 45 ||
        settings.dailyStudyMinutes === 60
          ? settings.dailyStudyMinutes
          : 15,
      minWords:
        typeof settings.minWords === "number"
          ? Math.min(200, Math.max(5, settings.minWords))
          : DEFAULT_SETTINGS.minWords,
      saveAudio:
        typeof settings.saveAudio === "boolean"
          ? settings.saveAudio
          : DEFAULT_SETTINGS.saveAudio,
      readingProfile:
        settings.readingProfile === "standard" ||
        settings.readingProfile === "dyslexia"
          ? settings.readingProfile
          : DEFAULT_SETTINGS.readingProfile,
      textScale:
        settings.textScale === 100 ||
        settings.textScale === 112 ||
        settings.textScale === 125
          ? settings.textScale
          : DEFAULT_SETTINGS.textScale,
      readingRuler:
        typeof settings.readingRuler === "boolean"
          ? settings.readingRuler
          : DEFAULT_SETTINGS.readingRuler,
      lowStimulation:
        typeof settings.lowStimulation === "boolean"
          ? settings.lowStimulation
          : DEFAULT_SETTINGS.lowStimulation,
      timedChallenges:
        typeof settings.timedChallenges === "boolean"
          ? settings.timedChallenges
          : DEFAULT_SETTINGS.timedChallenges,
      showStreaks:
        typeof settings.showStreaks === "boolean"
          ? settings.showStreaks
          : DEFAULT_SETTINGS.showStreaks,
      movementBreaks:
        typeof settings.movementBreaks === "boolean"
          ? settings.movementBreaks
          : DEFAULT_SETTINGS.movementBreaks,
      ttsRate:
        typeof settings.ttsRate === "number" &&
        Number.isFinite(settings.ttsRate)
          ? Math.min(1.5, Math.max(0.6, settings.ttsRate))
          : DEFAULT_SETTINGS.ttsRate,
      spellingAffectsMastery:
        typeof settings.spellingAffectsMastery === "boolean"
          ? settings.spellingAffectsMastery
          : DEFAULT_SETTINGS.spellingAffectsMastery,
    },
    learner: {
      displayName: isString(learner.displayName)
        ? learner.displayName.trim().slice(0, 120)
        : DEFAULT_LEARNER_PROFILE.displayName,
      avatarDataUrl:
        isString(learner.avatarDataUrl) &&
        learner.avatarDataUrl.length <= 350_000 &&
        /^data:image\/(?:jpeg|png|webp);base64,/i.test(learner.avatarDataUrl)
          ? learner.avatarDataUrl
          : DEFAULT_LEARNER_PROFILE.avatarDataUrl,
      selfDeclaredLevel: isStringInSet(
        learner.selfDeclaredLevel,
        LEARNING_LEVELS,
      )
        ? (learner.selfDeclaredLevel as CefrLevel)
        : null,
      verifiedLevel: isStringInSet(learner.verifiedLevel, LEARNING_LEVELS)
        ? (learner.verifiedLevel as CefrLevel)
        : null,
      placementMode: isStringInSet(learner.placementMode, PLACEMENT_MODE_SET)
        ? (learner.placementMode as PlacementMode)
        : isStringInSet(learner.selfDeclaredLevel, LEARNING_LEVELS)
          ? "manual"
          : "not_set",
      placementCheckedAt:
        isString(learner.placementCheckedAt) &&
        Number.isFinite(Date.parse(learner.placementCheckedAt))
          ? new Date(learner.placementCheckedAt).toISOString()
          : null,
      shareAcrossApps:
        typeof learner.shareAcrossApps === "boolean"
          ? learner.shareAcrossApps
          : DEFAULT_LEARNER_PROFILE.shareAcrossApps,
      allowOnlineAI:
        typeof learner.allowOnlineAI === "boolean"
          ? learner.allowOnlineAI
          : DEFAULT_LEARNER_PROFILE.allowOnlineAI,
      includeEvidenceInExport:
        typeof learner.includeEvidenceInExport === "boolean"
          ? learner.includeEvidenceInExport
          : DEFAULT_LEARNER_PROFILE.includeEvidenceInExport,
    },
    outcomes: {
      goal:
        isString(outcomes.goal) && outcomes.goal.trim()
          ? outcomes.goal.trim().slice(0, 240)
          : DEFAULT_OUTCOME_EVIDENCE.goal,
      baselineScore: normalizeOutcomeScore(outcomes.baselineScore),
      followupScore: normalizeOutcomeScore(outcomes.followupScore),
      retentionScore: normalizeOutcomeScore(outcomes.retentionScore),
      independentlyRated:
        typeof outcomes.independentlyRated === "boolean"
          ? outcomes.independentlyRated
          : DEFAULT_OUTCOME_EVIDENCE.independentlyRated,
      assessorNote: isString(outcomes.assessorNote)
        ? outcomes.assessorNote.trim().slice(0, 500)
        : DEFAULT_OUTCOME_EVIDENCE.assessorNote,
    },
    errors,
    activity: normalizeActivity(value.activity),
    reviews: normalizeReviews(value.reviews),
    sessions: normalizeSessions(value.sessions),
    attempts: normalizeAttempts(value.attempts),
    mastery,
    dailyPlans: normalizeDailyPlans(value.dailyPlans),
    learningLevel:
      isString(value.learningLevel) && LEARNING_LEVELS.has(value.learningLevel)
        ? value.learningLevel
        : null,
    todayGrammar:
      todayGrammar &&
      isString(todayGrammar.title) &&
      isString(todayGrammar.level) &&
      isString(todayGrammar.date)
        ? {
            title: todayGrammar.title,
            level: todayGrammar.level,
            date: todayGrammar.date,
          }
        : null,
  };
}

/** تاریخ ورودی یا زمان فعلی را به کلید روز UTC در ISO تبدیل می‌کند تا برنامه و فعالیت کلید یکسانی داشته باشند. ورودی‌ها: date. */
export function getTodayKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

/** برنامهٔ موجود در کلید روز یا نمونهٔ خالی را می‌دهد؛ وضعیت ورودی را تغییر نمی‌دهد و مرحله‌ای را تکمیل اعلام نمی‌کند. ورودی‌ها: state، dateKey. */
export function getDailyPlan(
  state: LearnerState,
  dateKey = getTodayKey(),
): DailyPlanRecord {
  return (
    state.dailyPlans[dateKey] ?? {
      completed: [],
      answers: {},
    }
  );
}

/** کامل‌بودن همهٔ مرحله‌های پیش از مرحلهٔ هدف را می‌سنجد؛ فقط اجازهٔ بولی می‌دهد و چیزی ثبت نمی‌کند. ورودی‌ها: completed، stepIndex. */
export function canCompleteDailyStep(
  completed: readonly number[],
  stepIndex: number,
): boolean {
  return Array.from(
    {
      length: stepIndex,
    } /** در canCompleteDailyStep، شناسه‌های مرحله‌های پیشین را می‌سازد تا شرط تکمیل ترتیبی بررسی شود؛ ساخت فهرست هیچ مرحله‌ای را تکمیل ثبت نمی‌کند. ورودی‌ها: _، index. */,
    (_, index) => index,
  ).every(
    /** در canCompleteDailyStep، کامل‌بودن شرط همهٔ اعضا بررسی می‌شود؛ نتیجه مجوز بولی است و چیزی ثبت نمی‌کند. ورودی‌ها: index. */
    (index) => completed.includes(index),
  );
}

/** زنجیرهٔ پیوستهٔ فعالیت را تا سقف حلقه می‌شمارد؛ خالی‌بودن امروز به‌تنهایی زنجیرهٔ دیروز را قطع نمی‌کند. ورودی‌ها: activity، now. */
export function calculateStreak(
  activity: Readonly<Record<string, number>>,
  now = new Date(),
): number {
  let streak = 0;

  for (let index = 0; index < 365; index += 1) {
    const date = new Date(now.getTime() - index * 86_400_000)
      .toISOString()
      .slice(0, 10);
    /* فعالیت ثبت‌شده روز را به زنجیره اضافه می‌کند؛ شمار فعالیتِ همان روز وزن اضافه نمی‌گیرد. */
    if (activity[date]) {
      streak += 1;
    } else /* اولین روز خالی پیش از امروز زنجیره را قطع می‌کند؛ امروزِ خالی، زنجیرهٔ دیروز را به‌تنهایی قطع نمی‌کند. */
    if (index > 0) {
      break;
    }
  }

  return streak;
}

/** قطعه‌های واژه‌ای حرف/عدد را با الگوی فعلی می‌شمارد؛ تعداد واژه جای سنجش معنا یا زبان را نمی‌گیرد. ورودی‌ها: text. */
export function countWords(text: string): number {
  return text.match(/\b[\p{L}\p{N}'’-]+\b/gu)?.length ?? 0;
}
