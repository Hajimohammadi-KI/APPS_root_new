import { expect, test } from "@playwright/test";

test("current home and active daily route show one truthful learner state", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Good (morning|afternoon|evening), Learner/ })).toBeVisible();
  await expect(page.getByText("Your chart will begin after your first saved practice.")).toBeVisible();
  await expect(page.getByText("Local app service ready")).toBeVisible();

  await page.goto("/daily");
  await expect(page.getByRole("heading", { name: "Today's 15-minute learning mission" })).toBeVisible();
  await expect(page.getByText("Verb be: am/is/are · A1")).toBeVisible();
  await expect(page.getByText("0 of 7 activities complete")).toBeVisible();
  await expect(page.getByText("0% verified mastery")).toBeVisible();
  await expect(page.getByText("Local app service ready")).toBeVisible();
});

test("phase-three cards keep their status and CTA inside a narrow desktop layout", async ({
  page,
}) => {
  // The fixed sidebar reduces usable content width long before a browser is
  // mobile-sized. This catches status badges and practice buttons escaping
  // cards 5–7 when the desktop window is narrowed.
  await page.setViewportSize({ width: 1366, height: 900 });
  await page.goto("/daily");

  const escapedControls = await page.locator(".cards.three .activity").evaluateAll(
    (cards) =>
      cards.flatMap((card) => {
        const cardBox = card.getBoundingClientRect();
        return [...card.querySelectorAll(".tag, .open")].flatMap((control) => {
          const controlBox = control.getBoundingClientRect();
          return controlBox.left < cardBox.left - 0.5 ||
            controlBox.right > cardBox.right + 0.5 ||
            controlBox.bottom > cardBox.bottom + 0.5
            ? [control.textContent?.trim() ?? "unnamed control"]
            : [];
        });
      }),
  );

  expect(escapedControls).toEqual([]);
});
