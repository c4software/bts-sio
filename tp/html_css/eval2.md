---
description: "Deuxième point étape évalué de la séquence HTML + CSS. Une page d'accueil de journal, sémantique et responsive, mise en page avec Flexbox."
---

# Évaluation 2 : La une du journal

::: details Sommaire
[[toc]]
:::

## Introduction

Dans les précédents TP, nous avons vu le modèle des boîtes ([TP 2.2](./tp2.2.md)), la structure sémantique et la reproduction d'une maquette ([TP 3](./tp3.md)), puis Flexbox et le responsive ([TP 4](./tp4.md)).

Vous avez atteint le deuxième point étape. Ce mini projet est une **synthèse évaluée** de ces apprentissages. Il n'y aura pas de procédure pas à pas, à vous de mobiliser vos connaissances.

Le sujet est calibré pour une séance de **2 heures**, README et rendu compris. Conseil : la mise en page d'abord (les grandes zones), la décoration ensuite. Et gardez 20 minutes en fin de séance pour le README et le rendu.

::: tip TP évalué - Barème indicatif (Total 20 points + Bonus)

La réalisation de ce TP sera évaluée de la manière suivante :

- **La structure sémantique (4 points)**
  - Page structurée avec `header`, `nav`, `main`, `footer` : **2 points**.
  - Les articles dans des balises `article` (avec titres hiérarchisés) : **2 points**.
- **La mise en page Flexbox (4 points)**
  - La barre de navigation en Flexbox (logo d'un côté, liens de l'autre) : **2 points**.
  - Les articles en grille (Flexbox + `flex-wrap`) : **2 points**.
- **Le responsive (4 points)**
  - Meta viewport présente et media queries fonctionnelles : **2 points**.
  - Sur mobile : une seule colonne, pas de défilement horizontal : **2 points**.
- **La charte graphique (3 points)**
  - Palette de couleurs et typographie cohérentes : **2 points**.
  - Les articles présentés en cartes (padding, bordures ou ombres) : **1 point**.
- **Les interactions (2 points)**
  - Un effet au survol des cartes et des liens, avec transition : **2 points**.
- **Le README.md (3 points)**
  - Présent à la racine et complet (voir la section dédiée) : **3 points**.
- **Bonus challenge (2 points)**
  - Le thème sombre automatique (voir la fin du sujet).

:::

Vous avez à votre disposition l'ensemble des documents nécessaires :

- [Le complément de cours CSS](./support.md)
- [TP 2.2. Le modèle des boîtes](./tp2.2.md)
- [TP 3. Mise en pratique CSS](./tp3.md)
- [TP 4. Flexbox et Responsive](./tp4.md)

## Le projet

Vous allez réaliser la **page d'accueil d'un journal en ligne** (la « une »). Le thème est libre : actualité du jeu vidéo, sport, sciences, musique… Une seule page, mais une vraie mise en page.

1. **La structure :**
   - Un `header` avec le nom du journal et une éventuelle accroche.
   - Une `nav` avec 3 ou 4 rubriques (les liens peuvent pointer vers `#`).
   - Un `main` contenant au moins 6 articles (`article`) : image d'illustration, titre, chapô de deux lignes, lien « Lire la suite ».
   - Un `footer` avec les mentions habituelles.

::: details Besoin d'aide pour la structure ?
C'est la structure du [TP 3](./tp3.md), regardez le code source que je vous avais fourni. Pour les images d'illustration, [picsum.photos](https://picsum.photos/) fera parfaitement l'affaire.
:::

2. **La mise en page :**
   - La barre de navigation en Flexbox.
   - Les articles en grille : 3 colonnes sur grand écran.
   - Le contenu principal centré, avec une largeur maitrisée (`max-width` + `margin: auto`).

::: details Coup de pouce : la grille d'articles
Un conteneur en `display: flex` avec `flex-wrap: wrap`, et une base de largeur sur les articles (le `flex: 1 0 30%` du [TP 4](./tp4.md) est un bon point de départ). Le `gap` est votre ami pour les espacements.
:::

3. **Le responsive :**
   - Sur mobile : les articles passent en une seule colonne, la navigation reste utilisable.
   - À vous de choisir vos breakpoints (et de les justifier dans le README).

::: details Besoin d'aide pour le responsive ?
N'oubliez pas la meta viewport, sans elle rien ne fonctionne ([TP 4](./tp4.md#activation-du-responsive)). Testez en continu avec le mode mobile de l'inspecteur d'éléments, pas seulement à la fin.
:::

4. **La finition :**
   - Les articles en cartes (fond, padding, arrondis, ombre).
   - Un effet au survol (cartes et liens), adouci par une transition.

## Le README.md

Votre projet doit contenir un fichier `README.md` **à la racine**, comme dans toutes les évaluations du parcours. Le contenu attendu est détaillé dans [la première évaluation PHP](/tp/php/eval1.md#le-readme-md), en résumé :

- Le titre du projet et votre nom.
- Une courte présentation (2 ou 3 phrases).
- Comment consulter le site.
- La liste des fonctionnalités réalisées (et non réalisées, soyez honnête), dont vos breakpoints et pourquoi.
- Des captures d'écran **desktop et mobile** (dans un dossier `docs/`).
- Le challenge : réalisé ou non.

## Le challenge

Vous avez terminé ? Voici le défi bonus :

- Votre journal doit s'adapter automatiquement au thème de l'appareil du visiteur : fond sombre et texte clair si son système est en mode sombre.
- Sans toucher au HTML : tout se passe en CSS, avec une media query un peu spéciale… `prefers-color-scheme`, [des exemples sont dans le support](./support.md#quelques-exemples-de-media-queries).

## Restitution

Le rendu se fait sur Moodle :

1. **Vérifiez votre projet** : le `README.md` est à la racine, les captures d'écran (desktop et mobile) dans `docs/`, et tout s'affiche correctement dans le navigateur.
2. **Compressez le dossier complet** de votre projet au format `.zip`.
3. **Déposez l'archive dans Moodle**.

::: danger Vérifiez votre archive
Une archive incomplète (images manquantes, CSS oubliée) = un site cassé chez le correcteur. Le bon réflexe : décompressez votre zip dans un autre dossier, ouvrez le site, et vérifiez que tout fonctionne **avant** de déposer.
:::

Bravo, vous avez terminé cette deuxième évaluation ! La suite de la séquence : [maquetter un site](./maquette.md), [les frameworks CSS](./framework_css/introduction.md), puis le grand final : [votre CV en ligne](./tp5.md).
