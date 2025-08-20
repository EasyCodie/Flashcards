import { defineConfig } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export default defineConfig({
  testDir: "tests/ui",
  timeout: 30_000,
  fullyParallel: true,
  use: {
    headless: true,
    baseURL: BASE_URL, // allows page.goto("/") to resolve
    viewport: { width: 1200, height: 800 },
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run dev",
    url: BASE_URL,
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
});
