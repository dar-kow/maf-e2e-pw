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

  async scrollToActionsColumn() {
    await this.page.evaluate(() => {
      const actionsColumn = document.querySelector('[data-field="actions"]');
      const virtualScroller = document.querySelector(".MuiDataGrid-virtualScroller");
      if (!actionsColumn || !virtualScroller) return;
      const columnRect = actionsColumn.getBoundingClientRect();
      const scrollerRect = virtualScroller.getBoundingClientRect();
      if (columnRect.right <= scrollerRect.right && columnRect.left >= scrollerRect.left) return;
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

  private async clickInvoiceAction(invoiceId: number, btnSelectorFn: (id: number) => string, scrollToActions = true) {
    await this.ensureInvoiceRowIsVisible(invoiceId);
    const selector = btnSelectorFn(invoiceId);
    if (scrollToActions) await this.scrollToActionsColumn();
    await this.page.click(selector);
  }

  async clickPreviewInvoice(invoiceId: number) {
    await this.clickInvoiceAction(invoiceId, InvoiceComponents.previewBtn, false);
  }

  async clickEditInvoice(invoiceId: number) {
    await this.clickInvoiceAction(invoiceId, InvoiceComponents.editBtn);
  }

  async clickDeleteInvoice(invoiceId: number) {
    await this.clickInvoiceAction(invoiceId, InvoiceComponents.deleteBtn);
  }

  async clickSettleInvoice(invoiceId: number) {
    await this.clickInvoiceAction(invoiceId, InvoiceComponents.settleBtn);
  }

  async confirmDelete() {
    await this.page.getByRole("button", { name: "Usuń" }).click();
  }

  async cancelDelete() {
    await this.page.getByRole("button", { name: "Anuluj" }).click();
  }

  async hoverOverButton(selector: string) {
    await this.page.hover(selector);
    const tooltip = this.page.locator(InvoiceComponents.tooltip);
    await Helpers.waitForState(tooltip, "visible");
  }

  private async waitForProgressbarHidden(timeout = 5000) {
    const progressbar = this.page.getByRole("progressbar");
    await Helpers.waitForState(progressbar, "hidden", timeout).catch(() => {});
  }

  async getRowCount() {
    await this.waitForProgressbarHidden();
    return await this.page.locator(InvoiceComponents.gridRow).count();
  }

  async getColumnHeaders() {
    await this.waitForProgressbarHidden();
    return await this.page.locator(InvoiceComponents.gridHeader).allTextContents();
  }

  private async getCellTextInRow(rowIndex: number, cellSelector: string) {
    const row = this.page.locator(`${InvoiceComponents.gridRow}:nth-child(${rowIndex + 1})`);
    await row.scrollIntoViewIfNeeded();
    return await this.page.locator(`${InvoiceComponents.gridRow}:nth-child(${rowIndex + 1}) ${cellSelector}`).textContent();
  }

  async getInvoiceNumberInRow(rowIndex: number) {
    return await this.getCellTextInRow(rowIndex, InvoiceComponents.columnNumber);
  }

  async getContractorInRow(rowIndex: number) {
    return await this.getCellTextInRow(rowIndex, InvoiceComponents.columnContractor);
  }

  async getStatusInRow(rowIndex: number) {
    return await this.getCellTextInRow(rowIndex, InvoiceComponents.statusChip);
  }

  async filterByColumn(field: string, value: string) {
    const filterSelector = InvoiceComponents.filterInput(field);
    await this.page.fill(filterSelector, value);
    await this.page.waitForTimeout(300);
  }

  async clearColumnFilter(field: string) {
    const clearSelector = InvoiceComponents.filterClearBtn(field);
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
    await this.page.getByRole("option", { name: value }).first().click();
  }

  async getTooltipText() {
    const tooltip = this.page.locator(InvoiceComponents.tooltip);
    await Helpers.waitForState(tooltip, "visible");
    return await this.page.locator(InvoiceComponents.tooltipContent).textContent();
  }

  async getTooltipTextForButton(selector: string): Promise<string | null> {
    await this.hoverOverButton(selector);
    const text = await this.getTooltipText();
    const firstRow = this.page.locator(InvoiceComponents.gridRow).first();
    await firstRow.hover();
    const tooltip = this.page.locator(InvoiceComponents.tooltip);
    await Helpers.waitForState(tooltip, "hidden");
    return text;
  }

  private async scrollGridVertically(to: "top" | "bottom") {
    const grid = this.page.locator(InvoiceComponents.gridTable);
    await grid.evaluate((element, scrollTo) => {
      const scrollContainer = element.querySelector(".MuiDataGrid-virtualScroller");
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollTo === "top" ? 0 : scrollContainer.scrollHeight;
      }
    }, to);
    await this.page.waitForTimeout(300);
  }

  async scrollToBottom() {
    await this.scrollGridVertically("bottom");
  }

  async scrollToTop() {
    await this.scrollGridVertically("top");
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
