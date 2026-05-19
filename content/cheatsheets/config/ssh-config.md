---
title: SSH Config
---

```conf
# OpenSSH client config — ~/.ssh/config
# Docs: `man 5 ssh_config`
#
# Files (first value wins, so put specific Host blocks BEFORE Host *):
#   ~/.ssh/config            per-user (mode 600)
#   /etc/ssh/ssh_config      system-wide
#
# Use:
#   ssh prod                 connect using the `prod` Host alias below
#   ssh -F ./alt_config foo  use a different config file
#   ssh -G prod              dump the effective config for `prod` (debug)

# ─── Per-host blocks ─────────────────────────────────────────────────────────
Host prod
    HostName        prod.example.com       # actual DNS / IP
    User            deploy
    Port            2222
    IdentityFile    ~/.ssh/id_ed25519_prod
    IdentitiesOnly  yes                    # only use the IdentityFile above
    ForwardAgent    no                     # do NOT forward agent to untrusted hosts

Host gh
    HostName  github.com
    User      git
    IdentityFile ~/.ssh/id_ed25519_github
    IdentitiesOnly yes

# Jump through a bastion to reach private hosts
Host bastion
    HostName bastion.example.com
    User     jumpuser
    IdentityFile ~/.ssh/id_ed25519_bastion

Host db-*                                  # wildcard alias: db-1, db-prod, ...
    User       admin
    ProxyJump  bastion                     # = ssh -J bastion
    # Equivalent older form:
    # ProxyCommand ssh -W %h:%p bastion

# Local port-forward example (run: `ssh tunnel`)
Host tunnel
    HostName       db.internal
    User           dba
    LocalForward   15432 localhost:5432    # localhost:15432 -> db.internal:5432
    RemoteForward  9000 localhost:9000     # remote :9000 -> my :9000
    DynamicForward 1080                    # SOCKS5 proxy on local :1080
    ExitOnForwardFailure yes

# Match blocks (more powerful than Host) — conditional config
Match host *.internal exec "test -f ~/.ssh/work_active"
    User           workuser
    IdentityFile   ~/.ssh/id_ed25519_work

# ─── Global defaults (must be LAST: first match wins) ────────────────────────
Host *
    AddKeysToAgent           yes
    UseKeychain              yes           # macOS only: store passphrase in Keychain
    IdentitiesOnly           yes
    HashKnownHosts           yes
    StrictHostKeyChecking    accept-new    # auto-accept new hosts, reject changed
    UserKnownHostsFile       ~/.ssh/known_hosts
    ServerAliveInterval      30            # send keepalive every 30s
    ServerAliveCountMax      3             # disconnect after 3 missed
    TCPKeepAlive             yes
    Compression              no            # only useful on slow links
    ConnectTimeout           10

    # ── Connection multiplexing (huge speedup for repeated ssh/scp/git) ─────
    ControlMaster   auto
    ControlPath     ~/.ssh/cm/%C           # %C = hashed host/port/user
    ControlPersist  10m                    # keep master open 10 min after last use

    # ── Modern crypto preferences ───────────────────────────────────────────
    HostKeyAlgorithms       ssh-ed25519,ecdsa-sha2-nistp256,rsa-sha2-512,rsa-sha2-256
    KexAlgorithms           curve25519-sha256,curve25519-sha256@libssh.org,sntrup761x25519-sha512@openssh.com
    Ciphers                 chacha20-poly1305@openssh.com,aes256-gcm@openssh.com,aes128-gcm@openssh.com
    MACs                    hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com
    PubkeyAcceptedAlgorithms ssh-ed25519,rsa-sha2-512,rsa-sha2-256

# ─── Common command-line equivalents ────────────────────────────────────────
# ssh -p 2222 -i ~/.ssh/key -o IdentitiesOnly=yes user@host
# ssh -J bastion user@private-host                       (ProxyJump)
# ssh -L 8080:localhost:80 host                          (LocalForward)
# ssh -R 9000:localhost:9000 host                        (RemoteForward)
# ssh -D 1080 host                                       (DynamicForward = SOCKS5)
# ssh -N -f host                                         (forward only, background)
# ssh-copy-id -i ~/.ssh/id_ed25519.pub user@host         (install pubkey)
# ssh-keygen -t ed25519 -C "you@example.com"             (generate key)
# ssh-add -l                                             (list agent keys)

# ─── Tokens you can use in values ────────────────────────────────────────────
# %h  target host name              %p  port            %r  remote user
# %u  local user                    %d  user's home     %C  hash(%l%h%p%r)
# %i  local uid                     %L  local hostname (short)
```
