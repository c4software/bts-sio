# Laravel

## The PHP Framework For Web Artisans

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Les frameworks

Ensemble d'outils et de composants logiciels à la base d'un logiciel ou d'une application.

* Pourquoi ?
* Quand ?

---

## Pourquoi ?

* Simplification <!-- .element: class="fragment" -->
* Standardisation <!-- .element: class="fragment" -->
* Homogénéité <!-- .element: class="fragment" -->
* Sécurité <!-- .element: class="fragment" -->

---

## Quand ?

* En entreprise
* En groupe
* Le plus souvent…

---

## Quelques frameworks

* Laravel
* Symfony
* CodeIgniter
* CakePHP
* Zend Framework
* Fat-Free Framework

---

## Revenont sur le quand…

Le choix du framework dépend du projet en question… Et parfois pas de framework dutout…

---

## Laravel c’est ?

* Un framework
* Gratuit et Open-Source
* Utilise le PHP de façon moderne
* Démarrage simple et rapide
* Développement objet
* Approche MVC (Mais…)

---

## Historique

* Taylor Otwell
* 2011: Création
* 2016: Projet PHP le mieux noté sur GitHub

La communautée c’est rapidement formée autour du projet. C’est bon signe!

---

## La vision…

Taylor Otwell, était un utilisateur de CodeIgniter. **Mais** il le trouvait trop compliqué, trop lourd, et chaque modification était trop complexe…

Il a donc voulu quelques chose de plus **souple**, **simple** et **simple à apprendre**

Le pitch de lancement, c’est « Un framework connu pour sa simplicité »

---

## L’histoire

* V1, V2: Le début, les versions sont rapidement disponibles. Système de routes, et controller MVC très simple.
* V3: Février 2012, Boom de la popularité.
* V4: Mai 2013, réécriture complète du Framework. Intégration du gestionnaire de paquets « Composer »

---

### À votre avis pourquoi, est-ce important (le gestionnaire de paquets) ?

---

## Zoom sur Composer

* Partage simple des dépendances
* Multi-plateforme
* Partage simplifié d’un projet

---

## L’histoire… (maintenant)

* 5.5: Version actuelle (Support de PHP 7)

---

## Architecture

* **Model**: La base de données (ORM: Eloquent).
* **Vue**: Gestion du HTML (Moteur de template : Blade).
* **Controller**: Gestion des requêtes et génère le contenu.

---

## ORM ?

![](./img/what.gif)

Technique de programmation informatique qui crée l'illusion d'une base de données orientée objet à partir d'une base de données relationnelle en définissant des correspondances entre cette base de données et les objets.

---

## Du PHP Objet ?

* Logique découpé dans des classes avec des comportements et des fonctionnements propres.
* Plus simple, plus maintenante, plus facilement **TESTABLE**

---

### Car oui, un code de qualité, c’est un code testé !

![Yep](./img/approve.gif)

---

## Comment ça fonctionne ?

---

## Installation

```bash
$ composer global require "laravel/installer"
```

---

## Créer un projet

```bash
$ laravel new exemple
laravel new exemple
Crafting application...
Loading composer repositories with package information
Installing dependencies (including require-dev) from lock file
Package operations: 68 installs, 0 updates, 0 removals
  - Installing doctrine/inflector (v1.2.0): Loading from cache
  - Installing doctrine/lexer (v1.0.1): Loading from cache
  - Installing erusev/parsedown (1.6.3): Loading from cache
[…]
Application ready! Build something amazing.
```

---

## Gérer l’application créée

```bash
$ php artisan
Laravel Framework 5.5.19

Usage:
command [options] [arguments]

Options:
-h, --help            Display this help message
[…]
```

---

## Les « routes »

* Gestion des URL de l’application
* Assemble l'ensemble (Le controler et la vue)

---

## Connaissez-vous un équivalent ?

---

## Dans Laravel : 3 fichiers

* **web.php**: Gestion des urls pour le « web »
* **api.php**: Gestion des urls pour les API.
* **console.php**: Gestion des commandes pour la console Laravel

## Un exemple

```php
Route::get('/', function () {
  return "Bonjour Monde";
});
```

---

## Avec des paramètres

```php
Route::get('/demo/{id}', "DemoController@voir");
```

Consulter la page **/demo/3** chargera automatiquement le bon controller et la bonne méthode en passant le paramètre **3**

---

## Et pour le POST ?

```php
Route::post('/demo/ajout', "DemoController@ajout");
```

---

## Autre que le POST ?

---

# Simple non ?

![Nice](./img/not_bad.gif)

---

## Les controllers

Gestion de la logique « metier » pour traiter chaque demande

```bash
$ php artisan make:controller DemoController
```

---

```php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;

class DemoController extends Controller
{
    public function voir($id)
    {
        return "Identifiant => ".$id;
    }
}
```

---

## Les modeles

La représentation objet de la base de données

---

## Exemple

```bash
$ php artisan make:model TodoList
```

---

```php
namespace App;

use Illuminate\Database\Eloquent\Model;

class TodoList extends Model
{
    protected $table = "todoList";
    protected $fillable = array('texte', 'termine');
}
```

---

## « Initialiser » la base de données

```bash
$ php artisan migrate:make create_todoList_table --create=todoList
```

Création d'un script PHP qui représente la définition de la base de données.

---

```php
// app/database/migrations/####_##_##_######_create_todoList_table.php

Schema::create('todoList', function(Blueprint $table)
{
    $table->increments('id');

    $table->string('texte');
    $table->boolean('termine');

    $table->timestamps();
});
```

---

## Lancement de la création

```bash
$ php artisan migrate
```

* À votre avis que va-t-il se passer ?

---

## Eloquent : Le « Query Builder »

```php
use App\TodoList;

$todos = App\TodoList::all();
// Ou pour le Todo avec l’identifiant « 42 »
$todo = App\TodoList::find(42);
```

---

## Eloquent : Le « Query Builder »

```php
    $flights = App\TodoList::where('temine', 1)
    ->orderBy('id', 'desc')
    ->take(10)
    ->get();
```

---

## Eloquent : Le « Query Builder »

```php
$users = DB::table('users')->paginate(15);
// Ou avec un where
$users = User::where('votes', '>', 100)->paginate(15);
```

- Quel est l'avantage à votre avis de faire ce genre de requêtes ?

## Eloquent : Créer un enregistrement

```php
// Créer une Todo
App\TodoList::create(array(
    'texte'     => 'Super Cool',
    'termine'   => false
));
// La sauvegarde est automatique.
```

---

## Eloquent : Mettre à jour un enregistrement

```php
// Rechercher celui avec l’id 1
$todo = App\TodoList::find(1)->first();

// Le passer à terminer
$todo->termine = true;

// Le sauvegarder en base de données
$todo->save();
```

---

## Eloquent : Suppression d’un enregistrement

```php
// Rechercher celui avec l’id 1
$todo = App\TodoList::find(1)->first();

// Le supprimer
$todo->delete();

// Le supprimer directement
App\TodoList::destroy(1);

// En supprimer plusieurs directement
App\TodoList::destroy(1,2,3);

// Supprimer avec une condition
App\TodoList::where('termine', '==', 1)->delete();
```

---

## La Vue : Blade

* Moteur de template
* Performant
* Héritage et re-définition
* Les fichiers Blade sont des fichiers PHP
* Contrairement à beaucoup d’autre moteur de template, le mix PHP + HTML est possible (Mais personnellement je ne trouve pas que ça soit une bonne idée…)

---

## Utilisation

Afficher un template

```php
Route::get('/', function () {
    return view('accueil');
});
```

---

## Organiser les templates

* Pourquoi ?
* Comment ?
* À votre avis pourquoi est-ce très important ?

---

## Le template principal

```html
<!-- Sauvegardé dans resources/views/layouts/app.blade.php -->
<html>
    <head>
        <title>Site Exemple - @yield('titre')</title>
    </head>
    <body>
        @section('sidebar')
            « Section » Sidebard principal
        @show

        <div class="container">
            @yield('content')
        </div>
    </body>
</html>
```

---

## Le template « enfant »

```php
<!-- Sauvegardé dans resources/views/child.blade.php -->

@extends('layouts.app')

@section('titre', 'Page enfant')

@section('sidebar')
  @parent // <-- Hérite des donnés du parents
  Données de l’enfant
@endsection

@section('content')
  <p>Contenu de la page enfant.</p>
@endsection
```

---

## Les directives « Blade »

---

## Les conditions

* **@if**, **@elseif**, **@else** et **@endif**
* **@switch**, **@case**, **@break**, **@default** et **@endswitch**

---

## Les boucles

* **@for**, **@endfor**
* **@foreach**, **@endforeach**
* **@forelse**, **@empty**, **@endforelse** <= Permet d’afficher autre chose si pas de données dans la boucle

---

## L'héritage

* **@include**('view.name') <= Inclusion d’une autre vue
* **@include**When($boolean, 'view.name') <= Inclusion conditionnelle

---

## Gestion des droits d’accès

* **@auth**, **@guest**

---

## **@stack**

Zone dans le code ou il sera possible « d'injecter » ulterieurement du code.

Exemple, zone dans le header pour injecter des script JS utile que dans certaines page.

---

### Dans la vue parent

```html
<head>
    <!-- Head Contents -->
    @stack('scripts')
</head>
```

---

### Dans la vue enfant

```php
@push('scripts')
    <script src="/demo.js"></script>
@endpush
```

---

## La sécurité

Exemple le CSRF

```html
    […]
    {{ csrf_field() }}
    […]
```

La vérification côté serveur est **automatique**

---

## L’authentification

Intégré dans Laravel, s’initialise simplement en suivant la documentation

[En savoir plus](https://laravel.com/docs/5.5/authentication)

---

## Heu, mais c’est lourd non ?

Éffectivement Laravel est un « gros » Framework. Dans certains cas on veut plus simple.

Dans quel cas par exemple ?

---

## Pour des API par exemple ?

Pour des API ils ont conçu **Lumen**

---

## Lumen

* Plus léger
* Micro framework
* Dédié au Micro-Services
* Reprend les modules/fonctionnement de Laravel

---

![](./img/done.gif)

---

* Voyez-vous des cas où choisir Lumen ?

---

## Les micro-services vous connaissez ?

---

* Les services individuels sont simples à remplacer
* Les services sont conçus pour leur utilité spécifique (par exemple la facturation, la chaîne logistique, l'interface...)
* L'architecture est plus symétrique que hiérarchique (passage d'une architecture client-serveur à une architecture de plusieurs entités communicantes)
* L'architecture facilite le déploiement continu du code

---

* Les services sont petits, et conçus pour remplir une seule fonction.
* L'organisation du projet doit prendre en compte l'automatisation, le déploiement et les tests.
* Chaque service est élastique, résilient, composable, minimal et complet.

---

* Et pour vous ?

---

### Des questions ?

(Il doit y en avoir beaucoup)
