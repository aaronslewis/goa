# `<goab-badge>` / `GoabBadge` — status badge (Angular, V2)

```ts
import { GoabBadge } from '@abgov/angular-components';
```

```html
<goab-badge type="success" content="Eligible" iconType="checkmark-circle"></goab-badge>
<goab-badge type="information" content="In review"></goab-badge>
<goab-badge type="important" content="Action required"></goab-badge>
<goab-badge type="default" content="Beta"></goab-badge>
<goab-badge type="success" content="Active" emphasis="subtle"></goab-badge>
```

## Inputs

| Input | Values | Notes |
|---|---|---|
| `type` | `information` · `success` · `important` · `emergency` · `archived` · `default` · `sky` · `prairie` · `lilac` · `pasture` · `sunset` · `dawn` | Required. V2 dropped V1's `dark`/`midtone`/`light` — `default` is the neutral (e.g. "Beta"), `archived` for closed/ended items; extended-palette colours for categorical labels. |
| `content` | string | One or two words, sentence case. |
| `iconType` | `GoabIconType` | Preferred over the deprecated boolean `icon`. |
| `size` | `medium` (default) · others per docs | |
| `emphasis` | `strong` (default) · `subtle` | `subtle` for tables. |
| `ariaLabel` | string | Required when icon-only. |

Never rely on colour alone — set `content` or `ariaLabel`.
