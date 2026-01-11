# Rozwiązanie ręczne - Metoda węgierska

## Problem uproszczony (3×3)

Dla demonstracji metody węgierskiej rozważmy uproszczony problem:
- **3 pracowników:** Anna, Bartek, Celina
- **3 zadania:** Architektura, Backend, Frontend

### Macierz kosztów (w tys. zł)

|           | Architektura | Backend | Frontend |
|-----------|--------------|---------|----------|
| Anna      | 7.2          | 15.8    | 16.2     |
| Bartek    | 7.2          | 9.6     | 9.4      |
| Celina    | 8.0          | 9.0     | 4.8      |

---

## Krok 1: Redukcja wierszy

Odejmujemy minimum z każdego wiersza:

- **Anna:** min = 7.2 → odejmujemy 7.2
- **Bartek:** min = 7.2 → odejmujemy 7.2
- **Celina:** min = 4.8 → odejmujemy 4.8

### Macierz po redukcji wierszy:

|           | Architektura | Backend | Frontend |
|-----------|--------------|---------|----------|
| Anna      | **0**        | 8.6     | 9.0      |
| Bartek    | **0**        | 2.4     | 2.2      |
| Celina    | 3.2          | 4.2     | **0**    |

---

## Krok 2: Redukcja kolumn

Odejmujemy minimum z każdej kolumny:

- **Architektura:** min = 0 → bez zmian
- **Backend:** min = 2.4 → odejmujemy 2.4
- **Frontend:** min = 0 → bez zmian

### Macierz po redukcji kolumn:

|           | Architektura | Backend | Frontend |
|-----------|--------------|---------|----------|
| Anna      | **0**        | 6.2     | 9.0      |
| Bartek    | **0**        | **0**   | 2.2      |
| Celina    | 3.2          | 1.8     | **0**    |

---

## Krok 3: Wyznaczenie optymalnego przydziału

Szukamy zer tak, aby każdy wiersz i kolumna miały dokładnie jedno zero.

### Analiza:
1. **Celina** → Frontend (jedyne 0 w kolumnie Frontend)
2. **Anna** → Architektura (jedyne 0 po wykreśleniu Celiny)
3. **Bartek** → Backend (pozostałe)

### Optymalny przydział:

| Pracownik | Zadanie      | Koszt (zł) |
|-----------|--------------|------------|
| Anna      | Architektura | 7 200      |
| Bartek    | Backend      | 9 600      |
| Celina    | Frontend     | 4 800      |
| **SUMA**  |              | **21 600** |

---

## Weryfikacja

Sprawdźmy czy istnieje lepsze rozwiązanie:

### Alternatywne przydziały:

1. **Anna→Backend, Bartek→Archit., Celina→Frontend:**
   - 15 800 + 7 200 + 4 800 = 27 800 zł ❌

2. **Anna→Frontend, Bartek→Backend, Celina→Archit.:**
   - 16 200 + 9 600 + 8 000 = 33 800 zł ❌

3. **Anna→Archit., Bartek→Frontend, Celina→Backend:**
   - 7 200 + 9 400 + 9 000 = 25 600 zł ❌

**Wniosek:** Rozwiązanie metodą węgierską (21 600 zł) jest rzeczywiście optymalne!

---

## Podsumowanie metody węgierskiej

### Algorytm:
1. **Redukcja wierszy** - odejmij minimum z każdego wiersza
2. **Redukcja kolumn** - odejmij minimum z każdej kolumny
3. **Pokrycie zer** - znajdź minimalne pokrycie zer liniami
4. **Jeśli liczba linii = n** → mamy rozwiązanie optymalne
5. **Jeśli nie** → modyfikuj macierz i wróć do kroku 3

### Złożoność: O(n³)

### Zalety:
- Gwarantuje znalezienie optimum globalnego
- Nie wymaga iteracyjnego przeszukiwania
- Intuicyjny dla małych problemów

### Wady:
- Pracochłonny dla dużych macierzy (n > 5)
- Dla większych problemów lepiej użyć solvera (PuLP)
