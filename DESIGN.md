---
name: Datafore
description: The clinical loop — assess, act, verify — applied to the clinic itself.
colors:
  vital-950: "#0a1e1b"
  vital-900: "#12312d"
  vital-800: "#16403a"
  vital-700: "#1a5249"
  vital-600: "#1f675c"
  vital-500: "#2c8173"
  vital-300: "#74beb0"
  vital-200: "#a9d8ce"
  vital-100: "#d4ebe6"
  graphite-950: "#0f1214"
  graphite-900: "#1a1e21"
  graphite-800: "#2b3034"
  graphite-700: "#42484d"
  graphite-600: "#545b61"
  graphite-500: "#656c73"
  graphite-400: "#8b9399"
  graphite-300: "#b9bfc3"
  graphite-200: "#dcdfe1"
  graphite-100: "#eceeef"
  risk-500: "#a55c15"
  risk-100: "#fbeadb"
  steady-600: "#2f6b3d"
  steady-100: "#dcefe0"
  bone: "#fbfbfa"
  bone-dim: "#f2f3f2"
  surface-card: "#ffffff"
typography:
  display:
    fontFamily: "Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Public Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.14em"
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
    backgroundColor: "{colors.vital-600}"
    textColor: "{colors.surface-card}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.vital-700}"
  button-secondary:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.graphite-700}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-secondary-hover:
    textColor: "{colors.graphite-950}"
  button-on-dark:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.vital-900}"
    rounded: "{rounded.md}"
    padding: "12px 32px"
  button-on-dark-hover:
    backgroundColor: "{colors.vital-100}"
  chip-discipline:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.graphite-600}"
    rounded: "{rounded.md}"
    padding: "6px 14px"
  card-panel:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.graphite-800}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: Datafore

## Overview

**Creative North Star: "The Clinical Loop"**

Every practitioner Datafore serves already runs a disciplined loop: assess, treat, reassess. Nobody would
accept a course of treatment that skipped the reassessment. Datafore's entire thesis is that clinics deserve
the same method applied to the business — and that most software stops at the assessment. The design system is
built from that loop rather than from the analytics category.

The surface reads as clinical instrumentation: a bone-white ground, cool graphite text, and a single vital teal
that marks whatever is live or actionable. It is calm and precise rather than energetic; this audience is
professionally skeptical, handles sensitive patient data, and is sold to by dashboard vendors constantly.
Restraint is the credibility. Colour is reserved for state, which means an amber or green in this system always
means something is at risk or steady — never that a box needed brightening.

The confirmed anti-references are two: the generic analytics landing page (saturated blue, pill buttons, a grid
of identical icon-heading-text cards, `01 / 02 / 03` steps) and the previous Datafore identity, a brass-and-paper
"registry document" world that was handsome but read as legal or bureaucratic rather than clinical.

**Key Characteristics:**
- Bone ground, graphite text, one vital teal — plus signal colours that only ever mean state.
- The loop mark, segmented and advancing, as the recurring form.
- Hairline rules and shared borders rather than scattered shadows.
- Monospace reserved for measurements, systems, and identifiers.
- Mechanisms shown working, not described.

## Colors

Clinical instrumentation: a near-white ground, cool neutral text, one vital accent, and two signal states.

### Primary
- **Vital Teal** (`vital-600`): The live colour. Primary actions, the active node in the loop mark, current
  navigation, and the boundary of the Datafore layer in the architecture diagram. It marks what is *acting*.
- **Deep Vital** (`vital-700`): Hover for every filled teal control, and teal text on tinted grounds.
- **Vital Ground** (`vital-950`): The closing call-to-action band — the one place teal owns a full region.

### Secondary — Signal
- **At Risk** (`risk-500`): Something leaking: lapsed patients, ageing receivables, a gap. Never decorative.
- **Steady** (`steady-600`): A recovered or healthy state — the closing half of the loop.

### Neutral
- **Graphite 950**: Headings and the dark full-bleed sections.
- **Graphite 800**: Body text on light grounds.
- **Graphite 600**: Secondary copy and navigation at rest.
- **Graphite 500**: The smallest labels. The floor for text on any light ground.
- **Graphite 200**: Hairline rules, card borders, and the 1px gaps between grid cells.
- **Bone** / **Bone Dim**: The page ground and its alternating band.
- **Card White**: Reserved for panels that carry a mechanism or a measurement.

### Named Rules

**The State Rule.** Amber and green are clinical status, never decoration. If a colour is not reporting the
condition of something, it is graphite or teal.

**The Live Colour Rule.** Teal marks what is acting. A static container never takes teal just to look branded;
the one exception is the closing CTA band, where the action *is* the content.

**The Contrast Floor.** `graphite-500` is the lightest text on any light ground and `graphite-400` on
`graphite-950`. Every pair in this file is verified at 4.5:1 or better; `risk-500` and `graphite-500` were both
darkened from their first draft specifically to clear it on `bone-dim`.

## Typography

**Display Font:** Public Sans (with `ui-sans-serif`, `system-ui`)
**Body Font:** Public Sans
**Label/Mono Font:** IBM Plex Mono (with `ui-monospace`, `SFMono-Regular`)

**Character:** Public Sans is a public-service face, drawn for clarity in health and government contexts — it
carries institutional plainness without the corporate gloss of the usual product-marketing sans. Plex Mono
handles measurements and system names, where tabular figures and unambiguous characters matter.

### Hierarchy
- **Display** (700, `clamp(2.25rem, 5vw, 3rem)`, 1.08): The page-opening claim, one per page.
- **Headline** (600, 1.875rem, 1.2): Section headings.
- **Title** (600, 1.125rem, 1.4): Panel and stage titles.
- **Body** (400, 1rem, 1.625): Paragraph copy. Measure stays under 75ch.
- **Label** (500, 0.6875rem, 0.14em tracking, uppercase, mono): Section marks, system names, and figures.
  Carried by `.measure-label`.

### Named Rules

**The Instrument Rule.** Monospace is for things that are measured or named by a system — utilisation, a PMS
name, an integration, a status line. Prose is never mono.

**The No-Eyebrow Rule.** No kicker sits above a heading. Mono labels mark fields and sections; they never
introduce a headline.

## Layout

A centred column at `max-width: 72rem` with `1.5rem` gutters holding from 320px up. Long-form pages narrow to
`48rem`/`56rem` to keep measure under 75ch.

Sections are separated by ground changes rather than whitespace alone: `bone` → `graphite-950` → `bone` →
`bone-dim` → `vital-950`, each closed with a hairline. The dark bands are used to carry the two hardest
statements on the page (the size of the leak, and the ask), so the page has a rhythm of claim and quiet rather
than uniform density.

Vertical rhythm is `4rem`–`5rem` between sections, `1.5rem`–`2.5rem` within, always more space above a heading
than below it. The hero is an asymmetric `1.05fr 1fr` grid that stacks below `md`; the loop runs four-up on
`lg`, two-up on `sm`, stacked below. No page scrolls horizontally at any width down to 320px.

## Elevation & Depth

Flat by default, with one exception. Structure comes from hairline borders and ground changes — grid cells are a
1px gap over a `graphite-200` ground, so panels share rules like cells in a table rather than floating as tiles.

### Shadow Vocabulary
- **Instrument lift** (`box-shadow: 0 1px 2px rgba(15,18,20,0.04), 0 18px 44px -20px rgba(15,18,20,0.28)`):
  The hero loop panel only — the one element representing something live.

### Named Rules

**The One Shadow Rule.** Exactly one element per page may cast a shadow. A second turns the page into a card
wall and the first stops meaning anything.

## Shapes

Square by default: `4px` on controls and chips, `8px` on panels. **Nothing is pill-shaped.** `rounded-full` is
reserved for the loop nodes and the small status dots, which are true circles because they are states.

The recurring silhouette is the **loop**: a segmented circle with four nodes, one filled. Across a sequence the
filled node advances, so the mark itself carries the stage rather than repeating as a logo.

## Components

### Buttons
- **Shape:** `4px` corners.
- **Primary:** `vital-600` fill, white label, `12px 24px`, semibold.
- **Hover / Focus:** Darkens to `vital-700`. Focus shows the global teal ring.
- **Secondary:** No fill, `graphite-300` hairline, `graphite-700` label, both darkening to `graphite-950`.
- **On the vital band:** Inverted — white fill, `vital-900` label, hovering to `vital-100`.

### Chips
- **Style:** White fill, `graphite-200` hairline, `graphite-600` label, `4px` corners.
- **State:** Static. A taxonomy of disciplines and systems, not filters — they do not select.

### Cards / Panels
- **Corner Style:** `8px`; grid cells share rules via a 1px gap.
- **Background:** White against `bone`/`bone-dim`.
- **Shadow Strategy:** None, except the hero loop panel.
- **Border:** `graphite-200` hairline; `vital-600` at 2px marks the Datafore layer in the architecture diagram,
  which is the one place a border carries meaning rather than structure.
- **Internal Padding:** `24px` mobile, `32px`–`40px` from `md`.

### Navigation
- Public Sans medium at `0.875rem`, `graphite-600` at rest, `vital-700` when current.
- Sticky, `bone/90` with backdrop blur, closed by a hairline.
- Below `md` it becomes a native `<details>` disclosure — no JavaScript, works before hydration.

### Loop Mark (signature component)
An authored inline SVG on a 100×100 viewBox: a segmented circle at `r=30` (stroke 5, 30% opacity,
`stroke-dasharray="38 9"`) with four nodes at the quarter positions. The active node is filled at `r=11`; the
rest are `r=6.5` outlines at 55% opacity. Colour inherits via `currentColor`. Stroke weights are deliberately
heavy so the mark stays legible at 24px inline — the first draft used stroke 2 and disappeared at small sizes.
The `active` prop is how a sequence shows progress.

## Do's and Don'ts

### Do:
- **Do** use teal to mark what is acting, and signal colours to report state.
- **Do** advance the loop mark's `active` node across a sequence so the mark carries meaning.
- **Do** separate sections with a ground change closed by a hairline.
- **Do** build grids as a 1px gap over a `graphite-200` ground so panels share rules.
- **Do** name the real systems — Jane App, Cliniko, Owl Practice, HubSpot. Specificity is the trust signal this
  product has before it has customers.
- **Do** label every illustrative figure as illustrative, in place. There are no customers yet and nothing may
  imply otherwise.
- **Do** route internal links and `public/` assets through `withBase()`; markdown links are rewritten at build.

### Don't:
- **Don't** use teal as a decorative fill on a static container.
- **Don't** use amber or green for anything that is not a clinical state.
- **Don't** use `rounded-full` on anything that is not a loop node or a status dot.
- **Don't** put an eyebrow or kicker above a heading, or number sections `01 / 02 / 03` — the loop stages carry
  their own names.
- **Don't** add a coloured `border-left` to callouts or list items; use a hairline divider list instead.
- **Don't** add a second shadow to a page.
- **Don't** set text lighter than `graphite-500` on light grounds or `graphite-400` on `graphite-950`.
- **Don't** claim benchmarking as available. It requires a critical mass of clinics and is described as
  forthcoming, always.
- **Don't** publish pricing, ARR/CAC/LTV, or roadmap detail — those live in the strategy document.
