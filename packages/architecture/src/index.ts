import type { Finding, FileInfo } from '@sentinel/core';
import { utils, Severity, FindingCategory } from '@sentinel/core';

export interface ArchitectureRule {
  id: string;
  name: string;
  description: string;
  check: (files: FileInfo[]) => Finding[];
}

export class ArchitectureAnalyzer {
  private rules: ArchitectureRule[] = [];

  constructor() {
    this.loadBuiltInRules();
  }

  private loadBuiltInRules(): void {
    this.rules.push({
      id: 'arch/no-default-exports-in-barrel',
      name: 'No Default Exports in Barrel Files',
      description: 'Barrel files (index.ts) should not have default exports',
      check: (files: FileInfo[]) => {
        const findings: Finding[] = [];
        for (const file of files) {
          if (file.path.endsWith('/index.ts') || file.path === 'index.ts') {
            if (file.content.includes('export default ')) {
              findings.push({
                id: utils.generateId(),
                file: file.path,
                line: 1,
                column: 1,
                message: 'Barrel file (index.ts) should not have default exports',
                severity: Severity.Low,
                category: FindingCategory.ArchitectureViolation,
                rule: 'arch/no-default-exports-in-barrel',
                source: 'scanner',
              });
            }
          }
        }
        return findings;
      },
    });

    this.rules.push({
      id: 'arch/max-file-lines',
      name: 'Maximum File Lines',
      description: 'Files should not exceed 500 lines for maintainability',
      check: (files: FileInfo[]) => {
        const findings: Finding[] = [];
        for (const file of files) {
          const lines = file.content.split('\n').length;
          if (lines > 500) {
            findings.push({
              id: utils.generateId(),
              file: file.path,
              line: 500,
              column: 1,
              message: `File exceeds 500 lines (${lines} lines) - consider refactoring`,
              severity: Severity.Low,
              category: FindingCategory.ArchitectureViolation,
              rule: 'arch/max-file-lines',
              source: 'scanner',
            });
          }
        }
        return findings;
      },
    });
  }

  addRule(rule: ArchitectureRule): void {
    this.rules.push(rule);
  }

  analyze(files: FileInfo[]): Finding[] {
    const findings: Finding[] = [];
    for (const rule of this.rules) {
      try {
        findings.push(...rule.check(files));
      } catch {
        // Skip failed rules
      }
    }
    return findings;
  }
}
