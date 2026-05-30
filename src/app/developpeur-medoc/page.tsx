import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

const SITE_URL = "https://forgedigitalesolutions.com";
const PAGE_URL = `${SITE_URL}/developpeur-medoc`;

export const metadata: Metadata = {
  title: "Développeur web indépendant en Médoc & Bassin d'Arcachon",
  description:
    "Développeur web indépendant basé en Médoc : sites internet, applications sur-mesure et outils métier pour les professionnels de la Gironde et du Bassin d'Arcachon. Titre de Concepteur Développeur d'Applications.",
  keywords: [
    "développeur Médoc",
    "développeur web Bassin d'Arcachon",
    "développeur freelance Gironde",
    "développeur application sur-mesure",
    "concepteur développeur d'applications",
    "développeur indépendant Bordeaux",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: PAGE_URL,
    siteName: "Forge Digitale Solutions",
    title: "Développeur web indépendant en Médoc & Bassin d'Arcachon",
    description:
      "Développeur web indépendant en Médoc : sites internet, applications sur-mesure et outils métier pour les professionnels de la Gironde.",
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Développeur web en Médoc — Anthony Marcelin, Forge Digitale Solutions",
      },
    ],
  },
};

const profileSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Forge Digitale Solutions — Développeur web en Médoc",
  description:
    "Développeur web indépendant basé en Médoc, spécialisé dans la création de sites internet et d'applications sur-mesure pour les professionnels de la Gironde et du Bassin d'Arcachon.",
  url: PAGE_URL,
  areaServed: [
    { "@type": "AdministrativeArea", name: "Médoc" },
    { "@type": "Place", name: "Bassin d'Arcachon" },
    { "@type": "AdministrativeArea", name: "Gironde" },
  ],
  founder: {
    "@type": "Person",
    name: "Anthony Marcelin",
    jobTitle: "Concepteur Développeur d'Applications",
  },
  provider: {
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: "Forge Digitale Solutions",
  },
};

const competences = [
  "Développement front-end (React, Next.js)",
  "Développement back-end et bases de données",
  "Applications web métier sur-mesure",
  "Sites performants et optimisés pour le référencement",
  "Intégration responsive (mobile, tablette, ordinateur)",
];

export default function DeveloppeurMedocPage() {
  return (
    <div className="min-h-screen bg-dark-base pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: `${SITE_URL}/` },
          { name: "Développeur en Médoc", url: `${PAGE_URL}/` },
        ]}
      />

      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <nav className="text-sm text-slate-500 mb-8" aria-label="Fil d'Ariane">
          <Link href="/" className="hover:text-[#C5A059] transition-colors">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-300">Développeur en Médoc</span>
        </nav>

        <header className="mb-12">
          <span className="text-[#C5A059] font-bold tracking-widest uppercase text-xs mb-4 block">
            Développeur indépendant
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Développeur web indépendant en Médoc &amp; Bassin d&rsquo;Arcachon
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Je suis Anthony Marcelin, développeur web indépendant basé à
            Saint-Laurent-Médoc. J&rsquo;accompagne les professionnels de la{" "}
            <strong className="text-white">Gironde</strong>, du{" "}
            <strong className="text-white">Médoc</strong> au{" "}
            <strong className="text-white">Bassin d&rsquo;Arcachon</strong>, dans
            la création de sites internet et d&rsquo;applications sur-mesure.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Mon parcours</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Titulaire du titre professionnel de{" "}
            <strong className="text-white">
              Concepteur Développeur d&rsquo;Applications
            </strong>{" "}
            et passionné d&rsquo;informatique depuis plus de vingt ans, je
            combine développement logiciel et maîtrise du matériel. Cette double
            compétence me permet de comprendre un projet de bout en bout, du code
            jusqu&rsquo;à l&rsquo;infrastructure qui l&rsquo;héberge.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Travailler en indépendant, c&rsquo;est un interlocuteur unique du
            premier échange à la mise en ligne : pas d&rsquo;intermédiaire, des
            décisions rapides et un suivi de proximité.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Compétences</h2>
          <ul className="space-y-3">
            {competences.map((item) => (
              <li key={item} className="flex items-start gap-3 text-slate-300">
                <Check
                  className="h-5 w-5 text-[#C5A059] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Travailler ensemble
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Chaque projet commence par un échange pour cerner votre besoin réel,
            votre activité et vos contraintes. Je propose ensuite une solution
            claire et un devis détaillé, sans jargon inutile. Pour la création de
            sites en particulier, le détail de la prestation est présenté sur la
            page{" "}
            <Link
              href="/creation-site-web"
              className="text-[#C5A059] hover:underline"
            >
              création de site web
            </Link>
            .
          </p>
          <p className="text-slate-300 leading-relaxed">
            Que vous soyez à Lesparre, Pauillac, Castelnau-de-Médoc, sur le
            Bassin d&rsquo;Arcachon ou aux environs de Bordeaux, je reste un
            interlocuteur local, joignable et réactif.
          </p>
        </section>

        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">
            Un projet en tête ?
          </h2>
          <p className="text-slate-300 mb-6">
            Parlons-en. L&rsquo;étude de votre projet et le devis sont gratuits.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#C5A059] px-6 py-3 font-bold text-dark-base transition-colors hover:bg-[#D4B475]"
          >
            Me contacter
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      </div>
    </div>
  );
}
