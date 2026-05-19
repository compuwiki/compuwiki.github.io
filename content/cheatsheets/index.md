---
title: Cheatsheets Index
---

Practical reference sheets — code-heavy, copy-paste-ready. Most are sourced from or inspired by [learnxinyminutes.com](https://learnxinyminutes.com/); annotations and CLI cookbooks are original.

## Programming languages

| File                                                   | Language   |
|--------------------------------------------------------|------------|
| [programming/c.md](programming/c.md)                   | C          |
| [programming/cs.md](programming/cs.md)                 | C#         |
| [programming/go.md](programming/go.md)                 | Go         |
| [programming/java.md](programming/java.md)             | Java       |
| [programming/kotlin.md](programming/kotlin.md)         | Kotlin     |
| [programming/lua.md](programming/lua.md)               | Lua        |
| [programming/python.md](programming/python.md)         | Python     |
| [programming/rust.md](programming/rust.md)             | Rust       |
| [programming/swift.md](programming/swift.md)           | Swift      |
| [programming/typescript.md](programming/typescript.md) | TypeScript |

## Shell & scripting

| File                                       | Topic      |
|--------------------------------------------|------------|
| [shell/bash.md](shell/bash.md)             | Bash       |
| [shell/powershell.md](shell/powershell.md) | PowerShell |

## Markup & styling

| File                                     | Topic    |
|------------------------------------------|----------|
| [markup/html.md](markup/html.md)         | HTML     |
| [markup/latex.md](markup/latex.md)       | LaTeX    |
| [markup/markdown.md](markup/markdown.md) | Markdown |
| [styling/css.md](styling/css.md)         | CSS      |

## Data & config formats

| File                         | Format |
|------------------------------|--------|
| [data/csv.md](data/csv.md)   | CSV    |
| [data/json.md](data/json.md) | JSON   |
| [data/xml.md](data/xml.md)   | XML    |
| [data/yaml.md](data/yaml.md) | YAML   |

## Query languages & filters

| File                                 | Topic                                |
|--------------------------------------|--------------------------------------|
| [query/graphql.md](query/graphql.md) | GraphQL — schema, queries, mutations |
| [query/jq.md](query/jq.md)           | jq — JSON command-line processor     |
| [query/regex.md](query/regex.md)     | Regular expressions (PCRE-style)     |
| [query/sql.md](query/sql.md)         | SQL                                  |

## Text processing

| File                                               | Tool |
|----------------------------------------------------|------|
| [text-processing/awk.md](text-processing/awk.md)   | awk  |
| [text-processing/grep.md](text-processing/grep.md) | grep |
| [text-processing/sed.md](text-processing/sed.md)   | sed  |

## Protocols

| File                                   | Protocol                                    |
|----------------------------------------|---------------------------------------------|
| [protocols/dns.md](protocols/dns.md)   | DNS — records, resolution, dig/host tooling |
| [protocols/http.md](protocols/http.md) | HTTP — methods, status codes, headers, curl |
| [protocols/ssh.md](protocols/ssh.md)   | SSH — keys, forwards, ProxyJump, sshd       |
| [protocols/tcp.md](protocols/tcp.md)   | TCP — handshake, states, ss/tcpdump         |
| [protocols/tls.md](protocols/tls.md)   | TLS — handshake, certs, OpenSSL             |

## Automation

| File                                                         | Topic                                        |
|--------------------------------------------------------------|----------------------------------------------|
| [automation/cron.md](automation/cron.md)                     | cron — schedule syntax, crontab management   |
| [automation/github-actions.md](automation/github-actions.md) | GitHub Actions — workflows, triggers, matrix |
| [automation/make.md](automation/make.md)                     | make / Makefiles                             |
| [automation/systemd.md](automation/systemd.md)               | systemd — units, timers, journalctl          |

## Tools — CLI

| File                                       | Tool   |
|--------------------------------------------|--------|
| [tools/cli/docker.md](tools/cli/docker.md) | Docker |
| [tools/cli/git.md](tools/cli/git.md)       | Git    |
| [tools/cli/nmap.md](tools/cli/nmap.md)     | nmap   |
| [tools/cli/yt-dlp.md](tools/cli/yt-dlp.md) | yt-dlp |

## Tools — Editors

| File                                               | Editor             |
|----------------------------------------------------|--------------------|
| [tools/editors/emacs.md](tools/editors/emacs.md)   | Emacs              |
| [tools/editors/vim.md](tools/editors/vim.md)       | Vim / Neovim       |
| [tools/editors/vscode.md](tools/editors/vscode.md) | Visual Studio Code |

## Config files

Annotated reference configs in each tool's native syntax — copy any block directly into your real config.

| File                                                   | Topic                                     |
|--------------------------------------------------------|-------------------------------------------|
| [config/.editorconfig](config/.editorconfig)           | EditorConfig — cross-editor style rules   |
| [config/.gitconfig](config/.gitconfig)                 | Git — user, aliases, conditional includes |
| [config/docker-compose.yml](config/docker-compose.yml) | Docker Compose v2                         |
| [config/nginx.conf](config/nginx.conf)                 | nginx — http/server/location, TLS, proxy  |
| [config/ssh_config](config/ssh_config)                 | OpenSSH client — Host blocks, forwards    |
| [config/tmux.conf](config/tmux.conf)                   | tmux — prefix, panes, status, plugins     |

## Tree

```
cheatsheets/
├── index.md
├── automation/    cron · github-actions · make · systemd
├── config/        .editorconfig · .gitconfig · docker-compose.yml · nginx.conf · ssh_config · tmux.conf
├── data/          csv · json · xml · yaml
├── markup/        html · latex · markdown
├── programming/   c · cs · go · java · kotlin · lua · python · rust · swift · typescript
├── protocols/     dns · http · ssh · tcp · tls
├── query/         graphql · jq · regex · sql
├── shell/         bash · powershell
├── styling/       css
├── text-processing/  awk · grep · sed
└── tools/
    ├── cli/       docker · git · nmap · yt-dlp
    └── editors/   emacs · vim · vscode
```
