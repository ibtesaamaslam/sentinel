import type { ScanResult, Finding } from '@sentinel/core';

export function renderHtmlReport(result: ScanResult): string {
  const { summary } = result;
  const scoreColor = (score: number) =>
    score >= 80 ? '#22c55e' : score >= 60 ? '#eab308' : score >= 40 ? '#f97316' : '#ef4444';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sentinel Security Report - ${result.target}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #e2e8f0; line-height: 1.6; }
    .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
    header { padding: 2rem 0; border-bottom: 1px solid #1e293b; margin-bottom: 2rem; }
    header h1 { font-size: 2rem; background: linear-gradient(135deg, #60a5fa, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    header p { color: #94a3b8; margin-top: 0.5rem; }
    .scores { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem; }
    .score-card { background: #1e293b; border-radius: 0.75rem; padding: 1.5rem; text-align: center; }
    .score-card h3 { font-size: 0.875rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
    .score-value { font-size: 2.5rem; font-weight: 700; }
    .summary-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; margin-bottom: 2rem; }
    .summary-item { text-align: center; padding: 1rem; border-radius: 0.5rem; }
    .summary-item.total { background: #1e293b; }
    .summary-item.critical { background: rgba(239, 68, 68, 0.15); }
    .summary-item.high { background: rgba(249, 115, 22, 0.15); }
    .summary-item.medium { background: rgba(234, 179, 8, 0.15); }
    .summary-item.low { background: rgba(34, 197, 94, 0.15); }
    .summary-item .count { font-size: 1.5rem; font-weight: 700; }
    .summary-item .label { font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; margin-top: 0.25rem; }
    .findings-section { margin-top: 2rem; }
    .findings-section h2 { margin-bottom: 1rem; color: #f1f5f9; }
    .finding { background: #1e293b; border-radius: 0.5rem; padding: 1rem; margin-bottom: 0.75rem; border-left: 4px solid; }
    .finding.critical { border-color: #ef4444; }
    .finding.high { border-color: #f97316; }
    .finding.medium { border-color: #eab308; }
    .finding.low { border-color: #22c55e; }
    .finding.info { border-color: #60a5fa; }
    .finding-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem; }
    .finding-message { font-weight: 600; color: #f1f5f9; }
    .finding-file { font-family: monospace; font-size: 0.875rem; color: #94a3b8; }
    .finding-severity { font-size: 0.75rem; padding: 0.25rem 0.5rem; border-radius: 999px; text-transform: uppercase; font-weight: 600; }
    .finding-severity.critical { background: rgba(239,68,68,0.2); color: #fca5a5; }
    .finding-severity.high { background: rgba(249,115,22,0.2); color: #fdba74; }
    .finding-severity.medium { background: rgba(234,179,8,0.2); color: #fde68a; }
    .finding-severity.low { background: rgba(34,197,94,0.2); color: #86efac; }
    .finding-severity.info { background: rgba(96,165,250,0.2); color: #93c5fd; }
    .finding-line { font-family: monospace; font-size: 0.75rem; color: #64748b; }
    pre { background: #0f172a; padding: 1rem; border-radius: 0.375rem; margin-top: 0.5rem; overflow-x: auto; font-size: 0.875rem; }
    .footer { text-align: center; padding: 2rem; color: #475569; font-size: 0.875rem; margin-top: 3rem; border-top: 1px solid #1e293b; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🔍 Sentinel Security Report</h1>
      <p>Target: <code>${escapeHtml(result.target)}</code> | Scanned: ${result.filesScanned} files | Skipped: ${result.filesSkipped} files</p>
      <p style="color:#64748b;font-size:0.875rem">Generated: ${result.timestamp} | ID: ${result.id}</p>
    </header>

    <div class="scores">
      <div class="score-card">
        <h3>Repository Health</h3>
        <div class="score-value" style="color:${scoreColor(summary.scores.repositoryHealth)}">${summary.scores.repositoryHealth}%</div>
      </div>
      <div class="score-card">
        <h3>AI Confidence</h3>
        <div class="score-value" style="color:${scoreColor(summary.scores.aiConfidence)}">${summary.scores.aiConfidence}%</div>
      </div>
      <div class="score-card">
        <h3>Risk Score</h3>
        <div class="score-value" style="color:${scoreColor(100 - summary.scores.risk)}">${summary.scores.risk}%</div>
      </div>
    </div>

    <div class="summary-grid">
      <div class="summary-item total"><div class="count">${summary.total}</div><div class="label">Total</div></div>
      <div class="summary-item critical"><div class="count" style="color:#ef4444">${summary.critical}</div><div class="label">Critical</div></div>
      <div class="summary-item high"><div class="count" style="color:#f97316">${summary.high}</div><div class="label">High</div></div>
      <div class="summary-item medium"><div class="count" style="color:#eab308">${summary.medium}</div><div class="label">Medium</div></div>
      <div class="summary-item low"><div class="count" style="color:#22c55e">${summary.low}</div><div class="label">Low</div></div>
    </div>

    <div class="findings-section">
      <h2>Findings (${result.findings.length})</h2>
      ${result.findings.map(f => renderFinding(f)).join('\n')}
      ${result.findings.length === 0 ? '<p style="color:#22c55e;text-align:center;padding:2rem">✓ No findings detected</p>' : ''}
    </div>

    <div class="footer">
      Generated by <strong>Sentinel</strong> — AI Software Engineering Safety Platform
    </div>
  </div>
</body>
</html>`;
}

function renderFinding(finding: Finding): string {
  return `
    <div class="finding ${finding.severity}">
      <div class="finding-header">
        <div>
          <div class="finding-message">${escapeHtml(finding.message)}</div>
          <div class="finding-file">${escapeHtml(finding.file)}:${finding.line}:${finding.column}</div>
        </div>
        <span class="finding-severity ${finding.severity}">${finding.severity}</span>
      </div>
      <div class="finding-line">Rule: ${finding.rule} | Category: ${finding.category} | Source: ${finding.source}</div>
      ${finding.snippet ? `<pre>${escapeHtml(finding.snippet)}</pre>` : ''}
      ${finding.suggestedFix ? `<p style="color:#86efac;font-size:0.875rem;margin-top:0.5rem">💡 ${escapeHtml(finding.suggestedFix)}</p>` : ''}
    </div>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
