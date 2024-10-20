import { test, expect } from "@playwright/test";

test("homepage loads", async ({ page }, testInfo) => {
  // Go to the home page
  await page.goto("/");

  // Check that the main heading is present
  await expect(page.locator("h1")).toContainText("Home");

  // Wait 3 seconds for the page to load
  await page.waitForTimeout(1000);

  // Take a screenshot of the page and attach it to the test report
  const screenshot = await page.screenshot();
  await testInfo.attach("homepage-screenshot", {
    body: screenshot,
    contentType: "image/png",
  });
});
