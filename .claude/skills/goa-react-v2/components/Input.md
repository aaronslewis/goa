# `GoabInput` — text input (React, V2)

Always inside `GoabFormItem`. `onChange` receives a **detail object**
(`GoabInputOnChangeDetail` = `{ name, value }`) — not positional args, not a DOM
event.

```tsx
import { GoabInput, GoabInputNumber, GoabInputDate, GoabFormItem } from '@abgov/react-components';

<GoabFormItem label="Your full name">
  <GoabInput name="fullName" value={fullName} autoComplete="name"
    onChange={(detail) => setFullName(detail.value)} />
</GoabFormItem>

<GoabFormItem label="Search">
  <GoabInput type="search" name="q" value={q} leadingIcon="search"
    placeholder="Search the Help Centre"
    onChange={({ value }) => setQ(value)} />
</GoabFormItem>

<GoabFormItem label="Monthly household income (before tax)"
  helpText="Use the amount from line 15000 of your most recent tax return, divided by 12.">
  <GoabInputNumber name="income" value={income}
    leadingContent="$" trailingContent="per month"
    onChange={({ value }) => setIncome(value)} />  {/* value is a number */}
</GoabFormItem>
```

## Typed variants

`GoabInputText`, `GoabInputPassword`, `GoabInputDate`/`GoabInputDateTime`
(`GoabDate` values), `GoabInputTime`, `GoabInputEmail`, `GoabInputSearch`,
`GoabInputUrl`, `GoabInputTel`, `GoabInputNumber` (number values),
`GoabInputMonth`, `GoabInputFile`, `GoabInputRange`. Prefer them over
`GoabInput type="…"`.

## Props (from `@abgov/react-components@7.2`)

| Prop | Type | Notes |
|---|---|---|
| `name` | string | **Required.** Echoed in detail objects. |
| `value` | string (number/date in typed variants) | |
| `onChange` / `onFocus` / `onBlur` / `onKeyPress` | `(detail) => void` | Typed detail objects. |
| `autoComplete` | string | Set on every real field. |
| `placeholder` | string | Never a label substitute. |
| `leadingIcon` / `trailingIcon` | `GoabIconType` | `onTrailingIconClick` + `trailingIconAriaLabel` for interactive trailing icons. |
| `leadingContent` / `trailingContent` | ReactNode | Static affixes — `prefix`/`suffix` are **deprecated**. |
| `error`, `disabled`, `readonly`, `focused` | boolean | Error *message* goes on `GoabFormItem`. |
| `width`, `maxLength`, `min`, `max`, `step`, `debounce` | | |
| `textAlign` | `"left" \| "right"` | `right` for money columns. |
| `size` | `GoabInputSize` | |
| `ariaLabel`, `testId` | string | |
