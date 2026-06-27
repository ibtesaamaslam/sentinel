import { randomUUID } from 'node:crypto';
import { Severity, type Finding, type ScanResult, type ScanSummary, type Scores } from './types.js';

// ─── ID Generation ───────────────────────────────────────────────
export function generateId(): string {
  return randomUUID();
}

// ─── Timestamp ───────────────────────────────────────────────────
export function now(): string {
  return new Date().toISOString();
}

// ─── Severity Weight ─────────────────────────────────────────────
export function severityWeight(severity: Severity): number {
  switch (severity) {
    case Severity.Critical: return 100;
    case Severity.High: return 75;
    case Severity.Medium: return 50;
    case Severity.Low: return 25;
    case Severity.Info: return 5;
  }
}

// ─── Score Calculation ───────────────────────────────────────────
export function calculateScores(findings: Finding[]): Scores {
  const total = findings.length;
  if (total === 0) {
    return { repositoryHealth: 100, aiConfidence: 100, risk: 0 };
  }

  const criticalCount = findings.filter(f => f.severity === Severity.Critical).length;
  const highCount = findings.filter(f => f.severity === Severity.High).length;
  const mediumCount = findings.filter(f => f.severity === Severity.Medium).length;
  const lowCount = findings.filter(f => f.severity === Severity.Low).length;

  // Repository Health: 100 minus weighted penalties
  const healthPenalties =
    criticalCount * 15 +
    highCount * 8 +
    mediumCount * 4 +
    lowCount * 2;
  const repositoryHealth = Math.max(0, Math.min(100, 100 - healthPenalties));

  // AI Confidence: starts at 100, each finding reduces it
  const confidencePenalty =
    criticalCount * 20 +
    highCount * 10 +
    mediumCount * 5 +
    lowCount * 2;
  const aiConfidence = Math.max(0, Math.min(100, 100 - confidencePenalty));

  // Risk Score: 0 to 100, higher is worse (cumulative - more findings = higher risk)
  const risk = Math.min(100, Math.round(
    criticalCount * 20 +
    highCount * 10 +
    mediumCount * 5 +
    lowCount * 2
  ));

  return { repositoryHealth, aiConfidence, risk };
}

// ─── Build Summary ────────────────────────────────────────────────
export function buildSummary(findings: Finding[]): ScanSummary {
  const byCategory: Record<string, number> = {};
  for (const f of findings) {
    byCategory[f.category] = (byCategory[f.category] || 0) + 1;
  }

  return {
    total: findings.length,
    critical: findings.filter(f => f.severity === Severity.Critical).length,
    high: findings.filter(f => f.severity === Severity.High).length,
    medium: findings.filter(f => f.severity === Severity.Medium).length,
    low: findings.filter(f => f.severity === Severity.Low).length,
    info: findings.filter(f => f.severity === Severity.Info).length,
    byCategory,
    scores: calculateScores(findings),
  };
}

// ─── Create Scan Result ──────────────────────────────────────────
export function createScanResult(
  target: string,
  filesScanned: number,
  filesSkipped: number,
  findings: Finding[],
  metadata?: Record<string, unknown>,
): ScanResult {
  return {
    id: generateId(),
    timestamp: now(),
    target,
    filesScanned,
    filesSkipped,
    findings,
    summary: buildSummary(findings),
    metadata,
  };
}

// ─── File Language Detection ─────────────────────────────────────
export function detectLanguage(filePath: string): string {
  const ext = filePath.split('.').pop()?.toLowerCase() || '';
  const langMap: Record<string, string> = {
    ts: 'typescript',
    tsx: 'typescriptreact',
    js: 'javascript',
    jsx: 'javascriptreact',
    py: 'python',
    rb: 'ruby',
    go: 'go',
    rs: 'rust',
    java: 'java',
    kt: 'kotlin',
    swift: 'swift',
    php: 'php',
    cs: 'csharp',
    cpp: 'cpp',
    c: 'c',
    h: 'c',
    hpp: 'cpp',
    css: 'css',
    scss: 'scss',
    html: 'html',
    json: 'json',
    yaml: 'yaml',
    yml: 'yaml',
    md: 'markdown',
    sql: 'sql',
    sh: 'shell',
    bash: 'shell',
    dockerfile: 'dockerfile',
    tf: 'terraform',
    vue: 'vue',
    svelte: 'svelte',
  };
  return langMap[ext] || 'unknown';
}

// ─── Severity Comparison ─────────────────────────────────────────
export function severityGte(a: Severity, b: Severity): boolean {
  return severityWeight(a) >= severityWeight(b);
}
