import { Severity, FindingCategory, utils, type Finding } from '@sentinel/core';
import type { Checker, CheckerContext } from '../types.js';

const SECRET_PATTERNS = [
  // Generic API keys
  { pattern: /(?:api[_-]?key|apikey|api[_-]?secret)\s*[:=]\s*['"][^'"]{8,}['"]/gi, severity: Severity.Critical, message: 'Hardcoded API key detected' },
  { pattern: /(?:sk|pk)[_-][a-zA-Z0-9]{20,}/g, severity: Severity.Critical, message: 'Stripe-like API key detected' },

  // AWS
  { pattern: /AKIA[0-9A-Z]{16}/g, severity: Severity.Critical, message: 'AWS Access Key ID detected' },
  { pattern: /(?:aws[_-]?secret|aws[_-]?access[_-]?key)\s*[:=]\s*['"][^'"]+['"]/gi, severity: Severity.Critical, message: 'AWS secret key detected' },

  // GitHub tokens
  { pattern: /gh[ps]_[a-zA-Z0-9]{36,}/g, severity: Severity.Critical, message: 'GitHub token detected' },
  { pattern: /github[_-]?token\s*[:=]\s*['"][^'"]+['"]/gi, severity: Severity.Critical, message: 'GitHub token detected' },

  // Generic tokens
  { pattern: /(?:token|secret|password|passwd|credential)\s*[:=]\s*['"][^'"]{8,}['"]/gi, severity: Severity.High, message: 'Hardcoded credential detected' },
  { pattern: /(?:bearer|bearer[_-]?token)\s+[a-zA-Z0-9\-_.]{20,}/gi, severity: Severity.Critical, message: 'Bearer token detected' },

  // JWT tokens
  { pattern: /eyJ[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}/g, severity: Severity.Critical, message: 'JWT token detected in source code' },

  // Private keys
  { pattern: /-----BEGIN (?:RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----/g, severity: Severity.Critical, message: 'Private key detected' },

  // Connection strings
  { pattern: /(?:mongodb|postgres|mysql|redis):\/\/[^\s"']+:[^\s"']+@/gi, severity: Severity.Critical, message: 'Database connection string with credentials detected' },

  // Slack tokens
  { pattern: /xox[baprs]-[a-zA-Z0-9-]{10,}/g, severity: Severity.Critical, message: 'Slack token detected' },
];

export const secretChecker: Checker = {
  id: 'sentinel/secret-detection',
  name: 'Secret Detection',
  description: 'Detects hardcoded secrets, API keys, tokens, and credentials',
  languages: ['*'],
  check(context: CheckerContext): Finding[] {
    const findings: Finding[] = [];

    for (const rule of SECRET_PATTERNS) {
      const regex = new RegExp(rule.pattern.source, rule.pattern.flags.includes('g') ? rule.pattern.flags : rule.pattern.flags + 'g');
      let match: RegExpExecArray | null;

      while ((match = regex.exec(context.file.content)) !== null) {
        const matchIndex = match.index;
        let lineNum = 1;
        let colNum = 1;
        for (let i = 0; i < matchIndex && i < context.file.content.length; i++) {
          if (context.file.content[i] === '\n') { lineNum++; colNum = 1; }
          else { colNum++; }
        }

        const snippetStart = Math.max(0, matchIndex - 10);
        const snippetEnd = Math.min(context.file.content.length, matchIndex + match[0].length + 10);
        let snippet = context.file.content.slice(snippetStart, snippetEnd);
        if (snippetStart > 0) snippet = '...' + snippet;
        if (snippetEnd < context.file.content.length) snippet = snippet + '...';

        // Mask part of the secret for safety
        const maskedSnippet = snippet;

        findings.push({
          id: utils.generateId(),
          file: context.file.path,
          line: lineNum,
          column: colNum,
          endLine: lineNum,
          endColumn: colNum + match[0].length,
          message: rule.message,
          severity: rule.severity,
          category: FindingCategory.Secret,
          rule: `secret-detection/${rule.severity}`,
          snippet: maskedSnippet,
          suggestedFix: 'Move this secret to environment variables or a secrets manager (e.g., .env file, Vault, AWS Secrets Manager)',
          source: 'scanner',
        });
      }
    }

    return findings;
  },
};
