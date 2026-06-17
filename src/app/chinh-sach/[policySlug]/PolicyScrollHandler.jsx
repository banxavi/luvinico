"use client";

import { useEffect } from "react";
import { scrollToTop } from "../../../lib/scroll";

export default function PolicyScrollHandler({ policySlug }) {
  useEffect(() => {
    scrollToTop();
  }, [policySlug]);

  return null;
}
