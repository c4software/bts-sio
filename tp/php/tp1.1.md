---
description: Le meilleur moyen de comprendre les boucles. C'est d'en écrire par soi-même. Je vous propose de créer votre propre générateur de Bart.
---

# Le générateur de Bart

Le meilleur moyen de comprendre les boucles. C'est d'en écrire par soi-même. Je vous propose de créer votre propre générateur de Bart.

::: details Sommaire
[[toc]]
:::

## Les slides

Avant de commencer, un tour rapide des compétences du jour : les boucles `while` et `for`, et le paramètre `$_GET`.

<ClientOnly>
<SlidesDeck src="php_tp1_1" />
</ClientOnly>

## Prérequis

- Le [TP 1 : Créer ma première page PHP](./tp1.md) terminé (balises PHP, `echo`).
- Le HTML et la CSS (vous aurez une page et une feuille de style à écrire).
- WAMP / XAMPP démarré.

## Objectifs

À la fin de ce TP vous saurez :

- analyser une maquette pour en déduire la structure HTML, CSS et PHP d'une page ;
- répéter un affichage avec une boucle `while` ou `for` ;
- utiliser des variables pour paramétrer cet affichage ;
- lire un paramètre passé dans l'URL avec `$_GET` ;
- prévoir une valeur par défaut avec `isset` quand le paramètre est absent.

## Introduction

Nous allons mettre en application les boucles en PHP. Bon je ne vais pas vous demander de recopier 100× une phrase au tableau… Mais je vais demander à votre ordinateur de le faire avec une boucle `while` ou `for`.

Dans ce TP nous allons utiliser les boucles, mais surtout nous allons regarder comment le faire « pas trop salement »

## La structure

Avant d'attaquer le code, regardons un peu ce que je vous demande. Je vous propose de reproduire le résultat suivant :

![Générateur de Bart](./res/bart-generator.png)

### Définir les éléments nécessaires

Malheureusement vous n'avez pas au code. Mais seulement à une maquette du rendu final. Il faut donc interpréter, regarder, obtenir les éléments nécessaires à la réalisation de la page. Si on regarde il y a :

- Une image de Bart sur fond transparent (à chercher sur Internet)
- Un fond vert avec une bordure de quelques pixels marron.
- L'image de bart semble être un `background-image` placé en CSS.
- Le texte est assez gros avec une police personnalisée.
- Le tableau semble être d'une largeur fixe centré dans la page (`margin: auto`).

### Définir la structure HTML et CSS

Maintenant que nous avons défini les éléments nécessaires il faut déterminer la structure de la partie HTML + CSS, à première vue je dirais :

- Une page HTML non-responsive.
- Une feuille de style.
- Le « tableau de bart » sera très certainement une `<div>` avec dedans une boucle `while` ou `for` écrite en PHP.

### Définir les éléments du code PHP

Notre code PHP sera certainement très simple. Je vois à première vue :

- Une variable `$nb_ligne` qui sera le nombre total de lignes à afficher.
- Une variable `$phrase` qui est la phrase à afficher dans le « tableau ».
- Une boucle `while` ou `for`.

## Réalisation

Voilà… Nous avons vu les éléments nécessaires… C'est à vous. Je vous laisse réaliser la page en question

Avancez par étapes. Commencez par la partie HTML + CSS avec **une seule phrase** écrite en dur dans la `<div>`, sans PHP. Voici ce que vous devez obtenir avant d'écrire la boucle :

![Le tableau vert bordé de marron avec Bart à droite et une seule phrase « Je ne recopierai pas l'exemple de Valentin » écrite en haut à gauche](./res/tp1.1_structure.png)

Ensuite, la boucle remplace la phrase écrite en dur. Voici ce qui se passe à chaque tour, avec par exemple `$nb_ligne = 5` :

![Une boucle for avec $nb_ligne à 5 : $i vaut 0, 1, 2, 3 puis 4, chaque tour écrit une ligne dans le tableau ; quand $i vaut 5 la condition 5 inférieur à 5 est fausse et la boucle s'arrête](./res/tp1.1_boucle.svg)

::: tip Point de contrôle
Avec `$nb_ligne` à 100, le tableau se remplit et une barre de défilement apparaît : Bart, lui, ne bouge pas.

![Le tableau rempli de lignes « Je ne recopierai pas l'exemple de Valentin », qui continuent au-delà du bas du tableau](./res/tp1.1_cent_lignes.png)
:::

::: tip N'oubliez pas
Votre IDE vous aide. N'oubliez pas de le configurer pour automatiser certaines de vos actions.
:::

## Évolution

Passer en paramètre `GET` le nombre de ligne à écrire dans la page :

_Exemple :_

Pour la page avec un lien comme : `http://localhost/bart/index.php?nb=1000`

```php
$nb_ligne = $_GET['nb'];
```

::: danger Attention
Ne pas oublier de gérer le cas si pas de paramètre (avec un IF).

```php
$nb_ligne = 100;
if(isset($_GET['nb'])){
    $nb_ligne = $_GET['nb'];
}
```

:::

Pour résumer, voici ce que contient `$_GET` selon l'adresse demandée, et la valeur que prend `$nb_ligne` :

![Avec index.php?nb=5, $_GET contient la clé nb, isset est vrai et $nb_ligne vaut 5 ; avec index.php seul, $_GET est vide, isset est faux et $nb_ligne garde la valeur par défaut 100](./res/tp1.1_parametre_get.svg)

::: tip Point de contrôle
Avec l'adresse `index.php?nb=5`, le tableau ne contient plus que 5 lignes :

![Le tableau de Bart avec seulement 5 lignes « Je ne recopierai pas l'exemple de Valentin »](./res/tp1.1_parametre_nb.png)
:::

## La suite

Nous reviendrons sur cette base de TP plus tard pour y ajouter :

- Une fonction.
- Des includes.

## Conclusion

Dans ce TP, vous avez :

- analysé une maquette avant d'écrire la moindre ligne de code ;
- construit la page en HTML et CSS, avec une seule phrase écrite en dur ;
- remplacé cette phrase par une boucle qui écrit `$nb_ligne` lignes ;
- rendu le nombre de lignes paramétrable avec `$_GET`, sans oublier le cas où le paramètre est absent.

La suite ? [TP 1.2 : Utiliser des includes et une librairie](./tp1.2.md).

👋 Si vous avez des questions, n'hésitez pas.
