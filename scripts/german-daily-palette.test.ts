import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";

const page = readFileSync(
  new URL(
    "../Apps/Deutsch/Deutsch-Automaticity/apps/web/public/replacements/de/heute.html",
    import.meta.url,
  ),
  "utf8",
);
const css = page.match(/<style>([\s\S]*?)<\/style>/u)?.[1] ?? "";
const sharedPath = readFileSync(
  new URL(
    "../shared/learning-core/src/automaticity/learning-path-browser.ts",
    import.meta.url,
  ),
  "utf8",
);

function hue(hex: string): number {
  const [r, g, b] = [1, 3, 5].map(
    (at) => Number.parseInt(hex.slice(at, at + 2), 16) / 255,
  );
  const max = Math.max(r!, g!, b!);
  const min = Math.min(r!, g!, b!);
  if (max === min) return -1;
  const delta = max - min;
  const raw =
    max === r
      ? ((g! - b!) / delta) % 6
      : max === g
        ? (b! - r!) / delta + 2
        : (r! - g!) / delta + 4;
  return (raw * 60 + 360) % 360;
}

test("German daily page uses the lower button's teal across its accents", () => {
  expect(css).toContain("--accent:#007f83");
  expect(css).toMatch(/\.primary\{[^}]*background:var\(--accent\)/u);
  expect(css).toMatch(/\.open\.primary-mini\{[^}]*background:var\(--accent\)/u);
  expect(sharedPath).toContain("background:#007f83;color:#fff");
  expect(sharedPath).not.toContain("#6637a6");
  const purple = [...page.matchAll(/#[0-9a-fA-F]{6}/gu)]
    .map(([color]) => color)
    .filter((color) => hue(color) >= 250 && hue(color) <= 320);
  expect(purple).toEqual([]);
});
