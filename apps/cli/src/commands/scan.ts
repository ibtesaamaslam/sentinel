import { Command } from 'commander';
import { Scanner } from '@sentinel/scanner';
import { renderReport, type ReportFormat } from '@sentinel/reports';
import { resolve } from 'node:path';
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { type SentinelConfig } from '@sentinel/core';
import pico from 'picocolors';

export function createScanCommand(): Command {
  const cmd = new Command('scan')
    .description('Scan a repository for issues')
    .argument('[target]', 'Target directory to scan', '.')
    .option('-f, --format <formats...>', 'Report formats (html, json, sarif, terminal)', ['terminal'])
    .option('-o, --output <dir>', 'Output directory for reports', './sentinel-reports')
    .option('-e, --exclude <patterns...>', 'Exclude patterns')
    .option('-s, --severity <levels...>', 'Minimum severity to report (critical, high, medium, low, info)')
    .option('--no-parallel', 'Disable parallel scanning')
    .option('-w, --workers <number>', 'Number of worker threads', '4')
    .option('--open', 'Open HTML report in browser')
    .action(async (target: string, options: Record<string, any>) => {
      try {
        const targetDir = resolve(target);

        if (!existsSync(targetDir)) {
          console.error(pico.red(`Error: Target directory not found: ${targetDir}`));
          process.exit(1);
        }

        console.log(pico.cyan('🔍 Sentinel Scan'));
        console.log(pico.dim('═'.repeat(40)));
        console.log(`${pico.bold('Target:')} ${targetDir}`);
        console.log('');

        const config: SentinelConfig = {
          rootDir: targetDir,
          scan: {
            include: ['**/*'],
            exclude: options.exclude || ['node_modules', '.git', 'dist', 'build', '.next', 'coverage'],
            maxFileSize: 1_000_000,
            parallel: options.parallel !== false,
            workers: parseInt(options.workers, 10) || 4,
            timeout: 30000,
            severity: [],
          },
          monitor: { enabled: false, watchPaths: [], debounceMs: 300, gitEvents: true, dependencyChanges: true, secretDetection: true },
          guardian: { enabled: false, detectHallucinations: true, detectOffTask: true, detectDuplicates: true, detectArchitectureDrift: true },
          firewall: { enabled: false, rules: [], blockOnHighRisk: true, requireApproval: true },
          recovery: { enabled: false, autoRestore: false, createPatches: true, maxRetries: 3 },
          plugins: { paths: [], timeout: 10000 },
          reports: { formats: options.format || ['terminal'], outputDir: options.output || './sentinel-reports', openHtml: !!options.open },
        };

        const scanner = new Scanner(config);

        const result = await scanner.scan(targetDir, {
          config,
          onProgress: (progress) => {
            if (progress.total > 0 && progress.scanned % 50 === 0) {
              process.stdout.write(`\r  ${pico.dim(`Scanned: ${progress.scanned} files (${progress.skipped} skipped)`)}`);
            }
          },
        });

        process.stdout.write('\r' + ' '.repeat(60) + '\r');

        const formats: ReportFormat[] = (options.format || ['terminal']);
        for (const format of formats) {
          const report = renderReport(result, format as ReportFormat);

          if (format === 'terminal') {
            console.log(report);
          } else {
            const outputDir = resolve(options.output || './sentinel-reports');
            if (!existsSync(outputDir)) {
              mkdirSync(outputDir, { recursive: true });
            }

            const ext = format === 'sarif' ? '.sarif' : `.${format}`;
            const filePath = `${outputDir}/sentinel-report${ext}`;
            writeFileSync(filePath, report, 'utf-8');
            console.log(`${pico.green('✓')} Report saved: ${pico.cyan(filePath)}`);
          }
        }

        if (options.open && formats.includes('html')) {
          const htmlPath = resolve(options.output || './sentinel-reports', 'sentinel-report.html');
          if (existsSync(htmlPath)) {
            const { execSync } = await import('node:child_process');
            try {
              const platform = process.platform;
              const cmd = platform === 'win32' ? `start "" "${htmlPath}"`
                : platform === 'darwin' ? `open "${htmlPath}"`
                : `xdg-open "${htmlPath}"`;
              execSync(cmd);
            } catch {
              // Failed to open browser, that's ok
            }
          }
        }

        if (result.summary.critical > 0 || result.summary.high > 0) {
          process.exit(1);
        }
      } catch (err) {
        console.error(pico.red(`Error: ${(err as Error).message}`));
        process.exit(1);
      }
    });

  return cmd;
}
