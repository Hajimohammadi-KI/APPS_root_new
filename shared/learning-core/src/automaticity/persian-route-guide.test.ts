import { expect, test } from "bun:test";
import { persianRouteGuide } from "./persian-route-guide";

test("every learner activity route has a short Persian path", () => {
  for (const [language, routes] of [
    [
      "de",
      [
        "/",
        "/heute",
        "/grammatik",
        "/studio",
        "/fortschritt",
        "/fehler",
        "/wiederholungen",
        "/fertigkeiten",
        "/audio",
        "/ressourcen",
        "/automatik",
        "/einstellungen",
        "/lehrkraft",
      ],
    ],
    [
      "en",
      [
        "/",
        "/daily",
        "/grammar",
        "/studio",
        "/progress",
        "/errors",
        "/notebook",
        "/integrated-skills",
        "/library",
        "/resources",
        "/flashcards",
        "/settings",
        "/teacher",
      ],
    ],
  ] as const) {
    for (const route of routes) {
      const guide = persianRouteGuide(route, language);
      expect(guide?.steps.length).toBeGreaterThanOrEqual(3);
      expect(guide?.title.length).toBeGreaterThan(5);
    }
  }
});

test("practice and non-learner routes do not add a duplicate learning path", () => {
  expect(persianRouteGuide("/practice", "de")).toBeNull();
  expect(persianRouteGuide("/privacy", "en")).toBeNull();
});
