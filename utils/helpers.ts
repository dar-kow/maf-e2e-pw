import { Page, Locator } from "playwright";

export type LocatorState = "attached" | "detached" | "visible" | "hidden";

export class Helpers {
  static async waitForState(locator: Locator, state: LocatorState, timeout: number = 5000, all: boolean = false) {
    if (all) {
      const count = await locator.count();
      for (let i = 0; i < count; i++) {
        const element = locator.nth(i);
        try {
          await element.waitFor({ state, timeout });
        } catch (error) {
          throw new Error(`Element at index ${i} with selector "${locator}" did not reach state "${state}" within ${timeout}ms.`);
        }
      }
    } else {
      try {
        await locator.first().waitFor({ state, timeout });
      } catch (error) {
        throw new Error(`Element with selector "${locator}" did not reach state "${state}" within ${timeout}ms.`);
      }
    }
  }

  static async waitForUrlContains(page: Page, expected: string, timeout: number = 5000) {
    try {
      await page.waitForURL(`**/*${expected}*`, { timeout });
      return true;
    } catch {
      return false;
    }
  }

  static async waitForGridUpdate(page: Page, timeout: number = 5000) {
    const loadingOverlay = page.locator(".MuiDataGrid-loadingOverlay");
    const overlayCount = await loadingOverlay.count();

    if (overlayCount > 0) {
      await this.waitForState(loadingOverlay, "hidden", timeout);
    }

    const grid = page.locator(".MuiDataGrid-virtualScroller");
    await this.waitForState(grid, "visible", timeout);

    const rows = page.locator(".MuiDataGrid-row");
    const noRowsOverlay = page.locator(".MuiDataGrid-overlay");

    await Promise.race([
      this.waitForState(rows.first(), "visible", timeout).catch(() => {}),
      this.waitForState(noRowsOverlay, "visible", timeout).catch(() => {}),
    ]);
  }

  static async waitForModalOpen(page: Page, selector: string, timeout: number = 5000) {
    const modal = page.locator(selector);
    await this.waitForState(modal, "visible", timeout);

    // const backdrop = page.locator(".MuiBackdrop-root");
    // const backdropCount = await backdrop.count();

    // if (backdropCount > 0) {
    //   await this.waitForState(backdrop, "visible", timeout);
    // }
  }

  static async waitForModalClose(page: Page, selector: string, timeout: number = 5000) {
    const modal = page.locator(selector);
    await this.waitForState(modal, "hidden", timeout);
  }

  static async waitForElementAttached(page: Page, selector: string, timeout: number = 5000) {
    const element = page.locator(selector);
    await this.waitForState(element, "attached", timeout);
  }

  static async waitForElementDetached(page: Page, selector: string, timeout: number = 5000) {
    const element = page.locator(selector);
    await this.waitForState(element, "detached", timeout);
  }

  static async waitForElementVisible(page: Page, selector: string, timeout: number = 5000) {
    const element = page.locator(selector);
    await this.waitForState(element, "visible", timeout);
  }

  static async waitForElementHidden(page: Page, selector: string, timeout: number = 5000) {
    const element = page.locator(selector);
    await this.waitForState(element, "hidden", timeout);
  }

  static async waitForTooltip(page: Page, timeout: number = 2000) {
    const tooltip = page.locator(".MuiTooltip-popper");
    await this.waitForState(tooltip, "visible", timeout);
  }

  static async waitForMultipleElements(page: Page, selectors: string[], state: LocatorState, timeout: number = 5000) {
    const promises = selectors.map((selector) => {
      const element = page.locator(selector);
      return this.waitForState(element, state, timeout);
    });

    await Promise.all(promises);
  }

  static async waitForLoadingComplete(page: Page, timeout: number = 5000) {
    const loadingSelectors = [
      ".MuiCircularProgress-root",
      ".MuiLinearProgress-root",
      ".MuiSkeleton-root",
      ".loading-indicator",
      '[data-testid="loading"]',
    ];

    for (const selector of loadingSelectors) {
      const loader = page.locator(selector);
      const count = await loader.count();

      if (count > 0) {
        await this.waitForState(loader, "hidden", timeout).catch(() => {});
      }
    }
  }

  static async waitForPageLoad(page: Page, timeout: number = 10000) {
    await page.waitForLoadState("load", { timeout });

    await this.waitForLoadingComplete(page, timeout);
  }

  static async waitForAnimation(page: Page, selector: string, timeout: number = 1000) {
    const element = page.locator(selector);
    await this.waitForState(element, "visible", timeout);

    await page.waitForTimeout(300);
  }

  static async isElementInViewport(page: Page, selector: string): Promise<boolean> {
    const element = page.locator(selector);
    const count = await element.count();

    if (count === 0) {
      return false;
    }

    const isVisible = await element.isVisible();
    if (!isVisible) return false;

    const boundingBox = await element.boundingBox();
    if (!boundingBox) return false;

    const viewportSize = page.viewportSize();
    if (!viewportSize) return false;

    return (
      boundingBox.y >= 0 &&
      boundingBox.x >= 0 &&
      boundingBox.y + boundingBox.height <= viewportSize.height &&
      boundingBox.x + boundingBox.width <= viewportSize.width
    );
  }

  static async scrollIntoView(page: Page, selector: string, timeout: number = 5000): Promise<void> {
    const element = page.locator(selector);

    await this.waitForState(element, "attached", timeout);

    await element.scrollIntoViewIfNeeded();

    await page.waitForTimeout(300);

    await this.waitForState(element, "visible", timeout);
  }

  static async scrollHorizontally(
    page: Page,
    containerSelector: string,
    direction: "left" | "right",
    timeout: number = 5000
  ): Promise<void> {
    const container = page.locator(containerSelector);

    await container.evaluate((element, dir) => {
      if (dir === "right") {
        element.scrollLeft = element.scrollWidth;
      } else {
        element.scrollLeft = 0;
      }
    }, direction);

    await page.waitForTimeout(300);
  }
}
