# UI kit — Alberta.ca: Child care subsidy (public info page)

A recreation of a typical **Alberta.ca service information page**, themed for the
child care subsidy. It shows the public-facing chrome and content patterns a citizen
sees *before* applying.

**Surfaces in `index.html` → `SubsidyPage.jsx`:**
- Utility bar (language + account) and main site header with the Alberta wordmark + service name + search.
- Breadcrumb, title block with an eligibility `Badge`, and a plain-language lede.
- Sticky **"On this page"** navigation (smooth-scrolls to sections).
- Content sections: Overview (with an info `Callout`), Who can apply (checklist),
  Subsidy rates (rounded GoA table), an interactive **subsidy Estimator**
  (`Container` + `Input`/`Dropdown`/`Button` → live `Callout` result), How to apply
  (numbered steps), and a brand-dark CTA banner with a "start" button.
- GoA footer with link columns + reversed wordmark.

**Composes:** `Badge`, `Callout`, `Container`, `FormItem`, `Input`, `Dropdown`, `Button`.
Page-specific chrome (header, table, steps, footer) is plain HTML/CSS in `site.css`.

Interactive: change the estimator inputs and press **Estimate subsidy** to recompute
the result; the on-this-page nav scrolls the document.
