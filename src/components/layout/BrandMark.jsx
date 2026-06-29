import { BRAND } from "../../data/brand";
import logoImg from "../../assets/logo/new_logo.webp.png";
import Image from "next/image";

export default function BrandMark({ variant = "header" }) {
  if (variant === "footer") {
    return (
      <div className="flex items-center gap-3 sm:gap-4">
        <Image
          src={logoImg}
          alt=""
          className="h-12 w-12 shrink-0 rounded-full object-cover ring-1 ring-brand-amber/25 sm:h-14 sm:w-14"
          width={56}
          height={56}
          loading="lazy"
        />
        <p className="font-serif text-base italic text-white/90 sm:text-lg">
          &ldquo;{BRAND.tagline}&rdquo;
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
      <Image
        src={logoImg}
        alt=""
        className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-brand-amber/25 sm:h-12 sm:w-12"
        width={48}
        height={48}
        loading="eager"
      />
      <div className="min-w-0">
        <div className="brand-wordmark brand-logo-gradient truncate text-[1.05rem] font-semibold uppercase leading-none tracking-[0.08em] sm:text-xl">
          {BRAND.name}
        </div>
        <p className="mt-1 truncate text-[10px] leading-snug text-white/90 sm:text-[13px]">
          {BRAND.subtitle}
        </p>
      </div>
    </div>
  );
}
