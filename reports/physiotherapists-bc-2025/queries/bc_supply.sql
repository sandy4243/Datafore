-- Physiotherapists eligible to practise in BC ("supply"), 2016 to 2025.
-- 2016–2024: Table 3a (old physiotherapist-specific data standard).
-- 2025: Table 3b, because BC moved to CIHI's new integrated profession standard
-- that year; flagged so the chart can mark it.
WITH old_standard AS (
  UNPIVOT (
    SELECT * FROM cihi('Table 3a', 'A3:M571')
    WHERE A = 'British Columbia' AND B = 'Supply' AND C = 'Total'
  ) ON D, E, F, G, H, I, J, K, L, M INTO NAME col VALUE v
),
new_standard AS (
  SELECT 2025 AS year, num(D, 0)::INTEGER AS supply
  FROM cihi('Table 3b', 'A3:D240')
  WHERE A = 'British Columbia' AND B = 'Supply' AND C = 'Total'
),
combined AS (
  SELECT year_of(col, 'D') AS year, num(v, 0)::INTEGER AS supply FROM old_standard
  UNION ALL
  SELECT * FROM new_standard
)
SELECT year, supply, year = 2025 AS new_standard
FROM combined
WHERE supply IS NOT NULL
ORDER BY year;
