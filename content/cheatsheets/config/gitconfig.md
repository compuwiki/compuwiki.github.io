---
title: Git Config
---

```conf
# Git configuration — annotated reference.
# Locations (later wins):
#   /etc/gitconfig                      system    (git config --system)
#   ~/.gitconfig  or  ~/.config/git/config   user (git config --global)
#   <repo>/.git/config                  repo     (git config --local)
#   <worktree>/config.worktree          worktree (git config --worktree)
# Commands:
#   git config --global -e              edit user config
#   git config --global user.name "X"   set a value
#   git config --list --show-origin     show all values + where they came from

[user]
    name  = Your Name
    email = you@example.com
    signingkey = AAAA1111BBBB2222         # GPG key id, or SSH key path (with gpg.format = ssh)

[core]
    editor          = nvim                 # also: code --wait, vim, nano
    autocrlf        = input                # Linux/macOS: input | Windows: true
    pager           = less -FRX
    excludesfile    = ~/.gitignore_global
    attributesfile  = ~/.gitattributes_global
    fsmonitor       = true                 # built-in filesystem monitor (faster status on big repos)
    untrackedCache  = true

[init]
    defaultBranch = main

[pull]
    rebase = true                          # rebase instead of merge on `git pull`
[push]
    default       = simple                 # push current branch to upstream of same name
    autoSetupRemote = true                 # `git push` on new branch sets upstream automatically
    followTags    = true                   # push annotated tags reachable from pushed commits
[fetch]
    prune     = true                       # delete remote-tracking refs that no longer exist
    pruneTags = true
[rebase]
    autoStash  = true                      # stash dirty worktree before rebase, pop after
    autoSquash = true                      # honor `fixup!` / `squash!` commits

[merge]
    conflictstyle = zdiff3                 # 3-way + base, with redundant context removed
    ff            = false                  # require explicit merge commits on `git merge`
[rerere]
    enabled = true                         # remember conflict resolutions

[diff]
    algorithm     = histogram              # also: myers (default), patience, minimal
    colorMoved    = zebra                  # highlight moved lines
    mnemonicPrefix = true                  # i/ w/ c/ instead of a/ b/

[color]
    ui = auto

[commit]
    gpgsign = true                         # sign every commit
    verbose = true                         # include diff in commit-message editor
[tag]
    gpgsign = true

[gpg]
    format = openpgp                       # or `ssh` to sign with an SSH key
# [gpg "ssh"]
#     allowedSignersFile = ~/.config/git/allowed_signers

# ─── Aliases ─────────────────────────────────────────────────────────────────
[alias]
    s   = status -sb
    co  = checkout
    sw  = switch
    cm  = commit -m
    ca  = commit --amend
    can = commit --amend --no-edit
    lg  = log --graph --oneline --decorate --all
    last = log -1 HEAD --stat
    unstage = reset HEAD --
    undo    = reset --soft HEAD^
    aliases = config --get-regexp ^alias\\.

# ─── URL rewrites ────────────────────────────────────────────────────────────
# Force SSH for github.com even if the remote was cloned via https://
[url "git@github.com:"]
    insteadOf = https://github.com/

# ─── Conditional includes (per-directory identity) ───────────────────────────
# Use a work email under ~/work, personal everywhere else.
[includeIf "gitdir:~/work/"]
    path = ~/.gitconfig-work
[includeIf "gitdir:~/personal/"]
    path = ~/.gitconfig-personal
# Also: [includeIf "onbranch:main"]  and  [includeIf "hasconfig:remote.*.url:git@github.com:org/*"]

# ─── Credential helper ───────────────────────────────────────────────────────
[credential]
    helper = cache --timeout=3600          # Linux
#   helper = manager                       # Windows (Git Credential Manager)
#   helper = osxkeychain                   # macOS

# ─── LFS (if installed) ──────────────────────────────────────────────────────
[filter "lfs"]
    clean    = git-lfs clean -- %f
    smudge   = git-lfs smudge -- %f
    process  = git-lfs filter-process
    required = true
```
