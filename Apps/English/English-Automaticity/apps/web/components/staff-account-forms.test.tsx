import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { StaffOwnerSetup } from "./staff-owner-setup";
import { StaffAccountForm } from "./staff-accounts";

test("owner chooses email and a confirmed password inside native-language setup", () => {
  for (const language of ["en", "de"] as const) {
    const html = renderToStaticMarkup(<StaffOwnerSetup language={language} />);
    expect(html).toContain('type="email"');
    expect(html).toContain('name="setupKey"');
    expect(html.match(/autoComplete="new-password"/gu)?.length).toBe(2);
    expect(html).toContain('dir="ltr"');
    expect(html).not.toMatch(/[\u0600-\u06ff]/u);
    expect(html).toContain(language === "en" ? "Create owner account" : "Eigentümerkonto erstellen");
  }
});

test("account editor requires owner reauthentication and never preselects user email", () => {
  const html = renderToStaticMarkup(<StaffAccountForm language="en" accounts={[]} onSaved={() => {}} />);
  expect(html).toContain('name="currentPassword"');
  expect(html).toContain('type="email"');
  expect(html).toContain('value=""');
  expect(html).toContain("Create account");
  expect(html).not.toContain("@example");
});
