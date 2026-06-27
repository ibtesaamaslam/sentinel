import { describe, it, expect } from 'vitest';
import { PerformanceAnalyzer } from '../src/index.js';
import type { ParsedFile } from '@sentinel/parser';

function makeFile(content: string): ParsedFile {
  return { path: 'test.ts', content, language: 'typescript', lines: content.split('\n').length, size: content.length, extension: '.ts' };
}

describe('PerformanceAnalyzer', () => {
  it('should detect JSON.parse(JSON.stringify())', () => {
    const analyzer = new PerformanceAnalyzer();
    const findings = analyzer.analyzeFile(makeFile('const clone = JSON.parse(JSON.stringify(obj));'));
    expect(findings.length).toBeGreaterThan(0);
  });

  it('should detect filter().map() chain', () => {
    const analyzer = new PerformanceAnalyzer();
    const findings = analyzer.analyzeFile(makeFile('items.filter(x => x.active).map(x => x.name)'));
    expect(findings.length).toBeGreaterThan(0);
  });

  it('should not flag safe code', () => {
    const analyzer = new PerformanceAnalyzer();
    const findings = analyzer.analyzeFile(makeFile('const x = items.map(i => i.name);'));
    expect(findings).toHaveLength(0);
  });
});
