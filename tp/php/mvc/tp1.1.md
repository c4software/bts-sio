# Prise en main structure MVC

Dans ce TP, nous allons prendre en main [la structure de code présente ici](./tp1.md).

::: details Sommaire
[[toc]]
:::

## Introduction

Comme précisé dans le cours et dans nos échanges, la structure « MVC » est proposée ici comme phase transitoire entre votre code PHP de première année et du Laravel que l'on peut retrouver en entreprise. En effet, même si la structure MVC a été créée avec la prise en compte de contrainte de sécurité elle n’est en aucun cas dimensionnée pour réaliser un site client avec plusieurs centaines d'utilisateurs.

::: tip C'est important
Le point d'introduction est important. Savoir justifier d'une solution est tout aussi important que la solution en elle-même. Si vous décider décider d'utiliser ma structure dans d'autres développements vous devez le faire avec conviction et pas juste « parceque ».

Ceci etant dit, nous pouvons continuer 🚀 !
:::

## Le projet

Si vous avez déjà testé de nouvelles technologies, il existe un type de projet qui permet « de prendre en main » facilement du code inconnu. Ce type de projet est une TODO List.

Je vous propose donc de réaliser une TODO List en utilisant la structure MVC.

_Voilà ce que nous allons réaliser :_

![Le projet](./res/liste.png)

## La structure

La structure de code MVC reprend les bases des frameworks modernes types Laravel. C'est-à-dire un découpage « MVC », le découpage MVC signifie :

- **M**odèle
- **V**ue
- **C**ontrôleur

![MVC](./res/mvc.png)

### Le Modèle

Le modèle représente la couche de votre application qui va manipuler les données. Concrètement c'est celle-ci qui va parler en SQL avec votre moteur de base de données.

Vous trouverez dans celle-ci **autant de méthodes que nécessaire**, vous pouvez _(et à mon avis vous devez)_ spécialiser vos modèles aux différentes tables présentes dans votre projet.

Par exemple si nous avons la base de données suivante :

![Exemple MCD](./res/mcd_exemple.jpeg)

Nous devrions créer au minimum _3 modèles_ :

- Client
- BonDeCommande
- Produit

Avec à chaque fois des méthodes spécifiques exemple, nous pourrions avoir

| Modèle        | Méthodes                                                    |
| :------------ | :---------------------------------------------------------- |
| Client        | `CreerClient()`, `ModifierClient()`, `SupprimerClient()`    |
| BonDeCommande | `CreerBdc()`, `ModifierBdc()`, `SupprimerBdc()`             |
| Produit       | `CreerProduit()`, `ModifierProduit()`, `SupprimerProduit()` |

::: danger STOP ! Ce qu'il faut retenir
Ce qu'il faut retenir c'est :

- Autant d'objets que de tables.
- Des méthodes spécifiques aux actions à faire dans la table.
  :::

::: tip Crud
Ce genre d'objet s'appelle un Crud (Create, Update, Delete). C'est une structure que nous retrouverons très souvent. Vous allez voir que c'est tellement courant qu'en général ils sont écrits automatiquement par le Framework.

<iframe src="https://giphy.com/embed/11ISwbgCxEzMyY" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
:::

### La Vue

La vue vous connaissez! Ici rien de nouveau. Le `V` de MVC c'est juste la représentation graphique de ce que vous souhaitez afficher (en HTML + CSS + JavaScript).

Cependant par rapport à vos premiers développements nous allons découper au maximum le code HTML en différent fichier pour éviter le code dupliqué en utilisant une architecture qui ressemble à :

![Découpage](./res/parties.png)

::: tip L'objectif ?

- Éviter le code dupliqué.
- Faciliter la modification.
- Se concentrer sur la partie du code « Métier » de la page en cours.

:::

### Le Contrôleur

Et le contrôleur dans tout ça ? Et bien le contrôleur va assembler :

- Votre modèle (l'accès aux données).
- Votre Vue (l'affichage).

Le code va prendre les demandes des clients « appel HTTP » réaliser le traitement en base de données et afficher « la vue » résultat au client.

Comme pour le modèle, le contrôleur est un objet qui doit posséder idéalement autant de méthode que de page (et peut-être plus).

### Le Routeur

Nous l'avons vu en cours, en plus du MVC classique, nous allons ajouter une dernière brique « essentiel » au bon fonctionnement et à la maintenance de votre site Internet. Cette brique est nommée un **Routeur**.

Le routeur va contenir la déclaration des « liens » de votre site Internet afin de les aiguiller vers la bonne fonctionnalité dans votre contrôleur.

Nous pouvons schématiser le fonctionnement :

![Intégration du routeur](./res/routeur.png)

::: tip Vous êtes ici ?

Appeler-moi nous allons discuter un peu de cette architecture, qui est la base de presque l'ensemble des frameworks modernes (Laravel, VueJS, React …)

:::

### Vous souhaitez plus de détail ?

L'idée ici était de rappeler les bases, si vous souhaitez plus de détail sur l'architecture MVC que je vous propose [rendez-vous ici](./tp1.md)

## Récupérer le code source d'exemple

Un peu comme pour un projet Laravel, nous n'allons pas partir de 0 ! Vous allez partir d'un code initial qui vous servira de base de travail.

Le code en question est « vide », il s'agit uniquement d'une structure que **vous devez** respecter. Un peu comme en entreprise vous vous intégrer dans une équipe, je vous propose ici de respecter quelques règles qui sont des standards du développement.

Comme indiqué en introduction, la structuration d'un développement est aussi importante que le développement en
lui-même. C'est pour ça qu'avant même de développer il est important de prendre en main la structure des dossiers et
fichiers proposés dans le code présenté en exemple.

La structure de base en termes de dossier ressemble à :

![Structure des dossiers](./res/structure_dossiers.png)

::: tip Compliqué ?
Pas d'inquiétude, pas de stress ! nous allons voir ensemble comment prendre en main le code.
:::

### Globalement

Le code présent utilise différents aspects du développement objet :

- Des objets permettant d'encapsuler / organiser la logique autour de représentation.
- De l'héritage afin d'organiser le code hiérarchiquement.
- Des interfaces permettant de définir un comportement.

Les éléments de `base` sont toujours dans un dossier nommé `base`. Vous retrouverez ce dossier pour les contrôleurs, les routes, les modèles.

### La configuration

Avant d'aller plus loin, intéressons-nous à la configuration. Dans un projet, il est évident qu'il ne faut pas mettre la configuration n'importe où. Vous l'avez vécu en entreprise, vous avez peut-être eu à votre disposition plusieurs serveurs / machines / ordinateurs.

Votre code va fonctionner de manière identique entre chaque environnement, par contre ce qui va certainement changer c'est l'accès à la base de données. Cet accès, est dépendant d'une configuration (Utilisateur, Mot de passe, Serveur …) dans une structure MVC on essai de ne pas mettre cette configuration n'importe où !

Dans l'organisation que je vous propose, cette configuration est centralisée dans le fichier `configs.php` à la racine du code source.

::: tip La configuration c'est bien !
C'est peut-être un détail pour vous… Mais pour moi ça veut dire beaucoup ! Actuellement vous avez un serveur, mais demain peut-être 20… Et pour votre projet final, vous aurez à déployer rapidement votre application sur un autre serveur que celui sur lequel vous avez développé.

Prenez **dès maintenant** l'habitude de mettre votre configuration (IP, Serveur, mot de passe de BDD, etc.) dans le fichier `configs.php`. Dans l'architecture que je vous propose vous y trouverez le minimum nécessaire au bon fonctionnement d'une application.
:::

## Ma première page « La Home »

### Créer le contrôleur

### Créer la vue / page

## Place au projet « La TODO list »

### Créer le modèle

### Initialiser la base de données

### Créer le contrôleur

## La Liste

## L'ajout

## La suppression
