# Introduction JavaScript

## Côté Client

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Rendre dynamique vos pages statiques

---

## ENCORE ?

---

## Oui !

### Mais cette fois-ci directement dans le navigateur

---

Le JavaScript vous connaissez ?

---

## Mais je n’aime pas le web moi

---

![sad](./img/sad.gif)

---

## Désolé, mais le JavaScript est partout

---

## Bonne nouvelle ! Ce n'est pas que pour le web.

---

![spacex](./img/spacex.jpg)

---

## Plusieurs types de JavaScript

---

- Un navigateur (Chrome, Firefox, Safari, …)
- Serveur (NodeJS)
- Une application (Électron, Cordova …)

---

## Toujours le même langage

Nous allons nous concentrer sur le Web…

Mais ce que vous apprendrez ici est également valide sur les autres plateforme.

---

## Nous avons plusieurs type de JavaScript

### Vous en connaissez ?

---

JavaScript -> EcmaScript…

- ES4
- ES6
- ES2020
- …

---

Mais encore…

- Chrome
- NodeJS
- Firefox
- IE6 (LOL)

---

<iframe src="https://giphy.com/embed/l4Epf0KwYUQY5DcGc" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

---

## Votre navigateur bouge, évolue

---

Beaucoup de différences… Donc attention au support !

---

[caniuse.com](https://caniuse.com/)

---

## Comment coder alors ?

---

Trois écoles :

- VanillaJS (c'est-à-dire sans aucune librairie)
- Avec [jQuery](https://jquery.com/)
- Avec un framework ([VueJS](https://vuejs.org/), [React](https://reactjs.org/), [Svelte](https://svelte.dev/))

---

## Comment choisir ?

---

## Et si ont souhaites des librairies ?

---

## C'est simple !

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
```

---

## Pourquoi JavaScript

- Validation de saisie
- Intéractivité
- … ? (d'autres exemple à me donner)

---

## Le JavaScript est donc…

### Un langage de programmation…

---

<iframe src="https://giphy.com/embed/3ov9k01Y5IKizNmC7S" width="480" height="380" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

---

Un langage oui…

Mais faiblement typé !

(voir pas dutout… Enfin, si, mais non)

---

<iframe src="https://giphy.com/embed/3ov9k23FIDV1WzpiEw" width="480" height="409" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

---

## Ça va bien se passer !

### Ne vous inquiétez pas

---

## Déclarer des variables

```js
var maVariable;
let maVariable;
const maVariable;
```

---

- `let` est similaire à `var`, c'est la façon moderne de déclarer une variable.
- `const` est une variable « constante » (impossible donc d'écraser la valeur après déclaration)

---

```html
<script>
  let entier = 42; //nombre entier
  let reel = 0.42; // nombre réel
  let texte = "texte"; // chaîne de caractères
  let booleen = true; // Un booléen
  let tab = [1, "deux", "trois"]; // tableau
  let obj = { clef1: "valeur", clef2: "Valentin" }; // Tableau associatif (clef => valeur, également appelé objet en JavaScript)
</script>
```

---

## Attention danger

```js
let entier = 42; //nombre entier
entier = "test";
```

En JavaScript c'est possible

---

## Un instant

### L'inspecteur d'éléments

---

![Dev Tools](./res/devtools.png)

---

## Testons « des bidouilleries » en JavaScript

---

- Les conditions (parler des risques de l'évaluation « très souble »)
- Les boucles
  - Les boucles classiques.
  - Les boucles « modernes ».
- Présenter le DOM
  - base + attributs
  - Hack via devtools ($0, etc)
- Les sélécteurs
  - VanillaJS
  - avec jQuery
- Attacher des événements (onMachinChose)
  - Depuis le HTML
  - Via JS
- Manipuler le DOM
  - Cacher
  - Supprimer
  - Ajouter class, ou directement du style (parler des dangers, et des vitesses CSS vs JS)
- Créer des éléments
  - En VanillaJS (avec jQuery ?).
  - En Injectant du HTML.
  - Parler des risques.
  - Faire des démos sur des sites.
- Ajax
  - Parler historique.
  - Hack via console démo.
  - Fetch vs XMLhttpRequest vs jQuery
- Parler des ressources en lignes (codepen)
- Parler des frameworks

⚠️ INSERER LES TP + Phase de test DANS LA PRÉSENTATION ⚠️
