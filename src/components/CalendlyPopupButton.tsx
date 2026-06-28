"use client";

import Script from "next/script";
import { CalendarDays, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

const CALENDLY_URL = "https://calendly.com/forgedigitalesolutions/30min";
const CALENDLY_SCRIPT_ID = "calendly-widget-script";
const CALENDLY_CSS_ID = "calendly-widget-css";
const CALENDLY_CSS_HREF =
  "https://assets.calendly.com/assets/external/widget.css";
const CALENDLY_SCRIPT_SRC =
  "https://assets.calendly.com/assets/external/widget.js";

export function CalendlyPopupButton() {
  const [isWidgetReady, setIsWidgetReady] = useState(
    () => typeof window !== "undefined" && Boolean(window.Calendly),
  );

  useEffect(() => {
    if (!document.getElementById(CALENDLY_CSS_ID)) {
      const link = document.createElement("link");
      link.id = CALENDLY_CSS_ID;
      link.rel = "stylesheet";
      link.href = CALENDLY_CSS_HREF;
      document.head.appendChild(link);
    }
  }, []);

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!window.Calendly) {
      return;
    }

    event.preventDefault();
    window.Calendly.initPopupWidget({ url: CALENDLY_URL });
  }

  return (
    <>
      <Script
        id={CALENDLY_SCRIPT_ID}
        src={CALENDLY_SCRIPT_SRC}
        strategy="lazyOnload"
        onLoad={() => setIsWidgetReady(true)}
      />

      <div className="space-y-3">
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="btn-primary w-full py-3 md:py-4 gap-1 md:gap-2 text-center flex-wrap focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          aria-label="Réserver un appel de 30 minutes"
        >
          <CalendarDays size={16} className="md:w-4.5 md:h-4.5 shrink-0" aria-hidden="true" />
          <span>
            {isWidgetReady
              ? "Réserver un appel de 30 minutes"
              : "Ouvrir le calendrier de rendez-vous"}
          </span>
          <ExternalLink size={14} className="md:w-4 md:h-4 shrink-0 hidden md:inline" aria-hidden="true" />
        </a>

        <p className="text-sm leading-relaxed text-muted text-center">
          Appel de 30 minutes, sans engagement. Si le widget ne se charge pas
          encore, le lien ouvre directement Calendly.
        </p>
      </div>
    </>
  );
}
