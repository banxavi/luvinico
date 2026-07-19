import Image from 'next/image';

import Footer from './Footer';

import SiteHeader from './SiteHeader';

import backgroundImage from '../../assets/Upload_12_July/1920x1080_new.webp';

import { SiteDataProvider } from '../../context/SiteDataContext';

import { getCatalog } from '../../lib/sanity/catalogStore';

import { getProducts } from '../../lib/sanity/productStore';



export default async function PageLayout({ children }) {

  const [products, catalog] = await Promise.all([getProducts(), getCatalog()]);



  return (

    <SiteDataProvider products={products} catalog={catalog}>

      <div className="relative min-h-screen bg-premium-black text-white font-sans">

        <div aria-hidden className="pointer-events-none fixed inset-0 z-0">

          <Image

            src={backgroundImage}

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



        <div className="relative z-10">

          <SiteHeader />

          <div className="overflow-x-clip">

            <main className="w-full max-w-full">{children}</main>

            <Footer />

          </div>

        </div>

      </div>

    </SiteDataProvider>

  );

}


