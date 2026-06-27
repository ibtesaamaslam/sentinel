import type { ScanResult } from '@sentinel/core';
import { renderHtmlReport } from './html/renderer.js';
import { renderJsonReport } from './json/renderer.js';
import { renderSarifReport } from './sarif/renderer.js';
import { renderTerminalReport } from './terminal/renderer.js';

export type ReportFormat = 'html' | 'json' | 'sarif' | 'terminal';

export function renderReport(result: ScanResult, format: ReportFormat): string {
  switch (format) {
    case 'html': return renderHtmlReport(result);
    case 'json': return renderJsonReport(result);
    case 'sarif': return renderSarifReport(result);
    case 'terminal': return renderTerminalReport(result);
    default: throw new Error(`Unknown report format: ${format}`);
  }
}

export function renderReports(result: ScanResult, formats: ReportFormat[]): Map<ReportFormat, string> {
  const reports = new Map<ReportFormat, string>();
  for (const format of formats) {
    reports.set(format, renderReport(result, format));
  }
  return reports;
}
