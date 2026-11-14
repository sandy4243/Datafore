-- BC allied health businesses by number of employees, June 2026.
WITH sized AS (
  SELECT 'No employees' AS label, businesses AS value, 0 AS ord
  FROM firms_without WHERE geo = 'British Columbia' AND naics_code = '6213'
  UNION ALL
  SELECT CASE WHEN employment_size IN ('1 to 4 employees', '5 to 9 employees', '10 to 19 employees')
              THEN employment_size
              ELSE '20 or more employees' END,
         businesses,
         CASE employment_size WHEN '1 to 4 employees' THEN 1 WHEN '5 to 9 employees' THEN 2
                              WHEN '10 to 19 employees' THEN 3 ELSE 4 END
  FROM firms_with
  WHERE geo = 'British Columbia' AND naics_code = '6213' AND employment_size <> 'Total, with employees'
)
SELECT label, sum(value)::INTEGER AS value, CASE WHEN ord = 0 THEN 'focus' END AS role
FROM sized
GROUP BY label, ord
ORDER BY ord;
