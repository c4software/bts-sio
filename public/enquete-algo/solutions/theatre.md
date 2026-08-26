Structure : 1 témoin, puis un personnage à identifier (réponse 1), puis un personnage à identifier (réponse 2).

::: details Indice 1 : les témoins
- un prénom sur « Rue Émile-Zola » : `str_starts_with(...nom..., "Margaux ")` en plus du test sur la rue.

Une fois trouvés, lisez leur témoignage avec `$ville->temoignageDe($temoin)`.
:::

::: details Indice 2 : le coupable
Les indices viennent de : Margaux Prieur (passage, physique).

- **physique** : la description (genre, cheveux, âge, taille) est portée par les propriétés de `Habitant`.
- **passage** : comptez les objets de `$ville->passagesDe($h)` qui correspondent (lieu, date, heure).

Cumulez toutes les conditions dans le même `if` : à chaque indice ajouté, la liste affichée doit raccourcir.
Une fois validé, lisez son témoignage : l'enquête continue.
:::

::: details Indice 3 : la personne derrière tout ça
Les indices viennent de : Serge Humbert (physique, vehicule).

- **physique** : la description (genre, cheveux, âge, taille) est portée par les propriétés de `Habitant`.
- **vehicule** : demandez `$ville->vehiculeDe($h)` (qui peut renvoyer `null`) puis testez la plaque avec `str_starts_with`, `str_ends_with` ou `str_contains`.

Cumulez toutes les conditions dans le même `if` : à chaque indice ajouté, la liste affichée doit raccourcir.
:::

::: details Voir l'une des solutions possibles
```php
// Témoin : Margaux Prieur
$temoin = null;
$record = 0;
foreach ($ville->habitants() as $h) {
    if ($h->rue === "Rue Émile-Zola" && $h->revenu > $record) {
        $record = $h->revenu;
        $temoin = $h;
    }
}
echo $temoin->nom . "\n";
echo $ville->temoignageDe($temoin) . "\n";

// Réponse 1 : Serge Humbert
final class EnqueteFantome
{
    public function __construct(private Ville $ville)
    {
    }

    /** @return Habitant[] */
    public function suspects(): array
    {
        $ville = $this->ville;
        $resultat = [];
        foreach ($ville->habitants() as $h) {
            $nb = 0;
            foreach ($ville->passagesDe($h) as $p) {
                if ($p->lieu === "Théâtre de la Passerelle" && intdiv($p->date, 100) === 202501) {
                    $nb++;
                }
            }
            if ($h->genre === "homme" && $h->taille >= 163 && $h->taille <= 167 && $nb === 4) {
                $resultat[] = $h;
            }
        }
        return $resultat;
    }
}

$enquete = new EnqueteFantome($ville);
foreach ($enquete->suspects() as $suspect) {
    echo $suspect->nom . "\n";
}

verifier("Serge Humbert");

// Réponse 2 : Monique Vallet
final class EnqueteActrice
{
    public function __construct(private Ville $ville)
    {
    }

    /** @return Habitant[] */
    public function suspects(): array
    {
        $ville = $this->ville;
        $resultat = [];
        foreach ($ville->habitants() as $h) {
            $v = $ville->vehiculeDe($h);
            if ($v !== null && $h->genre === "femme" && $h->cheveux === "blond" && $v->marque === "Citroën" && str_starts_with($v->plaque, "1R9N")) {
                $resultat[] = $h;
            }
        }
        return $resultat;
    }
}

$enquete = new EnqueteActrice($ville);
foreach ($enquete->suspects() as $suspect) {
    echo $suspect->nom . "\n";
}

verifier("Monique Vallet");

```
:::
