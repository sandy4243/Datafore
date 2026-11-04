/**
 * DuckDB-WASM, self-hosted: Vite copies the worker and wasm into the build, and
 * scripts/vendor-duckdb-extensions.mjs puts the Parquet extension under
 * /duckdb-extensions/, so the explorer makes no third-party requests. One
 * database per page, shared by every explorer on it. Uses the single-threaded
 * "eh" build, which needs no cross-origin-isolation headers (GitHub Pages cannot
 * set them).
 */
import * as duckdb from "@duckdb/duckdb-wasm";
import wasmURL from "@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url";
import workerURL from "@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url";
import { withBase } from "../paths";

let database: Promise<duckdb.AsyncDuckDB> | undefined;

export function getDatabase(): Promise<duckdb.AsyncDuckDB> {
  database ??= (async () => {
    const worker = new Worker(workerURL);
    const db = new duckdb.AsyncDuckDB(new duckdb.VoidLogger(), worker);
    await db.instantiate(wasmURL);
    return db;
  })();
  return database;
}

/** Make a published Parquet file queryable as the view `data` on a fresh connection. */
export async function openDataset(url: string): Promise<duckdb.AsyncDuckDBConnection> {
  const db = await getDatabase();
  const name = `${url.replace(/[^a-z0-9]+/gi, "_")}.parquet`;
  await db.registerFileURL(name, new URL(url, location.href).href, duckdb.DuckDBDataProtocol.HTTP, false);
  const conn = await db.connect();
  const extensions = new URL(withBase("/duckdb-extensions"), location.href).href;
  await conn.query(`SET custom_extension_repository = '${extensions}'`);
  await conn.query(`CREATE OR REPLACE TEMP VIEW data AS SELECT * FROM read_parquet('${name}')`);
  return conn;
}
