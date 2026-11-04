/**
 * Mounts an explorer rendered by Explorer.astro. Its configuration (dataset URL,
 * controls, SQL, view) arrives as JSON on the element. Each control becomes a
 * select filled from the data; the SQL runs as a prepared statement with the
 * selected values, and the result renders with the same chart code as the
 * report's static figures.
 */
import { openDataset } from "./engine";
import { barListHTML } from "../charts/bars";
import { lineChartSVG, lineTooltipData, type Role } from "../charts/line";
import { dataTableHTML } from "../charts/table";
import { enhanceLineCharts } from "../charts/interact";
import { esc, type FormatName } from "../charts/format";

interface Control {
  name: string;
  label: string;
  default?: string | number;
  order?: "asc" | "desc";
}

interface Config {
  title: string;
  dataUrl: string;
  view: "bars" | "line";
  sql: string;
  controls: Control[];
  format: FormatName;
  yMax?: number;
  valueLabel: string;
}

type Row = Record<string, unknown>;

export async function mountExplorer(root: HTMLElement): Promise<void> {
  const cfg: Config = JSON.parse(root.dataset.config ?? "{}");
  const status = root.querySelector<HTMLElement>("[data-status]")!;
  const output = root.querySelector<HTMLElement>("[data-output]")!;
  const form = root.querySelector<HTMLFormElement>("[data-controls]")!;
  const say = (text: string) => (status.textContent = text);

  try {
    say("Starting the query engine…");
    const conn = await openDataset(cfg.dataUrl);

    // Fill each select from the data itself, keeping the typed values.
    const typed = new Map<string, Map<string, unknown>>();
    for (const c of cfg.controls) {
      const res = await conn.query(
        `SELECT DISTINCT "${c.name}" AS v FROM data WHERE "${c.name}" IS NOT NULL ORDER BY 1 ${c.order === "desc" ? "DESC" : "ASC"}`,
      );
      const values = res.toArray().map((r) => (r.toJSON() as Row).v);
      const select = form.querySelector<HTMLSelectElement>(`select[name="${c.name}"]`)!;
      const map = new Map<string, unknown>();
      select.replaceChildren(
        ...values.map((v) => {
          map.set(String(v), v);
          const o = document.createElement("option");
          o.value = String(v);
          o.textContent = String(v);
          return o;
        }),
      );
      const wanted = c.default !== undefined ? String(c.default) : String(values[0]);
      select.value = map.has(wanted) ? wanted : String(values[0]);
      select.disabled = false;
      typed.set(c.name, map);
    }

    // Named parameters ($jurisdiction) become positional ones in order of use.
    const order: string[] = [];
    const sql = cfg.sql.replace(/\$([a-z_][a-z0-9_]*)/gi, (_, name: string) => {
      order.push(name);
      return "?";
    });
    const statement = await conn.prepare(sql);

    const run = async () => {
      const params = order.map((name) => {
        const select = form.querySelector<HTMLSelectElement>(`select[name="${name}"]`)!;
        return typed.get(name)?.get(select.value) ?? select.value;
      });
      say("Running the query…");
      const res = await statement.query(...params);
      const rows = res.toArray().map((r) => r.toJSON() as Row);
      render(cfg, rows, output);
      say(rows.length ? "" : "No data for this selection. CIHI does not report every region in every year.");
    };

    form.addEventListener("change", () => void run());
    await run();
  } catch (error) {
    console.error(error);
    say("The explorer couldn't start in this browser. The figures and data tables above show the same figures.");
  }
}

function render(cfg: Config, rows: Row[], output: HTMLElement) {
  if (cfg.view === "line") {
    const names = [...new Set(rows.map((r) => String(r.series)))];
    const spec = {
      title: cfg.title,
      format: cfg.format,
      yMax: cfg.yMax,
      series: names.map((name) => {
        const own = rows.filter((r) => String(r.series) === name);
        const role = (own[0]?.role as Role | undefined) ?? (names.length > 1 ? "context" : "primary");
        return { label: name, role, points: own.map((r) => ({ x: Number(r.x), y: r.y === null ? null : Number(r.y) })) };
      }),
    };
    output.innerHTML = `<div class="relative" data-line-chart tabindex="0" aria-label="${esc(cfg.title)}"><div class="hidden sm:block">${lineChartSVG(spec, "wide")}</div><div class="sm:hidden">${lineChartSVG(spec, "narrow")}</div></div>`;
    output.querySelector<HTMLElement>("[data-line-chart]")!.dataset.tooltip = JSON.stringify(lineTooltipData(spec));
    enhanceLineCharts(output);
  } else {
    const ref = rows.find((r) => r.role === "reference");
    const bars = rows.filter((r) => r.role !== "reference");
    output.innerHTML = barListHTML({
      title: cfg.title,
      format: cfg.format,
      rows: bars.map((r) => ({ label: String(r.label), value: Number(r.value), focus: r.role === "focus" })),
      reference: ref ? { label: String(ref.label), value: Number(ref.value) } : undefined,
    });
  }
  const table = root(output).querySelector<HTMLElement>("[data-table]");
  if (table) {
    const cols = cfg.view === "line"
      ? [{ key: "x", label: "Year" }, { key: "series", label: "Series" }, { key: "y", label: cfg.valueLabel, format: cfg.format }]
      : [{ key: "label", label: "Health region" }, { key: "value", label: cfg.valueLabel, format: cfg.format }];
    table.innerHTML = dataTableHTML(cols, rows);
  }
}

const root = (el: HTMLElement) => el.closest<HTMLElement>("[data-explorer]")!;
