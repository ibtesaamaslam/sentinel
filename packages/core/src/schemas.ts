import { z } from 'zod';
import { Severity, FindingCategory, SentinelEventType } from './types.js';

// ─── Severity Schema ─────────────────────────────────────────────
export const severitySchema = z.nativeEnum(Severity);

// ─── Finding Category Schema ─────────────────────────────────────
export const findingCategorySchema = z.nativeEnum(FindingCategory);

// ─── Finding Schema ──────────────────────────────────────────────
export const findingSchema = z.object({
  id: z.string(),
  file: z.string(),
  line: z.number().int().nonnegative(),
  column: z.number().int().nonnegative(),
  endLine: z.number().int().nonnegative().optional(),
  endColumn: z.number().int().nonnegative().optional(),
  message: z.string().min(1),
  description: z.string().optional(),
  severity: severitySchema,
  category: findingCategorySchema,
  rule: z.string(),
  suggestedFix: z.string().optional(),
  snippet: z.string().optional(),
  source: z.enum(['scanner', 'monitor', 'guardian', 'firewall', 'recovery', 'plugin']),
  metadata: z.record(z.unknown()).optional(),
});

// ─── Scan Summary Schema ─────────────────────────────────────────
export const scoresSchema = z.object({
  repositoryHealth: z.number().min(0).max(100),
  aiConfidence: z.number().min(0).max(100),
  risk: z.number().min(0).max(100),
});

export const scanSummarySchema = z.object({
  total: z.number().int().nonnegative(),
  critical: z.number().int().nonnegative(),
  high: z.number().int().nonnegative(),
  medium: z.number().int().nonnegative(),
  low: z.number().int().nonnegative(),
  info: z.number().int().nonnegative(),
  byCategory: z.record(z.number()),
  scores: scoresSchema,
});

// ─── Scan Result Schema ──────────────────────────────────────────
export const scanResultSchema = z.object({
  id: z.string(),
  timestamp: z.string(),
  target: z.string(),
  filesScanned: z.number().int().nonnegative(),
  filesSkipped: z.number().int().nonnegative(),
  findings: z.array(findingSchema),
  summary: scanSummarySchema,
  metadata: z.record(z.unknown()).optional(),
});

// ─── Config Schemas ──────────────────────────────────────────────
export const scanConfigSchema = z.object({
  include: z.array(z.string()).default(['**/*']),
  exclude: z.array(z.string()).default(['node_modules', '.git', 'dist', 'build']),
  maxFileSize: z.number().positive().default(1_000_000),
  parallel: z.boolean().default(true),
  workers: z.number().int().positive().default(4),
  timeout: z.number().positive().default(30000),
  severity: z.array(severitySchema).default([Severity.Critical, Severity.High, Severity.Medium, Severity.Low]),
});

export const monitorConfigSchema = z.object({
  enabled: z.boolean().default(true),
  watchPaths: z.array(z.string()).default(['.']),
  debounceMs: z.number().positive().default(300),
  gitEvents: z.boolean().default(true),
  dependencyChanges: z.boolean().default(true),
  secretDetection: z.boolean().default(true),
});

export const firewallRuleSchema = z.object({
  id: z.string(),
  name: z.string(),
  patterns: z.array(z.string()),
  riskLevel: severitySchema,
  action: z.enum(['block', 'warn', 'allow', 'require_approval']),
});

export const firewallConfigSchema = z.object({
  enabled: z.boolean().default(true),
  rules: z.array(firewallRuleSchema).default([]),
  blockOnHighRisk: z.boolean().default(true),
  requireApproval: z.boolean().default(true),
});

export const guardianConfigSchema = z.object({
  enabled: z.boolean().default(true),
  detectHallucinations: z.boolean().default(true),
  detectOffTask: z.boolean().default(true),
  detectDuplicates: z.boolean().default(true),
  detectArchitectureDrift: z.boolean().default(true),
});

export const recoveryConfigSchema = z.object({
  enabled: z.boolean().default(true),
  autoRestore: z.boolean().default(false),
  createPatches: z.boolean().default(true),
  maxRetries: z.number().int().positive().default(3),
});

export const pluginConfigSchema = z.object({
  paths: z.array(z.string()).default([]),
  timeout: z.number().positive().default(10000),
});

export const reportConfigSchema = z.object({
  formats: z.array(z.enum(['html', 'json', 'sarif', 'terminal'])).default(['terminal']),
  outputDir: z.string().default('./sentinel-reports'),
  openHtml: z.boolean().default(false),
});

export const sentinelConfigSchema = z.object({
  rootDir: z.string(),
  scan: scanConfigSchema.default({}),
  monitor: monitorConfigSchema.default({}),
  guardian: guardianConfigSchema.default({}),
  firewall: firewallConfigSchema.default({}),
  recovery: recoveryConfigSchema.default({}),
  plugins: pluginConfigSchema.default({}),
  reports: reportConfigSchema.default({}),
});

// ─── Event Schema ────────────────────────────────────────────────
export const sentinelEventTypeSchema = z.nativeEnum(SentinelEventType);

export const sentinelEventSchema = z.object({
  type: sentinelEventTypeSchema,
  timestamp: z.string(),
  payload: z.unknown(),
});
