# Government of Alberta — Design System v2 (Angular)

This skill packages the GoA brand foundations and the **Design System 2.0**
component library for building Government of Alberta digital services in Angular.

> **Version: V2 (2.x)** — the new standard, documented at
> <https://design.alberta.ca/>. The legacy V1 (most teams' current standard) is at
> <https://v1.design.alberta.ca/> and is covered by the `goa-angular-v1` skill.
> V2 components are the `Goab*` classes in `@abgov/angular-components`; tokens
> come from `@abgov/design-tokens@2.x`.

## Quick reference

- **Voice & copy** → [`content-guidelines.md`](./content-guidelines.md) (identical across DS versions — the Alberta.ca writing standard doesn't change with the component library)
- **Colour, type, spacing tokens** → [`foundations.md`](./foundations.md) and [`token-changes.md`](./token-changes.md)
- **Component imports, inputs, outputs** → [`components/`](./components/)
- **Page anatomies** → [`ui-kits/patterns.md`](./ui-kits/patterns.md)
- **Workflow** → [`workflow.md`](./workflow.md)
- **Token search** → [`reference/tokens/goa-tokens-v2.css`](./reference/tokens/goa-tokens-v2.css) (compiled `@abgov/design-tokens@2.8.1`) + [`reference/tokens/dark-theme.css`](./reference/tokens/dark-theme.css)

## Brand identity at a glance

The brand fundamentals carry over from V1 — V2 modernizes component visuals and
adds capabilities (dark theme tokens, native Angular form integration), it does
not rebrand:

- **Colour:** teal brand (`#0081A2`), action blue for all interaction
  (`--goa-color-interactive-default` `#006DCC`), warm greyscale, fixed status
  colours (success green, info blue, warning yellow, emergency red). Extended
  palette reserved for badges/data-viz.
- **Type:** Acumin Pro (V2 tokens use `acumin-variable`) + Roboto Mono for
  numerics (`--goa-font-family-number`).
- **Spacing:** 4px base scale, centred ~1216px content grid.
- **Motion:** short functional transitions, signature 2px button press, no
  decorative animation.
- **Icons:** Ionicons via `<goab-icon>`; outline default, filled for status.
  No emoji. Alberta wordmark never recreated or recoloured.

**Where V2 visuals differ from V1, trust <https://design.alberta.ca/> and the V2
token values over this file** — check the component page on the docs site when
unsure.

## Sources of truth

- **Components:** <https://github.com/GovAlta/ui-components>
- **Design tokens:** <https://github.com/GovAlta/design-tokens> (2.x line)
- **Live docs:** <https://design.alberta.ca/>
- **Content:** <https://www.alberta.ca/web-writing-style-guide-writing-style>
