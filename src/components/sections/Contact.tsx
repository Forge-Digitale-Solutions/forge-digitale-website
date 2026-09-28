"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CalendlyPopupButton } from "@/components/CalendlyPopupButton";

const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CONTACT_SERVICES = [
  "Demande de Devis Web",
  "Montage PC",
  "Dépannage / Maintenance",
  "Autre demande",
] as const;

type ContactService = (typeof CONTACT_SERVICES)[number];

type ContactFields = {
  name: string;
  email: string;
  phone: string;
  message: string;
  company?: string;
  service?: string;
};

type FieldErrors = { email?: string; phone?: string };

type ModelContextLike = {
  registerTool: (
    tool: {
      name: string;
      title: string;
      description: string;
      inputSchema: Record<string, unknown>;
      annotations: { consequentialHint: boolean; readOnlyHint: boolean };
      execute: (
        args: ContactFields,
        ctx?: { signal?: AbortSignal },
      ) => Promise<string>;
    },
    options?: { signal?: AbortSignal },
  ) => Promise<unknown>;
};

function modelContext(): ModelContextLike | null {
  const doc = document as Document & { modelContext?: ModelContextLike };
  const nav = navigator as Navigator & { modelContext?: ModelContextLike };
  // ponytail: navigator.modelContext is the pre-Chrome 150 path
  const ctx = doc.modelContext ?? nav.modelContext;
  if (!ctx || typeof ctx.registerTool !== "function") return null;
  return ctx;
}

function fieldErrors(fields: ContactFields): FieldErrors {
  const errors: FieldErrors = {};
  if (!emailRegex.test(fields.email.trim())) {
    errors.email = "Veuillez saisir une adresse e-mail valide.";
  }
  if (!phoneRegex.test(fields.phone.trim())) {
    errors.phone =
      "Veuillez saisir un numéro valide, par exemple 06 12 34 56 78.";
  }
  return errors;
}

function fillContactForm(fields: ContactFields) {
  const form = document.getElementById("contact-form");
  if (!(form instanceof HTMLFormElement)) return;
  const values: Record<string, string> = {
    name: fields.name,
    email: fields.email,
    phone: fields.phone,
    message: fields.message,
    company: fields.company ?? "",
    service: fields.service ?? "",
  };
  for (const [name, value] of Object.entries(values)) {
    const el = form.elements.namedItem(name);
    if (
      el instanceof HTMLInputElement ||
      el instanceof HTMLTextAreaElement ||
      el instanceof HTMLSelectElement
    ) {
      el.value = value;
    }
  }
}

async function postContact(
  fields: ContactFields,
  signal?: AbortSignal,
): Promise<{ ok: boolean; message: string }> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return {
      ok: false,
      message: "Le formulaire n'est pas configuré. Écrivez à contact@forgedigitalesolutions.com.",
    };
  }

  const formData = new FormData();
  formData.set("access_key", accessKey);
  formData.set("subject", "Nouveau contact - Site Web La Forge");
  formData.set("from_name", "Site Web");
  formData.set("name", fields.name.trim());
  formData.set("email", fields.email.trim());
  formData.set("phone", fields.phone.trim());
  formData.set("message", fields.message.trim());
  if (fields.company?.trim()) formData.set("company", fields.company.trim());
  if (fields.service?.trim()) formData.set("service", fields.service.trim());

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData,
    signal,
  });
  const data = (await response.json()) as { success?: boolean; message?: string };

  if (data.success) {
    return {
      ok: true,
      message: "Message bien reçu. Je vous recontacte sous 24 heures.",
    };
  }
  return {
    ok: false,
    message: data.message || "Une erreur technique a empêché l'envoi du message.",
  };
}

export function Contact() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [resultMessage, setResultMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const pending = useRef(false);

  useEffect(() => {
    const ctx = modelContext();
    if (!ctx) return;
    const controller = new AbortController();

    void ctx
      .registerTool(
        {
          name: "submit_contact",
          title: "Envoyer le formulaire de contact",
          description:
            "Envoie une demande de devis ou d'intervention à Anthony Marcelin (Forge Digitale Solutions) via le formulaire de la page d'accueil. Utiliser uniquement les coordonnées données par le visiteur. L'envoi est réel : le navigateur doit demander confirmation.",
          annotations: { consequentialHint: true, readOnlyHint: false },
          inputSchema: {
            type: "object",
            properties: {
              name: { type: "string", description: "Nom du visiteur" },
              email: { type: "string", description: "E-mail du visiteur" },
              phone: {
                type: "string",
                description: "Téléphone français, par exemple 06 12 34 56 78",
              },
              company: {
                type: "string",
                description: "Société, si le visiteur en a une",
              },
              service: {
                type: "string",
                enum: [...CONTACT_SERVICES],
                description: "Sujet de la demande",
              },
              message: { type: "string", description: "Besoin décrit par le visiteur" },
            },
            required: ["name", "email", "phone", "message"],
            additionalProperties: false,
          },
          execute: async (args, toolCtx) => {
            if (pending.current) return "Envoi déjà en cours.";
            const fields: ContactFields = {
              name: args.name ?? "",
              email: args.email ?? "",
              phone: args.phone ?? "",
              message: args.message ?? "",
              company: args.company,
              service: args.service,
            };
            if (!fields.name.trim() || !fields.message.trim()) {
              return "Nom et message sont obligatoires.";
            }
            if (
              fields.service &&
              !CONTACT_SERVICES.includes(fields.service as ContactService)
            ) {
              return `Sujet inconnu. Choisir parmi : ${CONTACT_SERVICES.join(", ")}.`;
            }
            const invalid = fieldErrors(fields);
            fillContactForm(fields);
            if (Object.keys(invalid).length > 0) {
              setErrors(invalid);
              setStatus("idle");
              return Object.values(invalid).join(" ");
            }

            pending.current = true;
            setErrors({});
            setStatus("submitting");
            try {
              const result = await postContact(fields, toolCtx?.signal);
              if (result.ok) {
                setStatus("success");
                setResultMessage(result.message);
                const form = document.getElementById("contact-form");
                if (form instanceof HTMLFormElement) form.reset();
              } else {
                setStatus("error");
                setResultMessage(result.message);
              }
              return result.message;
            } catch (error) {
              if (error instanceof DOMException && error.name === "AbortError") {
                setStatus("idle");
                return "Envoi annulé.";
              }
              const message =
                "La connexion a échoué. Merci de réessayer dans un instant.";
              setStatus("error");
              setResultMessage(message);
              return message;
            } finally {
              pending.current = false;
            }
          },
        },
        { signal: controller.signal },
      )
      .catch(() => {});

    return () => controller.abort();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending.current) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const fields: ContactFields = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      message: String(formData.get("message") ?? ""),
      company: String(formData.get("company") ?? ""),
      service: String(formData.get("service") ?? ""),
    };
    const invalid = fieldErrors(fields);
    if (Object.keys(invalid).length > 0) {
      setErrors(invalid);
      setStatus("idle");
      return;
    }

    pending.current = true;
    setErrors({});
    setStatus("submitting");
    try {
      const result = await postContact(fields);
      if (result.ok) {
        setStatus("success");
        setResultMessage(result.message);
        form.reset();
      } else {
        setStatus("error");
        setResultMessage(result.message);
      }
    } catch {
      setStatus("error");
      setResultMessage(
        "La connexion a échoué. Merci de réessayer dans un instant.",
      );
    } finally {
      pending.current = false;
    }
  }

  return (
    <section
      id="contact"
      className="py-24 bg-bg relative"
      aria-labelledby="contact-heading"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-default to-transparent" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <SectionHeading
              index="06"
              eyebrow="Contact"
              align="left"
              titleId="contact-heading"
              title={
                <>
                  Parlons de votre <span className="text-accent">projet.</span>
                </>
              }
              description={
                <>
                  Un projet web ? Un PC à monter ou une seconde vie à donner à
                  votre matériel ? Je suis disponible et réactif.
                </>
              }
            />

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-surface-card border border-default">
                <div
                  className="bg-accent/10 p-3 rounded-md text-accent shrink-0"
                  aria-hidden="true"
                >
                  <Phone size={24} />
                </div>
                <div className="break-words-custom">
                  <p className="text-sm text-faint font-medium uppercase tracking-wide">
                    Téléphone
                  </p>
                  <a
                    href="tel:+33645659696"
                    className="text-text-strong hover:text-accent transition-colors text-lg font-medium"
                  >
                    06 45 65 96 96
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-surface-card border border-default">
                <div
                  className="bg-accent/10 p-3 rounded-md text-accent shrink-0"
                  aria-hidden="true"
                >
                  <Mail size={24} />
                </div>
                <div className="break-words-custom w-full">
                  <p className="text-sm text-faint font-medium uppercase tracking-wide">
                    Email
                  </p>
                  <a
                    href="mailto:contact@forgedigitalesolutions.com"
                    className="text-text-strong hover:text-accent transition-colors text-lg font-medium break-all block"
                  >
                    contact@forgedigitalesolutions.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-surface-card border border-default">
                <div
                  className="bg-accent/10 p-3 rounded-md text-accent shrink-0"
                  aria-hidden="true"
                >
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-faint font-medium uppercase tracking-wide">
                    Zone
                  </p>
                  <p className="text-text-strong text-lg font-medium">
                    Saint-Laurent-Médoc (33112)
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-lg border border-default bg-surface-card p-5 space-y-4"
              aria-labelledby="contact-rdv-heading"
            >
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-default" />
                <span
                  id="contact-rdv-heading"
                  className="text-muted text-sm font-medium"
                >
                  Prendre rendez-vous directement
                </span>
                <div className="flex-1 h-px bg-default" />
              </div>

              <p className="text-sm leading-relaxed text-muted text-center">
                Pour un échange rapide sur votre demande de site, votre
                maintenance ou votre configuration PC, choisissez un créneau qui
                vous convient.
              </p>

              <CalendlyPopupButton />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-surface-card p-8 rounded-xl border border-default backdrop-blur-sm"
          >
            {status === "success" ? (
              <div
                className="h-full min-h-100 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-300"
                role="status"
                aria-live="polite"
              >
                <div
                  className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mb-2"
                  aria-hidden="true"
                >
                  <CheckCircle size={40} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text-strong mb-2">
                    Message envoyé !
                  </h3>
                  <p className="text-muted max-w-xs mx-auto">
                    Merci. Je vous recontacte très rapidement.
                  </p>
                </div>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-accent hover:text-text-strong text-sm font-medium underline underline-offset-4 transition-colors"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="hidden"
                  name="access_key"
                  value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY}
                />

                <input
                  type="hidden"
                  name="subject"
                  value="Nouveau contact - Site Web La Forge"
                />
                <input type="hidden" name="from_name" value="Site Web" />
                <input
                  type="checkbox"
                  name="botcheck"
                  aria-label="Bot verification field"
                  className="hidden"
                  style={{ display: "none" }}
                  tabIndex={-1}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-soft"
                    >
                      Nom *
                    </label>
                    <input
                      name="name"
                      id="name"
                      type="text"
                      required
                      placeholder="Votre nom"
                      className="w-full bg-surface-raised border border-default rounded-md px-4 py-3 text-text-strong focus:outline-none focus:border-accent transition-colors placeholder:text-faint"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="company"
                      className="text-sm font-medium text-soft"
                    >
                      Société{" "}
                      <span className="text-faint text-xs">
                        (Optionnel)
                      </span>
                    </label>
                    <input
                      name="company"
                      id="company"
                      type="text"
                      placeholder="Nom de l'entreprise"
                      className="w-full bg-surface-raised border border-default rounded-md px-4 py-3 text-text-strong focus:outline-none focus:border-accent transition-colors placeholder:text-faint"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-soft"
                    >
                      Email *
                    </label>
                    <input
                      name="email"
                      id="email"
                      type="email"
                      required
                      placeholder="vous@exemple.com"
                      className={`w-full bg-surface-raised border rounded-md px-4 py-3 text-text-strong focus:outline-none transition-colors placeholder:text-faint ${errors.email ? "border-danger focus:border-danger" : "border-default focus:border-accent"}`}
                    />
                    {errors.email && (
                      <p
                        className="text-danger text-xs mt-1"
                        role="alert"
                        aria-live="polite"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium text-soft"
                    >
                      Téléphone *
                    </label>
                    <input
                      name="phone"
                      id="phone"
                      type="tel"
                      required
                      placeholder="06..."
                      className={`w-full bg-surface-raised border rounded-md px-4 py-3 text-text-strong focus:outline-none transition-colors placeholder:text-faint ${errors.phone ? "border-danger focus:border-danger" : "border-default focus:border-accent"}`}
                    />
                    {errors.phone && (
                      <p
                        className="text-danger text-xs mt-1"
                        role="alert"
                        aria-live="polite"
                      >
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="service-select"
                    className="text-sm font-medium text-soft"
                  >
                    Sujet
                  </label>
                  <div className="relative">
                    <select
                      name="service"
                      id="service-select"
                      defaultValue=""
                      className="w-full bg-surface-raised border border-default rounded-md px-4 py-3 text-text-strong focus:outline-none focus:border-accent appearance-none cursor-pointer"
                    >
                      <option value="" disabled>
                        Sélectionnez un sujet
                      </option>
                      {CONTACT_SERVICES.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-faint">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-soft"
                  >
                    Message *
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    required
                    rows={4}
                    placeholder="Décrivez votre besoin..."
                    className="w-full bg-surface-raised border border-default rounded-md px-4 py-3 text-text-strong focus:outline-none focus:border-accent resize-none placeholder:text-faint"
                  />
                </div>

                {status === "error" && (
                  <div
                    className="flex items-center gap-2 text-danger text-sm bg-danger/10 p-3 rounded-md border border-danger/20"
                    role="alert"
                    aria-live="assertive"
                  >
                    <AlertCircle size={16} aria-hidden="true" />
                    <span>{resultMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  aria-busy={status === "submitting"}
                  className="btn-primary w-full py-4 gap-2 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2
                        className="animate-spin"
                        size={20}
                        aria-hidden="true"
                      />{" "}
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer ma demande{" "}
                      <ArrowRight size={18} aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
