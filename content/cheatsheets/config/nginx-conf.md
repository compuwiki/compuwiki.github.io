---
title: Nginx Config
---

```conf
# nginx — annotated reference for the main config file.
# Default path: /etc/nginx/nginx.conf  (site files in /etc/nginx/sites-enabled/ or conf.d/)
#
# Commands:
#   nginx -t                              test config syntax
#   nginx -s reload                       reload config (no downtime)
#   nginx -s stop|quit|reopen             stop / graceful stop / reopen log files
#   systemctl reload nginx                preferred on systemd hosts
#
# Directives live in contexts: main → events → http → server → location.
# Inner contexts inherit from outer; matching directive in inner wins.

user  www-data;                            # worker process owner
worker_processes  auto;                    # auto = one per CPU core
worker_rlimit_nofile  65535;               # max open files per worker
pid  /run/nginx.pid;

events {
    worker_connections  4096;              # concurrent connections per worker
    multi_accept        on;                # accept all queued connections at once
    use                 epoll;             # Linux event method (kqueue on BSD)
}

http {
    # ─── Basics ─────────────────────────────────────────────────────────────
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    charset       utf-8;
    server_tokens off;                      # hide nginx version in headers/errors

    sendfile        on;                     # zero-copy file sends
    tcp_nopush      on;                     # send headers in one packet
    tcp_nodelay     on;                     # disable Nagle for keepalive
    keepalive_timeout  65;
    types_hash_max_size  2048;
    client_max_body_size 25m;               # max request body (uploads)

    # ─── Logging ────────────────────────────────────────────────────────────
    log_format main '$remote_addr - $remote_user [$time_local] '
                    '"$request" $status $body_bytes_sent '
                    '"$http_referer" "$http_user_agent" '
                    'rt=$request_time ut=$upstream_response_time';
    access_log /var/log/nginx/access.log main buffer=32k flush=5s;
    error_log  /var/log/nginx/error.log  warn;

    # ─── Compression ────────────────────────────────────────────────────────
    gzip              on;
    gzip_vary         on;
    gzip_comp_level   5;
    gzip_min_length   1024;
    gzip_types        text/plain text/css application/json application/javascript
                      text/xml application/xml application/xml+rss text/javascript
                      image/svg+xml;

    # ─── TLS (defaults applied to every https server) ───────────────────────
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;
    ssl_session_cache   shared:SSL:10m;
    ssl_session_timeout 1d;
    ssl_session_tickets off;

    # ─── Rate limiting ──────────────────────────────────────────────────────
    limit_req_zone $binary_remote_addr zone=api:10m rate=20r/s;
    limit_conn_zone $binary_remote_addr zone=addr:10m;

    # ─── Upstream (load-balanced backend) ───────────────────────────────────
    upstream app_backend {
        least_conn;                         # also: ip_hash, hash $key, random
        server 127.0.0.1:8001 weight=2 max_fails=3 fail_timeout=30s;
        server 127.0.0.1:8002;
        server 127.0.0.1:8003 backup;       # used only if others fail
        keepalive 32;
    }

    # ─── HTTP -> HTTPS redirect ─────────────────────────────────────────────
    server {
        listen      80 default_server;
        listen      [::]:80 default_server;
        server_name _;
        return 301  https://$host$request_uri;
    }

    # ─── A virtual host serving a static SPA + reverse-proxied API ──────────
    server {
        listen              443 ssl http2;
        listen              [::]:443 ssl http2;
        server_name         example.com www.example.com;

        ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

        # Security headers
        add_header Strict-Transport-Security "max-age=63072000; includeSubDomains" always;
        add_header X-Content-Type-Options    "nosniff"        always;
        add_header X-Frame-Options           "SAMEORIGIN"     always;
        add_header Referrer-Policy           "strict-origin-when-cross-origin" always;

        root  /var/www/example;
        index index.html;

        # SPA: serve files, fall back to index.html
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Long-cache hashed assets
        location ~* \.(?:css|js|woff2|jpg|png|svg|webp)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
            access_log off;
        }

        # Reverse proxy to backend cluster
        location /api/ {
            limit_req zone=api burst=40 nodelay;

            proxy_pass         http://app_backend;
            proxy_http_version 1.1;
            proxy_set_header   Host              $host;
            proxy_set_header   X-Real-IP         $remote_addr;
            proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
            proxy_set_header   X-Forwarded-Proto $scheme;
            proxy_set_header   Connection        "";          # enable keepalive to upstream

            proxy_connect_timeout 5s;
            proxy_send_timeout    30s;
            proxy_read_timeout    30s;
            proxy_buffering       on;
        }

        # WebSocket upgrade
        location /ws/ {
            proxy_pass http://app_backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade    $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_read_timeout 1h;
        }

        # Deny hidden files (.env, .git, …)
        location ~ /\. { deny all; access_log off; log_not_found off; }
    }

    # Include per-site files
    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}

# ─── Location-matching cheatsheet ────────────────────────────────────────────
# location     /path/     prefix match  (longest prefix wins among prefixes)
# location =   /path      exact match  (highest priority)
# location ^~  /path/     prefix; stop searching regex if matched
# location ~   pattern    case-sensitive regex
# location ~*  pattern    case-insensitive regex
# Order:  =  ^~  ~/~*  (first match wins among regex)  prefix
```
