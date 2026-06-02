import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

const SITE_URL = "https://forgedigitalesolutions.com";
const PAGE_URL = `${SITE_URL}/installation-linux`;

export const metadata: Metadata = {
  title: "Installation Linux : redonner vie à un vieux PC en Médoc",
  description:
    "Votre PC est trop ancien pour Windows 11 ou Windows 10 n'est plus à jour ? J'installe Linux Mint pour le relancer, en atelier à Saint-Laurent-Médoc. Forfait Renaissance à 69 €, Médoc et Bassin d'Arcachon.",
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
    title: "Installation Linux : redonner vie à un vieux PC en Médoc",
    description:
      "J'installe Linux Mint pour relancer un PC devenu lent ou abandonné par Windows, en atelier à Saint-Laurent-Médoc. Forfait Renaissance à 69 €.",
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
  "Sauvegarde de vos fichiers personnels avant l'opération",
  "Nettoyage complet de la machine",
  "Installation de Linux Mint, configuré pour ressembler à Windows",
  "Réglage des périphériques : Wi-Fi, imprimante, son",
  "Une heure de prise en main avec vous, pour partir tranquille",
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
            Installation Linux : redonner vie à un vieux PC en Médoc
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Votre ordinateur rame, ou Windows ne le suit plus ? Avant de le
            remplacer, il y a souvent une autre option : j&rsquo;installe{" "}
            <strong className="text-white">Linux Mint</strong> à la place de
            Windows, et la machine repart pour plusieurs années. C&rsquo;est mon{" "}
            <strong className="text-white">forfait Renaissance</strong>, en
            atelier à Saint-Laurent-Médoc, pour tout le Médoc et le Bassin
            d&rsquo;Arcachon.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Pourquoi ne pas le jeter
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Beaucoup de PC partent à la benne alors qu&rsquo;ils fonctionnent
            encore très bien pour la bureautique, internet et les mails. Ce qui
            les ralentit, c&rsquo;est souvent Windows, devenu trop lourd pour eux —
            et quand Microsoft arrête les mises à jour, on a l&rsquo;impression
            qu&rsquo;il faut racheter.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Linux Mint est gratuit, léger et reste à jour dans le temps. Sur une
            machine d&rsquo;une dizaine d&rsquo;années, il redonne de la fluidité
            là où Windows s&rsquo;essoufflait. Et c&rsquo;est aussi un geste pour
            le portefeuille comme pour la planète : on garde ce qui marche.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            « Mais je vais être perdu, non ? »
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            C&rsquo;est la crainte numéro un, et elle est légitime. La bonne
            nouvelle : Linux Mint a été pensé pour ressembler à Windows. Menu en
            bas à gauche, barre des tâches, fenêtres classiques — vos repères sont
            là. Pour les logiciels, on retrouve l&rsquo;équivalent de ce que vous
            utilisez : LibreOffice pour les documents, Firefox ou Chrome pour
            internet, une messagerie intégrée.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Vos fichiers habituels (documents Word, PDF, photos) s&rsquo;ouvrent
            normalement. Et l&rsquo;heure de prise en main comprise dans le forfait
            sert exactement à ça : vous montrer où tout se trouve, à votre rythme.
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
            Le tout pour <strong className="text-white">69 €</strong>, en atelier à
            Saint-Laurent-Médoc, en deux heures environ.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Quand Linux n&rsquo;est pas la bonne idée
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Je préfère être honnête : Linux ne convient pas à tout le monde. Si
            vous dépendez d&rsquo;un logiciel métier précis (compta, outil de
            profession) ou de jeux récents avec anti-triche, ça peut coincer. On
            en parle avant : je regarde vos usages, et si Linux n&rsquo;est pas
            adapté, je vous le dis franchement plutôt que de vous vendre une
            migration qui vous bloquera.
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
            Votre PC mérite peut-être une seconde vie
          </h2>
          <p className="text-slate-300 mb-6">
            Apportez-le-moi, je vous dis franchement ce qu&rsquo;il vaut encore. Le
            diagnostic est gratuit, en atelier à Saint-Laurent-Médoc.
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
