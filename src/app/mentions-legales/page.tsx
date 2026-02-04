export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-dark-base pt-32 pb-24 px-4">
      <div className="container mx-auto max-w-3xl prose prose-invert prose-headings:text-white prose-p:text-slate-400 prose-li:text-slate-400 prose-strong:text-white prose-a:text-[#C5A059]">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          Mentions Légales
        </h1>

        <section className="mb-10">
          <h2>1. Éditeur du site</h2>
          <p>
            Conformément aux dispositions de l&apos;article 6-I 1° de la loi
            n°2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie
            numérique (LCEN), l&apos;éditeur du site{" "}
            <strong>forgedigitalesolutions.com</strong> est :
          </p>
          <ul className="list-none pl-0 space-y-2 mt-4">
            <li>
              <strong>Nom commercial :</strong> Forge Digitale Solutions
            </li>
            <li>
              <strong>Responsable légal :</strong> Anthony Marcelin
            </li>
            <li>
              <strong>Statut juridique :</strong> Entrepreneur Individuel
              (Micro-entreprise)
            </li>
            <li>
              <strong>SIRET :</strong> En cours d&apos;immatriculation
            </li>
            <li>
              <strong>Adresse :</strong> 33112 Saint-Laurent-Médoc, France
            </li>
            <li>
              <strong>TVA :</strong> TVA non applicable, art. 293 B du CGI
            </li>
            <li>
              <strong>Email :</strong>{" "}
              <a href="mailto:contact@forgedigitalesolutions.com">
                contact@forgedigitalesolutions.com
              </a>
            </li>
            <li>
              <strong>Téléphone :</strong> 06 45 65 96 96
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2>2. Hébergement</h2>
          <p>
            Le site est hébergé par la société :<br />
            <strong>OVH SAS</strong>
            <br />
            Société par actions simplifiée au capital de 10 174 560 €<br />
            Siège social : 2 rue Kellermann - 59100 Roubaix - France
            <br />
            RCS Lille Métropole 424 761 419 00045
            <br />
            Site web :{" "}
            <a
              href="https://www.ovhcloud.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.ovhcloud.com
            </a>
          </p>
        </section>

        <section className="mb-10">
          <h2>3. Propriété Intellectuelle</h2>
          <p>
            L&apos;ensemble des éléments présents sur le site (structure
            générale, textes, images, graphismes, logo, icônes) sont la
            propriété exclusive de <strong>Anthony Marcelin</strong> ou de ses
            partenaires.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication,
            adaptation de tout ou partie des éléments du site, quel que soit le
            moyen ou le procédé utilisé, est interdite, sauf autorisation écrite
            préalable de l&apos;auteur, conformément aux articles L.335-2 et
            suivants du Code de la Propriété Intellectuelle.
          </p>
        </section>

        <section className="mb-10">
          <h2>4. Responsabilité</h2>
          <p>
            L&apos;éditeur s&apos;efforce de fournir sur le site des
            informations aussi précises que possible. Toutefois, il ne pourra
            être tenu responsable des oublis, des inexactitudes et des carences
            dans la mise à jour, qu&apos;elles soient de son fait ou du fait des
            tiers partenaires qui lui fournissent ces informations.
          </p>
          <p>
            Le site contient des liens hypertextes vers d&apos;autres sites.
            Cependant, l&apos;éditeur n&apos;a pas la possibilité de vérifier le
            contenu des sites ainsi visités, et n&apos;assumera en conséquence
            aucune responsabilité de ce fait.
          </p>
        </section>
      </div>
    </div>
  );
}
