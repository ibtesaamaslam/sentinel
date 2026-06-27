import type { Finding } from '@sentinel/core';
import { utils, Severity, FindingCategory } from '@sentinel/core';
import type { ParsedFile } from '@sentinel/parser';

export interface PerformanceIssue {
  pattern: RegExp;
  severity: Severity;
  message: string;
}

const PERF_PATTERNS: PerformanceIssue[] = [
  { pattern: /JSON\.parse\s*\(\s*JSON\.stringify/g, severity: Severity.Medium, message: 'JSON.parse(JSON.stringify(obj)) - use structuredClone() instead' },
  { pattern: /\.filter\s*\([^)]*\)\s*\.\s*map\s*\(/g, severity: Severity.Low, message: 'Chained filter().map() - use flatMap() or reduce()' },
  { pattern: /import\s+\*\s+as\s+\w+\s+from\s+['"`]lodash['"`]/g, severity: Severity.High, message: 'Importing entire lodash - use specific imports' },
  { pattern: /import\s+\*\s+as\s+\w+\s+from\s+['"`]moment['"`]/g, severity: Severity.High, message: 'Importing entire moment.js - use date-fns' },
  { pattern: /\.concat\s*\(\s*\[/g, severity: Severity.Info, message: 'Array.concat() with array literal - use spread [...]' },
  { pattern: /new\s+Array\s*\(\s*\d+\s*\)\s*\.\s*fill/g, severity: Severity.Low, message: 'Array.fill() - consider performance implications for large arrays' },
  { pattern: /for\s*\(let\s+\w+\s*=\s*0\s*;\s*\w+\s*<\s*\w+\.length\s*;/g, severity: Severity.Info, message: 'Loop with .length check on each iteration - cache .length' },
];

export class PerformanceAnalyzer {
  analyzeFile(file: ParsedFile): Finding[] {
    const findings: Finding[] = [];

    for (const rule of PERF_PATTERNS) {
      const regex = new RegExp(rule.pattern.source, rule.pattern.flags.includes('g') ? rule.pattern.flags : rule.pattern.flags + 'g');
      let match: RegExpExecArray | null;

      while ((match = regex.exec(file.content)) !== null) {
        const lineNum = file.content.slice(0, match.index).split('\n').length;
        findings.push({
          id: utils.generateId(),
          file: file.path,
          line: lineNum,
          column: match.index - file.content.lastIndexOf('\n', match.index - 1),
          message: rule.message,
          severity: rule.severity,
          category: FindingCategory.Performance,
          rule: `performance/${rule.severity}`,
          source: 'scanner',
        });
      }
    }

    return findings;
  }
}
