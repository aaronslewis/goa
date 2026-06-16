# `GoAInput` — text input (React, V1)

Always wrap in `GoAFormItem`. **`name`, `value`, and `onChange` are required.**
The `onChange` signature is `(name: string, value: string) => void` — not a DOM
event.

```tsx
import { GoAInput, GoAInputNumber, GoAInputDate, GoAFormItem } from '@abgov/react-components';

<GoAFormItem label="First name">
  <GoAInput name="firstName" value={firstName}
    onChange={(name, value) => setFirstName(value)} />
</GoAFormItem>

<GoAFormItem label="Search">
  <GoAInput type="search" name="q" value={q} onChange={(_, v) => setQ(v)}
    leadingIcon="search" placeholder="Search the Help Centre" />
</GoAFormItem>

<GoAFormItem label="Monthly household income" helpText="Before tax.">
  <GoAInputNumber name="income" value={income}
    onChange={(_, v) => setIncome(v)}  // v is a number
    leadingContent="$" trailingContent="per month" />
</GoAFormItem>

<GoAFormItem label="Date of birth">
  <GoAInputDate name="dob" value={dob} onChange={(_, v) => setDob(v)} />
</GoAFormItem>
```

## Typed variants

`GoAInputText`, `GoAInputPassword`, `GoAInputDate` (value/onChange use
`Date | string`), `GoAInputTime`, `GoAInputDateTime`, `GoAInputEmail`,
`GoAInputSearch`, `GoAInputUrl`, `GoAInputTel`, `GoAInputNumber` (value/onChange
use `number`), `GoAInputMonth`, `GoAInputFile`, `GoAInputRange`.
Prefer the typed variant over `GoAInput type="…"`.

## Props (from `@abgov/react-components@4.13`)

| Prop | Type | Notes |
|---|---|---|
| `name` | string | **Required.** Passed back as the first `onChange` arg. |
| `value` | string (number/date for typed variants) | **Required.** Controlled input. |
| `onChange` | `(name, value) => void` | **Required.** |
| `placeholder` | string | Never a label substitute. |
| `leadingIcon` / `trailingIcon` | `GoAIconType` | `onTrailingIconClick` makes the trailing icon a button. |
| `leadingContent` / `trailingContent` | ReactNode | Static affixes like `$` / `per month` (prefer over the deprecated `prefix`/`suffix` strings). |
| `error` | boolean | Pair with the `error` message on `GoAFormItem`. |
| `disabled`, `readonly`, `focused` | boolean | |
| `width` | string | e.g. `"100%"`. |
| `min` / `max` / `step`, `maxLength`, `debounce` | | |
| `ariaLabel` | string | Only when no visible label is possible. |
| `testId` | string | |
