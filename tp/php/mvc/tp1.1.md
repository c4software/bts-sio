---
description: "TP guidé : réaliser une TODO List avec la structure MVC (modèle, contrôleur, routes, vues et authentification)."
---

# TP TODO List

Dans ce TP, nous allons prendre en main [la structure de code présentée ici](./tp1.md).

::: details Sommaire
[[toc]]
:::

## Introduction

Comme précisé dans le cours et dans nos échanges, la structure « MVC » est proposée ici comme phase transitoire entre votre code PHP de première année et du Laravel que l'on peut retrouver en entreprise. En effet, même si la structure MVC a été créée avec la prise en compte de contrainte de sécurité, elle n’est en aucun cas dimensionnée pour réaliser un site client avec plusieurs centaines d'utilisateurs.

- [Aide mémoire Programmation Orientée Objet](/cheatsheets/poo/)
- [La modélisation objet](/cheatsheets/poo-uml/)
- [Aide mémoire Mini MVC Sample](/cheatsheets/mini-mvc-sample/)

::: tip C'est important
Le point d'introduction est important. Savoir justifier d'une solution est tout aussi important que la solution en elle-même. Si vous décidez d'utiliser ma structure dans d'autres développements vous devez le faire avec conviction et pas juste « parce que ».

Des changements mineurs ont été ajoutés à la structure en 2022/2023 :

- Le système de « template » n'affiche plus par défaut la page. Il ne faut pas oublier le return.
- L'accès à la base de données est maintenant « Lazy », la connexion à celle-ci ne sera faite que lors de la **première requête**.
- Le connecteur de base de données est maintenant partagé avec l'ensemble des modèles.

Ceci étant dit, nous pouvons continuer 🚀 !
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

::: tip Par exemple

Si nous avons la base de données suivante :

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

:::

::: danger STOP ! Ce qu'il faut retenir
Ce qu'il faut retenir c'est :

- Autant d'objets que de tables.
- Des méthodes spécifiques aux actions à faire dans la table.

:::

::: tip CRUD
Ce genre d'objet s'appelle un CRUD (Create, Read, Update, Delete). C'est une structure que nous retrouverons très souvent. Vous allez voir que c'est tellement courant qu'en général ils sont écrits automatiquement par le Framework.

<iframe src="https://giphy.com/embed/11ISwbgCxEzMyY" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
:::

### La Vue

La vue, vous connaissez ! Ici, rien de nouveau. Le `V` de MVC c'est juste la représentation graphique de ce que vous souhaitez afficher (en HTML + CSS + JavaScript).

Cependant, par rapport à vos premiers développements, nous allons découper au maximum le code HTML en différents fichiers. Objectif : éviter le code dupliqué en utilisant une organisation qui ressemblera à :

![Découpage](./res/parties.png)

::: tip L'objectif ?

- Éviter le code dupliqué.
- Faciliter la modification.
- Se concentrer sur la partie du code « Métier » de la page en cours.

:::

### Le Contrôleur

Et le contrôleur dans tout ça ? Eh bien le contrôleur va assembler :

- Votre modèle (l'accès aux données).
- Votre Vue (l'affichage).

Le code va prendre les demandes des clients « appel HTTP » réaliser le traitement en base de données et afficher « la vue » résultat au client.

Comme pour le modèle, le contrôleur est un objet qui doit posséder idéalement autant de méthodes que de pages (et peut-être plus).

### Le Routeur

Nous l'avons vu en cours, en plus du MVC classique, nous allons ajouter une dernière brique « essentielle » au bon fonctionnement et à la maintenance de votre site Internet. Cette brique est nommée un **Routeur**.

Le routeur va contenir la déclaration des « liens » de votre site Internet afin de les aiguiller vers la bonne fonctionnalité dans votre contrôleur.

Nous pouvons schématiser le fonctionnement :

![Intégration du routeur](./res/routeur.png)

::: tip Vous êtes ici ?

Appelez-moi, nous allons discuter un peu de cette architecture, qui est la base de presque l'ensemble des frameworks modernes (Laravel, VueJS, React…).

:::

### Vous souhaitez plus de détail ?

L'idée ici était de rappeler les bases, si vous souhaitez plus de détails sur l'architecture MVC que je vous propose, [rendez-vous ici](./tp1.md).

## Récupérer le code source d'exemple

Assez de blabla, un peu comme pour un projet Laravel, nous n'allons pas partir de 0 ! Vous allez partir d'un code initial qui vous servira de base de travail.

Le code en question est « vide », il s'agit uniquement d'une structure que **vous devez** respecter. Un peu comme en entreprise vous vous intégrez dans une équipe, je vous propose ici de respecter quelques règles qui sont des standards du développement.

Comme indiqué en introduction, la structuration d'un développement est aussi importante que le développement en
lui-même. C'est pour ça qu'avant même de développer il est important de prendre en main la structure des dossiers et
fichiers proposés dans le code présenté en exemple.

La structure de base en termes de dossier ressemble à :

![Structure des dossiers](./res/structure_dossiers.png)

::: tip Compliqué ?
Pas d'inquiétude, pas de stress ! Nous allons voir ensemble comment prendre en main le code.
:::

### Globalement

Le code présent utilise différents aspects du développement objet :

- Des objets permettant d'encapsuler / organiser la logique autour de représentation.
- De l'héritage afin d'organiser le code hiérarchiquement.
- Des interfaces permettant de définir un comportement.

Les éléments de `base` sont toujours dans un dossier nommé `base`. Vous retrouverez ce dossier pour les contrôleurs, les routes, les modèles.

### La configuration

Avant d'aller plus loin, intéressons-nous à la configuration. Dans un projet, il est évident qu'il ne faut pas mettre la configuration n'importe où. Vous l'avez vécu en entreprise, vous avez peut-être eu à votre disposition plusieurs serveurs / machines / ordinateurs.

Votre code va fonctionner de manière identique entre chaque environnement, par contre ce qui va certainement changer c'est l'accès à la base de données. Cet accès est dépendant d'une configuration (Utilisateur, Mot de passe, Serveur…). Dans une structure MVC, on essaie de ne pas mettre cette configuration n'importe où !

Dans l'organisation que je vous propose, cette configuration est centralisée dans le fichier `configs.php` à la racine du code source.

::: tip La configuration c'est bien !
C'est peut-être un détail pour vous… Mais pour moi ça veut dire beaucoup ! Actuellement vous avez un serveur, mais demain peut-être 20… Et pour votre projet final, vous aurez à déployer rapidement votre application sur un autre serveur que celui sur lequel vous avez développé.

Prenez **dès maintenant** l'habitude de mettre votre configuration (IP, Serveur, mot de passe de BDD, etc.) dans le fichier `configs.php`. Dans l'architecture que je vous propose vous trouverez le minimum nécessaire au bon fonctionnement d'une application.
:::

### Télécharger le code source

Le projet de base est disponible [à l'adresse suivante en cliquant ici](https://github.com/c4software/mini-mvc-sample/archive/refs/tags/3.1.zip)

::: tip C'est un projet vide
Même si celui-ci contient à première vue « beaucoup de fichiers », le projet que vous avez téléchargé est bien un projet vide.
:::

## Faire fonctionner le code

La première étape est de faire fonctionner le code sur votre machine. Je vous laisse mettre en place le code fourni dans votre dossier `htdocs` ou `www` en fonction de l'outil que vous utilisez.

**Attention aux fichiers cachés**, dans l'archive il y a un fichier `.htaccess`, ne l'oubliez pas !

::: tip .htaccess ?
Vous avez déjà entendu parler de ce fichier ? C'est un fichier important, il va nous permettre de définir / redéfinir le comportement de votre serveur Web pour par exemple activer l'`URL REWRITING` (réécriture d'URL).

La réécriture d'URL va nous permettre d'avoir de beaux liens, exemple : `index.php?page=toto` deviendra seulement `toto.html`. Vous voulez en savoir plus ? Je suis là 👋, je vais vous donner un complément d'information.
:::

|                                                                               |
| :---------------------------------------------------------------------------: |
|                  ![Exemple qui fonctionne](./res/sample.png)                  |
| Si tout fonctionne correctement, vous devriez avoir 👆 (superbe n'est-ce pas) |

## Un serveur intégré ?

La structure MVC possède un serveur web intégré, celui-ci vous permettra de tester votre site web en local sans même avoir besoin de Wamp / Xampp ou autre serveur Apache + PHP.

::: tip Si votre ordinateur est correctement configuré

Vous devriez être capable de faire :

```sh
php mvc serve
```

Cette commande intégrée à la structure MVC lancera un serveur automatiquement (sur le port 9000).

:::

::: details Comment ça fonctionne ?

```sh
# Windows (avec XAMPP)
C:/xampp/php/php -S localhost:9000

# Windows (avec WAMP)
C:/wamp64/bin/php/php8.4.0/php -S localhost:9000

# Linux / OSX
php -S localhost:9000
```

:::

## Modifier la page « Home »

Le meilleur moyen pour prendre en main un projet c'est de le modifier, je vous propose donc une première modification très simple :

- Modifier la page d'accueil.

Je vous propose de mettre en place sur la page d'accueil une photo / image (de votre choix) centrée via de la CSS.

::: tip C'est à vous

La bonne démarche à mon sens est la suivante :

- Utiliser un IDE pertinent (exemple PHPStorm ou VSCode).
- Repenser à l'introduction et la notion de MVC. Nous allons effectivement toucher la `Vue` (elle-même appelée par le contrôleur), ça veut dire que vous allez trouver votre fichier dans le dossier `views`.
- Pour trouver le bon fichier, je vous laisse un peu investiguer, mais sachez que regarder dans le contrôleur semble être une bonne idée…

👋 Je suis là pour ceux qui sont perdus 🤕

:::

## Créer la page « À propos »

Maintenant que vous avez réalisé votre modification, je vous propose de regarder « Comment ajouter une nouvelle page dans cette superbe architecture (que je trouve déjà géniale) ».

J'imagine que pour l'instant vous avez peur :

- Mais comment faire pour ajouter une page ?
- J'ai bien du HTML dans `views`, mais comment je l'appelle ?

Eh bien la réponse à vos questions est :

- Une **nouvelle** méthode dans le bon contrôleur.
- Un fichier `about.php` dans `views`.
- Une correspondance entre « Votre méthode » et une route dans le `routes/Web.php`.

::: tip Nous l'avons vu ensemble

Le routeur est un « composant » très important du web moderne. Il va nous permettre de piloter les ressources accessibles à notre client en les déclarant dans un fichier.

- À votre avis, pourquoi est-ce important de travailler avec une `WHITELIST` plutôt qu'une `BLACKLIST` dans ce genre de situation ?

:::

Vu que c'est la première fois, nous allons le faire ensemble… N'hésitez pas à poser vos questions !

Voilà en vidéos ce que vous allez réaliser :

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/78_oUJrqd9c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Créer la méthode

Nous allons dans un premier temps créer une méthode dans le contrôleur `SampleWebController.php`, pour le contenu pas grand-chose pour l'instant. Vous pouvez vous inspirer du contenu de la méthode `home()`.

```php
function about()
{
    return Template::render("views/global/about.php");
}
```

Pour l'instant aucun changement, si vous utilisez PHPStorm celui-ci va vous proposer de créer le fichier `about.php` directement en cliquant sur « la petite lampe jaune ».

### Créer la vue / page

Si ce n'est pas déjà fait, créez le fichier `views/global/about.php`. Pour le contenu, je vous laisse libre. Je vous rappelle juste que nous sommes en train de créer une page « À propos ».

::: tip Rappel
Ici nous n'écrivons que le contenu, l'entête et le pied de page sont « automatiquement » ajoutés grâce au code présent dans la méthode de votre contrôleur.
:::

### Utiliser des variables dans votre vue

Nous avons ajouté une page, cependant, cette page est relativement « statique »… Pour aller un peu plus loin, je vous propose de voir comment envoyer des paramètres dans votre **vue**. Contrairement à du PHP comme en première année, vous n'allez pas avoir dans votre vue l'ensemble des variables. Vous n'aurez que celles présentes dans l'`array()`.

Si nous reprenons l'exemple précédent :

```php
return Template::render("views/global/about.php", array());
```

Combien de variables passons-nous ? Aucune, pour la suite, je vous propose d'ajouter une première variable :

```php
return Template::render("views/global/about.php", array("titre" => "À Propos"));
```

Puis modifier votre vue pour y ajouter l'usage de votre variable :

```php
<h1><?= $titre ?></h1>
```

C'est à vous, je vous laisse tester !

### Ajouter une seconde variable

Pour vérifier que vous avez bien compris la procédure, je vous laisse ajouter une seconde variable. Celle-ci doit être la date du jour ainsi que l'heure.

**Bien évidemment cette valeur doit être dynamique et changer à chaque chargement de page**.

Besoin d'aide ? Voilà un indice :

```php
return Template::render("views/global/about.php", array("titre" => "Votre titre !", "date" => …));
```

C'est à vous :

- Modifier votre contrôleur pour ajouter la bonne valeur.
- Modifier votre vue pour afficher la valeur. (En bas de la page à propos).
- Valider le bon fonctionnement.

### Créer la route

Voilà nous avons maintenant l'ensemble du code, mais celui-ci n'est pas encore accessible. Pour le rendre accessible, vous devez le déclarer dans le routeur.

Ici nous sommes en train de faire une page `Web`, vous devez donc ajouter dans le routeur `Web.php` l'accès à votre page via l'ajout de la ligne suivante :

```php
Route::Add('/about', [$main, 'about']);
```

- **Évidemment** c'est à ajouter après la route existante.
- Le premier paramètre correspond au « Chemin / lien d'accès », le second étant la méthode à appeler dans le bon contrôleur.

👋 Je vous laisse tester l'accès à votre page

## Place au projet « La TODO list »

Avant de commencer, je vous propose de regarder ensemble ce que nous allons réaliser.

Maintenant que nous avons pris en main le code existant, je vous propose de réaliser une plus grosse modification, l'ajout d'une nouvelle fonctionnalité « La TodoList », pour réaliser l'ensemble du code, je vais bien évidemment vous guider.

Nous allons donc créer une TODO List. Une TODO List c'est toujours le même genre d'action :

- Une liste.
- Un ajout dans la liste.
- Un marquage « comme terminée » d'une todo.
- Une suppression qui ne supprime que les tâches « avec comme statut termine = 1 ».

Nous allons donc avoir 4 fonctionnalités dans notre application. Chaque fonctionnalité, je le rappelle, sera une méthode de notre contrôleur :

|       Route       | Méthode dans le contrôleur |
| :---------------: | -------------------------: |
|   `/todo/liste`   |                  `liste()` |
|  `/todo/ajouter`  |          `ajouter($texte)` |
| `/todo/terminer`  |            `terminer($id)` |
| `/todo/supprimer` |           `supprimer($id)` |

L'étape de définition des différentes actions est **primordiale**, ça va nous permettre de créer notre objet de manière efficace, l'autre bonne façon de représenter notre objet est via une modélisation UML.

![Modélisation UML](./res/todoControler.png)

::: tip Vous vous intégrez dans un framework
Parlons un peu de la modélisation UML que je vous propose, comme vous pouvez le constater nous avons ici la définition de la class avec les différentes méthodes définies dans le tableau.

Nous avons également une classe en plus ; cette classe est « la base » d'un contrôleur, elle définit les méthodes de bases communes à l'ensemble des contrôleurs du framework.

🗣 Cette classe ne sera **jamais** instanciée directement, la flèche « extends » définit la notion d'héritage.
:::

### Bootstrap

Nous allons utiliser Bootstrap pour coder l'interface, n'hésitez donc pas à consulter la documentation :

- [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
- [Bootstrap Icon](https://icons.getbootstrap.com/)

### Modélisation de la base de données

Avant de continuer, je vous propose de définir le format de la base de données. En effet, notre modèle reposera sur celle-ci, il faut donc y réfléchir. L'idée ici est de faire du code, j'ai donc réfléchi (un peu) à votre place. Le minimum pour que nous puissions réaliser notre « TodoList » est la création de la table suivante :

![Modélisation table TODO](./res/todos.png)

Nous allons créer cette table plus tard, mais pour l'instant, nous avons besoin de la modélisation pour créer notre modèle.

### Créer le modèle

Le modèle va être le moyen d'accéder à nos données, c'est ici que nous allons écrire nos requêtes SQL (**et uniquement ici**). Utiliser un framework signifie en général gagner du temps ! Pour l'instant, j'imagine que vous n'en avez pas l'impression, mais je vous assure quand vous maitrisez un framework et/ou une architecture vous gagnerez un temps fou. Ce gain de temps vient de plusieurs éléments :

- L'architecture des dossiers et du code propre et bien organisé.
- Des outils pour créer les différents éléments.
- Du code partagé, utilisé sans copier / coller.

Le framework que je vous propose entre directement dans cette catégorie « Gagner du temps ». Pour créer notre modèle, au lieu de copier / coller du code, vous avez de base (intégré dans le code) un outil en ligne de commande qui s'occupe de tout (si si). Pour créer votre modèle pour accéder à la TodoList il vous suffit de :

```sh
# Hors Windows
php mvc model:create TodoModel

# Sous Windows (avec XAMPP)
C:/xampp/php/php mvc model:create TodoModel

# Sous Windows (avec WAMP)
C:/wamp64/bin/php/php8.2.13/php mvc model:create TodoModel
```

**Et c'est tout !** Votre modèle pour accéder aux données est prêt 🤝 (il est créé automatiquement dans le dossier `models`). Nous avons maintenant une classe qui nous permettra d'accéder aux données contenues dans la base de données. L'accès aux données se fera :

- Via les méthodes « de base » (comme vu en cours via l'héritage présent dans la classe).
- Via **_vos méthodes_** directement écrites par vous.

::: tip Pas de magie (jamais)
Je vous invite à regarder comment fonctionne cette partie dans le code. Ce n’est pas bien compliqué. D'ailleurs, regardons ensemble !
:::

::: warning Vous avez du mal à voir ce que nous avons créé non ?

Et oui, les commandes magiques c'est bien … mais voilà ce que nous avons créé :

![TodoModel](./res/umlTodoModel.jpg)

- SQL est « une classe de base », elle est intégrée dans le framework.
- Votre classe `TodoModel` hérite de la classe SQL. (Vous pouvez m'en dire plus ?)
- Votre classe `TodoModel` a été créée dans le dossier `models`. (Je vous laisse aller regarder)
- Pourquoi notre classe ne possède-t-elle qu'une seule méthode ?

:::

### Modifier le constructeur

Dans le constructeur de la classe, je vous laisse modifier les paramètres lors de la création du parent ; afin de spécifier le bon tableName et primaryKey.

Je vous redonne le schéma de la base de données :

![Modélisation table TODO](./res/todos.png)

### Créer la méthode « marquerCommeTermine() »

Dans le diagramme UML j'indique la présence d'une méthode `marquerCommeTermine()`, si vous avez ouvert la classe créée vous allez voir que cette méthode n'est pas présente. Nous allons donc devoir la créer…

- Pourquoi la méthode n'est pas présente ?
- Pourquoi ne pas utiliser les méthodes fournies par le parent ?

Cette méthode doit marquer comme terminé un enregistrement en base de données, nous allons donc avoir besoin :

- D'un `id` en paramètre de la méthode.
- D'une requête d'update.
- D'un connecteur PDO (pour parler à la base de données)

Vu que c'est la première fois je vous donne du code, mais attention à bien comprendre ce que vous copiez/collez :

```php
function marquerCommeTermine($id){
    $stmt = $this->getPdo()->prepare("UPDATE todos SET termine = 1 WHERE id = ?");
    $stmt->execute([$id]);
}
```

::: danger Où mettre la méthode ?

Vous avez 4 possibilités :

- Dans la vue (Non).
- Dans le routeur (Non).
- Dans le contrôleur (Non).
- Dans le modèle (**Oui**).

:::

::: details Besoin d'aide ?
Votre classe doit maintenant ressembler à :

```php
<?php
namespace models;

use models\base\SQL;

class TodoModel extends SQL
{
    public function __construct()
    {
        parent::__construct('todos', 'id');
    }

    function marquerCommeTermine($id){
        $stmt = $this->getPdo()->prepare("UPDATE todos SET termine = 1 WHERE id = ?");
        $stmt->execute([$id]);
    }
}
```

:::

Questions :

- À votre avis est-ce la seule façon de faire ?
- Avons-nous toutes les méthodes nécessaires pour réaliser notre application ?

### Initialiser la base de données

Votre projet avance petit à petit, nous avons déjà créé :

- La base du projet (structure).
- Le modèle pour accéder aux données.
- Les méthodes permettant de modifier les données.

C'est déjà pas mal, mais il manque maintenant la base de données en elle-même. Dans un framework cette partie-là est également automatisable (vous verrez avec Laravel c'est encore plus puissant). Dans un framework, appliquer les modifications dans la base de données s'appelle réaliser une « migration », avec notre « mini framework » pour créer la base de données il suffit de créer **un fichier** dans le dossier `migrations` :

- Créer le fichier `init.sql` dans le dossier `migrations`, y mettre le contenu suivant :

```sql
--
-- Structure de la table `todos`
--

CREATE TABLE `todos` (
  `id` int(11) NOT NULL,
  `texte` varchar(200) NOT NULL,
  `termine` tinyint(1) NOT NULL DEFAULT 0,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `todos`
--
ALTER TABLE `todos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `todos`
--
ALTER TABLE `todos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;
```

- Installer la migration (appliquer les modifications sur votre base de données) via la commande :

```sh
# Hors Windows
php mvc db:migrate

# Sous Windows (avec XAMPP)
C:/xampp/php/php mvc db:migrate

# Sous Windows (avec WAMP)
C:/wamp64/bin/php/php8.2.13/php mvc db:migrate
```

Si tout va bien vous devriez avoir le résultat suivant :

```sh
=> Start migration of « migrations/init.sql »
=> End migration of « migrations/init.sql »
```

::: tip Point d'avancement

- Ça ne fonctionne pas ? Avez-vous vérifié la configuration de votre projet (`configs.php`) ?
- Vérifiez si la base a bien été créée dans votre PhpMyAdmin / DataGrip 👌
- Mais c'est génial !

<iframe src="https://giphy.com/embed/SACoDGYTvVNhZYNb5a" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

:::

### Créer le contrôleur

Notre base est prête… Et si nous écrivions vraiment le code ? Comme pour créer le modèle, le framework vous fait gagner du temps ! Ici aussi pas besoin de copier / coller du code, une simple ligne de commande va vous initialiser un Contrôleur « vide » :

```sh
# Hors Windows
php mvc controller:create TodoWeb

# Sous Windows (avec XAMPP)
C:/xampp/php/php mvc controller:create TodoWeb

# Sous Windows (avec WAMP)
C:/wamp64/bin/php/php8.2.13/php mvc controller:create TodoWeb
```

Cette commande va initialiser un contrôleur de type Web. Celui-ci est pour l'instant vide de méthode :

![Modélisation UML](./res/todoControler.png)

Nous allons dans un premier temps devoir lui créer un constructeur afin d'instancier le modèle permettant l'accès à la base de données.

### Définir les routes dans le routeur

Vous vous souvenez lors de la création de notre première page, nous avions dû ajouter une ligne dans le routeur afin de rendre accessibles les méthodes. Pour notre nouveau contrôleur, ça sera la même chose !

|     Routes      | Contrôleur |   Méthodes    |
| :-------------: | :--------: | :-----------: |
|   /todo/liste   | `TodoWeb`  |   `liste()`   |
|  /todo/ajouter  | `TodoWeb`  |  `ajouter()`  |
| /todo/terminer  | `TodoWeb`  | `terminer()`  |
| /todo/supprimer | `TodoWeb`  | `supprimer()` |

Dans le fichier `routes/Web.php`, ajouter les lignes :

```php
  $todo = new TodoWeb();
  Route::Add('/todo/liste', [$todo, 'liste']);
  Route::Add('/todo/ajouter', [$todo, 'ajouter']);
  Route::Add('/todo/terminer', [$todo, 'terminer']);
  Route::Add('/todo/supprimer', [$todo, 'supprimer']);
```

- Où les ajouter ?
- À quoi correspondent-elles ?

### Ajouter le constructeur `__construct()`

Le contrôleur aura pour but d'aller récupérer les Todo en base **via** le modèle. Il faut donc donner un accès au modèle depuis la classe. Nous allons donc écrire **le constructeur** de la classe. En PHP, le constructeur s'écrit :

```php
    private $todoModel;

    function __construct(){
        $this->todoModel = new TodoModel();
    }
```

Je vous laisse réfléchir sur l'endroit où mettre le code en question.

:::: details Voir l'une des solutions possibles

```php
<?php
namespace controllers;

use controllers\base\Web;
use models\TodoModel;

class TodoWeb extends WebController
{
    private $todoModel;

    function __construct(){
        $this->todoModel = new TodoModel();
    }
}
```

::: danger Un instant

En PHP objet il y a la notion de namespace, Laravel utilise de base les namespaces, ça veut dire que nous allons avoir à utiliser le mot clé `use` pour importer (include). Quand vous voulez utiliser une classe qui n'est pas dans le même fichier, il faudra déclarer l'emplacement via un `use`. Exemple, pour que la classe `Demo` soit accessible depuis une autre classe, il faudra :

```php
use App\Models\Demo;
```

- ⚠️ Si vous utilisez **PHPStorm,** cet import sera automatique.
- ⚠️ Si vous utilisez **VSCode,** il faudra passer par une extension [disponible ici](https://marketplace.visualstudio.com/items?itemName=MehediDracula.php-namespace-resolver)

Pour **PHPStorm**, alt+entrée permettra de déclencher l'ajout du `use`.

Pour **VSCode** je vous laisse regarder l'usage de l'extension :

![Namespace Resolver](../../../cheatsheets/laravel/res/namespace_resolver.gif)

:::

::::

### La méthode `liste()`

La première méthode que nous allons créer est celle de la liste. Elle se nommera `liste()`, cette méthode sera automatiquement appelée via le `routeur` à **chaque visite d'un utilisateur**. L'objectif de cette méthode est :

- Récupérer l'ensemble des TODO (Array) actuellement en base via la méthode `getAll()` du modèle `TodoModel`.
- Afficher votre `vue` via un `return Template::render`.

::: tip Toujours la même forme

Vous allez rapidement vous apercevoir que la structure de base est toujours la même. Nous allons toujours faire la même chose lors de la création d'une méthode dans un contrôleur à savoir :

```php
    function maMethodeQueJaiCopierColler()
    {
        // Pourquoi j'ai copié / collé ceci ? C'est un exemple seulement
        return Template::render("views/global/home.php");
    }
```

**Pssst**, ne copiez / collez pas le code précédent ! C'est un simple exemple.

:::

Dans notre cas, la méthode va ressembler à :

```php
function liste()
    {
        $todos = $this->todoModel->getAll(); // Récupération des TODOS présents en base.
        return Template::render("views/todos/liste.php", array('todos' => $todos)); // Affichage de votre vue.
    }
```

Et c'est tout ! La puissance d'un framework c'est aussi ça, écrire finalement pas énormément de lignes pour afficher une page. Pourtant cette page :

- Affiche une entête.
- Récupère en base de données les éléments.
- Affiche la page.
- Affiche le pied de page.

### Le template de la page liste

Votre IDE doit actuellement être moyen content… Effectivement, nous avons fait un `Template::render` de `"views/todos/liste.php"` pourtant ce fichier n'existe pas.

Vu qu'il s'agit ici d'un projet de découverte, je vais vous en donner le contenu (si vous le souhaitez, vous pouvez également l'écrire), voilà le rendu :

![Interface TODO](./res/todoPreview.png)

```php
<div class="container p-3">
    <div class="card">
        <div class="card-body p-2">
            <!-- Action -->
            <form action="./ajouter" method="post" class="add">
                <div class="input-group">
                    <input id="texte" name="texte" type="text" class="form-control" placeholder="Prendre une note…" aria-label="My new idea" aria-describedby="basic-addon1"/>
                </div>
            </form>

            <!-- Liste -->
            <ul class="list-group pt-3">
                <?php
                foreach ($todos as $todo) {
                    ?>
                    <li class="list-group-item">
                        <div class="d-flex">
                            <div class="flex-grow-1 align-self-center"><?= $todo->texte ?></div>
                            <div>
                                <a href="./terminer?id=<?= $todo->id ?>" class="btn btn-outline-success">
                                    <i class="bi bi-check"></i>
                                </a>
                                <!-- Action à ajouter pour Supprimer -->
                            </div>
                        </div>
                    </li>
                    <?php
                }

                if (sizeof($todos) == 0) {
                    ?>
                    <li class="list-group-item text-center">C'est vide !</li>
                    <?php
                }
                ?>
            </ul>
        </div>
    </div>
</div>
```

Je vous laisse mettre le contenu dans votre fichier `views/todos/liste.php`.

::: tip Valider le bon fonctionnement

Si vous accédez à votre page `todo/liste` vous devriez avoir le contenu suivant :

![Résultat Liste vide](./res/todo_resultat_liste.png)

:::

### La méthode `ajouter($texte = '')`

Cette méthode sera automatiquement appelée quand vous allez appuyer sur la touche **Entrée** de votre clavier dans le champ de saisie sur la page `Liste`. L'objectif de cette méthode est de traiter l'action « J'ajoute un nouvel enregistrement dans la base Todo ».

Pour le code, je vais vous aider un peu, voilà le code du contrôleur :

```php
function ajouter($texte = "")
{
    $this->todoModel->ajouterTodo($texte);
    $this->redirectTo("./liste");
}
```

- À quoi correspond la méthode `redirectTo(…)` ? D'où provient-elle ?

_C'est à vous :_

- Mettre en place le code dans le contrôleur.
- Écrire la méthode ajouterTodo dans le modèle `TodoModel` (n'oubliez pas l'autocomplétion).
  - Écrire la requête `INSERT …`
- Tester le bon fonctionnement.

Dans mon cas voilà le résultat :

![Résultat Liste vide](./res/todo_resultat_ajouter.png)

#### Ajouter une validation

Actuellement dans le code que vous avez copié il est possible d'ajouter des « TODO » sans texte. Je vous propose donc d'ajouter un contrôle de saisie **dans le PHP**.

Le contrôle doit empêcher l'ajout d'une TODO si `$texte == ''`.

- Où placez-vous le contrôle ?
- Pourquoi ?

### La méthode `terminer($id = '')`

Vous l'avez compris… Je vous donne de moins en moins de code ! La méthode `terminer` sera très proche de `ajouter` sauf que celle-ci va prendre en paramètre l'id de l'élément à marquer comme terminé :

```php
function terminer($id = ''){
    if($id != ""){
        $this->todoModel->marquerCommeTermine($id);
    }

    $this->redirectTo("./liste");
}
```

- D'où arrive le paramètre `$id` ?
- Pourquoi est-ce automatique ?

_À faire_ :

- Mettre en place le code, valider le bon fonctionnement avec **PHPMyAdmin**.
- Modifier la vue pour afficher le bouton vert **seulement si** la tâche est non terminée.
- Ajouter un bouton « Supprimer » visible **uniquement si** la tâche est terminée.

![Résultat Liste vide](./res/todo_resultat_terminer.png)

### La méthode `supprimer($id = '')`

En utilisant le code précédemment fourni, écrire :

- La méthode dans le modèle permettant de supprimer un élément dans la base de données pour un id donné.
- La méthode dans le contrôleur permettant de traiter l'action.
- **Ne permettre la suppression** que des Todo ayant `termine = 1`. La vérification **ne doit pas être** présente que dans la vue.

C'est à vous.

## Ajouter un lien dans la page d'accueil

Ajouter dans la page d'accueil du site un lien permettant d'accéder à votre TodoList. Quelques consignes à respecter :

- Le lien doit être centré dans la page.
- Le lien doit avoir l'**apparence** d'un bouton. [Voir la documentation](https://getbootstrap.com/docs/5.0/components/buttons/)

## Masquer les TODO terminées

Je souhaite finalement masquer de l'affichage par défaut l'ensemble des enregistrements de la table `TODO` ayant `termine = 1`.

Je vous laisse modifier :

- Le code du modèle afin d'y ajouter une méthode.
- Appeler cette méthode depuis votre page à la place du `getAll()`.

::: details Un doute sur comment procéder ?

Vous devez réaliser une requête directement depuis votre modèle. Celle-ci devra retourner le résultat d'une requête SQL via un FetchAll de PDO.

```php
function getAllNonTermine(){
    $stmt = $this->getPdo()->prepare("SELECT * FROM todos WHERE termine = 0");
    $stmt->execute([]);
    return $stmt->fetchAll(\PDO::FETCH_OBJ);
}
```

:::

## Ajouter une page d'authentification

La partie TODOList ne doit pas être accessible à tous. En utilisant les techniques vues avec la SESSION (`$_SESSION`), ainsi qu'en réfléchissant aux impacts en termes de sécurité (protection dans le routeur par exemple), limitez l'accès de la partie TODOList aux seules personnes avec un compte sur la plateforme.

::: tip Quelques éléments pour vous aider

Pour réaliser une page d'authentification dans votre projet, vous allez devoir ajouter :

- Une page avec un formulaire pour vous connecter (votre vue).
- Une table en base (qui sera utilisée via un modèle).
- Un modèle et un contrôleur dédiés à cette action (`php mvc model:create AuthModel` et `php mvc controller:create AuthControler`).
- Modifier le routeur pour n'autoriser l'accès qu'aux utilisateurs **authentifiés**.

:::

- Quels impacts sont à prévoir dans le routeur ?
- Est-ce nécessaire de créer un nouveau modèle ?
- Est-ce nécessaire de créer un nouveau contrôleur ?
- Combien de vues seront nécessaires en plus de celles existantes ?

::: danger Attention

⚠️ Mot de passe et sécurité…

- Comment allez-vous enregistrer le mot de passe en base ? ([Un peu d'aide](https://www.php.net/manual/en/function.password-hash.php))
- Comment allez-vous vérifier l'authentification ? ([Un peu d'aide](https://www.php.net/manual/en/function.password-verify.php))

:::

## Évolution 1 : Qui a créé la TODO ?

Maintenant que nous avons un système d'authentification, je vous propose de sauvegarder qui a créé la TODO pour ce faire :

- Modifier la base de données afin d'ajouter « l'email / nom d'utilisateur » de la personne ayant créé la TODO (évidemment, il faudra utiliser une clé étrangère).
- Modifier la méthode d'ajout dans le modèle pour enregistrer l'information
  - Attention, comment allez-vous procéder pour récupérer la personne actuellement connectée ?
- Ajouter **dans la vue**, l'affichage de l'identité de la personne.
  - Idéalement en groupant les TODO par nom d'utilisateur / email.
  - Ou via l'ajout d'une image de profil (avatar / gravatar) à côté de la TODO.

## Évolution 2 : Envoi d'email

Vous avez mis en place un système de connexion, mais pour l'instant l'utilisateur ne reçoit aucun email. Il serait intéressant de lui envoyer un email après la création du compte afin de lui confirmer la bonne création de celui-ci. Il existe plein de façons d'envoyer des emails en PHP. Dans ce TP je vous propose d'utiliser PHPMailer.

PHPMailer est une librairie PHP permettant d'envoyer des emails. Celle-ci s'installe via Composer. Pour l'installer, il suffit de lancer la commande suivante (à la racine de votre projet) :

```sh
composer require phpmailer/phpmailer
```

::: danger Installation de composer

Pour que la commande précédente fonctionne, il faut que composer soit installé sur votre machine. Pour l'installer, je vous invite à suivre la documentation officielle [disponible ici](https://getcomposer.org/download/). Composer est un outil permettant de gérer les dépendances d'un projet PHP, il est très utilisé dans le monde PHP (notamment avec Laravel).

:::

Dans l'AP, vous avez dans le code source un utilitaire permettant la gestion de l'envoi d'email. Celui-ci est présent dans le dossier `utils`, pour cette évolution nous allons en avoir besoin :

```php
<?php

namespace utils;

use PHPMailer\PHPMailer\PHPMailer;

class EmailUtils
{
    static function sendEmail($to, $subject, $template, $data): bool
    {
        // Récupération des informations de configuration
        $config = include("configs.php");

        // Construction du message avec la librairie Template
        $message = Template::render("views/emails/$template.php", $data, false);

        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = $config["MAIL_SERVER"] ?: 'localhost';
        $mail->SMTPAuth = false;
        $mail->Port = 1025;

        $mail->setFrom($config["FROM_EMAIL"], "Contact");
        $mail->addAddress($to);
        $mail->Subject = $subject;
        $mail->Body = $message;
        $mail->isHTML(true);

        return $mail->send();
    }
}
```

Modifier maintenant le fichier `index.php` afin d'ajouter l'include des librairies :

```php
include("vendor/autoload.php"); // Pour les librairies externes. (PHPMailer, etc.)
```

::: tip Avant de continuer

Appelez-moi, nous allons discuter un peu de ce code, il y a plein de choses à dire dessus !

:::

Voici un exemple d'utilisation de cette classe :

```php
EmailUtils::sendEmail("you@test.com", "Mon sujet", "monTemplate", array("name" => "John Doe"));
```

- Quels sont les paramètres de la méthode ?
- À quoi correspond l'array de données ?
- À quoi correspond le paramètre `monTemplate`, où doit-il être dans votre projet ?
- Est-ce que le code proposé est suffisant pour envoyer un email ?

::: tip C'est à vous
Je vous laisse mettre en place l'envoi d'email dans votre projet. Celui-ci doit être fait **après la création du compte**.
:::

## Bonus, mot de passe oublié

Je vous laisse réfléchir à la mise en place d'un système de mot de passe oublié. Celui-ci doit permettre à l'utilisateur de réinitialiser son mot de passe en cas d'oubli.

::: tip Quelques éléments pour vous aider

- Il faudra certainement ajouter une nouvelle table en base de données.
- Il faudra certainement ajouter une nouvelle page dans votre projet.
- Il faudra certainement ajouter une nouvelle méthode dans votre contrôleur.
- Il faudra certainement ajouter une nouvelle méthode dans votre modèle.
- Il faudra certainement ajouter une nouvelle méthode dans votre routeur.
- Il faudra certainement ajouter un nouvel email dans votre projet.

:::

## Bonus, une page d'accueil personnalisée

Il serait intéressant d'arriver sur une page d'accueil personnalisée. Pour ce faire, je vous propose de :

- Créer dans votre contrôleur une méthode qui sera appelée par défaut.
- Modifier votre routeur afin de rediriger vers cette méthode par défaut (si non connecté).
- Créer votre page d'accueil personnalisée (elle doit contenir au minimum un titre, un bouton invitant à la création d'un compte, un bouton invitant à la connexion).
- Si l'utilisateur est déjà connecté, rediriger vers la TODOList.

Pour vous aider dans la conception de votre page d'accueil, vous pouvez utiliser un template « bootstrap » disponible [ici](https://bootstrapmade.com/bootstrap-landing-page-templates/).

👋 Bon courage !