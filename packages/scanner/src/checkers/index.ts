import type { Checker } from '../types.js';
import { bugChecker } from './bug-checker.js';
import { placeholderChecker } from './placeholder-checker.js';
import { secretChecker } from './secret-checker.js';
import { securityChecker } from './security-checker.js';
import { qualityChecker } from './quality-checker.js';
import { performanceChecker } from './performance-checker.js';
import { aiHallucinationChecker } from './ai-hallucination-checker.js';

export * from './bug-checker.js';
export * from './placeholder-checker.js';
export * from './secret-checker.js';
export * from './security-checker.js';
export * from './quality-checker.js';
export * from './performance-checker.js';
export * from './ai-hallucination-checker.js';

export const builtInCheckers: Checker[] = [
  bugChecker,
  placeholderChecker,
  secretChecker,
  securityChecker,
  qualityChecker,
  performanceChecker,
  aiHallucinationChecker,
];
