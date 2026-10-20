# Cutting datafore.ca over to GitHub Pages

This is the runbook for moving `datafore.ca` from the old Dorik site to this repo, served by GitHub Pages.
Merging code does **not** move the domain. Nothing changes for visitors until step 4, and everything before it
is reversible.

## What is actually being changed

- **Domain registration:** not touched. This runbook never transfers the domain.
- **DNS (AWS Route 53):** the `datafore.ca` A record and the `www` CNAME change. Nothing else does.
- **Email (Google Workspace):** not touched. The MX records and the `MS=` TXT record stay exactly as they are.
- **Hosting:** moves from Dorik to GitHub Pages.

## DNS as it was when this was written

Recorded so rollback is a copy-paste, not a recollection. Re-check before you start, since it may have changed.

| Name | Type | Value | TTL |
|---|---|---|---|
| `datafore.ca` | A | `18.119.18.18` (Dorik) | 300 |
| `www.datafore.ca` | CNAME | `datafore.ca.` | 300 |
| `datafore.ca` | MX | `1 aspmx.l.google.com`, `5 alt1/alt2.aspmx.l.google.com`, `10 alt3/alt4.aspmx.l.google.com` | 300 |
| `datafore.ca` | TXT | `MS=…` (a verification record, leave it) | — |
| `datafore.ca` | NS | four `awsdns` servers | 172800 |

There is no AAAA record and no CAA record, so nothing blocks certificate issuance. TTLs are already 300 seconds,
so a change propagates within about five minutes for most resolvers.

## Before you start

- [ ] **Decide the old Dorik URLs.** `astro.config.mjs` proposes: `/services` → `/platform`, `/career` →
      `/about`, and the four ELT/ETL posts plus `/category/ELT` → `/blog`. Change them if you want different
      targets, or migrate the posts instead.
- [ ] **Decide about the booking link.** The old site links to `calendly.com/sandeep-datafore/initial` and this
      one does not, so cutting over removes a way for people to book a call. Add it first if you want to keep it.
- [ ] **Export what you want from Dorik** (the four posts and any copy). Don't cancel Dorik yet.
- [ ] **Fix email authentication** if you haven't. The domain has no SPF, DKIM or DMARC. This is independent
      of the cutover but worth doing before bids go out.
- [ ] **Confirm your GitHub plan** if you intend to make the repo private. Pages from a private repo needs a
      paid plan, and downgrading later unpublishes the site.

## Steps

### 1. Merge the PR that contains this file

No visible change. The workflow still builds the review copy, because the `CUSTOM_DOMAIN` variable is unset.

### 2. Verify the domain with GitHub

GitHub → your **account** settings → Pages → *Add a domain* → `datafore.ca`. GitHub shows a TXT record named
`_github-pages-challenge-<username>`. Add it in Route 53, then click *Verify*. This stops anyone else claiming
the domain on their own Pages site if it is ever unlinked.

### 3. Switch the build to the real site

Repo → Settings → Secrets and variables → Actions → **Variables** → New variable:
`CUSTOM_DOMAIN` = `true`. Then Actions → *Deploy (GitHub Pages)* → *Run workflow*.

The site now builds for the domain root. Until the next steps finish,
`sandy4243.github.io/Datafore/` will look broken. That is expected, and nobody visits it.

### 4. Set the custom domain

Repo → Settings → Pages → **Custom domain** → `datafore.ca` → Save. GitHub reports that DNS isn't configured
yet. That's expected, since DNS still points at Dorik.

> With the "GitHub Actions" source, GitHub ignores a `CNAME` file in the repo. The domain is set only here, and
> a `CNAME` file is deliberately not part of this repo.

### 5. Change DNS in Route 53

Edit the existing records. Don't delete and recreate them, and don't touch MX or TXT.

**Apex `datafore.ca`**, replace the A record's value with all four:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Optionally add an AAAA record with:

```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

**`www`**, change the CNAME from `datafore.ca.` to `<your-github-username>.github.io.`

Confirm these addresses against GitHub's current "Managing a custom domain for your GitHub Pages site" docs
before applying, since they are theirs to change.

### 6. Wait for HTTPS

Settings → Pages shows a DNS check, then provisions a certificate. That is usually minutes and occasionally an
hour. Expect certificate warnings on `datafore.ca` until it completes. When *Enforce HTTPS* becomes clickable,
tick it.

### 7. Verify

```bash
curl -sI https://datafore.ca/            # 200, served by GitHub (server: GitHub.com)
curl -sI https://www.datafore.ca/        # redirects to https://datafore.ca/
curl -s  https://datafore.ca/robots.txt  # Allow: / and a datafore.ca sitemap
curl -s  https://datafore.ca/ | grep -c noindex   # 0 — the real site must be indexable
curl -s  https://datafore.ca/sitemap-index.xml    # lists datafore.ca URLs
```

Then click through the old URLs (`/services`, `/career`, one `/post/...`), and **send a test email to and from
an `@datafore.ca` address** to confirm mail is untouched.

### 8. Tell Google

Add `datafore.ca` as a property in Search Console, submit `https://datafore.ca/sitemap-index.xml`, and use
URL inspection on the home page.

### 9. Retire Dorik

After about a week of stable running. Keep the export.

## Rollback

At any point before Dorik is cancelled, in Route 53:

1. Set the apex A record back to `18.119.18.18`.
2. Set `www` back to a CNAME of `datafore.ca.`.

Within about five minutes the old site is back. The GitHub side can stay as it is.

## Known limits of this setup

- **No real 301s.** GitHub Pages can't issue server redirects, so the legacy URLs are meta-refresh pages. They
  work for visitors and carry less search value than a 301.
- **No custom headers.** Security headers (CSP, HSTS beyond GitHub's default) can't be set.
- **No server code.** The contact page uses `mailto:` and `tel:` links. A real form needs an outside service.
- **One site per repo, no per-PR preview URLs.**

If those limits start to matter, Cloudflare Pages removes all four, and the move is mostly a DNS change.
