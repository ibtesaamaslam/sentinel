export interface SeverityBadge {
  label: string;
  color: string;
  bgColor: string;
}

export const SEVERITY_BADGES: Record<string, SeverityBadge> = {
  critical: { label: 'CRITICAL', color: '#ef4444', bgColor: 'rgba(239,68,68,0.15)' },
  high: { label: 'HIGH', color: '#f97316', bgColor: 'rgba(249,115,22,0.15)' },
  medium: { label: 'MEDIUM', color: '#eab308', bgColor: 'rgba(234,179,8,0.15)' },
  low: { label: 'LOW', color: '#22c55e', bgColor: 'rgba(34,197,94,0.15)' },
  info: { label: 'INFO', color: '#60a5fa', bgColor: 'rgba(96,165,250,0.15)' },
};

export function scoreColor(score: number): string {
  if (score >= 80) return '#22c55e';
  if (score >= 60) return '#eab308';
  if (score >= 40) return '#f97316';
  return '#ef4444';
}

export function scoreLabel(score: number): string {
  if (score >= 90) return 'Excellent';
  if (score >= 80) return 'Good';
  if (score >= 60) return 'Fair';
  if (score >= 40) return 'Poor';
  return 'Critical';
}

export interface ProgressBarOptions {
  total: number;
  current: number;
  width?: number;
  label?: string;
}

export function renderProgressBar(options: ProgressBarOptions): string {
  const { total, current, width = 40 } = options;
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
  const filled = Math.round((width * percentage) / 100);
  const empty = width - filled;
  const bar = '█'.repeat(filled) + '░'.repeat(Math.max(0, empty));
  return `${options.label ?? ''} [${bar}] ${percentage}%`;
}

export function truncateText(text: string, maxLength: number, suffix: string = '...'): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length) + suffix;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.round((ms % 60000) / 1000);
  return `${minutes}m ${seconds}s`;
}
