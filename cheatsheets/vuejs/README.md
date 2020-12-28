# Aide mémoire VueJS 2.0

::: danger Remarque Décembre 2020
Nous sommes actuellement à une periode charnière de VueJS. La version 3.0 bien que stable n'est pas encore la version « par defaut ».

Le document présent ainsi que les supports de cours et TP sont actuellement écrits pour VueJS2
:::

[Débuter en Français](https://fr.vuejs.org/v2/guide/index.html)

## VueCLI (Recommandé pour les débutants)

Installation

```sh
$ npm install -g vue-cli
```

Créer un projet «application » depuis le template officiel

```sh
$ vue init webpack my-project
```

## Utilisation en mode « standalone »

Ajout de VueJS dans un projet classique, usage en mode « déclaratif »

Ajouter la librairie

```html
<script src="https://unpkg.com/vue"></script>
```

Exemple de HTML existant dans la page :

```html
<div id="monMessage">
  <h1>{{ titre }}<h1>
</div>
```

Code Javascript à ajouter :

```html
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
- detroyed

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
