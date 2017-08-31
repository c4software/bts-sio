# Initiation GIT

Vous débutez avec GIT, le TP suivant vous fera parcourir les concepts de base de la ligne de commande Git.

## Ressources utiles

* [Aide mémoire](https://github.com/c4software/cheatsheet/blob/master/git.md)
* [Google](https://www.google.fr)
* [Livre Git en ligne](https://git-scm.com/book/fr/v2)

## Situation

Vous êtes en entreprise, vous avez un nouveau projet à réaliser. Le projet est plutôt conséquent (plusieurs semaines de travail), votre responsable vous indique que vous serez le seul développeur sur le code.

### Questions

* Voyez vous d’autre questions à poser à votre chef de projet ?
* Comment imaginez vous l’organisation de votre travail ?
	* Un gestionnaire de version est-il utile ?
	* Si oui, pourquoi ?
	* Si non, pourquoi ?


## Initialisation

Votre choix est fait, vous devez maintenant initialiser votre espace de travail, comment procédez vous?

### Définir votre identité dans GIT
```

```


### Initialiser votre projet

```

```

## Début du code

Maintenant que votre projet est initialisé, il faut maintenant créer les fichiers de base. créer la structure suivante :

```
$ tree
.
├── Makefile
├── documentations
│   └── README.md
├── libs
│   ├── HTMLPurifier.php
│   └── fonction.php
├── public
│   ├── index.jpg
│   └── index.js
├── source
│   ├── index.html
│   ├── index.js
│   └── index.php
└── tests
    ├── test.js
    └── test.php

5 directories, 11 files
```

### Question bonus

* Comment avez-vous procédez?
	* Est-ce la technique utilisée en entreprise ?
	* Est-ce pratique ?
	* Comment faire autrement ?


Vérifier le statut de Git après avoir tout créé

```

```

### Questions

* Que constatez-vous ?
	* Quelle commandes, faut-il faire maintenant?
	* Une autre commande serait-elle utile ?


Ajouter les changements

```

```

Est-ce la seul façon de faire ? (Plusieurs réponses sont possibles)

```

```

### Questions

* Qu’avez vous fait ?
* Qu’elles sont différences entre les deux commandes?
* Dans quel état est votre dépôt (repository) ?
* À quoi sert la commande ```git status``` ?
	* Une autre commande permettrait t’elle d’avoir une information similaire ?
* Le commentaire que vous avez mis est-il correcte ?
	* Est-il possible de l’améliorer ?
	* Si oui, comment ?

## Ajout / Modification de fichiers

Modifier le fichier ```source/index.html```, ajouter du contenu dedans (par exemple, une page html fictive)

```
$ vim source/index.html
```

Vérifier que vos modifications sont présentes dans GIT

```
$
$ # Ou
$
```

Ajouter vos modifications dans Git

```
$
```

### Questions

* À quoi sert les commentaires ?
	* Est-ce que pour vous ?
* Y’a t’il plusieurs façon de faire ?
* Comment vérifier que vos modifications ont bien été prise en compte ?

```
$
```

## Modifier le message du précédent commit

Votre responsable n’est pas satisfait de la qualité du message de votre dernier commit, modifier le en utilisant [Un template de message de commit](https://github.com/c4software/cheatsheet/blob/master/git/commit_template.md)

```
$
```

### Questions

* Pourquoi votre responsable vous a t’il demandé de le modifier?
* Pourquoi le commentaire est-il aussi important ?

## Ajout d’une évolution dans le précédent fichier

```
$
```

Sauvegarder les modifications après avoir vérifier que celle-ci sont bien présentes

```
$
$
```

### Question

* À votre avis, comment déterminer la fréquence des « commits »?

## Un coup d’oeil dans le rétroviseur

Vérifier l’historique de votre projet

```
$
$ # ou pour avoir une vue « compact »
$
```

### Questions

* Que constatez-vous ?
* À quoi sert l’identifiant de chaque commit ? (Hash SHA)
* Comment vérifiez-vous l’historique pour un fichier précis ?
* Comment voir l’ensemble des modifications en détail pour le fichier ```source/index.html```
* Est-ce judicieux de travailler toujours sur la branche ```master``` ?

## Une autre évolution

Votre première version est maintenant disponible pour les utilisateurs, votre responsable vous demande une évolution importante du code, celle-ci est majeur et changera complètement le comportement de votre application. Vous ne pouvez pas travailler directement sur la master.

Comment procédez-vous ?

```
$
$
```

Faites des modifications dans les fichiers que vous voulez.

### Questions

* Vérifier l’état de votre dépôt Git
* Quel est l’avantage de travailler dans une branch ?
* À votre avis quel sont les prochaines étapes ?

## Fusion / Merge de la fonctionnalité

Votre code est finalisé, il faut maintenant fusionner vos modifications avec votre branch master :

```
$
$
```

### Questions

* À votre avis, en entreprise « merge / fusionne » ton directement sur la master ?
* Une autre personne peut-elle / doit-elle être impliqué dans cette étape ?

## Annulation, retour arrière

Faite des évolutions dans votre branche master (2 ou 3), ajouter les via ```git add```. Votre responsable vous demande finalement de les annuler car il ne souhaite pas garder la fonctionnalité. Comment procédez-vous ?

```
$
```

### Questions

* Que vient-il de se produire ?
* Est-il possible de récupérer vos modifications ?

## Finalisation

Voilà, votre projet à atteint une première étape. Que pouvez-vous faire pour « marquer » cette première version ?

```
$ 
```

### Questions

* Que vient-il de se produire?
* À votre avis, quel est l’intérêt de « taguer » une version ?
* Quel sont les avantages de réaliser un tag ?
