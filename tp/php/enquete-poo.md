---
description: "TP bonus : menez l'enquête à Algoville avec de la programmation orientée objet (objets, encapsulation, interfaces). Trois histoires de difficulté croissante, directement dans le navigateur."
---

# TP Bonus : Enquête POO

::: details Sommaire
[[toc]]
:::

Vous connaissez les classes, les objets, les interfaces et le polymorphisme. Il est temps de les mettre au service d'une bonne vieille enquête policière. Algoville a encore des ennuis… mais cette fois, les habitants ne sont plus des tableaux : ce sont des **objets**.

Ce TP est la suite orientée objet de l'[Enquête PHP](./enquete-algo.md) (version procédurale, à faire d'abord si vous ne la connaissez pas) : mêmes principes, mêmes types d'indices, mais un code encapsulé dans une logique objet. Chaque histoire monte d'un cran dans les notions utilisées.

::: tip Pour les étudiants en avance
Ce TP est un **bonus** : il n'est pas noté et ne demande aucun rendu. Vous pouvez le faire en autonomie, seul ou à deux, dès que vous avez terminé le TP en cours. Comptez environ une heure par histoire.
:::

## Avant de commencer

Il vous faut [les bases de la POO](/cours/poo), [les interfaces](/cours/les_interfaces) et idéalement [le polymorphisme](/cours/poo_redefinition_polymorphisme). L'[aide-mémoire POO](/cheatsheets/poo/) est un bon compagnon. À la fin de ce TP, vous saurez parcourir des collections d'objets, interroger un objet qui encapsule des données, organiser votre code dans vos propres classes, et implémenter une interface pour composer des critères de recherche.

::: details Rattrapage express : la syntaxe dont vous aurez besoin
- `$h->age`, `$h->nom` : lire une propriété d'un objet.
- `$ville->habitants()` : appeler une méthode.
- `foreach ($ville->habitants() as $h) { … }` : parcourir une collection d'objets.
- `$v = $ville->vehiculeDe($h); if ($v !== null && …)` : une méthode peut renvoyer `null`, testez-le.
- `class MonCritere implements Critere { … }` : implémenter une interface.
- `new MonCritere("roux")` : instancier avec des arguments de constructeur.
:::

## Les règles du jeu

Les règles sont celles de l'[Enquête PHP](./enquete-algo.md#les-regles-du-jeu) : le rapport de police comme point de départ, des témoins, des indices **tous nécessaires**, les dates en `AAAAMMJJ`, les heures en `HHMM`, et l'accusation avec :

```php
verifier("Prénom Nom");
```

La différence : plus de tableaux `$habitants` ou `$vehicules` en vrac. Toutes les données sont encapsulées dans un objet `$ville`, déjà créé pour vous.

::: warning Interdit
Toujours pas de « j'affiche tout et je lis » : 500 habitants, l'objectif est d'écrire du code qui **réduit** la liste. Et évitez les boucles infinies : l'onglet se figerait, il faudrait recharger la page.
:::

## Les classes fournies

Chaque histoire vous donne les mêmes classes (dépliables aussi dans l'éditeur) :

| Classe | Propriétés | Méthodes |
| --- | --- | --- |
| `Habitant` | `id`, `nom`, `genre`, `age`, `taille`, `cheveux`, `rue`, `numero`, `revenu` (toutes en lecture seule) | `prenom(): string`, `habite(string $rue): bool` |
| `Vehicule` | `habitantId`, `marque`, `modele`, `plaque` | `appartientA(Habitant $h): bool` |
| `Passage` | `habitantId`, `lieu`, `date`, `heure` | `estA(string $lieu): bool` |
| `Ville` | (privées : c'est le principe de l'encapsulation) | `rapport(): string`, `habitants(): array`, `vehiculeDe(Habitant $h): ?Vehicule`, `temoignageDe(Habitant $h): ?string`, `passagesDe(Habitant $h): array` |

Et pour la dernière histoire :

```php
interface Critere
{
    public function accepte(Habitant $h): bool;
}

/** Renvoie les habitants qui passent TOUS les critères. */
function filtrer(Ville $ville, Critere ...$criteres): array
```

::: details Question : pourquoi ne peut-on plus faire `$habitants[3]["cheveux"]` ?
Parce que les données sont **encapsulées** : la classe `Ville` garde ses tableaux privés et n'expose que des méthodes. Vous ne pouvez plus dépendre de la façon dont les données sont stockées, seulement du **contrat** de la classe (ses méthodes publiques). Si demain `Ville` stockait ses habitants dans une base de données, votre code d'enquête ne changerait pas d'une ligne. C'est exactement l'intérêt de l'encapsulation vu en cours.
:::

## À vous de jouer : choisissez votre enquête

Tout s'exécute dans votre navigateur grâce à PHP compilé en WebAssembly (le premier « Exécuter » télécharge PHP, environ 13 Mo, une seule fois). Le lien « Télécharger les données » fournit un `.php` autonome (classes + données + `verifier()`) si vous préférez travailler dans votre éditeur avec un `require`.

<ClientOnly>
<AlgoEnquete mode="poo" />
</ClientOnly>

## Histoire 5 : l'affaire de l'observatoire, semi-guidée

Sélectionnez **L'affaire de l'observatoire**. C'est la prise en main du monde objet : je vous montre le début, vous finissez.

### 1. Le rapport

```php
<?php

echo $ville->rapport();
```

Le gardien « habite la dernière maison de « Chemin du Parc » ». Comme dans la version procédurale, il faut trouver le plus grand `numero` de la rue, mais cette fois `$h` est un **objet** :

```php
<?php

$temoin = null;
$record = 0;
foreach ($ville->habitants() as $h) {
    if ($h->habite("Chemin du Parc") && $h->numero > $record) {
        $record = $h->numero;
        $temoin = $h;
    }
}
echo $temoin->nom . "\n";
echo $ville->temoignageDe($temoin);
```

Remarquez : `$h->numero` au lieu de `$h["numero"]`, et surtout `$ville->temoignageDe($temoin)` : plus besoin de boucler sur un tableau de témoignages, la ville s'en charge (elle peut renvoyer `null` si la personne n'a rien déclaré).

### 2. La voleuse

Le témoin décrit une femme, son âge, ses cheveux… et sa voiture. La description se teste directement sur les propriétés de `Habitant`. Pour la voiture, demandez à la ville :

```php
$v = $ville->vehiculeDe($h);
```

Attention : `$v` peut être `null` (tout le monde n'a pas de voiture), testez `$v !== null` **avant** de lire `$v->marque`.

::: details Coup de pouce : la structure de la boucle
```php
foreach ($ville->habitants() as $h) {
    $v = $ville->vehiculeDe($h);
    if ($v !== null
        && $h->genre === "..."
        && ...) {
        echo $h->nom . "\n";
    }
}
```
:::

Un seul nom doit s'afficher. Accusez avec `verifier(...)`, lisez le témoignage de la voleuse : l'enquête continue vers un mystérieux collectionneur, que vous trouverez seul (une adresse et un revenu : tout est dans les propriétés de `Habitant`).

::: tip Point de contrôle
Les deux étapes du journal de bord sont cochées et le message final vous félicite. Les indices dégressifs sont ci-dessous si vous bloquez.
:::

<!--@include: ../../public/enquete-algo/solutions/observatoire.md-->

## Histoire 6 : le fantôme du théâtre, dans une classe

Sélectionnez **Le fantôme du théâtre**. Nouveauté : des indices en « n passages à tel endroit », à compter avec `$ville->passagesDe($h)`. Et une exigence de forme : le directeur du théâtre veut un travail propre, donc **votre code d'enquête vit dans une classe à vous** :

```php
final class EnqueteFantome
{
    public function __construct(private Ville $ville)
    {
    }

    /** @return Habitant[] */
    public function suspects(): array
    {
        // votre filtre ici : parcourez les habitants, comptez les passages,
        // et retournez un tableau d'objets Habitant (pas des echo !)
    }
}

$enquete = new EnqueteFantome($ville);
foreach ($enquete->suspects() as $suspect) {
    echo $suspect->nom . "\n";
}
```

C'est le même filtre qu'avant, mais **encapsulé** : la méthode `suspects()` retourne des objets, l'affichage reste à l'extérieur. Une méthode privée `nombreDePassages(Habitant $h): int` est une bonne idée pour garder `suspects()` lisible.

<!--@include: ../../public/enquete-algo/solutions/theatre.md-->

## Histoire 7 : le naufrage de la régate, avec des critères

Sélectionnez **Le naufrage de la régate**. Dernier niveau, et pas des moindres : chaque indice devient une **classe critère** qui implémente l'interface `Critere`, et la fonction `filtrer()` les combine. Méfiez-vous aussi des fausses pistes…

Un critère, c'est une toute petite classe :

```php
final class CheveuxDeCouleur implements Critere
{
    public function __construct(private string $couleur)
    {
    }

    public function accepte(Habitant $h): bool
    {
        return $h->cheveux === $this->couleur;
    }
}
```

Et l'enquête devient une composition, lisible comme une phrase :

```php
$suspects = filtrer(
    $ville,
    new CheveuxDeCouleur("roux"),
    new AgeEntre(40, 45),
);
foreach ($suspects as $suspect) {
    echo $suspect->nom . "\n";
}
```

À vous d'écrire les classes critères dont l'histoire a besoin : couleur de cheveux, âge, plaque qui contient un fragment (le critère aura besoin de `$ville` dans son constructeur pour appeler `vehiculeDe()`), nombre de passages à un lieu… Chaque classe fait UNE chose, et `filtrer()` les assemble.

::: details Question : pourquoi `filtrer()` fonctionne avec n'importe quel critère ?
Parce que `filtrer()` ne connaît que l'interface `Critere` : elle appelle `accepte($h)` sans savoir (ni avoir besoin de savoir) quelle classe concrète est derrière. Dix critères différents, un seul code de filtrage : c'est le **polymorphisme** du cours, appliqué à quelque chose d'utile.
:::

<!--@include: ../../public/enquete-algo/solutions/regate.md-->

## Pour aller plus loin

- Ajoutez un critère générique `Non(Critere $c)` qui inverse n'importe quel critère (« tous les habitants qui ne sont PAS roux »), et un critère `Ou(Critere ...$criteres)`. Vous venez d'écrire un moteur de requêtes.
- Réécrivez l'histoire 5 avec vos critères de l'histoire 7 : combien de lignes gagnez-vous ?
- Comparez vos solutions avec celles de l'[Enquête SQL](/tp/php/sql/enquete.md) : `filtrer($ville, …)` ressemble beaucoup à un `WHERE … AND …`, non ? Ce n'est pas un hasard.

## Conclusion

Dans ce TP vous avez :

- parcouru des collections d'objets et lu leurs propriétés ;
- travaillé avec une classe encapsulée en respectant son contrat public ;
- géré des méthodes qui renvoient `null` ;
- structuré une enquête dans votre propre classe, avec des méthodes qui retournent des objets ;
- implémenté une interface et composé des critères grâce au polymorphisme.

Trois histoires, trois façons d'organiser le même raisonnement : c'est exactement ça, la conception objet : choisir la structure qui rend le code lisible.

👋 Si vous avez des questions, n'hésitez pas !
