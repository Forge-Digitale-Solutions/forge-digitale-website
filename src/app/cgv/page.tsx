export default function CGV() {
  return (
    <div className="min-h-screen bg-dark-base pt-32 pb-24 px-4">
      <div className="container mx-auto max-w-3xl prose prose-invert prose-headings:text-white prose-p:text-slate-400 prose-li:text-slate-400 prose-strong:text-white prose-a:text-[#C5A059]">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          Conditions Générales de Vente (CGV)
        </h1>
        <p className="lead text-lg text-slate-300">
          En vigueur au 07 février 2026
        </p>

        <section className="mb-10">
          <h2>1. Champ d&apos;application</h2>
          <p>
            Les présentes Conditions Générales de Vente (ci-après
            &quot;CGV&quot;) s&apos;appliquent, sans restriction ni réserve, à
            l&apos;ensemble des ventes de services conclues par{" "}
            <strong>Forge Digitale Solutions</strong> (Anthony Marcelin),
            Entrepreneur Individuel (Régime Micro-entreprise), auprès
            d&apos;acheteurs non professionnels et professionnels (ci-après
            &quot;Le Client&quot;).
          </p>
          <p>Les services proposés sont :</p>
          <ul className="list-disc pl-4 space-y-2">
            <li>
              <strong>Prestations Web :</strong> Création de sites internet,
              maintenance, développement sur-mesure.
            </li>
            <li>
              <strong>Prestations Hardware :</strong> Assemblage PC,
              &quot;Forfait Renaissance&quot; (nettoyage/Linux), dépannage.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2>2. Commandes et Devis</h2>
          <p>
            Toute prestation fait l&apos;objet d&apos;un devis préalable gratuit
            et sans engagement, détaillant les limites de l&apos;intervention.
          </p>
          <p>La vente ne sera considérée comme définitive qu&apos;après :</p>
          <ul className="list-disc pl-4 space-y-2">
            <li>
              La signature du devis par le Client (avec la mention &quot;Bon
              pour accord&quot;).
            </li>
            <li>
              Le versement d&apos;un acompte{" "}
              <strong>uniquement si mentionné sur le devis</strong>{" "}
              (généralement applicable aux projets Web, mais pas aux prestations
              Hardware courtes).
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2>3. Tarifs</h2>
          <p>
            Les services sont fournis aux tarifs en vigueur figurant sur le
            devis établi. Les prix sont exprimés en Euros (€).
          </p>
          <p>
            <strong>TVA non applicable :</strong> Conformément à l&apos;article
            293 B du Code Général des Impôts, la TVA n&apos;est pas facturée
            (Franchise en base). Le montant total du devis correspond donc au
            montant net à payer.
          </p>
        </section>

        <section className="mb-10">
          <h2>4. Modalités de Paiement</h2>
          <p>
            Le règlement s&apos;effectue par virement bancaire ou espèces (dans
            la limite légale).
          </p>
          <ul className="list-disc pl-4 space-y-2">
            <li>
              <strong>Projets Web :</strong> Un acompte de 30% est généralement
              demandé à la commande, le solde à la livraison.
            </li>
            <li>
              <strong>Hardware (Montage / Renaissance) :</strong> Le paiement
              intégral s&apos;effectue à la restitution du matériel ou à la fin
              de l&apos;intervention, sauf mention contraire sur le devis.
            </li>
          </ul>
          <p>
            En cas de retard de paiement, des pénalités de retard seront
            exigibles de plein droit (Taux légal en vigueur).
          </p>
        </section>

        <section className="mb-10">
          <h2>5. Spécificités &quot;Montage PC&quot;</h2>
          <p>
            Dans le cadre de l&apos;offre &quot;Montage PC sur mesure&quot;,
            Forge Digitale Solutions fournit une prestation de{" "}
            <strong>service d&apos;assemblage uniquement</strong>.
          </p>
          <ul className="list-disc pl-4 space-y-2">
            <li>
              <strong>Composants :</strong> Les composants sont achetés par le
              Client. Le Client reste propriétaire des composants et responsable
              de leur compatibilité s&apos;il n&apos;a pas suivi les conseils du
              Prestataire.
            </li>
            <li>
              <strong>Garantie :</strong> En cas de panne d&apos;un composant,
              la garantie constructeur de la pièce s&apos;applique. Forge
              Digitale Solutions garantit uniquement la qualité de son
              assemblage (câblage, fixation) pendant 1 an.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2>
            6. Spécificités &quot;Forfait Renaissance&quot; et Maintenance
          </h2>
          <p>
            Pour les prestations de rénovation et nettoyage (Forfait
            Renaissance) :
          </p>
          <ul className="list-disc pl-4 space-y-2">
            <li>
              <strong>Droit de refus :</strong> Le Prestataire se réserve le
              droit de refuser le nettoyage physique complet s&apos;il juge le
              matériel trop vétuste, oxydé, ou présentant un risque de casse
              structurelle (plastiques cassants).
            </li>
            <li>
              <strong>Risques acceptés :</strong> Si le Client insiste pour une
              intervention sur un matériel jugé fragile, Forge Digitale
              Solutions ne pourra être tenu responsable de la rupture de pièces
              plastiques ou mécaniques dues à l&apos;usure du temps.
            </li>
            <li>
              <strong>Perte de données :</strong> Le Client reconnaît avoir été
              informé que toute intervention informatique comporte un risque. Il
              appartient au Client d&apos;effectuer une sauvegarde complète de
              ses données avant de déposer son matériel.{" "}
              <strong>
                Forge Digitale Solutions ne saurait être tenu responsable en cas
                de perte de données.
              </strong>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2>7. Spécificités &quot;Création Web&quot;</h2>
          <p>
            <strong>Propriété intellectuelle :</strong> Le transfert de
            propriété du site web et de son code source ne devient effectif
            qu&apos;après le paiement intégral du prix par le Client.
          </p>
          <p>
            <strong>Obligation de moyens :</strong> Le prestataire s&apos;engage
            à mettre en œuvre tous les moyens techniques nécessaires pour la
            réalisation du site.
          </p>
        </section>

        <section className="mb-10">
          <h2>8. Droit de Rétractation</h2>
          <p>
            Conformément à l&apos;article L221-28 du Code de la consommation, le
            droit de rétractation ne peut être exercé pour les contrats de
            fourniture de services pleinement exécutés avant la fin du délai de
            rétractation et dont l&apos;exécution a commencé après accord
            préalable exprès du consommateur.
          </p>
          <p>
            En signant le devis pour un démarrage immédiat des travaux, le
            Client renonce à son droit de rétractation afin de permettre le
            début rapide de la prestation.
          </p>
        </section>

        <section className="mb-10">
          <h2>9. Données Personnelles</h2>
          <p>
            Les données collectées sont nécessaires à la gestion de la commande
            et à la facturation. Elles sont traitées conformément à notre{" "}
            <a href="/confidentialite">Politique de Confidentialité</a>.
          </p>
        </section>

        <section className="mb-10">
          <h2>10. Médiation de la consommation</h2>
          <p>
            Conformément aux articles L.616-1 et R.616-1 du code de la
            consommation, notre société a mis en place un dispositif de
            médiation de la consommation. L&apos;entité de médiation retenue est
            :{" "}
            <strong>
              MÉDIATION CONSOMMATION DÉVELOPPEMENT / MED CONSO DEV
            </strong>
          </p>
          <p>
            En cas de litige, vous pouvez déposer votre réclamation sur son site
            :{" "}
            <a
              href="https://www.medconsodev.eu"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.medconsodev.eu
            </a>
          </p>
          <p>Ou par voie postale en écrivant à :</p>
          <p>
            MÉDIATION CONSOMMATION DÉVELOPPEMENT
            <br />
            C/O Centre d’Affaires Stéphanois SAS
            <br />
            IMMEUBLE L’HORIZON – ESPLANADE DE FRANCE
            <br />
            3, RUE J. CONSTANT MILLERET
            <br />
            42000 SAINT-ÉTIENNE
          </p>
          <p>
            Si vous n’êtes pas parvenu à résoudre votre litige après nous avoir
            adressé une réclamation écrite (courrier ou courriel), datée,
            rappelant les circonstances qui ont donné lieu au différend et ce
            que vous réclamez, vous pourrez saisir le médiateur de la
            consommation désigné ci-dessus si vous avez reçu une réponse écrite
            négative de notre part ou si vous n&apos;avez pas reçu de réponse
            deux mois après l’envoi de votre réclamation.
          </p>
        </section>

        <section className="mb-10">
          <h2>11. Droit applicable</h2>
          <p>
            Les présentes CGV sont soumises au droit français. En cas de litige,
            une solution amiable sera recherchée avant toute action judiciaire.
            À défaut, les tribunaux compétents seront ceux du ressort du siège
            social de l&apos;entreprise (Bordeaux).
          </p>
        </section>
      </div>
    </div>
  );
}
