---
description: "TP de préparation à l'examen : analyse d'un UML au format texte, code à corriger, à compléter et à implémenter autour d'un cas complet de médiathèque."
---

# POO : Préparation à l'examen

Dans ce TP, nous allons balayer l'ensemble des notions vues en POO à travers un cas complet : la gestion d'une **médiathèque**. C'est le type de sujet que vous pouvez rencontrer à l'examen : un diagramme UML à analyser, du code à corriger, du code à compléter et du code à écrire entièrement.

::: details Sommaire
[[toc]]
:::

## Ressources disponibles :

- [Aide mémoire POO](/cheatsheets/poo/)
- [Aide mémoire POO-UML](/cheatsheets/poo-uml/)
- [Cours POO](/cours/poo.md)

## Objectifs

À la fin de ce TP vous saurez :

- Lire et analyser un diagramme de classes (même présenté au format texte).
- Repérer et corriger des erreurs classiques dans du code objet.
- Compléter une classe à partir d'une modélisation.
- Implémenter une interface et une classe abstraite.
- Manipuler une collection d'objets grâce au polymorphisme.

## La modélisation

Le jour de l'examen, le diagramme UML peut être fourni sous forme d'image… ou décrit textuellement. Voici la modélisation de notre médiathèque au format texte :

```text
+--------------------------------------+
|            « abstract »              |
|              Document                |
+--------------------------------------+
| # titre : string                     |
| # annee : int                        |
| - disponible : bool = true           |
+--------------------------------------+
| + __construct(titre, annee)          |
| + getTitre() : string                |
| + estDisponible() : bool             |
| + abstract resume() : string         |
+--------------------------------------+
            ^                ^
            |                |
+-------------------+  +-------------------+
|       Livre       |  |        Dvd        |
+-------------------+  +-------------------+
| - auteur : string |  | - duree : int     |
| - nbPages : int   |  +-------------------+
+-------------------+  | + resume():string |
| + resume():string |  +-------------------+
+-------------------+

+--------------------------------------+
|            « interface »             |
|             Empruntable              |
+--------------------------------------+
| + emprunter(Adherent $a) : bool      |
| + rendre() : void                    |
+--------------------------------------+

Livre et Dvd implémentent l'interface Empruntable.

+--------------------------------------+
|              Adherent                |
+--------------------------------------+
| - nom : string                       |
| - prenom : string                    |
+--------------------------------------+
| + __construct(nom, prenom)           |
| + identite() : string                |
+--------------------------------------+

+--------------------------------------+
|             Mediatheque              |
+--------------------------------------+
| - nom : string                       |
| - lesDocuments : Document[]          |
+--------------------------------------+
| + __construct(nom)                   |
| + ajouter(Document $d) : void        |
| + afficherCatalogue() : void         |
| + nbDisponibles() : int              |
+--------------------------------------+

Mediatheque "1" ---- "0..*" Document (lesDocuments)
```

Rappel des symboles : `+` public, `-` privé (private), `#` protégé (protected).

## Exercice 1 : Analyser l'UML

Avant d'écrire la moindre ligne de code, prenez le temps de lire la modélisation. C'est à vous de jouer !

::: tip Questionnement

1. Combien de classes sont **instanciables** ? Lesquelles ?
2. Pourquoi la classe `Document` est-elle abstraite ? Qu'est-ce que cela implique ?
3. Quelle est la différence entre `Empruntable` et `Document` ? Pourquoi ne pas avoir mis `emprunter()` dans `Document` ?
4. Que signifie la multiplicité `"1" ---- "0..*"` entre `Mediatheque` et `Document` ?
5. La propriété `titre` est notée `#` (protected) alors que `disponible` est notée `-` (private). Quelle différence concrète cela fait-il pour les classes `Livre` et `Dvd` ?
6. Si nous devions ajouter un document `Magazine`, quelles classes seraient impactées ?

:::

::: details Voir l'une des solutions possibles

1. Quatre classes sont instanciables : `Livre`, `Dvd`, `Adherent` et `Mediatheque`. `Document` est abstraite (pas de `new`) et `Empruntable` est une interface (pas de `new` non plus).
2. `Document` regroupe la logique commune (titre, année, disponibilité) mais un « document » générique n'a pas de sens seul : on ne sait pas rédiger son `resume()`. La rendre abstraite force les classes filles à implémenter `resume()` et interdit le `new Document(…)`.
3. `Document` factorise du **code** (héritage, « est un »), `Empruntable` définit un **contrat** (comportement, « est capable de »). Un futur objet non-document (une salle de réunion par exemple) pourrait être `Empruntable` sans être un `Document`.
4. Une médiathèque possède de zéro à plusieurs documents ; un document appartient à une seule médiathèque.
5. `titre` (protected) est accessible directement dans `Livre` et `Dvd` (`$this->titre`). `disponible` (private) ne l'est pas : les classes filles doivent passer par les méthodes publiques comme `estDisponible()`.
6. Une seule classe est à créer : `Magazine extends Document` (avec son `resume()`). Les autres classes ne changent pas, c'est tout l'intérêt de la modélisation : `Mediatheque` manipule des `Document` sans connaître leur type précis.

:::

## Exercice 2 : Corriger le code

Un étudiant a commencé l'implémentation en PHP, mais son code contient **7 erreurs** (syntaxe, visibilité, respect de l'UML). À vous de les retrouver et de les corriger. Pas de panique, relisez l'UML ligne par ligne.

```php
abstract class Document {
    protected titre;
    protected $annee;
    public $disponible = true;

    function __construct($titre, $annee){
        $this->titre = $titre;
        $this->annee = $annee;
    }

    public function getTitre(){
        return $titre;
    }

    public function estDisponible(){
        return $this->disponible;
    }

    public function resume(){
    }
}

class Livre extends Document {
    private $auteur;
    private $nbPages;

    function __construct($titre, $annee, $auteur, $nbPages){
        $this->auteur = $auteur;
        $this->nbPages = $nbPages;
    }

    public function resume($details){
        return "{$this->titre} ({$this->annee}), {$this->auteur}, {$this->nbPages} pages";
    }
}

$unDocument = new Document("Titre", 2020);
```

::: tip Point de contrôle

- Vous avez trouvé les 7 erreurs ?
- Pour chacune, savez-vous dire s'il s'agit d'une erreur de syntaxe, d'une erreur d'exécution ou d'un non-respect de l'UML ?

:::

::: details Voir l'une des solutions possibles

1. `protected titre;` : il manque le `$` (`protected $titre;`).
2. `public $disponible` : l'UML indique `-`, la propriété doit être `private`.
3. `return $titre;` dans `getTitre()` : il faut écrire `return $this->titre;`.
4. `resume()` est déclarée avec du code (vide) : l'UML la définit abstraite, il faut écrire `abstract public function resume();` (et supprimer le corps).
5. Le constructeur de `Livre` n'appelle pas celui du parent : il faut ajouter `parent::__construct($titre, $annee);` (sinon `titre` et `annee` ne sont jamais initialisés).
6. `resume($details)` dans `Livre` : la signature ne respecte pas celle de la classe mère (redéfinition = signature **identique**), il faut `resume()` sans paramètre.
7. `new Document(…)` : impossible d'instancier une classe abstraite, cette ligne provoque une erreur fatale (`Cannot instantiate abstract class Document`).

Code corrigé :

```php
abstract class Document {
    protected $titre;
    protected $annee;
    private $disponible = true;

    function __construct($titre, $annee){
        $this->titre = $titre;
        $this->annee = $annee;
    }

    public function getTitre(){
        return $this->titre;
    }

    public function estDisponible(){
        return $this->disponible;
    }

    abstract public function resume();
}

class Livre extends Document {
    private $auteur;
    private $nbPages;

    function __construct($titre, $annee, $auteur, $nbPages){
        parent::__construct($titre, $annee);
        $this->auteur = $auteur;
        $this->nbPages = $nbPages;
    }

    public function resume(){
        return "{$this->titre} ({$this->annee}), {$this->auteur}, {$this->nbPages} pages";
    }
}
```

:::

## Exercice 3 : Compléter la classe `Dvd`

Voici le squelette de la classe `Dvd`. Je vous laisse le compléter en respectant l'UML (les zones à compléter sont indiquées par des commentaires `// À compléter`) :

```php
class Dvd extends Document {
    // À compléter : la ou les propriétés

    function __construct($titre, $annee, $duree){
        // À compléter : initialisation
    }

    public function resume(){
        // À compléter : retourne « <titre> (<annee>), durée <duree> min »
    }
}
```

::: tip Point de contrôle

- Votre constructeur appelle-t-il celui du parent ?
- `duree` est-elle bien `private` ?
- `resume()` a-t-elle exactement la même signature que dans `Document` ?

:::

::: details Voir l'une des solutions possibles

```php
class Dvd extends Document {
    private $duree;

    function __construct($titre, $annee, $duree){
        parent::__construct($titre, $annee);
        $this->duree = $duree;
    }

    public function resume(){
        return "{$this->titre} ({$this->annee}), durée {$this->duree} min";
    }
}
```

:::

## Exercice 4 : Implémenter l'interface `Empruntable`

Il est maintenant temps d'écrire le contrat et de le faire respecter. C'est à vous de jouer !

1. Écrire l'interface `Empruntable` en PHP (voir l'UML).
2. Écrire la classe `Adherent` (constructeur + `identite()` qui retourne « Prenom NOM »).
3. Modifier `Livre` et `Dvd` pour qu'ils implémentent `Empruntable` :
   - `emprunter(Adherent $a)` retourne `false` si le document n'est pas disponible, sinon il passe le document en indisponible et retourne `true`.
   - `rendre()` repasse le document en disponible.

::: tip Un instant !

La propriété `disponible` est `private` dans `Document`… Vos méthodes `emprunter()` et `rendre()` ne peuvent donc pas y accéder directement depuis `Livre` ou `Dvd`. Deux pistes : ajouter un mutateur `protected` dans `Document`, ou implémenter `emprunter()` / `rendre()` directement dans `Document`. Laquelle choisissez-vous, et pourquoi ?

:::

::: details Voir l'une des solutions possibles

```php
interface Empruntable {
    public function emprunter(Adherent $a): bool;
    public function rendre(): void;
}

class Adherent {
    private $nom;
    private $prenom;

    function __construct($nom, $prenom){
        $this->nom = $nom;
        $this->prenom = $prenom;
    }

    public function identite(){
        return $this->prenom . " " . strtoupper($this->nom);
    }
}

abstract class Document implements Empruntable {
    protected $titre;
    protected $annee;
    private $disponible = true;

    function __construct($titre, $annee){
        $this->titre = $titre;
        $this->annee = $annee;
    }

    public function getTitre(){
        return $this->titre;
    }

    public function estDisponible(){
        return $this->disponible;
    }

    public function emprunter(Adherent $a): bool {
        if(!$this->disponible){
            return false;
        }

        $this->disponible = false;
        return true;
    }

    public function rendre(): void {
        $this->disponible = true;
    }

    abstract public function resume();
}
```

Ici, la solution retenue est d'implémenter `emprunter()` et `rendre()` une seule fois dans `Document` : le code est factorisé et `disponible` reste `private`. `Livre` et `Dvd` n'ont rien à ajouter, ils héritent du comportement.

:::

## Exercice 5 : La médiathèque et le polymorphisme

Dernière étape, assembler le tout. Écrire la classe `Mediatheque` puis le programme principal :

1. `ajouter(Document $d)` ajoute un document dans la collection `lesDocuments`.
2. `afficherCatalogue()` affiche le `resume()` de chaque document (une ligne par document).
3. `nbDisponibles()` retourne le nombre de documents disponibles.
4. Programme principal :
   - Créer une médiathèque, y ajouter **2 livres et 2 DVD**.
   - Créer un adhérent et lui faire emprunter un document.
   - Afficher le catalogue puis le nombre de documents disponibles.

::: tip Questionnement

- Dans `afficherCatalogue()`, vous appelez `resume()` sans connaître le type réel de l'objet (`Livre` ou `Dvd`). Comment s'appelle ce mécanisme ?
- Pourquoi la collection est-elle typée `Document[]` et pas `Livre[]` ?
- Que se passerait-il si une classe fille de `Document` « oubliait » d'écrire `resume()` ?

:::

::: details Voir l'une des solutions possibles

```php
class Mediatheque {
    private $nom;
    private $lesDocuments = [];

    function __construct($nom){
        $this->nom = $nom;
    }

    public function ajouter(Document $d): void {
        $this->lesDocuments[] = $d;
    }

    public function afficherCatalogue(): void {
        foreach ($this->lesDocuments as $leDocument) {
            // Polymorphisme : le resume() appelé est celui du type réel (Livre ou Dvd)
            echo $leDocument->resume() . "\n";
        }
    }

    public function nbDisponibles(): int {
        $compteur = 0;
        foreach ($this->lesDocuments as $leDocument) {
            if($leDocument->estDisponible()){
                $compteur++;
            }
        }
        return $compteur;
    }
}

// Programme principal
$mediatheque = new Mediatheque("Médiathèque du lycée");

$mediatheque->ajouter(new Livre("1984", 1949, "George Orwell", 328));
$mediatheque->ajouter(new Livre("Dune", 1965, "Frank Herbert", 412));

$dvd = new Dvd("Interstellar", 2014, 169);
$mediatheque->ajouter($dvd);
$mediatheque->ajouter(new Dvd("Le Voyage de Chihiro", 2001, 125));

$adherent = new Adherent("Brosseau", "Valentin");
$dvd->emprunter($adherent);

$mediatheque->afficherCatalogue();
echo "Documents disponibles : " . $mediatheque->nbDisponibles() . "\n"; // 3
```

Réponses aux questions :

- C'est le **polymorphisme** : la méthode exécutée est choisie dynamiquement selon le type réel de l'objet.
- Typer la collection `Document[]` permet d'y ranger **tous** les types de documents (actuels et futurs). Avec `Livre[]`, impossible d'y mettre un `Dvd`.
- La classe fille serait obligée d'être déclarée `abstract` à son tour, sinon PHP lève une erreur : une classe concrète doit implémenter toutes les méthodes abstraites héritées.

:::

## Conclusion

Vous venez de dérouler un sujet type examen :

- Analyse d'un diagramme de classes (visibilités, multiplicités, abstraction, interface).
- Correction d'un code qui ne respecte pas l'UML.
- Complétion et implémentation de classes (héritage, interface, contrat).
- Manipulation d'une collection grâce au polymorphisme.

Si l'un des cinq exercices vous a résisté, retournez voir la mise en pratique correspondante ([classes abstraites](/cours/exercices/poo/les-classes-abstraites), [interfaces](/cours/exercices/poo/les-interfaces-1), [redéfinition](/cours/exercices/poo/redefinition), [polymorphisme](/cours/exercices/poo/polymorphisme)).

👋 Si vous avez des questions, n'hésitez pas.
