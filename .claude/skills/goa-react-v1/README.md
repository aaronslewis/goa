# Government of Alberta — Design System v1 (React)

This skill packages the GoA V1 brand foundations (colour, type, spacing, motion,
voice) and component library for building **Government of Alberta digital
services** and public-facing pages on **Alberta.ca**, in React.

> **Version: V1 (1.x)** — the standard most delivery teams ship on (docs:
> <https://v1.design.alberta.ca/>). V2 (2.x) lives at <https://design.alberta.ca/>;
> if your project uses `@abgov/react-components@7.x`, switch to the `goa-react-v2`
> skill. V1 React components come from `@abgov/react-components@4.x`, which wraps
> the `<goa-*>` web components in `@abgov/web-components@1.x`.

## Quick reference

- **Voice & copy** → [`content-guidelines.md`](./content-guidelines.md)
- **Colour, type, spacing, motion, icons, a11y** → [`foundations.md`](./foundations.md)
- **Component imports and props** → [`components/`](./components/)
- **Full screen patterns** → [`ui-kits/alberta-ca/`](./ui-kits/alberta-ca/) (public info page) and [`ui-kits/subsidy-application/`](./ui-kits/subsidy-application/) (4-step form wizard) — each with a `react-translation.md`
- **Workflow** → [`workflow.md`](./workflow.md)
- **Token search** → `node_modules/@abgov/design-tokens/dist/tokens.css` (canonical) or [`reference/tokens/goa-tokens.css`](./reference/tokens/goa-tokens.css) (skill-local copy)

## Brand identity at a glance

**Colour.** Deep **teal brand** (`--goa-color-brand-default` `#0081A2`, dark `#005072`,
light `#C8EEFA`) plus wordmark **cyan** `#00B6ED`. Almost all *interactive* colour is
a separate **action blue** (`--goa-color-interactive-default` `#006DCC`, hover
`#045092`) — links, primary buttons, focus. Neutrals are a warm greyscale (50 → 800
+ black). Status colours are fixed: green `#006F4C` (success), blue `#0077AD` (info),
yellow `#F9CE2D` (important/warning), red `#DA291C` (emergency). The extended palette
(sky, pasture, prairie, sunset, dawn, lilac) is **reserved for badges and data-viz
only** — never core UI.

**Type.** **Acumin Pro** (humanist sans) for everything, **Roboto Mono** for
numerics/data. If Acumin's Adobe licence is unavailable, substitute Source Sans 3.
Headings are bold/semibold with slightly negative letter-spacing; body is regular.

**Spacing & layout.** Strict **4px base** scale (`3xs`=2 … `4xl`=128). Content sits
on a centred **max-width ~1216px** grid with 32px gutters. Sections separated by
`xl`/`2xl` space, not dividers.

**Shape & elevation.** Inputs/buttons use radius `m` (8px); cards/containers `xl`/
`2xl` (12–16px). One soft **`raised-light`** shadow for cards, **`modal`** for
dialogs; most surfaces are flat with a 1px `greyscale-150/200` hairline border.

**Buttons.** Primary = solid action-blue fill. Secondary = light-blue (`#E0F1FF`)
fill. Tertiary = white with grey→black border. The **"start" button** is the
oversized CTA with built-in arrow. Hover darkens; **press nudges down 2px**
(`translateY(2px)`). Transitions 0.1–0.2s ease-in-out; no decorative motion.

**Backgrounds.** White / `greyscale-50`. No gradients, no full-bleed photography
behind text. The one strong colour field is the **brand-dark CTA banner**.

## Iconography

**Ionicons** via the GoA icon system — pass names like `arrow-forward`,
`checkmark-circle` to `leadingIcon`/`trailingIcon` props. **Outline** by default;
**filled** for status indicators. **No emoji. No unicode glyphs as icons.** The
Alberta wordmark ([`reference/assets/alberta-wordmark.svg`](./reference/assets/alberta-wordmark.svg))
is never recreated, recoloured, or distorted; reverse to white only on dark brand
surfaces.

## Sources of truth

- **Components:** <https://github.com/GovAlta/ui-components> — `libs/react-components` (V1 = 4.x line)
- **Design tokens:** <https://github.com/GovAlta/design-tokens> — `dist/tokens.css` (1.x line)
- **Live docs:** <https://v1.design.alberta.ca/> (V1) · <https://design.alberta.ca/> (V2, reference only)
- **Content:** <https://www.alberta.ca/web-writing-style-guide-writing-style>
