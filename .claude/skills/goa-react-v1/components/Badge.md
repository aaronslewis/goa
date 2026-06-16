# `GoABadge` — status badge (React, V1)

```tsx
import { GoABadge } from '@abgov/react-components';

<GoABadge type="success" content="Eligible" icon />
<GoABadge type="information" content="In review" />
<GoABadge type="important" content="Action required" icon />
<GoABadge type="midtone" content="Beta" />
```

## Props (from `@abgov/react-components@4.13`)

| Prop | Type | Notes |
|---|---|---|
| `type` | `"information" \| "success" \| "important" \| "emergency" \| "dark" \| "midtone" \| "light"` | **Required.** Status colour; `dark`/`midtone`/`light` are neutral variants. |
| `content` | string | The label. Sentence case, one or two words. |
| `icon` | boolean | Shows the type's status icon. |
| `ariaLabel` | string | Required if the badge is icon-only. |
| `testId` | string | |
| `mt`/`mb`/`ml`/`mr` | spacing token | |

Never rely on colour alone — always set `content` or `ariaLabel`.
`GoAInfoBadge` / `GoASuccessBadge` / etc. exist but are **deprecated** — use
`GoABadge` with `type`.
