---
title: Visual Studio Code
---

Free, cross-platform editor built on Electron + Monaco. Configuration lives in JSON; functionality is extended via marketplace extensions.

## Cross-platform key conventions

The shortcuts below are listed for **Windows / Linux**. On **macOS**, the universal substitutions are:

| Windows / Linux   | macOS          | Notes                                             |
|-------------------|----------------|---------------------------------------------------|
| `Ctrl`            | `Cmd` (`⌘`)    | Most chords (`Ctrl+S` → `Cmd+S`)                  |
| `Alt`             | `Option` (`⌥`) | `Alt+↑` → `Option+↑`                              |
| `Shift`           | `Shift` (`⇧`)  | Unchanged                                         |
| `Ctrl+Shift+P`    | `Cmd+Shift+P`  | Command Palette                                   |
| `F1`              | `F1`           | Same on every platform                            |
| `Ctrl+K …` chords | `Cmd+K …`      | Same chord, different leader                      |
| `Ctrl+`` `        | `` Ctrl+` ``   | Terminal toggle — `Ctrl` on macOS too             |
| Right `Alt`       | `Option`       | Different behavior with deadkeys on macOS layouts |

A few keys are genuinely different (not a simple `Ctrl→Cmd` swap):

| Action                       | Windows         | Linux                         | macOS                                                        |
|------------------------------|-----------------|-------------------------------|--------------------------------------------------------------|
| Quick fix                    | `Ctrl+.`        | `Ctrl+.`                      | `Cmd+.`                                                      |
| Go to definition             | `F12`           | `F12`                         | `F12` (or `Cmd+Click`)                                       |
| Go back / forward            | `Alt+←` / `→`   | `Ctrl+Alt+-` / `Ctrl+Shift+-` | `Ctrl+-` / `Ctrl+Shift+-`                                    |
| Trigger suggestions          | `Ctrl+Space`    | `Ctrl+Space`                  | `Cmd+Space` collides with Spotlight; default is `Ctrl+Space` |
| Toggle line comment          | `Ctrl+/`        | `Ctrl+/`                      | `Cmd+/`                                                      |
| Block comment                | `Shift+Alt+A`   | `Shift+Alt+A`                 | `Shift+Option+A`                                             |
| Open user settings           | `Ctrl+,`        | `Ctrl+,`                      | `Cmd+,`                                                      |
| Integrated terminal          | `` Ctrl+` ``    | `` Ctrl+` ``                  | `` Ctrl+` `` (NOT Cmd)                                       |
| Show all installed shortcuts | `Ctrl+K Ctrl+S` | `Ctrl+K Ctrl+S`               | `Cmd+K Cmd+S`                                                |

When in doubt: `Cmd+K Cmd+S` (macOS) or `Ctrl+K Ctrl+S` (Windows/Linux) opens the **Keyboard Shortcuts** editor with the live binding for your OS.

## Keyboard shortcuts (Windows / Linux)

```
## General
Ctrl+Shift+P, F1   Show Command Palette
Ctrl+P             Quick Open, Go to File…
Ctrl+Shift+N       New window/instance
Ctrl+Shift+W       Close window/instance
Ctrl+,             User Settings
Ctrl+K Ctrl+S      Keyboard Shortcuts

## Basic editing
Ctrl+X             Cut line (empty selection)
Ctrl+C             Copy line (empty selection)
Alt+↑ / ↓          Move line up/down
Shift+Alt+↓ / ↑    Copy line up/down
Ctrl+Shift+K       Delete line
Ctrl+Enter         Insert line below
Ctrl+Shift+Enter   Insert line above
Ctrl+Shift+\       Jump to matching bracket
Ctrl+] / [         Indent/outdent line
Home / End         Go to beginning/end of line
Ctrl+Home          Go to beginning of file
Ctrl+End           Go to end of file
Ctrl+↑ / ↓         Scroll line up/down
Alt+PgUp / PgDn    Scroll page up/down
Ctrl+Shift+[       Fold region
Ctrl+Shift+]       Unfold region
Ctrl+K Ctrl+[      Fold all subregions
Ctrl+K Ctrl+]      Unfold all subregions
Ctrl+K Ctrl+0      Fold all regions
Ctrl+K Ctrl+J      Unfold all regions
Ctrl+K Ctrl+C      Add line comment
Ctrl+K Ctrl+U      Remove line comment
Ctrl+/             Toggle line comment
Shift+Alt+A        Toggle block comment
Alt+Z              Toggle word wrap

## Navigation
Ctrl+T             Show all Symbols
Ctrl+G             Go to Line...
Ctrl+P             Go to File...
Ctrl+Shift+O       Go to Symbol...
Ctrl+Shift+M       Show Problems panel
F8                 Go to next error or warning
Shift+F8           Go to previous error or warning
Ctrl+Shift+Tab     Navigate editor group history
Alt+← / →          Go back / forward
Ctrl+M             Toggle Tab moves focus

## Search and replace
Ctrl+F             Find
Ctrl+H             Replace
F3 / Shift+F3      Find next/previous
Alt+Enter          Select all occurrences of Find match
Ctrl+D             Add selection to next Find match
Ctrl+K Ctrl+D      Move last selection to next Find match
Alt+C / R / W      Toggle case-sensitive / regex / whole word

## Multi-cursor and selection
Alt+Click               Insert cursor
Ctrl+Alt+↑ / ↓          Insert cursor above / below
Ctrl+U                  Undo last cursor operation
Shift+Alt+I             Insert cursor at end of each selected line
Ctrl+L                  Select current line
Ctrl+Shift+L            Select all occurrences of current selection
Ctrl+F2                 Select all occurrences of current word
Shift+Alt+→             Expand selection
Shift+Alt+←             Shrink selection
Shift+Alt + (drag mouse)              Column (box) selection
Ctrl+Shift+Alt + (arrow)              Column (box) selection
Ctrl+Shift+Alt + PgUp/PgDn            Column (box) selection page up/down

## Rich languages editing
Ctrl+Space, Ctrl+I   Trigger suggestion
Ctrl+Shift+Space     Trigger parameter hints
Shift+Alt+F          Format document
Ctrl+K Ctrl+F        Format selection
F12                  Go to Definition
Alt+F12              Peek Definition
Ctrl+K F12           Open Definition to the side
Ctrl+.               Quick Fix
Shift+F12            Show References
F2                   Rename Symbol
Ctrl+K Ctrl+X        Trim trailing whitespace
Ctrl+K M             Change file language

## Editor management
Ctrl+F4, Ctrl+W      Close editor
Ctrl+K F             Close folder
Ctrl+\               Split editor
Ctrl+ 1 / 2 / 3      Focus into 1st, 2nd or 3rd editor group
Ctrl+K Ctrl+←/→      Focus into previous/next editor group
Ctrl+Shift+PgUp/PgDn Move editor left/right
Ctrl+K ← / →         Move active editor group

## File management
Ctrl+N               New File
Ctrl+O               Open File...
Ctrl+S               Save
Ctrl+Shift+S         Save As...
Ctrl+K S             Save All
Ctrl+F4              Close
Ctrl+K Ctrl+W        Close All
Ctrl+Shift+T         Reopen closed editor
Ctrl+K Enter         Keep preview mode editor open
Ctrl+Tab             Open next
Ctrl+Shift+Tab       Open previous
Ctrl+K P             Copy path of active file
Ctrl+K R             Reveal active file in Explorer
Ctrl+K O             Show active file in new window/instance

## Display
F11                  Toggle full screen
Shift+Alt+0          Toggle editor layout (horizontal/vertical)
Ctrl+ = / -          Zoom in/out
Ctrl+B               Toggle Sidebar visibility
Ctrl+Shift+E         Show Explorer / Toggle focus
Ctrl+Shift+F         Show Search
Ctrl+Shift+G         Show Source Control
Ctrl+Shift+D         Show Debug
Ctrl+Shift+X         Show Extensions
Ctrl+Shift+H         Replace in files
Ctrl+Shift+J         Toggle Search details
Ctrl+Shift+U         Show Output panel
Ctrl+Shift+V         Open Markdown preview
Ctrl+K V             Open Markdown preview to the side
Ctrl+K Z             Zen Mode (Esc Esc to exit)

## Debug
F9                   Toggle breakpoint
F5                   Start/Continue
Shift+F5             Stop
F11 / Shift+F11      Step into/out
F10                  Step over
Ctrl+K Ctrl+I        Show hover

## Integrated terminal
Ctrl+`               Show integrated terminal
Ctrl+Shift+`         Create new terminal
Ctrl+C               Copy selection
Ctrl+V               Paste into active terminal
Ctrl+↑ / ↓           Scroll up/down
Shift+PgUp / PgDn    Scroll page up/down
Ctrl+Home / End      Scroll to top/bottom
```

Full reference: <https://aka.ms/vscodekeybindings> (separate PDFs for Windows, Linux, macOS).

## Command Palette (`Ctrl/Cmd+Shift+P`)

The fastest way to do anything. Some useful patterns:

| Prefix  | What it does                                                       |
|---------|--------------------------------------------------------------------|
| `>`     | Run a command (default when palette is opened with `Ctrl+Shift+P`) |
| (none)  | Go to file by name (also `Ctrl/Cmd+P`)                             |
| `@`     | Go to symbol in current file                                       |
| `#`     | Go to symbol in workspace                                          |
| `:`     | Go to line (`:42` or `:42:10`)                                     |
| `?`     | Show available command modes                                       |
| `edit ` | Filter "Open Settings…" commands                                   |

## Settings

Two layers: **User** (your machine) and **Workspace** (`.vscode/settings.json` in the project — committed to the repo).

```jsonc
// .vscode/settings.json — committed, project-specific
{
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  },
  "editor.rulers": [80, 120],
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": "active",

  "files.eol": "\n",
  "files.insertFinalNewline": true,
  "files.trimTrailingWhitespace": true,
  "files.exclude":   { "**/.DS_Store": true, "**/dist": true },
  "search.exclude":  { "**/node_modules": true, "**/coverage": true },

  "[python]":     { "editor.defaultFormatter": "ms-python.black-formatter" },
  "[typescript]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[markdown]":   { "editor.wordWrap": "on" },

  "terminal.integrated.defaultProfile.windows": "PowerShell",
  "terminal.integrated.cwd": "${workspaceFolder}"
}
```

Open settings UI: `Ctrl/Cmd+,`. Open the JSON directly: command palette → "Preferences: Open User Settings (JSON)".

## Extensions

Browse from the sidebar (`Ctrl+Shift+X`) or the CLI:

```sh
code --list-extensions
code --install-extension dbaeumer.vscode-eslint
code --uninstall-extension ms-python.python
code --list-extensions > extensions.txt        # then `xargs -L1 code --install-extension < …`
```

Pin a set via `extensions.json` in `.vscode/` — VS Code prompts new contributors to install them.

```jsonc
// .vscode/extensions.json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "editorconfig.editorconfig"
  ]
}
```

## Snippets

User snippets: command palette → "Snippets: Configure User Snippets" → pick language. File is JSON.

```jsonc
// typescript.json
{
  "Log named value": {
    "prefix": "lognv",
    "body":   ["console.log('$1:', $1);$0"],
    "description": "Log a variable with its name"
  },
  "React FC": {
    "prefix": "rfc",
    "body": [
      "type ${1:Name}Props = {};",
      "",
      "export function ${1:Name}({}: ${1:Name}Props) {",
      "  return <div>$0</div>;",
      "}"
    ]
  }
}
```

Placeholders: `$1`, `$2` (tab stops), `$0` (final cursor), `${1:default}`, `${TM_FILENAME}`, `${CURRENT_YEAR}`.

## Tasks (`.vscode/tasks.json`)

Run shell commands from the palette / hotkey, parse problems with regex matchers.

```jsonc
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "test",
      "type":  "shell",
      "command": "npm test",
      "group": { "kind": "test", "isDefault": true },
      "presentation": { "reveal": "always", "panel": "dedicated" },
      "problemMatcher": ["$tsc"]
    },
    {
      "label": "build watch",
      "type":  "shell",
      "command": "npm run build -- --watch",
      "isBackground": true,
      "problemMatcher": {
        "owner": "tsc",
        "pattern": { "regexp": "^(.+):(\\d+):(\\d+)\\s+-\\s+error\\s+(.+)$",
                     "file": 1, "line": 2, "column": 3, "message": 4 },
        "background": {
          "activeOnStart": true,
          "beginsPattern": "Starting compilation",
          "endsPattern":   "Found \\d+ errors"
        }
      }
    }
  ]
}
```

Run task: `Ctrl/Cmd+Shift+B` (default build) or palette → "Tasks: Run Task".

## Debug (`.vscode/launch.json`)

```jsonc
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch program",
      "program": "${workspaceFolder}/src/index.ts",
      "runtimeArgs": ["-r", "ts-node/register"],
      "env": { "NODE_ENV": "development" },
      "skipFiles": ["<node_internals>/**"]
    },
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src"
    }
  ],
  "compounds": [
    { "name": "Stack: server + client", "configurations": ["Launch program", "Launch Chrome against localhost"] }
  ]
}
```

## Variables you can use in JSON files

```
${workspaceFolder}        ${file}            ${fileBasename}
${fileDirname}            ${fileExtname}     ${fileBasenameNoExtension}
${relativeFile}           ${lineNumber}      ${selectedText}
${pathSeparator}          ${env:HOME}        ${config:editor.tabSize}
${input:promptName}       ${command:cmd.id}  ${cwd}
```

## Remote & containers

| Mode                       | Extension                            | Use case                          |
|----------------------------|--------------------------------------|-----------------------------------|
| Remote – SSH               | `ms-vscode-remote.remote-ssh`        | Edit code on a server, run there  |
| Dev Containers             | `ms-vscode-remote.remote-containers` | Reproducible, image-based dev env |
| WSL                        | `ms-vscode-remote.remote-wsl`        | Linux toolchain on Windows        |
| GitHub Codespaces          | `GitHub.codespaces`                  | Cloud-hosted dev environments     |
| `code-server` / vscode.dev | —                                    | Web UI for anywhere               |

The `code` CLI works inside any of these (`code .` to open the current dir, `code -r file.txt` to reuse the current window).

## `code` CLI

```sh
code .                                 # open current directory
code file.ts:42:7                      # open at line:column
code --diff a.txt b.txt                # diff view
code --goto file.ts:42                 # explicit
code --new-window
code --reuse-window
code --add ./more-folder               # add to current multi-root workspace
code --wait file                       # block until file is closed (use as $EDITOR)
code --status                          # uptime, mem, GPU info
code --verbose                         # full startup logging
```

On macOS, the CLI is installed via the palette command "Shell Command: Install 'code' command in PATH".

## Multi-root workspaces

A `.code-workspace` file groups multiple folders into one VS Code window.

```jsonc
// project.code-workspace
{
  "folders": [
    { "path": "apps/web" },
    { "path": "apps/api" },
    { "path": "packages/shared" }
  ],
  "settings": { "editor.tabSize": 2 }
}
```

Open with `code project.code-workspace` or via "File → Open Workspace from File…".

## Settings sync

Sign in (top-left, account icon) → choose what to sync: settings, keybindings, extensions, snippets, UI state. Backend is your Microsoft or GitHub account.

## Productivity tips

- **Sticky scroll** (`editor.stickyScroll.enabled`) keeps enclosing scopes pinned at the top — huge in large files.
- **Path Intellisense** — relative-path completion in strings.
- **Bracket pair colorization** is built in now; turn it on.
- **Merge editor** (3-way) — set `git.mergeEditor: true`; resolve conflicts side-by-side.
- **Profiles** (palette → "Profiles: Create Profile…") — switch entire UI + extension sets (e.g. *Frontend* vs *Rust* vs *Notes*).
- **Notebook editor** — `.ipynb` and custom notebooks render natively.
- **Workspace trust** — disable code execution / extensions for unfamiliar repos until you mark them trusted.

## Differences worth knowing — macOS specifics

- **Open from terminal**: install the `code` shell command (palette → "Shell Command: Install 'code' command in PATH").
- **Spotlight collides with `Cmd+Space`** → leave VS Code's suggestion trigger on `Ctrl+Space`, or rebind in *Keyboard Shortcuts*.
- **`Cmd+Q`** quits the app entirely (not just the window). Many users disable it via "Apple Menu → System Settings → Keyboard → Keyboard Shortcuts → App Shortcuts" for VS Code.
- **Right-click on trackpad** — two-finger tap or `Ctrl+Click`.
- The macOS keybinding file is `keybindings.json`; same JSON shape as Windows/Linux but with `cmd+` instead of `ctrl+` in the `key` field.

## Differences worth knowing — Linux specifics

- Some distros ship `code-oss` (the open-source build) instead of Microsoft's branded `code` — the Marketplace endpoint is different and proprietary extensions (Pylance, C#, Remote-SSH) may be unavailable. Install the official `.deb`/`.rpm` from <https://code.visualstudio.com> if you need them.
- `Ctrl+Alt+T` is GNOME/Ubuntu's terminal shortcut — it doesn't collide with VS Code (which uses `` Ctrl+` ``).
- Wayland: hardware acceleration sometimes glitches. If you see rendering issues, launch with `code --disable-gpu` or `--ozone-platform=wayland`.
- Snap and Flatpak packages run sandboxed — file pickers and the integrated terminal can behave differently (e.g. limited `$PATH`).
