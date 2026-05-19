---
title: systemd
---

Linux init system and service manager. Manages **units** (services, timers, sockets, mounts, targets, …).

## `systemctl` quick reference

```sh
# Service lifecycle
systemctl start    nginx           # start now
systemctl stop     nginx
systemctl restart  nginx
systemctl reload   nginx           # SIGHUP-style reload, no restart
systemctl enable   nginx           # start at boot
systemctl disable  nginx
systemctl enable --now nginx       # enable + start in one shot
systemctl mask     nginx           # forbid starting (symlink to /dev/null)
systemctl unmask   nginx

# Inspection
systemctl status nginx             # state + recent logs
systemctl is-active nginx
systemctl is-enabled nginx
systemctl list-units --type=service
systemctl list-units --failed
systemctl list-unit-files          # all installed units + enable state
systemctl cat nginx                # show effective unit file(s)
systemctl show nginx               # all properties (key=value)
systemctl edit nginx               # create/edit drop-in override
systemctl edit --full nginx        # edit the full unit file
systemctl daemon-reload            # after editing unit files

# System
systemctl reboot
systemctl poweroff
systemctl suspend
systemctl rescue                   # single-user mode
systemctl get-default              # current default target
systemctl set-default multi-user.target
```

## Unit file locations

| Path                                | Purpose                                  |
|-------------------------------------|------------------------------------------|
| `/usr/lib/systemd/system/`          | Vendor-supplied (package-managed)        |
| `/etc/systemd/system/`              | Local admin units & overrides (wins)     |
| `/run/systemd/system/`              | Runtime-generated (ephemeral)            |
| `~/.config/systemd/user/`           | Per-user units (`systemctl --user ...`)  |
| `/etc/systemd/system/foo.service.d/override.conf` | Drop-in override        |

## Service unit (`/etc/systemd/system/myapp.service`)

```ini
[Unit]
Description=My application
Documentation=https://example.com/docs
After=network-online.target postgresql.service
Wants=network-online.target
Requires=postgresql.service
ConditionPathExists=/etc/myapp/config.yaml

[Service]
Type=simple                        # see types below
ExecStart=/usr/local/bin/myapp --config /etc/myapp/config.yaml
ExecReload=/bin/kill -HUP $MAINPID
ExecStop=/usr/local/bin/myapp stop

User=myapp
Group=myapp
WorkingDirectory=/var/lib/myapp
Environment=NODE_ENV=production
EnvironmentFile=-/etc/myapp/env    # leading '-' = optional

Restart=on-failure
RestartSec=5s
StartLimitBurst=5
StartLimitIntervalSec=60

# Hardening (recommended)
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
PrivateTmp=true
PrivateDevices=true
ReadWritePaths=/var/lib/myapp /var/log/myapp
CapabilityBoundingSet=
AmbientCapabilities=
LockPersonality=true
RestrictSUIDSGID=true
RestrictNamespaces=true
SystemCallFilter=@system-service

[Install]
WantedBy=multi-user.target
```

After creating/editing: `systemctl daemon-reload && systemctl enable --now myapp`.

## `Type=` values

| Type        | When `started` is considered "done"                              |
|-------------|------------------------------------------------------------------|
| `simple`    | Immediately after `ExecStart` is forked (default)                |
| `exec`      | After the binary has been `exec()`ed (stricter than `simple`)    |
| `forking`   | After the parent process exits (use `PIDFile=`)                  |
| `oneshot`   | After the process exits (combine with `RemainAfterExit=yes`)     |
| `notify`    | After the service sends `READY=1` via `sd_notify()`              |
| `dbus`      | After the service acquires its D-Bus name (set `BusName=`)       |

## `Restart=` values

| Value         | Restart on…                                  |
|---------------|----------------------------------------------|
| `no`          | never (default)                              |
| `on-success`  | clean exit                                   |
| `on-failure`  | non-zero exit, signal, timeout, watchdog     |
| `on-abnormal` | signal, timeout, watchdog (not exit code)    |
| `on-watchdog` | watchdog timeout only                        |
| `on-abort`    | uncaught signal                              |
| `always`      | always                                       |

## Drop-in overrides

Override a vendor unit without forking it. `systemctl edit nginx` creates:

```ini
# /etc/systemd/system/nginx.service.d/override.conf
[Service]
Environment=DEBUG=1
# To replace (not append) a list directive, reset it first:
ExecStart=
ExecStart=/usr/sbin/nginx -g 'daemon off;' -c /etc/nginx/custom.conf
```

## Timers (cron replacement)

Two files: a `.service` (what to run) and a `.timer` (when to run).

```ini
# /etc/systemd/system/backup.service
[Unit]
Description=Nightly backup
[Service]
Type=oneshot
ExecStart=/usr/local/bin/backup.sh
```

```ini
# /etc/systemd/system/backup.timer
[Unit]
Description=Run backup nightly
[Timer]
OnCalendar=*-*-* 02:30:00          # daily at 02:30
RandomizedDelaySec=10m             # spread load
Persistent=true                    # run if missed (e.g. machine off)
Unit=backup.service                # optional (defaults to same name)
[Install]
WantedBy=timers.target
```

```sh
systemctl daemon-reload
systemctl enable --now backup.timer
systemctl list-timers              # show all timers + next/last run
```

### `OnCalendar=` examples

```
minutely                                # every minute
hourly                                  # :00 every hour
daily                                   # 00:00 every day
weekly                                  # Mon 00:00
monthly                                 # 1st 00:00
*-*-* 02:30:00                          # every day at 02:30
Mon..Fri *-*-* 09:00                    # weekdays 09:00
*-*-01 00:00:00                         # first of every month
*-*-* 0/2:00:00                         # every 2 hours
2026-12-25 00:00:00                     # one-shot at a specific time
```

Validate: `systemd-analyze calendar 'Mon *-*-* 09:00'`.

### Monotonic timers (relative to events)

```ini
[Timer]
OnBootSec=15min                    # 15 min after boot
OnUnitActiveSec=1h                 # 1h after last activation
OnUnitInactiveSec=30min            # 30min after last finish
```

## Sockets (socket activation)

```ini
# foo.socket
[Socket]
ListenStream=8080
Accept=no
[Install]
WantedBy=sockets.target
```

systemd holds the port; `foo.service` is started on first connection.

## Targets (≈ runlevels)

| Target                    | ≈ Runlevel | Purpose                           |
|---------------------------|------------|-----------------------------------|
| `poweroff.target`         | 0          | Halt                              |
| `rescue.target`           | 1          | Single user                       |
| `multi-user.target`       | 3          | Multi-user, no GUI                |
| `graphical.target`        | 5          | Multi-user, GUI                   |
| `reboot.target`           | 6          | Reboot                            |
| `network-online.target`   | —          | Network has connectivity          |
| `timers.target`           | —          | All timer units                   |

## `journalctl` (logs)

```sh
journalctl -u nginx                # logs for one unit
journalctl -u nginx -f             # follow (tail -f)
journalctl -u nginx --since "1 hour ago"
journalctl -u nginx --since today --until "1 hour ago"
journalctl -u nginx -p err         # priority >= err
journalctl -u nginx -b             # current boot only
journalctl -u nginx -b -1          # previous boot
journalctl --list-boots
journalctl -k                      # kernel messages (dmesg)
journalctl -xe                     # last logs with explanations
journalctl _PID=1234
journalctl --disk-usage
journalctl --vacuum-time=7d        # delete logs older than 7d
journalctl --vacuum-size=500M
```

Priority levels (numeric or name): `0 emerg`, `1 alert`, `2 crit`, `3 err`, `4 warning`, `5 notice`, `6 info`, `7 debug`.

## User services

Run as your user, no root:

```sh
mkdir -p ~/.config/systemd/user
# write ~/.config/systemd/user/myapp.service
systemctl --user daemon-reload
systemctl --user enable --now myapp
loginctl enable-linger $USER       # keep user services running after logout
```

## Debugging

```sh
systemd-analyze                       # boot time summary
systemd-analyze blame                 # slowest units at boot
systemd-analyze critical-chain        # critical path of boot
systemd-analyze verify myapp.service  # syntax + lint
systemd-analyze security myapp        # hardening score
systemctl --failed                    # all failed units
systemctl status myapp -l --no-pager  # full status, no truncation
```

## Common gotchas

- After editing any unit file: `systemctl daemon-reload`.
- Local files in `/etc/systemd/system/` **override** vendor files in `/usr/lib/systemd/system/`.
- For list-valued directives (`ExecStart`, `Environment`), drop-ins **append**. Reset with an empty assignment first to replace.
- `Restart=on-failure` will not loop forever — `StartLimitBurst`/`StartLimitIntervalSec` cap it. If hit, unit enters `failed` state.
- `network.target` does **not** mean the network is up; use `network-online.target` + `Wants=`.
- `Type=simple` is reported "started" the instant the process is forked — even if it crashes 1ms later. Use `Type=notify` for real readiness.
