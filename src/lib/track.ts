export const UMAMI_EVENTS = [
  "contact-submit",
  "phone-click",
  "email-click",
  "quote-click",
  "appointment-click",
  "whatsapp-click",
  "newsletter-submit",
  "tool-click",
  "article-read",
  "project-click",
  "reviews-click",
  "faq-open",
  "tally-click",
] as const;

export type UmamiEvent = (typeof UMAMI_EVENTS)[number];

type UmamiTracker = {
  track: (event: string, data?: Record<string, string | number>) => void;
};

declare global {
  interface Window {
    umami?: UmamiTracker;
  }
}

export function track(
  event: UmamiEvent,
  data?: Record<string, string | number>,
): void {
  if (typeof window === "undefined") return;
  const tracker = window.umami;
  if (!tracker || typeof tracker.track !== "function") return;
  try {
    if (data) tracker.track(event, data);
    else tracker.track(event);
  } catch {
    return;
  }
}

/** Umami records a click on data-umami-event. No extra listener. */
export function umamiAttrs(
  event: UmamiEvent,
  data?: Record<string, string | number>,
): Record<string, string> {
  const attrs: Record<string, string> = { "data-umami-event": event };
  if (!data) return attrs;
  for (const [key, value] of Object.entries(data)) {
    attrs[`data-umami-event-${key}`] = String(value);
  }
  return attrs;
}
