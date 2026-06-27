import { describe, it, expect } from 'vitest';
import { SecurityAnalyzer } from '../src/index.js';
import type { ParsedFile } from '@sentinel/parser';

function makeFile(content: string): ParsedFile {
  return { path: 'test.ts', content, language: 'typescript', lines: content.split('\n').length, size: content.length, extension: '.ts' };
}

describe('SecurityAnalyzer', () => {
  it('should detect eval()', () => {
    const analyzer = new SecurityAnalyzer();
    const findings = analyzer.analyzeFile(makeFile('eval("dangerous")'));
    expect(findings.length).toBeGreaterThan(0);
    expect(findings.some(f => f.message.includes('eval'))).toBe(true);
  });

  it('should detect XSS via innerHTML', () => {
    const analyzer = new SecurityAnalyzer();
    const findings = analyzer.analyzeFile(makeFile('element.innerHTML = "<div>" + userInput + "</div>"'));
    expect(findings.length).toBeGreaterThan(0);
    expect(findings.some(f => f.message.includes('XSS'))).toBe(true);
  });

  it('should detect prototype pollution', () => {
    const analyzer = new SecurityAnalyzer();
    const findings = analyzer.analyzeFile(makeFile('obj.__proto__ = malicious'));
    expect(findings.length).toBeGreaterThan(0);
    expect(findings.some(f => f.message.includes('prototype'))).toBe(true);
  });

  it('should not flag safe code', () => {
    const analyzer = new SecurityAnalyzer();
    const findings = analyzer.analyzeFile(makeFile('const x = 1; console.log(x);'));
    expect(findings).toHaveLength(0);
  });
});
