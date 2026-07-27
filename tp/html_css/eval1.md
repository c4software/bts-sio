---
description: "Premier point étape évalué de la séquence HTML + CSS. Un mini site statique pour valider la structure HTML, les liens, les images et les bases de la CSS."
---

# Évaluation 1 : Ma page passion

::: details Sommaire
[[toc]]
:::

## Introduction

Dans les précédents TP, nous avons vu la structure du HTML ([TP 1](./tp1.md)), les liens, les images et les tableaux ([TP 1.1](./tp1.1.md)), les bases de la CSS ([TP 2](./tp2.md)) et la mise en forme du texte, des couleurs et des fonds ([TP 2.1](./tp2.1.md)).

Vous avez atteint un premier point étape. Ce mini projet est une **synthèse évaluée** de ces apprentissages. Il n'y aura pas de procédure pas à pas, à vous de mobiliser vos connaissances.

Le sujet est calibré pour une séance de **2 heures**, README et rendu compris. Conseil : ne partez pas de zéro, inspirez-vous de la structure de votre blog et gardez 20 minutes en fin de séance pour le README et le rendu.

::: tip TP évalué - Barème indicatif (Total 20 points + Bonus)

La réalisation de ce TP sera évaluée de la manière suivante :

- **Structure du projet (4 points)**
  - Projet organisé en dossiers (`css/`, `img/`), fichiers bien nommés (minuscules, sans espaces ni accents) : **2 points**.
  - Squelette HTML 5 valide sur chaque page (doctype, `head`, `meta charset`, `title`) : **2 points**.
- **Le contenu (5 points)**
  - Titres hiérarchisés (un seul `h1` par page, des `h2` cohérents) : **1 point**.
  - Des mises en valeur pertinentes (`em`, `strong`) : **1 point**.
  - Au moins une liste (`ul` ou `ol`) : **1 point**.
  - Un tableau avec en-tête (`thead` / `th`) : **1 point**.
  - Des images avec des `alt` pertinents : **1 point**.
- **La navigation (3 points)**
  - Les deux pages reliées entre elles (liens relatifs) : **2 points**.
  - Un lien externe **et** un lien `mailto:` ou une ancre : **1 point**.
- **La CSS (4 points)**
  - Une feuille de style externe, partagée par les deux pages : **1 point**.
  - Des sélecteurs par balise **et** par `class` : **1 point**.
  - Une typographie travaillée (police avec secours, tailles en `em`) : **1 point**.
  - Des couleurs (notation hexadécimale) et un fond : **1 point**.
- **Qualité (2 points)**
  - Code indenté, pas de balise laissée ouverte, pas de copier / coller inutile : **2 points**.
- **Le README.md (3 points)**
  - Présent à la racine et complet (voir la section dédiée) : **3 points**.
- **Bonus challenge (2 points)**
  - Le tableau zébré interactif (voir la fin du sujet).

:::

Vous avez à votre disposition l'ensemble des documents nécessaires :

- [Le complément de cours CSS](./support.md)
- [Le Mémo HTML](/cheatsheets/html/)
- [TP 1. Découverte du HTML](./tp1.md)
- [TP 1.1. Liens, images et tableaux](./tp1.1.md)
- [TP 2. Découverte de la CSS](./tp2.md)
- [TP 2.1. Texte, couleurs et fonds](./tp2.1.md)

## Le projet

Vous allez réaliser un **mini site de deux pages sur une passion de votre choix** (un sport, un jeu, une série, la cuisine… ce que vous voulez, tant que le contenu est de vous).

1. **La structure :**
   - Une page d'accueil `index.html` qui présente votre passion.
   - Une seconde page de votre choix (par exemple « en détail », « le matériel », « les personnages »…).
   - Les images dans un dossier `img/`, la feuille de style dans un dossier `css/`.

::: details Coup de pouce : la structure
C'est la même organisation que votre blog du fil rouge. Reprenez le squelette HTML 5 vu au [TP 1](./tp1.md), et souvenez-vous des règles de nommage des fichiers.
:::

2. **Le contenu :**
   - Des titres hiérarchisés, des paragraphes rédigés, des mots mis en valeur.
   - Une liste (idées, classement, ingrédients…).
   - Un tableau avec un en-tête (statistiques, comparatif, planning…).
   - Au moins deux images, avec des `alt` dignes de ce nom.

::: details Coup de pouce : le contenu
La question à vous poser pour chaque élément : « quelle balise porte le bon sens ? ». Un classement est une liste **ordonnée**, un comparatif est un tableau, un mot clé important mérite un `strong`. La forme viendra de la CSS, pas des balises.
:::

3. **La navigation :**
   - Chaque page a un lien vers l'autre.
   - Un lien vers un site externe en rapport avec votre passion.
   - Un lien `mailto:` vers votre adresse **ou** une ancre vers une section de la page.

4. **La CSS :**
   - Une seule feuille de style, chargée par les deux pages.
   - Une charte assumée : police (avec police de secours), tailles en `em`, palette de couleurs en hexadécimal, un fond (couleur ou image).
   - Au moins une `class` réutilisée à plusieurs endroits.

::: details Coup de pouce : la CSS
Pensez héritage : définissez le style général sur `body`, puis affinez. Trois règles bien pensées valent mieux que quinze règles copiées / collées. Et attention au chemin de la feuille de style : elle est dans `css/`, vos pages à la racine.
:::

## Le README.md

Votre projet doit contenir un fichier `README.md` **à la racine**, comme dans toutes les évaluations du parcours. Le contenu attendu est détaillé dans [la première évaluation PHP](/tp/php/eval1.md#le-readme-md), en résumé :

- Le titre du projet et votre nom.
- Une courte présentation (2 ou 3 phrases).
- Comment consulter le site (quel fichier ouvrir).
- La liste des fonctionnalités réalisées (et non réalisées, soyez honnête).
- Des captures d'écran des deux pages (dans un dossier `docs/`).
- Le challenge : réalisé ou non.

## Le challenge

Vous avez terminé ? Voici le défi bonus :

- Votre tableau doit être « zébré » : une ligne sur deux avec un fond différent.
- Au survol d'une ligne, celle-ci change de couleur.

Un indice : la pseudo-classe `:nth-child(even)`… je vous laisse chercher, c'est aussi ça le métier. 😉

## Restitution

Le rendu se fait sur Moodle :

1. **Vérifiez votre projet** : le `README.md` est à la racine, les captures d'écran dans `docs/`, et tout s'affiche correctement dans le navigateur.
2. **Compressez le dossier complet** de votre projet au format `.zip`.
3. **Déposez l'archive dans Moodle**.

::: danger Vérifiez votre archive
Une archive incomplète (images manquantes, CSS oubliée) = un site cassé chez le correcteur. Le bon réflexe : décompressez votre zip dans un autre dossier, ouvrez le site, et vérifiez que tout fonctionne **avant** de déposer.
:::

Bravo, vous avez terminé cette première évaluation ! La suite de la séquence : [le modèle des boîtes](./tp2.2.md).
