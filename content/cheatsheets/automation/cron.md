---
title: cron
---

Unix time-based job scheduler. Reads `crontab` files and runs commands at specified times.

## Schedule syntax

```
┌───────────── minute        (0–59)
│ ┌─────────── hour          (0–23)
│ │ ┌───────── day of month  (1–31)
│ │ │ ┌─────── month         (1–12 or JAN–DEC)
│ │ │ │ ┌───── day of week   (0–7 or SUN–SAT; 0 and 7 = Sunday)
│ │ │ │ │
* * * * *  command_to_run
```

## Operators

| Symbol  | Meaning              | Example   | Matches                        |
|---------|----------------------|-----------|--------------------------------|
| `*`     | every value          | `* * * * *` | every minute                 |
| `,`     | list                 | `0,15,30,45 * * * *` | :00, :15, :30, :45  |
| `-`     | range                | `0 9-17 * * *` | every hour 09:00–17:00    |
| `/`     | step                 | `*/5 * * * *` | every 5 minutes            |
| combined| range + step         | `0 8-18/2 * * *` | every 2h between 08–18  |

## Common patterns

```cron
# Every minute
* * * * *  /path/to/script.sh

# Every 5 minutes
*/5 * * * *  /path/to/script.sh

# Top of every hour
0 * * * *  /path/to/script.sh

# Daily at 02:30
30 2 * * *  /path/to/backup.sh

# Weekdays at 09:00
0 9 * * 1-5  /path/to/report.sh

# First day of every month at midnight
0 0 1 * *  /path/to/monthly.sh

# Every Sunday at 04:00
0 4 * * 0  /path/to/weekly.sh
```

## Named shortcuts (non-POSIX, widely supported)

| Shortcut    | Equivalent      | Meaning                  |
|-------------|-----------------|--------------------------|
| `@reboot`   | —               | Run once at startup      |
| `@yearly`   | `0 0 1 1 *`     | Once a year (Jan 1, 00:00) |
| `@monthly`  | `0 0 1 * *`     | Once a month             |
| `@weekly`   | `0 0 * * 0`     | Once a week (Sunday)     |
| `@daily`    | `0 0 * * *`     | Once a day at midnight   |
| `@hourly`   | `0 * * * *`     | Once an hour at :00      |

## Managing crontabs

```sh
crontab -e            # edit current user's crontab
crontab -l            # list current user's jobs
crontab -r            # remove current user's crontab (no confirmation!)
crontab -u alice -e   # edit alice's crontab (root only)

sudo systemctl status cron      # check cron daemon (Debian/Ubuntu)
sudo systemctl status crond     # (RHEL/Fedora)
```

## System crontabs

- `/etc/crontab` — system-wide; extra **user** field between schedule and command
- `/etc/cron.d/*` — drop-in files, same format as `/etc/crontab`
- `/etc/cron.{hourly,daily,weekly,monthly}/` — scripts executed at that interval (no schedule line needed)

```cron
# /etc/crontab format (note the user field)
0 3 * * *  root  /usr/local/bin/cleanup.sh
```

## Environment

cron runs with a **minimal environment**. Common gotchas:

```cron
# Set env vars at top of crontab
SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
MAILTO=ops@example.com   # mail stdout/stderr (empty = disable)

# Use absolute paths in commands — cron's $PATH is tiny
0 * * * *  /usr/bin/python3 /opt/app/job.py
```

## Logging and output

```cron
# Discard all output
*/5 * * * *  /path/to/job.sh >/dev/null 2>&1

# Append to a logfile
*/5 * * * *  /path/to/job.sh >> /var/log/job.log 2>&1

# Capture stderr only
*/5 * * * *  /path/to/job.sh 2>> /var/log/job.err
```

System cron logs: `/var/log/syslog` (Debian) or `journalctl -u cron`.

## Locking (prevent overlapping runs)

```cron
# flock — exits immediately if lock held
*/5 * * * *  flock -n /tmp/job.lock /path/to/job.sh
```

## Gotchas

- **Percent signs** (`%`) are interpreted as newlines in commands — escape as `\%` or quote the command.
- **DST** can cause jobs to run twice or skip on transition days.
- **Day-of-month and day-of-week** are OR'd, not AND'd: `0 0 1 * 1` runs every 1st **or** every Monday.
- Jobs do not run if the machine is asleep — use `anacron` for laptops.
- The crontab file must end with a **newline**.

## Validation

```sh
# Dry-run check (syntax)
crontab -l | crontab -

# Online: crontab.guru — paste expression, get human-readable preview
```
