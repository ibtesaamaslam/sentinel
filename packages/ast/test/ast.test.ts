import { describe, it, expect } from 'vitest';
import { ASTAnalyzer } from '../src/index.js';
import type { ParsedFile } from '@sentinel/parser';

function makeFile(content: string): ParsedFile {
  return { path: 'test.ts', content, language: 'typescript', lines: content.split('\n').length, size: content.length, extension: '.ts' };
}

describe('ASTAnalyzer', () => {
  it('should extract functions', () => {
    const analyzer = new ASTAnalyzer();
    const result = analyzer.analyzeFile(makeFile('function hello() { return 1; }'));
    expect(result.functions).toHaveLength(1);
    expect(result.functions[0].name).toBe('hello');
  });

  it('should extract classes', () => {
    const analyzer = new ASTAnalyzer();
    const result = analyzer.analyzeFile(makeFile('class MyClass { method() {} }'));
    expect(result.classes).toHaveLength(1);
    expect(result.classes[0].name).toBe('MyClass');
  });

  it('should extract imports', () => {
    const analyzer = new ASTAnalyzer();
    const result = analyzer.analyzeFile(makeFile('import { foo } from "bar";'));
    expect(result.imports).toHaveLength(1);
    expect(result.imports[0].source).toBe('bar');
  });

  it('should extract exports', () => {
    const analyzer = new ASTAnalyzer();
    const result = analyzer.analyzeFile(makeFile('export function test() {}'));
    expect(result.exports).toHaveLength(1);
    expect(result.exports[0].name).toBe('test');
  });
});
