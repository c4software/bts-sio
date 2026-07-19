# De PHP à Laravel

## La transition

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Votre bagage de première année

- Des pages PHP, des formulaires.
- `$_GET`, `$_POST`, `$_SESSION`.
- PDO pour la base de données.

Ça fonctionne. Alors pourquoi changer ?

---

## Question

Votre site grossit : 30 pages, 3 développeurs sur le projet.

Que se passe-t-il ?

---

## Le code s'éparpille

- Chaque page refait le même code (`session_start()`, `require`…).
- Chacun range à sa façon.
- La sécurité dépend de la vigilance de chacun.

---

## Le framework

Un cadre commun : du code déjà écrit, et surtout **une seule façon de ranger**.

Laravel est le framework PHP le plus utilisé au monde.

---

## Rien de nouveau, tout est équivalent

Ce TP consiste à **traduire** ce que vous savez déjà :

```
Un lien            →  une Route
Une page PHP       →  une Vue (Blade)
$_GET / $_POST     →  $request->input()
$_SESSION          →  $request->session()
```

---

## Les routes

```php
Route::get('/hello', function () {
    return "Hello World !";
});
```

Une URL → une action. Toutes déclarées au même endroit : `routes/web.php`.

---

## Question

En PHP pur, l'URL c'était le nom du fichier (`/contact.php`).

Quel intérêt de séparer les deux ?

---

## L'URL devient indépendante du code

Vous pouvez réorganiser vos fichiers sans casser les liens, protéger des URL, en créer plusieurs vers la même action…

Le fichier n'est plus exposé directement : c'est la route qui décide.

---

## Les vues : Blade

`resources/views/hello.blade.php` : du HTML, plus des facilités.

```html
<h1>Hello, {{ $name }}</h1>
```

`{{ $name }}` remplace vos `echo`, en version sécurisée.

---

## $_GET, $_POST ?

```php
$name = $request->input('name');
```

La **même écriture** quelle que soit la source (GET ou POST).

Seule obligation en POST : la directive `@csrf` dans le formulaire.

---

## Les sessions

```php
$request->session()->put('name', 'John');
$name = $request->session()->get('name');
```

Votre `$_SESSION`, en version objet. Et plus besoin de `session_start()`.

---

## Deux nouveaux outils

- **Composer** : installe Laravel et ses dépendances (comme npm pour le JavaScript).
- **artisan** : la ligne de commande de Laravel (`php artisan serve` pour lancer le site).

---

## Récapitulatif

- Un framework = du code déjà écrit **et** un rangement imposé.
- Route = le lien, Vue = la page, Contrôleur = votre code PHP.
- `$request` remplace `$_GET` / `$_POST`, `session()` remplace `$_SESSION`.
- Vous savez déjà tout faire en PHP pur : ce TP traduit.

---

## Des questions ?

Place au TP 🚀
