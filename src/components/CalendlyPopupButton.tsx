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
          className="w-full bg-[#C5A059] hover:bg-[#D4B475] focus-visible:bg-[#D4B475] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 text-dark-base font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 text-center"
          aria-label="Réserver un appel de 30 minutes"
        >
          <CalendarDays size={18} aria-hidden="true" />
          <span>
            {isWidgetReady
              ? "Réserver un appel de 30 minutes"
              : "Ouvrir le calendrier de rendez-vous"}
          </span>
          <ExternalLink size={16} aria-hidden="true" />
        </a>

        <p className="text-sm leading-relaxed text-slate-400 text-center">
          Appel de 30 minutes, sans engagement. Si le widget ne se charge pas
          encore, le lien ouvre directement Calendly.
        </p>
      </div>
    </>
  );
}
