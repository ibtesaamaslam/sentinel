import { Severity, FindingCategory, utils, type Finding } from '@sentinel/core';
import type { Checker, CheckerContext } from '../types.js';
import { patternMatcher } from './pattern-matcher.js';

const QUALITY_PATTERNS = [
  // Unused imports
  { pattern: /import\s+\{[^}]*\b(\w+)\b[^}]*\}\s+from\s+['"][^'"]+['"]/g, severity: Severity.Low, message: 'Import statement - verify all imports are used' },
  { pattern: /^import\s+\w+\s+from\s+['"][^'"]+['"];?\s*$/gm, severity: Severity.Info, message: 'Default import - verify it is used in the module' },

  // Duplicate keys in objects
  { pattern: /(\w+)\s*:\s*[^,]+,\s*\n\s*\1\s*:/g, severity: Severity.Medium, message: 'Duplicate key in object literal - last value overrides earlier ones' },

  // Semicolons and other issues
  { pattern: /\bdebugger\b/g, severity: Severity.Medium, message: 'debugger statement found - should be removed before production' },
  { pattern: /alert\s*\(/g, severity: Severity.Low, message: 'alert() used - likely debugging code' },

  // Callback patterns
  { pattern: /callback\s*\(\s*[^)]*error/gi, severity: Severity.Low, message: 'Callback with error parameter - ensure errors are handled properly' },

  // Assignment in condition
  { pattern: /if\s*\(\s*[^=<>!]+\s*=\s*[^=][^)]*\)/g, severity: Severity.High, message: 'Assignment in condition - possible typo, use === for comparison' },

  // Empty catch block
  { pattern: /catch\s*\([^)]*\)\s*\{\s*\}/g, severity: Severity.Medium, message: 'Empty catch block - error is being silently ignored' },

  // Magic numbers
  { pattern: /if\s*\([^)]+\s*[=<>]+\s*[0-9]{3,}[^)]*\)/g, severity: Severity.Info, message: 'Magic number detected - consider using a named constant' },
];

const DUPLICATE_IMPORT_PATTERN = /import\s+\{[^}]*\b(\w+)\b[^}]*\}\s+from\s+['"][^'"]+['"];?\s*\n\s*import\s+\{[^}]*\b\1\b[^}]*\}\s+from\s+['"][^'"]+['"]/g;

export const qualityChecker: Checker = {
  id: 'sentinel/code-quality',
  name: 'Code Quality Checker',
  description: 'Detects code quality issues: unused code, duplicates, magic numbers, and bad patterns',
  languages: ['*'],
  check(context: CheckerContext): Finding[] {
    const findings = patternMatcher(context, QUALITY_PATTERNS, 'code-quality', FindingCategory.DeadCode);

    // Check for duplicate imports
    const dupImportRegex = new RegExp(DUPLICATE_IMPORT_PATTERN.source, 'gm');
    let match: RegExpExecArray | null;
    while ((match = dupImportRegex.exec(context.file.content)) !== null) {
      const matchIndex = match.index;
      let lineNum = 1;
      for (let i = 0; i < matchIndex && i < context.file.content.length; i++) {
        if (context.file.content[i] === '\n') lineNum++;
      }

      findings.push({
        id: utils.generateId(),
        file: context.file.path,
        line: lineNum,
        column: 1,
        message: `Duplicate import of '${match[1]}' from multiple modules`,
        severity: Severity.Medium,
        category: FindingCategory.DuplicateCode,
        rule: 'code-quality/duplicate-import',
        snippet: match[0].slice(0, 100),
        suggestedFix: 'Consolidate imports from a single module',
        source: 'scanner',
      });
    }

    return findings;
  },
};
