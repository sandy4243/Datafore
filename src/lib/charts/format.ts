/**
 * Number formats for report figures. Named so authors write `format="pct"` in a
 * report rather than a format string, and every report reads the same way.
 */
export type FormatName = "int" | "dec1" | "pct" | "pct0";

const nf = (opts: Intl.NumberFormatOptions) => new Intl.NumberFormat("en-CA", opts);
const formats: Record<FormatName, Intl.NumberFormat> = {
  int: nf({ maximumFractionDigits: 0 }),
  dec1: nf({ minimumFractionDigits: 1, maximumFractionDigits: 1 }),
  // Percent values arrive already scaled (75.4 means 75.4%).
  pct: nf({ minimumFractionDigits: 1, maximumFractionDigits: 1 }),
  pct0: nf({ maximumFractionDigits: 0 }),
};

export function formatValue(value: unknown, format: FormatName = "int"): string {
  if (value === null || value === undefined || value === "") return "—";
  const n = Number(value);
  if (!Number.isFinite(n)) return String(value);
  const text = formats[format].format(n);
  return format === "pct" || format === "pct0" ? `${text}%` : text;
}

/** Escape text for insertion into HTML or SVG markup. Data labels are untrusted. */
export function esc(value: unknown): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
