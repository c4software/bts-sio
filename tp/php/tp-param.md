# Le passage de paramètres

Nous allons illustrer le passage de paramètres grâce à la Greta TV. Ce TP va nous permettre de mieux comprendre l'intérêt des paramètres.

Nous allons produire le code qui va nous permettre de réaliser les deux pages suivantes :

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/sGStM92OIG0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

L'objectif de ce code est d'illustrer le passage de paramètres entre deux pages via un paramètre GET. Celui-ci Contiendra :

- Deux pages
- Responsive
- Un paramètre (?id=...)

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

## Évolution 1

Je vous propose comme évolution d'ajouter un paramètre. Celui-ci devra nous permettre la personalisation du thème de la page `tv.php` (celle affichant les vidéos). Pour ça nous allons :

- Ajouter un paramètre `&bg=noel` ou `&bg=brick`, etc…
- Utiliser le paramètre pour personnaliser le thème de la page. (Le paramètres doit être utilisé en tant que `class`).

## Évolution 2

### Cas 1

Ajouter une CSS qui s'affichera uniquement aujourd'hui. Celle-ci doit modifier l'apparence de votre site Internet.

### Cas 2

Afficher une sélection de vidéo (card) en fonction de la periode de l'année. Par exemple 4 vidéos sur le thème de noel pendant la periode de noel.
