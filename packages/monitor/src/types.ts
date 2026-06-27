import type { SentinelConfig } from '@sentinel/core';

export interface MonitorOptions {
  config: SentinelConfig;
  onChange?: (event: MonitorEvent) => void;
  onError?: (error: Error) => void;
}

export interface MonitorEvent {
  type: 'file:change' | 'file:create' | 'file:delete' | 'git:change' | 'dependency:change' | 'secret:detected';
  file?: string;
  timestamp: string;
  details?: Record<string, unknown>;
}

export interface WatchTarget {
  path: string;
  recursive: boolean;
  patterns: string[];
}
