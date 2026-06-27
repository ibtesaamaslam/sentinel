import { describe, it, expect } from 'vitest';
import { uuid, isString, isObject, deepMerge, pick, omit, memoize } from '../src/index.js';

describe('Utils', () => {
  it('should generate UUIDs', () => {
    expect(uuid()).toBeTruthy();
    expect(uuid()).not.toBe(uuid());
  });

  it('should check strings', () => {
    expect(isString('hello')).toBe(true);
    expect(isString(42)).toBe(false);
    expect(isString(null)).toBe(false);
  });

  it('should check objects', () => {
    expect(isObject({})).toBe(true);
    expect(isObject(null)).toBe(false);
    expect(isObject([])).toBe(false);
  });

  it('should deep merge', () => {
    const result = deepMerge({ a: 1, b: { c: 2 } }, { b: { d: 3 } });
    expect(result).toEqual({ a: 1, b: { c: 2, d: 3 } });
  });

  it('should pick keys', () => {
    expect(pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({ a: 1, c: 3 });
  });

  it('should omit keys', () => {
    expect(omit({ a: 1, b: 2, c: 3 }, ['b'])).toEqual({ a: 1, c: 3 });
  });

  it('should memoize results', () => {
    let count = 0;
    const fn = memoize(() => ++count);
    expect(fn()).toBe(1);
    expect(fn()).toBe(1);
    expect(count).toBe(1);
  });
});
