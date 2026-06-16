# `GoAFormItem` — form field wrapper (React, V1)

Wraps any input with a label, optional flag, helper text, or error. **Use for
every field.**

```tsx
import { GoAFormItem, GoAInput } from '@abgov/react-components';

<GoAFormItem label="First name">
  <GoAInput name="firstName" value={firstName} onChange={(name, value) => setFirstName(value)} />
</GoAFormItem>

<GoAFormItem label="Middle name" requirement="optional">
  <GoAInput name="middleName" value={middleName} onChange={onMiddleName} />
</GoAFormItem>

<GoAFormItem
  label="Household income (last year)"
  helpText="Use the amount from line 15000 of your most recent tax return."
  error={incomeError}>
  <GoAInput name="income" value={income} onChange={onIncome} error={!!incomeError} />
</GoAFormItem>
```

## Props (from `@abgov/react-components@4.13`)

| Prop | Type | Notes |
|---|---|---|
| `label` | string | Sentence case. |
| `requirement` | `"optional" \| "required"` | **GoA convention: mark optional, not required.** |
| `helpText` | string | One short sentence — where to find the value or what format. |
| `error` | string | Error message; replaces help text, turns the field red. Pass `error={true}` to the inner input as well. |
| `children` | ReactNode | The input control. |
| `testId` | string | |

Error copy is specific: "Enter your date of birth", not "Required".
