import type { ScanResult } from '@sentinel/core';
import { Severity } from '@sentinel/core';

interface SarifLog {
  $schema: string;
  version: string;
  runs: SarifRun[];
}

interface SarifRun {
  tool: { driver: { name: string; version: string; informationUri: string; rules: SarifRule[] } };
  results: SarifResult[];
}

interface SarifRule {
  id: string;
  name: string;
  shortDescription: { text: string };
  fullDescription?: { text: string };
  helpUri?: string;
  properties?: { severity?: string; category?: string };
}

interface SarifResult {
  ruleId: string;
  ruleIndex: number;
  level: string;
  message: { text: string };
  locations: SarifLocation[];
  properties?: Record<string, unknown>;
}

interface SarifLocation {
  physicalLocation: {
    artifactLocation: { uri: string };
    region: {
      startLine: number;
      startColumn: number;
      endLine?: number;
      endColumn?: number;
      snippet?: { text: string };
    };
  };
}

function sarifLevel(severity: Severity): string {
  switch (severity) {
    case Severity.Critical: return 'error';
    case Severity.High: return 'error';
    case Severity.Medium: return 'warning';
    case Severity.Low: return 'note';
    case Severity.Info: return 'note';
  }
}

export function renderSarifReport(result: ScanResult): string {
  const rules: SarifRule[] = [];
  const ruleMap = new Map<string, number>();

  for (const finding of result.findings) {
    if (!ruleMap.has(finding.rule)) {
      ruleMap.set(finding.rule, rules.length);
      rules.push({
        id: finding.rule,
        name: finding.rule,
        shortDescription: { text: finding.message },
        fullDescription: finding.description ? { text: finding.description } : undefined,
        properties: {
          severity: finding.severity,
          category: finding.category,
        },
      });
    }
  }

  const sarifResults: SarifResult[] = result.findings.map(finding => ({
    ruleId: finding.rule,
    ruleIndex: ruleMap.get(finding.rule)!,
    level: sarifLevel(finding.severity),
    message: { text: finding.message },
    locations: [
      {
        physicalLocation: {
          artifactLocation: { uri: finding.file },
          region: {
            startLine: finding.line,
            startColumn: finding.column,
            endLine: finding.endLine,
            endColumn: finding.endColumn,
            snippet: finding.snippet ? { text: finding.snippet } : undefined,
          },
        },
      },
    ],
    properties: {
      category: finding.category,
      source: finding.source,
    },
  }));

  const sarifLog: SarifLog = {
    $schema: 'https://json.schemastore.org/sarif-2.1.0.json',
    version: '2.1.0',
    runs: [
      {
        tool: {
          driver: {
            name: 'Sentinel',
            version: '0.1.0',
            informationUri: 'https://github.com/sentinel-ai/sentinel',
            rules,
          },
        },
        results: sarifResults,
      },
    ],
  };

  return JSON.stringify(sarifLog, null, 2);
}
