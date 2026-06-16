# `<goab-callout>` / `GoabCallout` — callout (Angular, V2)

```ts
import { GoabCallout } from '@abgov/angular-components';
```

```html
<goab-callout type="information" heading="How we calculate the subsidy">
  We use your household income and the number of children in licensed care to
  estimate your monthly amount. This isn't a guarantee of funding.
</goab-callout>

<goab-callout type="success" heading="Application sent">
  Your reference number is <strong>CCS-204-918</strong>.
</goab-callout>

<goab-callout type="emergency" heading="We couldn't load your application" ariaLive="assertive">
  Try again in a few minutes. If it keeps happening, call 310-0000 (toll free).
</goab-callout>
```

## Inputs

| Input | Values | Notes |
|---|---|---|
| `type` | `information` (default) · `important` · `success` · `emergency` · `event` | Semantic colour + icon. |
| `heading` | string | Descriptive, not "Information". |
| `size` | `large` (default) · `medium` | `medium` = compact. |
| `emphasis` | `medium` (default) · `high` · `low` | Visual prominence. |
| `iconTheme` | `outline` (default) · `filled` | |
| `maxWidth` | CSS length | |
| `ariaLive` | `off` (default) · `polite` · `assertive` | `assertive` for errors that appear after an action. |
