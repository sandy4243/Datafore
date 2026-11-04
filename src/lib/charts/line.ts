/**
 * Line chart as an SVG string. Pure: no DOM, so the same function renders the
 * server-side figures in a report and the in-browser explorer.
 *
 * Mark specs follow the dataviz rules: 2px lines, 8px markers with a 2px surface
 * ring, hairline solid grid, selective direct labels (ends only).
 */
import { esc, formatValue, type FormatName } from "./format";
import { linear, niceTicks } from "./scale";

export type Role = "primary" | "focus" | "context";

export interface LinePoint {
  x: number;
  y: number | null;
  /** Drawn as a hollow marker, e.g. a year reported under a different method. */
  flag?: boolean;
}

export interface LineSeries {
  label: string;
  role: Role;
  points: LinePoint[];
}

export interface LineSpec {
  title: string;
  series: LineSeries[];
  format: FormatName;
  /** Fix the top of the y axis (e.g. 100 for percentages). */
  yMax?: number;
}

export type Layout = "wide" | "narrow";

const SIZES: Record<Layout, { w: number; h: number; right: number }> = {
  wide: { w: 720, h: 300, right: 132 },
  narrow: { w: 360, h: 260, right: 58 },
};

export interface TooltipColumn {
  x: number;
  rows: { label: string; role: Role; value: string; flag: boolean }[];
}

export function lineTooltipData(spec: LineSpec): TooltipColumn[] {
  const xs = [...new Set(spec.series.flatMap((s) => s.points.map((p) => p.x)))].sort((a, b) => a - b);
  return xs.map((x) => ({
    x,
    rows: spec.series.map((s) => {
      const p = s.points.find((q) => q.x === x);
      return { label: s.label, role: s.role, value: formatValue(p?.y ?? null, spec.format), flag: !!p?.flag };
    }),
  }));
}

export function lineChartSVG(spec: LineSpec, layout: Layout): string {
  const { w, h, right } = SIZES[layout];
  const multi = spec.series.length > 1;
  const xs = [...new Set(spec.series.flatMap((s) => s.points.map((p) => p.x)))].sort((a, b) => a - b);
  const values = spec.series.flatMap((s) => s.points.map((p) => p.y)).filter((v): v is number => v !== null);
  const ticks = spec.yMax ? niceTicks(spec.yMax, 4) : niceTicks(Math.max(...values, 0), 4);
  const yTop = spec.yMax ?? ticks[ticks.length - 1];
  const tickText = ticks.map((t) => formatValue(t, spec.format === "pct" ? "pct0" : spec.format));
  const left = Math.max(...tickText.map((t) => t.length)) * 7 + 14;
  const top = 18;
  const bottom = 30;

  const x = linear(xs[0], xs[xs.length - 1], left, w - right);
  const y = linear(0, yTop, h - bottom, top);
  const step = xs.length > 1 ? (x(xs[xs.length - 1]) - x(xs[0])) / (xs.length - 1) : w - left - right;

  const parts: string[] = [];
  parts.push(
    `<svg class="dv-svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(spec.title)}" data-layout="${layout}">`,
    `<title>${esc(spec.title)}</title>`,
  );

  // Grid and y ticks.
  ticks.forEach((t, i) => {
    const ty = y(t).toFixed(1);
    if (t !== 0) parts.push(`<line class="dv-grid" x1="${left}" x2="${w - right + 8}" y1="${ty}" y2="${ty}"/>`);
    parts.push(`<text class="dv-tick" x="${left - 10}" y="${(+ty + 4).toFixed(1)}" text-anchor="end">${esc(tickText[i])}</text>`);
  });
  parts.push(`<line class="dv-baseline" x1="${left}" x2="${w - right + 8}" y1="${y(0).toFixed(1)}" y2="${y(0).toFixed(1)}"/>`);

  // X ticks: every year when there's room, otherwise every other one plus the last.
  xs.forEach((xv, i) => {
    const show = layout === "wide" || i % 2 === 0 || i === xs.length - 1;
    if (!show || (layout === "narrow" && i === xs.length - 2 && xs.length % 2 === 0)) return;
    parts.push(`<text class="dv-tick" x="${x(xv).toFixed(1)}" y="${h - 8}" text-anchor="middle">${esc(xv)}</text>`);
  });

  // Crosshair, positioned by the interaction script.
  parts.push(`<line class="dv-crosshair" x1="0" x2="0" y1="${top - 6}" y2="${h - bottom}" opacity="0" data-crosshair/>`);

  for (const s of spec.series) {
    // Break the line at missing values rather than bridging them.
    let d = "";
    let pen = false;
    for (const p of s.points) {
      if (p.y === null) {
        pen = false;
        continue;
      }
      d += `${pen ? "L" : "M"}${x(p.x).toFixed(1)},${y(p.y).toFixed(1)}`;
      pen = true;
    }
    parts.push(`<path class="dv-line dv-${s.role}" d="${d}"/>`);
    for (const p of s.points) {
      if (p.y === null) continue;
      parts.push(
        `<circle class="dv-dot dv-${s.role}${p.flag ? " dv-dot-flag" : ""}" cx="${x(p.x).toFixed(1)}" cy="${y(p.y).toFixed(1)}" r="4"/>`,
      );
    }

    // Direct labels: the last value always; the first too when there's one series.
    const real = s.points.filter((p) => p.y !== null);
    const last = real[real.length - 1];
    const first = real[0];
    if (last) {
      const label = multi && layout === "wide" ? `${s.label} ${formatValue(last.y, spec.format)}` : formatValue(last.y, spec.format);
      parts.push(`<text class="dv-value" x="${(x(last.x) + 10).toFixed(1)}" y="${(y(last.y!) + 4).toFixed(1)}">${esc(label)}</text>`);
    }
    if (!multi && first && first !== last) {
      parts.push(
        `<text class="dv-value" x="${x(first.x).toFixed(1)}" y="${(y(first.y!) - 12).toFixed(1)}" text-anchor="start">${esc(formatValue(first.y, spec.format))}</text>`,
      );
    }
  }

  // Hit columns: one per x, wider than any mark, for hover and touch.
  xs.forEach((xv, i) => {
    const hx = x(xv) - step / 2;
    parts.push(
      `<rect data-i="${i}" x="${hx.toFixed(1)}" y="${top - 6}" width="${Math.max(step, 24).toFixed(1)}" height="${h - bottom - top + 6}" fill="transparent"/>`,
    );
  });

  parts.push("</svg>");
  return parts.join("");
}
