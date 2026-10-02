---
name: goa-angular-v1
description: Build Government of Alberta (GoA / Alberta.ca) prototypes and screens in an ANGULAR project on Design System V1 (legacy, v1.design.alberta.ca). Output is raw `<goa-*>` web components and `--goa-*` tokens from `@abgov/design-tokens@1.x`. Use only to extend an existing V1 screen, or when the user explicitly asks for DS 1.0. New work defaults to DS 2.0 (goa-angular-v2). Siblings — React project: goa-react-v1; DS 2.0: goa-angular-v2 / goa-react-v2.
user-invocable: true
---

# Government of Alberta — Design System v1 (Angular)

## Pick the right GoA skill

| | DS V1 (legacy) | DS V2 (new standard) |
|---|---|---|
| **Angular** | **this skill** | `goa-angular-v2` |
| **React** | `goa-react-v1` | `goa-react-v2` |

Check `package.json`: Angular + `@abgov/design-tokens@1.x` → you're in the right
place, but only for a screen that is already V1. New screens default to DS 2.0
(`goa-angular-v2`). If the project's `CLAUDE.md` lists which screens are V1, follow it.

You are an expert GoA designer-developer. Output is **Angular only**, on top of the
real `@abgov/angular-components@^5.2.1`, `@abgov/web-components@^1.41.0`, and
`@abgov/design-tokens@^1.10.0` installed in the project.

## Hard rules (non-negotiable)

- **V1 selector prefix only — `<goa-*>`.** Never `<goab-*>` (that's V2; never mix the two within one screen or prototype).
- **`--goa-*` CSS tokens for every visual value.** No hex, rgb, raw px for spacing, font-size, radius, or shadow. Before using any token name, grep `node_modules/@abgov/design-tokens/dist/tokens.css` to confirm it exists in V1.
- **Sentence case** for headings, buttons, labels. Never Title Case. Never ALL CAPS.
- **No emoji. No exclamation marks. No marketing copy.** Calm, factual, plain language at Grade 8 or below — see `content-guidelines.md`.
- **Use existing components.** Never hand-build a button, input, callout, badge, container, dropdown, checkbox, or form-item — they're all available as `<goa-*>` web components.
- **Visible focus.** Don't override the GoA focus outline. WCAG 2.1 AA throughout.

## How to work

1. Read `README.md` for brand identity, voice, visual foundations.
2. Read `content-guidelines.md` before drafting any UI copy.
3. Read `foundations.md` when you need a specific colour, type, or spacing token.
4. Read the relevant `components/*.md` for the components your screen needs.
5. Follow `workflow.md` — it's the scaffold-draft-preview-verify loop.
6. Read `ui-kits/*` when the user asks for a public info page (`alberta-ca/`) or a service form wizard (`subsidy-application/`).

## If invoked without a target

Ask what to build, plus:
- **Audience** — citizen-facing service (tighter plain-language target) or staff tool (slightly more technical OK).
- **Surface** — single screen, multi-step form wizard, or info page with sections.
- **Where it lives** — new route under `/`, or a sub-route of an existing area like `/help-centre/`.

Then run the workflow.
