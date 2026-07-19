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
    <div className="flex min-w-0 items-center gap-2 sm:gap-2.5">
      <Image
        src={logoImg}
        alt=""
        className="h-9 w-9 shrink-0 self-center rounded-full object-cover ring-1 ring-brand-amber/25 sm:h-10 sm:w-10"
        width={48}
        height={48}
        loading="eager"
      />
      <div className="flex min-w-0 flex-col justify-center">
        <div className="brand-wordmark brand-logo-gradient truncate text-[0.9rem] font-semibold uppercase leading-none tracking-[0.06em] sm:text-[1.05rem]">
          {BRAND.name}
        </div>
        <p className="mt-0.5 hidden truncate text-[10px] leading-none text-white/90 sm:block sm:mt-1 sm:text-[11px]">
          {BRAND.subtitle}
        </p>
      </div>
    </div>
  );
}
