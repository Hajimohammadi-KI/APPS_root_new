import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import {
  StaffAccessProvider,
  StaffPortal,
  StaffRouteGuard,
} from "./staff-access";
import { StaffMethodNotes } from "./staff-method-notes";

for (const language of ["en", "de"] as const) {
  test(`${language}: staff login uses the app language, email and left-to-right layout`, () => {
    const html = renderToStaticMarkup(<StaffPortal language={language} />);
    expect(html).toContain(`lang="${language}"`);
    expect(html).toContain('dir="ltr"');
    expect(html).toContain(
      language === "en"
        ? "Teacher and developer workspace"
        : "Bereich für Lehrkräfte und Entwicklung",
    );
    expect(html).toContain('type="email"');
    expect(html).toMatch(/autoComplete="username"/iu);
    expect(html).not.toContain("<select");
    expect(html).not.toMatch(/[\u0600-\u06ff]/u);
  });

  test(`${language}: access guard follows the provider language`, () => {
    const html = renderToStaticMarkup(
      <StaffAccessProvider language={language}>
        <StaffRouteGuard>
          <p>Private</p>
        </StaffRouteGuard>
      </StaffAccessProvider>,
    );
    expect(html).toContain(`lang="${language}"`);
    expect(html).toContain('dir="ltr"');
    expect(html).not.toMatch(/[\u0600-\u06ff]/u);
  });

  test(`${language}: professional method notes use the app language`, () => {
    const html = renderToStaticMarkup(<StaffMethodNotes language={language} />);
    expect(html).toContain(`lang="${language}"`);
    expect(html).toContain(
      language === "en"
        ? "Assessment method and exercise sources"
        : "Bewertungsmethode und Herkunft der Übungen",
    );
    expect(html).not.toMatch(/[\u0600-\u06ff]/u);
  });
}
