# How to build GoA interfaces

A set of prototypes for the Government of Alberta.

For new prototypes or screens **in this repo**, invoke the **`goa-angular-v1`** skill for DS 1.0 work, or **`goa-angular-v2`** for DS 2.0 work — pick per prototype (see below). (The skill family also includes `goa-react-v1` and `goa-react-v2` for React stacks.) **Default to DS 1.0 for a new prototype unless the user says otherwise; some existing prototypes in this repo are deliberately DS 2.0 — check the prototype before assuming.** Ask to confirm when you can.

## Stack
- Angular 20 (latest stable), npm, hosted on Netlify.
- `@abgov/angular-components@^5.2.1` (wraps `@abgov/web-components@^2.4.0`)
- `@abgov/design-tokens@^1.10.0` (DS 1.0 tokens) **and** `design-tokens-v2` → `npm:@abgov/design-tokens@^2.12.8` (DS 2.0 tokens, installed under an alias). See "Tokens" below.

## DS 1.0 and DS 2.0 coexist in this repo, per prototype

`@abgov/web-components` is a **single dual-mode bundle**: every `goa-*` custom element renders DS 1.0 by default and opts into DS 2.0 rendering via a `version="2"` attribute. `@abgov/angular-components@5.2.1`'s `Goab*` Angular components (`GoabButton`, `GoabWorkSideMenu`, …) are real, current, non-beta wrappers that render that same underlying `goa-*` element with `version="2"` already set. **`goab-*` selectors are valid and expected for any prototype built against `goa-angular-v2`.**

This repo bumped `@abgov/web-components` from `1.41.0` to `2.4.0`. Before bumping it again, re-verify the dual-mode boundary hasn't shifted: diff `customElements.define(...)` for every `goa-*` tag actually used in this repo (`grep -rohE '<goab?-[a-z-]+' src/` to enumerate them) between the old and new tarballs (`npm pack @abgov/web-components@<version>` extracts one without installing it) and confirm every element that had a `version` prop still has it. That check passed clean for the 1.41.0→2.4.0 jump — no component gained or lost the dual-mode toggle — but a component *without* a `version` prop (like the whole `goa-work-side-menu` family) has no v1/v2 split at all: it ships one implementation, and that implementation can be silently, substantially rewritten between versions even though the custom element name and its registered props stay identical. That's exactly what happened here — see below.

This means a v1 prototype and a v2 prototype can run side by side in this same app — `ecds-dashboard-v2` is a working example. **A v2 prototype needs two things: `goab-*` components *and* the `goa-ds-v2` class on its host element** (see "Tokens"). Without the class, `goab-*` components render v2 markup with v1 values and look like DS 1.0. Pick DS 1.0 (`goa-angular-v1`, raw `<goa-*>` + `CUSTOM_ELEMENTS_SCHEMA`) or DS 2.0 (`goa-angular-v2`, real `<goab-*>` Angular components) per prototype, based on what that prototype needs. The `goa-angular-v1`/`goa-angular-v2` skills themselves are generic and shared across other repos ([goa-design-skills](../goa-design-skills) plugin) — they don't carry this repo's per-prototype list. **This table is the source of truth for this repo; update it whenever a prototype is migrated:**

| Prototype | DS | Notes |
|---|---|---|
| `main-menu`, `main-menu-2`, `main-menu-3`, `provider-portal-menu` | v2 | `goab-work-side-menu` genuinely renders v2 markup as of `@abgov/web-components@2.4.0` — see below. |
| `platform-prototypes` (root `/` index) | v2 | |
| `notifications-hub` (`/notifications-hub/home`, `/notifications-hub/notifications`) | v2 | Shell (`hub-shell.component.*`) re-applies the menu's current item after each navigation and routes the menu's `(onNavigate)`. `goa-work-side-menu`'s built-in URL matching can't distinguish hash routes (every `#/…` href resolves to pathname `/`), so on its own it clears `current` everywhere. The other menus likely have the same problem. |
| `notifications-page`, `notifications-scale`, `workspace-shell` | v1 | In scope for a future v2 pass — not yet converted. |
| `ecds-dashboard`, `generic-dashboard` | v1 | In scope for a future v2 pass — not yet converted. `ecds-dashboard-v2` is the already-converted reference. |
| `ecds-dashboard-v2` | v2 | Reference implementation for the dashboard conversions above. |
| `home-page-design` (`MyProgramsComponent`) | v1 | In scope for a future v2 pass — not yet converted. |
| `help-centre`, `help-centre-feedback`, `sage-widget` (AI Assistant) | v1 | Staying v1 — not in scope for conversion. |
| `user-access-management`, `goa-user-management` | v1 | Staying v1 — not in scope for conversion. |
| `ProgramSelector` (shared component) | v1 | Embedded as-is inside v2 hosts (e.g. `home-page-design`) — left unforked; minor visual inconsistency accepted rather than forking a shared component per host DS. |

**Resolved gap: `goab-work-side-menu` got a genuine v2 rewrite in `@abgov/web-components@2.4.0`.** Under `1.41.0` it rendered the exact same shadow DOM regardless of any version attribute (there is no `version` prop on this component family at all — confirmed by reading the compiled `customElements.define(...)` call in both package versions). Under `2.4.0` the internal implementation was wholesale replaced: it now wraps header/primary-list/footer in a purpose-built `goa-scroll-panel` component (`.top-section` header, `.primary-menu` scrollable body, `.bottom-section` pinned footer containing secondary nav + profile + collapse toggle), which **natively constrains the primary list to the available space and scrolls only that region** — exactly the problem the old hand-rolled `work-side-menu-scroll-fix.ts` existed to solve. That file (and the `.primary-scroll` wrapper div/CSS every menu used to carry) has been deleted; none of it is needed anymore. Verified across all four menus, including the worst case (`main-menu`'s 19-item list, all groups expanded).

One quirk survived the rewrite: the profile's secondary text (`.profile-secondary`) still sets `line-height` equal to its `font-size` with `overflow:hidden`, clipping descenders ('y', 'g', etc.). [provider-portal-menu.component.ts](src/app/provider-portal-menu/provider-portal-menu.component.ts) patches it the same way it did for the old implementation — a `<style>` injected directly into the component's shadow root after it upgrades, so no Svelte scope-hash class is needed in the selector, just `!important` to outrank the library's own rule. Re-check this patch (and whether it's still needed) on any future `@abgov/web-components` bump.

**Tokens: v1 at `:root`, v2 scoped to `.goa-ds-v2`.** DS 1.0 and DS 2.0 use the *same token names with different values* (e.g. `--goa-border-radius-m` is `0.25rem` in v1 and `0.5rem` in v2; `--goa-font-family-sans` is Acumin SemiCondensed vs `acumin-variable`). DS 2.0 components get their whole look from these values, so they only look like DS 2.0 when v2 values are in scope. Some component tokens (drawer offset, lilac/default badges, pagination text) exist *only* in v2, and those components break without them.

- v1 tokens load globally at `:root` via `@abgov/web-components/index.css` in [src/styles.scss](src/styles.scss). This is the default for every prototype.
- v2 tokens come from `@abgov/design-tokens@2.x`, installed as `design-tokens-v2`. [scripts/build-ds-v2-tokens.mjs](scripts/build-ds-v2-tokens.mjs) rewrites its single `:root` block to `.goa-ds-v2` and writes [src/styles/ds-v2-tokens.css](src/styles/ds-v2-tokens.css), which `styles.scss` imports. The script runs on `npm start` / `npm run build` (`prestart`/`prebuild`), and the output is committed so `npx ng serve` works too. Regenerate with `npm run tokens:v2` after bumping the package.
- **Every v2 prototype's top-level component sets `host: { class: 'goa-ds-v2' }`.** Custom properties inherit into shadow roots, so every `goab-*` inside gets v2 values, and v1 prototypes are untouched.
- Never load the v2 token file at `:root`: it would restyle every v1 prototype.

Before using a token, confirm it exists in the token set for that prototype's DS. v2 dropped or renamed some v1 names, e.g. `--goa-color-extended-violet` is now `--goa-color-extended-lilac-*`:
```bash
grep -- "--goa-<name>:" node_modules/@abgov/web-components/index.css      # v1
grep -- "--goa-<name>:" node_modules/design-tokens-v2/dist/tokens.css     # v2
```

**Font.** The v2 typeface `acumin-variable` is an Adobe font that isn't loaded here, so v2 prototypes fall back to Helvetica Neue / Arial. Add an Adobe Fonts kit to get the real typeface.

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
- Don't build a v2 prototype without `host: { class: 'goa-ds-v2' }` on its top-level component — its `goab-*` components will render with v1 token values and look like DS 1.0.
- Don't widen `@abgov/design-tokens` past `^1.10.0` or load v2 tokens at `:root` — that package is the global v1 token set for all v1 prototypes. DS 2.0 tokens come from the `design-tokens-v2` alias, scoped to `.goa-ds-v2`.
- Don't hand-shim v2 token values inside a prototype — if a v2 component looks wrong, first check the prototype is inside `.goa-ds-v2`.
- Don't hand-build a component that already exists in `@abgov/angular-components`.
- Don't hard-code a design value that has a `--goa-*` token.
- Don't re-introduce a manual scroll/sizing fix for `goab-work-side-menu` — `goa-scroll-panel` handles it natively as of `@abgov/web-components@2.4.0`; see "Resolved gap" above.
- Don't assume a component without a `version` prop is safe to bump silently — its single implementation can change wholesale between releases even though the custom element name and props stay identical (this is what happened to `goa-work-side-menu`).
