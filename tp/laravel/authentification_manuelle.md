---
description: Dans ce TP nous allons comprendre le fonctionnement de l'authentification (hash de mot de passe, session) d'abord en PHP pur, puis en la codant nous-même dans notre projet Laravel.
---

# Comprendre l'authentification

![Laravel](./ressources/logo.png)

::: details Sommaire
[[toc]]
:::

Dans le [TP précédent](./base_de_donnees.md) nous avons construit une TODO List persistante. Problème : elle est accessible à tout le monde ! Dans ce TP, nous allons créer **nous-même** un système d'authentification, pour comprendre ce qu'il se passe réellement « sous le capot ».

::: tip Pourquoi le faire à la main ?

Laravel sait générer un système d'authentification complet en une commande (nous le verrons dans [le TP suivant](./authentification.md)). Mais utiliser un outil sans comprendre ce qu'il fait, c'est le meilleur moyen de faire des erreurs de sécurité.

Dans ce TP, nous allons donc coder l'authentification à la main : d'abord en PHP pur (sans Laravel, sans base de données), puis dans notre projet Laravel.

:::

Dans ce TP, je vous invite à avoir en parallèle :

- [L'aide mémoire Laravel](/cheatsheets/laravel/)
- [La synthèse des commandes](/cheatsheets/laravel/quick.md)

## Les slides

Avant de coder, posons les concepts : hash, session, middleware et double authentification :

<ClientOnly>
<SlidesDeck src="laravel_authentification" />
</ClientOnly>

## Objectifs

À la fin de ce TP vous saurez :

- Expliquer pourquoi on ne stocke **jamais** un mot de passe en clair.
- Utiliser `password_hash` et `password_verify`.
- Créer un système complet d'inscription / connexion / déconnexion en Laravel.
- Utiliser le système d'authentification de Laravel (`Auth::`) en sachant précisément ce qu'il fait derrière (la session).
- Protéger des routes avec un **Middleware**.

## Un peu de théorie : comment fonctionne une authentification ?

Une authentification, c'est toujours le même mécanisme, quel que soit le langage ou le framework :

1. **L'inscription** : l'utilisateur choisit un identifiant (souvent un email) et un mot de passe. Le serveur stocke l'identifiant et une **version hashée** du mot de passe.
2. **La connexion** : l'utilisateur envoie son identifiant et son mot de passe. Le serveur compare le mot de passe envoyé avec le hash stocké.
3. **La session** : si la comparaison est bonne, le serveur mémorise dans **la session** que l'utilisateur est connecté. À chaque requête suivante, le serveur retrouve cette information.
4. **La déconnexion** : le serveur vide la session.

### Pourquoi hasher les mots de passe ?

Les mots de passe ne doivent **jamais** être stockés en clair dans la base de données. Pourquoi ?

- Si votre base de données fuite (piratage, sauvegarde volée…), tous les mots de passe sont exposés.
- Vos utilisateurs réutilisent souvent le même mot de passe partout : une fuite chez vous = leurs comptes compromis ailleurs.
- Même vous (le développeur / l'administrateur) ne devez pas pouvoir lire les mots de passe.

La solution : le **hash**. Un hash est une fonction **à sens unique** : facile de calculer le hash d'un mot de passe, mais impossible de retrouver le mot de passe à partir du hash.

```
"monSuperMotDePasse"  →  password_hash()  →  "$2y$12$k7aP…Xz9"   ✅ possible
"$2y$12$k7aP…Xz9"     →  ???              →  "monSuperMotDePasse"  ❌ impossible
```

Pour vérifier un mot de passe, on ne « déchiffre » donc pas le hash : on hash le mot de passe fourni par l'utilisateur et on **compare**. C'est le rôle de `password_verify`.

En PHP, deux fonctions suffisent :

```php
// À l'inscription : hasher le mot de passe avant de le stocker
$hash = password_hash($motDePasse, PASSWORD_DEFAULT);

// À la connexion : vérifier le mot de passe saisi contre le hash stocké
$estValide = password_verify($motDePasseSaisi, $hash); // true ou false
```

::: warning Hash ≠ chiffrement

Un chiffrement est réversible (avec la clé). Un hash ne l'est pas. Pour les mots de passe, c'est bien un **hash** qu'il faut : personne (même pas vous) ne doit pouvoir retrouver le mot de passe d'origine.

Autre point : `password_hash` intègre automatiquement un **sel** (salt), une valeur aléatoire ajoutée avant le hash. Conséquence : deux utilisateurs avec le même mot de passe n'auront **pas** le même hash. Vous allez le constater par vous-même juste après.

:::

## Étape 0 : l'authentification en PHP pur (sans Laravel, sans BDD)

Avant de passer à Laravel, nous allons faire le mécanisme complet dans **un seul fichier PHP**, sans base de données. Objectif : voir le mécanisme « nu », sans framework autour. Comptez 30 minutes maximum.

Créez un dossier `demo-auth` (en dehors de votre projet Laravel), avec un fichier `auth.php`, et lancez le serveur intégré de PHP :

```sh
php -S localhost:9000
```

Voilà la base du fichier `auth.php`, nos utilisateurs sont stockés dans un simple tableau (le hash correspond au mot de passe `secret`) :

```php
<?php
session_start();

// Nos « utilisateurs en base », le mot de passe des deux comptes est « secret »
$utilisateurs = [
    "john@doe.com" => '$2y$12$FSq31Je4IJjlMUhmPOt7..pSridwmC.jlqdPP1oJCw90UFyoVabM6',
    "jane@doe.com" => '$2y$12$qyQntBaq2ooJsvKHnEtJK.y3y21iQ20bM1jNq2w8O/w9p11ngwTPO',
];

// TODO 1 : Si le formulaire est soumis (POST), vérifier l'email et le mot de passe.
//          - L'email existe dans $utilisateurs ? password_verify est OK ?
//          - Oui → stocker l'email dans $_SESSION['user']
//          - Non → afficher un message d'erreur.

// TODO 2 : Si ?logout est présent dans l'URL, vider la session.
?>

<?php if (isset($_SESSION['user'])): ?>
    <p>Bonjour <?= $_SESSION['user'] ?> ! <a href="?logout">Se déconnecter</a></p>
<?php else: ?>
    <form method="POST">
        <input type="email" name="email" placeholder="Email">
        <input type="password" name="password" placeholder="Mot de passe">
        <button type="submit">Connexion</button>
    </form>
<?php endif; ?>
```

Je vous laisse compléter les deux `TODO` avec vos connaissances de PHP de première année. Pas de piège : un `if`, `isset`, `password_verify`, `$_SESSION`.

::: details Voir l'une des solutions possibles

```php
// TODO 1
$erreur = null;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    if (isset($utilisateurs[$email]) && password_verify($password, $utilisateurs[$email])) {
        $_SESSION['user'] = $email;
    } else {
        $erreur = "Identifiants incorrects";
    }
}

// TODO 2
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: auth.php');
    exit;
}
```

(et un `<?php if ($erreur): ?><p style="color: red"><?= $erreur ?></p><?php endif; ?>` au-dessus du formulaire)

:::

### Questions de compréhension

Avant de passer à Laravel, répondez à ces questions (testez, ne devinez pas !) :

- Générez deux hashs du même mot de passe avec `php -r "echo password_hash('secret', PASSWORD_DEFAULT);"`. Sont-ils identiques ? Pourquoi `password_verify` fonctionne-t-il quand même ?
- Que contient le cookie envoyé par le serveur à votre navigateur (regardez dans les outils développeur) ? Le mot de passe y est-il ?
- Pourquoi compare-t-on les mots de passe **côté serveur** et jamais côté navigateur ?

::: tip C'est tout ?

Oui, le cœur d'une authentification tient dans ces quelques lignes : un hash stocké, `password_verify`, une session. Tout le reste (base de données, formulaires jolis, middleware…) c'est de « l'emballage ». Gardez ce mécanisme en tête, nous allons maintenant faire exactement la même chose dans Laravel.

:::

## Reprendre votre projet Laravel

Nous repartons du projet TODO List du [TP précédent](./base_de_donnees.md). Vérifiez qu'il fonctionne (`php artisan serve`).

::: details Vous n'avez pas le projet du TP précédent ?

Vous pouvez repartir d'un projet neuf (`composer create-project --prefer-dist laravel/laravel mon-premier-projet`), mais il vous faudra au minimum le layout de base et la TODO List du [TP base de données](./base_de_donnees.md) pour faire la fin de ce TP (protection des routes).

:::

## Gérer de l'authentification

Nous avons des TODO, mais pourquoi pas créer un système d'authentification pour gérer les utilisateurs ? Pour cela, nous allons utiliser la commande artisan pour créer la table utilisateur :

```sh
php artisan make:model Utilisateur --migration
```

Je vous laisse configurer la migration pour ajouter les colonnes :

- `name` (string)
- `email` (string)
- `password` (string)
- Les timestamps

Ajoutez également les `fillable` dans le modèle `Utilisateur`.

::: tip Besoin d'aide ?

Je vous laisse regarder ce que nous avons fait précédemment pour la table TODO. Vous devriez pouvoir vous en sortir.

:::

Question :

- La colonne `password` va contenir le **hash** du mot de passe. En regardant un hash généré précédemment, un `string` (255 caractères) est-il suffisant ?

### Brancher notre modèle sur Laravel

Laravel intègre un système d'authentification complet, accessible via `Auth::`. Pour qu'il fonctionne, il faut lui indiquer **quelle classe représente un utilisateur connecté**. Deux petites modifications :

1\. Dans `app/Models/Utilisateur.php`, remplacez `extends Model` par `extends Authenticatable` :

```php
use Illuminate\Foundation\Auth\User as Authenticatable;

class Utilisateur extends Authenticatable
{
    // Le reste de votre code (fillable, etc.) ne change pas
}
```

2\. Dans `config/auth.php`, pointez le « provider » vers notre modèle :

```php
'providers' => [
    'users' => [
        'driver' => 'eloquent',
        'model' => App\Models\Utilisateur::class,
    ],
],
```

::: tip Pourquoi ces deux modifications ?

`Authenticatable` est simplement un `Model` Eloquent enrichi de ce qu'il faut pour être « connectable » (Laravel saura par exemple retrouver son identifiant). Et le `config/auth.php` dit à Laravel : « quand je parle d'un utilisateur connecté, c'est cette classe / cette table ». Sans ça, `Auth::` chercherait dans le modèle `User` par défaut.

C'est exactement la configuration que vous retrouverez dans le projet d'AP.

:::

### Créer le contrôleur et les routes

Nous allons construire l'authentification **étape par étape**. Vue d'ensemble de ce dont nous avons besoin :

|          Route          |       Méthode        | Rôle                                |
| :---------------------: | :------------------: | :---------------------------------- |
|      GET `/login`       |      `login()`       | Afficher le formulaire de connexion |
| POST `/traitementLogin` | `traitementLogin()`  | Traiter le formulaire de connexion  |
|     GET `/register`     |     `register()`     | Afficher le formulaire d'inscription |
| POST `/traitementRegister` | `traitementRegister()` | Traiter le formulaire d'inscription |

Première étape, créer le contrôleur (vous connaissez la commande) :

```sh
php artisan make:controller AuthentificationControleur
```

Puis déclarez les quatre routes dans `routes/web.php` :

```php
Route::get('/login', [AuthentificationControleur::class, 'login']);
Route::post('/traitementLogin', [AuthentificationControleur::class, 'traitementLogin']);
Route::get('/register', [AuthentificationControleur::class, 'register']);
Route::post('/traitementRegister', [AuthentificationControleur::class, 'traitementRegister']);
```

::: tip Vérifiez avant de continuer

`php artisan route:list` doit lister vos quatre routes (le `use App\Http\Controllers\AuthentificationControleur;` est bien présent en haut de `web.php` ?). Pour l'instant elles pointent vers des méthodes qui n'existent pas encore : c'est l'objet des étapes suivantes.

:::

### La page de connexion

Commençons par l'affichage. Dans le contrôleur, la méthode est minimaliste :

```php
public function login()
{
    return view('login');
}
```

Et voilà la vue `resources/views/login.blade.php` complète :

```html
@extends('layouts.base')

@section('title', 'Connexion')

@section('content')
<h1>Connexion</h1>

@if(session('error'))
<div style="color: red;">{{ session('error') }}</div>
@endif

<form method="POST" action="/traitementLogin">
  @csrf
  <input type="email" name="email" placeholder="Email" />
  <input type="password" name="password" placeholder="Mot de passe" />
  <button type="submit">Se connecter</button>
</form>

<p><a href="/register">Pas encore de compte ? Inscrivez-vous</a></p>
@endsection
```

Rien de nouveau : le layout et `@csrf` viennent du [TP d'introduction](./introduction.md), le formulaire ressemble à celui de votre TODO List. Testez : `/login` doit afficher votre formulaire.

### La page d'inscription : à vous

Sur **exactement le même modèle** (méthode `register()` + vue `register.blade.php`), je vous laisse créer la page d'inscription. Seules différences :

- Trois champs : `name`, `email`, `password`.
- Le formulaire poste vers `/traitementRegister`.
- Un lien vers `/login` (« Déjà un compte ? »).

::: tip Point de contrôle

`/login` et `/register` affichent chacun leur formulaire, avec votre layout. Les boutons ne font encore rien d'utile (les méthodes de traitement n'existent pas), c'est normal.

:::

### L'inscription : `traitementRegister`

Passons au traitement de l'inscription. Le principe : récupérer les champs du formulaire, **hasher** le mot de passe, créer l'utilisateur en base, rediriger vers la connexion. Voilà la méthode complète :

```php
public function traitementRegister(Request $request)
{
    // On stocke le HASH du mot de passe, jamais le mot de passe en clair
    $hash = password_hash($request->input('password'), PASSWORD_DEFAULT);

    Utilisateur::create([
        'name' => $request->input('name'),
        'email' => $request->input('email'),
        'password' => $hash,
    ]);

    return redirect('/login')->with('success', 'Votre compte a été créé, vous pouvez vous connecter');
}
```

N'oubliez pas le `use App\Models\Utilisateur;` en haut du contrôleur. Et souvenez-vous du [TP base de données](./base_de_donnees.md) : `Utilisateur::create()` fonctionne grâce au `$fillable` de votre modèle.

::: tip Point de contrôle

Inscrivez-vous via `/register`, puis ouvrez votre outil SQLite : l'utilisateur est en base, et la colonne `password` contient bien un **hash** (`$2y$…`), pas votre mot de passe. Ajoutez l'affichage du message flash `success` sur la page de connexion pour un retour utilisateur propre.

:::

### La connexion : `traitementLogin`

Vous l'avez fait en PHP pur dans l'étape 0, c'est **exactement le même mécanisme** ici : retrouver l'utilisateur par son email, vérifier le mot de passe contre le hash, puis ouvrir la session. Je vous donne le cœur de la méthode, à vous de l'assembler :

```php
$mdp = $request->input('password');
$email = $request->input('email');
$utilisateur = Utilisateur::where('email', $email)->first();
$estValide = password_verify($mdp, $utilisateur->password);

if ($estValide) {
    // Ouvre la session de l'utilisateur (il est maintenant « connecté »)
    Auth::login($utilisateur);
    // Génère un nouvel identifiant de session (protection contre la fixation de session)
    $request->session()->regenerate();
} else {
    return redirect('/login')->with('error', 'Identifiants incorrects');
}
```

::: tip Que fait Auth::login() derrière ?

Rien de magique : **exactement ce que vous avez fait à la main dans l'étape 0**. En PHP pur vous aviez écrit `$_SESSION['user'] = $email;`. La version Laravel « manuelle » serait `$request->session()->put('user', $utilisateur->id);`. `Auth::login()` fait la même chose : il stocke **l'identifiant** de l'utilisateur dans la session.

Deux différences intéressantes :

- Laravel ne met que l'**id** en session, et recharge l'utilisateur depuis la base à chaque requête (via le `provider` que vous venez de configurer).
- `session()->regenerate()` change l'identifiant du cookie de session après la connexion, pour qu'un attaquant ne puisse pas « préparer » une session à l'avance (attaque par fixation de session).

Question : pourquoi stocker uniquement l'id, plutôt que l'objet `$utilisateur` complet (avec son hash de mot de passe) ?

:::

C'est à vous de jouer ! Il vous reste à :

- Transformer ce fragment en méthode complète `traitementLogin(Request $request)`.
- Rediriger vers `/todo` après une connexion réussie.

::: warning Quelques points de vigilance

- Que se passe-t-il si l'email n'existe pas en base ? (`$utilisateur` sera `null` et `password_verify` plantera…). Gérez ce cas **avant** d'appeler `password_verify`, avec le même message d'erreur « Identifiants incorrects ».
- N'oubliez pas le `use Illuminate\Support\Facades\Auth;` en haut de votre contrôleur.

:::

Question :

- Pourquoi afficher le même message « Identifiants incorrects » que l'email existe ou non ? Que pourrait déduire un attaquant si les messages étaient différents ?

### Afficher les erreurs proprement : `withErrors` et `old()`

Jusqu'ici nous utilisions un message flash pour signaler une erreur. Laravel propose un mécanisme **dédié aux formulaires**, que vous retrouverez dans tous les projets professionnels. Côté contrôleur :

```php
return redirect('/login')
    ->withInput($request->only('email')) // Conserve la saisie (jamais le mot de passe !)
    ->withErrors(['email' => 'Identifiants incorrects']);
```

Et côté vue, deux outils :

```html
<input type="email" name="email" value="{{ old('email') }}" />

@error('email')
<div style="color: red;">{{ $message }}</div>
@enderror
```

- `old('email')` réaffiche la valeur saisie précédemment : en cas d'erreur, l'utilisateur n'a pas à tout retaper.
- <span v-pre>`@error('champ') … @enderror`</span> s'affiche uniquement si le champ a une erreur (la variable `$message` est fournie automatiquement par Laravel).

Je vous laisse adapter votre formulaire de connexion pour utiliser ce mécanisme.

::: tip Flash ou withErrors ?

Les deux fonctionnent ! Le message flash convient à un message **global** (« Votre compte a été créé »), `withErrors` est fait pour les erreurs liées à **un champ précis** d'un formulaire. Les projets que vous croiserez (notamment en AP) utilisent massivement `withErrors` + `@error` + `old()`.

:::

::: tip Point de contrôle

Le parcours complet fonctionne : inscription, puis connexion avec redirection vers `/todo`. Avec un mauvais mot de passe (ou un email inconnu), le message « Identifiants incorrects » s'affiche et la saisie de l'email est conservée.

:::

### La déconnexion

Il manque une étape du mécanisme : la déconnexion. Je vous laisse ajouter :

- Une route GET `/logout`.
- Une méthode `logout` dans votre contrôleur, qui déconnecte l'utilisateur (`Auth::logout();`) puis redirige vers `/login`.
- Un lien « Déconnexion » dans votre layout, affiché **uniquement** si l'utilisateur est connecté (une condition `@if(Auth::check())` fera l'affaire).

::: tip Le parallèle avec l'étape 0

- `Auth::logout()` retire l'utilisateur de la session : c'est votre `session_destroy()` du PHP pur (version Laravel « manuelle » : `session()->forget('user')`).
- `Auth::check()` vérifie la présence de l'utilisateur en session : c'est votre `isset($_SESSION['user'])` (version Laravel « manuelle » : `session()->has('user')`).
- Bonus : dans les vues Blade, la directive `@auth … @endauth` est un raccourci de `@if(Auth::check())`.

:::

### Créer un Middleware pour l'authentification

Maintenant que vous avez un système d'authentification, je vous propose de créer un Middleware qui va vérifier si l'utilisateur est connecté. Si l'utilisateur n'est pas connecté, il sera redirigé vers la page de connexion.

Pour commencer, créez un Middleware :

```sh
php artisan make:middleware CheckAuth
```

Ajoutez la logique dans le Middleware :

```php
public function handle(Request $request, Closure $next)
{
    // Auth::check() retourne true si un utilisateur est connecté
    if (/* L'utilisateur n'est pas connecté */) {
        return redirect('/login');
    }

    return $next($request);
}
```

::: tip Et derrière ?

`Auth::check()` regarde simplement si la session contient un identifiant d'utilisateur valide. En PHP pur, votre middleware aurait été un `if (!isset($_SESSION['user'])) { header('Location: /login'); exit; }` en haut de chaque page. Le middleware, c'est ce `if`, écrit **une seule fois** et appliqué aux routes que vous choisissez.

:::

Ajouter le Middleware sur la route que vous souhaitez protéger :

```php
->middleware(CheckAuth::class)
```

### Protéger votre TODO List

C'est le moment de tout relier : je vous laisse protéger **l'ensemble des routes de la TODO List** avec votre Middleware `CheckAuth` :

- Un utilisateur non connecté qui tente d'accéder à `/todo` doit être redirigé vers `/login`.
- Un utilisateur connecté doit pouvoir utiliser la TODO List normalement.

Testez les deux cas (une navigation privée est pratique pour tester « non connecté »).

::: tip Vous êtes en avance ?

Un TP bonus vous attend : [La double authentification (2FA)](./2fa.md). Vous y renforcerez la connexion que vous venez de coder avec un code temporaire à 6 chiffres (celui présenté en fin de slides), exactement comme dans le projet que vous retrouverez en AP.

:::

## Conclusion

Vous venez de coder un système d'authentification complet, et surtout vous savez ce qu'il se passe à chaque étape :

- Un mot de passe n'est **jamais** stocké en clair : `password_hash` à l'inscription, `password_verify` à la connexion.
- `Auth::login()` / `Auth::check()` / `Auth::logout()` : le système de Laravel, dont vous connaissez maintenant l'envers du décor (la **session**, comme en PHP pur).
- Un **Middleware** protège les routes qui nécessitent d'être connecté.

Et oui, nous avons **tout codé à la main**… mais sachez que Laravel sait faire tout ça pour vous, automatiquement, avec [Breeze](./authentification.md). C'est justement la force d'un framework : ne pas tout recoder à chaque projet. Vous venez de gagner le droit d'utiliser ces outils **en sachant ce qu'ils font**.

N'oubliez pas de **commiter votre projet**.

La suite directe : [Le reset de mot de passe](./reset_mot_de_passe.md), pour compléter votre authentification avec la fonctionnalité « mot de passe oublié » (token temporaire, expiration, envoi d'email).

Puis viendront :

- [La double authentification (2FA)](./2fa.md) : le TP bonus pour les plus rapides, qui ajoute le code à 6 chiffres présenté dans les slides.

- [Aller plus loin avec Laravel](./aller_plus_loin.md) : terminer le projet TODO (lier les TODO aux utilisateurs, remplir la base de données de test, limiter les abus…).
- [L'authentification avec Breeze](./authentification.md) : dans la vraie vie, on ne recode pas tout ça à la main. Laravel sait générer une authentification complète : maintenant que vous savez ce qu'il y a dedans, vous pourrez l'utiliser en confiance.
