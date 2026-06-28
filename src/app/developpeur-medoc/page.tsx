import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

const SITE_URL = "https://forgedigitalesolutions.com";
const PAGE_URL = `${SITE_URL}/developpeur-medoc`;

export const metadata: Metadata = {
  title: "Développeur web indépendant dans le Médoc et le Bassin d'Arcachon",
  description:
    "Anthony Marcelin, développeur web indépendant installé dans le Médoc. Sites internet et applications sur-mesure pour les pros de la Gironde. Un seul interlocuteur, du devis à la mise en ligne.",
  keywords: [
    "développeur Médoc",
    "développeur web Bassin d'Arcachon",
    "développeur freelance Gironde",
    "développeur application sur-mesure",
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
    title: "Développeur web indépendant dans le Médoc et le Bassin d'Arcachon",
    description:
      "Anthony Marcelin, développeur web indépendant dans le Médoc. Sites et applications sur-mesure pour les pros de la Gironde. Un seul interlocuteur, du devis à la mise en ligne.",
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Développeur web dans le Médoc, Anthony Marcelin, Forge Digitale Solutions",
      },
    ],
  },
};

const profileSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Forge Digitale Solutions, développeur web dans le Médoc",
  description:
    "Développeur web indépendant installé dans le Médoc, spécialisé dans la création de sites internet et d'applications sur-mesure pour les professionnels de la Gironde et du Bassin d'Arcachon.",
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

export default function DeveloppeurMedocPage() {
  return (
    <div className="min-h-screen bg-bg pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: `${SITE_URL}/` },
          { name: "Développeur dans le Médoc", url: `${PAGE_URL}/` },
        ]}
      />

      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <nav className="text-sm text-faint mb-8" aria-label="Fil d'Ariane">
          <Link href="/" className="hover:text-accent transition-colors">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <span className="text-soft">Développeur dans le Médoc</span>
        </nav>

        <header className="mb-10">
          <span className="text-accent font-mono font-bold tracking-widest uppercase text-xs mb-4 block">
            Développeur indépendant
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-text-strong mb-6 leading-tight">
            Développeur web indépendant dans le Médoc et le Bassin
            d&rsquo;Arcachon
          </h1>
        </header>

        <div className="space-y-6 text-lg text-soft leading-relaxed">
          <p>
            Moi c&rsquo;est Anthony Marcelin. Je développe des sites internet et
            des applications depuis le Médoc, pour les professionnels de la
            Gironde et du Bassin d&rsquo;Arcachon. Pas une agence, mais un
            développeur qui prend votre projet du début à la fin.
          </p>

          <p>
            Je suis tombé dans l&rsquo;informatique très jeune et je n&rsquo;en
            suis jamais ressorti. Avec le temps, j&rsquo;ai appris à toucher aux
            deux bouts de la chaîne, le logiciel et le matériel. Je suis
            aujourd&rsquo;hui titulaire du titre professionnel de Concepteur
            Développeur d&rsquo;Applications, ce qui m&rsquo;aide à comprendre un
            projet en entier, du code jusqu&rsquo;au serveur qui l&rsquo;héberge.
          </p>

          <p>
            Travailler en indépendant, ce n&rsquo;est pas qu&rsquo;une question de
            statut. C&rsquo;est ce qui me permet de rester joignable, de répondre
            moi-même et de ne pas vous faire passer d&rsquo;un service à
            l&rsquo;autre. La personne à qui vous parlez est celle qui code, et
            les décisions se prennent vite.
          </p>

          <p>
            Le plus souvent, tout commence par un site internet. Mais selon le
            besoin, ça peut aussi être une application développée pour votre façon
            de travailler, quand un logiciel du marché ne fait pas l&rsquo;affaire.
            Je n&rsquo;arrive pas avec une solution toute prête : je pars de ce que
            vous me décrivez, puis je propose ce qui tient la route. Le détail de
            la prestation web est sur la page{" "}
            <Link
              href="/creation-site-web"
              className="text-accent hover:underline"
            >
              création de site web
            </Link>
            . Que vous soyez à Lesparre, Pauillac, Castelnau-de-Médoc, sur le
            Bassin ou autour de Bordeaux, on reste à distance d&rsquo;un appel.
          </p>
        </div>

        <section className="mt-12 pt-8 border-t border-default">
          <p className="text-soft mb-6">
            Un projet en tête ? Décrivez-moi ce que vous imaginez. L&rsquo;échange
            et le devis ne coûtent rien.
          </p>
          <Link
            href="/#contact"
            className="btn-primary gap-2 px-6 py-3"
          >
            Me contacter
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      </div>
    </div>
  );
}
