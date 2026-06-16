# Token changes — V1 (1.10.0) → V2 (2.8.1)

Compared compiled `tokens.css` of `@abgov/design-tokens@1.10.0` vs `@2.8.1`:

- **16 token names removed**, all from two component groups that V2 dropped:
  - `--goa-scroll-panel-*` (6 tokens: bg, content shadows, footer/header bg)
  - `--goa-workspace-layout-*` (10 tokens: bg, card bg, footer/header bg +
    borders + scroll shadows, mobile toggle position)
- **0 token names added** (name-for-name; *values* may differ — don't assume a
  colour or size is identical across versions).
- **New file:** `dark-theme.css` ships alongside `tokens.css` in 2.x — V2 has
  dark-mode token overrides.

## Rules

1. If a screen used `--goa-scroll-panel-*` or `--goa-workspace-layout-*` in V1,
   those panels need rebuilding on V2 components (e.g. the work-side menu family),
   not a token swap.
2. **Always verify a token name before using it:**
   ```bash
   grep <token-name> node_modules/@abgov/design-tokens/dist/tokens.css
   ```
   or against this skill's [`reference/tokens/goa-tokens-v2.css`](./reference/tokens/goa-tokens-v2.css).
3. Re-run this comparison when either package publishes a new minor — these
   numbers are for 1.10.0 vs 2.8.1 (checked June 2026).
