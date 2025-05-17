import { test, expect, Page } from "@playwright/test";
import { InvoiceActions } from "./actions";
import { InvoiceData } from "./data";
import { InvoiceComponents } from "./components";
import { Helpers } from "@utils/helpers";

test.describe("Invoice List", () => {
  let page: Page;
  let invoiceActions: InvoiceActions;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    invoiceActions = new InvoiceActions(page);
    await invoiceActions.navigateToInvoices();
    await invoiceActions.waitForGridToLoad();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test("should display invoice list with correct headers", async () => {
    // Act
    const headers = await invoiceActions.getColumnHeaders();

    // Assert
    expect(headers).toEqual(InvoiceData.columnHeaders);
  });

  test("should display invoice data in grid rows", async () => {
    // Act
    const rowCount = await invoiceActions.getRowCount();
    const firstInvoiceNumber = await invoiceActions.getInvoiceNumberInRow(0);
    const firstContractor = await invoiceActions.getContractorInRow(0);

    // Assert
    expect(rowCount).toBeGreaterThan(0);
    expect(firstInvoiceNumber).toBeTruthy();
    expect(firstContractor).toBeTruthy();
  });

  test("should search invoices by number", async () => {
    // Arrange
    const initialRowCount = await invoiceActions.getRowCount();

    // Act
    await invoiceActions.searchInvoices(InvoiceData.searchTerms.byNumber);
    await Helpers.waitForGridUpdate(page);
    const filteredRowCount = await invoiceActions.getRowCount();

    // Assert
    expect(filteredRowCount).toBeLessThan(initialRowCount);
    const invoiceNumber = await invoiceActions.getInvoiceNumberInRow(0);
    expect(invoiceNumber).toContain(InvoiceData.searchTerms.byNumber);
  });

  test("should search invoices by contractor name", async () => {
    // Act
    await invoiceActions.searchInvoices(InvoiceData.searchTerms.byContractor);
    await Helpers.waitForGridUpdate(page);

    // Assert
    const contractorName = await invoiceActions.getContractorInRow(0);
    expect(contractorName?.toLowerCase()).toContain(InvoiceData.searchTerms.byContractor.toLowerCase());
  });

  test("should show no results for non-existent search term", async () => {
    // Act
    await invoiceActions.searchInvoices(InvoiceData.searchTerms.noResults);
    await Helpers.waitForGridUpdate(page);

    // Assert
    const rowCount = await invoiceActions.getRowCount();
    expect(rowCount).toBe(0);
  });

  test("should navigate to new invoice page when clicking add button", async () => {
    // Act
    await invoiceActions.clickAddInvoice();
    await Helpers.waitForUrlContains(page, InvoiceData.urls.newInvoice);

    // Assert
    expect(page.url()).toContain(InvoiceData.urls.newInvoice);
  });

  test("should disable print button when no invoices", async () => {
    // Arrange
    await invoiceActions.searchInvoices(InvoiceData.searchTerms.noResults);
    await Helpers.waitForGridUpdate(page);

    // Act
    const isDisabled = await invoiceActions.isPrintButtonDisabled();

    // Assert
    expect(isDisabled).toBe(true);
  });

  test("should show tooltips on action buttons", async () => {
    // Arrange
    const id = await invoiceActions.getInvoiceIdByRowIndex(0);
    const firstRow = page.locator(InvoiceComponents.gridRow).first();
    await Helpers.waitForState(firstRow, "visible");

    // Act & Assert - Preview button
    let tooltipText = await invoiceActions.getTooltipTextForButton(InvoiceComponents.previewBtn(0));
    expect(tooltipText).toBe(InvoiceData.tooltips.preview);

    // Act & Assert - Edit button
    await invoiceActions.scrollToActionsColumn();
    tooltipText = await invoiceActions.getTooltipTextForButton(InvoiceComponents.editBtn(id));
    expect(tooltipText).toBe(InvoiceData.tooltips.edit);

    // Act & Assert - Delete button
    tooltipText = await invoiceActions.getTooltipTextForButton(InvoiceComponents.deleteBtn(id));
    expect(tooltipText).toBe(InvoiceData.tooltips.delete);

    // Act & Assert - Settle button
    tooltipText = await invoiceActions.getTooltipTextForButton(InvoiceComponents.settleBtn(0));
    expect(tooltipText).toBe(InvoiceData.tooltips.settle);
  });

  test("should open preview modal when clicking preview button", async () => {
    // Act
    await invoiceActions.clickPreviewInvoice(1);
    await Helpers.waitForModalOpen(page, InvoiceComponents.previewModal);

    // Assert
    const isModalOpen = await invoiceActions.isModalOpen(InvoiceComponents.previewModal);
    expect(isModalOpen).toBe(true);
  });

  test("should open settlement modal when clicking settle button", async () => {
    // Act
    await invoiceActions.clickSettleInvoice(1);
    await Helpers.waitForModalOpen(page, InvoiceComponents.settlementModal);

    // Assert
    const isModalOpen = await invoiceActions.isModalOpen(InvoiceComponents.settlementModal);
    expect(isModalOpen).toBe(true);
  });

  test("should show delete confirmation dialog", async () => {
    // Act
    await invoiceActions.clickDeleteInvoice(1);
    await Helpers.waitForModalOpen(page, InvoiceComponents.deleteDialog);

    // Assert
    const isDialogOpen = await invoiceActions.isModalOpen(InvoiceComponents.deleteDialog);
    expect(isDialogOpen).toBe(true);
    const dialogText = await page.textContent(InvoiceComponents.deleteDialog);
    expect(dialogText).toContain(InvoiceData.messages.deleteConfirmation);
  });

  test("should close delete dialog on cancel", async () => {
    // Arrange
    await invoiceActions.clickDeleteInvoice(1);
    await Helpers.waitForModalOpen(page, InvoiceComponents.deleteDialog);

    // Act
    await invoiceActions.cancelDelete();
    await Helpers.waitForModalClose(page, InvoiceComponents.deleteDialog);

    // Assert
    const isDialogOpen = await invoiceActions.isModalOpen(InvoiceComponents.deleteDialog);
    expect(isDialogOpen).toBe(false);
  });

  test("should navigate to edit page when clicking edit button", async () => {
    // Act
    const id = await invoiceActions.getInvoiceIdByRowIndex(1);
    await invoiceActions.clickEditInvoice(1);
    await Helpers.waitForUrlContains(page, InvoiceData.urls.editInvoice(1));

    // Assert
    expect(page.url()).toContain(InvoiceData.urls.editInvoice(id));
  });

  test.skip("should filter by column values", async () => {
    // Act
    await invoiceActions.filterByColumn("number", InvoiceData.filterValues.number);
    await Helpers.waitForGridUpdate(page);

    // Assert
    const invoiceNumber = await invoiceActions.getInvoiceNumberInRow(0);
    expect(invoiceNumber).toContain(InvoiceData.filterValues.number);
  });

  test.skip("should clear column filter", async () => {
    // Arrange
    await invoiceActions.filterByColumn("number", InvoiceData.filterValues.number);
    await Helpers.waitForGridUpdate(page);
    const filteredRowCount = await invoiceActions.getRowCount();

    // Act
    await invoiceActions.clearColumnFilter("number");
    await Helpers.waitForGridUpdate(page);
    const clearedRowCount = await invoiceActions.getRowCount();

    // Assert
    expect(clearedRowCount).toBeGreaterThan(filteredRowCount);
  });

  test("should display correct payment status chips", async () => {
    // Act
    const statusText = await invoiceActions.getStatusInRow(0);

    // Assert
    expect(Object.values(InvoiceData.statusLabels)).toContain(statusText);
  });
});
