import { describe, it, expect } from 'vitest';
import { AnalyticsEngine } from '../src/index.js';
import { createScanResult, Severity, FindingCategory } from '@sentinel/core';

describe('AnalyticsEngine', () => {
  it('should start with zero scans', () => {
    const engine = new AnalyticsEngine();
    expect(engine.getScanCount()).toBe(0);
  });

  it('should record scan results', () => {
    const engine = new AnalyticsEngine();
    const result = createScanResult('/test', 10, 0, []);
    engine.recordScan(result);
    expect(engine.getScanCount()).toBe(1);
  });

  it('should generate reports from multiple scans', () => {
    const engine = new AnalyticsEngine();
    engine.recordScan(createScanResult('/test1', 10, 0, []));
    engine.recordScan(createScanResult('/test2', 20, 0, []));
    const report = engine.generateReport();
    expect(report.totalScans).toBe(2);
    expect(report.averageHealthScore).toBeGreaterThan(0);
  });
});
