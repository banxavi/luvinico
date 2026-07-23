import { NextResponse } from 'next/server';

import {
  getHostedStudioOrigin,
  proxyHostedStudio,
  shouldProxyStudioPath,
} from './lib/sanity/studioHostedProxy';

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
