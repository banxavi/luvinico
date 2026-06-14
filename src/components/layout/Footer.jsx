import Link from "next/link";
import { BRAND } from "../../data/brand";
import { FOOTER } from "../../data/footer";
import { formatPhoneDisplay } from "../../lib/formatters";
import { buildTelHref } from "../../lib/links";
import BrandMark from "./BrandMark";

function FooterHeading({ children }) {
  return <h3 className="footer-heading">{children}</h3>;
}

function FooterLink({ href, children }) {
  const isInternal = href.startsWith("/") && !href.startsWith("//");

  if (isInternal) {
    return (
      <Link
        href={href}
        className="text-sm text-body-muted transition hover:text-brand-amber"
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="text-sm text-body-muted transition hover:text-brand-amber"
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-premium-black">
      <div className="site-container py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <BrandMark variant="footer" />
            <div className="mt-8">
              <FooterHeading>Thông tin liên hệ</FooterHeading>
              <div className="mt-4 space-y-2 text-sm leading-relaxed text-body-muted">
                <p className="font-semibold text-white/90">{BRAND.name}</p>
                <p>Địa chỉ: {FOOTER.address}</p>
                <p>
                  Hotline:{" "}
                  <Link
                    href={buildTelHref(BRAND.hotline)}
                    className="font-semibold text-brand-amber transition hover:text-white"
                  >
                    {formatPhoneDisplay(BRAND.hotline)}
                  </Link>
                </p>
                <p>
                  Facebook:{" "}
                  <Link
                    href={BRAND.facebook}
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
              {FOOTER.disclaimer}
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
              <FooterHeading>{FOOTER.facebookLabel}</FooterHeading>
              <div className="mt-4 space-y-2 text-sm leading-relaxed text-body-muted">
                <p>{FOOTER.company.legalName}</p>
                <p>{FOOTER.company.businessLicense}</p>
                <p>{FOOTER.company.alcoholLicense}</p>
                <p>{FOOTER.company.representative}</p>
              </div>
            </div>

            <div>
              <FooterHeading>Khuyến cáo</FooterHeading>
              <p className="mt-4 text-sm leading-relaxed text-body-muted">
                {FOOTER.warning}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-body-subtle">
          © {new Date().getFullYear()} {BRAND.name} All rights reserved.
        </div>
      </div>
    </footer>
  );
}
