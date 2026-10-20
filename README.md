# Datafore

### ▶ [**View the live site — sandy4243.github.io/Datafore**](https://sandy4243.github.io/Datafore/)

*Review copy, rebuilt automatically on every push to `main`. Production is [www.datafore.ca](https://www.datafore.ca).*

---

Marketing and content website for Datafore — a clinic intelligence layer for Canadian allied health practices.

This repo holds the public marketing site only, built with [Astro](https://astro.build) and
[Tailwind CSS](https://tailwindcss.com). It does not contain the Datafore product itself, application code,
infrastructure, or credentials.

## Stack

- **Astro** (static output) — pages, layouts, content collections
- **Tailwind CSS v4** — styling, via `@tailwindcss/vite`
- **Content collections** — blog posts live as Markdown in `src/content/blog/`

## Working on this

Two files carry the context that isn't obvious from the code, and both are worth reading before making changes:

- **[`PRODUCT.md`](./PRODUCT.md)** — product truth: who this is for, what it does, what must never be claimed
  (there are no customers or benchmark data yet), and what stays internal (pricing, unit economics, roadmap).
- **[`DESIGN.md`](./DESIGN.md)** — the design system: tokens, type ramp, components, and the named rules the
  site is built on. A detector checks the built output against it, so undocumented colours and sizes surface
  as drift.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check + production build to dist/
npm run preview   # preview the production build locally
```

## Project structure

```
src/
  components/   Header, Footer, shared UI
  content/blog/ blog posts (Markdown)
  layouts/      shared page layout (SEO head, header/footer)
  pages/        route -> page mapping (index, about, platform, blog, contact, privacy)
  styles/       global.css (Tailwind + brand tokens)
public/
  images/       static images served as-is
```

## Deployment

Two workflows run on every push to `main`, from the same source:

**Production — S3 (`.github/workflows/main.yml`)**
Builds the site and syncs `dist/` to the `www.datafore.ca` S3 bucket (`ca-central-1`). Expects
`AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` repo secrets. If a CloudFront distribution is later put in front
of the bucket, uncomment the invalidation step in the workflow and add a `CLOUDFRONT_DISTRIBUTION_ID` secret.

**Review copy — GitHub Pages (`.github/workflows/pages.yml`)**
Publishes a browsable copy to `https://sandy4243.github.io/Datafore/`, so the site can be reviewed without
touching production. This build is served from a repo subpath and is marked `noindex` so it never competes with
the real domain in search.

One-time setup, required before this workflow can succeed: **Settings → Pages → Build and deployment → Source:
GitHub Actions**. The workflow does not auto-enable Pages, because the default workflow token is not permitted to
create a Pages site and the attempt fails the run. Until the source is set, the build job fails at "Configure
Pages" with `Get Pages site failed: Not Found`.

Publishing Pages from a *private* repo also requires a paid GitHub plan; on the free plan the repo must be public.

### Base paths

Because the Pages copy is served from `/Datafore/` and production from `/`, internal links and `public/` asset
URLs must go through `withBase()` in `src/lib/paths.ts` rather than being hardcoded. `DEPLOY_TARGET=gh-pages`
selects the subpath build; the default build targets the domain root.
