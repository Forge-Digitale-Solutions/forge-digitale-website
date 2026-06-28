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
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-px active:translate-y-px z-40"
      aria-label="Contacter sur WhatsApp"
      title="Contacter sur WhatsApp"
    >
      <Image
        src="/whatsapp-color-svgrepo-com.svg"
        alt="WhatsApp"
        width={56}
        height={56}
        priority
      />
    </a>
  );
}
