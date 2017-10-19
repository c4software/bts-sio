# Sécurité des développements

<!-- TOC -->

- [Sécurité des développements](#sécurité-des-développements)
    - [Partie 1 : WebGoat](#partie-1--webgoat)
    - [Téléchargement](#téléchargement)
    - [Lancement](#lancement)
    - [À faire](#à-faire)
- [Partie 2 : Les injections SQL](#partie-2--les-injections-sql)

<!-- /TOC -->

Le meilleur moyen de comprendre la sécurisation d’une application / site Internet, c’est de …

* Passer des heures sur de la théorie ?
* Passer des heures sur du code à vous ?
* Passer des heures à tenter des intrusions ?
* La réponse D ?

## Partie 1 : WebGoat

![Superbe Logo](./webgoat.png)

WebGoat est un outils didactique aux dimensions pédagogiques proposé par le groupe OWASP. Il s'agît d'une application WEB J2EE développée en Java et destinée à l'enseignement de manière interractive.

Elle vise à familiariser l'utilisateur aux technologies WEB (E.g: protocole HTTP, Encoding, AJAX), aux mécanismes du protocole HTTP et aux vulnérabilités qui peuvent en découler. Cet enseignement se fait au travers de différentes leçons, chacune abordant un concept particulier, détaillant un problème de sécurité donné avant de soumettre l'utilisateur à une mise en pratique immédiate. Chaque leçon (JSP) présente sur l'application comporte une vulnérabilité que l'utilisateur peut identifier et tenter d'exploiter (E.g: Injection SQL permettant de retrouver de fausses informations comme des numéros de cartes de crédit).

Voilà une liste des éléments que nous allons pouvoir « exploiter » dans WebGoat :

* Flux des contrôle d'accès et authentification
* Flux de gestion de session utilisateur
* Cross-Site Scripting (XSS)
* Injections
* Parameter and Data Tampering
* Buffer Overflows
* Configuration et stockage de données (non-sécurisée)
* Sécurité AJAX

Nous allons bien évidement pas tous les faire, l’idée est d’en faire quelques-un et si vous le souhaitez vous pourrez approfondir le sujet.

![](./webgoat-dom-injection-700x407.png)

## Téléchargement

Deux versions existe :

* Le jar
* Un containeur Docker

Nous allons choisir le jar :

[Télécharger WebGoat](https://github.com/WebGoat/WebGoat/releases/download/7.1/webgoat-container-7.1-exec.jar)

## Lancement

```
java -jar webgoat-container-7.1-exec.jar
```

C’est parti, vous pouvez maintenant aller sur [http://localhost:8080/WebGoat](http://localhost:8080/WebGoat)

⚠️ Nous allons utiliser un outil intégrant des failles… Pour éviter tout risque pour votre machine le mieux est de couper l’accès au réseau de votre ordinateur. ⚠️

## À faire

- AJAX Security
  - LAB: Client Side Filtering
  - LAB: DOM-Based cross-site scripting
  - Dangerous Use of Eval
- Concurrency
  - Thread Safety Problems
  - Shopping Cart Concurrency Flaw
- Injection Flaws
  - Command Injection (Si vous souhaitez faire du MITM - Man In The Middle -)
  - Numeric SQL Injection
  - String SQL Injection
- Parameter Tampering
  - Exploit Hidden Fields

# Partie 2 : Les injections SQL

Maintenant que nous avons joué un peu avec l’application WebGoat, nous allons nous focaliser sur la partie Injection SQL, pour ça nous allons utiliser le site [Code Bashing](https://www.codebashing.com/sql_demo). Celui-ci contient un bon « tutoriel » interactif permettant de tester et de se former au principe d’injections SQL.
