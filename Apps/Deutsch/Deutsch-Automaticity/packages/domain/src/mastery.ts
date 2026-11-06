/** منطق خالص دامنهٔ آلمانی؛ این ماژول مستقیماً شبکه، حافظهٔ مرورگر یا حساب کاربری را تغییر نمی‌دهد. */
export const MASTERY_STATUSES = [
  "new",
  "learning",
  "usable",
  "stable",
  "automatic",
] as const;

/** ساختار «MasteryStatus» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export type MasteryStatus = (typeof MASTERY_STATUSES)[number];

export const MASTERY_MODES = [
  "recognition",
  "writing",
  "speaking",
  "repair",
  "transfer",
] as const;

/** ساختار «MasteryMode» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export type MasteryMode = (typeof MASTERY_MODES)[number];

/** ساختار «MasteryScores» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export interface MasteryScores {
  readonly recognition: number;
  readonly writing: number;
  readonly speaking: number;
  readonly repair: number;
  readonly transfer: number;
  readonly automaticity: number;
}

/** ساختار «MasteryRecord» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export interface MasteryRecord {
  readonly status: MasteryStatus;
  readonly scores: MasteryScores;
  readonly successfulReviews: number;
  readonly activeCriticalErrors: number;
  readonly responseLatenciesMs: readonly number[];
  readonly completedAt?: number;
  readonly lastSuccessAt?: number;
  /**
   * Legacy compatibility flags. They remain readable during the v20.8
   * migration but never grant the new `automatic` status by themselves.
   */
  readonly controlled: boolean;
  readonly free: boolean;
  readonly spoken?: boolean;
}

/** ساختار «MasteryAttempt» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export interface MasteryAttempt {
  readonly mode: MasteryMode;
  readonly accuracyScore: number;
  readonly targetHit: boolean;
  readonly latencyMs?: number;
  readonly createdAt?: number;
}

/** حد تأخیر فعلی برای شاخص تمرینی است؛ عبور از آن به‌تنهایی خودکاری یا سطح علمی را ثابت نمی‌کند. */
export const AUTOMATICITY_LATENCY_THRESHOLD_MS = 8_000;

/** آستانه‌های موجود برای وضعیت تمرین‌اند؛ این ثابت‌ها در این تغییر فقط توضیح داده شده‌اند و تغییر نمی‌کنند. */
const SCORE_THRESHOLDS = {
  recognition: 85,
  writing: 80,
  speaking: 80,
  repair: 80,
  transfer: 75,
} as const;

/** امتیاز عددی محاسبه‌شده را گرد و به صفر تا صد محدود می‌کند؛ دامنهٔ مشترک برای وزن‌ها و به‌روزرسانی مهارت است و شاهد جدید نمی‌سازد. ورودی‌ها: value. */
function clampScore(value: number): number {
  return Math.round(Math.min(100, Math.max(0, value)));
}

/** کپی فهرست تأخیرها را مرتب و میانهٔ گرد‌شده برمی‌گرداند؛ فهرست خالی null دارد تا نبود زمان‌سنجی امتیاز سرعت نسازد. ورودی‌ها: values. */
export function median(values: readonly number[]): number | null {
  /* برای مجموعهٔ خالی میانه وجود ندارد؛ null مانع تعبیر نبود زمان‌سنجی به پاسخ سریع می‌شود. */
  if (values.length === 0) {
    return null;
  }
  const sorted = [...values].sort(
    /** در median، مقایسهٔ عددی ترتیب لازم محاسبه را مشخص می‌کند؛ مرتب‌شدن امتیاز تازه‌ای ایجاد نمی‌کند. ورودی‌ها: left، right. */
    (left, right) => left - right,
  );
  const middle = Math.floor(sorted.length / 2);
  const upper = sorted[middle]!;
  return sorted.length % 2 === 0
    ? Math.round((sorted[middle - 1]! + upper) / 2)
    : upper;
}

/** مهارت‌ها، مرور موفق، خطای بحرانی و میانهٔ تأخیر را با وزن‌های فعلی ترکیب می‌کند؛ خروجی شاخص تمرینی است و مدرک مستقل CEFR نیست. ورودی‌ها: scores، successfulReviews، activeCriticalErrors، responseLatenciesMs. */
export function calculateAutomaticityScore(
  scores: Omit<MasteryScores, "automaticity">,
  successfulReviews: number,
  activeCriticalErrors: number,
  responseLatenciesMs: readonly number[],
): number {
  const skillScore =
    scores.recognition * 0.15 +
    scores.writing * 0.25 +
    scores.speaking * 0.25 +
    scores.repair * 0.2 +
    scores.transfer * 0.15;
  const reviewBonus = Math.min(10, successfulReviews * 5);
  const latency = median(responseLatenciesMs);
  const latencyAdjustment =
    latency === null
      ? 0
      : latency <= AUTOMATICITY_LATENCY_THRESHOLD_MS
        ? 5
        : -5;
  const errorPenalty = Math.min(25, activeCriticalErrors * 10);

  return clampScore(
    skillScore + reviewBonus + latencyAdjustment - errorPenalty,
  );
}

/** شواهد مهارت، مرور، خطا و تأخیر را طبق آستانه‌های موجود به وضعیت تمرین نگاشت می‌کند؛ کمبود شاهد با پرچم قدیمی جبران نمی‌شود. ورودی‌ها: scores، successfulReviews، activeCriticalErrors، responseLatenciesMs. */
export function calculateMasteryStatus(
  scores: MasteryScores,
  successfulReviews: number,
  activeCriticalErrors: number,
  responseLatenciesMs: readonly number[],
): MasteryStatus {
  const latency = median(responseLatenciesMs);
  const allAutomaticThresholdsMet =
    scores.recognition >= SCORE_THRESHOLDS.recognition &&
    scores.writing >= SCORE_THRESHOLDS.writing &&
    scores.speaking >= SCORE_THRESHOLDS.speaking &&
    scores.repair >= SCORE_THRESHOLDS.repair &&
    scores.transfer >= SCORE_THRESHOLDS.transfer;

  /* بالاترین وضعیت همهٔ آستانه‌ها، دو مرور، نبود خطای بحرانی و تأخیر معتبر در حد مقرر را می‌خواهد. */
  if (
    allAutomaticThresholdsMet &&
    successfulReviews >= 2 &&
    activeCriticalErrors === 0 &&
    latency !== null &&
    latency <= AUTOMATICITY_LATENCY_THRESHOLD_MS
  ) {
    return "automatic";
  }

  /* پایداری نیازمند نوشتن، گفتار، انتقال و حداقل یک مرور است؛ شناختِ تنها کافی نیست. */
  if (
    scores.writing >= SCORE_THRESHOLDS.writing &&
    scores.speaking >= SCORE_THRESHOLDS.speaking &&
    scores.transfer >= SCORE_THRESHOLDS.transfer &&
    successfulReviews >= 1
  ) {
    return "stable";
  }

  /* کاربردپذیری به شناخت و دست‌کم یکی از مهارت‌های تولید وابسته است و پایین‌تر از پایداری قرار دارد. */
  if (
    scores.recognition >= 70 &&
    (scores.writing >= 70 || scores.speaking >= 70)
  ) {
    return "usable";
  }

  /* وجود مقداری شاهد تمرینی وضعیت درحال‌آموزش می‌دهد؛ نبود همهٔ شواهد، وضعیت تازه باقی می‌گذارد. */
  if (
    scores.recognition > 0 ||
    scores.writing > 0 ||
    scores.speaking > 0 ||
    scores.repair > 0 ||
    scores.transfer > 0
  ) {
    return "learning";
  }

  return "new";
}

/** رکورد تازه با امتیاز و سابقهٔ صفر می‌دهد تا ثبت تلاش از مقدار مشخص شروع شود؛ دادهٔ رکورد دیگری پاک نمی‌شود. */
export function createEmptyMasteryRecord(): MasteryRecord {
  return {
    status: "new",
    scores: {
      recognition: 0,
      writing: 0,
      speaking: 0,
      repair: 0,
      transfer: 0,
      automaticity: 0,
    },
    successfulReviews: 0,
    activeCriticalErrors: 0,
    responseLatenciesMs: [],
    controlled: false,
    free: false,
  };
}

/** شاخص خودکاری و وضعیت را از همان شواهد رکورد بازحساب می‌کند تا دو خروجی وابسته همگام بمانند. ورودی‌ها: record. */
function refreshMasteryRecord(
  record: Omit<MasteryRecord, "status" | "scores"> & {
    readonly scores: Omit<MasteryScores, "automaticity">;
  },
): MasteryRecord {
  const automaticity = calculateAutomaticityScore(
    record.scores,
    record.successfulReviews,
    record.activeCriticalErrors,
    record.responseLatenciesMs,
  );
  const scores = { ...record.scores, automaticity };

  return {
    ...record,
    scores,
    status: calculateMasteryStatus(
      scores,
      record.successfulReviews,
      record.activeCriticalErrors,
      record.responseLatenciesMs,
    ),
  };
}

/** فقط مهارت مرتبط با حالت تلاش را به‌روزرسانی می‌کند و رکورد تازه می‌دهد؛ سقف هدف‌نخورده و تاریخچهٔ محدود تأخیر رعایت می‌شوند. ورودی‌ها: current، attempt. */
export function recordMasteryAttempt(
  current: MasteryRecord | undefined,
  attempt: MasteryAttempt,
): MasteryRecord {
  const record = current ?? createEmptyMasteryRecord();
  /** اگر ساختار هدف محقق نشده باشد سقف امتیاز فعلی حفظ می‌شود؛ امتیاز ظاهراً بالا مجوز عبور از هدف درس نیست. */
  const attemptedScore = clampScore(
    attempt.targetHit
      ? attempt.accuracyScore
      : Math.min(attempt.accuracyScore, 59),
  );
  const previousScore = record.scores[attempt.mode];
  /** نبود امتیاز قبلی از تلاش فعلی شروع می‌کند؛ در غیر این صورت ترکیب وزنی موجود ۶۰/۴۰ اعمال می‌شود. */
  const nextScore =
    previousScore === 0
      ? attemptedScore
      : clampScore(previousScore * 0.6 + attemptedScore * 0.4);
  const latencies =
    attempt.latencyMs === undefined
      ? record.responseLatenciesMs
      : [
          ...record.responseLatenciesMs,
          Math.max(0, Math.round(attempt.latencyMs)),
        ].slice(-10);

  return refreshMasteryRecord({
    ...record,
    scores: {
      recognition:
        attempt.mode === "recognition" ? nextScore : record.scores.recognition,
      writing: attempt.mode === "writing" ? nextScore : record.scores.writing,
      speaking:
        attempt.mode === "speaking" ? nextScore : record.scores.speaking,
      repair: attempt.mode === "repair" ? nextScore : record.scores.repair,
      transfer:
        attempt.mode === "transfer" ? nextScore : record.scores.transfer,
    },
    responseLatenciesMs: latencies,
    controlled:
      record.controlled ||
      (attempt.mode === "recognition" && attempt.targetHit),
    free:
      record.free ||
      (attempt.mode === "writing" && attempt.targetHit) ||
      (attempt.mode === "transfer" && attempt.targetHit),
    ...(record.spoken || attempt.mode === "speaking"
      ? { spoken: record.spoken || attempt.targetHit }
      : {}),
    ...(attempt.targetHit
      ? {
          lastSuccessAt: attempt.createdAt ?? Date.now(),
        }
      : {}),
  });
}

/** نتیجهٔ مرور را به شمار موفقیت اعمال و وضعیت را بازحساب می‌کند؛ مهارت‌های دیگر از خود مرور نمرهٔ مصنوعی نمی‌گیرند. ورودی‌ها: current، successful. */
export function recordMasteryReview(
  current: MasteryRecord | undefined,
  successful: boolean,
): MasteryRecord {
  const record = current ?? createEmptyMasteryRecord();

  return refreshMasteryRecord({
    ...record,
    successfulReviews: successful
      ? record.successfulReviews + 1
      : Math.max(0, record.successfulReviews - 1),
    scores: {
      recognition: record.scores.recognition,
      writing: record.scores.writing,
      speaking: record.scores.speaking,
      repair: record.scores.repair,
      transfer: record.scores.transfer,
    },
    ...(successful ? { lastSuccessAt: Date.now() } : {}),
  });
}

/** شمار خطاهای بحرانی را محدود و در نسخهٔ تازه ثبت می‌کند تا وضعیت مهارت با دفتر خطا سازگار شود؛ امتیازهای مهارت حفظ می‌شوند. ورودی‌ها: current، activeCriticalErrors. */
export function setMasteryCriticalErrors(
  current: MasteryRecord | undefined,
  activeCriticalErrors: number,
): MasteryRecord {
  const record = current ?? createEmptyMasteryRecord();
  return refreshMasteryRecord({
    ...record,
    activeCriticalErrors: Math.max(0, Math.floor(activeCriticalErrors)),
    scores: {
      recognition: record.scores.recognition,
      writing: record.scores.writing,
      speaking: record.scores.speaking,
      repair: record.scores.repair,
      transfer: record.scores.transfer,
    },
  });
}

export const masteryStatusLabels: Readonly<Record<MasteryStatus, string>> = {
  new: "Neu",
  learning: "Im Aufbau",
  usable: "Anwendbar",
  stable: "Stabil",
  automatic: "Übungsschwelle erreicht",
};
