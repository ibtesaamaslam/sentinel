import { utils, type FileInfo, type Finding, type ScanResult, type SentinelConfig, detectLanguage } from '@sentinel/core';
import type { Checker, ScannerOptions } from './types.js';
import { builtInCheckers } from './checkers/index.js';
import { DependencyAnalyzer } from './analyzers/dependency-analyzer.js';

const IGNORE_PATTERNS = [
  'node_modules', '.git', 'dist', 'build', '.next', 'coverage',
  '.turbo', '.cache', 'public/build', '.vercel', '.netlify',
  'vendor', '.venv', '__pycache__', '.svelte-kit',
];

const MAX_FILE_SIZE = 1_000_000; // 1MB
const BINARY_EXTS = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.webp',
  '.ttf', '.woff', '.woff2', '.eot',
  '.mp4', '.avi', '.mov', '.webm',
  '.mp3', '.wav', '.ogg', '.flac',
  '.zip', '.tar', '.gz', '.rar', '.7z',
  '.pdf', '.doc', '.docx', '.xls', '.xlsx',
  '.exe', '.dll', '.so', '.dylib', '.wasm',
  '.o', '.a', '.class',
]);

export class Scanner {
  private checkers: Checker[] = [...builtInCheckers];
  private config: SentinelConfig;
  private depAnalyzer: DependencyAnalyzer;

  constructor(config: SentinelConfig) {
    this.config = config;
    this.depAnalyzer = new DependencyAnalyzer();
  }

  registerChecker(checker: Checker): void {
    this.checkers.push(checker);
  }

  setCheckers(checkers: Checker[]): void {
    this.checkers = [...checkers];
  }

  async scan(targetDir: string, options?: ScannerOptions): Promise<ScanResult> {
    const { join, relative, resolve, extname } = await import('node:path');
    const { readdirSync, readFileSync, statSync } = await import('node:fs');
    const startTime = Date.now();
    const signal = options?.signal;

    // Collect all files
    const files: FileInfo[] = [];
    const scannedFiles: string[] = [];
    const skippedFiles: string[] = [];

    const collectFiles = (dir: string) => {
      if (signal?.aborted) return;

      let entries: { name: string; isDirectory: () => boolean; isFile: () => boolean }[];
      try {
        entries = readdirSync(dir, { withFileTypes: true });
      } catch {
        skippedFiles.push(dir);
        return;
      }

      for (const entry of entries) {
        if (signal?.aborted) return;

        const fullPath = join(dir, entry.name);
        const relPath = relative(targetDir, fullPath);

        // Check ignore patterns
        if (IGNORE_PATTERNS.some(p => entry.name === p || relPath.startsWith(p + '/'))) {
          skippedFiles.push(relPath);
          continue;
        }

        try {
          if (entry.isDirectory()) {
            collectFiles(fullPath);
          } else if (entry.isFile()) {
            const ext = extname(fullPath).toLowerCase();

            // Skip binary files
            if (BINARY_EXTS.has(ext)) {
              skippedFiles.push(relPath);
              continue;
            }

            const stats = statSync(fullPath);
            if (stats.size > MAX_FILE_SIZE) {
              skippedFiles.push(relPath);
              continue;
            }

            const content = readFileSync(fullPath, 'utf-8');
            const fileInfo: FileInfo = {
              path: relPath,
              content,
              language: detectLanguage(fullPath),
              lines: content.split('\n').length,
              size: stats.size,
            };
            files.push(fileInfo);
            scannedFiles.push(relPath);

            options?.onProgress?.({
              total: files.length + skippedFiles.length,
              scanned: files.length,
              skipped: skippedFiles.length,
              currentFile: relPath,
            });
          }
        } catch {
          skippedFiles.push(relPath);
        }
      }
    };

    // Resolve target directory
    const targetPath = resolve(targetDir);
    collectFiles(targetPath);

    if (signal?.aborted) {
      throw new Error('Scan was aborted');
    }

    // Run all checkers
    const findings: Finding[] = [];
    const findingsLock = new Mutex();

    const runCheckers = async (file: FileInfo) => {
      const fileFindings: Finding[] = [];

      for (const checker of this.checkers) {
        if (signal?.aborted) return;

        // Check if checker supports this file's language
        if (!checker.languages.includes('*') && !checker.languages.includes(file.language)) {
          continue;
        }

        try {
          const result = await checker.check({
            file,
            config: this.config,
            findings: fileFindings,
          });
          fileFindings.push(...result);
        } catch (err) {
          fileFindings.push({
            id: utils.generateId(),
            file: file.path,
            line: 1,
            column: 1,
            message: `Checker "${checker.name}" failed: ${(err as Error).message}`,
            severity: 'info' as any,
            category: 'custom' as any,
            rule: 'scanner/checker-error',
            source: 'scanner',
          });
        }
      }

      await findingsLock.lock();
      try {
        findings.push(...fileFindings);
      } finally {
        findingsLock.unlock();
      }
    };

    // Run in parallel or sequentially
    if (this.config.scan.parallel) {
      const concurrency = this.config.scan.workers || 4;
      const chunks = this.chunkArray(files, concurrency);
      for (const chunk of chunks) {
        if (signal?.aborted) break;
        await Promise.all(chunk.map(file => runCheckers(file)));
      }
    } else {
      for (const file of files) {
        if (signal?.aborted) break;
        await runCheckers(file);
      }
    }

    // Run dependency analysis
    try {
      const depResult = this.depAnalyzer.analyze(files);
      findings.push(...depResult.findings);
    } catch (err) {
      // Dependency analysis is best-effort
    }

    const duration = Date.now() - startTime;

    return utils.createScanResult(targetDir, files.length, skippedFiles.length, findings, {
      duration,
      durationMs: duration,
      checkers: this.checkers.map(c => c.id),
    });
  }

  private chunkArray<T>(arr: T[], chunkSize: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  }
}

// Simple mutex for coordinating async operations
class Mutex {
  private locked = false;
  private queue: (() => void)[] = [];

  async lock(): Promise<void> {
    if (!this.locked) {
      this.locked = true;
      return;
    }
    return new Promise(resolve => {
      this.queue.push(() => {
        this.locked = true;
        resolve();
      });
    });
  }

  unlock(): void {
    this.locked = false;
    const next = this.queue.shift();
    if (next) next();
  }
}
