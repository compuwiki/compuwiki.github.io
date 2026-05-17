---
name: html-code-reviewer
description: Review HTML files for structure, semantics, accessibility, SEO, and maintainability. Use for HTML audits, template reviews, static page QA, semantic markup checks, and frontend quality gates.
---

# Skill: HTML Code Reviewer

## Purpose
Use this skill to audit one or more HTML files for production quality. The reviewer should identify correctness, accessibility, semantic quality, and maintainability issues, then provide prioritized and actionable fixes.

## When To Use
Use for tasks like:
- HTML review
- frontend markup audit
- accessibility review
- semantic HTML check
- SEO baseline check
- template QA
- landing page validation
- static site quality review

## Review Scope
For each provided HTML file, perform all checks below.

### 1. Structure
- Verify valid document skeleton and hierarchy (`<!doctype html>`, `html`, `head`, `body`).
- Check heading order and logical content flow (`h1` to `h6`).
- Detect invalid nesting or malformed structure.

### 2. Semantics
- Prefer semantic landmarks (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`).
- Flag non-semantic wrappers where semantic elements are appropriate.
- Check for meaningful grouping of related content.

### 3. Accessibility
- Ensure non-decorative images include meaningful `alt` text.
- Verify form controls have labels and accessible names.
- Validate ARIA usage (only when needed, no redundant or conflicting roles).
- Flag keyboard, focus, and landmark discoverability issues visible in markup.

### 4. Code Quality
- Identify invalid, obsolete, or deprecated tags/attributes.
- Detect duplicate `id` values and broken `for`/`id` relationships.
- Flag inline style/script overuse when it harms maintainability.

### 5. SEO Basics
- Confirm presence and quality of `title`, `meta name="description"`, and `meta viewport`.
- Evaluate heading relevance and uniqueness.
- Check for obvious metadata omissions that affect indexing/snippets.

### 6. Best Practices
- Favor separation of concerns (structure in HTML, styling in CSS, behavior in JS).
- Encourage reusable, component-friendly markup patterns.
- Verify consistent naming and predictable layout structure.

## Severity Model
- Critical: likely to break functionality, block accessibility, or cause major SEO/UX harm.
- Warning: important quality issue that should be fixed soon.
- Suggestion: improvement that increases clarity, consistency, or future maintainability.

## Scoring Rubric (0-100)
Start at 100 and subtract by impact:
- Critical: -12 each
- Warning: -5 each
- Suggestion: -2 each

Clamp minimum score to 0.

Interpretation:
- 90-100: strong quality, minor refinements only
- 75-89: good baseline, several improvements needed
- 50-74: notable issues, should be improved before release
- 0-49: high risk, substantial rework required

## Required Output Format
For each HTML file, provide:
1. Score (0-100)
2. Findings by severity:
  - Critical
  - Warning
  - Suggestion
3. Actionable fixes:
  - short explanation
  - concrete code snippet(s)
4. Summary in 2-3 lines

If multiple files are reviewed, also include:
1. Global assessment
2. Cross-file consistency issues
3. Top 3 priority fixes for the whole set

## Output Quality Rules
- Be specific and reference exact elements/snippets when possible.
- Avoid generic advice without a concrete fix.
- Keep fixes minimal and practical.
- Prioritize accessibility and correctness over style preferences.