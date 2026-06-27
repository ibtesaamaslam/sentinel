import type { Finding } from '@sentinel/core';
import { Severity, FindingCategory, utils } from '@sentinel/core';
import type { ParsedFile } from '@sentinel/parser';

export interface SecurityPattern {
  pattern: RegExp;
  severity: Severity;
  message: string;
  category: FindingCategory;
  suggestedFix?: string;
}

const SECURITY_PATTERNS: SecurityPattern[] = [
  { pattern: /eval\s*\(/g, severity: Severity.Critical, message: 'eval() used - security and performance risk', category: FindingCategory.SecurityVulnerability },
  { pattern: /Function\s*\([^)]*['"]/g, severity: Severity.Critical, message: 'Function constructor with string - potential code injection', category: FindingCategory.SecurityVulnerability },
  { pattern: /child_process\.exec(?:Sync)?\s*\(/g, severity: Severity.Critical, message: 'Command execution detected', category: FindingCategory.CommandInjection },
  { pattern: /\.innerHTML\s*=.*\+/g, severity: Severity.High, message: 'Potential XSS - innerHTML with concatenation', category: FindingCategory.Xss },
  { pattern: /dangerouslySetInnerHTML/g, severity: Severity.High, message: 'dangerouslySetInnerHTML - potential XSS risk', category: FindingCategory.Xss },
  { pattern: /\.query\s*\(\s*['"`]\s*SELECT\s+.+\+.*['"`]/gi, severity: Severity.Critical, message: 'Possible SQL injection', category: FindingCategory.SqlInjection },
  { pattern: /writeFile(?:Sync)?\s*\([^)]*\+/g, severity: Severity.High, message: 'File write with path concatenation - path traversal risk', category: FindingCategory.PathTraversal },
  { pattern: /rejectUnauthorized\s*[:=]\s*false/gi, severity: Severity.High, message: 'TLS validation disabled - security risk', category: FindingCategory.InsecureAuth },
  { pattern: /\.__proto__\s*=/g, severity: Severity.Critical, message: 'Direct __proto__ assignment - prototype pollution', category: FindingCategory.SecurityVulnerability },
];

export class SecurityAnalyzer {
  analyzeFile(file: ParsedFile): Finding[] {
    const findings: Finding[] = [];

    for (const rule of SECURITY_PATTERNS) {
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
          category: rule.category,
          rule: `security/${rule.severity}`,
          source: 'scanner',
          suggestedFix: rule.suggestedFix,
        });
      }
    }

    return findings;
  }
}
