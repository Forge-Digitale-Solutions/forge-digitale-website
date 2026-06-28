"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    title: "Forge Digitale",
    category: "Site Vitrine",
    description:
      "La preuve par l'exemple : un site ultra-rapide, pensé pour le référencement local et doté d'une identité visuelle forte.",
    tags: ["Chargement Instantané", "Design Unique", "Optimisé Google"],
    image: "/projects/forge.webp",
    imageAlt:
      "Capture d'écran du site web Forge Digitale Solutions avec design moderne et identité visuelle dorée",
    link: "#",
  },
  {
    title: "GoSportNow",
    category: "Application Mobile",
    description:
      "Application de mise en relation pour sportifs pour iOs et Android. Design moderne, interface intuitive et fonctionnalités sur-mesure pour les passionnés de sport.",
    tags: ["Application Mobile", "Compte Utilisateur", "Carte Interactive"],
    image: "/projects/gosportnow-og.webp",
    imageAlt:
      "Maquette de l'application mobile GoSportNow montrant l'interface de mise en relation pour sportifs",
    link: "https://gosportnow.fr",
  },
  {
    title: "Atelier Hardware",
    category: "Montage PC",
    description:
      "Assemblage manuel de précision. Cable Management et ventilation optimisée pour un silence total.",
    tags: ["Silencieux", "Performance", "Esthétique Soignée"],
    image: "/projects/pc.webp",
    imageAlt:
      "Photo d'un PC sur mesure assemblé avec soin, montrant le cable management et les composants",
    link: "/#contact",
  },
  {
    title: "Charcuterie Campagnarde",
    category: "Site Vitrine",
    description:
      "Site web professionnel pour un commerçant artisanal. Présentation élégante des produits, informations pratiques et optimisation pour le référencement local.",
    tags: ["Artisanat", "Référencement Local", "Design Responsive", "Présentation Produits"],
    image: "/projects/charcuterie.webp",
    imageAlt:
      "Capture d'écran du site web Charcuterie Campagnarde avec présentation des produits artisanaux",
    link: "https://charcuterie-campagnarde.pages.dev",
  },
  {
    title: "Horizon Vertical Studio",
    category: "Site Vitrine",
    description:
      "Site vitrine pour un studio d'impression murale professionnelle. Présentation de l'activité, galerie de réalisations et mise en avant des possibilités pour entreprises, commerces et particuliers.",
    tags: ["Impression Murale", "B2B & B2C", "Galerie", "Design Premium"],
    image: "/projects/hvs-og.webp",
    imageAlt:
      "Logo Horizon Vertical Studio, studio d'impression murale professionnelle",
    link: "https://horizonverticalstudio.fr",
  },
  {
    title: "Rugby Handi Sud Bassin",
    category: "Site Associatif",
    description:
      "Site web pour le club de rugby fauteuil de La Teste-de-Buch. Interface d'administration Statamic pour une gestion autonome du contenu par les bénévoles.",
    tags: ["Association Sportive", "Rugby Fauteuil", "Back-office", "Bassin d'Arcachon"],
    image: "/projects/rhsb-og.webp",
    imageAlt:
      "Capture d'écran du site web Rugby Handi Sud Bassin, club de rugby fauteuil du Bassin d'Arcachon",
    link: "https://rhsb.fr",
  },
];

export function Portfolio() {
  return (
    <section
      id="realisations"
      className="py-24 bg-bg relative"
      aria-labelledby="portfolio-heading"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            index="02"
            eyebrow="Réalisations"
            align="left"
            titleId="portfolio-heading"
            title={
              <>
                Réalisations <span className="text-accent">récentes.</span>
              </>
            }
            description="Du développement web au montage hardware : voici des exemples concrets de mon savoir-faire."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group rounded-xl bg-surface-card border border-default overflow-hidden hover:border-strong transition-colors duration-300 flex flex-col h-full"
            >
              <div className="h-48 w-full bg-surface-sunken relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-100 group-hover:-translate-y-px transition-all duration-500"
                />

                {/* GoSportNow et Charcuterie Campagnarde: liens actifs vers les sites */}
                {(project.title === "GoSportNow" || project.title === "Charcuterie Campagnarde" || project.title === "Rugby Handi Sud Bassin" || project.title === "Horizon Vertical Studio") && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Voir le projet ${project.title}`}
                      className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-md font-bold text-sm hover:bg-accent hover:text-on-accent focus-visible:bg-accent focus-visible:text-on-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 transition-colors shadow-md"
                    >
                      Voir le projet{" "}
                      <ExternalLink size={16} aria-hidden="true" />
                    </Link>
                  </div>
                )}

                {/* TODO: Décommenter quand les pages projets seront créées pour les autres projets */}
                {/* <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link
                    href={project.link}
                    aria-label={`Voir le projet ${project.title}`}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-md font-bold text-sm hover:bg-accent hover:text-on-accent focus-visible:bg-accent focus-visible:text-on-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 transition-colors shadow-md"
                  >
                    Voir le projet <ExternalLink size={16} aria-hidden="true" />
                  </Link>
                </div> */}
              </div>

              <div className="p-6 flex flex-col grow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-accent text-xs font-bold uppercase tracking-wider mb-2 block">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-text-strong group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <p className="text-soft text-sm mb-6 grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium text-soft bg-surface px-3 py-1 rounded-md border border-default"
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
