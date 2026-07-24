---
description: Deuxième point étape évalué. Un mini projet pour valider les formulaires, l'organisation avec un entry-point, la session et la protection de pages.
---

# Évaluation 2 : Le livre d'or

::: details Sommaire
[[toc]]
:::

## Introduction

Dans les précédents TP, nous avons vu les formulaires ([TP 2](./tp2.md)), l'organisation du code avec un entry-point ([TP 3](./tp3.md)), la session et les cookies ([TP 4](./tp4.md)) et la protection de pages ([TP 5](./tp5.md)).

Vous avez atteint un deuxième point étape. Ce mini projet est une **synthèse évaluée** de ces apprentissages. Il n'y aura pas de procédure pas à pas, à vous de mobiliser vos connaissances.

Le sujet est calibré pour une séance de **2 heures**, README et rendu compris. Conseil : repartez de la structure de votre TP 3 (entry-point) et du code de connexion de votre TP 5, c'est autorisé et c'est même conseillé. Gardez 20 minutes en fin de séance pour le README et le rendu.

::: tip TP évalué - Barème indicatif (Total 20 points + Bonus)

La réalisation de ce TP sera évaluée de la manière suivante :

- **Structure (4 points)**
  - Entry-point unique (`index.php`) avec whitelist de pages : **2 points**.
  - Organisation en dossiers (`common/`, `pages/`, `public/`) : **1 point**.
  - Header / footer communs inclus une seule fois : **1 point**.
- **Le formulaire (3 points)**
  - Formulaire en `POST` (pseudo + message) : **2 points**.
  - Contrôle de la saisie avec `isset()` (pas d'erreur si champs vides) : **1 point**.
- **La session (4 points)**
  - `session_start()` géré dans l'entry-point : **1 point**.
  - Messages stockés dans un tableau en `$_SESSION` : **2 points**.
  - Affichage de tous les messages avec une boucle : **1 point**.
- **L'espace admin (4 points)**
  - Page de connexion (login + mot de passe) : **2 points**.
  - Page admin accessible **uniquement** connecté (redirection sinon) : **1 point**.
  - Déconnexion fonctionnelle : **1 point**.
- **Qualité (2 points)**
  - Code indenté, organisation propre, liens de navigation cohérents : **2 points**.
- **Le README.md (3 points)**
  - Présent à la racine et complet (comme défini dans [l'évaluation 1](./eval1.md#le-readme-md)) : **3 points**.
- **Bonus challenge (2 points)**
  - La suppression de messages et le compteur de visites (voir la fin du sujet).

:::

Vous avez à votre disposition l'ensemble des documents nécessaires :

- [Le complément de cours PHP](./support.md)
- [TP 2. Jouer avec les formulaires](./tp2.md)
- [TP 3. Structurer mon code](./tp3.md)
- [TP 4. Utiliser la session](./tp4.md)
- [TP 5. Protéger des pages à l'aide de la session](./tp5.md)

## Le projet

Vous allez réaliser un **livre d'or** : les visiteurs laissent un message, les messages s'affichent sur la page d'accueil, et un espace d'administration est protégé par un mot de passe.

1. **La structure :**
   - Créer un projet avec un entry-point unique (`index.php`) et une whitelist de **3 pages** : `home`, `connexion`, `admin`.
   - Les pages sont dans le dossier `pages/`, les éléments communs dans `common/`.

::: details Coup de pouce : l'entry-point
Vous l'avez déjà écrit au TP 3, et le code de référence est dans [le support, section « La structure »](./support.html#la-structure). À adapter à **vos** 3 pages, sans oublier :

- Le `session_start()` en toute première ligne (vous en aurez besoin partout dans ce projet).
- La whitelist : un tableau + `in_array()`.
- Le cas d'une page non autorisée ou absente : retour sur `home`.
:::

2. **La page d'accueil (`home`) :**
   - Elle contient un formulaire **POST** avec un pseudo et un message.
   - À la soumission, le message est ajouté dans un tableau stocké en `$_SESSION`.
   - Si un champ est vide ou absent, afficher un message d'erreur (pas de warning PHP).
   - Sous le formulaire, la page affiche l'ensemble des messages (pseudo + message) avec une boucle.
   - Si aucun message n'est présent, afficher « Aucun message pour l'instant ».

::: details Coup de pouce : stocker les messages en session
Un livre d'or, c'est un **tableau de tableaux associatifs** stocké dans une clé de `$_SESSION`. Deux rappels de syntaxe, à vous de les combiner :

```php
// Ajouter un élément à la fin d'un tableau
$mon_tableau[] = "une valeur";

// La session est un tableau comme un autre
$_SESSION['une_cle'] = "une valeur";
```

Trois questions à vous poser : que contient chaque « message » (une valeur simple ou un tableau associatif ?), que se passe-t-il au **premier** message quand la clé n'existe pas encore, et que devient l'affichage si le tableau est vide ?

⚠️ Ne stockez pas les messages dans la même clé de session que l'état de connexion.
:::

3. **L'espace admin :**
   - La page `connexion` contient un formulaire de login (login + mot de passe, en dur pour cette évaluation, c'est autorisé).
   - Une fois connecté, l'utilisateur accède à la page `admin` qui affiche le nombre de messages et la liste complète.
   - Non connecté, l'accès à `admin` redirige vers `connexion`.
   - Un lien « Déconnexion » détruit la session de connexion.

::: details Coup de pouce : protéger la page admin
Le mécanisme complet (connexion + protection) est décrit dans [le support, section « espace d'administration »](./support.html#utiliser-la-session-pour-gerer-un-espace-d-administration). Les trois ingrédients de la protection, à assembler en haut de la page à protéger :

- Un test sur la session (`isset()`).
- Une redirection (`header()`).
- Un `die()` juste après (pourquoi est-il indispensable ? La réponse fera un bon commentaire dans votre code).

Et pour la déconnexion, regardez du côté de `unset()` (ou `session_destroy()`, mais attention : que deviennent alors vos messages ?).
:::

::: danger Un instant, réfléchissez
Les messages sont stockés en `$_SESSION`. Que se passe-t-il si vous fermez votre navigateur ? Est-ce une vraie solution de stockage ? Notez votre réponse en commentaire dans votre code, nous en reparlerons avec les bases de données.
:::

## Le challenge

Vous avez terminé ? Voici le défi bonus :

- **Suppression** : dans la page admin, ajouter un lien « Supprimer » à côté de chaque message. Le clic supprime le message correspondant du tableau en session.
- **Compteur de visites** : à l'aide d'un cookie, afficher sur la page d'accueil « Vous avez visité cette page X fois ».

## Restitution

Le rendu se fait en deux temps :

1. **Poussez votre projet sur un dépôt Git** sur le GitLab du lycée : [https://gitlab.dombtsig.local](https://gitlab.dombtsig.local), avec le `README.md` à la racine (contenu attendu : voir [l'évaluation 1](./eval1.md#le-readme-md)).
   - Captures d'écran à inclure dans le README : la page d'accueil avec des messages, et la page admin connectée.
   - Pensez à y indiquer le login et le mot de passe de l'espace admin, sinon la correction sera compliquée !
2. **Déposez le lien du dépôt dans Moodle** (et vérifiez que j'y ai accès).

Un doute sur Git ? [Initiation à Git](/tp/git_initiation/), [Utiliser GitLab](/tp/gitlab/), [l'aide mémoire](/cheatsheets/git/).

Bravo, vous avez terminé cette deuxième évaluation !
