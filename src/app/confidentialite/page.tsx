export default function Confidentialite() {
  return (
    <div className="min-h-screen bg-dark-base pt-32 pb-24 px-4">
      <div className="container mx-auto max-w-3xl prose prose-invert prose-headings:text-white prose-p:text-slate-400 prose-li:text-slate-400 prose-strong:text-white prose-a:text-[#C5A059]">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          Politique de Confidentialité
        </h1>
        <p className="lead text-lg text-slate-300">
          Dernière mise à jour :{" "}
          {new Date().toLocaleDateString("fr-FR", {
            month: "long",
            year: "numeric",
          })}
        </p>

        <section className="mb-10">
          <h2>1. Introduction</h2>
          <p>
            La protection de vos données personnelles est une priorité pour{" "}
            <strong>Forge Digitale Solutions</strong>. Contrairement à de
            nombreux sites, nous avons fait le choix d&apos;un site web
            statique, éthique et léger qui ne trace pas votre navigation à des
            fins publicitaires.
          </p>
        </section>

        <section className="mb-10">
          <h2>2. Absence de Cookies</h2>
          <p>
            Notre site <strong>n&apos;utilise aucun cookie</strong> de traçage,
            publicitaire ou analytique tiers (type Google Analytics, Facebook
            Pixel).
          </p>
          <p>
            Vous pouvez naviguer sur l&apos;ensemble du site sans qu&apos;aucune
            donnée technique ne soit stockée sur votre appareil à votre insu.
            Aucun bandeau de consentement n&apos;est donc nécessaire.
          </p>
        </section>

        <section className="mb-10">
          <h2>3. Collecte de données (Formulaire)</h2>
          <p>
            Les seules données personnelles que nous collectons sont celles que
            vous nous transmettez volontairement via notre formulaire de contact
            :
          </p>
          <ul className="list-disc pl-4 space-y-2">
            <li>Nom et Prénom</li>
            <li>Adresse Email</li>
            <li>Numéro de téléphone</li>
            <li>Nom de la société (le cas échéant)</li>
            <li>Contenu de votre message</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2>4. Utilisation et Transmission</h2>
          <p>
            Ces données sont utilisées <strong>exclusivement</strong> pour :
          </p>
          <ul className="list-disc pl-4 space-y-2">
            <li>Répondre à votre demande de devis ou d&apos;information.</li>
            <li>
              Établir la facturation en cas de prestation (Montage PC / Création
              Web).
            </li>
          </ul>
          <p>
            <strong>Sous-traitant technique :</strong> Pour assurer la
            délivrabilité des messages sans serveur backend complexe, le
            formulaire utilise le service sécurisé <strong>Web3Forms</strong>.
            Ce service agit en tant que processeur de données et respecte la
            conformité RGPD européenne.
          </p>
          <p>
            Vos données ne sont jamais vendues, louées ou cédées à des tiers.
          </p>
        </section>

        <section className="mb-10">
          <h2>5. Durée de conservation</h2>
          <p>
            Vos données de contact sont conservées pendant la durée nécessaire
            au traitement de votre demande. Si vous devenez client (achat de
            prestation), vos données de facturation seront conservées 10 ans
            conformément aux obligations comptables françaises (Article L123-22
            du Code de commerce).
          </p>
        </section>

        <section className="mb-10">
          <h2>6. Vos Droits</h2>
          <p>
            Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
            rectification et de suppression de vos données. Pour l&apos;exercer,
            contactez-nous simplement à :
            <br />
            <a href="mailto:contact@forgedigitalesolutions.com">
              contact@forgedigitalesolutions.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
