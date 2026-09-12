---
description: Deuxième point étape évalué. Un mini projet pour valider les formulaires, l'organisation avec un entry-point, la base de données et la protection de pages.
---

# Évaluation 2 : Le livre d'or

::: details Sommaire
[[toc]]
:::

## Introduction

Dans les précédents TP, nous avons vu les formulaires et la base de données ([TP 2](./tp2.md)), l'organisation du code avec un entry-point ([TP 3](./tp3.md)), la session et les cookies ([TP 4](./tp4.md)), la protection de pages ([TP 5](./tp5.md)) et sa version sérieuse avec les utilisateurs en base ([TP Authentification](./sql/tp-authentification.md)).

Vous avez atteint un deuxième point étape. Ce mini projet est une **synthèse évaluée** de ces apprentissages. Il n'y aura pas de procédure pas à pas, à vous de mobiliser vos connaissances.

Le sujet est calibré pour une séance de **2 heures**, README et rendu compris. Pour tenir ce temps : le script SQL du livre d'or vous est **fourni** (voir plus bas), et vous pouvez (c'est conseillé) repartir de la structure de votre TP 3 et du code de connexion de votre TP 5. Gardez 20 minutes en fin de séance pour le README et le rendu.

::: tip TP évalué - Barème indicatif (Total 20 points + Bonus)

La réalisation de ce TP sera évaluée de la manière suivante :

- **Structure (4 points)**
  - Entry-point unique (`index.php`) avec whitelist de pages : **2 points**.
  - Organisation en dossiers (`common/`, `pages/`, `public/`, `utils/`) : **1 point**.
  - Header / footer communs inclus une seule fois : **1 point**.
- **Le formulaire (3 points)**
  - Formulaire en `POST` (pseudo + message) : **2 points**.
  - Contrôle de la saisie avec `isset()` (pas d'erreur si champs vides) : **1 point**.
- **La base de données (4 points)**
  - Script fourni importé et connexion PDO sortie dans un fichier inclus (`utils/db.php`) : **1 point**.
  - Enregistrement du message par un `INSERT` en **requête préparée** : **2 points**.
  - Liste des messages lue en base (`SELECT`) et affichée avec une boucle : **1 point**.
- **L'espace admin (4 points)**
  - Page de connexion (login + mot de passe, en dur autorisé ici) : **1 point**.
  - État de connexion en `$_SESSION`, avec `session_start()` géré dans l'entry-point : **1 point**.
  - Page admin accessible **uniquement** connecté (redirection sinon) : **1 point**.
  - Déconnexion fonctionnelle : **1 point**.
- **Qualité (2 points)**
  - Code indenté, organisation propre, liens de navigation cohérents : **2 points**.
- **Le README.md (3 points)**
  - Présent à la racine et complet (comme défini dans [l'évaluation 1](./eval1.md#le-readme-md)) : **3 points**.
- **Bonus challenge (2 points)**
  - La suppression de messages et le compteur de messages (voir la fin du sujet).

:::

::: danger Attention à la sécurité
Une valeur qui vient de l'utilisateur (`$_GET`, `$_POST`) ne doit **jamais** être concaténée dans une requête SQL. Un seul oubli et c'est une injection SQL : ce point sera regardé de très près lors de la correction.
:::

Vous avez à votre disposition l'ensemble des documents nécessaires :

- [Le complément de cours PHP](./support.md)
- [Le complément de cours SQL](./sql/support.md)
- [TP 2. Jouer avec les formulaires](./tp2.md)
- [TP 3. Structurer mon code](./tp3.md)
- [TP 4. Utiliser la session](./tp4.md)
- [TP 5. Protéger des pages, première partie](./tp5.md)
- [TP Authentification : les bonnes pratiques](./sql/tp-authentification.md)

## Le projet

Vous allez réaliser un **livre d'or** : les visiteurs laissent un message, les messages sont **enregistrés en base de données** et s'affichent sur la page d'accueil, et un espace d'administration est protégé par un mot de passe.

1. **La base de données :**
   - Créer une base `livre_or` et y importer le script fourni ci-dessous (table `messages`).
   - Sortir la connexion PDO dans `utils/db.php`, inclus une seule fois depuis l'entry-point.

::: details Le script SQL fourni

```sql
CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pseudo VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  date_creation DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

Remarquez le `DEFAULT CURRENT_TIMESTAMP` : la date se remplit toute seule, vous n'avez pas à l'envoyer dans votre `INSERT`.

:::

2. **La structure :**
   - Créer un projet avec un entry-point unique (`index.php`) et une whitelist de **3 pages** : `home`, `connexion`, `admin`.
   - Les pages sont dans le dossier `pages/`, les éléments communs dans `common/`, la connexion à la base dans `utils/db.php`.

::: details Coup de pouce : l'entry-point
Vous l'avez déjà écrit au TP 3, et le code de référence est dans [le support, section « La structure »](./support.html#la-structure). À adapter à **vos** 3 pages, sans oublier :

- Le `session_start()` en toute première ligne (vous en aurez besoin pour l'espace admin).
- L'`include('utils/db.php')` **avant** le header, pour que `$pdo` existe dans toutes vos pages.
- La whitelist : un tableau + `in_array()`.
- Le cas d'une page non autorisée ou absente : retour sur `home`.
:::

3. **La page d'accueil (`home`) :**
   - Elle contient un formulaire **POST** avec un pseudo et un message.
   - À la soumission, le message est **enregistré en base** dans la table `messages`.
   - Si un champ est vide ou absent, afficher un message d'erreur (pas de warning PHP, et rien d'enregistré).
   - Sous le formulaire, la page affiche l'ensemble des messages (pseudo, message et date) avec une boucle, du plus récent au plus ancien.
   - Si aucun message n'est présent, afficher « Aucun message pour l'instant ».

::: details Besoin d'aide pour l'enregistrement et la liste ?
Les deux formes dont vous avez besoin sont dans [le support SQL](./sql/support.md#requete-prepare-ou-requete-normal). Souvenez-vous de la règle : des valeurs variables, donc **requête préparée**.

Pour **enregistrer**, la forme générale d'un ajout est `INSERT INTO ma_table (colonne1, colonne2) VALUES (?, ?)`, puis un `execute()` avec un tableau contenant vos deux valeurs, dans l'ordre des `?`.

Pour **lister**, aucune valeur variable, donc une requête classique suffit : un `SELECT` (voir [« Obtenir des données »](./sql/support.md#obtenir-des-donnees)) suivi d'un `fetchAll()`. Pensez à l'`ORDER BY` pour le « du plus récent au plus ancien ».

Deux questions à vous poser : que renvoie `fetchAll()` exactement (quelle structure ?), et comment savoir simplement qu'il n'y a aucun message ?
:::

4. **L'espace admin :**
   - La page `connexion` contient un formulaire de login (login + mot de passe, en dur pour cette évaluation, c'est autorisé).
   - Une fois connecté, l'utilisateur accède à la page `admin` qui affiche le nombre de messages et la liste complète.
   - Non connecté, l'accès à `admin` redirige vers `connexion`.
   - Un lien « Déconnexion » détruit la session de connexion.

::: details Coup de pouce : protéger la page admin
Le mécanisme complet (connexion + protection) est décrit dans [le support, section « espace d'administration »](./support.html#utiliser-la-session-pour-gerer-un-espace-d-administration). Les trois ingrédients de la protection, à assembler en haut de la page à protéger :

- Un test sur la session (`isset()`).
- Une redirection (`header()`).
- Un `die()` juste après (pourquoi est-il indispensable ? La réponse fera un bon commentaire dans votre code).

Et pour la déconnexion, regardez du côté de `unset()` (ou `session_destroy()`).
:::

::: danger Un instant, réfléchissez
Les messages sont en base, l'état de connexion est en session. Pourquoi pas l'inverse ? Notez votre réponse en commentaire dans votre code : c'est exactement la distinction que nous avons faite depuis le TP 4, entre une **donnée métier** (qui doit survivre et être vue par tout le monde) et l'**état d'un visiteur** (qui ne concerne que lui, le temps de sa navigation).
:::

## Le challenge

Vous avez terminé ? Voici le défi bonus :

- **Suppression** : dans la page admin, ajouter un lien « Supprimer » à côté de chaque message. Le clic supprime définitivement le message de la base (un `DELETE`, en requête préparée bien sûr, l'`id` venant de l'URL).
- **Compteur** : afficher sur la page d'accueil « Ce livre d'or contient X messages », en laissant la base faire le calcul avec un `COUNT(*)` plutôt qu'en comptant les lignes en PHP.

## Restitution

Le rendu se fait en deux temps :

1. **Poussez votre projet sur un dépôt Git** sur le GitLab du lycée : [https://gitlab.dombtsig.local](https://gitlab.dombtsig.local), avec le `README.md` à la racine (contenu attendu : voir [l'évaluation 1](./eval1.md#le-readme-md)).
   - Ajoutez le script SQL de votre base à la racine du dépôt, sinon je ne pourrai pas faire tourner votre projet.
   - Captures d'écran à inclure dans le README : la page d'accueil avec des messages, et la page admin connectée.
   - Pensez à y indiquer le login et le mot de passe de l'espace admin, sinon la correction sera compliquée !
2. **Déposez le lien du dépôt dans Moodle** (et vérifiez que j'y ai accès).

Un doute sur Git ? [Initiation à Git](/tp/git_initiation/), [Utiliser GitLab](/tp/gitlab/), [l'aide mémoire](/cheatsheets/git/).

Bravo, vous avez terminé cette deuxième évaluation !
