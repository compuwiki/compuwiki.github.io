---
title: jq
---

Command-line JSON processor. Reads JSON, applies a filter, writes JSON.

```sh
jq '.'         file.json       # pretty-print
echo '{}' | jq '.'
curl -s api/x | jq '.items[].name'
```

## Invocation flags

| Flag          | Effect                                                  |
|---------------|---------------------------------------------------------|
| `-r`          | raw output (strings without quotes — pipe to `xargs`)   |
| `-R`          | raw input (each line as a string)                       |
| `-s`          | slurp — read all input into a single array              |
| `-c`          | compact output (one line per value)                     |
| `-n`          | null input — start from `null` (build from scratch)     |
| `-e`          | exit 1 if last output is `null`/`false`                 |
| `-a`          | ASCII output                                            |
| `--arg k v`   | bind `$k` to the string `v`                             |
| `--argjson k v` | bind `$k` to the parsed-JSON `v`                      |
| `--slurpfile k file` | bind `$k` to the parsed contents of `file`       |
| `-f file.jq`  | read filter from a file                                 |

## Identity, access, slicing

```jq
.                              # input as-is
.foo                           # field
.foo.bar                       # nested field
.["foo bar"]                   # bracket form (for weird keys)
.foo?                          # null instead of error if missing
.[0]                           # array index
.[-1]                          # last element
.[2:5]                         # slice (indices 2..4)
.[]                            # iterate: emit each element
.foo[]                         # all array elements under .foo
keys                           # sorted list of keys
keys_unsorted
values
length                         # array length / string length / object key count
has("foo")
in({"a":1})                    # for strings: is this key in given object?
```

## Pipes, commas, parens

```jq
.a | .b                        # pipe — output of left feeds right
.a, .b                         # comma — emit BOTH values (two outputs)
(.a + .b) | tostring           # parens group
```

## Constructing values

```jq
{ name: .user.name, id: .user.id }                # object literal
{ name, id }                                      # shorthand: { name: .name, id: .id }
{ (.k): .v }                                      # computed key
[.a, .b, .c]                                      # array literal
[.items[].name]                                   # collect iterator into array
```

## Operators

```jq
.a + .b         # add (numbers), concat (strings/arrays), merge (objects, right wins)
.a - .b         # subtract (numbers), array difference
.a * .b         # multiply; for objects: deep merge
.a / .b         # divide; for strings: split
.a % .b         # modulo
== != < <= > >= and or not
//              # alternative — left if not null/false, else right:  .x // "default"
```

## Selection and filtering

```jq
.[] | select(.age >= 18)
.[] | select(.tags | index("urgent"))
.[] | select(.name | test("^A"; "i"))             # regex match
map(select(.active))                              # keep matching elements
.items | map(.price) | add                        # sum of prices
group_by(.category)                               # array of arrays, grouped
unique_by(.id)
sort_by(.created_at) | reverse
min_by(.score)  max_by(.score)
```

## Transformation

```jq
map(.name)                              # = [.[] | .name]
map(. + {tagged: true})                 # add a field to every item
to_entries                              # {"a":1} → [{"key":"a","value":1}]
from_entries                            # inverse
with_entries(.value |= (. * 2))         # transform each value
paths                                   # all paths to leaf values
paths(type == "number")                 # paths whose leaf is a number
leaf_paths
getpath(["a","b"])
setpath(["a","b"]; 42)
delpaths([["a","b"]])
```

## Strings

```jq
.name | ascii_downcase
.name | ascii_upcase
.body | ltrimstr("Re: ")
.body | rtrimstr(".txt")
.text | split(",")
["a","b","c"] | join(",")
.s   | test("^foo"; "i")                # regex test (PCRE-like)
.s   | match("(\\d+)").captures         # named/unnamed regex captures
.s   | scan("\\w+")                     # all matches
.s   | sub("foo"; "bar")                # first match
.s   | gsub("foo"; "bar")               # all matches
@json  @csv  @tsv  @sh  @uri  @base64  @base64d   # formatters: "\(.x) is \(.y)" | @csv
```

## Update assignment

```jq
.name   = "X"               # set
.name  |= ascii_upcase      # update through pipe (read-modify-write)
.tags  += ["new"]           # append
.score //= 0                # set if null/false (default)
del(.password, .secret)     # delete
```

## Variables, functions, conditionals

```jq
.items[] | .price as $p | $p * 1.2

if .age >= 18 then "adult" else "minor" end

if   .score > 90 then "A"
elif .score > 80 then "B"
elif .score > 70 then "C"
else "F" end

# Define a function
def double: . * 2;
def discount($pct): . - (. * $pct / 100);
.price | discount(20)

# try/catch
try .may_fail catch "default"
```

## Recursion

```jq
..                          # recursive descent — emit every subvalue
.. | numbers                # every number anywhere
.. | objects | select(has("id"))
recurse(.children[]?)       # walk a tree via .children
```

## Reducing and folding

```jq
reduce .[] as $x (0; . + $x.amount)           # sum
foreach .[] as $x (0; . + $x.amount; .)       # running totals
```

## Cookbook

```sh
# Pretty-print a stream of JSON objects (one per line)
kubectl get pods -o json | jq '.items[].metadata.name'

# Convert array of objects → CSV (header + rows)
jq -r '(.[0]|keys_unsorted) as $h | $h, (.[] | [.[$h[]]]) | @csv' data.json

# Read multiple files into one array
jq -s '.' a.json b.json

# Inline edit (jq has no -i — use a tempfile)
tmp=$(mktemp) && jq '.version = "1.2.3"' pkg.json > "$tmp" && mv "$tmp" pkg.json

# Top-N
jq 'sort_by(.score) | reverse | .[0:5]' items.json

# Flatten nested arrays one level
jq '[.[][]]' nested.json

# Diff-friendly key sort
jq -S '.' a.json > a.sorted.json
```
