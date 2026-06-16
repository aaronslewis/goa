# Angular translation — `subsidy-application` UI kit

The original kit (`index.html`, `FormWizard.jsx`, `form.css`) recreates the
multi-step **child care subsidy application** form. Use it as the canonical
pattern for Government of Alberta service forms (wizard layout, stepper,
review step, confirmation).

## Surfaces and their Angular equivalents

| Original surface | Angular |
|---|---|
| Service header (wordmark + service name + Beta badge + "Save and exit") | `<header class="service-header">` with `<img>` wordmark, `<h1>`, `<goa-badge type="midtone" content="Beta">`, and `<goa-button type="tertiary">Save and exit</goa-button>`. |
| Horizontal stepper (4 steps) | Plain `<ol class="stepper">` with status circles; numbers in mono font; use `--goa-color-interactive-default` for the active step, `--goa-color-status-success-default` for completed. (V1 doesn't ship a `<goa-form-stepper>` for the legacy `goa-*` set — hand-roll using tokens.) |
| Step 1 — About you (name, income, household size, reason) | `<goa-form-item>` × 4 wrapping `<goa-input>` (name, income), `<goa-input type="number">` (household size), `<goa-dropdown>` (reason). |
| Step 2 — Your children (repeatable cards) | `<goa-container heading="Child 1" accent="thin">` per child, with `<goa-form-item>` + `<goa-input>` (name, DOB) + `<goa-dropdown>` (care type) + a `<goa-button type="text" variant="destructive" leadingicon="trash-outline">Remove this child</goa-button>`. "Add a child" is `<goa-button type="secondary" leadingicon="add-outline">`. |
| Step 3 — Care details + info callout | `<goa-form-item>` × 3 + `<goa-callout type="information" heading="If you don't have a licence number">`. |
| Step 4 — Review (grouped cards with per-section Edit) | `<goa-container heading="About you" accent="thin">` per section, with `<dl class="review-list">` for label/value pairs + `<goa-button type="text" leadingicon="create-outline">Edit</goa-button>`. |
| Confirmation checkbox gating submission | `<goa-checkbox text="I confirm the information I've given is true and complete." [checked]="confirmed()" (_change)="confirmed.set($event.detail.checked)">`. |
| Footer nav (Back / Save and continue) | Two `<goa-button>`s: `type="tertiary"` for Back, `type="primary"` for Save and continue. Pair with a sticky footer. |
| Confirmation screen | `<goa-container type="success" heading="Application sent" accent="thick">` with reference number in mono font + `<goa-callout type="information" heading="What happens next">`. |

## Suggested route + file layout

```
src/app/subsidy-apply/
  subsidy-apply.component.ts    # wizard state, step navigation
  subsidy-apply.component.html  # step container + footer nav
  subsidy-apply.component.scss
  steps/
    about-you.component.{ts,html,scss}
    children.component.{ts,html,scss}
    care-details.component.{ts,html,scss}
    review.component.{ts,html,scss}
    confirmation.component.{ts,html,scss}
```

Register at `/subsidy-apply` in `app.routes.ts`.

## Components composed

`<goa-button>` · `<goa-callout>` · `<goa-badge>` · `<goa-form-item>` ·
`<goa-input>` · `<goa-dropdown>` · `<goa-checkbox>` · `<goa-container>` ·
`<goa-icon>`.

## Reference original

- [`index.html`](./index.html) — full visual reference.
- [`FormWizard.jsx`](./FormWizard.jsx) — React wizard structure for cross-checking.
- [`form.css`](./form.css) — page-specific CSS for stepper, child cards, review;
  translate the token-using parts into your component SCSS.

## Copy & content checklist for service forms

- Page title is the action: "Apply for child care subsidy".
- Each step title is plain: "About you", "Your children", "Care details", "Review".
- "Save and continue" / "Back" — not "Next" / "Previous".
- Confirmation message names the reference number, says what happens next, and
  links back to a status page (if applicable).
- Final submission button: "Send application" — not "Submit".
