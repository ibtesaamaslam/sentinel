import { utils, type Finding, Severity, FindingCategory, type SentinelConfig } from '@sentinel/core';
import type { GuardianOptions, GuardianObservation, GuardianVerdict } from './types.js';

const HALLUCINATED_APIS = [
  'useServerState', 'useAIEffect', 'autosync', '__defineGetter__', '__lookupGetter__',
  'Object.observe', 'Array.observe', 'Function.prototype.bind.call',
];

export class Guardian {
  private options: GuardianOptions;
  private config: SentinelConfig;
  private sessions: Map<string, GuardianObservation[]> = new Map();

  constructor(config: SentinelConfig, options: GuardianOptions) {
    this.config = config;
    this.options = options;
  }

  observe(observation: GuardianObservation): GuardianVerdict {
    // Store the observation
    const observations = this.sessions.get(observation.sessionId) || [];
    observations.push(observation);
    this.sessions.set(observation.sessionId, observations);

    this.options.onObservation?.(observation);

    // Run checks and produce a verdict
    const verdict = this.evaluate(observation);
    this.options.onVerdict?.(verdict);
    return verdict;
  }

  getSessionObservations(sessionId: string): GuardianObservation[] {
    return this.sessions.get(sessionId) || [];
  }

  clearSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  private evaluate(observation: GuardianObservation): GuardianVerdict {
    const findings: Finding[] = [];
    const config = this.config.guardian;

    // Check for off-task edits
    if (config.detectOffTask && observation.action === 'refactor') {
      const offTaskPatterns = ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', '.env'];
      for (const pattern of offTaskPatterns) {
        if (observation.file.includes(pattern)) {
          findings.push({
            id: utils.generateId(),
            file: observation.file,
            line: 1,
            column: 1,
            message: `Off-task edit detected: modification to '${pattern}' may be unnecessary`,
            severity: Severity.Medium,
            category: FindingCategory.OffTaskEdit,
            rule: 'guardian/off-task-detection',
            source: 'guardian',
          });
        }
      }
    }

    // Check for hallucinated APIs in diffs
    if (config.detectHallucinations && observation.diff) {
      for (const fileDiff of observation.diff) {
        for (const hunk of fileDiff.hunks) {
          for (const api of HALLUCINATED_APIS) {
            if (hunk.content.includes(api)) {
              findings.push({
                id: utils.generateId(),
                file: observation.file,
                line: hunk.newStart,
                column: 1,
                message: `Potentially hallucinated API '${api}' detected in code changes`,
                severity: Severity.High,
                category: FindingCategory.HallucinatedApi,
                rule: 'guardian/hallucination-detection',
                source: 'guardian',
              });
            }
          }
        }
      }
    }

    // Determine verdict status
    const hasCritical = findings.some(f => f.severity === Severity.Critical);
    const hasHigh = findings.some(f => f.severity === Severity.High);
    const hasMedium = findings.some(f => f.severity === Severity.Medium);

    let status: 'approved' | 'flagged' | 'rejected';
    if (hasCritical) {
      status = 'rejected';
    } else if (hasHigh) {
      status = 'flagged';
    } else if (hasMedium) {
      status = 'flagged';
    } else {
      status = 'approved';
    }

    // Calculate confidence (inverse of findings severity)
    const confidence = Math.max(0, 100 - findings.length * 15);

    return {
      sessionId: observation.sessionId,
      status,
      findings,
      reason: findings.length > 0 ? `Found ${findings.length} issue(s) in the AI-generated changes` : undefined,
      confidence,
      timestamp: new Date().toISOString(),
    };
  }

  // Detect duplicate implementations across files
  detectDuplicates(files: Map<string, string>): Finding[] {
    const findings: Finding[] = [];
    const signatures = new Map<string, string[]>();

    for (const [filePath, content] of files) {
      const funcRegex = /(?:export\s+)?(?:async\s+)?function\s+(\w+)/g;
      let match: RegExpExecArray | null;
      while ((match = funcRegex.exec(content)) !== null) {
        const funcName = match[1];
        const prev = signatures.get(funcName) || [];
        prev.push(filePath);
        signatures.set(funcName, prev);
      }
    }

    for (const [funcName, locations] of signatures) {
      if (locations.length > 1) {
        for (const file of locations) {
          findings.push({
            id: utils.generateId(),
            file,
            line: 1,
            column: 1,
            message: `Duplicate function '${funcName}' found in multiple files: ${locations.join(', ')}`,
            severity: Severity.Medium,
            category: FindingCategory.DuplicateImplementation,
            rule: 'guardian/duplicate-detection',
            source: 'guardian',
          });
        }
      }
    }

    return findings;
  }
}
