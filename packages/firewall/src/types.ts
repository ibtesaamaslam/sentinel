import type { SentinelConfig, Finding } from '@sentinel/core';

export interface FirewallOptions {
  config: SentinelConfig;
  onBlock?: (event: FirewallEvent) => void;
  onWarning?: (event: FirewallEvent) => void;
}

export interface FirewallEvent {
  operation: string;
  file: string;
  riskLevel: string;
  action: 'block' | 'warn' | 'allow' | 'require_approval';
  rule: string;
  timestamp: string;
  details?: string;
}

export interface FirewallDecision {
  allowed: boolean;
  requiresApproval: boolean;
  events: FirewallEvent[];
  findings: Finding[];
}
