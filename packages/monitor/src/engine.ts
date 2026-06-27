import { watch, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import type { SentinelConfig } from '@sentinel/core';
import type { MonitorOptions, MonitorEvent } from './types.js';

export class Monitor {
  private watchers: ReturnType<typeof watch>[] = [];
  private config: SentinelConfig;
  private options: MonitorOptions;
  private debounceTimers: Map<string, NodeJS.Timeout> = new Map();

  constructor(config: SentinelConfig, options: MonitorOptions = { config } as any) {
    this.config = config;
    this.options = { ...options };
  }

  start(): void {
    if (!this.config.monitor.enabled) return;

    const watchPaths = this.config.monitor.watchPaths || ['.'];
    const debounceMs = this.config.monitor.debounceMs || 300;

    for (const watchPath of watchPaths) {
      const resolvedPath = resolve(this.config.rootDir, watchPath);
      try {
        const watcher = watch(resolvedPath, { recursive: true }, (eventType, filename) => {
          if (!filename) return;

          // Debounce
          const key = `${eventType}:${filename}`;
          const existing = this.debounceTimers.get(key);
          if (existing) clearTimeout(existing);

          this.debounceTimers.set(key, setTimeout(() => {
            this.debounceTimers.delete(key);
            this.emitChange(eventType, filename.toString());
          }, debounceMs));
        });

        this.watchers.push(watcher);
      } catch (err) {
        this.options.onError?.(err as Error);
      }
    }
  }

  stop(): void {
    for (const watcher of this.watchers) {
      watcher.close();
    }
    this.watchers = [];

    // Clear all debounce timers
    for (const timer of this.debounceTimers.values()) {
      clearTimeout(timer);
    }
    this.debounceTimers.clear();
  }

  isWatching(): boolean {
    return this.watchers.length > 0;
  }

  private emitChange(eventType: string, filename: string): void {
    const event: MonitorEvent = {
      type: eventType === 'change' ? 'file:change' : eventType === 'rename' ? 'file:create' : 'file:change',
      file: filename,
      timestamp: new Date().toISOString(),
    };

    // Determine if it's a create or delete based on whether the file exists
    if (eventType === 'rename') {
      if (existsSync(join(this.config.rootDir, filename))) {
        event.type = 'file:create';
      } else {
        event.type = 'file:delete';
      }
    }

    this.options.onChange?.(event);
  }
}
