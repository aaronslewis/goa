# Workflow — scaffold, draft, preview, verify (Angular, DS V2)

## 0. Confirm you're in the right place

- This skill is for Angular projects targeting **DS 2.0**. The sage-prototype
  repo is **V1-frozen** — if you're there, stop and use `goa-angular-v1`.
- Check `package.json` for `@abgov/angular-components@^5`,
  `@abgov/web-components@^2`, `@abgov/design-tokens@^2`. Install what's missing:
  ```bash
  npm install @abgov/angular-components@^5 @abgov/web-components@^2 @abgov/design-tokens@^2
  ```
- Ensure the app loads tokens + web components once (e.g. `styles.scss` imports
  `@abgov/design-tokens/dist/tokens.css`; `main.ts` imports
  `@abgov/web-components`).

## 1. Clarify scope, then draft copy first

Same as every GoA skill: audience (citizen → Grade 6–8; staff → Grade 8), then
write every visible string as plain text and check it against
[`content-guidelines.md`](./content-guidelines.md) before any markup.

## 2. Scaffold a standalone component

```ts
import { Component, signal } from '@angular/core';
import { GoabButton, GoabFormItem, GoabInput, GoabCallout, GoabContainer } from '@abgov/angular-components';

@Component({
  standalone: true,
  selector: 'eligibility-check',
  imports: [GoabButton, GoabFormItem, GoabInput, GoabCallout, GoabContainer],
  templateUrl: './eligibility-check.component.html',
  styleUrl: './eligibility-check.component.scss',
})
export class EligibilityCheckComponent {}
```

No `CUSTOM_ELEMENTS_SCHEMA` — `Goab*` are real Angular components. Import every
component the template uses.

## 3. Build the template with `<goab-*>`

camelCase inputs, typed outputs:

```html
<goab-form-item label="Monthly household income (before tax)"
  helpText="Use the amount from line 15000 of your most recent tax return, divided by 12.">
  <goab-input name="income" type="number" [value]="income()" (onChange)="onIncome($event)">
  </goab-input>
</goab-form-item>

<goab-button type="primary" [disabled]="income() === null" (onClick)="check()">
  Check eligibility
</goab-button>
```

`$event` on `(onChange)` is the typed detail (e.g. `GoabInputOnChangeDetail`
= `{ name, value }`). Reactive forms / `ngModel` also work — Goab inputs
implement ControlValueAccessor.

## 4. Style with `--goa-*` tokens (V2 set)

Grep every token name against `node_modules/@abgov/design-tokens/dist/tokens.css`
(2.x) before use. Mind the dropped groups in
[`token-changes.md`](./token-changes.md).

## 5. Register the route, then preview

Add to the app's routes with a `title` matching the page heading. Start the dev
server (`preview_start` if available, else `npm start`), navigate, screenshot,
and check console for errors.

## 6. Verify

1. **No V1 selectors** — must be empty (note: `<goa-` does not match `<goab-`):
   ```bash
   grep -rE '<goa-' src/app/<feature>/
   ```
2. **No hard-coded colours:**
   ```bash
   grep -E '#[0-9a-f]{3,6}|rgb\(' src/app/<feature>/<feature>.component.scss
   ```
3. **Copy re-read** against `content-guidelines.md`.
4. **Visual:** action-blue primary button, visible 2px focus outline, correct
   status colours on callouts, no layout shift on focus.
