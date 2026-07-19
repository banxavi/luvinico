import Link from "next/link";

const collections = [
  { title: "Bỉ", desc: "Đậm malt · hậu vị mượt", href: "#products" },
  { title: "Đức", desc: "Cân bằng · thơm lúa mạch", href: "#products" },
  { title: "Anh", desc: "Hậu vị rõ · dễ pairing", href: "#products" },
];

export default function CollectionsSection() {
  return (
    <section className="pt-12">
      <div>
        <div className="text-xs font-semibold tracking-normal text-premium-gold">
          GỢI Ý
        </div>
        <h2 className="mt-2 text-2xl font-semibold">Xuất xứ nổi bật</h2>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {collections.map((c) => (
          <Link
            key={c.title}
            href={c.href}
            className="group rounded-2xl border border-white/10 bg-premium-dark p-5 hover:border-premium-gold/60"
          >
            <div className="text-lg font-semibold text-white/95">{c.title}</div>
            <div className="mt-2 text-sm text-white/70">{c.desc}</div>
            <div className="mt-4 text-xs font-semibold tracking-normal text-premium-gold">
              XEM NGAY →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
