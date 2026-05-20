---
title: OSI Model
tags: [networking, fundamentals, protocols]
---

The **Open Systems Interconnection (OSI) model** is a conceptual framework that standardizes the functions of a telecommunication or computing system into seven abstraction layers. Each layer serves the one above it and is served by the one below.

## The Seven Layers

```mermaid
flowchart TD
    L7[7 — Application<br/>HTTP, FTP, SMTP, DNS]
    L6[6 — Presentation<br/>TLS, SSL, JPEG, ASCII]
    L5[5 — Session<br/>NetBIOS, RPC, PPTP]
    L4[4 — Transport<br/>TCP, UDP]
    L3[3 — Network<br/>IP, ICMP, routers]
    L2[2 — Data Link<br/>Ethernet, MAC, switches]
    L1[1 — Physical<br/>Cables, hubs, signals]

    L7 --> L6 --> L5 --> L4 --> L3 --> L2 --> L1
```

## Layer Summary

| #   | Layer        | Unit (PDU) | Responsibility                                    | Examples                       |
| --- | ------------ | ---------- | ------------------------------------------------- | ------------------------------ |
| 7   | Application  | Data       | Interface with end-user applications              | HTTP, FTP, SMTP, DNS, SSH      |
| 6   | Presentation | Data       | Translation, encryption, compression              | TLS/SSL, JPEG, MPEG, ASCII     |
| 5   | Session      | Data       | Establish, manage, terminate sessions             | NetBIOS, RPC, PPTP             |
| 4   | Transport    | Segment    | Reliable delivery, flow control, segmentation     | TCP, UDP                       |
| 3   | Network      | Packet     | Logical addressing and routing between networks   | IP, ICMP, IPSec, routers       |
| 2   | Data Link    | Frame      | Node-to-node delivery, MAC addressing, error det. | Ethernet, PPP, switches, NICs  |
| 1   | Physical     | Bit        | Raw bit transmission over physical medium         | Cables, fiber, hubs, repeaters |

## Encapsulation Flow

When data is sent, each layer adds its own header (and sometimes trailer) — a process called **encapsulation**. The receiver reverses it (**decapsulation**).

```mermaid
flowchart LR
    subgraph Sender
        A1[Application Data] --> A2[+ Transport Header<br/>= Segment]
        A2 --> A3[+ Network Header<br/>= Packet]
        A3 --> A4[+ Data Link Header/Trailer<br/>= Frame]
        A4 --> A5[Bits on the wire]
    end
    A5 ==> B5
    subgraph Receiver
        B5[Bits on the wire] --> B4[Frame]
        B4 --> B3[Packet]
        B3 --> B2[Segment]
        B2 --> B1[Application Data]
    end
```

## OSI vs TCP/IP

The TCP/IP model is the one actually used on the Internet. It collapses several OSI layers.

```mermaid
flowchart LR
    subgraph OSI[OSI — 7 layers]
        O7[Application]
        O6[Presentation]
        O5[Session]
        O4[Transport]
        O3[Network]
        O2[Data Link]
        O1[Physical]
    end
    subgraph TCPIP[TCP/IP — 4 layers]
        T4[Application]
        T3[Transport]
        T2[Internet]
        T1[Network Access]
    end
    O7 --- T4
    O6 --- T4
    O5 --- T4
    O4 --- T3
    O3 --- T2
    O2 --- T1
    O1 --- T1
```

## Mnemonics

To memorize the layers (top → bottom):

- **A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing
- Or bottom → top: **P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way

## References

- [OSI Model — osi-model.com](https://osi-model.com/)
- [OSI Model (Wikipedia)](https://en.wikipedia.org/wiki/OSI_model)
- [ISO/IEC 7498-1 Standard](https://www.iso.org/standard/20269.html)
