import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("additional experience and original recognition documents are available", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".folio-career")).toContainText(
    "IT Implementor · Kontrak",
  );
  await expect(page.locator(".folio-career")).toContainText(
    "Feb 2020 – Des 2021",
  );
  await expect(page.locator(".folio-career")).toContainText(
    "Customer Care · Magang",
  );
  const opener = page.getByRole("button", {
    name: "Lihat dokumen Kejutan Performa",
    exact: true,
  });
  await opener.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("img", { name: "Kejutan Performa", exact: true }),
  ).toBeVisible();
  expect(
    await dialog
      .getByRole("img")
      .evaluate(
        (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
      ),
  ).toBe(true);
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(opener).toBeFocused();
  await page
    .getByRole("button", {
      name: "Lihat dokumen Quality Control Circle 2023",
      exact: true,
    })
    .click();
  await expect(page.getByRole("dialog")).toContainText("Dokumentasi kegiatan");
  await page.getByRole("button", { name: "Tutup dokumen penghargaan" }).click();
  await page.goto("/resume");
  await expect(
    page.getByRole("heading", { name: "Penghargaan", exact: true }),
  ).toBeVisible();
  await expect(page.locator("main")).toContainText("IT Implementor");
});
