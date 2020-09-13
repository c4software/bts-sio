# Le Javascript

## Au-delà de IE6 😅

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

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

## JavaScript -> ECMAScript (201X, 2017, 2020, …)

---

## Votre navigateur bouge, évolue

---

Beaucoup de différences… Donc attention au support !

---

[caniuse.com](https://caniuse.com/)

---

## Rappel sur l'asynchrone

Pouvez-vous me dire à quoi ça correspond ?

---

```javascript
var resultat = "";

ajax("http://api/getRandom", (randomValue) => {
  resultat = randomValue;
});

console.log(resultat);
```

- Pouvez-vous me dire ce que va afficher le `console.log()` ?

---

## Les nouveautés

- Votre navigateur / la console / `les dev tools`
- Global
- Les Arrays (Tableau)
- Les Objets
- L'Ajax
- Les Promises (Promesses)
- Async / Await

---

### Votre navigateur

Votre navigateur est puissant ! Découvrons quelques-unes des fonctionnalités.

---

### Global

---

- Fonctions anonymes (λ) / fléchées
- let / const
- string template
- export

---

#### Fonctions anonymes

![Fonctions](./img/fonctions.png)

---

![Fonctions2](./img/fonctions2.png)

---

### let / const

![let_const](./img/let_const.png)

---

### String template

![string_template](./img/string_template.png)

Le but : Rendre le code plus lisible.

---

### Export

![export](./img/export.png)

---

### « Activer » les exports dans le navigateur

« De base », cette notation est ignorée par le navigateur, mais l'activation est simple.

---

![script_module](./img/script_module.png)

---

### Les Arrays (Tableau)

---

La manipulation des tableaux est maintenant simplifiée et performante.

---

### map

![map_oui](./img/map.png)

---

![map_non](./img/map_error.png)

Est-ce valide ?

---

### NON… Enfin Oui…

Mais non, le mieux pour ça, on utilise un `forEach`

---

### forEach

![forEach](./img/foreach.png)

Quelle est l'autre écriture du `forEach` ?

---

### includes

![includes](./img/includes.png)

---

### filter

![filter](./img/filter.png)

---

- Rendre la syntaxe plus lisible et concise.
- Tout est « chainable ».
- L'utiliser tout le temps (disponible depuis très longtemps).
- [Polyfill](https://polyfill.io/)

---

### Les Objets

---

Comme les tableaux, les objets sont maintenant manipulables plus simplement.

---

### Rappel

- Le mot-clé `new` existe.
- Vous pouvez créer des `class`.
- Vous pouvez créer des `méthodes`.

---

### Object.keys()

![object_keys](./img/object_keys.png)

---

### Object.values()

![object_values](./img/object_values.png)

---

### L'Ajax

---

Une « librairie / fonction / méthode » simple permettant de faire de l'Ajax intégrée

---

# Fetch

![fetch_simple](./img/fetch_simple.png)

---

[Allez plus loin](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

---

![fetch_simple](./img/hum.gif)

---

# wretch (lib)

[lib](https://elbywan.github.io/wretch/)

---

# Hey! `then`?

![fetch_simple](./img/what.gif)

---

### Les Promises (Promesses)

L'objet Promise (pour « promesse ») est utilisé pour réaliser des traitements de façon asynchrone. Une promesse représente une valeur qui peut être disponible maintenant, dans le futur voire jamais.

---

Pour faire « simple », ça remplace les `callback` et évite les `callback hell`.

---

[Exemple](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Utiliser_les_promesses)

---

### then

Éxécuté en cas de réussite.

---

### catch

Éxécuté en cas d'échec (Erreur, Throw, …).

---

### Promise.all

Promise.all() outil de composition qui permet de mener des opérations asynchrones en parallèle.

```javascript
Promise
    .all([promesse1(), promesse2(), promesse3()])
    .then(([resultat1, resultat2, resultat3] => {
        // Code
    });
```

---

### finally

Appelée dans tous les cas de terminaison.

⚠️ Attention ne fonctionne pas partout ⚠️

---

### Async / Await

Le but des fonctions async/await est de simplifier l'utilisation synchrone des promesses et d'opérer sur des groupes de promesses. De la même façon que les promesses sont semblables à des callbacks structurés, async/await est semblable à la combinaison des générateurs et des promesses.

---

### Simplifier… Mais…

Async / Await permet de rendre « synchrone » du code asynchrone.

- Attendre le retour d'une requête Ajax avant de continuer.
- À votre avis, quels sont les risques ?
- Catch <!-- .element: class="fragment" -->
- Bloquage de l'interface <!-- .element: class="fragment" -->

---

### Compiler - Distribuer

---

### Compiler ?

---

- Les bundler (Webpack)

---

Mais maintenant… nous avons [Pikapkg](https://pikapkg.com) 🎉

---

Mais également… [Vue Vite](https://github.com/vitejs/vite) 😲

---

## Conclusion

---

## Des questions ?
