import { utils, type ScanResult, type Finding, Severity, FindingCategory } from '@sentinel/core';
import type { RecoveryOptions, RecoveryPlan, RootCause, Fix } from './types.js';
import type { Patch } from '@sentinel/core';

export class RecoveryEngine {
  private history: RecoveryPlan[] = [];
  private maxRetries: number;
  private autoRestore: boolean;
  private createPatches: boolean;

  constructor(opts: RecoveryOptions = {}) {
    this.maxRetries = opts.maxRetries ?? 3;
    this.autoRestore = opts.autoRestore ?? false;
    this.createPatches = opts.createPatches ?? true;
  }

  analyzeFailures(scanResult: ScanResult, originalContent?: Map<string, string>): RecoveryPlan {
    const rootCauses: RootCause[] = [];
    const fixes: Fix[] = [];
    const patches: Patch[] = [];

    for (const finding of scanResult.findings) {
      const rootCause = this.analyzeRootCause(finding, scanResult);
      rootCauses.push(rootCause);

      if (finding.suggestedFix) {
        const fix = this.generateFix(finding, originalContent);
        fixes.push(fix);
        patches.push(fix.patch);
      }
    }

    const plan: RecoveryPlan = {
      id: utils.generateId(),
      failures: scanResult.findings.map(f => f.message),
      rootCauses,
      fixes,
      patches,
      timestamp: new Date().toISOString(),
    };

    this.history.push(plan);
    return plan;
  }

  /** Get the number of retries allowed for recovery attempts */
  getMaxRetries(): number {
    return this.maxRetries;
  }

  /** Whether automatic restoration is enabled */
  isAutoRestoreEnabled(): boolean {
    return this.autoRestore;
  }

  /** Whether patches should be created during recovery */
  shouldCreatePatches(): boolean {
    return this.createPatches;
  }

  private analyzeRootCause(finding: Finding, _scanResult: ScanResult): RootCause {
    let cause: string;
    let category: RootCause['category'];
    let confidence: number;

    switch (finding.category) {
      case FindingCategory.Bug:
      case FindingCategory.LogicError:
        cause = 'Programming error detected in implementation logic';
        category = 'bug';
        confidence = 0.85;
        break;
      case FindingCategory.SecurityVulnerability:
      case FindingCategory.SqlInjection:
      case FindingCategory.Xss:
      case FindingCategory.CommandInjection:
      case FindingCategory.PathTraversal:
        cause = 'Security vulnerability in code - input not properly sanitized';
        category = 'security';
        confidence = 0.9;
        break;
      case FindingCategory.RegressionRisk:
        cause = 'Code change introduces potential regression';
        category = 'regression';
        confidence = 0.7;
        break;
      case FindingCategory.Secret:
      case FindingCategory.ApiKey:
        cause = 'Hardcoded credential or secret exposed in source code';
        category = 'config';
        confidence = 0.95;
        break;
      case FindingCategory.UnsafeCode:
      case FindingCategory.BadPattern:
        cause = 'Unsafe or bad programming pattern detected';
        category = 'bug';
        confidence = 0.8;
        break;
      default:
        cause = `Issue found: ${finding.message}`;
        category = 'unknown';
        confidence = 0.5;
    }

    return { finding, cause, category, confidence };
  }

  private generateFix(finding: Finding, originalContent?: Map<string, string>): Fix {
    const id = utils.generateId();
    const originalContent_ = originalContent?.get(finding.file) || '';

    const patch: Patch = {
      id: utils.generateId(),
      description: finding.suggestedFix || 'Suggested fix',
      diff: [],
      originalHash: '',
      newHash: '',
    };

    return {
      id,
      description: finding.suggestedFix || `Fix for: ${finding.message}`,
      file: finding.file,
      originalContent: originalContent_,
      fixedContent: '',
      patch,
      confidence: finding.severity === Severity.Critical ? 0.6 : finding.severity === Severity.High ? 0.75 : 0.9,
    };
  }

  getHistory(): RecoveryPlan[] {
    return [...this.history];
  }

  clearHistory(): void {
    this.history = [];
  }
}
