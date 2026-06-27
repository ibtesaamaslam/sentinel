import { describe, it, expect } from 'vitest';
import { ReportPipeline } from '../src/index.js';
import { createScanResult } from '@sentinel/core';

describe('ReportPipeline', () => {
  it('should generate reports in multiple formats', () => {
    const pipeline = new ReportPipeline();
    const result = createScanResult('/test', 10, 0, []);
    const outputs = pipeline.generate(result, ['json', 'terminal']);
    expect(outputs).toHaveLength(2);
    expect(outputs[0].format).toBe('json');
    expect(outputs[1].format).toBe('terminal');
    expect(outputs[0].content).toBeTruthy();
    expect(outputs[1].content).toBeTruthy();
  });

  it('should generate empty reports for scan with no findings', () => {
    const pipeline = new ReportPipeline();
    const result = createScanResult('/test', 10, 0, []);
    const outputs = pipeline.generate(result, ['json']);
    expect(outputs[0].content).toContain('"findings": []');
  });
});
