# Workflow — scaffold, draft, preview, verify

This is the loop the skill runs when invoked. Don't shortcut steps — copy and
token verification before preview saves rework.

## 0. Clarify scope (skip if the request already specifies)

- **What screen / feature?** ("Eligibility check", "Apply for X form, step 2",
  "Service status page".)
- **Audience?** Citizen-facing (target Grade 6–8 plain language) vs staff tool
  (Grade 8).
- **Surface?** Single page, multi-step wizard, info page with sections, or modal.
- **Route?** New top-level (`/eligibility-check`) or sub-route
  (`/help-centre/eligibility-check`).

## 1. Draft copy first

Before any markup, write out the visible strings — page title, headings, body
paragraphs, button labels, callout text, field labels, error messages — as plain
text. Check each against [`content-guidelines.md`](./content-guidelines.md):

- Grade 8 or lower?
- Sentence case?
- Action-first headings?
- "Apply now" not "Submit"?
- Numerals for numbers, "5 June 2026" for dates?
- No emoji, no marketing tone?

Show the copy to the user before scaffolding. Wording is cheap to fix in plain
text and expensive to fix in template + screenshots.

## 2. Scaffold the standalone component

Mirror the existing pattern in `src/app/help-centre/` and `src/app/sage-widget/`.
Create three files under `src/app/<feature>/`:

- `<feature>.component.ts` — `@Component({ standalone: true, selector: '<feature>',
  imports: [...], schemas: [CUSTOM_ELEMENTS_SCHEMA], templateUrl, styleUrls })`
- `<feature>.component.html` — the template
- `<feature>.component.scss` — styles

The `CUSTOM_ELEMENTS_SCHEMA` import is required because `<goa-*>` are web
components, not Angular components — Angular needs to be told to allow unknown
elements.

```ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  standalone: true,
  selector: 'eligibility-check',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './eligibility-check.component.html',
  styleUrl: './eligibility-check.component.scss',
})
export class EligibilityCheckComponent {}
```

## 3. Build the template with `<goa-*>` components

For every primitive — button, input, callout, badge, container, dropdown,
checkbox, form-item — use the existing `<goa-*>` web component. **Never**
hand-roll a primitive that already exists. See [`components/`](./components/) for
each one's selector, attributes, and usage.

Hand-roll only:
- Layout containers (`<div>`, `<section>`, `<main>`)
- Headings (`<h1>`–`<h6>`)
- Body text (`<p>`)
- Lists (`<ul>`, `<ol>`, `<li>`)
- Tables structure (use the GoA table styles for visuals)
- Custom-composed widgets that genuinely don't map to a primitive

## 4. Style with `--goa-*` tokens

In the `.scss` file, **every** colour / font / spacing / radius / shadow / motion
value must reference a `--goa-*` token. No hex, no rgb, no raw px for design
values.

Before introducing any token name:

```bash
grep <token-name> node_modules/@abgov/design-tokens/dist/tokens.css
```

If it doesn't exist in V1, it doesn't exist for us — find the right name.

## 5. Register the route

Add to `src/app/app.routes.ts`:

```ts
import { EligibilityCheckComponent } from './eligibility-check/eligibility-check.component';

export const routes: Routes = [
  // ... existing routes
  { path: 'eligibility-check', component: EligibilityCheckComponent, title: 'Check your eligibility' },
];
```

The page title — for the browser tab and assistive tech — should match the page
heading and follow `content-guidelines.md`.

## 6. Preview

Start (or reuse) the Angular dev server:

```
preview_start  →  npm start
```

Navigate to the route, screenshot, and check console logs:

```
preview_screenshot
preview_console_logs
preview_network    (only if the screen calls APIs)
```

Look for: no Angular template errors, no "is not a known element" warnings, no
404s on missing assets.

## 7. Verify

Run all four checks. **Any failing → fix and re-preview before declaring done.**

1. **No V2 selectors.**
   ```bash
   grep -E '<goab-' src/app/<feature>/
   ```
   Must be empty.

2. **No hard-coded colours / spacing literals.**
   ```bash
   grep -E '#[0-9a-f]{3,6}|rgb\(|rgba\(' src/app/<feature>/<feature>.component.scss
   ```
   Must be empty (or only inside a comment).

3. **Copy re-read.** Read every visible string in the template against
   `content-guidelines.md` one more time. Flag and fix any Grade-9+ writing.

4. **Visual match.** The `preview_screenshot` should show:
   - Alberta wordmark colours (teal brand, white background)
   - Action-blue primary button on hover/focus
   - Callout with the correct status colour + icon
   - Visible 2px focus outline when you tab through
   - No layout shift on input focus
