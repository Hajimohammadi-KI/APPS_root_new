import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { getAppUsageGuide } from "./app-usage-guide";

describe("how-to-use guide for both language apps", () => {
  for (const target of ["en", "de"] as const) {
    test(`${target} shows a concrete route in the selected support language`, () => {
      const guide = getAppUsageGuide(target, "fa");
      expect(guide.steps).toHaveLength(4);
      expect(guide.steps[0]?.href).toBe(target === "en" ? "/daily" : "/heute");
      expect(guide.steps[0]?.description).toContain("پیشنهادی");
      expect(guide.steps[2]?.description).toContain("نمره");
      expect(guide.reminder.href).toBe(
        target === "en" ? "/daily#daily-reminder" : "/heute#daily-reminder",
      );
      expect(guide.reminder.description).toContain("تقویم");
      expect(guide.reminder.description).toContain("وارد");
      expect(guide.links.settings).toBe(
        target === "en" ? "/settings" : "/einstellungen",
      );
    });
  }

  test("English and German copy explain the limits of unscored answers", () => {
    expect(getAppUsageGuide("en", "en").limits).toContain("unscored");
    expect(getAppUsageGuide("de", "de").limits).toContain("ohne Bewertung");
  });

  test("the practice page shows short steps and keeps criteria separate", () => {
    const source = readFileSync(
      new URL("./practice.ts", import.meta.url),
      "utf8",
    );
    expect(source).toContain("PERSIAN_PRACTICE_GUIDE.steps");
    expect(source).toContain("PERSIAN_PRACTICE_GUIDE.criteria");
    expect(source).not.toContain("اول بدون دیدن مثال پاسخ بده. اگر لازم شد");
  });
});
