import type { ScanResult } from '@sentinel/core';

export function renderJsonReport(result: ScanResult): string {
  return JSON.stringify(result, null, 2);
}
