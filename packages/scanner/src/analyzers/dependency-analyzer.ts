import { Severity, FindingCategory, utils, type Finding, type FileInfo } from '@sentinel/core';
import type { AnalyzerResult } from '../types.js';

interface DependencyEdge {
  from: string;
  to: string;
  type: 'import' | 'require';
}

export class DependencyAnalyzer {
  private dependencies: Map<string, Set<string>> = new Map();
  private allFiles: Map<string, FileInfo> = new Map();

  analyze(files: FileInfo[]): AnalyzerResult {
    this.allFiles.clear();
    this.dependencies.clear();
    this.allFiles = new Map(files.map(f => [f.path, f]));

    const findings: Finding[] = [];
    const edges: DependencyEdge[] = [];

    // Extract imports and build dependency graph
    for (const file of files) {
      const deps = this.extractDependencies(file);
      this.dependencies.set(file.path, deps);

      for (const dep of deps) {
        edges.push({ from: file.path, to: dep, type: 'import' });
      }
    }

    // Check for circular dependencies
    const cycles = this.detectCycles();
    for (const cycle of cycles) {
      findings.push({
        id: utils.generateId(),
        file: cycle[0],
        line: 1,
        column: 1,
        message: `Circular dependency detected: ${cycle.join(' -> ')}`,
        severity: Severity.Medium,
        category: FindingCategory.CircularDependency,
        rule: 'dependency-analysis/circular',
        snippet: `Dependency cycle: ${cycle.join(' → ')}`,
        suggestedFix: 'Refactor to remove the circular dependency, extract shared code into a new module',
        source: 'scanner',
      });
    }

    // Check for self-referencing imports
    for (const edge of edges) {
      if (edge.from === edge.to) {
        findings.push({
          id: utils.generateId(),
          file: edge.from,
          line: 1,
          column: 1,
          message: `Self-referencing import in '${edge.from}'`,
          severity: Severity.Low,
          category: FindingCategory.UnusedImport,
          rule: 'dependency-analysis/self-reference',
          source: 'scanner',
        });
      }
    }

    return { findings };
  }

  private extractDependencies(file: FileInfo): Set<string> {
    const deps = new Set<string>();
    const importRegex = /from\s+['"]([^'"]+)['"]/g;
    const requireRegex = /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;

    let match: RegExpExecArray | null;
    while ((match = importRegex.exec(file.content)) !== null) {
      deps.add(this.resolveImportPath(file.path, match[1]));
    }
    while ((match = requireRegex.exec(file.content)) !== null) {
      deps.add(this.resolveImportPath(file.path, match[1]));
    }

    return deps;
  }

  private resolveImportPath(fromFile: string, importPath: string): string {
    // If it's a relative import, resolve it
    if (importPath.startsWith('.')) {
      const { dirname, resolve } = require('node:path') as typeof import('node:path');
      const dir = dirname(fromFile);
      const resolved = resolve(dir, importPath);
      // Try common extensions
      for (const ext of ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '/index.ts', '/index.js']) {
        const candidate = resolved + ext;
        if (this.allFiles.has(candidate)) return candidate;
      }
      return resolved;
    }
    // Package imports are not resolved for file-level analysis
    return importPath;
  }

  private detectCycles(): string[][] {
    const visited = new Set<string>();
    const recursionStack = new Set<string>();
    const cycles: string[][] = [];
    const path: string[] = [];

    const dfs = (node: string) => {
      if (recursionStack.has(node)) {
        const cycleStart = path.indexOf(node);
        if (cycleStart >= 0) {
          cycles.push([...path.slice(cycleStart), node]);
        }
        return;
      }
      if (visited.has(node)) return;

      visited.add(node);
      recursionStack.add(node);
      path.push(node);

      const deps = this.dependencies.get(node);
      if (deps) {
        for (const dep of deps) {
          // Only follow internal dependencies
          if (this.dependencies.has(dep)) {
            dfs(dep);
          }
        }
      }

      path.pop();
      recursionStack.delete(node);
    };

    for (const file of this.dependencies.keys()) {
      dfs(file);
    }

    return cycles;
  }
}
