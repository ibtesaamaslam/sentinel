# Versioning

Sentinel uses [Changesets](https://github.com/changesets/changesets) for version management.

## Packages

All packages in the monorepo share the same version number:
- `@sentinel/core`
- `@sentinel/scanner`
- `@sentinel/monitor`
- `@sentinel/guardian`
- `@sentinel/firewall`
- `@sentinel/recovery`
- `@sentinel/reports`
- `@sentinel/reporting`
- `@sentinel/plugin-sdk`
- `@sentinel/plugins`
- `@sentinel/cli`
- `@sentinel/dashboard`
- `@sentinel/logger`
- `@sentinel/config`
- `@sentinel/ai`
- `@sentinel/parser`
- `@sentinel/ast`
- `@sentinel/graph`
- `@sentinel/security`
- `@sentinel/performance`
- `@sentinel/architecture`
- `@sentinel/dependency`
- `@sentinel/telemetry`
- `@sentinel/analytics`
- `@sentinel/policy`
- `@sentinel/common`
- `@sentinel/utils`
- `@sentinel/ui`
- `@sentinel/testing`

## Pre-1.0

Before the 1.0 release, minor versions may include breaking changes. We will communicate breaking changes via:
- Release notes
- CHANGELOG.md
- Migration guides in documentation

## 1.0+

Starting with version 1.0.0, breaking changes will only occur in major version bumps.
