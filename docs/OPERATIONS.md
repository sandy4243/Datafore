# Running datafore.ca

What the site depends on, where each piece is configured, and how to do the routine jobs. Start here; the detail
lives in the linked pages.

| Area | Service | Configured in | Details |
|---|---|---|---|
| Code and content | GitHub, `sandy4243/Datafore` | This repo | [README](../README.md) |
| Hosting | GitHub Pages (built by GitHub Actions) | `.github/workflows/pages.yml`, repo Settings → Pages | [Hosting](#hosting-and-deploys) |
| Domain DNS | AWS Route 53 | Route 53 → Hosted zones → datafore.ca | [DNS.md](./DNS.md) |
| Email | Google Workspace | admin.google.com | [EMAIL.md](./EMAIL.md) |
| Contact form | FormSubmit (formsubmit.co) | `src/components/ContactForm.astro` | [Contact form](#contact-form) |
| Call booking | Calendly | `src/pages/contact.astro` (`bookingURL`) | [Booking](#call-booking) |
| Search | Google Search Console | search.google.com/search-console | [Search Console](#google-search-console) |
| Analytics | None yet | — | [Analytics](#analytics) |

## Hosting and deploys

- **Publishing is merging.** Every push to `main` runs *Deploy (GitHub Pages)* and the site updates in about two
  minutes. Check progress under the repo's **Actions** tab.
- **Every pull request** runs *PR checks*, which type-checks and builds both targets. Merge only when it is green.
- **Repository variable `CUSTOM_DOMAIN=true`** (Settings → Secrets and variables → Actions → Variables) makes the
  build target `https://datafore.ca` from the domain root. Unset, it builds the old github.io review copy. Leave it
  set.
- **Custom domain** is set in Settings → Pages (`datafore.ca`, *Enforce HTTPS* on). There is deliberately no
  `CNAME` file in the repo; with the Actions source, GitHub ignores it.
- **Visitors see a stale page?** A hard refresh fixes it; GitHub's CDN updates within minutes.
- How the domain was moved here, and how to move it back: [CUTOVER.md](./CUTOVER.md).

Retired: the old `main.yml` S3 sync workflow was removed, and the AWS access-key secrets it used were deleted from
the repo (October 2026).

## Contact form

Every "Start a conversation" button leads to `/contact/`, where a form posts to **FormSubmit**, a free form-to-email
relay. FormSubmit emails each submission to **info@datafore.ca** with the subject "Website enquiry: <topic>", and
Reply goes straight to the sender. No account, API key or server.

- **Activated 20 October 2026.** FormSubmit holds deliveries for a new address until the owner clicks the
  *Activate* link it emails after the first submission. That has been done for info@datafore.ca.
- **Changing the destination address** (the `inbox` constant in `ContactForm.astro`) needs a fresh activation:
  submit once from the live site, then click *Activate* in the email FormSubmit sends to the new address.
- **Hiding the address:** FormSubmit's activation email includes a random alias. Replacing the address in the form
  URL with that alias keeps info@datafore.ca out of the page source. Optional, since the address is already shown
  on the site.
- **Sponsor line:** free-plan emails carry a small FormSubmit sponsor block. Their paid plan removes it.
- **How the form behaves:** with JavaScript it sends in place (*Sending…* → thank-you message); if sending fails
  it shows an "email info@datafore.ca directly" link with the message pre-filled. Without JavaScript it is a normal
  form post that lands on `/contact/thanks/`. A hidden honeypot field drops most bots.
- **Topic links:** `/contact/?topic=snapshot` and `/contact/?topic=partner` preselect the enquiry type.
- **Privacy:** FormSubmit and Calendly are named in the privacy policy as third parties that may process data
  outside Canada. The form asks people not to include patient information. Update `src/pages/privacy.astro` if
  either service changes.
- **Testing sends a real email** to info@datafore.ca; there is no sandbox.

## Call booking

The contact page's *Book a call* button opens `https://calendly.com/sandeep-datafore/initial` in a new tab.
Change the link in `src/pages/contact.astro` (the `bookingURL` constant). The meeting type itself (length,
availability, questions) is managed in Calendly.

## Google Search Console

**Status: not yet verified.** The site itself is ready: `robots.txt` allows crawling and points to the sitemap,
the sitemap lists every real page, `http://` and `www.` redirect to `https://datafore.ca/`, and every page has a
canonical URL.

To finish:

1. In Search Console, **Add property → Domain → `datafore.ca`** (a Domain property covers http, https, www and any
   subdomains).
2. Copy the `google-site-verification=…` value. In Route 53, **edit** the blank-name TXT record and add it as a new
   quoted line, keeping the SPF and `MS=` lines (see [DNS.md](./DNS.md#route-53-rules-that-catch-people-out)).
   Click *Verify*; retry after 15 minutes if needed.
3. **Sitemaps** → submit `sitemap-index.xml`.
4. Optional: **URL inspection** → `https://datafore.ca/` → *Request indexing*; repeat for `/platform/`, `/trust/`
   and `/about/`.
5. Optional: in Bing Webmaster Tools, *Import from Google Search Console* (this also covers DuckDuckGo).

Expect old Dorik URLs to appear as "Page with redirect" or "Not found (404)" for a while; Google drops them.
Redirects for the known old URLs are in `astro.config.mjs`.

Then update this section and the [DNS.md](./DNS.md) table.

## Analytics

None. The site sets no cookies and loads no tracking scripts, which the privacy policy reflects. Adding Google
Analytics or Tag Manager needs a cookie-consent banner and a privacy policy update in the same change.

## Open items

- [ ] Verify Google Search Console (above).
- [ ] Tighten DMARC to `p=quarantine`, then `p=reject` ([EMAIL.md](./EMAIL.md#dmarc-plan)), from about mid-November
      2026 once reports are clean.
- [ ] Analytics with consent, if wanted.
- [ ] Real photography (team, clinic at work) to replace graphics where it helps; guidance in `DESIGN.md`.
- [ ] Making the repo private needs a paid GitHub plan (Pages from a private repo); the site stays public either way.
