# Datafore

Datafore Analytics — marketing and content website.

This repo holds the public marketing site for Datafore, built with
[Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com). It does not contain the Datafore
analytics product itself, application code, infrastructure, or credentials.

## Stack

- **Astro** (static output) — pages, layouts, content collections
- **Tailwind CSS v4** — styling, via `@tailwindcss/vite`
- **Content collections** — blog posts live as Markdown in `src/content/blog/`

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

`.github/workflows/main.yml` builds the site and syncs `dist/` to the `www.datafore.ca` S3 bucket
(`ca-central-1`) on every push to `main`. It expects `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` repo secrets.
If a CloudFront distribution is later put in front of the bucket, uncomment the invalidation step in the workflow
and add a `CLOUDFRONT_DISTRIBUTION_ID` secret.
