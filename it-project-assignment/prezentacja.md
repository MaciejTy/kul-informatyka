# Struktura prezentacji - Przydział pracowników IT

## Styl wizualny: Tech Brutalist

### Paleta kolorów:
- **Tło:** Jasny szary (#F8F9FA)
- **Akcent główny:** Czerwień (#E63946)
- **Akcent dodatkowy:** Granat (#1D3557)
- **Highlight:** Żółty (#FFD166)
- **Tekst:** Czerń (#212529)

### Typografia:
- **Nagłówki:** Courier New (monospace)
- **Treść:** Verdana/Tahoma

### Elementy:
- Grube czarne obramowania
- Ostre kąty (bez zaokrągleń)
- Styl "terminal/code editor"

---

## Slajd 1: Tytuł

**Tytuł:** Przydział pracowników do projektu IT

**Podtytuł:** Minimalizacja kosztów realizacji oprogramowania ABC

**Metadane:**
- Przedmiot: Metody Optymalizacji
- Problem: Assignment Problem (ILP)

**Elementy graficzne:**
- Fragment kodu w stylu terminala
- Logo "TechFlow Solutions"

---

## Slajd 2: Problem biznesowy

**Nagłówek:** Scenariusz

**Treść:**
Firma **TechFlow Solutions** z Warszawy realizuje projekt oprogramowania ABC.

**Wyzwanie:**
- 6 pracowników o różnych kompetencjach
- 6 zadań projektowych do wykonania
- Różne koszty przydziału (stawki × efektywność)

**Cel:** Zminimalizować całkowity koszt projektu

---

## Slajd 3: Dane wejściowe - Pracownicy

**Nagłówek:** Zespół projektowy

**Tabela:**
| ID | Pracownik | Rola | Stawka (zł/h) |
|----|-----------|------|---------------|
| P1 | Anna | Senior Developer | 180 |
| P2 | Bartek | Mid Developer | 120 |
| P3 | Celina | Junior Developer | 80 |
| P4 | Dawid | DevOps Engineer | 150 |
| P5 | Ewa | QA Engineer | 100 |
| P6 | Filip | UI/UX Designer | 130 |

---

## Slajd 4: Dane wejściowe - Zadania

**Nagłówek:** Zadania projektowe

**Tabela:**
| ID | Zadanie | Czas bazowy (h) |
|----|---------|-----------------|
| Z1 | Architektura systemu | 40 |
| Z2 | Backend API | 80 |
| Z3 | Frontend aplikacji | 60 |
| Z4 | Baza danych | 30 |
| Z5 | Testy automatyczne | 50 |
| Z6 | Wdrożenie CI/CD | 25 |

---

## Slajd 5: Macierz kosztów

**Nagłówek:** Koszty przydziału (zł)

**Wzór:** koszt = stawka × czas × efektywność

**Macierz 6×6 z kolorystycznym oznaczeniem:**
- Zielony: niski koszt
- Żółty: średni koszt
- Czerwony: wysoki koszt

---

## Slajd 6: Model matematyczny

**Nagłówek:** Zmienne decyzyjne i funkcja celu

**Treść:**
```
x_ij ∈ {0, 1}

min Z = Σᵢ Σⱼ cᵢⱼ · xᵢⱼ
```

**Ograniczenia:**
- Σⱼ xᵢⱼ = 1 (każdy pracownik → 1 zadanie)
- Σᵢ xᵢⱼ = 1 (każde zadanie → 1 pracownik)

---

## Slajd 7: Metoda rozwiązania

**Nagłówek:** Metoda węgierska + PuLP

**Dwa podejścia:**

1. **Ręcznie:** Metoda węgierska (O(n³))
   - Redukcja wierszy/kolumn
   - Pokrycie zer liniami

2. **Programowo:** PuLP (CBC Solver)
   - Integer Linear Programming
   - Zmienne binarne

---

## Slajd 8: Rozwiązanie ręczne (3×3)

**Nagłówek:** Przykład metody węgierskiej

**Uproszczona macierz 3×3:**

Krok 1: Redukcja wierszy
Krok 2: Redukcja kolumn
Krok 3: Przydział zer

**Wynik:** Anna→Archit., Bartek→Backend, Celina→Frontend

---

## Slajd 9: Wyniki optymalizacji

**Nagłówek:** Optymalny przydział

**Tabela wyników:**
| Pracownik | Zadanie | Koszt |
|-----------|---------|-------|
| Anna | Architektura systemu | 7 200 zł |
| Bartek | Backend API | 9 600 zł |
| Celina | Frontend aplikacji | 4 800 zł |
| Dawid | Baza danych | 4 500 zł |
| Ewa | Testy automatyczne | 5 000 zł |
| Filip | Wdrożenie CI/CD | 5 850 zł |

**KOSZT CAŁKOWITY: 36 950 zł**

---

## Slajd 10: Interpretacja

**Nagłówek:** Rekomendacja dla kierownika

**Kluczowe wnioski:**
- Senior Developer (Anna) → zadanie krytyczne (Architektura)
- DevOps (Dawid) optymalnie przy bazie danych (nie CI/CD!)
- Junior (Celina) przy frontencie → najniższy koszt

**Oszczędność:** 5.1% vs przydział intuicyjny

---

## Slajd 11: Analiza wrażliwości

**Nagłówek:** Co jeśli...?

**Scenariusze:**
1. Anna niedostępna → potrzeba zewnętrznego wykonawcy
2. Wzrost stawek o 10% → proporcjonalny wzrost kosztu
3. Dodatkowe zadanie → rozszerzenie do 6×7

**Ograniczenia modelu:**
- 1 pracownik = 1 zadanie
- Brak zależności czasowych

---

## Slajd 12: Wnioski

**Nagłówek:** Podsumowanie

**Główne punkty:**
1. ✅ Model matematyczny zdefiniowany poprawnie
2. ✅ Metoda węgierska dla małych problemów
3. ✅ PuLP dla pełnego rozwiązania
4. ✅ Koszt minimalny: **36 950 zł**

**Technologie:** Python, PuLP, CBC Solver

---

## Załączniki

- `assignment_model.py` - kod źródłowy
- `assignment_model.ipynb` - notebook interaktywny
- `manual_solution.md` - rozwiązanie ręczne
