import type { SentinelConfig, Policy, PolicyAction, Finding } from '@sentinel/core';
import { utils, Severity, FindingCategory } from '@sentinel/core';

export interface PolicyEvaluation {
  action: PolicyAction;
  rule: string;
  reason: string;
}

export class PolicyEngine {
  private policies: Policy[] = [];
  constructor(_config: SentinelConfig) {
    this.loadBuiltInPolicies();
  }

  private loadBuiltInPolicies(): void {
    this.policies.push({
      id: 'sentinel/credential-protection',
      name: 'Credential Protection',
      description: 'Prevent hardcoded credentials and secrets',
      rules: [
        { id: 'cred/regex', type: 'regex', pattern: '(?:password|secret|key|token)\\s*[:=]\\s*[\'"][^\'"]{8,}[\'"]', action: 'block' },
        { id: 'cred/aws', type: 'regex', pattern: 'AKIA[0-9A-Z]{16}', action: 'block' },
        { id: 'cred/jwt', type: 'regex', pattern: 'eyJ[a-zA-Z0-9_-]{10,}\\.[a-zA-Z0-9_-]{10,}\\.[a-zA-Z0-9_-]{10,}', action: 'block' },
      ],
      scope: 'global',
      enabled: true,
    });

    this.policies.push({
      id: 'sentinel/database-safety',
      name: 'Database Safety',
      description: 'Prevent dangerous database mutations',
      rules: [
        { id: 'db/drop-table', type: 'regex', pattern: 'DROP\\s+TABLE', action: 'block' },
        { id: 'db/drop-database', type: 'regex', pattern: 'DROP\\s+DATABASE', action: 'block' },
        { id: 'db/truncate', type: 'regex', pattern: 'TRUNCATE\\s+', action: 'warn' },
        { id: 'db/alter', type: 'regex', pattern: 'ALTER\\s+TABLE', action: 'warn' },
      ],
      scope: 'global',
      enabled: true,
    });

    this.policies.push({
      id: 'sentinel/production-safety',
      name: 'Production Safety',
      description: 'Protect production infrastructure and configuration',
      rules: [
        { id: 'prod/env', type: 'regex', pattern: '\\.env', action: 'warn' },
        { id: 'prod/deploy', type: 'regex', pattern: 'kubectl|helm\\s+deploy|terraform\\s+apply', action: 'block' },
        { id: 'prod/billing', type: 'regex', pattern: 'stripe|billing|payment|charge|cancel|refund', action: 'warn' },
      ],
      scope: 'global',
      enabled: true,
    });
  }

  addPolicy(policy: Policy): void {
    this.policies.push(policy);
  }

  evaluate(file: string, content: string): PolicyEvaluation[] {
    const results: PolicyEvaluation[] = [];

    for (const policy of this.policies) {
      if (!policy.enabled) continue;

      for (const rule of policy.rules) {
        if (rule.type === 'regex') {
          const regex = new RegExp(rule.pattern, 'gi');
          if (regex.test(content)) {
            results.push({
              action: rule.action,
              rule: rule.id,
              reason: `Policy "${policy.name}" matched rule "${rule.id}" in ${file}`,
            });
          }
        }
      }
    }

    return results;
  }

  toFindings(evaluations: PolicyEvaluation[]): Finding[] {
    return evaluations.map(eval_ => ({
      id: utils.generateId(),
      file: '',
      line: 1,
      column: 1,
      message: `[${eval_.action.toUpperCase()}] ${eval_.reason}`,
      severity: eval_.action === 'block' ? Severity.Critical : Severity.High,
      category: FindingCategory.PolicyViolation,
      rule: eval_.rule,
      source: 'firewall',
    }));
  }
}
