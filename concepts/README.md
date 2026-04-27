# Concrete — Rubric Labs Design System

**Concrete** is Rubric Labs' in-house design system — a restrained, ink-first foundation for building AI-native product surfaces that feel materially distinct from the current sea of soft-rounded, gradient-heavy AI UIs. The name is the promise: concrete, not vaporous. Solid typographic hierarchy on a near-white canvas, a deep ink ramp doing most of the expressive work, and a tightly-scoped palette that earns its presence by being rare.

## Core tenets

- **Ink ramp over hues.** Nine ink stops (`#0A0B0F` → `#E8EAEE`) carry ~90% of the UI. Tone does the work colour usually does elsewhere.
- **One accent, three signals.** Sky (`#1F6FD4`) for interactive pointer moments. Terminal green (`#0EA564`) for live/shipping, Ultra purple (`#6B5BFF`) for pro/featured/info, Error red (`#E23B3B`) for destructive. That's it — no "success-soft", no "warning-wash", no off-palette greens for "looks good" buttons.
- **Flat, not glossy.** Filled buttons get one inset highlight and one soft ground shadow. No top-light/bottom-dark gradients, no double outlines, no donut rings — when a primitive needs a separator from its background, we notch the background, not stack borders.
- **Typographic restraint.** Plus Jakarta Sans for UI, Fraunces for display, JetBrains Mono for code and small-caps metadata. Tight letter-spacing, tabular numerals by default.
- **Density as a feature.** Small controls, short buttons, tight row rhythm. The product should feel like a professional tool, not a marketing page.

## Sources & provenance

This project was duplicated from the prior Concrete design system (mounted read-only as `Concrete — Rubric Labs Design System (1)/`). It now **adds back** the Badge primitive (rebuilt on-brand) and a full set of **Data display primitives** (sparkline, KPI, progress, distribution, table-cell, indicator). The slider was re-cut to the foundations — mono removed, the white-outline thumb gone.

excluded** from this copy per the request.

Source contents duplicated 1:1 into this project:

- `colors_and_type.css` — foundations (color + type + spacing + radii + elevation + motion + grid tokens)
- `preview/*.html` — swatch cards and primitive demos
- `assets/` — 80 Lucide-style SVG icons, plus `logo-mark.svg`, `logo-black.svg`, `logo-white.svg`, `wordmark.svg`, `wordmark-black.svg`

The upstream brand spec lives in `WWW/brand.html` (v5.0 "Concrete") inside the source repo — not duplicated here; the CSS tokens in `colors_and_type.css` are the derived source-of-truth for this fork.

## Content fundamentals

Concrete's copy is **terse, declarative, technical**. It reads like changelog entries and terminal output, not marketing copy.

- **Tone:** precise, slightly dry, confident without hype. Imperatives over questions: *"Send"*, *"Ship"*, *"Delete"* — not *"Ready to send?"*. Statements of fact: *"Live / shipping"*, *"Hairline lifts to shadow-2 on hover"*.
- **Voice:** second-person *you* is rare; the system mostly speaks in labels and nouns. When a system sentence is necessary, it's short: *"Enter a valid email address."*
- **Casing:**
  - Buttons / UI: **Sentence case** — *"Upgrade to Pro"*, *"New chat"*.
  - Eyebrow / section labels: **UPPERCASE + tracked** (`letter-spacing: .10em`, weight 700, 11px) — *"COMPONENTS"*, *"SIGNALS · THREE STATES"*.
  - Mono metadata: lowercase with `·` separators — *"ink · cool graphite"*, *"lucide · 1.5 stroke · 24×24 viewBox"*.
- **Punctuation:** em-dashes (`—`) instead of colons for explanatory clauses. `·` as a soft separator. No Oxford comma ambiguity — statements are usually too short to need one.
- **Numerals:** tabular by default (`font-variant-numeric: tabular-nums`). Hex codes and token names live in `JetBrains Mono`, always uppercase for hex (`#0A0B0F`) and lowercase for token names (`--ink-9`).
- **No emoji.** Never. Status is carried by ink dots, signal colors, or Lucide glyphs.
- **Vibe:** professional tool, terminal-adjacent, editorial restraint. Think *Linear* meets *a developer's CLI output*. Fraunces display appears rarely and earns its presence — it's the one place the system lets itself be warm.

Example snippets from the system itself:

> `Terminal — live / shipping`
> `Ultra — pro / featured / info`
> `Error — destructive`
> `Hairline lifts to shadow-2 on hover; border tightens.`
> `Border only. The canonical surface.`

## Visual foundations

- **Colors.** One neutral ramp (ink), one accent (sky), three signals (terminal / ultra / error). Surfaces are cool near-whites — canvas `#F7F8FA`, surface `#FFFFFF`, sunken `#F1F2F5`. See `preview/colors-ink.html`, `colors-sky.html`, `colors-signals.html`, `colors-surfaces.html`.
- **Type.** Plus Jakarta Sans (UI, 400/500/600/700), Fraunces (display — pinned to `opsz` 144, `SOFT` 100, `WONK` 1), JetBrains Mono (code, eyebrows, hex). Tight tracking at display sizes (`-0.032em` → `-0.014em`), looser at small sizes. `font-feature-settings: "ss01", "cv01", "tnum"` globally.
- **Spacing.** 4px base, 15 stops (`--s-1` 4px → `--s-48` 192px). Tight at the atom scale, generous at the layout scale.
- **Radii.** Six values: `4, 6, 10, 14, 20` and `9999` for pills. Most UI atoms land on `6` (buttons) or `10` (cards).
- **Backgrounds.** Flat. Near-white canvas with an optional lattice / dots / grain texture (see `preview/textures.html`, `lattice.html`, `frame.html`). **Never** gradient backgrounds. Dark panels exist (ink-9) but they're inverse surfaces, not moody gradients.
- **Animation.** One easing, one duration — `cubic-bezier(0.2, 0, 0, 1)` at `180ms`. Fades and position transitions only; no bounces, no springs, no parallax. Hover transitions are fast (`120–140ms`).
- **Hover states.** Filled buttons: darker fill (e.g. `--ink-9` → `--ink-8`). Secondary: border tightens (`--border` → `--border-hi`) + slight raise. Ghost: `--mist` wash appears. Links: `opacity: 0.65`.
- **Press states.** Subtle `translateY(0.5px)` on buttons. No scale-down, no color flash.
- **Borders.** Single 1px hairlines. Three ink levels: `--border-soft` (--ink-1), `--border` (--ink-2), `--border-hi` (--ink-3). Never double borders; never a border stacked on a shadow.
- **Shadows.** Four steps, hairline-first. `shadow-1` is the resting state; `shadow-2` is popovers; `shadow-3` is modals; `shadow-4` is overlays. All cool-ink, low opacity (`rgba(10,11,15,0.04–0.14)`). Inset highlights on filled buttons (`inset 0 1px 0 rgba(255,255,255,.08–.2)`).
- **Protection gradients.** Not used. Where contrast is needed over imagery, use a solid ink scrim at a fixed alpha, not a fade.
- **Transparency / blur.** Blur is rare — reserved for sticky headers over scrolled content (`backdrop-filter: saturate(1.4) blur(10px)`) and nothing else.
- **Imagery vibe.** Cool, tool-like, often screenshots of the product itself. No warm grainy photography, no hand-drawn illustrations. Logos and marks are monochrome.
- **Corner radii summary.** Buttons `6`, inputs `6`, chips `pill`, cards `10`, modals `14`. Nothing rounds past `20` except pills.
- **Card anatomy.** `1px solid var(--border)` + `var(--r-4)` (10px) + `padding: 20px 22px`. Raised variant adds `shadow-1`. Sunken uses `var(--sunken)` bg + `--border-soft`. Interactive variant tightens border and lifts to `shadow-2` on hover.
- **Focus ring.** Single token — `--ring-focus: 0 0 0 3px var(--sky-ring)` (sky at 28% alpha). Never a double ring.
- **Layout rules.** Fixed headers are 48–56px. Content lives on a 48px lattice (`--grid-unit`). Max body reading width is 68ch.
- **Use of color in data.** Ordered categorical series: ink-9 → sky → terminal → ink-5 → ultra. Past five, wrap back to ink. Grid and axis are `--ink-1` and `--ink-3`. See `--data-*` tokens.

## Iconography

- **System.** [Lucide](https://lucide.dev) — 1.5 stroke, 24×24 viewBox, `stroke-linecap: round`, `stroke-linejoin: round`, `fill: none`. 80 SVGs copied into `assets/icons/`. Icons inherit color from `stroke: currentColor` and size from CSS.
- **Sizes.** 12 / 14 / 16 / 20 / 24 / 32 — use the size that matches the adjacent text's cap-height.
- **Color.** Always `currentColor`. No multi-color icons, no filled shapes mixed with stroked shapes, no brand-colored icons.
- **Emoji.** Not used. Ever.
- **Unicode glyphs.** Reserved for kbd shortcuts (`⌘`, `↵`, `⇧`, `⌥`) in `JetBrains Mono` — see `preview/kbd.html`. Never inline with body text.
- **Brand marks.** `logo-mark.svg` is the C-glyph (currentColor, 900×900 viewBox). `wordmark.svg` is the "Rubric" logotype. Both come in black and white variants.
- **Substitutions.** Lucide is available on CDN (`lucide.dev`, or `unpkg.com/lucide-static`) if a consumer needs more icons than the 80 copied locally — **flag** any additions so the local copy can be expanded.

## Fonts

All three families are loaded from **Google Fonts** via a single `<link>` or `@import url(...)`. No local font files are vendored. If offline / locked-down hosting is needed, drop the respective `.woff2` files into `fonts/` and switch to `@font-face`.

- Plus Jakarta Sans — 400, 500, 600, 700 (+ 800 for display h1)
- Fraunces — Google Fonts static instance: `ital`, `opsz 144`, `wght 300..800`, `SOFT 100`, `WONK 1`
- JetBrains Mono — 400, 500, 600, 700

> **Note / substitution flag:** the upstream system ships fonts via Google Fonts, not vendored files — no `.woff2` needed to be copied. If you want offline-safe local files, ship me the `.woff2` files and I'll wire up `@font-face`.

## UI kit

See `ui_kits/concrete/` — a single product-surface kit that composes the Concrete primitives into a plausible app shell: sidebar nav, command palette affordance, thread list, message composer, and a tool-call turn. Each primitive comes from `preview/*.html` verbatim (no re-invention).

## Index

```
README.md                     · this file
SKILL.md                      · Agent-Skill manifest for Claude Code
colors_and_type.css           · tokens — colors, type, spacing, radii, shadows, motion
assets/
  logo-mark.svg               · C-glyph (currentColor)
  logo-black.svg · logo-white.svg
  wordmark.svg · wordmark-black.svg
  icons/                      · 80 Lucide SVGs (currentColor, 1.5 stroke)
preview/                      · per-primitive demo cards (consumed by Design System tab)
  _card.css · _label.css      · shared card/label skeleton
  colors-ink | colors-sky | colors-signals | colors-surfaces
  type-families | type-scale | type-display
  radii | spacing | elevation | motion | focus-ring
  lattice | frame | textures | scrollbar
  button | input | textarea | select | checkbox | radio | switch | slider
  card | chip | pill | tag | badge | row | avatar | bubble | code | kbd | link
  delta | spinner | skeleton | stat | caret
  progress | divider | empty-state | tooltip | icon
  sparkline | kpi | distribution | table-cell | indicator
ui_kits/concrete/
  README.md · index.html
  Sidebar.jsx · Header.jsx · ThreadList.jsx · MessageTurn.jsx · Composer.jsx
```

## Caveats

- The **meter** primitive is still excluded (per original request). Data surfaces get their `%-of-capacity` read from `progress` (linear + circular) and `kpi` (bullet variant) — meters as a separate atom would be redundant. Say the word if you want it back as a discrete primitive.
- **Data primitives** are pure SVG, no chart library. That's a deliberate choice — every mark is on the 8px grid, strokes are 1px, and there are no runtime dependencies. For real-data charts, wire these shapes into a chart lib of your choice.
- **Fonts are not vendored** — all three families are loaded from Google Fonts. If you want a fully offline / self-hosted build, send me the `.woff2` files and I'll wire them up.
- **Brand spec (`WWW/brand.html`)** was not present in the mounted folder — only the derived CSS tokens. If you want the prose spec duplicated too, re-attach it and I'll mirror it here.
- UI kit is a single "Concrete app shell" — no second product surface was defined upstream. Let me know if you want marketing / docs / auth shells too.
