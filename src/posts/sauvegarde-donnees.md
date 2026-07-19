---
title: "Sauvegarder ses données : comprendre la règle du 3-2-1"
date: "2026-05-22"
lastModified: "2026-07-19"
category: "Hardware"
excerpt: "Panne de disque, rançongiciel, fausse manœuvre : les causes de perte de données sont nombreuses et ordinaires. Les principes d'une sauvegarde fiable tiennent pourtant en une règle simple, le 3-2-1. Explications pour les particuliers et les professionnels, sous Windows comme sous Linux."
image: "/blog/sauvegarde-donnees.jpg"
---

La perte de données ne relève pas de la malchance exceptionnelle. Panne matérielle, attaque par rançongiciel ou simple erreur de manipulation : les causes sont nombreuses et fréquentes. Pour un professionnel, la disparition de devis, de factures ou de fichiers clients peut interrompre l'activité ; pour un particulier, elle se solde souvent par la perte définitive de photos et de documents.

La parade est connue de longue date et tient en une règle : le 3-2-1.

## La règle du 3-2-1

Formalisée dans les années 2000 et toujours recommandée par les organismes de cybersécurité, elle se résume ainsi :

- **3 copies** des données : l'original et deux sauvegardes ;
- **2 supports** de nature différente (par exemple un disque interne et un disque externe) ;
- **1 copie hors site**, conservée ailleurs (cloud ou domicile d'un proche).

La copie hors site répond à un risque souvent négligé : un incendie, un dégât des eaux ou un cambriolage peut détruire en même temps l'ordinateur et le disque de sauvegarde posé à côté. Pour la plupart des usages, l'objectif minimal réaliste combine un disque externe et un service en ligne.

## Trois risques courants

**La panne matérielle.** Les disques durs mécaniques (HDD) s'usent. Les relevés publiés chaque année par l'hébergeur Backblaze, à partir d'un parc de plusieurs centaines de milliers de disques, montrent que leur taux de panne augmente nettement avec l'âge, en particulier au-delà de trois à quatre ans. Une fois le disque hors service, la récupération des données en laboratoire spécialisé coûte de plusieurs centaines à plusieurs milliers d'euros, sans garantie de résultat.

*Source : [Backblaze Drive Stats](https://www.backblaze.com/cloud-storage/resources/hard-drive-test-data)*

**Les rançongiciels.** Ces logiciels chiffrent les fichiers et en monnaient le déblocage. L'ANSSI les classe parmi les principales menaces visant les entreprises et les collectivités dans son *Panorama de la cybermenace*. Face à eux, une sauvegarde hors ligne et récente est le moyen le plus sûr de repartir sans payer la rançon.

*Source : [ANSSI – Panorama de la cybermenace](https://www.cyber.gouv.fr/)*

**L'erreur humaine.** Supprimer un dossier, écraser un fichier, formater le mauvais disque : avec une sauvegarde récente, l'incident est mineur ; sans, il est définitif.

## Mettre en place une sauvegarde

### Pour un professionnel (devis, factures, photos de chantier)

Deux éléments couvrent l'essentiel du besoin :

1. **Un disque externe USB** dimensionné au volume de données, branché régulièrement pour une sauvegarde automatique.
2. **Un service en ligne** (OneDrive, Google Drive, ou un Nextcloud auto-hébergé) pour synchroniser en continu le dossier de travail.

Sous Windows, l'outil intégré « Historique des fichiers » peut sauvegarder les dossiers personnels vers un disque externe. Sous Linux, **Déjà Dup** remplit ce rôle pour les fichiers, tandis que **Timeshift** crée des instantanés du système. Dans les deux cas, il faut vérifier régulièrement que la tâche s'exécute et qu'un fichier peut être restauré.

### Pour un particulier (photos, vidéos, documents)

La logique est identique :

- **Photos** : synchronisation automatique vers Google Photos, iCloud ou un Nextcloud personnel.
- **Documents** : un dossier synchronisé avec le service en ligne de votre choix.
- **Fichiers volumineux** (vidéos, musique) : une sauvegarde mensuelle sur disque externe.

Sous Linux Mint, le système que j'installe avec le forfait Renaissance, **Déjà Dup** est présent par défaut et sauvegarde le dossier personnel en quelques clics.

## Pourquoi le cloud seul ne suffit pas

Une synchronisation (OneDrive, Google Drive, iCloud) ne remplace pas à elle seule une sauvegarde. Une suppression ou un chiffrement peut être répercuté dans le cloud. Les corbeilles et historiques de versions offrent parfois un recours, mais leur durée et leurs limites dépendent du service. Le cloud peut constituer l'une des copies de la règle du 3-2-1, pas la solution complète.

## Ce que cela coûte

Le budget dépend surtout du volume et du niveau d'automatisation. Un disque externe de 1 à 2 To coûte généralement quelques dizaines à un peu plus d'une centaine d'euros selon qu'il s'agit d'un HDD ou d'un SSD. Un espace en ligne ajoute un abonnement lorsque le quota gratuit ne suffit plus. Un Nextcloud auto-hébergé évite l'abonnement à un fournisseur, mais le serveur, les disques et la maintenance ont eux aussi un coût.

Pour beaucoup de particuliers et de petites entreprises, un disque externe associé à un espace distant raisonnable couvre déjà l'essentiel. L'important est de budgéter aussi le test de restauration, pas seulement le support de stockage.

---

*En pratique :* la configuration d'une sauvegarde fiable se fait une fois pour toutes. Je la mets en place en atelier à Saint-Laurent-Médoc, pour les particuliers et professionnels du Médoc et du Bassin d'Arcachon. [Me contacter](/#contact).
