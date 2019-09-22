# (Ré)organiser mon code

## Introduction

Dans ce TP nous allons voir comment « ré-organiser » du code pour le rendre plus facilement maintenable.

⚠️ Le code fourni est clairement de mauvaise qualitée. Il ne dois pas être pris comme référence. ⚠️

## Code

Le code est [disponible ici](./shitty-app.zip). Les premières étapes sont :

- Installer Wamp (si pas déjà fait).
- Télécharger et « installer » le sources dans votre WAMP.
- Prendre en main l'application (naviguer dans les écrans).
- Regarder le code source.

L'application dois ressembler à :

![preview](./img/capture.png)

## Première analyse du code

Maintenant que vous avez pris en main le code source, quels sont les remarques sur le code pouvez-vous émettre :

```text
Vos remarques


```

PS: Cette première analyse est importante !

{% reveal text='Cliquer pour voir ma « solution »' %}

```text
- Non utilisation de template.
- Le code des liste est répeté (sans utilisation de fonction).
- Le Header et le Footer HTML est dupliqué entre les deux pages.
- Le « Widget » HTML des liste est répété 3x
- L'accès à la données n'est pas centralisé (les fichiers JSON sont ouvert directement depuis la page).
- Il n'y a pas de DAO.
- Il n'y a aucun modèle de données.
- Pas de configuration centralisée.
```

{% endreveal %}

## Détail des fonctionnalités

Avant de commencer à modifier le code il faut « lister » / « détailler » les différentes fonctionnalité de l'application. Pour moi voilà les points clefs

- Deux pages (une complète, l'autre de détail).
- Utilisation de bootstrap.
- Les données sont stockés dans des fichiers JSON.
- L'interface est responsive.
- Il est possible d'ajouter des éléments via l'interface web.

## Début des modifications

Comme vous l'avez constaté l'application comporte de nombreux défaut (plus ou moins important). Nous allons les prendres dans l'ordre :

- Le découpage (pour éviter la duplication du code HTML).
- Réécrire la page d'accueil pour ne plus avoir 3x le même code à la suite.
- Créer un modèle qui représente un « lien ».
- Créer un DAO pour l'accès à la données (Lecture, Ajout).
- Créer un fichier PHP « avec les paramètres / constantes » de l'application.

## Le découpage du code HTML

### Header & Footer

La première étape est de découper le HTML pour éviter la duplication de code HTML.

- Sortir le Header dans une fonction avec paramètre pour le titre.
- Sortir le Footer dans une fonction.

Pour l'organisation je vous propose d'écrire un fichier PHP `index.php`. Bien évidement, nous n'allons pas le mettre à la racine. Mais dans un dossier nommée (par exemple) `fonctions`.

C'est à vous :

- Créer le dossier.
- Créer un fichier `index.php` à l'interieur de celui-ci.

La structure de vos sources dois ressembler à quelques chose comme :

```shell
├── data
│   ├── reddit.json
│   ├── search.json
│   └── twitter.json
├── detail.php
├── fonctions
│   └── index.php
├── index.php
└── public
    └── main.css
```

Pour vous aidez dans votre missions voilà la structure du fichier :

```php
<?php

function header($titre) {
    echo "…";
}

function footer($titre) {
    echo "…";
}
```

C'est à vous, dans la page `index.php` actuelle isoler le code relatif au `header` et au `footer` et mettez le dans les bonnes fonctions.

Utilisez maintenant les fonctions dans votre code.

> Rappel: En PHP vous devez `include` les fichiers pour rendre le code accessible dans la page. Exemple :

```php
<?php 
    include("fonctions/index.php);

    header();
```

### Testez

Valider le bon fonctionnement de votre modification avant d'allez plus loin.

### Reflechissons ensemble

C'est bien, mais ! Est-il possible de faire autrement ? Pouvons nous utilisez un objet plutôt que deux fonctions ?

- Est-ce intéressant ?
- Quel est l'avantage ?

### Réécriture des listes de lien

Comme vous l'avez constaté, les liste de lien (ainsi que le code PHP) est répété 3x. Procéder ainsi est à la fois inéficace et inutile. Prendre du temps pour éviter ce genre de choses est primordiale et vous évitera bien des tracas en cas de mise à jour de votre code (ou de celui d'un collègue).

Pour rappel les listes de liens ressemble à :

![lien](./img/liste_lien.png)

Regardons ensemble le code source de cet élément :

```html
<div class="card mb-4 shadow-sm">
    <div class="card-header">
    <a class="nolink" href="detail.php?c=search"><h4 class="my-0 font-weight-normal">Recherche <i class="material-icons">edit</i></h4></a>
    </div>
    <div class="card-body">
    <ul class="list-unstyled mt-3 mb-4">
        <?php
        $data = json_decode(file_get_contents("./data/search.json"));
        foreach($data as $d){
            echo "<li><a rel='nofollow' target='_blank' href='" . $d->lien . "'>" . $d->name . "</a></li>";
        }
        ?>
    </ul>
    </div>
</div>
```

- Quels éléments sont variables ?
- Comment reformater le code pour le transformer en fonction ?

### Place au code

Je suis sympa je vous aide, dans `fonctions/index.php` ajouter une fonction nommée `genereListe`.

```php
function genereListe($title, $file){
    // Votre code ici.
}
```

Remplacer le code dupliqué, par l'appel à votre fonction.

### Testez

Valider le bon fonctionnement de votre modification avant d'allez plus loin.

### Page detail.php

Utilisez vos nouvelles fonctions dans la page `detail.php`. Cette fois-ci pas d'aide.

## L'organisation du code PHP

Comme vous devez le constater, nous n'avons pas retirer le code dupliqué… nous l'avons simplifié, mais pas supprimé.

À votre avis comment procéder ?

{% reveal text='Cliquer pour voir ma « solution »' %}
```php
$elements = [
    ["file" => "search", "title" => "Rechercher"],
    ["file" => "reddit", "title" => "Reddit"],
    ["file" => "twitter", "title" => "Twitter"],
];

foreach($elements as $el){
    genereListe($el['title'], $el['file']);
}
```

- Quel est l'avantage de ma solution ?
- Est-ce meilleur que la votre ?

{% endreveal %}

## Le modèle de la données

Lors de l'analyse du code, vous avez remarqué qu'il était possible d'ajouter des liens dans les fichiers JSON. 

L'ajout est fait « à l'arrache », oui ça fonctionne… Mais c'est clairement pas optimale.

Nous allons donc commencer par créer un modèle, le modèle va permettre de « normaliser » notre dévolppement et va simplifier la réutilisation du code.

Par formalisme nous allons appeler notre dossier `modeles` avec dedans un fichier `lien.php`.

C'est à vous créé le dossier et le fichier.

Votre aborescence dois maintenant ressembler à :

```shell
├── data
│   ├── reddit.json
│   ├── search.json
│   └── twitter.json
├── detail.php
├── fonctions
│   └── index.php
├── index.php
├── modeles
│   └── lien.php
└── public
    └── main.cs
```

### La class PhP

Pour vous aidez, voilà la classe Lien :

```php
<?php
class Lien {
    public $lien = "";
    public $name = "";

    function __construct($lien, $name)
    {
        $this->lien = $lien;
        $this->name = $name;
    }
}
```

### Utiliser la class

Maintenant que nous avons défini la classe utilisons la !

Dans le fichier `detail.php` modifier :

- Trouver l'endroit où ce trouve l'ajout (`array_push`…)
- Remplacer le Tableau par l'utilisation de l'objet.

### Testez

Valider que le site fonctionne toujours.

### Faire évoluer la class

Le gros plus d'avoir un modèle, c'est la possibilité d'ajouter des méthodes. Je vous propose d'ajouter une méthode permettant de valider que le lien est bien un lien.

Créer une méthode avec le code suivant :

```php
$url = filter_var($this->link, FILTER_SANITIZE_URL);
return filter_var($url, FILTER_VALIDATE_URL) !== false;
```

⏩ Utiliser la méthode dans votre code pour n'ajouter le lien que si celui-ci est valide.

### Testez

Valider que le site fonctionne toujours.

## Le DAO

Le DAO, est également un élément important. Cette classe vas nous centraliser le code pour tout ce qui est l'accès à la données (ajout, suppression, liste).

Comme vu en cours, l'une des possibilités pour un DAO est de créer une classe avec des méthodes `static` (c'est à dire accessible sans créer l'objet). C'est cette solution que je vous propose de faire.

Dans le code nous avons 2 actions possible :

- Avoir le contenu (liste).
- Ajouter du contenu.

### L'organisation

La première étape est de créer les dossiers, par convention nous allons « ranger » notre `DAO` dans un dossier nommée dao et dans un fichier qui regroupe les actions similaires (ou qui font références à la même chose). Dans notre cas :

- Créer un dossier nommée `dao`
- Créer un fichier dedans nommée `liens.php`

Votre arborescence dois maintenant ressembler à :

```shell
├── dao
│   └── liens.php
├── data
│   ├── reddit.json
│   ├── search.json
│   └── twitter.json
├── detail.php
├── fonctions
│   └── index.php
├── index.php
├── modeles
│   └── lien.php
└── public
    └── main.css
```

### Base du code PHP

Pour vous aidez voilà la base du code :

```php
<?php
class LienDao {
    static function get($fichier){
        // Votre code ici
        // return [];
    }
    static function put($fichier, $lien, $name){
        // Votre code ici
        // return ???;
    }
}
```

- Complèter les méthodes avec le code précédement réalisé, en ne gardant bien évidement que le code PHP…
- Utiliser le DAO dans votre code PHP (index.php et detail.php)

⚠️ Rappel les méthode static en PHP sont appelés comme ça `LienDao::get("")`.

### Testez

Valider que le site fonctionne toujours.

## Les paramètres

Nous avons maintenant mis en place la structure. Mais comme vous pouvez le constater nous avons encore à un certains nombre d'endroit « des éléments en dur ».

Par exemple le tableau « $elements », celui contient des valeurs static « twitter », « search », etc…. Si vous souhaitez ajouter une nouvelle catégorie vous allez devoir ajouter un éléments dans le tableau (et surtout vous souvenir à quel endroit celui-ci est défini).

De la même façon, le chemin vers les « data » est également écrit en dur dans votre DAO.

Également le nom de votre site est également écrit en dur.

Les 3 points que j'ai évoqué ne gène évidement en rien le bon fonctionnement de votre site web. Cependant ça rend votre code très « opaque » au changement. Une bonne habitude est donc de sortir dans « un fichier de paramètre » ce qui vous semble pouvoir varier / changer un jour.

### Modification du code

Nous allons donc créer un dossier « parametre » et un fichier « parametres.php »

- Créer un dossier `parametre`.
- Créer un fichier `parametres.php`.

Votre structure dois maintenant ressembler à quelques choses comme :

```bash
├── dao
│   └── liens.php
├── data
│   ├── reddit.json
│   ├── search.json
│   └── twitter.json
├── detail.php
├── fonctions
│   └── index.php
├── index.php
├── modeles
│   └── lien.php
├── parametre
│   └── parametres.php
└── public
    └── main.css
```

### Le fichier parametres.php

Le fichier `parametres.php` vas contenir l'ensemble des élément susceptible de changer dans « la vie » de votre application.

C'est ce que l'on va appeler des constantes.

Voici un exemple de contenu :

```php
<?php

$_SITE_TITLE = "Shitty Application";
$_ELEMENTS = [
    ["file" => "search", "title" => "Rechercher"],
    ["file" => "reddit", "title" => "Reddit"],
    ["file" => "twitter", "title" => "Twitter"],
];
$_DATA_PATH = "../data/";

```

Placer ce contenu dans le fichier `parametres.php`.

### Utiliser les « constantes »

Modifier vos différentes page PHP pour utiliser les constantes nouvellement définis.

## En plus : Ne pas autoriser plusieurs lien identique

Pour l'instant il est possible d'inserer plusieurs fois le même lien dans la base de données.

- Modifier la méthodes `put` du DAO pour qu'elle n'autorise plus ce genre de choses.

## En plus : Migration vers MySQL

Nosu allons profitier de la mise en place d'un DAO pour migrer notre code ! Les JSON c'est pratique pour tester mais pas forcément pérenne dans le temps.

- Concevez une petite base de données simple.
- Modifier votre DAO pour utiliser votre base de données.
- N'oubliez pas de mettres dans le fichier `parametres.php` la configuration de votre connexion. (️⚠️ Surtout ne l'écriviez pas dans le DAO ⚠️)

⚠️ Vous avez vu l'avantage ! Nous avonse modifier **un seul fichier** et l'ensemble de votre code utilise maintenant MySQL comme système de base de données.
