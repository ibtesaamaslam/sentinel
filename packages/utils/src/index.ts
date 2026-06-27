import { randomUUID } from 'node:crypto';

export function uuid(): string {
  return randomUUID();
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function deepMerge<T extends Record<string, unknown>>(target: T, source: Partial<T>): T {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    const val = source[key as keyof T];
    if (isObject(val) && isObject(result[key as keyof T])) {
      (result as Record<string, unknown>)[key] = deepMerge(
        result[key as keyof T] as Record<string, unknown>,
        val as Record<string, unknown>,
      ) as T[keyof T];
    } else if (val !== undefined) {
      result[key as keyof T] = val as T[keyof T];
    }
  }
  return result;
}

export function pick<T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) result[key] = obj[key];
  }
  return result;
}

export function omit<T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key as string];
  }
  return result as Omit<T, K>;
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function retry<T>(fn: () => Promise<T>, options: { maxRetries?: number; delay?: number; backoff?: boolean } = {}): Promise<T> {
  const { maxRetries = 3, delay: baseDelay = 1000, backoff = true } = options;

  async function attempt(remaining: number): Promise<T> {
    try {
      return await fn();
    } catch (err) {
      if (remaining <= 0) throw err;
      const waitTime = backoff ? baseDelay * Math.pow(2, maxRetries - remaining) : baseDelay;
      await sleep(waitTime);
      return attempt(remaining - 1);
    }
  }

  return attempt(maxRetries);
}

export function memoize<T>(fn: () => T): () => T {
  let cached: T | undefined;
  let called = false;
  return () => {
    if (!called) {
      cached = fn();
      called = true;
    }
    return cached as T;
  };
}
