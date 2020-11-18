# Complément du cours PHP

Ce document est un complément du cours. Il vous permettra de revenir sur les différentes notions avec différents exemples.

## Boite à outils

Le PHP est présent depuis de nombreuses années sur Internet, il faut donc être très vigilant aux codes que nous trouvons ! En effet le PHP a énormément évolué et ne fonctionne plus vraiment comme avant. Dans un cas comme celui-ci, je vous conseille la documentation officielle en priorité :

- [Manuel PHP.net](https://www.php.net/manual/fr/)
- [MDN](https://developer.mozilla.org/en-US/docs/Glossary/PHP)
- [Intro PHP W3School](https://www.w3schools.com/PhP/php_intro.asp)

## Introduction

Le PHP est un langage de script largement utilisé sur Internet (Wordpress, Facebook …). Il existe depuis 1994, à l'origine le nom signifiait « **P**ersonal **H**ome **P**age » mais on lui préfère maintenant une signification bien plus large « **P**HP : **H**ypertext **P**reprocessor ».

::: warning Un instant

Si vous ne l'avez pas déjà fait. Je vous conseille vivement d'aller regarder les cours [Base HTML](/cheatsheets/html/) et le cours [Base CSS](/tp/html_css/support.html). Ils nous serviront de bases aux éléments abordés dans notre introduction au PHP.

:::

Le PHP est un langage serveur permettant la génération de code HTML. Nous entrerons plus en détail ultérieurement sur ces différentes notions.

## Le fonctionnement

Le PHP est un langage de programmation « Procédurale **et/ou** objet », beaucoup d'entreprises l'utilisent (même si en France il a parfois mauvaise réputation). Facebook est en grande partie en PHP, Worpress est écrit en PHP. C'est massivement utilisé, il est donc **incontournable** pour vous développeur Web.

Il repose sur le principe de client / serveur. C'est une notion fondamentale à comprendre, votre navigateur n'est pas seul dans le monde de l'Internet, nous avons des serveurs, **beaucoup de serveurs**. Nous avons donc deux acteurs :

**Les clients** ce sont les ordinateurs, smartphones, voitures bref tout ce qui peut faire une requête Web. Ils seront les visiteurs de votre site Internet.
**Les serveurs** ils délivrent les données à vos visiteurs, ils sont parfois très puissants pour assurer une forte charge… ou alors très léger! Comme par exemple, un Raspberry Pi derrière une Freebox. Ils n'ont pas forcément d'écran, ils ont des services qui délivrent du contenu « compréhensible par un client (Web, Api, …) ».

| ![Client Serveur](./res/client-serveur.svg) |
| :-----------------------------------------: |
|      _Nos clients et le(s) seveur(s)_       |

::: danger Internet ≠ Chrome
Actuellement vous consommez Internet comme un utilisateur Web, mais Internet c'est pas seulement ça. C'est également des services [appelés API](https://fr.wikipedia.org/wiki/Interface_de_programmation) qui permettent la communication entre deux systèmes informatiques (exemple Instagram sur votre Téléphone communique par API avec les serveurs de Facebook) dans un langage appelé JSON.
:::

### Statique ou Dynamique ?

Il y'a deux écoles !

**Le statique**, c'est ce que nous avons vu ensemble au début. C'est simplement du code HTML écrit « en dur » qui ne change donc jamais côté serveur à chaque chargement. Pour le mettre à jour, il faut mettre à jour les fichiers HTML à la main sur le serveur. **Avantage**, ils sont très rapides et permettre de répondre très rapidement aux demandes des clients. Parfait donc pour un site vitrine.

**Le Dynamique**, c'est ce que nous allons voir avec PHP, il s'agit de faire travailler le serveur pour générer une page « différente » pour chaque utilisateur. La mise à jour du contenu peut donc dans être quasiment temps réel grâce à des espaces d'administrations (exemple de WordPress). Ça nous ouvrira plein de possibilités de réalisations :

- Des sites dynamiques types Wordpress.
- Des forums.
- Des espaces d'administrations.
- Des Blogs types Wordpress.

::: tip Le monde est ni blanc, ni noir…

Ça semble simple hein ? Évidemment il y a des nuances, nous pourrions penser que l'ensemble des sites est dynamique… Mais il existe « une troisième école », celle des sites générés.

Elle part d'un postula simple « pourquoi faire calculer un serveur à chaque requête alors que le contenu change 1× par semaine ? ». Nous avons donc de plus en plus de sites qui sont « générés de manière périodique » puis servis de manière statique. C'est par exemple le cas de la documentation sur lequel vous vous trouvez.

:::

### Et le PHP dans tout ça ?

Le PHP va être un langage **serveur** qui permet de faire des sites **dynamiques**. Nous aurons donc du **HTML + CSS** classique, mais celui-ci sera en partie « à trou », les trous seront complétés dynamiquement à chaque requête par votre serveur PHP.

Un petit exemple ?

```php
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Exemple PHP</title>
</head>
<body>
    <h1>Bonjour vous</h1>
    <p>Nous sommes le <?php echo date("d/m/Y") ?></p>
</body>
</html>
```

![Exemple de base PHP](./res/php_base.png)

::: tip En aparté

Nous voyons ici les bases du PHP, nous allons donc mélanger HTML et PHP. Je suis personnellement _pas fan du tout_, mais il faut commencer quelque part. Plus tard nous mettrons en place différents designs pattern dont certains avec des logiques de Templates, ce qui nous permettra de « découper la logique d'interface (HTML) et de code (PHP) ».

:::

### Est-ce la seule façon de faire ?

Vous vous souvenez, je vous disais que PHP avait pas forcément bonne presse en France. Il existe donc d'autres façons de générer du code serveur :

- Ruby (RoR)
- Python
- NodeJS
- …

La liste est encore bien plus longue ! Il y a énormément d'autre façon de générer des pages ou API. Celle actuellement terriblement à la mode est `NodeJS`, elle repose sur un langage serveur en JavaScript (oui, oui, le même que dans votre navigateur)

## Les outils du développeur

Nous avons donc un langage Serveur… Mais vous, vous n'avez pas de serveur là non ? Et bien, si, enfin presque ! Votre ordinateur pour l'instant est un client, mais il peut facilement devenir un serveur. Pour développer en PHP nous allons avoir besoin d'un logiciel. Pour être précis d'un ensemble de logiciels :

- Apache (ou Nginx)
- MySQL (ou MariaDB)
- PHP

En fonction de la plateforme, le logiciel sera différent, mais il contiendra **toujours** les mêmes briques.

| Plateforme | Logiciel                                                                                     |
| ---------- | -------------------------------------------------------------------------------------------- |
| Windows    | [Wamp](https://www.wampserver.com/en/), [Xampp](https://www.apachefriends.org/fr/index.html) |
| Linux      | [Lamp](https://doc.ubuntu-fr.org/lamp)                                                       |
| Mac        | [Mamp](https://www.mamp.info/en/mac/), [Mnpp](https://myedukit.com/GetMnpp/)                 |

Les différents logiciels sont juste des raccourcis pour vous simplifier la création « d'un serveur PHP » en local. Ils incluent donc l'ensemble de la configuration nécessaire au bon fonctionnement de PHP.

::: details À l'aise avec la ligne de commande ?
Si oui, il existe depuis PHP 7 une autre façon de tester rapidement un script PHP. Elle passe par la ligne commande et ne nécéssite que l'installation de PHP

```sh
php -S localhost:9000
```

Cette commande lance un serveur PHP dans le dossier courrant. Pratique !
:::

::: tip Et sur un serveur « de prod » ?
Et bien, sur un serveur de Prod**(uction)** c'est la même chose sauf qu’habituellement c'est du Linux. Mais les briques de bases restent les mêmes.
:::

## Votre première page

Maintenant que vous avez votre architecture pour travailler, je vous propose de créer votre première page PHP. Avant d'aller plus loin, il faut voir les bases d'un script PHP.

[=> La suite dans le TP 1](./tp1.md)

## Les bases de PHP

### Les paramètres « GET, POST »

### Les variables simples

### Les conditions

### Les boucles

### Les fonctions

### Les includes

### Les tableaux

### La session

### Organiser son code

## Les formulaires

## PHP et les bases de données

### MySQL

### Les autres

### PhpMyAdmin
