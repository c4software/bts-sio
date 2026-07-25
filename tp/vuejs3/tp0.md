---
description: Dans ce TP nous allons découvrir l'utilisation de VueJS sans bundler. Nous allons donc utiliser directement le CDN de VueJS.
---

# Prise en main de VueJS 3

Dans ce TP nous allons découvrir l'utilisation de VueJS sans bundler. Nous allons donc utiliser directement le CDN de VueJS.

::: details Table des matières
[[toc]]
:::

## Initialisation

Ajouter VueJS dans un projet est aussi simple que d'ajouter une librairie. Première étape, créer un fichier `index.html` puis insérer à l'intérieur « une structure HTML 5 »

::: tip
Si vous utilisez Visual Studio Code, vous pouvez faire html:5 <kbd>Tab</kbd>, une structure HTML sera automatiquement écrite.
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
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

Et voilà !

## Ah ouais ? C'est aussi simple !?

Bon en vrai on va devoir ajouter quelques petits trucs… Si vous avez suivi pendant mon cours :

- Une balise « racine » qui contiendra notre template.
- Une balise script qui contiendra notre code JavaScript.

### Ajout des éléments

Remplacer le commentaire `<!-- Votre code ici -->` par

```html
<div id="app">{{ message }}</div>

<script>
  const { createApp } = Vue;

  createApp({
    mounted() {
      console.log("Ding ! 🍪 Votre code fonctionne !");
    },
    data() {
      return {
        message: "Bienvenue dans VueJS 3 !",
      };
    },
  }).mount("#app");
</script>
```

🚀 Et voilà ! Là c'est vraiment tout. Votre code est prêt. Vous pouvez faire du VueJS 🍪.

## Tester votre code

Votre code doit dès à présent fonctionner ! Vérifier dans la console de votre navigateur que vous avez la phrase :

`Ding ! 🍪 Votre code fonctionne !`

## Un simple bouton

Nous allons ajouter un simple « button » dans notre page. Celui-ci affichera une `alert` lorsque l'utilisateur clique dessus. Modifier votre objet VueJS pour qu'il ressemble à :

```js
app = createApp({
  mounted() {
    console.log("Ding ! 🍪 Votre code fonctionne !");
  },
  data() {
    return {};
  },
  methods: {
    action() {
      alert("🎉 Bravo 🎉");
    },
  },
});

app.config.devtools = true;
app.mount("#app");
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

## Modifier une variable depuis la vue

Nous allons maintenant modifier une variable depuis la vue. Pour cela nous allons :

- Déclarer une variable dans les `data`.
- L'afficher dans le template.
- Modifier la variable depuis le template.

### Les data

Vous vous souvenez comment déclarer les datas ? Non !? Un petit rappel alors, nous allons déclarer une variable directement dans la méthode `data` de notre objet VueJS. Quelque chose comme :

```js
data(){
    return {
        compteur: 0
    }
}
```

🤓 Notez que la variable est nommée `compteur`.

### L'affichage

Nous allons maintenant afficher la variable dans le template. Pour cela il suffit d'ajouter <span v-pre>`{{ compteur }}`</span> dans le template. Après modification votre code doit ressembler à :

```html
<div id="app">
  <button @click="action">Clique ici</button>
  <p>{{ compteur }}</p>
</div>
```

🚀 Tester votre code.

### La modification

Nous allons maintenant modifier la variable depuis le template. Pour cela il suffit d'ajouter `@click="compteur++"` dans le template. Après modification votre code doit ressembler à :

```html
<div id="app">
  <button @click="action">Clique ici</button>
  <p @click="compteur++">{{ compteur }}</p>
</div>
```

🚀 Tester votre code.

## Afficher une liste

Un bouton c'est bien, mais une liste c'est mieux non ? Vous allez voir qu'afficher une liste c'est aussi simple qu'un bonjour 👋. Comme vu ensemble en cours, nous allons :

- Déclarer les `data`.
- Faire un `v-for` dans le code.

### Les data

Vous vous souvenez comment déclarer les datas ? Non !? Un petit rappel alors, nous allons déclarer un tableau (`[]`) directement dans la méthode `data` de notre objet VueJS. Quelque chose comme :

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
app = createApp({
  mounted() {
    console.log("Ding ! 🍪 Votre code fonctionne !");
  },
  data() {
    return {
      liste: ["Item 1", "Item 2", "Item 3"],
    };
  },
  methods: {
    action() {
      alert("🎉 Bravo 🎉");
    },
  },
});

app.config.devtools = true;
app.mount("#app");
```

🚀 Valider avec les Vue Dev Tools que votre liste est bien présente.

### Afficher la liste

Pour afficher la liste nous allons devoir faire un `v-for` sur l'élément qui sera `répété` ou `affiché plusieurs fois`. Exemple :

```html
<ul>
  <li v-for="item in liste">{{item}}</li>
</ul>
```

Ajouter le code HTML dans la `div#app`, vous devez obtenir :

```html
<div id="app">
  <button @click="action">Clique ici</button>

  <ul>
    <li v-for="item in liste">{{item}}</li>
  </ul>
</div>
```

🚀 Tester votre application ! Vous devez voir les éléments de votre liste.

🤓 Essayer d'ajouter un élément « à la main » via les VueJS dev tools.

## Ajouter un élément dans la liste

Le but de VueJS c'est aussi de rendre simple la modification de la vue / template / affichage. Nous allons (enfin vous…) modifier le code précédent pour ajouter dans la liste l'élément saisi par l'utilisateur :

Modifier la méthode action pour y mettre le code suivant :

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

- `@keyup.enter` Permet de déclarer une méthode qui sera appelée lors de l'appui sur la touche entrée.
- `ref` permet de déclarer une référence vers l'élément HTML, celui-ci sera ensuite disponible par `$refs['input']`

## Et via un input version à privilégier ?

La première solution n'est pas trop mal, mais, utiliser les data serait certainement une meilleure idée. Autre solution, mais tout aussi simple (et certainement bien meilleure).

- Déclarer une nouvelle variable dans les `data`, par exemple, dans mon cas la variable est `saisie` :

```js
data(){
    return {
        saisie: "",
        liste: ["Item", "Item 2"],
    }
}
```

- Ajouter un input qui utilise la variable saisie :

```html
<input type="text" v-model="saisie" @keyup.enter="liste.push(saisie)" />
```

☝️ Quelques explications :

- `v-model` Permet de connecter la variable saisie à votre input.
- `@keyup.enter` Permet de déclarer une méthode qui sera appelée lors de l'appui sur la touche entrée.

## L'input n'est pas vidé ?

Comme vous l'avez très certainement remarqué, le champ n'est pas vidé après une saisie… Vous avez deux solutions pour faire ça :

### Solution 1 : Via une méthode

Modifier votre code pour créer une méthode dédiée :

```js
methods: {
  ajouterElement() {
    this.liste.push(this.saisie);
    this.saisie = ""; // Vide le champ après ajout dans la liste
  }
}
```

Puis modifier votre input :

```html
<input type="text" v-model="saisie" @keyup.enter="ajouterElement" />
```

🚀 Tester votre code, le champ devrait maintenant se vider après chaque ajout.

### Solution 2 : Via un watcher (découper les responsabilités)

C'est à vous d'implémenter la seconde solution en utilisant un watcher sur la variable `liste`.

Quelques éléments pour vous aider :

```js
watch: {
  liste: {
    handler() {
      this.saisie = "";
    },
    deep: true,
  }
}
```

La méthode `watch` permet de surveiller une variable, ici `liste`. À chaque modification de cette variable, la méthode sera appelée. Vous pouvez donc en profiter pour vider la variable `saisie`. `deep` permet de surveiller les modifications profondes d'un objet ou d'un tableau.

C'est à vous, ajouter un watcher qui ajoute un élément dans la liste à chaque fois que le compteur atteint un modulo de 10 (10, 20, 30, etc.).

## Et si on voulait supprimer un élément ?

Pour supprimer un élément, il faut que vous ajoutiez un bouton dans votre liste. Voici comment faire :

```html
<ul>
  <li v-for="(item, index) in liste">
    {{item}}
    <button @click="liste.splice(index, 1)">Supprimer</button>
  </li>
</ul>
```

🚀 Tester votre code, vous devriez pouvoir supprimer chaque élément de la liste.

::: tip index ?

`index` est une variable qui est automatiquement créée par VueJS, elle représente l'index de l'élément dans le tableau. Vous pouvez la spécifier lors de l'écriture de votre `v-for` :

```html
<li v-for="(item, index) in liste">{{item}}</li>
```

:::

## Conclusion

Vous avez maintenant les bases de VueJS, vous pouvez maintenant vous lancer dans la création de vos premières applications. VueJS permet de simplifier énormément la récupération de données via une API REST.

Je vous propose de continuer votre aventure avec le TP 2 : [Disponible ici](./tp1.md)

## Ressources

- [VueJS](https://vuejs.org/)
- [VueJS Dev Tools Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [VueJS Dev Tools Firefox](https://addons.mozilla.org/fr/firefox/addon/vue-js-devtools/)
