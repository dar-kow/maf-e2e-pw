export const SidebarComponents = {
    root: '[data-testid="sidebar-root"]',
    toggle: '[data-testid="sidebar-toggle"]',
    header: '[data-testid="sidebar-header"]',
    headerCollapsed: '[data-testid="sidebar-header-collapsed"]',
    menu: '[data-testid="sidebar-menu"]',

    mobileHamburgerContainer: '[data-testid="sidebar-mobile-hamburger-container"]',
    mobileHamburger: '[data-testid="sidebar-mobile-hamburger"]',
    mobileOverlay: '[data-testid="sidebar-mobile-overlay"]',

    appTitle: '[data-testid="sidebar-app-title"]',
    appSubtitle: '[data-testid="sidebar-app-subtitle"]',
    logoIcon: '[data-testid="sidebar-logo-icon"]',

    menuDashboard: '[data-testid="sidebar-menu-dashboard"]',
    menuInvoices: '[data-testid="sidebar-menu-invoices"]',
    menuContractors: '[data-testid="sidebar-menu-contractors"]',

    linkDashboard: '[data-testid="sidebar-link-dashboard"]',
    linkInvoices: '[data-testid="sidebar-link-invoices"]',
    linkContractors: '[data-testid="sidebar-link-contractors"]',

    iconDashboard: '[data-testid="sidebar-icon-dashboard"]',
    iconInvoices: '[data-testid="sidebar-icon-invoices"]',
    iconContractors: '[data-testid="sidebar-icon-contractors"]',

    textDashboard: '[data-testid="sidebar-text-dashboard"]',
    textInvoices: '[data-testid="sidebar-text-invoices"]',
    textContractors: '[data-testid="sidebar-text-contractors"]',

    social: '[data-testid="sidebar-social"]',
    verticalSocial: '[data-testid="sidebar-vertical-social"]',

    socialLink: (index: number) => `[data-testid="sidebar-social-link-${index}"]`,
    verticalSocialLink: (index: number) => `[data-testid="sidebar-vertical-social-link-${index}"]`,
};