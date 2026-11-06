import { afterEach, expect, test } from "bun:test";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { mountEvidenceOverview } from "./overview";
import { mountDailyNotebook } from "./daily-notebook";
import { notebookCopy } from "./notebook-practice";
import { notebookCardLines } from "./practice";
import { initializeStaffWorkspace } from "./staff-interface";

class ElementStub {
  children: (ElementStub | string)[] = [];
  private ownText = "";
  dataset: Record<string, string> = {};
  style = { cssText: "" };
  hidden = false;
  className = "";
  href = "";
  constructor(readonly tag: string) {}
  get textContent(): string {
    return (
      this.ownText +
      this.children
        .map((child) => (typeof child === "string" ? child : child.textContent))
        .join(" ")
    );
  }
  set textContent(value: string) {
    this.ownText = value;
    this.children = [];
  }
  append(...children: (ElementStub | string)[]) {
    this.children.push(...children);
  }
  replaceChildren(...children: (ElementStub | string)[]) {
    this.ownText = "";
    this.children = children;
  }
  setAttribute() {}
}

function workspaceRoot() {
  let directory = import.meta.dir;
  while (!existsSync(join(directory, "docs/language-apps-roadmap.json"))) {
    const parent = dirname(directory);
    if (parent === directory) throw new Error("Workspace root missing");
    directory = parent;
  }
  return directory;
}
const pack = JSON.parse(
  readFileSync(
    join(
      workspaceRoot(),
      "Apps/Deutsch/Deutsch-Automaticity/apps/web/public/learning-core/curriculum-de.json",
    ),
    "utf8",
  ),
);
const originals = new Map<string, PropertyDescriptor | undefined>();
const disposers: (() => void)[] = [];
function put(key: string, value: unknown) {
  if (!originals.has(key))
    originals.set(key, Object.getOwnPropertyDescriptor(globalThis, key));
  Object.defineProperty(globalThis, key, {
    configurable: true,
    writable: true,
    value,
  });
}
function browser(pathname: string, staff = false) {
  const summary = new ElementStub("section");
  put("document", {
    createElement: (tag: string) => new ElementStub(tag),
    querySelector: () => summary,
  });
  put("window", { addEventListener() {}, removeEventListener() {} });
  put("location", { pathname, search: "" });
  put("localStorage", { length: 0, key: () => null, getItem: () => null });
  put(
    "MutationObserver",
    class {
      observe() {}
      disconnect() {}
    },
  );
  put(
    "fetch",
    async (url: string) =>
      new Response(
        JSON.stringify(
          url === "/api/staff-session"
            ? { role: staff ? "developer" : null }
            : pack,
        ),
        { status: 200 },
      ),
  );
  return summary;
}
afterEach(async () => {
  for (const dispose of disposers.splice(0)) dispose();
  put("location", { pathname: "/", search: "" });
  await initializeStaffWorkspace();
  for (const [key, descriptor] of originals) {
    if (descriptor) Object.defineProperty(globalThis, key, descriptor);
    else Reflect.deleteProperty(globalThis, key);
  }
  originals.clear();
});

test("learner progress shows next actions without technical skill evidence methodology", async () => {
  const summary = browser("/fortschritt");
  const root = new ElementStub("section");
  disposers.push(mountEvidenceOverview(root as unknown as HTMLElement, "de"));
  await Bun.sleep(0);
  expect(root.textContent).toContain("Übung fortsetzen");
  expect(root.textContent).not.toContain("Nachweise nach Fertigkeit");
  expect(root.textContent).not.toContain(
    "Übung, Genauigkeit, Transfer und Zeit",
  );
  expect(summary.textContent).toContain("gespeicherte Antworten");
  expect(summary.textContent).not.toContain("Selbstständige Genauigkeit");
});

for (const language of ["en", "de"] as const)
  test(`${language}: daily learner notebook keeps the next exercise without progress counters`, async () => {
    browser(language === "de" ? "/heute" : "/today");
    const root = new ElementStub("section");
    root.dataset.level = "A1";
    disposers.push(mountDailyNotebook(root as unknown as HTMLElement, language));
    await Bun.sleep(0);
    expect(root.textContent).not.toMatch(/\d+ (?:von|of) \d+/u);
    expect(root.textContent).not.toContain("Today:");
    expect(root.textContent).not.toContain("Heute:");
    expect(root.textContent).toContain(
      language === "de" ? "Nächste Übung machen" : "Practise the next exercise",
    );
    expect(root.textContent).not.toContain(notebookCopy(language).source);
  });

test("professional workspace retains detailed evidence and notebook metadata", async () => {
  browser("/staff/progress", true);
  const root = new ElementStub("section");
  disposers.push(mountEvidenceOverview(root as unknown as HTMLElement, "de"));
  await Bun.sleep(0);
  expect(root.textContent).toContain("Nachweise nach Fertigkeit");
  expect(root.textContent).toContain("Übung, Genauigkeit, Transfer und Zeit");
  const notebook = new ElementStub("section");
  notebook.dataset.level = "A1";
  disposers.push(mountDailyNotebook(notebook as unknown as HTMLElement, "de"));
  await Bun.sleep(0);
  expect(notebook.textContent).toContain(notebookCopy("de").source);
  expect(notebook.textContent).toContain("auf A1 bestanden");
  expect(notebook.textContent).toContain("Heute:");
  const links = root.children.filter(
    (child) => child instanceof ElementStub && child.tag === "a",
  ) as ElementStub[];
  expect(links.length).toBeGreaterThan(0);
  expect(links.every((link) => link.href.startsWith("/staff/practice"))).toBe(
    true,
  );
});

test("practice notebook card hides counters from learners; staff receives preserved counts and metadata", () => {
  for (const language of ["en", "de"] as const) {
    const copy = notebookCopy(language);
    const counts = { passed: 1, total: 3 };
    expect(notebookCardLines(language, "A1", counts, counts)).toEqual([]);
    expect(notebookCardLines(language, "A1", counts, counts, true)).toEqual([
      copy.progress("A1", counts, counts),
      copy.source,
      copy.progressBasis,
    ]);
    expect(counts).toEqual({ passed: 1, total: 3 });
  }
});
