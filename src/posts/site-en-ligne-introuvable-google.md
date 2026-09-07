---
title: "Mon site n’apparaît pas sur Google : ce qui bloque vraiment"
h1: "Mon site est en ligne. Personne ne le trouve."
date: "2026-08-28"
lastModified: "2026-09-07"
category: "Web"
excerpt: "Le site est en ligne, on tape le nom de l’entreprise, Google n’affiche rien. Ce n’est pas une histoire de ranking : cinq blocages concrets à vérifier."
image: "/blog/site-en-ligne-introuvable-google.jpg"
---

J’ai mis le site en ligne. J’ai ouvert Google, j’ai tapé « Forge Digitale Solutions ». Ce qui est sorti, ce n’était pas ma page. Un homonyme, une vieille mention, pas le site.

Le même geste, je le vois chez des artisans du Médoc. On tape le nom de l’entreprise, comme un client qui a le carton dans la poche. Google affiche autre chose, ou rien. Le réflexe, c’est de conclure qu’il « faut du référencement ». Souvent, le site n’est simplement pas rattaché au nom.

## Ce que Google devrait montrer quand on tape votre nom

Quand quelqu’un cherche une enseigne, Google n’a pas un concours à arbitrer. Il a une question : cette entreprise, où est-elle ?

Ce qui devrait sortir, c’est le site. Parfois Maps, parfois des avis. C’est tout. Si la page d’accueil n’apparaît pas sur ce nom-là, ce n’est pas qu’il « faut du temps ». C’est qu’un obstacle empêche le moteur de relier l’enseigne à vos pages.

## La page n’a jamais été visitée

Google n’indexe pas un site parce qu’il est en ligne. Il indexe les pages qu’il a ouvertes. Pour les ouvrir, il lui faut un chemin : un lien depuis une autre page, un sitemap déclaré.

Sur le mien, des articles de blog et les CGV n’étaient pas encore crawlés : Google n’était pas passé. Les pages existaient. Rien n’y pointait, le sitemap était incomplet. Google n’avait aucune raison d’y aller. Le même trou apparaît quand on ajoute une page « réalisations » six mois plus tard, sans la rattacher au reste.

Collez le nom de domaine dans Google, précédé de `site:`. Si presque rien ne sort, les pages n’ont pas été vues. Search Console dit si Google est déjà passé. Tant que la page n’est pas crawlée, il n’y a rien à optimiser.

*Source : [Google Search Central – Fonctionnement de la recherche](https://developers.google.com/search/docs/fundamentals/how-search-works?hl=fr)*
*Source : [Google Search Central – Sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview?hl=fr)*
*Source : [Google Search Console](https://search.google.com/search-console)*

## Le title dit « Accueil » au lieu de dire qui vous êtes

L’onglet du navigateur, c’est le title. C’est aussi le lien bleu dans les résultats. Si la page d’accueil s’appelle « Accueil » ou « Bienvenue », Google n’a presque rien à accrocher au nom.

Le mien a longtemps été trop vague. « Forge Digitale » dit peu, et le nom n’est pas unique. Le nom complet, le métier, la commune, ça dit qui je suis. Deux homonymes dans le même métier, un title trop court n’aide pas à départager.

Ouvrez le site et regardez l’onglet. Le nom de l’entreprise doit y figurer dès la page d’accueil. Pas « Accueil ». Pas le nom du thème.

*Source : [Google Search Central – Liens de titre](https://developers.google.com/search/docs/appearance/title-link?hl=fr)*

## Une adresse dans le code, une autre sur la page

Google recoupe le nom, l’adresse et le téléphone. Quand ces trois éléments ne disent pas la même chose partout, le moteur n’a plus une entreprise : il en a deux versions. Il hésite.

Une adresse dans le pied de page, une autre dans le code structuré, héritée d’un ancien local. J’ai déjà eu ce décalage ici : le chemin de la Mienne d’un côté, le 6 rue Saint-Julien, 33112 Saint-Laurent-Médoc de l’autre. Pour un visiteur, la page est claire. Pour un robot, l’adresse a déménagé et pas déménagé.

Regardez la page contact, le pied de page, et le code source (clic droit, chercher l’ancienne rue). Le téléphone aussi : un mobile sur le site et un fixe oublié plus bas, c’est la même contradiction.

## Le site est encore en HTTP

Le cadenas dans la barre d’adresse, c’est le HTTPS. Sans lui, le navigateur affiche « Non sécurisé ».

Sur ce site, le vrai sujet c’était un HTTP sans 301 propre vers le HTTPS. Search Console voyait déjà la version canonique en HTTPS. Le navigateur, lui, pouvait encore ouvrir l’ancienne adresse.

Si l’URL commence par http:// sans le s, ou si les deux versions s’ouvrent, le site n’est pas « en ligne » de la façon dont Google l’entend. Un certificat et une redirection unique suffisent souvent.

*Source : [Google Search Central – HTTPS](https://developers.google.com/search/docs/advanced/security/https)*

## La page d’accueil ne dit rien

Une page qui s’ouvre sur « Bienvenue sur notre site, n’hésitez pas à nous contacter » n’aide personne. Le nom est dans le logo, pas dans le texte. Le métier n’est pas écrit. La commune non plus.

Google lit du texte. Si la page d’accueil ne contient pas le nom, ce que vous faites et où, il n’a rien à relier à la requête. Ce n’est pas une affaire de mots-clés. C’est une page qui pourrait appartenir à n’importe qui.

Lisez votre page d’accueil à voix haute, en ignorant le logo. Est-ce qu’on entend qui vous êtes, ce que vous faites, et dans quelle commune ?

## Ce que ça ne veut pas dire

Ça ne veut pas dire qu’il faut « du SEO ». Ça ne veut pas dire une campagne de liens, un audit de soixante pages, ni une place dans un classement. Le nom de l’entreprise n’est pas un podium.

Ça ne veut pas dire non plus qu’un site est obligatoire. Une vitrine claire ([création de site web](/creation-site-web/)) commence à partir de 500 € quand elle sert vraiment : le métier, l’adresse, un moyen de joindre. Un artisan qui n’a besoin que d’un numéro peut s’en passer. Je le dis avant de chiffrer.

Ça veut dire : le site existe, Google ne le relie pas encore à votre nom. Ça se regarde en une heure. La [FAQ](/faq/) : un seul interlocuteur, depuis Saint-Laurent-Médoc.

## Par où commencer

Tapez le nom exact de l’entreprise dans Google, depuis une navigation privée. Notez ce qui sort, et ce qui ne sort pas. Ensuite : le cadenas, l’onglet, l’adresse, les liens internes, le texte de la page d’accueil.

Si quelque chose cloche et que vous préférez qu’on le regarde plutôt que de fouiller dans Search Console, [écrivez-moi](/#contact). Je vous dirai ce qui bloque. Pas ce qui devrait vous classer.
