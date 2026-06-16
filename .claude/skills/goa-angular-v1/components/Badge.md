# `<goa-badge>` — Government of Alberta status badge

A compact label for state — eligibility, status, phase ("Beta"), counts.

## Angular template

```html
<goa-badge type="success" content="Eligible" icon="true"></goa-badge>

<goa-badge type="information" content="In review"></goa-badge>

<goa-badge type="important" content="Action required" icon="true"></goa-badge>

<goa-badge type="emergency" content="Closed"></goa-badge>

<goa-badge type="midtone" content="Beta"></goa-badge>

<!-- Subtle / outlined treatment, common in tables -->
<goa-badge type="success" content="Active" emphasis="subtle"></goa-badge>

<!-- Larger size for hero/title-block placement -->
<goa-badge type="success" content="Eligible" size="large" icon="true"></goa-badge>
```

## Attributes

| Attribute | Values | Notes |
|---|---|---|
| `type` | `information`, `success`, `important`, `emergency`, `dark`, `midtone`, `light` | Maps to status colour. `midtone` is neutral grey; `dark`/`light` are neutral variants. |
| `content` | string | The label text. Sentence case. |
| `icon` | boolean | Shows the type's leading status icon. |
| `icontype` | Ionicons name | Override the auto icon. |
| `size` | `normal` (default), `large` | `large` bumps height + font one step. |
| `emphasis` | default, `subtle` | `subtle` is lighter/outlined — use in tables. |
| `arialabel` | string | Use when the badge is icon-only. |

## Copy rules

- **One or two words max.** "Eligible", "In review", "Action required", "Beta".
- **Sentence case.**
- **Never** rely on colour alone — always set `content` or `arialabel` for screen readers.

## When to use

- Service phase ("Beta", "Pilot").
- Inline status next to a title or list item ("Eligible", "Submitted", "In review").
- **Not** for primary CTAs — those are buttons.
