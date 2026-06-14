---
title: DNS (Domain Name System)
tags: [dns, networking, bind, iis]
---

The **Domain Name System (DNS)** translates domain names into IP addresses, enabling web navigation and network operations.

## DNS Implementations

### BIND (Linux)

BIND (Berkeley Internet Name Domain) is one of the most widely used DNS implementations on Linux. It is configured through zone files and a main configuration file (`named.conf`).

Basic configuration example in `/etc/named.conf`:

```conf
options {
    directory "/var/named";
    allow-query { any; };
};
```

### IIS (Windows)

In Windows environments, DNS is typically managed using **Microsoft DNS Server** and administration tools in the Windows ecosystem.

## DNS Zone Types

- **Master zone**: Contains original records and distributes data to secondary DNS servers.
- **Slave zone**: Replicates records from a master zone and responds to DNS queries.

Zone definition example in BIND:

```conf
zone "example.com" IN {
    type master;
    file "/etc/bind/db.example.com";
};
```
