import { describe, it, expect } from 'vitest';
import { generateId, chunkArray, groupBy, deduplicate, truncate, toUnixPath, isSubPath } from '../src/index.js';

describe('Common Utilities', () => {
  it('should generate unique IDs', () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
  });

  it('should chunk arrays', () => {
    expect(chunkArray([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunkArray([1], 2)).toEqual([[1]]);
    expect(chunkArray([], 2)).toEqual([]);
  });

  it('should group items by key', () => {
    const items = [{ type: 'a' }, { type: 'b' }, { type: 'a' }];
    const grouped = groupBy(items, i => i.type);
    expect(grouped.get('a')).toHaveLength(2);
    expect(grouped.get('b')).toHaveLength(1);
  });

  it('should deduplicate items', () => {
    const items = [{ id: 'a' }, { id: 'b' }, { id: 'a' }];
    const deduped = deduplicate(items, i => i.id);
    expect(deduped).toHaveLength(2);
  });

  it('should truncate strings', () => {
    expect(truncate('hello world', 5)).toBe('he...');
    expect(truncate('hello', 10)).toBe('hello');
  });

  it('should convert to Unix paths', () => {
    expect(toUnixPath('a\\b\\c')).toBe('a/b/c');
    expect(toUnixPath('a/b/c')).toBe('a/b/c');
  });

  it('should check sub-paths', () => {
    expect(isSubPath('/root', '/root/src')).toBe(true);
    expect(isSubPath('/root', '/other')).toBe(false);
  });
});
