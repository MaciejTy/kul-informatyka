# Use Case: Przydział pracowników do projektu IT

## 1. Opis problemu (Story)

### Scenariusz biznesowy

Polska firma IT **TechFlow Solutions** z Warszawy otrzymała zlecenie na wytworzenie oprogramowania ABC dla klienta z branży e-commerce. Projekt składa się z sześciu zadań, które muszą zostać zrealizowane przez sześciu dostępnych pracowników. Każdy pracownik ma inną specjalizację, stawkę godzinową oraz różną efektywność przy różnych zadaniach.

**Problem:** Kierownik projektu musi zdecydować, którego pracownika przydzielić do którego zadania, aby:
- Każde zadanie było zrealizowane przez dokładnie jedną osobę
- Każdy pracownik pracował nad dokładnie jednym zadaniem
- **Zminimalizować całkowity koszt realizacji projektu**

### Dane zespołu projektowego

**Pracownicy:**
| ID | Imię | Rola | Stawka (zł/h) | Dostępność |
|----|------|------|---------------|------------|
| P1 | Anna | Senior Developer | 180 | 40h/tyg |
| P2 | Bartek | Mid Developer | 120 | 40h/tyg |
| P3 | Celina | Junior Developer | 80 | 40h/tyg |
| P4 | Dawid | DevOps Engineer | 150 | 32h/tyg |
| P5 | Ewa | QA Engineer | 100 | 40h/tyg |
| P6 | Filip | UI/UX Designer | 130 | 36h/tyg |

**Zadania projektowe:**
| ID | Zadanie | Czas bazowy (h) | Priorytet |
|----|---------|-----------------|-----------|
| Z1 | Architektura systemu | 40 | Krytyczny |
| Z2 | Backend API | 80 | Wysoki |
| Z3 | Frontend aplikacji | 60 | Wysoki |
| Z4 | Baza danych | 30 | Średni |
| Z5 | Testy automatyczne | 50 | Średni |
| Z6 | Wdrożenie CI/CD | 25 | Niski |

### Macierz efektywności

Każdy pracownik ma różną efektywność przy różnych zadaniach. Mnożnik > 1 oznacza, że zadanie zajmie więcej czasu niż bazowy.

|         | Architektura | Backend | Frontend | DB | Testy | CI/CD |
|---------|--------------|---------|----------|-----|-------|-------|
| Anna    | 1.0          | 1.1     | 1.5      | 1.2 | 1.8   | 1.4   |
| Bartek  | 1.5          | 1.0     | 1.3      | 1.1 | 1.6   | 1.5   |
| Celina  | 2.5          | 1.4     | 1.0      | 1.8 | 1.4   | 2.0   |
| Dawid   | 1.3          | 1.5     | 2.0      | 1.0 | 1.5   | 1.0   |
| Ewa     | 2.0          | 1.8     | 1.6      | 1.7 | 1.0   | 1.6   |
| Filip   | 2.2          | 2.0     | 1.1      | 2.2 | 1.9   | 1.8   |

*Efektywność 1.0 = pracownik pracuje w czasie bazowym; 1.5 = potrzebuje 50% więcej czasu*

### Macierz kosztów

**Wzór:** koszt = stawka × czas_bazowy × efektywność

|         | Z1 Arch. | Z2 Backend | Z3 Frontend | Z4 DB | Z5 Testy | Z6 CI/CD |
|---------|----------|------------|-------------|-------|----------|----------|
| Anna    | 7 200    | 15 840     | 16 200      | 6 480 | 16 200   | 6 300    |
| Bartek  | 7 200    | 9 600      | 9 360       | 3 960 | 9 600    | 4 500    |
| Celina  | 8 000    | 8 960      | 4 800       | 4 320 | 5 600    | 4 000    |
| Dawid   | 7 800    | 18 000     | 18 000      | 4 500 | 11 250   | 3 750    |
| Ewa     | 8 000    | 14 400     | 9 600       | 5 100 | 5 000    | 4 000    |
| Filip   | 11 440   | 20 800     | 8 580       | 8 580 | 12 350   | 5 850    |

---

## 2. Model matematyczny

### Typ problemu
**Problem przydziału (Assignment Problem)** - specjalny przypadek problemu transportowego, gdzie każdy pracownik przydzielony jest do dokładnie jednego zadania.

### Zmienne decyzyjne

$$x_{ij} \in \{0, 1\}$$

gdzie:
- $x_{ij} = 1$ jeśli pracownik $i$ jest przydzielony do zadania $j$
- $x_{ij} = 0$ w przeciwnym przypadku
- $i \in \{1, 2, 3, 4, 5, 6\}$ (pracownicy)
- $j \in \{1, 2, 3, 4, 5, 6\}$ (zadania)

**Łącznie: 36 zmiennych binarnych**

### Funkcja celu (minimalizacja)

$$\min Z = \sum_{i=1}^{6} \sum_{j=1}^{6} c_{ij} \cdot x_{ij}$$

gdzie $c_{ij}$ = koszt przydzielenia pracownika $i$ do zadania $j$

### Ograniczenia

**Każdy pracownik przydzielony do dokładnie jednego zadania:**
$$\sum_{j=1}^{6} x_{ij} = 1 \quad \forall i \in \{1,...,6\}$$

**Każde zadanie przydzielone do dokładnie jednego pracownika:**
$$\sum_{i=1}^{6} x_{ij} = 1 \quad \forall j \in \{1,...,6\}$$

**Ograniczenia binarne:**
$$x_{ij} \in \{0, 1\} \quad \forall i, j$$

---

## 3. Metoda rozwiązania

### Wybór metody: PuLP (ILP) + Metoda węgierska (ręcznie)

**Uzasadnienie wyboru:**

1. **Zmienne binarne** - problem wymaga całkowitoliczbowego programowania (ILP)
2. **Kwadratowa macierz** - idealny przypadek dla metody węgierskiej
3. **PuLP + CBC Solver** - szybkie rozwiązanie dla pełnego problemu 6×6
4. **Metoda węgierska** - możliwa do demonstracji ręcznej (przykład 3×3)

### Alternatywne metody:
- **Branch & Bound** - dla ogólnych problemów ILP
- **Metoda graficzna** - niemożliwa (36 zmiennych binarnych)
- **Simplex** - nie nadaje się bezpośrednio (zmienne binarne)

---

## 4. Wyniki

### Optymalny przydział pracowników

| Pracownik | Rola | Zadanie | Koszt (zł) |
|-----------|------|---------|------------|
| Anna | Senior Developer | Architektura systemu | 7 200 |
| Bartek | Mid Developer | Backend API | 9 600 |
| Celina | Junior Developer | Frontend aplikacji | 4 800 |
| Dawid | DevOps Engineer | Baza danych | 4 500 |
| Ewa | QA Engineer | Testy automatyczne | 5 000 |
| Filip | UI/UX Designer | Wdrożenie CI/CD | 5 850 |

### Minimalny koszt projektu

**Z = 36 950 zł**

### Weryfikacja ograniczeń

✅ Każdy pracownik → dokładnie 1 zadanie
✅ Każde zadanie → dokładnie 1 pracownik
✅ Wszystkie zmienne binarne (0 lub 1)

---

## 5. Interpretacja dla klienta

### Rekomendacja dla kierownika projektu:

> Aby **zminimalizować koszty** realizacji projektu oprogramowania ABC, firma TechFlow Solutions powinna przydzielić pracowników następująco:
>
> **Anna (Senior Developer)** → **Architektura systemu**
> - Uzasadnienie: Najwyższe kompetencje do zadania krytycznego
> - Szacowany czas: 40h, Koszt: 7 200 zł
>
> **Bartek (Mid Developer)** → **Backend API**
> - Uzasadnienie: Najlepsza efektywność w backendzie (mnożnik 1.0)
> - Szacowany czas: 80h, Koszt: 9 600 zł
>
> **Celina (Junior Developer)** → **Frontend aplikacji**
> - Uzasadnienie: Najniższy koszt dzięki niskiej stawce i wysokiej efektywności
> - Szacowany czas: 60h, Koszt: 4 800 zł
>
> **Dawid (DevOps)** → **Baza danych** *(zaskoczenie!)*
> - Uzasadnienie: Optymalne dopasowanie - niższy koszt niż przy CI/CD
> - Szacowany czas: 30h, Koszt: 4 500 zł
>
> **Ewa (QA Engineer)** → **Testy automatyczne**
> - Uzasadnienie: Naturalne dopasowanie - specjalistka od testów
> - Szacowany czas: 50h, Koszt: 5 000 zł
>
> **Filip (UI/UX)** → **Wdrożenie CI/CD** *(zaskoczenie!)*
> - Uzasadnienie: Po optymalizacji - tańsze niż frontend dla Filipa
> - Szacowany czas: 45h, Koszt: 5 850 zł
>
> **Całkowity koszt realizacji projektu: 36 950 zł**

### Porównanie z przydziałem "intuicyjnym"

| Przydzial | Koszt | Różnica |
|-----------|-------|---------|
| **Optymalny** | 36 950 zł | - |
| Intuicyjny* | 38 930 zł | +5.1% |

*Przydzial intuicyjny: Dawid→CI/CD, Filip→BazaDanych

**Oszczędność dzięki optymalizacji: 1 980 zł (5.1%)**

---

## 6. Dyskusja wyników

### Czy rozwiązanie jest realistyczne?

**TAK, z pewnymi zastrzeżeniami:**

**Realistyczne aspekty:**
- Senior Developer przy architekturze - standardowa praktyka
- Junior przy frontendzie - typowe w branży IT
- QA przy testach - naturalne dopasowanie

**Zaskakujące aspekty (wymagające wyjaśnienia):**
- **Dawid (DevOps) przy bazie danych** - nietypowe, ale DevOps często pracuje z infrastrukturą DB
- **Filip (UI/UX) przy CI/CD** - wymaga przeszkolenia, ale koszt nadal niższy

### Analiza wrażliwości

**Scenariusz 1: Anna niedostępna (urlop/choroba)**
- Problem: 5 pracowników, 6 zadań
- Rozwiązanie:
  - Zatrudnić zewnętrznego wykonawcę na architekturę
  - Lub: jeden pracownik wykonuje 2 zadania (nadgodziny)
- Szacunkowy wzrost kosztów: 20-30%

**Scenariusz 2: Wzrost stawek o 10%**
- Proporcjonalny wzrost kosztu
- Nowy koszt: 36 950 × 1.10 = **40 645 zł**
- Optymalny przydział pozostaje taki sam

**Scenariusz 3: Dodatkowe zadanie (np. dokumentacja)**
- Problem rozszerza się do 6×7
- Wymagana rekonfiguracja lub zatrudnienie

### Ograniczenia modelu

1. **1 pracownik = 1 zadanie** - w rzeczywistości mogą pracować nad wieloma
2. **Brak zależności czasowych** - niektóre zadania muszą być wykonane przed innymi
3. **Stałe efektywności** - w rzeczywistości zmieniają się z doświadczeniem
4. **Brak preferencji pracowników** - motywacja wpływa na jakość pracy
5. **Deterministyczny model** - brak niepewności (choroby, opóźnienia)

### Możliwe rozszerzenia

- Model wielookresowy (planowanie sprintów)
- Uwzględnienie zależności między zadaniami (graf projektu)
- Model z częściowymi przydziałami (pracownik może pracować nad wieloma zadaniami)
- Optymalizacja wielokryterialna (koszt + czas + jakość)

---

## 7. Rozwiązanie ręczne (3×3)

### Uproszczony problem

Dla demonstracji metody węgierskiej:
- 3 pracownicy: Anna, Bartek, Celina
- 3 zadania: Architektura, Backend, Frontend

### Macierz kosztów (tys. zł)

|         | Arch. | Backend | Frontend |
|---------|-------|---------|----------|
| Anna    | 7.2   | 15.8    | 16.2     |
| Bartek  | 7.2   | 9.6     | 9.4      |
| Celina  | 8.0   | 9.0     | 4.8      |

### Krok 1: Redukcja wierszy

Odejmij minimum z każdego wiersza:
- Anna: min = 7.2
- Bartek: min = 7.2
- Celina: min = 4.8

|         | Arch. | Backend | Frontend |
|---------|-------|---------|----------|
| Anna    | **0** | 8.6     | 9.0      |
| Bartek  | **0** | 2.4     | 2.2      |
| Celina  | 3.2   | 4.2     | **0**    |

### Krok 2: Redukcja kolumn

Odejmij minimum z każdej kolumny:
- Arch: min = 0
- Backend: min = 2.4
- Frontend: min = 0

|         | Arch. | Backend | Frontend |
|---------|-------|---------|----------|
| Anna    | **0** | 6.2     | 9.0      |
| Bartek  | **0** | **0**   | 2.2      |
| Celina  | 3.2   | 1.8     | **0**    |

### Krok 3: Optymalny przydział

- **Anna → Architektura** (jedyne 0 w wierszu po przydziale innych)
- **Bartek → Backend** (pozostałe 0)
- **Celina → Frontend** (jedyne 0 w kolumnie)

### Wynik 3×3

| Pracownik | Zadanie | Koszt |
|-----------|---------|-------|
| Anna | Architektura | 7 200 zł |
| Bartek | Backend | 9 600 zł |
| Celina | Frontend | 4 800 zł |
| **SUMA** | | **21 600 zł** |

---

## 8. Podsumowanie

| Kryterium | Opis | Status |
|-----------|------|--------|
| Model matematyczny | 36 zmiennych binarnych, funkcja liniowa, 12 ograniczeń | ✅ |
| Metoda rozwiązania | PuLP/ILP + metoda węgierska - uzasadniony wybór | ✅ |
| Rozwiązanie ręczne | Metoda węgierska dla problemu 3×3 | ✅ |
| Kod Python | assignment_model.py + .ipynb | ✅ |
| Wynik matematyczny | Z = 36 950 zł | ✅ |
| Interpretacja | Jasne rekomendacje dla kierownika | ✅ |
| Dyskusja | Realizm, wrażliwość, ograniczenia | ✅ |
| Prezentacja | 12 slajdów | ✅ |
