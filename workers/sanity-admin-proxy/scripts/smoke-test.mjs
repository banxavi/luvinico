#!/usr/bin/env node
/**
 * Smoke-test Sanity Studio upstream + optional proxy.
 *
 * Usage:
 *   node scripts/smoke-test.mjs https://YOUR.sanity.studio
 *   PROXY_BASE=http://localhost:8787 node scripts/smoke-test.mjs http://localhost:3333
 */

import { fileURLToPath } from 'node:url';

const paths = ['/admin/'];
const optionalAssetPath = '/admin/static/';

async function check(label, url) {
  const optional = label.includes('(optional)');
  let res;
  try {
    res = await fetch(url, { redirect: 'manual' });
  } catch (err) {
    const code = err?.cause?.code || err?.code;
    console.log(`FAIL ${label}: fetch failed (${code || err.message})`);
    console.log(`  URL: ${url}`);
    return optional;
  }
  const ok = res.status >= 200 && res.status < 400;
  const type = res.headers.get('content-type') || '';
  const tag = ok ? 'OK' : optional ? 'SKIP' : 'FAIL';
  console.log(`${tag} ${label}: ${res.status} ${type.split(';')[0]}`);
  if (!ok && !optional) {
    const body = (await res.text()).slice(0, 200);
    console.log(`  ${body.replace(/\s+/g, ' ')}`);
  }
  return optional ? true : ok;
}

/**
 * @param {{ studioOrigin?: string, proxyBase?: string, strictAssets?: boolean }} opts
 * @returns {Promise<number>} exit code
 */
export async function runSmokeTest(opts = {}) {
  const studioOrigin = (opts.studioOrigin ?? '').replace(/\/$/, '');
  const proxyBase = (opts.proxyBase ?? '').replace(/\/$/, '');
  const strictAssets = opts.strictAssets ?? process.env.SMOKE_STRICT_ASSETS === '1';

  if (!studioOrigin && !proxyBase) {
    console.error('Pass studioOrigin and/or proxyBase');
    return 1;
  }

  let failed = 0;

  if (studioOrigin) {
    for (const p of paths) {
      if (!(await check(`upstream ${p}`, studioOrigin + p))) failed += 1;
    }
    if (strictAssets) {
      if (!(await check(`upstream ${optionalAssetPath}`, studioOrigin + optionalAssetPath))) {
        failed += 1;
      }
    } else {
      await check(`upstream ${optionalAssetPath} (optional)`, studioOrigin + optionalAssetPath);
    }
    const desk = studioOrigin + '/admin/desk';
    if (!(await check('upstream deep path', desk))) failed += 1;
  }

  if (proxyBase) {
    for (const p of paths) {
      if (!(await check(`proxy ${p}`, proxyBase + p))) failed += 1;
    }
    if (strictAssets) {
      if (!(await check(`proxy ${optionalAssetPath}`, proxyBase + optionalAssetPath))) {
        failed += 1;
      }
    } else {
      await check(`proxy ${optionalAssetPath} (optional)`, proxyBase + optionalAssetPath);
    }
    try {
      const cache = await fetch(proxyBase + '/admin/', { redirect: 'manual' });
      const cc = cache.headers.get('cache-control') || '';
      const cacheOk = /no-store|private/i.test(cc);
      console.log(`${cacheOk ? 'OK' : 'WARN'} proxy Cache-Control: ${cc || '(empty)'}`);
      if (!cacheOk) failed += 1;
    } catch (err) {
      console.log(`FAIL proxy cache check: ${err.message}`);
      failed += 1;
    }
  }

  return failed > 0 ? 1 : 0;
}

async function cliMain() {
  const studioOrigin = (process.argv[2] || process.env.STUDIO_ORIGIN || '').replace(
    /\/$/,
    '',
  );
  const proxyBase = (process.env.PROXY_BASE || '').replace(/\/$/, '');
  const code = await runSmokeTest({ studioOrigin, proxyBase });
  process.exit(code);
}

const isCli = process.argv[1] === fileURLToPath(import.meta.url);
if (isCli) {
  cliMain().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
