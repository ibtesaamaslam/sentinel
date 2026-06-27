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

        if (this.createPatches) {
          patches.push(fix.patch);
        }
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
    const findingLine = finding.line;

    // Generate suggested fix content based on the finding type
    let fixedContent = originalContent_;
    if (this.createPatches && originalContent_ && finding.suggestedFix) {
      if (finding.category === FindingCategory.Secret || finding.category === FindingCategory.ApiKey) {
        // For secrets, add a comment and .env recommendation
        fixedContent = originalContent_.replace(
          /(?:api[_-]?key|apikey|secret|password|token)\s*[:=]\s*['\"][^'\"]+['\"]/gi,
          (match) => {
            const key = match.split(/[:=]/)[0].trim();
            return `${key}: process.env.${key.toUpperCase().replace(/[^a-zA-Z0-9_]/g, '_') || 'SECRET'}`;
          },
        );
      } else if (finding.category === FindingCategory.SqlInjection) {
        // For SQL injection, suggest parameterized query
        fixedContent = originalContent_.replace(
          /\.query\s*\(\s*['"`]\s*(SELECT|INSERT|UPDATE|DELETE)\s+.+['"`]\s*\+/gi,
          (match) => {
            return match.replace(/`\s*\+/g, '`, [');
          },
        );
      } else if (finding.category === FindingCategory.UnsafeCode || finding.category === FindingCategory.SecurityVulnerability) {
        // For unsafe code, wrap in try-catch or add validation
        const lines = originalContent_.split('\n');
        if (findingLine > 0 && findingLine <= lines.length) {
          const unsafeLine = lines[findingLine - 1];
          if (unsafeLine && unsafeLine.includes('eval(')) {
            lines[findingLine - 1] = `// FIXED: Replaced eval() with safer alternative\n// ${unsafeLine}`;
            fixedContent = lines.join('\n');
          }
        }
      }
    }

    // Build diff hunks for the patch
    const diffHunks: import('@sentinel/core').DiffHunk[] = [];
    if (originalContent_ !== fixedContent && originalContent_ && fixedContent) {
      const origLines = originalContent_.split('\n');
      const fixLines = fixedContent.split('\n');
      const maxLen = Math.max(origLines.length, fixLines.length);

      for (let i = 0; i < maxLen; i++) {
        if (origLines[i] !== fixLines[i]) {
          diffHunks.push({
            oldStart: i + 1,
            oldLines: origLines[i] ? 1 : 0,
            newStart: i + 1,
            newLines: fixLines[i] ? 1 : 0,
            content: fixLines[i] || '',
          });
        }
      }
    }

    const patch: Patch = {
      id: utils.generateId(),
      description: finding.suggestedFix || 'Suggested fix',
      diff: [{
        file: finding.file,
        additions: diffHunks.filter(h => h.newLines > 0).length,
        deletions: diffHunks.filter(h => h.oldLines > 0).length,
        hunks: diffHunks,
      }],
      originalHash: originalContent_ ? this.simpleHash(originalContent_) : '',
      newHash: fixedContent ? this.simpleHash(fixedContent) : '',
    };

    return {
      id,
      description: finding.suggestedFix || `Fix for: ${finding.message}`,
      file: finding.file,
      originalContent: originalContent_,
      fixedContent,
      patch,
      confidence: finding.severity === Severity.Critical ? 0.6 : finding.severity === Severity.High ? 0.75 : 0.9,
    };
  }

  private simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16);
  }

  getHistory(): RecoveryPlan[] {
    return [...this.history];
  }

  clearHistory(): void {
    this.history = [];
  }
}
