import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import SupportPage from "@/app/support/page";

test("DeutschFlow Hilfe erklärt Lernweg und Erinnerung mit echten Links", () => {
  const html = renderToStaticMarkup(createElement(SupportPage));
  expect(html).toContain('id="daily-plan"');
  expect(html).toContain('href="/heute"');
  expect(html).toContain('href="/heute#daily-reminder"');
  expect(html).toContain("importiere");
  expect(html).toContain("ohne Bewertung");
});
