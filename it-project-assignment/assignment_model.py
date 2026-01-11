"""
Problem przydzialu pracownikow do zadan projektowych IT
Minimalizacja kosztow realizacji projektu oprogramowania ABC

Autor: Maciej Tyszczuk
"""

from pulp import *
import numpy as np

# =============================================================================
# DANE WEJSCIOWE
# =============================================================================

# Pracownicy
pracownicy = ['Anna', 'Bartek', 'Celina', 'Dawid', 'Ewa', 'Filip']
role = {
    'Anna': 'Senior Developer',
    'Bartek': 'Mid Developer',
    'Celina': 'Junior Developer',
    'Dawid': 'DevOps Engineer',
    'Ewa': 'QA Engineer',
    'Filip': 'UI/UX Designer'
}
stawki = {
    'Anna': 180,
    'Bartek': 120,
    'Celina': 80,
    'Dawid': 150,
    'Ewa': 100,
    'Filip': 130
}

# Zadania projektowe
zadania = ['Architektura', 'Backend', 'Frontend', 'BazaDanych', 'Testy', 'CICD']
nazwy_zadan = {
    'Architektura': 'Architektura systemu',
    'Backend': 'Backend API',
    'Frontend': 'Frontend aplikacji',
    'BazaDanych': 'Baza danych',
    'Testy': 'Testy automatyczne',
    'CICD': 'Wdrozenie CI/CD'
}
czas_bazowy = {
    'Architektura': 40,
    'Backend': 80,
    'Frontend': 60,
    'BazaDanych': 30,
    'Testy': 50,
    'CICD': 25
}

# Macierz efektywnosci (mnoznik czasu)
# Wiersz = pracownik, kolumna = zadanie
efektywnosc = {
    ('Anna', 'Architektura'): 1.0, ('Anna', 'Backend'): 1.1, ('Anna', 'Frontend'): 1.5,
    ('Anna', 'BazaDanych'): 1.2, ('Anna', 'Testy'): 1.8, ('Anna', 'CICD'): 1.4,

    ('Bartek', 'Architektura'): 1.5, ('Bartek', 'Backend'): 1.0, ('Bartek', 'Frontend'): 1.3,
    ('Bartek', 'BazaDanych'): 1.1, ('Bartek', 'Testy'): 1.6, ('Bartek', 'CICD'): 1.5,

    ('Celina', 'Architektura'): 2.5, ('Celina', 'Backend'): 1.4, ('Celina', 'Frontend'): 1.0,
    ('Celina', 'BazaDanych'): 1.8, ('Celina', 'Testy'): 1.4, ('Celina', 'CICD'): 2.0,

    ('Dawid', 'Architektura'): 1.3, ('Dawid', 'Backend'): 1.5, ('Dawid', 'Frontend'): 2.0,
    ('Dawid', 'BazaDanych'): 1.0, ('Dawid', 'Testy'): 1.5, ('Dawid', 'CICD'): 1.0,

    ('Ewa', 'Architektura'): 2.0, ('Ewa', 'Backend'): 1.8, ('Ewa', 'Frontend'): 1.6,
    ('Ewa', 'BazaDanych'): 1.7, ('Ewa', 'Testy'): 1.0, ('Ewa', 'CICD'): 1.6,

    ('Filip', 'Architektura'): 2.2, ('Filip', 'Backend'): 2.0, ('Filip', 'Frontend'): 1.1,
    ('Filip', 'BazaDanych'): 2.2, ('Filip', 'Testy'): 1.9, ('Filip', 'CICD'): 1.8,
}

# Obliczenie macierzy kosztow
# koszt = stawka * czas_bazowy * efektywnosc
koszty = {}
for p in pracownicy:
    for z in zadania:
        koszty[(p, z)] = stawki[p] * czas_bazowy[z] * efektywnosc[(p, z)]

# =============================================================================
# WYSWIETLENIE MACIERZY KOSZTOW
# =============================================================================

print("=" * 80)
print("MACIERZ KOSZTOW PRZYDZIALU (w zl)")
print("=" * 80)
print(f"\n{'Pracownik':<12}", end="")
for z in zadania:
    print(f"{z:<12}", end="")
print()
print("-" * 80)

for p in pracownicy:
    print(f"{p:<12}", end="")
    for z in zadania:
        print(f"{koszty[(p,z)]:<12.0f}", end="")
    print()
print()

# =============================================================================
# MODEL OPTYMALIZACYJNY
# =============================================================================

# Utworzenie problemu
model = LpProblem("Przydzial_Pracownikow_IT", LpMinimize)

# Zmienne decyzyjne (binarne)
x = LpVariable.dicts("x",
                     [(p, z) for p in pracownicy for z in zadania],
                     cat='Binary')

# Funkcja celu - minimalizacja kosztow
model += lpSum(koszty[(p, z)] * x[(p, z)]
               for p in pracownicy for z in zadania), "Calkowity_Koszt"

# Ograniczenia: kazdy pracownik przydzielony do dokladnie jednego zadania
for p in pracownicy:
    model += lpSum(x[(p, z)] for z in zadania) == 1, f"Pracownik_{p}"

# Ograniczenia: kazde zadanie przydzielone do dokladnie jednego pracownika
for z in zadania:
    model += lpSum(x[(p, z)] for p in pracownicy) == 1, f"Zadanie_{z}"

# =============================================================================
# ROZWIAZANIE
# =============================================================================

print("=" * 80)
print("ROZWIAZYWANIE MODELU...")
print("=" * 80)

model.solve(PULP_CBC_CMD(msg=0))

print(f"\nStatus: {LpStatus[model.status]}")
print(f"Minimalny koszt calkowity: {value(model.objective):,.0f} zl")

# =============================================================================
# WYNIKI
# =============================================================================

print("\n" + "=" * 80)
print("OPTYMALNY PRZYDZIAL PRACOWNIKOW")
print("=" * 80)

print(f"\n{'Pracownik':<12} {'Rola':<20} {'Zadanie':<20} {'Koszt (zl)':<12}")
print("-" * 70)

calkowity_koszt = 0
przydzial = {}

for p in pracownicy:
    for z in zadania:
        if value(x[(p, z)]) == 1:
            koszt = koszty[(p, z)]
            calkowity_koszt += koszt
            przydzial[p] = z
            print(f"{p:<12} {role[p]:<20} {nazwy_zadan[z]:<20} {koszt:>10,.0f}")

print("-" * 70)
print(f"{'RAZEM':<54} {calkowity_koszt:>10,.0f}")

# =============================================================================
# INTERPRETACJA DLA KLIENTA
# =============================================================================

print("\n" + "=" * 80)
print("INTERPRETACJA WYNIKOW (dla kierownika projektu)")
print("=" * 80)

print("""
Aby zminimalizowac koszty realizacji projektu oprogramowania ABC,
firma TechFlow Solutions powinna przydzielic pracownikow w nastepujacy sposob:
""")

for p in pracownicy:
    z = przydzial[p]
    czas = czas_bazowy[z] * efektywnosc[(p, z)]
    print(f"  - {p} ({role[p]}) -> {nazwy_zadan[z]}")
    print(f"    Szacowany czas: {czas:.0f}h, Koszt: {koszty[(p, z)]:,.0f} zl")
    print()

print(f"Calkowity koszt realizacji projektu: {calkowity_koszt:,.0f} zl")

# =============================================================================
# ANALIZA WRAZLIWOSCI
# =============================================================================

print("\n" + "=" * 80)
print("ANALIZA WRAZLIWOSCI")
print("=" * 80)

# Sprawdzmy co by bylo gdyby Anna byla niedostepna
print("\nScenariusz: Anna jest niedostepna (urlop/choroba)")
print("-" * 50)

# Nowy model bez Anny
pracownicy_bez_anny = [p for p in pracownicy if p != 'Anna']
zadania_bez_archit = [z for z in zadania if z != 'Architektura']

# Musimy dodac fikcyjnego pracownika lub zadanie
# Rozwiazanie: problem staje sie 5x6, wiec niektorzy robia 2 zadania
# Lub uzywamy zewnetrznego wykonawcy

print("Problem wymaga 6 pracownikow dla 6 zadan.")
print("Bez Anny firma musi zatrudnic zewnetrznego wykonawce lub")
print("jeden pracownik musi wykonac dodatkowe zadanie (nadgodziny).")

# Porownanie z przydzialem losowym
print("\nPorownanie z przydzialem 'intuicyjnym':")
print("-" * 50)

# Przydzial intuicyjny: kazdy robi to co wydaje sie naturalne
przydzial_intuicyjny = {
    'Anna': 'Architektura',  # Senior -> architektura
    'Bartek': 'Backend',      # Mid dev -> backend
    'Celina': 'Frontend',     # Junior -> frontend
    'Dawid': 'CICD',          # DevOps -> CI/CD
    'Ewa': 'Testy',           # QA -> testy
    'Filip': 'BazaDanych'     # UI/UX -> ? (nie pasuje, ale musi cos robic)
}

koszt_intuicyjny = sum(koszty[(p, z)] for p, z in przydzial_intuicyjny.items())
print(f"Koszt przydzialu 'intuicyjnego': {koszt_intuicyjny:,.0f} zl")
print(f"Koszt optymalny:                 {calkowity_koszt:,.0f} zl")
print(f"Oszczednosc dzieki optymalizacji: {koszt_intuicyjny - calkowity_koszt:,.0f} zl ({(koszt_intuicyjny - calkowity_koszt)/koszt_intuicyjny*100:.1f}%)")
