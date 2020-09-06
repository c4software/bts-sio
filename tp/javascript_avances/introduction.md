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

Créer une classe pour la liste des `Todos`, puis en utilisant le `chainage` (then) des `Promises` et la méthode map d'un tableau transformer l'ensemble des Todos du retour en objet de type `Todo`

### Question 12

Via un l'instruction filter, filtrer l'ensemble des Todos qui sont pour l'utilisateur 2 _et_ non completed.

```JavaScript
"userId": 2,
"completed": true
```

### Question 13

Lister l'ensemble des valeurs de l'ensemble de la liste des Todo créé précédemment.

::: tip
`Object.values(…)`
:::
