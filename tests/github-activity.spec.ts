import { test, expect } from "@playwright/test";
import {
  parseContributions,
  getGitHubActivity,
  getCanonicalActivity,
} from "../src/lib/github-activity";
import snapshot from "../src/data/github-activity.json";

function fixture() {
  return snapshot.days
    .map(
      (day, i) =>
        `<td data-level="${day.level}" id="day-${i}" data-date="${day.date}"></td><tool-tip for="day-${i}">${day.count || "No"} contributions on some date.</tool-tip>`,
    )
    .reverse()
    .join("");
}

test("contribution parser preserves dates and counts regardless of HTML order", () => {
  const data = parseContributions(fixture());
  expect(data.days).toEqual(snapshot.days);
  expect(data.total).toBe(snapshot.total);
});

test("incomplete calendars and missing counts are rejected instead of inventing zeroes", () => {
  expect(() => parseContributions("<html>Rate limited</html>")).toThrow();
  expect(() =>
    parseContributions(fixture().replace('for="day-0"', 'for="unknown"')),
  ).toThrow();
});

test("verified GitHub snapshot preserves the official total and calendar range", async () => {
  const result = await getGitHubActivity();
  expect(result.fallback).toBe(true);
  expect(result.data.total).toBe(1438);
  expect(result.data.days).toHaveLength(365);
  expect(result.data.days[0].date).toBe("2025-09-14");
  expect(result.data.days.at(-1)?.date).toBe("2026-09-13");
});

test("canonical activity keeps counts and GitHub intensity levels aligned", () => {
  const data = getCanonicalActivity();
  expect(data.days.find((day) => day.date === "2026-07-08")).toMatchObject({
    count: 50,
    level: 4,
  });
  expect(data.days.every((day) => day.level >= 0 && day.level <= 4)).toBe(true);
});

test("calendar and local stack icons render alongside project summaries", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "GitHub Contributions" }),
  ).toBeVisible();
  await expect(page.getByText("1.438 kontribusi dalam setahun")).toBeVisible();
  const dayCount = await page.locator(".contribution-chart rect").count();
  expect(dayCount).toBeGreaterThanOrEqual(350);
  expect(dayCount).toBeLessThanOrEqual(378);
  await expect(page.locator(".github-heading a")).toHaveAttribute(
    "href",
    "https://github.com/zakianmaulana01",
  );
  await expect(page.locator(".contribution-level-4").first()).toHaveCSS(
    "fill",
    "rgb(33, 110, 57)",
  );
  await page.locator(".folio-tools").scrollIntoViewIfNeeded();
  const icons = page.locator(".folio-tool-card:nth-child(-n + 8) img");
  expect(await icons.count()).toBe(8);
  for (const icon of await icons.all())
    await expect
      .poll(() =>
        icon.evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
      )
      .toBe(true);
  await expect(page.locator(".project-card-description")).toHaveCount(8);
  await expect(page.locator(".folio-tool-card")).toHaveCount(11);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(".github-activity").scrollIntoViewIfNeeded();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("tool deck stays still until hover and GitHub cells blink with motion enabled", async ({
  page,
}) => {
  await page.goto("/");
  const firstTool = page.locator(".folio-tool-card").first();
  await expect(firstTool).toHaveCSS("animation-name", "none");
  await expect(page.locator(".folio-tool-card i")).toHaveCount(0);
  const restingTransform = await firstTool.evaluate(
    (card) => getComputedStyle(card).transform,
  );
  await page.locator(".folio-tool-deck").hover();
  await expect
    .poll(() => firstTool.evaluate((card) => getComputedStyle(card).transform))
    .not.toBe(restingTransform);
  await expect(page.locator(".contribution-spark").first()).toHaveCSS(
    "animation-name",
    "contribution-blink",
  );
  await page.getByRole("button", { name: "Animasi aktif" }).click();
  await expect(page.locator(".contribution-spark").first()).toHaveCSS(
    "animation-name",
    "none",
  );
});
