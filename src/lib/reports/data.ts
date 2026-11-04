/**
 * Query results for research reports. `npm run reports` executes each
 * reports/<report>/queries/<name>.sql with DuckDB and writes the rows to
 * src/generated/reports/<report>/<name>.json (read here at build time) and to
 * public/data/reports/<report>/<name>.parquet (read by the in-browser explorer).
 */
import { withBase } from "../paths";

export interface QueryResult {
  columns: string[];
  rows: Record<string, string | number | boolean | null>[];
}

const results = import.meta.glob<QueryResult>("/src/generated/reports/*/*.json", {
  eager: true,
  import: "default",
});

export function loadQuery(report: string | undefined, name: string): QueryResult {
  if (!report) throw new Error(`No report id for query "${name}". Pass report="…" or render inside a report page.`);
  const result = results[`/src/generated/reports/${report}/${name}.json`];
  if (!result) {
    throw new Error(
      `No data for ${report}/${name}. Add reports/${report}/queries/${name}.sql, then run "npm run reports".`,
    );
  }
  return result;
}

/** Fail the build, with a useful message, when a figure names a column its query doesn't return. */
export function requireColumns(result: QueryResult, columns: (string | undefined)[], where: string): void {
  const missing = columns.filter((c): c is string => !!c && !result.columns.includes(c));
  if (missing.length) {
    throw new Error(`${where}: no column ${missing.map((m) => `"${m}"`).join(", ")}. The query returns: ${result.columns.join(", ")}.`);
  }
}

export const parquetURL = (report: string, name: string) => withBase(`/data/reports/${report}/${name}.parquet`);
