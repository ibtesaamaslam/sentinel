import { describe, it, expect } from 'vitest';
import { scoreColor, scoreLabel, formatFileSize, formatDuration } from '../src/index.js';

describe('UI Utilities', () => {
  it('should return green for high scores', () => {
    expect(scoreColor(90)).toBe('#22c55e');
    expect(scoreColor(80)).toBe('#22c55e');
  });

  it('should return yellow for medium scores', () => {
    expect(scoreColor(70)).toBe('#eab308');
    expect(scoreColor(60)).toBe('#eab308');
  });

  it('should return red for low scores', () => {
    expect(scoreColor(30)).toBe('#ef4444');
  });

  it('should provide labels', () => {
    expect(scoreLabel(95)).toBe('Excellent');
    expect(scoreLabel(85)).toBe('Good');
    expect(scoreLabel(70)).toBe('Fair');
    expect(scoreLabel(50)).toBe('Poor');
    expect(scoreLabel(20)).toBe('Critical');
  });

  it('should format file sizes', () => {
    expect(formatFileSize(0)).toBe('0 B');
    const kb = formatFileSize(1024);
    expect(kb).toContain('KB');
    const mb = formatFileSize(1048576);
    expect(mb).toContain('MB');
  });

  it('should format durations', () => {
    expect(formatDuration(500)).toBe('500ms');
    expect(formatDuration(1500)).toBe('1.5s');
    expect(formatDuration(65000)).toBe('1m 5s');
  });
});
