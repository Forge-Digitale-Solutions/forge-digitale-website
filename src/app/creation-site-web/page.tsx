import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

const SITE_URL = "https://forgedigitalesolutions.com";
const PAGE_URL = `${SITE_URL}/creation-site-web`;

export const metadata: Metadata = {
  title: "Création de site web et d'application en Médoc",
  description:
    "Développeur indépendant en Médoc, je crée des sites internet et des applications adaptés à votre métier. Pas de formule toute faite : on part de votre besoin. Devis gratuit, Médoc et Bassin d'Arcachon.",
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
    title: "Création de site web et d'application en Médoc",
    description:
      "Développeur indépendant en Médoc, je crée des sites internet et des applications adaptés à votre métier. On part de votre besoin, pas d'une formule toute faite.",
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

const engagements = [
  "Un seul interlocuteur, du premier échange à la mise en ligne",
  "Un site qui charge vite et reste lisible sur téléphone",
  "Un travail pensé pour être trouvé sur Google dans votre secteur",
  "Hébergement, nom de domaine et maintenance possibles ensuite",
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
            Création de site web et d&rsquo;application en Médoc
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Je suis Anthony Marcelin, développeur indépendant installé en{" "}
            <strong className="text-white">Médoc</strong>. Je conçois des sites
            internet et des applications pour les professionnels et particuliers
            de la région, du{" "}
            <strong className="text-white">Bassin d&rsquo;Arcachon</strong> à
            Bordeaux. Pas une agence avec plusieurs intermédiaires : un seul
            interlocuteur, qui code lui-même votre projet.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            On part de votre besoin, pas d&rsquo;une formule
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Je ne propose pas de catalogue de packs entre lesquels il faudrait
            vous glisser. Chaque activité a ses contraintes, et un site utile,
            c&rsquo;est un site qui colle à la vôtre. La première étape, c&rsquo;est
            donc d&rsquo;en parler : ce que vous faites, qui sont vos clients, et
            ce que le site doit vous apporter concrètement.
          </p>
          <p className="text-slate-300 leading-relaxed">
            À partir de là, je construis la solution adaptée — d&rsquo;un site
            vitrine simple qui présente votre métier et vos coordonnées, jusqu&rsquo;à
            une application développée pour un besoin précis que les logiciels
            tout faits ne couvrent pas. La technologie s&rsquo;adapte au projet, pas
            l&rsquo;inverse.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Un site rapide, parce qu&rsquo;un site lent ne sert à rien
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Un site joli mais qui rame finit par faire fuir les visiteurs — et
            Google le sait aussi : il met en avant les sites rapides. Je
            développe avec des technologies récentes (Next.js, React) qui
            privilégient la vitesse et la stabilité, sur ordinateur comme sur
            téléphone, où se font la plupart des recherches locales.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Le contenu, la structure et les mots-clés sont travaillés à partir de
            votre activité réelle. L&rsquo;objectif n&rsquo;est pas seulement
            d&rsquo;avoir un site, mais d&rsquo;apparaître quand quelqu&rsquo;un
            cherche votre métier dans le coin.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Ce sur quoi je m&rsquo;engage
          </h2>
          <ul className="space-y-3">
            {engagements.map((item) => (
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
            Les tarifs démarrent autour de{" "}
            <strong className="text-white">800 €</strong> pour un site vitrine,
            mais tout dépend de votre projet. L&rsquo;échange et le devis sont
            gratuits, sans engagement.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            À lire avant de vous lancer
          </h2>
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
            Une idée, un site à refaire, ou juste une question ? Écrivez-moi,
            j&rsquo;y réponds moi-même. L&rsquo;étude du projet est gratuite.
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
