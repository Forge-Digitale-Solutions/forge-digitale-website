"use client";

import { motion } from "framer-motion";
import { Wrench, Code2, ShieldCheck, Cpu } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Création Web & Applications",
    description:
      "Solutions web performantes et développement d'outils métiers pour les professionnels du Médoc.",
    price: "Devis Gratuit",
    icon: <Code2 className="w-6 h-6 text-dark-base" aria-hidden="true" />,
    bgIcon: "bg-[#C5A059]",
    colSpan: "md:col-span-2",
    features: [
      "Performance & Vitesse",
      "Référencement & Visibilité",
      "Design Sur Mesure",
    ],
  },
  {
    title: "Gestion & Suivi",
    description:
      "Votre site clé en main : hébergement, nom de domaine et maintenance inclus. Concentrez-vous sur votre activité.",
    price: "Sur devis",
    icon: <ShieldCheck className="w-6 h-6 text-[#C5A059]" aria-hidden="true" />,
    bgIcon: "bg-[#C5A059]/10",
    colSpan: "md:col-span-1",
    features: ["Hébergement & Domaine", "Support & Mises à jour"],
  },
  {
    title: "Montage PC Sur Mesure",
    description:
      "Travail, Gaming ou Familial : je définis avec vous la configuration idéale, 100% adaptée à votre besoin et votre budget.",
    price: "Forfait 149€",
    icon: <Cpu className="w-6 h-6 text-[#C5A059]" aria-hidden="true" />,
    bgIcon: "bg-[#C5A059]/10",
    colSpan: "md:col-span-1",
    features: [
      "Conseil & Choix des pièces",
      "Montage soigné",
      "Installation système",
      "Remise et prise en main",
    ],
  },
  {
    title: "Forfait Renaissance : Seconde Vie",
    description:
      "Votre ordinateur est lent ? Ne le jetez pas. Je le nettoie et j'installe un système léger pour lui redonner sa rapidité.",
    price: "Forfait 69€",
    icon: <Wrench className="w-6 h-6 text-dark-base" aria-hidden="true" />,
    bgIcon: "bg-[#C5A059]",
    colSpan: "md:col-span-2",
    features: [
      "Nettoyage complet",
      "Installation Linux simple",
      "Prise en main 1h comprise",
      "Mise à jour de sécurité",
      "Approche économique et écologique",
    ],
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="py-24 relative overflow-hidden"
      aria-labelledby="services-heading"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-[#C5A059]/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2
            id="services-heading"
            className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight"
          >
            Des solutions forgées pour{" "}
            <span className="text-gold-gradient">durer.</span>
          </h2>
          <p className="text-slate-300">
            Une expertise technique pointue au service de votre activité et de
            votre matériel. Des solutions claires et durables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`
                ${service.colSpan} 
                group relative p-8 rounded-3xl 
                bg-dark-base border border-white/5 hover:border-[#C5A059]/30 
                transition-all duration-300 overflow-hidden
              `}
            >
              <div className="absolute inset-0 bg-linear-to-br from-[#C5A059]/0 via-[#C5A059]/0 to-[#C5A059]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div
                className={`w-12 h-12 rounded-2xl ${service.bgIcon} flex items-center justify-center mb-6`}
              >
                {service.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                {service.title}
              </h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2 mb-8">
                {service.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-xs text-slate-500 font-medium uppercase tracking-wide"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C5A059]" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="absolute bottom-8 right-8">
                <span className="text-lg font-bold text-[#C5A059]">
                  {service.price}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-slate-300 mb-6">
            Des questions sur mes services ?{" "}
            <span className="text-white font-medium">
              Consultez ma FAQ pour tout savoir sur mes méthodes de travail.
            </span>
          </p>
          <Link
            href="/#faq"
            aria-label="Consulter la foire aux questions"
            className="inline-flex items-center gap-2 text-[#C5A059] hover:text-[#D4B475] font-medium transition-colors"
          >
            Voir la FAQ
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
