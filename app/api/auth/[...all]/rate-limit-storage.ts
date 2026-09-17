// FILE: lib/auth/rate-limit-storage.ts

import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const rateLimitStorage = {
  async get(key: string) {
    const value = await redis.get<{ count: number; lastRequest: number }>(key);
    return value ?? undefined;
  },
  async set(key: string, value: { count: number; lastRequest: number }) {
    await redis.set(key, value, { ex: 300 }); // 5 min TTL, auto-clears stale keys
  },
};