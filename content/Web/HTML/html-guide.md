# /docs/HTML_GUIDE.md

## Semantics
- Use semantic elements for structure; avoid div/span when sectioning elements exist.
- Forms require label elements linked to controls; include explicit type attributes.
- Lists must wrap list items; buttons for actions, links for navigation.
- Use SVG for icons; avoid icon fonts.

## Accessibility
- Provide lang on html; head includes meta charset and viewport.
- Use aria-* only to supplement semantic roles; never replace missing semantics.
- Ensure focus order matches DOM; every interactive element must be keyboard accessible.
- Provide alt text for images; empty alt for purely decorative content.

## Formatting
- Indent 2 spaces; no tabs.
- One attribute per line only when lines exceed 100 characters; otherwise keep attributes on the element line.
- Self-close void elements without trailing slash.
- Attribute order: id, data-*, class, name, type, value, href/src, action, method, aria-*, role, everything else.
- Boolean attributes present without values.

## Comments
- Use comments only to mark temporary scaffolding or delineate complex sections that cannot be simplified.
- Do not leave commented-out markup; delete unused code.
- No inline reviewer notes in committed HTML.

## Prohibited
- No inline event handlers (onclick, etc.); use JS listeners.
- No tables for layout; tables only for tabular data with th/td scope attributes.
- No presentational elements (b, i, font, center, marquee) or deprecated attributes.
- Avoid empty div/span for spacing; use CSS margin/padding utilities.
