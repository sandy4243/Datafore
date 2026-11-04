-- Every number quoted in the report's prose, in one row, so the text is always
-- computed from the same source as the charts.
WITH
bc AS (SELECT * FROM cihi('Table 3a', 'A3:M571') WHERE A = 'British Columbia'),
bc25 AS (SELECT * FROM cihi('Table 3b', 'A3:D240') WHERE A = 'British Columbia'),
ca AS (SELECT * FROM cihi('Table 2', 'A3:L29')),
pow AS (SELECT * FROM bc_place_of_work),
regions AS (SELECT * FROM bc_regions_2025 WHERE role IS NULL),
supply AS (
  SELECT
    (SELECT num(D, 0) FROM bc WHERE B = 'Supply' AND C = 'Total') AS bc_supply_2016,
    (SELECT num(D, 0) FROM bc25 WHERE B = 'Supply' AND C = 'Total') AS bc_supply_2025,
    (SELECT num(D, 0) FROM bc WHERE B = 'Location of graduation' AND C = 'Internationally educated') AS bc_intl_2016,
    (SELECT num(D, 0) FROM bc25 WHERE B = 'Location of graduation' AND C = 'Internationally educated') AS bc_intl_2025,
    (SELECT num(C, 0) FROM ca WHERE A = 'Supply' AND B = 'Total') AS ca_supply_2016,
    (SELECT num(L, 0) FROM ca WHERE A = 'Supply' AND B = 'Total') AS ca_supply_2025,
    (SELECT num(L, 0) FROM ca WHERE B = 'Internationally educated' AND A IS NULL LIMIT 1) AS ca_intl_2025
)
SELECT
  bc_supply_2016,
  bc_supply_2025,
  round(100 * (bc_supply_2025 / bc_supply_2016 - 1), 0) AS bc_supply_growth_pct,
  ca_supply_2016,
  ca_supply_2025,
  round(100 * (ca_supply_2025 / ca_supply_2016 - 1), 0) AS ca_supply_growth_pct,
  round(100 * bc_intl_2016 / bc_supply_2016, 0) AS bc_intl_share_2016,
  round(100 * bc_intl_2025 / bc_supply_2025, 0) AS bc_intl_share_2025,
  round(100 * ca_intl_2025 / ca_supply_2025, 0) AS ca_intl_share_2025,
  (SELECT community_pct FROM pow WHERE year = 2016) AS bc_community_2016,
  (SELECT community_pct FROM pow WHERE year = 2025) AS bc_community_2025,
  (SELECT hospital_pct FROM pow WHERE year = 2016) AS bc_hospital_2016,
  (SELECT hospital_pct FROM pow WHERE year = 2025) AS bc_hospital_2025,
  (SELECT per_10k FROM bc_regions_2025 WHERE role = 'reference') AS bc_per_10k_2025,
  (SELECT label FROM regions ORDER BY per_10k DESC LIMIT 1) AS top_region,
  (SELECT max(per_10k) FROM regions) AS top_region_per_10k,
  (SELECT label FROM regions ORDER BY per_10k ASC LIMIT 1) AS bottom_region,
  (SELECT min(per_10k) FROM regions) AS bottom_region_per_10k,
  round((SELECT max(per_10k) / min(per_10k) FROM regions), 0) AS top_to_bottom_ratio
FROM supply;
