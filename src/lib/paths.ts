/**
 * Internal links and public asset URLs must survive being served from a
 * subpath. The S3/production build is served from the domain root, while the
 * GitHub Pages preview is served from `/<repo>/`, so every absolute in-site
 * URL goes through this helper rather than being hardcoded.
 */
const BASE = import.meta.env.BASE_URL;

export function withBase(path: string): string {
  const base = BASE.endsWith("/") ? BASE.slice(0, -1) : BASE;
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
}

/** True when the build is served from a subpath, i.e. the Pages preview. */
export const isPreviewDeploy = BASE !== "/";
