import { describe, it, expect } from 'vitest';
import { PluginRegistry } from '../src/index.js';
import type { SentinelPlugin } from '@sentinel/plugin-sdk';

describe('PluginRegistry', () => {
  it('should start empty', () => {
    const registry = new PluginRegistry();
    expect(registry.size).toBe(0);
  });

  it('should register plugins', () => {
    const registry = new PluginRegistry();
    registry.register({ id: 'test', name: 'Test', version: '1.0.0', description: 'Test plugin', hooks: {} });
    expect(registry.size).toBe(1);
    expect(registry.has('test')).toBe(true);
  });

  it('should get registered plugins', () => {
    const registry = new PluginRegistry();
    registry.register({ id: 'test', name: 'Test', version: '1.0.0', description: 'Test plugin', hooks: {} });
    const plugin = registry.get('test');
    expect(plugin).toBeDefined();
    expect(plugin!.name).toBe('Test');
  });

  it('should unregister plugins', () => {
    const registry = new PluginRegistry();
    registry.register({ id: 'test', name: 'Test', version: '1.0.0', description: 'Test', hooks: {} });
    registry.unregister('test');
    expect(registry.has('test')).toBe(false);
    expect(registry.size).toBe(0);
  });

  it('should list all plugins', () => {
    const registry = new PluginRegistry();
    const plugin: SentinelPlugin = { id: 'test', name: 'Test', version: '1.0.0', description: 'Test', hooks: {} };
    registry.register(plugin);
    expect(registry.getAll()).toHaveLength(1);
  });

  it('should clear all plugins', () => {
    const registry = new PluginRegistry();
    registry.register({ id: 'test', name: 'Test', version: '1.0.0', description: 'Test', hooks: {} });
    registry.clear();
    expect(registry.size).toBe(0);
  });
});
