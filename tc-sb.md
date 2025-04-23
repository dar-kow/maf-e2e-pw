# Test Cases - Sidebar Feature

## TC-SB-001: Weryfikacja nawigacji po kliknięciu pozycji menu

**Priorytet:** Wysoki  
**Środowisko:** Przeglądarka desktop

**Warunki wstępne:**
1. Aplikacja jest dostępna i uruchomiona pod adresem http://localhost:3005 
(można też używać maf.sdet.pl do testowania live - tutaj bardziej pod kątem testów przed deploy w dokerze)
2. Sidebar jest widoczny

**Kroki testowe:**

| Lp. | Krok testowy | Oczekiwany wynik |
|-----|--------------|------------------|
| 1   | Kliknij pozycję menu "Faktury" | Aplikacja przekierowuje użytkownika na stronę faktur |
| 2   | Sprawdź URL | URL zawiera ścieżkę "/invoices" |
| 3   | Sprawdź stan aktywny pozycji menu | Pozycja "Faktury" jest podświetlona jako aktywna |
| 4   | Kliknij pozycję menu "Kontrahenci" | Aplikacja przekierowuje użytkownika na stronę kontrahentów |
| 5   | Sprawdź URL | URL zawiera ścieżkę "/contractors" |
| 6   | Sprawdź stan aktywny pozycji menu | Pozycja "Kontrahenci" jest podświetlona jako aktywna |
| 7   | Kliknij pozycję menu "Dashboard" | Aplikacja przekierowuje użytkownika na stronę główną (dashboard) |
| 8   | Sprawdź URL | URL zawiera ścieżkę "/" |
| 9   | Sprawdź stan aktywny pozycji menu | Pozycja "Dashboard" jest podświetlona jako aktywna |

## TC-SB-002: Weryfikacja tooltipów elementów menu na zwiniętym sidebar

**Priorytet:** Średni  
**Środowisko:** Przeglądarka desktop

**Warunki wstępne:**
1. Aplikacja jest dostępna i uruchomiona
2. Sidebar jest zwinięty (kliknięto przycisk zwijania)

**Kroki testowe:**

| Lp. | Krok testowy | Oczekiwany wynik |
|-----|--------------|------------------|
| 1   | Najedź kursorem na ikonę "Dashboard" | Pojawia się tooltip z tekstem "Dashboard" |
| 2   | Najedź kursorem na ikonę "Faktury" | Pojawia się tooltip z tekstem "Faktury" |
| 3   | Najedź kursorem na ikonę "Kontrahenci" | Pojawia się tooltip z tekstem "Kontrahenci" |
| 4   | Najedź kursorem na logo aplikacji | Pojawia się tooltip z tekstem "M-A-F: Moja Aplikacja Faktur" |

## TC-SB-003: Weryfikacja zwijania i rozwijania sidebara

**Priorytet:** Wysoki  
**Środowisko:** Przeglądarka desktop

**Warunki wstępne:**
1. Aplikacja jest dostępna i uruchomiona
2. Sidebar jest rozwinięty (stan domyślny)

**Kroki testowe:**

| Lp. | Krok testowy | Oczekiwany wynik |
|-----|--------------|------------------|
| 1   | Sprawdź aktualny stan sidebar | Sidebar jest rozwinięty, widoczne są teksty obok ikon |
| 2   | Kliknij przycisk zwijania sidebar | Sidebar zmienia szerokość i zostaje zwinięty |
| 3   | Sprawdź widoczność tytułu i podtytułu | Tytuł "M-A-F" i podtytuł "Moja Aplikacja Faktur" nie są widoczne |
| 4   | Sprawdź widoczność tekstów obok ikon | Teksty "Dashboard", "Faktury", "Kontrahenci" nie są widoczne |
| 5   | Sprawdź widoczność ikon | Wszystkie ikony menu są nadal widoczne |
| 6   | Sprawdź widoczność logo | Logo aplikacji jest widoczne |
| 7   | Kliknij ponownie przycisk zwijania sidebar | Sidebar zmienia szerokość i zostaje rozwinięty |
| 8   | Sprawdź widoczność tytułu i podtytułu | Tytuł "M-A-F" i podtytuł "Moja Aplikacja Faktur" są ponownie widoczne |
| 9   | Sprawdź widoczność tekstów obok ikon | Teksty "Dashboard", "Faktury", "Kontrahenci" są ponownie widoczne |

## TC-SB-005: Weryfikacja funkcjonalności linków zewnętrznych

**Priorytet:** Średni  
**Środowisko:** Przeglądarka desktop

**Warunki wstępne:**
1. Aplikacja jest dostępna i uruchomiona
2. Sidebar jest widoczny

**Kroki testowe:**

| Lp. | Krok testowy | Oczekiwany wynik |
|-----|--------------|------------------|
| 1   | Kliknij pierwszą ikonę linku zewnętrznego (Swagger) | Otwiera się nowa karta przeglądarki z adresem dokumentacji API Swagger |
| 2   | Sprawdź URL otwartej karty | URL zawiera fragment "maf.sdet.pl/swagger" |
| 3   | Wróć do pierwotnej karty z aplikacją | - |
| 4   | Kliknij drugą ikonę linku zewnętrznego (GitHub) | Otwiera się nowa karta przeglądarki z repozytorium GitHub |
| 5   | Sprawdź URL otwartej karty | URL zawiera fragment "github.com/dar-kow/M-A-F" |
| 6   | Wróć do pierwotnej karty z aplikacją | - |
| 7   | Kliknij trzecią ikonę linku zewnętrznego (LinkedIn) | Otwiera się nowa karta przeglądarki z profilem LinkedIn |
| 8   | Sprawdź URL otwartej karty | URL zawiera fragment "linkedin.com/in/dar-kow" |

## TC-SB-006: Weryfikacja poprawności etykiet na rozwiniętym sidebar

**Priorytet:** Średni  
**Środowisko:** Przeglądarka desktop

**Warunki wstępne:**
1. Aplikacja jest dostępna i uruchomiona
2. Sidebar jest rozwinięty (stan domyślny)

**Kroki testowe:**

| Lp. | Krok testowy | Oczekiwany wynik |
|-----|--------------|------------------|
| 1   | Sprawdź tytuł aplikacji | Tekst "M-A-F" jest widoczny |
| 2   | Sprawdź podtytuł aplikacji | Tekst "Moja Aplikacja Faktur" jest widoczny |
| 3   | Sprawdź etykietę pierwszej pozycji menu | Tekst "Dashboard" jest widoczny obok ikony |
| 4   | Sprawdź etykietę drugiej pozycji menu | Tekst "Faktury" jest widoczny obok ikony |
| 5   | Sprawdź etykietę trzeciej pozycji menu | Tekst "Kontrahenci" jest widoczny obok ikony |

## TC-SB-007: Weryfikacja tooltipów dla linków społecznościowych na zwiniętym sidebar

**Priorytet:** Niski  
**Środowisko:** Przeglądarka desktop

**Warunki wstępne:**
1. Aplikacja jest dostępna i uruchomiona
2. Sidebar jest zwinięty (kliknięto przycisk zwijania)

**Kroki testowe:**

| Lp. | Krok testowy | Oczekiwany wynik |
|-----|--------------|------------------|
| 1   | Najedź kursorem na pierwszy link zewnętrzny (Swagger) | Pojawia się tooltip z tekstem "Swagger - API Documentation" |
| 2   | Najedź kursorem na drugi link zewnętrzny (GitHub) | Pojawia się tooltip z tekstem "GitHub - View source code" |
| 3   | Najedź kursorem na trzeci link zewnętrzny (LinkedIn) | Pojawia się tooltip z tekstem "LinkedIn - Contact me" |

## TC-SB-008: Weryfikacja zachowania stanu po odświeżeniu

**Priorytet:** Niski  
**Środowisko:** Przeglądarka desktop

**Warunki wstępne:**
1. Aplikacja jest dostępna i uruchomiona
2. Sidebar jest rozwinięty (stan domyślny)

**Kroki testowe:**

| Lp. | Krok testowy | Oczekiwany wynik |
|-----|--------------|------------------|
| 1   | Kliknij przycisk zwijania sidebar | Sidebar zmienia szerokość i zostaje zwinięty |
| 2   | Odśwież stronę (F5) | Strona zostaje załadowana ponownie |
| 3   | Sprawdź stan sidebara | Sidebar pozostaje zwinięty po odświeżeniu |
| 4   | Kliknij przycisk zwijania sidebar | Sidebar zmienia szerokość i zostaje rozwinięty |
| 5   | Odśwież stronę (F5) | Strona zostaje załadowana ponownie |
| 6   | Sprawdź stan sidebara | Sidebar pozostaje rozwinięty po odświeżeniu |