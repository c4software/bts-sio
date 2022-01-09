---
description: Ce document présente la syntaxe objet avec des exemples PHP & Java
---

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

### La modélisation

Avant de parler des classes ou des objets, je vous propose de regarder le principe de la modélisation

[Voir la version UML / Classe](/cheatsheets/poo-uml/)

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
- Protected : **Accessible** aux enfants (héritage) mais pas hors de la classe.

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

<CodeGroup>
  <CodeGroupItem title="PHP" active>

```php
class Personne
{
}
```

  </CodeGroupItem>

  <CodeGroupItem title="Java">

```java
class Personne {
}
```

  </CodeGroupItem>
</CodeGroup>

## Instanciation (Créer un objet)

<CodeGroup>
  <CodeGroupItem title="PHP" active>

```php
$unePersonne = new Personne("Valentin", "Brosseau");
```

  </CodeGroupItem>

  <CodeGroupItem title="Java">

```java
Personne unPersonne = new Personne("Valentin", "Brosseau");
```

  </CodeGroupItem>
</CodeGroup>

## Le constructeur

<CodeGroup>
  <CodeGroupItem title="PHP" active>

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

  </CodeGroupItem>

  <CodeGroupItem title="Java">

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

  </CodeGroupItem>
</CodeGroup>

## Accès à une méthode

<CodeGroup>
  <CodeGroupItem title="PHP" active>

```php
$unePersonne = new Personne("Valentin", "Brosseau");
$unPersonne->afficheIdentite();
```

  </CodeGroupItem>

  <CodeGroupItem title="Java">

```java
Personne unPersonne = new Personne("Valentin", "Brosseau");
unePersonne.afficheIdentite();
```

  </CodeGroupItem>
</CodeGroup>

## Accès à une propriété

<CodeGroup>
  <CodeGroupItem title="PHP" active>

```php
$unePersonne = new Personne("Valentin", "Brosseau");
$unPersonne->afficheIdentite();
```

  </CodeGroupItem>

  <CodeGroupItem title="Java">

```java
Personne unPersonne = new Personne("Valentin", "Brosseau");
unePersonne.afficheIdentite();
```

  </CodeGroupItem>
</CodeGroup>

::: tip Attention

L'accès au propriété ne fonctionnera que si la visibilité (`private`, `public`, `protected`) ne vous y autorise :

|  Visibilité |                                                                     Accès depuis |
| ----------: | -------------------------------------------------------------------------------: |
|   `private` |                                             Seulement depuis l'objet en lui même |
|    `public` |                 Depuis n'import où (objet, depuis l'objet, ou depuis l'héritage) |
| `protected` | Comme `private` **mais non accessible depuis la classe fille en cas d'héritage** |

:::

## Les collections

![Représentation UML](./res/collections_1.png)

::: tip Le losange vide

![Aggregation](./res/UML_Rel_aggregation.jpg)

Ce symbole signifie la notion d'appartenance.

:::

Permet de regrouper des listes d'objets.

![Représentation UML](./res/collections_2.png)

En modélisation, la fleche signife un lien entre les deux classes. En l'occurence, dans le cas des collections nous aurons :

- Le nom « de la collection » qui va contenir les objets.
- Le nombre minimum & maximum.
- Exemple, **1** étudiant possède plusieurs devoir.

Fonctionnellement, nous allons donc avoir dans l'étudiant collection d'objet du type devoirs. Celle-ci sera nommée **lesDevoirs**. **lesDevoirs** sera une propriété de la classe Étudiant.

### Déclaration

<CodeGroup>
  <CodeGroupItem title="PHP" active>

```php
$lesPersonnes = [];
```

  </CodeGroupItem>

  <CodeGroupItem title="Java">

```java
ArrayList<Personne> lesPersonnes = new ArrayList();
```

  </CodeGroupItem>
</CodeGroup>

### Utilisation

<CodeGroup>
  <CodeGroupItem title="PHP" active>

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

  </CodeGroupItem>

  <CodeGroupItem title="Java">

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

  </CodeGroupItem>
</CodeGroup>

### Parcours de collection

<CodeGroup>
  <CodeGroupItem title="PHP" active>

```php
foreach($lesPersonne as $laPersonne){
    // $laPersonne contient « un pointeur » vers une des personne de la liste
    // À chaque tour de boucle nous avons la personne suivante.
}
```

  </CodeGroupItem>

  <CodeGroupItem title="Java">

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

  </CodeGroupItem>
</CodeGroup>

## L'héritage

L'héritage permet de généraliser le fonctionnement d'un objet. L'idée est de mettre dans un « objet parent » la logique de plusieurs objets qui fonctionne de la même façon. **Exemple**

- Un **humain** et une baleine partage des propriété et fonctionnement commun. Nous allons donc créer une super classe **mammifère** celle-ci contiendra les méthodes et les propriétés commune.
- Une **Voiture** et une **Moto** sont des véhicule. Nous pouvons donc créer une super classe « **Véhicule** ».
- …

<CodeGroup>
  <CodeGroupItem title="PHP" active>

```php
class Mammifere {
    private $vertebre = true;

    public function print() {
        echo "Je suis un mammifère";
    }

    public function manger(){
        echo "Je mange";
    }
}

class Humain extends mammifere {
    private $prenom = "";

    function __construct($prenom)
    {
        parent::__construct();
        this->$prenom = $prenom;
    }

    public function manger(){
        echo "Je suis omnivore";
    }
}

$unHumain = new Humain("Valentin");
$unHumain->print(); // Je suis un mammifère.
$unHumain->manger(); // Je suis omnivore
```

  </CodeGroupItem>

  <CodeGroupItem title="Java">

```java
class Mammifere {
    private Boolean vertebre = true;

    public void print() {
        System.out.println("Je suis un mammifère");
    }

    // Redéfinition de méthode
    public String manger(){
        System.out.println("Je mange");
    }
}

class Humain extends mammifere {
    private String prenom = "";

    function Hunain(String prenom)
    {
        super();
        this.prenom = prenom;
    }

    // Redéfinition de méthode
    public String manger(){
        System.out.println("Je suis omnivore");
    }
}

Humain unHumain = new Humain("Valentin");
unHumain.print(); // Je suis un mammifère.
unHumain.manger(); // Je suis omnivore.
```

  </CodeGroupItem>
</CodeGroup>

## Synthèse héritage

- La classe mère contient la logique **partagée**.
- La classe fille contient la logique **spécifique**.
- Un mot-clé Extends `class Humain extends Mammifere`.
- **Vous devez** construire le parent dans le constructeur de l'enfant.
- **Permets de généraliser un objet afin de partager des propriétés communes.**.
- **mais** il est également possible de spécialiser / redéfinir un objet.
  - Redéfinition, comme la surcharge, mais entre la classe fille et la classe mère.

## Les méthodes static

<CodeGroup>
  <CodeGroupItem title="PHP" active>

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

  </CodeGroupItem>

  <CodeGroupItem title="Java">

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

  </CodeGroupItem>
</CodeGroup>

## Abstraction et Interface

### Les classes abstraites

Permets de définir des comportements (méthodes) dont l'implémentation (le code dans la méthode) se fait dans les classes filles.

> Ainsi, on a l'assurance que les classes filles respecteront le contrat défini par la classe mère abstraite.

Nous aurons donc deux types de classes :

- Des classes abstraites (sans code, non instanciable).
- Des classes concrètes (avec du code, et instanciable).

Une classe abstraite **doit posséder** au moins une méthode **abstraite** (c'est-à-dire sans code). Si nécessaire, elle peut également avoir des méthodes **concrètes** (avec du code).

Les classes abstraites :

- Ne peuvent pas être instanciées (pas de new).
- Sont des modèles pour d'autres classes.
- Permettent de factoriser du code.
- Doivent être héritée depuis une classe fille.

```php
abstract class EtudiantAbstrait
{
    // Force les classes filles à définir cette méthode
    abstract protected function getBlahBlah();
    abstract protected function demarrerUneDiscussion($sujet);

    // méthode commune
    public function parler() {
        print $this->getValue() . "\n";
    }
}

class EtudiantSIO extends AbstractClass
{
     protected function getBlahBlah() {
       return "L'informatique c'est cool";
     }

     public function demarrerUneDiscussion($sujet) {
       return "Je vais vous parler de « {$sujet} »";
    }
}

$class1 = new EtudiantSIO();
$class1->parler();
echo $class1->demarrerUneDiscussion('La sécurité') ."\n";
```

### Les Interfaces

Une Interface ressemble beaucoup à une classe abstraite. **Sauf que** celle-ci ne possède pas de code. Une Interface définit un comportement qui **devra être** implémenté par la classe fille.

Les classes filles **implémentent** une interface, une classe fille peut **implémenter** plusieurs interfaces.

Les interfaces :

- Ne contiennent que des méthodes publiques.
- Ne contiennent pas de code.
- N'est pas instanciable.
- Son « un contrat » que les classes filles devront **implémenter**.

```php
// Declaration de l'interface 'Template'
interface Compte
{
    public function deposer($montant);
    public function retirer($montant);
    public function getBalance();
}

class CompteEnLigne implements Compte
{
    private $montant = 0;

    public function deposer($montant){
        $this->montant += $montant;
    }

    public function retirer($montant){
        $this->montant -= $montant;
    }

    public function getBalance() {
        return $montant;
    }
}


$class1 = new CompteEnLigne();
$class1->deposer(1400);
$class1->getBalance(); // 1400

$class1->retirer(400);
$class1->getBalance(); // 1000
```

### Interfaces ou classes abstraites ?

Les interfaces et les classes abstraites remplissent un rôle différent :

- Les classes abstraites servent à factoriser du code.
- Les interfaces servent à définir un contrat de service.

::: tip Un instant !

L'avantage d'une Interface est qu'il est possible pour une classe d'implémenter plusieurs « contrat » (Interface). Alors que dans la plupart des langages, il n'est pas possible d'hériter de plusieurs classes abstraites.

:::

## Les namespaces (organisation des classes)

```php
namespace Mammifere\Primate ;

class Personne { // etc...
}
```
