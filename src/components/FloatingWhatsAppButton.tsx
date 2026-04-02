"use client";

import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "33645659696";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function FloatingWhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] hover:bg-[#1FAE51] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110 active:scale-95 z-40"
      aria-label="Contacter sur WhatsApp"
      title="Contacter sur WhatsApp"
    >
      <MessageCircle size={24} className="text-white" aria-hidden="true" />
    </a>
  );
}
