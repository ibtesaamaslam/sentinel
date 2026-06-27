import { describe, it, expect } from 'vitest';
import { PolicyEngine } from '../src/index.js';
import type { SentinelConfig } from '@sentinel/core';

function makeConfig(): SentinelConfig {
  return {
    rootDir: '.',
    scan: { include: ['**/*'], exclude: [], maxFileSize: 1000000, parallel: true, workers: 4, timeout: 30000, severity: [] },
    monitor: { enabled: false, watchPaths: [], debounceMs: 300, gitEvents: true, dependencyChanges: true, secretDetection: true },
    guardian: { enabled: true, detectHallucinations: true, detectOffTask: true, detectDuplicates: true, detectArchitectureDrift: true },
    firewall: { enabled: true, rules: [], blockOnHighRisk: true, requireApproval: true },
    recovery: { enabled: true, autoRestore: false, createPatches: true, maxRetries: 3 },
    plugins: { paths: [], timeout: 10000 },
    reports: { formats: ['terminal'], outputDir: './sentinel-reports', openHtml: false },
  };
}

describe('PolicyEngine', () => {
  it('should create with config', () => {
    const engine = new PolicyEngine(makeConfig());
    expect(engine).toBeDefined();
  });

  it('should detect AWS keys in content', () => {
    const engine = new PolicyEngine(makeConfig());
    const results = engine.evaluate('config.ts', 'const key = "AKIA1234567890123456"');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some(r => r.rule === 'cred/aws')).toBe(true);
  });

  it('should detect database mutations', () => {
    const engine = new PolicyEngine(makeConfig());
    const results = engine.evaluate('db.ts', 'DROP TABLE users;');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some(r => r.rule === 'db/drop-table')).toBe(true);
  });

  it('should not flag safe content', () => {
    const engine = new PolicyEngine(makeConfig());
    const results = engine.evaluate('app.ts', 'const x = 1;');
    expect(results).toHaveLength(0);
  });

  it('should convert evaluations to findings', () => {
    const engine = new PolicyEngine(makeConfig());
    const results = engine.evaluate('config.ts', 'const key = "AKIA1234567890123456"');
    const findings = engine.toFindings(results);
    expect(findings.length).toBe(results.length);
  });
});
