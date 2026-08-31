import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "bun:test";
import { articleReadings, planWeeks, sources } from "../app/plan-data";

const recoveredArticleFolder =
  "D:\\Bachelor-Thesis\\All Artikels\\Recovered_Articles_2026-08-07";

describe("article reading order", () => {
  test("keeps numbered article files aligned with the eighteen weekly reading cycles", () => {
    const weeklyReadingOrder = planWeeks.slice(0, articleReadings.length)
      .map((week) => week.days[0]?.researchTrack.sourceId);
    const expectedArticleOrder = articleReadings.map((reading) => reading.sourceId);
    expect(weeklyReadingOrder).toEqual(expectedArticleOrder);

    articleReadings.forEach((reading) => {
      expect(sources[reading.sourceId]).toBeDefined();
      expect(existsSync(join(recoveredArticleFolder, reading.fileName))).toBeTrue();
    });
  });

  test("uses unique article filenames", () => {
    const names = articleReadings.map((reading) => reading.fileName);
    expect(new Set(names).size).toBe(names.length);
  });

  test("uses recovered-folder names for every local article source", () => {
    const localArticleNames = Object.values(sources)
      .filter((source) => source.id !== "proposal")
      .map((source) => source.driveName)
      .filter((fileName): fileName is string => Boolean(fileName?.endsWith(".pdf")));

    expect(localArticleNames.length).toBeGreaterThan(20);
    for (const fileName of localArticleNames) {
      expect(existsSync(join(recoveredArticleFolder, fileName))).toBeTrue();
    }
  });
});
