import type { Finding, FileDiff } from '@sentinel/core';

export interface GuardianOptions {
  onObservation?: (observation: GuardianObservation) => void;
  onVerdict?: (verdict: GuardianVerdict) => void;
}

export interface GuardianObservation {
  sessionId: string;
  agentId?: string;
  file: string;
  action: 'edit' | 'create' | 'delete' | 'refactor' | 'analyze';
  diff?: FileDiff[];
  timestamp: string;
}

export interface GuardianVerdict {
  sessionId: string;
  status: 'approved' | 'flagged' | 'rejected';
  findings: Finding[];
  reason?: string;
  confidence: number;
  timestamp: string;
}

export interface GuardianRule {
  id: string;
  name: string;
  description: string;
  check: (observation: GuardianObservation) => GuardianVerdict | null;
}
