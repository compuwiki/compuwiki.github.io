---
title: Docker Compose
---

```yml
# Docker Compose v2 — annotated reference.
# Docs: https://docs.docker.com/compose/compose-file/
#
# Commands:
#   docker compose up -d                  start in background
#   docker compose up --build             rebuild images, then start
#   docker compose down                   stop + remove containers, networks
#   docker compose down -v                also remove named volumes
#   docker compose ps                     list services
#   docker compose logs -f web            tail logs of `web`
#   docker compose exec web sh            shell into running container
#   docker compose run --rm web python    one-off command
#   docker compose config                 validate + print resolved config
#
# File precedence: docker-compose.yml + docker-compose.override.yml are merged
# automatically. Use `-f` to pick explicit files, e.g.
#   docker compose -f compose.yml -f compose.prod.yml up

# `version:` is obsolete in Compose v2 — omit it.

# ─── Reusable fragments (YAML anchors) ───────────────────────────────────────
x-app-defaults: &app-defaults
  restart: unless-stopped
  env_file: .env
  logging:
    driver: json-file
    options: { max-size: "10m", max-file: "3" }

services:
  # ─── A web app built from a local Dockerfile ──────────────────────────────
  web:
    <<: *app-defaults # merge in shared defaults
    build:
      context: ./web # path containing the Dockerfile
      dockerfile: Dockerfile # default: Dockerfile
      target: runtime # multi-stage target
      args: # build-time ARGs
        NODE_VERSION: "20"
      cache_from: ["myorg/web:cache"]
    image: myorg/web:latest # tag of the built image (also for pull)
    container_name: web # optional, fixed name (loses scaling)
    command: ["node", "server.js"] # override CMD (exec form preferred)
    entrypoint: ["/usr/local/bin/entry"] # override ENTRYPOINT
    working_dir: /app
    user: "1000:1000"

    ports:
      - "8080:80" # host:container
      - "127.0.0.1:9229:9229" # bind to loopback only
    expose:
      - "9000" # expose to linked services only

    environment:
      NODE_ENV: production
      DATABASE_URL: postgres://app:${DB_PASSWORD}@db:5432/app # ${} = from .env or shell
    env_file:
      - .env
      - .env.local

    volumes:
      - ./web:/app # bind mount (source : target)
      - node_modules:/app/node_modules # named volume (defined below)
      - /var/run/docker.sock:/var/run/docker.sock:ro # read-only bind
      - type: tmpfs
        target: /tmp

    depends_on:
      db:
        condition: service_healthy # wait until db's healthcheck passes
      cache:
        condition: service_started

    healthcheck:
      test: ["CMD", "curl", "-fsS", "http://localhost/health"]
      interval: 10s
      timeout: 3s
      retries: 5
      start_period: 20s # grace period before failures count

    deploy: # honored by `docker compose up` for limits
      resources:
        limits: { cpus: "1.0", memory: 512M }
        reservations: { cpus: "0.25", memory: 128M }

    networks: [frontnet, backnet]
    profiles: ["full"] # only starts when `--profile full` given

  # ─── A managed image (Postgres) ───────────────────────────────────────────
  db:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password # safer than env var
      POSTGRES_DB: app
    volumes:
      - db-data:/var/lib/postgresql/data
      - ./db/init.sql:/docker-entrypoint-initdb.d/01-init.sql:ro
    secrets: [db_password]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app -d app"]
      interval: 5s
      retries: 10
    networks: [backnet]

  cache:
    image: redis:7-alpine
    command: ["redis-server", "--maxmemory", "256mb", "--maxmemory-policy", "allkeys-lru"]
    networks: [backnet]

# ─── Top-level networks ─────────────────────────────────────────────────────
networks:
  frontnet: # default: bridge driver
  backnet:
    driver: bridge
    internal: true # no external connectivity
    ipam:
      config:
        - subnet: 10.42.0.0/24

# ─── Top-level volumes ──────────────────────────────────────────────────────
volumes:
  db-data:
  node_modules:

# ─── Secrets (read from files; never put plaintext in compose) ──────────────
secrets:
  db_password:
    file: ./secrets/db_password.txt
```
