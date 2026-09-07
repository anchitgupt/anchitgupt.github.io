# Visual Strategy — Anchit Gupta Portfolio

Design language for the portfolio. Any new page or component should follow
these rules to stay consistent.

---

## 1. Design Philosophy

**"Operator Console"** — the portfolio presented as a live data platform rather
than a document. Near-black ink, an acid-lime signal colour, monospace
scaffolding, and one genuinely animated centrepiece (the DAG). It should feel
like looking at a healthy production system.

Three pillars:

1. **Instrumented, not decorated** — numbers, states, logs and meters do the
   visual work. Ornament is earned by meaning.
2. **One loud thing per screen** — the hero DAG, the impact grid, the contact
   headline. Everything else stays quiet.
3. **Mono as structure, display as voice** — IBM Plex Mono carries labels,
   metadata and chrome; Bricolage Grotesque carries names and headlines.

---

## 2. Colour System

Never write a raw hex in component CSS — always use a token.

### Dark (default)

| Token | Value | Usage |
|---|---|---|
| `--ink` | `#08090a` | Page background |
| `--ink-2` | `#0b0d0e` | Terminal, deepest surfaces |
| `--surface` | `#101314` | Cards, panels, nav when stuck |
| `--surface-2` | `#161a1b` | Hover surfaces |
| `--line` | `rgba(232,240,225,.09)` | Default borders, dividers |
| `--line-2` | `rgba(232,240,225,.18)` | Hover borders, DAG strokes |
| `--text` | `#e9efe6` | Headings, emphasis |
| `--muted` | `#8e968c` | Body copy |
| `--dim` | `#626a5f` | Metadata, captions |
| `--signal` | `#c9f24e` | THE accent — acid lime |
| `--signal-2` | `#a8d434` | Gradient partner for signal |
| `--signal-soft` | `rgba(201,242,78,.13)` | Chip / tint backgrounds |
| `--on-signal` | `#0a0c06` | Text on a signal background |
| `--amber` | `#ffb347` | Warnings, terminal `warn` |
| `--cyan` | `#5fd6c9` | "Down is good" metrics, terminal `key` |
| `--bronze` / `--silver` / `--gold` | `#c98f52` / `#b5bfc7` / `#f0c85a` | Medallion tiers only |
| `--c-lake` | `#f0c85a` | Lakehouse theme (gold) |
| `--c-mlops` | `#5fd6c9` | MLOps theme (cyan) |
| `--c-ai` | `#e879c7` | AI / RAG theme (orchid) |

### Light (`[data-theme="light"]`) — "blueprint paper"

Same token names, remapped to a warm paper ground (`#ebe7dc`) with ink text
(`#12160e`). `--signal` darkens to `#4a7605` so it stays legible on paper, and
`--on-signal` flips to cream. Light mode is a different *mood*, not an
inversion.

### The three themes

The site covers three bodies of work, and each has ONE hue that identifies it
everywhere it appears — the hero DAG branch, the Systems card, the project
`P/nn` index, the article date, the filter it answers to:

| Theme | Token | Reads as |
|---|---|---|
| Lakehouse / Medallion | `--c-lake` | gold |
| MLOps | `--c-mlops` | cyan |
| AI / RAG | `--c-ai` | orchid |

Apply via `--sys` (Systems cards), `--card` (project/post cards), `--tone`
(DAG nodes and packets) or the `.k-lake` / `.k-mlops` / `.k-ai` inline keyword
classes. Never introduce a fourth theme hue — add to one of the three.

### Rules

- `--signal` (acid lime) stays the house colour: chrome, CTAs, focus, meters.
  The three theme hues classify content; they never take over the interface.
- `--on-signal` is the ONLY text colour allowed on a `--signal` background.
- `--amber` and `--cyan` still carry state meaning (warning / inverse-metric).
  `--c-mlops` aliases cyan deliberately; don't reuse amber for a theme.
- Medallion metals appear only in the Bronze/Silver/Gold flow and DAG nodes.

---

## 3. Typography

| Role | Font | Weight | Notes |
|---|---|---|---|
| Display (h1, section titles, card titles) | **Bricolage Grotesque** | 700–800 | `letter-spacing: -.025em` to `-.045em` |
| Body | **IBM Plex Sans** | 400–600 | `line-height: 1.68` |
| Mono (labels, metadata, chrome, buttons, tags) | **IBM Plex Mono** | 400–600 | uppercase + `letter-spacing: .1em` for labels |

Buttons use mono, not sans — they read as commands. All numerals in meters,
stats and metrics use `font-variant-numeric: tabular-nums`.

Scale (fluid via `clamp()`):

- Hero name: `clamp(3.4rem, 9.5vw, 7.2rem)`, line-height `.87`
- Section title: `clamp(1.9rem, 4.2vw, 3rem)`
- Contact headline: `clamp(2.3rem, 6.5vw, 4.6rem)`
- Body `1rem`; mono labels `.62–.78rem`

---

## 4. Spacing & Layout

- **Container** (`.wrap`): max-width `1180px`, padding `clamp(1.15rem, 4vw, 2.5rem)`.
- **Section rhythm**: `clamp(4.5rem, 11vh, 8rem)` vertical.
- **Radii**: `--r-sm: 6px` (chips, buttons) · `--r: 12px` (cards) · `--r-lg: 18px`
  (panels, palette). Nothing is a pill except status chips and social circles.
- **Hairline grids**: the metrics and posts grids use `gap: 1px` over a
  `--line` background so cells share borders instead of floating.

Grid counts are explicit, never `auto-fit`, where the item count is known —
6 metrics are `repeat(3, 1fr)` so they fill two rows with no orphan cell.

---

## 5. Elevation & Effects

| Effect | Recipe |
|---|---|
| Card | `1px solid var(--line)` + `color-mix(in srgb, var(--surface) 50%, transparent)` |
| Panel shadow | `--shadow: 0 32px 70px -34px rgba(0,0,0,.9)` |
| Signal glow | `--glow: 0 0 44px -6px rgba(201,242,78,.35)` |
| Ambient | fixed grid + drifting aurora + SVG noise, all `pointer-events:none` |
| Cursor spotlight | fixed radial gradient, lerped follow, `pointer: fine` only |
| Card spotlight | `radial-gradient(340px circle at var(--mx) var(--my))` on `.spot` |

Hover: cards lift `translateY(-4px/-5px)` and brighten their border to
`--line-2`. Never both lift and scale.

---

## 6. Motion

| Token | Value | Usage |
|---|---|---|
| `--t-fast` | `.18s var(--ease)` | Colour, small hovers |
| `--t` | `.34s var(--ease)` | Lifts, transforms |
| `--ease` | `cubic-bezier(.22,1,.36,1)` | Default |
| `--ease-io` | `cubic-bezier(.65,0,.35,1)` | Ambient loops |

- **Entrances**: `.reveal` + IntersectionObserver, staggered with `--d`
  (90ms steps). Hero reveals fire on boot completion, not on scroll.
- **Scramble**: section titles scramble once on entry; the hero role cycles
  through `data-words` every 3.2s.
- **Counters/meters**: animate from 0 on entry, once.
- **The DAG**: topological waves every ~5.6s, packets travel real SVG paths
  via `getPointAtLength`. Six waves: sources → ingest → bronze → silver → gold,
  then a three-way fan-out to `mlops`, `bi.serve` and `rag.index` — the same
  three themes the rest of the page is organised by. Nodes and their inbound
  packets inherit the destination's `--tone`. Pauses via IntersectionObserver
  when off-screen.

**Every** new animation must survive `prefers-reduced-motion: reduce`. The
global guard kills durations; anything JS-driven must also branch on the
`reduced` flag (the DAG renders a static lit graph, the boot screen is skipped,
counters jump to final values).

---

## 7. Component Recipes

- **Buttons**: mono, `--r-sm`. `.btn-solid` = signal fill + `--on-signal` text;
  `.btn-ghost` = `--line-2` border, signal on hover; `.btn-bare` = text only.
  Add `.magnetic` for cursor attraction.
- **Section header**: `[nn]` mono number + display title + fading rule + right-
  aligned mono meta. Add `data-scramble` to the title.
- **Status chip**: mono `.6rem`, uppercase, `.1em` tracking, pill radius.
  `.live` variant adds the pulsing `.dot`.
- **Timeline (`.run`)**: 2-column grid, node dot + gradient connector, body
  lifts and gains a border on hover.
- **Meter**: 3–4px track on `--line`, fill is `--signal-2 → --signal`, width set
  by JS on entry.
- **Terminal / palette**: opaque `--ink-2` / `--surface`, `dag-dots` header,
  auto-focused input with its focus ring suppressed.
- **Filter chips** (`.filters` > `.chip`): mono pills; active chip is a solid
  `--signal` fill. The bar declares `data-for` (grid id) and `data-empty`
  (empty-state id); each card carries a space-separated `data-f` so one card
  can answer to several filters. Cards stay in the HTML — JS only toggles
  `hidden`, so the content survives with JS off and stays indexable.
- **Systems card** (`.system`): sets `--sys` to its theme hue, which drives the
  top rule, index, tag, step markers and note bullets. `.sys-notes` uses
  `margin-top:auto` so notes bottom-align across cards of unequal length.

---

## 8. Accessibility

- Body text ≥ 4.5:1 in both themes.
- Everything interactive has hover **and** `:focus-visible` (2px signal outline,
  3px offset). The only exceptions are the palette and terminal inputs, which
  are auto-focused and sole controls in their dialog.
- Decorative layers carry `aria-hidden="true"`; icon-only buttons carry
  `aria-label`; the DAG `<svg>` has `role="img"` and a real description.
- The boot overlay is guarded by `<noscript>` and a 4s failsafe so it can never
  trap a visitor.
- Keyboard: `⌘/Ctrl+K` palette, `/` palette, `` ` `` terminal, `Esc` closes,
  arrows navigate the palette list.

---

## 9. Content Provenance

Facts on this page come from sources, not from memory:

- **Experience, skills, location** — the résumé PDF in `files/`.
- **Articles** — three public Medium sources, in this order. Titles, dates and
  URLs are copied verbatim; never hand-write a Medium URL, the trailing hash
  cannot be guessed (one real slug is `…hadn-t-used-them-myself-2511e18f15a1`,
  which no amount of guessing would produce).
  1. `https://medium.com/feed/@anchitgupt` — the author feed, capped at the 10
     most recent posts.
  2. `https://medium.com/feed/area-21` — the *Learn Data Now* publication feed,
     which carries the co-published pieces the author cap drops. Filter on
     `<dc:creator>`.
  3. `https://medium.com/sitemap/posts/<yyyy>/posts-<yyyy-mm-dd>.xml` — Medium's
     own crawler sitemap, partitioned by publish date. Use when you know a
     post's date but not its URL.

  Medium's HTML returns 403 to scripted requests and its article bodies are
  member-only, so the feeds carry no preview text — write card descriptions
  from the title and tags, and don't reproduce article content. Do not route
  around the paywall to get body text; the page only needs title, URL and date.
  A 403 when checking a Medium link is bot-blocking, not a broken link.
- **Projects** — the GitHub API for `anchitgupt` and `ez-biz`. Descriptions
  paraphrase the repo's own `description` field.

Don't state a capability the source doesn't support — no compliance posture
("HIPAA", "PHI-aware"), no deployment claims, no invented metrics. If a number
appears on the page, it should be traceable to the résumé or a repo.

## 10. Do / Don't

Use tokens. Keep one accent. Stagger entrances. Give known-count grids explicit
columns. Test both themes and reduced motion.

Don't add a fourth theme hue, don't let a theme hue replace `--signal` in the
chrome, don't use `auto-fit` where it can orphan a cell, don't animate longer
than `.34s` for an interaction, don't put sans-serif in chrome, and don't ship
an effect that has no reduced-motion answer.
