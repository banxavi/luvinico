#!/usr/bin/env node
/**
 * Smoke test local stack: cms dev (3333) + wrangler dev (8787).
 */

import net from 'node:net';
import { runSmokeTest } from './smoke-test.mjs';

const UPSTREAM = process.env.SMOKE_UPSTREAM || 'http://localhost:3333';
const PROXY = process.env.SMOKE_PROXY || 'http://localhost:8787';

function parseHostPort(baseUrl) {
  const u = new URL(baseUrl);
  return {
    host: u.hostname,
    port: u.port ? Number(u.port) : u.protocol === 'https:' ? 443 : 80,
  };
}

function portOpen(host, port, timeoutMs = 1500) {
  return new Promise((resolve) => {
    const socket = net.connect({ host, port });
    const finish = (ok) => {
      socket.removeAllListeners();
      socket.destroy();
      setImmediate(() => resolve(ok));
    };
    socket.setTimeout(timeoutMs);
    socket.once('connect', () => finish(true));
    socket.once('timeout', () => finish(false));
    socket.once('error', () => finish(false));
  });
}

async function requireServers() {
  const upstream = parseHostPort(UPSTREAM);
  const proxy = parseHostPort(PROXY);

  const upOk = await portOpen(upstream.host, upstream.port);
  if (!upOk) {
    console.error(
      `\n✗ Không kết nối được Studio upstream (${UPSTREAM}).\n` +
        '  Terminal 1: cd cms && npm run dev\n' +
        '  Sau đó mở http://localhost:3333/admin/ trên trình duyệt.\n',
    );
    process.exit(1);
  }

  const proxyOk = await portOpen(proxy.host, proxy.port);
  if (!proxyOk) {
    console.error(
      `\n✗ Không kết nối được proxy Worker (${PROXY}).\n` +
        '  Terminal 2: cd workers/sanity-admin-proxy && npm run dev:local\n' +
        '  (cần file .dev.vars với STUDIO_ORIGIN=http://localhost:3333)\n',
    );
    process.exit(1);
  }
}

await requireServers();

console.info(`Upstream: ${UPSTREAM}  |  Proxy: ${PROXY}\n`);

const code = await runSmokeTest({
  studioOrigin: UPSTREAM,
  proxyBase: PROXY,
});

process.exit(code);
