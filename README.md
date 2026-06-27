# Sentinel 🔍

**AI Software Engineering Safety Platform**

Sentinel sits between developers and AI coding agents (Claude Code, Cursor, Gemini CLI, Codex, Cline, etc.) and continuously verifies that AI-generated code is safe, correct, secure, maintainable, and production-ready.

Sentinel is **not another AI coding assistant** — it is the **guardian, reviewer, architect, security engineer, QA engineer, and engineering manager** supervising AI-generated code.

## Features

### 🔬 Repository Scan Engine
Deep static analysis for entire repositories, detecting:
- Bugs & logic errors
- Placeholder code & TODO/FIXME markers
- AI hallucinations & invented APIs
- Hardcoded secrets & API keys
- Security vulnerabilities (SQLi, XSS, SSRF, CSRF, Command Injection)
- Duplicate/dead code, circular dependencies
- Performance issues & memory leaks
- Missing tests & architecture violations

### 👁️ Live Monitoring Engine
Continuously watch file changes, AI edits, and git events with instant feedback.

### 🛡️ AI Guardian Engine
Observe AI coding sessions, understand intent, and verify every generated change.

### 🔥 AI Firewall Engine
Intercept high-risk operations — block or require approval for dangerous changes.

### 🔧 Recovery Engine
Automatically explain failures, find root causes, and generate rollback patches.

## Quick Start

```bash
# Install globally
npm install -g @sentinel/cli

# Scan a repository
sentinel scan /path/to/project

# Watch for changes
sentinel monitor /path/to/project

# Generate HTML report
sentinel scan /path/to/project --format html --format terminal

# Scan with JSON/SARIF output
sentinel scan /path/to/project --format json --format sarif
```

## CLI Commands

### `sentinel scan [target]`
Scan a repository for issues.

| Option | Description | Default |
|--------|-------------|---------|
| `-f, --format` | Report formats (html, json, sarif, terminal) | `terminal` |
| `-o, --output` | Output directory for reports | `./sentinel-reports` |
| `-e, --exclude` | Exclude patterns | `node_modules,.git,dist,...` |
| `--no-parallel` | Disable parallel scanning | enabled |
| `-w, --workers` | Number of worker threads | `4` |
| `--open` | Open HTML report in browser | disabled |

### `sentinel monitor [target]`
Watch a repository for changes.

| Option | Description | Default |
|--------|-------------|---------|
| `-d, --debounce` | Debounce interval in ms | `300` |
| `-e, --exclude` | Exclude patterns | `node_modules,.git,dist,...` |

### `sentinel --help`
Show full help.

## Report Formats

- **Terminal**: Colored console output with severity highlighting
- **HTML**: Rich HTML report with score cards and finding details
- **JSON**: Machine-readable JSON output
- **SARIF**: Standard SARIF 2.1.0 format for CI/CD integration

## Architecture

```
sentinel/
├── packages/
│   ├── core/          # Shared types, schemas, utilities
│   ├── scanner/       # Repository Scan Engine
│   ├── monitor/       # Live Monitoring Engine
│   ├── guardian/      # AI Guardian Engine
│   ├── firewall/      # AI Firewall Engine
│   ├── recovery/      # Recovery Engine
│   ├── reports/       # Report generators (HTML, JSON, SARIF, terminal)
│   ├── plugin-sdk/    # Plugin SDK for extensibility
│   └── cli/           # CLI application
├── docker/            # Docker support
├── .github/           # CI/CD workflows
└── examples/          # Example projects
```

## Docker

```bash
# Build and run
docker compose up

# Or build manually
docker build -t sentinel -f docker/Dockerfile .
docker run --rm -v $(pwd):/workspace sentinel scan /workspace
```

## Plugin Development

Sentinel supports plugins via the Plugin SDK. Create a directory with a `manifest.json`:

```json
{
  "id": "my-plugin",
  "name": "My Plugin",
  "version": "1.0.0",
  "description": "Custom checker",
  "entry": "index.js"
}
```

```typescript
import { SentinelPlugin } from '@sentinel/plugin-sdk';

const plugin: SentinelPlugin = {
  id: 'my-plugin',
  name: 'My Plugin',
  version: '1.0.0',
  description: 'Custom checker for my team',
  hooks: {
    onFile: async (file, context) => {
      const findings = [];
      // Custom analysis logic
      return findings;
    },
  },
};

export default plugin;
```

## Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Type check
pnpm typecheck

# Development mode
pnpm dev
```

## Integrations

Sentinel is designed to integrate with:
- **GitHub / GitLab / Bitbucket** — via CI/CD pipelines and webhooks
- **VS Code / Cursor** — via the live monitoring engine
- **Claude Code / Gemini CLI / Codex CLI** — via the AI Guardian engine
- **Cline / RooCode / Kiro** — via plugin SDK
- **CI/CD pipelines** — via CLI exit codes and SARIF output

## License

MIT
