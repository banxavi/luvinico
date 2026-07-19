import { buildTelHref, buildZaloHref } from "../../lib/links";
import { formatPhoneDisplay } from "../../lib/formatters";
import FadeInSection from "../ui/FadeInSection";
import Image from "next/image";
import Link from "next/link";

const HOTLINE = "0907566279";

export default function QuickActionsSection() {
  return (
    <FadeInSection className="pt-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href={buildZaloHref(HOTLINE)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#007bff] px-5 font-semibold text-white shadow-lg shadow-black/30 ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:bg-[#006ae0] hover:shadow-black/40 active:translate-y-0"
        >
          <Image
            className="icon"
            src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
            alt="Zalo"
            loading="lazy"
          />
          Zalo
        </Link>
        <Link
          href={buildTelHref(HOTLINE)}
          className="inline-flex h-11 items-center justify-center rounded-md bg-[#9B1321] px-5 font-semibold text-white shadow-lg shadow-black/30 ring-1 ring-white/15 transition hover:-translate-y-0.5 hover:bg-[#82101b] hover:shadow-black/40 active:translate-y-0"
        >
          Gọi {formatPhoneDisplay(HOTLINE)}
        </Link>
      </div>
    </FadeInSection>
  );
}
