import { utils, Severity, FindingCategory, type Finding, type SentinelConfig } from '@sentinel/core';
import type { FirewallOptions, FirewallEvent, FirewallDecision } from './types.js';

const HIGH_RISK_PATTERNS = [
  { pattern: /ALTER\s+TABLE|DROP\s+TABLE|DROP\s+DATABASE|TRUNCATE/i, action: 'block', riskLevel: 'critical', rule: 'firewall/database-mutation', operation: 'Database mutation' },
  { pattern: /process\.env\s*\[?['"`]/, action: 'warn', riskLevel: 'medium', rule: 'firewall/env-access', operation: 'Environment variable access' },
  { pattern: /fs\.(rm|rmSync|unlink|unlinkSync|rmdir|rmdirSync)/, action: 'warn', riskLevel: 'high', rule: 'firewall/file-deletion', operation: 'File deletion' },
  { pattern: /child_process\.(exec|execSync|spawn|spawnSync|fork)/, action: 'warn', riskLevel: 'high', rule: 'firewall/shell-command', operation: 'Shell command execution' },
  { pattern: /\.env/, action: 'warn', riskLevel: 'medium', rule: 'firewall/env-file', operation: '.env file access' },
  { pattern: /password|secret|key|token|credential/i, action: 'warn', riskLevel: 'medium', rule: 'firewall/credential', operation: 'Potential credential exposure' },
  { pattern: /knex\.migrate|prisma\.migrate|typeorm\.migrate|sequelize\.migrate/i, action: 'warn', riskLevel: 'high', rule: 'firewall/database-migration', operation: 'Database migration' },
  { pattern: /stripe|billing|payment|charge|cancel|refund/i, action: 'warn', riskLevel: 'high', rule: 'firewall/billing-code', operation: 'Billing/payments code' },
  { pattern: /kubernetes|k8s|helm|deploy|terraform|pulumi/i, action: 'warn', riskLevel: 'high', rule: 'firewall/infrastructure', operation: 'Infrastructure changes' },
  { pattern: /Dockerfile|docker-compose/i, action: 'warn', riskLevel: 'medium', rule: 'firewall/docker-config', operation: 'Docker configuration' },
  { pattern: /production|prod/i, action: 'warn', riskLevel: 'medium', rule: 'firewall/production-config', operation: 'Production configuration' },
];

const SENSITIVE_FILES = [
  'package.json', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml',
  'Dockerfile', 'docker-compose.yml', 'docker-compose.yaml',
  'k8s/', 'deploy/', '.github/workflows/',
  'terraform/', '*.tf', '*.tfvars',
  '.env', '.env.production', '.env.prod',
];

export class Firewall {
  private config: SentinelConfig;
  private options: FirewallOptions;
  private pendingApprovals: Map<string, FirewallDecision> = new Map();

  constructor(config: SentinelConfig, options: FirewallOptions = { config } as any) {
    this.config = config;
    this.options = { ...options };
  }

  inspectOperation(
    _operation: string,
    file: string,
    content?: string,
  ): FirewallDecision {
    const events: FirewallEvent[] = [];
    const findings: Finding[] = [];

    // Check against high-risk patterns
    for (const rule of HIGH_RISK_PATTERNS) {
      if (content && rule.pattern.test(content)) {
        const event: FirewallEvent = {
          operation: rule.operation,
          file,
          riskLevel: rule.riskLevel,
          action: rule.action as any,
          rule: rule.rule,
          timestamp: new Date().toISOString(),
          details: `Pattern '${rule.pattern.source}' matched in operation`,
        };
        events.push(event);

        if (rule.action === 'block' || (rule.action as string) === 'block') {
          findings.push({
            id: utils.generateId(),
            file,
            line: 1,
            column: 1,
            message: `Blocked: ${rule.operation}`,
            severity: Severity.Critical,
            category: FindingCategory.PolicyViolation,
            rule: rule.rule,
            source: 'firewall',
          });
        } else {
          findings.push({
            id: utils.generateId(),
            file,
            line: 1,
            column: 1,
            message: `Warning: ${rule.operation}`,
            severity: Severity.High,
            category: FindingCategory.PolicyViolation,
            rule: rule.rule,
            source: 'firewall',
          });
        }
      }
    }

    // Check sensitive files
    const matchedFile = SENSITIVE_FILES.some(pattern => {
      if (pattern.endsWith('/')) return file.startsWith(pattern);
      if (pattern.includes('*')) {
        const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
        return regex.test(file);
      }
      return file === pattern || file.endsWith('/' + pattern);
    });

    if (matchedFile) {
      events.push({
        operation: `Modification to sensitive file: ${file}`,
        file,
        riskLevel: 'high',
        action: this.config.firewall.blockOnHighRisk ? 'block' : 'warn',
        rule: 'firewall/sensitive-file',
        timestamp: new Date().toISOString(),
      });
    }

    // Emit events
    for (const event of events) {
      if (event.action === 'block') {
        this.options.onBlock?.(event);
      } else if (event.action === 'warn') {
        this.options.onWarning?.(event);
      }
    }

    // Make decision
    const hasBlock = events.some(e => e.action === 'block');
    const hasRequireApproval = events.some(e => e.action === 'require_approval');
    const hasWarn = events.some(e => e.action === 'warn');

    const decision: FirewallDecision = {
      allowed: !hasBlock && !(this.config.firewall.blockOnHighRisk && hasWarn),
      requiresApproval: hasRequireApproval || (this.config.firewall.requireApproval && hasWarn),
      events,
      findings,
    };

    if (!decision.allowed || decision.requiresApproval) {
      this.pendingApprovals.set(`${file}:${Date.now()}`, decision);
    }

    return decision;
  }

  approveOperation(key: string): boolean {
    return this.pendingApprovals.delete(key);
  }

  getPendingApprovals(): Map<string, FirewallDecision> {
    return new Map(this.pendingApprovals);
  }
}
