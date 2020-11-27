# Complément du cours JavaScript

Ce document est un complément du cours. Il vous permettra de revenir sur les différentes notions avec différents exemples.

[[toc]]

## Introduction

Le JavaScript… Vous allez l'aimer… Ou le détester ! Mais en tout cas c'est l'incontournable du développeur Web. Le JavaScript est maintenant partout, dans votre navigateur bien évidemment, mais également sur nos serveurs, mais aussi dans nos applications! Bref il est littéralement partout.

Dans ce cours nous allons voir les bases du JavaScript, nous ne reverrons pas ici [les bases du développement comme ce que nous avons fait en PHP](/tp/php/support.md).

![Logo JavaScript](./res/logo.svg)

::: warning Prérequis
Le cours fait référence à des notions de programmation orientée-objet, je ne couvrirais pas les bases de la programmation objet.
:::

## Le fonctionnement

Le JavaScript est un langage de programmation relativement récent il date de **1994**. Cependant il a connu une évolution assez rapide ces dernières années et ne ressemble plus vraiment au JavaScript du début.

Le JavaScript est une implémentation d'une norme plus large l'ECMAScript (aussi appelé ES20XX, mais également ESX), cette norme définit le fonctionnement du langage aussi bien dans un navigateur, mais également sur d'autres supports comme les serveurs.

Nous allons utiliser au maximum les dernières fonctionnalités de la norme (ES6), celle-ci est maintenant largement compatible avec le parc de navigateur actuel. Si par hasard vous devez supporter un navigateur incompatible, nous aborderons les options pour « le gérer ».

Le JavaScript qui fonctionne dans votre navigateur est un langage **client** il est donc exécuté _dans votre navigateur_ ce détail est important. Ça veut dire que votre serveur ne sera pas du tout sollicité lors de l'exécution d'un programme codé en JavaScript.

Votre navigateur est très puissant, tellement puissant que nous allons pouvoir faire énormément de choses en JavaScript :

- Contrôle de saisie.
- Interactivité avec le client (interaction avec l'utilisateur, clic, clavier, mouvement de la souris).
- Afficher / masqué des éléments aux cliques.
- Ajouter des éléments dans une page, manipuler la CSS.
- Charger des éléments de manière asynchrone via le Réseau (Ajax)
- Utiliser les Cookies (comme en PHP).
- Sauvegarder des données sur le poste du client (LocalStorage).

Mais… Ce n’est pas tout ! Votre navigateur est tellement puissant que vous allez pouvoir faire :

- Des applications en JavaScript
- Accéder au Bluetooth de votre appareil
- Accéder au GPS
- La liste est vraiment infinie !

::: tip
Le JavaScript est vraiment le miroir de la vitesse avec laquelle Web est une plateforme qui va très vite. Il ne se passe pas 6 mois sans que vous puissiez faire encore plus.

La veille dans ce domaine est donc primordiale. Nous allons voir ici seulement les bases de ce qui vous servira plus tard dans votre métier.
:::

::: warning
Le JavaScript est puissant, tellement puissant que votre navigateur « vous bridera ». Afin que vous n'abusiez pas des fonctionnalités, certaines d'entres elles sont soumises à permission / validation. Comme votre mobile donc :

![Permissions Chrome Exemple](./res/permissions.png)

Autres limitations, votre code JavaScript ne peut pas accéder :

- Aux autres onglets actuellement ouverts.
- Aux domaines autres que celui sur lequel vous vous trouvez (Ajax).

![Permissions 2](./res/permissions2.png)

:::

### Moteur JavaScript

Votre navigateur possède donc un « Moteur JavaScript » que l'on appelle parfois la « JavaScript Virtual Machine » (rien à voir avec _le Java_). Chaque moteur JavaScript est donc différent, et fonctionne différemment, ils ont des noms comme vos navigateurs. Par exemple :

- V8 : Chrome, Opéra, Edge.
- SpiderMonkey : Firefox.
- Chakra pour Internet Explorer.
- ChakraCore Microsoft Edge (avant l'évènement « Chromium »)
- Nitro et SquirrelFish pour Safari.

::: tip Un Moteur ?
Le moteur a pour but de :

- Lis le JavaScript.
- Compile le JavaScript en langage machine (et le valide).
- Votre ordinateur exécute le langage machine (très rapide)

:::

### Pourquoi le JavaScript est-il donc incontournable.

- Intégration avec le HTML/CSS.
- Simple d'apprentissage et dans la manipulation.
- Actif par défaut, et supporté par l'ensemble des navigateurs.

## Les outils du développeur

Le JavaScript ne déroge pas à la règle, pour bien travailler il nous faut de bonnes ressources. Pour le JS je vous propose :

- [https://developer.mozilla.org/](https://developer.mozilla.org/)
- [https://caniuse.com/](https://caniuse.com/)
- [https://web.dev/](https://web.dev/)

::: tip Un instant
Bien évidemment cette liste peut-être bien plus grande. N'hésitez pas à vous inspirer :

- De certains projets Github.
- De compte Twitter
- …
  :::

## Librairies or not ?

C'est là grande question ! En JS nous avons la possibilité de nous passer complètement de librairie afin d'utiliser uniquement ce que propose le navigateur, c'est ce que l'on appelle `VanillaJS`. En 2020 ça fonctionne très bien! C'est même ce que j'aurais tendance à conseiller… Mais (oui il y a toujours un mais) la réalité est qu’en agence vous allez rencontrer des projets qui utiliseront [jQuery](https://jquery.com/).

Au vu du temps que nous allons avoir à consacrer au JS ça me semble important de vous parler un peu de `jQuery` mais également des équivalents `VanillaJS`.

Je ne dis pas que `jQuery` est un mauvais choix… Je pense par contre que celui-ci n'est plus forcément un « obligatoire » à partir de maintenant.

::: tip Et les Frameworks alors ?
Ah en voilà une bonne question ! Les frameworks JS sont un sujet aussi vaste que le JS en lui-même, nous aurons le plaisir de les pratiquer ultérieurement. Dans tous les cas, ce que nous allons voir ensemble « dans les bases du JS » nous resservira avec les frameworks.

_Sachez juste qu'il est possible de tout faire avec un framework JS (type `VueJS`), mais ce n'est pas forcément la réponse à toutes les questions._
:::

## Les navigateurs

L'autre gros sujet du JS est le support… Vous êtes certainement jeunes, vous n'avez connu _que Google Chrome_, la réalité est plus complexe que ça (surtout en entreprise). Dans votre carrière vous allez rencontrer des blocages et obligations de support. Même en 2020 nous avons des navigateurs différents (pourvu que ça dure) :

- Google Chrome
- Safari
- Firefox
- Edge
- Internet Explorer `> 11`
- Interne Explorer `< 10`

Ça vous parait très certainement anecdotique, mais les navigateurs n'interprètent pas vraiment de la même façon le code, le JavaScript en fait parti. En fonction des navigateurs, le support sera plus ou moins complet. En 2020 nous n'avons plus trop de problèmes. L'ensemble des navigateurs support « à peu près là même choses ». Mais avant ce n'était clairement pas le cas.

Nous allons donc avoir besoin de [_librairies_ (appelé polyfill)](https://polyfill.io/v3/), ces librairies ont pour but d'ajouter le support de fonctionnalité moderne sur d’anciens navigateurs. Le support n'est évidemment pas total, et souvent les performances sont un peu moins bonnes. Mais cette solution est souvent la meilleure pour supporter les anciens navigateurs.

## Les animations

Attention à ne pas tomber dans le piège du tout JavaScript. Il peut-être tentant de tout faire un JavaScript, il fut un temps ou c'était une solution acceptable. Maintenant que nos navigateurs sont très puissants, cette solution devient même imaginable…

Mais **il ne faut pas le faire** ! Si vous souhaitez animer votre page **privilégier au maximum le combo CSS + HTML** (et JavaScript si un pilotage est nécessaire). Pourquoi est-ce important ? C'est important, car l'exécution du votre CSS est complètement différentes que le JS :

- La CSS est en grande partie gérée par votre GPU (Carte graphique). Cela utilise donc des instructions très spécifiques, optimisé, et très rapide (fluide).
- Le JS est quant à lui exécuté sur votre CPU (Processeur). Donc, en fonction de votre ordinateur les performances sont plus ou moins bonnes (et consomme plus de batteries).

::: tip Vous vous souvenez des boucles ?
Les animations en JS sont faites de boucles « infinies » ou très longues. C'est donc très peu optimisé. **Méfiance donc !**
:::
