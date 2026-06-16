# `GoAContainer` — content card (React, V1)

```tsx
import { GoAContainer, GoAButton, GoABadge } from '@abgov/react-components';

<GoAContainer accent="thick" heading="Estimated subsidy">
  <p>Based on what you told us, your family could receive about
  <strong>$1,540 per month</strong>.</p>
  <p>This isn't a guarantee of funding. Apply to confirm your amount.</p>
</GoAContainer>

<GoAContainer type="non-interactive" heading="What you'll need">
  <ul>
    <li>Your most recent tax return</li>
    <li>Each child's full name and date of birth</li>
  </ul>
</GoAContainer>

// Title area with a badge, actions area with a button
<GoAContainer accent="thin"
  title={<><h3>Application sent</h3> <GoABadge type="success" content="Submitted" icon /></>}
  actions={<GoAButton type="tertiary" size="compact">Edit</GoAButton>}>
  <p>Your reference number is <strong>CCS-204-918</strong>.</p>
</GoAContainer>
```

## Props (from `@abgov/react-components@4.13`)

| Prop | Type | Notes |
|---|---|---|
| `type` | `"interactive" \| "non-interactive" \| "info" \| "error" \| "success" \| "important"` | `interactive` = white/raised (default); `non-interactive` = grey; rest are status tints. |
| `accent` | `"thick" \| "thin" \| "filled"` | Brand bar (`thin` 8px / `thick` 16px) or filled heading band. |
| `padding` | `"relaxed" \| "compact"` | `relaxed` = 32px (default), `compact` = 16px. |
| `heading` | ReactNode | Simple heading. |
| `title` | ReactNode | Rich title area (heading + badge). |
| `actions` | ReactNode | Right-aligned actions area. |
| `children` | ReactNode | Body. |
| `testId` | string | |

Don't nest containers more than one deep — use whitespace and accents to
differentiate sections.
