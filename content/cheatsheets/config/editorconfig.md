---
title: Editor config
---


```conf
# EditorConfig — keep coding style consistent across editors / IDEs.
# Docs: https://editorconfig.org/
#
# Place a .editorconfig file in your repo root. Editors walk up from the
# current file until they find one with `root = true` (or hit the filesystem
# root). Sections cascade: later, more specific globs override earlier ones.

# Stop searching at this file. Always put this in the project-root .editorconfig.
root = true

# ─── Defaults for every file ─────────────────────────────────────────────────
[*]
charset                  = utf-8        # also: latin1, utf-8-bom, utf-16be, utf-16le
end_of_line              = lf           # also: crlf, cr
indent_style             = space        # also: tab
indent_size              = 4            # number of columns (or 'tab')
tab_width                = 4            # display width of a tab char (defaults to indent_size)
trim_trailing_whitespace = true
insert_final_newline     = true
max_line_length          = 100          # advisory; not all editors enforce

# ─── Glob patterns ───────────────────────────────────────────────────────────
# *        any chars except /
# **       any chars including /
# ?        single char
# [abc]    one of a, b, c
# [!abc]   none of a, b, c
# {a,b,c}  one of a, b, c
# {1..9}   numeric range

# ─── Per-language overrides ──────────────────────────────────────────────────
[*.{js,jsx,ts,tsx,json,yml,yaml,html,css,scss}]
indent_size = 2

[*.{py,rs,go,java,kt,swift,c,h,cpp,hpp}]
indent_size = 4

[Makefile]
indent_style = tab                      # tabs are required, do NOT change

[*.{md,markdown}]
trim_trailing_whitespace = false        # two trailing spaces = hard line break

[*.bat]
end_of_line = crlf                      # Windows batch files

[{package.json,*.lock}]
indent_size = 2

# ─── Disable EditorConfig for a path ────────────────────────────────────────
# [generated/**]
# (leave this section empty — explicit empty section disables defaults here)
```