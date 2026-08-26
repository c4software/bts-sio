Structure : 2 témoins, puis une fausse piste, puis un personnage à identifier (réponse 1).

::: details Indice 1 : les témoins
- un prénom sur « Boulevard Voltaire » : `str_starts_with(...nom..., "Louis ")` en plus du test sur la rue, et un `numero` entre 10 et 30.
- le numéro le plus grand de « Place Molière » : parcourez `$habitants`, gardez le plus grand `numero` de la rue.

Une fois trouvés, lisez leur témoignage : parcourez `$temoignages` en comparant `habitant_id` avec l'`id` du témoin.
:::

::: details Indice 2 : la fausse piste
Les indices viennent de : Louis Pasquier (physique), Rose Bertin (passage).

- **physique** : la description (genre, cheveux, âge, taille) est directement dans `$habitants` ; les intervalles se testent avec `>=` et `<=`.
- **passage** : les passages sont dans `$passages`, reliés par `habitant_id` ; pour « n fois », comptez avec un tableau compteur : `$compteur[$p["habitant_id"]] = ($compteur[$p["habitant_id"]] ?? 0) + 1;`.

Cumulez toutes les conditions dans le même `if` : à chaque indice ajouté, la liste affichée doit raccourcir.
Une fois validé, lisez son témoignage : l'enquête continue.
:::

::: details Indice 3 : le coupable
Les indices viennent de : Axel Bazin (adresse, vehicule).

- **vehicule** : la voiture est dans `$vehicules`, reliée par `habitant_id` ; un fragment de plaque se teste avec `str_starts_with`, `str_ends_with` ou `str_contains`.
- **adresse** : la `rue` (et le `numero`) sont directement dans `$habitants`.

Cumulez toutes les conditions dans le même `if` : à chaque indice ajouté, la liste affichée doit raccourcir.
:::

::: details Voir l'une des solutions possibles
```php
// Témoin : Louis Pasquier
$temoin = null;
foreach ($habitants as $h) {
    if ($h["rue"] === "Boulevard Voltaire" && str_starts_with($h["nom"], "Louis ") && $h["numero"] >= 10 && $h["numero"] <= 30) {
        $temoin = $h;
    }
}
echo $temoin["nom"] . "\n";
foreach ($temoignages as $t) {
    if ($t["habitant_id"] === $temoin["id"]) {
        echo $t["texte"] . "\n";
    }
}

// Témoin : Rose Bertin
$temoin = null;
$record = 0;
foreach ($habitants as $h) {
    if ($h["rue"] === "Place Molière" && $h["numero"] > $record) {
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

// Fausse piste : Axel Bazin
$compteur = [];
foreach ($passages as $p) {
    if ($p["lieu"] === "Salle des fêtes" && $p["date"] === 20240212 && $p["heure"] >= 1900 && $p["heure"] <= 2000) {
        $compteur[$p["habitant_id"]] = ($compteur[$p["habitant_id"]] ?? 0) + 1;
    }
}
foreach ($habitants as $h) {
    if ($h["genre"] === "homme"
    && $h["cheveux"] === "noir"
    && ($compteur[$h["id"]] ?? 0) >= 1) {
        echo $h["nom"] . "\n";
    }
}

verifier("Axel Bazin");

// Réponse 1 : Sylvie Delaunay
$vehiculeDe = [];
foreach ($vehicules as $v) {
    $vehiculeDe[$v["habitant_id"]] = $v;
}
foreach ($habitants as $h) {
    if ($h["rue"] === "Allée des Acacias"
    && $h["numero"] >= 26 && $h["numero"] <= 46
    && isset($vehiculeDe[$h["id"]])
    && $vehiculeDe[$h["id"]]["modele"] === "Berlingo"
    && str_ends_with($vehiculeDe[$h["id"]]["plaque"], "4P4Y")) {
        echo $h["nom"] . "\n";
    }
}

verifier("Sylvie Delaunay");

```
:::
