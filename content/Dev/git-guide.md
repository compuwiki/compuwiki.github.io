# /docs/GIT_GUIDE.md

## Commit philosophy
- Compose atomic commits that isolate one logical change; avoid mixing refactors with behavior changes.
- Prefer small, reviewable diffs; cap at ~400 changed lines unless mechanical.
- Every commit must leave the repository buildable and tests passing.

## Commit message format
- Use Conventional Commits: <type>(scope): <subject>.
- Allowed types: feat, fix, docs, style, refactor, perf, test, chore, build, ci, revert.
- Subject max 72 chars, imperative, no trailing period.
- Body required for breaking changes or non-obvious decisions; include testing notes when relevant.
- Footer: BREAKING CHANGE: <description> when applicable; reference issue IDs in separate footers.

## Branching strategy
- Main branch is protected; direct commits forbidden.
- Use short-lived feature branches: feature/<ticket>, fix/<ticket>, chore/<topic>.
- Rebase feature branches on main before merge; avoid merge commits in feature branches.
- Merge via squash for user-facing changes; rebase-and-merge allowed for linear history when commits are already atomic.

## Rewriting history
- Local branches may be rebased freely before review; after review begins, coordinate and preserve commit IDs unless squash requested.
- Do not rewrite shared branches after merge to main.
- Interactive rebase allowed to clean commit series before merge.

## Force push policy
- Force push allowed only to personal branches you own; never to main or shared release branches.
- When force pushing after review requests, notify reviewers.

## Repository size management
- Do not commit generated assets, build outputs, or vendored dependencies unless policy requires.
- Use .gitignore for caches and local tools.
- Use Git LFS for binaries larger than 5 MB that must be versioned.
- Purge obsolete large files using history rewrite before public release; prefer download links for data sets.

## Binary file policy
- Avoid binaries when text alternatives exist.
- Versioned binaries must include checksum and provenance in commit message or accompanying README.
- Do not store secrets or credentials in binaries.
