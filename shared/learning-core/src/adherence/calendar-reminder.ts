import type { Language } from "../automaticity/contracts";

const REMINDER_URL: Record<Language, string> = {
  en: "https://english-grammar-automaticity-pwa.vercel.app/daily",
  de: "https://deutschflow-grammar.vercel.app/heute",
};

function calendarDate(date: Date): string {
  return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
}

function fold(line: string): string[] {
  const rows: string[] = [];
  let current = "";
  let bytes = 0;
  for (const character of line) {
    const size = new TextEncoder().encode(character).length;
    if (bytes + size > 75) {
      rows.push(current);
      current = " ";
      bytes = 1;
    }
    current += character;
    bytes += size;
  }
  rows.push(current);
  return rows;
}

/** A floating local time stays at the chosen clock hour across DST changes. */
export function buildDailyReminderCalendar(input: {
  readonly language: Language;
  readonly time: string;
  readonly now: Date;
}): string {
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(input.time);
  if (!match || Number.isNaN(input.now.getTime())) {
    throw new RangeError("A valid local HH:MM time and date are required");
  }
  const [hour, minute] = [Number(match[1]), Number(match[2])];
  const first = new Date(
    input.now.getFullYear(),
    input.now.getMonth(),
    input.now.getDate(),
    hour,
    minute,
  );
  if (first <= input.now) first.setDate(first.getDate() + 1);
  const stamp = input.now
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
  const title =
    input.language === "en"
      ? "Daily English practice"
      : "Tägliche Deutschübung";
  const description =
    input.language === "en"
      ? "Open today's practice and start with the recommended step."
      : "Öffne die heutige Übung und beginne mit dem empfohlenen Schritt.";
  return (
    [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Automaticity//Daily Practice Reminder//EN",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `UID:daily-practice-${input.language}@automaticity.local`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${calendarDate(first)}T${match[1]}${match[2]}00`,
      "DURATION:PT15M",
      "RRULE:FREQ=DAILY",
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `URL:${REMINDER_URL[input.language]}`,
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      "TRIGGER:PT0M",
      `DESCRIPTION:${title}`,
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ]
      .flatMap(fold)
      .join("\r\n") + "\r\n"
  );
}
