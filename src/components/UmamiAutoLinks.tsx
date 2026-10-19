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

/** Public form id only. Query string is dropped (it can carry a token). */
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

/**
 * One click listener for unmarked tel, mailto, contact and Tally links
 * (article Markdown or Payload HTML). Marked links are left to Umami.
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
