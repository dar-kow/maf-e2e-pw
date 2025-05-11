export const InvoiceComponents = {
  root: ".invoice-list-wrapper",
  header: ".invoice-list-header",
  searchContainer: ".search-container",
  actionsContainer: ".actions-container",
  gridContainer: ".invoice-list-container",

  searchField: '[data-testid="invoice-search"]',
  searchInput: '[data-testid="invoice-search"] input',
  searchIcon: '[data-testid="invoice-search"] svg',

  addInvoiceBtn: '[data-testid="invoice-add-btn"]',
  printBtn: '[data-testid="invoice-print-btn"]',

  dataGrid: '[data-testid="invoice-grid"]',
  gridTable: ".MuiDataGrid-root",
  gridRow: ".MuiDataGrid-row",
  gridCell: ".MuiDataGrid-cell",
  gridHeader: ".MuiDataGrid-columnHeader",
  gridLoadingOverlay: ".MuiDataGrid-loadingOverlay",
  gridNoRowsOverlay: ".MuiDataGrid-overlay",

  columnNumber: '[data-field="number"]',
  columnContractor: '[data-field="contractorName"]',
  columnIssueDate: '[data-field="issueDate"]',
  columnPaymentMethod: '[data-field="paymentMethod"]',
  columnTotalAmount: '[data-field="totalAmount"]',
  columnDueDate: '[data-field="dueDate"]',
  columnPaymentStatus: '[data-field="paymentStatus"]',
  columnPaidAmount: '[data-field="paidAmount"]',
  columnActions: '[data-field="actions"]',
};
