Structure : 1 témoin, puis un personnage à identifier (réponse 1), puis un personnage à identifier (réponse 2).

::: details Indice 1 : les témoins
- le numéro le plus grand de « Chemin du Parc » : parcourez `$ville->habitants()`, gardez le plus grand `numero` de la rue.

Une fois trouvés, lisez leur témoignage avec `$ville->temoignageDe($temoin)`.
:::

::: details Indice 2 : le coupable
Les indices viennent de : Hugo Chapuis (physique, vehicule).

- **physique** : la description (genre, cheveux, âge, taille) est portée par les propriétés de `Habitant`.
- **vehicule** : demandez `$ville->vehiculeDe($h)` (qui peut renvoyer `null`) puis testez la plaque avec `str_starts_with`, `str_ends_with` ou `str_contains`.

Cumulez toutes les conditions dans le même `if` : à chaque indice ajouté, la liste affichée doit raccourcir.
Une fois validé, lisez son témoignage : l'enquête continue.
:::

::: details Indice 3 : la personne derrière tout ça
Les indices viennent de : Laure Guichard (adresse, revenu).

- **adresse** : les propriétés `rue` et `numero` de `Habitant` (ou la méthode `habite()`).
- **revenu** : la propriété `revenu` de `Habitant`.

Cumulez toutes les conditions dans le même `if` : à chaque indice ajouté, la liste affichée doit raccourcir.
:::

::: details Voir l'une des solutions possibles
```php
// Témoin : Hugo Chapuis
$temoin = null;
$record = 0;
foreach ($ville->habitants() as $h) {
    if ($h->rue === "Chemin du Parc" && $h->numero > $record) {
        $record = $h->numero;
        $temoin = $h;
    }
}
echo $temoin->nom . "\n";
echo $ville->temoignageDe($temoin) . "\n";

// Réponse 1 : Laure Guichard
foreach ($ville->habitants() as $h) {
    $v = $ville->vehiculeDe($h);
    if ($v !== null
    && $h->genre === "femme"
    && $h->cheveux === "roux"
    && $h->age >= 64 && $h->age <= 69
    && $v->marque === "Toyota"
    && $v->modele === "Yaris") {
        echo $h->nom . "\n";
    }
}

verifier("Laure Guichard");

// Réponse 2 : Albert Delmas
foreach ($ville->habitants() as $h) {
    if ($h->rue === "Impasse de la Paix"
    && $h->numero >= 37 && $h->numero <= 47
    && $h->revenu > 150000) {
        echo $h->nom . "\n";
    }
}

verifier("Albert Delmas");

```
:::
