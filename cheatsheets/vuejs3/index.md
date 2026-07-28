---
description: Le document présent ainsi que les supports de cours et TP sont actuellement écrits pour VueJS 3.0
---

# Aide mémoire VueJS 3.0

::: details Table des matières
[[toc]]
:::

[Débuter en Français](https://fr.vuejs.org/guide/introduction.html)

::: tip Options API et Composition API
Cette fiche utilise l'Options API. Vue 3 propose également la Composition API avec `<script setup>`, très utilisée dans les projets récents. Voir la [documentation officielle](https://fr.vuejs.org/guide/introduction.html#api-styles).
:::

## Vite (Recommandé pour les débutants)

Installation

```sh
$ npm create vue@latest
$ cd my-project
$ npm install
$ npm run dev
```

> Alternative : `npm create vite@latest mon-projet -- --template vue` pour un projet Vite minimal.

## Utilisation en mode « standalone »

Ajout de VueJS dans un projet classique, usage en mode « déclaratif »

Ajouter la librairie

```html
<script src="https://unpkg.com/vue@3"></script>
```

Exemple de HTML existant dans la page :

```html
<div id="monMessage">
  <h1>{{ message }}</h1>
</div>
```

Code Javascript à ajouter :

```js
const app = Vue.createApp({
  data() {
    return {
      message: 'Bonjour Monde'
    }
  }
}).mount('#monMessage')
```

## Les évènements

- v-on:click.stop (stop la propagation du click)
- v-on:click.prevent (Exemple : v-on:submit.prevent="onSubmit")
- v-on:click.capture (Évènement interne, appelé avant)
- v-on:click.self (Évènement uniquement si lui-même)
- v-on:click.once (Évènement déclenché une seule fois)

## Cycle de vie

- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeUnmount
- unmounted

[Les cycles de vie (documentation officielle)](https://vuejs.org/guide/essentials/lifecycle.html)

## Les directives

Les directives sont des attributs HTML propres à VueJS

- v-text
- v-html
- v-show
- v-if
- v-else
- v-else-if
- v-for
- v-on
- v-bind
- v-model
- v-pre
- v-cloak
- v-once
