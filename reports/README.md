# Research reports

Each report is a folder here (the data) plus one MDX file (the writing). The build runs the SQL with DuckDB,
bakes the results into static charts, and publishes them as Parquet so readers can explore them in the browser.

```
reports/<report-id>/
  source/          the publisher's files, unchanged (xlsx, csv, parquet …)
  queries/
    _setup.sql     optional: macros or views shared by the queries (not published)
    <name>.sql     one SELECT each; every file becomes a dataset called <name>
src/content/reports/<report-id>.mdx   the report: frontmatter, prose and figures
```

Published at `/research/<report-id>/`, listed at `/research/`.

## Adding a report

1. **Make the folder.** `reports/<report-id>/source/`, and drop in the source file exactly as published. Use a
   short, dated id, e.g. `occupational-therapists-bc-2025`.
2. **Write the SQL.** One `.sql` file per figure or dataset in `queries/`, each a single `SELECT` (CTEs are fine).
   Queries run inside the report folder, so read sources by relative path:
   `read_xlsx('source/file.xlsx', sheet = 'Table 2', range = 'A3:L29', header = false, all_varchar = true)`,
   `read_csv('source/file.csv')`. Any query can read another by name (`SELECT … FROM bc_supply`).
   Put repeated plumbing in `_setup.sql` (see the physiotherapists report's `cihi()` macro).
3. **Check the data.** `npm run reports` (or `npm run reports -- <report-id>`) writes
   `src/generated/reports/<report-id>/<name>.json`. Open it and check the numbers against the source by hand.
4. **Write the report.** Copy `src/content/reports/physiotherapists-bc-2025.mdx`, then edit the frontmatter
   (`title`, `description`, `publishDate`, `source.short`, `source.citation`, `source.url` if known) and the body.
5. **Preview.** `npm run dev` and open `/research/<report-id>/`. Then open a PR as usual; merging publishes.

## Figures

Import them at the top of the MDX. Every figure gets a title, an optional note, the source line (from the
frontmatter, plus the `table` you name) and a "Show the data" table automatically.

| Component | Use | Key props |
|---|---|---|
| `<LineChart>` | change over time | `query`, `x`, then `y` + `label` for one series, or `series={[{ y, label, role }]}`; `format`; `yMax`; `flag` (boolean column → hollow marker) + `flagLabel` |
| `<BarList>` | ranking categories | `query`, `label` (category column), `value`, `role` (column: `"reference"` row → reference line, `"focus"` → highlighted bar); sort in the SQL |
| `<Explorer>` | let readers choose | `query`, `view="bars"` or `"line"`, `controls={[{ name, label, default, order }]}`, `sql` (selects from `data`, `$name` binds a control) |
| `<Num>` | a number in the prose | `query`, `field`, `format`; reads the first row, or `where={{ col: value }}` |

Formats: `int` (5,317), `dec1` (8.7), `pct` (75.4%), `pct0` (50%). Percentages arrive already scaled (75.4, not
0.754).

**Put every number in the prose through `<Num>`**, usually from a one-row `headlines.sql`. Then the text cannot
drift from the charts when the data is updated.

Roles colour the marks (never pick colours in a report): one series is `primary`; with two or more, the one the
finding is about is `focus` and the others `context`. Colours come from the chart tokens in
`src/styles/global.css`, so they follow the brand automatically.

## Rules

- Public, aggregate data only. Never clinic or patient data.
- Cite the publisher exactly as they ask (`source.citation`), and say when a method changes between years
  (the `flag` marker and a note).
- Describe what the data shows. Anything about what it means for clinics is labelled as our reading of it.
- Check the publisher's terms before publishing, including whether commercial use or redistributing the source
  file needs permission.
- Write in the voice set out in `PRODUCT.md`: short sentences, plain words.

## Updating a report

Replace the file in `source/` with the new edition (keep or update the file name in the SQL), run
`npm run reports`, re-check the JSON, adjust any prose that no longer holds, and set `updatedDate` in the
frontmatter.
