# /docs/JS_GUIDE.md

## Language level
- Target ES2021+; use ES modules; avoid transpilation-specific features unless configured.
- Prefer strict mode implicitly provided by modules.

## File and module structure
- One module per responsibility; default export only when the module has a single primary concept, otherwise use named exports.
- Keep public APIs at the top; helper functions follow.
- Do not mix DOM code with pure logic; isolate pure utilities in src/lib/.
- Tests mirror module structure with .test.js suffix.

## Function size and style
- Functions should fit within ~40 lines; extract helpers when branching or side effects proliferate.
- Use const for bindings; let when reassignment is required; never use var.
- Prefer pure functions; document and minimize side effects.

## Naming
- camelCase for functions and variables; PascalCase for classes and components; SCREAMING_SNAKE_CASE for constants intended as compile-time configuration.
- Events and callbacks named on<Event>; booleans prefixed with is/has/should.

## State management
- Avoid global mutable state; keep state within modules or pass explicitly.
- DOM state sync must be idempotent; re-render functions must tolerate repeated calls.
- Persisted state (localStorage, URL) must be validated before use.

## Side effects
- Modules must not perform side effects at import time beyond configuration; initialization must sit behind explicit function calls.
- DOM mutations must batch or debounce when driven by rapid events.
- Network calls require timeout and error handling; avoid implicit retries without limits.

## Error handling
- Throw Error subclasses with actionable messages; include context values where safe.
- Handle expected errors locally; propagate unexpected errors.
- Log only meaningful events; no console.log in committed code except diagnostics behind flags.

## Comments
- Use comments for invariants, constraints, or links to specs/issues; not for restating code.
- Do not leave commented-out code; remove or guard with feature toggles.

## Forbidden
- No eval, Function constructor, or dynamic import from uncontrolled input.
- No implicit coercion tricks; use strict equality.
- Avoid optional chaining on objects that must exist; validate instead.
- Avoid mixing promise chains and async/await in the same flow; prefer async/await.
