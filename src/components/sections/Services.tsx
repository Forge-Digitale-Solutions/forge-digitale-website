"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section";
import { Wrench, Code2, ShieldCheck, Cpu } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Création Web & Applications",
    description:
      "Solutions web performantes et développement d'outils métiers pour les professionnels du Médoc.",
    price: "À partir de 800€",
    href: "/creation-site-web",
    icon: <Code2 className="w-6 h-6 text-on-accent" aria-hidden="true" />,
    bgIcon: "bg-accent",
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
    href: "/maintenance-site-web",
    icon: <ShieldCheck className="w-6 h-6 text-accent" aria-hidden="true" />,
    bgIcon: "bg-accent/10",
    colSpan: "md:col-span-1",
    features: ["Hébergement & Domaine", "Support & Mises à jour"],
  },
  {
    title: "Montage PC Sur Mesure",
    description:
      "Travail, Gaming ou Familial : je définis avec vous la configuration idéale, 100% adaptée à votre besoin et votre budget.",
    price: "Forfait 149€",
    href: "/montage-pc",
    badge: "Offre de Lancement 🚀",
    icon: <Cpu className="w-6 h-6 text-accent" aria-hidden="true" />,
    bgIcon: "bg-accent/10",
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
    href: "/installation-linux",
    badge: "Tarif 2026 ✨",
    icon: <Wrench className="w-6 h-6 text-on-accent" aria-hidden="true" />,
    bgIcon: "bg-accent",
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
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16">
          <SectionHeading
            index="01"
            eyebrow="Services"
            titleId="services-heading"
            title={
              <>
                Des solutions forgées pour{" "}
                <span className="text-accent">durer.</span>
              </>
            }
            description="Une expertise technique pointue au service de votre activité et de votre matériel. Des solutions claires et durables."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`
                ${service.colSpan}
                group relative p-8 rounded-xl
                bg-surface-card border border-default hover:border-strong
                transition-all duration-300 overflow-hidden
                flex flex-col
              `}
            >
              <div
                className={`w-12 h-12 rounded-lg ${service.bgIcon} flex items-center justify-center mb-6`}
              >
                {service.icon}
              </div>

              <h3 className="text-xl font-bold text-text-strong mb-2">
                {service.title}
              </h3>
              <p className="text-muted text-sm mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-xs text-faint font-medium uppercase tracking-wide"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent" />
                    {feature}
                  </li>
                ))}
              </ul>

              {service.href && (
                <Link
                  href={service.href}
                  className="relative z-10 inline-flex items-center gap-1 text-sm text-accent hover:text-accent-strong font-medium mb-4 transition-colors"
                >
                  En savoir plus
                  <svg
                    width="14"
                    height="14"
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
              )}

              <div className="mt-auto text-right">
                {service.badge && (
                  <span className="inline-block bg-accent/10 text-accent text-[10px] font-bold px-2 py-0.5 rounded-md mb-1 border border-accent-line">
                    {service.badge}
                  </span>
                )}
                <div className="text-lg font-bold text-accent">
                  {service.price}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-soft mb-6">
            Des questions sur mes services ?{" "}
            <span className="text-text-strong font-medium">
              Consultez ma FAQ pour tout savoir sur mes méthodes de travail.
            </span>
          </p>
          <Link
            href="/#faq"
            aria-label="Consulter la foire aux questions"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-strong font-medium transition-colors"
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
