import { NextResponse } from 'next/server';

import {
  getHostedStudioOrigin,
  proxyHostedStudio,
  shouldProxyStudioPath,
} from './lib/sanity/studioHostedProxy';

/**
 * Keep the `middleware` file convention (Edge), not `proxy`.
 * Next.js 16 `proxy.js` defaults to Node.js runtime, which
 * @opennextjs/cloudflare does not support yet.
 * See: https://github.com/opennextjs/opennextjs-cloudflare/issues/962
 */
export async function middleware(request) {
  if (!getHostedStudioOrigin()) {
    return NextResponse.next();
  }

  if (!shouldProxyStudioPath(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const proxied = await proxyHostedStudio(request);
  return proxied ?? NextResponse.next();
}

export const config = {
  matcher: [
    '/admin',
    '/admin/:path*',
    '/static/:path*',
    '/favicons/:path*',
  ],
};
