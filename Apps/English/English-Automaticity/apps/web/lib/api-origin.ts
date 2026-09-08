/** Migrate only the old bundled defaults; retain a learner's custom API. */
export function normalizeApiOrigin(value: unknown, fallback = ""): string {
  const origin = typeof value === "string" ? value.trim().replace(/\/+$/, "") : fallback;
  if (["http://localhost:4201", "http://127.0.0.1:4201"].includes(origin)) return fallback;
  return origin;
}
