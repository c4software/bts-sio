---
description: Dans ce TP nous allons voir comment créer un serveur Web (Apache + PHP) et comment le configurer.
---

# TP2. Configurer un serveur Web

::: details Sommaire
[[toc]]
:::

## Pré-requis

Avant de commencer ce TP, vous devez savoir comment installer un serveur Debian. Si ce n'est pas le cas, vous pouvez suivre le [TP1](./tp1b.md). Je part du principe que vous maitriser également les commandes de base de Linux (voir [cheatsheet](/cheatsheets/serveur/linux-debian-based.md)).

## Objectifs

Dans ce TP nous allons voir comment créer un serveur Web (Apache + PHP) et comment le configurer. Ce type de serveur est très utilisé pour héberger des sites Web dynamiques. Lors de vos deux années de BTS ont vous demandera de créer ce genre de serveur, pour mettre à disposition vos réalisations (En AP, mais également lors des projets de fin d'année).

Maitriser la création de serveur, est un point important. En effet, derrière chaque site Web, il y a un serveur qui tourne. Il est donc important de savoir comment le configurer, et comment le sécuriser. Même si il est possible d'héberger son site Web sur des plateformes ou la notion de serveur n'est pas présente, il est important de savoir comment cela fonctionne afin de pouvoir dépanner un site web en cas de problème (gestion des droits, des logs, etc.).

### Ce que nous allons voir

Voilà l'architecture que nous allons mettre en place :

![Réalisation](./res/realisation.png)

- Un serveur Debian 11.
- Un serveur Web Apache.
- PHP 8.X (le `X` étant la dernière version disponible).

## Ressources

Pour réaliser ce TP, vous aurez besoin de :

- [Aide mémoire Debian](/cheatsheets/serveur/linux-debian-based.md)
- [Générateur de configuration](/cheatsheets/serveur/debian-reseau.md)
- [Aide mémoire clé SSH](/cheatsheets/ssh-key/)

## La VM

Pour ce TP je vais vous demander de créer une VM. Cette VM doit respecter les spécifications suivantes :

- Nom de la VM : `<votre nom>-web`.
- OS : Debian 11.
- Mémoire : 1Go.
- CPU : 1.
- Disque : 5Go.

### Étape 1 : Créez une VM

À l'aide des TP précédents (et de vos notes), créez une VM qui respecte les spécifications ci-dessus.

### Étape 2 : Configurez la VM

Configurez la VM pour qu'elle respecte les spécifications suivantes :

- La VM doit avoir une IP statique. (Vous pouvez utiliser le générateur de configuration).
- La VM doit avoir accès à Internet (`ping www.google.com` doit fonctionner).
- La VM doit posséder les **vmtools**.

### Étape 3 : Accès SSH à la VM

Pour vous connecter à la VM, vous devez utiliser la commande `ssh` depuis votre machine hôte. Pour que cela fonctionne :

- Vous devez avoir installé le serveur SSH sur votre VM (voir [TP précédent](./tp1b.md)).
- Vous devez avoir généré une clé SSH sur votre machine hôte et l'avoir ajoutée à votre VM (voir [TP précédent](./tp1b.md)).
- L'accès par mot de passe doit être désactivé sur votre VM (voir [TP précédent](./tp1b.md)).
- L'accès `root` par SSH doit être désactivé sur votre VM (voir [TP précédent](./tp1b.md)).

::: details Rappel sur la clé SSH

Pour installer votre clé SSH sur votre serveur, il vous suffit de faire la commande suivante sur votre ordinateur.

```bash
ssh-copy-id <username>@<ipaddress>
```

⚠️ Vous devez évidemment remplacer `<username>`et `<ipaddress>`par votre utilisateur et votre mot de passe. Exemple :

```bash
ssh-copy-id pi@192.168.1.253
```

Rien de plus, à partir de maintenant votre serveur acceptera votre connexion sans vous demander de mot de passe. Pratique non ? (Et surtout très sécurisé)

:::

## Installation d'Apache

Vous l'avez compris, nous allons installer un serveur Web Apache sur notre VM. Pour cela, nous allons utiliser la commande `apt` pour installer le paquet `apache2`.

### Étape 1 : Installation d'Apache

Pour installer Apache, vous devez utiliser la commande `apt` :

```bash
apt update
apt install apache2
```

### Étape 2 : Vérification de l'installation

#### Vérifier en ligne de commande que le serveur est démarré

Pour vérifier que le serveur est démarré, vous pouvez utiliser la commande suivante :

```bash
sudo systemctl status apache2
```

#### Vérifier que le serveur est accessible

Pour vérifier que le serveur est accessible, il vous suffit d'ouvrir votre navigateur et d'aller sur l'adresse IP de votre serveur. Si vous avez bien suivi les étapes précédentes, vous devriez voir la page d'accueil d'Apache.

![Page d'accueil d'Apache](./res/apache.jpg)

::: details Rappel sur les dossiers

Les fichiers du serveur sont dans le dossier `/var/www/html`. Vous pouvez y accéder avec la commande suivante :

```bash
cd /var/www/html
```

C'est ici que nous voyons l'avantage de Linux. L'architecture est très simple, et les fichiers sont très facilement accessibles.

:::

## Installation de PHP

Maintenant que nous avons un serveur Web, nous allons installer PHP. Pour l'instant vous avez utilisé PHP sur votre machine Windows (via XAMPP). Mais PHP peut également être installé sur un serveur Linux. Pour cela, nous allons utiliser la commande `apt` pour installer le paquet `php`.

Debian est une distribution un peu particulière, elle est dite « stable ». C'est-à-dire que les versions des paquets peuvent-être un peu ancien. Pour cela nous allons devoir ajouter un dépôt supplémentaire pour avoir accès aux dernières versions de PHP.

Le Dépôt est une sources supplémentaire pour l'installation de paquets. Il est possible d'ajouter plusieurs dépôts, et de choisir la version de paquet que l'on souhaite installer.

### Étape 1 : Ajout du dépôt
