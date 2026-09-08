import type {
  GrammarWorksheet,
  WorksheetItem,
} from "../grammar-worksheets/model";
export type Language = "de" | "en";
export type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export interface FlowItem extends WorksheetItem {
  kind: "controlled" | "transform" | "recall" | "repair" | "oral";
  sourceId: string;
  round: number;
}
export interface Lesson {
  worksheet: GrammarWorksheet;
  version: "seven-step-v1";
  learn: FlowItem[];
  repair: FlowItem[];
  oral: FlowItem[];
  script: string[];
}
export interface Submission {
  id: string;
  itemId: string;
  step: Step;
  text: string;
  why: string;
  at: string;
  modelMatch: boolean | null;
  assisted: boolean;
  eventId: string;
}
export interface DueReview {
  day: 1 | 3 | 7 | 14 | 30;
  dueAt: string;
  timeZone: string;
  responseId?: string;
  completedAt?: string;
}
export interface FlowSession {
  version: 1;
  revision: number;
  id: string;
  language: Language;
  lessonId: string;
  contentVersion: string;
  step: Step;
  position: number;
  shadowStage: number;
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
  fields: Record<string, string | unknown[]>;
  submissions: Submission[];
  visited: Step[];
  completed: Step[];
  exposed: string[];
  recordingIds: string[];
  reviews: DueReview[];
  reviewDay: number | null;
  persian: boolean;
  rate: number;
  seconds: number;
}
const repeat = (items: FlowItem[], count: number): FlowItem[] =>
  Array.from({ length: count }, (_, index) => {
    const source = items[index % items.length]!;
    const round = Math.floor(index / items.length) + 1;
    return { ...source, id: `${source.id}-round-${round}`, round };
  });

/** Reuse authored grammar, never guess an answer or a rule from a topic title. */
export function makeLesson(worksheet: GrammarWorksheet): Lesson {
  const convert = (items: readonly WorksheetItem[], kind: FlowItem["kind"]) =>
    items.map((item) => ({ ...item, sourceId: item.id, kind, round: 1 }));
  const controlled = [
    ...convert(worksheet.learn, "controlled"),
    ...convert(worksheet.guided, "controlled"),
    ...convert(worksheet.transform, "transform"),
    ...convert([worksheet.recall], "recall"),
  ];
  if (
    !controlled.length ||
    !worksheet.correction.length ||
    !worksheet.oral.length
  )
    throw new Error(`Incomplete worksheet: ${worksheet.id}`);
  // Repeated rounds are labelled rehearsal. They are not new evaluation items.
  return {
    worksheet,
    version: "seven-step-v1",
    learn: repeat(controlled, Math.max(10, controlled.length)),
    repair: repeat(
      convert(worksheet.correction, "repair"),
      Math.max(4, worksheet.correction.length),
    ),
    oral: repeat(
      convert(worksheet.oral, "oral"),
      Math.max(9, worksheet.oral.length),
    ),
    script: worksheet.models.slice(0, 3).map((model) => model.sentence),
  };
}
export function createSession(
  language: Language,
  lesson: Lesson,
  id: string,
  now = new Date().toISOString(),
): FlowSession {
  return {
    version: 1,
    revision: 0,
    id,
    language,
    lessonId: lesson.worksheet.id,
    contentVersion: lesson.version,
    step: 1,
    position: 0,
    shadowStage: 0,
    createdAt: now,
    updatedAt: now,
    fields: {},
    submissions: [],
    visited: [1],
    completed: [],
    exposed: [],
    recordingIds: [],
    reviews: [],
    reviewDay: null,
    persian: false,
    rate: 1,
    seconds: 4,
  };
}
export function parseSession(
  raw: string,
  language: Language,
  lessonId: string,
): FlowSession {
  const value = JSON.parse(raw) as FlowSession;
  if (
    value.version !== 1 ||
    !Number.isSafeInteger(value.revision) ||
    value.revision < 0 ||
    value.language !== language ||
    value.lessonId !== lessonId ||
    typeof value.id !== "string" ||
    ![1, 2, 3, 4, 5, 6, 7].includes(value.step) ||
    !value.fields ||
    typeof value.fields !== "object" ||
    Array.isArray(value.fields) ||
    !Array.isArray(value.submissions) ||
    !Array.isArray(value.reviews) ||
    !Array.isArray(value.recordingIds) ||
    !Array.isArray(value.exposed) ||
    !Array.isArray(value.visited) ||
    !Array.isArray(value.completed) ||
    !Number.isInteger(value.position) ||
    value.position < 0 ||
    !Number.isInteger(value.shadowStage) ||
    value.shadowStage < 0 ||
    value.shadowStage > 4 ||
    !value.completed.every((n) => [1, 2, 3, 4, 5, 6, 7].includes(n)) ||
    !value.reviews.every(
      (r) =>
        r &&
        [1, 3, 7, 14, 30].includes(r.day) &&
        Number.isFinite(Date.parse(r.dueAt)),
    ) ||
    !value.submissions.every(
      (a) =>
        a &&
        typeof a.id === "string" &&
        typeof a.itemId === "string" &&
        typeof a.text === "string" &&
        typeof a.why === "string" &&
        [1, 2, 3, 4, 5, 6, 7].includes(a.step),
    ) ||
    !Number.isFinite(Date.parse(value.createdAt)) ||
    !Number.isFinite(Date.parse(value.updatedAt)) ||
    ![0.5, 0.75, 1, 1.25, 1.5, 2].includes(value.rate) ||
    ![0, 3, 4, 5, 6].includes(value.seconds)
  )
    throw new Error("Saved lesson is unreadable. Original data was preserved.");
  return value;
}
export function normalizeAnswer(value: string): string {
  return value
    .normalize("NFC")
    .trim()
    .replace(/[’‘]/g, "'")
    .replace(/[.!?]+$/u, "")
    .replace(/\s+/g, " ")
    .toLocaleLowerCase();
}
// An exact authored-model match supports comparison only. A different answer may be valid.
export function matchesModel(text: string, expected: string): boolean {
  return normalizeAnswer(text) === normalizeAnswer(expected);
}
export function scheduleReviews(now: Date, timeZone: string): DueReview[] {
  return ([1, 3, 7, 14, 30] as const).map((day) => {
    const due = new Date(now);
    due.setDate(due.getDate() + day);
    return { day, dueAt: due.toISOString(), timeZone };
  });
}
export function reviewIsDue(review: DueReview, now = Date.now()): boolean {
  return (
    !review.completedAt &&
    Number.isFinite(Date.parse(review.dueAt)) &&
    now >= Date.parse(review.dueAt)
  );
}
export function itemsFor(lesson: Lesson, step: Step): FlowItem[] {
  return step === 1
    ? lesson.learn
    : step === 2
      ? lesson.repair
      : step === 3
        ? lesson.oral
        : [];
}
export function completionReady(session: FlowSession, lesson: Lesson): boolean {
  const ids = new Set(
    session.submissions
      .filter((s) => s.step === session.step)
      .map((s) => s.itemId),
  );
  if ([1, 2, 3].includes(session.step))
    return itemsFor(lesson, session.step).every((item) => ids.has(item.id));
  if (session.step === 6)
    return [0, 1, 2, 3, 4].every((n) => ids.has(`shadow-${n}`));
  if (session.step === 7) return ids.has("exit");
  return ids.has(session.step === 4 ? "speak-personal" : "write-personal");
}
