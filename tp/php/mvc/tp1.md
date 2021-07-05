# Structure de développement MVC

Cette structure est réalisée à des fins pédagogiques. Elle est un intermédiaire permettant d'introduire les concepts du
framework Laravel sur des bases de développement PHP connu.

::: tip Attention
Si vous souhaitez réaliser un développement d'envergure, je vous déconseille vivement l'utilisation de ce code.
Préférez plutôt l'utilisation d'un framework tel que Laravel
:::

::: details Sommaire
[[toc]]
:::

## Introduction

Un des plus célèbres design patterns s’appelle MVC (Modèle - Vue - Contrôleur) ce pattern permet une bonne organisation du son code source. Pour l'instant vous codiez sans vraiment de structure, avec globalement, même si c'était rangé ; des pages Web qui mélangent traitement (PHP), accès aux données (SQL) et présentation (balises HTML). Même si c'est complètement fonctionnel, nous allons nous efforcer à partir de maintenant à séparer ces parties.

La structure MVC présentée dans cet exemple est classique. Elle intègre les concepts MVC classiques à savoir :

- Modèle (Accès à la base de données)
- Vue (Représentation pour le client)
- Contrôleur (Traitement des requêtes HTTP entrant)

Le projet proposé dépasse le simple MVC, il intègre en effet les bases pour un développement serein à savoir :

- Un router : Correspondance entre un chemin (route) et une fonctionnalité (méthode d'un contrôleur).
- Un ensemble d'interfaces et class permettant
  - la réalisation d'API.
  - l'Accès à la base de données.
  - La gestion de la SESSION.
- Une organisation structurée permettant la réalisation de projet de taille moyenne / grande.

::: tip Point important sur la structure.
Cette base de développement intègre une structure **qu'il faut respecter** pour
développer dans de bonnes conditions.
:::

## Structure

Comme indiqué en introduction, la structuration d'un développement est aussi importante que le développement en
lui-même. C'est pour ça qu'avant même de développer il est important de prendre en main la structure des dossiers et
fichiers proposés dans le code présenté en exemple.

La structure de base en terme de dossier ressemble à :

![Structure des dossiers](./res/structure_dossiers.png)

::: tip Compliqué ?
Pas d'inquiètude, pas de stress ! nous allons voir ensemble comment prendre en main le code.
:::

### Globalement

Le code présent utilise différents aspects du développement objet :

- Des objets permettant d'encapsuler / organiser la logique autour de représentation.
- De l'héritage afin d'organiser le code hiérarchiquement.
- Des interfaces permettant de définir un comportement.

Les éléments de `base` sont toujours dans un dossier nommé `base`. Vous retrouverez ce dossier pour les contrôleurs, les routes, les modèles.

### L'entry Point (`index.php`)

Le fichier `index.php` présent à la racine du projet est, ce que l'on appelle, un **entry point**. Ce point d'entrée en
français est le fichier qui va « prendre le trafic » de votre projet.

Concrètement qu'est-ce que ça veut dire ? Ça veut dire que ce fichier est grandement générique ; en effet, quel que soit
le projet celui-ci restera grandement inchangé. Il intègre les initialisations de base permettant à votre projet de
fonctionner correctement. Je vous invite par curiosité à regarder son contenu. Mais pas de modification à prévoir dans
ce fichier.

Une représentation possible peut-être la suivante :

![Structure & Entry Point](./res/organisation_structure.png)

### Le dossier `routes/`

Le dossier `routes/` contient l'ensemble du code relatif au Router. Le router est la brique centrale de cette structure
MVC, en effet votre utilisateur passera obligatoirement par celui-ci.

Le routeur est un élément simple qui permet de sécuriser votre code. Celui-ci est en réalité un simple « tableau »
contenant l'ensemble des fichiers / ressources accessible depuis le navigateur du client.

Cet élément repose sur le principe de la `WhiteList` (Liste blanche), nous avons donc de lister l'ensemble « paths
» (chemins) autorisé pour deux types de ressources :

- Web (`Web.php`) : Page Web classique, affichée dans un navigateur Web (Chrome, Firefox, etc.)
- Api (`Api.php`) : Échange entre un client et le serveur (Ajax, Application, etc.)

Nous avons un fichier `Router.php` qui comme l'entry-point est générique il initialise seulement le code (je vous laisse
le regarder par curiosité).

La logique de chargement d'une route est dans `routes/base/Route.php`, c'est dans ce fichier que ce cache la
fameuse `Whitelist` mais également la logique de chargement d'une page par rapport à une demande d'un utilisateur (
chargement en GET ou en POST).

#### `Web.php` et `Api.php`

Les deux fichiers ont une syntaxe identique, c'est normal, il s’agit de la réaliser déclaration des routes, celle-ci
prendra toujours la même forme :

```php
<?php
class Web
{
    function __construct()
    {
    $monControleur = new MonControleur();
    Route::Add('/', [$monControleur, 'laMethodeAAppeler']);
    Route::Add('/autreChemin', [$monControleur, 'lautreMethode']);

    // etc…
    // Vous pouvez avoir autant de routes que nécessaire
    }
}
```

Je pense qu'ici pas de problème! Vous comprenez l'idée, une nouvelle page ?

- Une nouvelle route
- Une nouvelle méthode dans le contrôleur…
- Et c'est tout !

### Le dossier `controllers/`

Le dossier `controllers/` contiendra l'ensemble des contrôleurs de votre projet. Pour l'instant il y en a trois (`GlobalWeb.php`, `VideoApi.php`, `VideoWeb.php`) ils ont chacun un but différent propre à mon exemple.

**Ça veut dire** que vous pouvez créer autant de contrôleurs que nécessaire, il s'agit ici d'un découpage logique des fonctionnalités que vous souhaitez mettre en place.

Le contrôleur est la class PHP qui va faire le lien entre la demande de l'utilisateur (Route) et la donnée (modèle), son rôle sera donc toujours un peu le même :

- Récupéré de la donnée (BDD, Session, Fichier, etc.).
- La mettre en forme si nécessaire.
- La retourner à l'utilisateur.

Si nous reprenons la base d'un contrôleur, celui-ci aura toujours au minimum la forme suivante :

```php
<?php
namespace controllers;

use controllers\base\Web;

class MonControleur extends Web
{
    // Méthode d'exemple
    function methodeDExemple()
    {
        $this->header();
        include("views/monControleur/methodeDExemple.php");
        $this->footer();
    }
}
```

Comme vous pouvez le constater ici pas énormément de code, en effet une partie de la complexité est encapsulée dans l'héritage (`extends Web`).

Un contrôleur est donc une classe, avec un ensemble de méthodes technique permettant de réaliser des opérations. Les 3 lignes :

```php
$this->header();
include("views/monControleur/methodeDExemple.php");
$this->footer();
```

Seront votre « traitement » / « votre page », nous avons :

- `$this->header();` : Le haut de votre page (avant votre contenu)
- `include("views/monControleur/methodeDExemple.php");` : Votre contenu HTML (**et uniquement votre contenu**)
- `$this->footer();` : Le base de votre page (après le contenu)

Nous pouvons le représenter de cette façon-ci :

![Structure](./res/organisation.png)

#### L'héritage

Les contrôleurs **doivent hériter** de l'une des deux interfaces `Web` ou `Api`. Ces deux classes définissent un comportement standardisé entre les différents contrôleurs que vous allez écrire.

Les différentes relations peuvent être représentées avec l'UML suivant :

![UML Relation](./res/uml_composition.png)

Les méthodes `header()` et `footer()` ce charge de réaliser les imports nécéssaire (ou le code nécéssaire dans le cas de l'API) pour que vous pages s'affichent tels que vous le désirez.

::: tip Be curious !
Ne prenez pas automatiquement pour acquis ce que je vous écris. Allez voir le code source du projet afin de constater par vous-même ce que je viens de dire / écrire.
:::

### Le dossier `views/`

Le dossier `views/` va contenir l'ensemble des fichiers « d'interface » de votre application. Ces fichiers sont en réalités massivement des fichiers HTML classiques.

Détail important, nous allons ici privilégier le découpage et la réutilisation. Il est donc important de constater que nous avons un dossier `views/common/` celui-ci contient l'ensemble des éléments commun à toutes vos pages comme vues précédemment. (haut de page et pied de page).

Vos différentes pages **ne contiendront donc** que le contenu réel de la page exemple :

```html
<h1>Ceci est un titre</h1>
<p>Et voici le contenu</p>
```

::: tip Pourquoi est-ce important ?
Au-delà de tout ce que nous voyons ensemble, mon but est de vous rendre autonome pour que vous puissiez réaliser vos propres projets. Et quand il s'agit de projet, le plus important à retenir c'est l'organisation, mais également éviter toutes répétitions.

L'une dès principales sources de répétition dans un site Web c'est le code présent dans le header et dans le footer de votre site. C'est pourquoi je vous propose de ne pas le mettre dans chaque page.

<center><iframe src="https://giphy.com/embed/eBpiVHAzU8XXtvPCae" width="480" height="353" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></center>
:::

### Le dossier `models/`

### Le dossier `public/`

### Le dossier `utils/`

## Ajouter une page dans un contrôleur existant

## Ajouter un modèle

## Ajouter un nouveau contrôleur
