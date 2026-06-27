import { describe, it, expect } from 'vitest';
import { renderReport } from '../src/index.js';
import { createScanResult, Severity, FindingCategory } from '@sentinel/core';
import type { ScanResult } from '@sentinel/core';

function createTestResult(overrides: Partial<ScanResult> = {}): ScanResult {
  return {
    ...createScanResult('/test', 10, 2, [
      {
        id: 'finding-1',
        file: 'src/test.ts',
        line: 10,
        column: 5,
        message: 'Test finding',
        severity: Severity.High,
        category: FindingCategory.Bug,
        rule: 'test/rule',
        source: 'scanner',
        snippet: 'const x = 1;',
        suggestedFix: 'Do something else',
      },
    ]),
    ...overrides,
  };
}

describe('renderReport', () => {
  it('should render JSON report', () => {
    const result = createTestResult();
    const report = renderReport(result, 'json');
    expect(report).toBeTruthy();
    const parsed = JSON.parse(report);
    expect(parsed.target).toBe('/test');
    expect(parsed.findings).toHaveLength(1);
    expect(parsed.findings[0].message).toBe('Test finding');
  });

  it('should render terminal report', () => {
    const result = createTestResult();
    const report = renderReport(result, 'terminal');
    expect(report).toContain('Sentinel');
    expect(report).toContain('Test finding');
    expect(report).toContain('[HIGH]');
  });

  it('should render HTML report', () => {
    const result = createTestResult();
    const report = renderReport(result, 'html');
    expect(report).toContain('<!DOCTYPE html>');
    expect(report).toContain('Sentinel');
    expect(report).toContain('Test finding');
  });

  it('should render SARIF report', () => {
    const result = createTestResult();
    const report = renderReport(result, 'sarif');
    expect(report).toContain('sarif-2.1.0');
    const parsed = JSON.parse(report);
    expect(parsed.version).toBe('2.1.0');
    expect(parsed.runs[0].results).toHaveLength(1);
  });

  it('should handle empty scan results', () => {
    const result = createTestResult({ findings: [] });
    const html = renderReport(result, 'html');
    expect(html).toContain('No findings detected');
  });
});
