# /docs/PROJECT_STRUCTURE.md

## Layout
- Root contains src/, public/, docs/, scripts/, tests/, tools/; create folders as needed; no flat sprawl.
- Place runtime web assets under src/; public/ holds static files served verbatim.
- Keep build and task automation under scripts/ or tools/; do not mix with src/.
- Store documentation under docs/; architectural decisions in docs/adr/ if created.
- Keep configuration in repo root when required by tooling; otherwise under config/ to avoid clutter.

## File naming
- Use lowercase-kebab-case for files and directories in web assets (html, css, js).
- Use PascalCase only for class-based JS modules exporting a single class.
- Test files mirror source names with .test.js suffix in tests/ or __tests__ adjacent when justified.
- Configuration files keep tool-required names; prefer text formats such as .json or .js.

## Separation of concerns
- Keep HTML for structure, CSS for presentation, JS for behavior; no inline styles or scripts except minimal bootstrapping.
- Avoid cross-layer coupling: JS modules must not embed CSS strings; CSS must not depend on JS-generated class names beyond documented tokens.
- Shared utilities live under src/lib/; UI components under src/components/; pages under src/pages/ when applicable.

## Configuration
- Tooling config belongs in root or config/ as allowed; document non-default settings in docs/CONFIG_NOTES.md when created.
- Secrets must be injected via environment or secrets storage; never committed.

## Documentation
- Place user and developer docs under docs/; include README at repo root summarizing structure.
- Keep diagrams and specs under docs/architecture/; prefer text formats over images.
