---
description: Vous avez écrit du code oui… Mais il n'était pas forcément « bien organisé ». Je vous propose dans ce TP une façon d'organiser votre code qui vous permettra de vous organiser, quelles que soient les évolutions de votre projet.
---

# Structurer mon code

Vous avez écrit du code oui… Mais il n'était pas forcément « bien organisé ». Je vous propose dans ce TP une façon d'organiser votre code qui vous permettra de vous organiser, quelles que soient les évolutions de votre projet.

## Introduction

Comme [je l'indiquai dans le cours,](./support.md#la-structure) la structuration du code est un point **très important** voir même je pense central dans votre futur métier de développeur informatique. C'est pour ça qui me semble important de créer un TP dédié à cette problématique.

::: tip
La structure que je vais vous proposer dans ce TP n'est évidemment pas la réponse universelle. Elle répond à une problématique à un moment donné, il faut l'utiliser et la prendre avec du recule.
:::

Pour réaliser ce TP, nous allons modifier votre projet [« Bart » (celui avec plusieurs pages)](./tp2.md)

## La structure

Cette structure repose sur un point d'entrée unique pour l'ensemble des demandes pages. Dans ce point d'entrée, nous gèrerons les éléments communs à toutes les pages :

- La session / cookie.
- Le login utilisateur.
- Connexion à la base de données
- Le routeur.
- Et bien plus encore.

Quelles différences avec avant ? Nous allons « juste » découper un peu plus votre travail. Et nous allons ajouter « un nouveau fichier », que l'on appellera à partir de maintenant le point d'entrée (entry point).

| ![Entry Point](./res/organisation_structure.png) |
| :----------------------------------------------: |
|    Représentation visuelle de l'organisation     |

## Créer les dossiers et les fichiers

Je vous laisse créer l'ensemble des dossiers et des fichiers en suivant l'organisation suivante :

![Organisation d'un point de vue dossier](./res/organisation_structure_dossier.png)

::: tip c'est « juste la base »
Dans votre projet vous avez plus de fichiers, notamment des images, ces fichiers sont à destination du navigateur. Ils sont donc à placer **dans le dossier public**.  
:::

## Le point d'entrée

```php
<?php
// Démarrage de la session
session_start();

// Affichage « de la partie haute » de votre site, commun à l'ensemble de votre site
include('common/header.php');

// Pages autorisées (configuration à sortir dans un autre fichier PHP)
$whitelist = array('home','bart');

// Gestion de l'affichage de la page demandée
if(isset($_GET['page']) && in_array($_GET['page'], $whitelist)) {
  include("pages/" . $_GET['page'] . '.php');
} else {
  include('pages/home.php');
}

// Affichage de la partie basse de votre site, commun à l'ensemble de votre site.
include('common/footer.php');

?>
```

Voilà, nous avons le code de notre « entry-point ». Un peu de détail :

- Le dossier `common` contiendra les éléments communs à l'ensemble de nos pages. (header, footer, fonctions, etc).
- Les pages sont maintenant rangées dans le dossier `pages`.
- La page incluse n'est pas libre ! Afin de sécuriser le code nous limitons l'include uniquement aux pages autorisées.
  - Si aucune page n'est fournie ou si celle-ci n'est pas autorisée, nous chargeons la page `home.php`
  - Les liens entre vous pages seront différents. Ils seront sous la forme : `index.php?page=bart`, `index.php?page=page1`…

## Le Header et le Footer

Contrairement à précédemment nous allons mettre un peu plus de code dans les fichiers `header.php` et `footer.php`. Ils vont maintenant contenir tout le code jusqu'au contenu. Si on découpe grossièrement la page, ça donnera quelque chose comme ça :

![Layout du dossier](./res/structure_layout.jpg)

Je ne connais pas **votre code**, mais avec le mien ça donne :

_header.php_ :

```php
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Le générateur de punition</title>
    <link rel="stylesheet" href="./public/main.css">
</head>

<body>
    <header>
        <a href="./">Le generateur de punitions</a>
    </header>
```

::: details La partie CSS

Télécharger la police d'écriture [ici](https://www.dafont.com/simpsonfont.font) et la placer dans le dossier `public`.

```css
@font-face {
  font-family: simpsonfont;
  src: url(./simpsonfont.otf);
}

body {
  padding: 0;
  margin: 0;
  background-color: #fafafa;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

header {
  padding: 0 10px;
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12);
  height: 50px;
  background-color: #e53935 !important;
  border-color: #e53935 !important;
  color: white;
  font-family: "simpsonfont";
}

header > a {
  color: white;
  text-decoration: none;
}

.card {
  margin: 50px auto;
  padding: 20px;
  max-width: 500px;
  background: white;
  transition-property: box-shadow, opacity;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.btn {
  display: block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn-danger {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}

.form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: inline-block;
  margin-bottom: 0.5rem;
}

.ma-auto {
  margin: auto;
}

button,
input,
optgroup,
select,
textarea {
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

*,
::after,
::before {
  box-sizing: border-box;
}

.tableau {
  background-color: #1e5518;
  color: white;
  border: 5px solid #5e3600;
  padding: 10px;
  padding-right: 180px;
  width: 900px;
  max-width: calc(100vw - 50px);
  margin: 50px auto;
  height: 400px;
  overflow: auto;
  background-image: url(./img/bart.png);
  background-size: 170px;
  background-repeat: no-repeat;
  background-position: bottom right;
  font-family: cursive;
  font-size: x-large;
}
```

:::

_footer.php_ :

```php
<footer> Pied de page du site </footer>
</body>

</html>
```

## Les pages

Pour les pages, je vous laisse faire, c'est « juste le contenu de votre site ». Par exemple dans mon cas le code du fichier `home.php` est uniquement la partie form:

```php
<div class="card">
    <form action="index.php?page=bart" method="post">
        <div class="form-group">
            <label for="count">Nombre de ligne :</label>
            <select name="count" class="form-control">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="1000">1000</option>
            </select>
        </div>

        <div class="form-group">
            <label for="sentence">Phrase à écrire : </label>
            <input type="text" class="form-control" name="sentence" value="Je ne copie pas le code de valentin">
        </div>

        <input type="submit" value="Générer la punition" class="btn btn-danger ma-auto">
    </form>
</div>
```

::: danger Attention au lien
Comme évoqué dans le cours, le format des liens va changer ! Ils seront maintenant dynamiques via un paramètre `GET`. Pensez donc bien à changer vos différents liens.
:::

## Écrire la page Bart

Je vous laisse écrire la page `bart.php` en vous inspirant de votre code précédent. Cette page doit afficher le résultat de la génération de la punition.

- Affichage de la phrase * nombre de ligne.

L'affichage doit être :

![Étape 2](./res/bart_form_step2.png)

## C'est à vous

Je vous laisse modifier votre code pour que votre projet utilise cette nouvelle façon « de s'organiser ».

::: tip Une remarque au passage
Cette façon de s'organiser est une première étape vers ce que nous appellerons pour l'instant une organisation en template. Les templates seront une manière de s'organiser qui nous évitera tout mélange PHP et HTML afin de se simplifier encore plus l'esprit.
:::

## Allons plus loin.

Maintenant que nous avons notre nouvelle structure en place, je vous laisse ajouter une nouvelle page « à propos » dans votre site :

- Créer la page.
- Y mettre un contenu.
- Ajouter un lien dans le pied de page.
- Faire en sorte de pouvoir accéder à la page.

## Réécrire les URL

Nous avons vu que les liens ne sont pas très beaux. Avec Apache, il est possible de réécrire les liens pour rendre transparente l'opération.

Pour ça, il faut créer un fichier `.htaccess` avec comme contenu:

```htaccess
RewriteEngine On
RewriteCond %{REQUEST_URI} !index.php
RewriteRule (.*).html index.php?page=$1 [L,QSA]
```

Nous pouvons donc maintenant écrire :

- home.html (`index.php?page=home`)
- bart.html (`index.php?page=bart`)
- about.html (`index.php?page=about`)

::: tip Comment ça fonctionne ?

Nous avons donc une règle qui indique :

`(.*).html` => `index.php?page=$1 [L,QSA]`

Le `(.*).html` veut dire n'importe quel texte saisi avant le `.html` sera transformé en `index.php?page=$1`. `$1` étant « le n'importe quoi saisi avant le `.html`.
:::

## Toujours plus loin

Nous avons ici travaillé sur un format « minimaliste », une structure seulement des dossiers et une organisation saine des imbrications du code. Sachez qu'il est possible d'aller bien plus loin en mettant en place un design pattern connu et reconnu comme un standard en termes de développement.

Ce n'est pas l'idée tout de suite, mais sachez que [celui-ci est détaillé ici](/tp/php/mvc/tp1.html)
