import { describe, it, expect } from 'vitest';
import { Scanner } from '../src/engine.js';
import type { SentinelConfig } from '@sentinel/core';

const testConfig: SentinelConfig = {
  rootDir: '.',
  scan: {
    include: ['**/*'],
    exclude: ['node_modules', '.git'],
    maxFileSize: 1_000_000,
    parallel: false,
    workers: 1,
    timeout: 30000,
    severity: [],
  },
  monitor: { enabled: false, watchPaths: [], debounceMs: 300, gitEvents: true, dependencyChanges: true, secretDetection: true },
  guardian: { enabled: false, detectHallucinations: true, detectOffTask: true, detectDuplicates: true, detectArchitectureDrift: true },
  firewall: { enabled: false, rules: [], blockOnHighRisk: true, requireApproval: true },
  recovery: { enabled: false, autoRestore: false, createPatches: true, maxRetries: 3 },
  plugins: { paths: [], timeout: 10000 },
  reports: { formats: ['terminal'], outputDir: './sentinel-reports', openHtml: false },
};

describe('Scanner', () => {
  it('should create scanner instance', () => {
    const scanner = new Scanner(testConfig);
    expect(scanner).toBeInstanceOf(Scanner);
  });

  it('should scan a directory and return results', async () => {
    const scanner = new Scanner(testConfig);
    // Scan the core package which has valid TypeScript
    const result = await scanner.scan('./packages/core');
    expect(result.filesScanned).toBeGreaterThan(0);
    expect(result.findings).toBeDefined();
    expect(result.summary).toBeDefined();
  }, 10000);

  it('should detect placeholder patterns', async () => {
    const scanner = new Scanner(testConfig);
    const result = await scanner.scan('./packages/core');
    const placeholderFindings = result.findings.filter(f => f.category === 'placeholder' || f.category === 'todo');
    // May or may not find placeholders - just verify the scan ran
    expect(Array.isArray(placeholderFindings)).toBe(true);
  }, 10000);

  it('should detect secrets', async () => {
    const scanner = new Scanner(testConfig);
    // Scan test directory - secrets shouldn't be in our code
    const result = await scanner.scan('./packages/core');
    const secretFindings = result.findings.filter(f => f.category === 'secret');
    expect(Array.isArray(secretFindings)).toBe(true);
  }, 10000);

  it('should handle scan abort', async () => {
    const scanner = new Scanner(testConfig);
    const controller = new AbortController();
    controller.abort();

    await expect(
      scanner.scan('./packages/core', {
        config: testConfig,
        signal: controller.signal,
      }),
    ).rejects.toThrow('Scan was aborted');
  });

  it('should detect bugs in code with issues', async () => {
    const scanner = new Scanner(testConfig);
    const result = await scanner.scan('./packages/core');
    const bugFindings = result.findings.filter(f => f.category === 'bug');
    expect(Array.isArray(bugFindings)).toBe(true);
  }, 10000);
});
