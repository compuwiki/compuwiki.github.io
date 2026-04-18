# /docs/COMMENTS_AND_DOCS.md

## Purpose
- Comments must capture rationale, invariants, contracts, and external constraints.
- Document behavior that is not obvious from code; prefer clearer code over comments.

## What to explain
- Non-trivial algorithms, performance trade-offs, and security considerations.
- Reasons for deviating from standards, temporary hacks with removal conditions and owners.
- Public APIs: expected inputs/outputs, side effects, and error cases.

## What never to explain
- Language syntax, obvious control flow, or restating names.
- Personal notes, reviewer conversations, or TODO entries without an issue reference.

## Documentation vs code
- Code must be self-describing via naming and structure; documentation supplements, not replaces clarity.
- High-level architecture belongs in docs/ with traceable version control.
- API contracts should be documented near definitions and in shared docs if public.

## Inline vs block
- Inline comments for single statements needing context.
- Block comments for module-level rationale or section headers; keep concise.
- Remove stale comments when behavior changes; maintain accuracy as part of each change.
