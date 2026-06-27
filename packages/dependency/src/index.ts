import type { Finding } from '@sentinel/core';
import { utils, Severity, FindingCategory } from '@sentinel/core';

export interface PackageDependency {
  name: string;
  version: string;
  type: 'dependency' | 'devDependency' | 'peerDependency';
}

export interface DependencyIssue {
  dependency: PackageDependency;
  issue: string;
  severity: Severity;
}

export class DependencyAnalyzer {
  analyzePackageJson(content: string, filePath: string): Finding[] {
    const findings: Finding[] = [];
    let pkg: Record<string, unknown>;

    try {
      pkg = JSON.parse(content);
    } catch {
      return [];
    }

    const deps = [
      ...this.extractDeps(pkg, 'dependencies', 'dependency'),
      ...this.extractDeps(pkg, 'devDependencies', 'devDependency'),
      ...this.extractDeps(pkg, 'peerDependencies', 'peerDependency'),
    ];

    for (const dep of deps) {
      if (dep.version === '*' || dep.version === 'latest') {
        findings.push({
          id: utils.generateId(),
          file: filePath,
          line: 1,
          column: 1,
          message: `Dependency '${dep.name}' uses '${dep.version}' - pin to a specific version`,
          severity: Severity.Medium,
          category: FindingCategory.DatabaseIssue,
          rule: 'dependency/pin-version',
          source: 'scanner',
          suggestedFix: `Pin '${dep.name}' to a specific version range (e.g., ^1.0.0)`,
        });
      }

      if (dep.name.includes('beta') || dep.name.includes('alpha') || dep.version.includes('beta') || dep.version.includes('alpha')) {
        findings.push({
          id: utils.generateId(),
          file: filePath,
          line: 1,
          column: 1,
          message: `Pre-release dependency '${dep.name}@${dep.version}' in production - use stable versions`,
          severity: Severity.Medium,
          category: FindingCategory.DatabaseIssue,
          rule: 'dependency/no-prerelease',
          source: 'scanner',
        });
      }
    }

    return findings;
  }

  private extractDeps(pkg: Record<string, unknown>, key: string, type: PackageDependency['type']): PackageDependency[] {
    const deps = pkg[key] as Record<string, string> | undefined;
    if (!deps) return [];
    return Object.entries(deps).map(([name, version]) => ({ name, version, type }));
  }
}
