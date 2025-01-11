---
description: Le document présent ainsi que les supports de cours et TP sont actuellement écrits pour VueJS 3.0
---

# Aide mémoire VueJS 3.0

::: details Table des matières
[[toc]]
:::

[Débuter en Français](https://fr.vuejs.org/guide/introduction.html)

## Vite (Recommandé pour les débutants)

Installation

```sh
$ npm init @vitejs/app my-project --template vue
$ cd my-project
$ npm install
$ npm run dev
```

## Utilisation en mode « standalone »

Ajout de VueJS dans un projet classique, usage en mode « déclaratif »

Ajouter la librairie

```html
<script src="https://unpkg.com/vue@next"></script>
```

Exemple de HTML existant dans la page :

```html
<div id="monMessage">
  <h1>{{ titre }}<h1>
</div>
```

Code Javascript à ajouter :

```html
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

[Les cycles de vie](https://fr.vuejs.org/images/lifecycle.png)

## Les directives

Les directives sont des attributs html propres à VueJS

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
