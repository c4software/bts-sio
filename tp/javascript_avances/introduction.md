---
description: Vous avez déjà fait du JavaScript, mais certainement avec jQuery et surement sans utiliser les fonctions « modernes » de celui-ci.
---

# Prise en main « JavaScript avancé »

Vous avez déjà fait du JavaScript, mais certainement avec jQuery et surement sans utiliser les fonctions « modernes » de celui-ci.

Dans ce TP et au travers de quelques exemples, nous allons découvrir en pratique les nouveautés.

## Question 0

Pourquoi est-ce important d'utiliser les fonctionnalités modernes du JavaScript ? En quoi est-ce primordial ?

## Question 1

En utilisant :

- let / const
- String template
- forEach

Moderniser le code ci-dessous :

```JavaScript
nom = "Valentin";
capacites = ["JavaScript", "Android", "Web", "CSS"];

console.log(nom + " connait les " + capacites.length + " technologies ");
console.log("Voilà la liste");

for (c in capacites){
    console.log("- " + capacites[c]);
}
```

## Question 2

Réécrire le code suivant en utilisant les `fonctions flechés` et les `string templates`.

```javascript
function hello(nom) {
  console.log("Bonjour « " + nom + " » ");
}

var nom = prompt("Votre nom");
hello(nom);
```

## Question 3

En utilisant la méthode `filter` d'un tableau filtrer l'ensemble des éléments `non pairs` du tableau suivant :

```JavaScript
const valeurs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
```

::: tip
Les nombres non pairs se trouvent via un `% 2`.
:::

## Question 4

Manipuler un `objet` avec des méthodes, c'est toujours plus simple que de manipuler un simple Object.

En utilisant le code fourni, « remaper / transformer » grâce à la fonction `map` l'ensemble des `objects` en `Person`

```javascript
class Person {
  constructor(data = {}) {
    this.name = data.name;
  }

  static map(data) {
    return new Person(data);
  }
}

const clients = [
  { name: "Valentin", age: 15 },
  { name: "Thomas", age: 20 },
  { name: "John", age: 38 },
];
```

### Question 5

Ajouter une méthode dans l'objet `Person` qui retourne `true` si la personne est majeure.

⚠️ Ne pas oublier d'ajouter l'âge dans le constructeur comme `name`.

### Question 6

En utilisant l'instruction `filter`, filtrer le tableau résultat pour ne garder que les personnes majeures.

### Question 7

Ajouter une méthode dans l'objet. Celle-ci doit retourner une string contenant le `nom` et `âge` en utilisant String template.

### Question 8

Utiliser la méthode précédemment créée pour faire un `console.log` pour chaque (`forEach`) élément `filtré`.

### Question 9

Avant le JavaScript « moderne » il était courant d'utiliser l'objet `xmlhttprequest` pour faire des appels réseau.

Réécrire le code suivant en utilisant `Fetch` :

```javascript
const req = new XMLHttpRequest();

req.onreadystatechange = function (event) {
  if (this.readyState === XMLHttpRequest.DONE) {
    if (this.status === 200) {
      console.log("Réponse reçue: %s", JSON.parse(this.responseText));
    } else {
      console.log(
        "Status de la réponse: %d (%s)",
        this.status,
        this.statusText
      );
    }
  }
};

req.open("GET", "https://jsonplaceholder.typicode.com/todos/", true);
req.send(null);
```

### Question 10

Même question, mais en utilisant [Wretch](https://elbywan.github.io/wretch/)

### Question 11

Créer une classe pour la liste des `Todos`, puis en utilisant le `chainage` (then) des `Promises` et la méthode `map` d'un tableau transformer l'ensemble des Todos du retour en objet de type `Todo`.

Exemple pour l'appel réseau:

```javascript
fetch("VOTRE_URL")
  .then((response) => response.json())
  .then((todos) => {
    // todos est un tableau d'object.
    // Il est donc possible d'utiliser la méthode map
    // pour transformer l'ensemble des éléments du tableau
    // en objet de type Todo.
    // return todo.map(el => …)
  })};
```

### Question 12

Via l'instruction `filter`, filtrer l'ensemble des Todos qui sont pour l'utilisateur 2 _et_ non completed.

```JavaScript
"userId": 2,
"completed": true
```

Vous repartirez des éléments de la question précédente. Vous pouvez donc utiliser le `chainage` (then) des `Promises` et la méthode `filter` d'un tableau.

Exemple :

```javascript
// Reste du code
.then(todos => {
  // todos est un tableau de Todo
  // Il est donc possible d'utiliser la méthode filter
  // pour filtrer l'ensemble des éléments du tableau en respectant la condition (vous pouvez également déclarer une méthode dans la classe Todo)
  // return todo.filter(el => …)
}):
```

### Question 13

Réécrire le code de la question 12 en utilisant `async` / `await`.

::: tip Rappel

async / await permettent de transformer des fonctions retournant une `Promise` en fonction « normale ». 

Exemple :

```javascript
// Avant
fetch("votre-url").then((response) => response.json()).then((data) => { console.log(data) });

// Après
let retourAPI = await fetch("votre-url");
retourAPI = await retourAPI.json();
console.log(retourAPI);
```

:::

### Question 14

Lister l'ensemble des valeurs de l'ensemble de la liste des Todos créé précédemment.

::: tip
`Object.values(…)`
:::
