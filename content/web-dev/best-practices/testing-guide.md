---
title: Testing Guide
---

# /docs/TESTING_GUIDE.md

## Scope

- Every feature requires unit tests for logic and integration tests for critical flows.
- Tests must be deterministic and isolated; no reliance on external networks unless mocked.

## Types

- Unit tests cover pure functions and modules; include edge cases and error paths.
- Integration tests cover DOM interactions and state transitions; prefer headless browser tools when needed.
- Contract tests for external APIs must use versioned fixtures.

## Practices

- Follow arrange-act-assert; one behavior per test.
- Keep tests fast; parallelize where possible; avoid shared mutable global state.
- Use descriptive test names stating behavior and expectation.

## Coverage

- Maintain coverage thresholds; highlight deltas in PRs.
- New code without tests must be justified and tracked with an issue.

## Data

- Use factories or builders for test data; avoid magic values; scrub secrets.
