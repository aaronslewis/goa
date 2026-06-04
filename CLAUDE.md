# How to build GoA interfaces

- Always use @abgov/react-components for buttons, inputs,
  form fields, callouts, and badges. Never hand-build these.
- Never hard-code colours, spacing, or font sizes. Use the
  goa-* design tokens from @abgov/design-tokens.
- Match Figma layer names to component settings where a
  Code Connect map exists. Prefer the mapped example.
- Everything must meet WCAG 2.1 AA accessibility:
  visible focus, large enough tap targets, labelled fields.