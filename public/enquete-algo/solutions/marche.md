Structure : 1 témoin, puis un personnage à identifier (réponse 1), puis un personnage à identifier (réponse 2).

::: details Indice 1 : les témoins
- un prénom sur « Rue du Moulin » : `str_starts_with(...nom..., "Colette ")` en plus du test sur la rue.

Une fois trouvés, lisez leur témoignage : parcourez `$temoignages` en comparant `habitant_id` avec l'`id` du témoin.
:::

::: details Indice 2 : le coupable
Les indices viennent de : Colette Hamon (passage, physique).

- **physique** : la description (genre, cheveux, âge, taille) est directement dans `$habitants` ; les intervalles se testent avec `>=` et `<=`.
- **passage** : les passages sont dans `$passages`, reliés par `habitant_id` ; pour « n fois », comptez avec un tableau compteur : `$compteur[$p["habitant_id"]] = ($compteur[$p["habitant_id"]] ?? 0) + 1;`.

Cumulez toutes les conditions dans le même `if` : à chaque indice ajouté, la liste affichée doit raccourcir.
Une fois validé, lisez son témoignage : l'enquête continue.
:::

::: details Indice 3 : la personne derrière tout ça
Les indices viennent de : Thierry Vasseur (revenu, vehicule).

- **vehicule** : la voiture est dans `$vehicules`, reliée par `habitant_id` ; un fragment de plaque se teste avec `str_starts_with`, `str_ends_with` ou `str_contains`.
- **revenu** : le `revenu` est directement dans `$habitants`.

Cumulez toutes les conditions dans le même `if` : à chaque indice ajouté, la liste affichée doit raccourcir.
:::

::: details Voir l'une des solutions possibles
```php
// Témoin : Colette Hamon
$temoin = null;
$record = PHP_INT_MAX;
foreach ($habitants as $h) {
    if ($h["rue"] === "Rue du Moulin" && $h["revenu"] < $record) {
        $record = $h["revenu"];
        $temoin = $h;
    }
}
echo $temoin["nom"] . "\n";
foreach ($temoignages as $t) {
    if ($t["habitant_id"] === $temoin["id"]) {
        echo $t["texte"] . "\n";
    }
}

// Réponse 1 : Thierry Vasseur
$compteur = [];
foreach ($passages as $p) {
    if ($p["lieu"] === "Marché couvert" && intdiv($p["date"], 100) === 202405) {
        $compteur[$p["habitant_id"]] = ($compteur[$p["habitant_id"]] ?? 0) + 1;
    }
}
foreach ($habitants as $h) {
    if ($h["genre"] === "homme"
    && $h["cheveux"] === "brun"
    && ($compteur[$h["id"]] ?? 0) === 3) {
        echo $h["nom"] . "\n";
    }
}

verifier("Thierry Vasseur");

// Réponse 2 : Edith Fleury
$vehiculeDe = [];
foreach ($vehicules as $v) {
    $vehiculeDe[$v["habitant_id"]] = $v;
}
foreach ($habitants as $h) {
    if ($h["revenu"] > 150000
    && isset($vehiculeDe[$h["id"]])
    && str_contains($vehiculeDe[$h["id"]]["plaque"], "1F6D")) {
        echo $h["nom"] . "\n";
    }
}

verifier("Edith Fleury");

```
:::
