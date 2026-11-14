-- Shared views over the Statistics Canada extracts in source/ (see ../fetch.mjs).
-- NAICS 6213, "Offices of other health practitioners", is where allied health
-- clinics sit: chiropractors, optometrists, mental health practitioners,
-- physical, occupational and speech therapists and audiologists, and others.

CREATE OR REPLACE VIEW employment AS
SELECT ref_date, geo, naics_code, employees, quality, symbol,
       CAST(substr(ref_date, 1, 4) AS INTEGER) AS year
FROM read_csv('source/14100201-employment.csv', types = {'naics_code': 'VARCHAR', 'employees': 'DOUBLE'});

-- Annual averages, complete years only.
CREATE OR REPLACE VIEW annual AS
SELECT geo, naics_code, year, avg(employees) AS employees
FROM employment
GROUP BY ALL
HAVING count(employees) = 12;

CREATE OR REPLACE VIEW firms_with AS
SELECT * FROM read_csv('source/33101174-businesses-with-employees.csv', types = {'naics_code': 'VARCHAR'});

CREATE OR REPLACE VIEW firms_without AS
SELECT * FROM read_csv('source/33101175-businesses-without-employees.csv', types = {'naics_code': 'VARCHAR'});

-- Employment indexed to 2015 = 100, clinics (6213) and all industries (00-91N).
CREATE OR REPLACE VIEW indexed AS
WITH base AS (SELECT geo, naics_code, employees AS base FROM annual WHERE year = 2015)
SELECT a.geo, a.naics_code, a.year, 100 * a.employees / b.base AS idx, a.employees
FROM annual a JOIN base b USING (geo, naics_code)
WHERE a.year BETWEEN 2015 AND 2025 AND b.base IS NOT NULL;
