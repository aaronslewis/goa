# `GoabCheckbox` — checkbox (React, V2)

`onChange` receives `GoabCheckboxOnChangeDetail` (`{ name, checked, value }`).

```tsx
import { GoabCheckbox } from '@abgov/react-components';

<GoabCheckbox name="confirmTrue" checked={confirmed}
  text="I confirm the information I've given is true and complete."
  onChange={(detail) => setConfirmed(detail.checked)} />

<GoabCheckbox name="updates" checked={updates}
  text="Email me when my application status changes."
  description="We'll only email about this application."
  onChange={({ checked }) => setUpdates(checked)} />

// Reveal content when checked
<GoabCheckbox name="hasProvider" checked={hasProvider}
  text="I already have a care provider"
  reveal={<GoabFormItem label="Provider name">…</GoabFormItem>}
  revealAriaLabel="Provider details"
  onChange={({ checked }) => setHasProvider(checked)} />
```

## Props (from `@abgov/react-components@7.2`)

| Prop | Type | Notes |
|---|---|---|
| `name` | string | **Required.** |
| `checked` | boolean | Controlled. |
| `indeterminate` | boolean | "Select all" partial state. |
| `onChange` | `(detail) => void` | |
| `text` | string | Full statement of what checking means. |
| `description` | string \| ReactNode | Secondary line (new in V2). |
| `reveal` | ReactNode | Content shown when checked; pair with `revealAriaLabel`. |
| `value` | string \| number \| boolean | |
| `error`, `disabled` | boolean | |
| `maxWidth` | string | |
| `size` | `GoabCheckboxSize` | `compact` for dense layouts. |
| `ariaLabel`, `testId` | string | |
| `children` | ReactNode | Rich label alternative to `text`. |

## Confirmation-gate pattern

```tsx
<GoabCheckbox name="confirm" checked={confirmed}
  text="I confirm the information I've given is true and complete."
  onChange={({ checked }) => setConfirmed(checked)} />
<GoabButton type="primary" disabled={!confirmed} onClick={submit}>
  Send application
</GoabButton>
```
