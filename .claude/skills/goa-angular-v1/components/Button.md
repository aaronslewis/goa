# `<goa-button>` — Government of Alberta button

Use for every clickable action. Pick visual emphasis with `type`.

## Angular template

```html
<goa-button type="primary" (_click)="apply()">Apply now</goa-button>

<goa-button type="secondary" leadingicon="download-outline">Save draft</goa-button>

<goa-button type="start">Start application</goa-button>

<goa-button type="tertiary" size="compact" (_click)="cancel()">Cancel</goa-button>

<goa-button type="text" (_click)="learnMore()">Learn more</goa-button>

<goa-button type="primary" variant="destructive" (_click)="withdraw()">
  Withdraw application
</goa-button>

<!-- Reverse for dark surfaces (e.g. brand-dark CTA banner) -->
<goa-button type="primary" variant="inverse">Get started</goa-button>
```

## Attributes

| Attribute | Values | Notes |
|---|---|---|
| `type` | `primary` (default), `secondary`, `tertiary`, `start`, `text` | `primary` = blue fill. `start` is the oversized CTA with built-in arrow. `text` is link-style. |
| `size` | `normal` (56px), `compact` (40px) | `compact` for inline / space-constrained actions. |
| `variant` | `normal`, `destructive`, `inverse` | `destructive` (red) for delete/withdraw. `inverse` for dark backgrounds. |
| `disabled` | boolean | Dims to 50% and blocks interaction. |
| `leadingicon` | Ionicons name | e.g. `add-outline`, `arrow-back-outline`. |
| `trailingicon` | Ionicons name | e.g. `arrow-forward-outline`, `open-outline`. |
| `width` | CSS length | e.g. `100%`, `240px`. |
| `mt`/`mb`/`ml`/`mr` | spacing token (`none`, `xs`, `s`, `m`, `l`, `xl`…) | Margins via tokens. |

## Events

- `(_click)` — fired on click. Use Angular's parenthesis-bound output binding with leading underscore (Svelte web component convention).

## Copy rules

- **Sentence case.** "Apply now", not "Apply Now".
- **Name the action.** "Save and continue", never "Submit".
- **No "Click here".** The button label IS the action.

## When to use which type

- **`primary`** — one per screen, the main CTA. "Apply now", "Save and continue".
- **`secondary`** — alternate action of equal weight that isn't the main path. "Save draft", "Add another child".
- **`tertiary`** — low-emphasis action, often paired with primary. "Cancel".
- **`start`** — landing-page CTA that begins a long flow. Always carries the arrow.
- **`text`** — inline link-style action. "Learn more", "Edit".
