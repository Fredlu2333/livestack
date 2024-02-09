import { LRUCache } from "lru-cache";

export function lruCacheFn<T extends any[], R extends {}>(
  keyFn: (...args: T) => string,
  fn: (...args: T) => R
): (...args: T) => R {
  const cache = new LRUCache<string, R>({ max: 50 });
  return (...args: T) => {
    const key = keyFn(...args);
    if (cache.has(key)) {
      return cache.get(key) as R;
    } else {
      const r = fn(...args);
      cache.set(key, r as any);
      return r;
    }
  };
}
