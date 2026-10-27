import type { Metadata } from "next";
import { umamiAttrs } from "@/lib/track";

const SITE_URL = "https://forgedigitalesolutions.com";
const PATH = "/gameplaydev-planner/confidentialite/";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Confidentialité - GamePlayDev Planner",
  description:
    "Politique de confidentialité de GamePlayDev Planner : données TikTok (open_id, profil, jetons), finalité de publication, conservation et droits RGPD.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: `${SITE_URL}${PATH}`,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${SITE_URL}${PATH}`,
    title:
      "Confidentialité - GamePlayDev Planner - Forge Digitale Solutions",
    description:
      "Données obtenues via TikTok Login Kit, utilisées uniquement pour publier les vidéos de l'éditeur sur @gameplaydevhw.",
    siteName: "Forge Digitale Solutions",
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Forge Digitale Solutions - Confidentialité GamePlayDev Planner",
      },
    ],
  },
};

export default function GamePlayDevConfidentialite() {
  return (
    <div className="min-h-screen bg-bg pt-32 pb-24 px-4">
      <div className="container mx-auto max-w-3xl prose prose-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          Politique de Confidentialité
        </h1>
        <p className="lead text-lg text-soft">
          GamePlayDev Planner. Dernière mise à jour : 26 octobre 2026
        </p>

        <section className="mb-10">
          <h2>1. Responsable du traitement</h2>
          <p>
            Le responsable du traitement est{" "}
            <strong>EI Anthony Marcelin</strong>, nom commercial{" "}
            <strong>Forge Digitale Solutions</strong>.
          </p>
          <ul className="list-none pl-0 space-y-2">
            <li>
              <strong>Responsable :</strong> Anthony Marcelin
            </li>
            <li>
              <strong>SIREN :</strong> 100 857 838
            </li>
            <li>
              <strong>Adresse :</strong> 6 rue Saint-Julien, 33112
              Saint-Laurent-Médoc, France
            </li>
            <li>
              <strong>Email :</strong>{" "}
              <a
                href="mailto:contact@forgedigitalesolutions.com"
                {...umamiAttrs("email-click", { place: "legal" })}
              >
                contact@forgedigitalesolutions.com
              </a>
            </li>
            <li>
              <strong>Téléphone :</strong> 06 45 65 96 96
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2>2. Champ d&apos;application</h2>
          <p>
            Cette politique décrit les données traitées par l&apos;application{" "}
            <strong>GamePlayDev Planner</strong> lors de la connexion TikTok.
            Elle ne couvre pas la navigation sur le site
            forgedigitalesolutions.com, décrite dans la{" "}
            <a href="/confidentialite/">politique de confidentialité du site</a>.
          </p>
          <p>
            L&apos;usage de l&apos;outil est précisé dans les{" "}
            <a href="/gameplaydev-planner/conditions-utilisation/">
              conditions d&apos;utilisation
            </a>
            .
          </p>
        </section>

        <section className="mb-10">
          <h2>3. Données obtenues via TikTok</h2>
          <p>
            Lorsque le compte de l&apos;éditeur se connecte via{" "}
            <strong>TikTok Login Kit</strong> (OAuth), l&apos;application reçoit
            les données suivantes :
          </p>
          <ul className="list-disc pl-4 space-y-2">
            <li>
              l&apos;identifiant <strong>open_id</strong> ;
            </li>
            <li>
              les informations de profil de base renvoyées avec le scope{" "}
              <strong>user.info.basic</strong> ;
            </li>
            <li>
              les <strong>jetons d&apos;accès</strong> et les{" "}
              <strong>jetons de rafraîchissement</strong>.
            </li>
          </ul>
          <p>Les scopes demandés sont uniquement :</p>
          <ul className="list-disc pl-4 space-y-2">
            <li>
              <strong>user.info.basic</strong>
            </li>
            <li>
              <strong>video.upload</strong>
            </li>
            <li>
              <strong>video.publish</strong>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2>4. Finalité</h2>
          <p>
            Ces données servent à une seule finalité : publier les vidéos de
            l&apos;éditeur (applications telles que Spawnzone) sur le compte
            TikTok <strong>@gameplaydevhw</strong>, via la Content Posting API.
          </p>
          <p>
            Elles ne sont pas utilisées pour de la publicité, de la prospection
            ou un autre traitement.
          </p>
        </section>

        <section className="mb-10">
          <h2>5. Stockage des jetons</h2>
          <p>
            Les jetons d&apos;accès et de rafraîchissement sont stockés de
            manière sécurisée, uniquement pour maintenir la connexion nécessaire
            à la publication.
          </p>
        </section>

        <section className="mb-10">
          <h2>6. Absence de revente et de partage</h2>
          <p>
            Ces données ne sont ni vendues, ni louées, ni cédées. Elles ne sont
            pas partagées avec des tiers autres que TikTok, contacté uniquement
            pour authentifier le compte et publier les vidéos demandées par
            l&apos;éditeur.
          </p>
          <p>
            TikTok traite les échanges avec ses services selon sa propre{" "}
            <a
              href="https://www.tiktok.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              politique de confidentialité
            </a>
            .
          </p>
        </section>

        <section className="mb-10">
          <h2>7. Durée de conservation</h2>
          <p>
            Les données listées ci-dessus, y compris les jetons, sont conservées
            jusqu&apos;à la révocation de l&apos;autorisation TikTok. Après cette
            révocation, elles ne sont plus conservées pour la publication.
          </p>
        </section>

        <section className="mb-10">
          <h2>8. Révocation</h2>
          <p>
            L&apos;accès accordé à GamePlayDev Planner peut être révoqué à tout
            moment depuis les réglages TikTok du compte connecté. La révocation
            retire l&apos;autorisation d&apos;utiliser les jetons pour publier.
          </p>
        </section>

        <section className="mb-10">
          <h2>9. Droits RGPD et CNIL</h2>
          <p>
            Conformément au Règlement général sur la protection des données
            (RGPD), la personne concernée dispose d&apos;un droit d&apos;accès,
            de rectification, d&apos;effacement, de limitation, d&apos;opposition
            et de portabilité.
          </p>
          <p>
            Pour exercer ces droits :{" "}
            <a
              href="mailto:contact@forgedigitalesolutions.com"
              {...umamiAttrs("email-click", { place: "legal" })}
            >
              contact@forgedigitalesolutions.com
            </a>
            .
          </p>
          <p>
            Une réclamation peut aussi être introduite auprès de la{" "}
            <strong>
              Commission nationale de l&apos;informatique et des libertés
            </strong>{" "}
            (CNIL) :{" "}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.cnil.fr
            </a>
            .
          </p>
        </section>

        <section className="mb-10">
          <h2>10. Contact</h2>
          <p>
            Forge Digitale Solutions, Anthony Marcelin :{" "}
            <a
              href="mailto:contact@forgedigitalesolutions.com"
              {...umamiAttrs("email-click", { place: "legal" })}
            >
              contact@forgedigitalesolutions.com
            </a>{" "}
            ou 06 45 65 96 96. Adresse : 6 rue Saint-Julien, 33112
            Saint-Laurent-Médoc, France.
          </p>
        </section>
      </div>
    </div>
  );
}
