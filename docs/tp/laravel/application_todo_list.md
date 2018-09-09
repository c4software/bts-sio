# Quick Note

## Introduction

Dans ce TP nous allons réaliser une application / site web, le but de cette application / site web est de faire de la prise de note de « TODO » ou aussi appelé liste de tâches.

Une TODO List est un procédé qui se veut simple et efficace pour gérer les tâches d'un projet. Ces tâches peuvent être indépendantes ou devoir, au contraire, être accomplies dans un certain ordre.

## Note création

(À reformuler) Dans ce TP blah blah blah

- Installation Laravel (Premier TP).
- Création projet `laravel new laravel-todo`
- Configuration du `.env`

## Technologie

Dans ce TP nous allons utiliser deux technologies :

- Laravel (Framework PHP)
- Bootstrap (Framework HTML / CSS / JS)

## Étape 1 : Initialiser le projet

La première étape lors d'un projet Laravel est la création du projet avec une simple ligne de commande, dans notre cas :

```sh
$ laravel new laravel-todo
Crafting application...
Loading composer repositories with package information
Installing dependencies (including require-dev) from lock file
[…]
```

La création prend environ 1 minute, un certain nombre de librairie sont téléchargés. Une fois terminé prenez quelques instants pour regarder les fichiers qui ont été créé.

### Questions

- Où sont les librairies ?
- Quel est l'intérêt à votre avis d'utiliser un outil pour initialiser un projet ?

## Étape 2 : Configurer le projet, le .env

Le projet qui viens d'être créé est « générique » c'est à dire qu'il ne possède aucune personnalisation et peu donc servir de base quelques soit votre développement.

La première étape est donc d'éditer le fichier ```.env``` pour configurer les options de base de votre projet :

- Le nom
- Le type de base de données
- …

### Nom de l'application

- TODO List Laravel - SLAM 5

### Base de données

Pour ne pas avoir à installer un serveur MySQL nous allons utiliser une base données « local ».

Connaissez vous le nom d'un type de base de données permettant de travailler en « local » ?

{% reveal text="Voir la solution" %}

La réponse est SQLite, SQLite est une base de données de type SQL mais ne nécéssitant pas de serveur, l'ensemble des données est contenu dans un fichier « local ». Pour la créer rien de plus simple il suffit de créer un fichier vide dans le dossier de votre projet faite :

```sh
$ touch database/database.sqlite
```

Maintenant que le fichier à été créé nous allons indiquer à Laravel qu'il faut l'utiliser pour ça éditer le fichier ```.env``` et modifier la ligne :

```conf
DB_CONNECTION=mysql
```

par  :

```conf
DB_CONNECTION=sqlite
DB_DATABASE=databases/exemple.db
```

#### Questions

- À Votre avis, comment repasse ton en Mysql ?
- Est-il possible d'utiliser les deux types de base de données (par exemple en production MySQL est en developpement sqlite) ?
- SQLite est-il toujours pertinant ?

{% endreveal %}

### Le reste du fichier .env

Nous n'allons pas toucher aux autres paramètres mais certains sont tout de même intéréssant. Je vous laisse donc consulter la documentation en ligne de laravel :

![Consulter en ligne](https://laravel.com/docs/5.6/configuration)

## Conception base de données

Voilà à quoi va ressembler notre base de données :

[MCD Simple](./ressources/todos.png)

🤓 C’est parti ! Tout est prêt, nous pouvons commencer à écrire du code.

## Création Model

## Créatino des routes

## Création des templates

## Affichage de la liste

## Action d'ajout

## Action de suppression
