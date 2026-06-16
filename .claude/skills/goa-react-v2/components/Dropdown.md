# `GoabDropdown` + `GoabDropdownItem` — select (React, V2)

`onChange` receives `GoabDropdownOnChangeDetail` (`{ name, value }`).

```tsx
import { GoabDropdown, GoabDropdownItem, GoabFormItem } from '@abgov/react-components';

<GoabFormItem label="Reason for care">
  <GoabDropdown name="reason" value={reason} placeholder="Select a reason"
    onChange={(detail) => setReason(detail.value as string)}>
    <GoabDropdownItem value="work" label="Work" />
    <GoabDropdownItem value="school" label="School or training" />
    <GoabDropdownItem value="medical" label="Medical reasons" />
    <GoabDropdownItem value="other" label="Other" />
  </GoabDropdown>
</GoabFormItem>

// Long lists (>10): filterable
<GoabFormItem label="Care provider">
  <GoabDropdown name="provider" value={provider} filterable
    placeholder="Search providers…" onChange={onProvider}>
    {providers.map(p => <GoabDropdownItem key={p.id} value={p.id} label={p.name} />)}
  </GoabDropdown>
</GoabFormItem>
```

## Props (from `@abgov/react-components@7.2`)

| Prop | Type | Notes |
|---|---|---|
| `name` | string | Unique; echoed in the detail. |
| `value` | string \| string[] | |
| `onChange` | `(detail: GoabDropdownOnChangeDetail) => void` | |
| `placeholder` | string | The prompt. Non-native only. |
| `filterable` | boolean | Search input for long lists. |
| `native` | boolean | Native `<select>`; pair with `autoComplete`. |
| `leadingIcon` | `GoabIconType` | |
| `maxHeight` | string | Default `276px`. |
| `width`, `maxWidth` | string | |
| `size` | `GoabDropdownSize` | `compact` for dense layouts. |
| `disabled`, `error` | boolean | |
| `ariaLabel`, `ariaLabelledBy`, `id`, `testId` | string | |

Notes: `multiselect` is marked `@internal` in 7.x — don't rely on it;
`relative` is deprecated (no effect). `GoabDropdownItem`: `value` + `label`,
sentence case labels.
