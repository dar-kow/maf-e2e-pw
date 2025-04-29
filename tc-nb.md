# Test Cases - Navbar Feature

## TC-NB-001: Weryfikacja tytułu nagłówka po nawigacji na stronę Dashboard

**Priorytet:** Wysoki  
**Środowisko:** Przeglądarka desktop

**Warunki wstępne:**
1. Aplikacja jest dostępna i uruchomiona pod adresem http://localhost:3005
2. Navbar jest widoczny

**Kroki testowe:**

| Lp. | Krok testowy | Oczekiwany wynik |
|-----|--------------|------------------|
| 1   | Kliknij pozycję menu "Dashboard" w sidebarze | Aplikacja przekierowuje użytkownika na stronę główną (dashboard) |
| 2   | Sprawdź URL | URL zawiera ścieżkę "/" |
| 3   | Sprawdź tytuł sekcji w navbarze | Tytuł sekcji wyświetla tekst "Dashboard" |

## TC-NB-002: Weryfikacja tytułu nagłówka po nawigacji na stronę Faktury

**Priorytet:** Wysoki  
**Środowisko:** Przeglądarka desktop

**Warunki wstępne:**
1. Aplikacja jest dostępna i uruchomiona pod adresem http://localhost:3005
2. Navbar jest widoczny

**Kroki testowe:**

| Lp. | Krok testowy | Oczekiwany wynik |
|-----|--------------|------------------|
| 1   | Kliknij pozycję menu "Faktury" w sidebarze | Aplikacja przekierowuje użytkownika na stronę faktur |
| 2   | Sprawdź URL | URL zawiera ścieżkę "/invoices" |
| 3   | Sprawdź tytuł sekcji w navbarze | Tytuł sekcji wyświetla tekst "Faktury" |

## TC-NB-003: Weryfikacja tytułu nagłówka po nawigacji na stronę Kontrahenci

**Priorytet:** Wysoki  
**Środowisko:** Przeglądarka desktop

**Warunki wstępne:**
1. Aplikacja jest dostępna i uruchomiona pod adresem http://localhost:3005
2. Navbar jest widoczny

**Kroki testowe:**

| Lp. | Krok testowy | Oczekiwany wynik |
|-----|--------------|------------------|
| 1   | Kliknij pozycję menu "Kontrahenci" w sidebarze | Aplikacja przekierowuje użytkownika na stronę kontrahentów |
| 2   | Sprawdź URL | URL zawiera ścieżkę "/contractors" |
| 3   | Sprawdź tytuł sekcji w navbarze | Tytuł sekcji wyświetla tekst "Kontrahenci" |

## TC-NB-004: Weryfikacja menu profilu użytkownika

**Priorytet:** Średni  
**Środowisko:** Przeglądarka desktop

**Warunki wstępne:**
1. Aplikacja jest dostępna i uruchomiona
2. Navbar jest widoczny
3. Użytkownik jest zalogowany

**Kroki testowe:**

| Lp. | Krok testowy | Oczekiwany wynik |
|-----|--------------|------------------|
| 1   | Kliknij na ikonę avatara użytkownika w navbarze | Rozwija się menu profilu użytkownika |
| 2   | Sprawdź widoczność opcji menu | Menu zawiera opcje "Profil", "Ustawienia", "Wyloguj się" |
| 3   | Kliknij poza menu | Menu profilu zostaje zamknięte |
| 4   | Kliknij ponownie na ikonę avatara | Menu profilu zostaje otwarte ponownie |
| 5   | Kliknij opcję "Profil" | Aplikacja przekierowuje na stronę profilu użytkownika |
| 6   | Wróć do strony głównej | - |
| 7   | Otwórz menu profilu ponownie | - |
| 8   | Kliknij opcję "Ustawienia" | Aplikacja przekierowuje na stronę ustawień |
| 9   | Wróć do strony głównej | - |

## TC-NB-005: Weryfikacja responsywności nawigacji

**Priorytet:** Średni  
**Środowisko:** Urządzenia mobilne i desktop

**Warunki wstępne:**
1. Aplikacja jest dostępna i uruchomiona

**Kroki testowe:**

| Lp. | Krok testowy | Oczekiwany wynik |
|-----|--------------|------------------|
| 1   | Otwórz aplikację w przeglądarce desktop (szerokość ≥ 1024px) | Navbar jest widoczny w pełnej wersji |
| 2   | Zmniejsz szerokość przeglądarki do 768px | Navbar dostosowuje się do mniejszej szerokości |
| 3   | Zmniejsz szerokość przeglądarki do 480px | Navbar przełącza się do wersji mobilnej |
| 4   | Sprawdź widoczność elementów nawigacji | W wersji mobilnej widoczny jest przycisk hamburger menu |
| 5   | Kliknij przycisk hamburger menu | Rozwija się menu mobilne |
| 6   | Sprawdź widoczność opcji menu | Wszystkie opcje menu są dostępne w menu mobilnym |
| 7   | Kliknij opcję "Faktury" w menu mobilnym | Aplikacja przekierowuje na stronę faktur, menu zostaje zamknięte |

## TC-NB-006: Weryfikacja funkcjonalności wyszukiwania w navbarze

**Priorytet:** Wysoki  
**Środowisko:** Przeglądarka desktop

**Warunki wstępne:**
1. Aplikacja jest dostępna i uruchomiona
2. Navbar jest widoczny

**Kroki testowe:**

| Lp. | Krok testowy | Oczekiwany wynik |
|-----|--------------|------------------|
| 1   | Kliknij ikonę wyszukiwania w navbarze | Pojawia się pole wyszukiwania |
| 2   | Wpisz frazę "Faktura 123" | Tekst jest widoczny w polu wyszukiwania |
| 3   | Naciśnij Enter | Wyniki wyszukiwania są wyświetlane |
| 4   | Wyczyść pole wyszukiwania | Pole wyszukiwania jest puste |
| 5   | Wpisz frazę "Kontrahent ABC" | Tekst jest widoczny w polu wyszukiwania |
| 6   | Kliknij przycisk "Szukaj" obok pola | Wyniki wyszukiwania są wyświetlane |
| 7   | Kliknij przycisk "X" aby zamknąć wyszukiwanie | Pole wyszukiwania zostaje zamknięte |

## TC-NB-007: Weryfikacja powiadomień w navbarze

**Priorytet:** Średni  
**Środowisko:** Przeglądarka desktop

**Warunki wstępne:**
1. Aplikacja jest dostępna i uruchomiona
2. Navbar jest widoczny
3. Użytkownik ma nieprzeczytane powiadomienia

**Kroki testowe:**

| Lp. | Krok testowy | Oczekiwany wynik |
|-----|--------------|------------------|
| 1   | Sprawdź ikonę powiadomień w navbarze | Ikona powiadomień wyświetla liczbę nieprzeczytanych powiadomień |
| 2   | Kliknij ikonę powiadomień | Rozwija się panel powiadomień |
| 3   | Sprawdź listę powiadomień | Lista zawiera wszystkie powiadomienia z najnowszymi na górze |
| 4   | Kliknij na pierwsze powiadomienie | Aplikacja przekierowuje do odpowiedniej sekcji związanej z powiadomieniem |
| 5   | Wróć i otwórz ponownie panel powiadomień | - |
| 6   | Kliknij przycisk "Oznacz wszystkie jako przeczytane" | Wszystkie powiadomienia są oznaczone jako przeczytane |
| 7   | Sprawdź licznik na ikonie powiadomień | Licznik powiadomień pokazuje "0" lub jest ukryty |

## TC-NB-008: Weryfikacja trybu ciemnego/jasnego

**Priorytet:** Niski  
**Środowisko:** Przeglądarka desktop

**Warunki wstępne:**
1. Aplikacja jest dostępna i uruchomiona
2. Navbar jest widoczny

**Kroki testowe:**

| Lp. | Krok testowy | Oczekiwany wynik |
|-----|--------------|------------------|
| 1   | Sprawdź aktualny motyw aplikacji | Aplikacja wyświetla się w domyślnym motywie (jasnym lub ciemnym) |
| 2   | Kliknij przełącznik trybu ciemnego/jasnego w navbarze | Motyw aplikacji zmienia się na przeciwny |
| 3   | Sprawdź wygląd navbara | Kolory navbara dostosowują się do nowego motywu |
| 4   | Sprawdź wygląd zawartości strony | Kolory zawartości strony dostosowują się do nowego motywu |
| 5   | Odśwież stronę | Ustawiony motyw pozostaje zachowany po odświeżeniu |
| 6   | Kliknij ponownie przełącznik | Motyw wraca do początkowego |