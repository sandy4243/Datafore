import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

// Two build targets:
//   (default)              served from the root of https://datafore.ca
//   DEPLOY_TARGET=gh-pages review copy served from the repo subpath on github.io
// The apex is canonical: the previous Dorik site redirected www -> apex, so
// keeping that preserves every existing canonical URL and inbound link.
const isPagesPreview = process.env.DEPLOY_TARGET === "gh-pages";
const base = isPagesPreview ? "/Datafore" : "/";

// Astro does not apply `base` to redirect targets, so it is added here —
// without it the preview build points outside its subpath and 404s.
const withBase = (path) => (base === "/" ? path : base + path);

/**
 * Markdown authors write ordinary root-relative links like `[contact](/contact/)`,
 * which `withBase()` never sees — so on a subpath deploy they 404. Rewrite them at
 * build time instead of asking every post to know about the base path.
 */
function rehypeBasePaths() {
  const prefix = base.replace(/\/$/, "");
  return () => (tree) => {
    if (!prefix) return;
    const walk = (node) => {
      if (node.type === "element" && node.properties) {
        for (const attr of ["href", "src"]) {
          const value = node.properties[attr];
          // Root-relative only: leave absolute URLs, protocol-relative, anchors and mailto alone.
          if (typeof value === "string" && value.startsWith("/") && !value.startsWith("//")) {
            node.properties[attr] = prefix + value;
          }
        }
      }
      for (const child of node.children ?? []) walk(child);
    };
    walk(tree);
  };
}

export default defineConfig({
  site: isPagesPreview ? "https://sandy4243.github.io" : "https://datafore.ca",
  base,
  // The form confirmation page is a destination, not content: keep it out of the sitemap.
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes("/contact/thanks") })],
  // GitHub Pages cannot issue real 301s, so these become meta-refresh pages.
  // That keeps old links working for visitors; it passes less search value than
  // a server redirect would. Targets for the legacy Dorik URLs are a proposal —
  // see docs/CUTOVER.md before the domain moves.
  redirects: Object.fromEntries(
    Object.entries({
      // Renamed when the site moved to the system-of-action thesis.
      "/blog/why-allied-health-needs-purpose-built-analytics": "/blog/the-gap-between-knowing-and-doing",

      // Legacy Dorik pages (datafore.ca before the rebuild).
      // Insights merged into Research & Insights; Trust hidden for now (Nov 2026).
      "/blog": "/research",
      "/trust": "/about",
      // CIHI physiotherapist report offline pending permission (Nov 2026). Remove when it is republished.
      "/research/physiotherapists-bc-2025": "/research",

      "/services": "/platform",
      "/career": "/about",

      // Legacy Dorik ELT/ETL posts and category. No equivalent content exists on
      // the new site, so they land on the Insights index rather than 404.
      "/post/ELT-vs-ETL-Choosing-the-Right-Data-Processing-Approach": "/research",
      "/post/Evaluating-an-ELT-tool": "/research",
      "/post/Harnessing-Business-Intelligence-for-Enhanced-Decision-Making": "/research",
      "/post/Unlocking-the-Power-of-ETLELT-The-Key-Importance-of-Data-Quality-and-Data-Lineage": "/research",
      "/category/ELT": "/research",
    }).map(([from, to]) => [from, withBase(to)]),
  ),
  markdown: {
    processor: unified({ rehypePlugins: [rehypeBasePaths()] }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
