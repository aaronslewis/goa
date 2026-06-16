# Page patterns — GoA service screens (V2 Angular)

Two canonical GoA page anatomies. Pixel-level V1 recreations of both live in the
`goa-angular-v1` skill's `ui-kits/` (HTML you can open in a browser); **V2
restyles the components**, so use these anatomies with V2 components and check
<https://design.alberta.ca/> for current visuals.

## 1. Public info page (Alberta.ca service page)

Anatomy, top to bottom:

1. Utility bar ("An official site of the Alberta Government").
2. Header — Alberta wordmark + service name + search (`<goab-input type="search">`).
   Consider `<goab-microsite-header>` / `<goab-app-header>` which exist in V2.
3. Breadcrumb (`<nav aria-label="Breadcrumb">`).
4. Title block — `<h1>` + `<goab-badge>` (eligibility/phase) + plain-language lede.
5. Sticky "On this page" nav.
6. Sections: Overview (with info `<goab-callout>`), Who can apply (checklist),
   Rates (table — mono right-aligned numerics), an interactive estimator
   (`<goab-container accent="thick">` + form items + primary button → result
   callout), How to apply (numbered steps).
7. Brand-dark CTA banner — `<goab-button type="start" variant="inverse">`.
8. Footer — `<goab-app-footer>` with link columns + reversed wordmark.

## 2. Multi-step service form (application wizard)

1. Service header — wordmark + service name + `<goab-badge type="default" content="Beta">`
   + "Save and exit" (`type="tertiary"`).
2. Stepper — V2 ships `<goab-form-stepper>` + `<goab-form-step>`; use them
   (V1 kits hand-rolled this).
3. Steps: About you → Your children (repeatable `<goab-container accent="thin">`
   cards with add/remove) → Care details (+ info callout) → Review (grouped
   containers with per-section Edit `type="text"` buttons).
4. Confirmation gate — `<goab-checkbox>` gating the primary button.
5. Footer nav — Back (`tertiary`) + "Save and continue" (`primary`).
6. Success screen — `<goab-container type="success">` with mono reference number
   + "What happens next" callout.

## Copy checklist (both patterns)

- Page title = the action ("Apply for child care subsidy").
- Steps plain: "About you", "Your children", "Care details", "Review".
- "Save and continue" / "Back" — never "Next" / "Previous".
- Final button "Send application" — never "Submit".
- Caveats stated plainly ("This isn't a guarantee of funding.").
