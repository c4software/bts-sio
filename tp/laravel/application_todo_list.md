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

La première étape lors d'un projet Laravel est la création de la structure avec une simple ligne de commande, dans notre cas :

```sh
$ laravel new laravel-todo
Crafting application...
Loading composer repositories with package information
Installing dependencies (including require-dev) from lock file
[…]
```

✋ Attention, le projet va être créé dans le dossier `laravel-todo` dans le dossier courant.

La création prend environ 1 minute, un certains nombres de librairies sont téléchargées. Une fois terminé prenez quelques instants pour regarder les fichiers qui ont été créés.

### 🤓 Questions

- Où sont les librairies ?
- Quel est l'intérêt à votre avis d'utiliser un outil pour initialiser un projet ?

## Configurer le projet, le .env

Le projet qui vient d'être créé est « générique » c'est à dire qu'il ne possède aucune personnalisation et peut donc servir de base quelques soit votre développement.

La première étape va donc être d'éditer le fichier `.env` pour configurer les options de base de votre projet tel que :

- Le nom
- Le type de base de données
- …

C'est parti !

### Nom de l'application

- Todolist

### Base de données

Pour ne pas avoir à installer un serveur MySQL nous allons utiliser une base de données « local ».

Connaissez-vous le nom d'un type de base de données permettant de travailler en « local » c'est à dire sans serveur ?

<Reveal text="Voir la suite du TP">

La réponse est SQLite. SQLite est une base de données de type SQL mais ne nécéssitant pas de serveur, l'ensemble des données est contenu dans un fichier « local ». Pour la créer rien de plus simple il suffit de créer un fichier vide dans le dossier de votre projet faites :

```sh
$ touch database/database.sqlite
```

Attention: Utiliser git-bash pour avoir la commande `touch`

Maintenant que le fichier a été créé nous allons indiquer à Laravel qu'il faut l'utiliser pour cela, éditer le fichier `.env` et modifier la ligne :

```apacheconf
DB_CONNECTION=mysql
```

par :

```apacheconf
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite
```

</Reveal>

#### Tester

Vous pouvez maintenant tester votre application / site web. Comme vu en cours, Laravel intègre un serveur de développement ce qui permet de le tester rapidement. Le lancement se fait via la commande suivante :

```sh
$ php artisan serve
```

#### 🤓 Questions

- À votre avis, comment revenir avec une base de données type Mysql ?
- Est-il possible d'utiliser les deux types de base de données (par exemple en production MySQL et en developpement SQLite) ?
- SQLite est-il toujours pertinant ?

### Le reste du fichier .env

Nous n'allons pas toucher aux autres paramètres mais certains sont tout de même intéréssant. Je vous laisse donc consulter la documentation en ligne de laravel :

[Consulter en ligne](https://laravel.com/docs/5.6/configuration)

## Conception de la base de données

Voilà à quoi va ressembler notre base de données :

![MCD Simple](./ressources/todos.png)

🤓 C’est parti ! Tout est prêt, nous pouvons commencer à écrire du code.

## Création de la « migration »

Laravel utilise un ORM pour manipuler la base de données. Pour rappel un ORM est

> Un mapping objet-relationnel (en anglais object-relational mapping ou ORM) est une technique de programmation informatique qui crée l'illusion d'une base de données orientée objet à partir d'une base de données relationnelle en définissant des correspondances entre cette base de données et les objets du langage utilisé.

L'ORM utilisé par Laravel est Eloquent, il est à la fois puissant et relativement simple. Autrement dit avec un ORM dans la plus part des cas vous n'écrivez plus de requête SQL mais vous manipulez des objets représentant la base de données.

Comme pour la création du projet, la création de la définition de la table « todos » va se faire via une requête dans votre terminal :

```bash
php artisan make:migration create_todos_table --create=todos
```

L’option `--create=todos` permet d’indiquer le nom du modèle de la table à créer.

✋ Le contenu du fichier créé est fictif, il est là pour illustrer comment travailler. Nous allons le modifier pour mettre les informations relatives à notre table.

La commande vient de créer un nouveau fichier dans le dossier `database/migration`. Dans mon cas le fichier se nomme :

```bash
2019_11_09_150442_create_todos_table.php
```

Nous allons définir notre schéma (à savoir la définition de la table) pour y ajouter les 2 colonnes qui nous serons utiles `texte` et `termine`. L'ORM étant une librairie objet, la définition de nouveaux champs se fait via une méthode, dans notre cas :

```php
    $table->string('texte');
    $table->boolean('termine');
```

Vous pouvez ajouter les deux champs dans la méthode `up` du fichier.

<Reveal text="Voir le fichier avec les nouveaux champs">

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

</Reveal>

### 🤓 Questions

- À quoi correspond la méthode `up` et `down` ?
- L'ordre des champs est-il important ?

## Création en base

Maintenant que le script est terminé, nous allons indiquer à Laravel d'éffectuer « la migration » c'est-à-dire de transformer votre définition PHP en instruction SQL pour créer réellement la base de données. Retour dans la ligne de commande :

```sh
$ php artisan migrate
[…]
Migrating: 2018_09_09_150442_create_todos_table
Migrated:  2018_09_09_150442_create_todos_table
```

Votre base de données est maintenant prête à être utilisée. Vous pouvez aller voir le contenu grâce à PHPStorm qui est capable (une fois configuré) de requêter une base SQLite.

![sqlite](./ressources/sqlite-phpstorm.png)
![sqlite1](./ressources/sqlite1.png)
![sqlite2](./ressources/sqlite2.png)
![sqlite3](./ressources/sqlite3.png)

### Le modèle

Maintenant que nous avons fait le script de création / migration, nous allons définir notre modèle.

```sh
$ php artisan make:model Todos
```

La commande va créer le fichier `Todos.php` dans le dossier `app/`.

Ajouter dans la class :

```php
    protected $fillable = ['texte', 'termine'];
```

⚠️ Cette propriété est optionnelle, elle permet vous autorisera plus tard à faire du « mass-assignment » c'est à dire à créer un objet « Todos » depuis par exemple le POST HTTP.

## Le controller

Maintenant que nous avons la migration et le modele de notre base de données, nous allons créer le controller. Pour rappel le controller va faire « le lien » entre la base de données et les appels HTTP. C’est ici que nous allons mettre la logique métier de notre application.

Pour commencer nous allons créer « la structure de base » de notre controller.

```sh
$ php artisan make:controller TodosController
```

Le fichier `TodosController.php` viens d'être créé dans le chemin suivant `app/Http/Controllers/`.

Bien ! Notre code est maintenant prêt. Nous allons créer les méthodes permettant la manipulation de notre base de données tout en répondant à nos problématique d'interface (liste, creation, terminer, suppression).

Nous allons maintenant écrire une méthode pour chaque action. Avec les différentes conditions nécéssaires au bon fonctionnement de l'application.

### Corriger le chemin de la database

Bizarrerie de Laravel… Il faut maintenant changer le chemin de la base de données pour faire correctement réference au fichier `database.sqlite` (pour que ça fonctionne depuis votre browser).

Éditer à nouveau le fichier `.env` pour remplacer :

```apacheconf
DB_DATABASE=database/database.sqlite
```

par

```apacheconf
DB_DATABASE=../database/database.sqlite
```

PS: Avec une base de données MySQL ce genre de soucis n'existe pas.

### La méthode « Liste »

La méthode `liste` est certainement la plus simple, nous allons faire appel à la méthode `all()` de Eloquent (ORM pour l’accès à la base de données). Pour ça créez une nouvelle méthode dans la Class `TodoController` avec le code suivant.

Pour l'instant nous n'allons pas intégrer Éloquent, mais uniqumeent définir notre méthode.

```php
public function liste(){
    return "Liste";
}
```

Rien de bien compliqué, comme vous pouvez le voir.

### Les autres méthodes

✋ Pour l'instant nous allons nous arrêter là pour la partie code PHP. Cette méthode est suffisante pour « tester » le premier template que nous allons écrire.

### Ajout route /

Nous allons tester la route `/`, pour ça nous allons remplacer le contenu du fichier `routes/web.php` par :

```php
Route::get('/', "TodosController@liste");
```

Vous pouvez relancer votre serveur de test, vous devez maintenant voir « Liste ».

## Créer les templates

Nous avons donc maintenant :

- La structure Laravel.
- La définition de notre base de données.
- Les dépendances clients (bootstrap 4…)

Nous allons donc pouvoir commencer la création des templates. L'organisation du code est quelques choses d'important, elle n'est pas à négliger. Un code organisé est un code agréable à rédiger.

Notre vue va être découpée en 3 partie :

![Structure](ressources/3partie.png)

- ✋ Pourquoi le découpage en « 3 templates » est-il important ?
- Quelle est l'avantage pour le développeur ?

### Le template principal

Nous allons commencer par définir notre « Template principal » celui-ci va contenir l'ensemble des élement partagés sur toutes nos pages à savoir :

- Les JS
- Les CSS
- La structure commune

```html
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="csrf-token" content="{{ csrf_token() }}" />

    <title>@yield('title')</title>

    <link href="{{ asset('css/app.css') }}" rel="stylesheet" />
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

- Créer un nouveau fichier `resources/views/template.blade.php`
- Copier-Coller le html dans le fichier.

👏👏 Bravo, vous venez de créer votre premier template.

#### 🤓 Questions

- Pourquoi le fichier est-il nommé `….blade.php` ?
- À quoi correspond <span v-pre> `{{ asset('…') }}` </span>?
- À quoi correspond la directive « yield »? En quoi est-ce très important ?
- Est-il possible de définir une « zone » ou d'autre ressources JS / CSS seront insérées lors de l'exécution ? [Voir la documentation](https://laravel.com/docs/5.6/blade#stacks)
- Maintenant que vous avez la réponse, ajouter une « stack » pour le script et le style dans l'entête.

<Reveal text="Voir la solution">

```php
    @stack('scripts')
    @stack('styles')
```

</Reveal>

### Tester

Pour lancer votre application, c'est dans le terminal que ça se passe :

```sh
$ php artisan serve
```

Une fois lancer [Rendez vous sur http://127.0.0.1:8000](http://127.0.0.1:8000).

<Reveal text="Un soucis non ?">

Rien à changé ? C'est normal… Continuons!

</Reveal>

## Installation des dépendances client

Maintenant que la partie base de données est prête, nous allons nous occuper de la partie visualisation de notre application / site web. Nous allons utiliser bootstrap pour gérer la problématique d'affichage et de responsive.

### Ajout des libraries

La structure de base de Laravel n'intègre pas Bootsrap, par contre il est possible de l'installer dans votre projet.

La façon la plus rapide est d'intégrer directement dans le `<head>` de votre projet les librairies suivante :

Éditer le fichier `template.blade.php` pour ajouter (dans le `<head>`):

```html
<script
  src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
  integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
  crossorigin="anonymous"
></script>
<script
  src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
  integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
  crossorigin="anonymous"
></script>

<link
  rel="stylesheet"
  href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
  integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
  crossorigin="anonymous"
/>
<script
  src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
  integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
  crossorigin="anonymous"
></script>
```

Vous venez d'ajouter Jquery, Bootstrap, et l'ensemble des éléments nécéssaire à son bon fonctionnement. Notre site à également besoin d'une CSS spécifique. Celle-ci doit être ajouté manuellement.

Créer un fichier `main.css` dans `public/css`. Mettre le contenu suivant :

```css
body {
  padding-top: 5rem;
}

form.add {
  padding-bottom: 10px;
}

.pull-right {
  float: right;
}

.action > .btn {
  padding: 1px 7px 1px;
}

.oi {
  font-size: small;
}
```

Ajouter à nouveau cette CSS dans le `<head>` de votre site :

```html
<link href="{{ asset('css/main.css') }}" rel="stylesheet" />
```

Cette solution n'est pas la meilleur, malheureseument un bug sur les PC du lycée nous empêche d'utiliser NodeJS + npm.

<Reveal text="Vous avez votre propre machine ? Installation de Bootsrap 4 via NodeJS + NPM">

✋ Si vous lisez ceci c'est que vous êtes sur votre machine, si c'est le cas, sachez que c'est la meilleur façon de faire. **Attention** à ne pas avoir les librairies en HTTP et Via NodeJS.

### Ajouter Bootsrap 4

La structure de base de Laravel n'intègre pas Bootsrap, par contre elle intègre un système de gestion de dépendances. Nous allons nous servir de cette gestion de dépendance pour ajouter bootstrap (version 4). Dans la ligne de commande :

```sh
$ php artisan preset none
$ php artisan preset bootstrap
```

⏱ Patientez quelques instants… bootstrap est maintenant disponible pour votre projet. Mais pour qu'il soit accessible pour vos templates nous devons « le compiler ».

### Préparation des « Assets » bootsrap …

Laravel inclut une configuration « webpack.mix.js », celle-ci permet de fusionner l'ensemble des JS et CSS en un seul fichier pour gagner en performance.

Sans entrer dans le détail (nous détaillerons le fonctionnement dans un prochain cours), la compilation des ressources (assets) est réalisée avec Webpack. Webpack est un outils NodeJS très puissant mais qui peut-être complexe, nous allons donc uniqumement l'utiliser.

- Installer [NodeJS version current](https://nodejs.org/en/download/current/)

Une fois installé retourner dans le dossier de votre projet faites les commandes suivantes :

#### laravel-mix ?

laravel-mix est un outil fourni de base dans Laravel qui gèrent la partie libraries clientes. La configuration de celui-ci se fait dans le fichier `webpack.mix.js`

Le contenu initial est :

```js
const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
  .js("resources/js/app.js", "public/js")
  .sass("resources/sass/app.scss", "public/css");
```

### Modifier le SCSS

Remplacer le fichier `ressources/app/scss` par :

```scss
// Fonts
@import url("https://fonts.googleapis.com/css?family=Nunito");

// Variables
@import "variables";

// Bootstrap
@import "~bootstrap/scss/bootstrap";

.navbar-laravel {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

body {
  padding-top: 5rem;
}

form.add {
  padding-bottom: 10px;
}

.pull-right {
  float: right;
}

.action > .btn {
  padding: 1px 7px 1px;
}

.oi {
  font-size: small;
}
```

### Transpiler

```sh
$ npm install
$ npm run production
```

🔎 [Plus d'informations Webpack.mix.js](https://laravel.com/docs/5.6/mix)

### 🤓 Questions

- Quels fichiers ont été créés ?
- Que contient le fichier `webpack.mix.js` ?
- `webpack.mix.js` fait référence à des fichiers dans `ressources/js/*` et `ressources/sass/*`, allez y jeter un coup d'oeil (même si dans ce projet nous n'allons rien modifier).
- Pourquoi la fusion / compilation des ressources est-elle si importante ?

</Reveal>

#### Modifications demandés

✋ Cette modification n'est nécéssaire que dans le cas ou vous n'utiliser **pas** NodeJS + NPM.

Comme vous l'avez vu avec le fichier `main.css` il est possible d'avoir un CSS / JS en local dans le dossier public.

- Télécharger l'ensemble de librairies http / https (css + js) dans le dossier public (attention à bien les ranger) et les utiliser dans votre head.

### Question

- Pourquoi est-ce plus sécurisé ?
- Pourquoi la solution des CDN n'est finalement pas si « non sécurisé » ?

### Liste des todos

Maintenant que nous avons défini notre template de base nous allons pouvoir définir notre page principale, la page « liste des todos ». Une fois terminée celle-ci va ressembler à :

![liste](./ressources/liste.png)

Avant de commencer la réalisation de ce template regardons ce que l'on peut y voir :

- Un formulaire « form »
- Une « liste »

Nous allons donc avoir besoin de composant bootstrap. Première étape regarder [la documentation de bootsrap !](https://getbootstrap.com/docs/4.0/components/alerts/)

#### 🤓 Questions

- Quels composants (components) allons nous avoir besoins ?
- Est-ce les seuls ?

#### Définition du template « Liste » / « Home »

Nous allons créer un 2nd template celui qui va être charger d'afficher la liste des todos. Créér un nouveau fichier `resources/views/home.blade.php` et y mettre le contenu suivant :

```html
@extends("template") @section("title", "Ma Todo List") @section("content")
<div class="container">
  <div class="card">
    <div class="card-body">
      <!-- Action -->
      <form action="/action/add" method="post" class="add">
        <div class="input-group">
          <span class="input-group-addon" id="basic-addon1"
            ><span class="oi oi-pencil"></span
          ></span>
          <input
            id="texte"
            name="texte"
            type="text"
            class="form-control"
            placeholder="Prendre une note…"
            aria-label="My new idea"
            aria-describedby="basic-addon1"
          />
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

- `@extends` ? À quoi sert cette directive, pourquoi « template »?
- Modifier le titre afficher dans la barre.
- À quoi correspond le `@forelse … @empty … @endforelse`?

## Et maintenant ?

Bien… récupitulons ! Nous avons :

- Le modele.
- Le contrôleur.
- Les templates (template et home).

Il faut maintenant assembler l'ensemble pour que votre page s'affiche lors d'une requête.

## Création des routes

La définition des routes se fait dans le fichier `routes/web.php` pour l'instant vous devez avoir qu'une seule route de définie.

Supprimer là, et ajouter :

```php
Route::get('/', "TodosController@liste");
```

### 🤓 Question

- À quoi correspond la notation `TodosController@liste` ?

## Tester

Vous voyez « Liste » ? C'est OK !

## Affichage de la liste

Bon afficher « Liste » c'est un bon début… Modifier la méthode `liste()` pour qu'elle ressemble à :

```php
    return view("home", ["todos" => Todos::all()]);
```

## Tester

La page s'affiche ? Super !

- Ajouter une entrée « à la main » grâce à l'explorateur de base de données de PHPStorm.

Raffraichissez la page, vous devez maintenant voir votre texte 😎.

## Action d'ajout

Maintenant que nous avons implémenté la liste, nous allons pouvoir faire le code pour la partie « ajout d'une tâche ». La méthodologie sera la même que pour la liste à savoir :

- Ajout du code dans le contrôleur.
- Ajout de la route.
- Modification du template pour implémenter la fonctionnalité.

### Le contrôleur

Nous allons faire un mapping automatique entre la requête HTTP et le modèle `Todos`

```php
public function saveTodo(Request $request){
    Todos::create($request->all());
    return redirect()->action('TodosController@liste');
}
```

Que va t’il se passer lors de l’appel ? L’objet `$request` contient tous les paramètres de l’appel HTTP, la méthode `all()` permet de les récupérer. L’objet `Todos` possède une méthode permettant de créer un nouvel enregistrement en base de données. Les valeurs passées en paramètre de `create()` permette de renseigner automatiquement les champs en base de données.

✋ Tester l'ajout. Normalement ça ne doit pas fonctionner… Pourquoi ? Tout simplement car nous ne spécifions pas l'ensemble des champs nécessaire à la création de notre objet.

- Quel est l'autre solution possible ?

<Reveal text="Voir la solution">
La première approche est la plus rapide mais elle sous entend que tous les paramètres soient bien initialisées dans « l’input » HTTP. Dans cette version la méthode est plus complète et gère la création de l’objet Todos manuellement, en récupérant les différents éléments dans la requette HTTP.

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

</Reveal>

Et c'est tout ! Simple non ?

### La Route

Pour la route modifier le fichier `routes/web.php` :

```php
Route::post('/action/add', "TodosController@saveTodo");
```

#### 🤓 Questions

- À quoi correspond le mot clef « post » ?
- Que se passe-t-il si on fait un appel de type GET (ou PUT, …) ?

#### Tester

Maintenant que nous avons notre action d'ajout, nous allons pouvoir tester notre Todo List réellement.

- Démarrer votre serveur de test (`php artisan serve`).
- Ajouter une nouvelle todo dans l'interface.
- Vous devez avoir une erreur 419. À quoi correspond-t-elle ?

#### Correction de l'erreur 419

L'erreur 419 indique que votre Token `CSRF` (anti-rejeu) est expiré, ou plutôt dans notre cas que vous ne l'avez pas fourni. C'est une sécurité intégrée à Laravel pour l'ensemble des requêtes POST qui arrive dans votre code.

Nous devons donc ajouter un input « caché » dans notre formulaire pour envoyer en plus du texte une valeur dite de sécurité.

Modifier le template `home.blade.php` pour ajouter le code suivant dans la partie `<form>` :

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

## Action : marquer comme terminé

Pour l’action terminé nous allons devoir updater un enregistrement en base de données, pour ça nous allons le récupérer puis mettre le `boolean` `termine` à 1.

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

Ajouter une route de type `get` avec un paramètre nommé `{id}` dans le fichier `routes/web.php`.

Le lien doit-être : `/action/done/{id}` et la méthode dans le contrôleur `TodosController@markAsDone` en vous inspirant des exemples précédent ajouter la bonne instruction dans le fichier `routes/web.php`.

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

Ajouter une route de type `get` avec un paramètre nommé `{id}` dans le fichier `routes/web.php`.

Le lien doit-être : `/action/delete/{id}` et la méthode dans le contrôleur `TodosController@deleteTodo` en vous inspirant des exemples précédent ajouter la bonne instruction dans le fichier `routes/web.php`.

#### Questions

- Un `delete` de type `get` est-ce normal ?
- Quelle est l'autre solution ?
- Pourquoi dans notre cas c'est « la seul solution » ?

## Ajouter les actions dans le template

Maintenant que nous avons déclaré nos « 3 actions » dans notre contrôleur (et dans le fichier de route) nous allons les utiliser dans notre template « home » voici les étapes :

- Éditer le fichier `resources/views/home.blade.php`.
- Ajouter la bonne url sur l'action de votre formulaire. (`« /add »`)
- Ajouter sur chaque ligne de la boucle « foreach » deux liens qui vont « suprimer » et « terminer ».

Aide :

Pour accéder à une variable exemple `id` : `$todo->id`.

Exemple <span v-pre>`<a href="lien{{ $todo->id }}">Terminer</a>` </span>

## Ajout d'une 2nd page

Ajouter une nouvelle page dans votre site web cette page sera la page « À propos », aucune aide autre que :

- Route.
- Méthode dans le contrôleur.
- Template qui « @extends » du gabarit / template de base.
- Ajouter un lien pour accèder à cette page dans le header du site.

## Évolution souhaitée : Nommer les routes

Comme vous l'avez constaté, nous utilisons les routes comme une simple URL. Avec Laravel il est possible de faire mieux que ça ! Il est possible de nommer les routes (exemple `todo.save`) pour les utiliser directement dans notre template. Ça va permettre d'améliorer votre code (changement de contrôleur plus simple par exemple) et surtout de le rendre plus lisible.

### Modifier le fichier route

Éditer le fichier `routes/web.php` pour remplacer le contenu par :

```php
<?php

Route::get('/', "TodosController@liste")->name("todo.list");
Route::post('/action/add', "TodosController@saveTodo")->name('todo.save');
Route::get('/action/done/{id}', "TodosController@markAsDone")->name('todo.done');
Route::get('/action/delete/{id}', "TodosController@deleteTodo")->name('todo.delete');

```

- Avez-vous vu la différence ? Des `->name("…")` sont en plus, vos routes sont maintenant nommées

### Éditer votre template « home »

Maintenant que nous avons édité nos routes, il faut les utiliser dans le template pour ça modifier les différents liens (dans le form et dans les `<a>` d'action) :

```html
[…]
<form action="{{ route('todo.save') }}" method="post" class="add">
  […]

  <a href="{{ route('todo.done', ['id' => $todo->id]) }}">[…]</a>
  <a href="{{ route('todo.delete', ['id' => $todo->id]) }}">[…]</a>
</form>
```

- Avez vous vu la différence ?

### Utilisation dans le contrôleur

Il est également poussible de les utiliser dans le contrôleur via la directive :

```php
    return redirect()->route('todo.list');
```

Modifier votre code pour l'utiliser.

### 🤓 Question

- Quel est l'avantage d'utiliser les routes nommées ?

## Évolution souhaitée : Ajout de contrôle

Seul les `Todos` marqués comme terminée peuvent être supprimées, il faudra donc contrôler l’état avant de faire le `delete()` en base de données.

- Modifier la méthode `deleteTodo` contrôleur pour ajouter la règle de gestion (Indice `$todo->termine`)
- Ajouter la directive `@if` dans le template afficher uniquement les bonnes actions en fonction de l'état de la todo. [Voir la documentation du if avec blade](https://laravel.com/docs/5.7/blade#if-statements)
- Pour les boutons d'actions utiliser des icones :
  - Exemple [fontawesome](https://fontawesome.com/how-to-use/on-the-web/setup/getting-started?using=web-fonts-with-css)
  - Choisir [une icône](https://fontawesome.com/icons?d=gallery)
  - Utilisation : `<i class="fas fa-stroopwafel"></i>`
- « Encapsuler » votre icône autour d'un `a` exemple <span v-pre>`<a href="/actions/done/{{$todo->id}}" class="btn btn-success"><i class="fas fa-check"></i></a>`</span>

## Évolution souhaitée : Message en cas d'erreur

Avertir l'utilisateur en cas d'erreur est important! Comme vous l'avez constaté aucune gestion de message d'erreur n'est présente dans le contrôleur. Implémenter des messages (basique) grace à l'aide suivante :

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

[Explication sur la méthode Flash](https://laravel.com/docs/5.6/session#flash-data)
