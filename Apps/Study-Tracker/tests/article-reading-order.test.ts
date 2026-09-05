import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "bun:test";
import { articleReadings, planWeeks, sources } from "../app/plan-data";

const literatureRoot = "D:\\Bachelor-Thesis\\02_Literature";
const literatureAvailable = existsSync(literatureRoot);

function collectPdfNames(directory: string, names = new Set<string>()): Set<string> {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) collectPdfNames(path, names);
    else if (entry.isFile() && entry.name.toLowerCase().endsWith(".pdf")) names.add(entry.name);
  }
  return names;
}

// External literature is learner-owned data and is intentionally absent from a clean product checkout.
const literaturePdfNames = literatureAvailable ? collectPdfNames(literatureRoot) : new Set<string>();

describe.skipIf(!literatureAvailable)("article reading order", () => {
  test("keeps numbered article files aligned with the eighteen weekly reading cycles", () => {
    const weeklyReadingOrder = planWeeks.slice(0, articleReadings.length)
      .map((week) => week.days[0]?.researchTrack.sourceId);
    const expectedArticleOrder = articleReadings.map((reading) => reading.sourceId);
    expect(weeklyReadingOrder).toEqual(expectedArticleOrder);

    articleReadings.forEach((reading) => {
      expect(sources[reading.sourceId]).toBeDefined();
      expect(literaturePdfNames.has(reading.fileName)).toBeTrue();
    });
  });

  test("uses unique article filenames", () => {
    const names = articleReadings.map((reading) => reading.fileName);
    expect(new Set(names).size).toBe(names.length);
  });

  test("uses filenames that exist in the authoritative literature library", () => {
    const localArticleNames = Object.values(sources)
      .filter((source) => source.id !== "proposal")
      .map((source) => source.driveName)
      .filter((fileName): fileName is string => Boolean(fileName?.endsWith(".pdf")));

    expect(localArticleNames.length).toBeGreaterThan(20);
    for (const fileName of localArticleNames) {
      expect(literaturePdfNames.has(fileName)).toBeTrue();
    }
  });
});
