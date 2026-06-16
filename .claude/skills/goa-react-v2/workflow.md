# Workflow — scaffold, draft, verify (React, DS V2)

## 0. Confirm setup

Check `package.json` for `@abgov/react-components@^7`, `@abgov/web-components@^2`,
`@abgov/design-tokens@^2`. Install what's missing:

```bash
npm install @abgov/react-components@^7 @abgov/web-components@^2 @abgov/design-tokens@^2
```

App entry imports, once:

```tsx
import '@abgov/web-components';
import '@abgov/design-tokens/dist/tokens.css';
```

If the project has `@abgov/react-components@4.x`, stop — that's DS V1; use the
`goa-react-v1` skill.

## 1. Clarify scope, then draft copy first

Audience (citizen → Grade 6–8; staff → Grade 8). Write every visible string as
plain text and check against [`content-guidelines.md`](./content-guidelines.md)
before any markup.

## 2. Build with `Goab*` components

```tsx
import {
  GoabButton, GoabCallout, GoabContainer, GoabFormItem, GoabInput,
  GoabDropdown, GoabDropdownItem, GoabCheckbox, GoabBadge,
} from '@abgov/react-components';
```

Callbacks receive **detail objects**:

```tsx
<GoabInput name="income" value={income}
  onChange={(detail) => setIncome(detail.value)} />

<GoabCheckbox name="confirm" checked={confirmed}
  text="I confirm the information I've given is true and complete."
  onChange={(detail) => setConfirmed(detail.checked)} />
```

See [`components/`](./components/) for exact props per component.

## 3. Style with `--goa-*` tokens (V2 set)

Verify every token name:

```bash
grep <token-name> node_modules/@abgov/design-tokens/dist/tokens.css
```

Mind the dropped groups in [`token-changes.md`](./token-changes.md).

## 4. Wire into the app, run, check

Add the route per the host router. Start the dev server, open the screen, check
the console — "unknown element goa-…" warnings mean `@abgov/web-components`
isn't imported.

## 5. Verify

1. **No V1 components.** Case-sensitive — `GoA` (capital A) never appears:
   ```bash
   grep -rn "GoA" src/<feature>/
   ```
   (`Goab` has a lowercase a, so real V2 usage won't match.)
2. **No hard-coded colours:**
   ```bash
   grep -rnE '#[0-9a-f]{3,6}|rgb\(' src/<feature>/*.css
   ```
3. **Copy re-read** against `content-guidelines.md`.
4. **Visual:** action-blue primary, 2px focus outline, status colours on
   callouts, no layout shift on focus.
