-- BC allied health businesses with employees, by type of practice, June 2026.
SELECT CASE naics_code
         WHEN '621340' THEN 'Physical, occupational and speech therapists, audiologists'
         WHEN '621310' THEN 'Chiropractors'
         WHEN '621320' THEN 'Optometrists'
         WHEN '621330' THEN 'Mental health practitioners'
         WHEN '621390' THEN 'All other health practitioners'
       END AS label,
       businesses AS value,
       CASE WHEN naics_code = '621340' THEN 'focus' END AS role
FROM firms_with
WHERE geo = 'British Columbia' AND employment_size = 'Total, with employees' AND naics_code <> '6213'
ORDER BY value DESC;
