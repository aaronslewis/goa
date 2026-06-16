# `GoabButton` — button (React, V2)

```tsx
import { GoabButton } from '@abgov/react-components';

<GoabButton type="primary" onClick={apply}>Apply now</GoabButton>
<GoabButton type="secondary" leadingIcon="download">Save draft</GoabButton>
<GoabButton type="start" onClick={start}>Start application</GoabButton>
<GoabButton type="tertiary" size="compact" onClick={cancel}>Cancel</GoabButton>
<GoabButton type="text" onClick={learnMore}>Learn more</GoabButton>
<GoabButton type="primary" variant="destructive" onClick={withdraw}>
  Withdraw application
</GoabButton>
```

## Props (from `@abgov/react-components@7.2`)

| Prop | Type | Notes |
|---|---|---|
| `type` | `"primary" \| "submit" \| "secondary" \| "tertiary" \| "start" \| "text"` | Default `primary`. `start` = oversized CTA with built-in arrow; `text` = text-only; `submit` for native form submission semantics. |
| `size` | `"normal" \| "compact"` | |
| `variant` | `"normal" \| "destructive" \| "inverse" \| "dark"` | `inverse` on dark backgrounds; `dark` affects text buttons only. |
| `disabled` | boolean | |
| `leadingIcon` / `trailingIcon` | `GoabIconType` | |
| `width` | string | e.g. `"100%"`. |
| `onClick` | `() => void` | |
| `testId` | string | |
| `mt`/`mb`/`ml`/`mr` | spacing token | |

Sentence case; name the action; never "Submit"/"Click here"; one primary per
screen.
