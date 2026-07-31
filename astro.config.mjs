import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// The production build is served from the domain root (S3 -> www.datafore.ca).
// `DEPLOY_TARGET=gh-pages` builds the review copy served from the repo subpath.
const isPagesPreview = process.env.DEPLOY_TARGET === "gh-pages";

export default defineConfig({
  site: isPagesPreview ? "https://sandy4243.github.io" : "https://www.datafore.ca",
  base: isPagesPreview ? "/Datafore" : "/",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
