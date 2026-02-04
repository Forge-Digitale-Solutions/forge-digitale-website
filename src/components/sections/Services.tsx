"use client";

import { motion } from "framer-motion";
import {
  Monitor,
  Wrench,
  Code2,
  Smartphone,
  ShieldCheck,
  Cpu,
} from "lucide-react";

const services = [
  {
    title: "Création Web & Applications",
    description:
      "Sites vitrines ultra-rapides et applications métiers pour artisans et PME du Médoc.",
    price: "À partir de 1500€",
    icon: <Code2 className="w-6 h-6 text-dark-base" />,
    bgIcon: "bg-[#C5A059]",
    colSpan: "md:col-span-2",
    features: ["Next.js & React", "SEO Optimisé", "Design Sur Mesure"],
  },
  {
    title: "Maintenance Web",
    description:
      "Hébergement, sécurité et mises à jour mensuelles. Dormez tranquille.",
    price: "49€ / mois",
    icon: <ShieldCheck className="w-6 h-6 text-[#C5A059]" />,
    bgIcon: "bg-[#C5A059]/10",
    colSpan: "md:col-span-1",
    features: ["Sauvegardes", "Monitoring 24/7"],
  },
  {
    title: "Montage PC Sur Mesure",
    description:
      "Conception et assemblage minutieux de votre machine de guerre ou de travail.",
    price: "Forfait 150€",
    icon: <Cpu className="w-6 h-6 text-[#C5A059]" />,
    bgIcon: "bg-[#C5A059]/10",
    colSpan: "md:col-span-1",
    features: ["Cable Management", "Optimisation BIOS", "Tests Stress"],
  },
  {
    title: "Seconde Vie & Linux",
    description:
      "Ne jetez pas votre vieux PC. On le nettoie et on installe un système léger.",
    price: "Forfait 70€",
    icon: <Wrench className="w-6 h-6 text-dark-base" />,
    bgIcon: "bg-[#C5A059]",
    colSpan: "md:col-span-2",
    features: ["Nettoyage complet", "Installation Linux Mint", "Formation 1h"],
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-[#C5A059]/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Des solutions forgées pour{" "}
            <span className="text-gold-gradient">durer.</span>
          </h2>
          <p className="text-slate-400">
            Une expertise technique pointue au service de votre activité et de
            votre matériel. Pas de jargon, juste des résultats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
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
      </div>
    </section>
  );
}
