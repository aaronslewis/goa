# How to build GoA interfaces

A help-centre prototype for the Government of Alberta. **This branch will be frozen soon and handed to developers**; subsequent design explorations move to a separate branch.

For new prototypes or screens **in this repo**, invoke the **`goa-angular-v1`** skill for DS 1.0 work, or **`goa-angular-v2`** for DS 2.0 work — pick per prototype (see below). (The skill family also includes `goa-react-v1` and `goa-react-v2` for React stacks.) **Default to DS 1.0 for a new prototype unless the user says otherwise; some existing prototypes in this repo are deliberately DS 2.0 — check the prototype before assuming.**

## Stack
- Angular 20 (latest stable), npm, hosted on Netlify.
- `@abgov/angular-components@^5.2.1` (wraps `@abgov/web-components@^1.41.0`)
- `@abgov/design-tokens@^1.10.0`

## DS 1.0 and DS 2.0 coexist in this repo, per prototype

The installed `@abgov/web-components@1.41.0` is a **single dual-mode bundle**: every `goa-*` custom element renders DS 1.0 by default and opts into DS 2.0 rendering via a `version="2"` attribute. `@abgov/angular-components@5.2.1`'s `Goab*` Angular components (`GoabButton`, `GoabWorkSideMenu`, …) are real, current, non-beta wrappers that render that same underlying `goa-*` element with `version="2"` already set. **`goab-*` selectors are valid and expected for any prototype built against `goa-angular-v2`.**

This means a v1 prototype and a v2 prototype can run side by side in this same app with **no separate package install** — `ecds-dashboard-v2` is a working example. Pick DS 1.0 (`goa-angular-v1`, raw `<goa-*>` + `CUSTOM_ELEMENTS_SCHEMA`) or DS 2.0 (`goa-angular-v2`, real `<goab-*>` Angular components) per prototype, based on what that prototype needs — check `goa-angular-v1`'s and `goa-angular-v2`'s own SKILL.md for the current per-prototype DS assignment before starting new work, since it changes as prototypes get migrated.

**Tokens.** `@abgov/design-tokens` is pinned to `^1.10.0` (v1 tokens) — a v2 token line (`2.8.1`+) exists upstream but is **not installed here**. DS 2.0-rendered components (`version="2"`) currently render using v1 token CSS; this is a known gap, not a blocker, but don't assume a v2-only token name resolves — always verify against the installed v1 stylesheet:

Before using a token, confirm it exists in v1:
```bash
grep <token-name> node_modules/@abgov/design-tokens/dist/tokens.css
```

**Docs:**
- v1: https://v1.design.alberta.ca
- v2: https://design.alberta.ca

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
- Don't default a *new* prototype to DS 2.0 without checking — DS 1.0 is still the default absent other direction.
- Don't mix `goa-*` (raw v1) and `goab-*` (v2 wrapper) selectors *within the same component* — pick one DS per prototype.
- Don't widen `@abgov/design-tokens` past `^1.10.0` — the v2 token line isn't installed here; a v2-only token name will silently resolve to nothing against the installed v1 stylesheet.
- Don't hand-build a component that already exists in `@abgov/angular-components`.
- Don't hard-code a design value that has a `--goa-*` token.
