---
description: Le meilleur moyen de comprendre la sécurisation d’une application / site Internet, c’est de
---

# TP Sécurité

Le meilleur moyen de comprendre la sécurisation d’une application / site Internet, c’est de …

- Passer des heures sur de la théorie ?
- Passer des heures sur du code à vous ?
- Passer des heures à tenter des intrusions ?
- La réponse D ?

## Partie 1 : Les injections SQL

Avant d'utiliser WebGoat, nous allons nous focaliser sur la partie Injection SQL, pour ça nous allons utiliser le site [Hack Splaining](https://www.hacksplaining.com/exercises/sql-injection).

Celui-ci contient un bon « tutoriel » interactif permettant de tester et de se former au principe d’injections SQL.

## Partie 2 : Les XSS

Voilà un exemple simple de XSS via un input non filtré.

<Sample src="xss" />

::: danger Quoi faire ?

Ici, l'idée, est de trouver comment éxécuter du code via un simple chargement d'image ! Pour ça il faut connaître un peu le HTML et le fonctionnement des balises classique.

Une balise img, vous conaissez… Elle prend en paramètre un attribut `src`… ok ! Mais elle a également un autre attribut … nommé … `onload` cette attribut permet d'éxécuter du code quand la ressource (l'image) est chargé. Nous allons donc exploiter un code « mal écrit » pour charger du code JavaScript.

Pour ça, dans le champs de saisie, je vous propose de mettre:

```
https://fakeimg.pl/300/" onload="alert('Coucou'); window.location='https://bit.ly/3Bpiela'"
```

Que-ce passe-t-il ? Pourquoi ? Regardons le code source ensemble !

:::

### 2.1 Exploiter la faille

En partant du code précédent, afficher dans la page un formulaire en exploitant la faille `onload` du code fourni.

### 2.1 La même chose mais par lien…

Vous l'avez peut-être remarqué, dans le code JavaScript il est également possible de spécifier une image. Par exemple il est possible d'écrire un lien :

- [https://cours.brosseau.ovh/demo/xss/index.html?uri=https://fakeimg.pl/600/](https://cours.brosseau.ovh/demo/xss/index.html?uri=https://fakeimg.pl/600/)

Ce lien est source **d'un très grand danger**, je vous propose de réfléchir à comment il serait possible d'exploiter « le paramètre uri » afin de lui donner de détourner le comportement du site.

- Trouver un moyer de réaliser la même attaque que le code précédent (point 2.0).
- Envoyer le lien à une autre personne.
- Lire des données sur son ordinateur (nous allons le faire ensemble).

C'est à vous (enfin à nous).

## Partie 2.1 : Les XSS

Pour mieux comprendre l'aspect dangereux d'une XSS nous allons utiliser Hack Splaining, pour ça rendez-vous sur [Hack Splaining](https://www.hacksplaining.com/exercises/xss-stored)

Celui-ci contient un bon « tutoriel » interactif permettant de tester et de se former au principe de XSS.

## Partie 3 : WebGoat

![Superbe Logo](./webgoat.png)

WebGoat est un outil didactique aux dimensions pédagogiques proposé par le groupe OWASP. Il s'agit d'une application WEB J2EE développée en Java et destinée à l'enseignement de manière interactive.

Elle vise à familiariser l'utilisateur aux technologies WEB (E.g: protocole HTTP, Encoding, AJAX), aux mécanismes du protocole HTTP et aux vulnérabilités qui peuvent en découler. Cet enseignement se fait au travers de différentes leçons, chacune abordant un concept particulier, détaillant un problème de sécurité donné avant de soumettre l'utilisateur à une mise en pratique immédiate. Chaque leçon (JSP) présente sur l'application comporte une vulnérabilité que l'utilisateur peut identifier et tenter d'exploiter (E.g: Injection SQL permettant de retrouver de fausses informations comme des numéros de cartes de crédit).

Voilà une liste des éléments que nous allons pouvoir « exploiter » dans WebGoat :

- Flux des contrôles d'accès et authentification
- Flux de gestion de session utilisateur
- Cross-Site Scripting (XSS)
- Injections
- Parameter and Data Tampering
- Buffer Overflows
- Configuration et stockage de données (non sécurisée)
- Sécurité AJAX

Nous n’allons bien évidemment pas tous les faire, l’idée est d’en faire quelques-uns et si vous le souhaitez vous pourrez approfondir le sujet.

![](./webgoat-dom-injection-700x407.png)

## Téléchargement

Deux versions existent :

- Le jar
- Un containeur Docker

Nous allons choisir le jar :

[Télécharger WebGoat](https://github.com/WebGoat/WebGoat/releases/download/7.1/webgoat-container-7.1-exec.jar)

## Lancement

```sh
java -jar webgoat-container-7.1-exec.jar
```

C’est parti, vous pouvez maintenant aller sur [http://localhost:8080/WebGoat](http://localhost:8080/WebGoat)

⚠️ Nous allons utiliser un outil intégrant des failles… Pour éviter tout risque pour votre machine, le mieux est de couper l’accès au réseau de votre ordinateur. ⚠️

## À faire

- AJAX Security
  - LAB: Client Side Filtering
  - LAB: DOM-Based cross-site scripting
  - Dangerous Use of Eval
- Concurrency
  - Thread Safety Problems
  - Shopping Cart Concurrency Flaw
- Injection Flaws
  - Command Injection (si vous souhaitez faire du MITM - Man In The Middle -)
  - Numeric SQL Injection
  - String SQL Injection
- Parameter Tampering
  - Exploit Hidden Fields
