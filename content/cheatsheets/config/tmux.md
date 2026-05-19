---
title: tmux 
---

```conf
# tmux configuration — ~/.tmux.conf (or ~/.config/tmux/tmux.conf)
# Docs: `man tmux`
#
# Reload after editing:    tmux source-file ~/.tmux.conf
# List all key bindings:   tmux list-keys
# Show all options:        tmux show-options -g    /  show-window-options -g
#
# Default prefix is C-b. Many users rebind to C-a (screen-style); below does that.

# ─── Server / global options ────────────────────────────────────────────────
set -g default-terminal "tmux-256color"
set -ga terminal-overrides ",xterm-256color:RGB"   # true-color (24-bit) support
set -g  history-limit 50000                        # scrollback lines per pane
set -sg escape-time   10                           # faster ESC in vim
set -g  focus-events  on
set -g  mouse         on                           # click panes / drag to resize / scroll
set -g  base-index    1                            # windows start at 1
setw -g pane-base-index 1                          # panes too
set -g  renumber-windows on                        # close window → renumber

# ─── Prefix: C-b → C-a ───────────────────────────────────────────────────────
unbind C-b
set -g prefix C-a
bind C-a send-prefix                               # press C-a twice to send literal C-a

# ─── Reload config ──────────────────────────────────────────────────────────
bind r source-file ~/.tmux.conf \; display-message "tmux.conf reloaded"

# ─── Pane splits (intuitive characters; keep defaults too) ──────────────────
bind | split-window -h -c "#{pane_current_path}"
bind - split-window -v -c "#{pane_current_path}"
bind c new-window      -c "#{pane_current_path}"   # open new window in CWD

# ─── Vim-style pane navigation ──────────────────────────────────────────────
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R

# Resize panes (repeatable: hold the key without re-pressing prefix)
bind -r H resize-pane -L 5
bind -r J resize-pane -D 5
bind -r K resize-pane -U 5
bind -r L resize-pane -R 5

# ─── Copy mode (vi keys) ────────────────────────────────────────────────────
setw -g mode-keys vi
bind v copy-mode
bind -T copy-mode-vi v     send-keys -X begin-selection
bind -T copy-mode-vi y     send-keys -X copy-pipe-and-cancel "pbcopy"   # macOS
# Linux: pipe to `xclip -selection clipboard` or `wl-copy`
bind -T copy-mode-vi MouseDragEnd1Pane send-keys -X copy-pipe-and-cancel "pbcopy"
bind p paste-buffer

# ─── Status bar ─────────────────────────────────────────────────────────────
set -g status              on
set -g status-interval     5
set -g status-position     bottom
set -g status-justify      left
set -g status-style        "bg=#1e1e2e fg=#cdd6f4"

set -g status-left-length  40
set -g status-right-length 80
set -g status-left  "#[bold] #S #[default]| "
set -g status-right "#{?client_prefix,⌨ ,}%Y-%m-%d  %H:%M "

setw -g window-status-current-style "bg=#89b4fa fg=#1e1e2e bold"
setw -g window-status-format         " #I:#W "
setw -g window-status-current-format " #I:#W "

# Pane borders
set -g pane-border-style        "fg=#45475a"
set -g pane-active-border-style "fg=#89b4fa"

# ─── Misc niceties ──────────────────────────────────────────────────────────
set -g  display-time      2000                     # status messages stay 2s
set -g  display-panes-time 1500                    # `prefix q` pane numbers
set -g  set-titles        on
set -g  set-titles-string "#S / #W"
set -g  monitor-activity  on
set -g  visual-activity   off
set -g  allow-passthrough on                       # let apps emit OSC52, images, etc.

# ─── Optional: plugins via TPM (https://github.com/tmux-plugins/tpm) ────────
# Install TPM:  git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
# Then: prefix + I to install plugins, prefix + U to update.
# set -g @plugin 'tmux-plugins/tpm'
# set -g @plugin 'tmux-plugins/tmux-sensible'
# set -g @plugin 'tmux-plugins/tmux-resurrect'      # save / restore sessions
# set -g @plugin 'tmux-plugins/tmux-continuum'      # auto-save every 15 min
# set -g @continuum-restore 'on'
# run '~/.tmux/plugins/tpm/tpm'                     # keep this last

# ─── Cheatsheet of default keys (prefix = C-a after rebind) ─────────────────
# prefix ?         show all bindings
# prefix d         detach (re-attach with `tmux a` or `tmux a -t name`)
# prefix s         interactive session list
# prefix $         rename session
# prefix c         new window
# prefix , / &     rename / kill window
# prefix n / p     next / previous window
# prefix 0..9      jump to window by number
# prefix x         kill current pane
# prefix z         zoom current pane (toggle fullscreen)
# prefix space     cycle layouts
# prefix { / }     swap pane with previous / next
# prefix q         show pane numbers (press number to focus)
# prefix [         enter copy mode (q to exit)
# prefix ]         paste most recent buffer
#
# CLI:
#   tmux new -s work               new session named "work"
#   tmux ls                        list sessions
#   tmux a -t work                 attach to "work"
#   tmux kill-session -t work
#   tmux kill-server               nuke everything
```
