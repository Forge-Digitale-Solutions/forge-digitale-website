---
title: "Changer de prestataire web sans perdre son nom de domaine"
date: "2026-08-21"
category: "Web"
excerpt: "Changer de prestataire web tourne mal quand le nom de domaine est enregistré au nom de l'ancien. Ce qu'il faut vérifier et récupérer avant de couper."
image: "/blog/changer-de-prestataire-web.jpg"
---

Un carreleur veut refaire son site. L'ancien prestataire, joignable un mois sur deux, met trois semaines à corriger un numéro de téléphone. Le carreleur signe ailleurs, prévient par mail, et découvre la semaine suivante que son site a disparu, que ses adresses en `@son-entreprise.fr` ne reçoivent plus rien, et que le nom de domaine qu'il utilise depuis six ans est enregistré au nom de l'agence. Changer de prestataire web ne pose aucun problème technique. Ce qui coince, c'est presque toujours la question de savoir à qui appartiennent les clés.

Ce cas revient régulièrement chez les artisans que je récupère dans le Médoc et autour de Bordeaux. Tout se vérifie en une heure, avant de signer quoi que ce soit ailleurs.

## Qui est vraiment propriétaire de votre nom de domaine ?

Le nom de domaine ne s'achète pas, il se loue auprès d'un bureau d'enregistrement, l'entreprise agréée qui le réserve pour vous auprès du registre. Pour les `.fr`, ce registre est l'Afnic. Dans ce système, une seule ligne compte : le titulaire. C'est la personne ou l'entreprise inscrite comme détentrice du domaine, et elle seule dispose des droits dessus.

Beaucoup de prestataires réservent le domaine depuis leur propre compte, par commodité, et s'inscrivent comme titulaires. Le client paie chaque année une ligne « nom de domaine » sur sa facture en croyant le posséder, alors qu'il paie une refacturation. Tant que la relation est bonne, personne ne s'en aperçoit. Le jour du départ, la différence devient très concrète.

Pour savoir où vous en êtes, cherchez la trace du domaine dans un annuaire whois, l'annuaire public des noms de domaine. Pour un `.fr` détenu par une entreprise, le nom du titulaire est visible ; pour un particulier, les données sont masquées par défaut. Si le résultat affiche le nom de votre agence, ou si vous n'avez jamais eu d'identifiants pour vous connecter chez le bureau d'enregistrement, considérez que le domaine ne vous appartient pas encore.

## Que faut-il récupérer avant de changer de prestataire web ?

Le domaine est le point sensible, il n'est pas le seul. Faites la liste avant d'annoncer votre départ, quand votre interlocuteur est encore coopératif.

Le compte chez le bureau d'enregistrement, avec vous comme titulaire, arrive en premier. Vient ensuite l'accès à l'hébergement, c'est-à-dire au serveur qui stocke les fichiers du site, avec les identifiants FTP ou SSH et l'accès au panneau de gestion. La zone DNS compte autant : c'est le fichier de réglages qui indique où pointe le domaine, quel serveur affiche le site et quel serveur reçoit les emails. Une mauvaise recopie de cette zone coupe la messagerie sans toucher au site, ou l'inverse.

Réclamez aussi l'accès administrateur au site lui-même, l'export de la base de données si le site en utilise une, et les fichiers sources ou le thème si le site a été développé sur mesure. Les comptes annexes se récupèrent au même moment : votre [fiche Google](/blog/fiche-google-artisans/), les outils de statistiques, le service de messagerie associé au domaine. Sur le papier, vous êtes propriétaire de votre présence en ligne, contrairement à une page Facebook où vous restez [locataire d'une plateforme](/blog/site-web-ou-reseaux-sociaux/). Dans les faits, cette propriété ne vaut que si vous détenez les accès.

Demandez tout par écrit, dans un seul mail récapitulatif. Le document servira de preuve si la discussion se tend.

## Comment transférer son nom de domaine chez un autre prestataire ?

Le transfert d'un domaine vers un autre bureau d'enregistrement repose sur un code, appelé auth-info ou code de transfert. C'est un mot de passe propre au domaine qui autorise l'opération.

La règle est nette pour les `.fr` : le bureau d'enregistrement doit fournir gratuitement ce code au titulaire du domaine, et à lui seul. Un prestataire qui facture la communication du code ou qui la refuse alors que vous êtes titulaire sort du cadre. Pour les extensions internationales comme le `.com`, la politique de l'ICANN impose aux bureaux d'enregistrement de fournir le code dans un délai de cinq jours après la demande.

Une fois le code en main, vous le transmettez au nouveau bureau d'enregistrement, qui lance le transfert. Vérifiez au passage que le domaine n'est pas verrouillé, un réglage de sécurité activé par défaut chez la plupart des opérateurs et qui se désactive en un clic depuis votre compte.

Si vous n'êtes pas titulaire, l'opération à demander n'est pas un transfert mais un changement de titulaire, ce que le vocabulaire technique appelle un trade. Elle se fait avec l'accord du titulaire sortant, donc avec la coopération de l'ancien prestataire.

## Combien de temps prend un transfert de nom de domaine ?

Comptez environ cinq jours entre la demande et la finalisation, une fois le code de transfert obtenu. Le site et les emails continuent de fonctionner pendant l'opération, à condition de ne rien couper du côté de l'hébergement.

Un détail piège mérite d'être connu : après une modification du titulaire ou de ses coordonnées, le domaine est verrouillé soixante jours et ne peut pas être transféré vers un autre bureau d'enregistrement. Si vous devez faire les deux opérations, faites d'abord le transfert, puis le changement de titulaire. Certains opérateurs permettent de lever ce verrou sur demande.

## Et si l'ancien prestataire ne répond plus ?

Si vous êtes bien titulaire du domaine, vous pouvez contacter directement le bureau d'enregistrement, en justifiant votre identité, pour reprendre la main sur le compte. L'agence qui gérait le domaine pour vous n'est qu'un intermédiaire.

Si vous n'êtes pas titulaire, la voie amiable reste la plus rapide, même quand elle demande de mettre son orgueil de côté. Un mail factuel avec copie à l'adresse de contact du bureau d'enregistrement débloque souvent la situation. À défaut, l'Afnic prévoit des procédures encadrées pour les `.fr`, dont une transmission forcée du domaine dans des cas précis comme une décision de justice, une liquidation judiciaire ou un décès, ainsi qu'un examen au cas par cas par son service juridique quand un lien entre l'ancien et le nouveau titulaire peut être documenté. Ces procédures existent, elles prennent du temps, et elles coûtent plus cher que la vérification que vous n'avez pas faite au départ.

## Le piège à éviter : résilier avant d'avoir les clés

L'erreur classique consiste à annoncer son départ, à couper le prélèvement mensuel, puis à s'organiser. Un hébergement résilié met le site hors ligne sous quelques jours, et coupe les [adresses email rattachées au domaine](/blog/email-professionnel-nom-de-domaine/) au passage. Les messages envoyés pendant cette fenêtre sont perdus, sans avis de non-remise exploitable.

Gardez l'ancien contrat actif jusqu'à ce que le nouveau site tourne, que les emails arrivent et que le domaine soit transféré. Un mois de double facturation coûte moins cher qu'une semaine sans devis entrants. Vérifiez aussi la date d'expiration du domaine : un domaine oublié pendant une transition peut être libéré, puis récupéré par un tiers.

## Par où commencer

Ouvrez votre dernière facture de prestation et repérez ce que vous payez exactement. Cherchez ensuite votre domaine dans un whois, et essayez de vous connecter chez le bureau d'enregistrement avec les identifiants que vous avez. Si vous n'en avez aucun, vous savez déjà quoi demander, et vous avez intérêt à le demander maintenant, pas le jour où vous partez.

Si vous préférez qu'on regarde vos accès ensemble avant d'engager quoi que ce soit, [écrivez-moi votre situation](/#contact) et je vous dirai ce qui manque.

*Sources : [Afnic, guide pratique du titulaire d'un nom de domaine en .fr](https://www.afnic.fr/wp-media/uploads/2024/07/Afnic-Guide-pratique-du-Titulaire.pdf) et [ICANN, politique de transfert des noms de domaine](https://www.icann.org/resources/pages/about-transfer-policy-2017-10-19-fr)*
