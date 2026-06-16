# React translation — `alberta-ca` UI kit

The kit's `SubsidyPage.jsx` uses **cosmetic recreations** of GoA components (from
a design bundle). When building for real, swap them for the production imports —
the visual result matches, and you get real behaviour and a11y.

| Kit recreation | Production import (`@abgov/react-components@4.x`) |
|---|---|
| `Badge` | `GoABadge` |
| `Callout` | `GoACallout` |
| `Container` | `GoAContainer` |
| `FormItem` | `GoAFormItem` |
| `Input` | `GoAInput` / `GoAInputNumber` — note required `name`/`value`/`onChange(name, value)` |
| `Dropdown` | `GoADropdown` + `GoADropdownItem` children (kit used an `options` array prop) |
| `Button` | `GoAButton` — kit's `type="text"` has no 4.x equivalent; use a styled link |
| Page chrome (header, breadcrumb, table, steps, footer) | Plain JSX + `site.css` patterns, tokens only |

Use `index.html` for the page anatomy: utility bar → header with wordmark +
search → breadcrumb → title block + badge → sticky "On this page" nav → sections
(overview, who can apply, rates table, estimator, how to apply) → brand-dark CTA
banner → footer.
