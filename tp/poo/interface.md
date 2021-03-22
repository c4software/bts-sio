# Le principe des interfaces

Dans cette mise en pratique nous allons voir comment déclarer et utiliser des `Interfaces PHP`. Les interfaces sont un éléments importants de la programmation objet, pour rappel les Interfaces sont des class abstraites (instanciation impossible):

- Va d'écrire un comportement.
- Définir les signatures des méthodes et propriétés
- Garantir au code qui fait l'appel que la méthode existera.

C'est donc un contrat que la `class` **doit respecter** si elle implémente l'interface, si celle-ci implémente une Interface elle devra forcément avoir l'ensemble des méthodes « décrite » dans l'interface.

::: details Sommaire
[[toc]]
:::

## Cas concret : L'interface Surface

Je vous propose d'illustrer les Interfaces avec le calcul d'une surface. Objectifs :

- Pratiquer les Interfaces.
- Création d'une Interface `IISurface`.
  - L'interface `IISurface` doit contenir une méthode `public` nommée `surface()` celle-ci doit retourner un `int`
- Utiliser l'interface dans l'ensemble des `class` formes (`Circle`, `Square`, …).
  - Implémenter le code pour chaque « forme », celui-ci doit retourner la surface de chaque `forme`
- Valider que le code fonctionne.

### Déclarer l'interface

La première étape est de créer l'interface en elle-même :

```php
interface IISurface{
    public function surface(): int;
}
```

### Créer la class Circle

Nous avons maintenant notre Interface, celle-ci seule ne fait rien. Elle est abstraite il faut donc créer des `class` qui vont `implements` cette Interface. Notre class permet le calcul de la surface ; je vous propose donc de créer une première `class Circle` :

- Première étape créer votre fichier php `Circle.class.php`.
- Créer le code de votre class. **Votre class doit implements IISurface**

Je vous aide voilà le début de la classe

```php
class Circle implements IISurface{

}
```

- Je vous laisse trouver les/la `propriété(s)` nécessaire au bon fonctionnement de la `class`.
- Je vous laisse implémenter le code de la méthode `Surface`.

::: details Code de la class (à ne regarder que si vous ne trouvez pas)

Avez-vous vraiment cherché ?

```php
<?php
include_once("SurfaceInterface.php");

class Circle implements IISurface
{
    private $r = 0;

    public function __construct($r)
    {
        $this->r = $r;
    }

    public function surface(): int
    {
        // Je vous laisse écrire le code
    }
}
```

:::

### Créer la class Square

En reprenant le principe de la class Circle, je vous laisse écrire le code de la class Square. Ici pas d'aide, mais comme dans le code précédent vous devez **implémenter l'interface IISurface**

- Première étape créer votre fichier php `Square.class.php`.
- Créer le code de votre class. **Votre class doit implements IISurface**

```php
class Square implements IISurface{

}
```

- Je vous laisse trouver les/la `propriété(s)` nécessaire au bon fonctionnement de la `class`.
- Je vous laisse implémenter le code de la méthode `Surface`.

### Valider le fonctionnement

En utilisant le code suivant, je vous laisse valider le fonctionnement :

```php
calculateSurfaceOf([new Circle(10), new Square(10)]);

foreach ($arr as $a){
        if($a instanceof IISurface) {
            echo "La surface est de {$a->surface()}<br />";
        } else {
            echo "La class n'implémente pas l'interface « Surface »";
        }
    }
```

- Utiliser ce code dans un nouveau fichier `index.php`.
- Valider que la surface fonctionne.

### Créer la class Rectangle

Même consigne que pour Circle et Square, je vous laisse travailler :

- Première étape créer votre fichier php `Rectangle.class.php`.
- Créer le code de votre class. **Votre class doit implements IISurface**
- L'ajouter dans la page de test `index.php`.
