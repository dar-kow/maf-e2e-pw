import { Page } from "@playwright/test";
import { InvoiceComponents } from "./components";
import { Helpers } from "@utils/helpers";
import { URLs } from "@utils/urls";

export class InvoiceActions {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToInvoices() {
    await this.page.goto(URLs.invoices);
    await Helpers.waitForUrlContains(this.page, URLs.invoices);
  }

  async waitForGridToLoad() {
    await this.page.waitForSelector(InvoiceComponents.dataGrid);
    const gridRows = this.page.locator(InvoiceComponents.gridRow);
    await Helpers.waitForState(gridRows.first(), "visible");
  }

  private async scrollToActionsColumn() {
    await this.page.evaluate(() => {
      const actionsColumn = document.querySelector('[data-field="actions"]');
      const virtualScroller = document.querySelector(".MuiDataGrid-virtualScroller");

      if (!actionsColumn || !virtualScroller) return;

      const columnRect = actionsColumn.getBoundingClientRect();
      const scrollerRect = virtualScroller.getBoundingClientRect();

      if (columnRect.right <= scrollerRect.right && columnRect.left >= scrollerRect.left) {
        return;
      }

      virtualScroller.scrollTo({
        left: virtualScroller.scrollWidth - virtualScroller.clientWidth,
        behavior: "smooth",
      });
    });

    await this.page.waitForTimeout(300);
  }

  private async ensureInvoiceRowIsVisible(invoiceId: number) {
    const rows = this.page.locator(InvoiceComponents.gridRow);
    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const rowText = await row.textContent();

      if (rowText?.includes(invoiceId.toString())) {
        await row.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(200);
        break;
      }
    }
  }

  async searchInvoices(searchTerm: string) {
    await this.page.fill(InvoiceComponents.searchInput, searchTerm);
    await this.page.waitForTimeout(300);
  }

  async clearSearch() {
    await this.page.fill(InvoiceComponents.searchInput, "");
    await this.page.waitForTimeout(300);
  }

  async clickAddInvoice() {
    await this.page.click(InvoiceComponents.addInvoiceBtn);
  }

  async clickPrint() {
    await this.page.click(InvoiceComponents.printBtn);
  }

  async clickPreviewInvoice(invoiceId: number) {
    await this.ensureInvoiceRowIsVisible(invoiceId);
    const selector = InvoiceComponents.previewBtn(invoiceId);
    await this.page.click(selector);
  }

  async clickEditInvoice(invoiceId: number) {
    await this.ensureInvoiceRowIsVisible(invoiceId);
    const selector = InvoiceComponents.editBtn(invoiceId);
    await this.scrollToActionsColumn();
    await this.page.click(selector);
  }

  async clickDeleteInvoice(invoiceId: number) {
    await this.ensureInvoiceRowIsVisible(invoiceId);
    const selector = InvoiceComponents.deleteBtn(invoiceId);
    await this.scrollToActionsColumn();
    await this.page.click(selector);
  }

  async clickSettleInvoice(invoiceId: number) {
    await this.ensureInvoiceRowIsVisible(invoiceId);
    const selector = InvoiceComponents.settleBtn(invoiceId);
    await this.scrollToActionsColumn();
    await this.page.click(selector);
  }

  async confirmDelete() {
    await this.page.getByRole("button", { name: "Usuń" }).click();
  }

  async cancelDelete() {
    await this.page.getByRole("button", { name: "Anuluj" }).click();
  }

  async hoverOverButton(selector: string) {
    await this.scrollToActionsColumn();
    await this.page.hover(selector);
    // Wait for tooltip to appear
    const tooltip = this.page.locator(InvoiceComponents.tooltip);
    await Helpers.waitForState(tooltip, "visible", 1000);
  }

  async getRowCount() {
    const progressbar = this.page.getByRole("progressbar");
    await Helpers.waitForState(progressbar, "hidden", 5000).catch(() => {});
    return await this.page.locator(InvoiceComponents.gridRow).count();
  }

  async getColumnHeaders() {
    const progressbar = this.page.getByRole("progressbar");
    await Helpers.waitForState(progressbar, "hidden", 5000).catch(() => {});
    return await this.page.locator(InvoiceComponents.gridHeader).allTextContents();
  }

  async getInvoiceNumberInRow(rowIndex: number) {
    const row = this.page.locator(`${InvoiceComponents.gridRow}:nth-child(${rowIndex + 1})`);
    await row.scrollIntoViewIfNeeded();
    return await this.page
      .locator(`${InvoiceComponents.gridRow}:nth-child(${rowIndex + 1}) ${InvoiceComponents.columnNumber}`)
      .textContent();
  }

  async getContractorInRow(rowIndex: number) {
    const row = this.page.locator(`${InvoiceComponents.gridRow}:nth-child(${rowIndex + 1})`);
    await row.scrollIntoViewIfNeeded();
    return await this.page
      .locator(`${InvoiceComponents.gridRow}:nth-child(${rowIndex + 1}) ${InvoiceComponents.columnContractor}`)
      .textContent();
  }

  async getStatusInRow(rowIndex: number) {
    const row = this.page.locator(`${InvoiceComponents.gridRow}:nth-child(${rowIndex + 1})`);
    await row.scrollIntoViewIfNeeded();
    return await this.page.locator(`${InvoiceComponents.gridRow}:nth-child(${rowIndex + 1}) ${InvoiceComponents.statusChip}`).textContent();
  }

  async filterByColumn(field: string, value: string) {
    const filterSelector = InvoiceComponents.filterInput(field);
    // await this.ensureElementIsVisible(filterSelector);
    await this.page.fill(filterSelector, value);
    await this.page.waitForTimeout(300);
  }

  async clearColumnFilter(field: string) {
    const clearSelector = InvoiceComponents.filterClearBtn(field);
    // await this.ensureElementIsVisible(clearSelector);
    await this.page.click(clearSelector);
  }

  async isModalOpen(modalSelector: string) {
    return await this.page.locator(modalSelector).isVisible();
  }

  async closeModal() {
    await this.page.keyboard.press("Escape");
  }

  async isPrintButtonDisabled() {
    return await this.page.locator(InvoiceComponents.printBtn).isDisabled();
  }

  async changeRowsPerPage(value: string) {
    const selector = InvoiceComponents.rowsPerPageSelect;
    await this.page.click(selector);
    await this.page.getByRole("option", { name: value }).click();
  }

  async getTooltipText() {
    const tooltip = this.page.locator(InvoiceComponents.tooltip);
    await Helpers.waitForState(tooltip, "visible");
    return await this.page.locator(InvoiceComponents.tooltipContent).textContent();
  }

  async scrollToBottom() {
    const grid = this.page.locator(InvoiceComponents.gridTable);
    await grid.evaluate((element) => {
      const scrollContainer = element.querySelector(".MuiDataGrid-virtualScroller");
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    });
    await this.page.waitForTimeout(300);
  }

  async scrollToTop() {
    const grid = this.page.locator(InvoiceComponents.gridTable);
    await grid.evaluate((element) => {
      const scrollContainer = element.querySelector(".MuiDataGrid-virtualScroller");
      if (scrollContainer) {
        scrollContainer.scrollTop = 0;
      }
    });
    await this.page.waitForTimeout(300);
  }

  async getInvoiceIdByRowIndex(rowIndex: number): Promise<number> {
    const row = this.page.locator(`[data-rowindex="${rowIndex}"]`);
    await Helpers.waitForState(row, "visible");
    const idAttr = await row.getAttribute("data-id");
    if (idAttr === null) {
      throw new Error(`No data-id attribute found for row with index ${rowIndex}`);
    }
    return Number(idAttr);
  }
}
