import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

const SITE_URL = "https://forgedigitalesolutions.com";
const PAGE_URL = `${SITE_URL}/montage-pc`;

export const metadata: Metadata = {
  title: "Montage PC sur-mesure (gamer, bureautique) en Gironde",
  description:
    "Assemblage de PC sur-mesure — gaming, bureautique ou familial — en Gironde. Configuration équilibrée, réglages BIOS/XMP et montage soigné, en atelier à Saint-Laurent-Médoc. Forfait montage à 149 €.",
  keywords: [
    "montage PC Gironde",
    "montage PC gamer Bordeaux",
    "assembleur PC Médoc",
    "PC sur-mesure",
    "configuration PC gaming",
    "monteur PC Bassin d'Arcachon",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: PAGE_URL,
    siteName: "Forge Digitale Solutions",
    title: "Montage PC sur-mesure (gamer, bureautique) en Gironde",
    description:
      "Assemblage de PC sur-mesure en Gironde : configuration équilibrée, réglages BIOS/XMP, montage soigné. Forfait à 149 €, en atelier à Saint-Laurent-Médoc.",
    images: [
      {
        url: `${SITE_URL}/blog/pc-build.jpg`,
        width: 1200,
        height: 630,
        alt: "Montage PC sur-mesure en Gironde — Forge Digitale Solutions",
      },
    ],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Montage PC sur-mesure",
  serviceType: "Assemblage d'ordinateur",
  description:
    "Assemblage de PC sur-mesure (gaming, bureautique, familial) avec configuration équilibrée, optimisation BIOS/XMP et montage soigné. En atelier à Saint-Laurent-Médoc, pour toute la Gironde.",
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
    price: "149",
    description: "Forfait montage complet (pièces fournies par le client)",
  },
};

const inclus = [
  "Conseil et choix des composants adaptés à votre budget",
  "Assemblage soigné et gestion des câbles",
  "Mise à jour du BIOS si nécessaire",
  "Activation du profil mémoire (XMP/EXPO)",
  "Courbe de ventilation optimisée",
  "Installation du système et prise en main",
];

export default function MontagePcPage() {
  return (
    <div className="min-h-screen bg-dark-base pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: `${SITE_URL}/` },
          { name: "Montage PC", url: `${PAGE_URL}/` },
        ]}
      />

      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <nav className="text-sm text-slate-500 mb-8" aria-label="Fil d'Ariane">
          <Link href="/" className="hover:text-[#C5A059] transition-colors">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-300">Montage PC</span>
        </nav>

        <header className="mb-12">
          <span className="text-[#C5A059] font-bold tracking-widest uppercase text-xs mb-4 block">
            Montage PC sur-mesure
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Montage PC sur-mesure : gaming, bureautique ou familial en Gironde
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            J&rsquo;assemble des PC <strong className="text-white">sur-mesure</strong>{" "}
            adaptés à votre usage réel et à votre budget — du PC{" "}
            <strong className="text-white">gamer</strong> à la machine bureautique
            ou familiale. Une configuration équilibrée, des réglages soignés et un
            montage propre, en atelier à Saint-Laurent-Médoc, pour toute la{" "}
            <strong className="text-white">Gironde</strong>.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Une configuration équilibrée, pas la plus chère
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            La performance ressentie dépend moins du prix total que de
            l&rsquo;équilibre entre composants : une configuration mal répartie
            plafonne quels que soient les montants engagés. Je définis avec vous
            une machine cohérente, où le budget est placé là où il compte vraiment
            — la carte graphique et sa mémoire vidéo pour le jeu, par exemple — sans
            payer pour de la puissance inutile.
          </p>
          <p className="text-slate-300 leading-relaxed">
            J&rsquo;accorde aussi une attention particulière aux composants que
            l&rsquo;on néglige souvent à tort, comme l&rsquo;alimentation, qui
            protège l&rsquo;ensemble et laisse la marge pour faire évoluer la
            machine plus tard.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Ce que comprend le forfait montage
          </h2>
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
            Tarif : <strong className="text-white">forfait montage à 149 €</strong>.
            Vous commandez les pièces directement (factures et garanties à votre
            nom), je m&rsquo;occupe de l&rsquo;assemblage et des réglages, en
            atelier à Saint-Laurent-Médoc.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Pourquoi passer par un assembleur
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Monter soi-même sa machine est formateur, mais comporte des risques
            concrets : une broche tordue sur le socket de la carte mère, et le
            composant est généralement perdu, sans prise en charge au titre de la
            garantie. Plusieurs réglages, par ailleurs, conditionnent les
            performances réelles et passent souvent inaperçus — mise à jour du
            BIOS, profil mémoire, courbe de ventilation. Je livre une machine prête
            à l&rsquo;emploi et correctement paramétrée.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Pour aller plus loin</h2>
          <ul className="space-y-2">
            <li>
              <Link
                href="/blog/pc-gamer-budget"
                className="text-[#C5A059] hover:underline"
              >
                Monter un PC de jeu équilibré en 2026 : les priorités
              </Link>
            </li>
          </ul>
        </section>

        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">
            Un projet de PC sur-mesure ?
          </h2>
          <p className="text-slate-300 mb-6">
            Parlons de votre usage et de votre budget. Conseil et devis gratuits,
            en atelier à Saint-Laurent-Médoc, pour toute la Gironde.
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
