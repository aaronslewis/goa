# How to build GoA interfaces

A help-centre prototype for the Government of Alberta. **This branch will be frozen soon and handed to developers**; subsequent design explorations move to a separate branch.

For new prototypes or screens **in this repo**, invoke the **`goa-angular-v1`** skill for DS 1.0 work, or **`goa-angular-v2`** for DS 2.0 work — pick per prototype (see below). (The skill family also includes `goa-react-v1` and `goa-react-v2` for React stacks.) **Default to DS 1.0 for a new prototype unless the user says otherwise; some existing prototypes in this repo are deliberately DS 2.0 — check the prototype before assuming.**

## Stack
- Angular 20 (latest stable), npm, hosted on Netlify.
- `@abgov/angular-components@^5.2.1` (wraps `@abgov/web-components@^1.41.0`)
- `@abgov/design-tokens@^1.10.0`

## DS 1.0 and DS 2.0 coexist in this repo, per prototype

The installed `@abgov/web-components@1.41.0` is a **single dual-mode bundle**: every `goa-*` custom element renders DS 1.0 by default and opts into DS 2.0 rendering via a `version="2"` attribute. `@abgov/angular-components@5.2.1`'s `Goab*` Angular components (`GoabButton`, `GoabWorkSideMenu`, …) are real, current, non-beta wrappers that render that same underlying `goa-*` element with `version="2"` already set. **`goab-*` selectors are valid and expected for any prototype built against `goa-angular-v2`.**

This means a v1 prototype and a v2 prototype can run side by side in this same app with **no separate package install** — `ecds-dashboard-v2` is a working example. Pick DS 1.0 (`goa-angular-v1`, raw `<goa-*>` + `CUSTOM_ELEMENTS_SCHEMA`) or DS 2.0 (`goa-angular-v2`, real `<goab-*>` Angular components) per prototype, based on what that prototype needs. The `goa-angular-v1`/`goa-angular-v2` skills themselves are generic and shared across other repos ([goa-design-skills](../goa-design-skills) plugin) — they don't carry this repo's per-prototype list. **This table is the source of truth for this repo; update it whenever a prototype is migrated:**

| Prototype | DS | Notes |
|---|---|---|
| `main-menu`, `main-menu-2`, `main-menu-3`, `provider-portal-menu` | v2 (Angular API) | See "Known gap" below — no visual change from v1. |
| `platform-prototypes` (root `/` index) | v2 | |
| `notifications-page`, `notifications-scale`, `workspace-shell` | v1 | In scope for a future v2 pass — not yet converted. |
| `ecds-dashboard`, `generic-dashboard` | v1 | In scope for a future v2 pass — not yet converted. `ecds-dashboard-v2` is the already-converted reference. |
| `ecds-dashboard-v2` | v2 | Reference implementation for the dashboard conversions above. |
| `home-page-design` (`MyProgramsComponent`) | v1 | In scope for a future v2 pass — not yet converted. |
| `help-centre`, `help-centre-feedback`, `sage-widget` (AI Assistant) | v1 | Staying v1 — not in scope for conversion. |
| `user-access-management`, `goa-user-management` | v1 | Staying v1 — not in scope for conversion. |
| `ProgramSelector` (shared component) | v1 | Embedded as-is inside v2 hosts (e.g. `home-page-design`) — left unforked; minor visual inconsistency accepted rather than forking a shared component per host DS. |

**Known gap: `goab-work-side-menu` has no real v2 visual renderer yet.** `GoabWorkSideMenu`/`GoabWorkSideMenuItem`/`GoabWorkSideMenuGroup` are real Angular components with a real v2 API (`[primaryContent]` template-ref projection instead of v1's `<div slot="primary">`), but underneath they still render the exact same v1 `goa-work-side-menu` shadow DOM — confirmed by reading the compiled component source in `node_modules`. Converting the four menus above was an **Angular-API modernization only**; don't expect (or promise) a visual change until `@abgov/web-components` ships a real v2 render mode for this component family. Re-check this when bumping `@abgov/web-components`.

Because the underlying markup is unchanged, that shadow DOM still has no scroll region of its own for a long primary list — [work-side-menu-scroll-fix.ts](src/app/shared/work-side-menu-scroll-fix.ts) is shared, load-bearing infrastructure for **every** `goab-work-side-menu` usage (all four menus above). Any new work-side-menu-based prototype should call `setUpWorkSideMenuScrollFix` from `ngAfterViewInit` rather than re-solving this — the file's own comments document several non-obvious failure modes (flex-grow gap misattribution, scrollbar-driven reflow during group expand/collapse) worth reading before touching it.

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
- Don't promise a visual difference from converting a work-side-menu prototype to `goab-*` — see "Known gap" above.
- Don't re-derive shadow-DOM scroll/sizing math for a `goab-work-side-menu` prototype — reuse [work-side-menu-scroll-fix.ts](src/app/shared/work-side-menu-scroll-fix.ts).
