# Aide mémoire VueJS 2

[Débuter en Français](https://fr.vuejs.org/v2/guide/index.html)


## VueCLI (Recommandé pour les débutants)

Installation

```
$ npm install -g vue-cli
```

Créer un projet «application » depuis le template officiel
```
$ vue init webpack my-project
```

## Utilisation en mode « standalone »

Ajout de VueJS dans un projet classique, usage en mode « déclaratif »

Ajouter la librairie
```
<script src="https://unpkg.com/vue"></script>
```

Exemple de HTML existant dans la page :
```
<div id="monMessage">
  <h1>{{ titre }}<h1>
</div>
```

Code Javascript à ajouter :
```
var app = new Vue({
  el: '#monMessage',
  data: {
    message: 'Bonjour Monde'
  }
})
```

## Les événements

* v-on:click.stop (stop la propagation du click)
* v-on:click.prevent (Exemple : v-on:submit.prevent="onSubmit")
* v-on:click.capture (Évenement interne, appelé avant)
* v-on:click.self (Événement uniquement si lui même)
* v-on:click.once (Événement déclenché une seule fois)

## Cycle de vie

* beforeCreate
* created
* beforeMount
* mounted
* beforeUpdate
* updated
* beforeDestroy
* detroyed

[Les cycles de vie](https://fr.vuejs.org/images/lifecycle.png)

## Les directives

Les directives sont des attributs html propre à VueJS

* v-text
* v-html
* v-show
* v-if
* v-else
* v-else-if
* v-for
* v-on
* v-bind
* v-model
* v-pre
* v-cloak
* v-once
