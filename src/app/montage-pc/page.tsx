import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

const SITE_URL = "https://forgedigitalesolutions.com";
const PAGE_URL = `${SITE_URL}/montage-pc`;

export const metadata: Metadata = {
  title: "Montage PC sur-mesure en Gironde (gamer, bureautique)",
  description:
    "Montage de PC adapté à votre usage et à votre budget, pour le jeu, le travail ou la famille. Vous achetez les pièces, je les assemble et règle tout, en atelier à Saint-Laurent-Médoc. Forfait à 149 €, Gironde.",
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
        alt: "Montage PC sur-mesure en Gironde, Forge Digitale Solutions",
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

export default function MontagePcPage() {
  return (
    <div className="min-h-screen bg-bg pt-32 pb-24">
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
        <nav className="text-sm text-faint mb-8" aria-label="Fil d'Ariane">
          <Link href="/" className="hover:text-accent transition-colors">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <span className="text-soft">Montage PC</span>
        </nav>

        <header className="mb-10">
          <span className="text-accent font-mono font-bold tracking-widest uppercase text-xs mb-4 block">
            Montage PC sur-mesure
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-text-strong mb-6 leading-tight">
            Montage PC sur-mesure en Gironde
          </h1>
        </header>

        <div className="space-y-6 text-lg text-soft leading-relaxed">
          <p>
            Que ce soit pour jouer, travailler ou un usage familial, je monte des
            PC adaptés à votre besoin réel et à votre budget. Le principe est
            simple et transparent : vous achetez les pièces, je m&rsquo;occupe de
            l&rsquo;assemblage et des réglages, en atelier à Saint-Laurent-Médoc,
            pour toute la Gironde.
          </p>

          <p>
            Un bon PC, ce n&rsquo;est pas celui qui coûte le plus cher,
            c&rsquo;est celui qui est équilibré. Mettre tout le budget dans une
            pièce et négliger le reste, c&rsquo;est se retrouver avec une machine
            bridée. Je place donc l&rsquo;argent là où il compte vraiment pour
            votre usage, par exemple la carte graphique pour le jeu, sans vous
            faire payer de la puissance qui ne vous servira jamais. Je fais aussi
            attention aux pièces qu&rsquo;on néglige souvent à tort, comme
            l&rsquo;alimentation, parce que c&rsquo;est elle qui protège tout le
            reste et qui vous laissera de la marge pour faire évoluer la machine
            plus tard.
          </p>

          <p>
            Concrètement, on choisit ensemble les composants selon votre budget,
            puis vous les commandez vous-même. Comme ça, les factures et les
            garanties restent à votre nom, et vous gardez la main sur le prix. De
            mon côté, je monte la machine proprement, câbles rangés, je mets à
            jour le BIOS, j&rsquo;active le profil mémoire (XMP ou EXPO), je règle
            la ventilation pour que ça reste silencieux, et j&rsquo;installe le
            système pour vous la rendre prête à l&rsquo;emploi. Le forfait montage
            est à 149 €.
          </p>

          <p>
            Monter son PC soi-même, c&rsquo;est gratifiant, mais une erreur coûte
            cher : une broche tordue sur la carte mère, et la pièce est souvent
            perdue, sans garantie. Et au-delà du montage, plusieurs réglages
            déterminent les vraies performances et passent souvent à la trappe, le
            BIOS, le profil mémoire, la courbe de ventilation. C&rsquo;est ce que
            je prends en charge pour vous livrer une machine qui tourne vraiment
            comme elle le devrait.
          </p>
        </div>

        <div className="mt-12 p-6 rounded-lg bg-surface-card border border-default">
          <p className="text-muted text-sm mb-3">Pour aller plus loin</p>
          <ul className="space-y-2">
            <li>
              <Link
                href="/blog/pc-gamer-budget"
                className="text-accent hover:underline"
              >
                Monter un PC de jeu équilibré en 2026 : les priorités
              </Link>
            </li>
          </ul>
        </div>

        <section className="mt-12 pt-8 border-t border-default">
          <p className="text-soft mb-6">
            Une config en tête ? Dites-moi votre usage et votre budget, je vous
            conseille la configuration qui tient la route. Le conseil et le devis
            sont gratuits.
          </p>
          <Link
            href="/#contact"
            className="btn-primary gap-2 px-6 py-3"
          >
            Demander un devis gratuit
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      </div>
    </div>
  );
}
