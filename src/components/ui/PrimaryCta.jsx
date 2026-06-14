import Link from "next/link";

const baseClass =
  "inline-flex min-h-11 items-center justify-center rounded-md bg-brand-amber px-6 py-3 text-base font-semibold text-premium-black shadow-lg shadow-black/30 ring-1 ring-brand-amber/40 transition hover:-translate-y-0.5 hover:bg-[#e0ad2a] hover:shadow-black/40 active:translate-y-0";

export default function PrimaryCta({
  href = "#products",
  label = "Khám phá bộ sưu tập",
  className = "",
  onClick,
}) {
  const isHashLink = href.startsWith("#");
  const linkHref = isHashLink ? `/${href}` : href;

  if (isHashLink) {
    return (
      <Link
        href={linkHref}
        onClick={onClick}
        className={`${baseClass} ${className}`.trim()}
      >
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={linkHref}
      onClick={onClick}
      className={`${baseClass} ${className}`.trim()}
    >
      {label}
    </Link>
  );
}
