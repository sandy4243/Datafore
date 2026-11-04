/**
 * Ranked horizontal bars as an HTML string (not SVG), so category labels stay at
 * reading size on a phone. Shared by report figures and the explorer.
 *
 * Bars are 16px with a 4px rounded data end, square at the baseline; every bar
 * carries its value at the tip; an optional reference value draws one vertical
 * line across all rows, named in a key above the bars (a label beside the line
 * would run off narrow screens).
 */
import { esc, formatValue, type FormatName } from "./format";

export interface BarRow {
  label: string;
  value: number;
  /** Highlight the bar the finding is about. */
  focus?: boolean;
}

export interface BarSpec {
  title: string;
  rows: BarRow[];
  format: FormatName;
  reference?: { label: string; value: number };
}

export function barListHTML(spec: BarSpec): string {
  const max = Math.max(...spec.rows.map((r) => r.value), spec.reference?.value ?? 0);
  const pct = (v: number) => (max > 0 ? (v / max) * 100 : 0);
  const out: string[] = [];
  if (spec.reference) {
    out.push(
      `<p class="dv-ref-key"><span class="dv-ref-swatch" aria-hidden="true"></span>${esc(spec.reference.label)}: <strong>${esc(formatValue(spec.reference.value, spec.format))}</strong></p>`,
    );
  }
  // Each row lays itself out from the chart's own width (a container query in
  // global.css): label, bar and value in one line when wide, label above when narrow.
  // The reference line is drawn on every track at the same position.
  const ref = spec.reference ? ` data-ref style="--dv-ref:${pct(spec.reference.value).toFixed(2)}%"` : "";
  out.push(`<div class="dv-bars"${ref} role="img" aria-label="${esc(spec.title)}">`);
  for (const r of spec.rows) {
    const value = formatValue(r.value, spec.format);
    out.push(
      `<div class="dv-bar-row">`,
      `<span class="dv-bar-label">${esc(r.label)}</span>`,
      `<span class="dv-bar-track" title="${esc(r.label)}: ${esc(value)}"><span class="dv-bar${r.focus ? " dv-focus" : ""}" style="width:${pct(r.value).toFixed(2)}%"></span></span>`,
      `<span class="dv-bar-value">${esc(value)}</span>`,
      `</div>`,
    );
  }
  out.push("</div>");
  return out.join("");
}
