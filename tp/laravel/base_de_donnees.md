---
description: Dans ce TP nous allons découvrir la base de données et l'ORM avec Laravel. Migrations, modèles, Eloquent… Nous allons construire une TODO List persistante.
---

# Introduction base de données et ORM avec Laravel

![Laravel](./ressources/logo.png)

::: details Sommaire
[[toc]]
:::

Dans le [TP d'introduction](./introduction.md) nous avons découvert les bases de Laravel : les routes, les vues (Blade), les contrôleurs et les messages flash. Notre site fonctionne… mais il ne retient rien ! Dès que nous rechargeons la page, tout est perdu.

Dans ce TP nous allons découvrir la partie base de données de Laravel pour construire une **TODO List persistante** : les tâches seront sauvegardées en base de données et retrouvées à chaque visite.

::: danger TP découverte

Nous sommes toujours dans la découverte de Laravel, ce TP est donc **très guidé**.

Je vous laisse faire très attention à chaque étape, et surtout à bien comprendre le fonctionnement des éléments évoqués.

👋 Si vous avez des questions, n'hésitez pas.

:::

## Les slides

Avant de commencer, voici une présentation rapide de la partie théorie de notre TP du jour : l'ORM, les migrations et Eloquent.

<ClientOnly>
<SlidesDeck src="laravel_bdd" />
</ClientOnly>

Dans ce TP, je vous invite à avoir en parallèle :

- [L'aide mémoire Laravel](/cheatsheets/laravel/)
- [La synthèse des commandes](/cheatsheets/laravel/quick.md)

## Objectifs

À la fin de ce TP vous saurez :

- Créer un **modèle** et sa **migration** avec `artisan`.
- Créer / mettre à jour la structure de votre base de données avec `php artisan migrate`.
- Interroger votre base de données avec **Eloquent** (l'ORM de Laravel) : lister, créer, modifier, supprimer.
- Construire une application complète : la TODO List (lister, ajouter, terminer, supprimer une tâche).
- Créer un **Middleware** pour filtrer les requêtes.

## Pourquoi un ORM ?

Jusqu'à maintenant (en PHP pur), pour manipuler une base de données vous deviez :

- Écrire les requêtes SQL à la main (`SELECT`, `INSERT`, `UPDATE`, `DELETE`).
- Gérer la connexion (PDO), les erreurs, les injections SQL…
- Transformer les résultats en tableaux ou en objets.

Avec Laravel, nous allons utiliser **Eloquent**, l'ORM (Object-Relational Mapping) intégré. L'idée est simple : chaque table de votre base de données est représentée par une **classe PHP** (un modèle), et chaque ligne par un **objet**.

Le flux complet dans notre application sera donc :

```
Navigateur → Route → Contrôleur → Modèle (Eloquent) → Base de données
                          ↓
                       Vue (Blade) → HTML renvoyé au navigateur
```

L'avantage d'utiliser un Framework, c'est qu'il est très simple d'y intégrer la partie base de données, contrairement à un développement classique où tout est à « ré-inventer » un framework nous donne une structure / un cadre pour aller plus vite.

## Reprendre votre projet

Nous allons continuer sur le projet créé lors du [TP d'introduction](./introduction.md). Ouvrez le dossier de votre projet et vérifiez qu'il se lance toujours :

```sh
php artisan serve
```

::: details Vous n'avez pas le projet du TP précédent ?

Pas de panique, vous pouvez repartir de zéro :

```sh
composer create-project --prefer-dist laravel/laravel mon-premier-projet
```

Il vous faudra également recréer un layout de base `resources/views/layouts/base.blade.php` (voir [le TP d'introduction](./introduction.md#creer-le-layout)), c'est lui que nous utiliserons pour nos vues.

Si vous récupérez votre projet depuis GIT, n'oubliez pas de réinstaller les dépendances avec `composer install`.

:::

## La base de données

Dans les versions précédentes de Laravel la base de données était préconfigurée pour utiliser MySQL. Depuis Laravel en version 11, la base de données par défaut est SQLite, **évidemment** vous pouvez changer cette configuration dans le fichier `.env`, mais pour l'instant nous allons rester sur SQLite.

::: tip SQLite ?

SQLite est un système de gestion de base de données relationnelle, il est très simple à mettre en place et ne nécessite pas de configuration particulière. C'est donc parfait pour un TP.

Pour entrer un peu plus dans le détails, SQLite est un système de base de données (comme MySQL) mais qui ne nécessite pas de serveur. Les données sont stockées dans un fichier `.sqlite` (ou `.db`). Ce genre de base de données est très utilisée pour les applications mobiles par exemple.

C'est un excellent moyen également de prototyper très rapidement une idée sans même avoir besoin de serveur distant.

:::

Questions :

- Ouvrez votre fichier `.env`, quelle ligne concerne la base de données ?
- À votre avis, où se trouve le fichier SQLite dans votre projet ?

Comme pour la création d'un contrôleur, la première étape va passer par de la ligne de commande.

```sh
php artisan make:model Todo --migration
```

Cette commande va créer « la définition du modèle » (le modèle la représentation objet de notre table), mais également la migration. La migration est le fichier qui va définir la structure de notre `Table`. Vous avez maintenant, dans votre projet, deux nouveaux fichiers :

- `app/Models/Todo.php`
- `database/migrations/YEAR_MONTH_DAY_TIME_create_todos_table.php`

::: tip Pourquoi `todos` au pluriel ?

Vous avez demandé un modèle `Todo`, et Laravel a nommé la table `todos`… C'est une **convention** : le modèle est au singulier, la table au pluriel. En respectant cette convention, Laravel fait le lien automatiquement entre les deux, sans aucune configuration.

:::

### Définir la migration (structure de la table)

Le fichier de migration définit la structure de la table que vous allez créer, actuellement vous avez un « format type », votre table va contenir de base quelques colonnes (id, et dates). Nous allons ajouter dans la méthode `up()` nos colonnes :

```php
$table->string('texte');
$table->boolean('termine')->default(false);
```

Je vous laisse l'ajouter avec les autres colonnes.

::: details Vous avez un doute sur comment faire ? (je vous invite vraiment à le faire sans regarder la solution)

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('todos', function (Blueprint $table) {
            $table->id();
            $table->string('texte');
            $table->boolean('termine')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('todos');
    }
};
```

:::

Questions :

- À votre avis, à quoi sert la méthode `down()` ?
- Pourquoi versionner la structure de la base de données dans des fichiers PHP plutôt que de créer les tables « à la main » (via PhpMyAdmin par exemple) ? Pensez au travail en équipe…

### Définition du modèle

Vous vous en doutez, si nous avons ajouté un champ dans notre « migration » / « table », nous allons devoir l'ajouter également dans notre modèle ! Pour ça je vous laisse éditer le fichier `app/Models/Todo.php` pour y ajouter :

```php
    protected $fillable = ['texte', 'termine'];
```

Avec cet ajout, nous indiquons à Laravel que nous allons avoir un champ `texte` qui pourra être assigné en automatique lors de la création d'une entrée en base de données.

::: tip optionnel, mais intéressant !
Cette propriété est optionnelle, elle vous autorisera plus tard à faire du « mass-assignment » c'est-à-dire à créer un objet « Todo » depuis par exemple le POST HTTP.
:::

### Créer réellement vos tables

Maintenant que le script est terminé, nous allons indiquer à Laravel d'effectuer « la migration » c'est-à-dire de transformer votre définition PHP en instruction SQL pour créer réellement la base de données.

Retour dans la ligne de commande :

```sh
$ php artisan migrate
[…]
Migrating: YEAR_MONTH_DAY_TIME_create_todos_table
Migrated:  YEAR_MONTH_DAY_TIME_create_todos_table
```

::: warning Un instant
Avec SQLite il n'y a rien à configurer, Laravel a même créé le fichier `database/database.sqlite` pour vous si celui-ci n'existait pas. Si vous décidez plus tard d'utiliser MySQL, c'est dans le `.env` que ça se passera.
:::

Question :

- Que se passe-t-il si vous relancez une seconde fois `php artisan migrate` ? Testez, et expliquez le résultat.

### Vérifier le contenu de votre base

Votre table est créée, mais rien ne vaut une vérification visuelle. Le fichier `database/database.sqlite` contient votre base de données, vous pouvez l'ouvrir avec :

- [DB Browser for SQLite](https://sqlitebrowser.org/) (logiciel gratuit multiplateforme).
- L'extension VSCode [SQLite Viewer](https://marketplace.visualstudio.com/items?itemName=qwtel.sqlite-viewer).
- La vue « Database » de PHPStorm.

Je vous laisse ouvrir le fichier et vérifier que la table `todos` est bien présente avec les bonnes colonnes.

::: tip Gardez cet outil sous la main
Tout au long du TP, vous pourrez vérifier que vos actions (ajout, modification, suppression) ont bien un impact en base de données. C'est un excellent réflexe de développeur.
:::

### Requêter votre table

Pour vous montrer la simplicité de Eloquent, je vous laisse juste avec les appels de méthodes (nous avons vu ça ensemble lors du cours)

::: danger Liste non exhaustive
Vous n’avez ici qu'une petite liste de ce qu'il est possible de faire. Pour voir l'ensemble, je vous suggère plutôt [la documentation officielle](https://laravel.com/docs/11.x/eloquent)
:::

#### Obtenir toutes les données

Voilà un exemple de code pour obtenir l'ensemble des données dans la table `todos`.

```php
$valeursEnBase = Todo::all();
```

#### Obtenir toutes les données avec filtre

Voilà un exemple de code pour obtenir 10 lignes de données avec un filtre et trié par `id`.

```php
$valeursFiltre = Todo::where('texte', "YOLO")->orderBy('id')->take(10)->get();
```

::: danger Ce ne sont que des exemples

Vous avez ici des exemples, ça ne sert à rien de les prendre maintenant. Nous allons les utiliser **dans votre contrôleur**.

:::

Question :

- À votre avis, quelle requête SQL est générée par `Todo::all()` ? Et par la version avec filtre ?

#### Utiliser les données depuis votre « vue »

Et c'est tellement simple que si vous souhaitez tout récupérer pour utiliser les données il vous suffit de faire :

```php
public function listTodo(Request $request){
  // Retourne à l'utilisateur le template nommés « monLayout » avec dedans une variable nommé `$todos` qui contiendra l'ensemble des éléments dans la table
  // Votre template devra utiliser cette variable avec par exemple un @foreach($todos as $todo) … @endforeach
  return view("monLayout", ["todos" => Todo::all()]);
}
```

::: danger Un instant ✋

En PHP objet il y a la notion de namespace, Laravel utilise de base les namespace, ça veut dire que nous allons avoir à utiliser le mot clé `use` pour importer (include). Quand vous voulez utiliser une classe qui n'est pas dans le même fichier, il faudra déclarer l'emplacement via un `use`. Exemple, pour que `Todo` soit accessible depuis le contrôleur, il faudra :

```php
use App\Models\Todo;
```

- ⚠️ Si vous utilisez **PHPStorm,** cet import sera automatique.
- ⚠️ Si vous utilisez **VSCode,** il faudra passer par une extension [disponible ici](https://marketplace.visualstudio.com/items?itemName=MehediDracula.php-namespace-resolver)

Pour **PHPStorm**, alt+entrée permettra de déclencher l'ajout du use.

Pour **VSCode** je vous laisse regarder l'usage de l'extension :

![Namespace Resolver](../../cheatsheets/laravel/res/namespace_resolver.gif)

:::

#### Créer des données depuis un formulaire en POST

```php
public function addTodo(Request $request){
  // $request contient l'ensemble des données envoyées par le formulaire
  // request()->all() retourne un tableau associatif avec l'ensemble des données
  Todo::create($request->all());
  return redirect("/todo");
}
```

## La TODO List

À partir de maintenant vous avez tout ce qu'il faut pour interroger votre base de données… Et oui c'est aussi simple que ça ! Pour la suite je vous laisse écrire le code par vous-même, mais la procédure va être la suivante :

- Créer un contrôleur « TodoControleur ».
- Créer la `Vue` (template blade) associée à votre contrôleur.
- Ajouter la route qui permettra d'accéder à cette page.
- Ajouter une méthode qui va afficher l'ensemble des entrées présent dans votre base de données (affichage dans une `table` HTML).
- Ajouter un formulaire dans votre `Vue` permettant d'ajouter des données dans la table.

::: tip Un instant

Nous l'avons vu en cours, la syntaxe du moteur de template blade. Ici il faudra donc bien utiliser Blade pour générer **votre page**, et plus particulièrement [les directives de blades](/cheatsheets/laravel/#les-directives). Vous allez devoir utiliser la boucle `Foreach`, la notation est rappelée dans l'aide mémoire. Mais voilà une idée de ce qu'il faudra faire :

```html
<table>
  @foreach($LaVariableAvecLesValeursEnBase as $unElement)
  <tr>
    <td>{{$unElement->texte}}</td>
  </tr>
  @endforeach
</table>
```

:::

::: danger N'oubliez pas
Utilisez `@extends('layouts.base')` pour « hériter » de votre layout principal.
:::

::: danger N'oubliez pas le CSRF
Je vous ai parlé de la sécurité non ? Laravel intègre directement la protection anti-rejeux. Pour pouvoir valider votre formulaire, vous allez devoir intégrer dans votre formulaire une petite annotation.

`@csrf`

Exemple :

```html
<form method="POST" action="/VOTRE-ACTION-DEFINIE-DANS-LES-ROUTES">
  @csrf

  <!-- La suite de votre formulaire -->
</form>
```

PS: Je vous laisse constater l'impact dans le code **en observant le code source via votre navigateur**.

[Plus d'information](https://laravel.com/docs/11.x/csrf)

:::

::: tip Point de contrôle

À ce stade vous devez pouvoir ajouter une TODO via votre formulaire, la voir apparaître dans la liste, **et** la retrouver dans votre base via votre outil SQLite. Vérifiez avant de continuer.

:::

### Changer l'état d'une TODO

En utilisant [l'aide mémoire](/cheatsheets/laravel/) et la [documentation de Laravel](https://laravel.com/docs/11.x/eloquent) ajoutez :

- Une action permettant de marquer « comme terminer » une TODO. (l'action peut-être un lien, ou un bouton)
- Cette action doit être mise dans le bon contrôleur

::: tip Rappel

```php
// Rechercher celui avec l’id « L'ID QUE VOUS SOUHAITEZ MODIFIER » (Exemple : 1)
$todo = Todo::find("L'ID QUE VOUS SOUHAITEZ MODIFIER");

// Le passer à terminer
$todo->termine = true;

// Le sauvegarder en base de données. (Ici Eloquent va générer une requête de type UPDATE)
$todo->save();
```

#### Besoin d'aide ?

Je ne vais pas vous donner le code. Mais plutôt la procédure, vous devez :

- Pour chaque ligne de votre tableau : ajouter un lien qui permettra de modifier l'état d'un élément en base. Le lien peut-être du type <code v-pre>`/todo/terminer/{{ $unElement->id}}`</code>.
- Ajout d'une route permettant de faire fonctionner le lien. Exemple : <code v-pre>`Route::get('/todo/terminer/{id}', [TodoControleur::class, 'markAsDone']);`</code>.
- Ajouter la méthode `markAsDone` dans votre contrôleur `public function markAsDone($id)`, celle-ci va réaliser l'action de marquer comme « terminer » pour la TODO `$id`
- À la fin du traitement, vous devez rediriger le demandeur avec `return redirect("/todo");`

:::

### Supprimer une TODO

En utilisant [l'aide mémoire](/cheatsheets/laravel/) et la [documentation de Laravel,](https://laravel.com/docs/11.x/eloquent) ajoutez :

- Une action permettant de marquer « supprimer » une TODO.
- Cette action doit être mise dans le bon contrôleur.

::: tip Rappel

```php
// Façon 1
// Rechercher celui avec l’id 1
$todo = Todo::find(1);
$todo->delete(); // Le supprimer

// Façon 2
// Le supprimer directement
Todo::destroy(1);

// Façon 3
// En supprimer plusieurs directement
Todo::destroy(1,2,3);

// Façon 4
// Supprimer avec une condition
Todo::where('termine', '=', 1)->delete();
```

N'oubliez pas la sécurité. Et n'oubliez pas également qu'il ne doit pas être possible de supprimer une TODO qui n'est pas terminée en base de données.

:::

::: details Besoin d'aide ?

Ici pas de code, mais la procédure sera identique à celle de l'action terminer.

:::

### Améliorer le retour utilisateur

Dans le TP d'introduction, nous avons vu les **messages flash**. Je vous laisse les intégrer dans votre TODO List :

- Un message de succès après l'ajout d'une TODO.
- Un message de succès après la suppression.
- Un message d'erreur si l'utilisateur tente de supprimer une TODO non terminée.

::: details Un trou de mémoire sur les messages flash ?

Côté contrôleur :

```php
return redirect("/todo")->with('success', 'La TODO a bien été ajoutée');
```

Côté vue :

```html
@if(session('success'))
<div style="color: green;">{{ session('success') }}</div>
@endif
```

:::

### Créer un Middleware

Pour tester les middleware, nous allons créer un Middleware qui va vérifier la présence d'un mot dans le texte de la TODO. Si le mot est présent, la TODO ne pourra pas être ajoutée en base de données.

Pour commencer, créez un Middleware :

```sh
php artisan make:middleware CheckTodo
```

Ajoutez la logique dans le Middleware :

```php
public function handle(Request $request, Closure $next)
{
    if (strpos($request->texte, 'twitter') !== false) {
        return redirect()->back()->with('error', 'Le mot twitter est interdit');
    }

    return $next($request);
}
```

Ajouter le Middleware sur la route que vous souhaitez protéger :

```php
->middleware(CheckTodo::class)
```

::: tip Besoin d'aide ?

Je vous laisse implémenter le code dans votre projet. Si vous avez des questions, je suis là pour vous aider.

Le système de middleware est très puissant, c'est un peu comme un filtre qui va être exécuté avant ou après une action. C'est très utile pour la sécurité, la gestion des erreurs, etc.

:::

Question :

- À votre avis, pourquoi placer ce contrôle dans un Middleware plutôt que directement dans la méthode `addTodo` du contrôleur ?

## Un formulaire de contact

J'aimerais que notre petit site de démonstration intègre un formulaire de demande de contact. Je vous laisse réfléchir comment réaliser l'opération, quelques pistes pour débuter :

- Le formulaire doit être en HTML.
- Les demandes faites via le formulaire doivent être sauvegardées en base de données (table spécifique, avec un id, un titre, un texte, un email et les dates).
- L'ajout doit être fait par un modèle.
- Vous devez créer un contrôleur spécifique pour réaliser l'opération.
- Un message flash doit être affiché pour indiquer à l'utilisateur que sa demande a bien été prise en compte.
- Un message flash doit être affiché pour indiquer à l'utilisateur que sa demande n'a pas été prise en compte.

C'est à vous ! Je suis là si besoin 🚀.

::: tip Prenez du recul

Ce formulaire de contact, c'est un mini-projet complet : migration + modèle + contrôleur + routes + vue. Exactement le même cheminement que pour la TODO List. Si vous savez le refaire seul, vous avez compris la mécanique de Laravel.

:::

## Conclusion

Dans ce TP vous avez découvert toute la chaîne de persistance de Laravel :

- Les **migrations** pour définir (et versionner) la structure de votre base de données.
- Les **modèles** et **Eloquent** pour manipuler vos données sans écrire de SQL.
- Un CRUD complet (Create, Read, Update, Delete) avec la TODO List.
- Les **middlewares** pour filtrer les requêtes.

N'oubliez pas de **commiter votre projet**, nous allons le réutiliser dans le TP suivant.

Justement, la suite : notre TODO List est accessible à tout le monde… Il est temps de protéger tout ça avec un système d'authentification. Rendez-vous dans le TP [Comprendre l'authentification](./authentification_manuelle.md).
