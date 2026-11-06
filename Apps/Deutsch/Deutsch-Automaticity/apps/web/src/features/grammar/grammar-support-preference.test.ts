import { expect, test } from "bun:test";
import { resolveGrammarSupportLanguage } from "./grammar-support-preference";

test("German grammar uses the Persian language chosen in practice", () => {
  const values = new Map<string, string>([
    ["deutsch-automaticity:explanation-language", "فارسی"],
    ["deutschflow:honovr-language", "de"],
  ]);
  expect(
    resolveGrammarSupportLanguage({
      getItem: (key) => values.get(key) ?? null,
    }),
  ).toBe("fa");
});

test("an older explicit grammar choice survives until the shared preference is set", () => {
  const values = new Map<string, string>([
    ["deutschflow:honovr-language", "en"],
  ]);
  expect(
    resolveGrammarSupportLanguage({
      getItem: (key) => values.get(key) ?? null,
    }),
  ).toBe("en");
});
