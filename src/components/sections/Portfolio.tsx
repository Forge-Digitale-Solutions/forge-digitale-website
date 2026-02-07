"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    title: "Forge Digitale (Ce site)",
    category: "Site Vitrine",
    description:
      "La preuve par l'exemple : un site ultra-rapide, pensé pour le référencement local et doté d'une identité visuelle forte.",
    tags: ["Chargement Instantané", "Design Unique", "Optimisé Google"],
    image: "/projects/forge.jpg",
    imageAlt:
      "Capture d'écran du site web Forge Digitale Solutions avec design moderne et identité visuelle dorée",
    gradient: "from-[#C5A059]/20 to-slate-900",
    link: "#",
  },
  {
    title: "GoSportNow (En cours)",
    category: "Application Mobile",
    description:
      "Plateforme de mise en relation pour sportifs. Une interface fluide et simple pour gérer des profils et des événements en temps réel.",
    tags: ["Application Mobile", "Compte Utilisateur", "Carte Interactive"],
    image: "/projects/gosportnow.png",
    imageAlt:
      "Maquette de l'application mobile GoSportNow montrant l'interface de mise en relation pour sportifs",
    gradient: "from-blue-900/40 to-slate-900",
    link: "#",
  },
  {
    title: "Atelier Hardware",
    category: "Montage PC",
    description:
      "Assemblage manuel de précision. Cable Management et ventilation optimisée pour un silence total.",
    tags: ["Silencieux", "Performance", "Esthétique Soignée"],
    image: "/projects/pc.jpg",
    imageAlt:
      "Photo d'un PC sur mesure assemblé avec soin, montrant le cable management et les composants",
    gradient: "from-purple-900/40 to-slate-900",
    link: "#contact",
  },
];

export function Portfolio() {
  return (
    <section
      id="realisations"
      className="py-24 bg-dark-base relative"
      aria-labelledby="portfolio-heading"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2
              id="portfolio-heading"
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Réalisations <span className="text-gold-gradient">récentes.</span>
            </h2>
            <p className="text-slate-300">
              Du développement web au montage hardware : voici des exemples
              concrets de mon savoir-faire.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group rounded-3xl bg-white/5 border border-white/5 overflow-hidden hover:border-[#C5A059]/30 transition-colors duration-300 flex flex-col h-full"
            >
              <div
                className={`h-48 w-full bg-linear-to-br ${project.gradient} relative overflow-hidden`}
              >
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />

                {/* TODO: Décommenter quand les pages projets seront créées */}
                {/* <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link
                    href={project.link}
                    aria-label={`Voir le projet ${project.title}`}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold text-sm hover:bg-[#C5A059] hover:text-white focus-visible:bg-[#C5A059] focus-visible:text-white focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 transition-colors shadow-xl"
                  >
                    Voir le projet <ExternalLink size={16} aria-hidden="true" />
                  </Link>
                </div> */}
              </div>

              <div className="p-6 flex flex-col grow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[#C5A059] text-xs font-bold uppercase tracking-wider mb-2 block">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#C5A059] transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <p className="text-slate-300 text-sm mb-6 grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium text-slate-300 bg-white/5 px-3 py-1 rounded-full border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
