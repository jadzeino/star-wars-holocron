import { test as base, expect } from "@playwright/test";
import * as swapiMockModule from "./e2e/mocks/swapi-data.ts";

/* find a valid function export from swapi-data.ts  either as export function or export default */
const handleSwapiRoute =
  typeof swapiMockModule.handleSwapiRoute === "function"
    ? swapiMockModule.handleSwapiRoute
    : typeof swapiMockModule.default === "function"
      ? swapiMockModule.default
      : null;

/**
 * Custom Playwright fixture that intercepts all swapi.py4e.com requests
 * and returns deterministic mock data.
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    if (!handleSwapiRoute) {
      throw new Error("SWAPI mock handler export not found.");
    }

    // Intercepts network requests
    await page.route("**/swapi.py4e.com/api/**", async (route) => {
      const url = new URL(route.request().url());
      const mock = handleSwapiRoute(url);
      if (mock) {
        await route.fulfill({
          status: mock.status,
          contentType: mock.contentType,
          body: mock.body,
        });
      } else {
        // the real request go through instead
        await route.fallback();
      }
    });

    // Pass the modified page to the test
    await use(page);
  },
});

export { expect };
