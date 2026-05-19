---
title: TLS
---

Transport Layer Security — encrypts and authenticates TCP (and UDP, via DTLS / QUIC). Successor of SSL. Today, only **TLS 1.2** and **TLS 1.3** are acceptable; everything below is deprecated.

## What TLS gives you

1. **Confidentiality** — symmetric encryption of records (AES-GCM, ChaCha20-Poly1305).
2. **Integrity** — AEAD tags or HMAC.
3. **Authentication** — server identity proved by an X.509 certificate signed by a trusted CA; client auth optional.
4. **Forward secrecy** — ephemeral key exchange (ECDHE/DHE) so a future key compromise doesn't decrypt past sessions.

## Handshake — TLS 1.3 (1-RTT, the modern default)

```
Client                                                  Server
  │                                                        │
  │  ── ClientHello   (versions, ciphers, key_share,       │
  │                    SNI, ALPN, …)        ────────────►  │
  │                                                        │
  │  ◄── ServerHello       (chosen params, key_share)      │
  │      {EncryptedExtensions, Certificate, CertVerify,    │
  │       Finished}                                        │
  │                                                        │
  │  ──► {Finished}                                        │
  │                                                        │
  │  ══ application data ═════════════════════════════════ │
```

- `key_share` extension carries an ECDHE public point so the shared secret is derived **immediately** — no separate KeyExchange round.
- Everything after `ServerHello` is encrypted (`{…}` above).
- **0-RTT** ("early data") on resumption: client may send app data on the first flight using a pre-shared key (PSK). Risk: replay; only use for idempotent requests.

## Handshake — TLS 1.2 (2-RTT)

```
ClientHello → ServerHello, Certificate, ServerKeyExchange, ServerHelloDone
ClientKeyExchange, ChangeCipherSpec, Finished →
                                                ← ChangeCipherSpec, Finished
```

## Cipher suites

TLS 1.2 names: `Kx_Auth_WITH_Cipher_Mac` (e.g. `ECDHE_RSA_WITH_AES_128_GCM_SHA256`).
TLS 1.3 simplified: AEAD + hash only (e.g. `TLS_AES_128_GCM_SHA256`); key exchange and signature are negotiated separately.

| Component       | Modern picks                                              |
|-----------------|-----------------------------------------------------------|
| Key exchange    | ECDHE over `X25519` or `secp256r1`; PQ hybrid `X25519+Kyber768` |
| Signature       | `ed25519`, `ecdsa-secp256r1`, `rsa-pss-rsae-sha256`       |
| AEAD            | `AES-128-GCM`, `AES-256-GCM`, `ChaCha20-Poly1305`         |
| Hash            | `SHA-256`, `SHA-384`                                      |

Drop forever: RC4, DES/3DES, MD5, SHA-1, anything `_EXPORT_`, anonymous DH, static RSA key exchange (no forward secrecy).

## Versions (status as of 2026)

| Version  | Status        | Notes                                       |
|----------|---------------|---------------------------------------------|
| SSL 2/3  | Forbidden     | POODLE, etc.                                |
| TLS 1.0  | Deprecated    | Removed from major browsers                 |
| TLS 1.1  | Deprecated    | Same                                        |
| TLS 1.2  | OK            | Still widely deployed                       |
| TLS 1.3  | **Preferred** | RFC 8446; AEAD-only, 1-RTT, fewer pitfalls  |

## Certificate chain

```
Server cert (leaf)  ─signed by─►  Intermediate CA  ─signed by─►  Root CA
                                                                  (in OS / browser trust store)
```

Server should send leaf + intermediates (NOT the root). Client validates: signatures, validity dates, SAN matches hostname, revocation status (OCSP/CRL/CT).

Common name (`CN`) is legacy — modern clients (Chrome) require **Subject Alternative Name** for hostname matching.

## Extensions you'll see

| Extension                  | Purpose                                                |
|----------------------------|--------------------------------------------------------|
| `SNI` (Server Name Indication) | Pick a vhost during the handshake (plaintext today; ECH hides it) |
| `ALPN`                     | Negotiate app protocol (`h2`, `http/1.1`, `h3`)        |
| `supported_versions`       | List of TLS versions client accepts                    |
| `key_share`                | ECDHE public key(s) — TLS 1.3                          |
| `signature_algorithms`     | Acceptable cert signature schemes                      |
| `psk_key_exchange_modes`   | Resumption mode                                        |
| `ECH` (Encrypted Client Hello) | Hides SNI from on-path observers (rolling out)     |
| `OCSP Stapling`            | Server attaches a fresh OCSP response                  |
| `Certificate Transparency` | SCTs proving the cert is logged                        |

## Session resumption

- **Session ID** (TLS 1.2): server caches state, client presents ID. Mostly obsolete.
- **Session tickets**: server encrypts the session state and gives it to the client to present later. Stateless on the server.
- **PSK** (TLS 1.3): tickets reframed as pre-shared keys. Enables 0-RTT.

## mTLS (mutual TLS / client certs)

Server requests a cert from the client with `CertificateRequest`. Common in service-to-service authentication and zero-trust networks. Validate against an internal CA, not public CAs.

## Anatomy of a record

```
+----+----+----+----+----------------------------+
|type| ver | length |       payload + tag        |
+----+----+----+----+----------------------------+
type: 20 ChangeCipherSpec | 21 Alert | 22 Handshake | 23 ApplicationData
```

After the handshake, only encrypted `ApplicationData` records (and occasional `Alert`s) appear on the wire.

## OpenSSL / CLI

```sh
# Generate Ed25519 key + self-signed cert
openssl genpkey -algorithm ed25519 -out key.pem
openssl req -x509 -key key.pem -days 90 -subj "/CN=localhost" -out cert.pem

# Modern RSA / ECDSA keys
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:3072 -out key.pem
openssl ecparam -name prime256v1 -genkey -noout -out key.pem

# CSR + sign (with your own CA)
openssl req -new -key key.pem -out req.csr -subj "/CN=example.com" \
        -addext "subjectAltName=DNS:example.com,DNS:www.example.com"
openssl x509 -req -in req.csr -CA ca.pem -CAkey ca.key -CAcreateserial \
        -out cert.pem -days 365 -extfile <(printf 'subjectAltName=DNS:example.com')

# Inspect
openssl x509 -in cert.pem -noout -text
openssl x509 -in cert.pem -noout -dates -subject -issuer -fingerprint -sha256
openssl req  -in req.csr  -noout -text
openssl pkey -in key.pem  -noout -text -pubout

# Talk to a server (TLS 1.3 only, with SNI + ALPN)
openssl s_client -connect example.com:443 -servername example.com \
        -tls1_3 -alpn h2,http/1.1 -showcerts < /dev/null

# Save the certificate chain
openssl s_client -showcerts -connect example.com:443 -servername example.com \
        < /dev/null | openssl crl2pkcs7 -nocrl -certfile /dev/stdin \
        | openssl pkcs7 -print_certs -out chain.pem

# Check expiry of remote cert
echo | openssl s_client -connect example.com:443 -servername example.com 2>/dev/null \
      | openssl x509 -noout -enddate

# Convert formats
openssl x509 -in cert.pem -outform DER -out cert.der
openssl pkcs12 -export -out bundle.p12 -inkey key.pem -in cert.pem -certfile chain.pem
```

## Easy testing

```sh
# curl over HTTPS with verbose handshake
curl -v --tls-max 1.3 https://example.com

# Pin to a known cert / CA
curl --cacert internal-ca.pem https://internal.example.com

# Test which versions/ciphers a server supports
nmap --script ssl-enum-ciphers -p 443 example.com
testssl.sh example.com                     # excellent external tool
```

[ssllabs.com/ssltest](https://www.ssllabs.com/ssltest/) — full external grade.

## Common error messages, decoded

| Message                                        | Cause                                                             |
|------------------------------------------------|-------------------------------------------------------------------|
| `unknown CA`                                   | Client doesn't trust the issuer (missing root or intermediate)    |
| `certificate has expired`                      | Self-explanatory; check `NotAfter`                                |
| `hostname mismatch` / `SNI`                    | Hostname not in SAN (`CN` is no longer enough)                    |
| `handshake_failure`                            | No common cipher / version / signature algorithm                  |
| `bad_certificate`, `certificate_unknown`       | Chain validation failed                                           |
| `no_application_protocol`                      | ALPN list didn't include anything the server supports             |
| `decryption_failed_reserved` / `bad_record_mac`| Often MITM or middlebox tampering, or version mismatch            |

## Best-practice cheatsheet

- **Disable** TLS ≤ 1.1; serve TLS 1.2 + 1.3.
- **Cipher order**: prefer AEAD + ECDHE; let TLS 1.3 negotiate itself.
- **Always send the intermediate chain**; don't rely on `AIA fetching`.
- **HSTS** + preload for browser-facing sites; pair with HTTPS-only cookies.
- **OCSP stapling** + `must-staple` if your CA supports it.
- **Automate renewal** (ACME / Let's Encrypt); 90-day certs make outages cheap-to-recover and force you to keep the pipeline working.
- For internal services, run a **private CA** (step-ca, Vault PKI, smallstep, cert-manager) — issue short-lived certs and skip pinning headaches.
- **Don't pin** in mobile apps unless you have a rotation strategy — pin to a backup key too.
