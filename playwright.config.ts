import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  workers: 2,
  retries: 2,
  reporter: "html",
  use: {
    baseURL: "http://localhost:5173/myteam",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "yarn dev",
    port: 5173,
    reuseExistingServer: !process.env.CI,
  },
});
