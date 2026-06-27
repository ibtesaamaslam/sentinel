import { describe, it, expect } from 'vitest';
import { AIEngine, NoOpProvider } from '../src/index.js';

describe('AIEngine', () => {
  it('should create with default config', () => {
    const engine = new AIEngine();
    expect(engine).toBeDefined();
  });

  it('should return NoOpProvider by default', () => {
    const engine = new AIEngine();
    const provider = engine.getProvider();
    expect(provider.name).toBe('none');
    expect(provider.isAvailable()).toBe(false);
  });

  it('should register custom providers', () => {
    const engine = new AIEngine();
    engine.registerProvider(new NoOpProvider());
    expect(engine.isAIEnabled()).toBe(false);
  });

  it('should complete with NoOpProvider', async () => {
    const engine = new AIEngine();
    const result = await engine.complete('test prompt');
    expect(result.text).toBe('');
    expect(result.provider).toBe('none');
  });

  it('should detect when AI is not enabled', () => {
    const engine = new AIEngine();
    expect(engine.isAIEnabled()).toBe(false);
  });
});
