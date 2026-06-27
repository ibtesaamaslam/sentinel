```
 ███████╗███████╗███╗   ██╗████████╗██╗███╗   ██╗███████╗██╗
 ██╔════╝██╔════╝████╗  ██║╚══██╔══╝██║████╗  ██║██╔════╝██║
 ███████╗█████╗  ██╔██╗ ██║   ██║   ██║██╔██╗ ██║█████╗  ██║
 ╚════██║██╔══╝  ██║╚██╗██║   ██║   ██║██║╚██╗██║██╔══╝  ██║
 ███████║███████╗██║ ╚████║   ██║   ██║██║ ╚████║███████╗███████╗
 ╚══════╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝
```

<div align="center">

### AI Software Engineering Safety Platform

**Secure · Verify · Monitor · Protect · Recover**

*The first AI-native platform that continuously verifies AI-generated code before it reaches production.*

---

[![Build](https://img.shields.io/github/actions/workflow/status/ibtesaamaslam/sentinel/ci.yml?branch=main&style=for-the-badge&label=Build&logo=githubactions&logoColor=white)](https://github.com/ibtesaamaslam/sentinel/actions)
[![npm version](https://img.shields.io/npm/v/@sentinel/cli?style=for-the-badge&logo=npm&logoColor=white&color=CB3837)](https://www.npmjs.com/package/@sentinel/cli)
[![Coverage](https://img.shields.io/codecov/c/github/ibtesaamaslam/sentinel?style=for-the-badge&logo=codecov&logoColor=white&color=F01F7A)](https://codecov.io/gh/ibtesaamaslam/sentinel)
[![Downloads](https://img.shields.io/npm/dm/@sentinel/cli?style=for-the-badge&logo=npm&logoColor=white&color=orange)](https://www.npmjs.com/package/@sentinel/cli)
[![License](https://img.shields.io/badge/License-MIT-00C853?style=for-the-badge)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://hub.docker.com/r/sentinel/cli)

---

Works with:

**Claude Code** &nbsp;·&nbsp; **Cursor** &nbsp;·&nbsp; **Gemini CLI** &nbsp;·&nbsp; **Codex** &nbsp;·&nbsp; **Cline** &nbsp;·&nbsp; **RooCode** &nbsp;·&nbsp; **Kiro**

---

[Getting Started](#-quick-start) &nbsp;·&nbsp; [Documentation](#-documentation) &nbsp;·&nbsp; [CLI Reference](#-cli-commands) &nbsp;·&nbsp; [Plugins](#-plugin-system) &nbsp;·&nbsp; [Architecture](#-architecture) &nbsp;·&nbsp; [Contributing](#-contributing)

</div>

---

## Why Sentinel Exists

AI coding agents are writing more code than ever. Cursor, Claude Code, Gemini CLI, and Codex are genuinely useful — they ship features fast, reduce boilerplate, and accelerate prototyping.

But there is a problem nobody talks about clearly.

**AI agents make confident mistakes.** They invent APIs that don't exist. They introduce security vulnerabilities that look exactly like correct code. They plant hardcoded secrets, leave placeholder logic, add TODO comments that never get removed, and create architectural patterns that look reasonable until they collapse in production under real load.

Human reviewers get fatigued. CI/CD pipelines catch tests but not intent. Linters catch syntax but not hallucinations.

**Sentinel is what sits between your AI agent and your production environment.**

It is not another AI coding assistant. It does not write code. It does not suggest completions.

Sentinel is the **guardian, reviewer, architect, security engineer, QA engineer, and engineering manager** that supervises every line an AI agent produces — continuously, automatically, and without fatigue.

---

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Key Features](#-key-features)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [CLI Commands](#-cli-commands)
- [Sample Output](#-sample-output)
- [Report Formats](#-report-formats)
- [Supported Languages](#-supported-languages)
- [AI Integrations](#-ai-integrations)
- [IDE Integrations](#-ide-integrations)
- [CI/CD Integrations](#-cicd-integrations)
- [Plugin System](#-plugin-system)
- [Project Structure](#-project-structure)
- [Benchmarks](#-benchmarks)
- [Security Model](#-security-model)
- [Docker](#-docker)
- [Development](#-development)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Community](#-community)
- [License](#-license)

---

## ⚡ Quick Start

```bash
# Install globally
npm install -g @sentinel/cli

# Scan a repository
sentinel scan /path/to/project

# Watch for changes in real time
sentinel monitor /path/to/project

# Generate a full HTML report
sentinel scan /path/to/project --format html --open
```

That is all it takes. Sentinel scans the entire codebase, detects every category of issue AI agents commonly introduce, and outputs a full report — in your terminal, as HTML, as JSON, or as SARIF for your CI/CD pipeline.

---

## 🔬 Key Features

### Repository Scan Engine

Deep static analysis that catches everything linters and tests miss:

| Category | What Sentinel Detects |
|---|---|
| **Bugs & Logic Errors** | Off-by-one errors, incorrect conditionals, unreachable code, undefined variable usage |
| **AI Hallucinations** | Invented library APIs, non-existent methods, fabricated modules, incorrect function signatures |
| **Placeholder Code** | TODO markers, FIXME comments, `// placeholder` stubs, empty implementations masquerading as complete |
| **Hardcoded Secrets** | API keys, passwords, tokens, private keys, connection strings — all detected via entropy analysis and pattern matching |
| **Security Vulnerabilities** | SQL Injection · XSS · SSRF · CSRF · Command Injection · Path Traversal · Prototype Pollution · Insecure Deserialization |
| **Performance Issues** | Memory leaks, N+1 query patterns, synchronous I/O in async contexts, inefficient loops |
| **Architecture Violations** | Circular dependencies, layer boundary violations, God classes, coupling anti-patterns |
| **Duplicate & Dead Code** | Copy-paste duplication, unreachable branches, unused exports, dead imports |
| **Missing Tests** | Functions and modules with zero test coverage, untested edge cases |
| **Dependency Issues** | Outdated packages, known CVEs, unlicensed dependencies, missing lock files |

---

### 👁️ Live Monitoring Engine

```bash
sentinel monitor ./my-project
```

Sentinel watches your repository in real time. Every time an AI agent writes a file, Sentinel analyses it within milliseconds and surfaces issues before they compound. The monitoring engine understands git events, file change patterns, and AI session boundaries — so it can tell the difference between a human refactor and an AI batch change.

---

### 🛡️ AI Guardian Engine

The Guardian engine understands **AI intent** — not just what code was written, but what the AI was trying to accomplish. When a Guardian session is active, Sentinel:

- Tracks the conversational context of AI coding sessions
- Understands the relationship between a prompt and the generated code
- Detects intent drift (when the AI's output diverges from the developer's instruction)
- Flags changes that accomplish something different from what was asked
- Provides human-readable explanations of every change, not just error codes

---

### 🔥 AI Firewall Engine

The Firewall intercepts high-risk AI operations before they execute:

```
[SENTINEL FIREWALL] ⛔ BLOCKED

Operation: Write to /app/auth/session.ts
Risk Level: CRITICAL
Reason: AI-generated code contains hardcoded JWT_SECRET value.
         This would expose authentication tokens in version control.

Action required:
  → Review the change in your AI agent
  → Replace hardcoded secret with environment variable
  → Re-run with SENTINEL_FIREWALL=warn to log instead of block
```

Configurable to warn, block, or require explicit approval for categories of operations.

---

### 🔧 Recovery Engine

When things go wrong — and with AI agents they will — the Recovery Engine:

- Analyses failures in production, staging, and CI environments
- Traces failures back to the specific AI-generated change that caused them
- Generates rollback patches automatically
- Provides plain-English root cause explanations
- Suggests targeted fixes rather than full rewrites

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           Developer                                  │
└─────────────────────────────┬───────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      AI Coding Agent                                 │
│           Claude Code · Cursor · Gemini CLI · Codex                  │
│                    Cline · RooCode · Kiro                            │
└─────────────────────────────┬───────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         SENTINEL                                     │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────┐  ┌──────────┐  │
│  │ Scan Engine │  │   Guardian   │  │  Firewall  │  │ Monitor  │  │
│  │             │  │              │  │            │  │          │  │
│  │  Bugs       │  │  AI Intent   │  │  Block     │  │  Watch   │  │
│  │  Security   │  │  Tracking    │  │  Warn      │  │  Diff    │  │
│  │  Secrets    │  │  Drift Det.  │  │  Approve   │  │  Alert   │  │
│  │  Perf       │  │  Explanation │  │            │  │          │  │
│  └─────────────┘  └──────────────┘  └────────────┘  └──────────┘  │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                    Recovery Engine                            │   │
│  │  Root Cause Analysis · Rollback Patches · Fix Suggestions    │   │
│  └──────────────────────────────────────────────────────────────┘   │
└─────────────────────────────┬───────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│              Reports · IDE · CI/CD · GitHub · Dashboard              │
│    Terminal · HTML · JSON · SARIF · VS Code · GitHub Actions         │
└─────────────────────────────────────────────────────────────────────┘
```

### Package Architecture

Sentinel is a TypeScript monorepo using `pnpm` workspaces. Each capability is a standalone package with its own public API, tests, and documentation.

| Package | Purpose |
|---|---|
| `@sentinel/core` | Shared types, schemas, Zod validators, base utilities |
| `@sentinel/scanner` | Repository Scan Engine — deep static analysis |
| `@sentinel/monitor` | Live Monitoring Engine — file watch + git event processing |
| `@sentinel/guardian` | AI Guardian Engine — intent tracking and drift detection |
| `@sentinel/firewall` | AI Firewall Engine — operation interception and approval |
| `@sentinel/recovery` | Recovery Engine — root cause and rollback |
| `@sentinel/ai` | AI provider integrations (OpenAI, Anthropic, Gemini) |
| `@sentinel/parser` | Language parsers for source code analysis |
| `@sentinel/ast` | AST utilities for cross-language analysis |
| `@sentinel/graph` | Dependency graph and module relationship analysis |
| `@sentinel/security` | Security vulnerability detectors |
| `@sentinel/performance` | Performance issue detectors |
| `@sentinel/architecture` | Architecture and pattern analysis |
| `@sentinel/dependency` | Dependency audit and CVE checking |
| `@sentinel/reporting` | Report generators — HTML, JSON, SARIF, Terminal |
| `@sentinel/plugin-sdk` | Plugin development kit for extensions |
| `@sentinel/plugins` | Official plugins |
| `@sentinel/policy` | Policy engine and configuration |
| `@sentinel/config` | Configuration schema and loader |
| `@sentinel/telemetry` | Anonymous usage telemetry (opt-in) |
| `@sentinel/analytics` | Internal analytics utilities |
| `@sentinel/logger` | Structured logging |
| `@sentinel/testing` | Shared testing utilities |
| `@sentinel/ui` | Shared React components for dashboard |
| `@sentinel/common` | Cross-package constants and helpers |
| `@sentinel/utils` | Low-level utilities |

---

## 📦 Installation

### npm / pnpm / yarn

```bash
# npm
npm install -g @sentinel/cli

# pnpm
pnpm add -g @sentinel/cli

# yarn
yarn global add @sentinel/cli

# Verify installation
sentinel --version
```

### npx (no install)

```bash
npx @sentinel/cli scan /path/to/project
```

### Docker

```bash
# Pull the image
docker pull sentinel/cli:latest

# Scan a project
docker run --rm -v $(pwd):/workspace sentinel/cli scan /workspace

# With HTML report output
docker run --rm \
  -v $(pwd):/workspace \
  -v $(pwd)/reports:/reports \
  sentinel/cli scan /workspace --format html --output /reports
```

### Docker Compose

```bash
docker compose up
```

See [Docker section](#-docker) for full `docker-compose.yml` configuration.

---

## 🖥️ CLI Commands

### `sentinel scan [target]`

Scan a repository for all categories of issues.

```bash
sentinel scan .
sentinel scan /path/to/project
sentinel scan . --format html --format json --open
sentinel scan . --format sarif --output ./reports
```

| Option | Description | Default |
|---|---|---|
| `-f, --format` | Output format: `terminal` `html` `json` `sarif` | `terminal` |
| `-o, --output` | Output directory for report files | `./sentinel-reports` |
| `-e, --exclude` | Glob patterns to exclude | `node_modules,.git,dist` |
| `--no-parallel` | Disable parallel scanning | Parallel enabled |
| `-w, --workers` | Number of worker threads | `4` |
| `--open` | Open HTML report in browser after scan | `false` |
| `--severity` | Minimum severity to report: `info` `warn` `error` `critical` | `info` |
| `--config` | Path to sentinel config file | `sentinel.config.ts` |
| `--no-cache` | Disable incremental scan cache | Cache enabled |

---

### `sentinel monitor [target]`

Watch a repository for changes and analyse in real time.

```bash
sentinel monitor .
sentinel monitor /path/to/project --debounce 500
```

| Option | Description | Default |
|---|---|---|
| `-d, --debounce` | Debounce delay in milliseconds | `300` |
| `-e, --exclude` | Glob patterns to exclude | `node_modules,.git,dist` |
| `--guardian` | Enable AI Guardian Engine | `false` |
| `--firewall` | Enable AI Firewall Engine | `false` |

---

### `sentinel report [scan-id]`

Generate a report from a previous scan result.

```bash
sentinel report latest --format html --open
sentinel report abc123 --format sarif
```

---

### `sentinel init`

Initialise a Sentinel configuration file in the current project.

```bash
sentinel init
sentinel init --preset strict
sentinel init --preset minimal
```

---

### `sentinel plugin install [plugin-id]`

Install a Sentinel plugin.

```bash
sentinel plugin install @sentinel/plugin-react
sentinel plugin install ./path/to/local/plugin
sentinel plugin list
sentinel plugin remove @sentinel/plugin-react
```

---

## 📊 Sample Output

### Terminal Output

```
┌─────────────────────────────────────────────────────────────┐
│  SENTINEL SCAN REPORT                                       │
│  Project: my-saas-app                                       │
│  Scanned: 247 files · 18,432 lines · 2.3 seconds           │
└─────────────────────────────────────────────────────────────┘

Score: 67/100  ⚠  Issues found that require attention

┌─── CRITICAL (3) ───────────────────────────────────────────┐
│                                                             │
│  🔴 HARDCODED_SECRET                                        │
│     src/config/database.ts:14                              │
│     Hardcoded connection string containing password         │
│     const db = new Database("postgres://admin:P@ssw0rd@...") │
│                                                             │
│  🔴 SQL_INJECTION                                           │
│     src/routes/users.ts:89                                  │
│     User input directly interpolated into SQL query         │
│     const query = `SELECT * FROM users WHERE id = ${id}`    │
│                                                             │
│  🔴 AI_HALLUCINATION                                        │
│     src/utils/parser.ts:23                                  │
│     Method `fs.readFileAsync()` does not exist in Node.js   │
│     AI agent invented a non-existent API method             │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─── HIGH (7) ── MEDIUM (14) ── LOW (12) ── INFO (9) ────────┐
│  See full HTML report: ./sentinel-reports/report.html       │
└─────────────────────────────────────────────────────────────┘

  Bugs            ████████░░░░░░  3 issues
  Security        ██████████████  8 issues
  AI Halluc.      ████░░░░░░░░░░  2 issues
  Secrets         ████████░░░░░░  3 issues
  Performance     ██░░░░░░░░░░░░  1 issue
  Architecture    ████░░░░░░░░░░  2 issues
  Duplicates      ██████░░░░░░░░  3 issues
  Missing Tests   ██████████░░░░  5 issues

✗ Scan failed — 3 critical issues must be resolved before deployment
```

---

## 📄 Report Formats

### Terminal

Coloured, severity-highlighted console output designed for local development workflows. Shows a summary score, categorised findings, and a full list sorted by severity.

### HTML

A rich, self-contained HTML report with:
- Overall project health score card (0–100)
- Interactive finding explorer with syntax-highlighted code snippets
- Category breakdown charts
- File-by-file issue navigation
- Exportable summary table
- No external dependencies — the HTML file works offline

```bash
sentinel scan . --format html --open
```

### JSON

Machine-readable output for custom tooling, dashboards, or programmatic post-processing.

```json
{
  "scanId": "abc123",
  "timestamp": "2026-01-15T09:23:00Z",
  "score": 67,
  "summary": {
    "critical": 3,
    "high": 7,
    "medium": 14,
    "low": 12,
    "info": 9,
    "total": 45
  },
  "findings": [
    {
      "id": "HARDCODED_SECRET",
      "severity": "critical",
      "file": "src/config/database.ts",
      "line": 14,
      "column": 15,
      "message": "Hardcoded database connection string with password",
      "rule": "sentinel/no-hardcoded-secrets",
      "fix": "Move to environment variable DATABASE_URL"
    }
  ]
}
```

### SARIF

Standard SARIF 2.1.0 output for direct integration with GitHub Code Scanning, Azure DevOps, and other SARIF-aware CI/CD systems.

```bash
sentinel scan . --format sarif --output ./reports
```

Upload to GitHub Code Scanning:

```yaml
- name: Upload SARIF
  uses: github/codeql-action/upload-sarif@v3
  with:
    sarif_file: reports/sentinel.sarif
```

---

## 🌐 Supported Languages

| Language | Scan | Monitor | Guardian | AST |
|---|---|---|---|---|
| TypeScript | ✅ Full | ✅ | ✅ | ✅ |
| JavaScript | ✅ Full | ✅ | ✅ | ✅ |
| Python | ✅ Full | ✅ | ✅ | ✅ |
| Go | ✅ Core | ✅ | 🔄 Beta | ✅ |
| Rust | ✅ Core | ✅ | 🔄 Beta | ✅ |
| Java | ✅ Core | ✅ | 🔄 Beta | 🔄 Beta |
| C# | 🔄 Beta | ✅ | 🔄 Beta | 🔄 Beta |
| Ruby | 🔄 Beta | ✅ | ❌ Planned | ❌ Planned |
| PHP | 🔄 Beta | ✅ | ❌ Planned | ❌ Planned |
| Kotlin | 🔄 Beta | ✅ | ❌ Planned | ❌ Planned |
| Swift | ❌ Planned | ✅ | ❌ Planned | ❌ Planned |
| SQL | ✅ Full | ✅ | ✅ | ✅ |
| YAML / JSON | ✅ Full | ✅ | ✅ | N/A |

---

## 🤖 AI Integrations

Sentinel integrates directly with all major AI coding agents:

### Claude Code

```bash
# Add to your Claude Code session
sentinel monitor . --guardian
```

Sentinel's Guardian Engine tracks your Claude Code conversation context and verifies each generated file against the stated intent.

### Cursor

Install the Sentinel VS Code extension. It activates automatically in Cursor and surfaces findings inline as you generate code.

### Gemini CLI

```bash
# Run alongside Gemini CLI
sentinel monitor . --firewall --severity critical
```

### Codex / OpenAI Codex CLI

Sentinel wraps Codex CLI sessions, intercepting file writes and validating them before the write completes.

### Cline / RooCode / Kiro

Install via the Sentinel Plugin SDK. Each agent has a dedicated plugin in the `@sentinel/plugins` package.

---

## 💻 IDE Integrations

### VS Code

Install the Sentinel extension from the VS Code Marketplace:

```
ext install sentinel.sentinel-vscode
```

Features:
- Inline issue highlighting as you type
- Problem panel integration
- Quick-fix suggestions
- Guardian mode for AI sessions
- Status bar score indicator

### Cursor

The VS Code extension works natively in Cursor. Additional Cursor-specific Guardian features activate automatically when a Cursor AI session is detected.

---

## 🔄 CI/CD Integrations

### GitHub Actions

```yaml
name: Sentinel Analysis

on: [push, pull_request]

jobs:
  sentinel:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run Sentinel Scan
        uses: sentinel/action@v1
        with:
          format: sarif
          severity: error

      - name: Upload SARIF to GitHub Code Scanning
        uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: sentinel-reports/sentinel.sarif
```

Sentinel exits with code `1` when critical or high issues are found, blocking PR merges automatically.

### GitLab CI

```yaml
sentinel:
  image: sentinel/cli:latest
  script:
    - sentinel scan . --format sarif --output reports
  artifacts:
    reports:
      sast: reports/sentinel.sarif
```

### Pre-commit Hook

```bash
# Install via Husky
npx husky add .husky/pre-commit "npx sentinel scan . --severity error --no-cache"
```

---

## 🔌 Plugin System

Sentinel's architecture is fully extensible via the Plugin SDK. Every official detection module is itself a plugin — the same API is available to third-party developers.

### Plugin Structure

```
my-sentinel-plugin/
├── index.ts        # Plugin entry point
├── manifest.json   # Plugin metadata
├── tests/
└── README.md
```

### manifest.json

```json
{
  "id": "my-team/custom-checker",
  "name": "Custom Team Checker",
  "version": "1.0.0",
  "description": "Enforces our team's internal coding standards",
  "entry": "index.js",
  "hooks": ["onFile", "onRepository", "onFinding"],
  "languages": ["typescript", "javascript"],
  "author": "My Team",
  "license": "MIT"
}
```

### Plugin API

```typescript
import { SentinelPlugin, SentinelContext, Finding } from '@sentinel/plugin-sdk';

const plugin: SentinelPlugin = {
  id: 'my-team/custom-checker',
  name: 'Custom Team Checker',
  version: '1.0.0',
  description: 'Enforces our team coding standards',

  hooks: {
    // Called for every file in the scan
    onFile: async (file, context: SentinelContext): Promise<Finding[]> => {
      const findings: Finding[] = [];

      // Example: detect direct console.log usage in production code
      if (file.path.includes('src/') && file.content.includes('console.log(')) {
        findings.push({
          ruleId: 'no-console-log',
          severity: 'warn',
          message: 'console.log found in production source. Use the logger utility.',
          file: file.path,
          line: file.content.split('\n').findIndex(l => l.includes('console.log(')) + 1,
          fix: 'Replace with logger.info() from @/lib/logger',
        });
      }

      return findings;
    },

    // Called once per repository scan with all results
    onRepository: async (repository, findings, context) => {
      // Aggregate-level checks
    },

    // Called when another plugin or Sentinel itself produces a finding
    onFinding: async (finding, context) => {
      // Augment or suppress findings from other plugins
    },
  },
};

export default plugin;
```

### Install a Plugin

```bash
sentinel plugin install my-team/custom-checker
sentinel plugin install ./path/to/local/plugin
sentinel plugin list
```

### Official Plugins

| Plugin | Purpose |
|---|---|
| `@sentinel/plugin-react` | React-specific pattern analysis and hooks rules |
| `@sentinel/plugin-nextjs` | Next.js App Router and Pages Router analysis |
| `@sentinel/plugin-prisma` | Prisma ORM query safety and migration analysis |
| `@sentinel/plugin-express` | Express.js security and middleware analysis |
| `@sentinel/plugin-aws` | AWS SDK usage patterns and IAM policy analysis |
| `@sentinel/plugin-docker` | Dockerfile best practices and security |
| `@sentinel/plugin-terraform` | Infrastructure-as-code security analysis |

---

## 📁 Project Structure

```
sentinel/
│
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── security_report.md
│   ├── DISCUSSION_TEMPLATE/
│   ├── PULL_REQUEST_TEMPLATE.md
│   ├── workflows/
│   │   ├── ci.yml              # Main CI pipeline
│   │   ├── release.yml         # Automated release pipeline
│   │   ├── lint.yml            # Code quality checks
│   │   ├── security.yml        # Security scanning
│   │   ├── benchmark.yml       # Performance benchmarks
│   │   ├── docs.yml            # Documentation build and deploy
│   │   └── nightly.yml         # Nightly integration tests
│   ├── CODEOWNERS
│   ├── FUNDING.yml
│   └── dependabot.yml
│
├── apps/
│   ├── cli/                    # @sentinel/cli — Command-line application
│   ├── dashboard/              # Web dashboard (Next.js)
│   ├── vscode-extension/       # VS Code / Cursor extension
│   └── desktop/                # Electron desktop app (planned)
│
├── packages/
│   ├── core/                   # @sentinel/core
│   ├── scanner/                # @sentinel/scanner
│   ├── monitor/                # @sentinel/monitor
│   ├── guardian/               # @sentinel/guardian
│   ├── firewall/               # @sentinel/firewall
│   ├── recovery/               # @sentinel/recovery
│   ├── ai/                     # @sentinel/ai
│   ├── parser/                 # @sentinel/parser
│   ├── ast/                    # @sentinel/ast
│   ├── graph/                  # @sentinel/graph
│   ├── security/               # @sentinel/security
│   ├── performance/            # @sentinel/performance
│   ├── architecture/           # @sentinel/architecture
│   ├── dependency/             # @sentinel/dependency
│   ├── reporting/              # @sentinel/reporting
│   ├── plugin-sdk/             # @sentinel/plugin-sdk
│   ├── plugins/                # @sentinel/plugins (official)
│   ├── policy/                 # @sentinel/policy
│   ├── config/                 # @sentinel/config
│   ├── telemetry/              # @sentinel/telemetry
│   ├── analytics/              # @sentinel/analytics
│   ├── logger/                 # @sentinel/logger
│   ├── testing/                # @sentinel/testing
│   ├── ui/                     # @sentinel/ui
│   ├── common/                 # @sentinel/common
│   └── utils/                  # @sentinel/utils
│
├── docs/
│   ├── architecture/           # Architecture decision records
│   ├── api/                    # API reference
│   ├── cli/                    # CLI documentation
│   ├── plugins/                # Plugin development guide
│   ├── integrations/           # Integration guides
│   ├── security/               # Security documentation
│   └── examples/               # Complete worked examples
│
├── examples/                   # Example projects with Sentinel configured
├── benchmarks/                 # Performance benchmark suite
├── scripts/                    # Build, release, and maintenance scripts
├── docker/                     # Docker and Docker Compose files
├── tests/                      # Cross-package integration tests
├── .changeset/                 # Changesets for versioning
│
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── SUPPORT.md
├── ROADMAP.md
├── CHANGELOG.md
├── GOVERNANCE.md
├── ARCHITECTURE.md
├── FAQ.md
├── LICENSE
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

---

## 📈 Benchmarks

Sentinel is designed for developer speed — it should never feel like a bottleneck.

| Project Size | Files | Lines | Scan Time | Memory |
|---|---|---|---|---|
| Small | 50 | 3,000 | < 0.5s | 80 MB |
| Medium | 250 | 18,000 | < 2.5s | 180 MB |
| Large | 1,000 | 75,000 | < 8s | 350 MB |
| Monorepo | 3,500 | 250,000 | < 22s | 600 MB |

*Benchmarks run on Apple M2 Pro with 4 worker threads. Results vary by hardware.*

Benchmark suite available at `benchmarks/` and runs automatically on the `benchmark` CI workflow.

---

## 🔐 Security Model

### What Sentinel Accesses

| Resource | Access | Purpose |
|---|---|---|
| Source code files | Read-only | Static analysis |
| Git history | Read-only | Change context for Guardian |
| File system | Write (reports dir only) | Report output |
| Network | Optional | AI provider APIs (if Guardian/Recovery enabled) |
| Environment | Read (configurable) | Secret detection calibration |

### What Sentinel Never Does

- Never uploads source code to any external server
- Never stores code in any cloud database
- Never requires authentication or login for local scan
- Never modifies code without explicit user approval (Firewall mode)

### Telemetry

Sentinel collects anonymous usage telemetry by default. This includes:
- CLI command names (not arguments)
- Scan duration and file count
- Finding category counts (not code content)
- Error types

**No source code, file names, finding details, or identifying information is ever transmitted.**

Opt out completely:

```bash
sentinel config set telemetry.enabled false
# or
SENTINEL_TELEMETRY=false sentinel scan .
```

---

## 🐳 Docker

### Quick Docker Run

```bash
# Scan current directory
docker run --rm -v $(pwd):/workspace sentinel/cli scan /workspace

# Generate HTML report
docker run --rm \
  -v $(pwd):/workspace \
  -v $(pwd)/sentinel-reports:/reports \
  sentinel/cli scan /workspace --format html --output /reports

# Watch mode
docker run --rm -v $(pwd):/workspace sentinel/cli monitor /workspace
```

### Docker Compose

```yaml
version: '3.8'

services:
  sentinel:
    image: sentinel/cli:latest
    volumes:
      - ./:/workspace:ro
      - ./sentinel-reports:/reports
    command: scan /workspace --format html --output /reports
    environment:
      - SENTINEL_TELEMETRY=false
```

```bash
docker compose up
```

---

## 🛠️ Development

### Prerequisites

| Tool | Version |
|---|---|
| Node.js | 20+ |
| pnpm | 9+ |
| TypeScript | 5.x (strict) |

### Setup

```bash
# Clone the repository
git clone https://github.com/ibtesaamaslam/sentinel.git
cd sentinel

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run the full test suite
pnpm test

# Type check all packages
pnpm typecheck

# Run linting
pnpm lint

# Development mode (watch + rebuild)
pnpm dev
```

### Running Tests

```bash
# All tests
pnpm test

# A specific package
pnpm --filter @sentinel/scanner test

# With coverage
pnpm test:coverage

# Watch mode
pnpm test:watch
```

### Building the CLI for Local Testing

```bash
cd apps/cli
pnpm build
node dist/index.js scan /path/to/test-project
```

---

## 🗺️ Roadmap

### ✅ v1.0 — Foundation

- [x] Repository Scan Engine
- [x] Terminal and HTML report formats
- [x] JSON and SARIF output
- [x] Live Monitoring Engine
- [x] Plugin SDK and plugin system
- [x] Docker support
- [x] GitHub Actions integration
- [x] TypeScript, JavaScript, Python full support

### 🔄 v1.1 — Intelligence Layer

- [ ] AI Guardian Engine — intent tracking
- [ ] AI Firewall Engine — operation interception
- [ ] VS Code extension with inline findings
- [ ] Incremental scan cache
- [ ] Recovery Engine — root cause analysis
- [ ] Go, Rust full language support

### 📅 v1.2 — Ecosystem

- [ ] Web dashboard (Next.js)
- [ ] GitHub App with PR annotations
- [ ] GitLab integration
- [ ] Official plugins: React, Next.js, Prisma, Express
- [ ] Java, C# language support

### 📅 v2.0 — Platform

- [ ] Team workspace and multi-project management
- [ ] Historical scan comparison and trend analysis
- [ ] Custom rule builder UI
- [ ] Webhook system for external integrations
- [ ] Electron desktop app
- [ ] API server for enterprise deployment

---

## 🤝 Contributing

Sentinel is open source and contributions of all kinds are welcome.

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/sentinel.git

# Create a feature branch
git checkout -b feature/add-python-async-detector

# Make your changes
# Write tests for new detection logic
# Update relevant package README

# Run tests and lint
pnpm test && pnpm lint

# Commit using conventional commit format
git commit -m "feat(scanner): add Python async/await misuse detector"

# Open a pull request
```

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting.

### Ways to Contribute

| Area | How |
|---|---|
| Bug reports | Open a GitHub Issue using the bug template |
| Feature requests | Open a GitHub Issue using the feature template |
| New detectors | Add to the relevant `@sentinel/security` or `@sentinel/scanner` package |
| New language support | Add a parser to `@sentinel/parser` |
| Plugins | Build using `@sentinel/plugin-sdk` and submit to the registry |
| Documentation | Edit files in `docs/` |
| Translations | See `docs/i18n/` |

---

## 👥 Community

- **GitHub Discussions** — Questions, ideas, and announcements
- **GitHub Issues** — Bug reports and feature requests
- **Discord** — Real-time community chat *(coming v1.1)*

---

## 📜 License

```
MIT License

Copyright (c) 2026 Ibtesaam Aslam — Sentinel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

---

<div align="center">

**Built by [Ibtesaam Aslam](https://github.com/ibtesaamaslam)**

*Because AI agents write code fast. Sentinel makes sure it's right.*

⭐ Star this repo if Sentinel saves your production from an AI-generated bug.

</div>