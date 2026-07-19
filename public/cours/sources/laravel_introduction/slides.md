# Laravel

## Premiers pas avec un framework

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Souvenez-vous, en PHP pur…

Pour construire votre site, vous deviez écrire :

- Les `include` / `require` pour découper vos pages.
- Le `session_start()`, les `header('Location: …')`.
- La validation des `$_POST`, la sécurité…

À chaque projet. Depuis zéro.

---

## Un framework

Tout ce code que vous réécriviez à chaque fois…

Il est **déjà écrit**, testé, et surtout **organisé**.

Le framework vous impose un cadre : c'est sa force.

---

## Le cadre de Laravel : MVC

```
Navigateur → Route → Contrôleur → Vue (Blade) → HTML
```

Chaque brique a **un seul rôle**.

---

## Les routes

Le point d'entrée : une URL, une action.

```php
Route::get('/ping', function () {
    return "pong";
});
```

Toutes déclarées dans `routes/web.php`.

---

## Question

On pourrait écrire **tout le code** de l'application dans les routes…

Bonne idée ?

---

## Non : le contrôleur

Une classe dont le rôle est de **répondre aux requêtes** :

```php
Route::get('/ping', [PingPongControleur::class, 'ping']);
```

La route dit « qui répond », le contrôleur dit « comment ».

---

## Les vues : Blade

Le HTML, avec des **directives** en plus :

```html
<h1>{{ $word }}</h1>

@foreach($todos as $todo)
  <li>{{ $todo }}</li>
@endforeach
```

Chaque directive = du PHP que vous connaissez déjà.

---

## Question

Votre site a 20 pages, toutes avec le même entête et le même pied de page.

Vous les copiez 20 fois ?

---

## Le layout

Un template « parent » écrit **une seule fois** :

```html
@extends('layouts.base')

@section('content')
   <h1>PONG</h1>
@endsection
```

Le parent définit la structure (`@yield`), les enfants remplissent les trous.

---

## artisan : votre couteau suisse

```sh
php artisan serve            # Lancer le serveur
php artisan make:controller  # Créer un contrôleur
php artisan route:list       # Lister les routes
```

Le terminal vous fait gagner du temps. Beaucoup.

---

## Les formulaires

Deux réflexes dès aujourd'hui :

- `@csrf` dans chaque formulaire (protection anti-rejeu).
- Un **message flash** après le traitement : un message stocké en session, affiché une seule fois.

---

## Récapitulatif

- Un framework = du code déjà écrit **et** un cadre.
- **Route** : une URL → une action.
- **Contrôleur** : la classe qui répond.
- **Blade** : des vues avec layout et directives.
- **artisan** : tout se fait en ligne de commande.

---

## Des questions ?

Place au TP 🚀
