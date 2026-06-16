# `GoACheckbox` — checkbox (React, V1)

**`name` and `checked` are required.** `onChange` signature is
`(name: string, checked: boolean, value: string) => void`.

```tsx
import { GoACheckbox } from '@abgov/react-components';

<GoACheckbox name="confirmTrue" checked={confirmed}
  text="I confirm the information I've given is true and complete."
  onChange={(_, checked) => setConfirmed(checked)} />

<GoACheckbox name="updates" checked={updates}
  text="Email me when my application status changes."
  onChange={(_, c) => setUpdates(c)} />
```

## Props (from `@abgov/react-components@4.13`)

| Prop | Type | Notes |
|---|---|---|
| `name` | string | **Required.** |
| `checked` | boolean | **Required.** Controlled. |
| `onChange` | `(name, checked, value) => void` | |
| `text` | string | The label — a full statement of what checking means. |
| `value` | string \| number \| boolean | Submitted value. |
| `error`, `disabled` | boolean | |
| `children` | ReactNode | Rich label content (links etc.) — alternative to `text`. |
| `ariaLabel`, `testId` | string | |
| `mt`/`mb`/`ml`/`mr` | spacing token | |

Note: 4.x has **no `description` prop** — put secondary copy in `children` or
helper text on the surrounding `GoAFormItem`.

## Confirmation-gate pattern

```tsx
<GoACheckbox name="confirm" checked={confirmed}
  text="I confirm the information I've given is true and complete."
  onChange={(_, c) => setConfirmed(c)} />
<GoAButton type="primary" disabled={!confirmed} onClick={submit}>
  Send application
</GoAButton>
```
