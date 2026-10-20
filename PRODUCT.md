# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro (static output) + Tailwind CSS v4 for the marketing site. The product itself runs on AWS `ca-central-1`
(S3 + Glue + Athena, dbt, RDS PostgreSQL, FastAPI, Evidence.dev, Lambda → HubSpot).

## Users

Owners and operations leads of Canadian private allied health clinics — physiotherapy, chiropractic, massage
therapy, and mental health — running on practice management systems (Jane App, Cliniko, Owl Practice). Typically
solo to multi-location, with no analyst on staff and no business intelligence beyond what the PMS reports.

Secondary audience: evaluators — prospective partners, funders, grant reviewers and procurement panels — who need
to find governance, status and company facts quickly. The site is also used as supporting material for bids, so
the `/trust/` page and plain statements of status matter as much as the marketing claims.

## Product Purpose

A PMS-agnostic **Clinic Intelligence Layer** that sits above practice management systems and the clinic's CRM.
It turns raw clinic data into revenue recovery, automated patient reactivation, and predictive operational
insight — and then acts on it, rather than stopping at a dashboard.

## Positioning

**"PMS tools are systems of record. AI is an engine of analysis. We are the system of action."**

The differentiator is the closed loop, not the reporting. Raw analytics say *what* is wrong; Datafore says what
to do and does it: detect a 90-day patient gap → create the CRM reactivation task → trigger the sequence →
track the resulting booking → report the ROI. Three durable advantages:

1. **Benchmarking network effect** — once enough clinics are on the platform, peer comparison becomes possible
   in a way a single PMS vendor cannot offer (privacy and competitive conflicts) and a new entrant cannot
   quickly replicate. *Not yet true — requires ~20–30 clinics. Must be described as forthcoming, never as live.*
2. **Workflow integration lock-in** — the closed loop becomes the clinic's patient communication engine.
3. **Compliance-first architecture** — Canadian data residency, PIPEDA/PIPA/PHIPA by design, de-identified
   patient analytics. Most vendors won't do this properly for small Canadian clinics.

Datafore is the neutral aggregator *above* all PMS tools, not a competitor to any one of them.

On the site this is expressed strategically rather than technically: Datafore is a clinic intelligence partner
that helps leaders run *the business of care*, with outcomes (retention, capacity, revenue clarity, evidence-led
growth) leading and mechanism second. The voice is that of a senior advisor — confident, plain, unhurried.

## Operating Context

Clinics collect large volumes of data and get effectively zero strategic intelligence from it. PMS reporting is
operational, not strategic. No-shows, scheduling gaps, and patient churn cost an estimated **10–20% of revenue**.
Marketing spend is untracked against actual bookings. No cross-clinic benchmarking exists in Canada today.

Integration reality: Jane App via nightly S3 CSV export; Cliniko via REST API polling; Owl Practice via manual
CSV export initially. Activation happens through HubSpot (contacts, deals, workflows, lists).

Go-to-market is Vancouver/BC first, then Canada-wide, then US, then international. A free **"Practice Health
Snapshot"** is the intended top-of-funnel offer.

## Capabilities and Constraints

- Marketing site is static, served by GitHub Pages at https://datafore.ca. No server, so no functional forms —
  contact is via `mailto:`/`tel:`.
- A Calendly booking link exists (calendly.com/sandeep-datafore/initial) but the owner has deferred adding it to
  the site. No confirmed social profile URLs beyond the LinkedIn profile below. Do not fabricate them.
- Founding cohort: Datafore is *inviting* BC clinics to join a founding cohort. No clinic has joined yet; never
  word it as though one has.
- **Pre-revenue and pre-customer.** No clinics onboarded, no testimonials, no logos, no case studies, and no
  benchmark dataset. None of these may be implied to exist.
- The benchmarking capability is explicitly a future network effect and must be described in future tense.
- Product is in active development against a 90-day technical roadmap; the platform is not generally available.
- Illustrative figures on the site (e.g. a sample dashboard) must be labelled as illustrative in place.

### Internal-only — do not publish without explicit approval

Pricing tiers and setup fees, ARR/CAC/LTV/margin targets, the "moat" framing in strategy language, grant
applications (IRAP, Infoway, SR&ED), database schemas, and the internal roadmap. These live in the strategy
document, not on the marketing site.

## Brand Commitments

Company name "Datafore" / "Datafore Analytics Inc." is fixed. Contact facts are real and fixed:
info@datafore.ca, +1 778 700 1733, 4353 Halifax Street, Burnaby, BC. Sandeep Mehra, Founder
(linkedin.com/in/smehra2), is real and should stay attributed correctly. The site carries first-person founder's
notes from him (home page and About); they are drafts in his voice and he owns their wording.

Logo: a bright-blue cube cluster flowing into an arrow, a heavy geometric navy "Datafore" wordmark, and the
tagline **"Forward with Data"** in blue. The master file is `src/assets/brand/datafore-logo-source.png`; the site
palette (navy, signal blue) is sampled from it, and the favicon is cut from the mark.

## Evidence on Hand

None yet — pre-launch. The strongest honest proof available is the specificity of the mechanism itself (named
PMS integrations, the closed-loop workflow, the compliance architecture), not customer outcomes. Any
demonstration data must be labelled illustrative.

## Product Principles

- Sell the loop, not the dashboard. Every claim should point at an action the platform takes, not a chart it
  draws.
- Be concrete where competitors are vague: name the systems, name the workflow, name the leak.
- Never claim capabilities, customers, or benchmark data that do not exist yet. The audience is professionally
  skeptical and handles sensitive information.
- Compliance is a feature, stated plainly, not buried.

## Accessibility & Inclusion

WCAG AA — contrast, keyboard focus, semantic markup. No product-specific requirement beyond that.
