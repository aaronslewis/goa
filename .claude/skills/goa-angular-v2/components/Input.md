# `<goab-input>` / `GoabInput` — text input (Angular, V2)

Always inside `<goab-form-item>`. `(onChange)` emits a typed
`GoabInputOnChangeDetail` — `{ name: string, value: string }`.

```ts
import { GoabFormItem, GoabInput } from '@abgov/angular-components';
import { GoabInputOnChangeDetail } from '@abgov/ui-components-common';
```

```html
<goab-form-item label="Your full name">
  <goab-input name="fullName" autoComplete="name"
    [value]="fullName()" (onChange)="onName($event)">
  </goab-input>
</goab-form-item>

<goab-form-item label="Search">
  <goab-input type="search" name="q" leadingIcon="search"
    placeholder="Search the Help Centre" (onChange)="onSearch($event)">
  </goab-input>
</goab-form-item>

<goab-form-item label="Monthly household income (before tax)"
  helpText="Use the amount from line 15000 of your most recent tax return, divided by 12.">
  <goab-input name="income" type="number" leadingContent="$" trailingContent="per month"
    (onChange)="onIncome($event)">
  </goab-input>
</goab-form-item>
```

```ts
onName(detail: GoabInputOnChangeDetail) {
  this.fullName.set(detail.value);
}
```

`[(ngModel)]` and `formControlName` also work (ControlValueAccessor).

## Inputs

| Input | Notes |
|---|---|
| `type` | `text` (default), `email`, `number`, `password`, `search`, `tel`, `url`, `date`, `time`, … |
| `name` | Echoed in event details. |
| `value` | Bind with `[value]`. |
| `placeholder` | Never a label substitute. |
| `leadingIcon` / `trailingIcon` | `GoabIconType`; `trailingIconAriaLabel` when clickable. |
| `leadingContent` / `trailingContent` | Static affixes (`$`, `per month`) — V2 replaces the deprecated prefix/suffix. |
| `autoComplete` | Set on every real field (`name`, `email`, `tel`, `postal-code`, …). |
| `disabled`, `readonly`, `focused`, `error` | booleans — bind `[disabled]="expr"`. Error *message* goes on the form item. |
| `width`, `maxLength`, `min`, `max`, `step`, `debounce`, `textAlign`, `size` | |
| `ariaLabel` / `ariaLabelledBy` | When no visible label is possible. |

## Outputs

`(onChange)`, `(onFocus)`, `(onBlur)`, `(onKeyPress)`, `(onTrailingIconClick)` —
all typed detail objects.
