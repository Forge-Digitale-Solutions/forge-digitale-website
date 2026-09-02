import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

const SITE_URL = "https://forgedigitalesolutions.com";
const PAGE_URL = `${SITE_URL}/creation-site-internet-medoc/`;

export const metadata: Metadata = {
  title: {
    absolute: "Création de site internet dans le Médoc | Anthony Marcelin",
  },
  description:
    "Anthony Marcelin, développeur indépendant à Saint-Laurent-Médoc. Sites internet pour TPE, vitrine à partir de 500 euros, un interlocuteur. Devis gratuit.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: PAGE_URL,
    siteName: "Forge Digitale Solutions",
    title: "Création de site internet dans le Médoc | Anthony Marcelin",
    description:
      "Anthony Marcelin, développeur indépendant à Saint-Laurent-Médoc. Sites internet pour TPE, vitrine à partir de 500 euros, un interlocuteur. Devis gratuit.",
  },
};

export default function CreationSiteInternetMedocPage() {
  return (
    <div className="min-h-screen bg-bg pt-32 pb-24">
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: `${SITE_URL}/` },
          { name: "Création de site internet dans le Médoc", url: PAGE_URL },
        ]}
      />
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <nav className="text-sm text-faint mb-8" aria-label="Fil d'Ariane">
          <Link href="/" className="hover:text-accent transition-colors">
            Accueil
          </Link>
          <span className="mx-2">/</span>
          <span className="text-soft">Création de site internet dans le Médoc</span>
        </nav>

        <h1 className="text-3xl md:text-5xl font-bold text-text-strong mb-6 leading-tight">
          Création de site internet dans le Médoc
        </h1>

        <div className="space-y-6 text-lg text-soft leading-relaxed">
          <p>
            Je m&rsquo;appelle Anthony Marcelin. Développeur indépendant (EI),
            titulaire du titre professionnel de Concepteur Développeur
            d&rsquo;Applications. Passionné de technique depuis vingt ans. Un
            seul interlocuteur : moi.
          </p>
          <p>
            Si vous voulez un site internet et quelqu&rsquo;un dans le Médoc pour
            le faire, vous cherchez surtout trois choses : un numéro à appeler,
            un ordre de prix, et une idée de ce qui se passe après. C&rsquo;est
            ce que cette page raconte.
          </p>

          <h2 className="text-2xl font-bold text-text-strong">
            Ce qu&rsquo;un site internet fait pour une TPE, et ce qu&rsquo;il ne
            fait pas
          </h2>
          <p>
            La plupart des artisans, commerçants et petites structures que je
            croise ont déjà quelque chose : Facebook, Instagram, parfois une
            fiche Google. Ça sert. Ça ne remplace pas un site internet à vous.
          </p>
          <p>
            Un site internet, concrètement : qui vous êtes, ce que vous faites,
            pour qui, comment on vous joint. Des photos du travail. Les infos
            pratiques. Lisible sur un téléphone. Vous en êtes propriétaire. Un
            réseau peut changer ses règles. Votre site, non.
          </p>
          <p>
            Ce n&rsquo;est pas quarante pages. Ce n&rsquo;est pas une
            application. Ce n&rsquo;est pas « être premier sur Google ». Je ne
            promets pas de position. La fiche Google, si vous en avez une, a un
            autre rôle : le lieu, les horaires, les avis. Les deux se
            complètent. Si vous êtes artisan ou commerçant et que c&rsquo;est
            surtout ça que vous voulez trancher :{" "}
            <Link
              href="/site-internet-artisan-medoc/"
              className="text-accent hover:underline"
            >
              site internet pour artisan dans le Médoc
            </Link>
            .
          </p>
          <p>
            Si vous cherchez une application ou un outil métier en plus
            d&rsquo;une vitrine, ce n&rsquo;est pas ici :{" "}
            <Link href="/creation-site-web/" className="text-accent hover:underline">
              création de site web
            </Link>
            .
          </p>

          <h2 className="text-2xl font-bold text-text-strong">
            Comment ça se passe
          </h2>
          <p>
            On commence par parler. Téléphone, mail, ou{" "}
            <Link href="/#contact" className="text-accent hover:underline">
              le formulaire
            </Link>
            . Vous me dites ce que vous faites, pour qui, et ce qui manque
            aujourd&rsquo;hui. Je pose des questions concrètes. Pas un brief de
            quinze pages à remplir tout seul.
          </p>
          <p>
            Ensuite je propose une structure de pages utile. Assez pour
            qu&rsquo;un visiteur comprenne et puisse vous appeler. Pas « plus de
            pages pour le référencement ».
          </p>
          <p>
            Je développe. Vous voyez, vous validez, on corrige. Quand c&rsquo;est
            prêt, on met en ligne. S&rsquo;il y a un back-office, vous pouvez
            mettre à jour (textes, photos, horaires). Si vous préférez ne pas y
            toucher, on en parle. Rien n&rsquo;est imposé.
          </p>
          <p>
            Les contenus, c&rsquo;est souvent le vrai délai. Sans vos photos,
            sans une offre claire, je ne peux pas livrer un site qui ressemble à
            votre activité. On le dit dès le premier échange.
          </p>
          <p>
            Un site internet se fait très bien à distance. Le rendez-vous
            physique est l&rsquo;exception. Si on se voit, c&rsquo;est à
            l&rsquo;atelier, sur rendez-vous, ou dans un rayon d&rsquo;environ 50
            km, sur devis.
          </p>

          <h2 className="text-2xl font-bold text-text-strong">
            L&rsquo;ordre de prix
          </h2>
          <p>
            Une vitrine claire, utile, pensée pour le téléphone, avec un espace
            pour mettre à jour le contenu, à partir de 500 €. Pas de packs. Le
            devis suit ce que le site doit vraiment faire : quelques pages, un
            formulaire, ou plus.
          </p>
          <p>
            L&rsquo;échange et le devis sont gratuits. Les montants fermes, après
            avoir compris le besoin, pas au forfait.
          </p>
          <p>
            Après la mise en ligne : hébergement, nom de domaine, mises à jour,
            sauvegardes. Seulement si vous le voulez, au cas par cas. Pas de
            forfait mensuel unique. Le détail est dans la{" "}
            <Link href="/faq/" className="text-accent hover:underline">
              FAQ
            </Link>
            .
          </p>

          <h2 className="text-2xl font-bold text-text-strong">
            L&rsquo;atelier, à Saint-Laurent-Médoc
          </h2>
          <p>
            Atelier privé, 6 rue Saint-Julien, 33112 Saint-Laurent-Médoc. Sur
            rendez-vous. Ce n&rsquo;est pas une boutique : on ne passe pas
            déposer un dossier sans avoir appelé.
          </p>
          <p>
            Ma fiche Google est une zone de service. Pas d&rsquo;adresse de rue
            dessus. Ne venez pas à une adresse trouvée sur Maps. Le lieu :{" "}
            <Link
              href="/atelier-saint-laurent-medoc/"
              className="text-accent hover:underline"
            >
              page atelier
            </Link>
            .
          </p>
          <p>
            Je travaille depuis Saint-Laurent-Médoc. Médoc, Bassin
            d&rsquo;Arcachon, Bordeaux, dans un rayon d&rsquo;environ 50 km.
          </p>

          <h2 className="text-2xl font-bold text-text-strong">
            Des sites déjà livrés
          </h2>
          <p>Pas une galerie de maquettes. Trois sites en ligne.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Charcuterie Campagnarde</strong> : vitrine de commerçant
              artisanal. Produits, infos pratiques, lisible sur téléphone.
            </li>
            <li>
              <strong>Horizon Vertical Studio</strong> : studio d&rsquo;impression
              murale. L&rsquo;activité, une galerie, entreprises et particuliers.
            </li>
            <li>
              <strong>Rugby Handi Sud Bassin</strong>, à La Teste-de-Buch : site
              associatif, avec un back-office pour que les bénévoles mettent à
              jour eux-mêmes.
            </li>
          </ul>
          <p>
            Six avis 5 étoiles sur{" "}
            <a
              href="https://www.google.com/search?kgmid=/g/11zbjsx1hc"
              className="text-accent hover:underline"
              rel="noopener noreferrer"
            >
              la fiche Google
            </a>
            .
          </p>

          <h2 className="text-2xl font-bold text-text-strong">
            Questions fréquentes
          </h2>
          <p>
            <strong>
              Je n&rsquo;ai que Facebook. Est-ce que j&rsquo;ai besoin d&rsquo;un
              site internet ?
            </strong>
            <br />
            Souvent oui, si vous voulez un endroit à vous : l&rsquo;offre, les
            photos, le contact. Les réseaux aident à diffuser. Ils ne vous
            appartiennent pas.
          </p>
          <p>
            <strong>
              Faut-il venir jusqu&rsquo;à Saint-Laurent-Médoc ?
            </strong>
            <br />
            Non pour un site internet. Téléphone, visio, formulaire. Le
            rendez-vous à l&rsquo;atelier, s&rsquo;il y a une raison de se voir.
          </p>
          <p>
            <strong>Vous vous occupez de tout après ?</strong>
            <br />
            Si vous le demandez. Maintenance au cas par cas, pas un abonnement
            inventé. Sinon je vous laisse autonome, si le site est prévu pour.
          </p>
          <p>
            <strong>C&rsquo;est long ?</strong>
            <br />
            Ça dépend surtout de vos contenus (textes, photos, logo). Sans ça,
            on n&rsquo;avance pas. On le pose dès le premier échange.
          </p>

          <h2 className="text-2xl font-bold text-text-strong">Me joindre</h2>
          <p>
            Si l&rsquo;ordre de prix vous convient et que vous êtes dans le
            secteur :{" "}
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
