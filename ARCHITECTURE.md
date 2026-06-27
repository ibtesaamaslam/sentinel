# Sentinel Architecture

## Overview

Sentinel is a modular monorepo built with TypeScript, TurboRepo, and PNPM. The platform consists of a core library layer, engine packages, and application frontends.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                      Applications                        │
│  ┌────────┐  ┌──────────────┐  ┌────────┐  ┌────────┐  │
│  │  CLI   │  │  Dashboard   │  │  VS Code│  │ Desktop│  │
│  └────┬───┘  └──────┬───────┘  └────┬───┘  └────┬───┘  │
├───────┴──────────────┴───────────────┴────────────┴────┤
│                      Engines                            │
│  ┌───────┐ ┌──────┐ ┌────────┐ ┌────────┐ ┌────────┐  │
│  │Scanner│ │Monitor│ │Guardian│ │Firewall│ │Recovery│  │
│  └───┬───┘ └──┬───┘ └───┬────┘ └───┬────┘ └───┬────┘  │
├───────┴────────┴────────┴──────────┴────────────┴────┤
│                  Analysis Packages                     │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐   │
│  │ AI │ │AST │ │Graph│ │Sec │ │Perf│ │Arch│ │Dep │   │
│  └─┬──┘ └─┬──┘ └──┬─┘ └──┬─┘ └──┬─┘ └──┬─┘ └──┬─┘   │
├──────┴──────┴───────┴──────┴───────┴──────┴──────┴────┤
│                   Core Packages                        │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐       │
│  │ Core │ │Config│ │Logger│ │Common│ │ Utils│       │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘       │
└─────────────────────────────────────────────────────────┘
```

## Package Layers

### Layer 1: Core (Foundation)
- `@sentinel/core` - Shared types, schemas, enums
- `@sentinel/logger` - Structured logging framework
- `@sentinel/config` - Configuration loading and validation
- `@sentinel/common` - Common utilities and helpers
- `@sentinel/utils` - Utility functions
- `@sentinel/testing` - Test utilities and factories

### Layer 2: Analysis (Specialized Analysis)
- `@sentinel/parser` - File parsing and language detection
- `@sentinel/ast` - AST extraction and analysis
- `@sentinel/graph` - Dependency graph and cycle detection
- `@sentinel/security` - Security vulnerability detection
- `@sentinel/performance` - Performance issue detection
- `@sentinel/architecture` - Architecture rule enforcement
- `@sentinel/dependency` - Package dependency auditing
- `@sentinel/ai` - AI provider integration (optional)

### Layer 3: Engines (Core Systems)
- `@sentinel/scanner` - Repository Scan Engine
- `@sentinel/monitor` - Live Monitoring Engine
- `@sentinel/guardian` - AI Guardian Engine
- `@sentinel/firewall` - AI Firewall Engine
- `@sentinel/recovery` - Recovery Engine

### Layer 4: Reporting & SDK
- `@sentinel/reports` - Report renderers (HTML, JSON, SARIF, terminal)
- `@sentinel/reporting` - Report pipeline and persistence
- `@sentinel/plugin-sdk` - Plugin SDK interfaces
- `@sentinel/plugins` - Plugin registry and lifecycle
- `@sentinel/telemetry` - Usage telemetry
- `@sentinel/analytics` - Analytics aggregation
- `@sentinel/policy` - Policy engine
- `@sentinel/ui` - UI components

### Layer 5: Applications
- `@sentinel/cli` - Command-line interface
- `@sentinel/dashboard` - Web dashboard
- `@sentinel/vscode-extension` - VS Code extension
- `@sentinel/desktop` - Desktop application

## Key Design Decisions

1. **Modular Monorepo**: Each package is independently testable and can be used standalone
2. **Zero AI Dependencies**: Core functionality requires no external AI APIs
3. **Plugin-First**: All engines support plugin hooks for extensibility
4. **Strict TypeScript**: Strict mode enabled across all packages
5. **Clean Architecture**: Separation of concerns with clear dependency direction (core → analysis → engines → apps)
