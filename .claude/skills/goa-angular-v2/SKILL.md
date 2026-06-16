---
name: goa-angular-v2
description: Build Government of Alberta (GoA / Alberta.ca) prototypes and screens in an ANGULAR project on Design System V2 (the new standard, design.alberta.ca). Output uses `<goab-*>` Angular components from `@abgov/angular-components` and `--goa-*` tokens from `@abgov/design-tokens@2.x`. Use when the project targets DS 2.0. Siblings — DS V1 (legacy): goa-angular-v1; React: goa-react-v2 / goa-react-v1. Do NOT use in the sage-prototype repo (V1-frozen).
user-invocable: true
---

# Government of Alberta — Design System v2 (Angular)

You are an expert GoA designer-developer. Output is **Angular** on **DS 2.0** —
the new standard documented at <https://design.alberta.ca/>.

## Pick the right GoA skill

| | DS V1 (legacy) | DS V2 (new standard) |
|---|---|---|
| **Angular** | `goa-angular-v1` | **this skill** |
| **React** | `goa-react-v1` | `goa-react-v2` |

Check `package.json`: `@abgov/design-tokens@2.x` (or a stated DS 2.0 target) →
this skill. **The sage-prototype repo is V1-frozen — never use this skill there.**

## V2 vs V1 — what changes in Angular

V1 uses raw `<goa-*>` custom elements (`CUSTOM_ELEMENTS_SCHEMA`, lowercase
attributes, `(_click)` CustomEvents). **V2 uses real Angular components**:

```ts
import { GoabButton, GoabFormItem, GoabInput, GoabCallout } from '@abgov/angular-components';

@Component({
  standalone: true,
  imports: [GoabButton, GoabFormItem, GoabInput, GoabCallout],  // no CUSTOM_ELEMENTS_SCHEMA needed
  templateUrl: './my-screen.component.html',
})
```

```html
<goab-button type="primary" [disabled]="!valid()" (onClick)="apply()">Apply now</goab-button>
```

- **Selectors:** `<goab-*>` — never `<goa-*>` in templates.
- **Inputs are camelCase:** `leadingIcon`, `maxWidth`, `helpText`.
- **Outputs are typed Angular events:** `(onClick)`, `(onChange)` — `$event` is a
  typed detail object (e.g. `GoabInputOnChangeDetail` = `{ name, value }`).
- **Angular forms work natively:** Goab inputs implement ControlValueAccessor —
  `[(ngModel)]` and `formControlName` are supported.
- **Tokens:** `@abgov/design-tokens@2.x` (V2 dropped 16 v1 token names — see
  `token-changes.md`; also ships `dark-theme.css`).

## Installation

```bash
npm install @abgov/angular-components@^5 @abgov/web-components@^2 @abgov/design-tokens@^2
```

(The 5.x Angular package ships both DS versions; the `goab-*` components switch
the underlying web components to V2 rendering.)

## Hard rules (non-negotiable)

- **`<goab-*>` selectors only.** A template grep for `<goa-` must return nothing.
- **`--goa-*` tokens for every visual value** — verify each name exists in the V2
  set: grep `node_modules/@abgov/design-tokens/dist/tokens.css` (2.x) or this
  skill's `reference/tokens/goa-tokens-v2.css`.
- **Sentence case; plain language Grade 8 or below; no emoji** — see
  `content-guidelines.md`.
- **Never hand-build an existing component. Visible focus, WCAG 2.1 AA.**

## How to work

1. `README.md` — brand identity and voice.
2. `content-guidelines.md` — before drafting any UI copy.
3. `foundations.md` + `token-changes.md` — tokens and V2 deltas.
4. `components/*.md` — exact inputs/outputs per component.
5. `workflow.md` — scaffold-draft-preview-verify loop.
6. `ui-kits/patterns.md` — page anatomies (info page, form wizard).

If invoked without a target, ask what to build, the audience, and where it lives.
