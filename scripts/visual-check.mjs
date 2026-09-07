import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
await mkdir("artifacts", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
  reducedMotion: "reduce",
  colorScheme: "light",
});
await page.goto(process.env.PREVIEW_URL || "http://127.0.0.1:3001", {
  waitUntil: "networkidle",
});
await page.screenshot({ path: "artifacts/desktop-light.png", fullPage: true });
await page.screenshot({ path: "artifacts/hero-light.png" });
await page.setViewportSize({ width: 390, height: 844 });
await page.screenshot({ path: "artifacts/mobile-light.png", fullPage: true });
await page.screenshot({ path: "artifacts/mobile-hero.png" });
await browser.close();
console.log("Saved desktop and mobile screenshots in artifacts/.");
