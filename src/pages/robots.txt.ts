import type { APIRoute } from "astro";
import { isPreviewDeploy } from "../lib/paths";

/**
 * Generated rather than static, because the two deploy targets need opposite
 * answers. The production site should be crawled; the Pages review copy is
 * marked noindex, so a robots.txt inviting crawlers — and pointing them at
 * production's sitemap — contradicts it.
 */
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL("sitemap-index.xml", site).href;

  const body = isPreviewDeploy
    ? ["# Review copy — not for indexing.", "User-agent: *", "Disallow: /", ""].join("\n")
    : ["User-agent: *", "Allow: /", "", `Sitemap: ${sitemap}`, ""].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
