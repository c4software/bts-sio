# La syntaxe Objet

Ce document présente la syntaxe objet avec des exemples PHP & Java

::: details Sommaire
[[toc]]
:::

## Introduction

### La POO c'est 3 concepts

- **Concept de modélisation** à travers la notion de classe et d’instanciation de ces classes.
- **Concept d’action** à travers la notion d’envoi de messages et de méthodes à l’intérieur des objets.
- **Concept de construction** par réutilisation et amélioration par l’utilisation de la notion d’héritage.

::: tip Mais surtout
Ça permet de représenter **informatiquement** quelque chose du monde réel.
:::

### Deux notions

- Les classes
- Les objets

### Les classes

- Serviront de moule pour créer des objets.
- Une classe étant **une définition**, elle nous servira plus tard à créer **des objets**.

#### Une classe est composée de :

- D'attributs (variable d'instance ou propriété).
- De méthodes (actions / opération au niveau de la classe).

#### Nous avons donc deux types membres dans la classe

- Des **propriétés** (le données de l'objet) **avec une visibilité**
- Des **méthodes** (les actions possibles : accélérer, freiner, etc.) **avec une visibilité**

#### La visibilité ?

- Privée : accessible que dans l'objet.
- Public : accessible hors de l'objet.
- Protected : **non accessible** aux enfants (héritage)

#### Les méthodes

- Comme une fonction, mais **encapsulé** dans la classe.
- Possède une visibilité.
- Possède des paramètres.
- Surcharge: plusieurs **méthodes** peuvent avoir le même nom et des paramètres différents (type et/ou ordre).

#### Les types de méthodes

- Le constructeur.
- Les méthodes d'actions.
- Les méthodes accesseurs / mutateurs.

### Exemple

![Exemple modélisation](./res/modelisation-personne.png)

```php
class Personne
{

    // Attribut
    public $nom;
    public $prenom;
    private $dateNaissance;
    private $salaire;
    public $nbEnfant;


    // Constructeur
    function __construct($nom, $prenom, $dateNaissance, $nbEnfant = 0)
    {
        $this->nom = $nom;
        $this->prenom = $prenom;
        $this->dateNaissance = $dateNaissance;
        $this->nbEnfant = $nbEnfant;
    }

    // Mutateurs
    public function setSalaire($valeur)
    {
        $this->salaire = $valeur;
    }

    // Accesseur
    public function getSalaire($valeur)
    {
        return $this->salaire;
    }


    // Méthode
    public function identite(){
        return $this->nom . " " . $this->prenom;
    }

    // Méthode
    public function age()
    {
        // Implémentation
    }

    // Méthode
    public function argentPoche()
    {
        // Implémentation
    }
}
```

::: danger Ce qu'il faut retenir

- Les classes sont instanciables (création d'objets, `$unPersonne = new Personne(…)`).
- Les propriétés sont les « variables » de l'objet.
- Les méthodes sont les « actions » de l'objet.
- Les méthodes **et** les propriétés _**ont des visiblités**_.
- Les méthodes peuvent être surchargées.

:::

## Les objets

Chaque objet représente un objet du monde réel

### exemple :

- une personne **précise**
- une voiture **spécifique**
- Un élément de menu.

⚠️ Utilise les classes précédemment définies ⚠️

```php
$personne1 = new Personne("Valentin", "Brosseau", "28/02/1987", 0);
$personne2 = new Personne("John", "Doe", "01/01/1970", 12);
```

👀 Créer un objet == Instancier 👀

---

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

![Représentation UML](./res/collections-uml.png)

En modélisation, la fleche signife un lien entre les deux classes. En l'occurence, dans le cas des collections nous aurons :

- Le nom « de la collection » qui va contenir les objets.
- Le nombre minimum & maximum.
- Exemple, **1** étudiant possède plusieurs devoir.

Fonctionnellement, nous allons donc avoir dans l'étudiant collection d'objet du type devoirs. Celle-ci sera nommée **lesDevoirs**. **lesDevoirs** sera une propriété de la classe Étudiant.

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
