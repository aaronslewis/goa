# `<goab-form-item>` / `GoabFormItem` — form field wrapper (Angular, V2)

Wrap **every** input.

```ts
import { GoabFormItem, GoabInput } from '@abgov/angular-components';
```

```html
<goab-form-item label="Your full name"
  helpText="We use your name to find your file if you've applied before.">
  <goab-input name="fullName" [value]="fullName()" (onChange)="onName($event)"></goab-input>
</goab-form-item>

<goab-form-item label="Middle name" requirement="optional">
  <goab-input name="middleName"></goab-input>
</goab-form-item>

<goab-form-item label="Date of birth" [error]="dobError()">
  <goab-input name="dob" type="date"></goab-input>
</goab-form-item>
```

## Inputs

| Input | Values | Notes |
|---|---|---|
| `label` | string | Sentence case. |
| `labelSize` | `regular` (default) · `large` | |
| `helpText` | string | One short sentence. |
| `error` | string | Specific: "Enter your date of birth", not "Required". Empty = valid. |
| `requirement` | `optional` · `required` | **Mark optional, not required.** |
| `maxWidth` | CSS length | |
| `type` | form-item type | For checkbox-list / radio-group spacing. |

With reactive forms, Goab inputs are ControlValueAccessors — `formControlName`
works inside the form item.
