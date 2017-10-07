# J’ajoute VueJS dans une application existante

Dans le cadre du TP, vous allez devoir « moderniser » une application simple. L’application à migrer été réalisée dans le cadre de la démonstration.

L’application existante est une « todo liste » codée en PHP + HTML.

- [Récupération et installation des sources](#récupération-et-installation-des-sources)
- [Liste des fonctionnalités](#liste-des-fonctionnalités)
- [Stockage](#stockage)
- [Moderniser avec VueJS](#moderniser-avec-vuejs)
- [Création des API.](#création-des-api)
  - [Les API](#les-api)
  - [Valider le fonctionnement : Postman](#valider-le-fonctionnement--postman)
  - [Optimisation du code.](#optimisation-du-code)
- [Intégration de VueJS](#intégration-de-vuejs)
- [Ressources utiles](#ressources-utiles)
- [Ajout de la librairie VueJS](#ajout-de-la-librairie-vuejs)
- [Conversion du template existant](#conversion-du-template-existant)
- [Migration des fonctionnalités](#migration-des-fonctionnalités)
  - [Découverte de Fetch](#migration-des-fonctionnalités)
  - [Liste des tâches](#liste-des-tâches)
  - [Ajout d’une tâche](#ajout-dune-tâche)
  - [Marquer une tâche comme terminé](#marquer-une-tâche-comme-terminé)
  - [Suppression d’une tâche](#suppression-dune-tâche)

## Récupération et installation des sources

Avant de commencer à travailler, il faut récupérer le code source de l’application éxistante. Celui-ci est disponible sur le groupe « Gitlab » du BTS-SIO. Le projet est disponible sur Github : [Télécharger les sources](https://github.com/c4software/php-todo/archive/v1.0.zip)

1/ Faire « fonctionner » l’application en locale, une fois installé, celle-ci doit ressembler à :

![Exemple](https://github.com/c4software/php-todo/raw/master/sample.png)

2/ Étudier le fonctionnement du code source actuel. (créer des tâches, etc…)

## Liste des fonctionnalités

Voilà la liste des fonctionnalités de l’application existante :

- Liste des tâches.
- Ajout de tâche.
- Suppression de tâche.
- Marquer comme terminé une tâche.

## Stockage

Lors de votre étupde du code, vous avez du vous rendre compte que l’application utilisait la variable ```$_SESSION``` pour stocker les « tâches ».

La SESSION étant non persistante, dans du vrai code il ne faut en ```aucun cas``` stocker des données comme des tâches dedans (au risque de tout perdre…).

Au passage, regarder le fonctionnement de la SESSION en utilisant plusieurs navigateur.

## Moderniser avec VueJS

## Création des API.

Quand on réalise une application « moderne », il est très difficile d’échapper au client-serveur. Dans notre cas la partie serveur vas-être réalisée en PHP, mais il est possible de la faire dans n’importe qu’elle language. En Entreprise vous serez souvent confronté à du PHP/Java/Python/RoR. Mais la liste est infinie. Il est même possible de faire des API en Bash… Bref le choix est infini.

### Les API

Notre cas étant simple, chaque API sera en réalité un fichier PHP qui se chargera de faire l’action voulue. Exemple :

- liste.php
- creation.php
- suppression.php
- terminer.php

Dans les sources de l’application todo-list, ajouter un dossier ```api``` puis créer les ```4``` fichiers, nous allons les completer dans la suite du TP.

### L’API pour lister les tâches en attente « liste.php »

L’API « liste », doit retourner un JSON. Le JSON retourner est une représentation au format texte des valeurs contenu dans la variable ```$_SESSION["todos"]```

Exemple de retour :
```JSON
[
  {"contenu": "Démo", "terminer": true},
  {"contenu": "Exemple", "terminer": false}
]
```

Voilà un exemple de code pour réaliser un fichier JSON en PHP :

```
<?php
  header("content-type: application/json");
  …
  // Vérifier si en $_SESSION["taches"] est bien un tableau
  …
  echo json_encode($variable);
?>
```

Rappel: Avant de pouvoir utiliser la session vous devez faire un ```session_start();```

C’est à vous, réaliser votre première API.

```
<?php
…
```

### L’API de création « creation.php »

L’API « creation.php », vas permettre la création de nouvelles « tâches », une fois l’ajout réalisé, celle-ci doit retourner un JSON permettant de savoir dans votre application si le traitement c’est bien passé. Cette API ne doit fonctionner qu’en POST.

Paramètres d’entrés :

| Nom           | Type          | Méthod|
| ------------- |:-------------:| -----:|
| texte         | string        | POST  |
| date          | string        | POST  |


Voici un exemple de code PHP :

```
<?php
header("content-type: application/json");
…
// Vérifier si en $_SESSION["taches"] est bien un tableau
…

$todo = array("id" => uniqid(), "texte" => $_POST["texte"], "date" => $_POST["date"], "termine" => false);

// Sauvegarder dans la Session.
$_SESSION["taches"][$todo["id"]] = $todo;
…

?>
```

Retour :

Par exemple :
```
{"success": true}
```

Vous pouvez également utiliser les codes de retour HTTP pour indique l’état du résultat. [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

Question:

- Comment bloquer l’ajout de TODO vide ?
- Comment n’autoriser que le POST ?

##### L’API de suppression « suppression.php »

L’API « suppression » va permettre la suppression du la « tache » passé en paramètre, ***uniquement*** les tâches termine à « true » peuvent-être terminé, dans tous le cas l’API doit retourner un JSON permettant de savoir dans votre application si le traitement c’est bien passé. L’API doit fonctionner en GET et en POST.

Contraintes :

- L’API doit fonctionner en GET et en POST.
- Il est impossible de supprimer un tâche non terminé. (termine==true)

Paramètres d’entrés :

| Nom           | Type          | Méthod|
| ------------- |:-------------:| -----:|
| id            | string        | GET   |

Par exemple :
```
{"success": true}
```

Vous pouvez également utiliser les codes de retour HTTP pour indique l’état du résultat. [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

##### L’API pour marquer une tâche comme « terminé » : « terminer.php »

L’API « terminer.php » va changer l’état du flag « termine ». Vous devez retourner un JSON permettant à votre future application de s’avoir si le traitement c’est bien déroulé.

Paramètres d’entrés :

| Nom           | Type          | Méthod|
| ------------- |:-------------:| -----:|
| id            | string        | GET   |

Vous pouvez également utiliser les codes de retour HTTP pour indique l’état du résultat. [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

### Valider le fonctionnement : Postman

Pour tester vos traitement, vous avez la possibilité d’utiliser le logiciel POSTMAN.

Téléchargé le [ici](https://www.getpostman.com/)

Une fois installé, appeler vos APIs pour tester leur fonctionnement.

- Valider le fonctionnement à chaque étape (Création, liste, termine, suppression)

### Optimisation du code.

Après avoir réalisé vos 4 API, vous devez certainement avoir du code « dupliqué ». Modifier vos API pour créer des fonctions « utilitaires » permettant de réduire la duplication de code.

- Comment procédez-vous ?
- Tester le fonctionnement à nouveau.

### Intégration de VueJS

Maintenant que nous avons créé les API nous allons pouvoir nous intérésser à la partie « J’intégre VueJS ». Le déroulement vas être se suivant :

- Intégré la librairie VueJS dans le code existant.
- Créer un composant global que gère l’application.
- « Convertir » le code existant en code « VueJS » (le Foreach par exemple).

### Ressources utiles

- [VueJS](https://vuejs.org)
- [VueJS](https://caniuse.com)


### Ajout de la librairie VueJS

L’ajout de la librairie VueJS est simple, il suffit d’ajouter dans le « head » du code existant :

```
<script src="https://unpkg.com/vue"></script>
```

Valider le fonctionnement grâce à la « Console de Développement » de votre Navigateur (Touche F12 en général).

* Comment validez-vous le fonctionnement ?

### Conversion du template existant

Maintenant que la librairie est présente, nous allons pouvoir l’utiliser. La première étape est de convertir le fichier ```index.php```. Notre application 2.0, ne sera plus une application PHP classique, mais une application reposant sur un modèle Client <-> Serveur. Pour ça vous devez procéder à quelques ajustement dans le site Internet :

- Supprimer le fichier index.php (il n’est plus nécéssaire).
- Déplacer le template (dans le dossier template à la racine).
- Renommer le template que vous avec déplacé en « index.html », ça va être la base de notre application.

#### Ajouter un script pour le JS

Ajouter dans le ```head``` de l’index.html un nouveau script ```main.js```, il contiendra le code nécéssaire au fonctionnement de notre site Web.

Attention: Inclure le script après VueJS.

#### Déclarer votre premier composant

Pour déclarer votre premier composant, c’est simple il suffit de mettre dans le fichier ```main.js``` le code suivant :

```
var app = new Vue({
  el: '#body',
  created: function () {
    console.log("Démarrage TODO-APP");
  }
})
```

- Vérifier le bon fonctionnement en regardant la « Console de Développement ». Le « log » est-il visible ?

### Migration des fonctionnalités

Maintenant que nous avons notre base, nous allons pouvoir convertir l’application pour cela nous allons procéder par étape, chaque étape est directement lié aux différentes API que vous avez pu précédemment écrite.

L’ensemble de l’application va devenir « asynchrone », vous allez vite vous rendre compte que la migration va nécessiter beaucoup d’Ajax. Pour faire nos appels nous utiliserons l’API « Fetch », celle-ci est intégré dans l’ensemble des navigateur récent ([consulter le support de fetch](https://caniuse.com/#search=fetch))

#### Découverte de Fetch

L'API Fetch fournit une interface JavaScript pour l'accès et la manipulation des parties de la pipeline HTTP, comme les requêtes et les réponses. Cela fournit aussi une méthode globale fetch() qui procure un moyen facile et logique de récupérer des ressources à travers le réseau de manière asynchrone.

Ce genre de fonctionnalité était auparavant réalisé avec XMLHttpRequest. Fetch fournit une meilleure alternative qui peut être utilisée facilement par d’autres technologies comme Service Workers. Fetch fournit aussi un endroit unique et logique pour la définition d'autres concepts liés à HTTP comme CORS et les extensions d'HTTP.

(Source: MDM)

Le support de l'API Fetch peut être détecté en vérifiant l'existance de Headers, Request, Response ou fetch() sur la portée de Window ou de Worker.
Par exemple, vous pouvez faire cela dans votre script:

```
if(self.fetch) {
  // Le support de Fetch est présent
}else{
  // Gérer le cas du non support de fetch.
  // Pour réduire le nombre de cas possible vous pouvez ajouter : https://github.github.io/fetch/ à votre projet
}
```

Appeler une API grâce à Fetch :

```
fetch('api/liste.php')
.then(function(response){
  // On décode le JSON, et on continue
  return response.json();
})
.then(function(response) {
  // Votre retour est ICI
  console.log(response);
})
.catch(function(error) {
  console.log('Récupération impossible: ' + error.message);
});
```

- Tester dès à présent cet appel dans la « Console développeur »

[Consulter la documentation complète (gestion des headers, paramètres, mode, etc)](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch)

#### Liste des tâches

La liste des tâches est chargé dès l’arrivée sur la page « principale ». Vous devez donc écrire du code dans l’évènement « beforeMount » (pour rappel n’hésité pas à consulter le [cycle de vie des composants](https://vuejs.org/images/lifecycle.png))

1/ Édition du main.js
2/ Ajouter le beforeMount

```
var app = new Vue({
  el: '#body',
  created: function () {
    console.log("Démarrage TODO-APP");
  },
  beforeMount: function() {
    // C’est ici que le traitement doit être fait
  }
})
```

3/ Exemple d’appel pour récupérer les tâches

```
fetch('api/liste.php')
.then(function(response){
  return response.json();
})
.then(function(response) {
  app.tache = this.response;
})
.catch(function(error) {
  console.log('Récupération impossible: ' + error.message);
});
```

4/ Initialiser la variable tache dans l’objet VueJS, Exemple :

```
var app = new Vue({
  el: '#body',
  data: {
      taches: []
    }
  […]
```

5/ Ajouter l’affichage dans le « template ». Dans la page HTML vous allez devoir utiliser l’attribut ```v-for```. Exemple :

```
<ul>
  <li v-for="tache in taches">{{tache.texte}}</li>
<ul>
```

Adapter l’exemple précédent dans pour utiliser le modèle actuellement présent dans la page HTML.

[Plus de détail sur la partie « rendu des listes »](https://fr.vuejs.org/v2/guide/list.html)

- L’affichage est-il le même ?
- Comment gérer le cas du chargement ? (dans le monde réel Internet peut-être lent…)
- Comment gérer le cas de la liste vide ?

#### Ajout d’une tâche

Maintenant que la liste est affichée, vous allez pouvoir gérer le cas de l’ajout d’une nouvelle tâche. L’ajout va également être faite via un appel Ajax.

1/ Créer une méthode Javascript, réalisant l’appel de l’API. Attention: L’utilisateur devant être prévenu de l’aspect obligatoire du contenu, vous devez rendre la saisie obligatoire (contrôle de saisie, OU [librairie Sweetalert](https://sweetalert.js.org/))

```
var app = new Vue({
  […]
  methods: {
    ajout: function () {
      var contenu = document.getElementById("texte");
      if(contenu == ""){
        swal("Oops","Vous devez spécifier du texte…" , "error" );
      }else{
        // Appel de l’API avec Fetch (Ajax)
      }
    }
  }
  […]
```

2/ Créer l’appel à l’API

```
var form = new FormData();
form.append('texte', contenu);
fetch("api/creation.php", {
  method: "POST",
  body: form
})
.then(function(response){
  return response.json();
})
.then(function(response) {
  if(reponse.success){
    this.recupererListe();
  }else{
    // Sweetalert pour l’utilisateur.
  }
})
.catch(function(error) {
  console.log('Récupération impossible: ' + error.message);
});
```

3/ Rafraichir la liste des tâche, pour ça vous allez créer une 2nd méthode qui réalise l’appel Ajax de récupération de la liste. Une fois cette méthode faite, appeler la dans la partie ```// traiter le retour```.
4/ Optimiser votre code en remplaçant le code dans le ```beforeMount``` par un appel à la méthodes que vous avez créer

Votre objet VueJS, doit ressembler à quelques chose comme ça :


```
var app = new Vue({
  el: '#body',
  created: function () {
    console.log("Démarrage TODO-APP");
  },
  data: {
      taches: []
  },
  beforeMount: function() {
    this.recuperer_liste();
  },
  methods:{
    ajout: function () {},
    recupererListe: function (){}
  }
})
```

5/ Appel de votre code dans le template. Maintenant que votre code est prêt, vous allez pouvoir l’appeler depuis votre template. Pour faire ça, vous allez utiliser [la gestion des événements de VueJS](https://vuejs.org/v2/guide/events.html) Exemple :

```
<form v-on:submit.prevent="ajout"></form>
```

- Tester votre code.
- Tester l’ajout de tâche.
- Tenter d’injecter du code. Que se passe t’il ?

#### Marquer une tâche comme terminé

Pour marquer une tâche comme terminé, vous allez devoir appeler l’api « terminer.php ». Cette API doit-être appelé lors du click sur l’icône « oi oi-check ».

1/ Utiliser le [v-on:click](https://fr.vuejs.org/v2/guide/events.html)
2/ Remplacer :

```
<a href="./actions/done.php?id={id}" class="btn btn-success"><span class="oi oi-check"></span></a>
```

Par
```
<span class="oi oi-check" v-on:click="terminer()"></span>
```

3/ Déclarer la méthode « terminer » dans votre objet VueJS. Faite l’appel à votre API.
4/ L’objet VueJS doit maintenant ressemble à quelques choses comme ça :

```
var app = new Vue({
  el: '#body',
  created: function () {
    console.log("Démarrage TODO-APP");
  },
  data: {
      taches: []
  },
  beforeMount: function() {
    this.recuperer_liste();
  },
  methods:{
    ajout: function () {},
    recupererListe: function (){},
    terminer: function(){}
  }
})
```

5/ Ajouter le [v-if](https://fr.vuejs.org/v2/guide/conditional.html) nécéssaire à la règle suivante « uniquement les tâches non terminée peuvent-être marquer comme terminé »


- Tester le fonctionnement.
- Valider que seulement les tâches marqué comme « non terminée » peuvent-être terminée.

#### Suppression d’une tâche

La suppression d’une tâche est très similaire à l’action « terminer.php ». Je vous laisse appliquer la méthodologie précédente.

Ne pas oublier la règle de gestion : « Une tâche non marqué comme terminée ne peut-être supprimée. »

L’objet doit ressembler à :

```
var app = new Vue({
  el: '#body',
  created: function () {
    console.log("Démarrage TODO-APP");
  },
  data: {
      taches: []
  },
  beforeMount: function() {
    this.recuperer_liste();
  },
  methods:{
    ajout: function () {},
    recupererListe: function (){},
    terminer: function(){}
    supprimer: function(){}
  }
})
```
