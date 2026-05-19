---
title: HTTP
---

Application protocol for the web. Request/response, text-framed in HTTP/1.1, binary-framed (HPACK/QPACK) in HTTP/2 and HTTP/3. Ports **80** (cleartext), **443** (TLS).

## Request anatomy

```
GET /search?q=hello HTTP/1.1
Host: example.com
User-Agent: curl/8.6.0
Accept: text/html
Cookie: session=abc123

<optional body>
```

## Response anatomy

```
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: 137
Cache-Control: max-age=60
Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Lax

<html>…</html>
```

## Methods

| Method   | Safe | Idempotent | Has body | Typical use                          |
|----------|:----:|:----------:|:--------:|--------------------------------------|
| `GET`    | ✓    | ✓          | no       | Read a resource                      |
| `HEAD`   | ✓    | ✓          | no       | GET with headers only                |
| `OPTIONS`| ✓    | ✓          | no       | Discover capabilities / CORS preflight |
| `POST`   | ✗    | ✗          | yes      | Create / arbitrary action            |
| `PUT`    | ✗    | ✓          | yes      | Replace resource at known URL        |
| `PATCH`  | ✗    | ✗          | yes      | Partial update                       |
| `DELETE` | ✗    | ✓          | optional | Remove resource                      |
| `CONNECT`| —    | —          | —        | Open tunnel (proxies)                |
| `TRACE`  | ✓    | ✓          | no       | Diagnostic loopback (usually disabled) |

**Safe** = no server state change. **Idempotent** = repeating yields the same effect.

## Status codes

| Range | Class              | Notable                                                                                  |
|------:|--------------------|------------------------------------------------------------------------------------------|
| 1xx   | Informational      | `100 Continue`, `101 Switching Protocols`, `103 Early Hints`                             |
| 2xx   | Success            | `200 OK`, `201 Created`, `202 Accepted`, `204 No Content`, `206 Partial Content`         |
| 3xx   | Redirection        | `301 Moved Permanently`, `302 Found`, `303 See Other`, `304 Not Modified`, `307`/`308` (method-preserving) |
| 4xx   | Client error       | `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `405 Method Not Allowed`, `409 Conflict`, `410 Gone`, `415 Unsupported Media Type`, `422 Unprocessable`, `429 Too Many Requests` |
| 5xx   | Server error       | `500 Internal Server Error`, `502 Bad Gateway`, `503 Service Unavailable`, `504 Gateway Timeout` |

`301`/`302` historically changed `POST` → `GET`; use `307`/`308` to preserve method + body.

## Common headers (request)

| Header              | Purpose                                                |
|---------------------|--------------------------------------------------------|
| `Host`              | Virtual host target (mandatory in 1.1)                 |
| `Authorization`     | `Bearer <token>`, `Basic <b64>`, etc.                  |
| `Cookie`            | Send stored cookies                                    |
| `Accept`            | Acceptable response media types                        |
| `Accept-Encoding`   | `gzip, br, zstd` — content-encoding negotiation        |
| `Accept-Language`   | Preferred languages                                    |
| `Content-Type`      | Body media type (`application/json`, multipart, …)     |
| `Content-Length`    | Body size in bytes                                     |
| `If-None-Match`     | Conditional GET against `ETag`                         |
| `If-Modified-Since` | Conditional GET against `Last-Modified`                |
| `Range`             | Byte range request (resume / video seek)               |
| `Origin`            | Cross-origin source (CORS, CSRF)                       |
| `Referer`           | Page that initiated the request *(yes, mis-spelled)*   |
| `User-Agent`        | Client identification string                           |

## Common headers (response)

| Header                       | Purpose                                          |
|------------------------------|--------------------------------------------------|
| `Content-Type`               | Media type of the body                           |
| `Content-Encoding`           | `gzip` / `br` / `zstd`                           |
| `Content-Length`             | Body size                                        |
| `Cache-Control`              | Caching directives (see below)                   |
| `ETag`                       | Opaque version tag of the resource               |
| `Last-Modified`              | Mtime of resource                                |
| `Expires`                    | Legacy absolute expiry                           |
| `Location`                   | Target for redirects / created resource          |
| `Set-Cookie`                 | Issue a cookie                                   |
| `Vary`                       | Headers that affect the cached representation    |
| `Strict-Transport-Security`  | HSTS — force HTTPS                               |
| `Content-Security-Policy`    | CSP — restrict resource loading                  |
| `Access-Control-Allow-Origin`| CORS allow                                       |
| `Retry-After`                | Seconds (or HTTP-date) before retrying           |

## Caching cheatsheet

```
Cache-Control: public, max-age=31536000, immutable      # forever-cacheable hashed asset
Cache-Control: private, no-cache                        # must revalidate every time (ETag/304)
Cache-Control: no-store                                 # never cache anywhere
Cache-Control: max-age=60, stale-while-revalidate=600   # serve stale up to 10 min while refetching
```

Validators: `ETag` (strong/weak) + `If-None-Match`; `Last-Modified` + `If-Modified-Since` → server returns `304 Not Modified` (no body).

## CORS in one block

```
# Browser sends:
Origin: https://app.example.com

# Server (simple req): allow it
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Credentials: true        # if cookies needed
Vary: Origin

# Preflight (OPTIONS) for non-simple methods/headers:
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 600
```

Wildcard `*` cannot be combined with credentials.

## Authentication schemes

```
Authorization: Basic dXNlcjpwYXNz             # base64(user:pass)
Authorization: Bearer eyJhbGciOiJI…           # OAuth 2 / JWT
Authorization: Digest …                       # rarely used
WWW-Authenticate: Bearer realm="api", error="invalid_token"
```

## Cookies

```
Set-Cookie: session=abc; Max-Age=3600; Path=/; Domain=.example.com; \
            Secure; HttpOnly; SameSite=Lax
```

- `Secure` — HTTPS only.
- `HttpOnly` — not exposed to JS (XSS mitigation).
- `SameSite=Strict | Lax | None` — `None` requires `Secure`. Default is `Lax`.
- Cookie attributes are **set-only**; the browser sends only `name=value`.

## Content negotiation

Client offers preferences with q-values (`q=` 0.0–1.0):

```
Accept: text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8
Accept-Language: en-US, en;q=0.9, es;q=0.5
```

Server picks one and echoes the chosen variant; sets `Vary:` so caches key on the same headers.

## Bodies and encodings

```
Content-Type: application/json
Content-Type: application/x-www-form-urlencoded      # foo=1&bar=2
Content-Type: multipart/form-data; boundary=----abc   # file uploads
Content-Type: text/event-stream                       # SSE
Transfer-Encoding: chunked                            # streaming, no Content-Length
```

## HTTP versions at a glance

| Version  | Transport            | Framing           | Key features                                              |
|----------|----------------------|-------------------|-----------------------------------------------------------|
| HTTP/1.0 | TCP                  | Text, one req/conn| No persistent connections by default                      |
| HTTP/1.1 | TCP                  | Text              | Keep-alive, chunked, host header, pipelining (rarely used)|
| HTTP/2   | TCP + TLS (in practice) | Binary frames  | Multiplexed streams, HPACK header compression, server push (now deprecated) |
| HTTP/3   | UDP (QUIC) + TLS 1.3 | Binary frames     | 0-RTT, no head-of-line blocking, connection migration     |

Negotiation: ALPN during TLS handshake (`h2`, `http/1.1`); `Alt-Svc` advertises HTTP/3.

## curl quick reference

```sh
curl -i https://api.example.com/things                       # include response headers
curl -X POST -H 'Content-Type: application/json' \
     -d '{"name":"x"}' https://api.example.com/things        # JSON POST
curl -u user:pass https://api.example.com/secret             # Basic auth
curl -H 'Authorization: Bearer TOKEN' …                      # Bearer
curl -L https://example.com                                  # follow redirects
curl -o out.bin -C - https://example.com/big.iso             # resume download
curl --compressed https://example.com                        # request + decompress
curl -v --http2 https://example.com                          # force HTTP/2
curl --resolve example.com:443:1.2.3.4 https://example.com   # override DNS
curl -w '%{http_code} %{time_total}\n' -o /dev/null -s URL   # timing
```

## Conditional requests (efficient APIs)

```
# Client                                Server
GET /thing HTTP/1.1                  →  200 OK
                                        ETag: "v17"

GET /thing HTTP/1.1                  →  304 Not Modified   (no body)
If-None-Match: "v17"
```

## Range requests (resume / partial)

```
Range: bytes=0-1023                   →  206 Partial Content
                                         Content-Range: bytes 0-1023/45678
```

## Gotchas

- `Content-Length` and `Transfer-Encoding: chunked` together → request smuggling vector.
- `302` is ambiguous (clients may change method); use `307`/`308`.
- `Set-Cookie` headers are not folded — each cookie is its own header line.
- HTTP/2 lowercases all header names (`Content-Type` → `content-type`).
- A `200 OK` with an error JSON is fine for *transport*, ambiguous for clients — prefer real status codes for error semantics.
