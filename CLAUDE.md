# How to build GoA interfaces

A set of prototypes for the Government of Alberta.

**DS 2.0 is the default.** For a new prototype or screen in this repo, invoke the **`goa-angular-v2`** skill and build with `goab-*` components inside a `goa-ds-v2` host (see below). Use **`goa-angular-v1`** only to extend a prototype that the table below lists as v1, or when the user asks for DS 1.0. Before you change an existing prototype, check its row in the table. Never mix the two DS versions within one prototype. (The same skill family has `goa-react-v1` and `goa-react-v2` for React projects.)

## Design system sources: check these, don't guess

The design system's live docs outrank memory, and they outrank the snapshot docs bundled in the `goa-angular-*` skills. When the two disagree, the live docs win.

- **Index: https://design.alberta.ca/llms.txt.** It lists every component with its doc slug, and every example pattern. Slugs don't always match the component name (Header is `app-header`, Radio is `radio-group`, Notification banner is `notification`, Notification Panel is `work-side-notification-panel`), so look the slug up here.
- **Component API: `https://design.alberta.ca/components/{slug}.md`.** Each page covers the Angular props and events, usage guidance and accessibility guidance. Fetch it before using a component for the first time in a session, before setting a prop you haven't checked, and whenever a component misbehaves.
- **Patterns:** before you compose a page or flow, check the llms.txt **Examples** list for a match and follow it. Matches include the task list, question, review and result pages; filtering a table; adding a record in a drawer; and confirming a destructive action. Example pages are HTML only, with no `.md` version.
- **Check for a purpose-built component** before building one from parts. For example, Work Side Menu, Workspace Layout, Notification Panel, Push Drawer and Scroll Panel already exist.
- **Copy:** most prototypes here are worker tools (GoA product type `workspace`): dense, efficient, written in the domain's own terms. Citizen-facing screens (`public-form`) use plain language at about a grade 9 level, one step at a time. GoA's `content-design` skill covers both; use it for labels, errors, empty states and notifications.

GoA publishes these agent skills at [GovAlta/ui-components/skills](https://github.com/GovAlta/ui-components/tree/dev/skills); install one with `npx skills add GovAlta/ui-components --skill <name>`:
- `content-design`: writes copy for the right reader, citizen or worker. Worth installing.
- `component-search`: the llms.txt and `.md` lookup described above. Optional, because these rules already cover it.
- `using-goa-design-system`: maps an intent to a product type, templates and components. It depends on the `goa-design-system` MCP server, which isn't configured here, so don't rely on it.

## Stack
- Angular 20 (latest stable), npm, hosted on Netlify.
- `@abgov/angular-components@~5.4.0` + `@abgov/ui-components-common@~2.4.0` (wrap `@abgov/web-components@^2.4.0`). These three GoA packages release in step: Angular 5.**N** pairs with common 2.**N** and web-components 2.**N**. Keep their minors matched and bump them together. 5.4.0 is the first wrapper that projects content into `goab-dropdown-item`, which rich dropdown items (e.g. badges in the severity filter) need. 5.5.0 won't build against common 2.4 because it imports newer types.
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
| `search-service` | v2 | New prototype (Figma: ECDS Enhancements, node `1052-137673`). `program-details` is the first screen; more screens to follow per-prototype under this same folder. |
| `acknowledgement` (`/acknowledgement/*`) | v2 | Revised Child Care Accountability Program and Portal Access acknowledgement, built on the DS [task list page](https://design.alberta.ca/examples/task-list-page) pattern (not `goab-form-stepper`): task list hub → question pages (*Step X of 3*, back link, *Save and continue*) → result page. Answers live in the root `AcknowledgementStateService`, so a full reload resets them. *Continue to the portal* goes to `home-page-design`. |
| `acknowledgement-v2` (`/acknowledgement-v2/*`) | v2 | Second take on `acknowledgement`, kept side by side with it: one *Steps to complete* table with three rows (Step 1–3, each with its own badge, unlocked in order), and *Save and continue* moves straight to the next step instead of back to the task list. Self-contained copy with its own `AcknowledgementV2StateService`, so the two versions don't share answers. |
| `home-page-design` (`MyProgramsComponent`) | v1 | In scope for a future v2 pass — not yet converted. |
| `help-centre`, `help-centre-feedback`, `sage-widget` (AI Assistant) | v1 | Staying v1 — not in scope for conversion. |
| `user-access-management`, `goa-user-management` | v1 | Staying v1 — not in scope for conversion. |
| `ProgramSelector` (shared component) | v1 | Embedded as-is inside v2 hosts (e.g. `home-page-design`) — left unforked; minor visual inconsistency accepted rather than forking a shared component per host DS. |

**Resolved gap: `goab-work-side-menu` got a genuine v2 rewrite in `@abgov/web-components@2.4.0`.** Under `1.41.0` it rendered the exact same shadow DOM regardless of any version attribute (there is no `version` prop on this component family at all — confirmed by reading the compiled `customElements.define(...)` call in both package versions). Under `2.4.0` the internal implementation was wholesale replaced: it now wraps header/primary-list/footer in a purpose-built `goa-scroll-panel` component (`.top-section` header, `.primary-menu` scrollable body, `.bottom-section` pinned footer containing secondary nav + profile + collapse toggle), which **natively constrains the primary list to the available space and scrolls only that region** — exactly the problem the old hand-rolled `work-side-menu-scroll-fix.ts` existed to solve. That file (and the `.primary-scroll` wrapper div/CSS every menu used to carry) has been deleted; none of it is needed anymore. Verified across all four menus, including the worst case (`main-menu`'s 19-item list, all groups expanded).

One quirk survived the rewrite: the profile's secondary text (`.profile-secondary`) still sets `line-height` equal to its `font-size` with `overflow:hidden`, clipping descenders ('y', 'g', etc.). [provider-portal-menu.component.ts](src/app/provider-portal-menu/provider-portal-menu.component.ts) patches it the same way it did for the old implementation — a `<style>` injected directly into the component's shadow root after it upgrades, so no Svelte scope-hash class is needed in the selector, just `!important` to outrank the library's own rule. Re-check this patch (and whether it's still needed) on any future `@abgov/web-components` bump.

**Tokens: v1 at `:root`, v2 scoped to `.goa-ds-v2`.** DS 1.0 and DS 2.0 use the *same token names with different values* (e.g. `--goa-border-radius-m` is `0.25rem` in v1 and `0.5rem` in v2; `--goa-font-family-sans` is Acumin SemiCondensed vs `acumin-variable`). DS 2.0 components get their whole look from these values, so they only look like DS 2.0 when v2 values are in scope. Some component tokens (drawer offset, lilac/default badges, pagination text) exist *only* in v2, and those components break without them.

- v1 tokens load globally at `:root` via `@abgov/web-components/index.css` in [src/styles.scss](src/styles.scss). They're the baseline that any prototype outside `.goa-ds-v2` inherits.
- v2 tokens come from `@abgov/design-tokens@2.x`, installed as `design-tokens-v2`. [scripts/build-ds-v2-tokens.mjs](scripts/build-ds-v2-tokens.mjs) rewrites its single `:root` block to `.goa-ds-v2` and writes [src/styles/ds-v2-tokens.css](src/styles/ds-v2-tokens.css), which `styles.scss` imports. The script runs on `npm start` / `npm run build` (`prestart`/`prebuild`), and the output is committed so `npx ng serve` works too. Regenerate with `npm run tokens:v2` after bumping the package.
- **Every v2 prototype's top-level component sets `host: { class: 'goa-ds-v2' }`.** Custom properties inherit into shadow roots, so every `goab-*` inside gets v2 values, and v1 prototypes are untouched.
- Never load the v2 token file at `:root`: it would restyle every v1 prototype.

Before using a token, confirm it exists in the token set for that prototype's DS. v2 dropped or renamed some v1 names, e.g. `--goa-color-extended-violet` is now `--goa-color-extended-lilac-*`:
```bash
grep -- "--goa-<name>:" node_modules/@abgov/web-components/index.css      # v1
grep -- "--goa-<name>:" node_modules/design-tokens-v2/dist/tokens.css     # v2
```

**Fonts: already provided, don't self-host or override.** `@abgov/web-components/index.css` declares `@font-face` rules pointing at the design system's Adobe Fonts kit: `acumin-variable` (DS 2.0), `acumin-pro-semi-condensed` 400/600/700 plus italics (DS 1.0), and `roboto-mono`. Verified loading on both `localhost` and `goa-cc.netlify.app`. So the token font stacks resolve to the real typefaces. Don't commit font files (they're licensed, and the repo is public), and don't override `--goa-font-family-sans`. (The workspace demo at workspace-demo-v4.netlify.app renders in Arial because its older stylesheet lacks the `acumin-variable` declaration. Don't copy its font behaviour.)

Each DS gets its typeface through the token scope, not through per-component CSS. Text inside `.goa-ds-v2` resolves `--goa-font-family-sans` to `acumin-variable`, and everything else gets the v1 stack. In prototype styles, set type with `font: var(--goa-typography-*)` and `font-family: var(--goa-font-family-sans)`, never with a font name. If a v2 prototype renders in Acumin SemiCondensed, the `goa-ds-v2` host class is missing. If it renders in Arial or Helvetica, the Adobe Fonts kit failed to load. Check the browser's network panel for `use.typekit.net`. `styles.scss` re-declares the v1 stack at `:root`. That's harmless, because `.goa-ds-v2` redefines the variable, but don't add any more overrides.

**Docs:**
- v1: https://v1.design.alberta.ca
- v2: https://design.alberta.ca (machine-readable: [llms.txt](https://design.alberta.ca/llms.txt), `/components/{slug}.md`; see "Design system sources" above)

**Known-broken `goab-badge` values on this repo's v1 tokens.** The V2 `GoabBadgeType` union (`information`, `success`, `important`, `emergency`, `archived`, `default`, `sky`, `prairie`, `lilac`, `pasture`, `sunset`, `dawn`) is a TypeScript-only constraint — it doesn't mean the colour actually renders. Only `success`, `important`, and `emergency` have matching `--goa-badge-<type>-color-bg` tokens in the installed v1 stylesheet (grep confirms). `information` doesn't work either, even though a v1 token exists for it — the v1 name is `info`, not `information`, so the type-checked value produces a non-existent CSS variable. `default`, `archived`, and every extended-palette colour (`sky`/`prairie`/`lilac`/`pasture`/`sunset`/`dawn`) have **no v1 token at all** and render as an invisible/transparent pill — the badge silently has no background, easy to miss in a quick visual check. Likewise `emphasis="subtle"` has no matching `--goa-badge-<type>-subtle-*` tokens for *any* type in v1 — never use it here. For a neutral/no-color label, don't use `goab-badge` at all: render plain text or a small span styled with `--goa-color-greyscale-150` background + `--goa-color-text-secondary` (see `.operating-model-tag` in `search-service/*/*.component.scss` for the pattern). Re-verify this list after any `@abgov/design-tokens` bump.

**`goab-badge` `iconType` needs `[icon]="true"` too.** The docs call `icon` "deprecated, prefer `iconType`", but the installed Angular wrapper still gates rendering on the boolean: `[attr.icon]="icon ? 'true' : 'false'"`. Setting `iconType` alone renders the badge with no icon at all (`class="goa-badge-no-icon"` in its shadow DOM). Always pair them: `[icon]="true" iconType="shield-checkmark"`.

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
- Don't start a *new* prototype on DS 1.0 unless the user asks; DS 2.0 is the default. Don't silently convert an existing v1 prototype either; that's a deliberate migration, so update the table when it happens.
- Don't guess a component's props, events or slots from memory. Fetch its `/components/{slug}.md` page.
- Don't mix `goa-*` (raw v1) and `goab-*` (v2 wrapper) selectors *within the same component* — pick one DS per prototype.
- Don't build a v2 prototype without `host: { class: 'goa-ds-v2' }` on its top-level component — its `goab-*` components will render with v1 token values and look like DS 1.0.
- Don't widen `@abgov/design-tokens` past `^1.10.0` or load v2 tokens at `:root` — that package is the global v1 token set for all v1 prototypes. DS 2.0 tokens come from the `design-tokens-v2` alias, scoped to `.goa-ds-v2`.
- Don't hand-shim v2 token values inside a prototype — if a v2 component looks wrong, first check the prototype is inside `.goa-ds-v2`.
- Don't hand-build a component that already exists in `@abgov/angular-components`.
- Don't hard-code a design value that has a `--goa-*` token.
- Don't re-introduce a manual scroll/sizing fix for `goab-work-side-menu` — `goa-scroll-panel` handles it natively as of `@abgov/web-components@2.4.0`; see "Resolved gap" above.
- Don't assume a component without a `version` prop is safe to bump silently — its single implementation can change wholesale between releases even though the custom element name and props stay identical (this is what happened to `goa-work-side-menu`).
