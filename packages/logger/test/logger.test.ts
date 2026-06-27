import { describe, it, expect } from 'vitest';
import { Logger, LogLevel } from '../src/index.js';

describe('Logger', () => {
  it('should create logger with default config', () => {
    const logger = new Logger();
    expect(logger).toBeInstanceOf(Logger);
  });

  it('should create logger with custom prefix', () => {
    const logger = new Logger({ prefix: 'test', level: LogLevel.Silent });
    expect(logger).toBeInstanceOf(Logger);
  });

  it('should create child logger', () => {
    const parent = new Logger({ prefix: 'parent', level: LogLevel.Silent });
    const child = parent.child('child');
    expect(child).toBeInstanceOf(Logger);
  });

  it('should not throw when logging at silent level', () => {
    const logger = new Logger({ level: LogLevel.Silent });
    expect(() => {
      logger.debug('test');
      logger.info('test');
      logger.warn('test');
      logger.error('test');
    }).not.toThrow();
  });
});
