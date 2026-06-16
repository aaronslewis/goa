# `<goab-button>` / `GoabButton` — button (Angular, V2)

```ts
import { GoabButton } from '@abgov/angular-components';
```

```html
<goab-button type="primary" (onClick)="apply()">Apply now</goab-button>
<goab-button type="secondary" leadingIcon="download" (onClick)="saveDraft()">Save draft</goab-button>
<goab-button type="start" (onClick)="start()">Start application</goab-button>
<goab-button type="tertiary" size="compact" (onClick)="cancel()">Cancel</goab-button>
<goab-button type="text" (onClick)="learnMore()">Learn more</goab-button>
<goab-button type="primary" variant="destructive" (onClick)="withdraw()">Withdraw application</goab-button>
```

## Inputs

| Input | Values | Notes |
|---|---|---|
| `type` | `primary` (default) · `submit` · `secondary` · `tertiary` · `start` · `text` | `start` = oversized CTA with built-in arrow; `submit` for native form semantics. |
| `size` | `normal` · `compact` | |
| `variant` | `normal` · `destructive` · `inverse` · `dark` | `destructive` for irreversible; `inverse` on dark surfaces; `dark` affects text buttons only. |
| `disabled` | boolean (`[disabled]="expr"`) | |
| `leadingIcon` / `trailingIcon` | `GoabIconType` (Ionicons base names) | camelCase — this is an Angular input, not an attribute. |
| `width` | CSS length | |
| `mt`/`mb`/`ml`/`mr` | spacing token | |

## Outputs

- `(onClick)` — typed Angular EventEmitter.

## Copy rules

Sentence case; name the action ("Apply now", "Save and continue"); never
"Submit" or "Click here"; one `primary` per screen.
