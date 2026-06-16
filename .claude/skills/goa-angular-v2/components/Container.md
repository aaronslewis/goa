# `<goab-container>` / `GoabContainer` — content card (Angular, V2)

```ts
import { GoabContainer } from '@abgov/angular-components';
```

```html
<goab-container accent="thick" [title]="estimateTitle">
  <ng-template #estimateTitle>Estimated subsidy</ng-template>
  <p>Based on what you told us, your family could receive about
  <strong>$1,540 per month</strong>.</p>
  <p>This isn't a guarantee of funding. Apply to confirm your amount.</p>
</goab-container>

<goab-container type="non-interactive">
  <h3>What you'll need</h3>
  <ul>
    <li>Your most recent tax return</li>
    <li>Each child's full name and date of birth</li>
  </ul>
</goab-container>
```

> `title` and `actions` accept TemplateRefs for rich content (heading + badge,
> right-aligned buttons). For a simple heading, an `<h2>/<h3>` as the first body
> child also reads fine — check design.alberta.ca/components/container for the
> canonical patterns.

## Inputs

| Input | Values | Notes |
|---|---|---|
| `type` | `interactive` (default) · `non-interactive` · `info` · `error` · `success` · `important` | White/raised vs grey vs status tints. |
| `accent` | `filled` (default) · `thin` · `thick` | Brand bar or filled heading band. |
| `padding` | `relaxed` (default) · `compact` | |
| `width` | `full` (default) · `content` | |
| `maxWidth`, `minHeight`, `maxHeight` | CSS lengths | |
| `title` / `actions` | TemplateRef | Title and actions areas. |
| `mt`/`mb`/`ml`/`mr` | spacing tokens | |

Don't nest containers more than one deep.
