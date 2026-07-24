---
description: Premier point étape évalué. Un mini projet rapide pour valider les bases du PHP, les variables, les boucles, les includes et le passage de paramètres.
---

# Évaluation 1 : Ma page profil dynamique

::: details Sommaire
[[toc]]
:::

## Introduction

Dans les précédents TP, nous avons vu les bases du PHP ([TP 1](./tp1.md)), les boucles ([TP 1.1](./tp1.1.md)), les includes ([TP 1.2](./tp1.2.md)) et le passage de paramètres ([TP BTS TV](./tp-param.md)).

Vous avez atteint un premier point étape. Ce mini projet est une **synthèse évaluée** de ces apprentissages. Il n'y aura pas de procédure pas à pas, à vous de mobiliser vos connaissances.

Le sujet est calibré pour une séance de **2 heures**, README et rendu compris. Conseil : ne partez pas de zéro, réutilisez la structure de vos TP précédents et gardez 20 minutes en fin de séance pour le README et le rendu.

::: tip TP évalué - Barème indicatif (Total 20 points + Bonus)

La réalisation de ce TP sera évaluée de la manière suivante :

- **Structure du projet (4 points)**
  - Projet organisé en dossiers (`components/`, `public/`) : **2 points**.
  - `head`, `nav` et `footer` inclus via `include()` : **2 points**.
- **Les données (3 points)**
  - Profil stocké dans un tableau associatif : **2 points**.
  - Liste de compétences stockée dans un tableau : **1 point**.
- **L'affichage (4 points)**
  - Affichage du profil à partir du tableau (pas de texte en dur) : **2 points**.
  - Affichage des compétences via une boucle (`foreach`) : **2 points**.
- **Le dynamisme (4 points)**
  - Personnalisation via un paramètre `$_GET` avec gestion du cas absent (`isset()`) : **3 points**.
  - Une condition qui change l'affichage : **1 point**.
- **Qualité (2 points)**
  - Code indenté, variables nommées en anglais, pas de copier / coller inutile : **2 points**.
- **Le README.md (3 points)**
  - Présent à la racine et complet (voir la section dédiée) : **3 points**.
- **Bonus challenge (2 points)**
  - Le thème clair / sombre via l'URL (voir la fin du sujet).

:::

Vous avez à votre disposition l'ensemble des documents nécessaires :

- [Le complément de cours PHP](./support.md)
- [TP 1. Créer ma première page PHP](./tp1.md)
- [TP 1.1. Le générateur de Bart](./tp1.1.md)
- [TP 1.2. Utiliser des includes et une librairie](./tp1.2.md)
- [TP BTS TV. Le passage de paramètres](./tp-param.md)

## Le projet

Vous allez réaliser une **page profil** (une sorte de mini CV en ligne) entièrement générée par PHP.

1. **La structure :**
   - Créer un nouveau projet avec un dossier `components/` (et un dossier `public/` si vous avez de la CSS).
   - Découper la page en `components/head.php`, `components/nav.php` et `components/footer.php`, inclus dans `index.php`.

::: details Coup de pouce : la structure
C'est la même organisation que le [TP BTS TV](./tp-param.md), vous l'avez déjà mise en place. Un include, c'est une ligne :

```php
<?php include('components/nav.php'); ?>
```

À vous de découper votre page et de placer chaque include au bon endroit du HTML (le `head` n'est pas dans le `body`… 🤔).
:::

2. **Les données :**
   - Créer un tableau associatif `$profile` contenant au minimum : nom, prénom, âge, ville, formation.
   - Créer un tableau `$skills` contenant au moins 5 compétences (exemple : HTML, CSS, PHP…).

::: details Coup de pouce : les données
Un tableau associatif, ça s'écrit comme ça (à vous de l'adapter avec les bonnes clés) :

```php
$profile = array(
    "nom" => "Simpson",
    "prenom" => "Bart",
    // À compléter…
);

$skills = array("HTML", "CSS", /* À compléter… */);
```

:::

3. **L'affichage :**
   - Afficher les informations du profil **uniquement** à partir du tableau `$profile`.
   - Afficher la liste des compétences avec une boucle. Si vous ajoutez une compétence dans le tableau, elle doit apparaitre sans toucher au HTML.
   - Afficher l'année courante dans le footer (fonction `date()`).

::: details Coup de pouce : l'affichage
Pour la boucle, le `foreach` est votre ami ([vu dans le support](./support.md#le-foreach)). La syntaxe générique :

```php
foreach ($mon_tableau as $element) {
    // Utiliser $element ici
}
```

À vous de l'appliquer à vos compétences, et de mélanger PHP et HTML pour produire une vraie liste (`<ul>`, `<li>`). Pour lire une valeur d'un tableau associatif, souvenez-vous : ça passe par la clé.
:::

4. **Le dynamisme :**
   - Si l'URL contient `?visiteur=Un-Nom`, la page doit afficher « Bonjour Un-Nom, bienvenue sur mon profil ». Sans le paramètre, la page doit afficher un message par défaut (pas d'erreur PHP !).
   - Ajouter une condition de votre choix qui modifie l'affichage (exemple : un badge « Majeur » si l'âge du profil est supérieur ou égal à 18).

::: details Coup de pouce : le paramètre
Le duo `isset()` + `$_GET` est [vu dans le support](./support.md#le-get). Le début de la logique :

```php
if (isset($_GET['visiteur'])) {
    // Le paramètre est présent… À vous de jouer.
} else {
    // Le message par défaut.
}
```

:::

## Le README.md

Votre projet doit contenir un fichier `README.md` **à la racine**. C'est la porte d'entrée de votre projet : c'est le premier fichier qu'un développeur (ou votre correcteur 👀) lit en l'ouvrant.

Il doit contenir :

- Le **titre** du projet et votre **nom**.
- Une **courte présentation** du projet (2 ou 3 phrases : c'est quoi, ça fait quoi).
- **Comment lancer le projet** (où placer les fichiers, quelle URL ouvrir).
- La **liste des fonctionnalités** réalisées (et celles non terminées, soyez honnête).
- Des **captures d'écran** des pages principales du projet (placez les images dans un dossier `docs/` de votre dépôt et affichez-les dans le README). Pour cette évaluation : la page avec le paramètre `?visiteur=...`, la page sans paramètre, et les deux thèmes si vous avez fait le challenge.
- Le **challenge** : réalisé ou non.

::: tip Une habitude à prendre
Le `README.md` sera demandé et évalué dans **toutes les évaluations** de ce parcours (3 points à chaque fois). C'est également un standard dans le monde professionnel : tous vos futurs projets (et dépôts Git) devraient en avoir un.
:::

## Le challenge

Vous avez terminé ? Voici le défi bonus :

- Ajouter la gestion d'un paramètre `?theme=dark` ou `?theme=light` dans l'URL.
- En fonction du paramètre, votre page doit charger une CSS différente (ou une classe CSS différente sur le `body`).
- Sans paramètre, le thème `light` doit être utilisé par défaut.

## Restitution

Le rendu se fait en deux temps :

1. **Poussez votre projet sur un dépôt Git** sur le GitLab du lycée : [https://gitlab.dombtsig.local](https://gitlab.dombtsig.local). Le `README.md` doit être à la racine du dépôt (GitLab l'affichera automatiquement sur la page du projet).
2. **Déposez le lien du dépôt dans Moodle**.

::: tip Besoin d'un rappel sur Git ?
Vous l'avez déjà pratiqué, mais en cas de trou de mémoire :

- [Initiation à Git](/tp/git_initiation/)
- [Utiliser GitLab](/tp/gitlab/)
- [L'aide mémoire Git](/cheatsheets/git/)

:::

::: danger Vérifiez l'accès
Un lien vers un dépôt auquel je n'ai pas accès = un rendu vide. Vérifiez la visibilité de votre projet (ou ajoutez-moi en membre) **avant** de déposer le lien.
:::

Bravo, vous avez terminé cette première évaluation !
