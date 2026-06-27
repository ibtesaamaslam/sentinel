import type { ScanResult } from '@sentinel/core';
import { renderReport, type ReportFormat } from '@sentinel/reports';
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

export interface ReportOutput {
  format: ReportFormat;
  content: string;
  filePath?: string;
}

export class ReportPipeline {
  private outputDir: string;

  constructor(outputDir: string = './sentinel-reports') {
    this.outputDir = outputDir;
  }

  generate(result: ScanResult, formats: ReportFormat[]): ReportOutput[] {
    const outputs: ReportOutput[] = [];

    for (const format of formats) {
      const content = renderReport(result, format);
      const output: ReportOutput = { format, content };
      outputs.push(output);
    }

    return outputs;
  }

  saveToDisk(outputs: ReportOutput[]): string[] {
    const savedPaths: string[] = [];

    for (const output of outputs) {
      const dir = resolve(this.outputDir);
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }

      const ext = output.format === 'sarif' ? '.sarif' : `.${output.format}`;
      const filePath = resolve(dir, `sentinel-report${ext}`);
      writeFileSync(filePath, output.content, 'utf-8');
      output.filePath = filePath;
      savedPaths.push(filePath);
    }

    return savedPaths;
  }

  generateAndSave(result: ScanResult, formats: ReportFormat[]): ReportOutput[] {
    const outputs = this.generate(result, formats);
    this.saveToDisk(outputs);
    return outputs;
  }
}

export type { ReportFormat } from '@sentinel/reports';
