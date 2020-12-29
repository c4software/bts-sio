# Bart PHP et MySQL

Vous aviez une session… Et bien maintenant, nous allons mettre en place une base de données ! Celle-ci nous permettra de sauvegarder **de manière** persistante les données de vos utilisateurs.

## Première étape définir le besoin

Dans notre application nous souhaitons **enregistrer** les phrases saisie par les utilisateur. Nous devons donc déterminer :

- Ce que nous allons sauvegarder (table)
- Les données que nous allons enregistrer (colonnes)
- Sous quel format (type de données)
- Les informations rattaché à « la phrase enregistré ». (relation)

::: tip C'est un métier la base de données
Concevoir une base de données est une chose qui peut-être complexe en fonction du projet. Il faut donc y passer du temps idéalement hors du code, voir même sur une feuille pour avoir les idées bien clair.
:::

## Concevoir le MCD

La première étape d'un developpement avec une base de données est la conception d'un MCD. Le MCD va nous permettre de nous représenter visuellement l'ensemble des données ainsi que les relations entre les différentes tables.

## Transformer le MCD en Base de données

TODO

### PhpMyAdmin

Ici introduction et usage d'exemple.

### Ajouter des données de tests

Via PhpMyAdmin

### Écrire les requêtes

Avant d'attaquer la partie « PHP », je vous propose d'écrire dans un premier temps les différentes requetes…

- Le select (obtenir l'ensemble de données).
- l'insert (ajouter une données)

## Accéder à la BDD depuis le PHP

C'est la partie qui nous intéresse…

### db.php

Se connecter à la base de données.

### index.php

Récupérer les données

### bart.php

Ajouter les données
