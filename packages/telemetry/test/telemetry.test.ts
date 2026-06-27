import { describe, it, expect } from 'vitest';
import { TelemetryCollector } from '../src/index.js';

describe('TelemetryCollector', () => {
  it('should not track events when disabled', () => {
    const collector = new TelemetryCollector(undefined, false);
    collector.track('test');
    expect(collector.getEventCount()).toBe(0);
  });

  it('should track events when enabled', () => {
    const collector = new TelemetryCollector(undefined, true);
    collector.track('test-event', { key: 'value' }, { count: 1 });
    expect(collector.getEventCount()).toBe(1);
    const events = collector.getEvents();
    expect(events[0].name).toBe('test-event');
    expect(events[0].properties).toEqual({ key: 'value' });
  });

  it('should flush events', async () => {
    const collector = new TelemetryCollector(undefined, true);
    collector.track('test');
    await collector.flush();
    expect(collector.getEventCount()).toBe(0);
  });
});
