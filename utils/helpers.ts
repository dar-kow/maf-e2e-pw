import { Page } from "playwright-core";

export class Helpers {
  /**
   * Waits until the current URL contains the expected substring.
   * Returns boolean
   */
  static async waitForUrlContains(page: Page, expected: string, timeout: number = 5000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      const url = page.url();
      if (url.includes(expected)) {
        return true;
      }
      await page.waitForTimeout(100);
    }
    return false;
  }
}
