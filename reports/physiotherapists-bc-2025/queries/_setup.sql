-- Source: Canadian Institute for Health Information. Physiotherapists in Canada,
-- 2025 — Data Tables. Ottawa, ON: CIHI; 2026.
--
-- cihi(table, cells) reads one data table from the workbook. Cells start at the
-- first data row (below the header), and columns are named by spreadsheet letter
-- (A, B, C …) because CIHI's headers span several lines. Every value arrives as
-- text: CIHI marks missing data with "—", suppressed cells with "x" and
-- not-applicable with "n/a", so numbers are read with TRY_CAST and those become NULL.
CREATE MACRO cihi(tbl, cells) AS TABLE
  SELECT * FROM read_xlsx(
    'source/physiotherapists-in-canada-2016-2025-data-tables-en.xlsx',
    sheet = tbl, range = cells, header = false, all_varchar = true
  );

-- Year columns: D = 2016 … M = 2025 in Tables 3a, 4a; C = 2016 … L = 2025 in Tables 2, 12.
CREATE MACRO year_of(col, first_col) AS (2016 + ascii(col) - ascii(first_col))::INTEGER;

-- A number from a CIHI cell, rounded to the precision CIHI publishes.
CREATE MACRO num(v, places) AS round(TRY_CAST(v AS DOUBLE), places);
