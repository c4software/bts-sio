# Aide mémoire JavaScript

Aide mémoire sur les structures JavaScript. Vous retrouverez dans cet aide mémoire les éléments que nous avons vus ensemble.

::: warning
Cet aide mémoire n'est pas exhaustif, elle ne contient que le minimum à connaitre pour débuter sereinement.  
:::

::: details Table des matières
[[toc]]
:::

## Type de JavaScript

Le JavaScript peut-être exécuté dans différents environnements :

- Serveur (NodeJS)
- Un navigateur (Chrome, Firefox, Safari, …)
- Une application (Électron, Cordova …)

Les compétences traitées dans le [support de cours](/tp/javascript/support.md) et dans cet aide mémoire couvre l'ensemble des usages.

## Dans le navigateur

```html
<!-- Directement dans votre page -->
<script>
  // Votre code JavaScript
</script>

<!-- Dans un script externe -->
<script src="monScriptJS.js"></script>
```

::: tip Comment choisir ?
Je vous invite vraiment à externaliser vos scripts, pourquoi ? Tout simplement pour simplifier la relecture de vos pages.
:::

## Les librairies

Trois écoles :

- VanillaJS (c'est-à-dire sans aucune librairie)
- Avec [jQuery](https://jquery.com/)
- Avec un framework ([VueJS](https://vuejs.org/), [React](https://reactjs.org/), [Svelte](https://svelte.dev/)) :rocket:

::: tip Comment choisir ?
Dans cet aide mémoire je vais me concentrer sur le VanillaJS, car finalement c'est la base. Je vous invite cependant à toujours réfléchir sur le choix de votre technologie avant de vous lancer dans un projet.
:::

::: tip Ajouter jQuery ?
C'est super simple, il suffit « juste » d'ajouter dans votre page :

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
```

:::

## Les variables

```html
<script>
  /**
   * let est similaire à var, ça permet de déclarer une variable
   * const est une variable « constante » (dont il est impossible d'écraser la valeur après déclaration)
   */

  let entier = 42; //nombre entier
  let reel = 0.42; // nombre réel
  let texte = "texte"; // chaîne de caractères
  let booleen = true; // Un booléen
  let tab = [1, "deux", "trois"]; // tableau
  let obj = { clef1: "valeur", clef2: "Valentin" }; // Tableau associatif (clef => valeur, également appelé objet en JavaScript)
</script>
```

## Les fonctions

```html
<script>
  // Déclarer / créer une fonction
  function maFonction() {
    alert("test");
  }

  // Déclarer / créer une fonction
  function maFonctionQuiRetourne42() {
    return 42;
  }

  function addition(a, b) {
    return a + b;
  }

  // L'appeler
  maFonction();
  console.log(maFonctionQuiRetourne42()); // Affiche dans la console 42
  alert(addition(40, 2)); // Affiche une alert avec le résultat de l'addition 40 + 2 => 42
</script>
```

## Les conditions

```html
<script>
  // Exemple 1
  let age = 18;
  if (age > 18) {
    alert("Coucou je suis une alerte");
  }

  // Exemple 2
  let estMajeur = true;
  if (estMajeur) {
    // Est équivalent à estMajeur == true
    alert("La personne est majeur");
  }

  // Exemple 3
  if (maFonctionDeTest() == true) {
    alert(
      "la fonction est appelé, et si celle-ci « return » true l'alert est affiché"
    );
  }
</script>
```

## Les boucles

Plusieurs façons de faire :

```html
<script>
  while (true) {
    console.log("Votre première boucle infinie");
  }

  for (let i = 0; i < 3; i++) {
    alert(i);
  }

  const arr = [1, 2, 3, 4];

  // Parcours l'ensemble du tableau
  arr.forEach((i) => {
    alert(i);
  });

  // Transforme le tableau
  arrModif = arr.map((i) => {
    return i * 2;
  }); // arrModif contiendra => [2, 4, 6, 8];
</script>
```

## Filtrer rapidement un tableau

```js
const arr = [1, 2, 3, 4];

arr.filter((curr) => curr > 2); // --> Retourne un tableau avec seulement les valeurs supérieures à 2
```

## Les évènements

| Évènement   | Détail                              |
| ----------- | ----------------------------------- |
| onAbort     | Chargement interrompu               |
| onBlur      | Perte du focus                      |
| onChange    | Modification d'un état ou contenu   |
| onClick     | Clic sur un élément                 |
| onDblClick  | Double clic                         |
| onDragDrop  | Déplacement d'un élément amovible   |
| onError     | Chargement non réalisé              |
| onFocus     | Élement devient accessible          |
| onKeyDown   | Touche du clavier maintenue appuyée |
| onKeyPress  | Touche pressée/relâchée             |
| onKeyUp     | Touche relâchée                     |
| onLoad      | Au chargement                       |
| onMouseDown | Appui sur un bouton de souris       |
| onMouseMove | Souris déplacée                     |
| onMouseOut  | Souris hors de l'élément            |
| onMouseOver | Souris au dessus                    |
| onMouseUp   | Bouton de souris relaché            |
| onReset     | Bouton reset de formulaire          |
| onResize    | Dimensions changées dynamiquement   |
| onSelect    | Sélection d'une partie de contenu   |
| onSubmit    | Bouton soumettre                    |
| onUnload    | Fermeture de la page                |

## Créer des éléments

```javascript
var h = document.createElement("h1"); // Création de l'élément h1
h.innerHTML = "Ceci est un titre"; // Ajout du texte dans le h1
h.className = "titleClass"; // Définition d'un titre pour l'élément

// Ajout du titre dans le body de la page courante.
document.body.appendChild(h);

// Ajout du titre dans l'élément qui nommé id
document.getElementById("monId").appendChild(h);
```

Dans une page ça peut donner :

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ma page</title>
  </head>
  <body>
    <script>
      var h = document.createElement("h1"); // Création de l'élément h1
      h.innerHTML = "Ceci est un titre"; // Ajout du texte dans le h1
      h.className = "titleClass"; // Définition d'un titre pour l'élément

      // Ajout du titre dans la page en cours
      document.body.appendChild(h);
    </script>
  </body>
</html>
```

::: tip appendChild ?

Dans le précédent exemple, nous avons ajouté l'élément « à la fin » du body. Mais d'autres options existent :

- `node.append(nodes ou strings)` – ajoute « nodes ou strings » à la fin,
- `node.prepend(nodes ou strings)` – ajoute « nodes ou strings » au début,
- `node.before(nodes ou strings)` –- ajoute « nodes ou strings » avant le node,
- `node.after(nodes ou strings)` –- ajoute « nodes ou strings » après le node,
- `node.replaceWith(nodes ou strings)` –- remplace le node par l'élément fourni « nodes or strings ».

:warning Nous allons voir qu'il est possible de choisir le `node` via un sélecteur.
:::

### Création d'éléments version alternative

Nous pouvons également insérer « une chaine de caractère », celle-ci sera transformée automatiquement en code HTML valide par votre navigateur :

```javascript
// Ajout du titre dans le body de la page courante.
document.body.insertAdjacentHTML(
  "afterend",
  "<h1 class='titleClass'>Ceci est un titre</h1>"
);
```

::: tip afterend ?
Comme dans l'exemple précédent, c'est la position de l'élément que vous souhaitez insérer. Les valeurs possibles sont les suivantes :

- `beforebegin` : Avant l'élément lui-même.
- `afterbegin` : Juste à l'intérieur de l'élément , avant son premier enfant.
- `beforeend` : Juste à l'intérieur de l'élément , après son dernier enfant.
- `afterend` : Après élément lui-même.

L'exemple de la W3School est très explicite :

```html
<!-- beforebegin -->
<p>
  <!-- afterbegin -->
  foo
  <!-- beforeend -->
</p>
<!-- afterend -->
```

:::

## Les sélécteurs

```javascript
// Retourne la liste (array) des éléments
document.querySelectorAll("#elementId");
document.querySelectorAll(".maClass");
document.querySelectorAll("div");

// Retourn le premier élément trouvé
document.querySelector("#elementId");
document.querySelector(".maClass");
document.querySelector("div");

// Exemples d'utilisations
document.querySelector("#elementId").innerHTML = "Voilà valeur";

document.querySelectorAll("div").forEach((it) => {
  it.innerHTML = "Parcours chaque div et remplace le contenu par <=";
});
```

::: tip C'est « neuf »
Ces API (Méthodes) sont très peu utilisés (voir même connues), elles sont pourtant très puissantes. Elles sont à choisir si vous souhaitez faire du code moderne.

Sur Internet (voir dans du code existant), vous trouverez l'ancienne version à savoir :

```javascript
document.getElementById("elementId");
document.getElementsByClassName("maClass");

document.getElementsByTagName("div");
```

Aucun changement dans le fonctionnement.

:::

## Les sélécteurs jQuery

```javascript
$("#elementId");
$(".maClass");
$("div");
```

```javascript
// Cacher toute les divs
$("div").hide();
```

## Utiliser un sélecteur

```javascript
// Deux exemples identiques
document.querySelector("#elementId").innerHTML = "Voilà le contenu";
$("#elementId").html("Contenu HTML à mettre");
```

## Cacher un élément

100% JS:

```javascript
let element = document.getElementById("monId");
element.style.display = "none";
```

::: tip Style ? Vous avez dit Style ?
Et oui, nous avons accès à l'ensemble du style. Amusez-vous, il est possible de tout changer directement via le JS.
:::

Via les Class CSS:

```javascript
let element = document.getElementById("monId");
element.classList.add("maClass");
```

::: warning Hey ! classList ?
Oui… Il est possible de mettre « plusieurs classes », donc nous avons ici un tableau `array`. Un tableau se manipule avec des méthodes comme vues précédemment. Il faut donc utiliser la méthode `add` pour ajouter une classe.
:::

## Obtenir la valeur d'un input

```html
<input type="text" id="monInput" />
```

```javascript
// VanillaJS
document.getElementById("monInput").value;

// En jQuery
$("#monInput").val();
```

## Les évènements

![Event_click](./event_click.png)

Fonction appelé seulement au moment du clique utilisateur

### Dans le DOM

```html
<input type="button" onclick="maFonction(this)" value="Click ! " />
```

```html
<form id="form" onsubmit="maFonction(this)" ">
```

```html
<input type="button" onclick="maFonction(this)" value="Click ! " />

<script>
  function maFonction(elem) {
    // elem => est le bouton sur lequel vous avez cliqué
  }
</script>
```

::: warning this ?
Le `this` corresponds à l'élément sur lequel vous avez cliqué.
:::

### En JavaScript

```html
<input type="button" id="btn" value="Click ! " />

<script>
  // Pure JS
  document.getElementById("btn").addEventListener("click", maFonction, true);

  // Pure JS
  document.getElementById("form").addEventListener("submit", maFonction, true);

  // jQuery
  $("#btn").click(maFonction);
  $("#form").submit(maFonction);
</script>
```

## L'ajax

### Pure JS :

Les GET

```js
// Réponse type inconnu
fetch("./monContenuAsynchrone.php")
  .then((response) => response.text())
  .then((content) => {
    document.getElementById("result").innerHTML = content;
  });

// Réponse type JSON
fetch("./monContenuAsynchrone.php")
  .then((response) => response.json())
  .then((content) => {
    console.log(content);
  });
```

Les POST

```js
// Format JSON
let data = { cle: "valeur" };

fetch("./monContenuAsynchrone.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Success:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Format POST Data
let data = new URLSearchParams();
data.append(`key`, `value`);
data.append(`anotherKey`, `another value`);

fetch("./monContenuAsynchrone.php", { method: "POST", body: data })
  .then((response) => response.json())
  .then((data) => {
    console.log("Success:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

Fetch permet de faire beaucoup de choses, vous trouverez [l'ensemble de la documentation ici](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch)

### Via jQuery :

```js
$.get("./monContenuAsynchrone.php", (data) => {
  $("#result").html(data);
  console.log(data);
});
```
