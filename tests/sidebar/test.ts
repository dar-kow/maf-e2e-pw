import { test, expect, Page } from "@playwright/test";
import { SidebarActions } from "./actions";
import { SidebarData } from "./data";
import { SidebarComponents } from "./components";

test.describe("Sidebar Navigation", () => {
  let page: Page;
  let sidebarActions: SidebarActions;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    sidebarActions = new SidebarActions(page);
    await sidebarActions.navigateToApp();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test("TC-SB-001: should navigate to the correct pages when clicking menu items", async () => {
    // Arrange - navigation already setup in beforeEach

    await test.step("Navigate to Invoices page", async () => {
      // Act
      await sidebarActions.clickMenuItem("invoices");

      // Assert
      const invoicesUrl = await sidebarActions.getCurrentUrl();
      expect(invoicesUrl).toContain(SidebarData.urls.invoices);
      expect(await sidebarActions.isMenuItemActive("invoices")).toBeTruthy();
    });

    await test.step("Navigate to Contractors page", async () => {
      // Act
      await sidebarActions.clickMenuItem("contractors");

      // Assert
      const contractorsUrl = await sidebarActions.getCurrentUrl();
      expect(contractorsUrl).toContain(SidebarData.urls.contractors);
      expect(await sidebarActions.isMenuItemActive("contractors")).toBeTruthy();
    });

    await test.step("Navigate to Dashboard page", async () => {
      // Act
      await sidebarActions.clickMenuItem("dashboard");

      // Assert
      const dashboardUrl = await sidebarActions.getCurrentUrl();
      expect(dashboardUrl).toContain(SidebarData.urls.dashboard);
      expect(await sidebarActions.isMenuItemActive("dashboard")).toBeTruthy();
    });
  });

  test("TC-SB-002: should show tooltips when sidebar is collapsed", async () => {
    await test.step("Arrange - ensure sidebar is collapsed", async () => {
      // Arrange
      const isCollapsed = await sidebarActions.isSidebarCollapsed();
      if (!isCollapsed) {
        await sidebarActions.toggleSidebar();
        await page.waitForTimeout(400);
      }

      // Assert
      expect(await sidebarActions.isSidebarCollapsed()).toBeTruthy();
    });

    await test.step("Verify Dashboard tooltip", async () => {
      // Act
      await sidebarActions.hoverMenuItem("dashboard");

      // Assert
      await expect(page.getByText(SidebarData.tooltips.dashboard, { exact: true })).toBeVisible();
    });

    await test.step("Verify Invoices tooltip", async () => {
      // Act
      await sidebarActions.hoverMenuItem("invoices");

      // Assert
      await expect(page.getByText(SidebarData.tooltips.invoices, { exact: true })).toBeVisible();
    });

    await test.step("Verify Contractors tooltip", async () => {
      // Act
      await sidebarActions.hoverMenuItem("contractors");

      // Assert
      await expect(page.getByText(SidebarData.tooltips.contractors, { exact: true })).toBeVisible();
    });
  });

  test("TC-SB-003: should collapse and expand sidebar correctly", async () => {
    // Arrange - Ensure sidebar is expanded initially
    const initialState = await sidebarActions.isSidebarCollapsed();
    if (initialState) {
      await sidebarActions.toggleSidebar();
      await page.waitForTimeout(400);
    }

    // Assert - Expanded state verification
    expect(await sidebarActions.isSidebarCollapsed()).toBeFalsy();
    expect(await sidebarActions.areTitlesVisible()).toBeTruthy();
    expect(await sidebarActions.isMenuTextVisible("dashboard")).toBeTruthy();
    expect(await sidebarActions.isMenuTextVisible("invoices")).toBeTruthy();
    expect(await sidebarActions.isMenuTextVisible("contractors")).toBeTruthy();

    // Act - Collapse sidebar
    await sidebarActions.toggleSidebar();
    await page.waitForTimeout(400);

    // Assert - Collapsed state verification
    expect(await sidebarActions.isSidebarCollapsed()).toBeTruthy();
    expect(await sidebarActions.areTitlesVisible()).toBeFalsy();
    expect(await sidebarActions.isMenuTextVisible("dashboard")).toBeFalsy();
    expect(await sidebarActions.isMenuTextVisible("invoices")).toBeFalsy();
    expect(await sidebarActions.isMenuTextVisible("contractors")).toBeFalsy();
    expect(await sidebarActions.isLogoIconVisible()).toBeTruthy();

    // Act - Expand sidebar again
    await sidebarActions.toggleSidebar();
    await page.waitForTimeout(400);

    // Assert - Expanded state verification again
    expect(await sidebarActions.isSidebarCollapsed()).toBeFalsy();
    expect(await sidebarActions.areTitlesVisible()).toBeTruthy();
    expect(await sidebarActions.isMenuTextVisible("dashboard")).toBeTruthy();
    expect(await sidebarActions.isMenuTextVisible("invoices")).toBeTruthy();
    expect(await sidebarActions.isMenuTextVisible("contractors")).toBeTruthy();
  });

  test("TC-SB-005: should open external links in new tabs", async () => {
    // Arrange - Navigation already setup in beforeEach

    // Loop through the external links
    for (let i = 0; i < SidebarData.externalLinks.length; i++) {
      // Act - Click on social link
      const newPage = await sidebarActions.clickSocialLink(i);

      // Assert - Verify URL in new tab
      expect(newPage.url()).toContain(new URL(SidebarData.externalLinks[i].url).host);

      // Clean up - Close the new page
      await newPage.close();
    }
  });

  test("TC-SB-006: should display correct title and labels when expanded", async () => {
    // Arrange - Ensure sidebar is expanded
    const isCollapsed = await sidebarActions.isSidebarCollapsed();
    if (isCollapsed) {
      await sidebarActions.toggleSidebar();
      await page.waitForTimeout(400);
    }

    // Act - Get text content for elements
    const appTitle = await page.textContent(SidebarComponents.appTitle);
    const appSubtitle = await page.textContent(SidebarComponents.appSubtitle);
    const dashboardText = await page.textContent(SidebarComponents.textDashboard);
    const invoicesText = await page.textContent(SidebarComponents.textInvoices);
    const contractorsText = await page.textContent(SidebarComponents.textContractors);

    // Assert - Verify text matches expected values
    expect(appTitle).toBe(SidebarData.title);
    expect(appSubtitle).toBe(SidebarData.subtitle);
    expect(dashboardText).toBe(SidebarData.menuItems.dashboard);
    expect(invoicesText).toBe(SidebarData.menuItems.invoices);
    expect(contractorsText).toBe(SidebarData.menuItems.contractors);
  });

  test("TC-SB-007: should show tooltips for social links when collapsed", async () => {
    // Arrange - Collapse the sidebar
    const isCollapsed = await sidebarActions.isSidebarCollapsed();
    if (!isCollapsed) {
      await sidebarActions.toggleSidebar();
      await page.waitForTimeout(400);
    }

    // Loop through each social link
    for (let i = 0; i < SidebarData.externalLinks.length; i++) {
      // Act - Hover over social link
      await sidebarActions.hoverSocialLink(i, true);

      // Assert - Verify tooltip is visible
      await expect(page.getByText(SidebarData.externalLinks[i].title, { exact: true })).toBeVisible();
    }
  });

  test("TC-SB-008: should maintain sidebar state after page refresh", async () => {
    // Arrange - Collapse the sidebar
    const isCollapsed = await sidebarActions.isSidebarCollapsed();
    if (!isCollapsed) {
      await sidebarActions.toggleSidebar();
      await page.waitForTimeout(400);
    }

    // Assert - Verify sidebar is collapsed
    expect(await sidebarActions.isSidebarCollapsed()).toBeTruthy();

    // Act - Refresh the page
    await page.reload();

    // Assert - Verify state is maintained
    expect(await sidebarActions.isSidebarCollapsed()).toBeTruthy();
  });

  test("TC-SB-009: should have correct URLs for social links when sidebar is expanded", async () => {
    // Arrange - Ensure sidebar is expanded
    const isCollapsed = await sidebarActions.isSidebarCollapsed();
    if (isCollapsed) {
      await sidebarActions.toggleSidebar();
      await page.waitForTimeout(400);
    }

    // Act & Assert - Check URLs for each social link
    for (let i = 0; i < SidebarData.externalLinks.length; i++) {
      const linkHref = await page.getAttribute(`[data-testid="sidebar-social-link-${i}"]`, "href");
      expect(linkHref).toBe(SidebarData.externalLinks[i].url);
    }
  });
});
