import { expect, test } from "@playwright/test";

test("Startseite und aktiver Tagesweg zeigen denselben ehrlichen Lernstand", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Willkommen" })).toBeVisible();
  await expect(
    page.getByText(
      "Nach deiner ersten gespeicherten Übung beginnt hier dein echtes Diagramm.",
    ),
  ).toBeVisible();

  await page.goto("/heute");
  await expect(
    page.getByRole("heading", { name: "Deine heutige 15-Minuten-Lernmission" }),
  ).toBeVisible();
  await expect(page.getByText("sein: bin/ist/sind · A1")).toBeVisible();
  await expect(page.getByText("0 von 7 Aktivitäten erledigt")).toBeVisible();
  await expect(page.getByText("0% geprüfte Beherrschung")).toBeVisible();
  await expect(page.getByText("Lokaler App-Dienst bereit")).toBeVisible();
});

test("Phase drei hält Status und Öffnen-Aktion im schmalen Desktop-Kartenrahmen", async ({
  page,
}) => {
  // The sidebar narrows the usable desktop space before mobile media queries
  // apply. Catch escaped German status labels and CTA controls in cards 5–7.
  await page.setViewportSize({ width: 1366, height: 900 });
  await page.goto("/heute");

  const escapedControls = await page.locator(".cards.three .activity").evaluateAll(
    (cards) =>
      cards.flatMap((card) => {
        const cardBox = card.getBoundingClientRect();
        return [...card.querySelectorAll(".tag, .open")].flatMap((control) => {
          const controlBox = control.getBoundingClientRect();
          return controlBox.left < cardBox.left - 0.5 ||
            controlBox.right > cardBox.right + 0.5 ||
            controlBox.bottom > cardBox.bottom + 0.5
            ? [control.textContent?.trim() ?? "unbenanntes Steuerelement"]
            : [];
        });
      }),
  );

  expect(escapedControls).toEqual([]);
});

test("Navigationsüberschriften falten nur ihre eigene Linkgruppe", async ({ page }) => {
  await page.goto("/heute");
  const heading = page.getByRole("button", { name: /Grammatik und Deutsch lernen/ });
  const linkedItem = page.getByRole("button", { name: "Grammatik-Labor" });

  await expect(heading).toHaveAttribute("aria-expanded", "true");
  await heading.click();
  await expect(heading).toHaveAttribute("aria-expanded", "false");
  await expect(linkedItem).toBeHidden();
  await heading.click();
  await expect(linkedItem).toBeVisible();
});
