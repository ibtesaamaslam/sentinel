#!/usr/bin/env node
import { Command } from 'commander';
import { createScanCommand } from './commands/scan.js';
import { createMonitorCommand } from './commands/monitor.js';
import { createInitCommand } from './commands/init.js';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function getVersion(): string {
  try {
    const pkgPath = resolve(__dirname, '../package.json');
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    return pkg.version || '0.1.0';
  } catch {
    return '0.1.0';
  }
}

const program = new Command();

program
  .name('sentinel')
  .description('AI Software Engineering Safety Platform - Guard your code against AI-generated issues')
  .version(getVersion())
  .addCommand(createScanCommand())
  .addCommand(createMonitorCommand())
  .addCommand(createInitCommand());

program.parse(process.argv);
