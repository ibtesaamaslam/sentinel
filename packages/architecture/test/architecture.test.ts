import { describe, it, expect } from 'vitest';
import { ArchitectureAnalyzer } from '../src/index.js';
import type { FileInfo } from '@sentinel/core';

function makeFile(path: string, content: string): FileInfo {
  return { path, content, language: 'typescript', lines: content.split('\n').length, size: content.length };
}

describe('ArchitectureAnalyzer', () => {
  it('should detect default exports in barrel files', () => {
    const analyzer = new ArchitectureAnalyzer();
    const findings = analyzer.analyze([makeFile('src/index.ts', 'export default class MyClass {}')]);
    expect(findings.length).toBeGreaterThan(0);
    expect(findings.some(f => f.message.includes('default export'))).toBe(true);
  });

  it('should not flag barrel files without default exports', () => {
    const analyzer = new ArchitectureAnalyzer();
    const findings = analyzer.analyze([makeFile('src/index.ts', 'export { MyClass } from "./my-class"')]);
    const barrelFindings = findings.filter(f => f.message.includes('default export'));
    expect(barrelFindings).toHaveLength(0);
  });

  it('should detect files exceeding 500 lines', () => {
    const analyzer = new ArchitectureAnalyzer();
    const longContent = Array(600).fill('// line').join('\n');
    const findings = analyzer.analyze([makeFile('long.ts', longContent)]);
    expect(findings.some(f => f.message.includes('500 lines'))).toBe(true);
  });

  it('should not flag short files', () => {
    const analyzer = new ArchitectureAnalyzer();
    const findings = analyzer.analyze([makeFile('short.ts', 'const x = 1;')]);
    const lineFindings = findings.filter(f => f.message.includes('500 lines'));
    expect(lineFindings).toHaveLength(0);
  });
});
