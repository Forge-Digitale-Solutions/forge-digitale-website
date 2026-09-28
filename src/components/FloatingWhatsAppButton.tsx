"use client";

import Image from "next/image";
import { useEffect } from "react";

const WHATSAPP_NUMBER = "33645659696";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

function whatsAppUrl(message?: string) {
  const text = message?.trim();
  if (!text) return WHATSAPP_URL;
  return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
}

type ModelContextLike = {
  registerTool: (
    tool: {
      name: string;
      title: string;
      description: string;
      inputSchema: Record<string, unknown>;
      annotations: { consequentialHint: boolean; readOnlyHint: boolean };
      execute: (args: { message?: string }) => Promise<string>;
    },
    options?: { signal?: AbortSignal },
  ) => Promise<unknown>;
};

function modelContext(): ModelContextLike | null {
  const doc = document as Document & { modelContext?: ModelContextLike };
  const nav = navigator as Navigator & { modelContext?: ModelContextLike };
  const ctx = doc.modelContext ?? nav.modelContext;
  if (!ctx || typeof ctx.registerTool !== "function") return null;
  return ctx;
}

export function FloatingWhatsAppButton() {
  useEffect(() => {
    const ctx = modelContext();
    if (!ctx) return;
    const controller = new AbortController();

    void ctx
      .registerTool(
        {
          name: "open_whatsapp",
          title: "Ouvrir WhatsApp",
          description:
            "Ouvre la conversation WhatsApp de Forge Digitale Solutions (06 45 65 96 96). Si un message est fourni, il est prérempli. Le visiteur doit encore appuyer sur envoyer dans WhatsApp.",
          annotations: { consequentialHint: false, readOnlyHint: false },
          inputSchema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                description: "Texte prérempli, écrit par le visiteur",
              },
            },
            additionalProperties: false,
          },
          execute: async ({ message }) => {
            const url = whatsAppUrl(message);
            const opened = window.open(url, "_blank", "noopener,noreferrer");
            if (!opened) return `Fenêtre bloquée. Lien : ${url}`;
            return message?.trim()
              ? "WhatsApp est ouvert avec le message prérempli. Le visiteur doit l'envoyer."
              : "WhatsApp est ouvert. Le visiteur écrit et envoie le message.";
          },
        },
        { signal: controller.signal },
      )
      .catch(() => {});

    return () => controller.abort();
  }, []);

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
