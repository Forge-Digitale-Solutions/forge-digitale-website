export function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Combien coûte la création d'un site internet ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le coût dépend entièrement de vos besoins spécifiques : un site vitrine simple, un site catalogue ou une application métier complexe ne demandent pas le même travail. Mon approche est de construire une solution 100% sur-mesure, adaptée à vos objectifs et à votre budget. L'étude de votre projet est gratuite.",
        },
      },
      {
        "@type": "Question",
        name: "Et après la mise en ligne ? Proposez-vous de la maintenance ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, je propose une formule de maintenance clé en main qui inclut l'hébergement, le renouvellement du nom de domaine, les sauvegardes et la sécurité. Selon vos besoins, nous définissons un forfait mensuel d'heures incluses pour les modifications courantes.",
        },
      },
      {
        "@type": "Question",
        name: "Comment se passe le montage PC ? Dois-je acheter les pièces ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, c'est le principe de mon offre : la transparence totale. Je vous fournis les liens vers les composants aux meilleurs prix, vous commandez directement (les factures et garanties sont à votre nom), puis je réalise le montage professionnel avec câble management, optimisation du flux d'air et installation système.",
        },
      },
      {
        "@type": "Question",
        name: "Pourquoi passer par vous plutôt que d'acheter un PC tout fait ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Les PC de grande surface utilisent souvent des composants entrée de gamme et des formats propriétaires non évolutifs. Je prends le temps de soigner chaque détail pour une machine silencieuse, fiable et totalement évolutive. Vous pourrez upgrader uniquement ce dont vous avez besoin dans quelques années.",
        },
      },
      {
        "@type": "Question",
        name: "Pourquoi passer sous Linux (Forfait Renaissance) ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Windows 10 est en fin de vie et Windows 11 refuse de s'installer sur les anciens processeurs. Plutôt que d'acheter un PC neuf inutilement, Linux (comme Linux Mint) redonne vie à votre machine avec performance, durabilité et une interface simple proche de Windows.",
        },
      },
      {
        "@type": "Question",
        name: "Intervenez-vous à domicile ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pour garantir une qualité optimale, je réalise toutes les interventions dans mon atelier privé à Saint-Laurent-Médoc avec bancs de test et outillage de précision. Les déplacements sont exceptionnels et font l'objet d'une facturation sur devis.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
