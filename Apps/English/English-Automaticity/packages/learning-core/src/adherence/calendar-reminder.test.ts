import { describe, expect, test } from "bun:test";
import { buildDailyReminderCalendar } from "./calendar-reminder";

describe("daily calendar reminder", () => {
  test("exports a local-time daily alarm without learner details", () => {
    const calendar = buildDailyReminderCalendar({
      language: "de",
      time: "18:30",
      now: new Date("2026-11-06T17:00:00"),
    });
    expect(calendar).toContain("DTSTART:20261106T183000");
    expect(calendar).toContain("RRULE:FREQ=DAILY");
    expect(calendar).toContain("TRIGGER:PT0M");
    expect(calendar.replace(/\r\n /g, "")).toContain(
      "URL:https://deutschflow-grammar.vercel.app/heute",
    );
    expect(calendar).not.toContain("Europe/Berlin");
    expect(calendar).not.toContain("PROFILE");
    expect(calendar).toEndWith("END:VCALENDAR\r\n");
  });

  test("starts tomorrow after the chosen time and rejects invalid times", () => {
    const calendar = buildDailyReminderCalendar({
      language: "en",
      time: "08:15",
      now: new Date("2026-11-06T09:00:00"),
    });
    expect(calendar).toContain("DTSTART:20261107T081500");
    expect(calendar.replace(/\r\n /g, "")).toContain(
      "URL:https://english-grammar-automaticity-pwa.vercel.app/daily",
    );
    expect(() =>
      buildDailyReminderCalendar({
        language: "en",
        time: "25:99",
        now: new Date("2026-11-06T09:00:00"),
      }),
    ).toThrow();
  });
});
