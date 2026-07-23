import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Sanity Studio',
  robots: { index: false, follow: false },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

function studioSrc(tool) {
  const origin = (process.env.SANITY_STUDIO_DEV_ORIGIN || '')
    .trim()
    .replace(/\/$/, '');
  if (!origin) return null;

  const segments = Array.isArray(tool) ? tool.filter(Boolean) : [];
  const path =
    segments.length === 0 ? '/admin/' : `/admin/${segments.join('/')}/`;
  return `${origin}${path}`;
}

/**
 * Local only: iframe → cms `npm run dev` (SANITY_STUDIO_DEV_ORIGIN).
 * Production: set SANITY_STUDIO_ORIGIN — middleware proxies /admin → hosted Studio.
 */
export default async function AdminStudioDevPage({ params }) {
  const { tool } = await params;
  const src = studioSrc(tool);

  if (!src) {
    notFound();
  }

  return (
    <iframe
      title="Sanity Studio"
      src={src}
      className="fixed inset-0 h-[100dvh] w-screen border-0 bg-[#101112]"
      allow="clipboard-read; clipboard-write"
    />
  );
}
