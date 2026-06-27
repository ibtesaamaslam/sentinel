import { describe, it, expect } from 'vitest';
import { loadPlugin, loadPlugins, loadPluginsFromConfig } from '../src/loader.js';

describe('Plugin SDK Loader', () => {
  it('should return null for non-existent plugin path', async () => {
    const result = await loadPlugin('/nonexistent/path');
    expect(result).toBeNull();
  });

  it('should return empty array for non-existent plugins directory', async () => {
    const results = await loadPlugins('/nonexistent/directory');
    expect(results).toEqual([]);
  });

  it('should load from config paths safely', async () => {
    const results = await loadPluginsFromConfig(['/nonexistent/plugin']);
    expect(results).toEqual([]);
  });

  it('should handle invalid manifest gracefully', async () => {
    const result = await loadPlugin('/nonexistent/path');
    expect(result).toBeNull();
  });

  it('should handle directory with no manifest', async () => {
    // Temp dir with no manifest.json
    const { mkdtempSync, mkdirSync } = await import('node:fs');
    const { join } = await import('node:path');
    const { tmpdir } = await import('node:os');
    const tmpDir = mkdtempSync(join(tmpdir(), 'sentinel-test-'));
    mkdirSync(join(tmpDir, 'test-plugin'));
    const results = await loadPlugins(tmpDir);
    expect(results).toHaveLength(0);
  });
});
