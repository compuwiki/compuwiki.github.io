---
title: SSH
---

Secure Shell — encrypted remote login, file transfer, and tunneling. TCP port **22** by default.

> For client config syntax, see [config/ssh_config](../config/ssh_config). This file is about the protocol and CLI usage.

## Quickstart

```sh
ssh user@host                          # login
ssh -p 2222 user@host                  # custom port
ssh -i ~/.ssh/key user@host            # specific identity
ssh user@host 'uname -a'               # run one command, then exit
ssh -t user@host 'sudo journalctl -f'  # force pseudo-TTY (needed for interactive sudo)
exit                                   # close session  (or Ctrl-D)
```

Escape sequences inside an interactive session (newline → `~`):

```
~.    disconnect immediately
~^Z   suspend ssh (background)
~#    list forwarded connections
~?    list all escapes
```

## Key types and generation

| Type      | Size              | Use today?                |
|-----------|-------------------|---------------------------|
| `ed25519` | 256-bit           | **Preferred** — fast, secure, short |
| `ecdsa`   | 256/384/521       | OK; some hardware tokens only support this |
| `rsa`     | ≥ 3072 bits       | OK if ed25519 isn't supported by server |
| `dsa`     | 1024              | Disabled in OpenSSH ≥ 7   |

```sh
ssh-keygen -t ed25519 -C "you@example.com"
ssh-keygen -t rsa -b 4096 -C "you@example.com"

# Inspect / fingerprint
ssh-keygen -lf ~/.ssh/id_ed25519.pub
ssh-keygen -lvf ~/.ssh/id_ed25519.pub   # ASCII-art randomart

# Change passphrase on existing key
ssh-keygen -p -f ~/.ssh/id_ed25519
```

Install pubkey on a server (appends to `~/.ssh/authorized_keys`, fixes perms):

```sh
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@host
# or manually:
cat ~/.ssh/id_ed25519.pub | ssh user@host \
  'umask 077; mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys'
```

## Agent (don't retype passphrases)

```sh
eval "$(ssh-agent -s)"          # start agent (most shells do this automatically)
ssh-add ~/.ssh/id_ed25519       # load key (prompts once for passphrase)
ssh-add -l                      # list loaded keys
ssh-add -D                      # remove all keys
ssh-add -t 3600 key             # auto-expire after 1h
ssh -A user@host                # forward agent — only to trusted hosts!
```

## Port forwarding

```
ssh -L  local_port:target_host:target_port  jump_host    # local  forward
ssh -R  remote_port:target_host:target_port jump_host    # remote forward
ssh -D  socks_port                          jump_host    # dynamic = SOCKS5
ssh -N -f …                                              # no remote command, background
```

Examples:

```sh
# Reach a DB that's only accessible from `bastion`
ssh -L 5432:db.internal:5432 bastion        # then connect to localhost:5432

# Expose my local dev server on the remote
ssh -R 9000:localhost:3000 remote           # remote :9000 → my :3000

# SOCKS proxy to route browser traffic through bastion
ssh -D 1080 -N bastion                      # set browser SOCKS5 = localhost:1080
```

Bind to non-loopback on the receiving side requires `GatewayPorts yes` (sshd_config) for `-R`, or `0.0.0.0:port:…` syntax for `-L`.

## ProxyJump (multi-hop)

```sh
ssh -J bastion user@private-host            # one hop
ssh -J jump1,jump2 user@target              # chain
```

Older equivalent: `-o ProxyCommand="ssh -W %h:%p bastion"`.

## File transfer

```sh
scp file user@host:/path/                   # copy file to host
scp -r dir user@host:/path/                 # recurse
scp -P 2222 file user@host:/                # custom port (capital P)
scp user@host1:/a user@host2:/b             # host → host (transits through you)

# sftp — interactive (or batched with -b)
sftp user@host
sftp> put localfile
sftp> get remotefile
sftp> bye

# rsync over ssh — incremental, resumable, the right answer for big trees
rsync -avzP -e ssh ./dir/ user@host:/dest/
rsync -avzP --delete user@host:/src/ ./mirror/
```

## Useful CLI flags

| Flag               | Purpose                                                  |
|--------------------|----------------------------------------------------------|
| `-v` `-vv` `-vvv`  | Increase debug verbosity                                 |
| `-G host`          | Print effective config for `host` (no connect)           |
| `-T`               | Disable pseudo-TTY (for piping)                          |
| `-t`               | Force pseudo-TTY (for interactive commands over ssh)     |
| `-N`               | Don't run a remote command (forward-only)                |
| `-f`               | Background after auth                                    |
| `-q`               | Quiet                                                    |
| `-o Opt=value`     | Inline any `ssh_config` directive                        |
| `-F file`          | Use alternate client config                              |
| `-i file`          | Use specific identity                                    |
| `-J host[:port]`   | ProxyJump                                                |
| `-L/-R/-D`         | Forwards (see above)                                     |
| `-C`               | Compression (only useful on slow links)                  |
| `-c cipher`        | Force specific cipher                                    |
| `-m mac`           | Force specific MAC                                       |
| `-Q kind`          | List supported algorithms: `cipher`, `mac`, `kex`, `key` |

## known_hosts

When you first connect, the server's host key is shown for confirmation, then pinned in `~/.ssh/known_hosts`. A subsequent **changed** host key looks like:

```
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
```

Either the server was reinstalled, or you're being MITM'd. Verify by other means (cloud console, OOB) and then:

```sh
ssh-keygen -R host                       # remove old entry
# or edit ~/.ssh/known_hosts
```

`StrictHostKeyChecking accept-new` (in `ssh_config`) auto-pins new hosts but still rejects changed ones — good default.

## Server side — `/etc/ssh/sshd_config`

```ini
Port 22
AddressFamily any
ListenAddress 0.0.0.0

# Auth
PermitRootLogin       prohibit-password    # disable password root logins
PasswordAuthentication no                  # key-only
PubkeyAuthentication  yes
AuthenticationMethods publickey            # require pubkey
MaxAuthTries          3
LoginGraceTime        30

# Algorithms (modern defaults)
KexAlgorithms          curve25519-sha256,sntrup761x25519-sha512@openssh.com
HostKeyAlgorithms      ssh-ed25519,rsa-sha2-512
Ciphers                chacha20-poly1305@openssh.com,aes256-gcm@openssh.com
MACs                   hmac-sha2-512-etm@openssh.com

# Hardening
AllowUsers             alice bob@10.0.0.0/24
PermitEmptyPasswords   no
X11Forwarding          no
AllowTcpForwarding     yes
ClientAliveInterval    300
ClientAliveCountMax    2
```

```sh
sudo sshd -t                          # test config syntax
sudo systemctl reload sshd
journalctl -u sshd -f                 # watch auth attempts
```

## Authorized-key options

Each line in `~/.ssh/authorized_keys` can be prefixed with restrictions:

```
restrict,command="/usr/bin/rsync --server …",from="10.0.0.0/8" ssh-ed25519 AAAA… backup-bot
```

- `restrict` — disable agent/X11/port forwarding, tty, user RC. (Then opt-in with `pty`, etc.)
- `command="…"` — force this command regardless of what client requested.
- `from="pattern,…"` — limit source addresses.
- `no-port-forwarding`, `no-agent-forwarding`, `no-X11-forwarding`, `no-pty` — granular.

## Certificate authentication

OpenSSH supports an internal CA: sign user/host keys for short-lived, scoped access.

```sh
# CA setup (once)
ssh-keygen -f ca -C "ssh-ca"

# Sign a user key
ssh-keygen -s ca -I alice@laptop -n alice,deploy -V +8h alice.pub
# → produces alice-cert.pub

# Server trusts certs signed by CA:
echo 'TrustedUserCAKeys /etc/ssh/ca.pub' | sudo tee -a /etc/ssh/sshd_config
```

Inspect a cert: `ssh-keygen -L -f alice-cert.pub`.

## Troubleshooting

```sh
ssh -vvv user@host                    # full handshake trace
ssh -G host                           # what config will be used
nc -vz host 22                        # is port reachable?
ssh -o IdentitiesOnly=yes -i key …    # force a specific key, ignore agent
chmod 700 ~/.ssh && chmod 600 ~/.ssh/* && chmod 644 ~/.ssh/*.pub   # fix perms
```

Common failures:
- `Permission denied (publickey)` — wrong key, wrong user, or `authorized_keys` perms (must be 600, dir 700, home not group-writable).
- `Connection refused` — sshd not running / firewall.
- `Host key verification failed` — pinned key changed (see known_hosts above).
- `Too many authentication failures` — agent offered too many keys. Add `IdentitiesOnly yes` + specific `IdentityFile`.
