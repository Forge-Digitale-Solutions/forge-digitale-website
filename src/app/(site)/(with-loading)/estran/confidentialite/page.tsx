import type { Metadata } from "next";
import { umamiAttrs } from "@/lib/track";

const SITE_URL = "https://forgedigitalesolutions.com";
const PATH = "/estran/confidentialite/";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Confidentialité - Estran",
  description:
    "Politique de confidentialité d'Estran : pas de compte, pas de publicité, aucune donnée collectée. Météo des spots fixes via WeatherKit et Open-Meteo. Marées REFMAR, Licence Ouverte 2.0.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${SITE_URL}${PATH}`,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${SITE_URL}${PATH}`,
    title: "Confidentialité - Estran - Forge Digitale Solutions",
    description:
      "Estran ne collecte aucune donnée. La météo porte sur les coordonnées fixes des spots (WeatherKit, Open-Meteo). Les marées sont un modèle local REFMAR.",
    siteName: "Forge Digitale Solutions",
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Forge Digitale Solutions - Confidentialité Estran",
      },
    ],
  },
};

export default function EstranConfidentialite() {
  return (
    <div className="min-h-screen bg-bg pt-32 pb-24 px-4">
      <div className="container mx-auto max-w-3xl prose prose-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          Politique de Confidentialité
        </h1>
        <p className="lead text-lg text-soft">
          Estran. Dernière mise à jour : 13 novembre 2026
        </p>

        <section className="mb-10">
          <h2>1. Application</h2>
          <p>
            Cette page décrit l&apos;application iOS <strong>Estran</strong>.
            Elle indique si le moment convient pour une activité côtière sur
            deux spots : Pointe de Grave et Arcachon-Eyrac. Elle ne décrit pas
            la navigation sur le site forgedigitalesolutions.com.
          </p>
        </section>

        <section className="mb-10">
          <h2>2. Aucune donnée collectée</h2>
          <p>
            Estran ne crée pas de compte. Elle n&apos;affiche pas de publicité
            et ne mesure pas l&apos;audience. Aucune donnée personnelle
            n&apos;est collectée par l&apos;application, ni transmise à Forge
            Digitale Solutions.
          </p>
        </section>

        <section className="mb-10">
          <h2>3. Position</h2>
          <p>
            L&apos;application ne demande pas la position de l&apos;iPhone. La
            météo est demandée pour les coordonnées fixes des deux spots, pas
            pour l&apos;endroit où se trouve la personne qui l&apos;utilise.
          </p>
        </section>

        <section className="mb-10">
          <h2>4. Sources</h2>
          <p>
            La météo de l&apos;air (vent, température, précipitations,
            visibilité) est demandée à <strong>Apple WeatherKit</strong> pour
            les coordonnées fixes du spot choisi. Si WeatherKit ne répond pas,
            la même demande part vers <strong>Open-Meteo</strong>, toujours
            pour ces coordonnées.
          </p>
          <p>
            À la Pointe de Grave, la houle et la température de l&apos;eau
            viennent d&apos;Open-Meteo Marine, sur un point fixe au large de la
            plage. À Arcachon-Eyrac, la houle est estimée sur l&apos;iPhone à
            partir du vent déjà obtenu pour ce spot : ce modèle marin ne
            décrit pas l&apos;eau du bassin, et la température de l&apos;eau
            n&apos;y est pas fournie.
          </p>
          <p>
            Les marées sont calculées sur l&apos;iPhone. Le modèle local est
            ajusté sur les observations <strong>REFMAR</strong> (Shom), sous{" "}
            <a
              href="https://github.com/etalab/licence-ouverte/blob/master/LO.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              Licence Ouverte 2.0
            </a>
            . Aucun service de marée n&apos;est appelé pendant l&apos;usage. Ce
            modèle n&apos;est pas officiel : il ne remplace pas les documents
            officiels et ne doit pas servir à la sécurité en mer.
          </p>
        </section>

        <section className="mb-10">
          <h2>5. Réglages</h2>
          <p>
            Le spot choisi est enregistré sur l&apos;iPhone. L&apos;activité
            choisie (pêche à pied, surf, bateau, balade ou baignade) reste
            dans l&apos;application, sur l&apos;appareil. Ni le spot ni
            l&apos;activité ne sont envoyés à Forge Digitale Solutions.
          </p>
        </section>

        <section className="mb-10">
          <h2>6. Éditeur</h2>
          <p>
            L&apos;éditeur de l&apos;application est{" "}
            <strong>EI Anthony Marcelin</strong>, nom commercial{" "}
            <strong>Forge Digitale Solutions</strong>.
          </p>
          <ul className="list-none pl-0 space-y-2">
            <li>
              <strong>Responsable légal :</strong> Anthony Marcelin
            </li>
            <li>
              <strong>Statut juridique :</strong> Entrepreneur Individuel
              (Micro-entreprise)
            </li>
            <li>
              <strong>SIREN :</strong> 100 857 838
            </li>
            <li>
              <strong>Code APE :</strong> 62.01Z (Programmation informatique)
            </li>
            <li>
              <strong>Adresse :</strong> 6 rue Saint-Julien, 33112
              Saint-Laurent-Médoc, France
            </li>
            <li>
              <strong>TVA :</strong> TVA non applicable, art. 293 B du CGI
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
          <h2>7. Contact</h2>
          <p>
            Pour une question sur cette politique :{" "}
            <a
              href="mailto:contact@forgedigitalesolutions.com"
              {...umamiAttrs("email-click", { place: "legal" })}
            >
              contact@forgedigitalesolutions.com
            </a>
            .
          </p>
          <p>
            Aide à l&apos;usage et signalement d&apos;un bug :{" "}
            <a href="/estran/assistance/">page d&apos;assistance Estran</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
