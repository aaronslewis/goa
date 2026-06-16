# Government of Alberta — Design System v2 (React)

This skill packages the GoA brand foundations and the **Design System 2.0**
component library for building Government of Alberta digital services in React.

> **Version: V2 (2.x)** — the new standard, documented at
> <https://design.alberta.ca/>. The legacy V1 is at <https://v1.design.alberta.ca/>
> and is covered by the `goa-react-v1` skill. V2 React components are the `Goab*`
> exports of `@abgov/react-components@7.x`; tokens come from
> `@abgov/design-tokens@2.x`.

## Quick reference

- **Voice & copy** → [`content-guidelines.md`](./content-guidelines.md) (identical across DS versions)
- **Colour, type, spacing tokens** → [`foundations.md`](./foundations.md) and [`token-changes.md`](./token-changes.md)
- **Component imports and props** → [`components/`](./components/)
- **Page anatomies** → [`ui-kits/patterns.md`](./ui-kits/patterns.md)
- **Workflow** → [`workflow.md`](./workflow.md)
- **Token search** → [`reference/tokens/goa-tokens-v2.css`](./reference/tokens/goa-tokens-v2.css) + [`reference/tokens/dark-theme.css`](./reference/tokens/dark-theme.css)

## Brand identity at a glance

The brand fundamentals carry over from V1 — V2 modernizes component visuals, it
does not rebrand:

- **Colour:** teal brand (`#0081A2`); action blue for all interaction
  (`--goa-color-interactive-default` `#006DCC`); warm greyscale; fixed status
  colours. Extended palette for badges/data-viz only.
- **Type:** Acumin (`acumin-variable`) + Roboto Mono for numerics.
- **Spacing:** 4px base scale, centred ~1216px grid.
- **Motion:** short functional transitions, 2px button press, nothing decorative.
- **Icons:** Ionicons via `GoabIcon` / `iconType` props; outline default. No
  emoji. Alberta wordmark never recreated or recoloured.

**Where V2 visuals differ from V1, trust <https://design.alberta.ca/> and the V2
token values** — check the component page on the docs site when unsure.

## Sources of truth

- **Components:** <https://github.com/GovAlta/ui-components> — `libs/react-components` (7.x line)
- **Design tokens:** <https://github.com/GovAlta/design-tokens> (2.x line)
- **Live docs:** <https://design.alberta.ca/>
- **Content:** <https://www.alberta.ca/web-writing-style-guide-writing-style>
