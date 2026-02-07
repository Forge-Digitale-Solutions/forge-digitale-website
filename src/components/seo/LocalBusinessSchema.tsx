export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://forgedigitalesolutions.com/#business",
    name: "Forge Digitale Solutions",
    alternateName: "La Forge Digitale",
    description:
      "Création de sites web sur mesure, montage PC gamer, dépannage informatique et installation Linux en Médoc. Expertise locale à Saint-Laurent-Médoc.",
    url: "https://forgedigitalesolutions.com",
    telephone: "+33645659696",
    email: "contact@forgedigitalesolutions.com",
    priceRange: "€€",
    image: "https://forgedigitalesolutions.com/logos/Logo1rond.png",
    logo: "https://forgedigitalesolutions.com/logos/Logo1rond.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Saint-Laurent-Médoc",
      postalCode: "33112",
      addressRegion: "Nouvelle-Aquitaine",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.1432,
      longitude: -0.8242,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Saint-Laurent-Médoc",
      },
      {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 45.1432,
          longitude: -0.8242,
        },
        geoRadius: "50000",
      },
    ],
    founder: {
      "@type": "Person",
      name: "Anthony Marcelin",
      jobTitle: "Concepteur Développeur d'Applications",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    sameAs: [],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Création de site web & applications",
            description:
              "Sites vitrines ultra-rapides et applications métiers sur mesure pour artisans et PME",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Montage PC sur mesure",
            description:
              "Assemblage de PC gaming, workstation ou familial avec conseil personnalisé",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "149",
            priceCurrency: "EUR",
            description: "Forfait montage complet",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Forfait Renaissance - Seconde vie Linux",
            description:
              "Nettoyage complet et installation Linux pour redonner vie à votre ordinateur",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "69",
            priceCurrency: "EUR",
            description: "Forfait complet avec prise en main",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "1",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
