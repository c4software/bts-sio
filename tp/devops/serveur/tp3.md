---
description: Dans ce TP nous allons voir comment créer un serveur de base de données (MySQL) et comment le configurer.
---

# TP3. Configurer un serveur de base de données

::: details Sommaire
[[toc]]
:::

## Pré-requis

Pour réaliser ce TP vous devez avoir connaître les éléments suivants :

- [TP1. Créer une VM sur la ferme.](/tp/devops/serveur/tp1.md)
- [Aide mémoire Linux](/cheatsheets/serveur/linux-debian-based.md)
- [Configurateur réseau Debian](/cheatsheets/serveur/debian-reseau.md)

## Objectifs

Ce TP / TD a pour objectif de vous faire découvrir comment configurer un serveur de base de données (MySQL) pour qu'il soit utilisable par un serveur Web (Apache) mais également par une application Client (C#, Java, PHP, etc.).

::: tip Application cliente ?

Une application cliente est une application qui se connecte à un serveur pour récupérer des données et les afficher à l'utilisateur. Le découpage entre serveur et client est une notion qui est très importante dans le développement d'applications.

En effet, cela permet de :

- Répartir les ressources entre plusieurs machines.
- Isoler les données de l'application.
- Sécuriser les données de l'application (accès à la base de données).

:::

Nous allons donc dans ce TP nous concentrer sur **la base de données** et uniquement sur celle-ci.

::: danger Machine type examen

Comprendre le découpage multimachine est un élément important pour le passage de l'examen. Il est donc important de bien comprendre ce que nous faisons dans ce TP.

:::

## Avant-propos : Les environnements

Rappel, en informatique, il est important de différencier les différents environnements :

- **Production** : C'est l'environnement qui est utilisé par les utilisateurs finaux. Il est donc important qu'il soit stable et sécurisé.
- **Test** / **Staging** : C'est l'environnement qui est utilisé pour tester les nouvelles fonctionnalités.
- **Développement** : C'est l'environnement qui est utilisé par les développeurs pour tester leur code.

Chaque environnement à un rôle bien précis, il convient donc de travailler différemment sur chacun d'eux.

- Votre machine est votre environnement de **développement**.
- La machine que nous allons créer aujourd'hui peut-être votre environnement distant de base de données (**test** ou **staging**).
- La machine sur laquelle vous allez déployer votre site web de l'AP sera votre environnement de **production**.

::: tip Gare au nommage
Nous allons créer dans ce TP / TD une machine qui pourra vous servir de base de données pour vos différents projets. Je vous invite donc à être vigilant sur le nommage de cette machine, pour que celle-ci soit un nom qui va permettre son identification.
:::

<center><iframe src="https://giphy.com/embed/si4P9VBMEIhq40i6tT" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></center>

## La machine

Pour réaliser ce TP, je vous propose que l'on réfléchisse ensemble sur la machine que nous allons créer.

### Les besoins

Les besoins de cette machine sont les suivants :

- Elle doit être accessible uniquement depuis le réseau du lycée.
- Elle doit permettre de stocker plusieurs bases de données.
- Elle doit avoir un accès SSH sécurisé.
- Elle doit permettre de conserver vos bases de données pour les deux prochaines années.
- Elle doit être administrable à distance.

### Les choix

Voilà la liste des choix que nous allons devoir faire pour créer cette machine :

- Espace disque :
- Mémoire vive :
- Processeur :
- OS :
- Logiciels :

Avant de créer votre machine, je vous invite à réfléchir sur ces choix. Une fois votre réflexion terminée, nous allons débriefer ensemble.

::: details Une réponse possible

- Espace disque : 10 Go.
- Mémoire vive : 1 Go.
- Processeur : 1 vCPU.
- OS : Debian 11.5.
- Logiciels : MySQL, SSH, Apache, PHP.
- Accès SSH : Sans mot de passe, uniquement avec une clé SSH.
- Votre machine **ne dois pas avoir de bureau graphique** (inutile pour un serveur).

Pourquoi cette configuration ? Apache et PHP sont installés, car, nous allons mettre sur votre serveur PHPMyAdmin. Si vous ne souhaitez pas installer PHPMyAdmin, vous pouvez supprimer Apache et PHP.

:::

## Création de la machine

Maintenant que notre besoin est défini, nous allons pouvoir créer notre machine. Je vous laisse suivre la procédure suivante :

- [TP1. Créer une VM sur la ferme.](/tp/devops/serveur/tp1.md)
- [TP2. Avoir une machine Debian avec Apache + PHP](/tp/devops/serveur/tp2.md) => **ou la synthèse de ce TP** : [Configurer une serveur Debian pour le Web](/cheatsheets/serveur/debian-web.md)

::: details Vous souhaitez juste les commandes ?

Voici la procédure de création de la partie PHP + Apache :

```bash
apt-get update
apt-get install wget lsb-release apt-transport-https gnupg2 ca-certificates -y
wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
sh -c 'echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list'

# Installer Apache + PHP
apt-get install open-vm-tools apache2 php8.2 php8.2-fpm php8.2-cli php8.2-{bz2,curl,mbstring,intl,pdo,mysql,gd} -y

# Activer PHP dans Apache
a2enmod proxy_fcgi setenvif php8.2-fpm rewrite

# Active  Apache
systemctl restart apache2
systemctl enable apache2

# Vérifier la version de PHP
php -v

# Affiche OK si le serveur web est accessible.
curl -s --head http://localhost:80 | grep "HTTP/1.[01] [23].." && echo "Le serveur écoute bien sur le port 80." || echo "Aucun serveur en écoute sur le port 80."
```

:::

::: tip Des points à vérifier

- Votre machine doit posséder une IP fixe (à générer via le configurateur réseau, en prenant soint de ne pas utiliser une IP déjà utilisée).
- Votre machine doit être à jour (`apt update && apt upgrade`).
- Votre machine doit avoir un accès SSH sécurisé (via échange de clé).

:::

::: danger Je veux une fiche serveur
Je vous rappelle que vous **devez** avoir une fiche serveur pour chaque machine que vous créez. Cette fiche doit être complète et doit contenir les informations de connexion à votre machine (les IP, Login, Mot de passe, etc.).
:::

### Création complète de la VM

Dans cette version, vous allez devoir créer la VM depuis le début. Vous avez plus d'options, mais vous devez réaliser l'installation du système d'exploitation.

- [Consulter la documentation](./tp1.md)

### Création de la VM via un modèle <Badge type="tip" text="Meilleure solution" vertical="top" />

Dans cette version, vous allez créer votre VM à partir d'un modèle. Le modèle contient déjà le système d'exploitation et les logiciels installés. Vous n'avez plus qu'à configurer la VM (réseau, utilisateur, etc.).

- [Consulter la documentation](./tp1alt.md)

## Configuration de la base de la machine

Si vous avez correctement suivi les TP précédents, vous devriez avoir une machine qui ressemble à ça :

- Logiciels installés : SSH, Apache, PHP, MySQL, vim.
- **VMWare Tools installé**. (`apt install open-vm-tools`).
- Accès SSH : Via échange de clé.
- Accès Web fonctionnel (via le port 80).

::: tip VMWare Tools
Les VMWare Tools sont des logiciels qui permettent d'optimiser l'utilisation de la machine virtuelle. Ils sont **très** importants pour la performance de votre machine, vous **devez** donc les installer (sinon Bruno ne vous aime plus).
:::

## La base de données

Notre machine est maintenant prête à accueillir le serveur de base de données. Nous avons plusieurs possiblités :

- MariaDB
- MySQL
- PostgreSQL

Dans ce TP, nous allons utiliser MariaDB. Pourquoi ? Car celui-ci est disponible de base sur debian.

### Installation de MariaDB

Vous l'avez compris, installer un logiciel sur Linux est très simple, une seule commande suffit :

```bash
apt-get update
apt-get install mariadb-server mariadb-client -y
```

Pourquoi ces deux paquets ? `mariadb-server` est le serveur de base de données, et `mariadb-client` est le client de base de données. Le client est utilisé pour se connecter **localement** à la base de données.

::: tip Arrêtons-nous un instant

- Pourquoi faire un update avant d'installer un paquet ?
- À quoi correspond le `-y` à la fin de la commande ?
- Selon vous, est-ce que votre serveur de base de données est démarré ? Si oui, comment le vérifier ?
- Que veux dire **localement** ?

:::

### Configuration

Avant d'utiliser MariaDB, nous devons configurer le mot de passe de l'utilisateur `root`. Pour cela, vous pouvez utiliser la commande suivante :

```bash
mysql_secure_installation
```

Cette commande va vous demander de rentrer le mot de passe actuel de l'utilisateur `root`. Comme vous venez d'installer MariaDB.

::: tip Arrêtons-nous un instant

- Qu'est-ce que `mysql_secure_installation` ?
- Pourquoi est-ce important de changer le mot de passe de l'utilisateur `root` ?
- Quel mot de passe avez-vous choisi ? Pourquoi ?

:::

### Vérifier que MariaDB est installé

Pour vérifier que MariaDB est installé, vous pouvez utiliser la commande suivante :

```bash
mysql -u root -p
```

Cette commande va vous demander le mot de passe de l'utilisateur `root`. Si vous avez bien suivi les étapes précédentes, vous devriez être connecté à MariaDB.

## Configurer PHPMyAdmin

Notre serveur de base de données est maintenant installé, mais nous n'avons pas d'interface graphique pour le gérer. Pour cela, nous allons installer PHPMyAdmin.

::: danger Un instant

Une base de données ≠ de PHPMyAdmin. PHPMyAdmin est un logiciel qui permet de gérer une base de données. Il est donc possible d'utiliser une base de données sans PHPMyAdmin. Des alternatives existent, en fonction de vos besoins, il n'est peut-être pas nécessaire d'installer Apache + PHP + PHPMyAdmin sur votre serveur de base de données.

Dans la suite du TP/TD nous allons voir comment administrer notre base de données **sans** PHPMyAdmin. Les alternatives sont les suivantes :

- Utiliser la ligne de commande (compliqué).
- Utiliser un logiciel tiers (comme HeidiSQL, DBeaver, etc.).
- Utiliser un équivalent de PHPMyAdmin (comme Adminer).
- Utiliser l'outil intégré à votre IDE (comme dans PHPStorm, VsCode, etc).

Quelques soit votre choix, vous devez être très vigilant dans votre vocabulaire pour ne **jamais mélanger** le terme de base de données et celui de PHPMyAdmin.

:::