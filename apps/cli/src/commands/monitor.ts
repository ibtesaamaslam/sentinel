import { Command } from 'commander';
import { Monitor } from '@sentinel/monitor';
import { Scanner } from '@sentinel/scanner';
import { renderReport } from '@sentinel/reports';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import type { SentinelConfig } from '@sentinel/core';
import pico from 'picocolors';

export function createMonitorCommand(): Command {
  const cmd = new Command('monitor')
    .description('Watch a repository for changes and run scans')
    .argument('[target]', 'Target directory to watch', '.')
    .option('-d, --debounce <ms>', 'Debounce interval in milliseconds', '300')
    .option('-e, --exclude <patterns...>', 'Exclude patterns')
    .action(async (target: string, options: Record<string, any>) => {
      const targetDir = resolve(target);

      if (!existsSync(targetDir)) {
        console.error(pico.red(`Error: Target directory not found: ${targetDir}`));
        process.exit(1);
      }

      const config: SentinelConfig = {
        rootDir: targetDir,
        scan: {
          include: ['**/*'],
          exclude: options.exclude || ['node_modules', '.git', 'dist', 'build', '.next', 'coverage'],
          maxFileSize: 1_000_000,
          parallel: true,
          workers: 4,
          timeout: 30000,
          severity: [],
        },
        monitor: {
          enabled: true,
          watchPaths: [targetDir],
          debounceMs: parseInt(options.debounce, 10) || 300,
          gitEvents: true,
          dependencyChanges: true,
          secretDetection: true,
        },
        guardian: { enabled: false, detectHallucinations: true, detectOffTask: true, detectDuplicates: true, detectArchitectureDrift: true },
        firewall: { enabled: false, rules: [], blockOnHighRisk: true, requireApproval: true },
        recovery: { enabled: false, autoRestore: false, createPatches: true, maxRetries: 3 },
        plugins: { paths: [], timeout: 10000 },
        reports: { formats: ['terminal'], outputDir: './sentinel-reports', openHtml: false },
      };

      const scanner = new Scanner(config);
      const monitor = new Monitor(config, {
        config,
        onChange: async (event) => {
          console.log('');
          console.log(pico.cyan(`📁 File changed: ${event.file}`));
          console.log(pico.dim(`   Type: ${event.type}`));

          if (event.file) {
            try {
              const result = await scanner.scan(targetDir);

              if (result.findings.length > 0) {
                console.log(renderReport(result, 'terminal'));
              } else {
                console.log(`  ${pico.green('✓ No issues found')}`);
              }
            } catch (err) {
              console.error(pico.red(`  Scan error: ${(err as Error).message}`));
            }
          }
        },
        onError: (error) => {
          console.error(pico.red(`Monitor error: ${error.message}`));
        },
      });

      console.log(pico.cyan('👁️ Sentinel Monitor'));
      console.log(pico.dim('═'.repeat(40)));
      console.log(`Watching: ${targetDir}`);
      console.log(`Debounce: ${config.monitor.debounceMs}ms`);
      console.log('');
      console.log(pico.dim('Waiting for changes... (Ctrl+C to stop)'));
      console.log('');

      monitor.start();

      process.on('SIGINT', () => {
        console.log('');
        console.log(pico.yellow('Shutting down monitor...'));
        monitor.stop();
        process.exit(0);
      });

      await new Promise(() => {});
    });

  return cmd;
}
