import { extname } from 'node:path';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

export interface ParsedFile {
  path: string;
  content: string;
  language: string;
  lines: number;
  size: number;
  extension: string;
}

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

const IGNORE_DIRS = new Set([
  'node_modules', '.git', 'dist', 'build', '.next', 'coverage',
  '.turbo', '.cache', 'public/build', '.vercel', '.netlify',
  'vendor', '.venv', '__pycache__', '.svelte-kit',
]);

const LANG_MAP: Record<string, string> = {
  ts: 'typescript', tsx: 'typescriptreact', js: 'javascript', jsx: 'javascriptreact',
  py: 'python', rb: 'ruby', go: 'go', rs: 'rust', java: 'java',
  kt: 'kotlin', swift: 'swift', php: 'php', cs: 'csharp',
  cpp: 'cpp', c: 'c', h: 'c', hpp: 'cpp',
  css: 'css', scss: 'scss', html: 'html', json: 'json',
  yaml: 'yaml', yml: 'yaml', md: 'markdown', sql: 'sql',
  sh: 'shell', bash: 'shell', dockerfile: 'dockerfile',
  tf: 'terraform', vue: 'vue', svelte: 'svelte',
};

export function detectLanguage(filePath: string): string {
  const ext = filePath.split('.').pop()?.toLowerCase() || '';
  return LANG_MAP[ext] || 'unknown';
}

export function isBinary(ext: string): boolean {
  return BINARY_EXTS.has(ext.toLowerCase());
}

export function isIgnoredDir(name: string): boolean {
  return IGNORE_DIRS.has(name);
}

export function parseFile(path: string, content: string): ParsedFile {
  const ext = extname(path).toLowerCase();
  return {
    path,
    content,
    language: detectLanguage(path),
    lines: content.split('\n').length,
    size: Buffer.byteLength(content, 'utf-8'),
    extension: ext,
  };
}

export function collectFiles(
  dir: string,
  options?: { maxSize?: number; signal?: AbortSignal },
): ParsedFile[] {
  const maxSize = options?.maxSize ?? 1_000_000;
  const files: ParsedFile[] = [];

  function walk(currentDir: string, baseDir: string) {
    if (options?.signal?.aborted) return;

    let entries;
    try {
      entries = readdirSync(currentDir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      if (options?.signal?.aborted) return;
      const fullPath = join(currentDir, entry.name);

      if (entry.isDirectory()) {
        if (!isIgnoredDir(entry.name)) {
          walk(fullPath, baseDir);
        }
      } else if (entry.isFile()) {
        const ext = extname(fullPath).toLowerCase();
        if (isBinary(ext)) continue;

        try {
          const stats = statSync(fullPath);
          if (stats.size > maxSize) continue;

          const content = readFileSync(fullPath, 'utf-8');
          const relPath = relative(baseDir, fullPath);
          files.push(parseFile(relPath, content));
        } catch {
          // Skip unreadable files
        }
      }
    }
  }

  const resolved = resolve(dir);
  walk(resolved, resolved);
  return files;
}

export const IGNORE_PATTERNS = [...IGNORE_DIRS];
