import { describe, it, expect } from 'vitest';
import { DependencyAnalyzer } from '../src/index.js';

describe('DependencyAnalyzer', () => {
  it('should detect unpinned versions', () => {
    const analyzer = new DependencyAnalyzer();
    const findings = analyzer.analyzePackageJson('{"dependencies": {"foo": "*"}}', 'package.json');
    expect(findings.length).toBeGreaterThan(0);
    expect(findings.some(f => f.message.includes('*'))).toBe(true);
  });

  it('should pass valid package.json', () => {
    const analyzer = new DependencyAnalyzer();
    const findings = analyzer.analyzePackageJson('{"dependencies": {"foo": "^1.0.0"}}', 'package.json');
    expect(findings).toHaveLength(0);
  });

  it('should handle invalid JSON', () => {
    const analyzer = new DependencyAnalyzer();
    const findings = analyzer.analyzePackageJson('invalid json', 'package.json');
    expect(findings).toHaveLength(0);
  });
});
