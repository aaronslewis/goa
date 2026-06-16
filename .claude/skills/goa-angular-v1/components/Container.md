# `<goa-container>` — Government of Alberta content card

The standard content card. Group related content, summaries, review blocks,
result displays, and side-panel callouts.

## Angular template

```html
<!-- Default content card -->
<goa-container heading="Estimated subsidy" accent="thick">
  <p>Based on what you told us, your family could receive about
  <strong>$1,540 per month</strong>.</p>
  <p>This isn't a guarantee of funding. Apply to confirm your amount.</p>
</goa-container>

<!-- Quiet, grey background -->
<goa-container type="non-interactive" heading="What you'll need">
  <ul>
    <li>Your most recent tax return</li>
    <li>Each child's full name and date of birth</li>
    <li>Your care provider's licence number</li>
  </ul>
</goa-container>

<!-- Info accent (blue) -->
<goa-container type="info" heading="How long this takes">
  <p>Most people finish in about 20 minutes.</p>
</goa-container>

<!-- Compact, no shadow, content-width -->
<goa-container type="non-interactive" accent="filled" padding="compact" mb="none" width="content">
  <p class="peek-heading">Need help?</p>
  <p class="peek-body">Ask Sage — your AI help assistant</p>
</goa-container>

<!-- Review block with edit action -->
<goa-container heading="About you" accent="thin">
  <dl class="review-list">
    <div><dt>Name</dt> <dd>Aaron Lewis</dd></div>
    <div><dt>Household income</dt> <dd>$58,000</dd></div>
  </dl>
  <goa-button type="text" leadingicon="create-outline">Edit</goa-button>
</goa-container>
```

## Attributes

| Attribute | Values | Notes |
|---|---|---|
| `type` | `interactive` (white, raised), `non-interactive` (grey), `info` (blue tint), `success` (green tint), `important` (yellow tint), `error` (red tint) | Semantic background. |
| `accent` | `thin` (8px), `thick` (16px), `filled` | Top bar in brand teal (`thin`/`thick`) or filled heading background. |
| `padding` | `relaxed` (default, 32px), `compact` (16px) | |
| `width` | CSS length or `content` | `content` shrinks to children. |
| `maxwidth` | CSS length | Cap the container width. |
| `minheight`, `maxheight` | CSS length | |
| `heading` | string | Heading shown at the top. |
| `mt`/`mb`/`ml`/`mr` | spacing tokens | Margins. |

## Slot `title`

For a more complex title (e.g. heading + status badge), use the named slot:

```html
<goa-container accent="thin">
  <div slot="title">
    <h3>Application sent</h3>
    <goa-badge type="success" content="Submitted" icon="true"></goa-badge>
  </div>
  <p>Your reference number is <strong>CCS-204-918</strong>.</p>
</goa-container>
```

## Copy rules

- **Heading is descriptive or action-first.** "Estimated subsidy", "What you'll
  need", "About you".
- **Body is plain language**, just like the rest of the page.

## When to use which type

- **`interactive`** (white) — primary content cards, results, summaries.
- **`non-interactive`** (grey) — supporting / quiet content, "what you'll need"
  lists, sidebar info.
- **`info`** / **`success`** — paired with a callout-style message; use a
  `<goa-callout>` instead if it's a single point.

## Composition note

Don't nest containers more than one deep — visual noise. Use whitespace and the
`accent` strip to differentiate sections instead.
