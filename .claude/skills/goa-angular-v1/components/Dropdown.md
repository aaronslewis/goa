# `<goa-dropdown>` — Government of Alberta select / dropdown

Wrap in `<goa-form-item>` for the label. Options are child `<goa-dropdown-item>`
elements.

## Angular template

```html
<goa-form-item label="Reason for care">
  <goa-dropdown
    name="reason"
    placeholder="Select a reason"
    [value]="reason()"
    (_change)="reason.set($event.detail.value)">
    <goa-dropdown-item value="work" label="Work"></goa-dropdown-item>
    <goa-dropdown-item value="school" label="School or training"></goa-dropdown-item>
    <goa-dropdown-item value="medical" label="Medical reasons"></goa-dropdown-item>
    <goa-dropdown-item value="other" label="Other"></goa-dropdown-item>
  </goa-dropdown>
</goa-form-item>

<!-- Filterable, for long lists -->
<goa-form-item label="Care provider">
  <goa-dropdown name="provider" filterable="true" placeholder="Search providers…">
    @for (p of providers; track p.id) {
      <goa-dropdown-item [attr.value]="p.id" [attr.label]="p.name"></goa-dropdown-item>
    }
  </goa-dropdown>
</goa-form-item>

<!-- Multi-select -->
<goa-form-item label="Languages spoken at home">
  <goa-dropdown name="languages" multiselect="true" placeholder="Select languages">
    <goa-dropdown-item value="en" label="English"></goa-dropdown-item>
    <goa-dropdown-item value="fr" label="French"></goa-dropdown-item>
    <goa-dropdown-item value="other" label="Other"></goa-dropdown-item>
  </goa-dropdown>
</goa-form-item>
```

## Attributes (`goa-dropdown`)

| Attribute | Values | Notes |
|---|---|---|
| `name` | string | Form field name. |
| `value` | string | Selected value (or comma-separated for multiselect). |
| `placeholder` | string | "Select a reason". Sentence case. |
| `filterable` | boolean | Adds a search input — use for >10 options. |
| `multiselect` | boolean | Allows multiple selections. |
| `native` | boolean | Falls back to a native `<select>` (rare; for performance). |
| `disabled` | boolean | |
| `error` | boolean | Use via `<goa-form-item error="…">` for the message. |
| `leadingicon` | Ionicons name | |
| `width`, `maxwidth`, `maxheight` | CSS length | |
| `size` | `normal`, `compact` | |
| `arialabel` | string | When no visible label is possible. |
| `mt`/`mb`/`ml`/`mr` | spacing tokens | |

## Attributes (`goa-dropdown-item`)

| Attribute | Notes |
|---|---|
| `value` | The value committed when selected. |
| `label` | The visible text. Sentence case. |

## Events

- `(_change)` — `$event.detail.value` is the new value (or array for multiselect).

## Copy rules

- **Placeholder is the prompt.** "Select a reason", "Choose your province".
- **Option labels are sentence case.** "Work", "School or training" — not "WORK".
- **Order options logically.** Alphabetical for known lists; most-common-first
  for short, ranked lists.
- **Long lists (>10) → set `filterable="true"`.**
