# Le Javascript

## Au delà de IE6 😅

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Mais j'aime pas le web moi

---

![sad](./img/sad.gif)

---

## Désolé, mais le javascript est partout

---

## Bonne nouvelle ! C'est pas que du web

---

## Javascript -> ECMAScript (201X, 2016, 2017, …)

---

## Votre navigateur vie, évolue

---

Beaucoup de différences, mais attention au support

---

[caniuse.com](https://caniuse.com/)

---

## Les nouveautés

- Global
- Les Arrays (Tableau)
- Les Objets
- L'Ajax
- Les Promises (Promesses)
- Async / Await

---

### Global

---

- Fonctions anonymes (λ) / flêchés
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

« De base » cette notation est ignorée par le navigateur, mais l'activation est simple.

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

### NON !

Pour ça, on utilise un `forEach`

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

### Object.keys()

![object_keys](./img/object_keys.png)

---

### Object.values()

![object_values](./img/object_values.png)

---

### L'Ajax

---

Une « interface » simple permettant de faire de l'ajax intégrée

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

# Hey!  `then`?

![fetch_simple](./img/what.gif)

---

### Les Promises (Promesses)

L'objet Promise (pour « promesse ») est utilisé pour réaliser des traitements de façon asynchrone. Une promesse représente une valeur qui peut être disponible maintenant, dans le futur voire jamais.

---

Pour faire « simple », ça remplasse les `callback` et évite les `callback hell`.

---

[Exemple](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Utiliser_les_promesses)

---

### then

Appelé en cas de réussite.

---

### catch

appelé en cas d'échec.

---

### Promise.all

Promise.all() outil de composition qui permet de mener des opérations asynchrones en parallèle.

```javascript
Promise.all([promesse1(), promesse2(), promesse3()])
.then(([resultat1, resultat2, resultat3] => {
    // Code
})
```

---

### finally

Appelée dans tous les cas de terminaison.

⚠️ Attention ne fonctionne pas partout ⚠️

---

### Async / Await

 Le but des fonctions async/await est de simplifier l'utilisation synchrone des promesses et d'opérer sur des groupes de promesses. De la même façon que les promesses sont semblables à des callbacks structurés, async/await est semblable à la combinaison des générateurs et des promesses.

---

### Simplification

Async / Await permet de rendre « synchrone » du code asynchrone.

- Attendre le retour d'une requête ajax avant de continuer.
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

Mais en 2019, nous avons [Pikapkg](https://pikapkg.com) 🎉

---

## Conclusion

---

## Des questions ?
