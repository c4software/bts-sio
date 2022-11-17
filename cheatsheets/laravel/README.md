---
description: Cet aide mémoire n’est pas exhaustif, elle contient les connaissances minimums pour réaliser un site avec Laravel.
---

# Laravel 8

Cet aide mémoire n’est pas exhaustif, elle contient les connaissances minimums pour réaliser un site avec Laravel.

::: details Sommaire
[[toc]]
:::

## Architecture MVC

![Architecture MVC](./res/mvc-diagram.png)

- **Model**: La base de données (ORM: Éloquent).
- **Vue**: Gestion du HTML (Moteur de template : Blade).
- **Controller**: Gestion des requêtes et génère le contenu.

::: danger Nous allons le voir…
C’est du MVC oui ! Mais avec un bonus… un ORM (Object–Relational Mapping) pour accéder aux objets. Vous allez le voir… Ça change tout !

L’idée d’un ORM, c’est de remplacer l’écriture des requêtes SQL par de la manipulation d’objet.

:::

## Créer un projet

Dans la documentation de Laravel, vous trouverez plusieurs façons de créer un projet. Je vous conseille de passer par la version « [Composer](https://getcomposer.org/download/) » qui fonctionnera, quelle que soit la plateforme.

```sh
composer create-project laravel/laravel le-nom-de-votre-projet
```

::: danger ATTENTION
Le projet va être crée dans mon exemple dans un dossier nommé `le-nom-de-votre-projet` (dans le dossier courant). Attention à ne pas être n’importe où.
:::

## Réinstaller un projet

Si vous changez de machine ou si vous récupérez le code source depuis Git il sera nécessaire de réinstaller les dépendances. Pour ça :

```sh
composer install
```

Après cette étape, il faudra remettre également en place le fichier `.env` de votre projet. Pour le contenu du fichier il faut reprendre le contenu du `.env.example`.

::: tip Pourquoi le .env est perdu ?

Le `.env` contient vos identifiants de connexion à la base de données **et les différentes clés secrètes**, c'est pour ça que celui-ci est présent de base dans le .gitignore.

:::

## Gérer l’application

Une fois le projet créé vous pouvez (**dans le dossier du projet**) avec la ligne de commande réaliser diverses opérations. Celles-ci sont consultables avec

```sh
php artisan
```

![Commande Artisan](./res/artisan.png)

Nous allons le voir, cette commande nous sera utile pour diverses actions (créer les modèles, créer les contrôleurs, lister les routes).

Nous pouvons par exemple lister les routes de notre application « fraichement initialisée » :

```sh
php artisan route:list
```

![Commande Artisan](./res/route_liste.png)

## Lancer votre site

Pour visualiser votre site, Laravel intègre une commande permettant de lancer « un serveur web » intégré le temps du développement. Il suffit de :

```sh
php artisan serve
```

```log
Starting Laravel development server: http://127.0.0.1:8000
[Tue Nov 2 17:27:22 2021] PHP 7.4.25 Development Server (http://127.0.0.1:8000) started
```

## Les routes

L’ensemble des routes sont dans **3 fichiers** :

- `routes/web.php`: Gestion des urls pour les clients (web)
- `routes/api.php`: Gestion des urls pour les échanges « technique » API.
- `routes/console.php`: Gestion des commandes pour la console Laravel.

### Définir une route simple

Dans le fichier `web.php` il suffira par exemple de :

```php
Route::get('/', function () {
  return "Bonjour Monde";
});
```

Nous déclarons ici **une route**, accessible sur le **`/`** (c’est-à-dire `http://localhost:8000/`), elle affichera `Bonjour Monde`.

### Définir une route bis

L’avantage d’un framework, c’est la simplicité. Si vous souhaitez déclarer une route `http://localhost:8000/demo/3` il suffira d'indiquer dans le `web.php` le contenu suivant :

```php
Route::get('/demo/{id}', [DemoController::class, "voir"]);
```

Qu’avons nous ici ?

| Le code                           | L’action                                                                                                   |
| :-------------------------------- | :--------------------------------------------------------------------------------------------------------- |
| `/demo/{id}`                      | Le lien d’accès avec une variable `{id}`                                                                   |
| `[DemoController::class, "voir"]` | La méthode à appeler dans le contrôleur (en l’occurence la méthode `voir` dans la classe `DemoController`) |

### Et en POST ?

C’est simple :

```php
Route::post('/demo/{id}', [DemoController::class, "voir"]);
```

::: danger Un instant ✋

En PHP objet il y a la notion de namespace, Laravel utilise de base les namespace, ça veut dire que nous allons avoir à utiliser le mot clé `use` pour importer (include). Quand vous voulez utiliser une classe qui n'est pas dans le même fichier, il faudra déclarer l'emplacement via un `use`. Exemple, pour que `DemoController` soit accessible depuis le router il faudra :

```php
use App\Http\Controllers\DemoController;

Route::post('/demo/{id}', [DemoController::class, "voir"]);
```

- ⚠️ Si vous utilisez **PHPStorm** cet import sera automatique.
- ⚠️ Si vous utilisez **VSCode** il faudra passer par une extension [Disponible ici](https://marketplace.visualstudio.com/items?itemName=MehediDracula.php-namespace-resolver)

Pour **PHPStorm**, **alt+entrée** permettra de déclencher l'ajout du use.

Pour **VSCode** je vous laisse regarder l'usage de l'extension :

![Namespace Resolver](./res/namespace_resolver.gif)

:::

## Les contrôleurs

Le contrôleur va contenir la logique « métier » pour traiter les demandes du clients.

```sh
php artisan make:controller DemoController
```

Cette action va créer le squelette d’un contrôleur à l’emplacement suivant `app/Http/Controllers/DemoController.php`. Le contenu est minimaliste :

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DemoController extends Controller
{
    //
}
```

### Déclarer une action

Nous avons précédemment déclaré une action dans notre routeur `voir`, si nous souhaitons l’ajouter dans notre contrôleur :

```php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DemoController extends Controller
{
    public function voir($id): string
    {
        // Pour l’instant pas de vue, nous verrons ça plus tard.
        return "Vous avez demandé l’id : " . $id;
    }
}
```

Il suffit donc de créer une méthode, les paramètres seront automatiquement remplis lors de l’appel du client `$id` contiendra la valeur présente à la place de `{id}`.

::: tip C’est aussi simple oui

Ne reflichissez pas trop… C’est vraiment aussi simple que ça.

:::

## Éloquent « l’ORM »

### La migration

Une migration c’est ce qui va nous permettre d’initialiser la base de données directement depuis Laravel. Bien que cette partie _est optionnelle_ je vous conseille vivement de l’utiliser (c’est un standard en entreprise.)

```php
php artisan make:migration le_nom_de_votre_migration --create=leNomDeVotreTableEnBase
```

Une migration, est juste une classe qui va contenir la définition de votre table, les champs, les types, la structure. Le contenu de base sera le suivant :

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class LeNomDeVotreMigration extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('leNomDeVotreTableEnBase', function (Blueprint $table) {
            $table->id();
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
        Schema::dropIfExists('leNomDeVotreTableEnBase');
    }
}
```

Par exemple, si vous souhaitez ajouter dans votre table deux champs (un `texte` et un `booléen`), il faudra ajouter dans la méthode `up` :

```php
$table->string('texte');
$table->boolean('termine');
```

Lancer la migration, c’est-à-dire appliquer l’ensemble des modifications en attente en BDD :

```sh
php artisan migrate
```

[Plus d’information](https://laravel.com/docs/8.x/migrations)

### Le modèle

Le modèle est l’objet qui nous permettra de faire « nos requêtes SQL », l’accès à nos données.

La grande force de Laravel, son Framework [Eloquent](https://laravel.com/docs/8.x/eloquent). Laravel intègre une commande pour créer un modèle vide :

```sh
php artisan make:model LeNomDeVotreTableEnBase
```

Cette action va créer un squelette de modèle à l’emplacement suivant : `app/Models/LeNomDeVotreTableEnBase.php`. Le contenu sera le minimum :

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeNomDeVotreTableEnBase extends Model
{
    use HasFactory;
}
```

::: danger Le nom de la classe sera le nom de votre table

De base le nome de la classe sera le nom de votre table. Si vous souhaitez changer le comportement, il vous suffit de :

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeNomDeVotreTableEnBase extends Model
{
    protected $table = "CECI_EST_LE_NOM_DE_MA_TABLE";

    use HasFactory;
}
```

:::

### Accéder aux données

```php
// Tout obtenir
$todos = LeNomDeVotreTableEnBase::all();

// Ou pour l’enregistrement avec l’identifiant « 42 »
$todo = LeNomDeVotreTableEnBase::find(42);

// Obtenir, mais filtrer et ordonné et avec une limite
$todos = LeNomDeVotreTableEnBase::where('temine', 1)->orderBy('id', 'desc')->take(10)->get();

// Ou avec un where
$users = User::where('votes', '>', 100)->get();
```

::: danger Un instant ✋

En PHP objet il y a la notion de namespace, Laravel utilise de base les namespace, ça veut dire que nous allons avoir à utiliser le mot clé `use` pour importer (include). Quand vous voulez utiliser une classe qui n'est pas dans le même fichier, il faudra déclarer l'emplacement via un `use`. Exemple, pour que `LeNomDeVotreTableEnBase` soit accessible depuis le contrôleur il faudra :

```php
use App\Models\LeNomDeVotreTableEnBase;
```

- ⚠️ Si vous utilisez **PHPStorm** cet import sera automatique.
- ⚠️ Si vous utilisez **VSCode** il faudra passer par une extension [Disponible ici](https://marketplace.visualstudio.com/items?itemName=MehediDracula.php-namespace-resolver)

Pour **PHPStorm**, alt+entrée permettra de déclencher l'ajout du use.

Pour **VSCode** je vous laisse regarder l'usage de l'extension :

![Namespace Resolver](./res/namespace_resolver.gif)

:::

### Créer un enregistrement

```php
// Création d’une nouvelle entrée en BDD (équivalent d’un INSERT INTO)
TodoList::create(array(
    'texte'     => 'Super Cool',
    'termine'   => false
));
```

### Mettre à jour un enregistrement

```php
// Rechercher celui avec l’id 1
$todo = App\TodoList::find(1);

// Le passer à terminer
$todo->termine = true;

// Le sauvegarder en base de données
$todo->save();
```

### Supprimer un enregistrement

Plusieurs façon :

```php
// Façon 1
// Rechercher celui avec l’id 1
$todo = App\TodoList::find(1);
$todo->delete(); // Le supprimer

// Façon 2
// Le supprimer directement
App\TodoList::destroy(1);

// Façon 3
// En supprimer plusieurs directement
App\TodoList::destroy(1,2,3);

// Façon 4
// Supprimer avec une condition
App\TodoList::where('termine', '==', 1)->delete();
```

### Les jointures

Les jointures sont à définir directement dans le modèle. Elles seront des méthodes accessibles via l’objet de votre modèle.

#### One To One

![One To One](./res/many-to-many.png)

```php
class Todo extends Model {

  // Dans le modèle
  public function categorie()
  {
      return $this->hasOne(Categorie::class);
  }

}
```

::: tip
Éloquent supposera que dans le modèle Catégorie contiendra une colonne todo_id.
:::

#### One To Many

![One To Many](./res/one-to-many.png)

```php
class Post extends Model {

  // Dans le modèle
  public function comments()
  {
      return $this->hasMany(Comment::class);
  }

}
```

::: tip
Éloquent supposera que la colonne de clé étrangère sur le modèle Comment est post_id.
:::

#### L’inverse du One To Many : le « Belong To »

![One To Many](./res/one-to-many.png)

```php
class Comment extends Model
{
    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
```

::: tip

- Éloquent tentera de trouver un modèle Post dont l’identifiant correspond à la colonne post_id du modèle Comment.
- Éloquent supposera que la clé étrangère du modèle Post sur la table des commentaires est post_id.

:::

#### Many To Many

![Many To Many](./res/many-to-many.png)

```php
class User extends Model
{
    /**
     * The roles that belong to the user.
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }
}

class Role extends Model
{
    /**
     * The users that belong to the role.
     */
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
```

### En savoir plus

Nous avons effleuré ici les types de requêtes… [Pour en savoir plus](https://laravel.com/docs/8.x/queries)

## La vue

Laravel utilise l’excellent moteur de template « [Blade](https://laravel.com/docs/8.x/blade) ». À la fois souple et puissant il améliorera très grandement la qualité de vos projets.

- Moteur de template
- Performant
- Héritage et redéfinition
- Les fichiers Blade sont des fichiers PHP
- Contrairement à beaucoup d’autres moteurs de template, le mix PHP + HTML est possible (mais personnellement je ne trouve pas que ça soit une bonne idée…)

### Retourner une vue simple

Dans votre routeur :

```php
Route::get('/', function () {
    return view('votrePage', ['name' => 'Valentin 👋']);
});
```

Dans votre fichier `resources/views/votrePage.blade.php` :

```php
Bonjour, {{ $name }}.
```

::: warning La sécurité est de base
Ici pas besoin de faire un `htmlspecialchars`… **C’est automatique**
:::

### Retourner une vue bis

Depuis un contrôleur l’approche est là même :

Votre contrôleur :

```php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DemoController extends Controller
{
    public function voir($id): string
    {
        return view('votrePage', ['id' => $id]);
    }
}
```

Dans votre fichier `resources/views/votrePage.blade.php` :

```php
<h1>Vous avez demandé l’id {{ $id }}</h1>
```

### Les directives

Les directives sont une syntaxe particulière permettant de conditionner, répéter, ajuster l’affichage en fonctions des données

#### LES CONDITIONS

`@if, @elseif, @else et @endif`

`@switch, @case, @break, @default et @endswitch`

#### LES BOUCLES

`@for, @endfor`

`@foreach, @endforeach`

`@forelse, @empty, @endforelse <= Permet d’afficher autre chose si pas de données dans la boucle`

#### L’HÉRITAGE

`@include('view.name') <= Inclusion d’une autre vue`

`@includeWhen($boolean, 'view.name') <= Inclusion conditionnelle`

#### Les droits d’accès

`@auth, @guest`

#### Quelques exemples en vrac

```php
// ++++
// Les conditions
// ++++

@if (count($records) === 1)
    I have one record!
@elseif (count($records) > 1)
    I have multiple records!
@else
    No records!
@endif

@auth
    // The user is authenticated...
@endauth

@guest
    // The user is not authenticated...
@endguest

@isset($records)
    // $records is defined and is not null...
@endisset

@empty($records)
    // $records is "empty"...
@endempty

// ++++
// Les boucles
// ++++

@for ($i = 0; $i < 10; $i++)
    The current value is {{ $i }}
@endfor

@foreach ($users as $user)
    <p>This is user {{ $user->id }}</p>
@endforeach

@forelse ($users as $user)
    <li>{{ $user->name }}</li>
@empty
    <p>No users</p>
@endforelse

@while (true)
    <p>I'm looping forever.</p>
@endwhile
```

### L’héritage de template

Organiser le code en parent et en enfants :

![Parent & Enfant](./res/parent-enfant.png)

- `Le parent` est la **structure** de notre page.
- `L’enfant` est le **contenu** page désirée

Le parent :

```php
<!-- Sauvegardé dans resources/views/layouts/app.blade.php -->

<html>
  <head>
    <title>Site Exemple - @yield('titre')</title>
  </head>
  <body>
    <div class="container">@yield('content')</div>
  </body>
</html>
```

L’enfant (une de vos pages) :

```php
<!-- Sauvegardé dans resources/views/child.blade.php -->

@extends('layouts.app') // indique que nous allons utiliser le parent « app ».

@section('titre', 'Page enfant') // Titre de la page

// Contenu de votre page
@section('content')
  <p>Contenu de la page enfant.</p>
@endsection
```

::: tip C’est une notion importante

Je ne le répèterai jamais assez, mais l’organisation est la clé de la réussite. Même si ce découpage vous semble « complèxe » à première vue, c’est quelque chose de courant et de pratiquer dans beaucoup (toutes ?) les entreprises.

:::

### Les composants

Blade intègre également un système de composant permettant de découper son travail.

```html
<VotreComposant nom="Valentin">
  Vous pouvez ici avoir des enfants.
</VotreComposant>
```

[Documentation des composants](https://laravel.com/docs/8.x/blade#components)
[Utiliser les composants pour définir son affichage](https://laravel.com/docs/8.x/blade#layouts-using-components)

::: tip C'est nouveau

Les composants sont une nouvelle approche dans la conception d'interface. Ils sont très utilisés notamment en JavaScript, en Laravel vous avez le choix « Héritage » ou « Composant » il n'y a pas de meilleure façon de faire. Seulement deux approches complémentaires.

PS: J'ai mon petit faible pour les composants :wink:.

:::
