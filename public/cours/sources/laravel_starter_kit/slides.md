# L'authentification avec un starter kit

## Ne plus tout recoder, version 2026

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

**Générer** le code de départ (routes, vues, actions) en une commande.

```sh
laravel new mon-projet
```

---

## Les starter kits

Depuis Laravel 12, l'installeur propose quatre kits :

- React, Vue, Svelte (TypeScript + Inertia).
- **Livewire** : des vues en Blade, avec les composants Flux.

Ils remplacent Breeze.

---

## Question

Le kit génère les vues. Mais qui vérifie le mot de passe ?

---

## Fortify, le moteur

Tous les kits s'appuient sur **Fortify** :

- Fortify fournit les routes, les contrôleurs et la sécurité.
- Le kit fournit les vues, branchées avec `Fortify::loginView(…)`.
- Le métier est dans **votre** projet : `app/Actions/Fortify`.

---

## npm dans un projet PHP ?

Le kit s'appuie sur **Tailwind** (CSS) et **Vite** :

```sh
composer run dev
```

Le serveur PHP **et** Vite, en une commande.

---

## Des composants partout

```html
<x-layouts::app title="Yolo">
    <flux:button variant="primary">Envoyer</flux:button>
</x-layouts::app>
```

`x-…` : vos composants Blade. `flux:…` : ceux de Flux.

---

## Question

Une jolie carte de statistiques, il faut la dessiner soi-même ?

---

## HyperUI

Une bibliothèque de composants Tailwind **gratuits** (licence MIT) :

- On copie le HTML.
- On le colle dans `resources/views/components/stat.blade.php`.
- On l'utilise avec `<x-stat />`.

---

## La 2FA, déjà là

Le kit active la double authentification par application (**TOTP**) :

- Un secret partagé une seule fois (QR code).
- Un code calculé des deux côtés, toutes les 30 secondes.
- Des codes de récupération à usage unique.

---

## Question

Le téléphone est perdu. Le compte aussi ?

---

## Les codes de récupération

8 codes générés à l'activation, **à usage unique**.

À conserver hors du téléphone (papier, gestionnaire de mots de passe).

---

## Récapitulatif

- `laravel new` : un **starter kit** à la place de Breeze.
- **Fortify** fait tourner l'authentification, le kit fournit l'interface.
- On modifie le métier dans `app/Actions/Fortify`.
- Tailwind + Vite : `composer run dev` pendant le développement.
- HyperUI : des composants à copier, à transformer en `<x-…>`.
- La 2FA TOTP est incluse : vous savez ce qu'elle fait.

---

## Des questions ?

Place au TP 🚀
