import { expect, test } from "@playwright/test";

test("3D sculpture loads, rotates, and follows motion preferences", async ({
  page,
}) => {
  await page.goto("/");
  const canvas = page.locator(".sculpture-canvas canvas");
  await expect(canvas).toBeVisible();
  await expect(canvas).toHaveAttribute("data-motion", "running");
  const before = await canvas.screenshot();
  await page.getByRole("button", { name: "Putar objek 3D ke kanan" }).focus();
  await page.keyboard.press("Enter");
  const after = await canvas.screenshot();
  expect(Buffer.compare(before, after)).not.toBe(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(canvas).toHaveAttribute("data-motion", "paused");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(canvas).toHaveAttribute("data-motion", "running");
  await page.evaluate(() => {
    document.documentElement.dataset.motion = "off";
  });
  await expect(canvas).toHaveAttribute("data-motion", "paused");
});

test("hero remains readable when WebGL is unavailable", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      ...args: Parameters<typeof original>
    ) {
      if (args[0] === "webgl2") return null;
      return Reflect.apply(original, this, args);
    } as typeof original;
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Zakian");
  await expect(page.locator(".sculpture-fallback")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Kenali saya lewat CV" }),
  ).toHaveAttribute("href", "/resume");
  await page.getByRole("button", { name: "Sistem campaign" }).click();
  await expect(page.locator("#intro-field-detail")).toContainText("Telkomsel");
});
