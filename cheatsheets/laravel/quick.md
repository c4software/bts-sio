# Aide Laravel

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
// New 
$flight = new Flight;
$flight->name = $request->name;
$flight->save();

// Update 
$flight = Flight::find(1);
$flight->name = 'New Flight Name';
$flight->save();

// Create
$user = User::create(['first_name' => 'Taylor','last_name' => 'Otwell']); 

// Update All:  
Flight::where('active', 1)->update(['delayed' => 1]);

// Delete 
$current_user = User::Find(1)
$current_user.delete(); 

// Delete by id:  
User::destroy(1);

// Delete all
$deletedRows = Flight::where('active', 0)->delete();

// Get All 
$items = Item::all(). 

// Find one by primary key
$flight = Flight::find(1);

// display 404 if not found
$model = Flight::findOrFail(1); 

// Get last entry
$items = Item::latest()->get()

// Chain 
$flights = App\Flight::where('active', 1)->orderBy('name', 'desc')->take(10)->get();

// Where
Todo::where('id', $id)->firstOrFail()  

// Like 
Todos::where('name', 'like', '%' . $my . '%')->get()

// Or where
Todos::where('name', 'mike')->orWhere('title', '=', 'Admin')->get();

// Count
$count = Flight::where('active', 1)->count();

// Sum
$sum = Flight::where('active', 1)->sum('price');

// Contain?
if ($project->$users->contains('mike')) 
```

## Les routes

```php
// Fermeture de la route de base
Route::get('/greeting', function () {
    return 'Hello World';
});

// Raccourci de la vue directe de la route
Route::view('/welcome', 'welcome');

// Route vers la classe du contrôleur
utiliser App\Http\Controllers\UserController;
Route::get('/user', [UserController::class, 'index']);

// Route uniquement pour des verbes HTTP spécifiques
Route::match(['get', 'post'], '/', function () {
    //
});

// Route pour tous les verbes (GET, POST, PUT, DELETE, ...)
Route::any('/', function () {
    //
});

// Route Redirect
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

GET /photos index photos.index
GET /photos/create create photos.create
POST /photos store photos.store
GET /photos/{photo} show photos.show
GET /photos/{photo}/edit edit photos.edit
PUT/PATCH /photos/{photo} mettre à jour les photos.update
DELETE /photos/{photo} destroy photos.destroy

// Ressource imbriquée
Route::resource('photos.comments', PhotoCommentController::class);

// Ressource partielle
Route::resource('photos', PhotoController::class)->only([
    'index', 'show
]);

Route::resource('photos', PhotoController::class)->except([
    créer', 'stocker', 'mettre à jour', 'détruire'].
]);

// URL avec le nom de la route
$url = route('profile', ['id' => 1]);

// Génération de redirections...
return redirect()->route('profile');

// Groupe de préfixes de route
Route::prefix('admin')->group(function () {
    Route::get('/users', function () {
        // Correspond à l'URL "/admin/users".
    });
});

// Liaison du modèle de route
utiliser App\Models\User;
Route::get('/users/{user}', function (User $user) {
    return $user->email;
});

// Liaison du modèle de route (autre que l'identifiant)
utiliser App\Models\User;
Route::get('/posts/{post:slug}', function (Post $post) {
    return view('post', ['post' => $post]);
});

// Route fallback
Route::fallback(function () {
    //
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

// Paramètres de requête www.demo.html?name=mike
request()->nom //mike

// Données du formulaire (ou valeur par défaut)
request()->input('email', 'no@email.com')
```

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

<!-- Current user -->
{{ Auth::user()->name }}

<!-- Validations errors -->
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

<!-- Repopulate form with data from previous request -->
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