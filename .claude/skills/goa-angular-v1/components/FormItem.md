# `<goa-form-item>` — Form field wrapper

Wraps any input control with a label, optional flag, helper text, or error message.
**Use it for every input**, including custom or native fields — it gives them the
GoA label treatment and a11y wiring.

## Angular template

```html
<goa-form-item label="First name">
  <goa-input name="firstName" [value]="firstName" (_change)="onFirstName($event)">
  </goa-input>
</goa-form-item>

<goa-form-item label="Middle name" requirement="optional">
  <goa-input name="middleName"></goa-input>
</goa-form-item>

<goa-form-item
  label="Household income (last year)"
  helptext="Use the amount from line 15000 of your most recent tax return.">
  <goa-input name="income" type="number" prefix="$" trailingicon="information-circle-outline">
  </goa-input>
</goa-form-item>

<goa-form-item
  label="Date of birth"
  [error]="dobError()"
  helptext="We use this to check eligibility for the subsidy.">
  <goa-input name="dob" type="date"></goa-input>
</goa-form-item>
```

## Attributes

| Attribute | Values | Notes |
|---|---|---|
| `label` | string | The field label. Sentence case. |
| `labelsize` | `regular` (default), `large` | `large` for section-leading fields. |
| `helptext` | string | Plain helper shown below the control. |
| `error` | string | Error message — replaces help text and turns the field state red. Empty/falsy = no error. |
| `requirement` | `required`, `optional` | Shows a flag next to the label. **GoA convention: mark optional, not required.** Most fields are required, so the flag only appears when it's truly optional. |
| `maxwidth` | CSS length | Cap the form item's width. |
| `mt`/`mb`/`ml`/`mr` | spacing tokens | Margins. |

## Copy rules

- **Label is sentence case.** "First name", not "First Name".
- **Helper text is one short sentence.** Tells the user where to find the value
  or what format to use.
- **Error message is specific.** "Enter your date of birth" (not "Required").
  "Enter a date in 2026 or earlier" (not "Invalid date").
- **Mark optional, not required.** Most fields are required by default — only
  set `requirement="optional"` for genuinely optional fields.

## Composition pattern

Always wrap the control:

```html
<!-- Correct -->
<goa-form-item label="Email">
  <goa-input type="email"></goa-input>
</goa-form-item>

<!-- Wrong — no label, no a11y -->
<goa-input type="email" placeholder="Email"></goa-input>
```
