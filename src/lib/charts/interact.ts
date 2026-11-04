/**
 * Hover and keyboard layer for line charts rendered by lineChartSVG. A crosshair
 * snaps to the nearest year and one tooltip lists every series there (value
 * first, series second). Arrow keys step through years when the chart has focus.
 * The same values are always available in the figure's table view.
 */
import type { Role, TooltipColumn } from "./line";

export function enhanceLineCharts(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>("[data-line-chart]").forEach((chart) => {
    if (chart.dataset.enhanced) return;
    chart.dataset.enhanced = "true";
    const columns: TooltipColumn[] = JSON.parse(chart.dataset.tooltip ?? "[]");
    const tip = document.createElement("div");
    tip.className = "dv-tooltip";
    tip.hidden = true;
    chart.append(tip);
    let current = columns.length - 1;

    const visibleSvg = () =>
      [...chart.querySelectorAll<SVGSVGElement>("svg.dv-svg")].find((s) => s.getClientRects().length > 0);

    const show = (i: number) => {
      const svg = visibleSvg();
      const col = columns[i];
      if (!svg || !col) return;
      current = i;
      const hit = svg.querySelector<SVGRectElement>(`rect[data-i="${i}"]`);
      const cross = svg.querySelector<SVGLineElement>("[data-crosshair]");
      if (!hit || !cross) return;
      const cx = hit.x.baseVal.value + hit.width.baseVal.value / 2;
      cross.setAttribute("x1", String(cx));
      cross.setAttribute("x2", String(cx));
      cross.setAttribute("opacity", "1");

      // Build with textContent: labels are data.
      tip.replaceChildren();
      const head = document.createElement("p");
      head.className = "mb-1 text-xs text-graphite-600";
      head.textContent = String(col.x);
      tip.append(head);
      for (const row of col.rows) tip.append(tooltipRow(row.label, row.value, row.role, row.flag));
      tip.hidden = false;

      const box = svg.getBoundingClientRect();
      const host = chart.getBoundingClientRect();
      const scale = box.width / svg.viewBox.baseVal.width;
      const px = box.left - host.left + cx * scale;
      const flip = px + tip.offsetWidth + 16 > host.width;
      tip.style.left = `${flip ? px - tip.offsetWidth - 12 : px + 12}px`;
      tip.style.top = `${box.top - host.top + 8}px`;
    };

    const hide = () => {
      tip.hidden = true;
      chart.querySelectorAll("[data-crosshair]").forEach((c) => c.setAttribute("opacity", "0"));
    };

    chart.addEventListener("pointerover", (e) => {
      const i = (e.target as Element).getAttribute?.("data-i");
      if (i !== null && i !== undefined) show(Number(i));
    });
    chart.addEventListener("pointerleave", hide);
    chart.addEventListener("focus", () => show(current));
    chart.addEventListener("blur", hide);
    chart.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        show(Math.min(columns.length - 1, Math.max(0, current + (e.key === "ArrowRight" ? 1 : -1))));
      } else if (e.key === "Escape") hide();
    });
  });
}

function tooltipRow(label: string, value: string, role: Role, flag: boolean): HTMLElement {
  const p = document.createElement("p");
  p.className = "flex items-center gap-2 py-0.5";
  const key = document.createElement("span");
  key.className = `dv-key dv-${role}`;
  const strong = document.createElement("span");
  strong.className = "font-semibold text-navy-950";
  strong.textContent = value + (flag ? "*" : "");
  const name = document.createElement("span");
  name.className = "text-graphite-600";
  name.textContent = label;
  p.append(key, strong, name);
  return p;
}
