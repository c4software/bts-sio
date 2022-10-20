---
description: Déployer Mini-MVC-Sample avec Docker
---

# Déployer un site Mini-MVC-Sample avec Docker

Dans le TP [Déployer Mini MVC Sample](./deployer-mini-mvc-sample.md) nous avons vu comment déployer un site Mini MVC Sample directement sur la machine. Cette fois-ci nous allons voir comment le faire avec Docker.

::: tip Docker ?
Vous débutez avec Docker ? Je vous conseille plutôt de [démarrer par ici](../../docker/introduction.md)
:::

::: details Sommaire
[[toc]]
:::

## Avant-propos

Docker c'est simple ! Les étapes peuvent paraitre effrayante, mais non. Pour vous le prouver, voilà une vidéo de la procédure entière (2min top chrono de la création du projet à la mise à disposition sur votre machine) :

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/CgEAJfltyuY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Votre site Web

Pour tester (et pour être certains d'avoir un projet propre), nous allons créer un nouveau projet. Mais bien évidemment, dans votre cas, vous utiliserez **vos sources** / **votre projet.**

[Télécharger un projet de démo](https://github.com/c4software/mini-mvc-sample/archive/refs/tags/2.3.zip)

```sh
php mvc serve
```

Rendez-vous sur [http://localhost:9000](http://localhost:9000) votre site doit fonctionner correctement.

## Dockeriser votre application

Maintenant que vous avez validé que votre application fonctionne correctement, nous allons la Dockeriser… La Dockeriser signifie finalement que nous allons la Packager pour pouvoir la déployer sur n'importe quel serveur sans avoir à y installer autre chose que `Docker`.

### Créer le Dockerfile

Dockeriser une application requiert un nouveau fichier dans votre code source. Celui-ci doit se nommer `Dockerfile` je vous laisse créer à la racine de votre site (au même endroit que le `.env`) un fichier nommé `Dockerfile` avec comme contenu :

```dockerfile
FROM php:8.1.10-cli
RUN docker-php-ext-install pdo_mysql
WORKDIR /var/www/html
```

::: tip Dockerfile ?

Ce fichier contient l'ensemble de la configuration pour que Mini-MVC-Sample fonctionne correctement. Il est en quelque sorte **générique** et pourra servir, quel que soit votre projet.

C'est donc un outil très très pratique surtout avec ce que l'on appelle des plateformes d'intégration continue avec par exemple **Gitlab-CI**.

:::

## Docker Compose : prêt à déployer sur votre serveur

Vous avez maintenant « un serveur » qui fonctionne, nous allons ajouter un fichier nommé qui sera utilisé par Docker Compose, cette configuration au format YAML.

Docker Compose vas nous permet de créer de véritable environnement multi conteneur, dans notre cas pour l'instant nous n'aurons que Mini-MVC-Sample, mais qui peux le plus peux le moins.

Je vous laisse créer (dans le même dossier que le `Dockerfile`) un fichier nommé `docker-compose.yaml`, pour le contenu le voilà :

```dockerfile
version: '3'

services:
  front:
    build: .
    container_name: front
    environment:
      - MVC_SERVER=192.168.139.1
      - MVC_DB=AP3_BD_HACKATHON_INITIAL
      - MVC_USER=VOTRE-UTILISATEUR-DE-BASE-DE-DONNEE
      - MVC_TOKEN=VOTRE-MOT-DE-PASSE
      - MVC_DEBUG=false
    command: php -S 0.0.0.0:9000
    volumes:
      - .:/var/www/html/
    restart: unless-stopped
    ports:
    - "8080:9000"
```

Ce fichier indique que vous avez :

- **Un** service.
- Qui expose un port le **8080**. (accessible sur `http://votre.ip:8080`)
- Qui (re)démarrera automatiquement au démarrage de le votre serveur.

::: tip Un instant ?

À votre avis :

- Quelles autres options avez vous à votre disposition pour le restart ? [C'est par ici](https://docs.docker.com/config/containers/start-containers-automatically/)
- À quoi correspond "8080:80" ? Pourquoi avons-nous un `80` alors que le site est disponible sur le `8080` ?
- Est-il possible de déclarer plusieurs services ? [C'est par ici](https://docs.docker.com/compose/compose-file/)

:::

### Tester

Pour tester, c'est encore plus simple !

```sh
docker-compose up
```

Patientez quelques instants et votre site sera disponible sur le port [http://localhost:8080](http://localhost:8080).

## Installer Docker sur votre serveur Debian

La procédure est assez similaire à l'installation d'un package classique :

```sh
# Ajout des éléments nécessaire à l'installation
apt-get update
apt-get -y install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Ajout du dépôt permettant d'installer Docker
curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update la liste des packages et installation de Docker
apt-get update
apt-get -y install docker-ce docker-ce-cli containerd.io

# Installation de docker Compose
curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

**Félicitation,** vous avez maintenant Docker sur votre Serveur.

::: tip Un Instant !

À votre avis :

- D'où viennent ces commandes ? [Des informations](https://docs.docker.com/engine/install/debian/)
- Pourquoi vous devez être vigilant quand vous copiez/collez des commandes ?

:::

## Déployer votre site

Pour déployer votre site, il vous suffit :

- Envoyer le code source sur votre serveur (ftp, sftp, git au choix).
- Lancer la commande :

```sh
docker-compose up -d
```

::: tip Un instant !

À votre avis ?

- Pouvez-vous modifier le port d'écoute de votre serveur ? (oui, dans le `docker-compose.yml` mais comment ?)
- Est-ce que votre service va démarrer automatiquement si vous redémarrez votre machine ?

:::

## Mettre à jour votre site

Pour mettre à jour votre site, il vous suffit :

- Envoyer le code source sur votre serveur (ftp, sftp, git au choix).
- Lancer la commande :

```sh
docker-compose restart
```

## C'est à vous

Je vous laisse ajouter une nouvelle page dans votre site. Une page avec les Conditions générales pas exemple. Une fois cette page ajoutée, je vous laisse la mettre en ligne sur votre serveur.
