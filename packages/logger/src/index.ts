import pico from 'picocolors';

export enum LogLevel {
  Debug = 0,
  Info = 1,
  Warn = 2,
  Error = 3,
  Silent = 4,
}

export interface LoggerConfig {
  level: LogLevel;
  prefix?: string;
  colorize?: boolean;
}

export class Logger {
  private config: LoggerConfig;

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = {
      level: config.level ?? LogLevel.Info,
      prefix: config.prefix ?? 'sentinel',
      colorize: config.colorize ?? true,
    };
  }

  debug(message: string, ...args: unknown[]): void {
    if (this.config.level > LogLevel.Debug) return;
    const prefix = this.config.colorize ? pico.dim(`[${this.config.prefix}]`) : `[${this.config.prefix}]`;
    const label = this.config.colorize ? pico.cyan('debug') : 'debug';
    console.log(`${prefix} ${label} ${message}`, ...args);
  }

  info(message: string, ...args: unknown[]): void {
    if (this.config.level > LogLevel.Info) return;
    const prefix = this.config.colorize ? pico.dim(`[${this.config.prefix}]`) : `[${this.config.prefix}]`;
    const label = this.config.colorize ? pico.green('info') : 'info';
    console.log(`${prefix} ${label} ${message}`, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    if (this.config.level > LogLevel.Warn) return;
    const prefix = this.config.colorize ? pico.dim(`[${this.config.prefix}]`) : `[${this.config.prefix}]`;
    const label = this.config.colorize ? pico.yellow('warn') : 'warn';
    console.warn(`${prefix} ${label} ${message}`, ...args);
  }

  error(message: string, ...args: unknown[]): void {
    if (this.config.level > LogLevel.Error) return;
    const prefix = this.config.colorize ? pico.dim(`[${this.config.prefix}]`) : `[${this.config.prefix}]`;
    const label = this.config.colorize ? pico.red('error') : 'error';
    console.error(`${prefix} ${label} ${message}`, ...args);
  }

  child(prefix: string): Logger {
    return new Logger({
      ...this.config,
      prefix: `${this.config.prefix}:${prefix}`,
    });
  }
}

export const defaultLogger = new Logger();
