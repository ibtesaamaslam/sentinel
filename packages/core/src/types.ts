// ─── Severity Levels ──────────────────────────────────────────────
export enum Severity {
  Critical = 'critical',
  High = 'high',
  Medium = 'medium',
  Low = 'low',
  Info = 'info',
}

// ─── Finding Categories ──────────────────────────────────────────
export enum FindingCategory {
  Bug = 'bug',
  LogicError = 'logic_error',
  Placeholder = 'placeholder',
  Todo = 'todo',
  EmptyImplementation = 'empty_implementation',
  Hallucination = 'hallucination',
  Secret = 'secret',
  ApiKey = 'api_key',
  SecurityVulnerability = 'security_vulnerability',
  SqlInjection = 'sql_injection',
  Xss = 'xss',
  Ssrf = 'ssrf',
  Csrf = 'csrf',
  CommandInjection = 'command_injection',
  PathTraversal = 'path_traversal',
  InsecureAuth = 'insecure_auth',
  MissingAuth = 'missing_auth',
  DuplicateCode = 'duplicate_code',
  DeadCode = 'dead_code',
  CircularDependency = 'circular_dependency',
  UnusedImport = 'unused_import',
  UnusedExport = 'unused_export',
  Performance = 'performance',
  MemoryLeak = 'memory_leak',
  DatabaseIssue = 'database_issue',
  MissingTest = 'missing_test',
  ArchitectureViolation = 'architecture_violation',
  OffTaskEdit = 'off_task_edit',
  HallucinatedApi = 'hallucinated_api',
  DangerousRefactor = 'dangerous_refactor',
  DuplicateImplementation = 'duplicate_implementation',
  ArchitectureDrift = 'architecture_drift',
  BadPattern = 'bad_pattern',
  UnsafeCode = 'unsafe_code',
  RegressionRisk = 'regression_risk',
  PolicyViolation = 'policy_violation',
  HighBlastRadius = 'high_blast_radius',
  Custom = 'custom',
}

// ─── Finding ─────────────────────────────────────────────────────
export interface Finding {
  id: string;
  file: string;
  line: number;
  column: number;
  endLine?: number;
  endColumn?: number;
  message: string;
  description?: string;
  severity: Severity;
  category: FindingCategory;
  rule: string;
  suggestedFix?: string;
  snippet?: string;
  source: 'scanner' | 'monitor' | 'guardian' | 'firewall' | 'recovery' | 'plugin';
  metadata?: Record<string, unknown>;
}

// ─── Scan Results ────────────────────────────────────────────────
export interface ScanResult {
  id: string;
  timestamp: string;
  target: string;
  filesScanned: number;
  filesSkipped: number;
  findings: Finding[];
  summary: ScanSummary;
  metadata?: Record<string, unknown>;
}

export interface ScanSummary {
  total: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  info: number;
  byCategory: Record<string, number>;
  scores: Scores;
}

export interface Scores {
  repositoryHealth: number;
  aiConfidence: number;
  risk: number;
}

// ─── File Info ───────────────────────────────────────────────────
export interface FileInfo {
  path: string;
  content: string;
  language: string;
  lines: number;
  size: number;
}

// ─── Config ──────────────────────────────────────────────────────
export interface SentinelConfig {
  rootDir: string;
  scan: ScanConfig;
  monitor: MonitorConfig;
  guardian: GuardianConfig;
  firewall: FirewallConfig;
  recovery: RecoveryConfig;
  plugins: PluginConfig;
  reports: ReportConfig;
}

export interface ScanConfig {
  include: string[];
  exclude: string[];
  maxFileSize: number;
  parallel: boolean;
  workers: number;
  timeout: number;
  severity: Severity[];
}

export interface MonitorConfig {
  enabled: boolean;
  watchPaths: string[];
  debounceMs: number;
  gitEvents: boolean;
  dependencyChanges: boolean;
  secretDetection: boolean;
}

export interface GuardianConfig {
  enabled: boolean;
  detectHallucinations: boolean;
  detectOffTask: boolean;
  detectDuplicates: boolean;
  detectArchitectureDrift: boolean;
}

export interface FirewallConfig {
  enabled: boolean;
  rules: FirewallRule[];
  blockOnHighRisk: boolean;
  requireApproval: boolean;
}

export interface FirewallRule {
  id: string;
  name: string;
  patterns: string[];
  riskLevel: Severity;
  action: 'block' | 'warn' | 'allow' | 'require_approval';
}

export interface RecoveryConfig {
  enabled: boolean;
  autoRestore: boolean;
  createPatches: boolean;
  maxRetries: number;
}

export interface PluginConfig {
  paths: string[];
  timeout: number;
}

export interface ReportConfig {
  formats: ('html' | 'json' | 'sarif' | 'terminal')[];
  outputDir: string;
  openHtml: boolean;
}

// ─── Events ──────────────────────────────────────────────────────
export enum SentinelEventType {
  FileChanged = 'file:changed',
  FileCreated = 'file:created',
  FileDeleted = 'file:deleted',
  ScanStarted = 'scan:started',
  ScanCompleted = 'scan:completed',
  ScanError = 'scan:error',
  FindingDetected = 'finding:detected',
  FindingResolved = 'finding:resolved',
  PolicyViolation = 'policy:violation',
  PolicyBlocked = 'policy:blocked',
  GuardianObservation = 'guardian:observation',
  GuardianVerdict = 'guardian:verdict',
  RecoveryStarted = 'recovery:started',
  RecoveryCompleted = 'recovery:completed',
  Error = 'system:error',
}

export interface SentinelEvent {
  type: SentinelEventType;
  timestamp: string;
  payload: unknown;
}

// ─── Diff / Patch ────────────────────────────────────────────────
export interface FileDiff {
  file: string;
  additions: number;
  deletions: number;
  hunks: DiffHunk[];
}

export interface DiffHunk {
  oldStart: number;
  oldLines: number;
  newStart: number;
  newLines: number;
  content: string;
}

export interface Patch {
  id: string;
  description: string;
  diff: FileDiff[];
  originalHash: string;
  newHash: string;
}

// ─── Policy ──────────────────────────────────────────────────────
export interface Policy {
  id: string;
  name: string;
  description: string;
  rules: PolicyRule[];
  scope: 'global' | 'repository' | 'directory' | 'file';
  enabled: boolean;
}

export interface PolicyRule {
  id: string;
  type: 'regex' | 'path' | 'category' | 'severity' | 'custom';
  pattern: string;
  action: PolicyAction;
}

export type PolicyAction = 'block' | 'warn' | 'require_approval' | 'log';
