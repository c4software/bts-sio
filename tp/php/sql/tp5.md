# Bart PHP et MySQL

Vous aviez une session… Et bien maintenant, nous allons mettre en place une base de données ! Celle-ci nous permettra de sauvegarder **de manière** persistante les données de vos utilisateurs.

## Première étape définir le besoin

Dans notre application nous souhaitons **enregistrer** les phrases saisies par les utilisateurs. Nous devons donc déterminer :

- Ce que nous allons sauvegarder (table)
- Les données que nous allons enregistrer (colonnes)
- Sous quel format (type de données)
- Les informations rattachées à « la phrase enregistré ». (relation)

::: tip C'est un métier la base de données
Concevoir une base de données est une chose qui peut-être complexe en fonction du projet. Il faut donc y passer du temps idéalement hors du code, voir même sur une feuille pour avoir les idées bien claires.
:::

## Concevoir le MCD

La première étape d'un développement avec une base de données est la conception d'un MCD. Le MCD va nous permettre de nous représenter visuellement l'ensemble des données ainsi que les relations entre les différentes tables.

Pour réaliser le MCD nous avons plusieurs solutions :

- Avec un papier et un crayon.
- [En ligne](https://dbdiagram.io/home)

Pour moi, dans notre cas nous allons avoir :

- Une table : **phrases**.
- 4 colonnes : **id**, **phrase**, **nombre**, **date**, **ip**.

Je vous laisse concevoir le MCD et déterminer le format des données.

::: details Voilà le résultat dans mon cas
![MCD](./res/mcd.png)
:::

## Transformer le MCD en Base de données

En fonction de votre choix, nous avons deux solutions :

- Si vous avez choisis d'utiliser [dbdiagram.io](https://dbdiagram.io/home) celui-ci intégre « le script SQL » permettant de générer la base de données (via _Export_).
- Si vous n'avez pas utilisé dbdiagram, nous allons utiliser l'interface de PhpMyAdmin pour créer notre base de données.

L'autre solution, c'est d'écrir à la main le script SQL permettant de créer la base de données. C'est complètement possible, et avec l'habitude c'est également très rapide !

### PhpMyAdmin

Ici introduction et usage d'exemple.

### Ajouter des données de tests

Via PhpMyAdmin

### Écrire les requêtes

Avant d'attaquer la partie « PHP », je vous propose d'écrire dans un premier temps les différentes requêtes…

- Le SELECT (obtenir l'ensemble de données).
- l'INSERT (ajouter des données)

## Accéder à la BDD depuis le PHP

C'est la partie qui nous intéresse…

### db.php

Se connecter à la base de données.

### index.php

Récupérer les données

### bart.php

Ajouter les données
