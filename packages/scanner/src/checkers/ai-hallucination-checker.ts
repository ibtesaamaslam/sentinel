import { Severity, FindingCategory, type Finding } from '@sentinel/core';
import type { Checker, CheckerContext } from '../types.js';
import { patternMatcher } from './pattern-matcher.js';

const HALLUCINATION_PATTERNS = [
  // Fake/stub imports that don't exist
  { pattern: /from\s+['"`](?:\.\.\/)+[^'"]*(?:placeholder|stub|mock|fake|dummy)[^'"]*['"`]/gi, severity: Severity.High, message: 'Import from a path containing "placeholder", "stub", "mock", "fake", or "dummy" - possible AI hallucination' },

  // AI comment markers
  { pattern: /\/\/\s*AI[- ]?generated/gi, severity: Severity.Info, message: 'AI-generated code marker found' },
  { pattern: /\/\/\s*(?:This\s+)?code\s+(?:was\s+)?generated\s+by/gi, severity: Severity.Info, message: 'AI-generated code attribution found' },
  { pattern: /\/\/\s*(?:Claude|ChatGPT|Copilot|Codex|Gemini)\s+(?:suggested|generated|wrote|produced)/gi, severity: Severity.Info, message: 'AI assistant attribution found in code' },

  // Implausible library references
  { pattern: /from\s+['"`]@[a-z]+\/[a-z]+[-a-z]*['"`]\s*;?\s*$/gm, severity: Severity.Info, message: 'Third-party package import - verify the package exists on npm' },

  // Hallucinated features
  { pattern: /\/\/\s*TODO:\s*(?:Implement|Add|Create|Build)\s+\w+/gi, severity: Severity.Medium, message: 'TODO with feature request that may have been hallucinated' },

  // API endpoints that look made up
  { pattern: /\/\/\s*(?:GET|POST|PUT|DELETE|PATCH)\s+\/[a-z/]+\s*$/gim, severity: Severity.Low, message: 'API endpoint reference in comment - verify it matches actual API docs' },
];

export const aiHallucinationChecker: Checker = {
  id: 'sentinel/ai-hallucination-detection',
  name: 'AI Hallucination Detection',
  description: 'Detects potential AI hallucinations: fake APIs, invented libraries, and implausible code patterns',
  languages: ['*'],
  check(context: CheckerContext): Finding[] {
    return patternMatcher(context, HALLUCINATION_PATTERNS, 'ai-hallucination', FindingCategory.Hallucination);
  },
};
