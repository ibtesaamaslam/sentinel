import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import type { SentinelConfig } from '@sentinel/core';
import { sentinelConfigSchema } from '@sentinel/core';
import { Logger } from '@sentinel/logger';

const CONFIG_FILES = [
  'sentinel.config.json',
  '.sentinelrc',
  'sentinel.json',
];

export interface ConfigLoaderOptions {
  logger?: Logger;
  searchUp?: boolean;
}

export class ConfigLoader {
  private logger: Logger;

  constructor(options: ConfigLoaderOptions = {}) {
    this.logger = options.logger ?? new Logger({ prefix: 'config' });
  }

  findConfig(startDir: string = process.cwd()): string | null {
    let current = resolve(startDir);

    while (true) {
      for (const filename of CONFIG_FILES) {
        const candidate = resolve(current, filename);
        if (existsSync(candidate)) {
          return candidate;
        }
      }

      const parent = dirname(current);
      if (parent === current) break;
      current = parent;
    }

    return null;
  }

  loadConfig(configPath?: string): SentinelConfig {
    const path = configPath ?? this.findConfig();

    if (!path) {
      this.logger.debug('No config file found, using defaults');
      return this.defaultConfig(process.cwd());
    }

    try {
      const content = readFileSync(path, 'utf-8');
      const ext = path.split('.').pop()?.toLowerCase();

      let parsed: Record<string, unknown>;
      if (ext === 'json' || ext === 'sentinelrc') {
        parsed = JSON.parse(content);
        if (parsed.sentinel) parsed = parsed.sentinel as Record<string, unknown>;
      } else {
        throw new Error(`Unsupported config format: .${ext}. Use JSON format (.sentinelrc, sentinel.config.json, sentinel.json)`);
      }

      return sentinelConfigSchema.parse({
        rootDir: dirname(path),
        ...parsed,
      }) as SentinelConfig;
    } catch (err) {
      this.logger.error(`Failed to load config from ${path}: ${(err as Error).message}`);
      return this.defaultConfig(dirname(path));
    }
  }

  generateDefaultConfig(targetDir: string = process.cwd()): string {
    const config: Record<string, unknown> = {
      rootDir: targetDir,
      scan: {
        include: ['**/*'],
        exclude: ['node_modules', '.git', 'dist', 'build', '.next', 'coverage'],
        maxFileSize: 1000000,
        parallel: true,
        workers: 4,
        timeout: 30000,
      },
      monitor: {
        enabled: false,
        watchPaths: ['.'],
        debounceMs: 300,
        gitEvents: true,
        dependencyChanges: true,
        secretDetection: true,
      },
      guardian: {
        enabled: false,
        detectHallucinations: true,
        detectOffTask: true,
        detectDuplicates: true,
        detectArchitectureDrift: true,
      },
      firewall: {
        enabled: false,
        rules: [],
        blockOnHighRisk: true,
        requireApproval: true,
      },
      recovery: {
        enabled: false,
        autoRestore: false,
        createPatches: true,
        maxRetries: 3,
      },
      reports: {
        formats: ['terminal'],
        outputDir: './sentinel-reports',
        openHtml: false,
      },
      plugins: {
        paths: [],
        timeout: 10000,
      },
    };

    return JSON.stringify(config, null, 2);
  }

  private defaultConfig(rootDir: string): SentinelConfig {
    return sentinelConfigSchema.parse({
      rootDir,
      scan: {},
      monitor: {},
      guardian: {},
      firewall: {},
      recovery: {},
      reports: {},
      plugins: {},
    }) as SentinelConfig;
  }
}

export { sentinelConfigSchema } from '@sentinel/core';
export type { SentinelConfig } from '@sentinel/core';
