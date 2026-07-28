---
description: Le document présent ainsi que les supports de cours et TP sont actuellement écrits pour VueJS 2.0
---

# Aide mémoire VueJS 2.0

::: details Table des matières
[[toc]]
:::

::: warning Vue 2 est en fin de vie
Vue 2 n'est plus maintenu depuis le 31 décembre 2023. Cette fiche est conservée pour référence, pour tout nouveau projet consultez la [fiche Vue 3](/cheatsheets/vuejs3/).
:::

[Débuter en Français](https://v2.fr.vuejs.org/v2/guide/index.html)

## Outillage

::: warning
L'outillage Vue 2 (`vue-cli`, templates webpack) n'est plus maintenu, il n'est donc pas présenté ici. Pour un nouveau projet, utilisez Vue 3 et son outillage moderne.
:::

## Utilisation en mode « standalone »

Ajout de VueJS dans un projet classique, usage en mode « déclaratif »

Ajouter la librairie

```html
<script src="https://unpkg.com/vue@2"></script>
```

Exemple de HTML existant dans la page :

```html
<div id="monMessage">
  <h1>{{ message }}</h1>
</div>
```

Code Javascript à ajouter :

```js
var app = new Vue({ el: '#monMessage', data: { message: 'Bonjour Monde' } })
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
- beforeDestroy
- destroyed

[Les cycles de vie](https://v2.fr.vuejs.org/images/lifecycle.png)

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
