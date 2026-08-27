# How to build GoA interfaces

A set of prototypes for the Government of Alberta.

For new prototypes or screens **in this repo**, invoke the **`goa-angular-v1`** skill for DS 1.0 work, or **`goa-angular-v2`** for DS 2.0 work — pick per prototype (see below). (The skill family also includes `goa-react-v1` and `goa-react-v2` for React stacks.) **Default to DS 1.0 for a new prototype unless the user says otherwise; some existing prototypes in this repo are deliberately DS 2.0 — check the prototype before assuming.** Ask to confirm when you can.

## Stack
- Angular 20 (latest stable), npm, hosted on Netlify.
- `@abgov/angular-components@^5.2.1` (wraps `@abgov/web-components@^2.4.0`)
- `@abgov/design-tokens@^1.10.0`

## DS 1.0 and DS 2.0 coexist in this repo, per prototype

`@abgov/web-components` is a **single dual-mode bundle**: every `goa-*` custom element renders DS 1.0 by default and opts into DS 2.0 rendering via a `version="2"` attribute. `@abgov/angular-components@5.2.1`'s `Goab*` Angular components (`GoabButton`, `GoabWorkSideMenu`, …) are real, current, non-beta wrappers that render that same underlying `goa-*` element with `version="2"` already set. **`goab-*` selectors are valid and expected for any prototype built against `goa-angular-v2`.**

This repo bumped `@abgov/web-components` from `1.41.0` to `2.4.0`. Before bumping it again, re-verify the dual-mode boundary hasn't shifted: diff `customElements.define(...)` for every `goa-*` tag actually used in this repo (`grep -rohE '<goab?-[a-z-]+' src/` to enumerate them) between the old and new tarballs (`npm pack @abgov/web-components@<version>` extracts one without installing it) and confirm every element that had a `version` prop still has it. That check passed clean for the 1.41.0→2.4.0 jump — no component gained or lost the dual-mode toggle — but a component *without* a `version` prop (like the whole `goa-work-side-menu` family) has no v1/v2 split at all: it ships one implementation, and that implementation can be silently, substantially rewritten between versions even though the custom element name and its registered props stay identical. That's exactly what happened here — see below.

This means a v1 prototype and a v2 prototype can run side by side in this same app with **no separate package install** — `ecds-dashboard-v2` is a working example. Pick DS 1.0 (`goa-angular-v1`, raw `<goa-*>` + `CUSTOM_ELEMENTS_SCHEMA`) or DS 2.0 (`goa-angular-v2`, real `<goab-*>` Angular components) per prototype, based on what that prototype needs. The `goa-angular-v1`/`goa-angular-v2` skills themselves are generic and shared across other repos ([goa-design-skills](../goa-design-skills) plugin) — they don't carry this repo's per-prototype list. **This table is the source of truth for this repo; update it whenever a prototype is migrated:**

| Prototype | DS | Notes |
|---|---|---|
| `main-menu`, `main-menu-2`, `main-menu-3`, `provider-portal-menu` | v2 | `goab-work-side-menu` genuinely renders v2 markup as of `@abgov/web-components@2.4.0` — see below. |
| `platform-prototypes` (root `/` index) | v2 | |
| `notifications-page`, `notifications-scale`, `workspace-shell` | v1 | In scope for a future v2 pass — not yet converted. |
| `ecds-dashboard`, `generic-dashboard` | v1 | In scope for a future v2 pass — not yet converted. `ecds-dashboard-v2` is the already-converted reference. |
| `ecds-dashboard-v2` | v2 | Reference implementation for the dashboard conversions above. |
| `home-page-design` (`MyProgramsComponent`) | v1 | In scope for a future v2 pass — not yet converted. |
| `help-centre`, `help-centre-feedback`, `sage-widget` (AI Assistant) | v1 | Staying v1 — not in scope for conversion. |
| `user-access-management`, `goa-user-management` | v1 | Staying v1 — not in scope for conversion. |
| `ProgramSelector` (shared component) | v1 | Embedded as-is inside v2 hosts (e.g. `home-page-design`) — left unforked; minor visual inconsistency accepted rather than forking a shared component per host DS. |

**Resolved gap: `goab-work-side-menu` got a genuine v2 rewrite in `@abgov/web-components@2.4.0`.** Under `1.41.0` it rendered the exact same shadow DOM regardless of any version attribute (there is no `version` prop on this component family at all — confirmed by reading the compiled `customElements.define(...)` call in both package versions). Under `2.4.0` the internal implementation was wholesale replaced: it now wraps header/primary-list/footer in a purpose-built `goa-scroll-panel` component (`.top-section` header, `.primary-menu` scrollable body, `.bottom-section` pinned footer containing secondary nav + profile + collapse toggle), which **natively constrains the primary list to the available space and scrolls only that region** — exactly the problem the old hand-rolled `work-side-menu-scroll-fix.ts` existed to solve. That file (and the `.primary-scroll` wrapper div/CSS every menu used to carry) has been deleted; none of it is needed anymore. Verified across all four menus, including the worst case (`main-menu`'s 19-item list, all groups expanded).

One quirk survived the rewrite: the profile's secondary text (`.profile-secondary`) still sets `line-height` equal to its `font-size` with `overflow:hidden`, clipping descenders ('y', 'g', etc.). [provider-portal-menu.component.ts](src/app/provider-portal-menu/provider-portal-menu.component.ts) patches it the same way it did for the old implementation — a `<style>` injected directly into the component's shadow root after it upgrades, so no Svelte scope-hash class is needed in the selector, just `!important` to outrank the library's own rule. Re-check this patch (and whether it's still needed) on any future `@abgov/web-components` bump.

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
- Don't re-introduce a manual scroll/sizing fix for `goab-work-side-menu` — `goa-scroll-panel` handles it natively as of `@abgov/web-components@2.4.0`; see "Resolved gap" above.
- Don't assume a component without a `version` prop is safe to bump silently — its single implementation can change wholesale between releases even though the custom element name and props stay identical (this is what happened to `goa-work-side-menu`).
