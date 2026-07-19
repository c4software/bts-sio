# L'authentification avec Breeze

## Ne plus tout recoder

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Souvenez-vous

Dans les TP précédents, vous avez codé **à la main** :

- Le hash des mots de passe.
- La session et `Auth::`.
- Le middleware de protection.
- Le reset par token.

---

## Question

Nouveau projet lundi matin.

Vous recodez tout ?

---

## Non : le scaffolding

**Générer** le code de départ (routes, contrôleurs, vues) en une commande.

Breeze est le kit officiel de Laravel pour l'authentification.

---

## Ce que Breeze génère

- Inscription, connexion, déconnexion.
- Mot de passe oublié (token, expiration, email).
- Vérification d'email, page de profil.

Tout ce que vous avez codé… et un peu plus.

---

## Pas une boîte noire

Le code généré est **dans votre projet** : lisible, modifiable.

Et vous partez avec un avantage : vous savez **ce qu'il y a dedans**.

---

## npm dans un projet PHP ?

Breeze s'appuie sur **Tailwind** (CSS) et **Vite** (compilation des ressources) :

```sh
npm install
npm run dev
```

Le monde du front s'invite côté PHP : habituez-vous, c'est partout.

---

## Tailwind ?

Un framework CSS « utilitaire » : des petites classes à composer.

```html
<div class="text-center font-bold text-indigo-600">
```

Même objectif que Bootstrap, approche différente.

---

## Les composants Blade

```html
<x-guest-layout>   pour les visiteurs
<x-app-layout>     pour les connectés
```

L'équivalent moderne de `@extends` : le layout devient une balise.

---

## Protéger une page

```php
Route::get('/dashboard', …)->middleware(['auth']);
```

À votre avis, que fait ce middleware `auth` derrière ?

---

## Vous le savez déjà !

C'est votre `CheckAuth` : un `Auth::check()`, et une redirection vers la connexion sinon.

Breeze ne fait **rien** que vous ne sachiez expliquer.

---

## Récapitulatif

- Le **scaffolding** : générer le code de départ, pas le cacher.
- Breeze = une authentification complète, prête à modifier.
- Tailwind + Vite : `npm run dev` pendant le développement.
- `<x-layout>` : les composants remplacent l'héritage.
- Vous savez ce qu'il y a dedans : utilisez-le en confiance.

---

## Des questions ?

Place au TP 🚀
