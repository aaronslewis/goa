---
name: goa-react-v1
description: Build Government of Alberta (GoA / Alberta.ca) prototypes and screens in a REACT project on Design System V1 (legacy, v1.design.alberta.ca). Output uses `GoAButton`-style components from `@abgov/react-components@4.x` and `--goa-*` tokens from `@abgov/design-tokens@1.x`. Triggers on "GoA prototype", "Alberta.ca screen", "Government of Alberta UI" in a React codebase. Siblings — Angular project: goa-angular-v1; new DS 2.0: goa-react-v2 / goa-angular-v2.
user-invocable: true
---

# Government of Alberta — Design System v1 (React)

You are an expert GoA designer-developer. Output is **React**, on top of the real
GoA packages.

## Pick the right GoA skill

| | DS V1 (legacy) | DS V2 (new standard) |
|---|---|---|
| **Angular** | `goa-angular-v1` | `goa-angular-v2` |
| **React** | **this skill** | `goa-react-v2` |

Check `package.json`: React + `@abgov/react-components@4.x` + `@abgov/design-tokens@1.x`
→ you're in the right place. If react-components is `7.x` or tokens are `2.x`, use
`goa-react-v2` instead.

## Installation (if the project doesn't have the packages yet)

```bash
npm install @abgov/react-components@^4.13 @abgov/web-components@^1 @abgov/design-tokens@^1.10
```

Then once, in the app entry point (e.g. `main.tsx`):

```tsx
import '@abgov/web-components';
import '@abgov/design-tokens/dist/tokens.css';
```

## Hard rules (non-negotiable)

- **V1 component names only — `GoA*`** (`GoAButton`, `GoACallout`, `GoAInput`).
  Never `Goab*` (that's V2 — `@abgov/react-components@7.x`).
- **`--goa-*` CSS tokens for every visual value.** No hex, rgb, raw px for spacing,
  font-size, radius, or shadow. Before using any token name, grep
  `node_modules/@abgov/design-tokens/dist/tokens.css` (or this skill's
  `reference/tokens/goa-tokens.css`) to confirm it exists in V1.
- **Sentence case** for headings, buttons, labels. Never Title Case or ALL CAPS.
- **No emoji. No exclamation marks. No marketing copy.** Plain language at Grade 8
  or below — see `content-guidelines.md`.
- **Use existing components.** Never hand-build a button, input, callout, badge,
  container, dropdown, checkbox, or form-item.
- **Visible focus, WCAG 2.1 AA** throughout.

## How to work

1. Read `README.md` for brand identity, voice, visual foundations.
2. Read `content-guidelines.md` before drafting any UI copy.
3. Read `foundations.md` for colour, type, and spacing tokens.
4. Read the relevant `components/*.md` for exact props (they're typed strictly —
   v4 has no `text` button type, for example).
5. Follow `workflow.md` — scaffold-draft-verify loop.
6. Read `ui-kits/*` for full-screen patterns (public info page, form wizard) —
   the kits include a `react-translation.md` mapping to real `GoA*` imports.

## If invoked without a target

Ask what to build, plus audience (citizen-facing → Grade 6–8 copy; staff tool →
Grade 8), surface (single screen, wizard, info page), and where it lives in their
app. Then run the workflow.
