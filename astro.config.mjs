import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// The production build is served from the domain root (S3 -> www.datafore.ca).
// `DEPLOY_TARGET=gh-pages` builds the review copy served from the repo subpath.
const isPagesPreview = process.env.DEPLOY_TARGET === "gh-pages";
const base = isPagesPreview ? "/Datafore" : "/";

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
  site: isPagesPreview ? "https://sandy4243.github.io" : "https://www.datafore.ca",
  base,
  integrations: [sitemap()],
  markdown: {
    processor: unified({ rehypePlugins: [rehypeBasePaths()] }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
