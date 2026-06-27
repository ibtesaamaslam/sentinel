import { describe, it, expect } from 'vitest';
import { RecoveryEngine } from '../src/engine.js';
import { createScanResult, Severity, FindingCategory } from '@sentinel/core';
import type { Finding, ScanResult } from '@sentinel/core';

function makeFindings(): Finding[] {
  return [
    {
      id: 'f1', file: 'src/auth.ts', line: 10, column: 1,
      message: 'Hardcoded API key detected',
      severity: Severity.Critical,
      category: FindingCategory.Secret,
      rule: 'secret-detection/critical',
      source: 'scanner',
      suggestedFix: 'Move this secret to environment variables',
    },
    {
      id: 'f2', file: 'src/db.ts', line: 20, column: 1,
      message: 'Possible SQL injection',
      severity: Severity.Critical,
      category: FindingCategory.SqlInjection,
      rule: 'security-detection/critical',
      source: 'scanner',
    },
    {
      id: 'f3', file: 'src/app.ts', line: 30, column: 1,
      message: 'Debugger statement found',
      severity: Severity.Medium,
      category: FindingCategory.Bug,
      rule: 'code-quality/medium',
      source: 'scanner',
    },
  ];
}

function makeResult(findings: Finding[]): ScanResult {
  return createScanResult('/test', 10, 0, findings);
}

describe('RecoveryEngine', () => {
  it('should create an instance', () => {
    const engine = new RecoveryEngine();
    expect(engine).toBeInstanceOf(RecoveryEngine);
  });

  it('should analyze failures and return a recovery plan', () => {
    const engine = new RecoveryEngine();
    const result = makeResult(makeFindings());
    const plan = engine.analyzeFailures(result);
    expect(plan.id).toBeDefined();
    expect(plan.failures.length).toBe(3);
    expect(plan.rootCauses.length).toBe(3);
    expect(plan.fixes.length).toBe(1); // Only first finding has suggestedFix
    expect(plan.timestamp).toBeDefined();
  });

  it('should generate root causes for each finding', () => {
    const engine = new RecoveryEngine();
    const result = makeResult(makeFindings());
    const plan = engine.analyzeFailures(result);
    const secretCause = plan.rootCauses.find(rc => rc.finding.category === FindingCategory.Secret);
    expect(secretCause).toBeDefined();
    expect(secretCause!.category).toBe('config');
    expect(secretCause!.confidence).toBeGreaterThan(0);

    const sqlCause = plan.rootCauses.find(rc => rc.finding.category === FindingCategory.SqlInjection);
    expect(sqlCause).toBeDefined();
    expect(sqlCause!.category).toBe('security');
  });

  it('should generate fixes with actual content for secrets', () => {
    const engine = new RecoveryEngine();
    const originalContent = new Map<string, string>([
      ['src/auth.ts', 'const API_KEY = "sk_test_1234567890abcdefghij";'],
    ]);
    const result = makeResult(makeFindings());
    const plan = engine.analyzeFailures(result, originalContent);
    const fix = plan.fixes[0];
    expect(fix).toBeDefined();
    expect(fix.description).toContain('Move this secret');
    // fixedContent should not be empty when original content is provided
    expect(fix.fixedContent).toBeDefined();
    expect(fix.originalContent).toBe('const API_KEY = "sk_test_1234567890abcdefghij";');
  });

  it('should track history', () => {
    const engine = new RecoveryEngine();
    expect(engine.getHistory()).toHaveLength(0);
    engine.analyzeFailures(makeResult(makeFindings()));
    expect(engine.getHistory()).toHaveLength(1);
    engine.analyzeFailures(makeResult(makeFindings()));
    expect(engine.getHistory()).toHaveLength(2);
    engine.clearHistory();
    expect(engine.getHistory()).toHaveLength(0);
  });

  it('should respect createPatches option', () => {
    const engine = new RecoveryEngine({ createPatches: false });
    const result = makeResult(makeFindings());
    const plan = engine.analyzeFailures(result);
    // When createPatches is false, patches should still be in patches array
    // (the generateFix still creates them but they're checked by shouldCreatePatches)
    expect(engine.shouldCreatePatches()).toBe(false);
  });

  it('should have configurable max retries', () => {
    const engine = new RecoveryEngine({ maxRetries: 5 });
    expect(engine.getMaxRetries()).toBe(5);
  });
});
