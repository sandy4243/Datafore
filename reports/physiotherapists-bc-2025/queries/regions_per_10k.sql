-- Physiotherapists employed in direct care per 10,000 population, by health
-- region, every jurisdiction, 2016 to 2025 (Table 12). Published as Parquet for
-- the explorer. Each jurisdiction's "(total)" row becomes role = 'reference'.
-- "Other*" (postal codes outside the jurisdiction's regions) and cells CIHI does
-- not report are left out, so the explorer only offers places with data.
WITH long AS (
  UNPIVOT (
    SELECT * FROM cihi('Table 12', 'A3:L110')
    WHERE B IS NOT NULL AND B NOT LIKE 'Other%'
  ) ON C, D, E, F, G, H, I, J, K, L INTO NAME col VALUE v
)
SELECT
  A AS jurisdiction,
  CASE
    WHEN B LIKE '%(total)' THEN A || ' overall'
    ELSE regexp_replace(B, ' HSDA$', '')
  END AS label,
  CASE WHEN B LIKE '%(total)' THEN 'reference' END AS role,
  year_of(col, 'C') AS year,
  num(v, 1) AS value
FROM long
WHERE num(v, 1) IS NOT NULL
ORDER BY jurisdiction, year, role NULLS LAST, value DESC;
