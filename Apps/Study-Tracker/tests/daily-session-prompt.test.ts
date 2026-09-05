import { describe, expect, test } from "bun:test";

import { planWeeks, sources } from "../app/plan-data";
import {
  DAILY_SESSION_COMMANDS,
  buildDailySessionPrompt,
} from "../lib/daily-session-prompt";

describe("daily AI work-session prompt", () => {
  const day = planWeeks[0].days[0];
  const source = sources[day.researchTrack.sourceId];

  test("offers every persistent companion command", () => {
    expect(DAILY_SESSION_COMMANDS.map((command) => command.id)).toEqual([
      "start",
      "continue",
      "stuck",
      "close",
      "paper",
    ]);
  });

  test("builds a day-specific prompt without granting write permissions", () => {
    const prompt = buildDailySessionPrompt({
      command: "start",
      day,
      effectiveDate: "2026-08-30",
      sourceLabel: source.label,
    });

    expect(prompt).toContain(day.title);
    expect(prompt).toContain(day.researchTrack.readOnly);
    expect(prompt).toContain(day.researchTrack.question);
    expect(prompt).toContain(day.researchTrack.expectedOutput);
    expect(prompt).toContain(day.deliverable);
    expect(prompt).toContain("Artefact + Test + Evidence");
    expect(prompt).toContain("independently unauthorized");
  });

  test("Builder Mode still requires explicit edit, commit, push, and deployment permission", () => {
    const prompt = buildDailySessionPrompt({
      command: "stuck",
      day,
      effectiveDate: "2026-08-30",
      sourceLabel: source.label,
    });

    expect(prompt).toContain("Builder Mode for this unit only");
    expect(prompt).toContain("Editing, committing, pushing, and deployment are NOT authorized");
  });
});
