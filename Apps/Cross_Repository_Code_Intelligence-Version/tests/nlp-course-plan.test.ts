import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "bun:test";
import appPackage from "../package.json";
import {
  allDays,
  articleReadings,
  defaultSettings,
  extractionSections,
  isNlpCatchUpSession,
  isNlpRemainingLiveSession,
  nlpCourseMeta,
  nlpCourseSessions,
  nlpCourseTransferPlans,
  nlpSessionsRelatedToPlanDay,
  nlpLabDefinition,
  PLAN_VERSION,
  PLAN_VERSION_HISTORY,
  planWeeks,
  sources,
  trackerRestartPlan,
} from "../app/plan-data";
import { buildCourseReadingPlanDescription } from "../lib/nlp-course-calendar";

const expectedDates = [
  "2026-08-17", "2026-08-19", "2026-08-22", "2026-08-24", "2026-08-26",
  "2026-08-29", "2026-08-31", "2026-09-02", "2026-09-05", "2026-09-07",
];

const expectedTopics = [
  ["Introduction to Natural Language Processing", "Text Preprocessing", "Basic Text Representation", "Tokenization"],
  ["Bag-of-Words Model", "TF-IDF", "Vector Space Models", "Cosine Similarity"],
  ["Word2Vec", "Continuous Bag-of-Words (CBOW)", "Skip-Gram"],
  ["GloVe", "FastText", "Using Embedding Layers in Keras"],
  ["Recurrent Neural Networks (RNNs)", "The Vanishing Gradient Problem"],
  ["Advanced Recurrent Architectures: LSTM and GRU", "Sentiment Analysis Project Using LSTM"],
  ["Sequence-to-Sequence Architecture (Seq2Seq)", "Introduction to the Transformer Architecture"],
  ["Self-Attention", "Multi-Head Attention", "Positional Encoding"],
  ["Transformer Encoder and Decoder", "BERT Family—Encoder-Based Models", "GPT Family—Decoder-Based Models"],
  ["Prompt Engineering", "Parameter-Efficient Fine-Tuning (PEFT)", "LoRA and QLoRA", "Retrieval-Augmented Generation (RAG)", "BLEU and ROUGE"],
];

const readingFolder =
  "D:\\Bachelor-Thesis\\All Artikels\\Recovered_Articles_2026-08-07";

describe("Advanced Deep Learning reading plan", () => {
  test("uses the ten official dates, topics, and class times", () => {
    expect(nlpCourseSessions.map((session) => session.date)).toEqual(expectedDates);
    expect(nlpCourseSessions.map((session) => session.topics)).toEqual(expectedTopics);
    expect(nlpCourseSessions).toHaveLength(10);
    for (const session of nlpCourseSessions) {
      expect(session.berlinTime).toBe("19:30–21:10");
      expect(session.iranTime).toBe("21:00–22:40");
      expect(session.readingFocus).toHaveLength(3);
      expect(session.projectConnection.length).toBeGreaterThan(40);
      expect(session.extractionGoal.length).toBeGreaterThan(40);
    }
    expect(nlpCourseMeta.instructor).toBe("Farshid Shirafkan");
    expect(nlpCourseMeta.platform).toBe("Google Meet");
    expect(nlpCourseMeta.sessionCount).toBe(10);
    expect(nlpCourseMeta.sessionMinutes).toBe(100);
    expect(nlpCourseSessions.every((session) => [1, 3, 6].includes(
      new Date(`${session.date}T12:00:00Z`).getUTCDay(),
    ))).toBeTrue();
  });

  test("maps every session only to stable, existing article readings", () => {
    const readingIds = new Set(articleReadings.map((reading) => reading.id));
    for (const session of nlpCourseSessions) {
      expect(session.readingIds.length).toBeGreaterThan(0);
      expect(session.readingIds.every((id) => readingIds.has(id as `reading-${number}`))).toBeTrue();
    }
  });

  test("partitions sessions 9 and 10 into required, reuse, and optional work", () => {
    const prioritizedSessions = nlpCourseSessions.filter((session) => session.readingPlan);
    expect(prioritizedSessions.map((session) => session.number)).toEqual([9, 10]);

    for (const session of prioritizedSessions) {
      const plan = session.readingPlan!;
      const partition = [...plan.required, ...plan.reuse, ...plan.optional];
      expect(new Set(partition).size).toBe(partition.length);
      expect(new Set(partition)).toEqual(new Set(session.readingIds));
      expect(plan.deliverables).toHaveLength(3);
      const coveredByDeliverables = new Set(
        plan.deliverables.flatMap((deliverable) => deliverable.readingIds),
      );
      expect(plan.required.every((readingId) => coveredByDeliverables.has(readingId))).toBeTrue();
      expect(plan.deliverables.every((deliverable) => deliverable.acceptance.length > 60)).toBeTrue();
    }

    const session9 = nlpCourseSessions.find((session) => session.number === 9)!;
    expect(session9.readingPlan?.required).toEqual([
      "reading-17", "reading-22", "reading-10", "reading-14",
    ]);
    expect(session9.readingPlan?.reuse).toEqual([]);
    expect(session9.readingPlan?.optional).toHaveLength(6);
    expect(session9.readingPlan?.deliverables.at(-1)?.readingIds).toEqual([
      "reading-10", "reading-14",
    ]);

    const session10 = nlpCourseSessions.find((session) => session.number === 10)!;
    expect(session10.readingPlan?.required).toEqual([
      "reading-15", "reading-19", "reading-13",
    ]);
    expect(session10.readingPlan?.reuse).toEqual([
      "reading-06", "reading-17", "reading-22",
    ]);
    expect(session10.readingPlan?.optional).toHaveLength(8);
    expect(session10.readingPlan?.deliverables.at(-1)?.acceptance).toContain("NOT_ANSWERABLE");
  });

  test("writes observer-only live sessions without preparation or mandatory deliverables", () => {
    const session9 = nlpCourseSessions.find((session) => session.number === 9)!;
    const session10 = nlpCourseSessions.find((session) => session.number === 10)!;
    const formatReading = (readingId: string) => `REF:${readingId}`;

    const session9Description = buildCourseReadingPlanDescription(session9, formatReading);
    expect(session9Description).toContain("Live beobachten; keine Vorablektüre");
    expect(session9Description).toContain("maximal 3 Zeilen");
    expect(session9Description).toContain("nicht vor 2026-10-19 nachholen");
    expect(session9Description).toContain("REF:reading-17");
    expect(session9Description.includes("Pflichtquellen")).toBeFalse();
    expect(session9Description.includes("Pflichtergebnisse")).toBeFalse();

    const session10Description = buildCourseReadingPlanDescription(session10, formatReading);
    expect(session10Description).toContain("keine Vorablektüre und kein Pflichtartefakt");
    expect(session10Description).toContain("Referenzmaterial erst nach dem Neustart");
    expect(session10Description).toContain("REF:reading-06");
  });

  test("maps every class topic to real plan days with prepared teacher questions", () => {
    const dayTitles = new Set(allDays.map((day) => day.title));
    const nlpDays = allDays.filter((day) => day.phaseId.startsWith("nlp-"));
    const mappedTitles = new Set(
      nlpCourseSessions.flatMap((session) => session.relatedDayTitles),
    );

    for (const session of nlpCourseSessions) {
      expect(session.classQuestionsFa).toHaveLength(3);
      expect(session.classQuestionsFa.every((question) => question.length > 20)).toBeTrue();
      expect(session.whyThisMattersFa.length).toBeGreaterThan(60);
      expect(session.plannedActionFa.length).toBeGreaterThan(60);
      expect(session.relatedDayTitles.length).toBeGreaterThanOrEqual(2);
      expect(session.relatedDayTitles.every((title) => dayTitles.has(title))).toBeTrue();
    }

    expect(mappedTitles).toEqual(new Set(nlpDays.map((day) => day.title)));
    expect(
      allDays
        .filter((day) => mappedTitles.has(day.title))
        .every((day) => day.phaseId.startsWith("nlp-")),
    ).toBeTrue();
    expect(
      allDays.every(
        (day) => (nlpSessionsRelatedToPlanDay(day.title).length > 0) === mappedTitles.has(day.title),
      ),
    ).toBeTrue();
    expect(nlpSessionsRelatedToPlanDay("Problemstellung und Projektwert")).toEqual([]);
  });

  test("contains exactly 18 unique files with names from the recovered article folder", () => {
    expect(articleReadings).toHaveLength(18);
    expect(articleReadings.map((reading) => reading.order)).toEqual(
      Array.from({ length: 18 }, (_, index) => index + 6),
    );
    expect(
      [...articleReadings]
        .sort((a, b) => a.courseOrder - b.courseOrder)
        .map((reading) => reading.courseOrder),
    ).toEqual(Array.from({ length: 18 }, (_, index) => index + 1));
    expect(new Set(articleReadings.map((reading) => reading.id)).size).toBe(18);
    expect(new Set(articleReadings.map((reading) => reading.fileName)).size).toBe(18);
    expect(articleReadings[0]?.status).toBe("in_progress");
    for (const reading of articleReadings) {
      expect(existsSync(join(readingFolder, reading.fileName))).toBeTrue();
      expect(Boolean(sources[reading.sourceId])).toBeTrue();
      expect(reading.readingFocus).toHaveLength(3);
    }
    expect(extractionSections).toEqual([
      "Problem", "Method", "Data / Evaluation", "Findings", "Limitations",
      "Verbindung mit RQ / Projektarchitektur",
    ]);
  });

  test("starts on 30 August and protects full-rest and paper-only recovery windows", () => {
    expect(allDays[0]?.date).toBe(trackerRestartPlan.mainPlanStart);
    expect(allDays.at(-1)?.date).toBe("2027-03-06");
    expect(allDays.every((day) => day.date >= trackerRestartPlan.mainPlanStart)).toBeTrue();
    expect(allDays.every((day) => !day.optionalDuringCourse)).toBeTrue();
    expect(planWeeks.slice(0, 7).map((week) => week.days[0]?.date)).toEqual([
      "2026-08-30", "2026-09-17", "2026-09-25", "2026-10-09",
      "2026-10-16", "2026-10-23", "2026-10-26",
    ]);
    expect(defaultSettings.planStatus).toBe("running");
    expect(defaultSettings.dailyWorkMode).toBe("light");
    expect(defaultSettings.dailyStart).toBe("15:00");
    expect(defaultSettings.planEndDate).toBe("2027-03-06");

    const firstRestDays = allDays.filter((day) => day.date >= "2026-09-10" && day.date <= "2026-09-16");
    const secondRestDays = allDays.filter((day) => day.date >= "2026-09-29" && day.date <= "2026-10-05");
    expect(firstRestDays).toHaveLength(0);
    expect(secondRestDays).toHaveLength(0);

    const paperDays = allDays.filter((day) => day.workMode === "paper");
    expect(paperDays.map((day) => day.date)).toEqual([
      "2026-09-17", "2026-09-18", "2026-09-19", "2026-09-21", "2026-09-22", "2026-09-23",
      "2026-10-06", "2026-10-07", "2026-10-08", "2026-10-09", "2026-10-10", "2026-10-12", "2026-10-13",
    ]);
    expect(paperDays.every((day) => day.tasks[1]?.items.map((item) => item.label).join(" ").includes("auf Papier"))).toBeTrue();
    expect(paperDays.every((day) => day.tasks[2]?.items.map((item) => item.label).join(" ").includes("Bildschirmfreigabe"))).toBeTrue();
  });

  test("separates missed sessions from the three remaining live sessions", () => {
    expect(nlpCourseSessions.filter((session) => isNlpCatchUpSession(session.number)).map((session) => session.number)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(nlpCourseSessions.filter((session) => isNlpRemainingLiveSession(session.number)).map((session) => session.number)).toEqual([8, 9, 10]);
    expect(trackerRestartPlan.protectedBreakStart).toBe("2026-09-10");
    expect(trackerRestartPlan.protectedBreakEnd).toBe("2026-10-13");
    expect(trackerRestartPlan.gentleRestartStart).toBe("2026-10-14");
    expect(trackerRestartPlan.liveSessionPolicy).toEqual({
      mode: "observer_only",
      preparationMinutes: 0,
      noteLineLimit: 3,
      missedSessionRule: "do_not_catch_up_before_restart",
    });
    expect(trackerRestartPlan.catchUpPolicy.countsAsBacklog).toBeFalse();
    expect(trackerRestartPlan.catchUpPolicy.earliestDate).toBe("2026-10-19");
    expect(trackerRestartPlan.catchUpPolicy.maxSessionsPerWeek).toBe(1);
    expect(trackerRestartPlan.catchUpPolicy.requiresWeeklyCoreOutput).toBeTrue();
    expect(trackerRestartPlan.recoveryPolicy.minimumFullRestDays).toBe(7);
    expect(trackerRestartPlan.recoveryPolicy.screenFreeDays).toBe(14);
    expect(trackerRestartPlan.recoveryPolicy.paperOnlyFromDay).toBe(8);
    expect(trackerRestartPlan.recoveryPolicy.gentleDailyMinutes).toBe(12);
    expect(trackerRestartPlan.recoveryPolicy.mainDailyMaxMinutes).toBe(70);
    expect(trackerRestartPlan.recoveryPolicy.shiftWholePlanIfNotReady).toBeTrue();
    expect(trackerRestartPlan.recoveryPolicy.compressWeeks).toBeFalse();
    expect(trackerRestartPlan.recoveryPolicy.clinicalAdviceOverridesPlan).toBeTrue();
  });

  test("retains bounded historical transfer definitions as non-scheduled reference data", () => {
    expect(nlpCourseTransferPlans).toHaveLength(10);
    expect(new Set(nlpCourseTransferPlans.map((plan) => plan.sessionNumber)).size).toBe(10);
    for (const transfer of nlpCourseTransferPlans) {
      const session = nlpCourseSessions.find((item) => item.number === transfer.sessionNumber)!;
      const classDate = new Date(`${session.date}T00:00:00Z`).getTime();
      const noteLag = (new Date(`${transfer.noteDue}T00:00:00Z`).getTime() - classDate) / 86_400_000;
      const artifactLag = (new Date(`${transfer.artifactDue}T00:00:00Z`).getTime() - classDate) / 86_400_000;
      expect(noteLag).toBeGreaterThanOrEqual(1);
      expect(noteLag).toBeLessThanOrEqual(1);
      expect(artifactLag).toBeGreaterThanOrEqual(1);
      expect(artifactLag).toBeLessThanOrEqual(7);
      expect(transfer.maxMinutes).toBeLessThanOrEqual(45);
      expect(transfer.replacesDailyOutput).toBeTrue();
    }
  });

  test("records Revision 7 and the medically protected paper-mode boundary", () => {
    expect(PLAN_VERSION).toBe(7);
    expect(PLAN_VERSION_HISTORY.at(-1)?.effectiveDate).toBe("2026-08-30");
    expect(PLAN_VERSION_HISTORY.at(-1)?.tasksRemoved.join(" ")).toContain("Falscher Gesamtstart");
    expect(PLAN_VERSION_HISTORY.at(-1)?.tasksAdded.join(" ")).toContain("Papiermodus");
    expect(appPackage.version).toBe("0.6.2-version2");
    expect(nlpLabDefinition.courseStart).toBe("2026-08-17");
    expect(nlpLabDefinition.courseEnd).toBe("2026-09-07");
    expect(nlpLabDefinition.catchUpStart).toBe("2026-10-19");
    expect(nlpLabDefinition.projectFit).toContain("optional");
    expect(nlpLabDefinition.integrationContract.boundary).toContain("Evidence Paths");
  });
});
