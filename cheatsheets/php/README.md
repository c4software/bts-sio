# Aide mémoire PHP

Aide mémoire sur les structures PHP. Vous retrouverez dans cet aide mémoire les éléments que nous avons vus ensemble.

::: warning
Cet aide mémoire n'est pas exhaustif, elle ne contient que le minimum à connaitre pour débuter sereinement.  
:::

## Structure

Pour être exécuté votre code doit-être dans un fichier nommé `quelqueschoses.php` et doit être mis tel que :

```php
<?php
// Votre code
?>
```

## Passer des paramètres à la page

Pour envoyer le paramètre `param` à la page `index.php` :

- `http://localhost/index.php?param=abc`

Pour envoyer le paramètre `param` & `nb` à la page `index.php` :

- `http://localhost/index.php?param=abc&nb=10`

## Les variables

```php
$var1 = 1; // Valeur numérique
$var2 = "Démonstration"; // Valeur texte
$var3 = true; // Valeur Booléene
$var4 = Array("a","b","c"); // Tableau
```

| Type      | Contenu                   | Type d'opération                | Usage                                                                                                               |
| --------- | ------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `string`  | "Une chaine de caractère" | Gestion du texte, concaténation | Permets de stocker du texte (saisie utilisateur par exemple). La valeur doit être entourée de « `"` » ou de « `'` » |
| `int`     | 42                        | Opération mathématique          | Comme en mathématique                                                                                               |
| `boolean` | `True` ou `False`         | Opération logique               | Permets de faire des actions logiques. C'est un type très important en informatique                                 |
| `float`   | 10.3                      | Opération mathématique          | Comme en mathématique. Attention la notation du chiffre à virgule est avec un `.`.                                  |
| `array`   | ["a", "b", "c"]           |                                 | Contiens des listes de « quelques choses »                                                                          |

::: tip

Pour concaténer / fusionner deux variables en PHP nous utiliseront le caractère `.` exemple :

```php
echo "=> " . $var1 . "<=";
```

:::

### Les superglobales

| Variables   | Usage                                                                                                               |
| ----------- | ------------------------------------------------------------------------------------------------------------------- |
| `$_SERVER`  | Contiens les informations « technique » de la connexion. Adresse IP du client, etc.                                 |
| `$_GET`     | Contiens les paramètres envoyés dans l'URL.                                                                         |
|             | `index.php?prenom=valentin`, `prenom` est donc un paramètre et `valentin` la valeur.                                |
|             | Vous pouvez avoir plusieurs paramètres avec le caractère `&`. <br> Ex. `index.php?nom=brosseau&prenom=valentin`     |
| `$_POST`    | Contiens les paramètres envoyés dans le corps de la requête (on y reviendra)                                        |
| `$_FILES`   | Contiens les fichiers envoyés à votre serveur (nous y reviendrons)                                                  |
| `$_SESSION` | Permets de sauvegarder des valeurs pour quelques minutes des valeurs le temps de la navigation (nous y reviendrons) |
| `$_COOKIES` | Permets de sauvegarder des valeurs pour un temps plus long (mais pas illimité, nous y reviendrons)                  |

## Les conditions

```php
$age = 22;
if($var3 === 22){
    echo "Je suis affiché si $age est === 22";
}


if($age >= 18) {
    echo "Vous pouvez passer le permis";
} else {
    echo "Encore un peu de patience… Pour le permis c'est à 18ans";
}
```

Vérifier si une variable existe :

```php
if(isset($_GET['param'])){
    // ici la variable $_GET['param'] est présente
}
```

## Les boucles

_La boucle while_ :

```php
$i = 0;
$max = 100;
while($i < $max){
    echo "Je serais affiché 100x";
    $i = $i + 1; // équivalent à $i++;
}
```

_La boucle for_ :

```php
$max = 100;

for ($i = 0; $ecrite <= $max; $i++){
    echo "Je vais m'afficher 100x";
}
```

```php
$etudiants = array(
    array('nom' => 'Brosseau'),
    array('nom' => 'Doe')
);

// Je vais afficher l'ensemble des étudiants présent dans le tableau.
for($i = 0; $i < count($etudiants); ++$i) {
    echo $etudiants[$i]['nom'];
}
```

_La boucle foreach_ :

Identique à la boucle `for` mais plus concise

```php
$etudiants = array(
    array('nom' => 'Brosseau'),
    array('nom' => 'Doe')
);

// Je vais afficher l'ensemble des étudiants présent dans le tableau.
foreach ($etudiants as $current) {
    echo $current['nom'];
}
```

## Les fonctions

Déclarer une fonction

```php
function gateauHugette($duree){
    $oeuf = 3;
    $sucre = 100;
    $farine = 50;
    $beurre = 100;
    $chocolat = 200;

    $melange = $oeuf + $sucre + $farine + $beurre+ $chocolat;

    return "Cuire $duree minutes le mélange de $melange gramme.";
}
```

utiliser la fonction :

```php
echo gateauHugette(50);
// Je vais afficher à l'écran "Cuire 50 minutes le mélange de 453 gramme.";
```

## Exemple simple

Exemple de fichier PHP avec traitement, accessible via un lien du type :

- `http://localhost/index.php`
- `http://localhost/index.php?nb=10`
- `http://localhost/index.php?nb=100&phrase=Ceci est un test`

```php
$nb_lignes = 25; // Nombre de phrases à écrire par défaut
$phrase = 0; // Nombre de phrases actuellement écrites
$a_ecrire = "Ceci est ma phrase par défaut"; // phrase par défaut

// Test si le paramètre nb est passé dans la barre d'adresse.
if(isset($_GET['nb'])){
    // on redéfinie nb_ligne par rapport à ce qui est dans la barre
    $nb_lignes = $_GET['nb'];
}

// Test si phrase est passé en paramètre
if(isset($_GET['phrase'])){
    $a_ecrire = $_GET['phrase'];
}

// Traitement
// Boucle qui affiche les phrases.
while($phrase < $nb_lignes){
    echo "<p>" . $a_ecrire . "</p>";
    $phrase = $phrase + 1; // équivalent à $phrase++;
}
```
