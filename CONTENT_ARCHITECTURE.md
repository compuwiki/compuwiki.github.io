# Content Architecture Guide

This document defines how content is organized under `content/` and how new pages should be added.

## Structure

- `content/index.md`: global landing page.
- `content/cheatsheets/`: quick-reference, command-heavy notes.
- `content/concepts/`: fundamentals and conceptual explanations.
- `content/web-dev/`: web topics, backend/frontend concepts, best practices, history.
- `content/databases/`: SQL and NoSQL learning notes.
- `content/deployment/`: infrastructure and runtime topics.
- `content/comparisons/`: side-by-side technical comparisons.
- `content/essays/`: opinion, philosophy, and conceptual essays (longer-form, less reference-oriented).
- `content/meta/`: notes about the wiki itself (drafts, scratchpad, formatting helpers).

## Folder Rules

- Every content folder must contain an `index.md`.
- `index.md` should describe the folder and link to child pages/subfolders.
- Keep one topic per page. Avoid mixing unrelated subjects in one file.
- If a folder is still empty, keep `index.md` with a short "upcoming content" note.
- Do not leave loose pages directly under `content/`. Every page belongs in a topic folder that's linked from `content/index.md`.

## Naming Rules

- Use lowercase kebab-case for file and folder names.
- Prefer descriptive names: `security-baseline.md`, not `security.md`.
- Keep slugs stable. Avoid renaming paths unless needed.

## Frontmatter Baseline

Use this minimum frontmatter for new pages:

```md
---
title: Page Title
tags: [topic-1, topic-2]
---
```

Guidelines:

- `title`: human-readable page title.
- `tags`: 2-5 tags, lowercase, kebab-case.

## Language Policy

Pick one primary language for titles, tags, and section names and keep it consistent project-wide.

## Authoring Templates

### Concept / Tutorial page

```md
---
title: Topic
tags: [concept, fundamentals]
---

## What it is

## Why it matters

## Key ideas

## Examples

## References
```

### Cheatsheet page

```md
---
title: Tool Name Cheatsheet
tags: [cheatsheet, cli]
---

## Quick commands

## Common workflows

## Pitfalls

## References
```

## Maintenance Checklist

- Ensure new folders include `index.md`.
- Ensure `content/index.md` links stay valid.
- Remove or fix dead links before publishing.
- Keep section indexes updated when adding new pages.

---

## Emoji Shortcodes Reference

| Emoji | Shortcode            | Name                 |
| ----- | -------------------- | -------------------- |
| ✨    | `:sparkles:`         | Sparkles/Recommended |
| 🍎    | `:apple:`            | macOS/Apple          |
| 🐧    | `:penguin:`          | Linux/Penguin        |
| 👹    | `:imp:`              | BSD/Demon            |
| 👿    | `:smiling_imp:`      | Solaris/Devil        |
| 🪟    | `:window:`           | Windows              |
| ☁️    | `:cloud:`            | Cloud/HarmonyOS      |
| ❌    | `:x:`                | Failure/Not Working  |
| ✅    | `:white_check_mark:` | Success/Working      |
| ☀️    | `:sunny:`            | SunOS/Sun            |
| 🔧    | `:wrench:`           | Tools/Config         |
| ⚙️    | `:gear:`             | Settings/Components  |
| 💾    | `:floppy_disk:`      | DOS/Disk/Storage     |
| 🎮    | `:video_game:`       | Gaming/Exec          |
| 🌸    | `:cherry_blossom:`   | Haiku/Flower         |

**Sources:**

- [GitHub Emoji Cheat Sheet](https://github.com/ikatyang/emoji-cheat-sheet)
- [Emojipedia](https://emojipedia.org/)
- [WebFX Emoji Tool](https://www.webfx.com/tools/emoji-cheat-sheet/)
