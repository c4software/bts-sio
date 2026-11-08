---
aside: false
description: "Le point d'entrée pour les débutants : comment fonctionnent les supports, préparer son poste, puis les parcours (web, mobile, serveurs) et l'ordre dans lequel les suivre."
---

# Débuter : par où commencer ?

Bienvenue ! Vous arrivez sur le site et vous ne savez pas par où commencer ? Pas de panique, cette page est faite pour vous.

Le site contient beaucoup de supports (des cours, des TP, des aide-mémoire, des quiz, etc.). Pris un par un, ils peuvent donner l'impression d'un grand désordre. En réalité, ils sont organisés en **parcours** : des pages qui listent les TP **dans l'ordre** dans lequel je vous conseille de les faire. Votre travail consiste donc surtout à choisir le bon parcours, puis à le suivre.

::: tip Comment lire cette page
Prenez cinq minutes pour lire les deux premières sections : elles expliquent comment sont construits les supports et comment préparer votre poste. Ensuite, choisissez votre parcours dans la section « Les parcours ».
:::

## Comment fonctionnent les supports

Quel que soit le parcours, vous retrouverez toujours les mêmes types de supports :

| Support | À quoi ça sert | Quand l'utiliser |
|---|---|---|
| **Les slides** (dans `cours/`) | Présenter la théorie en quelques minutes | Avant de commencer un TP |
| **Les TP** | Pratiquer, étape par étape | En séance, puis à la maison |
| **Les compléments de cours** | Détailler une notion, avec des exemples | Pendant le TP, quand vous bloquez |
| **[Les aide-mémoire](/pages/categories/aide-memoires.md)** | Retrouver rapidement une syntaxe, une commande | À garder ouverts dans un onglet |
| **[Les quiz](/moodle/)** | Vérifier que les notions sont acquises | En fin de séquence, avant une évaluation |
| **Les points étapes** | Évaluer ce que vous savez faire, sur un mini projet | Environ tous les quatre TP |

Dans un TP, quelques repères reviennent sans cesse :

- **Les prérequis et les objectifs**, en haut de la page : lisez-les, ils vous disent si vous êtes prêt et ce que vous saurez faire à la fin.
- **Les points de contrôle** : ils vous permettent de vérifier que tout fonctionne avant de passer à la suite. Ne les sautez pas, une erreur non corrigée se paie toujours plus tard.
- **Les questions**, avec leur réponse cachée dans un bloc à déplier : cherchez d'abord, puis vérifiez.
- **Les solutions** (« Voir l'une des solutions possibles ») : elles sont là pour vous débloquer ou pour comparer, pas pour être copiées. Un code que vous avez écrit vous-même, même imparfait, vous apprendra toujours plus qu'un code collé.

::: tip Un mot ou un paragraphe vous échappe ?
Sélectionnez-le : une petite fenêtre vous propose de le reformuler plus simplement. Le bouton de chat, dans la barre du haut, permet aussi de poser une question sur la page que vous lisez. Tout fonctionne directement dans votre navigateur (Chrome de préférence).
:::

## Préparer son poste

Avant le premier TP, il vous faut un poste prêt à travailler :

1. **Un environnement de développement** : un éditeur de code, et les outils du parcours (PHP, Node, Android Studio, etc.). Deux possibilités :
   - [installer les outils sur votre machine](/cheatsheets/web/index.md) (Windows, Linux, macOS) ;
   - ou [utiliser la dev-box](/cheatsheets/dev-box/), un environnement complet et identique pour tout le monde, prêt en une commande.
2. **Git**, pour sauvegarder et rendre votre travail : [l'initiation à Git](/tp/git_initiation/), puis [l'aide-mémoire Git](/cheatsheets/git/). Tous les rendus passent par Git, autant le prendre en main tôt.

Pour le mobile, la préparation est un peu différente : [préparer son poste Android](/cheatsheets/poste-android/) (Android Studio, téléphone en mode développeur).

## Les parcours

Chaque parcours a sa page : les prérequis, les supports à garder sous la main, puis les TP dans l'ordre, avec les points étapes. Cliquez sur celui qui vous intéresse pour le détail.

### Le web

C'est le parcours principal, et le meilleur point de départ si vous débutez en programmation. Les étapes s'enchaînent :

1. [Les fondamentaux du web](/pages/categories/les-fondamentaux-du-web.md) : HTML, CSS, la mise en page, la maquette, un premier site en ligne. **Aucun prérequis**, c'est ici que tout commence.
2. [Les TP PHP de base](/pages/categories/les-tp-php-de-base.md) : vos pages deviennent dynamiques, avec les formulaires, la base de données, la session, puis les premières classes.
3. [Les TP PHP avancés](/pages/categories/les-tp-php-avances.md) : le MVC, puis Laravel jusqu'aux API et au déploiement.
4. [Les TP JavaScript](/pages/categories/les-tp-javascript.md) : le JavaScript dans le navigateur, le DOM, l'Ajax, puis VueJS.
5. [La sécurité OWASP](/pages/categories/securite-owasp.md) : les failles les plus courantes, comment les reconnaître et les corriger.

Vous cherchez un support web précis (un cours, un aide-mémoire, un jeu) ? [Le portail du web](/pages/categories/le-web.md) les référence tous.

### Le mobile

Pour créer des applications pour téléphone. La programmation orientée objet doit être acquise avant de commencer.

1. [Débuter avec Kotlin](/pages/categories/debuter-avec-kotlin.md) : le langage d'Android, puis une première application et une première API. À faire en premier si Kotlin est nouveau pour vous.
2. [Les TP mobile](/pages/categories/les-tp-mobile.md) : le parcours Android complet avec Jetpack Compose, des bases jusqu'aux projets (API, Bluetooth).
3. [iOS sans Mac](/tp/ios/introduction.md) : pour aller plus loin, une application iPhone en Swift, Flutter ou Kotlin Multiplateforme, construite depuis la dev-box.

Tout le reste (multiplateforme, applications d'exemples, anciens TP) est sur [la page du mobile](/pages/categories/le-mobile.md).

### Les serveurs et le DevOps

Pour comprendre où et comment tournent vos applications : [les TP serveur / DevOps](/pages/categories/les-tp-devops.md) partent de la création d'une machine virtuelle pour aller jusqu'au déploiement automatisé, en passant par Docker. Les supports de cours sont sur [la page des serveurs](/pages/categories/les-serveurs.md).

### Les concepts, pour tous les parcours

Certaines notions servent partout, quel que soit le parcours :

- [Les concepts](/pages/categories/les-concepts.md) : la programmation orientée objet, le versionning, la sécurité, l'organisation du code.
- [Git et GitLab](/tp/gitlab/) : travailler à plusieurs sur un même projet.
- [La veille](/tp/veille/ressources.md) : rester à jour, une habitude à prendre dès maintenant.

## Lequel choisir ?

Vous hésitez encore ? Voici mes conseils, selon votre situation :

| Vous… | Commencez par |
|---|---|
| débutez complètement en programmation | [Les fondamentaux du web](/pages/categories/les-fondamentaux-du-web.md) |
| connaissez le HTML et la CSS | [Les TP PHP de base](/pages/categories/les-tp-php-de-base.md) |
| savez programmer et voulez créer une application mobile | [Débuter avec Kotlin](/pages/categories/debuter-avec-kotlin.md) |
| voulez comprendre les serveurs et la mise en ligne | [Les TP serveur / DevOps](/pages/categories/les-tp-devops.md) |
| suivez un cours avec moi | le parcours indiqué en séance, tout simplement |

## Les bons réflexes

Quelques conseils qui feront une vraie différence :

- **Respectez l'ordre** : chaque TP s'appuie sur les précédents. Sauter une étape, c'est souvent bloquer deux TP plus loin.
- **Lisez l'énoncé en entier** avant de coder, et lisez les messages d'erreur : ils indiquent presque toujours le fichier, la ligne et la cause.
- **Écrivez le code vous-même**, plutôt que de le copier-coller : c'est en tapant que la syntaxe rentre.
- **Faites des commits réguliers** : c'est votre filet de sécurité.
- **Revenez régulièrement** : [les nouveautés](/nouveautes.md) listent les dernières pages créées ou modifiées (et elles sont aussi disponibles en [flux RSS](/rss.xml)).

👋 Si vous avez des questions, n'hésitez pas.
