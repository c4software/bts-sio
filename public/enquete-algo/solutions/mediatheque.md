Structure : 1 témoin, puis un personnage à identifier (réponse 1).

::: details Indice 1 : les témoins
- le numéro le plus grand de « Rue des Tilleuls » : parcourez `$habitants`, gardez le plus grand `numero` de la rue.

Une fois trouvés, lisez leur témoignage : parcourez `$temoignages` en comparant `habitant_id` avec l'`id` du témoin.
:::

::: details Indice 2 : le coupable
Les indices viennent de : Gaston Lefebvre (physique).

- **physique** : la description (genre, cheveux, âge, taille) est directement dans `$habitants` ; les intervalles se testent avec `>=` et `<=`.

Cumulez toutes les conditions dans le même `if` : à chaque indice ajouté, la liste affichée doit raccourcir.
:::

::: details Voir l'une des solutions possibles
```php
// Témoin : Gaston Lefebvre
$temoin = null;
$record = 0;
foreach ($habitants as $h) {
    if ($h["rue"] === "Rue des Tilleuls" && $h["numero"] > $record) {
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

// Réponse 1 : Camille Perrot
foreach ($habitants as $h) {
    if ($h["genre"] === "femme"
    && $h["cheveux"] === "noir"
    && $h["taille"] >= 158 && $h["taille"] <= 161
    && $h["age"] >= 44 && $h["age"] <= 48) {
        echo $h["nom"] . "\n";
    }
}

verifier("Camille Perrot");

```
:::
