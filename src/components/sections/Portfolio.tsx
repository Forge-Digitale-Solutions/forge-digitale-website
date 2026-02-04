"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "Artisan du Médoc",
    category: "Site Vitrine",
    description:
      "Conception complète de l'identité visuelle et du site web pour un ébéniste local. Performance score: 100/100.",
    tags: ["Next.js", "Tailwind", "SEO"],
    image: "/projects/project1.jpg",
    gradient: "from-blue-900 to-slate-900",
    link: "#",
    github: "#",
  },
  {
    title: "Médoc Vins Prestige",
    category: "E-Commerce",
    description:
      "Plateforme de vente en ligne avec gestion de stock et paiement sécurisé Stripe.",
    tags: ["React", "Stripe", "Node.js"],
    image: "/projects/project2.jpg",
    gradient: "from-[#C5A059]/20 to-slate-900",
    link: "#",
    github: "#",
  },
  {
    title: "Gestion Atelier",
    category: "App Métier",
    description:
      "Application interne pour la gestion des réparations et du suivi client (CRM simplifié).",
    tags: ["TypeScript", "Supabase", "Dashboard"],
    image: "/projects/project3.jpg",
    gradient: "from-purple-900 to-slate-900",
    link: "#",
    github: "#",
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-dark-base relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Réalisations <span className="text-gold-gradient">récentes.</span>
            </h2>
            <p className="text-slate-400">
              Chaque projet est une opportunité de créer de la valeur. Voici
              quelques exemples de solutions déployées.
            </p>
          </div>

          <Link
            href="https://github.com"
            target="_blank"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-[#C5A059] hover:text-white transition-colors"
          >
            <Github size={16} />
            Voir plus de code sur GitHub
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-3xl bg-white/5 border border-white/5 overflow-hidden hover:border-[#C5A059]/30 transition-all duration-300 flex flex-col h-full"
            >
              <div
                className={`h-48 w-full bg-linear-to-br ${project.gradient} relative overflow-hidden group-hover:scale-105 transition-transform duration-500`}
              >
                {/* Picture later when available */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 text-4xl font-bold text-white/20">
                  Projet {index + 1}
                </div>

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <Link
                    href={project.link}
                    className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
                    title="Voir le site"
                  >
                    <ExternalLink size={20} />
                  </Link>
                  <Link
                    href={project.github}
                    className="p-3 bg-dark-base text-white border border-white/20 rounded-full hover:scale-110 transition-transform"
                    title="Voir le code"
                  >
                    <Github size={20} />
                  </Link>
                </div>
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

                <p className="text-slate-400 text-sm mb-6 grow">
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
