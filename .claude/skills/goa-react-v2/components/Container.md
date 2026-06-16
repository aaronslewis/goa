# `GoabContainer` — content card (React, V2)

```tsx
import { GoabContainer, GoabButton, GoabBadge } from '@abgov/react-components';

<GoabContainer accent="thick" title="Estimated subsidy">
  <p>Based on what you told us, your family could receive about
  <strong>$1,540 per month</strong>.</p>
  <p>This isn't a guarantee of funding. Apply to confirm your amount.</p>
</GoabContainer>

<GoabContainer type="non-interactive" title="What you'll need">
  <ul>
    <li>Your most recent tax return</li>
    <li>Each child's full name and date of birth</li>
  </ul>
</GoabContainer>

// Rich title + actions
<GoabContainer accent="thin"
  title={<><h3>Application sent</h3> <GoabBadge type="success" content="Submitted" iconType="checkmark-circle" /></>}
  actions={<GoabButton type="tertiary" size="compact">Edit</GoabButton>}>
  <p>Your reference number is <strong>CCS-204-918</strong>.</p>
</GoabContainer>
```

## Props (from `@abgov/react-components@7.2`)

| Prop | Type | Notes |
|---|---|---|
| `type` | `GoabContainerType` (`interactive`, `non-interactive`, `info`, `error`, `success`, `important`) | Default `interactive`. |
| `accent` | `GoabContainerAccent` | Default `filled`; `thin`/`thick` = brand bar. |
| `padding` | `"relaxed" \| "compact"` | Default `relaxed`. |
| `width` | `"full" \| "content"` | Default `full`. |
| `maxWidth`, `minHeight`, `maxHeight` | string | |
| `title` | ReactNode | **`heading` is deprecated in 7.x — use `title`.** |
| `actions` | ReactNode | Right-aligned actions area. |
| `children` | ReactNode | Body. |
| `testId` | string | |

Don't nest containers more than one deep.
