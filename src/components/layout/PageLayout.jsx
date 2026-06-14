import Image from 'next/image';
import Footer from './Footer';
import SiteHeader from './SiteHeader';

const BACKGROUND_IMAGE =
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2400&auto=format&fit=crop';

export default function PageLayout({ children }) {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-premium-black text-white font-sans">
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <Image
          src={BACKGROUND_IMAGE}
          alt=""
          fill
          priority={false}
          quality={40}
          sizes="100vw"
          className="object-cover opacity-[0.32]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-premium-black/0 via-premium-black/35 to-premium-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(212,175,55,0.18),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.14),transparent_50%)]" />
      </div>

      <div className="relative z-10 overflow-x-clip">
        <SiteHeader />
        <main className="w-full max-w-full pb-16">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
