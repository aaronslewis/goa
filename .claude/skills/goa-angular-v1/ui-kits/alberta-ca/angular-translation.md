# Angular translation — `alberta-ca` UI kit

The original kit (`index.html`, `SubsidyPage.jsx`, `site.css`) is a React/HTML
recreation of a typical Alberta.ca **service information page** themed to the
child care subsidy. Use it as a visual reference; build the Angular version with
the mappings below.

## Surfaces and their Angular equivalents

| Original surface | Angular |
|---|---|
| Utility bar + main header (wordmark, service name, search) | Custom layout `<header>` with `<img src="reference/assets/alberta-wordmark.svg">` and `<goa-input type="search" leadingicon="search-outline">`. |
| Breadcrumb | `<nav aria-label="Breadcrumb">` with plain `<a>` styled to `--goa-color-interactive-default`. |
| Title block + eligibility `Badge` | `<h1>` + `<goa-badge type="success" content="Eligible" icon="true">`. |
| Plain-language lede | `<p class="lede">` using `--goa-typography-body-l`. |
| Sticky "On this page" nav | `<nav class="on-this-page">` with plain `<a href="#…">` (use `scroll-behavior: smooth` on `html`). |
| Overview + info callout | `<goa-callout type="information" heading="…">`. |
| Who can apply checklist | `<ul class="check-list">` with `<goa-icon type="checkmark-circle" size="small">` per item — no checkbox; it's static content. |
| Subsidy rates table | Plain `<table class="goa-table">` styled in the component SCSS using `--goa-*` tokens (rounded `2xl` outer container, hairline rows, heavier header underline, right-aligned numeric columns in mono). |
| Estimator (`Container` + inputs + result) | `<goa-container heading="Estimate your subsidy" accent="thick">` wrapping `<goa-form-item>` + `<goa-input>` + `<goa-dropdown>` + `<goa-button type="primary">` and a child `<goa-callout type="success">` for the result. |
| How-to-apply numbered steps | `<ol class="steps-list">` with `--goa-*` tokens for the step badges. |
| Brand-dark CTA banner | A `<section class="cta-banner">` with background `--goa-color-brand-dark`, `<h2>` reversed white, and `<goa-button type="start" variant="inverse">`. |
| Footer | A footer component with the reversed Alberta wordmark and link columns; tokens `--goa-color-brand-dark` + `--goa-color-text-inverse`. |

## Suggested route + file layout

```
src/app/subsidy-info/
  subsidy-info.component.ts
  subsidy-info.component.html
  subsidy-info.component.scss
```

Register at `/subsidy-info` in `app.routes.ts`.

## Components composed

`<goa-badge>` · `<goa-callout>` · `<goa-container>` · `<goa-form-item>` ·
`<goa-input>` · `<goa-dropdown>` · `<goa-button>` · `<goa-icon>`.

## Reference original

- [`index.html`](./index.html) — full visual reference (open in a browser).
- [`SubsidyPage.jsx`](./SubsidyPage.jsx) — React structure for cross-checking
  what goes where.
- [`site.css`](./site.css) — page-specific CSS (header, table, steps, footer);
  translate the **token-using** parts into your component SCSS.
