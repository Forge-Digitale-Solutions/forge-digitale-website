import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

const SITE_URL = "https://forgedigitalesolutions.com";
const PAGE_URL = `${SITE_URL}/creation-site-web`;

export const metadata: Metadata = {
  title: "Création de site web et d'application dans le Médoc",
  description:
    "Développeur indépendant dans le Médoc, je crée des sites internet et des applications adaptés à votre métier. On part de votre besoin, pas d'une formule toute faite. Devis gratuit en Gironde.",
  keywords: [
    "création site web Médoc",
    "créateur site internet Gironde",
    "création application web",
    "site internet artisan Médoc",
    "développeur site web Bassin d'Arcachon",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: PAGE_URL,
    siteName: "Forge Digitale Solutions",
    title: "Création de site web et d'application dans le Médoc",
    description:
      "Développeur indépendant dans le Médoc, je crée des sites internet et des applications adaptés à votre métier. On part de votre besoin, pas d'une formule toute faite.",
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Création de sites web dans le Médoc, Forge Digitale Solutions",
      },
    ],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Création de site web et d'application",
  serviceType: "Création de site internet",
  description:
    "Conception de sites internet et d'applications sur-mesure pour les professionnels du Médoc et du Bassin d'Arcachon. Développement adapté au besoin de chaque client, par un développeur indépendant.",
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
    description: "Création de site internet, à partir de 800 €",
  },
};

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

        <header className="mb-10">
          <span className="text-[#C5A059] font-bold tracking-widest uppercase text-xs mb-4 block">
            Création web &amp; applications
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Création de site web et d&rsquo;application dans le Médoc
          </h1>
        </header>

        <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
          <p>
            Moi c&rsquo;est Anthony Marcelin, développeur indépendant installé dans
            le Médoc. Je crée des sites internet et des applications pour les
            professionnels et les particuliers de la région, jusqu&rsquo;au Bassin
            d&rsquo;Arcachon et à Bordeaux. Vous n&rsquo;avez pas affaire à une
            agence avec une chaîne d&rsquo;intermédiaires : la personne qui vous
            répond est celle qui développe votre projet.
          </p>

          <p>
            Je n&rsquo;ai pas de catalogue de packs dans lesquels vous faire
            entrer. Une activité a ses contraintes, et un site qui sert à quelque
            chose, c&rsquo;est un site qui colle à la vôtre. On commence donc
            toujours par en parler : ce que vous faites, à qui vous vous adressez,
            et ce que vous attendez vraiment d&rsquo;un site. À partir de là, je
            construis ce qui correspond, qu&rsquo;il s&rsquo;agisse d&rsquo;une
            simple vitrine pour présenter votre métier ou d&rsquo;une application
            taillée pour un besoin que les logiciels du marché ne couvrent pas.
          </p>

          <p>
            Un point auquel je tiens : la rapidité. Un beau site qui met trois
            secondes à s&rsquo;afficher fait fuir les visiteurs, et Google le
            relègue derrière les autres. Je travaille avec des outils récents
            (Next.js, React) qui privilégient la vitesse et tiennent la route sur
            téléphone, là où se font la plupart des recherches du coin. Le contenu
            et les mots-clés sont pensés à partir de votre activité réelle, pour
            que vous remontiez quand quelqu&rsquo;un cherche votre métier dans le
            secteur.
          </p>

          <p>
            Si vous voulez aller plus loin une fois le site en ligne, je peux
            aussi m&rsquo;occuper de l&rsquo;hébergement, du nom de domaine et de
            la maintenance. Mais rien n&rsquo;est imposé. Les tarifs commencent
            autour de 800 € pour une vitrine, le reste dépend de ce qu&rsquo;on
            définit ensemble. L&rsquo;échange et le devis sont gratuits.
          </p>
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/5">
          <p className="text-slate-400 text-sm mb-3">À lire avant de vous lancer</p>
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
        </div>

        <section className="mt-12 pt-8 border-t border-white/10">
          <p className="text-slate-300 mb-6">
            Une idée, un site à refaire, ou juste une question ? Écrivez-moi,
            c&rsquo;est moi qui réponds.
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
