<div align="center">

<br/>

# 🛡️ SENTINEL

### *AI Software Engineering Safety Platform*
### Complete Technical Guide — v1.0

<br/>

> **"AI writes code faster than ever. Sentinel makes sure it's safe."**

<br/>

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
[![Vitest](https://img.shields.io/badge/Tests-Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)]()

<br/>

---

</div>

## Table of Contents

1. [Abstract](#1-abstract)
2. [The AI Code Safety Crisis](#2-the-ai-code-safety-crisis)
   - 2.1 [What Goes Wrong with AI-Generated Code](#21-what-goes-wrong-with-ai-generated-code)
   - 2.2 [Why Existing Tools Fall Short](#22-why-existing-tools-fall-short)
   - 2.3 [The Verification Gap](#23-the-verification-gap)
3. [Objectives & Design Principles](#3-objectives--design-principles)
4. [High-Level System Architecture](#4-high-level-system-architecture)
   - 4.1 [Architecture Diagram](#41-architecture-diagram)
   - 4.2 [Component Overview](#42-component-overview)
   - 4.3 [Data Flow](#43-data-flow)
5. [Engine 1 — Repository Scan Engine](#5-engine-1--repository-scan-engine)
   - 5.1 [Security Scanning](#51-security-scanning)
   - 5.2 [Secret Detection](#52-secret-detection)
   - 5.3 [Duplicate Code Detection](#53-duplicate-code-detection)
   - 5.4 [Dead Code Analysis](#54-dead-code-analysis)
   - 5.5 [Circular Dependency Analysis](#55-circular-dependency-analysis)
   - 5.6 [Performance Inspection](#56-performance-inspection)
   - 5.7 [Architecture Validation](#57-architecture-validation)
   - 5.8 [AI Hallucination Detection](#58-ai-hallucination-detection)
6. [Engine 2 — Live Monitoring Engine](#6-engine-2--live-monitoring-engine)
   - 6.1 [File Watching with Chokidar](#61-file-watching-with-chokidar)
   - 6.2 [Git Event Monitoring](#62-git-event-monitoring)
   - 6.3 [Dependency Monitoring](#63-dependency-monitoring)
   - 6.4 [Configuration Tracking](#64-configuration-tracking)
   - 6.5 [Incremental Rescanning](#65-incremental-rescanning)
   - 6.6 [Instant Alert System](#66-instant-alert-system)
7. [Engine 3 — AI Guardian Engine](#7-engine-3--ai-guardian-engine)
   - 7.1 [Supported AI Agents](#71-supported-ai-agents)
   - 7.2 [AI Change Analysis](#72-ai-change-analysis)
   - 7.3 [Risky Modification Detection](#73-risky-modification-detection)
   - 7.4 [Architectural Compliance Verification](#74-architectural-compliance-verification)
   - 7.5 [Issue Explanation & Suggestions](#75-issue-explanation--suggestions)
8. [Engine 4 — AI Firewall Engine](#8-engine-4--ai-firewall-engine)
   - 8.1 [Dangerous Shell Command Interception](#81-dangerous-shell-command-interception)
   - 8.2 [Authentication Modification Guard](#82-authentication-modification-guard)
   - 8.3 [Secret Exposure Prevention](#83-secret-exposure-prevention)
   - 8.4 [Configuration Safety Gate](#84-configuration-safety-gate)
   - 8.5 [Destructive Refactor Detection](#85-destructive-refactor-detection)
   - 8.6 [Firewall Rule Configuration](#86-firewall-rule-configuration)
9. [Engine 5 — Recovery Engine](#9-engine-5--recovery-engine)
   - 9.1 [Root Cause Analysis](#91-root-cause-analysis)
   - 9.2 [Rollback Generation](#92-rollback-generation)
   - 9.3 [Patch Generation](#93-patch-generation)
   - 9.4 [Automatic Remediation](#94-automatic-remediation)
   - 9.5 [Safe Recovery Workflows](#95-safe-recovery-workflows)
10. [Full Technology Stack — Justified](#10-full-technology-stack--justified)
11. [Complete Developer Workflow](#11-complete-developer-workflow)
12. [Project Structure — Annotated](#12-project-structure--annotated)
13. [Installation & Setup](#13-installation--setup)
    - 13.1 [Prerequisites](#131-prerequisites)
    - 13.2 [Local Installation](#132-local-installation)
    - 13.3 [Docker Setup](#133-docker-setup)
14. [Configuration Reference](#14-configuration-reference)
    - 14.1 [sentinel.config.ts](#141-sentinelconfigts)
    - 14.2 [Firewall Rules Configuration](#142-firewall-rules-configuration)
    - 14.3 [Architecture Policy Configuration](#143-architecture-policy-configuration)
15. [CLI Reference](#15-cli-reference)
16. [Report Formats — Deep Dive](#16-report-formats--deep-dive)
    - 16.1 [HTML Report](#161-html-report)
    - 16.2 [JSON Report](#162-json-report)
    - 16.3 [SARIF Report](#163-sarif-report)
17. [GitHub Actions Integration](#17-github-actions-integration)
18. [Plugin SDK](#18-plugin-sdk)
    - 18.1 [Plugin Architecture](#181-plugin-architecture)
    - 18.2 [Writing a Custom Plugin](#182-writing-a-custom-plugin)
    - 18.3 [Publishing a Plugin](#183-publishing-a-plugin)
19. [Enterprise Policy Enforcement](#19-enterprise-policy-enforcement)
20. [Security Analysis — Technical Reference](#20-security-analysis--technical-reference)
    - 20.1 [OWASP Top 10 Coverage](#201-owasp-top-10-coverage)
    - 20.2 [AI-Specific Vulnerability Patterns](#202-ai-specific-vulnerability-patterns)
    - 20.3 [Severity Classification](#203-severity-classification)
21. [Performance Benchmarks](#21-performance-benchmarks)
22. [Testing Strategy](#22-testing-strategy)
23. [Known Limitations in v1.0](#23-known-limitations-in-v10)
24. [Roadmap — v1.1 through v3.0](#24-roadmap--v11-through-v30)
25. [Conclusion — The Case for AI Code Governance](#25-conclusion--the-case-for-ai-code-governance)

---

## 1. Abstract

**Sentinel** is an AI-native Software Engineering Safety Platform designed to supervise, verify, and secure AI-assisted software development. It operates not as a code generator but as an intelligent **verification layer** positioned between developers and AI coding agents — including Claude Code, Cursor, Gemini CLI, OpenAI Codex, Cline, and RooCode.

Sentinel's core thesis is that AI code generation and AI code governance must be treated as separate, independent concerns. A tool that both writes code and verifies its own output cannot be trusted to catch its own mistakes. Sentinel is purpose-built for the second role only.

The platform provides five integrated engines: a Repository Scan Engine for deep static analysis, a Live Monitoring Engine for continuous change detection, an AI Guardian Engine for supervising AI agent behaviour, an AI Firewall Engine for blocking dangerous operations before they execute, and a Recovery Engine for automated remediation when problems are detected.

Together, these engines create a continuous safety envelope around AI-assisted development — ensuring that AI-generated code is secure, architecturally consistent, production-ready, and compliant with engineering standards before it reaches production.

---

## 2. The AI Code Safety Crisis

### 2.1 What Goes Wrong with AI-Generated Code

AI coding assistants have fundamentally changed development velocity. A feature that took three days can now be scaffolded in three hours. But velocity without verification is liability.

The failure modes of AI-generated code are well-documented and systematic:

**Security Vulnerabilities:**

AI models are trained on public code that includes insecure patterns. Without explicit prompting for security, AI assistants frequently generate:

```typescript
// AI-generated — SQL injection vulnerability
const query = `SELECT * FROM users WHERE id = ${userId}`;

// Sentinel catches this and flags:
// CRITICAL: SQL Injection via string interpolation
// Fix: Use parameterised queries → db.query('SELECT * FROM users WHERE id = ?', [userId])
```

```typescript
// AI-generated — XSS vulnerability
element.innerHTML = userInput;

// Sentinel catches this and flags:
// HIGH: XSS via innerHTML with unsanitised input
// Fix: Use textContent or a sanitisation library
```

**Hallucinated APIs:**

AI models confidently reference npm packages, API methods, and library functions that do not exist — or that existed in older versions and have been removed.

```typescript
// AI-generated — hallucinated npm package
import { parseSecureToken } from 'jwt-secure-plus'; // Does not exist

// AI-generated — hallucinated method
const result = await supabase.auth.verifyOTP(token); // Method signature incorrect
```

**Hardcoded Secrets:**

AI assistants frequently generate placeholder credentials that developers leave in place:

```typescript
// AI-generated — hardcoded credentials
const db = new Database({
  host: 'prod-db.company.com',
  password: 'MySecretPassword123',  // CRITICAL: Secret in source
  apiKey: 'sk-abc123xyz...'         // CRITICAL: API key exposed
});
```

**Duplicate Business Logic:**

AI agents working across a codebase often implement the same logic multiple times without awareness of existing implementations:

```typescript
// AI-generated in UserService.ts — already exists in AuthService.ts
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}
```

**Architecture Violations:**

AI agents don't understand your team's architectural decisions. They generate code that works but violates the constraints your team has agreed upon:

```typescript
// AI-generated in a feature module — violates hexagonal architecture
// Direct database access from presentation layer
import { db } from '../../infrastructure/database'; // VIOLATION: Feature → DB direct access
```

---

### 2.2 Why Existing Tools Fall Short

| Tool Type | What It Solves | What It Misses |
|---|---|---|
| ESLint / Biome | Syntax, style, basic patterns | AI-specific hallucinations, semantic duplicates, architectural violations |
| Snyk / Dependabot | Known CVEs in dependencies | AI-generated insecure code patterns, logical vulnerabilities |
| SonarQube | Code quality, some security | AI agent behaviour, live monitoring, firewall interception |
| GitHub Advanced Security | Secret scanning, code scanning | AI guardian supervision, recovery, architecture validation |
| Semgrep | Custom pattern matching | Not AI-aware, no live monitoring, no recovery, no firewall |
| Human code review | Catches most issues | Slow, expensive, doesn't scale to AI-generation velocity |

No existing tool was designed with AI coding agents as the primary threat model. They assume human authors who make human mistakes. Sentinel assumes AI authors who make AI mistakes — at AI speed.

---

### 2.3 The Verification Gap

```
Without Sentinel:

Developer → prompts AI Agent → AI generates code → code merged → production incident

With Sentinel:

Developer → prompts AI Agent → AI generates code
                                        ↓
                              Sentinel intercepts
                                        ↓
                    ┌───────────────────┴──────────────────────┐
                    │                                           │
              Issues found                              No issues found
                    │                                           │
          Block + Explain + Fix                         Approve → Merge
```

The verification gap is the time between AI code generation and human review. In high-velocity teams using AI agents, this gap can represent hundreds of code changes per day. Sentinel closes this gap automatically.

---

## 3. Objectives & Design Principles

**Primary Objectives:**

| Objective | How Sentinel Addresses It |
|---|---|
| Improve trust in AI-generated software | Every AI change is verified before merge |
| Reduce production incidents | Block dangerous patterns before deployment |
| Detect vulnerabilities earlier | Real-time scanning at write time, not review time |
| Supervise AI coding agents | AI Guardian observes and annotates all AI changes |
| Enforce engineering policies | Configurable rules for architecture, style, security |
| Automate repository health analysis | Continuous background scanning with incremental updates |
| Generate actionable reports | HTML, JSON, SARIF with specific file/line/fix information |
| Support enterprise development | Plugin SDK, policy enforcement, team analytics |

**Design Principles:**

**Verification-only:** Sentinel never generates, modifies, or suggests changes automatically without explicit human approval. It is a safety layer, not an autonomous agent.

**Non-blocking by default:** Sentinel reports issues without blocking CI by default. Blocking behaviour is opt-in, configurable per rule and per severity.

**Agent-agnostic:** Sentinel does not require integration with specific AI agents. It observes their output (file changes) and is compatible with any AI tool that writes to the filesystem.

**Incremental:** Full repository scans are run on demand. Live monitoring uses incremental rescanning — only changed files are re-analysed, keeping monitoring overhead minimal.

**Extensible:** The Plugin SDK allows teams to write custom rules, custom report formats, and custom remediation strategies without modifying Sentinel's core.

---

## 4. High-Level System Architecture

### 4.1 Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                           DEVELOPER ENVIRONMENT                              │
│                                                                              │
│   ┌─────────────┐    ┌─────────────────────────────────────────────────┐    │
│   │  Developer  │───▶│            AI Coding Agent                      │    │
│   └─────────────┘    │  Claude Code · Cursor · Gemini CLI · Codex      │    │
│                      │  Cline · RooCode · any file-writing AI tool     │    │
│                      └────────────────────┬────────────────────────────┘    │
│                                           │ writes files to filesystem      │
│                                           ▼                                 │
│   ┌────────────────────────────────────────────────────────────────────┐    │
│   │                     SENTINEL PLATFORM                              │    │
│   │                                                                    │    │
│   │  ┌─────────────────────────────────────────────────────────────┐  │    │
│   │  │              AI FIREWALL ENGINE                             │  │    │
│   │  │  Intercepts dangerous commands before execution             │  │    │
│   │  │  Shell commands · Auth changes · Secret writes · Rm -rf    │  │    │
│   │  └──────────────────────────────┬──────────────────────────────┘  │    │
│   │                                 │ allowed changes pass through     │    │
│   │                                 ▼                                 │    │
│   │  ┌──────────────────┐  ┌───────────────────┐  ┌───────────────┐  │    │
│   │  │  LIVE MONITORING │  │   AI GUARDIAN     │  │  REPO SCAN   │  │    │
│   │  │     ENGINE       │  │     ENGINE        │  │    ENGINE    │  │    │
│   │  │                  │  │                   │  │              │  │    │
│   │  │  Chokidar watch  │  │  Classify changes │  │  Full static │  │    │
│   │  │  Git events      │  │  Risk assessment  │  │  analysis    │  │    │
│   │  │  Dep monitoring  │  │  Arch compliance  │  │  On demand   │  │    │
│   │  │  Config tracking │  │  Issue explain    │  │              │  │    │
│   │  └────────┬─────────┘  └────────┬──────────┘  └──────┬───────┘  │    │
│   │           │                     │                     │          │    │
│   │           └─────────────────────┼─────────────────────┘          │    │
│   │                                 │ findings                        │    │
│   │                                 ▼                                 │    │
│   │  ┌─────────────────────────────────────────────────────────────┐  │    │
│   │  │              RECOVERY ENGINE                                │  │    │
│   │  │  Root cause · Rollback · Patch · Remediation                │  │    │
│   │  └─────────────────────────────────────────────────────────────┘  │    │
│   │                                 │                                  │    │
│   │                                 ▼                                  │    │
│   │  ┌─────────────────────────────────────────────────────────────┐  │    │
│   │  │              REPORT GENERATION                              │  │    │
│   │  │         HTML · JSON · SARIF · GitHub Annotations           │  │    │
│   │  └─────────────────────────────────────────────────────────────┘  │    │
│   └────────────────────────────────────────────────────────────────────┘    │
│                                           │                                 │
│                                           ▼                                 │
│                         ┌─────────────────────────────┐                    │
│                         │   APPROVAL GATE             │                    │
│                         │   Approved → Merge → Deploy │                    │
│                         │   Blocked  → Fix → Re-scan  │                    │
│                         └─────────────────────────────┘                    │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

### 4.2 Component Overview

| Component | Type | Runtime | Primary Responsibility |
|---|---|---|---|
| Repository Scan Engine | Background process | On demand / CI | Deep static analysis of entire codebase |
| Live Monitoring Engine | Daemon | Always-on | File system change detection and incremental analysis |
| AI Guardian Engine | Middleware | Per AI change | Classify, risk-score, and explain AI agent changes |
| AI Firewall Engine | Interceptor | Pre-execution | Block dangerous operations before they reach the filesystem |
| Recovery Engine | Service | On trigger | Automated issue remediation and rollback |
| Report Generator | Service | Post-scan | Produce HTML, JSON, SARIF output |
| Next.js Dashboard | Web app | Always-on | Real-time monitoring UI and configuration |
| SQLite Store | Database | Always-on | Persist scan results, findings, history, config |
| Plugin SDK | Library | Load time | Custom rules, reporters, remediators |

---

### 4.3 Data Flow

```
File Change Detected (Chokidar or Git hook)
            │
            ▼
    AI Firewall Check
      ├── BLOCKED → Log + Alert + (optionally) Revert
      └── ALLOWED ──────────────────────────────────────▶ Continue
                                                              │
                                                              ▼
                                                   Incremental Analysis
                                                              │
                                              ┌───────────────┼───────────────┐
                                              │               │               │
                                         Security        Duplicate       Architecture
                                          Scan           Detection       Validation
                                              │               │               │
                                              └───────────────┼───────────────┘
                                                              │
                                                              ▼
                                                     Findings Aggregated
                                                              │
                                              ┌───────────────┼───────────────┐
                                              │               │               │
                                         No issues        Issues          Critical
                                              │            found           issues
                                              ▼               │               │
                                         Approve             ▼               ▼
                                                     Recovery Engine     Firewall
                                                     auto-patches       blocks merge
                                                              │
                                                              ▼
                                                     Report Generated
                                                     (HTML + JSON + SARIF)
```

---

## 5. Engine 1 — Repository Scan Engine

The Repository Scan Engine performs comprehensive static analysis of the entire codebase. It is powered by **Tree-sitter** for language-agnostic AST parsing and **ts-morph** for deep TypeScript-specific semantic analysis.

**Invocation modes:**

| Mode | Trigger | Scope |
|---|---|---|
| Full scan | `sentinel scan` CLI command | Entire repository |
| CI scan | GitHub Actions workflow | Changed files in PR + dependency graph |
| Incremental | Live monitoring trigger | Changed files only |
| Scheduled | Cron job | Full repository, nightly |

---

### 5.1 Security Scanning

The security scanner analyses code for vulnerability patterns across multiple categories. It uses Tree-sitter to parse code into an Abstract Syntax Tree and then applies pattern matching rules against AST nodes — giving it semantic understanding beyond simple string matching.

**Injection Attack Detection:**

```typescript
// DETECTED: SQL Injection via template literal
const query = `SELECT * FROM users WHERE email = '${userEmail}'`;

// DETECTED: Command Injection via exec with user input
exec(`git clone ${repoUrl}`);

// DETECTED: LDAP Injection
const filter = `(uid=${username})`;
```

**For each finding, Sentinel produces:**

```json
{
  "id": "SEC-001",
  "type": "sql_injection",
  "severity": "critical",
  "file": "src/services/UserService.ts",
  "line": 47,
  "column": 18,
  "code_snippet": "const query = `SELECT * FROM users WHERE email = '${userEmail}'`",
  "explanation": "String interpolation in SQL query allows injection if userEmail contains SQL metacharacters.",
  "cwe": "CWE-89",
  "owasp": "A03:2021 – Injection",
  "fix": "Use parameterised queries: db.query('SELECT * FROM users WHERE email = $1', [userEmail])",
  "confidence": 0.97,
  "detected_by": "tree-sitter pattern: template_literal_in_sql_context"
}
```

---

### 5.2 Secret Detection

The secret detector scans for credentials, API keys, tokens, and passwords across all file types — including source code, configuration files, environment files, comments, and string literals.

**Detection strategy — four-layer approach:**

**Layer 1 — High-entropy string detection:**
Strings with Shannon entropy above a configurable threshold (default: 4.5 bits/char) are flagged as potential secrets.

```typescript
// Flagged — entropy: 5.8
const apiKey = "sk-proj-xK9mN2pQ7rT1uW5vZ8yA3bC6dE0fG4hI";

// Not flagged — entropy: 2.1
const username = "john.doe";
```

**Layer 2 — Pattern matching for known secret formats:**

| Secret Type | Pattern | Example Match |
|---|---|---|
| OpenAI API Key | `sk-[a-zA-Z0-9]{48}` | `sk-proj-abc...` |
| AWS Access Key | `AKIA[0-9A-Z]{16}` | `AKIAIOSFODNN7EXAMPLE` |
| GitHub Token | `gh[pousr]_[A-Za-z0-9_]{36}` | `ghp_abc123...` |
| Stripe Key | `sk_live_[0-9a-zA-Z]{24}` | `sk_live_abc...` |
| JWT | `eyJ[A-Za-z0-9+/]{20,}` | `eyJhbGci...` |
| Private Key | `-----BEGIN.*PRIVATE KEY-----` | RSA, EC keys |
| Database URLs | `postgres://.*:.*@` | Connection strings |
| Generic password | `password\s*[=:]\s*["'][^"']{8,}` | `password = "secret"` |

**Layer 3 — Contextual analysis:**
Variable names, function names, and surrounding context increase or decrease confidence scores.

```typescript
// High confidence (variable name + high entropy)
const DB_PASSWORD = "Tr0ub4dor&3";  // confidence: 0.98

// Lower confidence (could be test fixture)
const testToken = "abc123def456";    // confidence: 0.45
```

**Layer 4 — Known test value exclusion:**
A curated list of known safe test values (common tutorial credentials, example tokens) is excluded from reporting to reduce false positives.

---

### 5.3 Duplicate Code Detection

Duplicate business logic is one of the most common and costly AI generation problems — AI agents independently implement the same functionality without awareness of existing code.

**Detection approach:**

Sentinel uses **normalised AST fingerprinting** — not text comparison — making it robust to variable renaming, whitespace differences, and minor structural variations.

```
For each function in the codebase:
  1. Parse function to AST via Tree-sitter
  2. Normalise: strip identifiers, replace all variable names with placeholders
  3. Serialise normalised AST to a canonical string
  4. Hash with SHA-256
  5. Compare hash against index of all other function hashes
  6. If match found with similarity > threshold (default: 0.85):
     → Report duplicate pair with file locations
```

**Example detection:**

```typescript
// UserService.ts — original
function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// AuthController.ts — AI-generated duplicate (same logic, different variable names)
function checkEmailFormat(emailAddress: string): boolean {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(emailAddress);
}
```

**Finding output:**

```json
{
  "type": "duplicate_logic",
  "severity": "medium",
  "similarity": 0.94,
  "original": {
    "file": "src/services/UserService.ts",
    "function": "validateEmail",
    "lines": "12-15"
  },
  "duplicate": {
    "file": "src/controllers/AuthController.ts",
    "function": "checkEmailFormat",
    "lines": "88-91"
  },
  "recommendation": "Extract to shared utility: src/utils/validation.ts"
}
```

---

### 5.4 Dead Code Analysis

Dead code — exported symbols, functions, classes, and components that are defined but never imported or called anywhere in the codebase — is detected using ts-morph's cross-file reference tracking.

**What is detected:**

- Exported functions with zero import references across the codebase
- React components defined but never rendered
- TypeScript interfaces defined but never used
- Constants defined but never referenced
- CSS classes defined but not applied to any element (with CSS-in-JS analysis)

**Dead code is especially common in AI-generated code because:**
AI agents often generate helper functions "just in case" or scaffold code for features they think might be needed, without knowing whether that code is actually used.

**False positive prevention:**
Public API exports, barrel file re-exports, and symbols marked with a `// @sentinel-keep` comment are excluded from dead code reports.

---

### 5.5 Circular Dependency Analysis

Circular dependencies cause module initialisation errors, make code harder to test, and indicate architectural violations. They are particularly common in AI-generated code where the AI does not have awareness of the existing dependency graph.

**Detection algorithm — DFS on module graph:**

```
Build directed graph:
  nodes = all modules (files) in repository
  edges = import/require statements between files

For each node v in graph:
  Run DFS from v
  If DFS revisits v → circular dependency detected
  Record path: v → a → b → ... → v
```

**Output example:**

```
CIRCULAR DEPENDENCY DETECTED:
  src/services/UserService.ts
    → src/models/UserModel.ts
    → src/services/AuthService.ts
    → src/services/UserService.ts  ← cycle

Severity: HIGH
Impact: Module initialisation may fail; unit testing requires complex mocking
Fix: Extract shared types to src/types/User.ts to break the cycle
```

---

### 5.6 Performance Inspection

Sentinel scans for code patterns that will cause measurable performance degradation in production.

**Detected patterns:**

| Pattern | Detection Method | Severity |
|---|---|---|
| N+1 database queries | ORM call inside loop | High |
| Missing `await` on async | ts-morph async flow analysis | High |
| Synchronous file I/O on hot path | `fs.readFileSync` in request handler | Medium |
| Nested loops with O(n²) complexity | AST loop nesting depth analysis | Medium |
| Memory leak — unclosed resources | `setInterval` without `clearInterval` | High |
| Large payload serialisation | `JSON.stringify` of potentially large objects | Low |
| Unbounded array growth | Array push inside loop without limit | Medium |
| Missing database indexes | ORM queries on unindexed columns (with schema analysis) | Medium |

```typescript
// DETECTED: N+1 query pattern
const orders = await Order.findAll();
for (const order of orders) {
  // AI generated this loop — Sentinel detects the N+1
  const customer = await Customer.findById(order.customerId);
}

// Sentinel recommends:
// Use eager loading: Order.findAll({ include: [Customer] })
```

---

### 5.7 Architecture Validation

Sentinel enforces architectural constraints defined in `sentinel.config.ts`. It models the intended architecture and detects any import or dependency that violates the defined layer boundaries.

**Supported architecture patterns:**

- **Hexagonal Architecture** (ports and adapters)
- **Clean Architecture** (domain, application, infrastructure layers)
- **Feature-Sliced Design** (features, entities, shared layers)
- **Custom** (any layer constraint expressed as allow/deny import rules)

**Configuration example:**

```typescript
// sentinel.config.ts
export default {
  architecture: {
    type: 'clean',
    layers: {
      domain: {
        path: 'src/domain/**',
        canImport: [],  // Domain layer imports nothing
      },
      application: {
        path: 'src/application/**',
        canImport: ['src/domain/**'],
      },
      infrastructure: {
        path: 'src/infrastructure/**',
        canImport: ['src/domain/**', 'src/application/**'],
      },
      presentation: {
        path: 'src/presentation/**',
        canImport: ['src/application/**'],
        cannotImport: ['src/infrastructure/**', 'src/domain/**'],
      }
    }
  }
}
```

**Violation detection:**

```
ARCHITECTURE VIOLATION:
  src/presentation/components/UserList.tsx
  imports: src/infrastructure/database/UserRepository.ts

  Violation: presentation layer cannot import infrastructure layer
  Rule: presentation.cannotImport includes 'src/infrastructure/**'

  Fix: Add UserRepository access through an application service:
       src/application/services/UserService.ts
```

---

### 5.8 AI Hallucination Detection

This is one of Sentinel's most distinctive capabilities. It detects API hallucinations — references to npm packages, methods, or classes that do not exist.

**Detection strategy:**

**Step 1 — Package existence check:**
All `import` and `require` statements are extracted. Package names are verified against:
- Local `node_modules` (installed packages)
- The npm registry (for packages not installed but referenced)
- A curated list of commonly hallucinated package names

```typescript
// DETECTED: Hallucinated package
import { generateSecureJwt } from 'jwt-secure-plus';  // Does not exist on npm

// DETECTED: Hallucinated package
import { analyzeText } from 'openai-text-utils';       // Does not exist on npm
```

**Step 2 — Method/property existence check:**
Using ts-morph's type analysis, method calls are checked against the type definitions of imported packages.

```typescript
import { OpenAI } from 'openai';
const client = new OpenAI();

// DETECTED: Method 'analyzeImage' does not exist on OpenAI client
const result = await client.analyzeImage(imageBuffer);

// Sentinel provides:
// Nearest valid method: client.chat.completions.create()
// Suggested reference: OpenAI Vision API usage
```

**Step 3 — API version mismatch:**
Method signatures are checked against the installed package version — catching cases where AI was trained on an older API that has changed.

---

## 6. Engine 2 — Live Monitoring Engine

The Live Monitoring Engine runs as a persistent background daemon, providing real-time awareness of every change in the repository.

### 6.1 File Watching with Chokidar

Sentinel uses **Chokidar** — a battle-tested Node.js file system watcher — to monitor the repository for changes.

```typescript
// Internal Sentinel implementation
const watcher = chokidar.watch(repositoryRoot, {
  ignored: [
    '**/node_modules/**',
    '**/.git/**',
    '**/dist/**',
    '**/build/**',
    '**/*.generated.*',
  ],
  persistent: true,
  usePolling: false,          // Uses native fs events (inotify/FSEvents/ReadDirectoryChanges)
  awaitWriteFinish: {
    stabilityThreshold: 300, // Wait 300ms after last write before triggering
    pollInterval: 100,
  },
  ignoreInitial: true,        // Don't fire events for existing files on startup
});

watcher.on('change', handleFileChange);
watcher.on('add', handleFileAdd);
watcher.on('unlink', handleFileDelete);
```

**Performance characteristics:**
- 0ms latency for detecting changes (native OS file system events)
- CPU overhead: < 0.5% on a modern machine
- Memory: ~15MB for watching 10,000 files

---

### 6.2 Git Event Monitoring

Beyond file-level changes, Sentinel monitors Git repository events:

| Git Event | Sentinel Action |
|---|---|
| `pre-commit` hook | Run incremental scan on staged files; block commit if critical issues found |
| `post-commit` hook | Record commit hash for change tracking |
| `pre-push` hook | Run full scan if configured; block push if policy violations detected |
| Branch switch | Update baseline for incremental comparison |
| Merge/rebase | Full rescan of conflicted/modified files |

**Git hook installation:**

```bash
sentinel hooks install
# Installs .git/hooks/pre-commit, pre-push, post-commit
```

---

### 6.3 Dependency Monitoring

When `package.json` or any lock file changes, Sentinel automatically:

1. Runs `npm audit` (or `pnpm audit`) and ingests the vulnerability report
2. Checks all new/updated packages against the hallucination database
3. Detects if a package was unexpectedly removed (breaking import dependencies)
4. Flags packages with known malicious versions (supply chain attack detection)
5. Checks license compliance against the configured allowed license list

---

### 6.4 Configuration Tracking

Changes to sensitive configuration files trigger immediate analysis:

| Config File | What Sentinel Checks |
|---|---|
| `.env`, `.env.*` | New secrets added, public var naming violations |
| `tsconfig.json` | Compiler options weakened (e.g., `strict: false`, `noImplicitAny: false`) |
| `next.config.js` | CSP headers removed, dangerous redirects added |
| `docker-compose.yml` | Exposed ports, root user containers, volume mounts to sensitive paths |
| `Dockerfile` | Base image changed, secrets baked into layers, running as root |
| CI/CD workflow files | New external action dependencies, secret environment variables exposed |
| Database migration files | Destructive operations (DROP TABLE, TRUNCATE) without backup steps |

---

### 6.5 Incremental Rescanning

When a file changes, only that file and its **dependency graph neighbourhood** are rescanned — not the entire repository.

```
File changed: src/services/PaymentService.ts

Incremental rescan scope:
  1. PaymentService.ts                        (changed file)
  2. All files that import PaymentService.ts   (dependents)
  3. All files imported by PaymentService.ts   (dependencies)
  
Files NOT rescanned:
  - Everything else in the repository

Typical incremental scan time: 80–400ms
Full repository scan time: 2–45 seconds (depending on repository size)
```

---

### 6.6 Instant Alert System

When the Live Monitoring Engine detects a finding, alerts are delivered through configured channels:

| Channel | Configuration | Use Case |
|---|---|---|
| Terminal notification | Always on | Developer sees inline alert immediately |
| Dashboard (Next.js) | Always on | Real-time findings list with detail view |
| GitHub PR comment | `github.alerts: true` | AI-generated annotation on changed lines |
| Slack webhook | `slack.webhookUrl: "..."` | Team-wide notification for critical findings |
| Email | `email.recipients: [...]` | Daily digest or immediate critical alerts |
| Custom webhook | `alerts.webhook: "..."` | Integration with PagerDuty, Opsgenie, etc. |

---

## 7. Engine 3 — AI Guardian Engine

The AI Guardian Engine is the core of Sentinel's AI supervision capability. It analyses changes attributed to AI coding agents and applies AI-specific risk assessment.

### 7.1 Supported AI Agents

Sentinel detects and monitors output from:

| AI Agent | Detection Method |
|---|---|
| **Claude Code** | Git author metadata, file touch patterns, commit message patterns |
| **Cursor** | `.cursor` directory presence, Cursor-specific commit signatures |
| **Gemini CLI** | `gemini-cli` process ID in file modification metadata |
| **OpenAI Codex** | Codex API integration markers |
| **Cline** | `.cline` configuration file, Cline commit patterns |
| **RooCode** | RooCode workspace metadata |
| **Any agent** | Configurable: file modification velocity, change pattern heuristics |

**Manual attribution:**
Developers can manually mark a change as AI-generated for Guardian analysis:

```bash
sentinel guardian --file src/services/PaymentService.ts
```

---

### 7.2 AI Change Analysis

When an AI agent change is detected, the Guardian performs a structured analysis:

```
AI CHANGE ANALYSIS REPORT
─────────────────────────
Agent:          Claude Code (detected via commit metadata)
Timestamp:      2025-06-14 14:32:07 UTC
Files changed:  3 (src/services/PaymentService.ts, src/types/Payment.ts, src/routes/payment.ts)
Lines added:    +247
Lines removed:  -12
Change type:    Feature addition (new payment processing logic)

Risk Assessment:
  Overall risk:    MEDIUM
  Security risk:   HIGH   (handles financial data, requires careful review)
  Architecture:    LOW    (follows established patterns)
  Duplication:     MEDIUM (partial overlap with existing InvoiceService.ts)
  Hallucinations:  NONE   (all packages and methods verified)
  Tests:           LOW    (no test file added for new service)

Findings:
  [HIGH]   Line 47: Payment amount not validated before processing
  [MEDIUM] Line 89: Partial duplicate of InvoiceService.calculateTotal()
  [LOW]    No test coverage added for PaymentService

Required Actions:
  1. Add input validation for payment.amount (min: 0, max: configurable)
  2. Review duplication with InvoiceService — extract to shared utility
  3. Add unit tests before merge approval
```

---

### 7.3 Risky Modification Detection

The Guardian maintains a risk taxonomy for AI changes:

| Risk Category | Detection Signal | Default Response |
|---|---|---|
| **Financial data handling** | Payment, invoice, billing, stripe keywords in changed code | Escalate to HIGH |
| **Authentication code** | Login, JWT, session, auth, password keywords | Escalate to HIGH + require human review |
| **Database schema changes** | Migration files, schema.prisma, DDL statements | Require explicit approval |
| **Large file deletion** | Files > 1KB deleted | Alert + soft block |
| **Mass refactoring** | > 30% of file changed in single AI operation | Require human review |
| **New external dependencies** | New npm packages added | Dependency analysis triggered |
| **Environment config changes** | `.env` files modified | Immediate critical alert |
| **CI/CD changes** | GitHub Actions, Dockerfile changed | Security review required |

---

### 7.4 Architectural Compliance Verification

The Guardian verifies each AI-generated change against the architectural rules defined in `sentinel.config.ts`:

```
ARCHITECTURAL COMPLIANCE CHECK — PaymentService.ts

  ✅ Layer placement:     infrastructure/services → ALLOWED
  ✅ Dependency imports:  domain types only → COMPLIANT
  ✅ Naming conventions:  PascalCase class, camelCase methods → COMPLIANT
  ⚠️  File size:           PaymentService.ts is 847 lines → EXCEEDS limit of 500
  ❌  Circular dependency: PaymentService → OrderService → PaymentService

  Overall: PARTIAL VIOLATION
  Block merge: NO (configured as warning-only for architecture rules)
```

---

### 7.5 Issue Explanation & Suggestions

For each finding, the Guardian generates a human-readable explanation designed for developers who may not have deep security expertise:

```
FINDING: Hard-coded payment API key
─────────────────────────────────────
What happened:
  The AI generated code with a Stripe API key directly embedded in the source
  file. This is a critical security issue because source code is stored in Git,
  and anyone with repository access — including future contributors and any 
  compromised Git hosting accounts — can see and use this key.

Why it matters:
  An exposed Stripe live key would allow anyone to process charges on your
  account, issue refunds, cancel subscriptions, or access customer payment data.

How to fix it:
  1. Immediately rotate this Stripe key in your Stripe dashboard
  2. Move the key to your .env file:
     STRIPE_SECRET_KEY=sk_live_...
  3. Update the code to use:
     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  4. Add STRIPE_SECRET_KEY to your .env.example (without the actual value)
  5. Verify .env is in your .gitignore

Prevention:
  Add "STRIPE_SECRET_KEY" to your sentinel.config.ts secrets.patterns list
  so future occurrences are caught immediately.
```

---

## 8. Engine 4 — AI Firewall Engine

The AI Firewall Engine is the most proactive component of Sentinel — it blocks dangerous operations **before they execute**, not after.

### 8.1 Dangerous Shell Command Interception

When integrated as a shell middleware or IDE extension, the Firewall intercepts shell commands generated by AI agents before execution.

**Blocked command patterns:**

```bash
# BLOCKED: Recursive deletion without confirmation
rm -rf ./src

# BLOCKED: Unqualified package installation (no version pinning)
npm install some-package

# BLOCKED: Git history rewrite that could destroy evidence
git rebase -i HEAD~100 --exec "git commit --amend --reset-author"

# BLOCKED: Secret written to stdout (could appear in logs)
echo "API_KEY=sk-abc123"

# BLOCKED: Curl with sensitive header (API key in shell history)
curl -H "Authorization: Bearer sk-abc123" https://api.service.com/admin
```

**Allow-listed patterns:**

```bash
# ALLOWED: Specific safe rm with path confirmation
rm -rf ./dist

# ALLOWED: npm install with explicit version
npm install lodash@4.17.21

# ALLOWED: Read-only git operations
git log --oneline -10
git status
git diff HEAD
```

---

### 8.2 Authentication Modification Guard

Any change to authentication-related code triggers a mandatory hold:

```
AUTHENTICATION MODIFICATION DETECTED

The AI agent attempted to modify:
  src/middleware/auth.ts — JWT verification logic
  src/routes/auth.ts — Login route handler

These files control who can access your application.
AI modifications to authentication code require explicit human review.

Options:
  [1] Review changes and approve
  [2] Block changes and revert
  [3] Allow this session (disable guard for current branch)

Authentication changes are never auto-approved.
```

---

### 8.3 Secret Exposure Prevention

The Firewall monitors write operations in real time. If a write would result in a secret appearing in a file that is tracked by Git:

```
SECRET EXPOSURE PREVENTED

The AI agent attempted to write a file containing what appears to be a secret:

  File: src/config/database.ts
  Pattern matched: database connection string with credentials
  Content: "postgresql://admin:Sup3rS3cur3P@ss@prod-db.company.com:5432/mydb"

  This file is tracked by Git. Writing this value would permanently
  expose these credentials in your repository history.

  Action taken: Write BLOCKED

  To proceed safely:
  1. Move the connection string to .env → DATABASE_URL=postgresql://...
  2. Reference it in code → process.env.DATABASE_URL
  3. Run: sentinel firewall approve-last (to retry the write with env var reference)
```

---

### 8.4 Configuration Safety Gate

Changes to critical configuration files are gated:

| File Changed | Gate Level | Condition for Auto-Approval |
|---|---|---|
| `next.config.js` | MEDIUM | No CSP weakening, no new external domains |
| `tsconfig.json` | LOW | No `strict: false`, no `noImplicitAny: false` |
| `.eslintrc.*` | LOW | No security rules disabled |
| `Dockerfile` | HIGH | No `USER root`, no secrets baked in |
| `docker-compose.yml` | MEDIUM | No privileged containers, no sensitive bind mounts |
| `.github/workflows/*.yml` | HIGH | No new external actions without pinned SHA |

---

### 8.5 Destructive Refactor Detection

Large-scale refactoring by AI agents — while sometimes necessary — can introduce subtle bugs and destroy working code:

```
DESTRUCTIVE REFACTOR DETECTED

The AI agent is attempting to modify 68% of src/services/UserService.ts
(a file with 847 lines, last modified by a human 3 days ago).

Large AI refactors of human-written files are a significant risk because:
  • The AI may not understand business logic implicit in the current code
  • Working edge case handling may be silently removed
  • Tests may no longer accurately cover the new implementation

Suggested approach:
  1. Review the AI's intended changes in the diff
  2. Ask the AI to refactor in smaller, testable increments
  3. Run the existing test suite before approving

Proceed anyway? (requires explicit approval)
```

---

### 8.6 Firewall Rule Configuration

```typescript
// sentinel.config.ts
export default {
  firewall: {
    enabled: true,
    rules: {
      shell: {
        block: ['rm -rf /', 'rm -rf ~', 'DROP TABLE', 'TRUNCATE'],
        warn:  ['npm install', 'pip install'],
        audit: ['git push --force'],
      },
      files: {
        requireApproval: ['src/middleware/auth.*', '.github/workflows/*'],
        blockWrite: ['.env', '.env.production'],
      },
      secrets: {
        patterns: [
          /sk-[a-zA-Z0-9]{48}/,         // OpenAI
          /AKIA[0-9A-Z]{16}/,            // AWS
          /ghp_[A-Za-z0-9_]{36}/,        // GitHub
        ],
        action: 'block',
      },
      refactor: {
        warnThreshold: 0.30,    // Warn at 30% of file changed
        blockThreshold: 0.70,   // Block at 70% of file changed
      }
    }
  }
}
```

---

## 9. Engine 5 — Recovery Engine

The Recovery Engine activates when Sentinel detects issues that can be automatically remediated. It is designed to be conservative — it never applies changes without human review, except when configured to do so explicitly.

### 9.1 Root Cause Analysis

When a critical issue is detected, the Recovery Engine performs root cause analysis before proposing a fix:

```
ROOT CAUSE ANALYSIS
───────────────────
Issue:        SQL Injection in UserService.ts:47
Introduced:   Git commit abc1234 by Claude Code, 14 minutes ago
Root cause:   AI-generated query construction using string interpolation

Context:
  The AI was prompted to add email-based user lookup. It correctly identified
  the need for a database query but used string interpolation (a common pattern
  in AI training data) rather than parameterised queries.

  The AI had no awareness of the existing parameterised query helper at:
  src/db/query.ts → safeQuery()

Similar issues in this repository:
  - SearchService.ts:23 (identical pattern, detected 4 days ago, fixed)
  - ReportService.ts:91 (similar pattern, currently open finding)

Recommended fix:
  Replace string interpolation with safeQuery() utility — consistent with
  the pattern used throughout the rest of the codebase.
```

---

### 9.2 Rollback Generation

For any AI-generated commit, Sentinel can generate a rollback:

```bash
# Generate rollback for last AI commit
sentinel recovery rollback --commit abc1234

# Output:
# Rollback patch generated: .sentinel/recovery/rollback-abc1234.patch
# To apply: git apply .sentinel/recovery/rollback-abc1234.patch
# Preview:  sentinel recovery preview rollback-abc1234
```

Rollbacks are generated as Git-compatible patch files — they do not modify the repository directly until the developer explicitly applies them.

---

### 9.3 Patch Generation

For issues with known safe fixes (like parameterised query migration), Sentinel generates a specific fix patch:

```typescript
// Generated patch for SEC-001: SQL Injection in UserService.ts:47

// BEFORE (AI-generated — vulnerable):
const query = `SELECT * FROM users WHERE email = '${userEmail}'`;
const result = await db.raw(query);

// AFTER (Sentinel fix — safe):
const result = await safeQuery(
  'SELECT * FROM users WHERE email = $1',
  [userEmail]
);
```

Patches are reviewed in the Sentinel dashboard before application. The developer sees a diff, selects approve or reject, and Sentinel applies the patch to the working tree.

---

### 9.4 Automatic Remediation

For certain issue categories, automatic remediation can be enabled in configuration:

| Issue Type | Auto-Remediation | Safety Level |
|---|---|---|
| Console.log removal from production code | ✅ Auto-apply | Safe — no logic change |
| Unused import removal | ✅ Auto-apply | Safe — confirmed unused by ts-morph |
| `var` → `const`/`let` conversion | ✅ Auto-apply | Safe — TypeScript semantics preserved |
| Secret → env var reference | ⚠️ Require approval | Requires .env update |
| SQL injection fix | ⚠️ Require approval | Logic change — human review required |
| Architectural violation | ⚠️ Require approval | May require significant refactor |
| Duplicate code extraction | ❌ Never auto-apply | Complex — always requires human judgment |

---

### 9.5 Safe Recovery Workflows

```
RECOVERY WORKFLOW — Critical Security Issue
───────────────────────────────────────────
Step 1/4: Issue identified
  [✅] SQL Injection detected in UserService.ts:47
  [✅] Root cause analysis complete
  [✅] Rollback patch generated

Step 2/4: Immediate containment
  Action: Block PR merge until issue is resolved
  Status: ✅ GitHub PR check failing

Step 3/4: Fix options presented to developer
  Option A: Apply Sentinel auto-generated patch (review required)
  Option B: Roll back entire AI commit abc1234
  Option C: Fix manually (Sentinel will re-scan on save)

Step 4/4: Verification
  [Pending] Developer selects option
  [Pending] Fix applied
  [Pending] Sentinel re-scans changed file
  [Pending] Issue marked resolved
  [Pending] PR merge unblocked
```

---

## 10. Full Technology Stack — Justified

| Technology | Version | Role | Justification |
|---|---|---|---|
| **Node.js** | 18+ | Runtime | Long-term support; native `fs.watch` API; broad ecosystem |
| **TypeScript** | 5.x | Language | Type safety for complex AST manipulation and rule configs |
| **Next.js** | 14 | Dashboard framework | File-based routing; API routes for local backend; React server components |
| **React** | 18 | UI | Component model for real-time findings dashboard |
| **Tailwind CSS** | 3.x | Styling | Rapid UI development; consistent design tokens |
| **Tree-sitter** | Latest | AST parsing | Language-agnostic; extremely fast; supports 50+ languages |
| **ts-morph** | Latest | TypeScript analysis | Deep TypeScript semantic analysis; cross-file type resolution |
| **SQLite** | 3.x | Local database | Zero-config; embedded; fast for findings storage; file-portable |
| **Vitest** | Latest | Testing | ESM-native; fast; compatible with TypeScript without transpilation |
| **Zod** | 3.x | Schema validation | Config file validation; type inference from schemas |
| **Chokidar** | 3.x | File watching | Cross-platform; native OS events; battle-tested |
| **TurboRepo** | Latest | Monorepo build | Incremental builds; task caching; parallel execution |
| **PNPM** | 8+ | Package management | Strict dependency resolution; faster than npm; disk efficient |
| **Docker** | Latest | Containerisation | Reproducible environment; CI/CD compatibility |
| **GitHub Actions** | — | CI/CD | SARIF upload; PR annotations; matrix testing |

---

## 11. Complete Developer Workflow

```
╔══════════════════════════════════════════════════════════════════╗
║                    COMPLETE WORKFLOW                             ║
╚══════════════════════════════════════════════════════════════════╝

1. Developer opens repository
        │
        ▼
2. sentinel watch (starts Live Monitoring daemon)
        │
        ▼
3. Developer prompts AI coding agent
   "Add a payment processing service with Stripe integration"
        │
        ▼
4. AI agent generates files:
   src/services/PaymentService.ts
   src/types/Payment.ts
   src/routes/payment.ts
        │
        ▼
5. ══ AI FIREWALL CHECK ══
   • Shell commands reviewed (npm install stripe — ALLOWED with version check)
   • No secrets detected in writes — ALLOWED
   • No auth file modifications — PASSED
   • Refactor scope: new files only — PASSED
        │
        ▼
6. ══ INCREMENTAL SCAN (triggered by Chokidar) ══
   PaymentService.ts scanned: 247 lines analysed
   Payment.ts scanned: 34 lines analysed
   payment.ts scanned: 67 lines analysed
        │
        ▼
7. ══ AI GUARDIAN ANALYSIS ══
   Agent: Claude Code (detected)
   Risk: MEDIUM overall
   Finding 1: [HIGH]   Line 47 — payment.amount not validated
   Finding 2: [MEDIUM] Line 89 — duplicate of InvoiceService.calculateTotal()
   Finding 3: [LOW]    No test file added
        │
        ▼
8. ══ ALERTS DELIVERED ══
   Terminal: 3 findings in PaymentService.ts
   Dashboard: Findings list updated in real time
   (PR not yet created — no GitHub annotation yet)
        │
        ▼
9. Developer reviews findings in dashboard
   → Fixes HIGH finding (adds validation)
   → Accepts LOW finding (will add tests in next commit)
   → Defers MEDIUM (creates ticket for deduplication)
        │
        ▼
10. Developer saves files
    → Chokidar detects change
    → Incremental rescan
    → HIGH finding resolved ✅
    → 2 remaining findings (LOW, MEDIUM)
        │
        ▼
11. git commit (pre-commit hook fires)
    → Staged files scanned
    → No CRITICAL or HIGH findings → commit ALLOWED
    → Commit recorded with finding snapshot
        │
        ▼
12. git push → GitHub PR created
    → GitHub Actions sentinel workflow runs
    → SARIF report uploaded to GitHub Security tab
    → PR annotated: 2 open findings (LOW, MEDIUM)
    → PR check: PASS (no blocking-severity findings)
        │
        ▼
13. Code review + merge
    → Sentinel findings visible in PR diff as GitHub annotations
    → Team reviews LOW/MEDIUM findings
    → Merge approved
        │
        ▼
14. Production deployment
    → All CRITICAL and HIGH issues were resolved before merge
    → Code shipped is Sentinel-verified
```

---

## 12. Project Structure — Annotated

```
sentinel/
│
├── apps/
│   ├── web/                        # Next.js dashboard application
│   │   ├── app/                    # App router pages
│   │   │   ├── page.tsx            # Dashboard home — findings overview
│   │   │   ├── scan/page.tsx       # Full scan results
│   │   │   ├── guardian/page.tsx   # AI Guardian history
│   │   │   ├── firewall/page.tsx   # Firewall activity log
│   │   │   └── settings/page.tsx   # Configuration UI
│   │   ├── components/             # React components
│   │   │   ├── FindingCard.tsx     # Individual finding display
│   │   │   ├── RiskBadge.tsx       # Severity badge component
│   │   │   ├── ScanProgress.tsx    # Real-time scan progress
│   │   │   └── FirewallLog.tsx     # Firewall event list
│   │   └── api/                    # Next.js API routes (local backend)
│   │       ├── scan/route.ts       # Trigger scan, get results
│   │       ├── findings/route.ts   # CRUD for findings
│   │       └── config/route.ts     # Read/write sentinel.config.ts
│   │
│   └── cli/                        # CLI application
│       ├── commands/
│       │   ├── scan.ts             # sentinel scan
│       │   ├── watch.ts            # sentinel watch
│       │   ├── guardian.ts         # sentinel guardian
│       │   ├── firewall.ts         # sentinel firewall
│       │   ├── recovery.ts         # sentinel recovery
│       │   ├── report.ts           # sentinel report
│       │   └── hooks.ts            # sentinel hooks install/remove
│       └── index.ts                # CLI entry point
│
├── packages/
│   ├── core/                       # Core analysis engines
│   │   ├── src/
│   │   │   ├── engines/
│   │   │   │   ├── scan/           # Repository Scan Engine
│   │   │   │   │   ├── SecurityScanner.ts
│   │   │   │   │   ├── SecretDetector.ts
│   │   │   │   │   ├── DuplicateDetector.ts
│   │   │   │   │   ├── DeadCodeAnalyzer.ts
│   │   │   │   │   ├── CircularDepAnalyzer.ts
│   │   │   │   │   ├── PerformanceInspector.ts
│   │   │   │   │   ├── ArchitectureValidator.ts
│   │   │   │   │   └── HallucinationDetector.ts
│   │   │   │   ├── monitor/        # Live Monitoring Engine
│   │   │   │   │   ├── FileWatcher.ts
│   │   │   │   │   ├── GitMonitor.ts
│   │   │   │   │   ├── DependencyMonitor.ts
│   │   │   │   │   └── ConfigTracker.ts
│   │   │   │   ├── guardian/       # AI Guardian Engine
│   │   │   │   │   ├── AgentDetector.ts
│   │   │   │   │   ├── ChangeAnalyzer.ts
│   │   │   │   │   ├── RiskScorer.ts
│   │   │   │   │   └── IssueExplainer.ts
│   │   │   │   ├── firewall/       # AI Firewall Engine
│   │   │   │   │   ├── ShellInterceptor.ts
│   │   │   │   │   ├── AuthGuard.ts
│   │   │   │   │   ├── SecretGuard.ts
│   │   │   │   │   ├── ConfigGate.ts
│   │   │   │   │   └── RefactorDetector.ts
│   │   │   │   └── recovery/       # Recovery Engine
│   │   │   │       ├── RootCauseAnalyzer.ts
│   │   │   │       ├── RollbackGenerator.ts
│   │   │   │       ├── PatchGenerator.ts
│   │   │   │       └── AutoRemediator.ts
│   │   │   ├── parsers/
│   │   │   │   ├── TreeSitterParser.ts     # Language-agnostic AST
│   │   │   │   └── TsMorphAnalyzer.ts      # TypeScript semantic analysis
│   │   │   ├── reporters/
│   │   │   │   ├── HtmlReporter.ts
│   │   │   │   ├── JsonReporter.ts
│   │   │   │   └── SarifReporter.ts
│   │   │   ├── db/
│   │   │   │   ├── schema.ts       # SQLite schema definition
│   │   │   │   └── store.ts        # Database operations
│   │   │   └── alerts/
│   │   │       ├── TerminalAlerter.ts
│   │   │       ├── SlackAlerter.ts
│   │   │       ├── GitHubAlerter.ts
│   │   │       └── WebhookAlerter.ts
│   │   └── package.json
│   │
│   ├── sdk/                        # Plugin SDK (published as @sentinel/sdk)
│   │   ├── src/
│   │   │   ├── types.ts            # Plugin interface definitions
│   │   │   ├── BasePlugin.ts       # Abstract base class for plugins
│   │   │   ├── ScannerPlugin.ts    # Scanner plugin base
│   │   │   ├── ReporterPlugin.ts   # Reporter plugin base
│   │   │   └── RemediatorPlugin.ts # Remediator plugin base
│   │   └── package.json
│   │
│   └── config/                     # Shared configuration types
│       ├── src/
│       │   ├── schema.ts           # Zod schema for sentinel.config.ts
│       │   └── defaults.ts         # Default configuration values
│       └── package.json
│
├── sentinel.config.ts              # User configuration (in target repo)
├── turbo.json                      # TurboRepo task pipeline
├── pnpm-workspace.yaml             # PNPM workspace definition
├── docker-compose.yml              # Docker development environment
├── .github/workflows/
│   ├── sentinel.yml                # Sentinel self-scan on own codebase
│   └── test.yml                    # Vitest test suite
└── README.md
```

---

## 13. Installation & Setup

### 13.1 Prerequisites

| Requirement | Version | Check |
|---|---|---|
| Node.js | 18+ | `node --version` |
| PNPM | 8+ | `pnpm --version` |
| Git | 2.30+ | `git --version` |
| Docker | Latest | `docker --version` (optional) |

---

### 13.2 Local Installation

**Global CLI install:**

```bash
npm install -g @sentinel/cli
```

**Per-repository setup:**

```bash
# Navigate to your repository
cd your-project

# Initialise Sentinel (creates sentinel.config.ts)
sentinel init

# Install Git hooks (pre-commit, pre-push)
sentinel hooks install

# Run first full scan
sentinel scan

# Start live monitoring daemon
sentinel watch
```

**Open the dashboard:**

```bash
sentinel dashboard
# Opens http://localhost:3847 in your browser
```

---

### 13.3 Docker Setup

```bash
# Pull the Sentinel Docker image
docker pull ghcr.io/sentinel/sentinel:latest

# Run Sentinel scan on current directory
docker run --rm \
  -v $(pwd):/workspace \
  -v $(pwd)/.sentinel:/data \
  ghcr.io/sentinel/sentinel:latest \
  sentinel scan --output /data/report.html

# Run as daemon (live monitoring)
docker run -d \
  --name sentinel-daemon \
  -v $(pwd):/workspace \
  -v $(pwd)/.sentinel:/data \
  -p 3847:3847 \
  ghcr.io/sentinel/sentinel:latest \
  sentinel watch
```

**Docker Compose (recommended for teams):**

```yaml
# docker-compose.yml
version: '3.9'
services:
  sentinel:
    image: ghcr.io/sentinel/sentinel:latest
    volumes:
      - .:/workspace
      - .sentinel:/data
    ports:
      - "3847:3847"
    environment:
      - SENTINEL_CONFIG=/workspace/sentinel.config.ts
    command: sentinel watch
    restart: unless-stopped
```

---

## 14. Configuration Reference

### 14.1 sentinel.config.ts

```typescript
import { defineConfig } from '@sentinel/config';

export default defineConfig({
  // Repository root (default: current directory)
  root: process.cwd(),

  // ── Scan Configuration ──────────────────────────────────────────
  scan: {
    // Directories to exclude from all analysis
    exclude: ['node_modules', 'dist', 'build', '.next', '*.generated.*'],

    // Languages to analyse (auto-detected if not specified)
    languages: ['typescript', 'javascript', 'python'],

    // Run nightly full scan
    schedule: '0 2 * * *',  // 2am daily (cron syntax)
  },

  // ── Security Configuration ───────────────────────────────────────
  security: {
    // Minimum severity to report (low | medium | high | critical)
    minSeverity: 'medium',

    // Block CI on these severities
    blockOn: ['critical', 'high'],

    // Enable specific scanner categories
    enabledChecks: [
      'injection', 'xss', 'secrets', 'auth', 'crypto', 'path_traversal'
    ],
  },

  // ── Secret Detection ─────────────────────────────────────────────
  secrets: {
    // Additional patterns beyond built-ins
    patterns: [
      /MY_COMPANY_API_[A-Z0-9]{32}/,  // Custom internal API key format
    ],

    // Files to always scan regardless of .gitignore
    alwaysScan: ['.env.example'],

    // Paths exempt from secret scanning (test fixtures, examples)
    exempt: ['test/fixtures/**', 'docs/examples/**'],
  },

  // ── Duplicate Code Detection ──────────────────────────────────────
  duplicates: {
    // Minimum similarity score to report (0.0 – 1.0)
    threshold: 0.85,

    // Minimum function size to consider (lines)
    minFunctionLines: 5,
  },

  // ── Architecture Configuration ────────────────────────────────────
  architecture: {
    type: 'clean',  // 'clean' | 'hexagonal' | 'feature-sliced' | 'custom'
    layers: {
      domain:         { path: 'src/domain/**',         canImport: [] },
      application:    { path: 'src/application/**',    canImport: ['src/domain/**'] },
      infrastructure: { path: 'src/infrastructure/**', canImport: ['src/domain/**', 'src/application/**'] },
      presentation:   { path: 'src/presentation/**',   canImport: ['src/application/**'] },
    },
    // Block merge on architecture violations
    blockOnViolation: false,  // Warning-only by default
  },

  // ── AI Guardian Configuration ─────────────────────────────────────
  guardian: {
    enabled: true,

    // Automatically detect AI agent from git metadata
    autoDetect: true,

    // Escalate risk for these file patterns
    highRiskFiles: [
      'src/**/auth/**',
      'src/**/payment/**',
      'src/**/admin/**',
      'migrations/**',
    ],

    // Require human review (block PR) when AI touches these
    requireReview: [
      'src/**/auth/**',
      '.github/workflows/**',
      'Dockerfile',
    ],
  },

  // ── Firewall Configuration ────────────────────────────────────────
  firewall: {
    enabled: true,
    shell: {
      block: ['rm -rf /', 'DROP TABLE', 'TRUNCATE TABLE'],
      warn:  ['npm install [^@]'],
    },
    secrets: { action: 'block' },
    refactor: { warnThreshold: 0.30, blockThreshold: 0.70 },
  },

  // ── Recovery Configuration ────────────────────────────────────────
  recovery: {
    // Auto-apply safe fixes without prompting
    autoApply: ['remove_console_log', 'remove_unused_imports'],

    // Always require human approval
    requireApproval: ['sql_injection_fix', 'secret_rotation'],
  },

  // ── Alert Configuration ────────────────────────────────────────────
  alerts: {
    terminal: true,
    github: { enabled: true, annotations: true },
    slack: { webhookUrl: process.env.SLACK_WEBHOOK_URL },
  },

  // ── Report Configuration ───────────────────────────────────────────
  reports: {
    output: '.sentinel/reports',
    formats: ['html', 'json', 'sarif'],
    // Include in HTML report
    includeCodeSnippets: true,
    includeFixSuggestions: true,
  },

  // ── Plugin Configuration ───────────────────────────────────────────
  plugins: [
    '@sentinel/plugin-owasp',
    '@sentinel/plugin-pci-dss',
    './plugins/my-custom-rule.ts',
  ],
});
```

---

### 14.2 Firewall Rules Configuration

Firewall rules follow a priority order — `block` takes precedence over `warn`, which takes precedence over `allow`:

```typescript
firewall: {
  rules: [
    // Rule 1: Block always
    { pattern: 'rm -rf /', action: 'block', reason: 'Root directory deletion' },

    // Rule 2: Block but allow with --force flag explicitly
    { pattern: 'git push --force', action: 'block', allowOverride: true },

    // Rule 3: Warn and require confirmation
    { pattern: 'npm install', action: 'warn', message: 'Pin the version' },

    // Rule 4: Audit log only
    { pattern: 'git rebase', action: 'audit' },
  ]
}
```

---

### 14.3 Architecture Policy Configuration

```typescript
// Custom architecture for a monorepo
architecture: {
  type: 'custom',
  policies: [
    {
      name: 'No cross-service imports',
      description: 'Microservices must not import directly from each other',
      deny: {
        from: 'packages/service-a/**',
        to:   'packages/service-b/**',
      },
      severity: 'high',
    },
    {
      name: 'UI cannot access DB',
      description: 'Presentation layer must go through API',
      deny: {
        from: 'packages/web/**',
        to:   'packages/database/**',
      },
      severity: 'critical',
    }
  ]
}
```

---

## 15. CLI Reference

| Command | Description | Key Flags |
|---|---|---|
| `sentinel init` | Initialise Sentinel in current repository | `--template clean\|hex\|fsd` |
| `sentinel scan` | Run full repository scan | `--output report.html`, `--format sarif`, `--severity high` |
| `sentinel scan --watch` | Run scan and keep watching | — |
| `sentinel watch` | Start live monitoring daemon | `--port 3847`, `--no-dashboard` |
| `sentinel guardian --file <path>` | Analyse specific file as AI-generated | `--agent claude-code` |
| `sentinel firewall status` | Show firewall rule status | — |
| `sentinel firewall approve-last` | Approve last blocked operation | — |
| `sentinel recovery list` | List available recovery actions | — |
| `sentinel recovery apply <id>` | Apply a specific recovery action | `--dry-run` |
| `sentinel recovery rollback --commit <sha>` | Generate rollback for commit | — |
| `sentinel report --format html` | Generate report from latest scan | `--open`, `--output <path>` |
| `sentinel hooks install` | Install Git hooks | `--pre-commit`, `--pre-push` |
| `sentinel hooks remove` | Remove Git hooks | — |
| `sentinel dashboard` | Open web dashboard | `--port <n>` |
| `sentinel config validate` | Validate sentinel.config.ts | — |
| `sentinel plugin add <name>` | Install a Sentinel plugin | — |

---

## 16. Report Formats — Deep Dive

### 16.1 HTML Report

The HTML report is a self-contained, single-file document with no external dependencies — suitable for email attachment, internal documentation, or archiving.

**Sections:**

- Executive Summary — overall health score, finding counts by severity
- Repository Statistics — file count, language breakdown, scan duration
- Critical & High Findings — each with code snippet, explanation, fix suggestion
- Medium & Low Findings — compact list with links to detail
- Architecture Diagram — generated dependency graph with violations highlighted
- Historical Trend — finding count over time (if previous scans exist)
- AI Guardian Summary — AI agent activity and risk scores

---

### 16.2 JSON Report

Machine-readable output for integration with custom tooling, dashboards, and automated pipelines:

```json
{
  "sentinel": "1.0.0",
  "timestamp": "2025-06-14T14:32:07.000Z",
  "repository": {
    "root": "/home/dev/my-project",
    "commit": "abc1234",
    "branch": "feature/payment-service"
  },
  "summary": {
    "total_findings": 14,
    "by_severity": {
      "critical": 0,
      "high": 2,
      "medium": 7,
      "low": 5
    },
    "health_score": 74,
    "scan_duration_ms": 3240
  },
  "findings": [
    {
      "id": "FIND-001",
      "type": "sql_injection",
      "severity": "high",
      "engine": "security_scanner",
      "file": "src/services/UserService.ts",
      "line": 47,
      "column": 18,
      "message": "SQL Injection via template literal string interpolation",
      "code_snippet": "const query = `SELECT * FROM users WHERE email = '${userEmail}'`",
      "fix": "Use parameterised queries",
      "cwe": "CWE-89",
      "owasp": "A03:2021",
      "confidence": 0.97,
      "first_detected": "2025-06-14T14:32:07.000Z",
      "status": "open"
    }
  ],
  "ai_guardian": {
    "changes_analysed": 3,
    "agents_detected": ["claude-code"],
    "risk_summary": { "high": 1, "medium": 1, "low": 1 }
  }
}
```

---

### 16.3 SARIF Report

SARIF (Static Analysis Results Interchange Format) v2.1.0 — the industry standard format supported by GitHub Security, VS Code, Azure DevOps, and most SAST tools.

```json
{
  "$schema": "https://raw.githubusercontent.com/oasis-tcs/sarif-spec/master/Schemata/sarif-schema-2.1.0.json",
  "version": "2.1.0",
  "runs": [{
    "tool": {
      "driver": {
        "name": "Sentinel",
        "version": "1.0.0",
        "informationUri": "https://sentinel.dev",
        "rules": [
          {
            "id": "SEC-001",
            "name": "SqlInjection",
            "shortDescription": { "text": "SQL Injection via string interpolation" },
            "helpUri": "https://sentinel.dev/rules/SEC-001",
            "properties": { "tags": ["security", "owasp-a03"] }
          }
        ]
      }
    },
    "results": [
      {
        "ruleId": "SEC-001",
        "level": "error",
        "message": { "text": "SQL Injection via template literal in database query" },
        "locations": [{
          "physicalLocation": {
            "artifactLocation": { "uri": "src/services/UserService.ts" },
            "region": { "startLine": 47, "startColumn": 18 }
          }
        }]
      }
    ]
  }]
}
```

SARIF reports are automatically uploaded to GitHub when using the GitHub Actions integration, making findings appear in the **Security → Code scanning alerts** tab of the repository.

---

## 17. GitHub Actions Integration

```yaml
# .github/workflows/sentinel.yml
name: Sentinel Security Scan

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  sentinel-scan:
    name: Sentinel AI Safety Scan
    runs-on: ubuntu-latest

    permissions:
      contents: read
      security-events: write      # Required for SARIF upload
      pull-requests: write        # Required for PR annotations

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0          # Full history for git-based analysis

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install Sentinel
        run: npm install -g @sentinel/cli

      - name: Run Sentinel Scan
        id: sentinel
        run: |
          sentinel scan \
            --format sarif \
            --output sentinel-results.sarif \
            --severity medium
        env:
          SENTINEL_GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Upload SARIF to GitHub Security
        uses: github/codeql-action/upload-sarif@v3
        if: always()
        with:
          sarif_file: sentinel-results.sarif
          category: sentinel

      - name: Annotate PR with findings
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            const findings = require('./sentinel-results.json');
            // Post inline PR comments for each finding
            for (const finding of findings.findings.filter(f => f.severity !== 'low')) {
              await github.rest.pulls.createReviewComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                pull_number: context.issue.number,
                body: `🛡️ **Sentinel [${finding.severity.toUpperCase()}]**: ${finding.message}\n\n${finding.fix}`,
                path: finding.file,
                line: finding.line,
                commit_id: context.sha,
              });
            }

      - name: Fail on critical or high findings
        if: steps.sentinel.outcome == 'failure'
        run: |
          echo "Sentinel found critical or high severity issues. Blocking merge."
          exit 1
```

---

## 18. Plugin SDK

### 18.1 Plugin Architecture

Sentinel's Plugin SDK (`@sentinel/sdk`) allows teams to extend Sentinel with custom scanners, reporters, and remediators without modifying the core.

**Three plugin types:**

| Plugin Type | Interface | Use Case |
|---|---|---|
| `ScannerPlugin` | Adds new detection rules | Custom business logic violations, company-specific patterns |
| `ReporterPlugin` | Adds new output formats | JIRA ticket creation, Confluence pages, custom dashboards |
| `RemediatorPlugin` | Adds new auto-fix logic | Company-specific code style corrections, migration helpers |

---

### 18.2 Writing a Custom Plugin

```typescript
// plugins/no-console-in-production.ts
import { ScannerPlugin, Finding, ScanContext } from '@sentinel/sdk';

export class NoConsoleInProduction extends ScannerPlugin {
  name = 'no-console-in-production';
  description = 'Detects console.log statements that should not reach production';
  version = '1.0.0';

  // Files this plugin should be invoked for
  filePatterns = ['**/*.ts', '**/*.tsx', '**/*.js'];

  // Invoked for each matching file
  async scan(file: string, content: string, context: ScanContext): Promise<Finding[]> {
    const findings: Finding[] = [];
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Skip test files and development-only blocks
      if (context.isTestFile || line.includes('// sentinel-ignore')) continue;

      if (/console\.(log|warn|error|debug)\(/.test(line)) {
        findings.push({
          type: 'console_in_production',
          severity: 'low',
          file,
          line: i + 1,
          message: 'console statement detected — remove before production',
          fix: `Remove this line or replace with structured logging:\n  logger.info('...');`,
          autoRemediable: true,
          remediationFn: (src) => src.replace(line, ''),
        });
      }
    }

    return findings;
  }
}

export default new NoConsoleInProduction();
```

**Register in config:**

```typescript
// sentinel.config.ts
plugins: [
  './plugins/no-console-in-production.ts',
]
```

---

### 18.3 Publishing a Plugin

```bash
# Create plugin package
mkdir sentinel-plugin-my-rule
cd sentinel-plugin-my-rule
pnpm init

# Install SDK
pnpm add @sentinel/sdk

# Build
pnpm build

# Publish
npm publish --access public
```

**Plugin naming convention:** `sentinel-plugin-*` or `@scope/sentinel-plugin-*`

---

## 19. Enterprise Policy Enforcement

For engineering organisations, Sentinel supports team-wide policy enforcement through a shared policy file that overrides individual `sentinel.config.ts` settings.

**Policy capabilities:**

| Policy Type | Description | Example |
|---|---|---|
| **Required checks** | Checks that cannot be disabled | All `critical` severity checks always enabled |
| **Blocked configs** | Config values teams cannot set | `security.blockOn` cannot be set to `[]` |
| **Mandatory plugins** | Plugins installed for all repos | `@sentinel/plugin-pci-dss` for payment services |
| **Report retention** | How long scan history is kept | 90 days minimum |
| **Notification routing** | Where alerts must go | Security team Slack channel always notified of criticals |

```typescript
// .sentinel/enterprise.policy.ts (committed to a shared internal config repo)
export default {
  policy: {
    name: 'Acme Corp Engineering Standards',
    version: '2025.1',

    required: {
      checks: ['injection', 'secrets', 'auth', 'crypto'],
      plugins: ['@acme/sentinel-plugin-compliance'],
      reportFormats: ['sarif', 'json'],
    },

    forbidden: {
      // Nobody can disable blocking on critical findings
      configOverrides: [
        { path: 'security.blockOn', cannotExclude: ['critical'] },
        { path: 'firewall.enabled', cannotSetTo: false },
      ],
    },

    notifications: {
      // Critical findings always go to security team
      critical: { slack: process.env.SECURITY_SLACK_WEBHOOK },
    },
  }
}
```

---

## 20. Security Analysis — Technical Reference

### 20.1 OWASP Top 10 Coverage

| OWASP 2021 Category | Sentinel Detection | Coverage |
|---|---|---|
| A01 — Broken Access Control | Route-level auth checks, RBAC validation | 🟡 Partial |
| A02 — Cryptographic Failures | Weak algo detection, hardcoded keys, HTTP | 🟢 Good |
| A03 — Injection | SQL, NoSQL, command, LDAP, XPath injection | 🟢 Strong |
| A04 — Insecure Design | Architecture validation, missing validation | 🟡 Partial |
| A05 — Security Misconfiguration | Config file analysis, Docker, CI/CD | 🟢 Good |
| A06 — Vulnerable Components | Dependency audit, CVE checking | 🟢 Good |
| A07 — Auth & Session Failures | Auth code guardian, JWT analysis | 🟡 Partial |
| A08 — Integrity Failures | CI/CD pipeline analysis, unsigned packages | 🟡 Partial |
| A09 — Logging Failures | Missing error logging detection | 🟡 Partial |
| A10 — SSRF | URL construction analysis, fetch with user input | 🟡 Partial |

---

### 20.2 AI-Specific Vulnerability Patterns

Sentinel includes a detection ruleset specifically targeting patterns that appear disproportionately in AI-generated code:

| Pattern | Why AI Generates It | Sentinel Rule |
|---|---|---|
| `eval(userInput)` | AI uses eval for dynamic code | `SEC-AI-001` |
| `dangerouslySetInnerHTML` | AI uses innerHTML shortcuts | `SEC-AI-002` |
| Synchronous crypto in request handler | AI uses sync APIs unaware of event loop | `SEC-AI-003` |
| MD5 for password hashing | AI trained on old security patterns | `SEC-AI-004` |
| `Math.random()` for tokens | AI uses Math.random without security awareness | `SEC-AI-005` |
| Exposed admin routes without auth | AI scaffolds routes without auth layer | `SEC-AI-006` |
| `console.log(req.body)` | AI adds debug logging with sensitive data | `SEC-AI-007` |
| `JSON.parse(userInput)` without try/catch | AI doesn't add error handling | `SEC-AI-008` |

---

### 20.3 Severity Classification

| Severity | Definition | Default Action | Example |
|---|---|---|---|
| **Critical** | Exploitable with no prerequisites; immediate data loss or takeover risk | Block CI, immediate alert | Hardcoded production credentials, RCE via user input |
| **High** | Exploitable with minimal prerequisites; significant data or security risk | Block CI, alert | SQL injection, XSS in auth context, exposed API key |
| **Medium** | Exploitable under specific conditions; moderate risk | Warning, no block | Weak hashing, missing rate limiting, duplicate auth logic |
| **Low** | Best practice violation; minimal direct risk | Report only | Console.log in production, missing type annotations |
| **Info** | Code quality observation; no security impact | Report optional | Dead code, unused imports |

---

## 21. Performance Benchmarks

All benchmarks on a MacBook Pro M2, 16GB RAM, 100Mbps I/O.

| Repository Size | Full Scan Time | Incremental Scan | Memory Usage |
|---|---|---|---|
| Small (< 1,000 files) | 2–4 seconds | 80–150ms | ~45MB |
| Medium (1,000–10,000 files) | 8–20 seconds | 150–400ms | ~120MB |
| Large (10,000–50,000 files) | 35–90 seconds | 300–800ms | ~350MB |
| Monorepo (> 50,000 files) | 3–8 minutes | 400ms–2s | ~800MB |

**Chokidar daemon CPU overhead:** < 0.5%
**SQLite database size per 1,000 findings:** ~2MB
**Average finding detection latency (file save to alert):** < 500ms

---

## 22. Testing Strategy

Sentinel is tested with **Vitest** across three test layers:

**Unit tests — individual engine components:**

```typescript
// packages/core/src/engines/scan/__tests__/SecretDetector.test.ts
import { describe, it, expect } from 'vitest';
import { SecretDetector } from '../SecretDetector';

describe('SecretDetector', () => {
  it('detects OpenAI API keys', () => {
    const code = `const key = "sk-proj-xK9mN2pQ7rT1uW5vZ8yA3bC6dE0fG4";`;
    const findings = SecretDetector.scan(code, 'config.ts');
    expect(findings).toHaveLength(1);
    expect(findings[0].type).toBe('openai_api_key');
    expect(findings[0].severity).toBe('critical');
  });

  it('does not flag high-entropy non-secrets', () => {
    const code = `const hash = "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4";`;
    const findings = SecretDetector.scan(code, 'test.ts');
    // UUID-like strings should not trigger
    expect(findings.filter(f => f.confidence > 0.9)).toHaveLength(0);
  });
});
```

**Integration tests — engine combinations:**

```typescript
// Test that scan engine correctly feeds findings to recovery engine
describe('Scan → Recovery Pipeline', () => {
  it('generates valid patch for SQL injection finding', async () => {
    const finding = await ScanEngine.scan('fixtures/sql-injection.ts');
    const patch = await RecoveryEngine.generatePatch(finding[0]);
    expect(patch).toContain('safeQuery');
    expect(patch).not.toContain('`SELECT');
  });
});
```

**End-to-end tests — full workflow:**

```typescript
// Test complete workflow from file write to alert
describe('E2E: Live Monitoring', () => {
  it('detects secret within 500ms of file write', async () => {
    const alertReceived = new Promise(resolve => {
      sentinel.on('finding', resolve);
    });

    await fs.writeFile('test-temp.ts', 'const key = "sk-proj-testkey123";');
    const finding = await Promise.race([alertReceived, timeout(500)]);

    expect(finding.type).toBe('openai_api_key');
    await fs.unlink('test-temp.ts');
  });
});
```

**Test coverage targets:**

| Component | Target Coverage |
|---|---|
| Security Scanner | > 90% |
| Secret Detector | > 95% |
| Firewall Engine | > 90% |
| Recovery Engine | > 80% |
| Plugin SDK | > 85% |
| CLI commands | > 75% |

---

## 23. Known Limitations in v1.0

| Limitation | Impact | Planned Fix |
|---|---|---|
| **No multi-language support for deep analysis** | Tree-sitter provides basic AST for all languages; ts-morph TypeScript analysis only | v1.1: Python deep analysis via Pyright |
| **OWASP A01 (Broken Access Control) coverage is partial** | Cannot fully trace authorization flows across entire application | v1.2: Cross-file data flow analysis |
| **Hallucination detection requires npm registry access** | Air-gapped environments cannot verify package existence | v1.1: Offline mode with local package cache |
| **No IDE plugin** | Findings visible in dashboard and terminal only | v1.2: VS Code extension, JetBrains plugin |
| **Recovery patches require manual application** | Developer must run `sentinel recovery apply` | v1.3: One-click apply in dashboard |
| **SQLite not suitable for team sharing** | Each developer has a local database | v2.0: PostgreSQL option for team environments |
| **AI agent detection relies on heuristics** | False negatives possible for new or unusual AI agents | Ongoing: detection signature updates |
| **No cloud-hosted dashboard** | Dashboard is local only | v2.0: Cloud dashboard for team visibility |

---

## 24. Roadmap — v1.1 through v3.0

### v1.1 — Language Expansion *(Q3 2025 Target)*

- Python deep analysis via Pyright integration
- Go static analysis via `go/analysis` package
- Java/Kotlin support via Checkstyle + SpotBugs integration
- Offline mode with local npm package cache for hallucination detection
- Improved false positive reduction in secret detection

### v1.2 — IDE Integration *(Q4 2025 Target)*

- VS Code extension — inline findings, one-click fixes
- JetBrains plugin — same capabilities
- Cross-file data flow analysis for A01 (Broken Access Control) coverage
- Enhanced OWASP coverage to 80%+
- Team policy server (share config across repositories)

### v1.3 — Recovery Enhancement *(Q1 2026 Target)*

- One-click patch application in dashboard
- AI-generated remediation suggestions (using safe, sandboxed LLM)
- Predictive vulnerability analysis — flag risky patterns before they become vulnerabilities
- Self-healing mode — for pre-approved issue types, apply fixes automatically without prompting

### v2.0 — Team Platform *(Q2 2026 Target)*

- Cloud-hosted dashboard with team accounts
- PostgreSQL backend for multi-developer scan history
- Team analytics — finding trends, resolution time, AI agent risk scores per developer
- Multi-repository support — manage Sentinel across an entire organisation
- Enterprise SSO (SAML, OIDC)
- Compliance reporting — SOC 2, ISO 27001, PCI DSS audit evidence generation

### v3.0 — AI Governance Suite *(2027 Target)*

- Multi-agent orchestration analysis — detect coordination issues between multiple AI agents working on the same codebase simultaneously
- AI model benchmarking — compare security profiles of different AI coding assistants
- Distributed scanning infrastructure — sub-second full scans on multi-million line codebases
- Predictive architecture drift detection — flag when the codebase is trending toward a violation before it happens
- Regulatory compliance AI — automated GDPR, HIPAA, PCI DSS code compliance verification

---

## 25. Conclusion — The Case for AI Code Governance

The software engineering profession is in the middle of a transition. AI coding assistants are no longer experimental tools — they are primary participants in production software development at scale. Engineers at every level, in teams of every size, are using AI to write features, fix bugs, refactor systems, and scaffold entire services.

This transition brings genuine productivity gains. It also brings a new class of risk that the industry has not yet developed adequate tools to address.

The problem is not that AI writes bad code. The problem is that:

1. **AI writes code very fast** — faster than human review processes were designed to handle
2. **AI mistakes are systematic** — the same AI trained on the same data makes the same class of mistake repeatedly across every codebase it touches
3. **AI has no context** — it does not know your architecture, your security posture, your team's decisions, or which functions already implement what it's about to create
4. **Existing tools were not built for AI** — linters, SAST tools, and code review processes were designed with human authors in mind

Sentinel's proposition is specific: **AI code generation and AI code governance must be treated as independent capabilities.** A system that generates code cannot objectively verify its own output. An independent verification layer — aware of AI failure modes, operating continuously, integrated at every stage of the development pipeline — is not optional in a world where AI writes significant portions of production software.

Sentinel is that layer. It does not restrict what AI can create. It ensures that what AI creates is safe, sound, and consistent with the standards your team has established.

> *"The question is not whether AI will write code. The question is whether anyone is checking."*
> — Sentinel v1.0 Design Brief

---

<div align="center">

---

**SENTINEL — AI Software Engineering Safety Platform**

*Version 1.0 · Complete Technical Guide*

*Where AI development speed meets engineering discipline.*

</div>
