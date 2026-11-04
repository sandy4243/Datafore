-- BC health service delivery areas, physiotherapists in direct care per 10,000
-- population, 2025 (Table 12). The provincial rate is the reference row.
SELECT label, value AS per_10k, role
FROM (
  SELECT
    CASE WHEN B LIKE '%(total)' THEN 'BC overall' ELSE regexp_replace(B, ' HSDA$', '') END AS label,
    num(L, 1) AS value,
    CASE WHEN B LIKE '%(total)' THEN 'reference' END AS role
  FROM cihi('Table 12', 'A3:L110')
  WHERE A = 'British Columbia' AND B IS NOT NULL AND B NOT LIKE 'Other%'
)
WHERE value IS NOT NULL
ORDER BY role NULLS LAST, value DESC;
