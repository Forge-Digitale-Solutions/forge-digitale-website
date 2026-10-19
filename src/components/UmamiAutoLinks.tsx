"use client";

import { useEffect } from "react";
import { track, type UmamiEvent } from "@/lib/track";

function eventFor(href: string): UmamiEvent | null {
  if (href.startsWith("tel:")) return "phone-click";
  if (href.startsWith("mailto:")) return "email-click";
  if (
    href === "#contact" ||
    href === "/#contact" ||
    href.endsWith("/#contact")
  ) {
    return "quote-click";
  }
  return null;
}

/**
 * One click listener for tel, mailto and contact links that are not
 * already marked (article Markdown). Marked links are left to Umami.
 */
export function UmamiAutoLinks() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      if (!link || link.hasAttribute("data-umami-event")) return;
      const href = link.getAttribute("href");
      if (!href) return;
      const name = eventFor(href);
      if (!name) return;
      track(name, { place: "content" });
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
