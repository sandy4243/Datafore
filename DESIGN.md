---
name: Datafore
description: Premium advisory — a clinic intelligence partner that speaks to clinic leaders and evaluators as a peer.
colors:
  navy-950: "#0b1638"
  navy-900: "#10204d"
  navy-800: "#172d63"
  navy-700: "#203b7a"
  navy-600: "#2b4d94"
  navy-500: "#4a68aa"
  navy-400: "#7189c0"
  navy-300: "#a3b3d9"
  navy-200: "#cbd5ec"
  navy-100: "#e5eaf6"
  navy-50: "#f3f5fb"
  signal-700: "#174bb3"
  signal-600: "#1d5fe0"
  signal-500: "#2f72f0"
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

The palette is taken from the Datafore logo: the navy of the wordmark and the bright blue of the mark and tagline.

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

`src/components/Logo.astro` is an interim text wordmark (Public Sans 800, tight tracking), with `onLight` and
`onDark` tones. It is replaced by the supplied logo artwork once that is in the repo. The favicon and touch icon
are an interim "D" monogram.

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
