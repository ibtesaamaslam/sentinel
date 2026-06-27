import type { SentinelPlugin, PluginLoadResult, PluginLogger } from '@sentinel/plugin-sdk';
import { loadPluginsFromConfig } from '@sentinel/plugin-sdk';
import { Logger } from '@sentinel/logger';

export class PluginRegistry {
  private plugins: Map<string, SentinelPlugin> = new Map();
  private logger: Logger;

  constructor(logger?: Logger) {
    this.logger = logger ?? new Logger({ prefix: 'plugins' });
  }

  register(plugin: SentinelPlugin): void {
    if (this.plugins.has(plugin.id)) {
      this.logger.warn(`Plugin '${plugin.id}' already registered, overwriting`);
    }
    this.plugins.set(plugin.id, plugin);
    this.logger.info(`Registered plugin: ${plugin.name} v${plugin.version}`);
  }

  unregister(pluginId: string): void {
    this.plugins.delete(pluginId);
    this.logger.info(`Unregistered plugin: ${pluginId}`);
  }

  get(pluginId: string): SentinelPlugin | undefined {
    return this.plugins.get(pluginId);
  }

  getAll(): SentinelPlugin[] {
    return Array.from(this.plugins.values());
  }

  has(pluginId: string): boolean {
    return this.plugins.has(pluginId);
  }

  async loadFromPaths(paths: string[], logger?: PluginLogger): Promise<PluginLoadResult[]> {
    const results = await loadPluginsFromConfig(paths, logger);
    for (const result of results) {
      this.register(result.plugin);
    }
    return results;
  }

  clear(): void {
    this.plugins.clear();
  }

  get size(): number {
    return this.plugins.size;
  }
}
