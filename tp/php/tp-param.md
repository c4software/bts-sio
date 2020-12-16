# Le passage de paramètres

Nous allons illustrer le passage de paramètres grâce à la Greta TV. Ce TP va nous permettre de mieux comprendre l'intérêt des paramètres.

Nous allons produire le code qui va nous permettre de réaliser la page suivante :

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/sGStM92OIG0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- Deux pages
- Responsive
- Un paramètre

## Rappel sur les paramètres

| Variables | Usage                                                                                                           |
| --------- | --------------------------------------------------------------------------------------------------------------- |
| `$_GET`   | Contiens les paramètres envoyés dans l'URL.                                                                     |
|           | `index.php?prenom=valentin`, `prenom` est donc un paramètre et `valentin` la valeur.                            |
|           | Vous pouvez avoir plusieurs paramètres avec le caractère `&`. <br> Ex. `index.php?nom=brosseau&prenom=valentin` |

```php
// Exemple $_GET Contiendra
array(
    "prenom" => "valentin",
    "nom" => "brosseau",
);

echo $_GET['nom']; // Affichera brosseau
echo $_GET['prenom']; // Affichera valentin

echo $_GET['nom'] . " " . $_GET['prenom']; // Affichera brosseau valentin
```
