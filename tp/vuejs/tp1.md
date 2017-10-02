# J’ajoute VueJS dans une application existante

Dans le cadre du TP, vous allez devoir « moderniser » une application simple. L’application à migrer été réalisée dans le cadre de la démonstration.

L’application existante est une « todo liste » codée en PHP + HTML.

## Récupération et installation des sources

Avant de commencer à travailler, il faut récupérer le code source de l’application éxistante. Celui-ci est disponible sur le groupe « Gitlab » du BTS-SIO. Le projet est disponible sur Github : [Télécharger les sources](https://github.com/c4software/php-todo)

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

### Intégration de VueJS

Maintenant que nous avons créé les API nous allons pouvoir nous intérésser à la partie « J’intégre VueJS ». Le déroulement vas être se suivant :

- Intégré la librairie VueJS dans le code existant.
- Créer un composant global que gère l’application.
- « Convertir » le code existant en code « VueJS » (le Foreach par exemple).

### Ajout de la librairie VueJS

L’ajout de la librairie VueJS est simple, il suffit d’ajouter dans le « head » du code existant :

```
<script src="https://unpkg.com/vue"></script>
```

Valider le fonctionnement grace à la « Console de Développement » de votre Navigateur (Touche F12 en général).

* Comment validez-vous le fonctionnement ?


### Migration des fonctionnalités

#### Liste des tâches

#### Ajout d’une tâche

#### Suppression d’une tâche

#### Marquer une tâche comme terminé
