import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("project filters, details, source links, and keyboard dismissal", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Zakian");
  await page.getByRole("button", { name: "Full stack", exact: true }).click();
  await expect(page.locator(".project-button")).toHaveCount(1);
  const card = page.getByRole("button", {
    name: "Lihat detail proyek Laravel Multiuser Chat",
  });
  await card.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("link", { name: "Jelajahi kode" }),
  ).toHaveAttribute(
    "href",
    "https://github.com/zakianmaulana01/LARAVEL-CHAT-MULTIUSER",
  );
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(card).toBeFocused();
  await page.getByRole("button", { name: "Frontend", exact: true }).click();
  await expect(page.locator(".project-button")).toHaveCount(2);
  await page.getByRole("button", { name: "Semua" }).click();
  await expect(page.locator(".project-button")).toHaveCount(3);
  expect(errors).toEqual([]);
});

test("light theme remains fixed and motion preference respects the system", async ({
  page,
}) => {
  await page.emulateMedia({
    colorScheme: "dark",
    reducedMotion: "no-preference",
  });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Animasi aktif" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "off");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "off");
  await page.getByRole("button", { name: "Animasi dijeda" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "on");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).toHaveAttribute("data-motion", "off");
});

test("mobile navigation and narrow layouts", async ({ page }) => {
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Buka menu" }).click();
  await expect(
    page.getByRole("navigation", { name: "Navigasi mobile" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Buka menu" })).toBeFocused();
  await page.getByRole("button", { name: "Buka menu" }).click();
  await page
    .getByRole("navigation", { name: "Navigasi mobile" })
    .getByRole("link", { name: "Tentang" })
    .click();
  await expect(page).toHaveURL(/#about$/);
  await expect(
    page.getByRole("navigation", { name: "Navigasi mobile" }),
  ).toHaveCount(0);
  await page
    .getByRole("button", { name: "Lihat detail proyek BAYARO POS" })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  expect(
    await page
      .getByRole("dialog")
      .evaluate((el) => el.scrollWidth <= el.clientWidth),
  ).toBe(true);
  await page.getByRole("button", { name: "Tutup detail proyek" }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

test("copy email succeeds and reports a usable fallback on denial", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.getByRole("button", { name: "Salin alamat email" }).click();
  await expect(page.getByRole("status")).toHaveText(
    "Alamat email berhasil disalin.",
  );
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "zakianmaulana2001@gmail.com",
  );
  await page.evaluate(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: () => Promise.reject(new Error("denied")) },
      configurable: true,
    });
  });
  await page.getByRole("button", { name: "Salin alamat email" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Silakan pilih lalu salin",
  );
  await expect(
    page.getByRole("link", { name: "zakianmaulana2001@gmail.com" }).last(),
  ).toHaveAttribute("href", "mailto:zakianmaulana2001@gmail.com");
});

for (const theme of ["light", "dark"] as const) {
  test(`accessible content and dialogs with ${theme} system preference`, async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
    await page.goto("/");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
    await page
      .getByRole("button", { name: "Lihat detail proyek Industrial SCADA" })
      .click();
    const dialog = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(dialog.violations).toEqual([]);
  });
}

test("content stays readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "BAYARO POS", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "zakianmaulana2001@gmail.com" }).last(),
  ).toBeVisible();
  await context.close();
});
