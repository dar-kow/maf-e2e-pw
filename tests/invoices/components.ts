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

  previewBtn: (id: number | string) => `[data-rowindex="${id}"] [data-testid="DescriptionIcon"]`,
  settleBtn: (id: number | string) => `[data-rowindex="${id}"] [data-testid="CreditCardIcon"]`,
  editBtn: (id: number | string) => `[data-rowindex="${id}"] [data-testid="EditIcon"]`,
  deleteBtn: (id: number | string) => `[data-rowindex="${id}"] [data-testid="DeleteIcon"]`,

  tooltip: ".MuiTooltip-popper",
  tooltipContent: ".MuiTooltip-tooltip",

  previewModal: '[data-testid="invoice-preview-modal"]',
  settlementModal: '[data-testid="invoice-settlement-modal"]',
  deleteDialog: '[data-testid="invoice-delete-dialog"]',
  modalBackdrop: ".MuiBackdrop-root",

  columnManagerBtn: '.actions-header [data-testid="column-manager-btn"]',
  columnManagerPanel: ".MuiPopover-root",

  pagination: ".MuiDataGrid-footerContainer",
  paginationInfo: ".MuiTablePagination-displayedRows",
  rowsPerPageSelect: ".MuiTablePagination-select",

  statusChip: ".MuiChip-root",
  statusPaid: ".MuiChip-colorSuccess",
  statusPartiallyPaid: ".MuiChip-colorWarning",
  statusUnpaid: ".MuiChip-colorError",
  statusOverdue: ".MuiChip-colorError",

  filterInput: (field: string) => `[data-field="${field}"] input`,
  filterClearBtn: (field: string) => `[data-field="${field}"] [data-testid="filter-clear-btn"]`,
};
