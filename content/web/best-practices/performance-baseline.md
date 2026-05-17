# /docs/PERFORMANCE_BASELINE.md

## Budgets
- Target under 100KB compressed critical-path assets for initial load; defer non-critical resources.
- Limit main-thread blocking tasks to under 50ms chunks; offload heavy work to workers when possible.

## Loading
- Use code-splitting and lazy loading for non-critical modules.
- Optimize images with responsive sizes, modern formats, and caching headers.
- Avoid synchronous XHR and blocking scripts; use async/defer for script tags.

## Runtime
- Avoid layout thrash: batch DOM reads/writes and use requestAnimationFrame for visual updates.
- Cache derived data; avoid recalculating on every render.
- Prefer CSS animations over JS where possible and honor prefers-reduced-motion.

## Monitoring
- Measure with RUM or lab tools; track Core Web Vitals where applicable.
- Regressions must block release until addressed or explicitly waived.
