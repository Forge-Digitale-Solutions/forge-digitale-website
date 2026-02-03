"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">(
    "idle",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setTimeout(() => setFormState("success"), 1500);
  };

  return (
    <section id="contact" className="py-24 bg-[#020617] relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Parlons de votre{" "}
                <span className="text-gold-gradient">projet.</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Vous avez un vieux PC à rénover ? Besoin d&rsquo;un site web
                pour votre activité ? Ou simplement une question technique ?
                <br />
                <br />
                Je suis basé à Saint-Laurent-Médoc et je réponds généralement
                sous 24h.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#C5A059]/30 transition-colors">
                <div className="bg-[#C5A059]/10 p-3 rounded-xl text-[#C5A059]">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">
                    Téléphone
                  </p>
                  <a
                    href="tel:+33645569696"
                    className="text-white font-medium hover:text-[#C5A059] transition-colors text-lg"
                  >
                    06 45 65 96 96
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#C5A059]/30 transition-colors">
                <div className="bg-[#C5A059]/10 p-3 rounded-xl text-[#C5A059]">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">
                    Email
                  </p>
                  <a
                    href="mailto:contact@forgedigitalesolutions.com"
                    className="text-white font-medium hover:text-[#C5A059] transition-colors text-lg"
                  >
                    contact@forgedigitalesolutions.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#C5A059]/30 transition-colors">
                <div className="bg-[#C5A059]/10 p-3 rounded-xl text-[#C5A059]">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">
                    Atelier
                  </p>
                  <p className="text-white font-medium text-lg">
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
            {formState === "success" ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                  <Send size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Message envoyé !
                </h3>
                <p className="text-slate-400">
                  Je reviens vers vous très rapidement.
                </p>
                <button
                  onClick={() => setFormState("idle")}
                  className="mt-6 text-[#C5A059] hover:text-white text-sm font-medium underline underline-offset-4"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-slate-300"
                    >
                      Nom
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#C5A059] transition-colors"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium text-slate-300"
                    >
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#C5A059] transition-colors"
                      placeholder="06..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-300"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#C5A059] transition-colors"
                    placeholder="vous@exemple.com"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium text-slate-300"
                  >
                    Sujet
                  </label>
                  <select
                    id="subject"
                    className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5A059] transition-colors appearance-none"
                  >
                    <option>Demande de Devis Web</option>
                    <option>Montage PC</option>
                    <option>Dépannage / Maintenance</option>
                    <option>Autre</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-slate-300"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#C5A059] transition-colors resize-none"
                    placeholder="Décrivez brièvement votre besoin..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={formState === "submitting"}
                  className="w-full bg-[#C5A059] hover:bg-[#D4B475] text-[#020617] font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {formState === "submitting" ? (
                    "Envoi en cours..."
                  ) : (
                    <>
                      Envoyer ma demande
                      <ArrowRight size={18} />
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
