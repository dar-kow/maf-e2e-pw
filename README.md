# MAF Application UI Tests | [Polski](#maf-testy-ui-aplikacji)

Automated end‑to‑end UI tests for the **MAF** application, built with [Playwright](https://playwright.dev/) and TypeScript.

## 📦 Technologies

- Node.js ≥18
- TypeScript
- Playwright Test Framework
- ESLint & Prettier for code quality

## 🏛️ Architecture

This project follows a hybrid architecture that combines:

### Vertical Slice Architecture + Page Object Model (POM)

The test suite uses a combination of Vertical Slice Architecture and the Page Object Model pattern:

- **Vertical Slice**: Tests are organized by feature rather than by technical layer, allowing each feature to contain all its necessary components.
- **Page Object Model**: UI interactions are abstracted into action classes, making tests more maintainable and readable.

Key benefits:
- Each feature (e.g., Sidebar, Navbar) has its own self-contained directory
- Action classes handle UI interactions
- Component repositories centralize selectors
- Data repositories manage test data
- Tests focus on behavior verification without UI interaction details

### Happy Path with Early Return Pattern

The implementation uses early returns instead of complex if/else structures:

```typescript
// Early return pattern example
async isSidebarCollapsed() {
    const sidebar = await this.page.$(SidebarComponents.root);
    return await sidebar?.evaluate(el => el.classList.contains('sidebar-collapsed'));
}

// Instead of complex if/else structures
async toggleAction() {
    if (await this.someCondition()) {
        // do something
    } else {
        // do something else
    }
}
```

Benefits:
- Improved code readability
- Reduced code complexity
- More maintainable codebase
- Fewer nesting levels
- Clear execution paths

## 📁 Project Structure

```
maf-e2e-pw/
├── tests/
│   ├── sidebar/           # Vertical slice for Sidebar feature
│   │   ├── actions.ts     # UI interactions for Sidebar
│   │   ├── components.ts  # Selectors for Sidebar elements
│   │   ├── data.ts        # Test data for Sidebar tests
│   │   └── test.ts        # Test specs for Sidebar feature
│   ├── navbar/            # Vertical slice for Navbar feature
│   │   ├── actions.ts     # UI interactions for Navbar
│   │   ├── components.ts  # Selectors for Navbar elements
│   │   ├── data.ts        # Test data for Navbar tests
│   │   └── test.ts        # Test specs for Navbar feature
├── utils/                 # Shared utilities
│   ├── helpers.ts         # Helper functions 
│   ├── index.ts           # Utility exports
│   └── urls.ts            # URL constants
├── playwright.config.ts   # Playwright configuration
├── package.json           # Project dependencies
└── tsconfig.json          # TypeScript configuration
```

## 🧪 Test Cases

- [Sidebar test cases (`tc-sb.md`)](./tc-sb.md)
- [Navbar test cases (`tc-nb.md`)](./tc-nb.md)

## 🚀 Getting Started

### 1. Clone repository

```bash
git clone https://github.com/dar-kow/maf-e2e-pw
cd maf-e2e-pw
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Run tests

```bash
# Run all tests
npm test

# Run with UI mode
npm run test:ui

# Run in headed mode
npm run test:headed

# Run in debug mode
npm run test:debug

# Run against local environment
npm run test:local

# Run against production environment
npm run test:prod
```

### 4. View test reports

```bash
npm run report
```

## 🧩 How to Add New Tests

1. Create a new directory for your feature in the `tests/` directory
2. Create the following files:
   - `components.ts` - Element selectors
   - `actions.ts` - UI interaction methods
   - `data.ts` - Test data constants
   - `test.ts` - Test specifications
3. Follow the existing patterns for consistency

## 🛠️ Extending the Framework

To add new helper functions:
1. Add them to appropriate files in the `utils/` directory
2. Export them through `index.ts` for easy importing

---

# MAF Testy UI Aplikacji | [English](#maf-application-ui-tests)

Zautomatyzowane testy end-to-end dla aplikacji **MAF**, zbudowane przy użyciu [Playwright](https://playwright.dev/) i TypeScript.

## 📦 Technologie

- Node.js ≥18
- TypeScript
- Framework testowy Playwright
- ESLint i Prettier dla jakości kodu

## 🏛️ Architektura

Ten projekt wykorzystuje hybrydową architekturę, łączącą:

### Architektura Vertical Slice + Page Object Model (POM)

Zestaw testów wykorzystuje kombinację architektury Vertical Slice i wzorca Page Object Model:

- **Vertical Slice**: Testy są organizowane według funkcji, a nie warstw technicznych, co pozwala każdej funkcji zawierać wszystkie niezbędne komponenty.
- **Page Object Model**: Interakcje z UI są abstrakcyjne w klasach akcji, co sprawia, że testy są łatwiejsze w utrzymaniu i bardziej czytelne.

Główne korzyści:
- Każda funkcja (np. Sidebar, Navbar) ma własny, samodzielny katalog
- Klasy akcji obsługują interakcje z UI
- Repozytoria komponentów centralizują selektory
- Repozytoria danych zarządzają danymi testowymi
- Testy skupiają się na weryfikacji zachowania bez szczegółów interakcji z UI

### Wzorzec Happy Path z Early Return

Implementacja wykorzystuje wczesne zwracanie wartości zamiast złożonych struktur if/else:

```typescript
// Przykład wzorca early return
async isSidebarCollapsed() {
    const sidebar = await this.page.$(SidebarComponents.root);
    return await sidebar?.evaluate(el => el.classList.contains('sidebar-collapsed'));
}

// Zamiast złożonych struktur if/else
async toggleAction() {
    if (await this.someCondition()) {
        // zrób coś
    } else {
        // zrób coś innego
    }
}
```

Korzyści:
- Lepsza czytelność kodu
- Zmniejszona złożoność kodu
- Łatwiejszy w utrzymaniu kod
- Mniej poziomów zagnieżdżenia
- Jasne ścieżki wykonania

## 📁 Struktura Projektu

```
maf-e2e-pw/
├── tests/
│   ├── sidebar/           # Vertical slice dla funkcji Sidebar
│   │   ├── actions.ts     # Interakcje UI dla Sidebar
│   │   ├── components.ts  # Selektory dla elementów Sidebar
│   │   ├── data.ts        # Dane testowe dla testów Sidebar
│   │   └── test.ts        # Specyfikacje testów dla funkcji Sidebar
│   ├── navbar/            # Vertical slice dla funkcji Navbar
│   │   ├── actions.ts     # Interakcje UI dla Navbar
│   │   ├── components.ts  # Selektory dla elementów Navbar
│   │   ├── data.ts        # Dane testowe dla testów Navbar
│   │   └── test.ts        # Specyfikacje testów dla funkcji Navbar
├── utils/                 # Współdzielone narzędzia
│   ├── helpers.ts         # Funkcje pomocnicze
│   ├── index.ts           # Eksporty narzędzi
│   └── urls.ts            # Stałe URL
├── playwright.config.ts   # Konfiguracja Playwright
├── package.json           # Zależności projektu
└── tsconfig.json          # Konfiguracja TypeScript
```

## 🧪 Przypadki Testowe

- [Przypadki testowe Sidebar (`tc-sb.md`)](./tc-sb.md)
- [Przypadki testowe Navbar (`tc-nb.md`)](./tc-nb.md)

## 🚀 Rozpoczęcie Pracy

### 1. Klonowanie repozytorium

```bash
git clone https://github.com/dar-kow/maf-e2e-pw
cd maf-e2e-pw
```

### 2. Instalacja zależności

```bash
npm install
# lub
yarn install
```

### 3. Uruchamianie testów

```bash
# Uruchom wszystkie testy
npm test

# Uruchom w trybie UI
npm run test:ui

# Uruchom w trybie z widoczną przeglądarką
npm run test:headed

# Uruchom w trybie debugowania
npm run test:debug

# Uruchom w środowisku lokalnym
npm run test:local

# Uruchom w środowisku produkcyjnym
npm run test:prod
```

### 4. Przeglądanie raportów z testów

```bash
npm run report
```

## 🧩 Jak Dodawać Nowe Testy

1. Utwórz nowy katalog dla swojej funkcji w katalogu `tests/`
2. Utwórz następujące pliki:
   - `components.ts` - selektory elementów
   - `actions.ts` - metody interakcji z UI
   - `data.ts` - stałe danych testowych
   - `test.ts` - specyfikacje testów
3. Postępuj zgodnie z istniejącymi wzorcami dla zachowania spójności

## 🛠️ Rozszerzanie Frameworka

Aby dodać nowe funkcje pomocnicze:
1. Dodaj je do odpowiednich plików w katalogu `utils/`
2. Wyeksportuj je przez `index.ts` dla łatwego importowania