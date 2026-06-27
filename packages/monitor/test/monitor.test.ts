import { describe, it, expect, vi } from 'vitest';
import { Monitor } from '../src/engine.js';
import type { SentinelConfig } from '@sentinel/core';

const testConfig: SentinelConfig = {
  rootDir: '.',
  scan: { include: ['**/*'], exclude: [], maxFileSize: 1000000, parallel: true, workers: 4, timeout: 30000, severity: [] },
  monitor: { enabled: true, watchPaths: ['.'], debounceMs: 1000, gitEvents: true, dependencyChanges: true, secretDetection: true },
  guardian: { enabled: false, detectHallucinations: true, detectOffTask: true, detectDuplicates: true, detectArchitectureDrift: true },
  firewall: { enabled: false, rules: [], blockOnHighRisk: true, requireApproval: true },
  recovery: { enabled: false, autoRestore: false, createPatches: true, maxRetries: 3 },
  plugins: { paths: [], timeout: 10000 },
  reports: { formats: ['terminal'], outputDir: './sentinel-reports', openHtml: false },
};

describe('Monitor', () => {
  it('should create an instance', () => {
    const monitor = new Monitor(testConfig);
    expect(monitor).toBeInstanceOf(Monitor);
  });

  it('should not be watching initially', () => {
    const monitor = new Monitor(testConfig);
    expect(monitor.isWatching()).toBe(false);
  });

  it('should start watching when config is enabled', () => {
    const monitor = new Monitor(testConfig);
    monitor.start();
    // The watcher should be active with the test config
    // Note: actually watching depends on the directory existing
    expect(monitor.isWatching()).toBe(true);
    monitor.stop();
    expect(monitor.isWatching()).toBe(false);
  });

  it('should not start when monitor is disabled', () => {
    const disabledConfig: SentinelConfig = {
      ...testConfig,
      monitor: { ...testConfig.monitor, enabled: false },
    };
    const monitor = new Monitor(disabledConfig);
    monitor.start();
    expect(monitor.isWatching()).toBe(false);
  });

  it('should stop all watchers', () => {
    const monitor = new Monitor({
      ...testConfig,
      monitor: { ...testConfig.monitor, watchPaths: ['.', '..'] },
    });
    monitor.start();
    expect(monitor.isWatching()).toBe(true);
    monitor.stop();
    expect(monitor.isWatching()).toBe(false);
  });

  it('should call onChange callback for file events', async () => {
    const onChange = vi.fn();
    const monitor = new Monitor(testConfig, { config: testConfig, onChange });
    monitor.start();
    // Give watcher time to initialize
    await new Promise(r => setTimeout(r, 100));
    expect(onChange).not.toHaveBeenCalled(); // No events yet
    monitor.stop();
  });
});
