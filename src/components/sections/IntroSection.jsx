import Link from "next/link";

export default function IntroSection() {
  return (
    <section className="pt-10">
      <div className="rounded-2xl border border-white/10 bg-premium-dark p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-premium-gold/25 bg-premium-black/40 px-3 py-1 text-xs text-white/80">
          <span className="h-1.5 w-1.5 rounded-full bg-premium-gold" />
          Premium Imported Beer
        </div>

        <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">
          Bia nhập khẩu cao cấp — hương vị đậm, hậu vị sang
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/75 sm:text-base">
          Bộ sưu tập bia chọn lọc theo tiêu chí chất lượng, nguồn gốc rõ ràng và trải nghiệm thưởng thức trọn vẹn.
        </p>

        <div className="mt-6">
          <Link
            href="#products"
            className="inline-flex h-11 items-center justify-center rounded-md bg-premium-gold px-5 font-semibold text-premium-black shadow-lg shadow-black/30 ring-1 ring-premium-gold/30 hover:bg-yellow-600"
          >
            Xem sản phẩm
          </Li>
        </div>
      </div>
    </section>
  );
}

