Structure : 2 témoins, puis un personnage à identifier (réponse 1), puis un personnage à identifier (réponse 2).

::: details Indice 1 : les témoins
- un prénom sur « Avenue Pasteur » : `str_starts_with(...nom..., "Ines ")` en plus du test sur la rue.
- le numéro le plus petit de « Rue du Stade » : parcourez `$habitants`, gardez le plus petit `numero` de la rue.

Une fois trouvés, lisez leur témoignage : parcourez `$temoignages` en comparant `habitant_id` avec l'`id` du témoin.
:::

::: details Indice 2 : le coupable
Les indices viennent de : Ines Roussel (physique), Marcel Guerin (vehicule).

- **physique** : la description (genre, cheveux, âge, taille) est directement dans `$habitants` ; les intervalles se testent avec `>=` et `<=`.
- **vehicule** : la voiture est dans `$vehicules`, reliée par `habitant_id` ; un fragment de plaque se teste avec `str_starts_with`, `str_ends_with` ou `str_contains`.

Cumulez toutes les conditions dans le même `if` : à chaque indice ajouté, la liste affichée doit raccourcir.
Une fois validé, lisez son témoignage : l'enquête continue.
:::

::: details Indice 3 : la personne derrière tout ça
Les indices viennent de : Bruno Marchal (adresse, revenu).

- **adresse** : la `rue` (et le `numero`) sont directement dans `$habitants`.
- **revenu** : le `revenu` est directement dans `$habitants`.

Cumulez toutes les conditions dans le même `if` : à chaque indice ajouté, la liste affichée doit raccourcir.
:::

::: details Voir l'une des solutions possibles
```php
// Témoin : Ines Roussel
$temoin = null;
foreach ($habitants as $h) {
    if ($h["rue"] === "Avenue Pasteur" && str_starts_with($h["nom"], "Ines ")) {
        $temoin = $h;
    }
}
echo $temoin["nom"] . "\n";
foreach ($temoignages as $t) {
    if ($t["habitant_id"] === $temoin["id"]) {
        echo $t["texte"] . "\n";
    }
}

// Témoin : Marcel Guerin
$temoin = null;
$record = PHP_INT_MAX;
foreach ($habitants as $h) {
    if ($h["rue"] === "Rue du Stade" && $h["numero"] < $record) {
        $record = $h["numero"];
        $temoin = $h;
    }
}
echo $temoin["nom"] . "\n";
foreach ($temoignages as $t) {
    if ($t["habitant_id"] === $temoin["id"]) {
        echo $t["texte"] . "\n";
    }
}

// Réponse 1 : Bruno Marchal
$vehiculeDe = [];
foreach ($vehicules as $v) {
    $vehiculeDe[$v["habitant_id"]] = $v;
}
foreach ($habitants as $h) {
    if ($h["genre"] === "homme"
    && $h["cheveux"] === "brun"
    && isset($vehiculeDe[$h["id"]])
    && $vehiculeDe[$h["id"]]["marque"] === "Ford"
    && str_starts_with($vehiculeDe[$h["id"]]["plaque"], "1M6S")) {
        echo $h["nom"] . "\n";
    }
}

verifier("Bruno Marchal");

// Réponse 2 : Josephine Baron
foreach ($habitants as $h) {
    if ($h["rue"] === "Avenue du Parc"
    && $h["numero"] >= 10 && $h["numero"] <= 30
    && $h["revenu"] > 100000) {
        echo $h["nom"] . "\n";
    }
}

verifier("Josephine Baron");

```
:::
