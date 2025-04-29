import { Page } from "@playwright/test";
import { Components } from "./components";
import { SidebarComponents } from "../sidebar/components";
import { Helpers } from "../../utils/helpers";

export enum SidebarDestination {
  Dashboard = "dashboard",
  Invoices = "invoices",
  Contractors = "contractors",
}

export class Actions {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToApp() {
    await this.page.goto("/");
  }

  async isNavbarVisible() {
    return await this.page.isVisible(Components.root);
  }

  async getNavbarTitle() {
    return await this.page.textContent(Components.sectionTitle);
  }

  async navigateViaSidebar(destination: SidebarDestination) {
    const selectors = {
      dashboard: SidebarComponents.linkDashboard,
      invoices: SidebarComponents.linkInvoices,
      contractors: SidebarComponents.linkContractors,
    };

    await this.page.click(selectors[destination]);
    await Helpers.waitForUrlContains(this.page, `URLs.${destination}`);
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  async openProfileMenu() {
    await this.page.click(`${Components.navbarActions} .MuiAvatar-root`);
  }

  async isProfileMenuOpen() {
    return await this.page.isVisible(Components.profileMenu);
  }

  async selectProfileOption(option: string) {
    await this.openProfileMenu();
    await this.page.getByText(option, { exact: true }).click();
  }
}
