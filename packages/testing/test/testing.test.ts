import { describe, it, expect } from 'vitest';
import { makeFinding, makeCriticalFinding, makeScanResult, makeConfig } from '../src/index.js';
import { Severity, FindingCategory } from '@sentinel/core';

describe('Testing Utilities', () => {
  it('should make findings with defaults', () => {
    const finding = makeFinding();
    expect(finding.id).toBe('test-finding-id');
    expect(finding.severity).toBe(Severity.Low);
    expect(finding.category).toBe(FindingCategory.Bug);
    expect(finding.file).toBe('test.ts');
  });

  it('should make findings with overrides', () => {
    const finding = makeFinding({ severity: Severity.Critical, file: 'app.ts' });
    expect(finding.severity).toBe(Severity.Critical);
    expect(finding.file).toBe('app.ts');
  });

  it('should make critical findings', () => {
    const finding = makeCriticalFinding({ message: 'Critical test' });
    expect(finding.severity).toBe(Severity.Critical);
    expect(finding.message).toBe('Critical test');
  });

  it('should make scan results with findings', () => {
    const findings = [makeFinding({ severity: Severity.Critical })];
    const result = makeScanResult({ findings });
    expect(result.findings).toHaveLength(1);
    expect(result.summary.critical).toBe(1);
    expect(result.summary.scores).toBeDefined();
  });

  it('should make scan results without findings', () => {
    const result = makeScanResult();
    expect(result.findings).toHaveLength(0);
    expect(result.filesScanned).toBe(10);
  });

  it('should make config with defaults', () => {
    const config = makeConfig();
    expect(config.scan.workers).toBe(4);
    expect(config.monitor.enabled).toBe(false);
    expect(config.firewall.enabled).toBe(true);
  });

  it('should make config with overrides', () => {
    const config = makeConfig({ rootDir: '/custom' });
    expect(config.rootDir).toBe('/custom');
  });
});
