import { describe, expect, test } from "bun:test";
import type { PracticeTask } from "./curriculum";
import { buildDailyPathSteps } from "./daily-path-plan";

const transfer = {
  id: "de.c.001.transfer",
  constructionId: "de.c.001",
  stage: "transfer",
  modality: "writing",
  partition: "practice",
} as PracticeTask;

describe("daily path toward independent grammar use", () => {
  test("starts with the due recommendation and links a real new-context task", () => {
    const steps = buildDailyPathSteps(
      {
        reason: "due_review",
        href: "/practice?task=de.c.001.retrieve",
        level: "A1",
        unit: { tasks: [transfer] },
      },
      "de",
    );
    expect(steps.map((step) => step.id)).toEqual([
      "priority",
      "transfer",
      "later",
    ]);
    expect(steps[0]?.label).toContain("Wiederholung");
    expect(steps[0]?.href).toBe("/practice?task=de.c.001.retrieve");
    expect(steps[1]?.href).toContain("task=de.c.001.transfer");
    expect(steps[2]?.href).toBeNull();
  });

  test("does not suggest a retired transfer task or claim it was checked", () => {
    const steps = buildDailyPathSteps(
      {
        reason: "repair",
        href: "/practice?task=en.c.001.repair",
        level: "A1",
        unit: {
          tasks: [transfer],
          retiredTasks: [
            {
              taskId: transfer.id,
              replacementTaskId: "de.c.001.new",
              reason: "revised",
              retiredOn: "2026-11-06",
            },
          ],
        },
      },
      "en",
    );
    expect(steps[0]?.label).toContain("error");
    expect(steps[1]?.href).toBeNull();
    expect(steps[1]?.detail).toContain("unscored");
    expect(steps[2]?.detail).toContain("fresh question");
  });

  test("does not repeat the recommended task as the new-context task", () => {
    const steps = buildDailyPathSteps(
      {
        reason: "continued_practice",
        href: `/practice?task=${transfer.id}`,
        level: "A1",
        task: transfer,
        unit: { tasks: [transfer] },
      },
      "de",
    );
    expect(steps[1]?.href).toBeNull();
  });

  test("uses Persian guidance when Persian is the learner's selected language", () => {
    const steps = buildDailyPathSteps(
      {
        reason: "due_review",
        href: "/practice?task=de.c.001.retrieve",
        level: "A1",
        unit: { tasks: [transfer] },
      },
      "de",
      "fa",
    );
    expect(steps[0]?.label).toContain("مرور");
    expect(steps[1]?.detail).toContain("نمره");
  });
});
