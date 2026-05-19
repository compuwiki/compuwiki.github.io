---
title: DNS
---

Domain Name System — distributed hierarchical naming service. Translates names (`example.com`) to records (addresses, mail servers, text, …). UDP/TCP port **53**, DoT (TLS) **853**, DoH (HTTPS) **443**.

## Name hierarchy

```
www.example.com.          ← trailing dot = root
└── www       . example  . com  . (root)
    label       label      TLD    .
```

Resolved right-to-left: root NS → TLD NS (`com`) → authoritative NS (`example.com`) → final answer.

## Common record types

| Type    | Purpose                                                      | Example value                              |
|---------|--------------------------------------------------------------|--------------------------------------------|
| `A`     | IPv4 address                                                 | `93.184.216.34`                            |
| `AAAA`  | IPv6 address                                                 | `2606:2800:220:1:248:1893:25c8:1946`       |
| `CNAME` | Canonical alias (one name → another name). No siblings.      | `www → example.com.`                       |
| `MX`    | Mail server, with priority (lower = preferred)               | `10 mail.example.com.`                     |
| `NS`    | Authoritative nameserver for the zone                        | `ns1.example.com.`                         |
| `SOA`   | Zone metadata (primary NS, email, serial, timers)            | `ns1 admin 2025010101 7200 3600 1209600 3600` |
| `TXT`   | Arbitrary text — SPF, DKIM, domain verification              | `"v=spf1 include:_spf.google.com ~all"`    |
| `PTR`   | Reverse: IP → name (lives under `in-addr.arpa` / `ip6.arpa`) | `34.216.184.93.in-addr.arpa → example.com.` |
| `SRV`   | Service location (host + port + priority + weight)           | `0 5 5060 sip.example.com.`                |
| `CAA`   | Which CAs may issue certs for the name                       | `0 issue "letsencrypt.org"`                |
| `DS`    | Delegation Signer (DNSSEC link to child zone)                |                                            |
| `DNSKEY` `RRSIG` `NSEC(3)` | DNSSEC chain (key, signature, denial of existence) |                                    |
| `ALIAS`/`ANAME` | Flattened CNAME-at-apex (registrar-specific, not RFC) |                                          |

## Anatomy of a zone file (BIND)

```
$ORIGIN example.com.
$TTL    3600

@   IN SOA  ns1.example.com. admin.example.com. (
              2026051701  ; serial  (YYYYMMDDnn, bump on change)
              7200        ; refresh
              3600        ; retry
              1209600     ; expire
              3600 )      ; negative TTL

    IN NS    ns1.example.com.
    IN NS    ns2.example.com.
    IN MX    10 mail.example.com.
    IN A     93.184.216.34
    IN AAAA  2606:2800:220:1:248:1893:25c8:1946
    IN TXT   "v=spf1 -all"

www  IN CNAME example.com.
mail IN A     203.0.113.25
ns1  IN A     203.0.113.53
```

## Resolution flow

```
Application ──► stub resolver (libc / browser)
                       │
                       ▼
                recursive resolver  (8.8.8.8, 1.1.1.1, ISP, Unbound, …)
                       │ caches answers up to TTL
                       ├──► root servers     (".")     →  refers to TLD NS
                       ├──► TLD nameservers ("com.")    →  refers to zone NS
                       └──► authoritative NS ("example.com.") → final answer
```

Recursive = does the legwork. Authoritative = owns the records.

## Caching and TTL

- Every record carries a TTL (seconds) telling resolvers how long to cache it.
- Lowering TTL before a planned change (24h → 300s, ahead of time) shortens migration windows.
- Negative caching (NXDOMAIN, NODATA) uses the SOA's last field.

## Reverse DNS (PTR)

IPv4 reverse zone: bytes of the IP reversed under `in-addr.arpa`.

```
1.2.3.4    →  4.3.2.1.in-addr.arpa.   PTR  host.example.com.
```

IPv6 uses nibble-reversed address under `ip6.arpa`.

## DNSSEC (in 30 seconds)

- Each zone signs its records with a key (`DNSKEY`) — produces `RRSIG`.
- Parent zone publishes a `DS` record (hash of child's key) — chains trust from the root's trust anchor.
- `NSEC` / `NSEC3` give authenticated denial of existence.

## DoT / DoH / DoQ

| Protocol | Transport          | Port | Notes                                       |
|----------|--------------------|------|---------------------------------------------|
| Do53     | UDP/TCP plaintext  | 53   | Default; visible to anyone on path          |
| DoT      | TCP + TLS          | 853  | Easy to block at firewall (well-known port) |
| DoH      | HTTPS              | 443  | Indistinguishable from web traffic          |
| DoQ      | QUIC               | 853  | Newer, lower latency                        |

## Common CLI tools

```sh
# dig — Swiss-army DNS lookup
dig example.com                       # A record
dig example.com AAAA                  # IPv6
dig example.com MX +short             # short answer only
dig +trace example.com                # walk from root downward
dig @1.1.1.1 example.com              # ask a specific resolver
dig -x 8.8.8.8                        # reverse lookup (PTR)
dig +noall +answer example.com any
dig +dnssec example.com               # show RRSIGs / AD flag

# host / nslookup (older, simpler)
host example.com
nslookup example.com 1.1.1.1

# kdig (knot) — DoH/DoT support
kdig +tls @1.1.1.1 example.com
kdig +https @1.1.1.1 example.com

# Show OS resolver state
resolvectl status                     # systemd-resolved
scutil --dns                          # macOS
ipconfig /displaydns                  # Windows (cached entries)

# Flush local cache
sudo resolvectl flush-caches          # systemd
sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder   # macOS
ipconfig /flushdns                    # Windows
```

## Response codes

| Code     | Meaning                                            |
|----------|----------------------------------------------------|
| NOERROR  | OK (answer in `ANSWER` section — may be empty)     |
| NXDOMAIN | Name does not exist                                |
| SERVFAIL | Server failed (DNSSEC bogus, upstream down, etc.)  |
| REFUSED  | Server refuses to answer (not authoritative, ACL)  |
| FORMERR  | Malformed query                                    |

## Gotchas

- **CNAME at the zone apex is illegal** (`example.com` can't be a CNAME). Use ALIAS/ANAME if your provider offers it, or `A`/`AAAA` directly.
- `MX` priority: **lower wins** (10 before 20).
- TTL is **advisory** — buggy clients/resolvers cache longer.
- Stale `NS` glue at the registrar causes silent breakage; check with `dig +trace`.
- A missing trailing dot in zone files turns `mail.example.com` into `mail.example.com.example.com.`.
- `dig` queries the system resolver by default — use `@server` to ask a specific one.
