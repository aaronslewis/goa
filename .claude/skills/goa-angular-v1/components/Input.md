# `<goa-input>` — Government of Alberta text input

Always wrap in `<goa-form-item>` for the label, help text, and error wiring.

## Angular template

```html
<goa-form-item label="First name">
  <goa-input
    name="firstName"
    [value]="firstName()"
    (_change)="firstName.set($event.detail.value)">
  </goa-input>
</goa-form-item>

<goa-form-item label="Search">
  <goa-input
    type="search"
    placeholder="Search the Help Centre"
    leadingicon="search-outline">
  </goa-input>
</goa-form-item>

<goa-form-item label="Monthly household income">
  <goa-input type="number">
    <span slot="leadingContent">$</span>
    <span slot="trailingContent">per month</span>
  </goa-input>
</goa-form-item>

<goa-form-item label="Email" helptext="We'll only use this to send your reference number.">
  <goa-input type="email" autocomplete="email"></goa-input>
</goa-form-item>

<goa-form-item label="Date of birth">
  <goa-input type="date"></goa-input>
</goa-form-item>
```

## Attributes

| Attribute | Values | Notes |
|---|---|---|
| `type` | `text` (default), `email`, `number`, `password`, `search`, `tel`, `url`, `date`, `time` | Native HTML input type. |
| `name` | string | Form field name. |
| `value` | string | Current value (Angular: bind with `[value]`). |
| `placeholder` | string | Use sparingly — never as a label substitute. |
| `leadingicon` | Ionicons name | e.g. `search-outline`, `mail-outline`. |
| `trailingicon` | Ionicons name | e.g. `information-circle-outline`. |
| ~~`prefix`~~ / ~~`suffix`~~ | string | **Deprecated.** Use the `leadingContent` / `trailingContent` slots instead (see example above). |
| `disabled` | boolean | Greys out and blocks input. |
| `readonly` | boolean | Shows the value but blocks editing. |
| `error` | boolean | Red border. **Use via `<goa-form-item error="…">` for the message.** |
| `size` | `normal`, `compact` | `compact` for tight tables/inline. |
| `width` | CSS length | Cap the input width. |
| `min`, `max`, `step` | numbers | For numeric inputs. |
| `autocomplete` | autocomplete tokens | `email`, `tel`, `postal-code`, `bday`, etc. Always set on real fields. |
| `arialabel` | string | When no visible label is possible. |

## Events

- `(_change)` — fires on commit (blur or enter). `$event.detail.value` is the
  new string.
- `(_focus)`, `(_blur)`, `(_keypress)` — when needed.

## Copy rules

- **Always wrap in `<goa-form-item>`** for the label.
- **Placeholder is never the label.** It can hint at format ("e.g. 780-555-0100").
- **`autocomplete` on every real field** — speeds up users and matches browser/OS
  autofill expectations.
