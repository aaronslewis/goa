# How to build GoA interfaces

A help-centre prototype for the Government of Alberta. **This branch will be frozen soon and handed to developers**; subsequent design explorations move to a separate branch.

For new prototypes or screens **in this repo**, invoke the **`goa-angular-v1`** skill — it packages the brand voice, V1 component selectors, token reference, and the scaffold-draft-preview-verify workflow that enforces the rules below. (The skill family also includes `goa-react-v1`, `goa-angular-v2`, and `goa-react-v2` for other stacks.) **Default to DS 1.0. Only switch to a v2 skill when the user explicitly asks for DS 2.0.**

## Stack
- Angular 20 (latest stable), npm, hosted on Netlify.
- `@abgov/angular-components@^5.2.1` (wraps `@abgov/web-components@^1.41.0`)
- `@abgov/design-tokens@^1.10.0`

## Use the GoA Design System v1 (not v2)

**Default is DS 1.0.** Only use DS 2.0 when the user explicitly asks for it.

**Components.** `@abgov/angular-components` ships both design systems in one package. Both v1 and v2 use the same `goa-*` component handles (e.g. `<goa-button>`, `<goa-callout>`, `<goa-input>`). This is why v1 and v2 cannot coexist in the same app or on the same page — they would collide. The `goab-*` prefix appeared during the v2 beta and is no longer current; do not use it.

**Tokens.** `@abgov/design-tokens` releases v1 and v2 as separate npm lines — *not* a switch within one package. Pin to `^1.10.0`; never widen to `2.x`. ~15% of v1 token names were renamed or dropped in v2, so a v2-only token will silently resolve to nothing.

Before using a token, confirm it exists in v1:
```bash
grep <token-name> node_modules/@abgov/design-tokens/dist/tokens.css
```

**Docs:**
- v1: https://v1.design.alberta.ca
- v2 (reference only): https://design.alberta.ca

## Components and tokens
- Always use components from `@abgov/angular-components` (source: https://github.com/GovAlta/ui-components) for buttons, inputs, form fields, callouts, badges, etc. Never hand-build these.
- Never hard-code colours, spacing, font sizes, radii, shadows, or motion durations. Use `--goa-*` tokens.
- Match Figma layer names to component settings when a Code Connect map exists. Prefer the mapped example.

## Accessibility
WCAG 2.1 AA: visible focus, adequate tap targets, labelled fields, semantic landmarks.

## Code conventions
- Comments explain *why*, not *what* — skip them when the code is self-evident.
- No commented-out code.

## Don't
- Don't use DS 2.0 unless the user explicitly asks for it.
- Don't use `goab-*` component handles (beta-era prefix, no longer valid).
- Don't install any `@abgov/*` 2.x package.
- Don't hand-build a component that already exists in `@abgov/angular-components`.
- Don't hard-code a design value that has a `--goa-*` token.
