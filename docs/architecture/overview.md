# Architecture Overview

Sentinel is built as a layered modular monorepo. Each layer has clear boundaries and dependencies.

## Layers

1. **Core** (@sentinel/core, @sentinel/logger, @sentinel/config) - Foundation types, schemas, logging, config
2. **Analysis** (@sentinel/parser, @sentinel/ast, @sentinel/graph, etc.) - Specialized analysis modules
3. **Engines** (@sentinel/scanner, @sentinel/monitor, etc.) - Core systems that orchestrate analysis
4. **Reporting** (@sentinel/reports, @sentinel/reporting) - Report generation and pipelines
5. **Applications** (@sentinel/cli, @sentinel/dashboard, etc.) - User-facing interfaces

## Dependency Direction

```
Applications → Engines → Analysis → Core
```

No package in a lower layer may depend on a package in a higher layer.
