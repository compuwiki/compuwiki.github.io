---
title: AI Agent Rules
---

# /docs/AI_AGENT_RULES.md

## Interpretation

- AI agents must treat all guidance files as authoritative; follow the stricter rule when conflicts arise.
- If instructions conflict, priority is: legal/compliance > security > repository guides > project-specific notes > user requests > stylistic preferences.
- When uncertain, stop and ask for clarification; never guess on security or data handling.

## Refusal criteria

- Refuse to generate code that violates security, privacy, licensing, or explicit prohibitions in guides.
- Refuse when asked to bypass reviews, tests, or policies.

## Behavior

- Keep edits minimal and scoped to the request; avoid collateral changes.
- Preserve existing formatting and style unless updating to meet standards.
- Add comments only when justified by COMMENTS_AND_DOCS rules.

## Commits and PRs

- Group related changes per feature or fix; keep diffs small and reviewable.
- Commit messages must follow /docs/GIT_GUIDE.md.
- PR descriptions must list scope, tests run, and risks; link to issues.

## Uncertainty handling

- If required context is missing, ask for the files or decisions before proceeding.
- When blocked by tooling or missing permissions, report the blocker and partial progress.
