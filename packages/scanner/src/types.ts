import type { Finding, FileInfo, SentinelConfig } from '@sentinel/core';

export interface ScannerOptions {
  config: SentinelConfig;
  onFinding?: (finding: Finding) => void;
  onProgress?: (progress: ScanProgress) => void;
  signal?: AbortSignal;
}

export interface ScanProgress {
  total: number;
  scanned: number;
  skipped: number;
  currentFile?: string;
}

export interface CheckerContext {
  file: FileInfo;
  config: SentinelConfig;
  findings: Finding[];
}

export interface Checker {
  id: string;
  name: string;
  description: string;
  languages: string[];
  check: (context: CheckerContext) => Promise<Finding[]> | Finding[];
}

export interface AnalyzerResult {
  findings: Finding[];
  dependencies?: string[];
  metrics?: Record<string, number>;
}
