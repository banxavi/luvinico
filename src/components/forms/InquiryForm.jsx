"use client";

import { useMemo, useState } from "react";
import { buildMailtoHref, buildZaloHref } from "../../lib/links";
import Image from "next/image";
import Link from "next/link";

const DEFAULT_TO_EMAIL = "info@example.com";
const HOTLINE = "0907566279";

export default function InquiryForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const mailtoHref = useMemo(() => {
    const subject = "Beer Premium - Yêu cầu tư vấn";
    const body = [
      `Tên: ${name || "-"}`,
      `Số điện thoại: ${phone || "-"}`,
      "",
      "Nội dung:",
      message || "-",
    ].join("\n");
    return buildMailtoHref({ to: DEFAULT_TO_EMAIL, subject, body });
  }, [name, phone, message]);

  return (
    <div className="rounded-2xl border border-white/10 bg-premium-dark p-5">
      <div className="text-sm font-semibold text-premium-gold">
        Gửi yêu cầu tư vấn
      </div>
      <p className="mt-2 text-sm text-white/70">
        Form này xử lý hoàn toàn client-side. Bạn có thể gửi qua email hoặc nhắn
        Zalo để được phản hồi nhanh.
      </p>

      <div className="mt-5 grid gap-3">
        <label className="grid gap-1">
          <span className="text-xs text-white/60">Tên</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 rounded-md border border-white/10 bg-premium-black px-3 text-sm outline-none focus:border-premium-gold/60"
            placeholder="Ví dụ: Minh"
            autoComplete="name"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-xs text-white/60">Số điện thoại</span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-11 rounded-md border border-white/10 bg-premium-black px-3 text-sm outline-none focus:border-premium-gold/60"
            placeholder="Ví dụ: 09xx..."
            inputMode="tel"
            autoComplete="tel"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-xs text-white/60">Nội dung</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-28 rounded-md border border-white/10 bg-premium-black px-3 py-2 text-sm outline-none focus:border-premium-gold/60"
            placeholder="Bạn muốn tư vấn theo khẩu vị, độ cồn, hoặc dịp tặng?"
          />
        </label>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Link
          href={buildZaloHref(HOTLINE)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#007bff] font-semibold text-white shadow-lg shadow-black/30 ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:bg-[#006ae0] hover:shadow-black/40 active:translate-y-0"
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
          href={mailtoHref}
          className="inline-flex h-11 items-center justify-center rounded-md border border-premium-gold/60 bg-premium-black/45 font-semibold text-premium-gold shadow-lg shadow-black/20 ring-1 ring-premium-gold/15 transition hover:-translate-y-0.5 hover:border-premium-gold/80 hover:bg-premium-black/55 hover:shadow-black/30 active:translate-y-0"
        >
          Gửi email
        </Link>
      </div>

      <p className="mt-4 text-xs text-white/50">
        Sản phẩm không dành cho người dưới 18 tuổi và phụ nữ mang thai.
      </p>
    </div>
  );
}
