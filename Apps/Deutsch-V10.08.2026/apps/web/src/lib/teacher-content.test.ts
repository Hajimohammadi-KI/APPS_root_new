import { describe, expect, test } from "bun:test";

import {
  ensureTeacherContextKey,
  isPublishedTeacherContent,
  type TeacherContentItem,
} from "./teacher-content";

const baseItem: TeacherContentItem = {
  id: "8d5a6ed2-a1ef-4a76-b716-9aecefba7c42",
  kind: "conversation",
  level: "A1",
  title: "Über Familie sprechen",
  body: "Eine kurze Gesprächsaufgabe.",
  contextKey: "",
  updatedAt: "2026-08-28T00:00:00.000Z",
};

describe("teacher content linking", () => {
  test("creates a stable link from normal teacher inputs", () => {
    expect(ensureTeacherContextKey(baseItem)).toBe(
      "teacher.a1.conversation.ueber-familie-sprechen.8d5a6ed2",
    );
  });

  test("keeps an existing link during editing", () => {
    expect(
      ensureTeacherContextKey({
        ...baseItem,
        contextKey: "conversation.a1.family",
      }),
    ).toBe("conversation.a1.family");
  });

  test("keeps old content available but protects new drafts from learners", () => {
    expect(isPublishedTeacherContent(baseItem)).toBe(true);
    expect(isPublishedTeacherContent({ ...baseItem, status: "draft" })).toBe(
      false,
    );
    expect(isPublishedTeacherContent({ ...baseItem, status: "review" })).toBe(
      false,
    );
    expect(
      isPublishedTeacherContent({ ...baseItem, status: "published" }),
    ).toBe(true);
  });
});
