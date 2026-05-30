import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

const SITE_URL = "https://forgedigitalesolutions.com";
const PAGE_URL = `${SITE_URL}/installation-linux`;

export const metadata: Metadata = {
  title: "Installation Linux & passage de Windows à Linux Mint en Médoc",
  description:
    "Votre PC est trop ancien pour Windows 11 ou Windows 10 n'est plus à jour ? J'installe Linux Mint pour prolonger sa durée de vie, en atelier à Saint-Laurent-Médoc. Forfait Renaissance à 69 €, Médoc et Bassin d'Arcachon.",
  keywords: [
    "installation Linux Médoc",
    "passage Windows à Linux",
    "installation Linux Mint Gironde",
    "forfait Renaissance",
    "redonner vie vieux PC",
    "alternative Windows 11",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: PAGE_URL,
    siteName: "Forge Digitale Solutions",
    title: "Installation Linux & passage de Windows à Linux Mint en Médoc",
    description:
      "Installation de Linux Mint pour prolonger la vie de votre PC, en atelier à Saint-Laurent-Médoc. Forfait Renaissance à 69 €, Médoc et Bassin d'Arcachon.",
    images: [
      {
        url: `${SITE_URL}/blog/pc-mint.png`,
        width: 1200,
        height: 630,
        alt: "Installation Linux Mint en Médoc — Forge Digitale Solutions",
      },
    ],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Installation Linux et passage de Windows à Linux Mint",
  serviceType: "Installation de système d'exploitation",
  description:
    "Installation de Linux Mint en remplacement de Windows pour prolonger la durée de vie d'un PC ancien. Forfait Renaissance clé en main, en atelier à Saint-Laurent-Médoc.",
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
    price: "69",
    description: "Forfait Renaissance : installation Linux Mint clé en main",
  },
};

const inclus = [
  "Sauvegarde préalable de vos fichiers personnels",
  "Nettoyage complet de la machine",
  "Installation de Linux Mint (interface proche de Windows)",
  "Configuration des périphériques (Wi-Fi, imprimante, son)",
  "Une heure de prise en main personnalisée",
];

export default function InstallationLinuxPage() {
  return (
    <div className="min-h-screen bg-dark-base pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: `${SITE_URL}/` },
          { name: "Installation Linux", url: `${PAGE_URL}/` },
        ]}
      />

      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <nav className="text-sm text-slate-500 mb-8" aria-label="Fil d'Ariane">
          <Link href="/" className="hover:text-[#C5A059] transition-colors">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-300">Installation Linux</span>
        </nav>

        <header className="mb-12">
          <span className="text-[#C5A059] font-bold tracking-widest uppercase text-xs mb-4 block">
            Forfait Renaissance
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Installation Linux : redonnez une seconde vie à votre PC en Médoc
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Le support de Windows 10 a pris fin et votre ordinateur est jugé trop
            ancien pour Windows 11 ? Plutôt que de le remplacer, j&rsquo;installe{" "}
            <strong className="text-white">Linux Mint</strong> pour lui rendre
            rapidité et sécurité, pour plusieurs années. Une solution{" "}
            <strong className="text-white">économique et écologique</strong>, en
            atelier à Saint-Laurent-Médoc, pour tout le{" "}
            <strong className="text-white">Médoc</strong> et le Bassin
            d&rsquo;Arcachon.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Pourquoi passer à Linux Mint
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Linux Mint est un système gratuit, léger et maintenu dans la durée. Il
            redonne de la fluidité à un PC d&rsquo;une dizaine d&rsquo;années (4 Go
            de mémoire vive suffisent pour la bureautique et le web) et reste à
            jour sans abonnement ni date de péremption imposée au matériel.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Son interface a été pensée pour limiter le dépaysement : menu de
            démarrage en bas à gauche, barre des tâches, fenêtres classiques. Les
            usages courants trouvent leur équivalent direct — LibreOffice pour les
            documents, Firefox ou Chrome pour le web — et vos fichiers (`.docx`,
            `.pdf`, photos) s&rsquo;ouvrent sans conversion.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Ce que comprend le forfait Renaissance
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
            Tarif : <strong className="text-white">forfait Renaissance à 69 €</strong>.
            L&rsquo;intervention se déroule en atelier à Saint-Laurent-Médoc et
            dure environ deux heures.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Quand Linux n&rsquo;est pas la bonne solution
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Linux Mint couvre la bureautique, le web, la messagerie et le
            multimédia. En revanche, certains logiciels professionnels spécifiques
            ou des jeux récents avec anti-triche ne fonctionnent pas sous Linux. Un
            diagnostic préalable des usages permet de vérifier la compatibilité
            avant toute migration — sans engagement.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Pour aller plus loin</h2>
          <ul className="space-y-2">
            <li>
              <Link
                href="/blog/forfait-renaissance"
                className="text-[#C5A059] hover:underline"
              >
                Fin de Windows 10 : passer son ancien PC sous Linux plutôt que le remplacer
              </Link>
            </li>
            <li>
              <Link
                href="/blog/sauvegarde-donnees"
                className="text-[#C5A059] hover:underline"
              >
                Sauvegarder ses données : comprendre la règle du 3-2-1
              </Link>
            </li>
          </ul>
        </section>

        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">
            Votre PC est lent ou bloqué sur Windows ?
          </h2>
          <p className="text-slate-300 mb-6">
            Diagnostic gratuit en atelier à Saint-Laurent-Médoc, pour les
            particuliers et professionnels du Médoc et du Bassin d&rsquo;Arcachon.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#C5A059] px-6 py-3 font-bold text-dark-base transition-colors hover:bg-[#D4B475]"
          >
            Demander un diagnostic gratuit
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      </div>
    </div>
  );
}
