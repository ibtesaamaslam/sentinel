import { utils, type Finding } from '@sentinel/core';
import type { FindingCategory, Severity } from '@sentinel/core';
import type { CheckerContext } from '../types.js';

interface PatternRule {
  pattern: RegExp;
  severity: Severity;
  message: string;
  description?: string;
  suggestedFix?: string;
}

export function patternMatcher(
  context: CheckerContext,
  patterns: PatternRule[],
  rulePrefix: string,
  defaultCategory: FindingCategory,
): Finding[] {    const findings: Finding[] = [];

  for (const rule of patterns) {
    const regex = new RegExp(rule.pattern.source, rule.pattern.flags.includes('g') ? rule.pattern.flags : rule.pattern.flags + 'g');
    let match: RegExpExecArray | null;

    while ((match = regex.exec(context.file.content)) !== null) {
      const matchIndex = match.index;
      // Find the line number
      let lineNum = 1;
      let colNum = 1;
      for (let i = 0; i < matchIndex && i < context.file.content.length; i++) {
        if (context.file.content[i] === '\n') {
          lineNum++;
          colNum = 1;
        } else {
          colNum++;
        }
      }

      // Get snippet from surrounding lines
      const snippetStart = Math.max(0, matchIndex - 20);
      const snippetEnd = Math.min(context.file.content.length, matchIndex + match[0].length + 20);
      let snippet = context.file.content.slice(snippetStart, snippetEnd);
      if (snippetStart > 0) snippet = '...' + snippet;
      if (snippetEnd < context.file.content.length) snippet = snippet + '...';

      findings.push({
        id: utils.generateId(),
        file: context.file.path,
        line: lineNum,
        column: colNum,
        endLine: lineNum,
        endColumn: colNum + match[0].length,
        message: rule.message,
        description: rule.description,
        severity: rule.severity,
        category: defaultCategory,
        rule: `${rulePrefix}/${rule.severity}`,
        snippet,
        suggestedFix: rule.suggestedFix,
        source: 'scanner',
      });
    }
  }

  return findings;
}
