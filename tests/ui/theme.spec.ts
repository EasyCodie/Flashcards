import { test, expect } from "@playwright/test";

const base = process.env.BASE_URL || "http://localhost:3000"; // fallback if config not picked up

test("header uses dark surface and editor exists", async ({ page }) => {
  await page.goto(new URL("/", base).toString());
  const header = page.locator("header.site-header");
  await expect(header).toBeVisible();

  const bg = await header.evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(bg.replace(/\s+/g, "")).toContain("rgb(23,30,63)"); // --surface-2

  await page.goto(new URL("/decks", base).toString());
  const editor = page.locator('[data-testid="deck-editor"]');
  await expect(editor).toBeVisible();

  const editorBg = await editor.evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(editorBg.replace(/\s+/g, "")).toContain("rgb(18,23,51)"); // --surface-1
});
