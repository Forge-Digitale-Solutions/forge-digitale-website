---
title: "Automatiser ses sauvegardes sous Linux : la mettre en place et la tester"
date: "2026-07-17"
lastModified: "2026-07-19"
category: "Hardware"
excerpt: "Une sauvegarde qui tourne toute seule ne vaut que si elle se restaure vraiment. Sous Linux, quelques outils installés une fois suffisent à protéger le système d'un côté, les fichiers clients de l'autre, avec chiffrement et copie hors site. Le guide pratique pour un poste professionnel, et la seule vérification qui compte : tester la restauration."
image: "/blog/sauvegarde-automatique-linux.jpg"
---

Comprendre [la règle du 3-2-1](/blog/sauvegarde-donnees/) répond à la question du combien et du où. Reste le plus difficile en pratique : que la sauvegarde tourne sans qu'on y pense, et qu'elle se restaure le jour où un disque lâche. C'est là que beaucoup de dispositifs s'effondrent. La copie existe, personne ne l'a jamais rouverte, et le jour de l'incident elle se révèle incomplète ou illisible. Certains professionnels prolongent la règle en « 3-2-1-1-0 » pour rappeler l'intérêt d'une copie hors ligne et d'une restauration testée ; l'ANSSI recommande bien ces deux contrôles dans son guide.

Sous Linux, mettre en place cette chaîne demande surtout une bonne configuration initiale, puis une surveillance légère. Encore faut-il distinguer deux choses qu'on confond souvent.

## Sauvegarder le système, ce n'est pas sauvegarder ses données

Une mise à jour qui casse l'affichage, un paquet mal installé, un réglage qui rend la machine instable : pour ces cas, on veut revenir à l'état d'avant. C'est le rôle d'un instantané système. Sous Linux, **Timeshift** s'en charge : il photographie le système à intervalles réguliers et permet de remonter le temps en quelques minutes. Utile, mais avec une limite à connaître : Timeshift exclut par défaut le dossier personnel. Il restaure le système d'exploitation, pas vos devis ni vos photos de chantier.

Les fichiers de travail relèvent d'un autre outil. **Déjà Dup**, facile à installer sur [Linux Mint](/blog/forfait-renaissance/), sauvegarde le dossier personnel de façon incrémentale et programmée. On désigne les dossiers à protéger et la destination, puis on active la planification. Les deux outils se complètent : Timeshift pour le système, Déjà Dup pour les données. Il reste à surveiller les notifications et à tester périodiquement une restauration.

## Chiffrer, parce que ce sont des données clients

Un professionnel qui sauvegarde des fichiers clients manipule des données personnelles, avec les obligations que cela implique. Une sauvegarde perdue ou volée non chiffrée devient une fuite. Déjà Dup propose le chiffrement par mot de passe à la configuration : il faut l'activer, et conserver ce mot de passe ailleurs que sur la machine sauvegardée. Sans lui, la restauration est impossible, y compris pour vous.

Pour la copie hors site, celle qui part vers un cloud ou un disque distant, le chiffrement doit être le réglage par défaut dès que des données clients sont concernées. **BorgBackup** et **restic** répondent à ce besoin : sauvegarde chiffrée, dédupliquée pour limiter le volume, pilotable vers un stockage distant. Plus techniques que Déjà Dup, ils conviennent au poste d'un indépendant qui veut une copie externalisée sans dépendre d'un service propriétaire. La CNIL rappelle que le chiffrement des sauvegardes et leur stockage à l'écart du système font partie des mesures de base.

*Source : [CNIL, « Sécurité : Sauvegarder »](https://www.cnil.fr/fr/securite-sauvegarder)*

## La copie hors ligne contre le rançongiciel

Un rançongiciel tente de chiffrer tout ce que le compte compromis peut atteindre, y compris certaines sauvegardes connectées en permanence. Un disque externe toujours branché ou un dossier synchronisé peut donc être touché ou propager les fichiers chiffrés. Une copie déconnectée réduit fortement ce risque. Un disque externe qu'on rebranche pour la sauvegarde hebdomadaire puis qu'on range protège mieux qu'un stockage toujours accessible avec les mêmes droits. L'ANSSI insiste sur ce point : prévoir au moins une sauvegarde hors ligne, isolée du système.

*Source : [ANSSI, « Sauvegarde des systèmes d'information : les fondamentaux »](https://messervices.cyber.gouv.fr/documents-guides/anssi_fondamentaux_sauvegarde_systemes_dinformation_v1.1.pdf)*

## La seule vérification qui compte : restaurer

Une sauvegarde jamais restaurée est une hypothèse, pas une garantie. C'est tout le sens du zéro dans le 3-2-1-1-0. La vérification se fait à froid, hors incident : prendre un fichier dans la sauvegarde, le restaurer dans un dossier de test, l'ouvrir, confirmer qu'il est intact et lisible. Un test trimestriel constitue un point de départ raisonnable pour un poste indépendant, à adapter selon la sensibilité des données. Il révèle un dossier oublié, une clé perdue ou une planification arrêtée sans alerte.

Programmer une sauvegarde simple et restaurer un fichier test prennent peu de temps une fois les outils configurés. C'est cet écart, entre une copie qu'on croit avoir et une copie qui fonctionne, qui sépare souvent l'incident mineur du sinistre définitif.

## En pratique

Pour un poste professionnel sous Linux, la configuration fiable tient en trois briques : Timeshift pour le système, Déjà Dup chiffré pour les données quotidiennes, une copie hors ligne ou externalisée pour le hors-site. L'automatisation fait l'essentiel du travail ; les alertes et les tests confirment qu'elle continue de fonctionner.

Je mets cette chaîne en place en atelier à **Saint-Laurent-Médoc**, pour les particuliers et professionnels du Médoc et du Bassin d'Arcachon, avec un premier test de restauration fait ensemble pour vérifier qu'elle répond présent le jour venu. [Me contacter](/#contact).
