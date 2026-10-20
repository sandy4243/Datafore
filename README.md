# Datafore

### ▶ [**View the live site — datafore.ca**](https://datafore.ca)

*Served by GitHub Pages and rebuilt automatically on every push to `main`. How the domain was moved, and how to move it back, is in [`docs/CUTOVER.md`](./docs/CUTOVER.md).*

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
  pages/        route -> page mapping (index, platform, trust, about, blog, contact, privacy)
  styles/       global.css (Tailwind + brand tokens)
public/
  images/       static images served as-is
```

## Deployment

The site deploys to **GitHub Pages** from `.github/workflows/pages.yml` on every push to `main`. That workflow has
two modes, chosen by the `CUSTOM_DOMAIN` repository variable:

| `CUSTOM_DOMAIN` | Serves | Indexable |
|---|---|---|
| unset | `https://sandy4243.github.io/Datafore/` (review copy, from a subpath) | No — `noindex` and `Disallow: /` |
| `true` | `https://datafore.ca` (the real site, from the root) — **current setting** | Yes |

Merging code never flips the mode. Moving the domain is a deliberate, reversible sequence of steps, written up in
**[`docs/CUTOVER.md`](./docs/CUTOVER.md)**.

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**. The workflow does not
auto-enable Pages, because the default workflow token is not permitted to create a Pages site. Until the source is
set, the build fails at "Configure Pages" with `Get Pages site failed: Not Found`.

Pages from a *private* repo needs a paid GitHub plan, and the published site is public either way.

`.github/workflows/pr-checks.yml` type-checks and builds both targets on every pull request.

> **`main.yml` is legacy.** It syncs to an S3 bucket that never served `datafore.ca`, and fails on an expired AWS
> token. It is not part of the deploy path and can be removed or made manual-only.

### Base paths

Because the review copy is served from `/Datafore/` and the real site from `/`, internal links and `public/` asset
URLs must go through `withBase()` in `src/lib/paths.ts` rather than being hardcoded. `DEPLOY_TARGET=gh-pages`
selects the subpath build; the default build targets the domain root.
