---
title: GitHub Actions
---

CI/CD service built into GitHub. Workflows are YAML files in `.github/workflows/`.

## Anatomy of a workflow

```yaml
name: CI # display name (optional)

on: # triggers
  push:
    branches: [main]
  pull_request:
  workflow_dispatch: # manual run button

jobs:
  build: # job id
    runs-on: ubuntu-latest # runner image
    steps:
      - uses: actions/checkout@v4
      - name: Run tests
        run: npm test
```

## Triggers (`on:`)

```yaml
on:
  push:
    branches: [main, "release/**"]
    paths: ["src/**", "!**/*.md"]
    tags: ["v*"]
  pull_request:
    types: [opened, synchronize, reopened]
  schedule:
    - cron: "0 4 * * *" # daily 04:00 UTC
  workflow_dispatch: # manual, with optional inputs
    inputs:
      env:
        type: choice
        options: [staging, prod]
        default: staging
  workflow_call: # reusable workflow
  repository_dispatch: # external API trigger
```

## Runners

| Label                             | OS              |
| --------------------------------- | --------------- |
| `ubuntu-latest`, `ubuntu-24.04`   | Linux           |
| `windows-latest`, `windows-2022`  | Windows         |
| `macos-latest`, `macos-14`        | macOS           |
| `self-hosted`, plus custom labels | Your own runner |

## Steps

```yaml
steps:
  # Run a shell command
  - name: Print version
    run: node --version

  # Multi-line script (default shell: bash on Linux/macOS, pwsh on Windows)
  - name: Build
    run: |
      npm ci
      npm run build
    shell: bash
    working-directory: ./app
    env:
      NODE_ENV: production

  # Use a published action
  - uses: actions/setup-node@v4
    with:
      node-version: "20"
      cache: "npm"
```

## Common actions

```yaml
- uses: actions/checkout@v4 # check out the repo
- uses: actions/setup-node@v4 # Node.js + npm/yarn/pnpm cache
- uses: actions/setup-python@v5 # Python + pip cache
- uses: actions/setup-go@v5 # Go
- uses: actions/setup-java@v4 # Java/JDK
- uses: actions/cache@v4 # generic cache
- uses: actions/upload-artifact@v4 # save build output
- uses: actions/download-artifact@v4 # retrieve in later job
- uses: docker/build-push-action@v6 # build & push images
- uses: docker/login-action@v3
```

## Contexts and expressions

Use `${{ ... }}` for expressions.

```yaml
${{ github.ref }}             # refs/heads/main
${{ github.sha }}             # commit SHA
${{ github.actor }}           # user who triggered run
${{ github.event_name }}      # push, pull_request, ...
${{ github.run_number }}      # incrementing build number
${{ runner.os }}              # Linux | Windows | macOS
${{ secrets.MY_TOKEN }}       # repo/org/env secret
${{ vars.MY_VAR }}            # repo/org/env variable
${{ env.MY_VAR }}             # step/job/workflow env
${{ inputs.env }}             # workflow_dispatch input
${{ matrix.node }}            # matrix value
${{ steps.build.outputs.x }}  # output from a prior step
```

Operators: `==`, `!=`, `<`, `>`, `&&`, `||`, `!`. Functions: `contains()`, `startsWith()`, `endsWith()`, `format()`, `fromJSON()`, `toJSON()`, `hashFiles()`, `success()`, `failure()`, `always()`, `cancelled()`.

## Conditional execution

```yaml
- name: Deploy
  if: github.ref == 'refs/heads/main' && success()
  run: ./deploy.sh

- name: Cleanup (always runs)
  if: always()
  run: ./cleanup.sh
```

## Matrix builds

```yaml
jobs:
  test:
    strategy:
      fail-fast: false
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node: [18, 20, 22]
        include: # extra combos
          - os: ubuntu-latest
            node: 22
            experimental: true
        exclude: # remove combos
          - os: windows-latest
            node: 18
    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "${{ matrix.node }}" }
      - run: npm test
```

## Job dependencies and outputs

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    outputs:
      version: ${{ steps.v.outputs.value }}
    steps:
      - id: v
        run: echo "value=$(cat VERSION)" >> $GITHUB_OUTPUT

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - run: echo "Deploying ${{ needs.build.outputs.version }}"
```

## Secrets and environments

```yaml
jobs:
  deploy:
    environment: production # requires approval if configured
    runs-on: ubuntu-latest
    steps:
      - run: ./deploy.sh
        env:
          API_KEY: ${{ secrets.PROD_API_KEY }}
```

Secrets are masked in logs. **Never** `echo` a secret; use the env-var indirection above. Secrets defined at org/repo/environment scope.

## Caching

```yaml
- uses: actions/cache@v4
  with:
    path: |
      ~/.npm
      node_modules
    key: ${{ runner.os }}-npm-${{ hashFiles('**/package-lock.json') }}
    restore-keys: ${{ runner.os }}-npm-
```

Most `setup-*` actions have a built-in `cache:` option — prefer that.

## Artifacts (pass files between jobs)

```yaml
# Producer
- uses: actions/upload-artifact@v4
  with:
    name: build-output
    path: dist/
    retention-days: 7

# Consumer (in a later job)
- uses: actions/download-artifact@v4
  with:
    name: build-output
    path: dist/
```

## Reusable workflows

```yaml
# .github/workflows/reusable.yml
on:
  workflow_call:
    inputs:
      env: { type: string, required: true }
    secrets:
      token: { required: true }
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - run: ./deploy.sh ${{ inputs.env }}
        env: { TOKEN: ${{ secrets.token }} }
```

```yaml
# Caller
jobs:
  call:
    uses: ./.github/workflows/reusable.yml
    with: { env: prod }
    secrets: { token: ${{ secrets.DEPLOY_TOKEN }} }
```

## Concurrency (cancel superseded runs)

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

## Permissions (least privilege)

```yaml
permissions:
  contents: read
  pull-requests: write
  id-token: write # for OIDC to cloud providers
```

Defaults can be locked down at the repo/org level.

## Useful runner files

| Variable               | Purpose                               |
| ---------------------- | ------------------------------------- |
| `$GITHUB_WORKSPACE`    | Repo checkout root                    |
| `$GITHUB_ENV`          | Write `KEY=val` lines to set env vars |
| `$GITHUB_OUTPUT`       | Write step outputs                    |
| `$GITHUB_STEP_SUMMARY` | Markdown summary shown in UI          |
| `$GITHUB_PATH`         | Append directories to `PATH`          |

```yaml
- run: echo "VERSION=1.2.3" >> $GITHUB_ENV
- run: echo "### Build succeeded ✅" >> $GITHUB_STEP_SUMMARY
```

## Local testing

- [act](https://github.com/nektos/act) — run workflows locally via Docker: `act -j build`
- `gh workflow run <file.yml>` — trigger `workflow_dispatch` from CLI
- `gh run watch` / `gh run view --log` — inspect runs

## Gotchas

- Forks **do not** get access to secrets on `pull_request` events — use `pull_request_target` carefully (it runs from base, with secrets).
- The default `GITHUB_TOKEN` permissions can be too narrow or too wide — set `permissions:` explicitly.
- Composite actions cannot access `secrets.*` directly — pass them as inputs.
- Scheduled workflows on inactive repos are disabled after 60 days.
- Matrix `include`/`exclude` ordering matters; `include` runs after expansion.
