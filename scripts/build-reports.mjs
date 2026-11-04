#!/usr/bin/env node
/**
 * Runs every research report's SQL with DuckDB and writes the results where the
 * site reads them:
 *
 *   reports/<report>/queries/<name>.sql
 *     → src/generated/reports/<report>/<name>.json      (static figures, at build)
 *     → public/data/reports/<report>/<name>.parquet     (explorer, in the browser)
 *
 * Each query runs in its report folder, so SQL can read source files by relative
 * path, e.g. read_xlsx('source/tables.xlsx', …) or read_csv('source/data.csv').
 * Files whose names start with "_" (e.g. queries/_setup.sql) are setup: they run
 * first, in order, may hold several statements (macros, views), and are not
 * published. Every query is also available to the others as a view with its
 * name, so e.g. headlines.sql can SELECT … FROM bc_supply.
 * Both output folders are generated: they are gitignored and rebuilt on every
 * `npm run dev` and `npm run build`.
 *
 * Usage: node scripts/build-reports.mjs [report-id …]
 */
import { DuckDBInstance } from "@duckdb/node-api";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const reportsDir = join(root, "reports");
const jsonOut = join(root, "src", "generated", "reports");
const parquetOut = join(root, "public", "data", "reports");

const only = process.argv.slice(2);
const reports = (await readdir(reportsDir, { withFileTypes: true }))
  .filter((d) => d.isDirectory() && !d.name.startsWith("_") && !d.name.startsWith("."))
  .map((d) => d.name)
  .filter((name) => only.length === 0 || only.includes(name));

/** A query file holds one SELECT (CTEs allowed). Strip comments and the final semicolon. */
const statementOf = (sql) =>
  sql
    .replace(/--[^\n]*/g, "")
    .trim()
    .replace(/;\s*$/, "");

/** JSON-safe values: DuckDB BIGINT/HUGEINT arrive as BigInt. */
const plain = (v) => (typeof v === "bigint" ? Number(v) : v);

let failures = 0;
for (const report of reports) {
  const dir = join(reportsDir, report);
  const queryDir = join(dir, "queries");
  if (!existsSync(queryDir)) continue;
  const all = (await readdir(queryDir)).filter((f) => f.endsWith(".sql")).sort();
  const setup = all.filter((f) => f.startsWith("_"));
  const files = all.filter((f) => !f.startsWith("_"));

  await rm(join(jsonOut, report), { recursive: true, force: true });
  await rm(join(parquetOut, report), { recursive: true, force: true });
  await mkdir(join(jsonOut, report), { recursive: true });
  await mkdir(join(parquetOut, report), { recursive: true });

  const db = await DuckDBInstance.create(":memory:");
  const conn = await db.connect();
  await conn.run(`SET file_search_path = '${dir.replaceAll("'", "''")}'`);
  const read = (f) => readFile(join(queryDir, f), "utf8");
  const setupSql = await Promise.all(setup.map(read));
  const sources = await Promise.all(files.map(read));
  if ([...setupSql, ...sources].some((s) => /read_xlsx/i.test(s))) await conn.run("INSTALL excel; LOAD excel;");
  for (const [i, sql] of setupSql.entries()) {
    try {
      await conn.run(sql);
    } catch (error) {
      failures++;
      console.error(`\n✗ ${relative(root, join(queryDir, setup[i]))}\n  ${error.message}\n`);
    }
  }

  // Register every query as a view. A view can only be created once the views it
  // reads exist, so retry until no more resolve; whatever is left fails below.
  let pending = files.map((f, i) => ({ name: f.replace(/\.sql$/, ""), sql: statementOf(sources[i]) }));
  for (let progress = true; progress && pending.length; ) {
    progress = false;
    const next = [];
    for (const q of pending) {
      try {
        await conn.run(`CREATE OR REPLACE TEMP VIEW "${q.name}" AS ${q.sql}`);
        progress = true;
      } catch {
        next.push(q);
      }
    }
    pending = next;
  }

  for (const [i, file] of files.entries()) {
    const name = file.replace(/\.sql$/, "");
    const sql = statementOf(sources[i]);
    try {
      const reader = await conn.runAndReadAll(sql);
      const columns = reader.columnNames();
      const rows = reader.getRowObjectsJS().map((r) => Object.fromEntries(Object.entries(r).map(([k, v]) => [k, plain(v)])));
      await writeFile(join(jsonOut, report, `${name}.json`), JSON.stringify({ columns, rows }, null, 1) + "\n");
      const target = join(parquetOut, report, `${name}.parquet`).replaceAll("'", "''");
      await conn.run(`COPY (${sql}) TO '${target}' (FORMAT parquet, COMPRESSION zstd)`);
      console.log(`  ${report}/${name}: ${rows.length} rows`);
    } catch (error) {
      failures++;
      console.error(`\n✗ ${relative(root, join(queryDir, file))}\n  ${error.message}\n`);
    }
  }
  conn.closeSync?.();
}

if (failures) {
  console.error(`${failures} report quer${failures === 1 ? "y" : "ies"} failed.`);
  process.exit(1);
}
console.log(`Built ${reports.length} report${reports.length === 1 ? "" : "s"}.`);
