-- Where BC physiotherapists employed in direct care work: share in community
-- settings (which include group and solo professional practices, i.e. private
-- clinics) and in hospitals, 2016 to 2025.
-- 2016–2024: Table 10a (unique counts). 2025: Table 10b (new standard, counts in
-- which a physiotherapist can appear more than once), flagged.
WITH rows AS (
  SELECT A, B, D, F, false AS new_standard FROM cihi('Table 10a', 'A3:L128')
  UNION ALL
  SELECT A, B, D, F, true FROM cihi('Table 10b', 'A3:L6')
)
SELECT
  TRY_CAST(A AS INTEGER) AS year,
  num(F, 1) AS community_pct,
  num(D, 1) AS hospital_pct,
  new_standard
FROM rows
WHERE B = 'British Columbia' AND num(F, 1) IS NOT NULL
ORDER BY year;
