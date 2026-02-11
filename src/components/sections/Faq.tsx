"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

type FaqItem = {
  question: string;
  answer: React.ReactNode;
};

type FaqCategory = {
  title: string;
  items: FaqItem[];
};

const faqData: FaqCategory[] = [
  {
    title: "Création Web",
    items: [
      {
        question: "Combien coûte la création d'un site internet ?",
        answer: (
          <div className="space-y-4">
            <p>
              Il est impossible de donner un tarif unique sans connaître votre
              projet, car je ne vends pas de &quot;modèles&quot; tout faits.
            </p>
            <p>
              Le coût dépend entièrement de vos besoins spécifiques : un site
              vitrine simple, un site catalogue ou une application métier
              complexe ne demandent pas le même travail.
            </p>
            <p>
              Mon approche est de construire une solution{" "}
              <strong>100% sur-mesure</strong>, adaptée à vos objectifs et à
              votre budget. Le mieux est d&apos;en discuter de vive voix :
              l&apos;étude de votre projet est gratuite.
            </p>
          </div>
        ),
      },
      {
        question:
          "Et après la mise en ligne ? Proposez-vous de la maintenance ?",
        answer: (
          <div className="space-y-4">
            <p>
              <strong>
                Oui. Je ne vous accompagne pas seulement lors de la création,
                mais pour l&apos;ensemble de votre projet.
              </strong>
            </p>
            <p>
              Je propose une formule de maintenance <strong>clé en main</strong>{" "}
              pour votre sérénité :
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li>
                <strong>Technique :</strong> Je gère l&apos;hébergement, le
                renouvellement du nom de domaine, les sauvegardes et la
                sécurité. Vous n&apos;avez rien à faire.
              </li>
              <li>
                <strong>Évolutivité (Crédit Temps) :</strong> Selon vos besoins,
                je définis avec vous un forfait mensuel d&apos;heures incluses.
                Cela vous permet de me demander des modifications (changer un
                texte, ajouter une photo, poster une actualité) sans avoir à
                refaire un devis à chaque fois.
              </li>
            </ul>
          </div>
        ),
      },
    ],
  },
  {
    title: "Hardware & Montage PC",
    items: [
      {
        question:
          "Comment se passe le montage PC ? Dois-je acheter les pièces ?",
        answer: (
          <div className="space-y-4">
            <p>
              <strong>Oui, absolument.</strong> C&apos;est le principe de mon
              offre : la transparence totale.
            </p>
            <p>
              Voici ma méthode pour vous garantir le meilleur rapport
              performance/prix :
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li>
                <strong>1. Audit & Conseil :</strong> On discute d&apos;abord de
                vos besoins (Gaming, Workstation, bureautique, etc.) et de votre
                budget réel.
              </li>
              <li>
                <strong>2. Liste d&apos;achat optimisée :</strong> Je vous
                fournis les liens vers les composants aux meilleurs prix du
                moment (Amazon, TopAchat, etc.).
              </li>
              <li>
                <strong>3. Achat direct :</strong> Vous commandez les pièces.
                Avantage :{" "}
                <strong>Les factures et les garanties sont à votre nom</strong>.
                Vous ne payez aucune marge intermédiaire sur le matériel.
              </li>
              <li>
                <strong>4. Mon expertise :</strong> Je réalise le montage
                professionnel, le &quot;Câble Management&quot; (câblage
                invisible), l&apos;optimisation du flux d&apos;air et
                l&apos;installation système (Windows/Linux + Pilotes).
              </li>
            </ul>
          </div>
        ),
      },
      {
        question:
          "Pourquoi passer par vous plutôt que d'acheter un PC tout fait ?",
        answer: (
          <div className="space-y-4">
            <p>
              <strong>
                C&apos;est la différence entre un produit de consommation
                jetable et un investissement durable.
              </strong>
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li>
                <strong>Composants entrée de gamme :</strong> Les PC de grande
                surface (et même certains gros intégrateurs) rognent sur les
                pièces &quot;invisibles&quot; pour augmenter leurs marges :
                alimentation bas de gamme (risque de panne), carte mère bridée
                ou refroidissement bruyant.
              </li>
              <li>
                <strong>Travail à la chaîne :</strong> Contrairement aux usines
                d&apos;assemblage, je prends le temps de soigner chaque détail
                (câblage, pâte thermique haute performance, courbes de
                ventilation) pour une machine silencieuse et fiable.
              </li>
              <li>
                <strong>Évolutivité garantie :</strong> Les PC de marque
                utilisent souvent des formats propriétaires impossibles à
                modifier. Avec moi, votre configuration est{" "}
                <strong>totalement évolutive</strong>. Dans 4 ans, vous pourrez
                changer uniquement la carte graphique pour jouer aux derniers
                jeux sans tout racheter. C&apos;est une économie réelle sur le
                long terme.
              </li>
            </ul>
          </div>
        ),
      },
      {
        question:
          "Je n'y connais rien en informatique, pouvez-vous tout gérer ?",
        answer: (
          <p>
            <strong>C&apos;est justement mon rôle !</strong> Vous n&apos;avez
            pas besoin d&apos;être un expert.
            <br />
            <br />
            Lors de notre premier échange, je vous poserai des questions simples
            (quelle sera votre utilisation ? à quels jeux jouez-vous ? quel est
            votre budget ?). Ensuite, je m&apos;occupe de tout : je sélectionne
            les pièces compatibles, je vous envoie les liens directs pour
            commander, et je réalise le montage et l&apos;installation. Vous
            n&apos;avez qu&apos;à vous laisser guider.
          </p>
        ),
      },
      {
        question: "Que se passe-t-il si une pièce tombe en panne plus tard ?",
        answer: (
          <div className="space-y-4">
            <p>
              C&apos;est le gros avantage de ma formule :{" "}
              <strong>vous êtes protégé deux fois.</strong>
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li>
                <strong>Garantie Pièces (2 à 10 ans) :</strong> Comme vous
                achetez les composants, les factures sont à votre nom. Vous
                bénéficiez de la garantie constructeur directe (souvent plus
                longue et efficace que celle des revendeurs).
              </li>
              <li>
                <strong>Mon assistance :</strong> En cas de problème, je ne vous
                laisse pas tomber. Je diagnostique l&apos;origine de la panne
                (est-ce la carte graphique ? l&apos;alimentation ?) et je vous
                guide pour faire jouer la garantie constructeur.
              </li>
            </ul>
          </div>
        ),
      },
    ],
  },
  {
    title: "Linux & Forfait Renaissance",
    items: [
      {
        question: "Pourquoi passer sous Linux (Forfait Renaissance) ?",
        answer: (
          <div className="space-y-4">
            <p>
              Parce que Windows 10 est en fin de vie. Même avec le sursis
              accordé en Europe (mises à jour de sécurité prolongées
              jusqu&apos;en octobre 2026), ce n&apos;est que reculer pour mieux
              sauter.
            </p>
            <p>
              Le vrai problème est matériel :{" "}
              <strong>Windows 11 refuse de s&apos;installer</strong> sur votre
              ordinateur actuel (processeur jugé &quot;trop vieux&quot;).
            </p>
            <p>
              Plutôt que d&apos;attendre l&apos;échéance finale ou
              d&apos;acheter un PC neuf inutilement, la solution{" "}
              <strong>Renaissance (Linux Mint par exemple)</strong> est
              immédiate :
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li>
                <strong>Performance :</strong> Votre PC est libéré des lourdeurs
                de Windows. Il redevient rapide et fluide.
              </li>
              <li>
                <strong>Durable :</strong> Vous prolongez la vie de votre
                machine pour 5 ou 10 ans de plus, avec un système à jour et
                sécurisé.
              </li>
              <li>
                <strong>Simple :</strong> L&apos;interface est très proche de
                celle que vous connaissez, vous ne serez pas perdu.
              </li>
            </ul>
          </div>
        ),
      },
    ],
  },
  {
    title: "Logistique & Intervention",
    items: [
      {
        question: "Intervenez-vous à domicile ?",
        answer: (
          <p>
            Pour garantir une qualité de service optimale (bancs de test,
            outillage de précision, connexions), je réalise toutes les
            interventions <strong>dans mon atelier privé</strong> à
            Saint-Laurent-Médoc.
            <br />
            <br />
            Je ne reçois pas de public sans rendez-vous. Je conviens avec vous
            d&apos;un créneau pour le{" "}
            <strong>dépôt et la récupération du matériel</strong>.
            <br />
            Les déplacements sont exceptionnels et font l&apos;objet d&apos;une
            facturation spécifique sur devis.
          </p>
        ),
      },
    ],
  },
];

export function Faq() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (catIndex: number, itemIndex: number) => {
    const key = `${catIndex}-${itemIndex}`;
    setOpenItem(openItem === key ? null : key);
  };

  return (
    <section
      id="faq"
      className="py-24 bg-dark-base border-t border-white/5 scroll-mt-20"
      aria-labelledby="faq-heading"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h2
            id="faq-heading"
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Questions <span className="text-[#C5A059]">Fréquentes.</span>
          </h2>
          <p className="text-slate-300">
            Transparence totale sur mes méthodes de travail.
          </p>
        </div>

        <div className="space-y-12">
          {faqData.map((category, catIndex) => (
            <div key={catIndex}>
              <h3 className="text-xl font-bold text-[#C5A059] mb-6 border-b border-[#C5A059]/20 pb-2 inline-block">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => {
                  const isOpen = openItem === `${catIndex}-${itemIndex}`;
                  const contentId = `faq-content-${catIndex}-${itemIndex}`;
                  return (
                    <div
                      key={itemIndex}
                      className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden transition-colors hover:border-[#C5A059]/30"
                    >
                      <button
                        onClick={() => toggleItem(catIndex, itemIndex)}
                        className="w-full flex items-center justify-between p-6 text-left focus-visible:outline-2 focus-visible:outline-[#C5A059] focus-visible:outline-offset-2 rounded-t-2xl transition-colors"
                        aria-expanded={isOpen}
                        aria-controls={contentId}
                      >
                        <span className="text-white font-medium text-lg pr-4">
                          {item.question}
                        </span>
                        <span
                          className="text-[#C5A059] shrink-0"
                          aria-hidden="true"
                        >
                          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                        </span>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            id={contentId}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            role="region"
                          >
                            <div className="px-6 pb-6 text-slate-300 leading-relaxed border-t border-white/5 pt-4 text-sm md:text-base">
                              {item.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
