import type { Metadata } from "next";
import { umamiAttrs } from "@/lib/track";

const SITE_URL = "https://forgedigitalesolutions.com";
const PATH = "/gameplaydev-planner/conditions-utilisation/";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Conditions d'utilisation - GamePlayDev Planner",
  description:
    "Conditions d'utilisation de GamePlayDev Planner, outil interne de Forge Digitale Solutions pour publier sur le compte TikTok @gameplaydevhw.",
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
      "Conditions d'utilisation - GamePlayDev Planner - Forge Digitale Solutions",
    description:
      "Outil interne réservé au compte TikTok @gameplaydevhw. Connexion via TikTok Login Kit, publication via la Content Posting API.",
    siteName: "Forge Digitale Solutions",
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Forge Digitale Solutions - GamePlayDev Planner",
      },
    ],
  },
};

export default function GamePlayDevConditions() {
  return (
    <div className="min-h-screen bg-bg pt-32 pb-24 px-4">
      <div className="container mx-auto max-w-3xl prose prose-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          Conditions d&apos;utilisation
        </h1>
        <p className="lead text-lg text-soft">
          GamePlayDev Planner. Dernière mise à jour : 26 octobre 2026
        </p>

        <section className="mb-10">
          <h2>1. Objet</h2>
          <p>
            Les présentes conditions régissent l&apos;usage de{" "}
            <strong>GamePlayDev Planner</strong>, outil interne édité par{" "}
            <strong>Forge Digitale Solutions</strong> (EI Anthony Marcelin).
          </p>
          <p>
            Cet outil publie, sur le compte TikTok{" "}
            <strong>@gameplaydevhw</strong>, les vidéos des applications de
            l&apos;éditeur, notamment Spawnzone. La connexion au compte passe
            par <strong>TikTok Login Kit</strong>. La mise en ligne des vidéos
            passe par la <strong>Content Posting API</strong> de TikTok.
          </p>
        </section>

        <section className="mb-10">
          <h2>2. Éditeur</h2>
          <ul className="list-none pl-0 space-y-2">
            <li>
              <strong>Éditeur :</strong> EI Anthony Marcelin
            </li>
            <li>
              <strong>Nom commercial :</strong> Forge Digitale Solutions
            </li>
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
          <h2>3. Usage interne</h2>
          <p>
            GamePlayDev Planner est réservé à l&apos;éditeur, pour le seul
            compte TikTok <strong>@gameplaydevhw</strong>. L&apos;outil
            n&apos;est pas proposé au public et ne constitue pas un service de
            publication pour des tiers.
          </p>
        </section>

        <section className="mb-10">
          <h2>4. Accès via la connexion TikTok</h2>
          <p>
            L&apos;accès à l&apos;outil se fait par la connexion TikTok (TikTok
            Login Kit). L&apos;autorisation accordée permet d&apos;identifier le
            compte connecté et de publier des vidéos sur ce compte, dans la
            limite des autorisations demandées.
          </p>
        </section>

        <section className="mb-10">
          <h2>5. Respect des conditions de TikTok</h2>
          <p>
            L&apos;usage de GamePlayDev Planner implique le respect des règles
            de TikTok, notamment ses{" "}
            <a
              href="https://www.tiktok.com/legal/terms-of-service"
              target="_blank"
              rel="noopener noreferrer"
            >
              conditions d&apos;utilisation
            </a>
            , sa{" "}
            <a
              href="https://www.tiktok.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              politique de confidentialité
            </a>{" "}
            et les conditions applicables aux développeurs ainsi qu&apos;à la
            Content Posting API.
          </p>
          <p>
            TikTok peut refuser, limiter ou retirer une vidéo selon ses propres
            règles. L&apos;éditeur s&apos;y conforme.
          </p>
        </section>

        <section className="mb-10">
          <h2>6. Contenu publié</h2>
          <p>
            Les vidéos envoyées par l&apos;outil, y compris celles des
            applications de l&apos;éditeur telles que Spawnzone, sont publiées
            sous la seule responsabilité de l&apos;éditeur.
          </p>
          <p>
            L&apos;éditeur est responsable du contenu, des droits nécessaires à
            sa diffusion et du respect des règles TikTok.
          </p>
        </section>

        <section className="mb-10">
          <h2>7. Absence de garantie</h2>
          <p>
            GamePlayDev Planner est fourni en l&apos;état, sans garantie de
            disponibilité, de continuité de service, ni d&apos;acceptation des
            vidéos par TikTok. L&apos;éditeur ne garantit pas que chaque envoi
            aboutira, ni que l&apos;outil fonctionnera sans interruption.
          </p>
        </section>

        <section className="mb-10">
          <h2>8. Droit applicable</h2>
          <p>
            Les présentes conditions sont soumises au droit français. En cas de
            litige, une solution amiable sera recherchée avant toute action
            judiciaire. À défaut, les tribunaux compétents seront ceux du
            ressort du siège de l&apos;entreprise (Bordeaux).
          </p>
        </section>

        <section className="mb-10">
          <h2>9. Contact</h2>
          <p>
            Pour toute question sur ces conditions :{" "}
            <a
              href="mailto:contact@forgedigitalesolutions.com"
              {...umamiAttrs("email-click", { place: "legal" })}
            >
              contact@forgedigitalesolutions.com
            </a>{" "}
            ou 06 45 65 96 96.
          </p>
          <p>
            Le traitement des données liées à la connexion TikTok est décrit
            dans la{" "}
            <a href="/gameplaydev-planner/confidentialite/">
              politique de confidentialité de GamePlayDev Planner
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
