Structure : 1 témoin, puis une fausse piste, puis un personnage à identifier (réponse 1), puis un personnage à identifier (réponse 2).

::: details Indice 1 : les témoins
- un prénom sur « Rue du Port » : `str_starts_with(...nom..., "Paul ")` en plus du test sur la rue.

Une fois trouvés, lisez leur témoignage avec `$ville->temoignageDe($temoin)`.
:::

::: details Indice 2 : la fausse piste
Les indices viennent de : Paul Cordier (adresse, physique).

- **physique** : la description (genre, cheveux, âge, taille) est portée par les propriétés de `Habitant`.
- **adresse** : les propriétés `rue` et `numero` de `Habitant` (ou la méthode `habite()`).

Cumulez toutes les conditions dans le même `if` : à chaque indice ajouté, la liste affichée doit raccourcir.
Une fois validé, lisez son témoignage : l'enquête continue.
:::

::: details Indice 3 : le coupable
Les indices viennent de : Denis Leveque (passage, physique, vehicule).

- **physique** : la description (genre, cheveux, âge, taille) est portée par les propriétés de `Habitant`.
- **vehicule** : demandez `$ville->vehiculeDe($h)` (qui peut renvoyer `null`) puis testez la plaque avec `str_starts_with`, `str_ends_with` ou `str_contains`.
- **passage** : comptez les objets de `$ville->passagesDe($h)` qui correspondent (lieu, date, heure).

Cumulez toutes les conditions dans le même `if` : à chaque indice ajouté, la liste affichée doit raccourcir.
Une fois validé, lisez son témoignage : l'enquête continue.
:::

::: details Indice 4 : la personne derrière tout ça
Les indices viennent de : Fanny Monnier (physique, revenu, vehicule).

- **physique** : la description (genre, cheveux, âge, taille) est portée par les propriétés de `Habitant`.
- **vehicule** : demandez `$ville->vehiculeDe($h)` (qui peut renvoyer `null`) puis testez la plaque avec `str_starts_with`, `str_ends_with` ou `str_contains`.
- **revenu** : la propriété `revenu` de `Habitant`.

Cumulez toutes les conditions dans le même `if` : à chaque indice ajouté, la liste affichée doit raccourcir.
:::

::: details Voir l'une des solutions possibles
```php
// Témoin : Paul Cordier
$temoin = null;
foreach ($ville->habitants() as $h) {
    if ($h->rue === "Rue du Port" && str_starts_with($h->nom, "Paul ")) {
        $temoin = $h;
    }
}
echo $temoin->nom . "\n";
echo $ville->temoignageDe($temoin) . "\n";

// Fausse piste : Denis Leveque
final class GenreEst implements Critere
{
    public function __construct(private string $genre)
    {
    }

    public function accepte(Habitant $h): bool
    {
        return $h->genre === $this->genre;
    }
}
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
final class HabiteRue implements Critere
{
    public function __construct(private string $rue, private int $min = 0, private int $max = PHP_INT_MAX)
    {
    }

    public function accepte(Habitant $h): bool
    {
        return $h->rue === $this->rue && $h->numero >= $this->min && $h->numero <= $this->max;
    }
}

$suspects = filtrer(
    $ville,
    new GenreEst("homme"),
    new CheveuxDeCouleur("noir"),
    new HabiteRue("Rue Voltaire", 14, 24),
);
foreach ($suspects as $suspect) {
    echo $suspect->nom . "\n";
}

verifier("Denis Leveque");

// Réponse 1 : Fanny Monnier
final class AgeEntre implements Critere
{
    public function __construct(private int $min, private int $max)
    {
    }

    public function accepte(Habitant $h): bool
    {
        return $h->age >= $this->min && $h->age <= $this->max;
    }
}
final class PlaqueContient implements Critere
{
    public function __construct(private Ville $ville, private string $fragment)
    {
    }

    public function accepte(Habitant $h): bool
    {
        $v = $this->ville->vehiculeDe($h);
        return $v !== null && str_contains($v->plaque, $this->fragment);
    }
}
final class PassagesSaboteur implements Critere
{
    public function __construct(private Ville $ville)
    {
    }

    public function accepte(Habitant $h): bool
    {
        $nb = 0;
        foreach ($this->ville->passagesDe($h) as $p) {
            if ($p->lieu === "Piscine des Lilas" && intdiv($p->date, 100) === 202506) {
                $nb++;
            }
        }
        return $nb === 3;
    }
}

$suspects = filtrer(
    $ville,
    new GenreEst("femme"),
    new AgeEntre(55, 59),
    new PlaqueContient($ville, "1Y6V"),
    new PassagesSaboteur($ville),
);
foreach ($suspects as $suspect) {
    echo $suspect->nom . "\n";
}

verifier("Fanny Monnier");

// Réponse 2 : Charlotte Bailly
final class TailleEntre implements Critere
{
    public function __construct(private int $min, private int $max)
    {
    }

    public function accepte(Habitant $h): bool
    {
        return $h->taille >= $this->min && $h->taille <= $this->max;
    }
}
final class MarqueDeVoiture implements Critere
{
    public function __construct(private Ville $ville, private string $marque)
    {
    }

    public function accepte(Habitant $h): bool
    {
        $v = $this->ville->vehiculeDe($h);
        return $v !== null && $v->marque === $this->marque;
    }
}
final class ModeleDeVoiture implements Critere
{
    public function __construct(private Ville $ville, private string $modele)
    {
    }

    public function accepte(Habitant $h): bool
    {
        $v = $this->ville->vehiculeDe($h);
        return $v !== null && $v->modele === $this->modele;
    }
}
final class RevenuSuperieurA implements Critere
{
    public function __construct(private int $seuil)
    {
    }

    public function accepte(Habitant $h): bool
    {
        return $h->revenu > $this->seuil;
    }
}

$suspects = filtrer(
    $ville,
    new GenreEst("femme"),
    new CheveuxDeCouleur("roux"),
    new TailleEntre(193, 197),
    new MarqueDeVoiture($ville, "Tesla"),
    new ModeleDeVoiture($ville, "Model Y"),
    new RevenuSuperieurA(250000),
);
foreach ($suspects as $suspect) {
    echo $suspect->nom . "\n";
}

verifier("Charlotte Bailly");

```
:::
