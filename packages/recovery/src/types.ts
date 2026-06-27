import type { Patch, Finding } from '@sentinel/core';

export interface RecoveryOptions {
  maxRetries?: number;
  autoRestore?: boolean;
  createPatches?: boolean;
}

export interface RecoveryPlan {
  id: string;
  failures: string[];
  rootCauses: RootCause[];
  fixes: Fix[];
  patches: Patch[];
  timestamp: string;
}

export interface RootCause {
  finding: Finding;
  cause: string;
  category: 'bug' | 'regression' | 'security' | 'config' | 'dependency' | 'unknown';
  confidence: number;
}

export interface Fix {
  id: string;
  description: string;
  file: string;
  originalContent: string;
  fixedContent: string;
  patch: Patch;
  confidence: number;
}
