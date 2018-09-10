# Quick Note

## Introduction

Dans ce TP nous allons réaliser une application / site web, le but de cette application / site web est de faire de la prise de note de « TODO » ou aussi appelé liste de tâches.

Une TODO List est un procédé qui se veut simple et efficace pour gérer les tâches d'un projet. Ces tâches peuvent être indépendantes ou devoir, au contraire, être accomplies dans un certain ordre.

## Technologie

Dans ce TP nous allons utiliser deux technologies :

- Laravel (Framework PHP)
- Bootstrap 4 (Framework HTML / CSS / JS)
- NodeJS (Utilisation de Webpack)

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

[Consulter en ligne](https://laravel.com/docs/5.6/configuration)

## Conception base de données

Voilà à quoi va ressembler notre base de données :

![MCD Simple](./ressources/todos.png)

🤓 C’est parti ! Tout est prêt, nous pouvons commencer à écrire du code.

## Création Model

Laravel utilise un ORM pour manipuler la base de données. Pour rappel un ORM est

> Un mapping objet-relationnel (en anglais object-relational mapping ou ORM) est une technique de programmation informatique qui crée l'illusion d'une base de données orientée objet à partir d'une base de données relationnelle en définissant des correspondances entre cette base de données et les objets du langage utilisé.

L'ORM utilisé par Laravel est Eloquent, il est à la fois puissant et relativement simple. Autrement dit avec un ORM dans la plus part des cas vous n'écrivez plus de requête SQL mais vous manipuler des objets représentant la base de données.

Comme pour la création du projet, la création de la table « todos » va se faire via une requête dans votre terminal :

```shell
php artisan make:migration create_todos_table --create=todos
```

L’option ```--create=todos``` permet d’indiquer le nom de la table à créer

✋ Le contenu du fichier créé est fictif, il est la pour illustrer comment travailler. Nous allons le modifier pour mettre les informations relative à notre table.

La commande viens de créer un nouveau fichier dans le dossier ```database/migration```. Dans mon cas :

```
Created Migration: 2018_09_09_150442_create_todos_table
```

Nous allons définir notre schéma (à savoir la définition de la table) pour ajouter les 2 colonnes qui nous serons utiles ```texte``` et ```termine```. L'ORM étant un librairie objet la définition de nouveau champs ce fait via une méthode, exemple :

```php
    $table->string('texte');
    $table->boolean('termine');
```

C'est à vous ajouter les deux champs dans la méthode ```up``` du fichier.

{% reveal text="Voir le fichier avec les nouveaux champs" %}
```php
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTodosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('todos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('texte');
            $table->boolean('termine');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('todos');
    }
}

```
{% endreveal %}

### Questions

- À quoi correspond la méthode ```up``` et ```down```
- L'ordre des champs est-il important ?

## Création en base

Maintenant que le script est terminé, nous allons indiquer à Laravel d'éffectuer « la migration » c'est-à-dire de transformer votre définition PHP en inscruction SQL pour créer réellement la base de données. Pour ça retour dans la ligne de commande :

```sh
$ php artisan migrate
[…]
Migrating: 2018_09_09_150442_create_todos_table
Migrated:  2018_09_09_150442_create_todos_table
```

Votre base de données est maintenant prête à être utilisé. Vous pouvez aller voir le contenu grace à PHPStorm qui est capable (une fois configuré) de requêter une base SQLite.

![sqlite](./ressources/sqlite-phpstorm.png)
![sqlite1](./ressources/sqlite1.png)
![sqlite2](./ressources/sqlite2.png)
![sqlite3](./ressources/sqlite3.png)

## Installation des dépendances client

Maintenant que la partie base de données est prête, nous allons nous occuper de la partie visualisation de notre application / site web. Nous allons utiliser Boostrap pour gérer le problématique d'affichage et de responsive.

### Ajouter Bootsrap 4

La structure de base de Laravel n'intègre pas Boostrap, par contre elle intègre un système de gestion de dépendances. Nous allons nous servir de cette gestion de dépendance pour ajouter Boostrap (version 4). Pour ça retour dans la ligne de commande :

```sh
$  php artisan preset none
$  php artisan preset bootstrap
```
Patientez quelques instant, Boostrap est maintenant disponible pour votre projet. Mais pour qu'il soit accessible pour vos templates nous devons « le compiler ».

### Préparation des « Assets » boostrap …

Laravel inclus une configuration « webpack.mix.js », celle-ci permet de fusionner l'ensemble des JS et CSS en un seul fichier pour gagner en performance.

Sans entrer dans le détail (nous détaillerons le fonctionnement dans un prochain cour), la compilations des ressources (assets) est réalisé avec Webpack. Webpack est un outils NodeJS très puissant mais qui peut-être complexe, nous allons donc uniqumement l'utiliser.

- Installer [NodeJS version current](https://nodejs.org/en/download/current/)

Une fois installé retourner dans le dossier de votre projet fait les commandes suivantes :

```
$ npm install
$ npm run production
```

[Plus d'informations Webpack.mix.js](https://laravel.com/docs/5.6/mix)

### Questions

- Que contient le fichier webpack.mix.js ?
- Le fichier webpack.mix.js fait référence à des fichiers dans ```ressources/js/*``` et ```ressources/sass/*```, allez y jeter un coup d'oeil. (même si dans se projet nous n'allons rien modifier).
- Pourquoi les dépendances sont-elles géré Web par un autre gestionnaire de dépendances ?
- Pourquoi la fusion / compilation des ressources est-elle si importante ?

## Créer les templates

Nous avons donc maintenant :

- La structure Laravel.
- La définition de notre base de données.
- Les dépendances clients (Boostrap 4…)

Nous allons donc pouvoir commencer la création des templates. L'organisation du code est quelques choses d'important,elle n'est pas à négliger un code organisé est un code agréable à rédiger.

Notre vue va être découpée en 3 partie :

![Structure](ressources/3partie.png)

- Pourquoi le découpage en « 3 templates » est-elle importante / Qu'elle est le plus pour le développeur ?

### Head

### Footer

### Liste des todos

## Création des routes

## Affichage de la liste

## Action d'ajout

## Action de suppression
