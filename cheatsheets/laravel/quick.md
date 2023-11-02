# Aide Laravel

::: details Table des matières
[[toc]]
:::

Cette page est un résumé rapide des fonctionnalités Laravel qui peuvent vous être utiles. Pour plus de détail :

- [Support de cours](/cours/laravel.md)
- [Laravel - Complément cours](/cheatsheets/laravel/)
- [Laravel - Introduction](/tp/laravel/introduction.md)
- [Laravel - Authentification](/tp/laravel/authentification.md)

## Démarrer le serveur

```sh
php artisan serve
```

Ou depuis n'importe où sur le réseau :

```sh
php artisan serve --host=0.0.0.0
```

::: tip Host ?

0.0.0.0 est l'adresse IP de la machine locale. Cela signifie que le serveur sera accessible depuis n'importe quelle adresse IP de la machine locale.

Exemple, depuis le Wifi ou depuis un autre ordinateur ou mobile sur le réseau local.

:::

## Les projets

```shell
// Nouveau projet
composer create-project laravel/laravel projectName

// Lancement du serveur/projet
php artisan serve

// Liste de commandes
php artisan list

// Aide sur les commandes
php artisan help migrate

// console Laravel
php artisan tinker

// Liste des routes
php artisan route:list
```

## Commande de base

```shell
// Migration de la base de données
$ php artisan migrate

// Ensemencement des données
$ php artisan db:seed

// Migration de la table de création
$ php artisan make:migration create_products_table

// Créer à partir du modèle avec des options : 
// -m (migration), -c (contrôleur), -r (contrôleurs de ressources), -f (factory), -s (seeder)
$ php artisan make:model Product -mcf

// Créez un contrôleur
$ php artisan make:controller ProductsController

// Mise à jour de la migration des tables
$ php artisan make:migration add_date_to_blogposts_table

// Retour à la dernière migration
php artisan migrate:rollback

// Annule toutes les migrations
php artisan migrate:reset

// Annule tout et refait la migration
php artisan migrate:refresh

// Annuler toutes les migrations, migrer à nouveau et ensemencer
php artisan migrate:refresh --seed
```

## Les migrations

```shell
// Créer une table de données 
$ php artisan make:migration create_products_table
```

```php
// Création d'une table (exemple de migration)
Schema::create('products', function (Blueprint $table) {
    // Clé primaire auto-incrémentée
    $table->id();
    // created_at et updated_at
    $table->timestamps();
    // Contrainte d'unicité
    $table->chaîne('modelNo')->unique();
    // Non requis
    $table->text('description')->nullable();
    // Valeur par défaut
    $table->boolean('isActive')->default(true); 
    // Index
    $table->index(['account_id', 'created_at']);
    // Relation de clé étrangère
    $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
});
```

```shell
// Mise à jour de la table (exemple de migration)
$ php artisan make:migration add_comment_to_products_table
```

```php
// up()
Schema::table('users', function (Blueprint $table) {
    $table->text('comment');
});

// down()
Schema::table('users', function (Blueprint $table) {
    $table->dropColumn('comment');
});
```

## Les modèles

```shell
// Attributs exclus de la liste. affectation de masse du modèle
protected $guarded = []; // empty == All

// Ou liste des attributs inclus
protected $fillable = ['name', 'email', 'password',];


// Relation One to Many (articles avec de nombreux commentaires)
public function comments() 
{
    return $this->hasMany(Comment:class); 
}

// Relation "One to Many" (commentaires avec un article) 
public function post() 
{                            
    return $this->belongTo(Post::class); 
}

// Relation One to one (Auteur avec un Profil)
public function profile() 
{
    return $this->hasOne(Profile::class); 
}

// Relation One to one (Un Profil à un auteur) 
public function author() 
{                            
    return $this->belongTo(Author::class); 
}

// Relation Many to Many
// 3 tables (posts, tags et post_tag)
// post_tag (post_id, tag_id)

// dans le modèle Tag...
public function posts()
{
    return $this->belongsToMany(Post::class);
}

// dans le modèle Post...
public function tags()
{
    return $this->belongsToMany(Tag::class);
}
```

## Générer les modèles

Il est également possible de générer les modèles à partir de la base de données. Cette fonctionnalitée n'est pas disponible de base dans Laravel, il faut donc installer une dépendance supplémentaire :

```sh
composer require reliese/laravel --dev
php artisan vendor:publish --tag=reliese-models
php artisan config:clear
```

Le plugin en question [Reliese Laravel Model Generator](https://github.com/reliese/laravel). Je vous laisse regarder la documentation pour plus d'informations.

::: tip Attention

Autoriser les factories.

Pour permettre à votre Modèle d'être « rempli », vous devez vérifier que la classe possède bien les use suivants (à mettre dans la classe du modèle) :

```php
use HasApiTokens, HasFactory, Notifiable;
```

::: details Exemple

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Client extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    // ... le reste du code
}
```

:::

:::

## Remplir une base de données (données fictives)

### Factory

Comment nous allons remplir. (définition)

```php
// ex: database/factories/ProductFactory.php
public function definition() {
    return [
        'name' => $this->faker->text(20),
        'price' => $this->faker->numberBetween(10, 10000),
    ];
}
// all fakers options : https://github.com/fzaninotto/Faker
```

### Seeder

Ce que nous allons remplir réellement.

```php
// ex: database/seeders/DatabaseSeeder.php
public function run() {
    Product::factory(10)->create();
}
```

```shell
$ php artisan db:seed
// or with migration
$ php artisan migrate --seed
```

## L'ORM

```php
// Créer un enregistrement en base de données
$flight = new Flight;
$flight->name = $request->name;
$flight->save();

// Mettre à jour un enregistrement en base de données
$flight = Flight::find(1);
$flight->name = 'New Flight Name';
$flight->save();

// Créer un enregistrement en base de données à partir d'un tableau (mass assignment). Le tableau peut être rempli avec des données de formulaire
$user = User::create(['first_name' => 'Taylor','last_name' => 'Otwell']); 

// Mettre à jour un enregistrement en base de données à partir d'un tableau (mass assignment). Le tableau peut être rempli avec des données de formulaire
Flight::where('active', 1)->update(['delayed' => 1]);

// Supprimer un enregistrement en base de données
$current_user = User::Find(1); // On récupère l'utilisateur
$current_user->delete();  // On le supprime

// Supprimer un enregistrement en base de données à partir de son id 
User::destroy(1);

// Supprimer plusieurs enregistrements en base de données
$deletedRows = Flight::where('active', 0)->delete();

// Obtenir tous les enregistrements d'une table équivaut à SELECT * FROM table
$items = Item::all(). 

// Trouver un enregistrement en base de données à partir de son id (équivaut à SELECT * FROM table WHERE id = $id). La colonne id est définit dans votre modèle (protected $primaryKey = 'id';)
$flight = Flight::find(1);

// Obtiens l'enregistrement avec l'id 1 ou lève une exception
$model = Flight::findOrFail(1); 

// Obtient le dernier enregistrement de la table
$items = Item::latest()->get()

// Réaliser une requête personnalisée. Trouve tous les enregistrements actifs et les trie par nom dans l'ordre décroissant. Limite le nombre de résultats à 10
$flights = App\Flight::where('active', 1)->orderBy('name', 'desc')->take(10)->get();

// Cherche un enregistrement en base de données à partir de son id. Si l'enregistrement n'existe pas la requête renvoi une exception
Todo::where('id', $id)->firstOrFail()  

// Réaliser un where de type LIKE
Todos::where('name', 'like', '%' . $my . '%')->get()

// Réalise une requête avec plusieurs conditions de type OR
Todos::where('name', 'mike')->orWhere('title', '=', 'Admin')->get();

// Réalise une requête avec plusieurs conditions de type AND
Todos::where('name', 'mike')->where('title', '=', 'Admin')->get();

// Compter le nombre d'enregistrements
$count = Flight::where('active', 1)->count();

// Somme des valeurs de la colonne price
$sum = Flight::where('active', 1)->sum('price');

// Est-ce que l'enregistrement existe en base de données ?
if ($project->$users->contains('mike')) {}

// Choisir les colonnes à récupérer
$users = User::select('name', 'email as user_email')->get();

// Choisir les colonnes à récupérer avec une condition
$users = User::select('name', 'email as user_email')->where('name', 'John')->get();
```

::: tip La documentation officielle de Laravel sur l'ORM
Pour aller plus loins, vous trouverez dans la documentation officielle de Laravel une liste des méthodes / ainsi que leurs utilisations :

[https://laravel.com/docs/8.x/eloquent](https://laravel.com/docs/8.x/eloquent)
:::

## L'ORM (Relations)

```php
// Obtenir les commentaires d'un article
$commentairesArticle = App\Models\Article::find($id)->comments()->get();

// Obtenir les articles d'un utilisateur
$articlesUtilisateur = App\Models\User::find($id)->articles()->get();

// Obtenir les Utilisateurs avec leurs articles
$users = App\Models\User::with('articles')->get();

// Obtenir les Utilisateurs avec leurs articles et leurs commentaires
$users = App\Models\User::with('articles.comments')->get();

// Réaliser la jointure à la main entre les tables (en dernier recours, si vous ne pouvez pas utiliser les relations)
$users = App\Models\User::join('articles', 'users.id', '=', 'articles.user_id')->get();

// Obtenir les articles d'un utilisateur avec une condition
$articlesUtilisateur = App\Models\User::find($id)->articles()->where('title', 'like', '%test%')->get();

// Plusieurs with, récupère les articles et les commentaires de chaque utilisateur
$users = App\Models\User::with('articles', 'comments')->get();

// Ajouter un commentaire à un post
$comment = new App\Comment(['message' => 'A new comment.']);
$post = App\Post::find(1);
$post->comments()->save($comment);

// Ajouter un commentaire à un post avec un utilisateur
$comment = new App\Comment(['message' => 'A new comment.']);
$user = App\User::find(1);
$post = App\Post::find(1);
$post->comments()->save($comment, ['user_id' => $user->id]);

// Attacher un rôle à un utilisateur
$user = App\User::find(1);
$user->roles()->attach($roleId);

// Attacher des roles à un utilisateur nouvellement créé
$user = App\User::create($attributes);
$user->roles()->attach([1, 2, 3]);

// Syncroniser les rôles d'un utilisateur (remplace les rôles existants)
$user->roles()->sync([1, 2, 3]);
```

**Rappel** : Les relations sont définies dans le modèle (belongsTo, hasMany, ...).

::: tip `with()`

Le `with()` permet de récupérer les données d'une autre table. Vous pouvez également déclarer le `with()` dans le modèle. 

Exemple, **dans le modèle `Commande`** :

```php
$with = ['produit'];
```

En indiquant le `$with` dans le modèle, votre jointure sera automatiquement effectuée. Vous n'aurez plus besoin de passer par le `with()` dans le contrôleur. Pratique pour automatiser les jointures.

:::

## Les routes

```php
// Route avec la méthode directement dans le routeur (pas de contrôleur)
Route::get('/greeting', function () {
    return 'Hello World';
});

// Raccourci permettant de retourner une vue directement (pas de contrôleur)
Route::view('/welcome', 'welcome');

// Route vers la classe du contrôleur (méthode index)
utiliser App\Http\Controllers\UserController;
Route::get('/user', [UserController::class, 'index']);

// Route uniquement pour des verbes HTTP spécifiques (GET, POST, PUT, DELETE, ...)
Route::match(['get', 'post'], '/', function () {
    //
});

// Route pour tous les verbes (GET, POST, PUT, DELETE, ...)
Route::any('/', function () {
    //
});

// Route de type redirection
Route::redirect('/clients', '/customers');


// Paramètres de la route
Route::get('/user/{id}', function ($id) {
    return 'Utilisateur '.$id;
});

// Paramètre optionnel
Route::get('/user/{name?}', function ($name = 'John') {
    return $name;
});

// Route nommée
Route::get(
    '/utilisateur/profil',
    [UserProfileController::class, 'show']
)->name('profile');

// Ressource
Route::resource('photos', PhotoController::class);

// Génération des routeus suivantes :
/*
GET /photos index photos.index
GET /photos/create create photos.create
POST /photos store photos.store
GET /photos/{photo} show photos.show
GET /photos/{photo}/edit edit photos.edit
PUT/PATCH /photos/{photo} mettre à jour les photos.update
DELETE /photos/{photo} destroy photos.destroy
*/

// Ressource imbriquée
Route::resource('photos.comments', PhotoCommentController::class);

// Ressource partielle (uniquement les méthodes index et show seront accessibles)
Route::resource('photos', PhotoController::class)->only(['index', 'show']);

// Ressource partielle (toutes les méthodes sauf index et show seront accessibles)
Route::resource('photos', PhotoController::class)->except(['create', 'save', 'update', 'destroy']);

// Génération d'une URL à partir du nom de la route
$url = route('profile', ['id' => 1]);

// Retourne une redirection vers la route nommée
return redirect()->route('profile');

// Groupe de route
Route::prefix('admin')->group(function () {
    Route::get('/users', function () {
        // Méthode accessible par
        // l'URL "/admin/users".
    });
});

// Permet de relier un modèle à une route (identifiant)
utiliser App\Models\User;
Route::get('/users/{user}', function (User $user) {
    return $user->email;
});

// Liaison du modèle de route (autre que l'identifiant)
utiliser App\Models\User;
Route::get('/posts/{post:slug}', function (Post $post) {
    return view('post', ['post' => $post]);
});

// Route fallback (404)
Route::fallback(function () {
    // Équivalent à la route par défaut
});
```

## Les contrôleurs

```php
// Définir les règles de validation 
protected $rules = [
    title' => 'required|unique:posts|max:255',
    name' => 'required|min:6',
    'email' => 'required|email',
    'publish_at' => 'nullable|date',
];

// Valider
$validatedData = $request->validate($rules)

// Affiche la page d'erreur 404
abort(404, 'Sorry, Post not found')

// Exemple de contrôleur CRUD
Classe ProductsController
{

   public function index()
   {
       $produits = Product::all();

       // app/resources/views/produits/index.blade.php
       return view('products.index', ['products', $products]); 
   }

   public function create()
   {
       return view('produits.create');
   }

   public function store()
   {
       Product::create(request()->validate([
           name' => 'required',
           price' => 'required',
           note' => 'nullable
       ]));

       return redirect(route('products.index'));
   }

   //méthode avec injection de modèle
   public function show(Produit $produit)
   {
       return view('produits.show', ['produit', $produit]); 
   }

   public function edit(Product $product)
   {
       return view('produits.edit', ['produit', $produit]); 
   }

   public function update(Product $product)
   {
       Product::update(request()->validate([
           name' => 'required',
           price' => 'required',
           note' => 'nullable
       ]));

       return redirect(route($product->path()));
   }

   public function delete(Product $product)
   {
        $produit->supprimer();
        return redirect("/contacts");
   }
}
```

## Lire les données d'un formulaire

Dans la méthode du contrôleur, vous pouvez récupérer les données d'un formulaire de plusieurs manières :

```php
// Via la $request
function votreMethode(Request $request){
    // Récupérer toutes les données du formulaire
    $request->all(); // Récupère un tableau associatif de toutes les données du formulaire (clé => valeur)

    // Récupérer une donnée du formulaire
    $request->input('name'); // Récupère la valeur de la donnée "name" du formulaire

    // Récupérer une donnée du formulaire avec une valeur par défaut
    $request->input('name', 'John'); // Récupère la valeur de la donnée "name" du formulaire. Si la donnée n'existe pas, la valeur par défaut est "John"

    // Paramètres de requête www.demo.html?name=mike
    request()->nom; //mike

    // Données du formulaire (ou valeur par défaut)
    request()->input('email', 'no@email.com');

    // Récupérer toutes les données du formulaire
    request()->all();
}

// Via le mapping des paramètres de la méthode
function votreMethode($name, $email){
    // Récupérer une donnée du formulaire
    $name; // Récupère la valeur de la donnée "name" du formulaire
    $email; // Récupère la valeur de la donnée "email" du formulaire
}
```

## Les retours possible d'une méthode

```php
// Retourne une vue
return view('view.name', ['name' => 'John']);

// Retourne une vue avec un message flash (session)
return redirect('/home')->with('status', 'Task was successful!');

// Retourn une redirection vers une route nommée
return redirect()->route('profile');

// Retourne une redirection vers une route nommée avec des paramètres
return redirect()->route('profile', ['id' => 1]);

// Retourne une redirection vers une route nommée avec des paramètres et un message flash
return redirect()->route('profile', ['id' => 1])->with('status', 'Task was successful!');

// Retourner une réponse JSON
$user = App\Models\User::find(1);
return response()->json($user);
```

[En savoir plus](https://laravel.com/docs/10.x/requests#retrieving-input)

## Blade (les templates, la vue)

```php
<!-- Nom de la route -->
<a href="{{ route('routeName.show', $id) }}">

<!-- Héritage du modèle -->
@yield('content') <!-- layout.blade.php -->
@extends('layout')
@section('content') ... @endsection

<!-- Template include -->
@include('view.name', ['name' => 'John'])

<!-- Modèle de variable -->
{{ var_name }} 

<!-- Variable html raw safe --> 
{ ! ! var_name ! ! }

<!-- Interation -->
@foreach ($items as $item)
   {{ $item.name }}
   @if($loop->last) 
       $loop->index 
   @endif
@endforeach

<!-- Conditionnel -->
@if ($post->id === 1) 
    'Post one' 
@elseif ($post->id === 2)
    'Publier deux !'
@else 
    Autre 
@endif

<!-- Formulaire -->
<form method="POST" action="{{ route('posts.store') }}">
@csrf

<!-- Correspondance du chemin de la requête -->
{{ request()->is('posts*') ? 'current page' : 'not current page' }} 

<!-- Route exist? -->
@if (Route::has('login'))

<!-- Auth blade variable -->
@auth 
@endauth 
@guest

<!-- Utilisateur courant -->
{{ Auth::user()->name }}

<!-- Vérifier l'authentification -->
@auth
    // L'utilisateur est connecté
@endauth

<!-- Gestion des erreurs -->
@if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

<!-- Check a specific attributes -->
<input id="title" type="text" class="@error('title') is-invalid @enderror">

<!-- Remettre les données du précédent submit -->
{{ old('name') }}
```

## La session

```php
// Flash (uniquement pour la prochaine demande)
$request->session()->flash('status', 'Task was successful!');

// Flash avec redirection
return redirect('/home')->with('success' => 'email sent!');

// Définir la session
$request->session()->put('key', 'value');

// Récupération de la session
$value = session('key');
Si session : if ($request->session()->has('users'))

// Suppression de la session
$request->session()->forget('key');

// Afficher le flash dans le modèle 
@if (session('message')) {{ session('message') }} @endif
```

## Cache

```php
// Mise en cache des routes
php artisan route:cache

// Récupération et stockage (clé, durée, contenu)
$users = Cache::remember('users', now()->addMinutes(5), function () {
    return DB::table('users')->get();
});
```

[Source et plus de commandes](https://dev.to/ericchapman/my-beloved-laravel-cheat-sheet-3l73)

## Les composants

Pour créer un composant :

```sh
php artisan make:component VotreComposant
```

Cette commande va créer le squelette de votre composant :

- `app/View/Components/VotreComposant.php` : Le composant en lui-même (la logique, les données, etc)
- `resources/views/components/votre-composant.blade.php` : La vue du composant (le contenu, le HTML en lui-même)

Le composant sera ensuite utilisable dans vos vues :

```php
<x-votre-composant />
```

::: tip Je veux passer des données à mon composant

Pour passer des données à votre composant, il suffit d'ajouter le nom de l'attribut dans le constructeur de votre composant :

```php
public function __construct(public string $nom)
{
}
```

Et dans votre vue de composant, vous pouvez utiliser la variable `$nom` :

```php
{{ $nom }}
```

Exemple d'utilisation :

```php
<x-votre-composant nom="John" />
```

:::