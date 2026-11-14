#!/usr/bin/env node
/**
 * Downloads this report's source data from Statistics Canada's Web Data
 * Service and writes it, unaltered apart from layout, to source/*.csv.
 * Run by hand when a new edition is out: node reports/allied-health-clinics-bc-2026/fetch.mjs
 *
 * Licence: Statistics Canada Open Licence (commercial use and redistribution
 * allowed with attribution). https://www.statcan.gc.ca/en/terms-conditions/open-licence
 *
 * Tables
 *   14-10-0201-01  Employment by industry, monthly, unadjusted for seasonality (SEPH)
 *   33-10-1174-01  Canadian Business Counts, with employees, June 2026
 *   33-10-1175-01  Canadian Business Counts, without employees, June 2026
 */
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const WDS = "https://www150.statcan.gc.ca/t1/wds/rest";
const out = (f) => fileURLToPath(new URL(`source/${f}`, import.meta.url));

async function post(path, body) {
  const res = await fetch(`${WDS}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
  return res.json();
}

/** Member id → name, per dimension position, from the table's metadata. */
async function members(pid) {
  const [{ object }] = await post("getCubeMetadata", [{ productId: pid }]);
  return Object.fromEntries(
    object.dimension.map((d) => [d.dimensionPositionId, Object.fromEntries(d.member.map((m) => [m.memberId, m]))]),
  );
}

/** Fetch series by coordinate in batches; returns flat rows. */
async function series(pid, coords, latestN) {
  const rows = [];
  for (let i = 0; i < coords.length; i += 100) {
    const batch = coords.slice(i, i + 100).map((coordinate) => ({ productId: pid, coordinate, latestN }));
    for (const r of await post("getDataFromCubePidCoordAndLatestNPeriods", batch)) {
      // Status 2: the series does not exist (e.g. no businesses of that size). Skip it.
      if (r.status !== "SUCCESS" && r.object?.responseStatusCode === 2) continue;
      if (r.status !== "SUCCESS") throw new Error(`${pid} ${JSON.stringify(r.object)}`);
      for (const p of r.object.vectorDataPoint) rows.push({ coordinate: r.object.coordinate, ...p });
    }
  }
  return rows;
}

// Quality and symbol codes as Statistics Canada prints them (WDS getCodeSets).
const STATUS = { 1: "..", 2: "0s", 3: "A", 4: "B", 5: "C", 6: "D", 7: "E", 8: "F", 9: "...", 10: "<LOD" };
const SYMBOL = { 1: "p", 3: "r" };

const csvCell = (v) => (v == null ? "" : /[",\n]/.test(String(v)) ? `"${String(v).replaceAll('"', '""')}"` : String(v));
const toCSV = (header, rows) => [header.join(","), ...rows.map((r) => r.map(csvCell).join(","))].join("\n") + "\n";
const coord = (...ids) => [...ids, ...Array(10 - ids.length).fill(0)].join(".");

const geos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; // Canada and the ten provinces
const naics6213 = [389, 1210, 1211, 1212, 1213, 1214];

// 1. SEPH employment: offices of other health practitioners and all industries, monthly since 2001.
{
  const m = await members(14100201);
  const coords = geos.flatMap((g) => [335, 1].map((n) => coord(g, 1, n)));
  const rows = await series(14100201, coords, 400);
  await writeFile(
    out("14100201-employment.csv"),
    toCSV(
      ["ref_date", "geo", "naics_code", "naics", "employees", "quality", "symbol"],
      rows.map((r) => {
        const [g, , n] = r.coordinate.split(".").map(Number);
        return [r.refPer.slice(0, 7), m[1][g].memberNameEn, m[3][n].classificationCode, m[3][n].memberNameEn, r.value, STATUS[r.statusCode] ?? "", SYMBOL[r.symbolCode] ?? ""];
      }),
    ),
  );
  console.log(`14100201: ${rows.length} values`);
}

// 2. Business counts with employees, by employment size, June 2026.
{
  const m = await members(33101174);
  const coords = geos.flatMap((g) => [1, 2, 3, 4, 5, 6, 7, 8, 9].flatMap((s) => naics6213.map((n) => coord(g, s, n))));
  const rows = await series(33101174, coords, 1);
  await writeFile(
    out("33101174-businesses-with-employees.csv"),
    toCSV(
      ["ref_date", "geo", "employment_size", "naics_code", "naics", "businesses"],
      rows.map((r) => {
        const [g, s, n] = r.coordinate.split(".").map(Number);
        return [r.refPer.slice(0, 7), m[1][g].memberNameEn, m[2][s].memberNameEn, m[3][n].classificationCode, m[3][n].memberNameEn, r.value];
      }),
    ),
  );
  console.log(`33101174: ${rows.length} values`);
}

// 3. Business counts without employees, June 2026.
{
  const m = await members(33101175);
  const coords = geos.flatMap((g) => naics6213.map((n) => coord(g, n)));
  const rows = await series(33101175, coords, 1);
  await writeFile(
    out("33101175-businesses-without-employees.csv"),
    toCSV(
      ["ref_date", "geo", "naics_code", "naics", "businesses"],
      rows.map((r) => {
        const [g, n] = r.coordinate.split(".").map(Number);
        return [r.refPer.slice(0, 7), m[1][g].memberNameEn, m[2][n].classificationCode, m[2][n].memberNameEn, r.value];
      }),
    ),
  );
  console.log(`33101175: ${rows.length} values`);
}
