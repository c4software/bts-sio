---
description: Nous avons vu dans le TP introduction qu'il était très simple de créer un petit site avec Laravel. L'autre problème que Laravel résout « simplement » c'est la partie authentification.
---

# Laravel & l'authentification

Nous avons vu dans [le TP introduction](./introduction.md) qu'il était très simple de créer un petit site avec Laravel. L'autre problème que Laravel résout « simplement » c'est la partie authentification.

La gestion des utilisateurs est en effet un élément complexe d'une application entre :

- L'authentification.
- Limiter l'accès à certaines ressources.
- La sécurité des mots de passe.
- La gestion du mot de passe oubliée.
- …

Vous l'avez compris, la liste est longue… Vous pouvez évidemment tout coder vous-même! Mais nous allons le voir la force de Laravel c'est également ça, intégrer l'ensemble des briques pour une application qualitative dans les standards du marché.

::: details Sommaire
[[toc]]
:::

## Créer votre projet

Pour cette étape, je vous laisse suivre le début du [précédent TP](./introduction.md).

**Attention** a bien installer au moins la version >10 de Laravel.

## Installer la laravel debug bar

Vous avez remarqué que les pages d'erreurs de Laravel sont toujours pleines de bonnes informations. Avec Laravel nous pouvons avoir « encore mieux », vous avez à votre disposition une extension à Laravel qui vous permettra de voir :

- Le contenu de la session.
- Les requêtes SQL réalisé par l'ORM.
- …

![Debug bar](./ressources/debug_bar.png)

Après installation cette barre va apparaître automatiquement en bas de votre site Laravel (évidemment uniquement le temps du développement). Pour l'installer la commande est la suivante :

```sh
composer require barryvdh/laravel-debugbar --dev
```

::: warning

La Debugbar sera automatiquement active quand APP_DEBUG est à `true`.

:::

[En savoir plus](https://github.com/barryvdh/laravel-debugbar)

## Ajout de l'authentification

Nous allons intégrer l'authentification en utilisant [Laravel Breeze](https://laravel.com/docs/10.x/starter-kits#laravel-breeze) ce paquet `Composer` va ajouter l'ensemble des :

- Routes
- Contrôleur
- Vue (templates blades)

Permettant de gérer simplement l'ensemble des problématiques.

::: warning Nous avons plusieurs choix

Laravel Breeze n'est pas la seule option, vous avez également : [Laravel Jetstream](https://jetstream.laravel.com/introduction.html) qui est plus complet, mais également plus complexe à mettre en place. Pour l'instant nous allons nous concentrer sur Breeze, mais vous pouvez regarder Jetstream si vous le souhaitez (je vous conseille cependant de débuter avec Breeze, Jetstream est réellement plus complexe à mettre en place).

:::

### Ajout de la dépendance

::: tip Un instant

**Attention** pour que breeze s'installe il vous faut NPM, vous devez avoir `NodeJS`. Si vous ne l'avez pas, vous pouvez le télécharger [ici](https://nodejs.org/).

:::

L'ajout de dépendances, pour cette étape aucun problème, il suffit d'ajouter dans votre projet « breeze » dans le dossier de votre projet :

```sh
composer require laravel/breeze --dev
```

Une fois ajoutée, nous allons devoir installer breeze pour que celui-ci active l'ensemble des fonctionnalités :

```sh
php artisan migrate

php artisan breeze:install

php artisan migrate
```

La commande `breeze:install` va vous poser quelques questions, voici les réponses que vous pouvez donner :

![Laravel Breeze](./ressources/auth_breeze_setup.jpg)

::: tip Vous avez vu ?

Nous venons d'ajouter de nouvelles routes, celles-ci sont dans le dossier `route/auth.php` **,mais ce n'est pas tout** vous avez également maintenant l'ensemble des contrôleurs, mais également l'ensemble des `Layout Blade` nécessaires à toute la partie authentification.

Pour le reste c'est dans les dossiers que vous connaissez déjà.
:::

Lors de cette phase d'installation, Breeze va rajouter un ensemble de dépendances JavaScript (Vite, Alpine, Tailwind). Ne vous inquiétez pas, tout est déjà configuré, vous n'avez rien à faire.

### L'UI

Si vous lancez dès maintenant votre projet via la commande `php artisan serve` vous allez voir que votre page d'accueil intègre maintenant deux nouveaux liens :

![Laravel Breeze](./ressources/laravel_auth_breeze.png)

Vous pouvez cliquer dès à présent sur les différents liens, **cependant** les fichiers que vous avez ajoutés avec Breeze reposent sur un « framework UI » autre que Bootstrap celui-ci se nomme [Tailwind](https://tailwindcss.com/) l'approche de Laravel est moderne et Tailwind repose sur un concept similaire à Bootstrap, mais en ce focalisant plus sur un système de classes `css` que l'on va appeler « utilitaire ».

Nous allons donc avoir besoin de `node`, mais surtout de `npm` pour compiler l'ensemble des ressources nécessaires au bon fonctionnement de l'interface ajouté. Si vous avez déjà pratiqué `node` et `npm` vous savez peut-être que ces outils sont plus utilisés dans le monde du JavaScript que du PHP ; rien d'étonnant dans notre cas, nous allons utilisé `npm` pour ajouter l'ensemble des dépendances UI de notre projet, mais également les « compiler » / « packager » dans un gros fichier CSS et JS pour nos clients.

::: tip ✋ Un instant !

Notre projet va contenir seulement Tailwind après installation, si vous souhaitez avoir également Bootstrap vous avez deux options :

- Ajouter les librairies Bootstrap via le CDN de votre choix.
- Ajouter Bootstrap dans les dépendances npm de votre projet. (à faire via le `package.json` et `webpack.mix.js`, attention c'est plus complexe)

:::

Pour installer puis « compiler » vos ressources, il va falloir entrer les commandes suivantes dans le dossier de votre projet :

```sh
npm install

# Lancer la compilation des ressources
npm run build

# Ou si vous souhaitez que les ressources soient recompilées à chaque modification
npm run dev
```

Si vous lancez la commande `npm run build`, votre projet sera compilé une seule fois. C'est intéressant pour la mise en production, mais pas pour le développement. Si vous souhaitez que vos ressources soient recompilées à chaque modification, vous pouvez lancer la commande `npm run dev` en arrière-plan. Celle-ci va surveiller les modifications de vos fichiers et recompiler vos ressources à chaque modification.

Une fois le processus terminé, vous devriez avoir un résultat comme celui-ci :

![Vite build](./ressources/vite.jpg)

Vos pages d'authentification sont maintenant fonctionnelles, votre site intègre maintenant toute la mécanique permettant de gérer cette problématique.

Exemple :

![Laravel Breeze Create Account](./ressources/breeze_create_account.png)

::: tip Petit point important
Laravel Breeze est intéressant, car il ne cache pas le code **l'ensemble des éléments sont accessibles** vous pouvez modifier le code fourni aucun problème ! C'est d'ailleurs ce que nous allons faire.
:::

::: danger npm run build ?

La commande `npm run build` va compiler vos ressources afin de le figer dans le temps après des modifications. Pendant la phase de développement vous serez amené à de plusieurs reprises à lancer cette commande pour mettre à jours vous ressources.

Si vous souhaitez le faire de manière « automatique », vous pouvez lancer en arrière-plan `npm run dev` (en local uniquement évidemment), afin de surveiller le code client (CSS, JS) pour mettre à jour vos ressources.

:::

### Tester le code

Vous avez normalement tout suivi, votre site est donc fonctionnel ! Avant d'aller plus loin, je vous laisse tester l'ensemble de votre site.

- Home.
- Création de comptes.
- Connexion.

::: tip Avant d'aller plus loin
Regarder également les templates, les règles de validation de saisie présente dans les contrôleurs, bref tout ce que vous avez pu installer de manière automatique !
:::

<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/YWy93Zf9eW8RMlK0gK" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>

## Les « Composants » et les templates blades

Si vous avez regardé l'ensemble du code, vous noterez une syntaxe un peu particulière dans les templates Blades ; celle-ci vous permet de créer des composants, mais également des templates de base (ce sont les `x-` quelque chose dans le code blade).

Tout est déjà configuré, vous pouvez dès à présent l'utiliser, mais également créer de nouveau composant en ajoutant les fichiers `blade` dans `views/components/`

[Pour plus d'information, rendez-vous ici](https://laravel.com/docs/8.x/blade#rendering-components)

::: tip Nous avons vu la dernière fois, l'héritage
Nous avions vu la dernière fois [l'héritage de template](https://laravel.com/docs/8.x/blade#layouts-using-template-inheritance) et bien la c'est là mêmes choses, mais via un système de « composant » très à la mode en ce moment.
:::

👋 Regardons ensemble comment ça fonctionne ! (vous pouvez m'appeler)

::: details Pour résumer
Le système de composant va vous permettre :

- De rendre générique un morceau de code que vous utilisez plusieurs fois dans votre projet.
- Penser composant plutôt que HTML copié depuis Internet.
- Rendre « générique les layouts » pour les partager entre les pages.
  :::

### Migrer la page « / » vers le nouveau système

Le nouveau système de template est très très sympa, il permet de découper son travail pour sortir les parties génériques dans un « layouts » partageables entre toutes vos pages. Par exemple :

![Différentes parties](./ressources/parties.png)

::: tip Hey toi lecteur ! Stop !

L'organisation est tout aussi importante que le code, tu peux copier-coller du code entre tous les templates oui… Mais sache que c'est pas efficace, que tu perds du temps et que si on te demande une modification **tu perdras du temps** !

Prendre du temps pour utiliser le système de layout tels proposé par Laravel est un vrai gain de temps ! Le toi du futur te remercie d'avance.

Promis, ça va bien se passer !

:::

Avec le Scaffolding de Breeze nous avons à notre disposition **deux templates** :

- `app.blade.php` pour les clients **connectés**. Accessible dans votre template via `<x-app-layout>`
- `guest.blade.php` pour les clients **non connectés**. Accessible dans votre template via `<x-guest-layout>`

Nous allons donc migrer notre page d'accueil pour utiliser le nouveau système de composant. Pour ça rien de plus simple, il nous suffit d'utiliser `<x-guest-layout>` dans le template `welcome.blade.php`, je vous laisse le faire celui-ci va remplacer l'ensemble du haut de notre html jusqu'au `<body>` ce qui va donner :

::: tip Un instant 👋

Les composants sont une alternative à l'héritage des templates, ici nous allons réaliser l'équivalent du `@extends` du précédent TP. Je vous laisse choisir la version que vous préférez. Personnellement, j'aime bien l'approche composant bien plus moderne et lisible.

:::

Nous allons donc modifier `welcome.blade.php`, pour utiliser le composant `<x-guest-layout>` :

```html
<x-guest-layout>
    @if (Route::has('login'))
      <div class="hidden fixed top-0 right-0 px-6 py-4 sm:block">
        @auth
          <a href="{{ url('/dashboard') }}" class="text-sm text-gray-700 underline">Dashboard</a>
          @else
          <a href="{{ route('login') }}" class="text-sm text-gray-700 underline">Log in</a>

          @if (Route::has('register'))
            <a href="{{ route('register') }}" class="ml-4 text-sm text-gray-700 underline">Register</a>
          @endif 
        @endauth
      </div>
    @endif

    Bienvenue sur mon site !
</x-guest-layout>
```

⚠️ Je vous laisse constater la différence.

::: danger À partir de maintenant
J'espère qu'à partir de maintenant, vous allez utiliser le système de template ! Je vous encourage vivement à le faire.
:::

### Fonctionnement des composants

Vous avez utilisé les composants, mais avez-vous compris le fonctionnement ? Un composant, c'est quelque chose de très simple. Il s'agit d'un morceau de vue réutilisable (un bouton, une card, etc.), il s'agit donc de « code HTML ». Si vous voulez une comparaison, nous pourrions comparer cela à une sorte de fonction. Prenons un exemple.

Si nous souhaitons faire une `Card`. Notre composant pourrait ressembler à, vous pouvez mettre ce code dans `resources/views/components/card.blade.php` :

```html
<div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
    <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        {{ $slot }}
    </div>
</div>
```

L'important dans le code ici est <span v-pre>`{{ $slot }}`</span>. `$slot` est une variable qui va contenir les éléments à l'intérieure de votre Card lors de son usage. Par exemple :

Puis dans votre `welcome.blade.php`, vous pouvez utiliser votre composant comme ceci :

```html
<x-card>
  Ceci est une démo
</x-card>
```

Dans ce cas, la variable `$slot` contiendra… `Ceci est une démo`. Vous venez en quelque sorte de créer votre propre élément HTML réutilisable comme une `div` un `span` ou un `li`, mais ici cet élément est plus complet il peut contenir, du style, un comportement, des données par défaut.


Je vous laisse parcourir les composants déjà disponibles dans le dossier `components`.

## Protéger une page

Le but de l'authentification est donc de limiter l'accès à certaines pages vous l'avez bien compris… Sauf que pour l'instant nous n'avons pas encore vu comment le faire sur les pages que nous souhaitons protéger !

Nous allons créer un contrôleur fictif, celui-ci vous nous permettre de tester la protection.

```sh
php artisan make:controller YoloControler
```

Vous venez de créer un contrôleur vide. En reprenant si nécessaire les exemples du premier TP, je vous laisse créer dedans :

| Route             | Méthode         |
| :---------------- | :-------------- |
| `/yolo`           | `publicView()`  |
| `/yolo-connected` | `privateView()` |

### La partie publique

Pour la partie publique (non connecté), pas rapport à précédemment :

- Une méthode `publicView`, celle-ci doit retourner une `view` qui affichera pour l'instant `Bonjour non connecté`. Attention ! Cette vue doit utiliser le template `<x-guest-layout>`
- Ajouter cette route dans le fichier `routes/web.php`.

::: details Besoin d'aide ?

Avez-vous bien cherché ?

Je vous aide pour la partie route :

```php
Route::get('/yolo', ['App\Http\Controllers\YoloControler', 'publicView']);
```

Je vous aide pour la partie méthode :

```php
  return view("yolo.publicView");
```

:::

Nous avons le temps, n'hésitez pas à :

- Créer des composants si nécessaire.
- Utiliser les class de Tailwind (vous avez même de la complétion dans PhpStorm).

Pour ma part voilà mon rendu :

![Résultat Valentin](./ressources/resultat-valentin.png)

::: details Vous voulez-voir mon template ?

Est-ce vraiment une bonne idée ? Je vous encourage vraiment à faire le vôtre, d'autant plus que j'ai décidé de créer un composant nommé `card.blade.php` dans la partie composant. Mais voilà mon code :

_resources/views/yolo/publicView.blade.php:_

```html
<x-guest-layout>
  <x-card>
    <div class="text-center font-bold text-indigo-600">Bonjour Mr Anonyme 👋</div>
  </x-card>
</x-guest-layout>
```

:::

Je vous laisse coder **votre version**.

### La partie privée

Pour la partie privée, je vous laisse gérer l'ensemble de la base :

- Création de la méthode.
- Création du template. Attention cette fois-ci nous allons utiliser le composant `<x-app-layout>` qui contient toute la logique de la partie « information de connexion » (menu, etc.).

#### Le Layout

Pour le layout j'ai décidé de le nommer `privateView.blade.php` et de le mettre ici : `resources/views/yolo/privateView.blade.php`

```html
<x-app-layout>
  <x-slot name="header">
    <h2 class="font-semibold text-xl text-gray-800 leading-tight">Hello</h2>
  </x-slot>

  <div class="p-5">
    <div class="text-center font-bold text-indigo-600">
      Bonjour {{Auth::user()->name}} 👋
    </div>
  </div>
</x-app-layout>
```

### Le contrôleur

Pour le contrôleur, je vous laisse ajouter la méthode `privateView` comme demandé dans le tableau plus haut :

::: details Dans mon cas ça donne

```php
public function privateView(){
    return view("yolo.privateView");
}
```

:::

### La route

C'est la partie qui nous intéresse… Vous avez remarqué que dans les lignes précédentes, nous n'avons jamais parlé de l'authentification. Comment alors est-ce possible que la page ne soit accessible qu'aux gens connectés ?

Et bien … C'est simple ! Quand vous avez installé `breeze` vous avez également ajouté des `Middleware`, un middleware est un morceau de code qui va intercepter la demande initiale pour faire des contrôles supplémentaires. Dans notre cas le contrôle en plus va être « Est-ce que l'utilisateur est connecté » :

![Logique d'authentification](./ressources/auth-logic.png)

Nous allons donc ajouter dans le fichier `routes/web.php`

```php
Route::get('/yolo-connected', ['App\Http\Controllers\YoloControler', 'privateView'])->middleware(['auth'])->name("yoloPrivate");
```

Ici la protection est ajoutée grâce à la méthode `middleware(['auth'])`. Elle va permettre de ne laisser passer que les utilisateurs connectés.

::: tip Middleware

Pour rappel, le middleware `auth` est celui qui va vérifier si l'utilisateur est connecté ou non. Si ce n'est pas le cas, il va rediriger l'utilisateur vers la page de connexion.

Un Middleware est un morceau de code qui va être exécuté avant le contrôleur. Il peut être utilisé pour faire des contrôles supplémentaires, ou pour modifier la demande initiale.

:::

Voilà le résultat pour moi

![Résultat Valentin partie privée](./ressources/resultat-valentin-private.png)

⚠️ Je vous laisse implémenter la partie privée dans votre code. ⚠️

::: danger Un instant !

Vous noterez que dans ma version j'ai un menu avec un lien vers ma page… Pas de magie ! J'ai ajouté le code nécessaire dans le fichier `resources/views/layouts/navigation.blade.php`

Dans la partie « Navigation Link » :

![Navigation Links](./ressources/navigation-links.png)

:::

## Conclusion

Nous avons fait le tour de la base de ce qu'il faut savoir. Cependant le TP continue sur deux éléments qui peuvent être intéressants pour vous à la suite de cette conclusion.

::: tip Le code entier, mais uniquement si vous le demandez
Vous souhaitez voir mon code ? [J'ai un repository privé si nécessaire](https://github.com/c4software/laravel-auth-student)
:::

## Modifier les informations demandées

En reprenant ce que nous avons fait précédemment, je vous laisse modifier la structure de la base de données pour ajouter dans la table `users` un nouveau champ nommé par exemple `pseudo`.

- Ajouter la colonne en base
- Modifier le formulaire de création de comptes `resources/views/auth/register.blade.php` pour ajouter le champ dans le formulaire.
- Modifier le modèle `app/Models/User.php` pour ajouter dans les `$fillable` le nouveau champ.
- Modifier le contrôleur pour sauvegarder la nouvelle valeur. (méthode `store` dans `app/Http/Controllers/Auth/RegisteredUserController.php`)

## Accéder aux informations du connecté

Nous l'avons fait dans notre exemple de contrôleur, mais, si vous ne l'aviez pas compris :

```html
{{Auth::user()->name}}
```

## Changer la table des utilisateurs

Le fonctionnement par défaut (avec la table `users`) est très bien, mais il est possible que vous souhaitiez utiliser une autre table pour stocker les informations des utilisateurs. Par exemple, si vous avez déjà un projet et que vous souhaitez utiliser Breeze pour gérer l'authentification.

Si nous souhaitons utiliser la table `clients` à la place de `users` pour stocker les informations des utilisateurs, nous devons modifier plusieurs éléments :

- Créer la migration ainsi que le modèle : `php artisan make:model Client -m`

### La migration

Nous allons créer une migration pour ajouter les champs nécessaires à la table `clients` :

```php
Schema::create('clients', function (Blueprint $table) {
    $table->id();
    $table->string('nom');
    $table->string('email')->unique();
    $table->string('mot_de_passe');
    $table->rememberToken();
    $table->timestamps();
});
```

::: tip Lancer la migration
Maintenant que la migration est créée, il faut lancer la commande `php artisan migrate` pour créer la table dans la base de données.
:::

### Le modèle

Nous allons ensuite modifier le modèle `app/Models/Client.php` pour ajouter les champs `$fillable` et réaliser l'héritage avec `Authenticatable` :

```php
<?php
namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Client extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'nom',
        'email',
        'mot_de_passe',
    ];

    protected $hidden = [
        'mot_de_passe',
        'remember_token',
    ];

    /**
     * Retourne le mot de passe de l'utilisateur
     */
    public function getAuthPassword()
    {
        return $this->mot_de_passe;
    }

    /**
     * Retourne l'identifiant de l'utilisateur
     */
    public function getAuthIdentifier()
    {
        return $this->email;
    }

    /**
     * Retourne le nom de l'identifiant de l'utilisateur
     */
    public function getAuthIdentifierName()
    {
        return 'email';
    }
}
```

::: tip Pourquoi l'héritage avec `Authenticatable` ?
Ceca va permetre à Laravel de savoir comment gérer l'authentification avec cette classe.
:::

::: danger Attention !
Pour que ça fonctionne, nous devons overrider les méthodes `getAuthPassword`, `getAuthIdentifier` et `getAuthIdentifierName` pour que Laravel puisse récupérer les informations nécessaires lors de l'authentification.

Ces trois méthodes seront appelées automatiquement par Laravel lors de l'authentification d'un utilisateur (utilisé via `Auth::attempt`).
:::

### Le fichier de configuration

Par défaut, Breeze utilise la table `users` pour stocker les informations des utilisateurs. Vous pouvez la changer en modifiant le fichier `config/auth.php` en **modifiant** :

```php
'providers' => [
    'users' => [
        'driver' => 'eloquent',
        'model' => App\Models\Client::class,
    ],
```

## Modifier les vues et les contrôleurs

Maintenant que nous avons modifié la table utilisée pour stocker les informations des utilisateurs, nous devons modifier les vues pour qu'elles utilisent les bonnes informations.

### Le contrôleur d'authentification

Nous allons modifier le contrôleur `app/Http/Controllers/Auth/RegisteredUserController.php` pour qu'il utilise le bon modèle. Nous allons modifier la méthode `store`. Cette méthode est appelée lors de la création d'un compte.

```php
public function store(Request $request): RedirectResponse
{
    $request->validate([
        'name' => ['required', 'string', 'max:255'],
        'email' => ['required', 'string', 'email', 'max:255', 'unique:'.Client::class],
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
    ]);

    $user = Client::create([
        'nom' => $request->name,
        'email' => $request->email,
        'mot_de_passe' => Hash::make($request->password),
    ]);

    event(new Registered($user));

    Auth::login($user);

    return redirect(RouteServiceProvider::HOME);
}
```

Ici nous avons créé un utilisateur en utilisant le modèle `Client` et non plus `User`. C'est dans cette méthode que vous pouvez ajouter des informations supplémentaires dans la table `clients`, ou dans une autre table si c'est nécessaire.

### Et le formulaire de connexion ?

Nous n'avons pas besoin de modifier le formulaire de connexion, car nous avons déjà modifié le fichier de configuration `config/auth.php` pour que Laravel utilise le bon modèle. Grâce à cette modification, Laravel va automatiquement utiliser le bon modèle pour authentifier l'utilisateur, du moment que vous lui fournissez les deux champs `email` et `password` (dans le formulaire de connexion).

### C'est un exemple

Évidemment, ce n'est qu'un exemple pour vous montrer comment modifier Breeze pour qu'il s'adapter à vos besoins. Pour l'utiliser dans vos projets, d'autres éléments seront certainement à modifier :

- La vue de création de compte pour y ajouter des champs supplémentaires.
- Le modèle `Client` pour correspondre à vos besoins.
- Le design des vues pour qu'elles correspondent à votre charte graphique.

## Créer plusieurs enregistrements en base de données

Le but de Breeze est de vous permettre de modifier le code « préfourni » c'est ce que l'on appelle du Scaffolding, nous allons donc en profiter pour modifier son comportement afin de créer lors de l'ajout d'utilisateur une autre entrée en base de données, par exemple une `personne`.

- Créer la migration ainsi que le modèle. `php artisan make:model Personne --migration`
- Renseigner les champs dans votre migration **,mais également** dans le modèle.
- Lancer la migration `php artisan migrate`
- Modifier le code de la méthode `store` dans le contrôleur `app/Http/Controllers/Auth/RegisteredUserController.php` pour ajouter également un utilisateur :

Exemple dans mon cas :

```php
Personne::create([
    'name' => $request->name,
    'userId' => $user->id
])
```

Et voilà nous avons maintenant une méthode de « Création d'un utilisateur » qui ajoute également une personne.

::: tip C'est bien évidement un exemple
Je vous laisse l'implémenter… Cependant vous comprenez bien que c'est évidemment un exemple !
:::

Je vous laisse implémenter la modification dans votre code.

## Afficher les informations de l'utilisateur

Maintenant que nous avons créé une personne lors de la création d'un utilisateur, nous allons afficher ces données dans la page d'accueil après la connexion.

- Modifier la vue `resources/views/dashboard.blade.php` pour afficher les informations de la personne connectée.
- Modifier le contrôleur `app/Http/Controllers/DashboardController.php` pour récupérer les informations de la personne connectée.

::: tip Vous avez besoin d'aide ?

Je vous aide pour le contrôleur :

```php
public function index()
{
    $personne = Personne::where('userId', Auth::user()->id)->first();
    return view('dashboard', ['personne' => $personne]);
}
```

:::

C'est à vous de jouer pour la vue !