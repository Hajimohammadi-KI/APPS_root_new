/** منطق خالص دامنهٔ آلمانی؛ این ماژول مستقیماً شبکه، حافظهٔ مرورگر یا حساب کاربری را تغییر نمی‌دهد. */
/** ساختار «DailySessionMinutes» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export type DailySessionMinutes = 15 | 30 | 45 | 60;

/** ساختار «DailyMissionKind» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export type DailyMissionKind =
  "recall" | "review" | "resume" | "consolidate" | "advance";

/** ساختار «DailyBlockId» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export type DailyBlockId =
  | "recall"
  | "review"
  | "resume"
  | "corrective"
  | "new_lesson"
  | "listening_vocabulary"
  | "speaking_grammar"
  | "save_schedule";

/** ساختار «AdaptiveDailySignals» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export interface AdaptiveDailySignals {
  readonly sessionMinutes: DailySessionMinutes;
  readonly hasPreviousLesson: boolean;
  readonly previousLessonRecalled: boolean;
  readonly dueReviewCount: number;
  readonly activeErrorCount: number;
  readonly hasIncompleteLesson: boolean;
  readonly masteryScore: number;
  readonly automaticityScore: number;
}

/** ساختار «AdaptiveDailyBlock» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export interface AdaptiveDailyBlock {
  readonly id: DailyBlockId;
  readonly minutes: number;
  readonly breakAfterMinutes: number;
}

/** ساختار «AdaptiveDailyPlan» ارتباط تایپی مصرف‌کننده‌های این ماژول را مشخص می‌کند؛ این تعریف به‌تنهایی اعتبارسنجی زمان اجرا یا ذخیرهٔ داده انجام نمی‌دهد. */
export interface AdaptiveDailyPlan {
  readonly mission: DailyMissionKind;
  readonly canAdvance: boolean;
  readonly blocks: readonly AdaptiveDailyBlock[];
}

/** سهم شش فعالیت اصلی برای هر مدت جلسه از پیش مشخص است؛ انتخاب زمان زبان‌آموز بازنویسی نمی‌شود. */
const CORE_MISSION_MINUTES: Record<
  DailySessionMinutes,
  readonly [number, number, number, number, number, number]
> = {
  15: [3, 2, 2, 3, 2, 3],
  30: [6, 5, 4, 5, 4, 6],
  45: [9, 7, 7, 7, 6, 9],
  60: [12, 9, 9, 10, 8, 12],
};

/** Die sechs Kernaktivitäten ergeben immer genau die gewählte Lernzeit. */
/** مدت جلسه را به شش سهم مصوب تبدیل می‌کند که مجموعشان زمان انتخاب‌شده است؛ برنامهٔ ذخیره‌شده را تغییر نمی‌دهد. ورودی‌ها: sessionMinutes. */
export function allocateCoreMissionMinutes(
  sessionMinutes: DailySessionMinutes,
): readonly [number, number, number, number, number, number] {
  return CORE_MISSION_MINUTES[sessionMinutes];
}

/** چیدمان مدت فعالیت و استراحت را بر اساس زمان جلسه نگه می‌دارد؛ این جدول اعلان یا تایمر خودکار نیست. */
const SESSION_LAYOUTS: Record<
  DailySessionMinutes,
  {
    readonly activityMinutes: readonly [number, number, number, number, number];
    readonly breakMinutes: readonly [number, number, number, number, number];
  }
> = {
  15: {
    activityMinutes: [3, 3, 3, 4, 2],
    breakMinutes: [0, 0, 0, 0, 0],
  },
  30: {
    activityMinutes: [5, 5, 6, 8, 3],
    breakMinutes: [0, 3, 0, 0, 0],
  },
  45: {
    activityMinutes: [8, 8, 8, 10, 3],
    breakMinutes: [4, 4, 0, 0, 0],
  },
  60: {
    activityMinutes: [10, 10, 10, 12, 6],
    breakMinutes: [4, 4, 4, 0, 0],
  },
};

/** عدد محاسبه‌شده را گرد و برای نمایش به دامنهٔ صفر تا صد محدود می‌کند؛ ورودی این مسیر عددِ محاسبهٔ دامنه است. ورودی‌ها: value. */
function clampPercent(value: number): number {
  return Math.min(100, Math.max(0, Math.round(value)));
}

/** نشانه‌های یادگیری و مدت جلسه را به مأموریت و بلوک‌ها تبدیل می‌کند؛ یادآوری و اصلاح لازم بر درس تازه اولویت دارند و چیزی ذخیره نمی‌شود. ورودی‌ها: signals. */
export function buildAdaptiveDailyPlan(
  signals: AdaptiveDailySignals,
): AdaptiveDailyPlan {
  const dueReviewCount = Math.max(0, signals.dueReviewCount);
  const activeErrorCount = Math.max(0, signals.activeErrorCount);
  const masteryScore = clampPercent(signals.masteryScore);
  const automaticityScore = clampPercent(signals.automaticityScore);
  /** پیشرویِ درس تازه به نبود کار نیمه‌تمام، مرور معوق و خطای فعال و رسیدن به آستانه‌های فعلی وابسته است؛ شروعِ بدون درس قبلی مسیر جدا دارد. */
  const canAdvance =
    !signals.hasPreviousLesson ||
    (!signals.hasIncompleteLesson &&
      dueReviewCount === 0 &&
      activeErrorCount === 0 &&
      masteryScore >= 75 &&
      automaticityScore >= 65);

  /** اولویت‌های فعلی یادآوری، مرور و ادامهٔ درس قبل از گسترش انتخاب می‌شوند؛ این انتخاب فقط خروجی برنامه است و وضعیت را ذخیره نمی‌کند. */
  const mission: DailyMissionKind =
    signals.hasPreviousLesson && !signals.previousLessonRecalled
      ? "recall"
      : dueReviewCount > 0 || activeErrorCount > 0
        ? "review"
        : signals.hasIncompleteLesson
          ? "resume"
          : canAdvance
            ? "advance"
            : "consolidate";
  /** اولویت‌های فعلی یادآوری، مرور و ادامهٔ درس قبل از گسترش انتخاب می‌شوند؛ این انتخاب فقط خروجی برنامه است و وضعیت را ذخیره نمی‌کند. */
  const priorityBlock: DailyBlockId =
    dueReviewCount > 0 || activeErrorCount > 0
      ? "review"
      : signals.hasIncompleteLesson
        ? "resume"
        : canAdvance
          ? "new_lesson"
          : "corrective";
  const layout = SESSION_LAYOUTS[signals.sessionMinutes];
  const minutes = layout.activityMinutes;
  const breaks = layout.breakMinutes;

  return {
    mission,
    canAdvance,
    blocks: [
      { id: "recall", minutes: minutes[0], breakAfterMinutes: breaks[0] },
      { id: priorityBlock, minutes: minutes[1], breakAfterMinutes: breaks[1] },
      {
        id: "listening_vocabulary",
        minutes: minutes[2],
        breakAfterMinutes: breaks[2],
      },
      {
        id: "speaking_grammar",
        minutes: minutes[3],
        breakAfterMinutes: breaks[3],
      },
      {
        id: "save_schedule",
        minutes: minutes[4],
        breakAfterMinutes: breaks[4],
      },
    ],
  };
}

/** پوشش، میانگین مهارت و شاخص خودکاری را به درصد نمایشی تبدیل می‌کند؛ نبود موضوع یا امتیاز، تقسیم بر صفر تولید نمی‌کند. ورودی‌ها: input. */
export function calculateDailyProgress(input: {
  readonly levelTopicCount: number;
  readonly coveredTopicCount: number;
  readonly masteryScores: readonly number[];
  readonly automaticityScore: number;
}) {
  const coverage = input.levelTopicCount
    ? (input.coveredTopicCount / input.levelTopicCount) * 100
    : 0;
  const mastery = input.masteryScores.length
    ? input.masteryScores.reduce(
        /** در calculateDailyProgress، انباشت از مقدار آغازین مشخص پیش می‌رود؛ سهم هر عضو فقط در نتیجهٔ محاسبه اعمال می‌شود. ورودی‌ها: sum، score. */
        (sum, score) => sum + clampPercent(score),
        0,
      ) / input.masteryScores.length
    : 0;
  return {
    coverage: clampPercent(coverage),
    mastery: clampPercent(mastery),
    automaticity: clampPercent(input.automaticityScore),
  };
}
