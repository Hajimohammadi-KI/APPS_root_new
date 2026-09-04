import { describe, expect, test } from "bun:test";
import {
  assessControlledTask,
  normaliseAnswer,
  validateModelAssessment,
} from "./assessment";
import { ResponseTimer } from "./media";
import { selectDailyFocus } from "./selector";
import { type CurriculumPack, type PracticeTask } from "./curriculum";
import { type AttemptEvent } from "./contracts";
import { reduceAutomaticityEvents } from "./evidence";
const at = "2026-09-05T10:00:00.000Z";
const task: PracticeTask = {
  id: "t",
  version: "1",
  constructionId: "de.c.001",
  familyId: "G01",
  itemFamily: "i",
  contextId: "home",
  rubricVersion: "1",
  stage: "retrieve",
  modality: "writing",
  partition: "practice",
  transferCondition: "none",
  contentReview: "authored",
  prompt: "Ergänze: Ich ___ bereit.",
  answerPolicy: "closed",
  responseKind: "cloze",
  acceptedAnswers: ["Ich bin bereit."],
  hints: [],
  solution: "Ich bin bereit.",
  normalisation: {
    nfc: true,
    whitespace: true,
    terminalFullStop: true,
    preserveCase: true,
  },
  sourceId: "test",
};
const attempt: AttemptEvent = {
  version: 2,
  type: "attempt",
  id: "a",
  language: "de",
  at,
  task,
  response: {
    text: "Ich bin bereit.",
    sha256: "a".repeat(64),
    originalTranscriptSha256: null,
    transcriptEdited: false,
  },
  timing: {
    startedAt: at,
    activeMs: null,
    firstInputMs: null,
    source: "unavailable",
  },
  assistance: {
    hintCount: 0,
    solutionRevealed: false,
    exampleSeen: false,
    selfReportedAssistance: false,
  },
  audio: null,
  previousAttemptId: null,
};
const pack: CurriculumPack = {
  version: "1",
  mappingVersion: "1",
  language: "de",
  units: [1, 2, 3].map((index) => ({
    id: `de.c.00${index}`,
    language: "de",
    title: `Unit ${index}`,
    level: "A1",
    familyIds: ["G01"],
    prerequisites: [],
    lessonAlias: `A1::Unit ${index}`,
    rule: "Synthetic fixture",
    examples: [],
    commonError: "Synthetic",
    review: "authored",
    sources: [],
    tasks: [],
  })),
};
describe("scoped feedback and task selection", () => {
  test("normalization preserves grammatical case and significant punctuation", () => {
    expect(normaliseAnswer("  Ich   bin bereit. ", task)).toBe(
      "Ich bin bereit",
    );
    expect(normaliseAnswer("ich bin bereit?", task)).toBe("ich bin bereit?");
  });
  test("case-only mismatch is checked without accepting lowercased German nouns", () => {
    const result = assessControlledTask(
      {
        ...attempt,
        response: { ...attempt.response, text: "ich bin bereit." },
      },
      task,
      at,
      "judge",
    );
    expect(result.verdict).toBe("needs_repair");
    expect(result.evaluator.scopeApproved).toBe(false);
  });
  test("a valid variant and an open answer do not receive invented failure scores", () => {
    expect(
      assessControlledTask(
        {
          ...attempt,
          response: { ...attempt.response, text: "Ich bin schon bereit." },
        },
        task,
        at,
        "j",
      ).verdict,
    ).toBe("not_assessed");
    expect(
      assessControlledTask(
        attempt,
        { ...task, answerPolicy: "open", acceptedAnswers: [] },
        at,
        "j",
      ).verdict,
    ).toBe("not_assessed");
  });
  test("model responses cannot approve themselves", () => {
    const proposal = assessControlledTask(attempt, task, at, "j");
    proposal.evaluator = {
      id: "model",
      version: "1",
      kind: "transformer",
      scopeApproved: true,
      reviewId: "self-approved",
    };
    const approval = {
      evaluatorId: "model",
      evaluatorVersion: "1",
      language: "de" as const,
      constructionIds: [task.constructionId],
      rubricVersions: ["1"],
      modalities: ["writing" as const],
      benchmarkSha256: "b".repeat(64),
      approved: false,
    };
    expect(() => validateModelAssessment(proposal, attempt, approval)).toThrow(
      "benchmark",
    );
    expect(() =>
      validateModelAssessment(
        { ...proposal, responseSha256: "c".repeat(64) },
        attempt,
        { ...approval, approved: true },
      ),
    ).toThrow("original");
  });
  test("cold start stays diagnostic and limits the daily focus", () => {
    const result = selectDailyFocus(pack, [], at, "A1", 99);
    expect(result.focus).toHaveLength(2);
    expect(result.repairs).toEqual([]);
    expect(result.reason).toBe("diagnostic");
    expect(selectDailyFocus(pack, [], at, "A1", 99)).toEqual(result);
  });
  test("practice errors can request repair before a mastery score exists", () => {
    const result = assessControlledTask(
      {
        ...attempt,
        response: { ...attempt.response, text: "ich bin bereit." },
      },
      task,
      at,
      "j",
    );
    const state = reduceAutomaticityEvents([attempt, result], "de", at);
    expect(state.progress[0]?.accuracy).toBeNull();
    expect(state.progress[0]?.practiceFailures).toBe(1);
    expect(selectDailyFocus(pack, state.progress, at, "A1").reason).toBe(
      "repair",
    );
    expect(
      selectDailyFocus(pack, state.progress, "2026-09-07T10:00:00.000Z", "A1")
        .reason,
    ).toBe("due_review");
    expect(state.progress[0]?.delayedSuccesses).toBe(0);
  });
  test("a hidden tab contributes no response latency", () => {
    let clock = 0;
    const timer = new ResponseTimer(() => clock);
    clock = 200;
    timer.visibility(false);
    clock = 10000;
    timer.visibility(true);
    clock = 10400;
    timer.input();
    clock = 10600;
    expect(timer.read()).toEqual({ activeMs: 800, firstInputMs: 600 });
  });
});
