---
name: Datafore
description: Premium advisory — a clinic intelligence partner that speaks to clinic leaders and evaluators as a peer.
colors:
  navy-950: "#021238"
  navy-900: "#031a4c"
  navy-800: "#172d63"
  navy-700: "#203b7a"
  navy-600: "#2b4d94"
  navy-500: "#4a68aa"
  navy-400: "#7189c0"
  navy-300: "#a3b3d9"
  navy-200: "#cbd5ec"
  navy-100: "#e5eaf6"
  navy-50: "#f3f5fb"
  signal-700: "#073a9f"
  signal-600: "#0848c9"
  signal-500: "#0b57ee"
  signal-300: "#8fb3f7"
  signal-200: "#c3d6fb"
  graphite-800: "#262b2f"
  graphite-700: "#3a4045"
  graphite-600: "#4b5258"
  graphite-500: "#5f666d"
  graphite-300: "#b9bfc3"
  graphite-200: "#dcdfe1"
  paper: "#ffffff"
  mist: "#f3f5f8"
typography:
  display:
    fontFamily: "Source Serif 4 Variable, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2.75rem, 6vw, 5rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.022em"
  headline:
    fontFamily: "Source Serif 4 Variable, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2rem, 4vw, 2.75rem)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Source Serif 4 Variable, Iowan Old Style, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.3
  body:
    fontFamily: "Public Sans Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Public Sans Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  none: "0px"
  sm: "4px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "40px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.navy-900}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.navy-700}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.navy-900}"
    rounded: "{rounded.sm}"
    padding: "14px 24px"
  button-secondary-hover:
    backgroundColor: "{colors.navy-50}"
  button-on-dark:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.navy-950}"
    rounded: "{rounded.sm}"
    padding: "14px 24px"
  button-on-dark-hover:
    backgroundColor: "{colors.navy-100}"
  link:
    textColor: "{colors.navy-800}"
---

# Design System: Datafore

## Overview

**North star: the advisory brief.** Datafore presents as a strategic partner to clinic leaders, not a tool vendor.
The site should read like a well-made brief from a serious advisory firm: a confident point of view, set in a
literary serif, on a white page, with deep navy carrying the weight and a single bright blue doing the pointing.

Two audiences read it. Clinic owners and directors come first: they need to recognise their problem and trust that
Datafore understands the business of care. Evaluators — partners, funders, procurement panels — come second: they
need to find governance, status and company facts quickly, stated plainly.

The design earns credibility through restraint and candour rather than product screenshots or metrics. Datafore is
pre-customer; the site never implies otherwise.

**Anti-references:** the generic SaaS analytics landing page (gradient hero, dashboard mock, logo wall, stat
tiles); the earlier "Clinical Loop" teal-and-mono identity, which read as technical and tactical; and the brass
registry identity before it, which read as legal.

### Key characteristics

- White paper ground, mist bands, and full-bleed navy bands for the strategic statements.
- Source Serif 4 for every heading and statement; Public Sans for everything functional.
- Signal blue as the only accent — underlines, the active nav state, rules — never a fill.
- Hairline rules and twelve-column asymmetry instead of cards.
- One authored motion moment: the hero settles into place on load.

## Colors

The palette is sampled from the Datafore logo: `navy-900` is the wordmark navy and `signal-500` the arrow blue.

### Primary — Navy

Headings (`navy-950`), primary actions (`navy-900`), and the dark bands (`navy-950` for the hero and closing
invitation, `navy-900` for the point-of-view statement). `navy-100` is the hairline on light grounds; `navy-700`
and `navy-800` are the hairlines on dark ones.

### Accent — Signal

`signal-500` underlines links and marks the current page. `signal-300` is its counterpart on dark grounds (links,
the footer tagline). Signal never fills a container or a button.

### Neutral — Graphite, Paper, Mist

Body copy is `graphite-700` on paper and mist; secondary copy is `graphite-600`. `paper` is the page; `mist`
alternates with it to pace long pages. No cream, no warm greys.

### Named Rules

- **The One Accent Rule.** Signal blue is the only colour besides navy and the neutrals. If something needs
  emphasis, it gets weight, size or position, not a new hue.
- **The Contrast Floor.** `graphite-600` is the lightest text on light grounds; `navy-300` is the lightest text on
  navy. `navy-400` fails AA on white and is never used for text.

## Typography

**Source Serif 4** (variable, with optical sizes) carries the voice: h1–h3, the hero list, the point-of-view
quote, and definition terms. **Public Sans** carries body, navigation, labels and controls. Both are self-hosted
via Fontsource. There is no monospace on the site.

### Hierarchy

- **Display** — one per page, 2.75rem to 5rem, weight 500, tight leading, balanced wrapping.
- **Headline** — section openers, 2rem to 2.75rem, often sitting in the left five columns opposite its body copy.
- **Title** — item headings within a section (outcomes, beliefs, stages), 1.5rem.
- **Body** — 1.125rem at 1.625 leading, `text-wrap: pretty`, measure capped near 60ch.
- **Label** — Public Sans 0.875rem semibold, used for `dt` labels and the hero aside heading. Sentence case.

### Named Rules

- **The No-Eyebrow Rule.** Nothing sits above a heading to introduce it — no kicker, no category label, no
  section number. The heading carries the section.
- **The Full-Stop Rule.** Section headlines are written as sentences and end with a full stop. They make a claim.
- **Figures** — phone numbers, dates and quantities use the `.figures` class for tabular lining numerals.

## Layout

A `max-w-7xl` container with `px-6` (`lg:px-10`) gutters. Sections run `py-24` (`lg:py-28` to `lg:py-32`).

The default section is a twelve-column split: the headline in columns 1–5, the body in 7–12. Lists of parallel
items (outcomes, stages, beliefs, commitments) sit in a grid where each item is opened by a hairline `border-t`,
or in a `divide-y` list of full-width rows. Bands alternate paper → mist → navy to pace the page.

## Elevation & Depth

None. The system is flat: no shadows, no gradients, no blur. Depth comes from the ground changing.

## Shapes

`rounded-sm` (4px in Tailwind v4) on buttons, the portrait and the contact panel grid. Nothing is pill-shaped or circular.

## Components

### Buttons

- **Primary** — `bg-navy-900`, white text, `hover:bg-navy-700`, `rounded-sm`, `px-6 py-3.5`.
- **Secondary** — 1px `navy-900` border, navy text, `hover:bg-navy-50`.
- **On dark** — white fill, `navy-950` text, `hover:bg-navy-100`.

### Text links

Navy (or white on dark) with a 1px signal underline at a 6px offset, thickening to 2px on hover.

### Navigation

Header: wordmark, four links (Platform, Trust, Insights, About), and the primary "Start a conversation" button.
The current page gets `aria-current` and a signal underline. A `<details>` disclosure on mobile.

### Panel grid

Used sparingly (contact paths, integrated systems): a `gap-px` grid over a `navy-100` ground, so the panels share
hairline borders. It is not a card wall; use it only when the items are genuinely parallel choices.

### Logo

The supplied artwork — blue cubes resolving into an arrow, the navy "Datafore" wordmark, and the tagline "Forward
with Data" — is the master, kept at `src/assets/brand/datafore-logo-source.png`. Cuts on a transparent ground live
beside it:

- `logo.png` — mark and wordmark, for light grounds (the header). The tagline is dropped at this size.
- `logo-on-dark.png` — the same with the wordmark knocked out to white, for navy grounds (the footer).
- `logo-lockup.png` / `logo-lockup-on-dark.png` — full lockup with tagline, for large placements (the OG image).
- `mark.png` — the cube-and-arrow mark alone, the source for `favicon.ico`, `favicon-32.png` and
  `apple-touch-icon.png`.

All site placements go through `src/components/Logo.astro`. Never redraw or recolour the mark in code. The site's
`navy-900` and `signal-500` are sampled from the wordmark and the arrow.

### Snapshot excerpt (signature graphic)

`SnapshotExcerpt.astro` shows the offer instead of describing it: an excerpt of a Practice Health Snapshot as one
flat document (hairline border, no shadow) with two findings and a recommended first step. The findings are
written as serif sentences that state the number; the charts sit under them.

- **Heatmap** — a real `<table>` (days × hours) whose cells take one of five ordered classes on the navy ramp
  (`navy-300` → `navy-900`; validated monotone with the light end at 2.1:1 on white). Closed hours are dashed
  outlines. Every cell has a tooltip and screen-reader text.
- **Visit chart** — an ordered list of columns, ≤24px wide with a 4px rounded top, 2px gaps, in `navy-300`, with
  the one bar the finding is about in `signal-500`. Only the first, focal and last values are labelled.
- Every figure in it is invented and says so in place. Never present it as a real clinic.

### Diagrams

- **Engagement cycle** (`EngagementCycle.astro`) — four stages on a circle, joined by navy arcs that end in the
  logo's signal-blue arrowhead, with "Assess, act, reassess." in the serif italic at the centre. Decorative; the
  ordered list beside it carries the content.
- **System diagram** (`SystemDiagram.astro`) — practice management systems → the Datafore layer (the one
  navy-900 panel) → where the work happens, joined by the same arrow, plus the return loop as a caption. Built in
  HTML so labels stay at reading size; connectors rotate to vertical when the columns stack.

Arrows across the site share one form: a 2px navy shaft and a filled signal-blue head, echoing the logo.

### Founder's note

`FounderNote.astro`: a 4:5 portrait, a heading, the letter set in Source Serif at 1.25–1.375rem in `navy-950`
(the only place body copy is serif, which is what makes it read as a personal letter), and a sign-off with the
name in the serif italic over "Founder, Datafore Analytics Inc.". The letter is passed in per page.

### Photography

Only the founder portrait exists today. When real photographs arrive (the team, a clinic at work), they take
the founder's treatment: natural light, `rounded-sm`, `object-cover`, never tinted or duotoned, and never stock
images presented as Datafore's own clinics. Good homes for them are the About hero and the founder's note.

### Motion

The hero settles in on load (`.settle`, 900ms, `cubic-bezier(0.16, 1, 0.3, 1)`, with `.settle-late` delayed
140ms). Everything else is a 150ms colour transition. `prefers-reduced-motion` disables the settle.

## Do's and Don'ts

### Do

- Do state Datafore's status plainly: in development, forming a founding cohort in British Columbia.
- Do phrase security and privacy as what the platform is *designed to* do, not as certifications held.
- Do name the real systems — Jane App, Cliniko, Owl Practice, HubSpot — and say connections come online in turn.
- Do describe benchmarking in the future tense, conditional on enough clinics taking part.
- Do label any illustrative figure as illustrative, in place.
- Do route internal links and `public/` assets through `withBase()`; markdown links are rewritten at build.

### Don't

- Don't claim clinics, customers, results or testimonials that don't exist.
- Don't publish pricing, ARR/CAC/LTV, grants, or roadmap detail.
- Don't use cards as the page structure, or add shadows or gradients.
- Don't put a kicker or number above a heading.
- Don't add a coloured border-left to callouts.
- Don't use monospace, or set text in `navy-400` on light grounds.
- Don't use signal blue as a fill.
