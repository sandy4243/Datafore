#!/usr/bin/env node
/**
 * Self-hosts the DuckDB-WASM extensions the explorer needs (Parquet), so the
 * browser loads them from this site instead of extensions.duckdb.org.
 *
 * Extensions are tied to the exact DuckDB core inside @duckdb/duckdb-wasm, so the
 * version is asked of that build itself rather than written down here. Files go
 * to public/duckdb-extensions/<version>/wasm_eh/ (gitignored) and are downloaded
 * only when missing. Upgrading @duckdb/duckdb-wasm fetches the matching set.
 */
import { createDuckDB, NODE_RUNTIME, VoidLogger } from "@duckdb/duckdb-wasm/blocking";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const EXTENSIONS = ["parquet"];

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = join(root, "node_modules", "@duckdb", "duckdb-wasm", "dist");
const db = await createDuckDB(
  {
    mvp: { mainModule: join(dist, "duckdb-mvp.wasm"), mainWorker: "" },
    eh: { mainModule: join(dist, "duckdb-eh.wasm"), mainWorker: "" },
  },
  new VoidLogger(),
  NODE_RUNTIME,
);
await db.instantiate();
const version = String(db.connect().query("PRAGMA version").toArray()[0].toJSON().library_version);

const dir = join(root, "public", "duckdb-extensions", version, "wasm_eh");
await mkdir(dir, { recursive: true });
for (const name of EXTENSIONS) {
  const file = join(dir, `${name}.duckdb_extension.wasm`);
  if (existsSync(file)) continue;
  const url = `https://extensions.duckdb.org/${version}/wasm_eh/${name}.duckdb_extension.wasm`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Could not download ${url}: ${res.status}`);
  await writeFile(file, Buffer.from(await res.arrayBuffer()));
  console.log(`  vendored ${name} extension for DuckDB-WASM ${version}`);
}
console.log(`DuckDB-WASM ${version}: extensions ready (${EXTENSIONS.join(", ")}).`);
