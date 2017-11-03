# TodoList : (Ré-)écrire les API du projet

Le But de notre application est de créer des API Rest qui vont exposer la gestion de nos ```todos``` défini en base de données

<!-- TOC -->

- [TodoList : (Ré-)écrire les API du projet](#todolist--ré-écrire-les-api-du-projet)
    - [Introduction](#introduction)
    - [Création du projet](#création-du-projet)
    - [Installer Lumen](#installer-lumen)
    - [Créer le nouveau Projet](#créer-le-nouveau-projet)
    - [Initialisation](#initialisation)
    - [Tester votre application](#tester-votre-application)
    - [Gestion de la bose de données](#gestion-de-la-bose-de-données)
        - [Le script de création / migration](#le-script-de-création--migration)
        - [Le modèle](#le-modèle)
    - [Le controller](#le-controller)
        - [Liste](#liste)
        - [Création](#création)
        - [Terminer](#terminer)
        - [Suppression](#suppression)
    - [Déclarer les routes](#déclarer-les-routes)

<!-- /TOC -->

## Introduction

Dans ce TP nous allons voir la création d’API pour le projet « TodoList ». Nous allons donc créer un nouveau projet avec Laravel pour créer des API qui permettront de :

- Lister les éléments dans la TodoList.
- Créer un nouvel élément dans la TodoList.
- Marquer un élément comme ```terminer```.
- Supprimer un élément.

## Création du projet

Pour créer des API Laravel est un peu « lourd » (dans notre cas, dans certains cas se choix est complètement justifié). Nous allons donc utiliser son petit frère Lumen. Lumen est un micro-framework reprenant les concepts de Laravel (et les même briques). Mais en beaucoup plus petit et donc plus adaptés à des micro-projets comme celui-ci.

## Installer Lumen

L’installation de Lumen est similaire à celle de Laravel

```shell
composer global require "laravel/lumen-installer"
```

## Créer le nouveau Projet

Maintenat que vous avez installer Lumen nous allons pouvoir utiliser la ligne de commande pour créer un nouveau projet :

```shell
lumen new api-todo
```

✋ Attention, le projet va être créé dans le dossier api-todo dans le dossier courant.

## Initialisation

Contrairement à un projet Laravel, les dépendances ```composer``` ne sont pas installés par défaut. Il faut donc les installer via la ligne de commande en faisant :

```shell
$ composer install
```

Le projet n’étant pas initialisé nous allons devoir jouer quelques commande pour terminer l’installation :

```shell
$ mv .env.example .env
```

Contrairement à Laravel, Lumen ne contient pas l’outils permettant d’initialiser la « secret key » nécéssaire à la sécurisation de votre application. Je pous propose par exemple de passer via la commande suivante :

```shell
$ openssl rand -base64 24
```

éditer le fichier ```.env``` pour renseigner une valeur pour :

- ```APP_KEY``` (exemple ```APP_KEY="I82xtis8Tsur2"```)

## Tester votre application

Pour tester votre application avec Lumen sur votre poste, c’est un peu plus « complexe » qu’avec Laravel. Vous devez saisir la commande suivante :

```shell
$ php -S localhost:8000 -t ./public
```

Une fois lancé vous avez un serveur Web qui écoute sur [le port 8000](http://localhost:8000)

🤔 Pourquoi Lumen n’intègre pas la commande ```php artisan serve``` ? La raison est plutôt logique, Lumen étant un ```micro framework``` il n’embarque pas toutes les options de base de Laravel. Options qui peuvent d’ailleurs simplement être remplacée.

## Gestion de la bose de données

Pour la démonstration nous allons utiliser SQLite au lieux de MySQL. Pour ça rien de plus simple, Lumen utilise PDO il suffit donc de changer la configuration par défaut dans le fichier ```.env```. Modifier le fichier pour qu’il ressemble à celui-ci

```conf
APP_ENV=local
APP_DEBUG=true
APP_KEY="CHANGEME"
APP_TIMEZONE=UTC

DB_CONNECTION=sqlite
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=homestead
# DB_USERNAME=homestead
# DB_PASSWORD=secret

CACHE_DRIVER=file
QUEUE_DRIVER=sync
```

Par défaut la configuration de base de SQLite dans Lumen est l’utilisation d’une base de données nommée ```database.sqlite``` il faut donc créer un fichier vide qui recevra les données :

```
touch database/database.sqlite
```

C’est parti ! Tout est prêt, nous pouvons commencer à écrire du code. 

### Le script de création / migration

Contrairement à la première version de notre application, nous allons stocker les données dans une Base de données. Qui dit base de données dit « ORM » et donc mapping objet. Pour rappel un ORM :

>> Un mapping objet-relationnel (en anglais object-relational mapping ou ORM) est une technique de programmation informatique qui crée l'illusion d'une base de données orientée objet à partir d'une base de données relationnelle en définissant des correspondances entre cette base de données et les objets du langage utilisé.

Pour rappel, le But de notre application est de créer des API Rest qui vont exposer la gestion de nos ```todos``` défini en base de données. La première étape est de créer via la ligne de commande le « script » qui initialisera la structure de votre base de données. 

L’option ```--create=todos``` permet d’indiquer le nom de la table à créer

```shell
php artisan make:migration create_todos_table --create=todos
```

✋ Le contenu du fichier est fictif est la pour illustrer comment travailler. Nous allons le modifier pour mettre les informations relative à notre base de données.

La commande à créé un nouveau fichier (dans mon cas) : ```database/migration/2017_11_02_205700_create_todos_table.php```

Dans le fichier créer nous allons définir notre schéma (à savoir la table) pour ajouter les 2 colonnes qui nous sont utiles ```texte``` et ```termine```. Le fichier après modification doit ressembler à :

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

Maintenant que le script est terminé, nous pouvons lancer la commande de migration :

```shell
$ php artisan migration
```

Une fois cette commande lancée, Lumen va créer la structure de base de votre base de données.

### Le modèle

Maintenant que nous avons fait le script de création / migration, nous allons définir notre modèle. Pour ça créer un fichier ```Todos.php``` dans le dossier ``app/``` avec le contenu suivant :

```php
<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Todos extends Model
{
    protected $fillable = ['texte', 'termine'];
}
```

le ```$fillable``` définie les propriétés qui doivent êtres automatiquement rempli par éloquent (l’orm) lors de la gestion de la demande.

## Le controller

Maintenant que nous avons notre base de données, nous allons créer le controller. Pour rappel le controller va faire « le lien » entre la base de données et les appels HTTP. C’est ici que nous allons mettre la logique metier de nos API.

Pour commencer nous allons créer « la structure de base » de notre controller. Pour ça créer le fichier ```TodosController.php``` dans le chemin suivant ```app/Http/Controllers/``` et mettez le contenu suivant :

```php
<?php

namespace App\Http\Controllers;

use App\Todos;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class TodoController extends Controller{
    // C’est ici que seront nos méthodes
}
```

Bien ! Notre code est maintenant prêt. Nous allons créer les méthodes permettant la manipulation de notre base de données tout en répondant à nos API bien évidement (liste, creation, terminer, suppression). 

Nous allons maintenant écrire une méthode pour chaque actions. Avec les différentes conditions nécéssaire au bon fonctionnement de notre applications.

### Liste

La méthode ```liste``` est certainement la plus simple, nous allons simplement faire appels à la méthode ```all()``` de eloquent (ORM pour l’accès à la base de données). Pour ça créer une nouvelle méthodes dans la class ```TodoController``` avec le code suivant :

```php
public function liste(){
    $todos  = Todos::all();
    return response()->json($todos);
}
```

Rien de bien compliqué, comme vous pouvez le voir. Le ```response()->json(…)``` permet de créer une réponse pour au format JSON pour votre API (que l’on utilisera plus tard au moment de la mise en place des routes).

### Création

Pour la partie création, nous allons faire un mapping automatique entre la requette HTTP et le modèle ```Todos```

```php
public function saveTodo(Request $request){
    $todo = Todos::create($request->all());
    return response()->json($todo);
}
```

Que va t’il se passer lors de l’appel ? L’objet ```$request``` contient tous les paramètres de l’appel HTTP, la méthode ```all()``` permet de les récupérer. L’objet ```Todos``` possède une méthode permettant de créer un nouvelle enregistrement en base de donnés. Les valeurs passés en paramètre de ```create()``` permette de renseigner automatiquement les champs en base de données.

### Terminer

### Suppression

## Déclarer les routes

Pour commencer nous allons créer les différentes « routes » (c’est à dire les chemins d’accès à votre API). Dans notre applicaton nous avons 4 routes :

- Liste (/liste)
- Création (/creation)
- Terminer (/terminer)
- Suppression (/suppression)