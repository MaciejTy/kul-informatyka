# Przydział pracowników do projektu IT

## Projekt zaliczeniowy - Metody Optymalizacji

**Typ problemu:** Problem przydziału (Assignment Problem / Integer Linear Programming)

**Cel:** Minimalizacja całkowitych kosztów realizacji projektu oprogramowania ABC

---

## Wyniki optymalizacji

**Minimalny koszt realizacji: 36 950 zł**

| Pracownik | Rola | Zadanie | Koszt |
|-----------|------|---------|-------|
| Anna | Senior Developer | Architektura systemu | 7 200 zł |
| Bartek | Mid Developer | Backend API | 9 600 zł |
| Celina | Junior Developer | Frontend aplikacji | 4 800 zł |
| Dawid | DevOps Engineer | Baza danych | 4 500 zł |
| Ewa | QA Engineer | Testy automatyczne | 5 000 zł |
| Filip | UI/UX Designer | Wdrożenie CI/CD | 5 850 zł |

**Oszczędność vs przydział intuicyjny: 1 980 zł (5.1%)**

---

## Opis problemu

Firma TechFlow Solutions z Warszawy realizuje projekt oprogramowania ABC. Kierownik projektu musi optymalnie przydzielić 6 pracowników do 6 zadań projektowych.

**Pracownicy (z różnymi stawkami):**
- Anna (Senior Dev, 180 zł/h), Bartek (Mid Dev, 120 zł/h), Celina (Junior Dev, 80 zł/h)
- Dawid (DevOps, 150 zł/h), Ewa (QA, 100 zł/h), Filip (UI/UX, 130 zł/h)

**Zadania projektowe:**
- Architektura (40h), Backend (80h), Frontend (60h), DB (30h), Testy (50h), CI/CD (25h)

---

## Struktura projektu

```
it-project-assignment/
├── assignment_model.py      # Kod Python z PuLP
├── assignment_model.ipynb   # Jupyter notebook
├── manual_solution.md       # Metoda węgierska (3×3)
├── use_case.md              # Szczegółowy opis use case
├── prezentacja.md           # Struktura prezentacji
├── prezentacja.pptx         # Prezentacja PowerPoint (12 slajdów)
├── workspace/               # Pliki robocze
└── README.md
```

---

## Uruchomienie

### Wymagania
```bash
pip install pulp pandas numpy
```

### Kod Python
```bash
python assignment_model.py
```

### Jupyter Notebook
```bash
jupyter notebook assignment_model.ipynb
```

---

## Model matematyczny

### Zmienne decyzyjne
x_ij ∈ {0, 1} - czy pracownik i przydzielony do zadania j (36 zmiennych binarnych)

### Funkcja celu
min Z = Σᵢ Σⱼ cᵢⱼ · xᵢⱼ

### Ograniczenia
- Każdy pracownik → dokładnie 1 zadanie: Σⱼ xᵢⱼ = 1 (6 ograniczeń)
- Każde zadanie → dokładnie 1 pracownik: Σᵢ xᵢⱼ = 1 (6 ograniczeń)
- Zmienne binarne: xᵢⱼ ∈ {0, 1}

---

## Metoda rozwiązania

1. **Programowo:** PuLP + CBC Solver (Integer Linear Programming)
2. **Ręcznie:** Metoda węgierska (uproszczony przykład 3×3)

---

## Zgodność z wymaganiami projektu

| Kryterium | Waga | Status |
|-----------|------|--------|
| Model matematyczny | 30% | ✅ Zmienne binarne, funkcja celu, ograniczenia |
| Dobór i zastosowanie metody | 20% | ✅ PuLP (ILP) + metoda węgierska |
| Poprawność kodu | 20% | ✅ .py + .ipynb działające |
| Prezentacja i interpretacja | 20% | ✅ 12 slajdów z wymaganymi elementami |
| Dyskusja i wnioski | 10% | ✅ Analiza wrażliwości w kodzie |

---

## Technologie

- Python 3.x
- PuLP (programowanie całkowitoliczbowe)
- CBC Solver
- PptxGenJS (prezentacja)

---

## Autor

Projekt zaliczeniowy z przedmiotu **Metody Optymalizacji** - KUL
