import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

const SITE_URL = "https://forgedigitalesolutions.com";
const PAGE_URL = `${SITE_URL}/creation-site-web-bassin-arcachon/`;

const TITLE = "Création de site web sur le Bassin d’Arcachon";
const DESCRIPTION =
  "Site internet pour association ou commerce du Bassin. Exemple : Rugby Handi Sud Bassin à La Teste. Vitrine à partir de 500 €. Travail depuis Saint-Laurent-Médoc.";

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
  },
};

const faq = [
  {
    q: "Faut-il se déplacer jusqu’au Médoc ?",
    a: "Non pour un site. Téléphone ou visio suffisent.",
  },
  {
    q: "Un site d’association, c’est le même travail qu’un site de commerce ?",
    a: "Même exigence de clarté. L’asso a souvent besoin que les bénévoles publient seuls. Le commerce a besoin d’infos pratiques stables. Le devis suit le besoin, pas l’étiquette.",
  },
  {
    q: "Et après la mise en ligne ?",
    a: "Vous restez autonomes si on a prévu un back-office. Sinon je reste dans la boucle, si vous le demandez.",
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

export default function BassinPage() {
  return (
    <div className="min-h-screen bg-bg pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: `${SITE_URL}/` },
          { name: "Site web Bassin d’Arcachon", url: PAGE_URL },
        ]}
      />
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <nav className="text-sm text-faint mb-8" aria-label="Fil d'Ariane">
          <Link href="/" className="hover:text-accent transition-colors">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <span className="text-soft">Site web Bassin d&rsquo;Arcachon</span>
        </nav>

        <h1 className="text-3xl md:text-5xl font-bold text-text-strong mb-6 leading-tight">
          Création de site web sur le Bassin d&rsquo;Arcachon
        </h1>

        <div className="space-y-6 text-lg text-soft leading-relaxed">
          <p>
            Je m&rsquo;appelle Anthony Marcelin. Je crée des sites internet
            depuis Saint-Laurent-Médoc, pour des projets sur le Bassin
            d&rsquo;Arcachon aussi. Un seul interlocuteur : moi. Passionné de
            technique depuis vingt ans, titulaire du titre professionnel de
            Concepteur Développeur d&rsquo;Applications.
          </p>
          <p>
            Si vous êtes une association, un commerce ou un studio du Bassin et
            que vous voulez un site clair, lisible sur téléphone, sans passer
            par une agence anonyme, cette page est pour vous. Le détail général
            de la prestation est sur{" "}
            <Link
              href="/creation-site-web/"
              className="text-accent hover:underline"
            >
              création de site web
            </Link>
            . Ici, l&rsquo;ancrage, c&rsquo;est le Bassin et un projet déjà
            livré à La Teste-de-Buch.
          </p>

          <h2 className="text-2xl font-bold text-text-strong">
            Rugby Handi Sud Bassin, à La Teste-de-Buch
          </h2>
          <p>
            Rugby Handi Sud Bassin est un club de rugby fauteuil. Le besoin
            était simple à dire et exigeant à tenir : un site qui présente le
            club, les infos utiles aux familles et aux bénévoles, et surtout un
            moyen de publier sans m&rsquo;appeler à chaque match ou chaque
            photo.
          </p>
          <p>
            J&rsquo;ai livré une vitrine claire, pensée mobile, avec un
            back-office Statamic. Les bénévoles mettent à jour le contenu
            eux-mêmes. Le site vit après la mise en ligne. Ce n&rsquo;est pas
            une maquette figée.
          </p>
          <p>
            C&rsquo;est le type de projet que je cherche sur le Bassin : peu de
            budget communication, beaucoup de besoin de clarté et
            d&rsquo;autonomie.
          </p>

          <h2 className="text-2xl font-bold text-text-strong">
            Pour qui, sur le Bassin
          </h2>
          <p>
            <strong>Associations.</strong> Calendrier, infos pratiques,
            recrutement de bénévoles ou de licenciés, et la possibilité de
            publier sans dépendre d&rsquo;un prestataire à chaque ligne.
          </p>
          <p>
            <strong>Commerces.</strong> Horaires, offre, contact, photos du
            métier. Une adresse web à vous, en plus des réseaux. Les réseaux
            aident à diffuser ; le site reste quand l&rsquo;algorithme change.
            J&rsquo;ai écrit ça plus longuement ici :{" "}
            <Link
              href="/blog/site-web-ou-reseaux-sociaux/"
              className="text-accent hover:underline"
            >
              site web ou réseaux sociaux
            </Link>
            .
          </p>
          <p>
            <strong>Studios et indépendants.</strong> Une galerie, une activité
            expliquée, un contact. Horizon Vertical Studio, côté impression
            murale, donne une idée de vitrine métier.
          </p>
          <p>
            Dans tous les cas : pages calées sur l&rsquo;activité réelle, pas
            sur un catalogue de mots-clés.
          </p>

          <h2 className="text-2xl font-bold text-text-strong">
            Comment on travaille depuis le Médoc
          </h2>
          <p>
            On démarre au téléphone, en visio, ou via{" "}
            <Link href="/#contact" className="text-accent hover:underline">
              le formulaire
            </Link>
            . Je réalise votre site et je reste votre interlocuteur après la
            mise en ligne. Selon vos besoins, je peux aussi assurer
            l&rsquo;hébergement, les sauvegardes et les mises à jour.
          </p>
          <p>
            Vous n&rsquo;avez pas besoin de venir à Saint-Laurent-Médoc pour un
            site. Si un rendez-vous en personne aide, on le place dans un lieu
            public, sur créneau. Pas d&rsquo;accueil boutique chez moi. Le
            détail est sur{" "}
            <Link
              href="/rendez-vous-saint-laurent-medoc/"
              className="text-accent hover:underline"
            >
              comment on se voit
            </Link>
            .
          </p>
          <p>
            Zone habituelle : Médoc, Bassin d&rsquo;Arcachon, Bordeaux, environ
            50 km. Déplacements exceptionnels, sur devis.
          </p>

          <h2 className="text-2xl font-bold text-text-strong">Budget</h2>
          <p>
            Une vitrine claire, avec un espace pour mettre à jour le contenu,
            commence à partir de 500 €. Le devis suit ce que le site doit
            vraiment faire. L&rsquo;échange et le devis sont gratuits.
          </p>
          <p>
            Après la mise en ligne, hébergement et suivi : seulement si vous le
            voulez, au cas par cas. Voir{" "}
            <Link
              href="/maintenance-site-web/"
              className="text-accent hover:underline"
            >
              maintenance
            </Link>
            .
          </p>

          <h2 className="text-2xl font-bold text-text-strong">
            Questions fréquentes
          </h2>
          {faq.map((item) => (
            <p key={item.q}>
              <strong>{item.q}</strong>
              <br />
              {item.a}
            </p>
          ))}

          <h2 className="text-2xl font-bold text-text-strong">Me joindre</h2>
          <p>
            Projet Bassin (asso, commerce, studio) :{" "}
            <a href="tel:+33645659696" className="text-accent hover:underline">
              06 45 65 96 96
            </a>
            ,{" "}
            <a
              href="mailto:contact@forgedigitalesolutions.com"
              className="text-accent hover:underline"
            >
              contact@forgedigitalesolutions.com
            </a>
            , ou{" "}
            <Link href="/#contact" className="text-accent hover:underline">
              le formulaire
            </Link>
            .
          </p>
        </div>

        <section className="mt-12 pt-8 border-t border-default">
          <Link href="/#contact" className="btn-primary gap-2 px-6 py-3">
            Demander un devis
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      </div>
    </div>
  );
}
