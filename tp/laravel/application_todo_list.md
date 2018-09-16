# Application Todo Liste

## Introduction

Dans ce TP nous allons réaliser une application / site web, le but de cette application / site web est de faire de la prise de note de « TODO » ou aussi appelé liste de tâches.

Une TODO List est un procédé qui se veut simple et efficace pour gérer les tâches d'un projet. Ces tâches peuvent être indépendantes ou devoir, au contraire, être accomplies dans un certain ordre.

Voilà la liste des fonctionnalités de l’application que l'on va créér :

- Lister les tâches.
- Ajouter une tâche.
- Marquer comme terminé une tâche.
- Suppression d'une tâche.

## Technologie

Dans ce TP nous allons utiliser les technologies suivantes :

- Laravel (Framework PHP)
- Bootstrap 4 (Framework HTML / CSS / JS)
- NodeJS (Utilisation de Webpack)

## Initialiser le projet

La première étape lors d'un projet Laravel est la création du projet avec une simple ligne de commande, dans notre cas :

```sh
$ laravel new laravel-todo
Crafting application...
Loading composer repositories with package information
Installing dependencies (including require-dev) from lock file
[…]
```

La création prend environ 1 minute, un certain nombre de librairie sont téléchargés. Une fois terminé prenez quelques instants pour regarder les fichiers qui ont été créé.

### 🤓 Questions

- Où sont les librairies ?
- Quel est l'intérêt à votre avis d'utiliser un outil pour initialiser un projet ?

## Configurer le projet, le .env

Le projet qui viens d'être créé est « générique » c'est à dire qu'il ne possède aucune personnalisation et peu donc servir de base quelques soit votre développement.

La première étape est donc d'éditer le fichier ```.env``` pour configurer les options de base de votre projet :

- Le nom
- Le type de base de données
- …

### Nom de l'application

- Todolist

### Base de données

Pour ne pas avoir à installer un serveur MySQL nous allons utiliser une base données « local ».

Connaissez vous le nom d'un type de base de données permettant de travailler en « local » ?

{% reveal text="Voir la suite du TP" %}

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
DB_DATABASE=../database/exemple.db
```

#### Tester

Vous pouvez maintenant tester votre application / site web. Comme vu en cours, Laravel intègre un serveur de développement ce qui permet de tester rapidement votre développement. Le lancement est simple :

```sh
$ php artisan serve
```

#### 🤓 Questions

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

```log
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

### 🤓 Questions

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

### Le modèle

Maintenant que nous avons fait le script de création / migration, nous allons définir notre modèle. Pour ça créez un fichier ```Todos.php``` dans le dossier ```app/``` avec le contenu suivant :

```php
<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Todos extends Model
{
    protected $fillable = ['texte', 'termine'];
}
```

le ```$fillable``` définie les propriétés qui doivent êtres automatiquement remplis par Eloquent (l’ORM) lors de l’execution du code.

Au passage la propriété inverse existe, vous pouvez la voir dans le fichier ```User.php```.

## Le controller

Maintenant que nous avons la migration et le models de notre « base de données », nous allons créer le controller. Pour rappel le controller va faire « le lien » entre la base de données et les appels HTTP. C’est ici que nous allons mettre la logique métier de notre application.

Pour commencer nous allons créer « la structure de base » de notre controller. Pour ça créez le fichier ```TodosController.php``` dans le chemin suivant ```app/Http/Controllers/``` et mettez y le contenu suivant :

```php
<?php

namespace App\Http\Controllers;

use App\Todos;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class TodosController extends Controller{
    // C’est ici que seront nos méthodes
}
```

Bien ! Notre code est maintenant prêt. Nous allons créer les méthodes permettant la manipulation de notre base de données tout en répondant à nos API bien évidement (liste, creation, terminer, suppression).

Nous allons maintenant écrire une méthode pour chaque actions. Avec les différentes conditions nécéssaires au bon fonctionnement de votre application.

### La méthode « Liste »

La méthode ```liste``` est certainement la plus simple, nous allons simplement faire appel à la méthode ```all()``` de Eloquent (ORM pour l’accès à la base de données). Pour ça créez une nouvelle méthode dans la Class ```TodoController``` avec le code suivant :

```php
public function liste(){
    return "Liste";
}
```

Rien de bien compliqué, comme vous pouvez le voir.

### Les autres suivantes

✋ Pour l'instant nous allons nous arrêter la pour la partie code PHP. Cette méthode est suffisante pour « tester » le premier template que nous allons écrire.

## Installation des dépendances client

Maintenant que la partie base de données est prête, nous allons nous occuper de la partie visualisation de notre application / site web. Nous allons utiliser Boostrap pour gérer le problématique d'affichage et de responsive.

### Ajouter Bootsrap 4

La structure de base de Laravel n'intègre pas Boostrap, par contre elle intègre un système de gestion de dépendances. Nous allons nous servir de cette gestion de dépendance pour ajouter Boostrap (version 4). Pour ça retour dans la ligne de commande :

```sh
$ php artisan preset none
$ php artisan preset bootstrap
```

⏱ Patientez quelques instant, Boostrap est maintenant disponible pour votre projet. Mais pour qu'il soit accessible pour vos templates nous devons « le compiler ».

### Préparation des « Assets » boostrap …

Laravel inclus une configuration « webpack.mix.js », celle-ci permet de fusionner l'ensemble des JS et CSS en un seul fichier pour gagner en performance.

Sans entrer dans le détail (nous détaillerons le fonctionnement dans un prochain cour), la compilations des ressources (assets) est réalisé avec Webpack. Webpack est un outils NodeJS très puissant mais qui peut-être complexe, nous allons donc uniqumement l'utiliser.

- Installer [NodeJS version current](https://nodejs.org/en/download/current/)

Une fois installé retourner dans le dossier de votre projet fait les commandes suivantes :

```sh
$ npm install
$ npm run production
```

🔎 [Plus d'informations Webpack.mix.js](https://laravel.com/docs/5.6/mix)

### 🤓 Questions

- Quels fichiers ont été créé ?
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

- ✋ Pourquoi le découpage en « 3 templates » est-elle importante / Qu'elle est le plus pour le développeur ?

### Le template principal

Nous allons commencer par définir notre « Template principal » celui-ci va contenir l'ensemble des élement partagé sur toutes no page à savoir :

- Les JS
- Les CSS
- La structure commune

```html
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>@yield('title')</title>

        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <script type="text/javascript" src="{{ asset('js/app.js') }}"></script>
    </head>
    <body>
        <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <a class="navbar-brand" href="#">Ma Todo List</a>
        </nav>

        @yield('content')

    </body>
</html>
```

Maintenant que nous avons le contenu, nous devons créer un nouveau fichier. 

- Créer un nouveau fichier ```resources/views/template.blade.php```
- Copiez-Coller le html dans le fichier.

👏👏 Bravo, vous venez de créer votre premier template.

#### 🤓 Questions

- Pourquoi le fichier est-il nommé « ….blade.php » ?
- À quoi correspond {% raw %} ```{{ asset('…') }} {% endraw %}?
- À quoi correspond la directive « yield »? En quoi est-ce très important
- Est-il possible de définir une « zone » ou d'autre ressources JS / CSS seront inséré lors de l'exécution ? ![Voir la documentation](https://laravel.com/docs/5.6/blade#stacks)
- Maintenant que vous avez la réponse, ajouter une « stack » pour le script et le style dans l'entête.

{% reveal text="Voir la solution" %}
    @stack('scripts')
    @stack('styles')
{% endreveal %}

### Tester

Pour lancer votre application il suffit de lancer dans un terminal :

```sh
$ php artisan serve
```

Une fois lancer [Rendez vous sur http://127.0.0.1:8080](http://127.0.0.1:8080).

{% reveal text="Un soucis non ?" %}
Rien à changé ? C'est normal… Continuons!
{% endreveal %} 

### Liste des todos

Maintenant que nous avons défini notre template de base nous allons pouvoir définir notre page principal, la page « liste des todos ». Une fois terminée celle-ci va ressembler à :

![liste](./ressources/liste.png)

Avant de commencer la réalisation de ce template regardont ce que l'on peux y voir :

- Un formulaire « form »
- Une « liste »

Nous allons donc avoir besoin de composant bootstrap. Première étape regarder [la documentation de bootsrap !](https://getbootstrap.com/docs/4.0/components/alerts/)

#### 🤓 Questions

- Quels composants (components) allons nous avoir besoins ?
- Est-ce les seuls ?

#### Définition du template « Liste » / « Home »

Nous allons créer un 2nd template celui qui va être charger d'afficher la liste des todos. Créér un nouveau fichier ```resources/views/home.blade.php``` et y mettre le contenu suivante :

```html
@extends("template")

@section("title", "Ma Todo List")

@section("content")
    <div class="container">
        <div class="card">
            <div class="card-body">
                <!-- Action -->
                <form action="/action/add" method="post" class="add">
                    <div class="input-group">
                        <span class="input-group-addon" id="basic-addon1"><span class="oi oi-pencil"></span></span>
                        <input id="texte" name="texte" type="text" class="form-control" placeholder="Prendre une note…" aria-label="My new idea" aria-describedby="basic-addon1">
                    </div>
                </form>

                <!-- Liste -->
                <ul class="list-group">
                    @forelse ($todos as $todo)
                        <li class="list-group-item">
                            <span>{{ $todo->texte }}</span>
                            <!-- Action à ajouter pour Terminer et supprimer -->
                        </li>
                    @empty
                        <li class="list-group-item text-center">C'est vide !</li>
                    @endforelse
                </ul>
            </div>
        </div>
    </div>
@endsection
```

### 🤓 Questions

- ```@extends``` ? À quoi sert cette directive, pourquoi « template »?
- Modifier le titre afficher dans la barre.  
- À quoi correspond le ```@forelse … @empty … @endforelse```

## Et maintenant ?

Bien… récupitulons ! Nous avons :

- Le model
- Le controlleur
- Les templates (template et home)

Il faut maintenant assembler l'ensemble pour que votre page s'affiche lors d'une requête.

## Création des routes

La définition des routes ce fait dans le fichier ```routes/web.php``` pour l'instant vous devez avoir qu'une seule route de défini.

Supprimer celle déjà défini, et ajouter :

```php
Route::get('/', "TodosController@liste");
```

### 🤓 Question

- À quoi correspond la notation "TodosController@liste" ?

## Tester

Vous voyez « Liste » ? C'est OK !

## Affichage de la liste

Bon afficher « Liste » c'est un bon début… Modifier la méthode « liste() » pour qu'elle ressemble à :

```php
    return view("home", ["todos" => Todo::all()]);
```

## Tester

La page s'affiche ? Super !

- Ajouter une entrée « à la main » graçe à l'explorateur de base de données de PHPStorm

Raffraichissez la page, vous devez maintenant voir votre texte 😎.

## Action d'ajout

Maintenant que nous avons implémenté la liste, nous allons pouvoir faire le code pour la partie « ajout d'une tâche ». La méthodologie sera la même que pour la liste à savoir :

- Ajout du code dans le contrôleur.
- Ajout de la route.
- Modification du template pour implémenter la fonctionnalité

### Le contrôleur

Nous allons faire un mapping automatique entre la requette HTTP et le modèle ```Todos```

```php
public function saveTodo(Request $request){
    Todos::create($request->all());
    return redirect()->action('TodosController@liste');
}
```

Que va t’il se passer lors de l’appel ? L’objet ```$request``` contient tous les paramètres de l’appel HTTP, la méthode ```all()``` permet de les récupérer. L’objet ```Todos``` possède une méthode permettant de créer un nouvel enregistrement en base de données. Les valeurs passées en paramètre de ```create()``` permette de renseigner automatiquement les champs en base de données.

- À votre avis est-ce une manière sécuriser de procéder ?

{% reveal text="Ajouter une todo version alternative" %}
La première approche est la plus rapide mais elle sous entend que tous les paramètres soient bien initialisés dans « l’input » HTTP. Dans cette version la méthode est plus complète et gère la création de l’objet Todo manuellement en récupérant les différents éléments dans la requette HTTP

```php
public function saveTodo(Request $request){
    $texte = $request->input('texte');

    if($texte){
      $todo = new Todos();
      $todo->texte = $texte;
      $todo->termine = 0;
      $todo->save();
    }

    return redirect()->action('TodosController@liste');
}
```

{% endreveal %}

Et c'est tout ! Simple non ?

### La Route

Pour la route modifier le fichier ```routes/web.php```

```php
Route::post('/action/add', "TodosController@saveTodo");
```

#### 🤓 Questions

- À quoi correspond le mot clef « post » ?
- Que ce passe-t-il si on fait un appel de type GET (ou PUT, …)

#### Tester

Maintenant que nous avons notre action d'ajout, nous allons pouvoir tester notre Todo List réellement.

- Démarrer votre serveur de test (```php artisan serve```).
- Ajouter une nouvelle todo dans l'interface.
- Vous devez avoir une erreur 419. À quoi correspond-t-elle ?

#### Correction de l'erreur 419

L'erreur 419 indique que votre Token ```CSRF``` (anti-rejeux) est expiré, ou plutôt dans notre cas que vous ne l'avez pas fourni. C'est une sécurité intégré à Laravel pour l'ensemble des requêtes POST qui arrive dans votre code.

Nous devons donc ajouter un input « caché » dans notre formulaire pour envoyer en plus du texte une valeur dite de sécurité.

Modifier le template ```home.blade.php``` pour ajouter le code suivant dans la partie ```<form>``` :

```
<form […]>
@csrf <!-- << L'annotation ici ! -->
[…]
</form>
```

🤓 Oui, oui, c'est juste ça.

#### Re-tester

Normalement c'est ok !

![Vide](./ressources/vide.png)
![Avec message 1](./ressources/message1.png)

## Action marquer comme terminer

Pour l’action terminer nous allons devoir updater un enregistrement en base de données, pour ça nous allons le récupérer puis mettre le ```boolean``` termine à 1.

```php
public function markAsDone($id){
    $todo  = Todos::find($id);
    if($todo){
        $todo->termine = 1;
        $todo->save();
    }
    return redirect()->action('TodosController@liste');
}
```

### Route

Ajouter une route de type ```get``` avec un paramètre nommé ```{id}``` dans le fichier ```routes/web.php```.

```php
Route::get('/action/done/{id}', "TodosController@markAsDone");
```

## Action de suppression

Pour la partie suppression, nous allons devoir dans un premier temps récupérer la todo par son ID.

```php
public function deleteTodo($id){
        $todo  = Todos::find($id);
        if($todo){
            $todo->delete();
        }

        return redirect()->action('TodosController@liste');
}
```

### Route

Ajouter une route de type ```get``` avec un paramètre nommé ```{id}``` dans le fichier ```routes/web.php```.

```php
Route::get('/action/delete/{id}', "TodosController@deleteTodo");
```

#### Questions

- Un delete de type get est-ce normal ?
- Quel est l'autre solution ?
- Pourquoi dans notre cas c'est « la seul solution » ?

## Ajouter les actions dans le template

Maintenant que nous avons déclaré nos « 3 actions » dans notre contrôleur (et dans le fichier de route) nous allons les utiliser dans notre template « home » voici les étapes

- Éditer le fichier ```resources/views/home.blade.php```.
- Ajouter la bonne url sur l'actions de votre formulaire.
- Ajouter sur chaque ligne deux liens qui vont « suprimer » et « terminer ». (Aide : ```@todo->id```)

## 2nd page

Ajouter une nouvelle page dans votre site web cette page sera la page « À propos », aucune aide autre que

- Route.
- Méthode dans le contrôleur.
- Template qui « @extends » du gabarit de base.

## Évolution souhaitée : Ajout de contrôle

 Seul les ```Todos``` marqués comme terminés peuvent être supprimé, il faudra donc controller l’état avant de faire le ```delete()``` en base de données

- Modifier la méthode ```deleteTodo``` contrôleur pour ajouter la règle de gestion (Indice ```$todo->termine```)
- Ajouter la directive ```@if``` dans le template afficher uniquement les bonnes actions en fonction de l'état de la todo.
- Pour les boutons d'actions utiliser des icones :
    - Exemple [fontawesome](https://fontawesome.com/how-to-use/on-the-web/setup/getting-started?using=web-fonts-with-css)
    - Choisir [une icône](https://fontawesome.com/icons?d=gallery)
    - Utilisation : ```<i class="fas fa-stroopwafel"></i>```
- « Encapsuler » votre icône autour d'un ```<a>``` exemple ```<a href="/actions/done/{{$todo->id}}" class="btn btn-success"><i class="fas fa-check"></i></a>```

## Évolution souhaitée : Message en cas d'erreur

Avertir l'utilisateur en cas d'erreur est important! Comme vous l'avez constaté aucune gestion de message d'erreur n'est présente dans le contrôleur. Implémenté des messages (basique) grace à l'aide suivante :

### Ajouter un message à afficher

```php
[…]
Session::flash('message', "Message d'erreur de traitement à définir.");
[…]
```

### Afficher le message dans votre template

```html
@if(Session::has('message'))
    <p class="alert alert-danger">{{ Session::get('message') }}</p>
@endif
```

[Explication sur le Flash](https://laravel.com/docs/5.6/session#flash-data)