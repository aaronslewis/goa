# `<goa-checkbox>` — Government of Alberta checkbox

Single checkbox with optional secondary description. For lists of checkboxes, use
`<goa-checkbox-list>` (not documented here yet — refer to the v1 docs).

## Angular template

```html
<goa-checkbox
  name="confirmTrue"
  text="I confirm the information I've given is true and complete."
  [checked]="confirmed()"
  (_change)="confirmed.set($event.detail.checked)">
</goa-checkbox>

<goa-checkbox
  name="receiveUpdates"
  text="Email me when my application status changes."
  description="We'll only email about this application.">
</goa-checkbox>

<goa-checkbox
  name="hasReceipts"
  text="I have child care receipts to upload"
  [error]="hasReceiptsError()">
</goa-checkbox>
```

## Attributes

| Attribute | Values | Notes |
|---|---|---|
| `name` | string | Form field name. |
| `checked` | boolean | Current state. Bind with `[checked]`. |
| `indeterminate` | boolean | For "some children selected" patterns. |
| `text` | string | The primary label. Sentence case. **Required for a11y.** |
| `description` | string | Optional secondary line in lighter grey. |
| `value` | string | Value sent on form submit. |
| `disabled` | boolean | |
| `error` | boolean | Red border. |
| `size` | `normal`, `compact` | |
| `arialabel` | string | When `text` isn't possible. |
| `maxwidth` | CSS length | Wrap long labels. |
| `mt`/`mb`/`ml`/`mr` | spacing tokens | |

## Events

- `(_change)` — `$event.detail.checked` is the new boolean.

## Copy rules

- **Label is a full statement of what checking means.** "Email me when my
  application status changes." Not "Email notifications".
- **First person — "I confirm…"** for legal / attestation checkboxes.
- **Don't double-negate.** Avoid "I don't want to receive updates."
- **One idea per checkbox.** Split compound attestations.

## Common pattern — confirmation gate

The final-step confirmation gates submission:

```html
<goa-checkbox
  text="I confirm the information I've given is true and complete."
  [checked]="confirmed()"
  (_change)="confirmed.set($event.detail.checked)">
</goa-checkbox>

<goa-button type="primary" [disabled]="!confirmed()" (_click)="submit()">
  Send application
</goa-button>
```
