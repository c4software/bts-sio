# Eloquent et les modèles générés

## Quand la base existe déjà

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Jusqu'ici

Vous partiez de zéro : migration → table → modèle.

Question : et si la base de données **existe déjà** ?

---

## Un cas très courant en entreprise

- Vous reprenez un projet existant.
- La base est gérée par une autre équipe.
- Le logiciel a 10 ans, la base est là avant vous.

On inverse donc : la base d'abord, les modèles ensuite.

---

## Un modèle « complet », c'est quoi ?

- Le `$fillable`.
- Et surtout : les **relations** entre les tables.

```php
$order->customer->contactFirstName
```

Pas de requête SQL écrite… mais elle a bien lieu.

---

## Pas de magie

```php
public function customer()
{
    return $this->belongsTo(Customer::class, 'customerNumber');
}
```

`$order->customer` appelle cette méthode, qui génère la requête.

Ce code est dans la documentation, pas dans votre imagination.

---

## Question

Votre base a **20 tables**.

Vous écrivez les 20 modèles et toutes leurs relations à la main ?

---

## Le générateur de modèles

Un plugin lit la structure de la base (colonnes, **clés étrangères**) et écrit les modèles pour vous :

```sh
php artisan code:models
```

Quelques secondes, tous les modèles, relations comprises.

---

## La condition : le nommage

Le générateur ne devine que si vos tables respectent les **conventions** :

- Table au pluriel (`customers`).
- Table pivot : les deux noms au singulier, ordre alphabétique (`category_customer`).

Sinon ? Les relations s'écrivent à la main.

---

## La relation plusieurs à plusieurs

```
customers  ←  category_customer  →  categories
```

Un client a plusieurs catégories, une catégorie a plusieurs clients.

La table du milieu s'appelle une table **pivot**.

---

## Trois verbes pour le pivot

```php
$customer->categories()->attach([1, 2]); // Ajoute
$customer->categories()->sync([3, 4]);   // Remplace tout
$customer->categories()->detach(1);      // Retire
```

À votre avis, lequel est le plus « dangereux » ?

---

## sync

Il **supprime** les relations existantes avant d'ajouter les nouvelles.

Parfait pour un formulaire d'édition… à éviter pour un simple ajout.

---

## Cadeau bonus : la pagination

```php
Order::paginate(10);
```

```html
{{ $orders->links() }}
```

Deux lignes, et Laravel gère pages, liens et compteurs. Le framework, encore.

---

## Récapitulatif

- Base existante → modèles **générés** (`code:models`), relations comprises.
- Pas de magie : le générateur écrit le code de la documentation.
- Les **conventions de nommage** rendent la génération possible.
- `attach` / `sync` / `detach` pour les tables pivot.
- `paginate()` + `links()` : la pagination en deux lignes.

---

## Des questions ?

Place au TP 🚀
