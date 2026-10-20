"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/track";

export function ArticleReadMarker({ slug }: { slug: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let sent = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (sent || !entries.some((entry) => entry.isIntersecting)) return;
        sent = true;
        track("article-read", { slug });
        observer.disconnect();
      },
      { threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [slug]);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute top-[75%] left-0 h-px w-px"
    />
  );
}
