import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  makeLesson,
  createSession,
  parseSession,
  matchesModel,
  completionReady,
  scheduleReviews,
  reviewIsDue,
  type Language,
  type Submission,
} from "./model";
import type { GrammarWorksheet } from "../grammar-worksheets/model";
import { parseAutomaticityEvent } from "../learning-core/src/automaticity/contracts";
import { loadSession, saveSession, submitPractice } from "./persistence";
const root = resolve(import.meta.dir, "../..");
function worksheets(language: Language): GrammarWorksheet[] {
  const app =
    language === "de"
      ? "Apps/Deutsch-Automaticity"
      : "Apps/English/English-Automaticity";
  const source = readFileSync(
    resolve(
      root,
      app,
      `apps/web/public/replacements/${language}/grammar-worksheets.js`,
    ),
    "utf8",
  );
  return JSON.parse(
    source.slice(source.indexOf('{"worksheets":'), source.lastIndexOf(";")),
  ).worksheets;
}
const lesson = makeLesson(worksheets("en")[0]!);
describe("seven-step content and evidence boundaries", () => {
  for (const language of ["en", "de"] as const)
    test(`${language}: every catalog topic has usable seven-step content`, () => {
      const catalog = worksheets(language);
      expect(catalog.length).toBe(language === "en" ? 112 : 144);
      for (const worksheet of catalog) {
        const value = makeLesson(worksheet);
        expect(value.worksheet.id).toBe(worksheet.id);
        expect(value.learn.length).toBeGreaterThanOrEqual(10);
        expect(value.repair.length).toBeGreaterThanOrEqual(4);
        expect(value.oral.length).toBeGreaterThanOrEqual(9);
        expect(value.learn.some((i) => i.kind === "recall")).toBe(true);
        expect(value.learn.some((i) => i.kind === "transform")).toBe(true);
        expect(value.script.length).toBeGreaterThanOrEqual(2);
        expect(worksheet.personal.length).toBeGreaterThan(0);
        for (const group of [value.learn, value.repair, value.oral]) {
          expect(new Set(group.map((i) => i.id)).size).toBe(group.length);
          for (const item of group)
            for (const field of [
              item.answer,
              item.cause,
              item.trigger,
              item.category,
              item.contrast,
            ])
              expect(field.trim().length).toBeGreaterThan(0);
        }
      }
    });
  test("opening all steps cannot complete practice or create mastery", () => {
    const s = createSession("en", lesson, "test");
    s.visited = [1, 2, 3, 4, 5, 6, 7];
    for (const step of s.visited) {
      s.step = step;
      expect(completionReady(s, lesson)).toBe(false);
    }
    expect(s.completed).toEqual([]);
    expect(s.reviews).toEqual([]);
    expect("mastered" in s).toBe(false);
  });
  test("one submission cannot finish a repeated cue block", () => {
    const s = createSession("en", lesson, "test");
    s.submissions = [{ itemId: lesson.learn[0]!.id, step: 1 } as Submission];
    expect(completionReady(s, lesson)).toBe(false);
  });
  test("model comparison is not a permissive grammar checker", () => {
    expect(matchesModel("  I’m ready! ", "I'm ready.")).toBe(true);
    expect(matchesModel("I am ready.", "I'm ready.")).toBe(false);
    // A grammatical variant is a comparison mismatch, never a failed assessment.
    expect(matchesModel("Mache eine Pause!", "Mach eine Pause!")).toBe(false);
  });
  test("reviews cannot complete before their date or complete twice", () => {
    const now = new Date(2026, 8, 8, 15, 0),
      reviews = scheduleReviews(now, "Europe/Berlin");
    expect(reviews.map((r) => r.day)).toEqual([1, 3, 7, 14, 30]);
    for (const review of reviews) {
      expect(reviewIsDue(review, Date.parse(review.dueAt) - 1)).toBe(false);
      expect(reviewIsDue(review, Date.parse(review.dueAt))).toBe(true);
      expect(
        reviewIsDue(
          { ...review, completedAt: review.dueAt },
          Date.parse(review.dueAt) + 1,
        ),
      ).toBe(false);
    }
  });
  test("saved state rejects wrong languages and invalid step values", () => {
    const s = createSession("en", lesson, "test");
    expect(() =>
      parseSession(JSON.stringify(s), "de", lesson.worksheet.id),
    ).toThrow();
    expect(() =>
      parseSession(
        JSON.stringify({ ...s, step: 12 }),
        "en",
        lesson.worksheet.id,
      ),
    ).toThrow();
    expect(() =>
      parseSession(
        JSON.stringify({ ...s, shadowStage: 7 }),
        "en",
        lesson.worksheet.id,
      ),
    ).toThrow();
  });
  test("drafts, retries and ledger events survive reload without awarding assessment", async () => {
    const data = new Map<string, string>();
    const storage = {
      get length() {
        return data.size;
      },
      key: (n: number) => [...data.keys()][n] ?? null,
      getItem: (k: string) => data.get(k) ?? null,
      setItem: (k: string, v: string) => {
        data.set(k, v);
      },
      removeItem: (k: string) => {
        data.delete(k);
      },
    };
    const original = Object.getOwnPropertyDescriptor(
      globalThis,
      "localStorage",
    );
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: storage,
    });
    try {
      const s = createSession("en", lesson, "synthetic");
      saveSession(s);
      const stale = loadSession("en", lesson);
      s.fields["1:0:0:answer"] = "I'm ready.";
      s.fields["1:0:0:answer:ink"] = [[{ x: 10, y: 20, p: 0.6 }]];
      saveSession(s);
      expect(() => saveSession(stale)).toThrow("another tab");
      const first = await submitPractice(
        s,
        lesson,
        lesson.learn[0]!.id,
        "I'm ready.",
        "I → am",
        true,
      );
      const second = await submitPractice(
        s,
        lesson,
        lesson.learn[0]!.id,
        "I am ready.",
        "same target",
        false,
      );
      const restored = loadSession("en", lesson);
      expect(restored.fields["1:0:0:answer:ink"]).toEqual([
        [{ x: 10, y: 20, p: 0.6 }],
      ]);
      expect(restored.submissions.map((a) => a.id)).toEqual([
        first.id,
        second.id,
      ]);
      const events = [...data.entries()]
        .filter(([k]) => k.includes(":event:"))
        .map(([, v]) => parseAutomaticityEvent(JSON.parse(v)));
      expect(events.length).toBe(2);
      expect(events.every((e) => e.type === "attempt")).toBe(true);
      const retry = events[1]!;
      if (retry.type !== "attempt") throw new Error("wrong event");
      expect(retry.previousAttemptId).toBe(first.eventId);
      expect(retry.task.partition).toBe("practice");
      expect(retry.timing.firstInputMs).toBeNull();
      s.step = 4;
      const speech = await submitPractice(
        s,
        lesson,
        "speak-personal",
        "Edited transcript.",
        "A trigger",
        null,
        {
          id: "synthetic-audio",
          sha256: "a".repeat(64),
          bytes: 100,
          durationMs: 2400,
          mime: "audio/webm",
          persisted: true,
        },
        "Original transcript.",
      );
      const stored = parseAutomaticityEvent(
        JSON.parse(storage.getItem(`automaticity:v2:en:event:${speech.id}`)!),
      );
      if (stored.type !== "attempt") throw new Error("wrong event");
      expect(stored.audio?.durationMs).toBe(2400);
      expect(stored.timing.activeMs).toBeNull();
      expect(stored.response.transcriptEdited).toBe(true);
      expect(stored.response.originalTranscriptSha256).not.toBeNull();
    } finally {
      if (original) Object.defineProperty(globalThis, "localStorage", original);
      else Reflect.deleteProperty(globalThis, "localStorage");
    }
  });
});
