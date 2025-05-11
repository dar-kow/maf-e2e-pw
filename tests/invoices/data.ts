export const InvoiceData = {
  testInvoices: [
    {
      id: 1,
      number: "FV/2024/001",
      contractorName: "Firma XYZ Sp. z o.o.",
      issueDate: "2024-01-15",
      paymentMethod: "Przelew",
      totalAmount: "1230.00",
      dueDate: "2024-01-30",
      paymentStatus: "Zapłacono",
      paidAmount: "1230.00",
    },
    {
      id: 2,
      number: "FV/2024/002",
      contractorName: "Jan Kowalski",
      issueDate: "2024-01-20",
      paymentMethod: "Gotówka",
      totalAmount: "615.00",
      dueDate: "2024-02-05",
      paymentStatus: "Częściowo zapłacono",
      paidAmount: "300.00",
    },
    {
      id: 3,
      number: "FV/2024/003",
      contractorName: "ABC Corporation",
      issueDate: "2024-02-01",
      paymentMethod: "Karta",
      totalAmount: "3075.00",
      dueDate: "2024-02-15",
      paymentStatus: "Niezapłacono",
      paidAmount: "0.00",
    },
  ],

  columnHeaders: ["Numer", "Kontrahent", "Data wystawienia", "Metoda płatności", "Kwota", "Termin płatności", "Status", "Zapłacono", ""],

  tooltips: {
    preview: "Podgląd faktury",
    edit: "Edytuj fakturę",
    delete: "Usuń fakturę",
    settle: "Rozlicz fakturę",
    print: "Drukuj",
    addInvoice: "Dodaj fakturę",
    columnManager: "Zarządzaj kolumnami",
  },

  searchTerms: {
    byNumber: "FV/24/2025",
    byContractor: "Bashirian LLC_1742808891752",
    noResults: "NIEISTNIEJĄCY",
  },

  filterValues: {
    number: "FV/2024",
    contractor: "ABC",
    status: "Zapłacono",
    amount: "1230",
  },

  statusLabels: {
    paid: "Zapłacono",
    partiallyPaid: "Częściowo zapłacono",
    unpaid: "Niezapłacono",
    overdue: "Po terminie",
  },

  messages: {
    deleteConfirmation: "Czy na pewno chcesz usunąć tę fakturę? Tej operacji nie można cofnąć.",
    noResults: "Brak wyników",
    loading: "Ładowanie...",
  },

  urls: {
    invoices: "/invoices",
    newInvoice: "/invoices/new",
    editInvoice: (id: number) => `/invoices/edit/${id}`,
  },

  pagination: {
    rowsPerPage: ["10", "25", "50", "100"],
    defaultRowsPerPage: "25",
  },
};
