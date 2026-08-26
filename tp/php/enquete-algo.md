---
description: "TP bonus : menez l'enquête à Algoville uniquement avec du PHP (foreach, if, compteurs, tableaux associatifs). Plusieurs histoires au choix, directement dans le navigateur."
---

# TP Bonus : Enquête PHP

::: details Sommaire
[[toc]]
:::

Vous savez maintenant écrire des conditions, des boucles et manipuler des tableaux en PHP. Il est temps de vérifier que vous savez vous en servir pour **raisonner sur des données**. Un crime a été commis à Algoville, la police a des fichiers… et rien d'autre. C'est à vous de jouer !

Ce TP reprend le principe de l'[Enquête SQL](/tp/php/sql/enquete.md) (que vous ferez plus tard dans l'année, avec des requêtes SQL) : mêmes enquêtes policières, mais ici tout se résout avec du code PHP que vous connaissez déjà : `foreach`, `if`, et quelques fonctions sur les chaînes.

::: tip Pour les étudiants en avance
Ce TP est un **bonus** : il n'est pas noté et ne demande aucun rendu. Vous pouvez le faire en autonomie, seul ou à deux, dès que vous avez terminé le TP en cours. Comptez environ une heure par histoire.
:::

## Avant de commencer

Il vous faut les bases du PHP : variables, conditions, boucles, tableaux associatifs et fonctions (les séries des [exercices en classe](./exercices.md) et le [support de cours](./support.md) sont vos amis). À la fin de ce TP, vous saurez explorer des données que vous n'avez pas créées, croiser plusieurs tableaux, et réduire 500 habitants à un seul nom.

::: details Rattrapage express : les outils dont vous aurez besoin
- `foreach ($habitants as $h) { … }` : parcourir un tableau.
- `$h["cle"]` : lire une valeur dans un tableau associatif.
- `if ($a && $b) { … }` : cumuler plusieurs conditions.
- `str_starts_with($texte, "abc")`, `str_ends_with($texte, "abc")`, `str_contains($texte, "abc")` : commence par, se termine par, contient.
- Garder un maximum : une variable `$record` qu'on met à jour dans la boucle quand on trouve mieux.
- Compter : `$compteur[$cle] = ($compteur[$cle] ?? 0) + 1;` (le `?? 0` donne une valeur par défaut la première fois).
:::

## Les règles du jeu

- Toutes les histoires se passent dans la même ville : mêmes tableaux, mêmes clés. Seules les données changent.
- Chaque enquête commence par la variable `$rapport` : le rapport de police. Il vous dit comment trouver les témoins, les témoins décrivent le coupable, et parfois le coupable vous mène plus loin encore.
- Les dates sont stockées sous la forme d'un nombre entier `AAAAMMJJ` (le 16 janvier 2024 s'écrit `20240116`), les heures sous la forme `HHMM` (`1830` pour 18h30).
- Quand vous pensez avoir trouvé, vous **accusez** quelqu'un en appelant la fonction `verifier()`, fournie avec les données. Elle vous répond si c'est la bonne personne… et si l'enquête continue :

```php
verifier("Prénom Nom");
```

- Le journal de bord au-dessus de l'éditeur coche les étapes au fur et à mesure de vos accusations réussies (dans votre navigateur uniquement).

::: warning Interdit
Pas de `print_r($habitants);` en espérant repérer le coupable à l'œil : il y a 500 habitants. L'objectif est justement d'écrire des boucles et des conditions qui **réduisent** la liste jusqu'à n'avoir qu'un seul nom. Et évitez les `while` sans condition de sortie : une boucle infinie fige l'onglet, il faudra recharger la page.
:::

::: details La méthode, en quatre étapes (à lire une fois, puis à garder sous le coude)
Quelle que soit l'histoire, la démarche est toujours la même.

**Étape 1 : lire le rapport de police**

```php
<?php

echo $rapport;
```

Le rapport ne donne jamais un nom, seulement une manière de **retrouver les témoins** (une rue, un prénom, un revenu…).

**Étape 2 : identifier les témoins**

Quelques exemples de formulations et le code qui va avec :

| Le rapport dit… | Vous cherchez… |
| --- | --- |
| « la dernière maison de la rue X » | le plus grand `numero` de la rue : une variable `$record` mise à jour dans la boucle |
| « le plus petit numéro de la rue X » | pareil, mais dans l'autre sens |
| « prénommé Lucas, rue X » | `str_starts_with($h["nom"], "Lucas ")` en plus du test sur la rue |
| « la personne au revenu le plus élevé de la rue X » | le plus grand `revenu` de la rue |

Une fois le témoin identifié, lisez son témoignage : parcourez `$temoignages` en comparant `habitant_id` avec l'`id` du témoin. C'est là que se trouvent les indices sur le coupable.

**Étape 3 : croiser les indices**

Chaque témoin donne un ou plusieurs indices (une description, une plaque, des passages à un endroit…). **Tous** les indices sont nécessaires : la ville contient volontairement des personnes qui correspondent à presque tout.

Écrivez une boucle sur `$habitants` et cumulez les conditions dans le même `if`. Testez au fur et à mesure : à chaque condition ajoutée, le nombre de noms affichés doit diminuer.

**Que se passe-t-il derrière ?**
Quand un indice parle de « trois passages à un endroit », un simple `if` ne suffit pas : il faut d'abord **compter** les passages de chaque habitant dans un tableau compteur, puis filtrer sur ce compteur. C'est exactement ce que fait une base de données quand vous lui demandez un `GROUP BY … HAVING COUNT(*)`, vous le verrez plus tard dans l'année.

**Étape 4 : valider, puis continuer**

Validez avec `verifier("Prénom Nom");`. Si le message vous dit que l'histoire continue, lisez le témoignage de la personne démasquée : elle a peut-être été payée par quelqu'un.
:::

## Les données

Tout ce que la police sait tient dans quatre tableaux (et le rapport) :

| Tableau | Clés | Contenu |
| --- | --- | --- |
| `$habitants` | `id`, `nom`, `genre`, `age`, `taille`, `cheveux`, `rue`, `numero`, `revenu` | les 500 habitants d'Algoville |
| `$vehicules` | `habitant_id`, `marque`, `modele`, `plaque` | les voitures (tout le monde n'en a pas) |
| `$temoignages` | `habitant_id`, `texte` | ce que les gens ont déclaré à la police |
| `$passages` | `habitant_id`, `lieu`, `date`, `heure` | le registre des badges d'entrée des équipements municipaux |

Le lien entre les tableaux, c'est l'`id` de l'habitant : `$vehicules`, `$temoignages` et `$passages` portent tous une clé `habitant_id`. Un élément de `$habitants` ressemble à ceci :

```php
["id" => 42, "nom" => "Marie Dupont", "genre" => "femme", "age" => 34, "taille" => 168,
 "cheveux" => "brun", "rue" => "Rue des Lilas", "numero" => 12, "revenu" => 32000]
```

## À vous de jouer : choisissez votre enquête

Sélectionnez une histoire, lisez le brief, puis écrivez votre code dans l'éditeur. Tout s'exécute dans votre navigateur grâce à PHP compilé en WebAssembly (le premier « Exécuter » télécharge PHP, environ 13 Mo, une seule fois).

<ClientOnly>
<AlgoEnquete />
</ClientOnly>

::: tip Vous préférez travailler dans votre éditeur habituel ?
Le lien « Télécharger les données » vous donne un fichier `.php` autonome (données + fonction `verifier()`). Placez-le à côté de votre script et commencez par `require "nom_du_fichier.php";` : le code est exactement le même.
:::

## Enquête n° 1 : on la fait ensemble

Pour prendre en main l'outil, nous allons résoudre **Le vol de la médiathèque** ensemble, étape par étape. Sélectionnez cette histoire dans l'éditeur ci-dessus, copiez chaque bloc de code et comparez votre résultat au mien. Les autres histoires seront à faire seul.

### 1. Le rapport de police

Le lien « Insérer le code de départ » écrit ce code pour vous :

```php
<?php

echo $rapport;
```

Exécutez. Le rapport nous apprend qu'un témoin a tout vu, et qu'il « vit au dernier numéro de « Rue des Tilleuls » ». Pas de nom : il va falloir le trouver.

### 2. Trouver le témoin

« Le dernier numéro de la rue », c'est **le plus grand `numero` parmi les habitants de cette rue**. La technique : parcourir `$habitants`, ignorer tout le monde sauf les habitants de la rue, et garder en mémoire le plus grand numéro rencontré.

```php
<?php

$temoin = null;
$record = 0;
foreach ($habitants as $h) {
    if ($h["rue"] === "Rue des Tilleuls" && $h["numero"] > $record) {
        $record = $h["numero"];
        $temoin = $h;
    }
}
echo $temoin["nom"];
```

::: details Pourquoi `$record = 0;` avant la boucle ?
On part du plus petit numéro possible. À chaque habitant de la rue dont le numéro dépasse le record actuel, on met à jour le record **et** on mémorise l'habitant complet (pas seulement son numéro : c'est son nom et son `id` qui nous intéressent ensuite). À la fin de la boucle, `$temoin` contient forcément l'habitant au plus grand numéro. Si vous cherchez un jour le plus **petit** numéro, il suffira d'inverser la comparaison et de partir d'un record très grand (`PHP_INT_MAX`).
:::

### 3. Lire son témoignage

Notre témoin s'appelle Gaston Lefebvre. Ce qu'il a déclaré à la police est dans `$temoignages`, relié par `habitant_id`. Ajoutez à la suite de votre code :

```php
foreach ($temoignages as $t) {
    if ($t["habitant_id"] === $temoin["id"]) {
        echo $t["texte"];
    }
}
```

Le témoignage décrit la voleuse : une femme, entre 44 et 48 ans, entre 158 et 161 cm, cheveux noirs.

### 4. Croiser les indices

Quatre conditions, une boucle, un seul `if` :

```php
<?php

foreach ($habitants as $h) {
    if ($h["genre"] === "femme"
        && $h["cheveux"] === "noir"
        && $h["taille"] >= 158 && $h["taille"] <= 161
        && $h["age"] >= 44 && $h["age"] <= 48) {
        echo $h["nom"] . "\n";
    }
}
```

Un seul nom s'affiche. Essayez de retirer une des conditions et réexécutez : plusieurs suspects apparaissent. C'est voulu, la ville contient des habitants qui correspondent à presque toute la description. **Chaque indice compte.**

::: details La couleur est « noir » ou « noirs » ?
Regardez le tableau : la clé `cheveux` contient la couleur au singulier (`"noir"`, `"brun"`, `"roux"`…). Le témoignage, lui, parle français (« les cheveux noirs »). Quand un test ne renvoie rien, vérifiez toujours la valeur **exacte** stockée dans les données.
:::

### 5. Accuser

```php
verifier("le nom que vous avez trouvé");
```

::: tip Point de contrôle
Le journal de bord affiche « ✔ Étape 1 » et le message vous félicite : l'enquête est résolue. Si le message dit « Ce n'est pas la bonne personne », vérifiez l'orthographe exacte du nom (copiez-collez-le depuis votre sortie).
:::

## Enquêtes suivantes : indices et solutions

Les histoires suivantes se corsent : plusieurs témoins, des voitures à croiser avec les habitants, des passages à compter, et même une fausse piste. Pour chacune, des indices dégressifs puis une solution complète. Essayez d'abord sans indice !

### Sabotage au gymnase

<!--@include: ../../public/enquete-algo/solutions/gymnase.md-->

### Le disparu du marché couvert

<!--@include: ../../public/enquete-algo/solutions/marche.md-->

### Fausse piste au carnaval

<!--@include: ../../public/enquete-algo/solutions/carnaval.md-->

## Pour aller plus loin

Vous avez tout résolu ? Quelques défis en plus, sans correction :

- Écrivez une fonction `trouverParNom(array $habitants, string $nom): ?array` qui renvoie un habitant complet à partir de son nom, et utilisez-la pour relire les témoignages plus vite.
- Écrivez une fonction `habitantsDeLaRue(array $habitants, string $rue): array` qui renvoie tous les habitants d'une rue, et comptez combien chaque rue a d'habitants.
- Refaites l'enquête n° 1 en remplaçant vos boucles par `array_filter()` et une fonction anonyme.

Et quand vous découvrirez le SQL au second semestre, revenez faire l'[Enquête SQL](/tp/php/sql/enquete.md) : ce sont les mêmes enquêtes, et vos boucles deviendront des requêtes d'une ligne.

## Conclusion

Dans ce TP vous avez :

- exploré des données que vous n'avez pas créées, en lisant leur structure ;
- filtré un tableau avec `foreach` + `if`, en cumulant les conditions ;
- cherché un maximum et un minimum avec une variable record ;
- croisé deux tableaux grâce à un identifiant commun ;
- compté des occurrences avec un tableau compteur ;
- utilisé `str_starts_with`, `str_ends_with` et `str_contains` pour fouiller des chaînes.

Autrement dit : vous avez fait à la main ce qu'une base de données fera pour vous plus tard. Quand vous écrirez vos premières requêtes SQL, souvenez-vous de ces boucles, tout deviendra limpide.

👋 Si vous avez des questions, n'hésitez pas !
