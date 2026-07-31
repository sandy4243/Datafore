---
name: Datafore
description: Clinic performance presented as a credential — issued, referenced, and standing.
colors:
  ink-950: "#100f0d"
  ink-900: "#1b1a17"
  ink-800: "#2c2a26"
  ink-700: "#423f39"
  ink-600: "#55524a"
  ink-500: "#6b685f"
  ink-400: "#8a877f"
  ink-300: "#b3b1ab"
  ink-200: "#d7d6d2"
  ink-100: "#ececea"
  seal-700: "#6d4c1f"
  seal-600: "#8b6224"
  seal-500: "#ab7c2e"
  seal-400: "#c8963f"
  seal-300: "#d9b06a"
  paper: "#faf9f7"
  paper-dim: "#f1f0ec"
  surface-card: "#ffffff"
typography:
  display:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.16em"
  label-nav:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  none: "0px"
  sm: "2px"
  md: "4px"
  lg: "8px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "24px"
  lg: "40px"
  section: "64px"
components:
  button-primary:
    backgroundColor: "{colors.ink-950}"
    textColor: "{colors.surface-card}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.seal-700}"
    textColor: "{colors.surface-card}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-700}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-secondary-hover:
    textColor: "{colors.ink-950}"
  button-on-dark:
    backgroundColor: "{colors.seal-600}"
    textColor: "{colors.surface-card}"
    rounded: "{rounded.md}"
    padding: "12px 32px"
  button-on-dark-hover:
    backgroundColor: "{colors.seal-700}"
  chip-discipline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-600}"
    rounded: "{rounded.md}"
    padding: "6px 14px"
  card-credential:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink-800}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: Datafore

## Overview

**Creative North Star: "The Registry Document"**

Datafore sells clarity to people who already live inside a professional credentialing system.
Physiotherapists, chiropractors, and counsellors hold registrations, carry licence numbers, and are
audited against standards. The system borrows that world: a clinic's performance is presented as
something **issued, referenced, and standing** — a record with a seal and a number on it — rather than
as a dashboard of floating charts.

The surface behaves like good printed stationery. A warm paper ground, hairline rules, ink-black text,
and a single brass accent used the way a foil seal is used: sparingly, and only where authority is
being asserted. Density is calm and documentary. Nothing glows, nothing floats without reason, and the
page never tries to look like the product it is describing.

The confirmed anti-reference is the generic analytics landing page this replaced: Inter, a saturated
blue, pill-shaped buttons, a grid of identical icon-heading-text cards, eyebrow labels above every
heading, and numbered `01 / 02 / 03` steps. Those were removed deliberately, not by accident.

**Key Characteristics:**
- Paper ground, ink text, one brass accent — no second accent hue.
- Square-cornered or barely-rounded geometry; no pills.
- Engraved circular seals as the recurring mark.
- Tracked monospace micro-labels carrying reference numbers.
- Hairline rules and shared borders instead of scattered drop shadows.

## Colors

A documentary palette: warm neutral paper, near-black ink, and a single brass accent standing in for
a foil seal.

### Primary
- **Brass Seal** (`seal-600`): The accent of authority. Carries seal marks, micro-labels, active
  navigation, and the button on dark grounds. It never appears as a large flat field on the light
  ground — it is a mark, not a surface.
- **Deep Brass** (`seal-700`): The hover state for every brass and ink button. Buttons always get
  *darker* on hover, never lighter.
- **Lamp Brass** (`seal-400`): Brass rendered on ink grounds, where the darker steps lose legibility.

### Neutral
- **Document Ink** (`ink-950`): Headings, primary buttons, and the full-bleed dark sections.
- **Reading Ink** (`ink-800`): Default body text on paper.
- **Quiet Ink** (`ink-600`): Secondary body copy and navigation at rest.
- **Fine Print Ink** (`ink-500`): The smallest labels and reference numbers. This is the floor —
  nothing lighter carries text on a light ground.
- **Rule Grey** (`ink-200`): Hairline rules, card borders, and the grid gaps between cards.
- **Paper** (`paper`): The default page ground.
- **Dim Paper** (`paper-dim`): The alternating band that separates one section from its neighbour.
- **Card White** (`surface-card`): Pure white, reserved for surfaces that represent a document.

### Named Rules

**The Foil Rule.** Brass is a seal, not a paint. It marks, outlines, and labels; it never fills a
region larger than a button. If a brass area reads as a background, it has broken the metaphor.

**The Fine Print Floor.** `ink-500` is the lightest ink permitted for text on paper, and `ink-400` the
lightest on `ink-950`. Both clear 4.5:1. Anything lighter is decoration pretending to be content.

**The Darken-On-Hover Rule.** Every filled button darkens on hover. Lightening a brass button drops it
below AA against white — this is a measured constraint, not a preference.

## Typography

**Display Font:** IBM Plex Sans (with `ui-sans-serif`, `system-ui`)
**Body Font:** IBM Plex Sans (with `ui-sans-serif`, `system-ui`)
**Label/Mono Font:** IBM Plex Mono (with `ui-monospace`, `SFMono-Regular`)

**Character:** One family doing two jobs. Plex Sans is an institutional face — drawn for documentation,
slightly squared, unfashionable in the right way — so headlines read as issued rather than marketed.
Plex Mono is its sibling, which is why the fine print looks stamped onto the same document instead of
borrowed from another system.

### Hierarchy
- **Display** (700, `clamp(2.25rem, 5vw, 3rem)`, 1.05): Page-opening headline, one per page.
- **Headline** (600, 1.875rem, 1.2): Section headings.
- **Title** (600, 1.125rem, 1.4): Card and pillar titles.
- **Body** (400, 1rem, 1.625): Paragraph copy. Measure runs 49–72ch; never past 75ch.
- **Label** (500, 0.6875rem, 0.16em tracking, uppercase, mono): Reference numbers, section marks, and
  footer headings. Carried by the `.credential-label` class.
- **Nav Label** (500, 0.8125rem, 0.08em tracking, uppercase, mono): Navigation and button text. Looser
  tracking and a larger size than the fine print, because these are targets rather than annotations.

### Named Rules

**The Number Rule.** Anything that reads as an identifier — `REG. NO.`, `CRED. NO.`, a date, a metric —
is set in Plex Mono. Prose is never mono, and identifiers are never prose.

**The No-Eyebrow Rule.** No kicker or eyebrow label sits above a heading. The heading carries its own
weight. Mono labels mark *sections and fields*, never introduce a headline.

## Layout

A single centred column, `max-width: 72rem` (`max-w-6xl`), with `1.5rem` gutters that hold from 320px
up. Reading-heavy pages (blog, privacy) narrow to `48rem`/`56rem` so measure stays under 75ch.

Sections are separated by full-bleed ground changes rather than whitespace alone: `paper` →
`paper-dim` → `ink-950` bands, each closed with a hairline `ink-200` rule. Vertical rhythm is `4rem`
between sections and `1.5rem–2.5rem` within them, with more space above a heading than below it.

Responsive behavior: the hero is a two-column grid that stacks below `md`; pillar grids go
`sm:grid-cols-2`; the platform rows go single-column below `md`. Navigation collapses into a
`<details>` disclosure below `md`. No page scrolls horizontally at any width down to 320px.

## Elevation & Depth

Mostly flat, with depth used **once**. Structure comes from hairline borders and ground changes, not
from shadows — a grid of cards is a `1px` gap over an `ink-200` background, so cards share rules like
cells in a printed table rather than floating as separate tiles.

The single exception is the hero credential card, which is genuinely lifted because it represents a
physical document sitting on the page.

### Shadow Vocabulary
- **Document lift** (`box-shadow: 0 1px 2px rgba(16,15,13,0.04), 0 16px 40px -16px rgba(16,15,13,0.25)`):
  The hero credential card only. Two layers — a tight contact shadow and a wide soft cast — both
  carrying real offset and blur.

### Named Rules

**The One Shadow Rule.** Exactly one element per page may cast a shadow. If a second appears, the first
has stopped being special and the page has become a card wall.

## Shapes

Square by default. Corners are `2px`–`4px` where softening is needed and `8px` on document surfaces
(the credential card, bordered panels). **Nothing is pill-shaped** — `rounded-full` is reserved for the
seal marks and the small status dots, which are true circles because they are stamps, not buttons.

The recurring silhouette is the **seal**: a circle with a thin outer ring, an inner ring, a radial tick
ring, and a stroked glyph at its centre. It scales from 26px (inline) to 60px (pillar rows) and is the
one ornamental form the system permits.

## Components

### Buttons
- **Shape:** Square-cornered, lightly softened (`4px`).
- **Primary:** `ink-950` ground, white label, `12px 24px`, mono uppercase at `0.08em` tracking.
- **Hover / Focus:** Ground darkens to `seal-700` over a `colors` transition. Focus shows the global
  brass ring.
- **Secondary:** No fill; `ink-300` hairline border, `ink-700` label, border and label darkening to
  `ink-950` on hover.
- **On dark grounds:** `seal-600` ground, white label, darkening to `seal-700`.

### Chips
- **Style:** `paper` fill, `ink-200` hairline border, `ink-600` mono uppercase label, `4px` corners.
- **State:** Static. These are a taxonomy of disciplines served, not filters — they do not select.

### Cards / Containers
- **Corner Style:** `8px` on document surfaces; grid cells are square and share rules.
- **Background:** `surface-card` white against `paper`/`paper-dim` grounds.
- **Shadow Strategy:** None, except the hero credential card (see Elevation & Depth).
- **Border:** `ink-200` hairline, or a `1px` grid gap revealing an `ink-200` ground.
- **Internal Padding:** `24px` mobile, `32px–40px` from `md` up.

### Navigation
- Mono uppercase at `0.8125rem`, `0.08em` tracking, `ink-600` at rest, `seal-600` when current.
- The bar is sticky, `paper/90` with a backdrop blur, closed by an `ink-200` hairline.
- Below `md` it becomes a native `<details>` disclosure — no JavaScript, so it works before hydration.

### Seal (signature component)
An authored inline SVG on a 100×100 viewBox: outer ring at `r=47.5` (40% opacity), inner ring at
`r=36` (60%), a configurable radial tick ring between `r=41` and `r=45` (50%), and a centred glyph
stroked at `2.25` with round caps and joins. Colour is inherited via `currentColor`, so one component
serves brass-on-paper and brass-on-ink. Each platform capability owns a distinct glyph.

## Do's and Don'ts

### Do:
- **Do** carry every identifier — reference numbers, dates, metrics, field labels — in Plex Mono
  uppercase with `0.16em` tracking, via `.credential-label`.
- **Do** separate sections with a ground change (`paper` → `paper-dim` → `ink-950`) closed by an
  `ink-200` hairline.
- **Do** build card grids as a `1px` gap over an `ink-200` ground so cards share rules like a table.
- **Do** darken filled buttons on hover, never lighten them.
- **Do** label any illustrative figure as a sample in-place, in mono fine print. The product has no
  customers yet and the design must never imply otherwise.
- **Do** route internal links and `public/` asset URLs through `withBase()` — the site is served from
  a subpath on the Pages preview.

### Don't:
- **Don't** introduce a second accent hue. The system is ink plus brass; a status colour needs a
  deliberate decision, not a new Tailwind token.
- **Don't** use `rounded-full` on anything that is not a seal or a status dot. No pills.
- **Don't** put an eyebrow or kicker label above a heading.
- **Don't** number sequential sections `01 / 02 / 03`. The stages carry mono word marks
  (`CONNECT` / `VERIFY` / `CERTIFY`) because the words are the information.
- **Don't** add a second shadow to a page, or use a zero-offset coloured glow as depth.
- **Don't** set text lighter than `ink-500` on paper or `ink-400` on `ink-950`.
- **Don't** use emoji or icon fonts. Icons are authored SVG in the seal's stroke language.
