import { expect, test } from "bun:test";
import { createClientId } from "./client-id";

test("local draft IDs still work when LAN HTTP has no randomUUID", () => {
  const source = { getRandomValues: crypto.getRandomValues.bind(crypto) };
  const ids = Array.from({ length: 1000 }, () => createClientId(source));
  expect(new Set(ids).size).toBe(ids.length);
  for (const id of ids)
    expect(id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    );
});

test("uses the platform UUID when it is available", () => {
  expect(createClientId()).toHaveLength(36);
});
