import { describe, it, expect } from 'vitest';
import { Guardian } from '../src/engine.js';
import type { SentinelConfig } from '@sentinel/core';
import type { GuardianObservation } from '../src/types.js';

const testConfig: SentinelConfig = {
  rootDir: '.',
  scan: { include: ['**/*'], exclude: [], maxFileSize: 1000000, parallel: true, workers: 4, timeout: 30000, severity: [] },
  monitor: { enabled: false, watchPaths: [], debounceMs: 300, gitEvents: true, dependencyChanges: true, secretDetection: true },
  guardian: { enabled: true, detectHallucinations: true, detectOffTask: true, detectDuplicates: true, detectArchitectureDrift: true },
  firewall: { enabled: false, rules: [], blockOnHighRisk: true, requireApproval: true },
  recovery: { enabled: false, autoRestore: false, createPatches: true, maxRetries: 3 },
  plugins: { paths: [], timeout: 10000 },
  reports: { formats: ['terminal'], outputDir: './sentinel-reports', openHtml: false },
};

function makeObservation(overrides: Partial<GuardianObservation> = {}): GuardianObservation {
  return {
    sessionId: 'test-session',
    file: 'src/app.ts',
    action: 'edit',
    timestamp: new Date().toISOString(),
    ...overrides,
  };
}

describe('Guardian', () => {
  it('should create an instance', () => {
    const guardian = new Guardian(testConfig, {});
    expect(guardian).toBeInstanceOf(Guardian);
  });

  it('should approve clean observations', () => {
    const guardian = new Guardian(testConfig, {});
    const verdict = guardian.observe(makeObservation({ action: 'edit' }));
    expect(verdict.status).toBe('approved');
    expect(verdict.findings).toHaveLength(0);
  });

  it('should flag off-task edits', () => {
    const guardian = new Guardian(testConfig, {});
    const verdict = guardian.observe(makeObservation({
      action: 'refactor',
      file: 'package-lock.json',
    }));
    expect(verdict.status).toBe('flagged');
    expect(verdict.findings.length).toBeGreaterThan(0);
    expect(verdict.findings[0].rule).toContain('off-task');
  });

  it('should detect hallucinated APIs in diffs', () => {
    const guardian = new Guardian(testConfig, {});
    const observation = makeObservation({
      action: 'edit',
      diff: [{
        file: 'src/app.ts',
        additions: 1,
        deletions: 0,
        hunks: [{
          oldStart: 1, oldLines: 0,
          newStart: 1, newLines: 1,
          content: 'Object.observe(data, callback);',
        }],
      }],
    });
    const verdict = guardian.observe(observation);
    expect(verdict.findings.length).toBeGreaterThan(0);
    const halluFinding = verdict.findings.find(f => f.rule === 'guardian/hallucination-detection');
    expect(halluFinding).toBeDefined();
  });

  it('should reject critical findings', () => {
    const guardian = new Guardian({
      ...testConfig,
      guardian: { ...testConfig.guardian, detectOffTask: true },
    }, {});
    const observation = makeObservation({
      action: 'refactor',
      file: 'src/.env',
    });
    // .env files should trigger off-task detection
    const verdict = guardian.observe(observation);
    expect(verdict.status).toBe('flagged');
  });

  it('should track session observations', () => {
    const guardian = new Guardian(testConfig, {});
    guardian.observe(makeObservation({ sessionId: 'session-1' }));
    guardian.observe(makeObservation({ sessionId: 'session-1' }));
    guardian.observe(makeObservation({ sessionId: 'session-2' }));
    expect(guardian.getSessionObservations('session-1')).toHaveLength(2);
    expect(guardian.getSessionObservations('session-2')).toHaveLength(1);
    expect(guardian.getSessionObservations('session-3')).toHaveLength(0);
  });

  it('should clear session observations', () => {
    const guardian = new Guardian(testConfig, {});
    guardian.observe(makeObservation({ sessionId: 'session-1' }));
    guardian.clearSession('session-1');
    expect(guardian.getSessionObservations('session-1')).toHaveLength(0);
  });

  it('should detect duplicate functions across files', () => {
    const guardian = new Guardian(testConfig, {});
    const files = new Map<string, string>([
      ['src/auth.ts', 'export function validate() { return true; }'],
      ['src/utils.ts', 'function validate() { return false; }'],
    ]);
    const findings = guardian.detectDuplicates(files);
    expect(findings.length).toBeGreaterThan(0);
    expect(findings[0].rule).toContain('duplicate');
  });
});
