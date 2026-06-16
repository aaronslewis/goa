# `<goa-callout>` — Government of Alberta callout

A bordered message box with a tinted heading bar, status icon, and body content.
Use for non-blocking inline information, warnings, errors, or confirmations.

## Angular template

```html
<goa-callout type="information" heading="How we calculate the subsidy">
  We use your household income and the number of children in licensed care to
  estimate your monthly amount. This isn't a guarantee of funding.
</goa-callout>

<goa-callout type="success" heading="Application sent">
  Your reference number is <strong>CCS-204-918</strong>. We'll email you once we
  review your application.
</goa-callout>

<goa-callout type="important" heading="Save and exit">
  You can leave and come back later. Your answers are saved automatically.
</goa-callout>

<goa-callout type="emergency" heading="We couldn't load your application">
  Try again in a few minutes. If it keeps happening, call 310-0000 (toll free).
</goa-callout>

<!-- Compact, fits tighter in a column -->
<goa-callout type="information" heading="Sources" size="medium" mb="none">
  <p>Alberta.ca · Government of Alberta open data.</p>
</goa-callout>
```

## Attributes

| Attribute | Values | Notes |
|---|---|---|
| `type` | `information`, `success`, `important`, `emergency` | Semantic colour + auto-icon. |
| `heading` | string | Required for screen readers — describe the message. |
| `size` | default, `medium` | Smaller variant. |
| `emphasis` | default, `subtle` | Lighter treatment for less-critical messages. |
| `arialive` | `polite`, `assertive`, `off` | Use `assertive` for `emergency` callouts that appear after an action. |
| `icontheme` | `outline`, `filled` | Default depends on `type`. |
| `maxwidth` | CSS length | Cap the callout's width. |
| `mt`/`mb`/`ml`/`mr` | spacing tokens | Margins. |

## Copy rules

- **Heading is action-first or descriptive**, not abstract. "How we calculate the
  subsidy" not "Information".
- **Body explains plainly.** State caveats: "This isn't a guarantee of funding."
- **No emoji.** The auto-icon is enough.

## When to use which type

- **`information`** (blue) — context, instructions, "what happens next".
- **`success`** (green) — confirmations after a successful action.
- **`important`** (yellow) — warnings the reader needs to notice but can proceed.
- **`emergency`** (red) — blocking errors, deadlines passed, service outages.
