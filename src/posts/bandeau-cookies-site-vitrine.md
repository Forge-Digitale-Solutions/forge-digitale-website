---
title: "Bandeau cookies : votre site vitrine en a-t-il besoin ?"
date: "2026-08-14"
category: "Web"
excerpt: "Beaucoup de sites vitrine affichent un bandeau cookies dont ils n'ont pas besoin. Comment savoir si le vôtre est obligatoire, et comment vous en passer."
image: "/blog/bandeau-cookies-site-vitrine.jpg"
---

Un plombier reçoit un mail alarmiste : son site serait « hors la loi » faute de bandeau cookies, mise en demeure sous quinze jours, lien pour régler le problème contre 290 euros. Il installe dans la foulée une extension trouvée en dix minutes, et depuis, chaque visiteur tombe sur un pavé gris qui masque son numéro de téléphone. Le mail était une arnaque, et le bandeau cookies qu'il vient d'ajouter sur son site vitrine n'était pas obligatoire.

La confusion revient sans arrêt. Le bandeau est devenu un réflexe, au même titre que les mentions légales, alors que la loi ne le déclenche que dans des cas précis. Savoir lesquels prend dix minutes et évite de dégrader l'accueil de son site pour rien.

## Un site vitrine a-t-il vraiment besoin d'un bandeau cookies ?

Non, si le site ne dépose aucun traceur soumis à consentement. C'est la seule question qui compte.

Un traceur, c'est un petit fichier ou un identifiant écrit dans le navigateur du visiteur pour le reconnaître d'une page à l'autre, ou d'un site à l'autre. L'article 82 de la loi Informatique et Libertés impose de recueillir le consentement avant d'écrire ou de lire quoi que ce soit sur l'appareil de quelqu'un, avec une exception : ce qui est strictement nécessaire au service demandé par l'internaute. Un cookie de panier sur une boutique, un cookie de session pour rester connecté, un cookie qui mémorise le choix de langue : rien de tout cela ne demande d'autorisation.

Un site vitrine classique, cinq ou six pages, un formulaire de contact, des photos de chantier, n'écrit souvent rien du tout dans le navigateur. Aucun traceur, donc aucun consentement à recueillir, donc aucun bandeau à afficher. Le site reste parfaitement conforme. Celui que vous lisez fonctionne exactement comme ça.

## Quels éléments déposent des cookies sans que vous le sachiez ?

Le piège vient rarement du site lui-même, il vient de ce qu'on y a greffé. Chaque brique tierce chargée depuis un serveur extérieur peut poser ses propres traceurs, sans que le propriétaire du site en soit informé.

Les coupables habituels sont une vidéo YouTube intégrée dans une page présentation, une carte Google Maps sur la page contact, un pixel Facebook posé lors d'une campagne publicitaire oubliée depuis, Google Analytics en configuration standard, un bouton de partage social, un widget d'avis, un chat en ligne, un module de réservation. Sur les sites d'artisans que je reprends dans le Médoc et autour de Bordeaux, c'est presque toujours la carte Maps ou la vidéo qui déclenche l'obligation, jamais le site lui-même. La carte est d'ailleurs souvent superflue quand votre [fiche Google](/blog/fiche-google-artisans/) donne déjà l'itinéraire.

Deux fonctions méritent d'être vérifiées de près, parce qu'elles sont utiles et qu'on ne veut pas les supprimer bêtement. Si vous affichez vos [avis clients Google](/blog/avis-clients-google/), regardez si le widget est chargé depuis un domaine Google ou si les avis sont recopiés en dur dans la page : dans le second cas, aucun traceur. Même logique pour un [module de prise de rendez-vous](/blog/prise-de-rendez-vous-en-ligne/), où certains prestataires proposent un simple lien vers une page externe plutôt qu'un widget embarqué.

Pour faire l'inventaire, ouvrez votre site en navigation privée, appuyez sur F12, onglet Application ou Stockage, et regardez la liste des cookies présents avant la moindre interaction. Ce que vous voyez là est exactement ce que verrait un contrôle.

## Comment mesurer son audience sans bandeau cookies

Savoir combien de personnes visitent votre site et par quelles pages elles arrivent reste utile. La CNIL prévoit une exemption de consentement pour la mesure d'audience, à condition que l'outil serve uniquement à produire des statistiques anonymes pour le compte exclusif de l'éditeur du site, sans recoupement avec d'autres traitements, sans transmission de données non anonymes à des tiers, et sans permettre de suivre le visiteur d'un site à l'autre.

La CNIL recommande en complément d'informer les visiteurs dans la politique de confidentialité, de limiter la durée de vie du traceur à treize mois sans reconduction automatique, et de conserver les données au maximum vingt-cinq mois.

Google Analytics en configuration par défaut ne remplit pas ces conditions, parce que Google réutilise les données pour son propre compte. Des solutions auto-hébergées comme Matomo ou Umami y entrent, tout comme plusieurs outils français. Umami, par exemple, ne dépose aucun cookie et n'enregistre aucun identifiant permanent : c'est ce qui tourne sur ce site, sans le moindre bandeau. La CNIL met à disposition un outil d'auto-évaluation destiné aux éditeurs de ces solutions. Demandez au vôtre s'il l'a rempli et réclamez la documentation associée : en cas de contrôle, la responsabilité est la vôtre autant que la sienne.

Beaucoup de sites vitrine se contentent des statistiques fournies par l'hébergeur, calculées à partir des journaux de connexion du serveur. Aucun traceur déposé, aucune question à se poser.

## Le piège à éviter : le bandeau installé « au cas où »

Ajouter un bandeau alors qu'aucun traceur ne le justifie ne vous protège de rien et vous coûte quelque chose. Un visiteur qui cherche un artisan disponible cette semaine tombe sur une demande d'autorisation avant même de voir vos réalisations, et une partie repart.

Le vrai risque est ailleurs : un bandeau mal configuré expose davantage qu'une absence de bandeau. La plupart des extensions gratuites chargent les scripts de suivi dès l'arrivée sur la page, avant tout clic, ce qui constitue précisément le manquement le plus sanctionné. D'autres affichent un gros bouton « Accepter » et cachent le refus derrière deux menus, alors que refuser doit être aussi simple qu'accepter. Un bandeau qui se contente de masquer l'écran pendant que les traceurs se déposent derrière n'a aucune valeur juridique. Si vous en installez un, il doit bloquer les scripts tant que le visiteur n'a pas répondu.

## Que risque une petite entreprise en cas de contrôle ?

La CNIL dispose d'une procédure de sanction simplifiée pour les dossiers sans difficulté particulière : décision prise sur dossier écrit, sans séance publique, amende plafonnée à 20 000 euros, éventuellement assortie d'une injonction sous astreinte. Ces sanctions ne sont pas rendues publiques. Depuis janvier 2026, la CNIL a prononcé 23 sanctions par cette voie, pour un total de 133 750 euros.

Ces montants ne visent pas les sites sans traceurs. Ils sanctionnent des sites qui suivent leurs visiteurs sans les avoir informés ou sans leur laisser un choix réel. Une petite entreprise qui n'a rien à déclarer n'a rien à craindre, à condition de l'avoir vérifié plutôt que supposé.

## Par où commencer

Faites l'inventaire de vos cookies en navigation privée, listez les briques tierces ajoutées au fil du temps, et pour chacune demandez-vous ce qu'elle vous rapporte. Une vidéo YouTube se remplace par une image cliquable, une carte Maps par une adresse et un lien vers l'itinéraire, un widget d'avis par une capture accompagnée d'un lien. Ce qui reste indispensable justifie un bandeau, correctement configuré cette fois.

Si vous préférez qu'on regarde ça ensemble plutôt que de fouiller dans les réglages de votre site, [décrivez-moi votre situation](/#contact) et je vous dirai où vous en êtes.

*Sources : [CNIL, cookies : solutions pour les outils de mesure d'audience](https://www.cnil.fr/fr/cookies-solutions-pour-les-outils-de-mesure-daudience) et [CNIL, la procédure de sanction simplifiée](https://www.cnil.fr/fr/la-procedure-de-sanction-simplifiee)*
