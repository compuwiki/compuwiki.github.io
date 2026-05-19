---
title: Regex
---

Regular expressions — pattern language for matching text. Flavors differ slightly (PCRE, POSIX BRE/ERE, JS, Python `re`, .NET, Go RE2). This sheet uses **PCRE-style** unless noted.

## Character classes

| Pattern        | Matches                                            |
|----------------|----------------------------------------------------|
| `.`            | any character except newline (unless `s`/dotall)   |
| `\d` / `\D`    | digit / non-digit                                  |
| `\w` / `\W`    | word char `[A-Za-z0-9_]` / non-word                |
| `\s` / `\S`    | whitespace / non-whitespace                        |
| `\b` / `\B`    | word boundary / non-boundary                       |
| `[abc]`        | any of a, b, c                                     |
| `[^abc]`       | none of a, b, c                                    |
| `[a-z]`        | range                                              |
| `[[:alpha:]]`  | POSIX class (alpha, digit, alnum, space, upper, lower, punct, xdigit, …) |
| `\p{L}`        | Unicode property — any letter (Unicode mode)       |
| `\P{L}`        | inverse Unicode property                           |

## Anchors

| Pattern  | Meaning                                            |
|----------|----------------------------------------------------|
| `^`      | start of string (or line in multiline mode)        |
| `$`      | end of string (or line in multiline mode)          |
| `\A`     | start of string (always)                           |
| `\z`     | end of string (always)                             |
| `\Z`     | end of string, optionally before final newline     |
| `\b`     | word boundary                                      |

## Quantifiers

| Pattern   | Meaning                            |
|-----------|------------------------------------|
| `*`       | 0 or more (greedy)                 |
| `+`       | 1 or more                          |
| `?`       | 0 or 1                             |
| `{n}`     | exactly n                          |
| `{n,}`    | n or more                          |
| `{n,m}`   | n to m                             |
| `*?` `+?` `??` `{n,m}?` | **lazy** (match as little as possible) |
| `*+` `++` `?+` `{n,m}+` | **possessive** (no backtracking — PCRE) |

```
".*"     greedy: matches everything between first and last "
".*?"    lazy:   matches one quoted token
```

## Groups

```
(abc)          capturing group #1
(?:abc)        non-capturing group
(?P<name>abc)  named group (Python / PCRE)
(?<name>abc)   named group (.NET / modern PCRE / JS)
\1  \2         backreference to group N
\k<name>       named backreference
```

## Alternation

```
cat|dog|bird          one of these (try left-to-right)
gr(a|e)y              "gray" or "grey"
```

## Lookaround (zero-width assertions)

```
(?=foo)        positive lookahead   — followed by "foo"
(?!foo)        negative lookahead   — NOT followed by "foo"
(?<=foo)       positive lookbehind  — preceded by "foo"
(?<!foo)       negative lookbehind  — NOT preceded by "foo"
```

Examples:

```
\d+(?=px)            digits followed by "px"  →  in "12px" matches "12"
(?<=\$)\d+           digits preceded by "$"   →  in "$42" matches "42"
^(?!.*admin).*$      any line not containing "admin"
```

## Flags / modifiers

| Flag | Name           | Effect                                         |
|------|----------------|------------------------------------------------|
| `i`  | case-insensitive | A == a                                       |
| `m`  | multiline      | `^`/`$` match line starts/ends                 |
| `s`  | dotall         | `.` matches newline too                        |
| `x`  | extended       | ignore whitespace + `#` comments in pattern    |
| `u`  | unicode        | full Unicode (`\w` covers non-ASCII, etc.)     |
| `g`  | global (JS)    | find all matches (not a flag in most engines)  |

Inline form: `(?i)foo` — enable `i` from this point on. `(?i:foo)` — only inside group.

## Escaping

Special characters that often need `\`: `. ^ $ * + ? ( ) [ ] { } | \`. Inside `[...]`, most of these are literal; you only need to escape `]`, `\`, `^` (if first), and `-` (if in the middle).

## Substitution (replacement strings)

Backreferences inside the replacement:

```
$1 $2 $&        group 1, group 2, whole match           (most engines)
\1 \2 \0        same, sed / Perl style
${name}         named group
$$              literal $
```

```sh
sed -E 's/([A-Z])/_\L\1/g' file        # lowercase + underscore (GNU sed: \L\U\E)
perl -pe 's/(\w+)\s+(\w+)/\2 \1/'      # swap pairs
```

## Common patterns

```
^\s*$                             blank line
^\s+|\s+$                         leading/trailing whitespace (trim)
\b\d{4}-\d{2}-\d{2}\b             ISO date
\b(?:\d{1,3}\.){3}\d{1,3}\b       IPv4 (loose — doesn't validate 0–255)
^(?=.*\d)(?=.*[A-Z]).{8,}$        ≥8 chars, ≥1 digit, ≥1 uppercase
^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$    email (pragmatic)
https?://[^\s)>"]+                URL (loose)
^#{1,6}\s+.+$                     markdown heading
\b[0-9a-f]{7,40}\b                git short/long SHA
```

## Engine differences (gotchas)

- **POSIX BRE** (`grep`, `sed` without `-E`): `(`, `)`, `{`, `}`, `|`, `+`, `?` must be escaped (`\(`, `\|`, …) to get their special meaning. Use `-E`/`egrep` for ERE.
- **Go (RE2)** and **rust `regex`**: linear-time, no backreferences, no lookaround.
- **JavaScript** (pre-ES2018): no lookbehind. Modern engines support it.
- `\d` in **PCRE without `/u`** = `[0-9]`. With Unicode mode it includes all decimal digits.
- `.` does **not** match newline by default — turn on `s`/dotall if you need it.

## Tool quick reference

```sh
# grep — extended regex, only matching part
grep -Eo '\b\w+@\w+\.\w+\b' file

# ripgrep — PCRE2 with -P (lookarounds etc.)
rg -P '(?<=\$)\d+(?=\b)' .

# sed — extended regex with -E (POSIX) / -r (GNU)
sed -E 's/(foo)bar/\1baz/g' file

# awk — ERE, /pattern/ matching
awk '/^ERROR/ { print $0 }' app.log

# perl — full PCRE, one-liners
perl -nE 'say $1 if /name=([^&]+)/' file
```

```python
# Python
import re
m = re.search(r'(?P<year>\d{4})-(?P<month>\d{2})', s)
m.group('year')                       # named capture
re.findall(r'\d+', s)
re.sub(r'\s+', ' ', s)
re.compile(r'foo', re.I | re.M)
```

```js
// JavaScript
const m = "abc 123".match(/(\w+)\s+(\d+)/);   // m[1] = "abc", m[2] = "123"
"foo foo".replace(/foo/g, "bar");             // global
const re = /(?<year>\d{4})/;                  // named groups
[..."a1 b2 c3".matchAll(/\w(\d)/g)];          // iterate all matches
```

## Testing and debugging

- [regex101.com](https://regex101.com) — interactive, explains each token, picks PCRE/JS/Python/Go flavor.
- [regexr.com](https://regexr.com) — JS flavor.
- Use **named groups** + comments (`x` flag) for any regex over ~30 characters — future-you will thank you.
- **Catastrophic backtracking**: nested unbounded quantifiers like `(a+)+$` on `"aaaaaaaaaaaaaaaaaaaaa!"` explode. Prefer possessive quantifiers `(a++)+$` or atomic groups `(?>a+)+$`, or use an engine like RE2.
