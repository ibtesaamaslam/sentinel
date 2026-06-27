import { describe, it, expect } from 'vitest';
import { createScanCommand } from '../src/commands/scan.js';
import { createMonitorCommand } from '../src/commands/monitor.js';
import { createInitCommand } from '../src/commands/init.js';

describe('CLI Commands', () => {
  it('should create scan command', () => {
    const cmd = createScanCommand();
    expect(cmd.name()).toBe('scan');
    expect(cmd.description()).toContain('Scan');
  });

  it('should create monitor command', () => {
    const cmd = createMonitorCommand();
    expect(cmd.name()).toBe('monitor');
    expect(cmd.description()).toContain('Watch');
  });

  it('should create init command', () => {
    const cmd = createInitCommand();
    expect(cmd.name()).toBe('init');
    expect(cmd.description()).toContain('Initialize');
  });

  it('scan command should have format option', () => {
    const cmd = createScanCommand();
    const formatOption = cmd.options.find(o => o.name() === 'format');
    expect(formatOption).toBeDefined();
  });

  it('monitor command should have debounce option', () => {
    const cmd = createMonitorCommand();
    const debounceOption = cmd.options.find(o => o.name() === 'debounce');
    expect(debounceOption).toBeDefined();
  });

  it('init command should have force option', () => {
    const cmd = createInitCommand();
    const forceOption = cmd.options.find(o => o.name() === 'force');
    expect(forceOption).toBeDefined();
  });
});
