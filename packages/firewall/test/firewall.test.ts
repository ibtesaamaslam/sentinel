import { describe, it, expect } from 'vitest';
import { Firewall } from '../src/engine.js';
import type { SentinelConfig } from '@sentinel/core';

const testConfig: SentinelConfig = {
  rootDir: '.',
  scan: { include: ['**/*'], exclude: [], maxFileSize: 1000000, parallel: true, workers: 4, timeout: 30000, severity: [] },
  monitor: { enabled: false, watchPaths: [], debounceMs: 300, gitEvents: true, dependencyChanges: true, secretDetection: true },
  guardian: { enabled: false, detectHallucinations: true, detectOffTask: true, detectDuplicates: true, detectArchitectureDrift: true },
  firewall: { enabled: true, rules: [], blockOnHighRisk: true, requireApproval: true },
  recovery: { enabled: false, autoRestore: false, createPatches: true, maxRetries: 3 },
  plugins: { paths: [], timeout: 10000 },
  reports: { formats: ['terminal'], outputDir: './sentinel-reports', openHtml: false },
};

describe('Firewall', () => {
  it('should create firewall instance', () => {
    const firewall = new Firewall(testConfig);
    expect(firewall).toBeInstanceOf(Firewall);
  });

  it('should allow safe operations', () => {
    const firewall = new Firewall(testConfig);
    const result = firewall.inspectOperation('edit', 'src/app.ts', 'const x = 1;');
    expect(result.allowed).toBe(true);
    expect(result.requiresApproval).toBe(false);
  });

  it('should block high-risk database operations', () => {
    const firewall = new Firewall(testConfig);
    const result = firewall.inspectOperation('edit', 'src/db.ts', 'ALTER TABLE users DROP COLUMN email;');
    expect(result.allowed).toBe(false);
    expect(result.findings.length).toBeGreaterThan(0);
  });

  it('should warn on shell commands', () => {
    const firewall = new Firewall(testConfig);
    const result = firewall.inspectOperation('edit', 'src/deploy.ts', 'child_process.exec("rm -rf /");');
    expect(result.findings.length).toBeGreaterThan(0);
  });

  it('should detect .env file access', () => {
    const firewall = new Firewall(testConfig);
    const result = firewall.inspectOperation('edit', 'src/config.ts', 'import { config } from ".env";');
    expect(result.findings.length).toBeGreaterThan(0);
  });

  it('should handle sensitive file patterns', () => {
    const firewall = new Firewall(testConfig);
    const result = firewall.inspectOperation('edit', '.env', 'SECRET_KEY=abc');
    expect(result.findings.length).toBeGreaterThan(0);
  });
});
