# POO

## La Programmation Orientée Objet

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

Pourquoi la Programmation Orientée Objet ?

En groupe de 2 ou 3

- Que vous souvenez-vous ?
- Où faites-vous déjà de la POO ? Quels sont les avantages ?

---

## La POO c'est 3 concepts

---

**Concept de modélisation** à travers la notion de classe et d’instanciation de ces classes.

---

**Concept d’action** à travers la notion d’envoi de messages et de méthodes à l’intérieur des objets.

---

**Concept de construction** par réutilisation et amélioration par l’utilisation de la notion d’héritage.

---

### Mais surtout

Ça permet de représenter **informatiquement** quelque chose du monde réel.

---

### Deux notions

- Les classes
- Les objets

---

### Les classes

Représente une définition d'une problématique réelle.

- « Qu'est-ce que je souhaite représenter ? »
- « Comment déterminer ce que je souhaite représenter »
  - Spécifications client.
  - Mes connaissances du problème / de ce que je souhaite représenter

---

Serviront de moule pour créer des objets.

---

### Une classe est composée de :

- D'attributs (variable d'instance ou attribut).
- De méthodes (actions / opération au niveau de la classe).

---

### Les type de méthodes

- Un constructeur.
- Des méthodes d'actions.
- Des méthodes accesseurs.

---

Une classe étant **une définition**, elle nous servira plus tard à créer **des objets**.

---

### Nous avons donc deux types membres dans la classe

- Des méthodes (des actions : accélérer, freiner, etc.) **avec une visibilité**
- Des propriétés (Données de l'objet) **avec une visibilité**

---

### La visibilité ?

- Privée : accessible que dans l'objet.
- Public : accessible hors de l'objet.
- Protected : **non accessible** aux enfants (héritage)

---

![Visiblité d'un objet](./res/visibilite.jpg)

---

### Les méthodes

- Comme une fonction, mais **encapsulé** dans la classe.
- Possède une visibilité.
- Possède des paramètres.
- Surcharge: plusieurs **méthodes** peuvent avoir le même nom et des paramètres différents (type et ordre).
- Les ascesseurs

---

AJOUTER EXEMPLE DE CLASSE AVEC LES ÉLÉMENTS DE BASE

⚠️

---

### Surcharges

```php

<?php
class SimpleClass
{
    // déclaration d'une propriété
    public $var = 'une valeur par défaut';
    public $var2 = 'une valeur par défaut';

    // déclaration des méthodes
    public function displayVar() {
        echo $this->var;
    }

    public function setVar($var){
        $this->var = $var;
    }

    public function setVar($var, $var2){
        $this->var = $var;
        $this->var2 = $var2;
    }
}
?>

```

---

### Ce qu'il faut retenir

- Les classes sont instanciables (création d'objets, `new MonObjet(…)`).
- Les propriétés sont les « variables » de l'objet.
- Les méthodes sont les « actions » de l'objet.
- Les méthodes **et** les propriétés _**ont des visiblités**_.
- Les méthodes peuvent être surchargées.

---

### Les objets

Chaque objet représente un objet du monde réel

exemple :

- une personne **précise**
- une voiture **précise**
- etc.

---

Résultat de l'instanciation d'une classe.

```php
$utilisateur1 = new Personne("Valentin", "Brosseau");
$utilisateur2 = new Personne("John", "Doe");
```

---

### À faire

Nous souhaitons modéliser la problématique d'un vendeur de voiture.

---

Supposons que chaque Voiture possède :

- les « paramètres » suivant :
  - Une vitesse.
  - Un nombre de Km.
  - Une année de fabrication.
- Les actions suivantes :
  - Calcul du nombre de km moyen par an depuis la fabrication.
  - Accélérer.

C'est à vous 🤓

---

_Une solution possible_

![Visiblité d'un objet](./res/modelisationVoiture.jpg)

---

## Les collections d'objets

---

## Les classes Static

- Méthode & Propriété accessible **sans new**
- Permets d'encapsuler une logique

---

## L'héritage

- Extends
- Hérite
- Redéfinition (comme la surcharge, mais entre la fille et la mère)

---

## Les classes abstraites

Classe dont l'implémentation n'est pas complète et qui **n'est pas instanciable**.

- Elle sert de base à d'autres classes dérivées (héritées).

---

```php
abstract class AbstractClass
{
    // Force les classes filles à définir cette méthode
    abstract protected function getValue();
    abstract protected function prefixValue($prefix);

    // méthode commune
    public function printOut() {
        print $this->getValue();
   }
}

class ConcreteClass1 extends AbstractClass
{
     protected function getValue() {
       return "ConcreteClass1";
     }

     public function prefixValue($prefix) {
       return "{$prefix}ConcreteClass1";
    }
}

```

---

## Les interfaces

Une interface ressemble à une classe abstraite dans laquelle aucune méthode ne serait implémentée.

- Les méthodes y sont seulement déclarées.
- C'est **un contrat de service**. Oblige une implémentation spécifique.
- Définition d'un attendu sans se soucier de l'implémentation.

---

```php
// Declaration de l'interface 'Template'
interface Template
{
    public function setVariable($name, $var);
    public function getHtml($template);
}

// Implémentation de l'interface
// Ceci va fonctionner
class WorkingTemplate implements Template
{
    private $vars = [];

    public function setVariable($name, $var)
    {
        $this->vars[$name] = $var;
    }

    public function getHtml($template)
    {
        foreach($this->vars as $name => $value) {
            $template = str_replace('{' . $name . '}', $value, $template);
        }

        return $template;
    }
}
```

---

## Classe abstraite ou Interface ?

Classes abstraites et interfaces ont chacune une fonction bien distincte :

- les classes abstraites servent à factoriser du code.
- Tandis que les interfaces servent à définir des contrats de service.

---

## Les dictionnaires
