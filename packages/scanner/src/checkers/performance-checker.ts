import { Severity, FindingCategory, type Finding } from '@sentinel/core';
import type { Checker, CheckerContext } from '../types.js';
import { patternMatcher } from './pattern-matcher.js';

const PERFORMANCE_PATTERNS = [
  // Memory / Performance issues
  { pattern: /new\s+Array\s*\(\s*[^)0-9][^)]*\s*\)\s*\.\s*fill\s*\(/g, severity: Severity.Low, message: 'Array.fill() with computed size - verify this is not an anti-pattern' },
  { pattern: /for\s*\(\s*let\s+\w+\s*=\s*0\s*;\s*\w+\s*<\s*[a-zA-Z_]\w*\.length\s*;\s*\w+\+\+\s*\)/g, severity: Severity.Info, message: 'For loop with .length check on every iteration - consider caching .length' },
  { pattern: /\.toLowerCase\s*\(\s*\)\s*\.\s*(includes|startsWith|indexOf)/g, severity: Severity.Info, message: 'Chained toLowerCase() comparison - consider using localeCompare() for efficiency' },
  { pattern: /\.concat\s*\(\s*\[/g, severity: Severity.Info, message: 'Array.concat() with array literal - use spread operator [...] instead' },
  { pattern: /JSON\.parse\s*\(\s*JSON\.stringify/g, severity: Severity.Medium, message: 'JSON.parse(JSON.stringify(obj)) deep clone is slow and loses types - consider structuredClone()' },
  { pattern: /\.filter\s*\([^)]*\)\s*\.\s*map\s*\(/g, severity: Severity.Low, message: 'Chained filter().map() - consider using flatMap() or a single reduce() for better performance' },
  { pattern: /\.filter\s*\([^)]*\)\s*\.\s*forEach\s*\(/g, severity: Severity.Info, message: 'Chained filter().forEach() - consider a single for...of loop for better performance' },
  { pattern: /\.find\s*\([^)]*\)\s*\.\s*property/g, severity: Severity.Info, message: 'Accessing property on .find() result - ensure the result is not undefined' },
  { pattern: /\bfor\s*\(/g, severity: Severity.Info, message: 'Classic for loop - consider for...of for better readability' },

  // Bundle size concerns
  { pattern: /import\s+\*\s+as\s+\w+\s+from\s+['"`]lodash['"`]/g, severity: Severity.High, message: 'Importing entire lodash library - use specific imports like import debounce from "lodash/debounce" to reduce bundle size' },
  { pattern: /import\s+\*\s+as\s+\w+\s+from\s+['"`]moment['"`]/g, severity: Severity.High, message: 'Importing entire moment.js - consider using date-fns or dayjs for tree-shaking' },

  // Memory leaks
  { pattern: /\.addEventListener\s*\([^)]+\)\s*[^)]*$(?![^]*\.removeEventListener)/gm, severity: Severity.Medium, message: 'addEventListener without corresponding removeEventListener - potential memory leak' },
  { pattern: /setInterval\s*\([^)]+\)\s*[^)]*$(?![^]*clearInterval)/gm, severity: Severity.Medium, message: 'setInterval without corresponding clearInterval - potential memory leak' },
  { pattern: /new\s+WebSocket\s*\(/g, severity: Severity.Medium, message: 'WebSocket instance without cleanup - potential memory leak in SPA' },
];

export const performanceChecker: Checker = {
  id: 'sentinel/performance-optimization',
  name: 'Performance Checker',
  description: 'Detects performance issues, bundle problems, and potential memory leaks',
  languages: ['*'],
  check(context: CheckerContext): Finding[] {
    return patternMatcher(context, PERFORMANCE_PATTERNS, 'performance', FindingCategory.Performance);
  },
};
