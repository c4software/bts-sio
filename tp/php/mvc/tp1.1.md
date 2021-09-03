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

### Télécharger le code source

Le projet de base est disponible [à l'adresse suivante en cliquant ici](https://github.com/c4software/mini-mvc-sample/archive/refs/tags/1.0.zip)

::: tip C'est un projet vide
Même si celui-ci contient à première vue « beaucoup de fichiers », le projet vous avez téléchargé est bien un projet vide.
:::

## Faire fonctionner le code

La première étape est de faire fonctionner le code sur votre machine. Je vous laisse mettre en place le code fourni dans votre dossier `htdocs` ou `www` en fonction de l'outil que vous utilisez.

**Attention au fichiers cachés**, dans l'archive il y a un fichier .htaccess ne l'oubliez pas !

::: tip .htaccess ?
Vous avez déjà entendu parlé de ce fichier ? C'est un fichier important, il va nous permettre de définir / redéfinir le comportement de votre serveur Web pour par exemple activer l'`URL REWRITING` (réécriture d'URL).

La réécriture d'url va nous permettre d'avoir de beaux liens exemple `index.php?page=toto` deviendra seulement `toto.html`. Vous voulez en savoir plus ? Je suis là 👋, je vais vous donner un complément d'information.
:::

|                                                                               |
| :---------------------------------------------------------------------------: |
|                  ![Exemple qui fonctionne](./res/sample.png)                  |
| Si tout fonctionne correctement, vous devriez avoir 👆 (superbe n'est-ce pas) |

## Modifier la page « Home »

Le meilleur moyen pour prendre en main un projet c'est de le modifier, je vous propose donc une première modification très simple :

- Modifier la page d'accueil.

Je vous propose de mettre en place sur la page d'accueil une photo / image (de votre choix) centrée via de la CSS.

::: tip C'est à vous

La bonne démarche à mon sens est là suivante :

- Utiliser un IDE pertinent (exemple PHPStorm ou VSCode).
- Repensé à l'introduction et la notion de MVC. Nous allons effectivement toucher le `Vue` (elle même appelé par le contrôleur), ça veut dire que vous allez trouver votre fichier dans le dossier `views`.
- Pour trouver le bon fichier, je vous laisse un peu investiguer, mais sachez que regarder dans le contrôleur semble être une bonne idée…

👋 Je suis là pour ceux qui sont perdus 🤕

:::

## Créer la page « About »

Maintenant que vous avez réalisé votre modification, je vous propose de regarder « Comment ajouter une nouvelle page dans cette superbe architecture (que je trouve déjà géniale) ».

J'imagine que pour l'instant vous avez peur :

- Mais comment faire pour ajouter une page?
- J'ai bien du HTML dans `views` mais comment je l'appelle?

Et bien la réponse à vos questions est

- Une **nouvelle** méthode dans le bon contrôleur.
- Un fichier `about.php` dans `views`.
- Une correspondance entre « Votre méthode » et une route dans le `routes/Web.php`.

::: tip Nous l'avons vu ensemble

Le routeur est un « composant » très important du web moderne. Il va nous permettre de piloter les ressources accessibles à notre client en les déclarant dans un fichier.

- À votre avis, pourquoi est-ce important de travailler avec une `WHITELIST` plutôt qu'une `BLACKLIST` dans ce genre de situation ?

:::

Vu que c'est la première fois, nous allons le faire ensemble… N'hésitez pas à poser vos questions !

### Créer la méthode

Nous allons dans un premier temps créer une méthode dans le contrôleur `SampleWeb.php`, pour le contenu pas grand-chose pour l'instant. Vous pouvez vous inspirer du contenu de la méthode `home()`.

```php
function about()
{
    $this->header(); // Va afficher le header de la page (mais comment ? Avez-vous regardé ?)
    include("views/global/about.php");
    $this->footer(); // Va afficher le footer de la page (mais comment ? Avez-vous regardé ?)
}
```

Pour l'instant aucun changement, si vous utilisez PHPStorm celui-ci va vous proposer de créer le fichier `about.php` directement en cliquant sur « la petite lampe jaune ».

![Créer le fichier avec PHPStorm](./res/create_file_phpstorm.png)

### Créer la vue / page

Si ce n'est pas déjà fait, créé le fichier `views/global/about.php`. Pour le contenu, je vous laisse libre. Je vous rappelle juste que nous sommes entrain de créer une page « À propos ».

::: tip Rappel
ici nous n'écrivons que le contenu, l'entête et le pied de page sont « automatiquement » ajoutés grâce au code présent dans la méthode home de votre contrôleur.
:::

### Créer la route

Voilà nous avons maintenant l'ensemble du code, mais celui-ci n'est pas encore accessible. Pour le rendre accessible, vous devez le déclarer dans le routeur.

Ici nous sommes entrain de faire une page `Web`, vous devez donc ajouter dans le routeur `Web.php` l'accès à votre page via l'ajout de la ligne suivante :

```php
Route::Add('/about', [$main, 'about']);
```

- **Évidemment** c'est à ajouter après la route existante.
- Le premier paramètre correspond au « Chemin / lien d'accès », le second étant la méthode à appeler dans le bon contrôleur.

👋 Je vous laisse tester l'accès à votre page

## Place au projet « La TODO list »

Maintenant que nous avons pris en main le code existant, je vous propose de réaliser une plus grosses modification, l'ajout d'une nouvelle fonctionnalitée « La TodoList », pour réaliser l'ensemble du code, je vais bien évidemment vous guider.

Nous allons donc créer une TODO List. Une TODO List c'est toujours le même genre d'action :

- Une Liste.
- Un ajout dans la liste.
- Un marquer comme terminer « une todo ».
- Un supprimer qui supprime uniquement les taches « avec un status terminer ».

Nous allons donc avoir 4 fonctionnalités dans notre applications. Chaque fonctionnalité je le rappel sera une méthode de notre contrôleur :

|    Route     | Méthode dans le contrôleur |
| :----------: | -------------------------: |
|   `/list`    |                  `liste()` |
|  `/ajouter`  |          `ajouter($texte)` |
| `/terminer`  |            `terminer($id)` |
| `/supprimer` |           `supprimer($id)` |

L'étape de définition des différentes actions est **primordiale**, ça va nous permettre de créer notre objet de manière efficace, l'autre bonne façon de représenter notre objet est via une modélisation UML.

![Modélisation UML](./res/todoControler.png)

::: tip Vous vous intégrez dans un framework
Parlons un peu de la modélisation UML que je vous propose, comme vous pouvez le constater nous avons ici la définition de la class avec les différentes méthodes définies dans le tableau.

Nous avons également une classe en plus ; cette classe est « la base » d'un contrôleur, elle définit les méthodes de bases communes à l'ensemble des contrôleurs du framework. Cette classe ne sera **jamais** instanciée directement, la flèche « extends » défini la notion d'héritage.
:::

### Créer le contrôleur

### Créer le modèle

### Initialiser la base de données

### Créer le contrôleur

## La Liste

## L'ajout

## La suppression
