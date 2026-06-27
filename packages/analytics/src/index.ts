import type { ScanResult } from '@sentinel/core';
import { Logger } from '@sentinel/logger';

export interface AnalyticsReport {
  totalScans: number;
  totalFindings: number;
  findingsBySeverity: Record<string, number>;
  findingsByCategory: Record<string, number>;
  findingsByFile: Record<string, number>;
  topIssues: { message: string; count: number }[];
  averageHealthScore: number;
  averageRiskScore: number;
}

export class AnalyticsEngine {
  private scanHistory: ScanResult[] = [];
  private logger: Logger;

  constructor(logger?: Logger) {
    this.logger = logger ?? new Logger({ prefix: 'analytics' });
  }

  recordScan(result: ScanResult): void {
    this.scanHistory.push(result);
    this.logger.debug(`Recorded scan: ${result.filesScanned} files, ${result.findings.length} findings`);
  }

  generateReport(): AnalyticsReport {
    const allFindings = this.scanHistory.flatMap(r => r.findings);
    const bySeverity: Record<string, number> = {};
    const byCategory: Record<string, number> = {};
    const byFile: Record<string, number> = {};
    const issueCounts = new Map<string, number>();

    for (const f of allFindings) {
      bySeverity[f.severity] = (bySeverity[f.severity] ?? 0) + 1;
      byCategory[f.category] = (byCategory[f.category] ?? 0) + 1;
      byFile[f.file] = (byFile[f.file] ?? 0) + 1;

      const key = f.message.slice(0, 80);
      issueCounts.set(key, (issueCounts.get(key) ?? 0) + 1);
    }

    const topIssues = Array.from(issueCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([message, count]) => ({ message, count }));

    const healthScores = this.scanHistory.map(r => r.summary.scores.repositoryHealth);
    const riskScores = this.scanHistory.map(r => r.summary.scores.risk);

    return {
      totalScans: this.scanHistory.length,
      totalFindings: allFindings.length,
      findingsBySeverity: bySeverity,
      findingsByCategory: byCategory,
      findingsByFile: byFile,
      topIssues,
      averageHealthScore: healthScores.reduce((a, b) => a + b, 0) / Math.max(1, healthScores.length),
      averageRiskScore: riskScores.reduce((a, b) => a + b, 0) / Math.max(1, riskScores.length),
    };
  }

  clearHistory(): void {
    this.scanHistory = [];
  }

  getScanCount(): number {
    return this.scanHistory.length;
  }
}
