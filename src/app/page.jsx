import HeroSection from '../components/sections/HeroSection';
import BrandStorySection from '../components/sections/BrandStorySection';
import UspSection from '../components/sections/UspSection';
import BestSellersSection from '../components/sections/BestSellersSection';
import ValueDealsSection from '../components/sections/ValueDealsSection';
import SectionBackdrop from '../components/ui/SectionBackdrop';
import HomeScrollHandler from './HomeScrollHandler';
import { createPageMetadata } from '../lib/seo';

const homeTitle = 'Rượu vang nhập khẩu & Bia craft cao cấp';

export const metadata = createPageMetadata({
  title: homeTitle,
  description: 'Khám phá bộ sưu tập rượu vang tuyển chọn, bia nhập khẩu thượng hạng và set quà tặng Tết tinh tế tại LUVINI & CO. Giao hàng nhanh, tư vấn chuyên nghiệp.',
  keywords: 'rượu vang, bia nhập khẩu, bia bỉ, bia craft, quà tết, luvini',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    description: 'Bộ sưu tập rượu vang tuyển chọn, bia nhập khẩu thượng hạng và set quà tặng Tết tinh tế tại LUVINI & CO.',
    type: 'website',
  },
});

export default function HomePage() {
  return (
    <>
      <HomeScrollHandler />
      <SectionBackdrop sectionKey="hero">
        <HeroSection />
      </SectionBackdrop>
      <div className="site-container">
        <SectionBackdrop sectionKey="products">
          <BestSellersSection />
        </SectionBackdrop>
        <SectionBackdrop sectionKey="valueDeals">
          <ValueDealsSection />
        </SectionBackdrop>
        <SectionBackdrop sectionKey="story">
          <BrandStorySection />
        </SectionBackdrop>
        <SectionBackdrop sectionKey="usp">
          <UspSection />
        </SectionBackdrop>
      </div>
    </>
  );
}
