"use client";

import Image from "next/image";

const WHATSAPP_NUMBER = "33645659696";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function FloatingWhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full shadow-lg transition-all hover:-translate-y-px hover:shadow-xl active:translate-y-px max-sm:bottom-3 max-sm:right-3 max-sm:h-11 max-sm:w-11"
      aria-label="Contacter sur WhatsApp"
      title="Contacter sur WhatsApp"
    >
      <Image
        src="/whatsapp-color-svgrepo-com.svg"
        alt="WhatsApp"
        width={56}
        height={56}
        className="size-full"
        priority
      />
    </a>
  );
}
