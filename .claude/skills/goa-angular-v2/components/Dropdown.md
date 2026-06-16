# `<goab-dropdown>` + `<goab-dropdown-item>` — select (Angular, V2)

```ts
import { GoabDropdown, GoabDropdownItem, GoabFormItem } from '@abgov/angular-components';
import { GoabDropdownOnChangeDetail } from '@abgov/ui-components-common';
```

```html
<goab-form-item label="Reason for care">
  <goab-dropdown name="reason" placeholder="Select a reason" (onChange)="onReason($event)">
    <goab-dropdown-item value="work" label="Work"></goab-dropdown-item>
    <goab-dropdown-item value="school" label="School or training"></goab-dropdown-item>
    <goab-dropdown-item value="medical" label="Medical reasons"></goab-dropdown-item>
    <goab-dropdown-item value="other" label="Other"></goab-dropdown-item>
  </goab-dropdown>
</goab-form-item>

<!-- Long lists (>10): filterable -->
<goab-form-item label="Care provider">
  <goab-dropdown name="provider" filterable placeholder="Search providers…" (onChange)="onProvider($event)">
    @for (p of providers; track p.id) {
      <goab-dropdown-item [value]="p.id" [label]="p.name"></goab-dropdown-item>
    }
  </goab-dropdown>
</goab-form-item>
```

```ts
onReason(detail: GoabDropdownOnChangeDetail) {
  this.reason.set(detail.value);
}
```

## Inputs (`goab-dropdown`)

| Input | Notes |
|---|---|
| `name` | Unique identifier; echoed in the change detail. |
| `placeholder` | The prompt: "Select a reason". |
| `filterable` | boolean — search input for long lists. |
| `native` | boolean — native `<select>`; `autoComplete` applies in native mode. |
| `leadingIcon` | `GoabIconType` |
| `maxHeight` (default `276px`), `width`, `maxWidth`, `size` | |
| `ariaLabel` / `ariaLabelledBy` | |

Disabled/error states + value binding work via Angular forms
(ControlValueAccessor) or `[value]`-style bindings.

## Inputs (`goab-dropdown-item`)

`value` (committed value) · `label` (visible text, sentence case).

## Outputs

`(onChange)` — `GoabDropdownOnChangeDetail` (`{ name, value }`).
