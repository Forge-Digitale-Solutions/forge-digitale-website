'use client';

import React from 'react';

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://forgedigitalesolutions.com/#business",
    name: "Forge Digitale Solutions",
    alternateName: "La Forge Digitale",
    description: "Création de sites web sur mesure, montage PC gamer, dépannage informatique et installation Linux dans le Médoc. Expertise locale à Saint-Laurent-Médoc.",
    url: "https://forgedigitalesolutions.com",
    telephone: "+33645659696",
    email: "contact@forgedigitalesolutions.com",
    priceRange: "€€",
    image: [
      "https://forgedigitalesolutions.com/logos/Logo1rond.png",
      "https://forgedigitalesolutions.com/images/og-image.jpg"
    ],
    logo: "https://forgedigitalesolutions.com/logos/Logo1rond.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: "36 chemin de la Mienne",
      addressLocality: "Saint-Laurent-Médoc",
      postalCode: "33112",
      addressRegion: "Nouvelle-Aquitaine",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.15,
      longitude: -0.8242,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Saint-Laurent-Médoc",
      },
      {
        "@type": "City",
        name: "Lesparre-Médoc",
      },
      {
        "@type": "City",
        name: "Pauillac",
      },
      {
        "@type": "City",
        name: "Castelnau-de-Médoc",
      },
      {
        "@type": "City",
        name: "Bordeaux",
      },
      {
        "@type": "City",
        name: "Arcachon",
      },
      {
        "@type": "Place",
        name: "Bassin d'Arcachon",
      },
      {
        "@type": "AdministrativeArea",
        name: "Médoc",
      },
      {
        "@type": "AdministrativeArea",
        name: "Gironde",
      },
      {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 45.15,
          longitude: -0.8242,
        },
        geoRadius: "50000",
      },
    ],
    founder: {
      "@type": "Person",
      name: "Anthony Marcelin",
      jobTitle: "Concepteur Développeur d'Applications (Titre Pro)",
      url: "https://forgedigitalesolutions.com/about",
      sameAs: [
        "https://www.linkedin.com/in/anthonymarcelin",
      ],
    },
    employee: [
      {
        "@type": "Person",
        name: "Anthony Marcelin",
        jobTitle: "Développeur Fullstack & Technicien Hardware",
      }
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        opens: "08:30",
        closes: "18:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services Numériques & Hardware Médoc",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Création de site web & applications",
            description: "Sites vitrines ultra-rapides et applications métiers sur mesure pour artisans et PME du Médoc.",
            serviceType: "Web Development",
            areaServed: "Gironde",
            provider: {
              "@type": "LocalBusiness",
              "@id": "https://forgedigitalesolutions.com/#business"
            }
          },
          url: "https://forgedigitalesolutions.com/services",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Montage PC sur mesure",
            description: "Assemblage de PC gaming, workstation ou familial avec optimisation BIOS/XMP et suivi 1 an.",
            serviceType: "Computer Assembly",
            areaServed: "Gironde",
            provider: {
              "@type": "LocalBusiness",
              "@id": "https://forgedigitalesolutions.com/#business"
            }
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "149",
            priceCurrency: "EUR",
            description: "Forfait montage complet (client fournit pièces)",
            eligibleRegion: "FR",
          },
          url: "https://forgedigitalesolutions.com/services",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Forfait Renaissance - Seconde vie Linux",
            description: "Nettoyage, installation Linux Mint, optimisation Green IT et 1h prise en main pour vieux PC.",
            serviceType: "Computer Repair",
            areaServed: "Gironde",
            provider: {
              "@type": "LocalBusiness",
              "@id": "https://forgedigitalesolutions.com/#business"
            }
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "69",
            priceCurrency: "EUR",
            description: "Forfait complet (client fournit matériel)",
            eligibleRegion: "FR",
          },
          url: "https://forgedigitalesolutions.com/services",
        },
      ],
    },
    sameAs: [
      "https://www.facebook.com/profile.php?id=61577431918424",
      "https://www.linkedin.com/in/anthony-marcelin/",
      "https://www.linkedin.com/company/forge-digitale-solutions/",
    ],
    knowsAbout: [
      "Création de site web",
      "Développement d'application",
      "Linux Mint",
      "Montage PC",
      "Green IT",
      "Développement web Gironde"
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "3",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Zilya" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody: "J'ai fait appel à ses services pour une remise à neuf de mon ordinateur pour mes études. J'avais un vieil ordinateur sous Windows 7 qui était lent. Je suis maintenant sur Linux Mint, l'ordinateur a repris une seconde jeunesse, fluide et simple à utiliser. Ce monsieur a été très pédagogue pour la prise en main prévue dans la prestation. Je recommande chaudement.",
        datePublished: "2026-05-19",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Stéphanie Cornut" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody: "À l'écoute, réactif, sérieux.",
        datePublished: "2026-05-19",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "David Moussiron" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody: "Très pro et très réactif. Merci pour votre travail.",
        datePublished: "2026-05-28",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}
