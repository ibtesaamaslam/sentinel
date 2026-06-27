import type { SentinelConfig } from '@sentinel/core';
import { Logger } from '@sentinel/logger';

export interface AIProvider {
  name: string;
  complete(prompt: string, options?: AICompleteOptions): Promise<AIResult>;
  isAvailable(): boolean;
}

export interface AICompleteOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIResult {
  text: string;
  provider: string;
  model: string;
  usage?: { promptTokens: number; completionTokens: number };
}

export interface AIProviderConfig {
  provider: string;
  apiKey?: string;
  model?: string;
  baseUrl?: string;
}

export class NoOpProvider implements AIProvider {
  name = 'none';

  async complete(_prompt: string, _options?: AICompleteOptions): Promise<AIResult> {
    return { text: '', provider: 'none', model: 'none' };
  }

  isAvailable(): boolean {
    return false;
  }
}

export class AIEngine {
  private providers: Map<string, AIProvider> = new Map();
  private logger: Logger;
  private fallbackProvider: AIProvider;

  constructor(_config?: SentinelConfig, logger?: Logger) {
    this.logger = logger ?? new Logger({ prefix: 'ai' });
    this.fallbackProvider = new NoOpProvider();
    this.registerProvider(this.fallbackProvider);
  }

  registerProvider(provider: AIProvider): void {
    this.providers.set(provider.name, provider);
    this.logger.info(`Registered AI provider: ${provider.name}`);
  }

  getProvider(name?: string): AIProvider {
    if (name) {
      return this.providers.get(name) ?? this.fallbackProvider;
    }
    // Return first available provider, or fallback
    for (const provider of this.providers.values()) {
      if (provider.isAvailable()) return provider;
    }
    return this.fallbackProvider;
  }

  async complete(prompt: string, options?: AICompleteOptions): Promise<AIResult> {
    const provider = this.getProvider(options?.model?.split('/')[0]);
    return provider.complete(prompt, options);
  }

  isAIEnabled(): boolean {
    return this.providers.size > 1 || Array.from(this.providers.values()).some(p => p !== this.fallbackProvider && p.isAvailable());
  }
}

