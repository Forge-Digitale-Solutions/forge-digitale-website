import type { Metadata } from "next";
import { umamiAttrs } from "@/lib/track";

const SITE_URL = "https://forgedigitalesolutions.com";
const PATH = "/estran/assistance/";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Assistance - Estran",
  description:
    "Assistance Estran : marées non officielles, météo par spot (WeatherKit, Open-Meteo), réglages sur l'iPhone, signalement d'un bug.",
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
    title: "Assistance - Estran - Forge Digitale Solutions",
    description:
      "Aide pour Estran : deux spots fixes, marées REFMAR non officielles, météo du spot choisi, pas de compte.",
    siteName: "Forge Digitale Solutions",
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Forge Digitale Solutions - Assistance Estran",
      },
    ],
  },
};

export default function EstranAssistance() {
  return (
    <div className="min-h-screen bg-bg pt-32 pb-24 px-4">
      <div className="container mx-auto max-w-3xl prose prose-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Assistance</h1>
        <p className="lead text-lg text-soft">
          Estran. Dernière mise à jour : 13 novembre 2026
        </p>

        <section className="mb-10">
          <h2>À quoi sert Estran</h2>
          <p>
            Estran répond oui ou non pour une sortie (pêche à pied, surf,
            bateau, balade ou baignade) sur deux spots fixes : Pointe de Grave
            et Arcachon-Eyrac, où le surf n&apos;est pas proposé. Les marées
            sont calculées sur l&apos;iPhone ; la météo est celle du spot
            choisi, pas celle de l&apos;endroit où se trouve l&apos;iPhone.
          </p>
        </section>

        <section className="mb-10">
          <h2>Les marées sont-elles officielles ?</h2>
          <p>
            Non. C&apos;est un modèle local ajusté sur les observations{" "}
            <strong>REFMAR</strong> (Shom), sous Licence Ouverte 2.0. Il
            n&apos;est pas officiel, il ne remplace pas les documents officiels
            et il ne doit pas servir à la sécurité en mer.
          </p>
        </section>

        <section className="mb-10">
          <h2>La météo suit-elle ma position ?</h2>
          <p>
            Non. Estran ne demande pas la position de l&apos;iPhone. La météo
            de l&apos;air vient d&apos;Apple <strong>WeatherKit</strong> pour
            les coordonnées fixes du spot choisi (Pointe de Grave ou
            Arcachon-Eyrac). Si WeatherKit ne répond pas,{" "}
            <strong>Open-Meteo</strong> prend le relais, pour les mêmes
            coordonnées.
          </p>
          <p>
            À la Pointe de Grave, la houle vient d&apos;Open-Meteo Marine, sur
            un point fixe au large. À Arcachon-Eyrac, elle est estimée sur
            l&apos;iPhone à partir du vent de ce spot.
          </p>
        </section>

        <section className="mb-10">
          <h2>Faut-il un compte ?</h2>
          <p>
            Non. Pas de compte, pas de publicité, pas de mesure
            d&apos;audience.
          </p>
        </section>

        <section className="mb-10">
          <h2>Où sont le spot et l&apos;activité ?</h2>
          <p>
            Sur l&apos;iPhone. Le spot choisi y est enregistré. L&apos;activité
            choisie reste dans l&apos;application, sur l&apos;appareil. Rien de
            tout cela n&apos;est envoyé à Forge Digitale Solutions.
          </p>
        </section>

        <section className="mb-10">
          <h2>Signaler un bug</h2>
          <p>
            Écrivez à{" "}
            <a
              href="mailto:contact@forgedigitalesolutions.com"
              {...umamiAttrs("email-click", { place: "legal" })}
            >
              contact@forgedigitalesolutions.com
            </a>
            . Indiquez le modèle d&apos;iPhone, la version d&apos;iOS, et ce
            que l&apos;écran affiche.
          </p>
        </section>

        <section className="mb-10">
          <h2>Confidentialité</h2>
          <p>
            Le détail des données et des sources est sur la{" "}
            <a href="/estran/confidentialite/">
              politique de confidentialité d&apos;Estran
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
