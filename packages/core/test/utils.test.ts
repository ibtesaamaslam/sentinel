import { describe, it, expect } from 'vitest';
import { calculateScores, buildSummary, createScanResult, detectLanguage, severityWeight, severityGte } from '../src/utils.js';
import { Severity, FindingCategory, type Finding } from '../src/types.js';

function makeFinding(overrides: Partial<Finding> = {}): Finding {
  return {
    id: 'test-id',
    file: 'test.ts',
    line: 1,
    column: 1,
    message: 'Test finding',
    severity: Severity.Low,
    category: FindingCategory.Bug,
    rule: 'test/rule',
    source: 'scanner',
    ...overrides,
  };
}

describe('severityWeight', () => {
  it('should return correct weights', () => {
    expect(severityWeight(Severity.Critical)).toBe(100);
    expect(severityWeight(Severity.High)).toBe(75);
    expect(severityWeight(Severity.Medium)).toBe(50);
    expect(severityWeight(Severity.Low)).toBe(25);
    expect(severityWeight(Severity.Info)).toBe(5);
  });
});

describe('severityGte', () => {
  it('should compare severity correctly', () => {
    expect(severityGte(Severity.Critical, Severity.High)).toBe(true);
    expect(severityGte(Severity.High, Severity.Critical)).toBe(false);
    expect(severityGte(Severity.Medium, Severity.Medium)).toBe(true);
  });
});

describe('calculateScores', () => {
  it('should return perfect scores with no findings', () => {
    const scores = calculateScores([]);
    expect(scores.repositoryHealth).toBe(100);
    expect(scores.aiConfidence).toBe(100);
    expect(scores.risk).toBe(0);
  });

  it('should penalize for critical findings', () => {
    const findings = [makeFinding({ severity: Severity.Critical })];
    const scores = calculateScores(findings);
    expect(scores.repositoryHealth).toBeLessThan(100);
    expect(scores.aiConfidence).toBeLessThan(100);
    expect(scores.risk).toBeGreaterThan(0);
  });

  it('should calculate proportional penalties', () => {
    const none = calculateScores([]);
    const oneCritical = calculateScores([makeFinding({ severity: Severity.Critical })]);
    const fiveCritical = calculateScores(Array(5).fill(null).map(() => makeFinding({ severity: Severity.Critical })));
    const tenCritical = calculateScores(Array(10).fill(null).map(() => makeFinding({ severity: Severity.Critical })));
    expect(fiveCritical.repositoryHealth).toBeLessThan(oneCritical.repositoryHealth);
    expect(oneCritical.repositoryHealth).toBeLessThan(none.repositoryHealth);
    // More findings = lower confidence
    expect(fiveCritical.aiConfidence).toBeLessThan(oneCritical.aiConfidence);
    expect(tenCritical.risk).toBeGreaterThanOrEqual(oneCritical.risk);
  });
});

describe('buildSummary', () => {
  it('should count findings by severity', () => {
    const findings = [
      makeFinding({ severity: Severity.Critical }),
      makeFinding({ severity: Severity.High }),
      makeFinding({ severity: Severity.Medium }),
      makeFinding({ severity: Severity.Low }),
      makeFinding({ severity: Severity.Info }),
    ];
    const summary = buildSummary(findings);
    expect(summary.total).toBe(5);
    expect(summary.critical).toBe(1);
    expect(summary.high).toBe(1);
    expect(summary.medium).toBe(1);
    expect(summary.low).toBe(1);
    expect(summary.info).toBe(1);
  });

  it('should categorize findings', () => {
    const findings = [
      makeFinding({ category: FindingCategory.Bug }),
      makeFinding({ category: FindingCategory.Bug }),
      makeFinding({ category: FindingCategory.Secret }),
    ];
    const summary = buildSummary(findings);
    expect(summary.byCategory[FindingCategory.Bug]).toBe(2);
    expect(summary.byCategory[FindingCategory.Secret]).toBe(1);
  });
});

describe('createScanResult', () => {
  it('should create a valid scan result', () => {
    const result = createScanResult('/test', 10, 2, []);
    expect(result.id).toBeDefined();
    expect(result.target).toBe('/test');
    expect(result.filesScanned).toBe(10);
    expect(result.filesSkipped).toBe(2);
    expect(result.findings).toEqual([]);
    expect(result.summary.total).toBe(0);
  });
});

describe('detectLanguage', () => {
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
    expect(detectLanguage('file')).toBe('unknown');
  });
});
