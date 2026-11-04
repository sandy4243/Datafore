/** The table view every figure carries, so no value depends on seeing the chart. */
import { esc, formatValue, type FormatName } from "./format";

export interface TableColumn {
  key: string;
  label: string;
  format?: FormatName;
}

export function dataTableHTML(columns: TableColumn[], rows: Record<string, unknown>[]): string {
  const head = columns
    .map((c, i) => `<th scope="col" class="py-2 pr-4 font-semibold text-navy-950 ${i ? "text-right" : "text-left"}">${esc(c.label)}</th>`)
    .join("");
  const body = rows
    .map(
      (r) =>
        `<tr class="border-t border-navy-100">${columns
          .map((c, i) =>
            i === 0
              ? `<th scope="row" class="py-2 pr-4 text-left font-normal text-graphite-700">${esc(c.format ? formatValue(r[c.key], c.format) : r[c.key])}</th>`
              : `<td class="py-2 pr-4 text-right text-graphite-800">${esc(c.format ? formatValue(r[c.key], c.format) : r[c.key])}</td>`,
          )
          .join("")}</tr>`,
    )
    .join("");
  return `<table class="figures w-full text-sm"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}
