# Migration

Dans le cadre du TP, vous allez devoir « moderniser » une application simple. L’application à migrer été réalisée dans le cadre de la démonstration.

L’application existante est une « todo liste » codée en PHP + HTML.

## Récupération et installation des sources

Avant de commencer à travailler, il faut récupérer le code source de l’application éxistante. Celui-ci est disponible sur le groupe « Gitlab » du BTS-SIO. Le nom du projet est ```todo-list-php```.

Faire « fonctionner » l’application en locale, une fois installé, celle-ci doit ressembler à :

TODO IMAGE

Étudier le fonctionnement du code source actuel. (créer des tâches, etc…)

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

### Création des API.

Quand on réalise une application « moderne », il est très difficile d’échapper au client-serveur. Dans notre cas la partie serveur vas-être réalisée en PHP, mais il est possible de la faire dans n’importe qu’elle language. En Entreprise vous serez souvent confronté à du PHP/Java/Python/RoR. Mais la liste est infinie. Il est même possible de faire des API en Bash… Bref le choix est infini.

#### Les API

Notre cas étant simple, chaque API sera en réalité un fichier PHP qui se chargera de faire l’action voulue. Exemple :

- liste.php
- creation.php
- suppression.php
- terminer.php

Dans un nouveau dossier dans votre WAMP, créer les ```4``` fichiers, nous allons les completer dans la suite du TP.

##### liste.php

L’API « liste », doit retourner un JSON. Le JSON retourner est une représentation au format texte des valeurs contenu dans la variable ```$_SESSION["taches"]```

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
  echo json_encode($variable);
?>
```

Rappel: Avant de pouvoir utiliser la session vous devez faire un ```session_start();```

C’est à vous, réaliser votre première API.

```
<?php
…
```

##### creation.php
##### suppression.php
##### terminer.php

### Structure de base.

### Migration des fonctionnalités

#### Liste des tâches

#### Ajout d’une tâche

#### Suppression d’une tâche

#### Marquer une tâche comme terminé
