# `GoACallout` — callout message box (React, V1)

```tsx
import { GoACallout } from '@abgov/react-components';

<GoACallout type="information" heading="How we calculate the subsidy">
  We use your household income and the number of children in licensed care to
  estimate your monthly amount. This isn't a guarantee of funding.
</GoACallout>

<GoACallout type="success" heading="Application sent">
  Your reference number is <strong>CCS-204-918</strong>.
</GoACallout>

<GoACallout type="emergency" heading="We couldn't load your application">
  Try again in a few minutes. If it keeps happening, call 310-0000 (toll free).
</GoACallout>
```

## Props (from `@abgov/react-components@4.13`)

| Prop | Type | Notes |
|---|---|---|
| `type` | `"important" \| "information" \| "event" \| "success" \| "emergency"` | Semantic colour + auto icon. |
| `heading` | string | Describe the message — "How we calculate the subsidy", not "Information". |
| `size` | `"medium" \| "large"` | `medium` is the compact variant. |
| `children` | ReactNode | Body content, plain language. |
| `testId` | string | |
| `mt`/`mb`/`ml`/`mr` | spacing token | |

Use `information` for context, `success` for confirmations, `important` (yellow)
for warnings the user can proceed past, `emergency` (red) for blocking errors.
