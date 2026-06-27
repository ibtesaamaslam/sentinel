import type { Finding, ScanResult, Scores, SentinelConfig } from '@sentinel/core';
import { Severity, FindingCategory } from '@sentinel/core';

export function makeFinding(overrides: Partial<Finding> = {}): Finding {
  return {
    id: 'test-finding-id',
    file: 'test.ts',
    line: 1,
    column: 1,
    message: 'Test finding',
    severity: Severity.Low,
    category: FindingCategory.Bug,
    rule: 'test/rule',
    source: 'scanner',
    ...overrides,
  };
}

export function makeCriticalFinding(overrides: Partial<Finding> = {}): Finding {
  return makeFinding({ severity: Severity.Critical, ...overrides });
}

export function makeScanResult(overrides: Partial<ScanResult> = {}): ScanResult {
  const findings = overrides.findings ?? [];
  const scores: Scores = {
    repositoryHealth: 100 - findings.length * 10,
    aiConfidence: 100 - findings.length * 10,
    risk: Math.min(100, findings.length * 20),
    ...(overrides.summary?.scores ?? {}),
  };

  const byCategory: Record<string, number> = {};
  for (const f of findings) {
    byCategory[f.category] = (byCategory[f.category] || 0) + 1;
  }

  return {
    id: 'test-scan-id',
    timestamp: new Date().toISOString(),
    target: '/test',
    filesScanned: 10,
    filesSkipped: 2,
    findings,
    summary: {
      total: findings.length,
      critical: findings.filter(f => f.severity === Severity.Critical).length,
      high: findings.filter(f => f.severity === Severity.High).length,
      medium: findings.filter(f => f.severity === Severity.Medium).length,
      low: findings.filter(f => f.severity === Severity.Low).length,
      info: findings.filter(f => f.severity === Severity.Info).length,
      byCategory,
      scores,
    },
    metadata: { duration: 100 },
    ...overrides,
  };
}

export function makeConfig(overrides: Partial<SentinelConfig> = {}): SentinelConfig {
  return {
    rootDir: '.',
    scan: { include: ['**/*'], exclude: ['node_modules', '.git'], maxFileSize: 1000000, parallel: true, workers: 4, timeout: 30000, severity: [] },
    monitor: { enabled: false, watchPaths: [], debounceMs: 300, gitEvents: true, dependencyChanges: true, secretDetection: true },
    guardian: { enabled: true, detectHallucinations: true, detectOffTask: true, detectDuplicates: true, detectArchitectureDrift: true },
    firewall: { enabled: true, rules: [], blockOnHighRisk: true, requireApproval: true },
    recovery: { enabled: true, autoRestore: false, createPatches: true, maxRetries: 3 },
    plugins: { paths: [], timeout: 10000 },
    reports: { formats: ['terminal'], outputDir: './sentinel-reports', openHtml: false },
    ...overrides,
  };
}
