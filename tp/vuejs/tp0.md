---
description: Dans ce TP nous allons découvrir l'utilisation de VueJS sans Webpack. Nous allons donc utiliser directement le CDN de VueJS.
---

# Prise en main de VueJS 2.0

Dans ce TP nous allons découvrir l'utilisation de VueJS sans Webpack. Nous allons donc utiliser directement le CDN de VueJS.

::: details Table des matières
[[toc]]
:::

## Initialisation

Ajouter VueJS dans un projet est aussi simple que d'ajouter une librairie. Première étape, créer un fichier `index.html` puis insérer à l'intérieur « une structure HTML 5 »

::: tip
Si vous utilisez Visual Studio Code, vous pouvez faire html:5<kbd>Tab</kbd> une structure HTML sera automatiquement écrite.
:::

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Démo VueJS</title>
  </head>
  <body>
    <!-- Votre code ici -->
  </body>
</html>
```

Pour ajouter VueJS dans la page ? Il faut juste ajouter la balise script suivante dans le « head » de votre page :

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js"></script>
```

Et voilà !

## Ah ouais ? C'est aussi simple !?

Bon en vrai on va devoir ajouter quelques petits trucs… Si vous avez suivi pendant mon cours :

- Une balise « racine » qui contiendra notre template.
- Une balise script qui contiendra notre code JavaScript.

### Ajout des éléments

Remplacer le commentaire `<!-- Votre code ici -->` par

```html
<div id="app"></div>
<script>
  var app = new Vue({
    el: "#app",
    mounted() {
      console.log("Ding ! 🍪 Votre code fonctionne !");
    },
  });
</script>
```

🚀 Et voilà ! Là c'est vraiment tout. Votre code est prêt. Vous pouvez faire du VueJS 🍪.

## Tester votre code

Votre code doit dès à présent fonctionner ! Vérifier dans la console de votre navigateur que vous avez la phrase :

`Ding ! 🍪 Votre code fonctionne !`

## Un simple bouton

Nous allons ajouter un simple « button » dans notre page. Celui-ci affichera une `alert` lorsque l'utilisateur clique dessus. Modifier votre objet VueJS pour qu'il ressemble à :

```js
new Vue({
  el: "#app",
  mounted() {
    console.log("Ding ! 🍪 Votre code fonctionne !");
  },
  methods: {
    action() {
      alert("🎉 Bravo 🎉");
    },
  },
});
```

Vous venez de déclarer une nouvelle méthode, celle-ci se nomme `action`, celle-ci affiche « Bravo ». Il faut donc maintenant l'appeler…

En VueJS, c'est simple ! Il vous suffit d'ajouter _dans_ `<div id="app"></div>` un bouton. Après modification votre code doit ressembler à :

```html
<div id="app">
  <button @click="action">Clique ici</button>
</div>
```

🤓 Notez le `@click="action"` qui fait référence à votre méthode `action`.

🚀 Tester votre code.

## Afficher une liste

Un bouton c'est bien, mais une liste c'est mieux non ? Vous allez voir qu'afficher une liste c'est aussi simple qu'un bonjour 👋. Comme vu ensemble en cours, nous allons :

- Déclarez-les `data`.
- Faire un `v-for` dans le code.

### Les data

Vous vous souvenez comment déclarer les datas ? Non !? un petit rappel alors, nous allons déclarer un tableau (`[]`) directement dans la méthode `data` de notre objet VueJS. Quelque chose comme :

```js
data(){
    return {
        liste: ["Item 1", "Item 2", "Item 3"]
    }
}
```

🤓 Notez que la variable est nommée `liste`.

Une fois intégré à votre code :

```js
new Vue({
  el: "#app",
  mounted() {
    console.log("Ding ! 🍪 Votre code fonctionne !");
  },
  data() {
    return {
      liste: [],
    };
  },
  methods: {
    action() {
      alert("🎉 Bravo 🎉");
    },
  },
});
```

🚀 Valider avec les Vue Dev Tools que votre liste est bien présente.

### Afficher la liste

Pour afficher la liste nous allons devoir faire un `v-for` sur l'élément qui sera `répété` ou `afficher plusieurs fois`. Exemple :

```html
<ul>
  <li v-for="item in liste">{{item}}</li>
</ul>
```

Ajouter le code HTML dans la `div#data`, vous devez obtenir :

```html
<div id="app">
  <button @click="action">Clique ici</button>

  <ul>
    <li v-for="item in liste">{{item}}</li>
  </ul>
</div>
```

🚀 Tester votre application ! Vous devez voir les éléments de votre liste.

🤓 Tester d'ajouter un élément « à la main » via les VueJS dev tools.

## Ajouter un élément dans la liste

Le but de VueJS c'est aussi de rendre simple la modification de la vue / template / affichage. Nous allons (enfin vous…) modifier le code précédent pour ajouter dans la liste l'élément saisi par l'utilisateur :

Modifier la méthode action pour y mettre le code suivante :

```js
this.liste.push(prompt("Entrer une valeur"));
```

🚀 Tester votre code

## Et via un input ?

Un prompt c'est « pas très beau » non ? Passer par un input HTML serait quand même plus sympa ! Pour ça rien de plus simple, ajouter le code suivant dans `#app` :

```html
<input
  type="text"
  @keyup.enter="liste.push($refs['input'].value)"
  ref="input"
/>
```

☝️ Quelques explications :

- `@keyup.enter` Permets de déclarer une méthode qui sera appelée lors de l'appui sur la touche entrée.
- `ref` permet de déclarer une référence vers l'élément HTML, celui-ci sera ensuite disponible par `$refs['input']`

## Et via un input 2 ?

La première solution est pas trop mal, mais, utiliser les data est serait certainement une meilleure idée. Autre solution, mais tout aussi simple (et certainement bien meilleur).

- Déclarer une nouvelle variable dans les `data`, par exemple, dans mon cas la variable est `saisie` :

```js
data(){
    return {
        saisie: "",
        liste: ["Item", "Item 2"],
    }
}
```

- Ajouter un input qui utiliser la variable saisie :

```html
<input type="text" v-model="saisie" @keyup.enter="liste.push(saisie)" />
```

☝️ Quelques explications :

- `v-model` Permets de connecter la variable saisie à votre input.
- `@keyup.enter` Permets de déclarer une méthode qui sera appelée lors de l'appui sur la touche entrée.

## L'input n'est pas vidé ?

Comme vous l'avez très certainement remarqué, le champ n'est pas vidé après une saisie… Vous avez deux solutions pour faire ça:

- Modifier le code dans le `@keyup.enter` pour effacer la variable `saisie`. (Via la création d'une nouvelle méthode dans votre objet).
- Autre solution via un watcher sur la variable `saisie`.

C'est à vous implémenté la première solution, puis la seconde.
