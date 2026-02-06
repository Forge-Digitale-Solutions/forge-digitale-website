"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [resultMessage, setResultMessage] = useState("");
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});

  const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const newErrors: { email?: string; phone?: string } = {};

    if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email address.";
    }

    if (phone && !phoneRegex.test(phone)) {
      newErrors.phone = "Invalid phone number (ex: 06 12 34 56 78).";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStatus("idle");
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setResultMessage("Message received! I'll get back to you within 24h.");
        form.reset();
      } else {
        setStatus("error");
        setResultMessage(data.message || "Technical error.");
      }
    } catch {
      setStatus("error");
      setResultMessage("Connection failed.");
    }
  }

  return (
    <section
      id="contact"
      className="py-24 bg-dark-base relative"
      aria-labelledby="contact-heading"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2
                id="contact-heading"
                className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance"
              >
                Parlons de votre <span className="text-[#C5A059]">projet.</span>
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                Un projet web ? Un PC à monter ou une seconde vie à donner à
                votre matériel ?
                <br />
                Je suis disponible et réactif.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div
                  className="bg-[#C5A059]/10 p-3 rounded-xl text-[#C5A059] shrink-0"
                  aria-hidden="true"
                >
                  <Phone size={24} />
                </div>
                <div className="break-words-custom">
                  <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">
                    Téléphone
                  </p>
                  <a
                    href="tel:+33645659696"
                    className="text-white hover:text-[#C5A059] transition-colors text-lg font-medium"
                  >
                    06 45 65 96 96
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div
                  className="bg-[#C5A059]/10 p-3 rounded-xl text-[#C5A059] shrink-0"
                  aria-hidden="true"
                >
                  <Mail size={24} />
                </div>
                <div className="break-words-custom w-full">
                  <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">
                    Email
                  </p>
                  <a
                    href="mailto:contact@forgedigitalesolutions.com"
                    className="text-white hover:text-[#C5A059] transition-colors text-lg font-medium break-all block"
                  >
                    contact@forgedigitalesolutions.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div
                  className="bg-[#C5A059]/10 p-3 rounded-xl text-[#C5A059] shrink-0"
                  aria-hidden="true"
                >
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">
                    Atelier
                  </p>
                  <p className="text-white text-lg font-medium">
                    Saint-Laurent-Médoc (33112)
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm"
          >
            {status === "success" ? (
              <div
                className="h-full min-h-100 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-300"
                role="status"
                aria-live="polite"
              >
                <div
                  className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-2"
                  aria-hidden="true"
                >
                  <CheckCircle size={40} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Message envoyé !
                  </h3>
                  <p className="text-slate-400 max-w-xs mx-auto">
                    Merci. Je vous recontacte très rapidement.
                  </p>
                </div>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-[#C5A059] hover:text-white text-sm font-medium underline underline-offset-4 transition-colors"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="hidden"
                  name="access_key"
                  value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY}
                />
                {/* ------------------------- */}

                <input
                  type="hidden"
                  name="subject"
                  value="Nouveau contact - Site Web La Forge"
                />
                <input type="hidden" name="from_name" value="Site Web" />
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: "none" }}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-slate-300"
                    >
                      Nom *
                    </label>
                    <input
                      name="name"
                      id="name"
                      type="text"
                      required
                      placeholder="Votre nom"
                      className="w-full bg-dark-base border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059] transition-colors placeholder:text-slate-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="company"
                      className="text-sm font-medium text-slate-300"
                    >
                      Société{" "}
                      <span className="text-slate-600 text-xs">
                        (Optionnel)
                      </span>
                    </label>
                    <input
                      name="company"
                      id="company"
                      type="text"
                      placeholder="Nom de l'entreprise"
                      className="w-full bg-dark-base border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059] transition-colors placeholder:text-slate-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-slate-300"
                    >
                      Email *
                    </label>
                    <input
                      name="email"
                      id="email"
                      type="email"
                      required
                      placeholder="vous@exemple.com"
                      className={`w-full bg-dark-base border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors placeholder:text-slate-600 ${errors.email ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-[#C5A059]"}`}
                    />
                    {errors.email && (
                      <p
                        className="text-red-400 text-xs mt-1"
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
                      className="text-sm font-medium text-slate-300"
                    >
                      Téléphone *
                    </label>
                    <input
                      name="phone"
                      id="phone"
                      type="tel"
                      required
                      placeholder="06..."
                      className={`w-full bg-dark-base border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors placeholder:text-slate-600 ${errors.phone ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-[#C5A059]"}`}
                    />
                    {errors.phone && (
                      <p
                        className="text-red-400 text-xs mt-1"
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
                    className="text-sm font-medium text-slate-300"
                  >
                    Sujet
                  </label>
                  <div className="relative">
                    <select
                      name="service"
                      id="service-select"
                      className="w-full bg-dark-base border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059] appearance-none cursor-pointer"
                    >
                      <option>Demande de Devis Web</option>
                      <option>Montage PC</option>
                      <option>Dépannage / Maintenance</option>
                      <option>Autre demande</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
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
                    className="text-sm font-medium text-slate-300"
                  >
                    Message *
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    required
                    rows={4}
                    placeholder="Décrivez votre besoin..."
                    className="w-full bg-dark-base border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059] resize-none placeholder:text-slate-600"
                  />
                </div>

                {status === "error" && (
                  <div
                    className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20"
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
                  className="w-full bg-[#C5A059] hover:bg-[#D4B475] focus-visible:bg-[#D4B475] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 text-dark-base font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
