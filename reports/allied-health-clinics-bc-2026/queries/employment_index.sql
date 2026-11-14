-- Every province and Canada, for the explorer: one row per year and series.
SELECT geo AS jurisdiction,
       year AS x,
       CASE naics_code WHEN '6213' THEN 'Allied health offices' ELSE 'All industries' END AS series,
       CASE naics_code WHEN '6213' THEN 'focus' ELSE 'context' END AS role,
       round(idx, 1) AS y
FROM indexed
WHERE geo IN (SELECT geo FROM indexed WHERE naics_code = '6213' AND year = 2025 AND idx IS NOT NULL)
ORDER BY jurisdiction, series, x;
