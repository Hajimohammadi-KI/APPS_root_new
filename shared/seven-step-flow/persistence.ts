import { createClientId } from "../learning-core/src/client-id";
import { sha256 } from "../learning-core/src/automaticity/backup";
import { appendAutomaticityEvent } from "../learning-core/src/automaticity/storage";
import type { AttemptEvent } from "../learning-core/src/automaticity/contracts";
import {
  createSession,
  parseSession,
  type FlowSession,
  type Lesson,
  type Language,
  type Submission,
} from "./model";
export { createClientId, sha256 };
export const prefix = (language: Language) =>
  `automaticity:v2:${language}:seven-step:`;
export const sessionKey = (language: Language, id: string) =>
  prefix(language) + id;
export function loadSession(language: Language, lesson: Lesson): FlowSession {
  const value = localStorage.getItem(sessionKey(language, lesson.worksheet.id));
  return value
    ? parseSession(value, language, lesson.worksheet.id)
    : createSession(language, lesson, createClientId());
}
export function saveSession(session: FlowSession): void {
  const key = sessionKey(session.language, session.lessonId);
  const previous = localStorage.getItem(key);
  if (previous) {
    const saved = parseSession(previous, session.language, session.lessonId);
    // Refuse stale-tab overwrites; another lesson has its own key and can stay open.
    if (saved.revision !== session.revision)
      throw new Error(
        "This lesson changed in another tab. Export this draft before reloading.",
      );
  }
  const updated = {
    ...session,
    updatedAt: new Date().toISOString(),
    revision: session.revision + 1,
  };
  const raw = JSON.stringify(updated);
  localStorage.setItem(key, raw);
  if (localStorage.getItem(key) !== raw)
    throw new Error("Draft could not be saved.");
  Object.assign(session, updated);
  localStorage.setItem(prefix(session.language) + "last", session.lessonId);
}
export async function submitPractice(
  session: FlowSession,
  lesson: Lesson,
  itemId: string,
  text: string,
  why: string,
  modelMatch: boolean | null,
  audio?: AttemptEvent["audio"],
  rawTranscript?: string,
): Promise<Submission> {
  const id = createClientId(),
    at = new Date().toISOString();
  const previous = session.submissions
    .filter((s) => s.step === session.step && s.itemId === itemId)
    .at(-1);
  const event: AttemptEvent = {
    version: 2,
    type: "attempt",
    id,
    language: session.language,
    at,
    task: {
      id: `${lesson.worksheet.id}:${session.step}:${itemId}`,
      version: lesson.version,
      definitionSha256: await sha256(JSON.stringify(lesson.worksheet)),
      constructionId: `seven-step:${lesson.worksheet.id}`,
      familyId: lesson.worksheet.id,
      itemFamily: `${lesson.worksheet.id}:${itemId.replace(/-round-\d+$/, "")}`,
      contextId: `${lesson.worksheet.id}:${session.reviewDay === null ? "lesson" : `review-${session.reviewDay}`}`,
      rubricVersion: "authored-comparison-v1",
      stage: session.reviewDay
        ? "retain"
        : session.step === 2
          ? "repair"
          : "produce",
      modality: audio ? "speaking" : "writing",
      partition: "practice",
      transferCondition: "target_named",
      contentReview: "authored",
    },
    response: {
      text,
      sha256: await sha256(text),
      originalTranscriptSha256: rawTranscript?.trim()
        ? await sha256(rawTranscript)
        : null,
      transcriptEdited: rawTranscript !== undefined && text !== rawTranscript,
    },
    timing: {
      startedAt: at,
      // Capture duration belongs to audio metadata. No reliable response-onset clock exists here.
      activeMs: null,
      firstInputMs: null,
      source: "unavailable",
    },
    assistance: {
      hintCount: session.exposed.length,
      solutionRevealed: session.exposed.some((s) => s.startsWith("answer:")),
      exampleSeen: session.exposed.length > 0,
      selfReportedAssistance: false,
    },
    audio: audio ?? null,
    previousAttemptId: previous?.eventId ?? null,
  };
  // The existing evidence ledger remains authoritative. No unqualified assessment is appended.
  appendAutomaticityEvent(localStorage, event);
  const submission: Submission = {
    id,
    eventId: id,
    itemId,
    step: session.step,
    text,
    why,
    at,
    modelMatch,
    assisted: session.exposed.length > 0,
  };
  session.submissions.push(submission);
  saveSession(session);
  return submission;
}
