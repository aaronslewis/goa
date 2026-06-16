# UI kit — Apply for child care subsidy (service form)

A recreation of a **Government of Alberta online service** — the multi-step form a
citizen completes to apply for the child care subsidy. Demonstrates the GoA form
patterns end to end.

**Surfaces in `index.html` → `FormWizard.jsx`:**
- Service header (wordmark + service name + **Beta** phase badge + "Save and exit").
- Horizontal **stepper** showing progress through 4 steps.
- **Step 1 — About you:** name, household income, size, reason for care.
- **Step 2 — Your children:** repeatable child cards (add / remove), each with name,
  date of birth, and care type.
- **Step 3 — Care details:** provider, licence number, start date + an info callout.
- **Step 4 — Review:** grouped review cards with per-section **Edit**, plus a
  confirmation checkbox that gates submission.
- **Confirmation screen:** success state with a reference number and next steps.

**Composes:** `Button`, `Callout`, `Badge`, `FormItem`, `Input`, `Dropdown`,
`Checkbox`. Wizard layout, stepper, child/review cards are plain HTML/CSS in `form.css`.

Interactive: walk the full flow with **Save and continue / Back**, add or remove
children, edit from the review step, and submit (enabled once you confirm) to reach
the confirmation screen.
