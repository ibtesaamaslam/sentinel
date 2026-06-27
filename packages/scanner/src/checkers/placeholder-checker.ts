import { Severity, FindingCategory, type Finding } from '@sentinel/core';
import type { Checker, CheckerContext } from '../types.js';
import { patternMatcher } from './pattern-matcher.js';

const PLACEHOLDER_PATTERNS = [
  // TODO/FIXME
  { pattern: /TODO\b/g, severity: Severity.Medium, message: 'TODO comment found - incomplete implementation' },
  { pattern: /FIXME\b/g, severity: Severity.High, message: 'FIXME comment found - known issue needs fixing' },
  { pattern: /HACK\b/g, severity: Severity.Medium, message: 'HACK comment found - potentially fragile code' },
  { pattern: /XXX\b/g, severity: Severity.Low, message: 'XXX marker found - needs attention' },

  // Empty function/class bodies
  { pattern: /function\s+\w+\s*\([^)]*\)\s*\{\s*\}/g, severity: Severity.Medium, message: 'Empty function body - possible stub/placeholder' },
  { pattern: /const\s+\w+\s*=\s*\([^)]*\)\s*=>\s*\{\s*\}/g, severity: Severity.Medium, message: 'Empty arrow function body - possible stub/placeholder' },
  { pattern: /class\s+\w+\s*\{\s*\}/g, severity: Severity.Medium, message: 'Empty class body - possible stub/placeholder' },

  // Placeholder comments
  { pattern: /\/\/\s*TODO:/g, severity: Severity.Medium, message: 'TODO comment with specific task', category: FindingCategory.Todo },
  { pattern: /\/\/\s*FIXME:/g, severity: Severity.High, message: 'FIXME comment with specific description' },
  { pattern: /\/\/\s*@ts-expect-error/g, severity: Severity.Low, message: '@ts-expect-error suppresses TypeScript errors - should be resolved properly' },
  { pattern: /\/\/\s*@ts-ignore/g, severity: Severity.Low, message: '@ts-ignore suppresses TypeScript errors - should be resolved properly' },
  { pattern: /\/\/\s*eslint-disable-next-line/g, severity: Severity.Low, message: 'eslint-disable-next-line suppresses linting errors' },

  // Common placeholder patterns
  { pattern: /placeholder|stub|TODO|FIXME/i, severity: Severity.Medium, message: 'Placeholder or stub code found' },

  // Console.log left in production code
  { pattern: /console\.(log|debug|info|warn|error)\s*\(/g, severity: Severity.Low, message: 'Console statement found - possible debugging leftover' },
];

export const placeholderChecker: Checker = {
  id: 'sentinel/placeholder-detection',
  name: 'Placeholder & TODO Detection',
  description: 'Detects placeholder code, TODO/FIXME markers, and empty implementations',
  languages: ['*'],
  check(context: CheckerContext): Finding[] {
    return patternMatcher(context, PLACEHOLDER_PATTERNS, 'placeholder-detection', FindingCategory.Placeholder);
  },
};
