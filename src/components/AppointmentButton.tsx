import { CalendarDays, ExternalLink } from "lucide-react";
import { umamiAttrs } from "@/lib/track";

const BOOKING_URL = "https://cal.meetergo.com/anthony/30min";

export function AppointmentButton() {
  return (
    <div className="space-y-3">
      <a
        href={BOOKING_URL}
        {...umamiAttrs("appointment-click", { place: "contact" })}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary w-full py-3 md:py-4 gap-1 md:gap-2 text-center flex-wrap focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        aria-label="Réserver un appel de 30 minutes"
      >
        <CalendarDays size={16} className="md:w-4.5 md:h-4.5 shrink-0" aria-hidden="true" />
        <span>Réserver un appel de 30 minutes</span>
        <ExternalLink size={14} className="md:w-4 md:h-4 shrink-0 hidden md:inline" aria-hidden="true" />
      </a>

      <p className="text-sm leading-relaxed text-muted text-center">
        Appel de 30 minutes, sans engagement.
      </p>
    </div>
  );
}
