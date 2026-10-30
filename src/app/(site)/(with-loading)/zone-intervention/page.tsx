import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { umamiAttrs } from "@/lib/track";

const SITE_URL = "https://forgedigitalesolutions.com";
const PAGE_URL = `${SITE_URL}/zone-intervention/`;

const TITLE = "Zone d'intervention : Médoc, Bassin d'Arcachon, Bordeaux";
const DESCRIPTION =
  "Forge Digitale Solutions travaille dans le Médoc, sur le Bassin d'Arcachon et à Bordeaux : visio, téléphone ou lieu public, du lundi au vendredi.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: PAGE_URL,
    siteName: "Forge Digitale Solutions",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Zone d'intervention : Médoc, Bassin d'Arcachon et Bordeaux, Forge Digitale Solutions",
      },
    ],
  },
};

const faq = [
  {
    q: "Faut-il se rencontrer pour faire un site internet ?",
    a: "Non. La visio et le téléphone suffisent. Si vous préférez vous voir, on fixe un rendez-vous dans un lieu public, dans le Médoc, sur le Bassin ou à Bordeaux.",
  },
  {
    q: "Pourquoi votre adresse n'apparaît-elle pas ?",
    a: "Parce que je n'accueille pas de clients sur place. La fiche Google indique donc une zone desservie plutôt qu'une adresse, comme Google le prévoit dans ce cas.",
  },
  {
    q: "Travaillez-vous en dehors de ces trois zones ?",
    a: "J'interviens dans le Médoc, le Bassin d'Arcachon et à Bordeaux ; ailleurs sur devis. Pour un site internet, la distance compte peu, puisque tout peut se faire à distance.",
  },
  {
    q: "Combien coûte la maintenance ?",
    a: "Elle se décide au devis, selon ce que vous me confiez. Il n'y a pas de forfait standard.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const linkClass = "text-accent hover:underline";

export default function ZoneInterventionPage() {
  return (
    <div className="min-h-screen bg-bg pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: `${SITE_URL}/` },
          { name: "Zone d'intervention", url: PAGE_URL },
        ]}
      />

      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <nav className="text-sm text-faint mb-8" aria-label="Fil d'Ariane">
          <Link href="/" className="hover:text-accent transition-colors">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <span className="text-soft">Zone d&rsquo;intervention</span>
        </nav>

        <h1 className="text-3xl md:text-5xl font-bold text-text-strong mb-6 leading-tight">
          Où intervient Forge Digitale Solutions : Médoc, Bassin d&rsquo;Arcachon
          et Bordeaux
        </h1>

        <div className="space-y-6 text-lg text-soft leading-relaxed">
          <p>
            Je m&rsquo;appelle Anthony Marcelin, développeur indépendant (EI) à
            Saint-Laurent-Médoc, titulaire du titre professionnel de Concepteur
            Développeur d&rsquo;Applications. Forge Digitale Solutions n&rsquo;a
            pas d&rsquo;équipe commerciale : la personne qui répond au téléphone
            est celle qui développe et met en ligne votre site. Ici : la zone
            couverte, le mode de rendez-vous, les horaires et ce qui se fixe au
            devis.
          </p>

          <h2 className="text-2xl font-bold text-text-strong">
            La zone : Médoc, Bassin d&rsquo;Arcachon et Bordeaux
          </h2>
          <p>
            J&rsquo;interviens dans le Médoc, le Bassin d&rsquo;Arcachon et à
            Bordeaux ; ailleurs sur devis.
          </p>

          <h3 className="text-xl font-semibold text-text-strong">Le Médoc</h3>
          <p>
            Basé à Saint-Laurent-Médoc, je travaille aussi pour Lesparre-Médoc,
            Pauillac et Castelnau-de-Médoc. Le cas type : un artisan ou un
            commerçant qui a une page Facebook ou une fiche Google, et qui veut
            un site dont il est propriétaire, lisible sur téléphone, avec ses
            réalisations et un formulaire de contact. Le détail de la démarche
            est sur la page{" "}
            <Link href="/creation-site-internet-medoc/" className={linkClass}>
              création de site internet dans le Médoc
            </Link>
            , et le cas des artisans sur{" "}
            <Link href="/site-internet-artisan-medoc/" className={linkClass}>
              site internet pour artisan dans le Médoc
            </Link>
            .
          </p>

          <h3 className="text-xl font-semibold text-text-strong">
            Le Bassin d&rsquo;Arcachon
          </h3>
          <p>
            Réalisation livrée : le site du{" "}
            <a
              href="https://rhsb.fr"
              className={linkClass}
              rel="noopener noreferrer"
              target="_blank"
            >
              Rugby Handi Sud Bassin
            </a>
            , à La Teste-de-Buch. Vitrine mobile, back-office Statamic, contenu
            publié par les bénévoles sans passer par moi. Associations, commerces
            et studios du Bassin trouveront ce type de projet décrit sur la page{" "}
            <Link
              href="/creation-site-web-bassin-arcachon/"
              className={linkClass}
            >
              création de site web sur le Bassin d&rsquo;Arcachon
            </Link>
            .
          </p>

          <h3 className="text-xl font-semibold text-text-strong">
            Bordeaux et sa métropole
          </h3>
          <p>
            À Bordeaux, le projet se mène à distance : cadrage en visio, puis
            vous voyez le site avancer, vous validez, on corrige, jusqu&rsquo;à
            la mise en ligne. Aucune réalisation bordelaise n&rsquo;est publiée
            à ce jour sur le site. La page{" "}
            <Link href="/creation-site-web/" className={linkClass}>
              création de site web
            </Link>{" "}
            décrit ce que je fais, de la vitrine à l&rsquo;outil métier.
          </p>

          <h2 className="text-2xl font-bold text-text-strong">
            Comment on se voit
          </h2>
          <p>
            Pas d&rsquo;accueil du public : le bureau n&rsquo;est ni une boutique
            ni un local ouvert. La fiche Google est donc déclarée en zone
            desservie, sans adresse affichée. Google demande d&rsquo;ailleurs de
            retirer l&rsquo;adresse de la fiche quand on n&rsquo;accueille pas de
            clients dans ses locaux (
            <a
              href="https://support.google.com/business/answer/9157481?hl=fr"
              className={linkClass}
              rel="noopener noreferrer"
              target="_blank"
            >
              aide Fiche d&rsquo;établissement Google
            </a>
            ).
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Pour un site internet</strong> : on échange en visio, par
              téléphone, ou lors d&rsquo;un rendez-vous dans un lieu public (un
              café, un espace de travail partagé), sur un créneau fixé ensemble.
            </li>
            <li>
              <strong>Pour un montage PC ou une installation Linux</strong> : je
              récupère la machine sur rendez-vous. On ne la dépose pas sans
              créneau.
            </li>
            <li>
              <strong>Le premier échange et le devis</strong> sont gratuits.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-text-strong">Horaires</h2>
          <p>
            Du lundi au vendredi, de 8 h 30 à 18 h. Vous pouvez me joindre par
            téléphone, par e-mail ou par le formulaire de devis, aux coordonnées
            données en bas de chaque page du site.
          </p>

          <h2 className="text-2xl font-bold text-text-strong">
            Ce qui se décide au devis
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>La création</strong> : chiffrée au devis selon ce que le
              site doit faire, puis payée une fois. L&rsquo;article{" "}
              <Link href="/blog/prix-site-internet-artisan/" className={linkClass}>
                prix d&rsquo;un site internet d&rsquo;artisan
              </Link>{" "}
              explique comment lire un devis et donne un exemple de forfait.
            </li>
            <li>
              <strong>La maintenance et l&rsquo;hébergement</strong> : au devis,
              sans montant standard. Soit vous gérez vous-même le site et
              l&rsquo;hébergement, soit je m&rsquo;en occupe et ils sont facturés
              chaque mois, comme prévu au devis (page{" "}
              <Link href="/maintenance-site-web/" className={linkClass}>
                maintenance de site web
              </Link>
              ).
            </li>
            <li>
              <strong>Être trouvé dans sa commune</strong> : un site clair et une
              fiche Google bien remplie aident vos clients à vous trouver. Je ne
              promets pas de position dans Google. L&rsquo;article sur la{" "}
              <Link href="/blog/fiche-google-artisans/" className={linkClass}>
                fiche Google des artisans
              </Link>{" "}
              explique comment la régler.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-text-strong">
            Questions fréquentes
          </h2>
          {faq.map((item) => (
            <div key={item.q} className="space-y-2">
              <h3 className="text-xl font-semibold text-text-strong">{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
          <p>
            D&rsquo;autres réponses sont sur la{" "}
            <Link href="/faq/" className={linkClass}>
              FAQ
            </Link>
            .
          </p>

          <h2 className="text-2xl font-bold text-text-strong">
            Parler de votre projet
          </h2>
          <p>
            Indiquez votre commune, votre activité et ce que le site doit faire
            (présenter, recevoir des demandes, publier des réalisations).
            Réponse du lundi au vendredi ; le premier échange et le devis sont
            gratuits.
          </p>
        </div>

        <section className="mt-12 pt-8 border-t border-default">
          <Link
            href="/creation-site-web/"
            {...umamiAttrs("quote-click", { place: "cta" })}
            className="btn-primary gap-2 px-6 py-3"
          >
            Demander un devis
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>

        <div className="mt-12 space-y-6 text-lg text-soft leading-relaxed">
          <h2 className="text-2xl font-bold text-text-strong">Sources</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Google, « Gérer vos zones desservies pour les établissements de
              services de proximité et les établissements mixtes », Aide Fiche
              d&rsquo;établissement Google :{" "}
              <a
                href="https://support.google.com/business/answer/9157481?hl=fr"
                className={linkClass}
                rel="noopener noreferrer"
                target="_blank"
              >
                https://support.google.com/business/answer/9157481?hl=fr
              </a>
            </li>
            <li>
              Forge Digitale Solutions, page « Rendez-vous à
              Saint-Laurent-Médoc » (modes de rendez-vous) :{" "}
              <Link
                href="/rendez-vous-saint-laurent-medoc/"
                className={linkClass}
              >
                https://forgedigitalesolutions.com/rendez-vous-saint-laurent-medoc/
              </Link>
            </li>
            <li>
              Forge Digitale Solutions, page « Maintenance de site web et
              hébergement dans le Médoc » :{" "}
              <Link href="/maintenance-site-web/" className={linkClass}>
                https://forgedigitalesolutions.com/maintenance-site-web/
              </Link>
            </li>
            <li>
              Forge Digitale Solutions, page « Création de site web sur le Bassin
              d&rsquo;Arcachon » (réalisation Rugby Handi Sud Bassin) :{" "}
              <Link
                href="/creation-site-web-bassin-arcachon/"
                className={linkClass}
              >
                https://forgedigitalesolutions.com/creation-site-web-bassin-arcachon/
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
