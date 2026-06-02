import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

const SITE_URL = "https://forgedigitalesolutions.com";
const PAGE_URL = `${SITE_URL}/montage-pc`;

export const metadata: Metadata = {
  title: "Montage PC sur-mesure en Gironde (gamer, bureautique)",
  description:
    "Montage de PC adapté à votre usage et à votre budget — jeu, travail ou famille. Vous achetez les pièces, je les assemble et règle tout, en atelier à Saint-Laurent-Médoc. Forfait à 149 €, Gironde.",
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
    title: "Montage PC sur-mesure en Gironde (gamer, bureautique)",
    description:
      "Montage de PC adapté à votre usage et votre budget. Vous achetez les pièces, je les assemble et règle tout. Forfait à 149 €, en atelier à Saint-Laurent-Médoc.",
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
    "Assemblage de PC sur-mesure (jeu, bureautique, familial) avec choix des composants, montage soigné et réglages. Le client achète les pièces, l'assemblage se fait en atelier à Saint-Laurent-Médoc.",
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
    description: "Forfait montage complet (pièces achetées par le client)",
  },
};

const inclus = [
  "On choisit ensemble les composants selon votre budget",
  "Vous commandez les pièces : factures et garanties à votre nom",
  "Montage soigné et câbles rangés proprement",
  "Mise à jour du BIOS et profil mémoire (XMP/EXPO) activé",
  "Ventilation réglée pour rester silencieux",
  "Système installé, machine prête à l'emploi",
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
            Montage PC sur-mesure en Gironde
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Que ce soit pour jouer, travailler ou un usage familial, je monte des
            PC <strong className="text-white">adaptés à votre besoin réel</strong>{" "}
            et à votre budget. Le principe est simple et transparent : vous achetez
            les pièces, je m&rsquo;occupe de l&rsquo;assemblage et des réglages, en
            atelier à Saint-Laurent-Médoc, pour toute la{" "}
            <strong className="text-white">Gironde</strong>.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            La bonne config, pas la plus chère
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Un bon PC, ce n&rsquo;est pas celui qui coûte le plus cher, c&rsquo;est
            celui qui est équilibré. Mettre tout le budget dans une pièce et
            négliger le reste, c&rsquo;est se retrouver avec une machine bridée. Je
            place donc l&rsquo;argent là où il compte vraiment pour votre usage —
            la carte graphique pour le jeu, par exemple — sans vous faire payer de
            la puissance qui ne vous servira jamais.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Je fais aussi attention aux pièces qu&rsquo;on néglige souvent à tort,
            comme l&rsquo;alimentation : c&rsquo;est elle qui protège tout le reste
            et qui vous laissera de la marge pour faire évoluer la machine plus
            tard.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Comment ça se passe
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
            Le forfait montage est à <strong className="text-white">149 €</strong>.
            Comme vous achetez vous-même les pièces, vous gardez la main sur le
            budget et les garanties restent à votre nom.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Pourquoi pas le monter soi-même
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Monter son PC, c&rsquo;est gratifiant — mais une erreur coûte cher : une
            broche tordue sur la carte mère, et la pièce est souvent perdue, sans
            garantie. Et au-delà du montage, plusieurs réglages déterminent les
            vraies performances et passent souvent à la trappe : la mise à jour du
            BIOS, le profil mémoire, la courbe de ventilation. Je vous livre une
            machine montée proprement et réglée correctement, prête à servir.
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
            Une config en tête ?
          </h2>
          <p className="text-slate-300 mb-6">
            Dites-moi votre usage et votre budget, je vous conseille la
            configuration qui tient la route. Le conseil et le devis sont gratuits.
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
