import { LRUCache } from 'lru-cache';

interface RateLimitConfig {
  windowMs: number;
  max: number;
}

export class RateLimit {
  private cache: LRUCache<string, number[]>;
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
    this.cache = new LRUCache({
      max: 500,
      ttl: config.windowMs,
    });
  }

  async check(ip: string): Promise<boolean> {
    const now = Date.now();
    const windowStart = now - this.config.windowMs;

    const timestamps = this.cache.get(ip) || [];
    const recentTimestamps = timestamps.filter(
      (timestamp) => timestamp > windowStart
    );

    if (recentTimestamps.length >= this.config.max) {
      return false;
    }

    recentTimestamps.push(now);
    this.cache.set(ip, recentTimestamps);

    return true;
  }
}
