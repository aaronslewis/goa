# `GoADropdown` + `GoADropdownItem` — select (React, V1)

Wrap in `GoAFormItem`. **`onChange` is required**; signature is
`(name: string, values: string[] | string) => void`.

```tsx
import { GoADropdown, GoADropdownItem, GoAFormItem } from '@abgov/react-components';

<GoAFormItem label="Reason for care">
  <GoADropdown name="reason" value={reason} placeholder="Select a reason"
    onChange={(name, value) => setReason(value as string)}>
    <GoADropdownItem value="work" label="Work" />
    <GoADropdownItem value="school" label="School or training" />
    <GoADropdownItem value="medical" label="Medical reasons" />
    <GoADropdownItem value="other" label="Other" />
  </GoADropdown>
</GoAFormItem>

// Filterable, for long lists (>10 options)
<GoAFormItem label="Care provider">
  <GoADropdown name="provider" value={provider} filterable
    placeholder="Search providers…" onChange={onProvider}>
    {providers.map(p => <GoADropdownItem key={p.id} value={p.id} label={p.name} />)}
  </GoADropdown>
</GoAFormItem>
```

## Props (from `@abgov/react-components@4.13`)

`GoADropdown`:

| Prop | Type | Notes |
|---|---|---|
| `onChange` | `(name, values) => void` | **Required.** `values` is a string, or `string[]` when `multiselect`. |
| `name`, `value` | string / string\|string[] | |
| `placeholder` | string | The prompt: "Select a reason". |
| `filterable` | boolean | Adds a search input. |
| `multiselect` | boolean | |
| `native` | boolean | Falls back to native `<select>`. |
| `leadingIcon` | `GoAIconType` | |
| `maxHeight`, `width` | string | |
| `disabled`, `error` | boolean | |
| `ariaLabel`, `testId` | string | |

`GoADropdownItem`: `value` (required), `label`, `name`, `testId`. Labels are
sentence case; order alphabetically or most-common-first.
