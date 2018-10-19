# Numérisation Absence

## Introduction

Dans ce TP nous allons numériser la feuille d'absence papier en une version numérique.

## Base de données

Avant de commencer à coder nous allons définir la partie base de données. Cette étape est importante et ne dois pas être baclée.

## Initialisation du projet

Maintenant que notre base de données est définie, nous allons pouvoir créer le projet. Dans le dossier de votre choix.

```sh
$ laravel new gestion-absence
Crafting application...
Loading composer repositories with package information
Installing dependencies (including require-dev) from lock file
[…]
```

✋ Attention, le projet va être créé dans le dossier ```gestion-absence``` dans le dossier courant.

La création prend environ 1 minute, un certains nombres de librairies sont téléchargées. Une fois terminé prenez quelques instants pour regarder les fichiers qui ont été créés.

## Activer l'authentification

Maintenant que votre projet à été créé nous allons activer la partie « Authentification » intégré dans Laravel.

✋ Cette étape peut-être destructive pour votre projet si vous avez déjà fait des modifications. Elle est donc à prévoir en amont (ou a réaliser à la main).

Dans le dossier de votre projet :

```sh
php artisan make:auth
```

## Choix du système de base de données

Dans le précédent TP nous avions utilisé SQLite. Dans celui-ci nous allons utiliser MySQL.

- Quel sont les éléments à configurer ?
- Où ce trouver la configuration de la base de donées dans Laravel ?

## Créer les modèles

Maintenant que la base de données est configuré, nous allons pouvoir créer les modèles. En suivant les nommages choisi ensemble créer les modèles nécéssaire au bon fonctionnement de votre application via la commande :

```sh
$ php artisan make:model VotreTable
```

😵 J'espère vraiment que vous n'avez pas copié la commande précédente…

## Créer les migrations

Pour rappel les migrations sont la définition de la table à créer, en respectant la définition vu ensemble créer les migrations pour les différents Models via la commande :

```sh
php artisan make:migration create_votretable_table --create=votretable
```

### Question

- Est-il possible de faire la migration et le modèle en une seul commande ? Si oui comment?

### Compléter les migrations

Maintenant que vos migrations sont prêtes les complèter avec les champs vu ensemble.

🔥 Attention à bien définir les clefs étrangère.

[Un peu de documentation…](https://laravel.com/docs/5.7/migrations)
[Et les foreigns keys](https://laravel.com/docs/5.7/migrations#foreign-key-constraints)

## Créer les routes

Notre application va avoir différentes « route » ou lien :

Public (sans authorisation) :

- / => Le formulaire d'ajout (public)

Admin (après connexion) :

- /absences => Liste des absences.
- /absence/{id}/confirmation => Confirmation qu'une absence est valide.

Déclarer les routes dans le fichier ```web.php``` en les faisants pointer vers les bons contrôleur@methode

### Sécurité des routes

## Créer les contrôleur

## Créer les templates

### Ajouter Bootstrap

### Le formulaire

### L'admin