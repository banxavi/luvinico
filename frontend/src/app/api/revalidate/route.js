// import { revalidateTag } from 'next/cache'; // disabled until OpenNext KV/D1 tag cache is configured
import { NextResponse } from 'next/server';
import { getRevalidationTargets } from '../../../lib/sanity/revalidateFromDoc';
import { verifySanityWebhook } from '../../../lib/sanity/verifyWebhook';
import { clearSanityMemoryCache } from '../../../lib/sanity/memoryCache';

export const dynamic = 'force-dynamic';

/** Wait for Sanity CDN to catch up before revalidating (ms). */
const CDN_WAIT_MS = 500;

export async function POST(request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { message: 'SANITY_REVALIDATE_SECRET is not configured' },
      { status: 503 },
    );
  }

  const rawBody = await request.text();
  const signature = request.headers.get('sanity-webhook-signature');

  if (!verifySanityWebhook(rawBody, signature, secret)) {
    return NextResponse.json({ message: 'Invalid webhook signature' }, { status: 401 });
  }

  if (CDN_WAIT_MS > 0) {
    await new Promise((resolve) => setTimeout(resolve, CDN_WAIT_MS));
  }

  let doc;
  try {
    doc = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });
  }

  const { tags } = getRevalidationTargets(doc);

  console.info('[sanity-webhook] received', {
    type: doc?._type ?? null,
    id: doc?._id ?? null,
    tags,
  });

  // Drop isolate memory TTL so next request refetches Sanity.
  clearSanityMemoryCache();

  // for (const tag of tags) {
  //   revalidateTag(tag);
  // }

  return NextResponse.json({
    revalidated: true,
    memoryCacheCleared: true,
    type: doc?._type ?? null,
    tags,
    at: Date.now(),
  });
}

export function GET() {
  return NextResponse.json(
    { message: 'Sanity revalidate webhook — POST only' },
    { status: 405 },
  );
}
