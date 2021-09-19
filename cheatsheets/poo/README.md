# La synthaxe Objet

Ce document présente la synthaxe objet avec des exemples PHP & Java

::: details Sommaire
[[toc]]
:::

## Définir une classe

En PHP:

```php
class Personne
{
}
```

En Java:

```java
class Personne {
}
```

## Instanciation (Créer un objet)

En PHP:

```php
$unePersonne = new Personne("Valentin", "Brosseau");
```

En Java:

```java
Personne unPersonne = new Personne("Valentin", "Brosseau");
```

## Le constructeur

En PHP:

```php
class Personne
{
    private $nom;
    private $prenom;

    // Constructeur
    function __construct($nom, $prenom)
    {
        $this->nom = $nom;
        $this->prenom = $prenom;
    }
}
```

En Java:

```java
class Personne {
    private final String nom;
    private final String prenom;

    public Personne(String nom, String prenom) {
        this.nom = nom;
        this.prenom = prenom;
    }
}
```

## Accès à une méthode

En PHP:

```php
$unePersonne = new Personne("Valentin", "Brosseau");
$unPersonne->afficheIdentite();
```

En Java :

```java
Personne unPersonne = new Personne("Valentin", "Brosseau");
unePersonne.afficheIdentite();
```

## Accès à une propriété

En PHP:

```php
$unePersonne = new Personne("Valentin", "Brosseau");
$unPersonne->afficheIdentite();
```

En Java :

```java
Personne unPersonne = new Personne("Valentin", "Brosseau");
unePersonne.afficheIdentite();
```

::: tip Attention

L'accès au propriété ne fonctionnera que si la visibilité (`private`, `public`, `protected`) ne vous y autorise :

|  Visibilité |                                                                     Accès depuis |
| ----------: | -------------------------------------------------------------------------------: |
|   `private` |                                             Seulement depuis l'objet en lui même |
|    `public` |                 Depuis n'import où (objet, depuis l'objet, ou depuis l'héritage) |
| `protected` | Comme `private` **mais non accessible depuis la classe fille en cas d'héritage** |

:::

## Les collections

Permet de regrouper des listes d'objets.

### Déclaration

En PHP:

```php
$lesPersonnes = [];
```

En Java :

```java
ArrayList<Personne> lesPersonnes = new ArrayList();
```

### Utilisation

En PHP:

```php
$lesPersonnes = [];
$unePersonne = new Personne("Doe", "John");

array_push($lesPersonnes, new Personne("Brosseau", "Valentin"));
array_push($lesPersonnes, $unePersonne);

$nombre = sizeof($lesPersonnes); // 2

$unePersonne1 = $lesPersonnes[0]; // Valentin Brosseau
$unePersonne2 = $lesPersonnes[1]; // John Doe

$lesPersonnes = [];
$nombre = sizeof($lesPersonnes); // 0
```

En Java :

```java
ArrayList<Personne> lesPersonnes = new ArrayList<>();
Personne carine = new Personne("John", "Doe");

lesPersonnes.add(new Personne("Valentin", "Brosseau"));
lesPersonnes.add(carine);
int count = lesPersonnes.size(); // 2

Personne laPersonne1 = lesPersonnes.get(0); // Valentin;
Personne laPersonne2 = lesPersonnes.get(1); // Carine;

lesPersonnes.clear();
int count2 = lesPersonnes.size(); // 0
```

### Parcours de collection

En PHP :

```php
foreach($lesPersonne as $laPersonne){
    // $laPersonne contient « un pointeur » vers une des personne de la liste
    // À chaque tour de boucle nous avons la personne suivante.
}
```

En Java :

```java
// Version moderne
lesPersonnes.forEach(laPersonne -> {
    // laPersonne contient « un pointeur » vers une des personne de la liste
    // À chaque tour de boucle nous avons la personne suivante.
});

// Version « à l'ancienne »
for (Personne laPersonne : lesPersonnes) {
    // laPersonne contient « un pointeur » vers une des personne de la liste
    // À chaque tour de boucle nous avons la personne suivante.
}
```

## Les méthodes static

En PHP:

```php
// Déclaration
class Personne {
    static function laReponseDeLunivers(){
        return 42;
    }
}

// Utilisation
Personne::laReponseDeLunivers();
```

En Java :

```java
// Déclaration
class Personne {
    static int laReponseDeLunivers(){
        return 42;
    }
}

// Utilisation
Personne.laReponseDeLunivers();
```

## L'héritage

En PHP:

```php
class Mammifere {
    private $vertebre = true;

    public print() {
        echo "Je suis un mammifère";
    }
}

class Humain extends mammifere {
    private $prenom = "";

    function __construct($prenom)
    {
        parent::__construct();
        this->$prenom = $prenom;
    }
}

$unePersonne = new Humain("Valentin");
$unePersonne->print(); // Je suis un mammifère.
```

En Java :

```java
class Mammifere {
    private Boolean vertebre = true;

    public void print() {
        System.out.println("Je suis un mammifère");
    }
}

class Humain extends mammifere {
    private String prenom = "";

    function Hunain(String prenom)
    {
        super();
        this.prenom = prenom;
    }
}

Humain unePersonne = new Humain("Valentin");
unePersonne.print(); // Je suis un mammifère.
```

## Les namespaces (organisation des classes)

```php
namespace Mammifere\Primate ;

class Personne { // etc...
}
```
