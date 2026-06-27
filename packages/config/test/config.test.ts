import { describe, it, expect } from 'vitest';
import { ConfigLoader } from '../src/index.js';

describe('ConfigLoader', () => {
  it('should create config loader', () => {
    const loader = new ConfigLoader();
    expect(loader).toBeInstanceOf(ConfigLoader);
  });

  it('should not find config in nonexistent directory', () => {
    const loader = new ConfigLoader();
    const found = loader.findConfig('/nonexistent');
    expect(found).toBeNull();
  });

  it('should generate default config', () => {
    const loader = new ConfigLoader();
    const config = loader.generateDefaultConfig();
    expect(config).toContain('rootDir');
    expect(config).toContain('scan');
    expect(config).toContain('monitor');
    expect(config).toContain('guardian');
    expect(config).toContain('firewall');
    expect(config).toContain('recovery');
  });

  it('should return default config when no config found', () => {
    const loader = new ConfigLoader();
    const config = loader.loadConfig();
    expect(config.scan).toBeDefined();
    expect(config.monitor).toBeDefined();
  });
});
