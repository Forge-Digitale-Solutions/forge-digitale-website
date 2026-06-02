import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

const SITE_URL = "https://forgedigitalesolutions.com";
const PAGE_URL = `${SITE_URL}/developpeur-medoc`;

export const metadata: Metadata = {
  title: "Développeur web indépendant en Médoc et Bassin d'Arcachon",
  description:
    "Anthony Marcelin, développeur web indépendant basé en Médoc. Sites internet et applications sur-mesure pour les pros de la Gironde. Un seul interlocuteur, du devis à la mise en ligne.",
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
    title: "Développeur web indépendant en Médoc et Bassin d'Arcachon",
    description:
      "Anthony Marcelin, développeur web indépendant en Médoc. Sites et applications sur-mesure pour les pros de la Gironde. Un seul interlocuteur, du devis à la mise en ligne.",
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

const pourquoi = [
  "Un seul interlocuteur : la personne à qui vous parlez est celle qui code",
  "Des décisions rapides, sans chaîne d'intermédiaires",
  "Un suivi de proximité, par quelqu'un de la région",
  "Du concret : on parle de votre métier avant de parler technique",
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
            Développeur web indépendant en Médoc et Bassin d&rsquo;Arcachon
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Moi, c&rsquo;est Anthony Marcelin. Je développe des sites internet et
            des applications depuis le <strong className="text-white">Médoc</strong>,
            pour les professionnels de la <strong className="text-white">Gironde</strong>{" "}
            et du Bassin d&rsquo;Arcachon. Pas une agence : un développeur, qui
            prend votre projet du début à la fin.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            D&rsquo;où je viens
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Je suis tombé dans l&rsquo;informatique très jeune et je n&rsquo;en
            suis jamais ressorti. Au fil du temps, j&rsquo;ai appris à toucher aux
            deux bouts de la chaîne : le logiciel et le matériel. Aujourd&rsquo;hui
            je suis titulaire du titre professionnel de{" "}
            <strong className="text-white">
              Concepteur Développeur d&rsquo;Applications
            </strong>
            , et cette double casquette m&rsquo;aide à comprendre un projet en
            entier, du code jusqu&rsquo;au serveur qui l&rsquo;héberge.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Travailler en indépendant, ce n&rsquo;est pas qu&rsquo;une question de
            statut : c&rsquo;est ce qui me permet de rester joignable, de répondre
            moi-même et de ne pas vous balader d&rsquo;un service à l&rsquo;autre.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Travailler avec moi
          </h2>
          <ul className="space-y-3">
            {pourquoi.map((item) => (
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
            Ce que je peux faire pour vous
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Le plus souvent, ça commence par un site internet. Mais selon le
            besoin, ça peut aussi être une application développée pour votre façon
            de travailler, quand un logiciel du marché ne fait pas l&rsquo;affaire.
            Je n&rsquo;arrive pas avec une solution toute prête : je pars de ce que
            vous me décrivez, puis je propose ce qui tient la route.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Le détail de la prestation web est sur la page{" "}
            <Link
              href="/creation-site-web"
              className="text-[#C5A059] hover:underline"
            >
              création de site web
            </Link>
            . Que vous soyez à Lesparre, Pauillac, Castelnau-de-Médoc, sur le
            Bassin ou autour de Bordeaux, on reste à distance d&rsquo;un appel.
          </p>
        </section>

        <section className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">
            Un projet en tête ?
          </h2>
          <p className="text-slate-300 mb-6">
            Décrivez-moi ce que vous avez en tête. L&rsquo;échange et le devis ne
            coûtent rien.
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
