# Source data

Extracts from three Statistics Canada tables, downloaded with `../fetch.mjs` from the Web Data Service
(re-run it when a new edition is released; business counts come out each June and December).

| File | Table | What |
|---|---|---|
| `14100201-employment.csv` | [14-10-0201-01](https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1410020101) | Monthly payroll employment (SEPH), all employees, Canada and provinces, NAICS 6213 and all industries, 2001 on |
| `33101174-businesses-with-employees.csv` | [33-10-1174-01](https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=3310117401) | Business counts with employees by employment size, NAICS 6213 and its five subsectors, June 2026 |
| `33101175-businesses-without-employees.csv` | [33-10-1175-01](https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=3310117501) | Business counts without employees, same industries, June 2026 |

Values are as published. `quality` is Statistics Canada's data quality letter (A excellent … E use with caution;
F too unreliable to publish), `symbol` marks preliminary (`p`) and revised (`r`) values. Size and industry
combinations that Statistics Canada does not publish (no businesses) are simply absent.

## Licence

[Statistics Canada Open Licence](https://www.statcan.gc.ca/en/terms-conditions/open-licence): commercial use and
redistribution are allowed with attribution, so these files are committed and republished (including as the
explorer's Parquet file). The report carries the required acknowledgement in `source.citation`: "Adapted from
Statistics Canada data … This does not constitute an endorsement by Statistics Canada of this product."
