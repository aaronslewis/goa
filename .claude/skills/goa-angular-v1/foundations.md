# Foundations — GoA Design System v1

Cross-walked to <https://v1.design.alberta.ca/foundations>. Section order mirrors
the live docs so a colleague can switch between this file and the v1 site without
re-orienting.

For the canonical token list, grep `node_modules/@abgov/design-tokens/dist/tokens.css`
(or the skill-local copy at [`reference/tokens/goa-tokens.css`](./reference/tokens/goa-tokens.css)).

---

## Colour

### Brand
- `--goa-color-brand-default` — `#0081A2` (teal)
- `--goa-color-brand-dark` — `#005072`
- `--goa-color-brand-light` — `#C8EEFA`
- Wordmark cyan — `#00B6ED` (only on the Alberta wordmark; not a general UI colour)

### Interactive (all clickable affordances)
- `--goa-color-interactive-default` — `#006DCC` (action blue — links, primary
  buttons, focus rings)
- `--goa-color-interactive-hover` — `#045092`
- `--goa-color-interactive-focus` — same blue, used in the 2px focus outline
- `--goa-color-interactive-visited` — for visited links

> **Rule: link colour ≠ brand colour.** Use `interactive-*` for every interactive
> element. The brand teal is reserved for branding (logo lockups, accent strips on
> certain banners), not buttons or links.

### Text & surface
- `--goa-color-text-default` — black on white
- `--goa-color-text-secondary` — `greyscale-600` for supporting copy
- `--goa-color-surface-default` — white background
- `--goa-color-surface-alt` — `greyscale-50` for subtle section backgrounds

### Status (fixed)
- Success — green `#006F4C` (`--goa-color-status-success-*`)
- Information — blue `#0077AD` (`--goa-color-status-info-*`)
- Important/warning — yellow `#F9CE2D` (`--goa-color-status-warning-*`)
- Emergency — red `#DA291C` (`--goa-color-status-emergency-*`)

### Extended palette (reserved use only)
Sky, pasture, prairie, sunset, dawn, lilac. Use **only** for badges and data-viz
— never as core UI colour.

---

## Typography

### Families
- **Acumin Pro** (Adobe Typekit) — everything. Substitute **Source Sans 3** if the
  Acumin licence is absent (flag the substitution to the user).
- **Roboto Mono** — numerics, tabular data, money columns.

### Scale (token-driven, all `--goa-typography-*`)
- Heading: `2xl` (48px) → `xl`, `l`, `m`, `s`, `xs`
- Body: `l`, `m` (default), `s`, `xs`
- Each token bundles font-family, weight, size, line-height. Use as a `font:`
  shorthand: `font: var(--goa-typography-heading-l);`

### Rules
- Headings are bold/semibold with slightly negative letter-spacing
  (`--goa-letter-spacing-*`).
- Body is regular weight.
- Numbers use the mono family in tables and money columns for tabular alignment.
- **Never** hard-code `font-family`, `font-size`, `font-weight`, or `line-height`.

---

## Spacing & layout

### Scale (4px base, `--goa-space-*`)
- `3xs` 2 · `2xs` 4 · `xs` 8 · `s` 12 · `m` 16 · `l` 24 · `xl` 32 · `2xl` 48 ·
  `3xl` 64 · `4xl` 128

### Layout
- Centred content with `max-width` ~1216px and 32px gutters.
- Section vertical rhythm uses `xl`/`2xl` space. **Avoid dividers** for section
  breaks — use space.
- Grid utilities exist as `--goa-*` variables; for simple layouts CSS Grid / Flex
  with the spacing tokens is fine.

---

## Elevation & shape

### Radius
- Inputs and buttons — radius `m` (8px) — `--goa-border-radius-m`
- Cards and containers — `xl` (12px) or `2xl` (16px)
- **Never** pill (`9999px`); the GoA system uses soft-but-not-pill corners.

### Elevation
- `--goa-shadow-raised-light` — single soft shadow for cards.
- `--goa-shadow-modal` — for dialogs.
- Most surfaces stay **flat** with a 1px `--goa-color-greyscale-150` or `200` border
  rather than a shadow.

### Borders
- Hairlines — `--goa-color-greyscale-150` or `200`, `1px` solid.
- **Inputs** use an **inset box-shadow** for their border (`box-shadow: inset 0 0 0
  1px <colour>;`) — 1px default → 1.5px hover/black → 2px focus blue. This keeps
  layout stable on focus.

### Focus
- **Always** a 2px `--goa-color-interactive-focus` (`#006DCC`) outline, offset 2px.
- **Never** remove the outline; never use a custom focus colour.

---

## Motion

- Transitions short and functional: `0.1s – 0.2s ease-in-out`.
- The signature GoA micro-interaction is the **button press**:
  `transform: translateY(2px)` on `:active`.
- **No** decorative animation, no bounces, no parallax, no loops, no spinners
  beyond the GoA-provided ones.
- Motion tokens live under `--goa-motion-*` if you need them.

---

## Iconography

- **Ionicons** via the `<goa-icon>` web component. Pass the name as a string:
  `<goa-icon name="arrow-forward"></goa-icon>`.
- **Outline** by default for UI controls.
- **Filled** (`*-circle`, solid variants) for status indicators in callouts and
  badges.
- Stroke weight is light (~1.5px); tint with `currentColor`.
- **No emoji. No unicode glyphs as icons.**

### Alberta wordmark
- File: [`reference/assets/alberta-wordmark.svg`](./reference/assets/alberta-wordmark.svg).
- **Never** recreate, recolour, or distort it.
- Reversed to white **only** on dark brand surfaces (e.g. brand-dark CTA banner,
  footer).

---

## Accessibility (WCAG 2.1 AA)

- **Visible focus** — 2px `--goa-color-interactive-focus` outline, offset 2px, on
  every interactive element. Never remove.
- **Tap targets** — minimum 44×44px on touch.
- **Label every form field.** Either a visible `<label>` or aria-label if visual
  label is impossible.
- **Semantic landmarks** — use `<header>`, `<nav>`, `<main>`, `<footer>`. Use
  `<h1>`–`<h6>` in document order.
- **Colour is never the sole signal** — error states need an icon + text, status
  badges need a label, success states need a checkmark + text.
- **Alt text** — every meaningful image has alt; decorative images use `alt=""`.
- **Test with a screen reader** — see the project's `screen-reader-testing` skill.

---

## Authority links

- v1 docs — <https://v1.design.alberta.ca/>
- Foundations — <https://v1.design.alberta.ca/foundations>
- Components source — <https://github.com/GovAlta/ui-components>
- Design tokens — <https://github.com/GovAlta/design-tokens>
