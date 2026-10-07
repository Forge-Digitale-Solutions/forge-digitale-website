"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type ProjectLink = {
  label: string;
  href: string;
};

type Project = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  imageAlt: string;
  links: ProjectLink[];
};

const projects: Project[] = [
  {
    title: "Spawnzone",
    category: "Application Mobile",
    description:
      "App pour trouver des joueurs près de chez soi, sur les mêmes jeux et aux mêmes horaires. Disponible sur l’App Store et Google Play.",
    tags: ["iOS & Android", "Gaming", "Géolocalisation", "Disponible"],
    image: "/projects/spawnzone.webp",
    imageAlt:
      "Écran Découverte de l’application Spawnzone avec carte des joueurs à proximité",
    links: [
      { label: "Landing", href: "https://spawnzone.fr/" },
      { label: "Stores", href: "https://spawnzone.fr/dl" },
    ],
  },
  {
    title: "À ta soif",
    category: "Application Mobile",
    description:
      "Cave numérique pour whisky, rhum, vin et bière : prix, lieu, niveau et notes. Bientôt disponible sur les stores.",
    tags: ["iOS & Android", "Cave numérique", "Bientôt sur les stores"],
    image: "/projects/atasoif.webp",
    imageAlt:
      "Écran Ma cave de l’application À ta soif avec suivi des bouteilles",
    links: [{ label: "Landing", href: "https://atasoif.fr/" }],
  },
  {
    title: "Médoc Vibes",
    category: "Application Mobile",
    description:
      "L’app festif et loisir du Médoc : restos, sorties, marchés, vides-greniers et surf. Bientôt disponible sur les stores.",
    tags: ["iOS & Android", "Médoc", "Sorties locales", "Bientôt sur les stores"],
    image: "/projects/medocvibes.webp",
    imageAlt:
      "Identité visuelle Médoc Vibes — manger, sortir, bouger",
    links: [{ label: "Landing", href: "https://medocvibes.fr/" }],
  },
  {
    title: "Forge Digitale",
    category: "Site Vitrine",
    description:
      "La preuve par l'exemple : un site ultra-rapide, pensé pour le référencement local et doté d'une identité visuelle forte.",
    tags: ["Chargement Instantané", "Design Unique", "Optimisé Google"],
    image: "/projects/forge.webp",
    imageAlt:
      "Capture d'écran du site web Forge Digitale Solutions avec design moderne et identité visuelle dorée",
    links: [{ label: "Voir le projet", href: "#" }],
  },
  {
    title: "La Délicieuse",
    category: "E-commerce",
    description:
      "Boutique en ligne pour une épicerie fine à Cissac-Médoc. Catalogue de producteurs français, vente aux particuliers et aux professionnels, livraison partout en France.",
    tags: ["Épicerie Fine", "Boutique en ligne", "Cissac-Médoc", "B2B & B2C"],
    image: "/projects/la-delicieuse.webp",
    imageAlt:
      "Capture d'écran de la boutique en ligne Épicerie Fine La Délicieuse, avec le hero Cave & Spiritueux et les rayons produits",
    links: [
      { label: "Voir le projet", href: "https://epiceriefineladelicieuse.fr" },
    ],
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
    links: [{ label: "Voir le projet", href: "https://gosportnow.fr" }],
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
    links: [{ label: "Me contacter", href: "/#contact" }],
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
    links: [
      {
        label: "Voir le projet",
        href: "https://charcuterie-campagnarde.pages.dev",
      },
    ],
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
    links: [
      { label: "Voir le projet", href: "https://horizonverticalstudio.fr" },
    ],
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
    links: [{ label: "Voir le projet", href: "https://rhsb.fr" }],
  },
];

function externalLinks(project: Project) {
  return project.links.filter((link) => link.href.startsWith("http"));
}

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
            index="03"
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
          {projects.map((project, index) => {
            const outbound = externalLinks(project);

            return (
              <motion.div
                key={project.title}
                whileHover={{ y: -1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group rounded-xl bg-surface-card border border-default overflow-hidden hover:border-strong transition-colors duration-300 flex flex-col h-full"
              >
                <div className="h-48 w-full bg-surface-sunken relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover opacity-60 group-hover:opacity-100 group-hover:-translate-y-px transition-all duration-500"
                  />

                  {outbound.length > 0 && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 flex-wrap p-4">
                      {outbound.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${link.label} — ${project.title}`}
                          className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-md font-bold text-sm hover:bg-accent hover:text-on-accent focus-visible:bg-accent focus-visible:text-on-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 transition-colors shadow-md"
                        >
                          {link.label}{" "}
                          <ExternalLink size={16} aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                  )}
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

                  {outbound.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-4">
                      {outbound.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                        >
                          {link.label}
                          <ExternalLink size={14} aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium text-soft bg-surface px-3 py-1 rounded-md border border-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
