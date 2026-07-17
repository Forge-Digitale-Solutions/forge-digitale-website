---
title: "Automatiser ses sauvegardes sous Linux : la mettre en place et la tester"
date: "2026-07-17"
lastModified: "2026-07-17"
category: "Hardware"
excerpt: "Une sauvegarde qui tourne toute seule ne vaut que si elle se restaure vraiment. Sous Linux, quelques outils installés une fois suffisent à protéger le système d'un côté, les fichiers clients de l'autre, avec chiffrement et copie hors site. Le guide pratique pour un poste professionnel, et la seule vérification qui compte : tester la restauration."
image: "/blog/sauvegarde-automatique-linux.jpg"
---

Comprendre [la règle du 3-2-1](/blog/sauvegarde-donnees) répond à la question du combien et du où. Reste le plus difficile en pratique : que la sauvegarde tourne sans qu'on y pense, et qu'elle se restaure le jour où un disque lâche. C'est là que beaucoup de dispositifs s'effondrent. La copie existe, personne ne l'a jamais rouverte, et le jour de l'incident elle se révèle incomplète ou illisible. L'ANSSI a d'ailleurs fait évoluer la règle vers le 3-2-1-1-0, où le dernier chiffre désigne une sauvegarde testée, sans erreur.

Sous Linux, mettre en place cette chaîne demande une configuration unique, puis plus rien. Encore faut-il distinguer deux choses qu'on confond souvent.

## Sauvegarder le système, ce n'est pas sauvegarder ses données

Une mise à jour qui casse l'affichage, un paquet mal installé, un réglage qui rend la machine instable : pour ces cas, on veut revenir à l'état d'avant. C'est le rôle d'un instantané système. Sous Linux, **Timeshift** s'en charge : il photographie le système à intervalles réguliers et permet de remonter le temps en quelques minutes. Utile, mais avec une limite à connaître : Timeshift exclut par défaut le dossier personnel. Il restaure le système d'exploitation, pas vos devis ni vos photos de chantier.

Les fichiers de travail relèvent d'un autre outil. **Déjà Dup**, présent par défaut sur [Linux Mint](/blog/forfait-renaissance), sauvegarde le dossier personnel de façon incrémentale et programmée. On désigne une fois les dossiers à protéger et la destination, on active la planification quotidienne, et l'outil ne réclame plus d'attention. Les deux se complètent : Timeshift pour le système, Déjà Dup pour les données. L'un sans l'autre laisse un trou.

## Chiffrer, parce que ce sont des données clients

Un professionnel qui sauvegarde des fichiers clients manipule des données personnelles, avec les obligations que cela implique. Une sauvegarde perdue ou volée non chiffrée devient une fuite. Déjà Dup propose le chiffrement par mot de passe à la configuration : il faut l'activer, et conserver ce mot de passe ailleurs que sur la machine sauvegardée. Sans lui, la restauration est impossible, y compris pour vous.

Pour la copie hors site, celle qui part vers un cloud ou un disque distant, le chiffrement n'est pas optionnel. **BorgBackup** et **restic** répondent à ce besoin : sauvegarde chiffrée, dédupliquée pour ne pas exploser le volume, pilotable vers un stockage distant. Plus techniques que Déjà Dup, ils conviennent au poste d'un indépendant qui veut une copie externalisée sérieuse sans dépendre d'un service propriétaire. La CNIL rappelle dans sa fiche sécurité que le chiffrement des sauvegardes et leur stockage à l'écart du système font partie des mesures de base.

*Source : [CNIL – Sécurité : Sauvegarder](https://www.cnil.fr/fr/securite-sauvegarder)*

## La copie hors ligne contre le rançongiciel

Un rançongiciel chiffre tout ce qu'il atteint, y compris les sauvegardes connectées en permanence. Un disque externe branché en continu ou un cloud synchronisé en temps réel se fait chiffrer avec le reste. La parade tient en un geste : une copie déconnectée. Un disque externe qu'on rebranche pour la sauvegarde hebdomadaire puis qu'on range protège mieux qu'un NAS toujours en ligne. L'ANSSI insiste sur ce point, prévoir au moins une sauvegarde hors ligne, isolée du système.

*Source : [ANSSI – Sauvegarde des systèmes d'information, les fondamentaux](https://messervices.cyber.gouv.fr/documents-guides/anssi_fondamentaux_sauvegarde_systemes_dinformation_v1.1.pdf)*

## La seule vérification qui compte : restaurer

Une sauvegarde jamais restaurée est une hypothèse, pas une garantie. C'est tout le sens du zéro dans le 3-2-1-1-0. La vérification ne coûte presque rien et se fait à froid, hors incident : prendre un fichier au hasard dans la sauvegarde, le restaurer dans un dossier de test, l'ouvrir, confirmer qu'il est intact et lisible. Une fois par trimestre suffit pour un poste indépendant. Ce test révèle les problèmes qu'on ne voit jamais autrement, un dossier oublié dans la sélection, un chiffrement dont on a perdu la clé, une planification qui avait cessé de tourner sans alerter.

Programmer une sauvegarde prend dix minutes. La tester une fois par trimestre en prend cinq. C'est cet écart, entre une copie qu'on croit avoir et une copie qui fonctionne, qui sépare l'incident mineur du sinistre définitif.

## En pratique

Pour un poste professionnel sous Linux, la configuration fiable tient en trois briques : Timeshift pour le système, Déjà Dup chiffré pour les données quotidiennes, une copie hors ligne ou externalisée pour le hors-site. Installée une fois, elle tourne seule.

Je mets cette chaîne en place en atelier à **Saint-Laurent-Médoc**, pour les particuliers et professionnels du Médoc et du Bassin d'Arcachon, avec un premier test de restauration fait ensemble pour vérifier qu'elle répond présent le jour venu. [Me contacter](/#contact).
