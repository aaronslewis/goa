# `GoabCallout` — callout (React, V2)

```tsx
import { GoabCallout } from '@abgov/react-components';

<GoabCallout type="information" heading="How we calculate the subsidy">
  We use your household income and the number of children in licensed care to
  estimate your monthly amount. This isn't a guarantee of funding.
</GoabCallout>

<GoabCallout type="success" heading="Application sent">
  Your reference number is <strong>CCS-204-918</strong>.
</GoabCallout>

<GoabCallout type="emergency" heading="We couldn't load your application" ariaLive="assertive">
  Try again in a few minutes. If it keeps happening, call 310-0000 (toll free).
</GoabCallout>
```

## Props (from `@abgov/react-components@7.2`)

| Prop | Type | Notes |
|---|---|---|
| `type` | `GoabCalloutType` | Default `information`. |
| `heading` | string | Descriptive, never just "Information". |
| `size` | `"large" \| "medium"` | Default `large`; `medium` for compact areas. |
| `emphasis` | `"high" \| "medium" \| "low"` | Default `medium`. `high` = full background. |
| `iconTheme` | `"outline" \| "filled"` | Default `outline`. |
| `maxWidth` | string | |
| `ariaLive` | `"off" \| "polite" \| "assertive"` | Default `off`; `assertive` for post-action errors. |
| `children` | ReactNode | Plain-language body. |
| `testId` | string | |
