/**
 * Brutalist-style Presentation Generator
 * IT Staff Assignment Optimization Problem
 *
 * Design: Tech Brutalist
 * - Light background, monospace fonts
 * - Sharp edges, thick borders
 * - Red/Navy/Yellow accents
 */

const pptxgen = require('pptxgenjs');
const fs = require('fs');
const path = require('path');

// Color palette (without # for PptxGenJS)
const COLORS = {
    BG_LIGHT: 'F8F9FA',      // Light gray background
    RED: 'E63946',            // Accent red
    NAVY: '1D3557',           // Dark navy
    YELLOW: 'FFD166',         // Highlight yellow
    TEXT_DARK: '212529',      // Dark text
    TEXT_LIGHT: 'FFFFFF',     // White text
    BORDER: '212529',         // Black border
    TABLE_HEADER: '1D3557',   // Navy header
    TABLE_ALT: 'E9ECEF',      // Alternating row
    SUCCESS: '2ECC71',        // Green for highlights
};

// Create presentation
const pptx = new pptxgen();
pptx.layout = 'LAYOUT_16x9';
pptx.title = 'Przydział pracowników do projektu IT';
pptx.author = 'Student';
pptx.subject = 'Metody Optymalizacji';
pptx.theme = { headFontFace: 'Courier New', bodyFontFace: 'Verdana' };

// Helper functions
function addBrutalistSlide(title, slideNum, totalSlides = 12) {
    const slide = pptx.addSlide();

    // Light background
    slide.background = { color: COLORS.BG_LIGHT };

    // Top red accent bar
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0, y: 0, w: '100%', h: 0.15,
        fill: { color: COLORS.RED },
        line: { color: COLORS.RED }
    });

    // Left navy sidebar (narrow)
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0, y: 0.15, w: 0.08, h: 5.48,
        fill: { color: COLORS.NAVY },
        line: { color: COLORS.NAVY }
    });

    // Title with thick underline
    if (title) {
        slide.addText(title, {
            x: 0.4, y: 0.3, w: 9.2, h: 0.6,
            fontFace: 'Courier New',
            fontSize: 28,
            bold: true,
            color: COLORS.TEXT_DARK
        });

        // Thick underline
        slide.addShape(pptx.shapes.RECTANGLE, {
            x: 0.4, y: 0.85, w: 3.5, h: 0.06,
            fill: { color: COLORS.RED },
            line: { color: COLORS.RED }
        });
    }

    // Slide number
    slide.addText(`${slideNum}/${totalSlides}`, {
        x: 9, y: 5.2, w: 0.8, h: 0.3,
        fontFace: 'Courier New',
        fontSize: 12,
        color: COLORS.NAVY,
        align: 'right'
    });

    return slide;
}

function addCodeBlock(slide, text, x, y, w, h) {
    // Dark code block background
    slide.addShape(pptx.shapes.RECTANGLE, {
        x, y, w, h,
        fill: { color: COLORS.NAVY },
        line: { color: COLORS.BORDER, pt: 2 }
    });

    slide.addText(text, {
        x: x + 0.15, y: y + 0.1, w: w - 0.3, h: h - 0.2,
        fontFace: 'Courier New',
        fontSize: 11,
        color: COLORS.TEXT_LIGHT,
        valign: 'top'
    });
}

function addCard(slide, x, y, w, h, borderColor = COLORS.BORDER) {
    slide.addShape(pptx.shapes.RECTANGLE, {
        x, y, w, h,
        fill: { color: 'FFFFFF' },
        line: { color: borderColor, pt: 3 }
    });
}

function addHighlightBox(slide, text, x, y, w, h) {
    slide.addShape(pptx.shapes.RECTANGLE, {
        x, y, w, h,
        fill: { color: COLORS.YELLOW },
        line: { color: COLORS.BORDER, pt: 2 }
    });

    slide.addText(text, {
        x, y, w, h,
        fontFace: 'Courier New',
        fontSize: 18,
        bold: true,
        color: COLORS.TEXT_DARK,
        align: 'center',
        valign: 'middle'
    });
}

// ============================================================================
// SLIDE 1: Title
// ============================================================================
function createTitleSlide() {
    const slide = pptx.addSlide();
    slide.background = { color: COLORS.NAVY };

    // Large red block
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0, y: 0, w: 4, h: 5.63,
        fill: { color: COLORS.RED },
        line: { color: COLORS.RED }
    });

    // Yellow accent stripe
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 3.85, y: 1.5, w: 0.3, h: 2.5,
        fill: { color: COLORS.YELLOW },
        line: { color: COLORS.YELLOW }
    });

    // Title text
    slide.addText('PRZYDZIAŁ\nPRACOWNIKÓW\nDO PROJEKTU IT', {
        x: 0.4, y: 1.2, w: 3.2, h: 2.5,
        fontFace: 'Courier New',
        fontSize: 26,
        bold: true,
        color: COLORS.TEXT_LIGHT,
        lineSpacing: 36
    });

    // Subtitle
    slide.addText('Minimalizacja kosztów\nrealizacji oprogramowania ABC', {
        x: 4.5, y: 1.5, w: 5, h: 1.2,
        fontFace: 'Verdana',
        fontSize: 20,
        color: COLORS.TEXT_LIGHT,
        lineSpacing: 28
    });

    // Code snippet decoration
    const codeText = '> python assignment_model.py\n> Status: Optimal\n> Min cost: 36,950 PLN';
    slide.addText(codeText, {
        x: 4.5, y: 3, w: 4.5, h: 1.2,
        fontFace: 'Courier New',
        fontSize: 14,
        color: COLORS.YELLOW
    });

    // Course info
    slide.addText('Metody Optymalizacji | Problem Przydziału (ILP)', {
        x: 4.5, y: 4.8, w: 5, h: 0.4,
        fontFace: 'Verdana',
        fontSize: 12,
        color: COLORS.TEXT_LIGHT
    });
}

// ============================================================================
// SLIDE 2: Problem Description
// ============================================================================
function createProblemSlide() {
    const slide = addBrutalistSlide('SCENARIUSZ BIZNESOWY', 2);

    // Story card
    addCard(slide, 0.4, 1.1, 5.8, 2.8, COLORS.NAVY);

    slide.addText('TechFlow Solutions', {
        x: 0.6, y: 1.25, w: 5.4, h: 0.4,
        fontFace: 'Courier New',
        fontSize: 18,
        bold: true,
        color: COLORS.NAVY
    });

    slide.addText([
        { text: 'Polska firma IT z Warszawy realizuje projekt\n', options: { breakLine: true } },
        { text: 'oprogramowania ABC dla klienta e-commerce.\n\n', options: { breakLine: true } },
        { text: 'Kierownik projektu musi optymalnie przydzielić\n', options: { breakLine: true } },
        { text: 'pracowników do zadań, minimalizując koszty.', options: {} }
    ], {
        x: 0.6, y: 1.7, w: 5.4, h: 2,
        fontFace: 'Verdana',
        fontSize: 13,
        color: COLORS.TEXT_DARK,
        lineSpacing: 20
    });

    // Key numbers
    slide.addText('6', {
        x: 6.5, y: 1.3, w: 1.2, h: 1,
        fontFace: 'Courier New',
        fontSize: 48,
        bold: true,
        color: COLORS.RED,
        align: 'center'
    });
    slide.addText('pracowników', {
        x: 6.3, y: 2.2, w: 1.6, h: 0.4,
        fontFace: 'Verdana',
        fontSize: 11,
        color: COLORS.TEXT_DARK,
        align: 'center'
    });

    slide.addText('6', {
        x: 8, y: 1.3, w: 1.2, h: 1,
        fontFace: 'Courier New',
        fontSize: 48,
        bold: true,
        color: COLORS.NAVY,
        align: 'center'
    });
    slide.addText('zadań', {
        x: 7.8, y: 2.2, w: 1.6, h: 0.4,
        fontFace: 'Verdana',
        fontSize: 11,
        color: COLORS.TEXT_DARK,
        align: 'center'
    });

    // Challenge box
    addHighlightBox(slide, 'CEL: Minimalizacja kosztu projektu', 6.3, 2.8, 3.3, 0.6);

    // Constraints list
    slide.addText('Ograniczenia:', {
        x: 0.4, y: 4.1, w: 9, h: 0.35,
        fontFace: 'Courier New',
        fontSize: 14,
        bold: true,
        color: COLORS.TEXT_DARK
    });

    slide.addText([
        { text: '• Każdy pracownik = dokładnie 1 zadanie\n', options: {} },
        { text: '• Każde zadanie = dokładnie 1 pracownik\n', options: {} },
        { text: '• Różne stawki i efektywności', options: {} }
    ], {
        x: 0.4, y: 4.5, w: 9, h: 1,
        fontFace: 'Verdana',
        fontSize: 12,
        color: COLORS.TEXT_DARK,
        lineSpacing: 18
    });
}

// ============================================================================
// SLIDE 3: Team Data
// ============================================================================
function createTeamSlide() {
    const slide = addBrutalistSlide('ZESPÓŁ PROJEKTOWY', 3);

    const teamData = [
        [
            { text: 'ID', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT, bold: true } },
            { text: 'Pracownik', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT, bold: true } },
            { text: 'Rola', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT, bold: true } },
            { text: 'Stawka (zł/h)', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT, bold: true } }
        ],
        ['P1', 'Anna', 'Senior Developer', '180'],
        ['P2', 'Bartek', 'Mid Developer', '120'],
        ['P3', 'Celina', 'Junior Developer', '80'],
        ['P4', 'Dawid', 'DevOps Engineer', '150'],
        ['P5', 'Ewa', 'QA Engineer', '100'],
        ['P6', 'Filip', 'UI/UX Designer', '130']
    ];

    slide.addTable(teamData, {
        x: 0.4, y: 1.2, w: 5.5, h: 3.2,
        colW: [0.6, 1.4, 2.2, 1.3],
        fontFace: 'Verdana',
        fontSize: 11,
        border: { pt: 2, color: COLORS.BORDER },
        align: 'center',
        valign: 'middle'
    });

    // Insight box
    addCard(slide, 6.2, 1.2, 3.4, 2, COLORS.RED);

    slide.addText('Kluczowe różnice', {
        x: 6.4, y: 1.35, w: 3, h: 0.35,
        fontFace: 'Courier New',
        fontSize: 14,
        bold: true,
        color: COLORS.RED
    });

    slide.addText([
        { text: 'Najwyższa stawka:\n', options: { bold: true } },
        { text: 'Anna (180 zł/h)\n\n', options: {} },
        { text: 'Najniższa stawka:\n', options: { bold: true } },
        { text: 'Celina (80 zł/h)', options: {} }
    ], {
        x: 6.4, y: 1.75, w: 3, h: 1.3,
        fontFace: 'Verdana',
        fontSize: 11,
        color: COLORS.TEXT_DARK,
        lineSpacing: 16
    });

    // Note
    slide.addText('Stawka ≠ efektywność dla każdego zadania', {
        x: 0.4, y: 4.6, w: 9, h: 0.35,
        fontFace: 'Verdana',
        fontSize: 12,
        italic: true,
        color: COLORS.NAVY
    });
}

// ============================================================================
// SLIDE 4: Tasks Data
// ============================================================================
function createTasksSlide() {
    const slide = addBrutalistSlide('ZADANIA PROJEKTOWE', 4);

    const taskData = [
        [
            { text: 'ID', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT, bold: true } },
            { text: 'Zadanie', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT, bold: true } },
            { text: 'Czas bazowy (h)', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT, bold: true } },
            { text: 'Priorytet', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT, bold: true } }
        ],
        ['Z1', 'Architektura systemu', '40', { text: 'KRYTYCZNY', options: { color: COLORS.RED, bold: true } }],
        ['Z2', 'Backend API', '80', 'Wysoki'],
        ['Z3', 'Frontend aplikacji', '60', 'Wysoki'],
        ['Z4', 'Baza danych', '30', 'Średni'],
        ['Z5', 'Testy automatyczne', '50', 'Średni'],
        ['Z6', 'Wdrożenie CI/CD', '25', 'Niski']
    ];

    slide.addTable(taskData, {
        x: 0.4, y: 1.2, w: 6.8, h: 3.2,
        colW: [0.6, 2.4, 1.6, 1.5],
        fontFace: 'Verdana',
        fontSize: 11,
        border: { pt: 2, color: COLORS.BORDER },
        align: 'center',
        valign: 'middle'
    });

    // Time summary
    slide.addText('Σ = 285h', {
        x: 7.5, y: 1.5, w: 2, h: 0.8,
        fontFace: 'Courier New',
        fontSize: 32,
        bold: true,
        color: COLORS.NAVY,
        align: 'center'
    });
    slide.addText('łączny czas bazowy', {
        x: 7.5, y: 2.2, w: 2, h: 0.4,
        fontFace: 'Verdana',
        fontSize: 10,
        color: COLORS.TEXT_DARK,
        align: 'center'
    });

    // Formula
    slide.addText('Koszt = Stawka × Czas × Efektywność', {
        x: 0.4, y: 4.6, w: 9, h: 0.35,
        fontFace: 'Courier New',
        fontSize: 14,
        bold: true,
        color: COLORS.RED
    });
}

// ============================================================================
// SLIDE 5: Cost Matrix
// ============================================================================
function createCostMatrixSlide() {
    const slide = addBrutalistSlide('MACIERZ KOSZTÓW (zł)', 5);

    const costData = [
        [
            { text: '', options: { fill: { color: COLORS.TABLE_HEADER } } },
            { text: 'Z1', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT, bold: true } },
            { text: 'Z2', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT, bold: true } },
            { text: 'Z3', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT, bold: true } },
            { text: 'Z4', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT, bold: true } },
            { text: 'Z5', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT, bold: true } },
            { text: 'Z6', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT, bold: true } }
        ],
        [{ text: 'Anna', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT, bold: true } },
         { text: '7 200', options: { fill: { color: COLORS.SUCCESS }, bold: true } }, '15 840', '16 200', '6 480', '16 200', '6 300'],
        [{ text: 'Bartek', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT, bold: true } },
         '7 200', { text: '9 600', options: { fill: { color: COLORS.SUCCESS }, bold: true } }, '9 360', '3 960', '9 600', '4 500'],
        [{ text: 'Celina', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT, bold: true } },
         '8 000', '8 960', { text: '4 800', options: { fill: { color: COLORS.SUCCESS }, bold: true } }, '4 320', '5 600', '4 000'],
        [{ text: 'Dawid', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT, bold: true } },
         '7 800', '18 000', '18 000', { text: '4 500', options: { fill: { color: COLORS.SUCCESS }, bold: true } }, '11 250', '3 750'],
        [{ text: 'Ewa', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT, bold: true } },
         '8 000', '14 400', '9 600', '5 100', { text: '5 000', options: { fill: { color: COLORS.SUCCESS }, bold: true } }, '4 000'],
        [{ text: 'Filip', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT, bold: true } },
         '11 440', '20 800', '8 580', '8 580', '12 350', { text: '5 850', options: { fill: { color: COLORS.SUCCESS }, bold: true } }]
    ];

    slide.addTable(costData, {
        x: 0.4, y: 1.15, w: 9.2, h: 3.0,
        colW: [1.1, 1.35, 1.35, 1.35, 1.35, 1.35, 1.35],
        fontFace: 'Courier New',
        fontSize: 11,
        border: { pt: 2, color: COLORS.BORDER },
        align: 'center',
        valign: 'middle'
    });

    // Legend
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0.4, y: 4.4, w: 0.3, h: 0.3,
        fill: { color: COLORS.SUCCESS },
        line: { color: COLORS.BORDER, pt: 1 }
    });
    slide.addText('= optymalny przydział', {
        x: 0.8, y: 4.4, w: 3, h: 0.3,
        fontFace: 'Verdana',
        fontSize: 11,
        color: COLORS.TEXT_DARK
    });

    slide.addText('c_ij = stawka_i × czas_j × efektywność_ij', {
        x: 5, y: 4.4, w: 4.5, h: 0.3,
        fontFace: 'Courier New',
        fontSize: 11,
        color: COLORS.NAVY
    });
}

// ============================================================================
// SLIDE 6: Mathematical Model
// ============================================================================
function createModelSlide() {
    const slide = addBrutalistSlide('MODEL MATEMATYCZNY', 6);

    // Variables section
    slide.addText('Zmienne decyzyjne', {
        x: 0.4, y: 1.15, w: 4.5, h: 0.35,
        fontFace: 'Courier New',
        fontSize: 14,
        bold: true,
        color: COLORS.RED
    });

    addCodeBlock(slide, 'x_ij ∈ {0, 1}\n\nx_ij = 1  jeśli pracownik i\n          przydzielony do zadania j\nx_ij = 0  w przeciwnym przypadku',
        0.4, 1.55, 4.5, 1.4);

    // Objective function
    slide.addText('Funkcja celu', {
        x: 5.2, y: 1.15, w: 4.5, h: 0.35,
        fontFace: 'Courier New',
        fontSize: 14,
        bold: true,
        color: COLORS.RED
    });

    addCodeBlock(slide, 'min Z = Σᵢ Σⱼ cᵢⱼ · xᵢⱼ\n\nMinimalizacja całkowitego\nkosztu przydziału',
        5.2, 1.55, 4.4, 1.4);

    // Constraints
    slide.addText('Ograniczenia', {
        x: 0.4, y: 3.15, w: 9, h: 0.35,
        fontFace: 'Courier New',
        fontSize: 14,
        bold: true,
        color: COLORS.RED
    });

    addCard(slide, 0.4, 3.55, 4.5, 1.5, COLORS.NAVY);
    slide.addText('Każdy pracownik → 1 zadanie', {
        x: 0.55, y: 3.65, w: 4.2, h: 0.35,
        fontFace: 'Verdana',
        fontSize: 11,
        bold: true,
        color: COLORS.NAVY
    });
    slide.addText('Σⱼ xᵢⱼ = 1   ∀i ∈ {1,...,6}', {
        x: 0.55, y: 4.1, w: 4.2, h: 0.4,
        fontFace: 'Courier New',
        fontSize: 14,
        color: COLORS.TEXT_DARK
    });

    addCard(slide, 5.1, 3.55, 4.5, 1.5, COLORS.NAVY);
    slide.addText('Każde zadanie → 1 pracownik', {
        x: 5.25, y: 3.65, w: 4.2, h: 0.35,
        fontFace: 'Verdana',
        fontSize: 11,
        bold: true,
        color: COLORS.NAVY
    });
    slide.addText('Σᵢ xᵢⱼ = 1   ∀j ∈ {1,...,6}', {
        x: 5.25, y: 4.1, w: 4.2, h: 0.4,
        fontFace: 'Courier New',
        fontSize: 14,
        color: COLORS.TEXT_DARK
    });
}

// ============================================================================
// SLIDE 7: Solution Method
// ============================================================================
function createMethodSlide() {
    const slide = addBrutalistSlide('METODA ROZWIĄZANIA', 7);

    // Hungarian method card
    addCard(slide, 0.4, 1.15, 4.5, 2.3, COLORS.RED);

    slide.addText('01 METODA WĘGIERSKA', {
        x: 0.55, y: 1.3, w: 4.2, h: 0.35,
        fontFace: 'Courier New',
        fontSize: 14,
        bold: true,
        color: COLORS.RED
    });

    slide.addText([
        { text: 'Algorytm dla problemu przydziału\n\n', options: {} },
        { text: 'Kroki:\n', options: { bold: true } },
        { text: '1. Redukcja wierszy\n', options: {} },
        { text: '2. Redukcja kolumn\n', options: {} },
        { text: '3. Pokrycie zer liniami\n', options: {} },
        { text: '4. Optymalizacja\n\n', options: {} },
        { text: 'Złożoność: O(n³)', options: { bold: true } }
    ], {
        x: 0.55, y: 1.75, w: 4.2, h: 2,
        fontFace: 'Verdana',
        fontSize: 11,
        color: COLORS.TEXT_DARK,
        lineSpacing: 16
    });

    // PuLP card
    addCard(slide, 5.1, 1.15, 4.5, 2.3, COLORS.NAVY);

    slide.addText('02 PuLP (ILP SOLVER)', {
        x: 5.25, y: 1.3, w: 4.2, h: 0.35,
        fontFace: 'Courier New',
        fontSize: 14,
        bold: true,
        color: COLORS.NAVY
    });

    slide.addText([
        { text: 'Python + CBC Solver\n\n', options: {} },
        { text: 'Zalety:\n', options: { bold: true } },
        { text: '• Szybkie rozwiązanie\n', options: {} },
        { text: '• Zmienne binarne\n', options: {} },
        { text: '• Analiza wrażliwości\n', options: {} },
        { text: '• Skalowalne\n\n', options: {} },
        { text: 'Czas: < 1 sekunda', options: { bold: true } }
    ], {
        x: 5.25, y: 1.75, w: 4.2, h: 2,
        fontFace: 'Verdana',
        fontSize: 11,
        color: COLORS.TEXT_DARK,
        lineSpacing: 16
    });

    // Comparison arrow
    slide.addText('RĘCZNIE', {
        x: 1.8, y: 3.6, w: 1.5, h: 0.3,
        fontFace: 'Courier New',
        fontSize: 10,
        color: COLORS.RED,
        align: 'center'
    });

    slide.addText('→', {
        x: 4.6, y: 3.5, w: 0.8, h: 0.5,
        fontFace: 'Courier New',
        fontSize: 24,
        color: COLORS.TEXT_DARK,
        align: 'center'
    });

    slide.addText('PROGRAMOWO', {
        x: 6.5, y: 3.6, w: 1.8, h: 0.3,
        fontFace: 'Courier New',
        fontSize: 10,
        color: COLORS.NAVY,
        align: 'center'
    });

    // Code snippet
    addCodeBlock(slide, 'from pulp import *\nmodel = LpProblem("Assignment", LpMinimize)\nx = LpVariable.dicts("x", [...], cat="Binary")\nmodel.solve()',
        0.4, 4.1, 9.2, 0.95);
}

// ============================================================================
// SLIDE 8: Manual Solution
// ============================================================================
function createManualSlide() {
    const slide = addBrutalistSlide('ROZWIĄZANIE RĘCZNE (3×3)', 8);

    // Initial matrix
    slide.addText('Macierz kosztów (uproszczona):', {
        x: 0.4, y: 1.15, w: 4, h: 0.3,
        fontFace: 'Courier New',
        fontSize: 12,
        bold: true,
        color: COLORS.TEXT_DARK
    });

    const initialMatrix = [
        [{ text: '', options: { fill: { color: COLORS.TABLE_HEADER } } },
         { text: 'Arch.', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT } },
         { text: 'Backend', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT } },
         { text: 'Frontend', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT } }],
        [{ text: 'Anna', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT } }, '7.2', '15.8', '16.2'],
        [{ text: 'Bartek', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT } }, '7.2', '9.6', '9.4'],
        [{ text: 'Celina', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT } }, '8.0', '9.0', '4.8']
    ];

    slide.addTable(initialMatrix, {
        x: 0.4, y: 1.5, w: 4, h: 1.4,
        fontFace: 'Courier New',
        fontSize: 10,
        border: { pt: 1, color: COLORS.BORDER },
        align: 'center',
        valign: 'middle'
    });

    // Arrow
    slide.addText('→', {
        x: 4.5, y: 1.9, w: 0.5, h: 0.5,
        fontFace: 'Courier New',
        fontSize: 20,
        color: COLORS.RED,
        align: 'center'
    });

    // Reduced matrix
    slide.addText('Po redukcji:', {
        x: 5.2, y: 1.15, w: 4, h: 0.3,
        fontFace: 'Courier New',
        fontSize: 12,
        bold: true,
        color: COLORS.TEXT_DARK
    });

    const reducedMatrix = [
        [{ text: '', options: { fill: { color: COLORS.TABLE_HEADER } } },
         { text: 'Arch.', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT } },
         { text: 'Backend', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT } },
         { text: 'Frontend', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT } }],
        [{ text: 'Anna', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT } },
         { text: '0', options: { fill: { color: COLORS.YELLOW }, bold: true } }, '6.2', '9.0'],
        [{ text: 'Bartek', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT } },
         '0', { text: '0', options: { fill: { color: COLORS.YELLOW }, bold: true } }, '2.2'],
        [{ text: 'Celina', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT } },
         '3.2', '1.8', { text: '0', options: { fill: { color: COLORS.YELLOW }, bold: true } }]
    ];

    slide.addTable(reducedMatrix, {
        x: 5.2, y: 1.5, w: 4, h: 1.4,
        fontFace: 'Courier New',
        fontSize: 10,
        border: { pt: 1, color: COLORS.BORDER },
        align: 'center',
        valign: 'middle'
    });

    // Result
    addCard(slide, 0.4, 3.2, 9.2, 1.8, COLORS.SUCCESS);

    slide.addText('Optymalny przydział:', {
        x: 0.6, y: 3.35, w: 8.8, h: 0.35,
        fontFace: 'Courier New',
        fontSize: 14,
        bold: true,
        color: COLORS.SUCCESS
    });

    slide.addText([
        { text: 'Anna → Architektura (7 200 zł)  |  ', options: {} },
        { text: 'Bartek → Backend (9 600 zł)  |  ', options: {} },
        { text: 'Celina → Frontend (4 800 zł)', options: {} }
    ], {
        x: 0.6, y: 3.8, w: 8.8, h: 0.4,
        fontFace: 'Verdana',
        fontSize: 12,
        color: COLORS.TEXT_DARK
    });

    slide.addText('Koszt 3×3: 21 600 zł', {
        x: 0.6, y: 4.3, w: 8.8, h: 0.4,
        fontFace: 'Courier New',
        fontSize: 18,
        bold: true,
        color: COLORS.NAVY
    });
}

// ============================================================================
// SLIDE 9: Results
// ============================================================================
function createResultsSlide() {
    const slide = addBrutalistSlide('WYNIKI OPTYMALIZACJI', 9);

    const resultData = [
        [
            { text: 'Pracownik', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT, bold: true } },
            { text: 'Rola', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT, bold: true } },
            { text: 'Zadanie', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT, bold: true } },
            { text: 'Koszt (zł)', options: { fill: { color: COLORS.TABLE_HEADER }, color: COLORS.TEXT_LIGHT, bold: true } }
        ],
        ['Anna', 'Senior Developer', 'Architektura systemu', '7 200'],
        ['Bartek', 'Mid Developer', 'Backend API', '9 600'],
        ['Celina', 'Junior Developer', 'Frontend aplikacji', '4 800'],
        ['Dawid', 'DevOps Engineer', 'Baza danych', '4 500'],
        ['Ewa', 'QA Engineer', 'Testy automatyczne', '5 000'],
        ['Filip', 'UI/UX Designer', 'Wdrożenie CI/CD', '5 850'],
        [{ text: 'SUMA', options: { bold: true } }, '', '', { text: '36 950', options: { bold: true, fill: { color: COLORS.YELLOW } } }]
    ];

    slide.addTable(resultData, {
        x: 0.4, y: 1.15, w: 6.5, h: 3.2,
        colW: [1.2, 1.8, 2.2, 1.3],
        fontFace: 'Verdana',
        fontSize: 11,
        border: { pt: 2, color: COLORS.BORDER },
        align: 'center',
        valign: 'middle'
    });

    // Highlight box
    addHighlightBox(slide, '36 950 zł', 7.2, 1.3, 2.4, 0.9);
    slide.addText('MINIMALNY KOSZT', {
        x: 7.2, y: 2.25, w: 2.4, h: 0.35,
        fontFace: 'Courier New',
        fontSize: 10,
        bold: true,
        color: COLORS.TEXT_DARK,
        align: 'center'
    });

    // Savings comparison
    addCard(slide, 7.2, 2.8, 2.4, 1.5, COLORS.SUCCESS);

    slide.addText('Oszczędność', {
        x: 7.35, y: 2.95, w: 2.1, h: 0.3,
        fontFace: 'Courier New',
        fontSize: 11,
        bold: true,
        color: COLORS.SUCCESS
    });

    slide.addText('1 980 zł\n(5.1%)', {
        x: 7.35, y: 3.3, w: 2.1, h: 0.8,
        fontFace: 'Courier New',
        fontSize: 14,
        bold: true,
        color: COLORS.TEXT_DARK,
        align: 'center'
    });

    // Status
    addCodeBlock(slide, '> Status: Optimal\n> Solver: CBC\n> Time: < 0.01s', 0.4, 4.5, 3, 0.65);
}

// ============================================================================
// SLIDE 10: Interpretation
// ============================================================================
function createInterpretationSlide() {
    const slide = addBrutalistSlide('INTERPRETACJA', 10);

    // Main recommendation
    addCard(slide, 0.4, 1.15, 9.2, 1.5, COLORS.RED);

    slide.addText('Rekomendacja dla kierownika projektu:', {
        x: 0.6, y: 1.3, w: 8.8, h: 0.35,
        fontFace: 'Courier New',
        fontSize: 14,
        bold: true,
        color: COLORS.RED
    });

    slide.addText([
        { text: 'Aby zminimalizować koszty realizacji projektu ABC, należy przydzielić:\n', options: {} },
        { text: '• Senior Developer (Anna) do architektury (zadanie krytyczne)\n', options: {} },
        { text: '• DevOps (Dawid) do bazy danych (nie CI/CD!) - niższy koszt przy tej samej efektywności', options: {} }
    ], {
        x: 0.6, y: 1.7, w: 8.8, h: 0.85,
        fontFace: 'Verdana',
        fontSize: 11,
        color: COLORS.TEXT_DARK,
        lineSpacing: 16
    });

    // Insights
    slide.addText('Kluczowe spostrzeżenia:', {
        x: 0.4, y: 2.85, w: 9, h: 0.35,
        fontFace: 'Courier New',
        fontSize: 14,
        bold: true,
        color: COLORS.NAVY
    });

    // Insight cards
    const insights = [
        { title: 'Dawid', desc: 'DevOps przy bazie\n(nie CI/CD!)', color: COLORS.RED },
        { title: 'Celina', desc: 'Junior → Frontend\n(najniższy koszt)', color: COLORS.NAVY },
        { title: 'Filip', desc: 'UI/UX → CI/CD\n(zaskoczenie!)', color: COLORS.SUCCESS }
    ];

    insights.forEach((insight, i) => {
        const x = 0.4 + i * 3.1;
        addCard(slide, x, 3.3, 2.9, 1.3, insight.color);

        slide.addText(insight.title, {
            x: x + 0.15, y: 3.45, w: 2.6, h: 0.35,
            fontFace: 'Courier New',
            fontSize: 14,
            bold: true,
            color: insight.color
        });

        slide.addText(insight.desc, {
            x: x + 0.15, y: 3.85, w: 2.6, h: 0.6,
            fontFace: 'Verdana',
            fontSize: 10,
            color: COLORS.TEXT_DARK,
            lineSpacing: 14
        });
    });
}

// ============================================================================
// SLIDE 11: Sensitivity Analysis
// ============================================================================
function createSensitivitySlide() {
    const slide = addBrutalistSlide('ANALIZA WRAŻLIWOŚCI', 11);

    // Scenario cards
    const scenarios = [
        { q: 'Anna niedostępna?', a: 'Potrzeba zewnętrznego wykonawcy lub nadgodziny innego pracownika' },
        { q: 'Stawki +10%?', a: 'Proporcjonalny wzrost kosztu o 10% (36 950 → 40 645 zł)' },
        { q: 'Nowe zadanie?', a: 'Rozszerzenie do problemu 6×7 lub zatrudnienie' }
    ];

    scenarios.forEach((s, i) => {
        const y = 1.15 + i * 1.1;

        // Question marker
        slide.addShape(pptx.shapes.RECTANGLE, {
            x: 0.4, y: y, w: 0.08, h: 0.9,
            fill: { color: COLORS.RED },
            line: { color: COLORS.RED }
        });

        slide.addText(s.q, {
            x: 0.6, y: y, w: 3.5, h: 0.35,
            fontFace: 'Courier New',
            fontSize: 13,
            bold: true,
            color: COLORS.TEXT_DARK
        });

        slide.addText(s.a, {
            x: 0.6, y: y + 0.35, w: 4.5, h: 0.5,
            fontFace: 'Verdana',
            fontSize: 10,
            color: COLORS.TEXT_DARK
        });
    });

    // Limitations box
    addCard(slide, 5.5, 1.15, 4.1, 2.1, COLORS.NAVY);

    slide.addText('Ograniczenia modelu:', {
        x: 5.65, y: 1.3, w: 3.8, h: 0.35,
        fontFace: 'Courier New',
        fontSize: 12,
        bold: true,
        color: COLORS.NAVY
    });

    slide.addText([
        { text: '• 1 pracownik = 1 zadanie\n', options: {} },
        { text: '• Brak zależności czasowych\n', options: {} },
        { text: '• Stałe stawki godzinowe\n', options: {} },
        { text: '• Brak preferencji pracowników', options: {} }
    ], {
        x: 5.65, y: 1.7, w: 3.8, h: 1.4,
        fontFace: 'Verdana',
        fontSize: 10,
        color: COLORS.TEXT_DARK,
        lineSpacing: 16
    });

    // Comparison chart placeholder
    slide.addText('Porównanie przydziałów:', {
        x: 0.4, y: 4.4, w: 9, h: 0.3,
        fontFace: 'Courier New',
        fontSize: 12,
        bold: true,
        color: COLORS.TEXT_DARK
    });

    // Simple bar comparison
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0.4, y: 4.8, w: 3.7, h: 0.35,
        fill: { color: COLORS.SUCCESS },
        line: { color: COLORS.BORDER, pt: 1 }
    });
    slide.addText('Optymalny: 36 950 zł', {
        x: 0.5, y: 4.8, w: 3.5, h: 0.35,
        fontFace: 'Verdana',
        fontSize: 10,
        color: COLORS.TEXT_LIGHT,
        valign: 'middle'
    });

    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 0.4, y: 5.2, w: 3.9, h: 0.35,
        fill: { color: COLORS.TABLE_ALT },
        line: { color: COLORS.BORDER, pt: 1 }
    });
    slide.addText('Intuicyjny: 38 930 zł (+5.1%)', {
        x: 0.5, y: 5.2, w: 3.7, h: 0.35,
        fontFace: 'Verdana',
        fontSize: 10,
        color: COLORS.TEXT_DARK,
        valign: 'middle'
    });
}

// ============================================================================
// SLIDE 12: Conclusions
// ============================================================================
function createConclusionSlide() {
    const slide = pptx.addSlide();
    slide.background = { color: COLORS.NAVY };

    // Large red block (opposite of title)
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 6, y: 0, w: 4, h: 5.63,
        fill: { color: COLORS.RED },
        line: { color: COLORS.RED }
    });

    // Yellow accent
    slide.addShape(pptx.shapes.RECTANGLE, {
        x: 5.7, y: 1.5, w: 0.3, h: 2.5,
        fill: { color: COLORS.YELLOW },
        line: { color: COLORS.YELLOW }
    });

    // Title
    slide.addText('PODSUMOWANIE', {
        x: 0.5, y: 0.5, w: 5, h: 0.6,
        fontFace: 'Courier New',
        fontSize: 28,
        bold: true,
        color: COLORS.TEXT_LIGHT
    });

    // Checkmarks
    const conclusions = [
        '✓ Model matematyczny zdefiniowany',
        '✓ Metoda węgierska dla małych problemów',
        '✓ PuLP dla pełnego rozwiązania',
        '✓ Interpretacja biznesowa'
    ];

    conclusions.forEach((c, i) => {
        slide.addText(c, {
            x: 0.5, y: 1.3 + i * 0.55, w: 5, h: 0.5,
            fontFace: 'Verdana',
            fontSize: 14,
            color: COLORS.TEXT_LIGHT
        });
    });

    // Result highlight
    slide.addText('KOSZT\nMINIMALNY', {
        x: 6.3, y: 1.3, w: 3.4, h: 1,
        fontFace: 'Courier New',
        fontSize: 20,
        bold: true,
        color: COLORS.TEXT_LIGHT,
        align: 'center',
        lineSpacing: 24
    });

    slide.addText('36 950 zł', {
        x: 6.3, y: 2.4, w: 3.4, h: 0.8,
        fontFace: 'Courier New',
        fontSize: 32,
        bold: true,
        color: COLORS.YELLOW,
        align: 'center'
    });

    // Technologies
    slide.addText('Technologie:', {
        x: 0.5, y: 4, w: 5, h: 0.35,
        fontFace: 'Courier New',
        fontSize: 12,
        bold: true,
        color: COLORS.YELLOW
    });

    slide.addText('Python | PuLP | CBC Solver', {
        x: 0.5, y: 4.4, w: 5, h: 0.35,
        fontFace: 'Verdana',
        fontSize: 12,
        color: COLORS.TEXT_LIGHT
    });

    // Slide number
    slide.addText('12/12', {
        x: 6.3, y: 5.1, w: 3.4, h: 0.3,
        fontFace: 'Courier New',
        fontSize: 12,
        color: COLORS.TEXT_LIGHT,
        align: 'center'
    });
}

// ============================================================================
// MAIN
// ============================================================================
async function main() {
    console.log('Creating IT Assignment presentation...');
    console.log('Style: Tech Brutalist');
    console.log('');

    createTitleSlide();
    console.log('  [1/12] Title slide');

    createProblemSlide();
    console.log('  [2/12] Problem description');

    createTeamSlide();
    console.log('  [3/12] Team data');

    createTasksSlide();
    console.log('  [4/12] Tasks data');

    createCostMatrixSlide();
    console.log('  [5/12] Cost matrix');

    createModelSlide();
    console.log('  [6/12] Mathematical model');

    createMethodSlide();
    console.log('  [7/12] Solution method');

    createManualSlide();
    console.log('  [8/12] Manual solution');

    createResultsSlide();
    console.log('  [9/12] Results');

    createInterpretationSlide();
    console.log('  [10/12] Interpretation');

    createSensitivitySlide();
    console.log('  [11/12] Sensitivity analysis');

    createConclusionSlide();
    console.log('  [12/12] Conclusions');

    // Save
    const outputPath = path.join(__dirname, '..', 'prezentacja.pptx');
    await pptx.writeFile({ fileName: outputPath });

    console.log('');
    console.log(`Presentation saved to: ${outputPath}`);
    console.log('Done!');
}

main().catch(console.error);
