import { test, expect, Page } from "@playwright/test";
import { Actions, SidebarDestination } from "./actions";
import { Data } from "./data";
import { URLs } from "../../utils";

test.describe.only("Navbar Header Title", () => {
  let page: Page;
  let navbarActions: Actions;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    navbarActions = new Actions(page);
    await navbarActions.navigateToApp();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test("TC-NB-001: should display 'Dashboard' title when navigating to Dashboard", async () => {
    // Arrange - Navigate to Dashboard via sidebar
    await navbarActions.navigateViaSidebar(SidebarDestination.Dashboard);

    // Act - Get current navbar title
    const navbarTitle = await navbarActions.getNavbarTitle();
    const currentUrl = await navbarActions.getCurrentUrl();

    // Assert - Verify title and URL
    expect(navbarTitle).toBe(Data.titles.dashboard);
    expect(currentUrl).toContain(URLs.dashboard);
  });

  test("TC-NB-002: should display 'Faktury' title when navigating to Invoices", async () => {
    // Arrange - Navigate to Invoices via sidebar
    await navbarActions.navigateViaSidebar(SidebarDestination.Invoices);

    // Act - Get current navbar title
    const navbarTitle = await navbarActions.getNavbarTitle();
    const currentUrl = await navbarActions.getCurrentUrl();

    // Assert - Verify title and URL
    expect(navbarTitle).toBe(Data.titles.invoices);
    expect(currentUrl).toContain(URLs.invoices);
  });

  test("TC-NB-003: should display 'Kontrahenci' title when navigating to Contractors", async () => {
    // Arrange - Navigate to Contractors via sidebar
    await navbarActions.navigateViaSidebar(SidebarDestination.Contractors);

    // Act - Get current navbar title
    const navbarTitle = await navbarActions.getNavbarTitle();
    const currentUrl = await navbarActions.getCurrentUrl();

    // Assert - Verify title and URL
    expect(navbarTitle).toBe(Data.titles.contractors);
    expect(currentUrl).toContain(URLs.contractors);
  });
});
