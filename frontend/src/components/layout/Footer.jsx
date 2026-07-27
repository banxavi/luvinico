import Link from 'next/link';
import Image from 'next/image';
import { BRAND } from '../../data/brand';
import { FOOTER } from '../../data/footer';
import { formatPhoneDisplay } from '../../lib/formatters';
import { buildTelHref } from '../../lib/links';
import { getSiteSettings } from '../../lib/sanity/siteSettingsStore';
import BrandMark from './BrandMark';
import FooterLink from './FooterLink';

function FooterHeading({ children }) {
  return <h3 className="footer-heading">{children}</h3>;
}

export default async function Footer() {
  const footer = await getSiteSettings();

  return (
    <footer className="mt-16 border-t border-white/10 bg-premium-black">
      <div className="site-container py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <BrandMark variant="footer" iconSrc={footer.faviconUrl} />
            <div className="mt-8">
              <FooterHeading>Thông tin liên hệ</FooterHeading>
              <div className="mt-4 space-y-2 text-sm leading-relaxed text-body-muted">
                <p className="font-semibold text-white/90">{BRAND.name}</p>
                <p>Địa chỉ: {footer.address}</p>
                <p>
                  Hotline:{' '}
                  <Link
                    href={buildTelHref(footer.hotline)}
                    className="font-semibold text-brand-amber transition hover:text-white"
                  >
                    {formatPhoneDisplay(footer.hotline)}
                  </Link>
                </p>
                <p>
                  Facebook:{' '}
                  <Link
                    href={footer.facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand-amber transition hover:text-white"
                  >
                    {FOOTER.facebookLabel}
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div>
            <FooterHeading>Lưu ý</FooterHeading>
            <p className="mt-4 text-sm leading-relaxed text-body-muted">
              {footer.disclaimer}
            </p>
          </div>

          <div>
            <FooterHeading>Chính sách chung</FooterHeading>
            <ul className="mt-4 space-y-2.5">
              {FOOTER.policies.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <div>
              <FooterHeading>LUVINI & CO.</FooterHeading>
              <div className="mt-4 text-sm leading-relaxed text-body-muted">
                {footer.regulatoryNote}
              </div>
            </div>

            <div>
              <FooterHeading>Khuyến cáo</FooterHeading>
              <p className="mt-4 text-sm leading-relaxed text-body-muted">
                {footer.warning}
              </p>

              <div className="footer-warning-image mt-4 max-w-4/5 m-auto">
                <Image
                  src={footer.warningImageUrl}
                  alt={footer.warningImageAlt}
                  width={300}
                  height={119}
                  className="footer-warning-image__asset"
                  sizes="(max-width: 640px) 42vw, 300px"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-body-subtle">
          © {BRAND.name} All rights reserved.
        </div>
      </div>
    </footer>
  );
}
