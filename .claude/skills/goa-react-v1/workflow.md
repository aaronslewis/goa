# Workflow — scaffold, draft, verify (React, DS V1)

The loop to run when invoked. This skill is repo-agnostic — follow the host
project's existing conventions for file layout, routing, and state management.

## 0. Clarify scope (skip if the request already specifies)

- What screen / feature? Audience (citizen-facing → Grade 6–8 copy; staff → Grade 8)?
- Surface: single page, multi-step wizard, info page, modal?
- Where does it live in the host app (route, folder conventions)?

## 1. Confirm setup

Check `package.json` for `@abgov/react-components@4.x`, `@abgov/web-components@1.x`,
`@abgov/design-tokens@1.x`. If missing, install:

```bash
npm install @abgov/react-components@^4.13 @abgov/web-components@^1 @abgov/design-tokens@^1.10
```

Ensure the app entry imports the web components and tokens once:

```tsx
import '@abgov/web-components';
import '@abgov/design-tokens/dist/tokens.css';
```

## 2. Draft copy first

Write all visible strings as plain text and check against
[`content-guidelines.md`](./content-guidelines.md): Grade 8 or lower, sentence
case, action-first headings, "Apply now" not "Submit", numerals, no emoji. Show
the user the copy before building.

## 3. Build with `GoA*` components

```tsx
import {
  GoAButton, GoACallout, GoAContainer, GoAFormItem, GoAInput,
  GoADropdown, GoADropdownItem, GoACheckbox, GoABadge,
} from '@abgov/react-components';
```

Use a `GoA*` component for every primitive. Hand-roll only layout, headings,
body text, lists. See [`components/`](./components/) for exact props — the v4
typings are strict (e.g. `GoAInput` requires `name`, `value`, `onChange`).

## 4. Style with `--goa-*` tokens

Every colour / font / spacing / radius / shadow value in CSS references a
`--goa-*` token. Verify each token exists before using:

```bash
grep <token-name> node_modules/@abgov/design-tokens/dist/tokens.css
```

## 5. Wire into the app

Add the route/entry per the host project's router (React Router, Next.js pages,
etc.). Page `<title>` matches the page heading.

## 6. Run and check

Start the project's dev server. Open the new screen. Check the browser console
for errors and "unknown element" warnings (means `@abgov/web-components` wasn't
imported).

## 7. Verify

1. **No V2 components.** Case-sensitive search must be empty:
   ```bash
   grep -rn "Goab" src/<feature>/
   ```
2. **No hard-coded colours.**
   ```bash
   grep -rnE '#[0-9a-f]{3,6}|rgb\(' src/<feature>/*.css
   ```
3. **Copy re-read** against `content-guidelines.md`.
4. **Visual check:** action-blue primary button, 2px focus outline on tab, no
   layout shift on input focus, callout shows status colour + icon.
