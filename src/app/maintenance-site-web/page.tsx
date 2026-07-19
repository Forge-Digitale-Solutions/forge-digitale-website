import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

const SITE_URL = "https://forgedigitalesolutions.com";
const PAGE_URL = `${SITE_URL}/maintenance-site-web/`;

export const metadata: Metadata = {
  title: "Maintenance de site web et hébergement dans le Médoc",
  description:
    "Une fois votre site en ligne, je m'occupe de tout : hébergement, nom de domaine, mises à jour, sauvegardes et sécurité. Vous gardez l'esprit tranquille, je gère la technique. Médoc et Bassin d'Arcachon.",
  keywords: [
    "maintenance site web Médoc",
    "hébergement site internet Gironde",
    "gestion site web",
    "mise à jour site internet",
    "maintenance site Bassin d'Arcachon",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: PAGE_URL,
    siteName: "Forge Digitale Solutions",
    title: "Maintenance de site web et hébergement dans le Médoc",
    description:
      "Hébergement, nom de domaine, mises à jour, sauvegardes et sécurité : je gère la technique de votre site pendant que vous gérez votre activité.",
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Maintenance de site web dans le Médoc, Forge Digitale Solutions",
      },
    ],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Maintenance de site web et hébergement",
  serviceType: "Maintenance de site internet",
  description:
    "Gestion complète d'un site internet après sa mise en ligne : hébergement, nom de domaine, mises à jour, sauvegardes et sécurité. Pour les professionnels du Médoc et du Bassin d'Arcachon.",
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
};

export default function MaintenanceSiteWebPage() {
  return (
    <div className="min-h-screen bg-dark-base pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: `${SITE_URL}/` },
          { name: "Maintenance de site web", url: PAGE_URL },
        ]}
      />

      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <nav className="text-sm text-slate-500 mb-8" aria-label="Fil d'Ariane">
          <Link href="/" className="hover:text-[#C5A059] transition-colors">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-300">Maintenance de site web</span>
        </nav>

        <header className="mb-10">
          <span className="text-[#C5A059] font-bold tracking-widest uppercase text-xs mb-4 block">
            Gestion &amp; suivi
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Maintenance de site web et hébergement dans le Médoc
          </h1>
        </header>

        <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
          <p>
            Un site internet, ce n&rsquo;est pas un projet qu&rsquo;on livre et
            qu&rsquo;on oublie. Il faut un hébergement qui tient, un nom de domaine
            renouvelé à temps, des mises à jour régulières et des sauvegardes au
            cas où. C&rsquo;est rarement le métier d&rsquo;un artisan ou
            d&rsquo;un commerçant, et c&rsquo;est bien normal. Je propose donc de
            m&rsquo;en occuper à votre place.
          </p>

          <p>
            Concrètement, je peux prendre en charge l&rsquo;hébergement de votre
            site et le renouvellement de votre nom de domaine, pour que vous
            n&rsquo;ayez ni facture à suivre ni date à surveiller. J&rsquo;assure
            les mises à jour techniques, je garde des sauvegardes régulières et je
            veille à ce que le site reste en ligne et sécurisé. Si quelque chose
            cloche, c&rsquo;est moi qui interviens, sans que vous ayez à chercher
            qui appeler.
          </p>

          <p>
            Selon vos besoins, on peut aussi prévoir un volume d&rsquo;heures pour
            les modifications courantes : changer un texte, ajouter une photo,
            mettre à jour vos horaires ou vos tarifs. Vous me dites, je
            m&rsquo;en charge. L&rsquo;idée est simple : vous vous concentrez sur
            votre activité, je m&rsquo;occupe de la partie technique.
          </p>

          <p>
            La maintenance se définit au cas par cas, en fonction de votre site et
            de ce dont vous avez vraiment besoin. On en discute et je vous fais une
            proposition claire, sans engagement caché.
          </p>
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/5">
          <p className="text-slate-400 text-sm mb-3">À voir aussi</p>
          <ul className="space-y-2">
            <li>
              <Link
                href="/creation-site-web"
                className="text-[#C5A059] hover:underline"
              >
                Création de site web et d&rsquo;application dans le Médoc
              </Link>
            </li>
          </ul>
        </div>

        <section className="mt-12 pt-8 border-t border-white/10">
          <p className="text-slate-300 mb-6">
            Un site à confier, ou une question sur la maintenance du vôtre ?
            Écrivez-moi, c&rsquo;est moi qui réponds.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#C5A059] px-6 py-3 font-bold text-dark-base transition-colors hover:bg-[#D4B475]"
          >
            En parler avec moi
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      </div>
    </div>
  );
}
