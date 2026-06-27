import type { Finding, ScanResult, SentinelConfig, SentinelEvent } from '@sentinel/core';

// ─── Plugin Interface ────────────────────────────────────────────
export interface SentinelPlugin {
  /** Unique plugin identifier */
  id: string;
  /** Human-readable name */
  name: string;
  /** Plugin version */
  version: string;
  /** Short description */
  description: string;
  /** Plugin lifecycle hooks */
  hooks: PluginHooks;
  /** Plugin metadata */
  metadata?: Record<string, unknown>;
}

// ─── Plugin Hooks ────────────────────────────────────────────────
export interface PluginHooks {
  /** Called when the plugin is loaded */
  onLoad?: (context: PluginContext) => Promise<void>;
  /** Called before a scan starts */
  beforeScan?: (target: string, config: SentinelConfig) => Promise<void>;
  /** Called for each file during scanning */
  onFile?: (file: PluginFileInfo, context: ScanContext) => Promise<Finding[]>;
  /** Called after a scan completes */
  afterScan?: (result: ScanResult) => Promise<ScanResult>;
  /** Called when a file changes (monitoring mode) */
  onFileChange?: (file: PluginFileInfo, context: PluginContext) => Promise<Finding[]>;
  /** Called when an event occurs */
  onEvent?: (event: SentinelEvent, context: PluginContext) => Promise<void>;
  /** Called when the plugin is unloaded */
  onUnload?: (context: PluginContext) => Promise<void>;
}

// ─── Context ─────────────────────────────────────────────────────
export interface PluginContext {
  config: SentinelConfig;
  logger: PluginLogger;
}

export interface ScanContext extends PluginContext {
  findings: Finding[];
  fileIndex: number;
  totalFiles: number;
}

// ─── File Info for Plugins ───────────────────────────────────────
export interface PluginFileInfo {
  path: string;
  content: string;
  language: string;
  lines: number;
  size: number;
}

// ─── Logger ──────────────────────────────────────────────────────
export interface PluginLogger {
  info: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string) => void;
  debug: (message: string) => void;
}

// ─── Plugin Manifest ─────────────────────────────────────────────
export interface PluginManifest {
  id: string;
  name: string;
  version: string;
  description: string;
  entry: string;
  author?: string;
  license?: string;
  repository?: string;
  keywords?: string[];
}

// ─── Plugin Load Result ──────────────────────────────────────────
export interface PluginLoadResult {
  plugin: SentinelPlugin;
  manifest: PluginManifest;
}
