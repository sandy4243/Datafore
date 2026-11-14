-- BC employment, 2015 = 100: allied health offices against all industries.
SELECT year,
       round(max(idx) FILTER (naics_code = '6213'), 1)   AS clinics,
       round(max(idx) FILTER (naics_code = '00-91N'), 1) AS economy
FROM indexed
WHERE geo = 'British Columbia'
GROUP BY year
ORDER BY year;
