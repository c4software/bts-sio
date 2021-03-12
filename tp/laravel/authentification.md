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
