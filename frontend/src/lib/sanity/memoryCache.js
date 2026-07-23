/**
 * Per-isolate memory TTL for Sanity list payloads on Cloudflare Workers.
 * Network wait does not count toward CPU; JSON parse/map does — caching
 * cuts repeat CPU work and lowers Error 1102 risk as the catalog grows.
 */

const store = new Map();

function ttlMs() {
  const sec = Number(process.env.SANITY_MEMORY_CACHE_SECONDS);
  if (Number.isFinite(sec) && sec >= 0) return sec * 1000;
  return 30_000;
}

/**
 * @template T
 * @param {string} key
 * @param {() => Promise<T>} loader
 * @returns {Promise<T>}
 */
export async function withSanityMemoryCache(key, loader) {
  const ttl = ttlMs();
  if (ttl === 0) return loader();

  const now = Date.now();
  const hit = store.get(key);
  if (hit && now - hit.at < ttl) {
    return hit.value;
  }

  const value = await loader();
  store.set(key, { at: Date.now(), value });
  return value;
}

export function clearSanityMemoryCache() {
  store.clear();
}
