import { Severity, FindingCategory, type Finding } from '@sentinel/core';
import type { Checker, CheckerContext } from '../types.js';
import { patternMatcher } from './pattern-matcher.js';

const BUG_PATTERNS = [
  { pattern: /===?\s*===\s*/g, severity: Severity.Medium, message: 'Possible unintended comparison' },
  { pattern: /NaN\s*===?\s*[a-zA-Z]/g, severity: Severity.Medium, message: 'Comparison with NaN, use isNaN() instead' },
  { pattern: /\.\.\.undefined/g, severity: Severity.High, message: 'Spreading undefined will throw at runtime' },
  { pattern: /typeof\s+[a-zA-Z_$]\w*\s*===?\s*'undefined'\s*\|\|\s*$/g, severity: Severity.Medium, message: 'Ineffective typeof check pattern' },
  { pattern: /\[\s*\]\s*\[\s*[-0-9]/g, severity: Severity.Critical, message: 'Array access with negative index' },
  { pattern: /\.length\s*=\s*-/g, severity: Severity.Critical, message: 'Setting length to negative value' },
  { pattern: /new\s+Boolean\s*\(/g, severity: Severity.Low, message: 'Avoid using new Boolean(), use Boolean() or !! instead' },
  { pattern: /new\s+String\s*\(/g, severity: Severity.Low, message: 'Avoid using new String(), use String() instead' },
  { pattern: /new\s+Number\s*\(/g, severity: Severity.Low, message: 'Avoid using new Number(), use Number() instead' },
  { pattern: /parseInt\s*\(\s*[^,)]+\s*\)/g, severity: Severity.Medium, message: 'parseInt() without radix parameter (defaults to base 10 but may be inconsistent)' },
  { pattern: /==\s*null/g, severity: Severity.Info, message: 'Use === null instead of == null for explicit null checks' },
  { pattern: /!= null/g, severity: Severity.Info, message: 'Use !== null instead of != null for explicit null checks' },
];

export const bugChecker: Checker = {
  id: 'sentinel/bug-detection',
  name: 'Bug Detection',
  description: 'Detects common programming bugs and logic errors',
  languages: ['javascript', 'typescript', 'javascriptreact', 'typescriptreact'],
  check(context: CheckerContext): Finding[] {
    return patternMatcher(context, BUG_PATTERNS, 'bug-detection', FindingCategory.Bug);
  },
};
