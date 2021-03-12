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

## Ajout de l'authentification

Nous allons intégrer l'authentification en utilisant [Laravel Breeze](https://laravel.com/docs/8.x/starter-kits#laravel-breeze) ce paquet `Composer` va ajouter l'ensemble des :

- routes
- contrôleur
- middleware
- Vue (templates blades)

Permettant de gérer simplement l'ensemble des problématiques.

### Ajout de la dépendance

L'ajout de dépendances, pour cette étape aucun problème, il suffit d'ajouter dans votre projet « breeze » dans le dossier de votre projet :

```sh
composer require laravel/breeze --dev
```

Une fois ajoutée, nous allons devoir installer breeze pour que celui-ci active l'ensemble des fonctionnalités :

```sh
php artisant migrate

php artisan breeze:install

php artisant migrate
```

::: tip Que c'est il passé ?

Nous venons d'ajouter des nouvelles routes, celle-ci sont dans le dossier `route/auth.php` **mais ce n'est pas tout** vous avez également maintenant l'ensemble des contrôleurs mais également l'ensemble des `Layout Blade` nécéssaires à toute la partie authentification.

Pour le reste c'est dans les dossiers que vous connaissez déjà.
:::
