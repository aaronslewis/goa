# Government of Alberta — Design System v1

This skill packages the GoA V1 brand foundations (colour, type, spacing, motion, voice)
and component library for building **Government of Alberta digital services** and
public-facing pages on **Alberta.ca**.

> **Version: V1 (1.x)** — the standard most delivery teams ship on (docs:
> <https://v1.design.alberta.ca/>). V2 (2.x) lives at <https://design.alberta.ca/>
> and is **forbidden** in this repo until the team migrates. Token values here come
> from `@abgov/design-tokens@1.10.0` and components from `@abgov/web-components@1.41.0`.

## Quick reference

- **Voice & copy** → see [`content-guidelines.md`](./content-guidelines.md).
- **Colour, type, spacing, motion, icons, a11y** → see [`foundations.md`](./foundations.md).
- **Component selectors and prop docs** → see [`components/`](./components/).
- **Full screen patterns** → see [`ui-kits/alberta-ca/`](./ui-kits/alberta-ca/) (public info page) and [`ui-kits/subsidy-application/`](./ui-kits/subsidy-application/) (4-step form wizard).
- **Scaffold-and-preview workflow** → see [`workflow.md`](./workflow.md).
- **Token search** → `node_modules/@abgov/design-tokens/dist/tokens.css` (canonical) or [`reference/tokens/goa-tokens.css`](./reference/tokens/goa-tokens.css) (skill-local copy).

## Brand identity at a glance

**Colour.** Deep **teal brand** (`--goa-color-brand-default` `#0081A2`, dark `#005072`,
light `#C8EEFA`) plus wordmark **cyan** `#00B6ED`. Almost all *interactive* colour is
a separate **action blue** (`--goa-color-interactive-default` `#006DCC`, hover
`#045092`) — links, primary buttons, focus. Neutrals are a warm greyscale (50 → 800
+ black); body text is black on white, secondary text `greyscale-600`. Status colours
are fixed: green `#006F4C` (success), blue `#0077AD` (info), yellow `#F9CE2D`
(important/warning), red `#DA291C` (emergency). The extended palette (sky, pasture,
prairie, sunset, dawn, lilac) is **reserved for badges and data-viz only** — never
core UI.

**Type.** **Acumin Pro** (humanist sans) for everything, **Roboto Mono** for
numerics/data. Acumin is licensed via Adobe Typekit; if unavailable, substitute
Source Sans 3. Headings are bold/semibold with slightly negative letter-spacing;
body is regular.

**Spacing & layout.** Strict **4px base** scale (`3xs`=2 … `4xl`=128). Content sits
on a centred **max-width ~1216px** grid with 32px gutters. Generous vertical rhythm
— sections separated by `xl`/`2xl` space, not dividers.

**Shape & elevation.** Corners are soft, not pill — inputs/buttons use radius `m`
(8px); cards/containers use `xl`/`2xl` (12–16px). Elevation is restrained: a single
soft **`raised-light`** shadow for cards, **`modal`** for dialogs; most surfaces are
flat with a 1px `greyscale-150/200` hairline border instead of shadow.

**Borders.** Hairlines are `greyscale-150`–`200`. Inputs use an **inset box-shadow
border** (1px default → 1.5px hover/black → 2px focus blue) rather than a CSS border,
so focus never shifts layout. Focus is always a **2px `#006DCC` outline** offset 2px.

**Buttons.** Primary = solid action-blue fill, white text. Secondary = light-blue
(`#E0F1FF`) fill. Tertiary = white with a 1px grey→black border. Text = underlined
link-style. The **"start" button** is the oversized primary CTA with a built-in
forward arrow. Hover **darkens** the fill (blue→`#045092`); **press nudges the
button down 2px** (`translateY(2px)`) — a signature GoA micro-interaction.
Disabled = 50% opacity. Transitions short (0.1–0.2s ease-in-out); motion is
functional, never decorative — no bounces, no looping animation.

**Backgrounds & imagery.** Predominantly **white / `greyscale-50`** — no gradients,
no full-bleed hero photography by default, no textures. Photography is warm, candid,
documentary; placed in cards or banners, never as a screen-wide background behind
text. The one strong colour field is the **brand-dark CTA banner**.

## Iconography

**Set: Ionicons** — the GoA `<goa-icon>` web component embeds Ionicons. Icon names
map 1:1 (`arrow-forward`, `checkmark-circle`, `information-circle`, `calendar`, …).
**Outline by default** for UI; **filled** (`-circle`, solid) for status indicators
in callouts and badges. Stroke weight light (~1.5px), tinted with `currentColor`.

**No emoji. No unicode glyphs as icons.** The only brand mark is the **Alberta
wordmark** (`reference/assets/alberta-wordmark.svg`) — never recreate, recolour, or
distort it; reverse it to white only on dark brand surfaces.

## Sources of truth

- **Components:** <https://github.com/GovAlta/ui-components> — `libs/web-components/src/components/*` (Svelte source), `libs/angular-components` (wrapper).
- **Design tokens:** <https://github.com/GovAlta/design-tokens> — `dist/tokens.css` (V1).
- **Live docs:** <https://v1.design.alberta.ca/> (V1) · <https://design.alberta.ca/> (V2, reference only).
- **Content:** <https://www.alberta.ca/web-writing-style-guide-writing-style> and v1.design.alberta.ca/foundations/content.
