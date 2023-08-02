---
description: "Aide mémoire pour installer et configurer Docker sur une Debian."
---

# Installer Docker sur une debian

Dans cette aide-mémoire vous trouverez l'ensemble des éléments de base pour installer Docker sur une machine Debian.

::: details Table des matières
[[toc]]
:::

## Introduction

Docker est un outil qui permet de créer des conteneurs. Il ne faut pas le confondre avec une machine virtuelle. Un conteneur est un ensemble de processus qui partagent le même noyau. Il est donc plus léger qu'une machine virtuelle.

Dans cette procédure, nous allons installer Docker sur une machine Debian 11 (ou Debian 12).

## Installation

Je part du principe que vous avez déjà une machine Debian 11 (ou Debian 12). Si ce n'est pas le cas, je vous invite à consulter l'aide-mémoire [Installer Debian](/tp/devops/serveur/tp1.md) ([ou via un modèle](/tp/devops/serveur/tp1alt.md)).

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

### Tester le bon fonctionnement de Docker

```bash
docker run hello-world
```

## Autoriser un utilisateur à utiliser Docker

Par défaut, seul le compte `root` peut utiliser Docker. Pour autoriser un autre utilisateur à utiliser Docker, il faut ajouter ce compte dans le groupe `docker`.

```bash
# Ajout de l'utilisateur dans le groupe docker
usermod -aG docker <votre-utilisateur>
```

Une fois l'utilisateur ajouté au groupe `docker`, il faut se déconnecter et se reconnecter pour que les changements soient pris en compte.

## Démarrer Docker au démarrage de la machine

```bash
systemctl enable docker.service
systemctl enable containerd.service
```

Cette commande permet de démarrer Docker au démarrage de la machine, et donc démarre automatiquement les conteneurs que vous avez spécifié comme étant à démarrer au démarrage (exemple les conteneurs de type `nginx` ou `mysql`).

## Sources

- [Docker - Installation](https://docs.docker.com/engine/install/debian/)
