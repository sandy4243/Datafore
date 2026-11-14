-- One row of the numbers quoted in the prose.
WITH emp AS (
  SELECT geo, naics_code,
         max(employees) FILTER (year = 2015) AS e2015,
         max(employees) FILTER (year = 2025) AS e2025
  FROM annual GROUP BY ALL
),
growth AS (SELECT geo, naics_code, e2015, e2025, 100 * (e2025 / e2015 - 1) AS pct FROM emp),
firms AS (
  SELECT w.geo, w.businesses AS with_emp, n.businesses AS without_emp
  FROM firms_with w JOIN firms_without n USING (geo, naics_code)
  WHERE w.naics_code = '6213' AND w.employment_size = 'Total, with employees'
),
small AS (
  SELECT sum(businesses) AS under_10 FROM firms_with
  WHERE geo = 'British Columbia' AND naics_code = '6213' AND employment_size IN ('1 to 4 employees', '5 to 9 employees')
)
SELECT
  (SELECT round(e2015, -2) FROM growth WHERE geo = 'British Columbia' AND naics_code = '6213')        AS bc_clinic_jobs_2015,
  (SELECT round(e2025, -2) FROM growth WHERE geo = 'British Columbia' AND naics_code = '6213')        AS bc_clinic_jobs_2025,
  (SELECT pct FROM growth WHERE geo = 'British Columbia' AND naics_code = '6213')                     AS bc_clinic_growth_pct,
  (SELECT pct FROM growth WHERE geo = 'British Columbia' AND naics_code = '00-91N')                   AS bc_economy_growth_pct,
  (SELECT pct FROM growth WHERE geo = 'Canada' AND naics_code = '6213')                              AS ca_clinic_growth_pct,
  (SELECT pct / (SELECT pct FROM growth WHERE geo = 'British Columbia' AND naics_code = '00-91N')
     FROM growth WHERE geo = 'British Columbia' AND naics_code = '6213')                             AS bc_growth_ratio,
  (SELECT with_emp + without_emp FROM firms WHERE geo = 'British Columbia')                          AS bc_businesses,
  (SELECT without_emp FROM firms WHERE geo = 'British Columbia')                                     AS bc_no_employees,
  (SELECT 100 * without_emp / (with_emp + without_emp) FROM firms WHERE geo = 'British Columbia')    AS bc_no_employees_pct,
  (SELECT with_emp FROM firms WHERE geo = 'British Columbia')                                         AS bc_with_employees,
  (SELECT 100 * under_10 / (SELECT with_emp FROM firms WHERE geo = 'British Columbia') FROM small)    AS bc_under_10_pct;
