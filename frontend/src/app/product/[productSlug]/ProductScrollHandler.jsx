"use client";

import { useEffect } from "react";
import { scrollToTop } from "../../../lib/scroll";

export default function ProductScrollHandler({ slug }) {
  useEffect(() => {
    scrollToTop({ behavior: "smooth" });
  }, [slug]);

  return null;
}
