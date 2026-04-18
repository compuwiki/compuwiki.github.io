# /docs/CSS_GUIDE.md

## Architecture
- Use component-first CSS; each component gets its own file or block namespace.
- Define small utility classes prefixed u- for spacing and layout helpers; keep them single-purpose.
- Variables live in :root as custom properties; avoid preprocessor-only features unless configured.

## Naming
- Use BEM-style names: .component__element--modifier.
- Utilities use .u-<purpose> (e.g., u-flex, u-mt-16).
- State classes prefixed is- or has- and applied by JS only.

## Selectors and specificity
- Prefer single-class selectors; avoid IDs and element+class combos except for resets.
- Max nesting depth three levels; avoid descendant chains that depend on document structure.
- Avoid the universal selector * in production CSS.
- No !important except for documented third-party overrides placed in a dedicated override block.

## Layout
- Prefer flex for one-dimensional layout, grid for two-dimensional; avoid float-based layout.
- Use gap over margins for spacing inside flex/grid where possible.
- Do not fix heights on text containers; allow content to flow.
- Responsive rules are mobile-first; use min-width media queries.

## Prohibited patterns
- No inline styles; no style tags in HTML except minimal critical-path styles documented.
- No keyframes or animations without reduced-motion fallbacks.
- Avoid color values without variables; use custom properties for theme tokens.
- Do not use vendor-prefixed properties unless required for targeted support and documented.

## Comments
- Use comments sparingly to mark intent of non-obvious rules or third-party overrides.
- Remove commented-out declarations; rely on version control for history.
