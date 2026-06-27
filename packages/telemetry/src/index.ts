import { Logger } from '@sentinel/logger';

export interface TelemetryEvent {
  name: string;
  timestamp: string;
  properties?: Record<string, unknown>;
  metrics?: Record<string, number>;
}

export interface TelemetryReporter {
  report(event: TelemetryEvent): void;
  flush(): Promise<void>;
}

export class ConsoleReporter implements TelemetryReporter {
  private logger: Logger;

  constructor(logger?: Logger) {
    this.logger = logger ?? new Logger({ prefix: 'telemetry' });
  }

  report(event: TelemetryEvent): void {
    this.logger.debug(`[event] ${event.name}`, event.properties ?? {});
  }

  async flush(): Promise<void> {
    // No-op for console reporter
  }
}

export class TelemetryCollector {
  private events: TelemetryEvent[] = [];
  private reporter: TelemetryReporter;
  private enabled: boolean;

  constructor(reporter?: TelemetryReporter, enabled: boolean = false) {
    this.reporter = reporter ?? new ConsoleReporter();
    this.enabled = enabled;
  }

  track(name: string, properties?: Record<string, unknown>, metrics?: Record<string, number>): void {
    if (!this.enabled) return;

    const event: TelemetryEvent = {
      name,
      timestamp: new Date().toISOString(),
      properties,
      metrics,
    };

    this.events.push(event);
    this.reporter.report(event);
  }

  async flush(): Promise<void> {
    if (!this.enabled) return;
    await this.reporter.flush();
    this.events = [];
  }

  getEvents(): TelemetryEvent[] {
    return [...this.events];
  }

  getEventCount(): number {
    return this.events.length;
  }
}
