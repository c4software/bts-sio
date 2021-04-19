# Build, Deploy avec Netlify

Dans ce document nous allons voir comment déployer une application simplement dans « le cloud » avec la plateforme Netlify.

## Introduction

Netlify est une plateforme gérant l'ensemble des problématiques de déploiement, mais également d'intégration continue pour que vous puisiez vous concentrer dans ce qui **vous intéresse** le développement de votre site Internet.

La solution de Netlify est intéressante, car elle nous permet entre autre de :

- Remplacer votre serveur.
- Intégration continue (CI).
- Déploiement continu (CD).
- Intercepter les formulaires pour envoyer des emails sans rien coder.

Et le tout vous allez le voir très très simplement (et en grande partie gratuitement)

## Principe de fonctionnement

NetLify est une solution qui repose entièrement sur votre Workflow de travail GIT (vous pouvez passer par une archive ZIP, mais ça n'aurait aucun sens).

Nous allons donc :

- Connecter Github / Gitlab.
- Choisir le projet.
- Configurer le projet (branche, formulaire, script de déploiement)

Vous allez le voir, la solution vous guidera pour que vous connectiez simplement votre projet Git et Netlify.

::: danger Trop beau pour être vrai ?
C'est magique, ça semble parfait non ? Si c'est magique … C'est qu'il y a un truc ! Le truc ici c'est que Netlify est compatible uniquement avec des sites pensés jamStack.
:::

### JamStack ?

La jamstack c'est une nouvelle façon de voir la conception de site Internet, cette nouvelle façon de faire va nous permettre de réduire les couts d'hébergements / et bénéficier de l'avantage du Cloud (CI/CD, compression des assets, FAAS…)

Plein de mots qui font peur, mais ne vous inquiétez pas… C'est beaucoup plus simple qu'il n'y parait. Ici pas de PHP pour générer vos pages nous allons tout concevoir en HTML / JavaScript (VanillaJS, React, Vue, …) / CSS

![JamStack](./res/jamstack-horizontal.svg)

**JavaScript**
Les fonctionnalités dynamiques sont gérées par JavaScript. Vous êtes libres d’utiliser la bibliothèque ou le framework que vous voulez.

**APIs**
Les opérations côté serveur sont abstraites sous forme d’APIs réutilisables, accessibles en HTTPS à l’aide de JavaScript. Ces opérations peuvent être déléguées à des services tiers ou bien à vos propres fonctions. C'est ce que l'on appelle souvent FAAS (Function As A Service)

**Markup**
Les sites web sont servis sous forme de fichiers HTML statiques. Ces fichiers peuvent être générés à partir de fichiers source (Markdown, générateur de site, ou simplement avec du HTML à l'ancienne).

::: danger Est-ce la meilleure façon ?
C'est à la mode oui… Mais est-ce la meilleure façon ? Je ne sais pas. Sachez juste que pour l'instant c'est un standard et que beaucoup l'utilise.

**Il faut donc le connaitre / le maitriser.**
:::

[Plus d'information sur la JamStack](https://jamstack.wtf/)

## Déployer un site

### Créer le site sur Github / Gitlab

### Connecter Github / Gitlab à Netlify

### Paramètrage

### Aller plus loin

#### Les formulaires

#### Les branches

#### La comprssion des ASSETS
