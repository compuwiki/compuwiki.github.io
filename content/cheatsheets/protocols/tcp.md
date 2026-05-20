---
title: TCP
---

Transmission Control Protocol — reliable, ordered, byte-stream transport over IP. Connection-oriented, congestion-aware. Compare with **UDP** (connectionless, no ordering, no retransmission).

## Header (20 bytes minimum)

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Source Port          |       Destination Port        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        Sequence Number                        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Acknowledgment Number                      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Data |           |U|A|P|R|S|F|                               |
| Offset| Reserved  |R|C|S|S|Y|I|            Window             |
|       |           |G|K|H|T|N|N|                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|           Checksum            |         Urgent Pointer        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Options (variable)                         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

## Flags

| Flag | Name           | Meaning                                        |
| ---- | -------------- | ---------------------------------------------- |
| SYN  | Synchronize    | Initiate connection (use seq numbers)          |
| ACK  | Acknowledgment | ACK field valid                                |
| FIN  | Finish         | I have no more data; half-close my side        |
| RST  | Reset          | Abort connection (error / unexpected)          |
| PSH  | Push           | Deliver to app immediately, don't buffer       |
| URG  | Urgent         | Urgent pointer valid (rarely used in practice) |

## Three-way handshake

```
client                                                   server
   │                                                        │
   │  ──── SYN, seq=x ─────────────────────────────────►   │   LISTEN → SYN_RECV
   │                                                        │
   │  ◄──── SYN+ACK, seq=y, ack=x+1 ────────────────────   │
   │                                                        │
   │  ──── ACK, seq=x+1, ack=y+1 ──────────────────────►   │   SYN_RECV → ESTABLISHED
ESTABLISHED                                              ESTABLISHED
```

## Four-way close (graceful)

```
A → B: FIN          A: FIN_WAIT_1
A ← B: ACK          A: FIN_WAIT_2     B: CLOSE_WAIT
A ← B: FIN                            B: LAST_ACK
A → B: ACK          A: TIME_WAIT (2×MSL)  →  CLOSED
```

`TIME_WAIT` (default ~60s on Linux) lets late duplicate segments be discarded. High `TIME_WAIT` counts on busy servers are normal, not a leak.

## State machine (highlights)

```
CLOSED → LISTEN     (server bind + listen)
CLOSED → SYN_SENT   (client connect)
SYN_SENT → ESTABLISHED
LISTEN → SYN_RECV → ESTABLISHED
ESTABLISHED → FIN_WAIT_1 / CLOSE_WAIT (depending on who closes first)
… → TIME_WAIT → CLOSED
```

## Reliability mechanisms

- **Sequence numbers** byte-count every payload byte → ordering + duplicate detection.
- **Cumulative ACKs**: ACK _n_ means "I have everything up to byte n-1".
- **Selective ACK (SACK)** option lets the receiver report non-contiguous received ranges.
- **Retransmission**: RTO (timer, ~2×RTT) or fast retransmit on 3 duplicate ACKs.
- **Checksum** covers header + data + pseudo-header (peer addresses).

## Flow control

The receiver advertises a **window** (bytes the sender may have in flight without ACK).

- `Window = 0` → receiver is full; sender pauses, probes with zero-window probes.
- **Window scaling** option (RFC 1323) shifts the 16-bit field up to 30 bits for fat pipes.

## Congestion control

Distinct from flow control — protects the **network**, not the receiver.

```
cwnd  : congestion window  (bytes sender can have in flight)
ssthresh : slow-start threshold

slow start          : cwnd doubles each RTT until ssthresh or loss
congestion avoidance: cwnd += MSS per RTT
fast recovery       : on 3 dup-ACKs, halve cwnd, retransmit, continue
RTO timeout         : cwnd → 1 MSS, ssthresh halved
```

Algorithms: **Reno**, **CUBIC** (Linux default), **BBR** (Google; throughput/RTT-based, ignores loss as primary signal).

```sh
sysctl net.ipv4.tcp_congestion_control       # current default
sysctl -w net.ipv4.tcp_congestion_control=bbr
ss -ti                                       # per-socket: cwnd, rtt, retrans
```

## MSS, MTU, PMTU

- **MTU** — max IP packet size on a link (Ethernet: 1500).
- **MSS** — max TCP payload = MTU − IP header − TCP header. Negotiated in SYN options.
- **Path MTU Discovery** finds smallest MTU on the path via ICMP "fragmentation needed". Black holes happen when ICMP is filtered → connections hang on large transfers.

## Options (common)

| Option         | Purpose                                        |
| -------------- | ---------------------------------------------- |
| MSS            | Announce max segment size                      |
| Window Scale   | Shift the 16-bit Window field                  |
| SACK Permitted | Both sides will use selective ACK              |
| Timestamps     | Better RTT measurement, PAWS (wrap protection) |
| TCP Fast Open  | Carry data in SYN on repeat connections        |

## Nagle, delayed ACK, cork

- **Nagle's algorithm** coalesces small writes ("send only if no outstanding small unACKed data"). Reduces packets, adds latency. Disable on interactive protocols:
  ```c
  setsockopt(fd, IPPROTO_TCP, TCP_NODELAY, &one, sizeof(one));
  ```
- **Delayed ACK** holds the ACK ~40ms hoping to piggyback on a reply.
- **TCP_CORK** (Linux): hold sends until cork released — efficient for headers+body. `TCP_NOPUSH` on BSD.

Nagle + delayed-ACK interaction is a classic source of mysterious 200ms latency.

## Ports

| Range       | Class                                            |
| ----------- | ------------------------------------------------ |
| 0–1023      | Well-known (HTTP 80, HTTPS 443, SSH 22, SMTP 25) |
| 1024–49151  | Registered                                       |
| 49152–65535 | Ephemeral (client source ports)                  |

Linux ephemeral range: `cat /proc/sys/net/ipv4/ip_local_port_range`.

## Diagnostic toolbox

```sh
ss -tunlp                              # listening sockets (TCP/UDP, numeric, processes)
ss -tan state established              # all established TCP sockets
ss -ti                                 # per-socket TCP info (cwnd, rtt, retrans)
ss -s                                  # summary by state

netstat -anp                           # older equivalent of ss

# Reachability
nc -vz host 443                        # is port open?
nc -l 9000                             # listen on 9000 (server)
nc host 9000                           # connect (client)

# Path / latency
ping host
traceroute host       /  tracepath host
mtr host                                # continuous traceroute + loss

# Packet capture
sudo tcpdump -ni eth0 'tcp port 443 and host 1.2.3.4'
sudo tcpdump -w cap.pcap …             # write for Wireshark
tshark -r cap.pcap -Y 'tcp.flags.syn==1 and tcp.flags.ack==0'

# Throughput
iperf3 -s                              # server
iperf3 -c server -P 4 -t 30            # 4 parallel streams, 30s

# Kernel knobs (Linux)
sysctl net.ipv4.tcp_rmem net.ipv4.tcp_wmem    # buffer sizes
sysctl net.ipv4.tcp_window_scaling
sysctl net.core.somaxconn                     # listen() backlog cap
```

## Reading `ss -ti`

```
ESTAB 0 0  10.0.0.1:443  10.0.0.2:51234
   cubic wscale:7,7 rto:204 rtt:3.2/1.5 mss:1448 cwnd:10 ssthresh:7
   bytes_acked:12345 segs_out:12 segs_in:10
```

- `rtt`: smoothed RTT / mean deviation (ms)
- `cwnd`: congestion window in MSS
- `ssthresh`: slow-start threshold
- `retrans`: cumulative / current outstanding retransmits

## TCP vs UDP

| Aspect          | TCP                              | UDP                               |
| --------------- | -------------------------------- | --------------------------------- |
| Connection      | Yes (handshake)                  | None                              |
| Delivery        | Reliable, ordered                | Best-effort, unordered            |
| Congestion ctrl | Built-in                         | App-level (or none)               |
| Header          | 20+ bytes                        | 8 bytes                           |
| Use cases       | HTTP/1.1, HTTP/2, SSH, SMTP, DBs | DNS, NTP, VoIP, gaming, QUIC base |

QUIC (the basis of HTTP/3) is over UDP but implements TCP-like reliability + congestion control in userspace.

## Gotchas

- A `RST` is **not graceful** — peer's pending reads/writes error out. Use `FIN` for clean closes.
- `EADDRINUSE` after restart: there's a `TIME_WAIT` socket on that port. Solutions: `SO_REUSEADDR`, change port, wait it out.
- Bare-socket apps must call `setsockopt(TCP_NODELAY)` for low-latency RPC; Nagle is on by default.
- A "stuck" connection is often **dropped NAT mapping**: idle longer than the middlebox timer. Mitigate with TCP keepalive (`SO_KEEPALIVE` + tuned intervals) or app-level pings.
- High `Recv-Q` in `ss` means the **app** isn't reading fast enough — not a network problem.
