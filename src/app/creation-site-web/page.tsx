import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

const SITE_URL = "https://forgedigitalesolutions.com";
const PAGE_URL = `${SITE_URL}/creation-site-web`;

export const metadata: Metadata = {
  title: "Création de site web & d'applications sur-mesure en Médoc",
  description:
    "Création de sites internet et d'applications sur-mesure pour artisans, commerçants et TPE du Médoc et du Bassin d'Arcachon. Sites rapides, optimisés pour le référencement local, à partir de 800 €.",
  keywords: [
    "création site web Médoc",
    "créateur site internet Gironde",
    "création application web",
    "site internet artisan Médoc",
    "site vitrine Bassin d'Arcachon",
    "agence web Bordeaux",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: PAGE_URL,
    siteName: "Forge Digitale Solutions",
    title: "Création de site web & d'applications sur-mesure en Médoc",
    description:
      "Sites internet et applications sur-mesure pour les professionnels du Médoc et du Bassin d'Arcachon. Performance, référencement local, accompagnement de proximité.",
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Création de sites web en Médoc — Forge Digitale Solutions",
      },
    ],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Création de site web et d'applications sur-mesure",
  serviceType: "Création de site internet",
  description:
    "Conception de sites vitrines, sites catalogues et applications métier sur-mesure pour les professionnels du Médoc et du Bassin d'Arcachon. Sites performants et optimisés pour le référencement local.",
  url: PAGE_URL,
  areaServed: [
    { "@type": "AdministrativeArea", name: "Médoc" },
    { "@type": "Place", name: "Bassin d'Arcachon" },
    { "@type": "AdministrativeArea", name: "Gironde" },
  ],
  provider: {
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: "Forge Digitale Solutions",
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: "800",
    description: "Site vitrine sur-mesure, à partir de 800 €",
  },
};

const prestations = [
  {
    title: "Sites vitrines",
    text: "Présenter votre activité, vos réalisations et vos coordonnées avec un site clair, rapide et adapté au mobile. Le format idéal pour un artisan ou un commerçant qui veut être trouvé localement.",
  },
  {
    title: "Sites catalogues",
    text: "Mettre en avant une gamme de produits ou de services, avec des fiches détaillées et un formulaire de devis. Sans la lourdeur d'une boutique en ligne complète quand elle n'est pas nécessaire.",
  },
  {
    title: "Applications web métier",
    text: "Développer un outil sur-mesure quand un logiciel standard ne suffit pas : suivi de chantiers, réservation, gestion interne. Une application pensée pour votre façon de travailler.",
  },
];

const inclus = [
  "Conception sur-mesure, sans gabarit imposé",
  "Site rapide et accessible sur mobile",
  "Référencement local (Médoc, Bassin d'Arcachon, Gironde)",
  "Hébergement et nom de domaine sur demande",
  "Maintenance et mises à jour en option",
];

export default function CreationSiteWebPage() {
  return (
    <div className="min-h-screen bg-dark-base pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: `${SITE_URL}/` },
          { name: "Création de site web", url: `${PAGE_URL}/` },
        ]}
      />

      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <nav className="text-sm text-slate-500 mb-8" aria-label="Fil d'Ariane">
          <Link href="/" className="hover:text-[#C5A059] transition-colors">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-300">Création de site web</span>
        </nav>

        <header className="mb-12">
          <span className="text-[#C5A059] font-bold tracking-widest uppercase text-xs mb-4 block">
            Création web &amp; applications
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Création de sites web &amp; d&rsquo;applications sur-mesure en Médoc
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Je conçois des sites internet et des applications sur-mesure pour les
            artisans, commerçants et TPE du{" "}
            <strong className="text-white">Médoc</strong> et du{" "}
            <strong className="text-white">Bassin d&rsquo;Arcachon</strong>. Des
            sites rapides, durables et pensés pour être trouvés par vos clients
            locaux — pas des modèles génériques.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Ce que je réalise
          </h2>
          <div className="space-y-6">
            {prestations.map((p) => (
              <div
                key={p.title}
                className="p-6 rounded-2xl bg-white/5 border border-white/5"
              >
                <h3 className="text-lg font-bold text-[#C5A059] mb-2">
                  {p.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Une approche technique soignée
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Les sites que je développe reposent sur des technologies modernes
            (Next.js, React) qui privilégient la vitesse de chargement et la
            stabilité. Un site rapide est mieux référencé par Google et plus
            agréable pour vos visiteurs, en particulier sur mobile, où se fait la
            majorité des recherches locales.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Chaque projet est construit à partir de votre activité réelle :
            structure des pages, contenu, mots-clés locaux. L&rsquo;objectif
            n&rsquo;est pas seulement d&rsquo;avoir un site, mais d&rsquo;apparaître
            quand un client cherche votre métier dans votre secteur.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Ce qui est inclus</h2>
          <ul className="space-y-3">
            {inclus.map((item) => (
              <li key={item} className="flex items-start gap-3 text-slate-300">
                <Check
                  className="h-5 w-5 text-[#C5A059] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-slate-400 text-sm mt-6">
            Tarif indicatif : site vitrine sur-mesure à partir de{" "}
            <strong className="text-white">800 €</strong>. Chaque projet fait
            l&rsquo;objet d&rsquo;un devis gratuit adapté à vos besoins.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Pour aller plus loin</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Avant ou en complément d&rsquo;un site, quelques lectures utiles :
          </p>
          <ul className="space-y-2">
            <li>
              <Link
                href="/blog/croissance-web"
                className="text-[#C5A059] hover:underline"
              >
                Un site web est-il utile à un artisan ? Ce que disent les études
              </Link>
            </li>
            <li>
              <Link
                href="/blog/fiche-google-artisans"
                className="text-[#C5A059] hover:underline"
              >
                Fiche Google : à quoi elle sert et comment la créer
              </Link>
            </li>
          </ul>
        </section>

        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">
            Parlons de votre projet
          </h2>
          <p className="text-slate-300 mb-6">
            Basé à Saint-Laurent-Médoc, j&rsquo;accompagne les professionnels du
            Médoc, du Bassin d&rsquo;Arcachon et de la région bordelaise.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#C5A059] px-6 py-3 font-bold text-dark-base transition-colors hover:bg-[#D4B475]"
          >
            Demander un devis gratuit
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      </div>
    </div>
  );
}
