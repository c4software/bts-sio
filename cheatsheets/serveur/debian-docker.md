---
description: "Aide mémoire pour installer et configurer Docker sur une Debian."
---

# Installer Docker sur une debian

Dans cet aide-mémoire vous trouverez l'ensemble des éléments de base pour installer Docker sur une machine Debian.

::: details Table des matières
[[toc]]
:::

## Introduction

Docker est un outil qui permet de créer des conteneurs. Il ne faut pas le confondre avec une machine virtuelle. Un conteneur est un ensemble de processus qui partagent le même noyau. Il est donc plus léger qu'une machine virtuelle.

Dans cette procédure, nous allons installer Docker sur une machine Debian 12.

## Installation

Je pars du principe que vous avez déjà une machine Debian 12. Si ce n'est pas le cas, je vous invite à consulter l'aide-mémoire [Installer Debian 12](/tp/devops/serveur/tp1.md) ([ou via un modèle](/tp/devops/serveur/tp1alt.md)).

## Commande en root

Dans cette procédure, nous allons être exclusivement en mode `root`. Pour passer en mode `root`, vous pouvez utiliser la commande suivante :

```bash
sudo su -
```

### Si vous avez déjà un MySQL installé

Si vous avez déjà un MySQL installé sur votre machine, il est nécessaire de le désinstaller avant d'installer Docker. Pour cela, vous pouvez utiliser la commande suivante :

```bash
apt-get remove --purge mariadb-server mariadb-client -y
```

### Installation de Docker

```bash
# Ajout des éléments nécessaire à l'installation
apt-get update
apt-get -y install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Ajout du dépôt permettant d'installer Docker
mkdir -m 0755 -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update la liste des packages et installation de Docker
apt update
apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
```

## Autoriser un utilisateur à utiliser Docker

Par défaut, seul le compte `root` peut utiliser Docker. Pour autoriser un autre utilisateur à utiliser Docker, il faut ajouter ce compte dans le groupe `docker`.

```bash
# Ajout de l'utilisateur dans le groupe docker
usermod -aG docker <votre-utilisateur>
```

Une fois l'utilisateur ajouté au groupe `docker`, il faut se déconnecter et se reconnecter pour que les changements soient pris en compte.

## La suite est en tant qu'utilisateur

Vous pouvez maintenant vous déconnecter du compte `root` et vous reconnecter avec votre compte utilisateur.

```bash
exit
```

Pour que vous puissez utiliser Docker sans avoir à passer par un `sudo`, il est nécessaire de vous déconnecter et de vous reconnecter (quitter la session SSH et vous reconnecter).

## Démarrer Docker au démarrage de la machine

```bash
systemctl enable docker.service
systemctl enable containerd.service
```

Cette commande permet de démarrer Docker au démarrage de la machine, et donc démarre automatiquement les conteneurs que vous avez spécifiés comme étant à démarrer au démarrage (exemple les conteneurs de type `nginx` ou `mysql`).

## Créer un environnement complet MySQL + PHPMyAdmin

Créer un fichier `docker-compose.yml` avec le contenu suivant :

```yaml
services:
  db:
    image: mysql:8
    container_name: db
    restart: always
    environment:
      - MYSQL_USER=user
      - MYSQL_PASSWORD=user-password
      - MYSQL_ROOT_PASSWORD=root
    volumes:
      - ~/mysql-data:/var/lib/mysql
    ports:
      - 3306:3306

  phpmyadmin:
    image: phpmyadmin
    container_name: phpmyadmin
    restart: always
    environment:
      - PMA_HOST=db
      - PMA_PORT=3306
    ports:
      - 8081:80
    depends_on:
      - db
```

Pour démarrer l'environnement, il suffit de lancer la commande suivante :

```bash
docker-compose up -d
```

Vous pouvez maintenant accéder à PHPMyAdmin via l'adresse :

- Accéder à votre PHPMyAdmin : http://ip-de-votre-machine:8081
- Pour le MYSQL vous avez les informations suivantes :
  - Utilisateur : `user`
  - Mot de passe : `user-password`
  - Utilisateur root : `root`
  - Mot de passe root : `root`

### Tester le bon fonctionnement de Docker

```bash
docker run hello-world
```

## Sources

- [Docker - Installation](https://docs.docker.com/engine/install/debian/)