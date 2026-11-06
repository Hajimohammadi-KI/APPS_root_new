import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { dailyDashboard } from "@automaticity/learning-core/automaticity";
import { LearningHome } from "./learning-home";

test("English home shows seven dated calendar cells before the first response", () => {
  const values = new Map<string, string>();
  const store = {
    get length() {
      return values.size;
    },
    key: (index: number) => [...values.keys()][index] ?? null,
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => {
      values.set(key, value);
    },
    removeItem: (key: string) => {
      values.delete(key);
    },
  };
  const daily = dailyDashboard(store, "en", "2026-11-05T12:00:00.000Z");
  const html = renderToStaticMarkup(
    <LearningHome language="en" name="" level="A1" daily={daily} ready>
      {null}
    </LearningHome>,
  );
  expect((html.match(/<time dateTime=/g) ?? []).length).toBe(7);
  expect(html).toContain("05.11");
  expect(html).toContain("No saved responses in these seven days");
});
