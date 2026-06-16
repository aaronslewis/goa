# `<goab-checkbox>` / `GoabCheckbox` — checkbox (Angular, V2)

```ts
import { GoabCheckbox } from '@abgov/angular-components';
import { GoabCheckboxOnChangeDetail } from '@abgov/ui-components-common';
```

```html
<goab-checkbox name="confirmTrue"
  text="I confirm the information I've given is true and complete."
  [checked]="confirmed()" (onChange)="onConfirm($event)">
</goab-checkbox>

<goab-checkbox name="updates"
  text="Email me when my application status changes."
  description="We'll only email about this application.">
</goab-checkbox>
```

```ts
onConfirm(detail: GoabCheckboxOnChangeDetail) {
  this.confirmed.set(detail.checked);
}
```

## Inputs

| Input | Notes |
|---|---|
| `name` | Required, unique. |
| `checked` | boolean — `[checked]="expr"`. |
| `indeterminate` | boolean — "select all" partial state. |
| `text` | The label — a full statement of what checking means. |
| `description` | Secondary line below the label. |
| `reveal` | Content revealed when checked (+ `revealAriaLabel`). |
| `value` | Submitted value. |
| `maxWidth`, `size` | |
| `ariaLabel` | |

`[(ngModel)]` / `formControlName` supported.

## Outputs

`(onChange)` — `GoabCheckboxOnChangeDetail` (`{ name, checked, value }`).

## Confirmation-gate pattern

```html
<goab-checkbox name="confirm" text="I confirm the information I've given is true and complete."
  [checked]="confirmed()" (onChange)="onConfirm($event)"></goab-checkbox>
<goab-button type="primary" [disabled]="!confirmed()" (onClick)="submit()">
  Send application
</goab-button>
```
