# Foundations — GoA Design System v2

Cross-walked to <https://design.alberta.ca/>. For token names, the source of
truth is [`reference/tokens/goa-tokens-v2.css`](./reference/tokens/goa-tokens-v2.css)
(compiled `@abgov/design-tokens@2.8.1`) — grep it before using any token. V1→V2
deltas are in [`token-changes.md`](./token-changes.md).

## Colour

- **Brand:** `--goa-color-brand-default` (teal), `-dark`, `-light`.
- **Interactive (all clickable affordances):** `--goa-color-interactive-default`
  (action blue), `-hover`, `-focus`, `-visited`. **Link colour ≠ brand colour.**
- **Text / surface:** `--goa-color-text-default`, `-secondary`;
  `--goa-color-surface-*` famílies per component state.
- **Status (fixed):** `--goa-color-status-success-*` (green), `-info-*` (blue),
  `-warning-*` (yellow), `-emergency-*` (red).
- **Extended palette** (sky, pasture, prairie, sunset, dawn, lilac): badges and
  data-viz only.
- **Dark theme:** 2.x ships `dark-theme.css` overrides — scope them under your
  dark-mode selector rather than redefining tokens by hand.

## Typography

- `--goa-font-family-sans: acumin-variable, helvetica-neue, arial, sans-serif`
- `--goa-font-family-number: roboto-mono, monospace` — numerics, money, tables.
- Scale via `--goa-typography-heading-*` / `--goa-typography-body-*` tokens used
  as `font:` shorthand. Never hard-code family, size, weight, or line-height.

## Spacing & layout

- 4px base scale: `--goa-space-3xs` (2) … `--goa-space-4xl` (128).
- Centred content, max-width ~1216px, 32px gutters; section rhythm with
  `xl`/`2xl` space rather than dividers.

## Shape, elevation, borders, focus

- Radius tokens `--goa-border-radius-*`; inputs/buttons `m`, cards `xl`/`2xl`.
- `--goa-shadow-raised-light` for cards, `--goa-shadow-modal` for dialogs; most
  surfaces flat with 1px greyscale hairlines.
- Focus is always the 2px `--goa-color-interactive-focus` outline, offset 2px.
  Never remove it.

## Motion

- 0.1–0.2s ease-in-out transitions; the 2px press-down on buttons; no decorative
  animation. `--goa-motion-*` tokens for durations and curves.

## Iconography

- Ionicons via ``GoabIcon``; outline default, filled for status indicators.
- No emoji, no unicode glyphs as icons. Alberta wordmark
  ([`reference/assets/alberta-wordmark.svg`](./reference/assets/alberta-wordmark.svg)):
  never recreate/recolour/distort; reverse to white only on dark brand surfaces.

## Accessibility (WCAG 2.1 AA)

Visible focus everywhere; tap targets ≥ 44×44; every field labelled (via
`GoabFormItem`); semantic landmarks; colour never the sole signal; alt text
on meaningful images.

## Where V2 differs visually from V1

Component proportions, paddings, and some default treatments changed in 2.0.
Don't carry V1 pixel assumptions over — when fidelity matters, check the
component's page on <https://design.alberta.ca/> and the V2 token values.
