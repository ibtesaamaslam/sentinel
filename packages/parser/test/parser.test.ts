import { describe, it, expect } from 'vitest';
import { detectLanguage, isBinary, isIgnoredDir, parseFile } from '../src/index.js';

describe('Parser', () => {
  it('should detect TypeScript', () => {
    expect(detectLanguage('file.ts')).toBe('typescript');
    expect(detectLanguage('file.tsx')).toBe('typescriptreact');
  });

  it('should detect JavaScript', () => {
    expect(detectLanguage('file.js')).toBe('javascript');
    expect(detectLanguage('file.jsx')).toBe('javascriptreact');
  });

  it('should return unknown for unrecognized extensions', () => {
    expect(detectLanguage('file.xyz')).toBe('unknown');
  });

  it('should identify binary extensions', () => {
    expect(isBinary('.png')).toBe(true);
    expect(isBinary('.jpg')).toBe(true);
    expect(isBinary('.ts')).toBe(false);
    expect(isBinary('.js')).toBe(false);
  });

  it('should identify ignored directories', () => {
    expect(isIgnoredDir('node_modules')).toBe(true);
    expect(isIgnoredDir('.git')).toBe(true);
    expect(isIgnoredDir('dist')).toBe(true);
    expect(isIgnoredDir('src')).toBe(false);
  });

  it('should parse a file', () => {
    const parsed = parseFile('test.ts', 'hello\nworld');
    expect(parsed.path).toBe('test.ts');
    expect(parsed.language).toBe('typescript');
    expect(parsed.lines).toBe(2);
    expect(parsed.size).toBeGreaterThan(0);
  });
});
