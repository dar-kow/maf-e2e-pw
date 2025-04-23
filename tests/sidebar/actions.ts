import { Page } from '@playwright/test';
import { SidebarComponents } from './components';

export class SidebarActions {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToApp() {
        await this.page.goto('/');
    }

    async isSidebarVisible() {
        return await this.page.isVisible(SidebarComponents.root);
    }

    async toggleSidebar() {
        await this.page.click(SidebarComponents.toggle);
    }

    async isSidebarCollapsed() {
        const sidebar = await this.page.$(SidebarComponents.root);
        return await sidebar?.evaluate(el => el.classList.contains('sidebar-collapsed'));
    }

    async clickMenuItem(item: 'dashboard' | 'invoices' | 'contractors') {
        const menuItemSelectors = {
            dashboard: SidebarComponents.linkDashboard,
            invoices: SidebarComponents.linkInvoices,
            contractors: SidebarComponents.linkContractors,
        };
        await this.page.click(menuItemSelectors[item]);
    }

    async hoverMenuItem(item: 'dashboard' | 'invoices' | 'contractors') {
        const menuItemSelectors = {
            dashboard: SidebarComponents.linkDashboard,
            invoices: SidebarComponents.linkInvoices,
            contractors: SidebarComponents.linkContractors,
        };
        await this.page.hover(menuItemSelectors[item]);
    }

    async getCurrentUrl() {
        return this.page.url();
    }

    async isMenuItemActive(item: 'dashboard' | 'invoices' | 'contractors') {
        const menuItemSelectors = {
            dashboard: SidebarComponents.menuDashboard,
            invoices: SidebarComponents.menuInvoices,
            contractors: SidebarComponents.menuContractors,
        };
        const menuItem = await this.page.$(menuItemSelectors[item]);
        return await menuItem?.evaluate(el => el.classList.contains('active'));
    }

    async clickSocialLink(index: number, isCollapsed = false) {
        const selector = isCollapsed ?
            SidebarComponents.verticalSocialLink(index) :
            SidebarComponents.socialLink(index);

        const pagePromise = this.page.context().waitForEvent('page');
        await this.page.click(selector);
        const newPage = await pagePromise;
        await newPage.waitForLoadState();
        return newPage;
    }

    async hoverSocialLink(index: number, isCollapsed = false) {
        const selector = isCollapsed ?
            SidebarComponents.verticalSocialLink(index) :
            SidebarComponents.socialLink(index);
        await this.page.hover(selector);
    }

    async toggleMobileMenu() {
        await this.page.click(SidebarComponents.mobileHamburger);
    }

    async isTooltipVisible(text: string) {
        const tooltipContent = await this.page.getByText(text, { exact: true });
        return await tooltipContent.isVisible();
    }

    async areTitlesVisible() {
        const titleVisible = await this.page.isVisible(SidebarComponents.appTitle);
        const subtitleVisible = await this.page.isVisible(SidebarComponents.appSubtitle);
        return titleVisible && subtitleVisible;
    }

    async isMenuTextVisible(item: 'dashboard' | 'invoices' | 'contractors') {
        const textSelectors = {
            dashboard: SidebarComponents.textDashboard,
            invoices: SidebarComponents.textInvoices,
            contractors: SidebarComponents.textContractors,
        };
        return await this.page.isVisible(textSelectors[item]);
    }

    async isLogoIconVisible() {
        return await this.page.isVisible(SidebarComponents.logoIcon);
    }
}