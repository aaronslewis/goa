# `GoAButton` — Government of Alberta button (React, V1)

```tsx
import { GoAButton } from '@abgov/react-components';

<GoAButton type="primary" onClick={apply}>Apply now</GoAButton>
<GoAButton type="secondary" leadingIcon="download">Save draft</GoAButton>
<GoAButton type="start" onClick={start}>Start application</GoAButton>
<GoAButton type="tertiary" size="compact" onClick={cancel}>Cancel</GoAButton>
<GoAButton type="primary" variant="destructive" onClick={withdraw}>
  Withdraw application
</GoAButton>
```

## Props (from `@abgov/react-components@4.13`)

| Prop | Type | Notes |
|---|---|---|
| `type` | `"primary" \| "submit" \| "secondary" \| "tertiary" \| "start"` | **No `"text"` type in 4.x** — use a styled link for link-style actions. `start` is the oversized CTA with built-in arrow. |
| `size` | `"normal" \| "compact"` | `compact` (40px) for inline actions. |
| `variant` | `"normal" \| "destructive"` | **No `"inverse"` in 4.x.** `destructive` (red) for delete/withdraw. |
| `disabled` | boolean | Dims and blocks interaction. |
| `leadingIcon` / `trailingIcon` | `GoAIconType` | Ionicons base names (`"add"`, `"arrow-forward"`). |
| `onClick` | `() => void` | |
| `testId` | string | |
| `mt`/`mb`/`ml`/`mr` | spacing token | Margins. |

## Copy rules

- Sentence case: "Apply now", never "Apply Now".
- Name the action: "Save and continue", never "Submit" (the `submit` *type* is
  for form semantics — the label still names the action, e.g. "Send application").
- One `primary` per screen.
