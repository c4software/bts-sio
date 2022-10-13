---
description: Exercice d'entrainement lecture d'UML.
---

# Exercices d'entraînement à la lecture d'UML

Pour progresser, il faut pratiquer, vous trouverez ici des exercices permettant de vous entraîner à la lecture d'UML. La lecture d'UML est un élément important pour comprendre les études de cas, celles-ci étant à réaliser sur papier, je vous conseille vivement de travailler les exercices sur feuilles.

Cette page a été conçue dans le but de réaliser un exercice par jour.

Je suis à disposition pour les corrections via Slack ou par [email](./contact.md).

<Urdle />

::: tip Rappels

Écriture d'un constructeur :

```php
function __construct($nom, $prenom){
    $this->nom = $nom;
    $this->prenom = $prenom;
}
```

Utiliser une liste :

```php
$monObjet = new Objet();

// Créer un tableau
$maListe = [];

// Ajouter dans un tableau
array_push($maListe, $monObjet);

// Parcourir une liste
foreach ($maListe as $maValeur){
    echo $maValeur->laMethode();
}

// Taille d'un tableau
echo sizeOf($maListe);
```

:::