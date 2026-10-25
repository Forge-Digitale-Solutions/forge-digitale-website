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

function isGrillaHref(href: string): boolean {
  let url: URL;
  try {
    url = new URL(href, window.location.origin);
  } catch {
    return false;
  }
  const host = url.hostname.toLowerCase();
  return host === "grilla.fr" || host.endsWith(".grilla.fr");
}

function blogArticleSlug(): string | null {
  const parts = window.location.pathname.split("/").filter(Boolean);
  if (parts[0] !== "blog" || !parts[1]) return null;
  return parts[1];
}

function tallyForm(href: string): string | null {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return null;
  }
  const host = url.hostname.toLowerCase();
  if (host !== "tally.so" && !host.endsWith(".tally.so")) return null;
  return url.pathname.split("/").filter(Boolean).pop() ?? "form";
}

export function UmamiAutoLinks() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      if (!link || link.hasAttribute("data-umami-event")) return;
      const href = link.getAttribute("href");
      if (!href) return;
      if (isGrillaHref(href)) {
        const slug = blogArticleSlug();
        if (slug) track("grilla-click", { slug });
        return;
      }
      const form = tallyForm(href);
      if (form) {
        track("tally-click", { form });
        return;
      }
      const name = eventFor(href);
      if (!name) return;
      track(name, { place: "content" });
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
