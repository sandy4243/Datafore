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
  display-inner:
    fontFamily: "Source Serif 4 Variable, Iowan Old Style, Georgia, serif"
    fontSize: "4rem"
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
  nav:
    fontFamily: "Public Sans Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.4
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

The design earns credibility through candour and **exhibits**: drawings of how Datafore works, in the manner of
the figures in a strategy brief. It never uses product screenshots or invented metrics. Datafore is pre-customer;
the site never implies otherwise, so exhibits show the *mechanism* (a patient's path, where data goes, what the
team sees) and never results.

**Anti-references:** the generic SaaS analytics landing page (gradient hero, dashboard mock, logo wall, stat
tiles); the earlier "Clinical Loop" teal-and-mono identity, which read as technical and tactical; and the brass
registry identity before it, which read as legal.

### Key characteristics

- White paper ground, mist bands, and full-bleed navy bands for the strategic statements.
- Source Serif 4 for every heading and statement; Public Sans for everything functional.
- Signal blue as the only accent: underlines, the active nav state, rules, and the marks inside exhibits. Never
  a container or button fill.
- Hairline rules and twelve-column asymmetry instead of cards.
- At least one exhibit per pitch page, so no page reads as an essay.
- Two authored motion moments: the home hero's artwork (streams of data becoming knowledge, ideas and action) drawing in on load, and
  exhibits drawing themselves once as they scroll into view. Plus one ambient one: editorial artwork, where light
  travels slowly along the lines.
- Every report and article has its own generative artwork, in the manner of a consultancy's insight imagery.

## Colors

The palette is sampled from the Datafore logo: `navy-900` is the wordmark navy and `signal-500` the arrow blue.

### Primary — Navy

Headings (`navy-950`), primary actions (`navy-900`), and the dark bands (`navy-950` for the hero and closing
invitation, `navy-900` for the point-of-view statement). `navy-100` is the hairline on light grounds; `navy-700`
and `navy-800` are the hairlines on dark ones.

### Accent — Signal

`signal-500` underlines links and marks the current page. `signal-300` is its counterpart on dark grounds (links,
the footer tagline). Inside an exhibit, signal fills **marks**: the one focal node, arrowheads, the squares nearest
the arrow in the hero signature, and the chart focus series. It never fills a container, a panel or a button.

### Neutral — Graphite, Paper, Mist

Body copy is `graphite-700` on paper and mist; secondary copy is `graphite-600`. `paper` is the page; `mist`
alternates with it to pace long pages. No cream, no warm greys.

### Named Rules

- **The One Accent Rule.** Signal blue is the only colour besides navy and the neutrals. If something needs
  emphasis, it gets weight, size or position, not a new hue.
- **The One Focal Rule.** An exhibit has at most one signal-filled node: the step the figure exists to show.
  Everything else is navy and neutrals.
- **The Contrast Floor.** `graphite-600` is the lightest text on light grounds; `navy-300` is the lightest text on
  navy. `navy-400` fails AA on white and is never used for text.

## Typography

**Source Serif 4** (variable, with optical sizes) carries the voice: h1–h3, the hero list, the point-of-view
quote, and definition terms. **Public Sans** carries body, navigation, labels and controls. Both are self-hosted
via Fontsource. Monospace appears in one place only: the SQL shown under a research explorer, because it is code.

### Hierarchy

- **Display** — one per page, 2.75rem to 5rem, weight 500, tight leading, balanced wrapping.
  Inner pages (Platform, About) cap it at 4rem (`display-inner`); the home hero alone reaches 5rem.
- **Headline** — section openers, 2rem to 2.75rem, often sitting in the left five columns opposite its body copy.
- **Title** — item headings within a section (outcomes, beliefs, stages), 1.5rem.
- **Body** — 1.125rem at 1.625 leading, `text-wrap: pretty`, measure capped near 60ch.
- **Label** — Public Sans 0.875rem semibold, used for `dt` labels and the hero aside heading. Sentence case.

### Named Rules

- **The No-Eyebrow Rule.** Nothing sits above a heading to introduce it — no kicker, no category label, no
  section number. The heading carries the section.
- **The Full-Stop Rule.** Section headlines are written as sentences and end with a full stop. They make a claim.
- **Figures** — phone numbers, dates and quantities use the `.figures` class for tabular lining numerals.
- **The Cited Figure Rule.** A page may set one number at display size (serif, 5rem and up), and only when its
  source is cited beside it. An uncited or "estimated" number stays in the prose.

## Layout

A `max-w-7xl` container with `px-6` (`lg:px-10`) gutters. Sections run `py-24` (`lg:py-28` to `lg:py-32`).

The default section is a twelve-column split: the headline in columns 1–5, the body in 7–12. Lists of parallel
items (outcomes, stages, beliefs, commitments) sit in a grid where each item is opened by a hairline `border-t`,
or in a `divide-y` list of full-width rows. Bands alternate paper → mist → navy to pace the page.

## Elevation & Depth

None. The system is flat: no shadows, no gradients, no blur, including the sticky header (solid paper with a
hairline). Depth comes from the ground changing.

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

Header: wordmark, three links (Platform, Research & Insights, About), and the primary "Contact us" button (hidden on
the contact page itself).

### Closing invitation

Every page except the contact pages ends the same way: the footer opens with "Be one of our first clinics.", the
cohort line, a "Request a Snapshot" button and a "Book a call" link (Calendly). Below it the footer carries the
logo, the site links and one contact line: the email address, as a `mailto:` link. The phone number and street
address are on the contact page only. Pages don't add their own closing
CTA band; a page that needs a contextual ask (a research report) uses one inline link above the footer. Contact
details and the booking link live in `src/lib/contact.ts`.
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

### Exhibits

An exhibit is a figure that draws the mechanism: how Datafore works, not what it has achieved. Each one is a
component in `src/components/exhibits/`, built in HTML and inline SVG so labels stay at reading size and the
layout restacks on a phone (no fixed-width SVG with 12px text).

- **Home hero artwork** (`art/KnowledgeFlow.astro`) — four distinct streams of data (separate ribbons, each its own
  navy tone) braid into one bright point, Knowledge; a few branches open out as Ideas, each ending in a small
  square; one carries on as a signal-blue line, Action, out of the frame. Small Public Sans labels name the four
  stages from lg. It bleeds off the right edge behind a mask so it never crosses the headline; below lg it is a
  banner above the copy. Draws itself in on load in that order, then light keeps travelling along the streams.
  Decorative (`aria-hidden`); it replaces the earlier squares-to-arrow signature, which echoed the logo too closely.
  On phones the artwork is drawn at its natural size (a 5:4 banner), with line weights raised through `--kf-scale`
  so they stay visible; the branches sit inside the frame so the sticky header never covers the Ideas label.
- **Headline correction.** "Artificial" is struck through in `navy-300` with a `signal-300` line, and "Real" is set
  above it in `signal-300`, Public Sans semibold, as an editor's correction. The `h1` carries an `aria-label` so
  screen readers announce "Real intelligence for the business of care." The signal blue is the one accent, so it
  marks the correction rather than the struck word.
- **Patient loop** (`PatientLoop.astro`) — one patient who goes quiet, followed through six steps from the missed
  rebooking to the booking traced back. The flag step is the focal node.
- **Service blueprint** (`ServiceBlueprint.astro`) — the four engagement stages (Diagnose, Prioritise, Activate,
  Review) as columns; above the line of visibility what the clinic sees, below it what the platform does
  (Understand, Anticipate, Act, Prove). This is where the two four-word frameworks meet; don't present them as
  separate lists elsewhere on the same page.
- **Data path** (`DataPath.astro`) — one patient record as the practice software holds it, the same record with
  name and contact details removed inside the Canadian boundary, and the recommendation the team sees with the data
  behind it. Values are abstract bars, never invented names or numbers.
- **Report to result** (`ReportToResult.astro`, About) — data → report → decision → action → result, with the
  point where most analytics stops and the stretch Datafore covers marked beneath. Action is the focal node.
- **What happens next** (inline on Contact) — three steps from the first call to the walkthrough of the Snapshot.
- **System diagram** (`SystemDiagram.astro`) — practice management systems → the Datafore layer (the one navy-900
  panel, with the four capabilities as a flow) → where the work happens, plus the return loop.

**Exhibit rules.**

- Mechanism only: no invented clinic figures, patient names or results. An illustrative value is an abstract mark.
- One focal node in signal (the One Focal Rule); arrows share one form: a 2px navy shaft and a filled signal-blue
  head, echoing the logo. On navy grounds the shaft is `navy-500`.
- Labels are real text in Public Sans (names in the serif), at 0.875rem or larger. No monospace, no eyebrows, no
  uppercase tracking.
- A visual exhibit never stands alone: the same content is in text (a list, `dl` or caption) for assistive tech.
- **Diagram skin.** When drafting a new exhibit with the diagram-design skill, map its roles to these tokens and use
  `Font source: system` with the site's own fonts: paper → `paper`, paper-2 → `mist`, ink → `navy-950`, muted →
  `graphite-600`, soft → `graphite-600`, rule → `navy-100`, rule-solid → `navy-200`, accent → `signal-500`,
  accent-tint → `navy-50`, link → `navy-700`; title → Source Serif 4, node-name → Public Sans 600, sublabel and
  arrow-label → Public Sans 400 (not mono), eyebrow → not used. Then rebuild the draft as an Astro component.

### Editorial artwork

`components/art/FlowArt.astro`: a generative flow field on `navy-950`. Streamlines in `navy-500`–`navy-700`
converge on one `signal-500` focal point, with a few logo squares at their origins and a handful of `signal-300`
pulses that travel along the lines (CSS only; paused off screen; still under reduced motion). Each piece is seeded
from the page's slug, so every report and article has its own composition and keeps it across builds.

- **Article header** (`ArticleHeader.astro`, reports and articles): a full-bleed navy band, title and standfirst
  left, the artwork bleeding off the right edge behind a mask; a banner above the title on phones.
- **Listings**: articles show their artwork at 16:10 on the `/research/` index; reports show their real lead chart
  (`thumbnail`) on mist at the same size. The newest report appears on the home page with its artwork.
- It is decoration, not data: never put numbers, labels or a chart's shape into it, and never use stock imagery in
  its place.

### Founder's note

`FounderNote.astro`: a 4:5 portrait, a heading, the letter set in Source Serif at 1.25–1.375rem in `navy-950`
(the only place body copy is serif, which is what makes it read as a personal letter), and a sign-off with the
name in the serif italic over "Founder, Datafore Analytics Inc.". The letter is passed in per page.

### Photography

Only the founder portrait exists today. When real photographs arrive (the team, a clinic at work), they take
the founder's treatment: natural light, `rounded-sm`, `object-cover`, never tinted or duotoned, and never stock
images presented as Datafore's own clinics. Good homes for them are the About hero and the founder's note.

### Research reports and charts

Reports live at `/research/<id>/` (how to add one: `reports/README.md`). They are Read surfaces: prose at a
62ch measure (about 80 characters of Public Sans) in the serif-headed article layout used by articles, with figures allowed the full 56rem column.
Reports and articles share one index at `/research/` ("Research & Insights"), newest first, each marked
"Research" or "Article" in the meta column.

**Colour comes only from chart roles.** Charts never name a hex value or a brand step. They use these tokens,
defined in `global.css` in an `@theme static` block that points at the brand palette:

| Role | Maps to | Used for |
|---|---|---|
| `chart-primary` | `navy-600` | the single series; bars |
| `chart-focus` | `signal-500` | the series or bar the finding is about |
| `chart-context` | `navy-400` | comparison series beside the focus (meant to read as grey) |
| `chart-reference` | `signal-500` | reference lines, e.g. a provincial rate |
| `chart-grid` / `chart-axis` | `navy-100` / `navy-200` | gridlines; baselines and the crosshair |
| `chart-label` / `chart-ink` | `graphite-600` / `navy-950` | tick text; values and direct labels |
| `chart-surface` | `paper` | marker rings and gaps |

Change a brand token or re-point a role and every chart follows, the server-rendered figures and the in-browser
explorer alike. Re-run the dataviz palette validator after any change: primary, focus and context must keep
passing lightness, colour-vision separation and 3:1 contrast against white. (`navy-900` fails as a chart colour;
it is too dark to read as a hue.) The brand palette is emitted with `@theme static` so every token exists as a CSS
variable even when no utility uses it.

**Marks.** Lines 2px with round joins; markers 8px with a 2px surface ring; a hollow marker means "reported
differently" and is named in the legend. Bars are 16px, square at the baseline with a 4px rounded end, and carry
their value at the tip. Gridlines are 1px solid `chart-grid`; no dashes, no chart borders, no shadows.

**Labels.** Direct labels only at line ends (and the start, for one series); everything else is in the hover
tooltip, which shows every series at the year under the pointer (value first), and in the "Show the data" table.
Text never takes a series colour. A legend appears only with two or more series, as short line keys.

**Responsive.** Line charts render twice, a 720-wide and a 360-wide SVG, and CSS shows the one that fits, so
text stays legible on a phone. Bar lists are HTML; each row switches from label | bar | value to label-above-bar
below 34rem of chart width (a container query, so the narrower explorer adapts on its own).

**Figure anatomy.** A hairline rule, the figure title in Public Sans semibold (the subject, not the finding;
the finding is the serif heading above it in the prose), an optional subtitle, the chart, a note and source
line in `graphite-600`, then "Show the data".

**Explorer.** A mist panel holding labelled selects, a status line (`aria-live`), the chart, and two
disclosures: the data table and the SQL. It loads DuckDB-WASM only when scrolled near.

### Motion

Ambient: editorial artwork pulses run continuously at 7–13s per pass, linear, only while on screen.

Two authored moments, both with the exponential ease-out `cubic-bezier(0.16, 1, 0.3, 1)`:

- **On load, the hero.** The copy settles (`.settle`, 900ms; `.settle-late` delayed 140ms) while the artwork
  draws: the data streams (about 1.6s, staggered by stream), the knowledge point, the idea branches, then the
  action line (done by about 3.6s). Pure CSS (`.kf-*`); the resting state is the full drawing.
- **On scroll, each exhibit draws once.** Lines and arrows draw, then nodes and labels arrive in reading order
  (`[data-draw]`, set to `.is-drawn` by an IntersectionObserver at about a fifth in view; it never replays). Without
  JavaScript, exhibits render fully drawn.

Everything else is a 150ms colour transition. `prefers-reduced-motion` shows every resting state at once.

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
- Don't use cards as the page structure, or add shadows, gradients or backdrop blur.
- Don't invent data for an exhibit; draw the mechanism. Don't let a page go without an exhibit.
- Don't put a kicker or number above a heading.
- Don't add a coloured border-left to callouts.
- Don't use monospace outside code (the explorer's SQL), or set text in `navy-400` on light grounds.
- Don't pick colours inside a chart or report. Use the chart roles; change a role in `global.css` if needed.
- Don't use signal blue as a container or button fill; inside exhibits it fills marks only, one focal node each.
