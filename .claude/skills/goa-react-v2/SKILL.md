---
name: goa-react-v2
description: Build Government of Alberta (GoA / Alberta.ca) prototypes and screens in a REACT project on Design System V2 (the new standard, design.alberta.ca). Output uses `GoabButton`-style components from `@abgov/react-components@7.x` and `--goa-*` tokens from `@abgov/design-tokens@2.x`. Use when the project targets DS 2.0 in React. Siblings — DS V1 (legacy): goa-react-v1; Angular: goa-angular-v2 / goa-angular-v1.
user-invocable: true
---

# Government of Alberta — Design System v2 (React)

You are an expert GoA designer-developer. Output is **React** on **DS 2.0** —
the new standard documented at <https://design.alberta.ca/>.

## Pick the right GoA skill

| | DS V1 (legacy) | DS V2 (new standard) |
|---|---|---|
| **Angular** | `goa-angular-v1` | `goa-angular-v2` |
| **React** | `goa-react-v1` | **this skill** |

Check `package.json`: `@abgov/react-components@7.x` (or 6.x) + tokens `2.x` →
this skill. If react-components is `4.x`, use `goa-react-v1`.

## Installation

```bash
npm install @abgov/react-components@^7 @abgov/web-components@^2 @abgov/design-tokens@^2
```

Then once, in the app entry point (e.g. `main.tsx`):

```tsx
import '@abgov/web-components';
import '@abgov/design-tokens/dist/tokens.css';
```

## V2 vs V1 — what changes in React

- **Component names:** `Goab*` (`GoabButton`, `GoabInput`) — never the V1 `GoA*`
  (capital A) names.
- **Callback signatures:** detail objects, not positional args —
  `onChange={(detail) => setName(detail.value)}` where detail is
  `{ name, value }` (V1 was `onChange(name, value)`).
- **New capabilities:** `text` button type, `inverse` variant, checkbox
  `description`/`reveal`, callout `emphasis`, container `width="content"`,
  dark-theme tokens.
- **Tokens:** `@abgov/design-tokens@2.x` — 16 V1 names dropped; see
  `token-changes.md`.

## Hard rules (non-negotiable)

- **`Goab*` components only.** A case-sensitive grep for `GoA` (capital A) in the
  feature's files must return nothing.
- **`--goa-*` tokens for every visual value** — verify against the 2.x set
  (`reference/tokens/goa-tokens-v2.css` or the installed package).
- **Sentence case; plain language Grade 8 or below; no emoji** — see
  `content-guidelines.md`.
- **Never hand-build an existing component. Visible focus, WCAG 2.1 AA.**

## How to work

1. `README.md` — brand identity and voice.
2. `content-guidelines.md` — before drafting any UI copy.
3. `foundations.md` + `token-changes.md` — V2 tokens and deltas.
4. `components/*.md` — exact props per component (typed from
   `@abgov/react-components@7.2.1`).
5. `workflow.md` — scaffold-draft-verify loop.
6. `ui-kits/patterns.md` — page anatomies (info page, form wizard).

If invoked without a target, ask what to build, the audience, and where it lives.
