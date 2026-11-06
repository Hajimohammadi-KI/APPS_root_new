import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import SupportPage from "@/app/support/page";

test("English Help explains the daily path and reminder with working links", () => {
  const html = renderToStaticMarkup(createElement(SupportPage));
  expect(html).toContain('id="daily-plan"');
  expect(html).toContain('href="/daily"');
  expect(html).toContain('href="/daily#daily-reminder"');
  expect(html).toContain("import the file");
  expect(html).toContain("unscored");
});
