# `GoabBadge` — status badge (React, V2)

```tsx
import { GoabBadge } from '@abgov/react-components';

<GoabBadge type="success" content="Eligible" iconType="checkmark-circle" />
<GoabBadge type="information" content="In review" />
<GoabBadge type="default" content="Beta" />
<GoabBadge type="success" content="Active" emphasis="subtle" />
```

## Props (from `@abgov/react-components@7.2`)

| Prop | Type | Notes |
|---|---|---|
| `type` | `"information" \| "success" \| "important" \| "emergency" \| "archived" \| "default" \| "sky" \| "prairie" \| "lilac" \| "pasture" \| "sunset" \| "dawn"` | **Required.** V2 dropped V1's `dark`/`midtone`/`light` — use `default` for neutral (e.g. "Beta"), `archived` for closed/ended items. The extended-palette colours are for categorical labels/data-viz. |
| `content` | string | One or two words, sentence case. |
| `iconType` | `GoabIconType` | Preferred; boolean `icon` is **deprecated**. |
| `size` | `GoabBadgeSize` | Default `medium`. |
| `emphasis` | `"subtle" \| "strong"` | Default `strong`; `subtle` for tables. |
| `ariaLabel` | string | Required when icon-only. |
| `testId` | string | |

Never rely on colour alone — set `content` or `ariaLabel`.
