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

## Objectifs

À la fin de ce TP vous saurez :

- Expliquer pourquoi on ne stocke **jamais** un mot de passe en clair.
- Utiliser `password_hash` et `password_verify`.
- Mémoriser un utilisateur connecté avec la session.
- Créer un système complet d'inscription / connexion / déconnexion en Laravel.
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

### Créer un contrôleur pour l'authentification

Je vous laisse écrire le code permettant de réaliser l'authentification. Pour cela, vous allez devoir :

- Créer un contrôleur `AuthentificationControleur`.
- Ajouter une méthode `login` qui va afficher le formulaire de connexion.
- Ajouter une méthode `traitementLogin` qui va traiter le formulaire de connexion.
- Ajouter une méthode `register` qui va afficher le formulaire d'inscription.
- Ajouter une méthode `traitementRegister` qui va traiter le formulaire d'inscription.

L'ensemble des méthodes devra être accessible via des routes :

- GET `/login` pour afficher le formulaire de connexion.
- POST `/traitementLogin` pour traiter le formulaire de connexion.
- GET `/register` pour afficher le formulaire d'inscription.
- POST `/traitementRegister` pour traiter le formulaire d'inscription.

::: tip Besoin d'aide ?

Pour réaliser l'authentification il y a du code oui, mais il y a surtout des étapes à suivre :

- Créer un contrôleur.
- Ajouter les méthodes.
- Ajouter les routes.
- Créer les vues.

Je vous laisse donc réaliser ces étapes en vous aidant de [l'aide mémoire](/cheatsheets/laravel/). Si vous avez des questions, je suis là pour vous aider.

N'oubliez pas ce que vous avez vu dans les TP précédents : `@extends('layouts.base')` pour vos vues, et `@csrf` dans vos formulaires.

:::

### Gérer l'authentification

Vous l'avez fait en PHP pur dans l'étape 0, c'est **exactement le même mécanisme** ici, avec les outils de Laravel :

```php
// Dans la méthode traitementRegister
$mdp = $request->input('password');
$hash = password_hash($mdp, PASSWORD_DEFAULT);

// Dans la méthode traitementLogin
$mdp = $request->input('password');
$email = $request->input('email');
$utilisateur = Utilisateur::where('email', $email)->first();
$estValide = password_verify($mdp, $utilisateur->password);

if ($estValide) {
    $request->session()->put('user', $utilisateur);
} else {
    return redirect('/login')->with('error', 'Identifiants incorrects');
}
```

C'est à vous de jouer !

::: warning Quelques points de vigilance

- Dans `traitementRegister`, c'est bien le **hash** qu'il faut stocker en base, jamais le mot de passe en clair.
- Dans `traitementLogin`, que se passe-t-il si l'email n'existe pas en base ? (`$utilisateur` sera `null`…). Gérez ce cas **avant** d'appeler `password_verify`, avec le même message d'erreur « Identifiants incorrects ».
- N'oubliez pas les **messages flash** pour informer l'utilisateur (succès de l'inscription, erreur de connexion…).

:::

Question :

- Pourquoi afficher le même message « Identifiants incorrects » que l'email existe ou non ? Que pourrait déduire un attaquant si les messages étaient différents ?

::: tip Point de contrôle

Vous devez pouvoir vous inscrire, vous voir en base de données (avec un mot de passe **hashé**, vérifiez dans votre outil SQLite !), puis vous connecter.

:::

### La déconnexion

Il manque une étape du mécanisme : la déconnexion. Je vous laisse ajouter :

- Une route GET `/logout`.
- Une méthode `logout` dans votre contrôleur, qui vide la session (`$request->session()->forget('user');`) puis redirige vers `/login`.
- Un lien « Déconnexion » dans votre layout, affiché **uniquement** si l'utilisateur est connecté (une condition `@if(session()->has('user'))` fera l'affaire).

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
    // Vous devez utiliser la session pour vérifier si l'utilisateur est connecté.
    // $request->session()->has('user') par exemple
    if (/* L'utilisateur n'est pas connecté */) {
        return redirect('/login');
    }

    return $next($request);
}
```

Ajouter le Middleware sur la route que vous souhaitez protéger :

```php
->middleware(CheckAuth::class)
```

### Protéger votre TODO List

C'est le moment de tout relier : je vous laisse protéger **l'ensemble des routes de la TODO List** avec votre Middleware `CheckAuth` :

- Un utilisateur non connecté qui tente d'accéder à `/todo` doit être redirigé vers `/login`.
- Un utilisateur connecté doit pouvoir utiliser la TODO List normalement.

Testez les deux cas (une navigation privée est pratique pour tester « non connecté »).

## Conclusion

Vous venez de coder un système d'authentification complet, et surtout vous savez ce qu'il se passe à chaque étape :

- Un mot de passe n'est **jamais** stocké en clair : `password_hash` à l'inscription, `password_verify` à la connexion.
- La **session** mémorise l'utilisateur connecté entre les requêtes.
- Un **Middleware** protège les routes qui nécessitent d'être connecté.

N'oubliez pas de **commiter votre projet**.

Deux suites possibles (et complémentaires) :

- [Aller plus loin avec Laravel](./aller_plus_loin.md) : nous allons terminer notre projet TODO (lier les TODO aux utilisateurs, remplir la base de données de test, limiter les abus…).
- [Laravel & l'authentification](./authentification.md) : dans la vraie vie, on ne recode pas tout ça à la main. Laravel sait générer une authentification complète (mot de passe oublié, vérification d'email…) : maintenant que vous savez ce qu'il y a dedans, vous pouvez l'utiliser en confiance.
