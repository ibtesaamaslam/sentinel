import { readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import type { SentinelPlugin } from './types.js';
import type { PluginManifest, PluginLoadResult, PluginLogger } from './types.js';

// ─── Default Logger ──────────────────────────────────────────────
const defaultLogger: PluginLogger = {
  info: (msg: string) => console.log(`[plugin] ${msg}`),
  warn: (msg: string) => console.warn(`[plugin] ${msg}`),
  error: (msg: string) => console.error(`[plugin] ${msg}`),
  debug: (_msg: string) => {},
};

// ─── Load a single plugin from its directory ─────────────────────
export async function loadPlugin(
  pluginPath: string,
  logger: PluginLogger = defaultLogger,
): Promise<PluginLoadResult | null> {
  try {
    const manifestPath = join(pluginPath, 'manifest.json');
    if (!existsSync(manifestPath)) {
      logger.warn(`No manifest.json found at ${manifestPath}`);
      return null;
    }

    const manifestRaw = readFileSync(manifestPath, 'utf-8');
    const manifest: PluginManifest = JSON.parse(manifestRaw);

    const entryPath = resolve(pluginPath, manifest.entry);
    if (!existsSync(entryPath)) {
      logger.warn(`Plugin entry not found: ${entryPath}`);
      return null;
    }

    // Dynamic import of the plugin module
    const pluginModule = await import(entryPath);
    const plugin: SentinelPlugin = pluginModule.default || pluginModule;

    if (!plugin || !plugin.id || !plugin.name || !plugin.hooks) {
      logger.warn(`Invalid plugin at ${pluginPath}: missing id, name, or hooks`);
      return null;
    }

    logger.info(`Loaded plugin: ${plugin.name} v${plugin.version}`);

    // Call onLoad hook if present
    if (plugin.hooks.onLoad) {
      await plugin.hooks.onLoad({ config: {} as any, logger });
    }

    return { plugin, manifest };
  } catch (err) {
    logger.error(`Failed to load plugin from ${pluginPath}: ${(err as Error).message}`);
    return null;
  }
}

// ─── Load all plugins from a directory ───────────────────────────
export async function loadPlugins(
  pluginsDir: string,
  logger: PluginLogger = defaultLogger,
): Promise<PluginLoadResult[]> {
  const { readdirSync } = await import('node:fs');
  const results: PluginLoadResult[] = [];

  if (!existsSync(pluginsDir)) {
    logger.warn(`Plugins directory not found: ${pluginsDir}`);
    return results;
  }

  const entries = readdirSync(pluginsDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const pluginPath = join(pluginsDir, entry.name);
      const result = await loadPlugin(pluginPath, logger);
      if (result) {
        results.push(result);
      }
    }
  }

  return results;
}

// ─── Load plugins from configured paths ──────────────────────────
export async function loadPluginsFromConfig(
  pluginPaths: string[],
  logger: PluginLogger = defaultLogger,
): Promise<PluginLoadResult[]> {
  const results: PluginLoadResult[] = [];

  for (const pluginPath of pluginPaths) {
    if (existsSync(pluginPath)) {
      const loaded = await loadPlugins(pluginPath, logger);
      results.push(...loaded);
    } else {
      const single = await loadPlugin(pluginPath, logger);
      if (single) {
        results.push(single);
      }
    }
  }

  return results;
}
