---
description: "Docker est un outil qui permet de déployer des applications dans des conteneurs, dans ce TP nous allons voir comment déployer une application dans un conteneur Docker sur un serveur."
---

# Déployer Docker sur un serveur

::: details Sommaire
[[toc]]
:::

## Objectifs

Dans ce TP nous allons voir comment utiliser Docker sur un serveur pour rendre une application disponible sur le réseau.

Il est possible de travailler de plusieurs façons différentes avec Docker :

- Utiliser une image Docker disponible sur le Docker Hub (exemple Mysql).
- Créer une image Docker à partir d'un Dockerfile.
- Utiliser une image générique (type PHP), et la personnaliser grâce à un volume.
- Construire une image Docker via l'intégration continue (CI/CD), avec Gitlab par exemple pour la déployer sur un serveur.

::: tip Et en entreprise ?
Ici il s'agit d'une introduction à Docker, nous allons donc rester simples. Mais dans la vraie vie, nous réalisons le plus souvent la construction d'une image Docker via l'intégration continue (CI/CD), avec Gitlab par exemple pour la déployer sur un serveur.
:::

## Préparer votre serveur

La première étape est de préparer votre serveur. Pour cela, vous devez :

- Créer une machine virtuelle Debian 11.5.0 (64 bits) avec 2Go de RAM et 20Go de disque. (Vous pouvez utiliser le modèle [Debian 11](/tp/devops/serveur/tp1alt.md) pour créer votre machine virtuelle).
- Ajouter les dépôts de Docker sur votre machine virtuelle.

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
```

Ici nous ajoutons les dépôts de Docker sur notre machine virtuelle.

::: tip D'où viennent ces commandes ?

Ces commandes sont tirées de la documentation officielle de Docker : [https://docs.docker.com/engine/install/debian/](https://docs.docker.com/engine/install/debian/). Et oui, comme dans le code, lire la documentation est une bonne pratique !

:::

## Installer Docker

Maintenant que nous avons ajouté les dépôts de Docker sur notre machine virtuelle, nous pouvons installer Docker.

```bash
apt update
apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
```

Nous installons ici Docker, Docker Compose, Docker Buildx et Docker Compose. Il s'agit de tous les outils nécessaires pour travailler avec Docker de manière simple. Rappel le `-y` permet de répondre automatiquement "oui" à toutes les questions.

À partir de maintenant, nous pouvons utiliser Docker sur notre machine virtuelle, par contre nous devons être connecté en tant que `root` pour pouvoir utiliser Docker. Pour éviter cela, nous allons ajouter notre utilisateur au groupe `docker`.

## Configurer Docker

Docker ne demande pas particulièrement de configuration, mais il est possible de configurer Docker pour qu'il fonctionne de manière optimale. Ce qui est intéressant avec Docker c'est que nous pouvons le configurer pour que celui-ci fonctionne avec notre utilisateur et non pas avec `root`.

Pour cela, nous allons ajouter notre utilisateur au groupe `docker`.

```bash
usermod -aG docker <user>
```

::: tip Vous devez être root
Rappel, pour ajouter un utilisateur au groupe `docker` vous devez être connecté en tant que `root`. Une fois que vous avez ajouté votre utilisateur au groupe `docker`, vous pouvez vous déconnecter et vous reconnecter avec votre utilisateur.
:::

## Vérifier que Docker fonctionne

Pour vérifier que Docker fonctionne, nous allons lancer un conteneur Docker.

```bash
docker run hello-world
```

Ce conteneur va nous afficher un message de bienvenue, et nous indiquer que Docker fonctionne correctement. C'est le cas ? Si oui, vous pouvez passer à la suite.

![Docker Hello World](./ressources/docker-hello-world.png)

## Lancer un serveur MySQL / MariaDB

Lancer un Hello World c'est bien, mais lancer un serveur MySQL c'est mieux. Nous allons donc voir comment lancer un serveur MySQL dans un conteneur Docker. Je vous rappelle que l'idée de docker est de pouvoir créer des conteneurs répétables, et donc de pouvoir lancer plusieurs fois le même conteneur.

Et même, plus que ça, nous pouvons lancer sur notre serveur plusieurs versions du même service, par exemple MySQL 5.7 et MySQL 8.0. Est-ce une bonne idée ? À vous d'en juger… mais c'est possible !

![Docker](./ressources/docker-containers.png)

::: tip Dans cette image
Dans cette image, vous pouvez voir comment fonctionne docker. Il s'agit de plusieurs petites applications (**cloisonnées**) qui vont fonctionner au-dessus de votre serveur. Ces applications sont appelées des **conteneurs**.
:::

### Choisir une version

Maintenant que votre environnement Docker est prêt, nous allons pouvoir lancer un serveur MariaDB. Pour cela, nous allons utiliser l'image Docker [MariaDB](https://hub.docker.com/_/mariadb).

::: tip Docker Hub ?

Pour faire simple, Docker Hub est un dépôt d'images Docker. Vous pouvez y trouver des images Docker pour toutes sortes de services. Vous pouvez également y publier vos propres images Docker. L'avantage du Docker Hub c'est que vous pouvez lancer un conteneur Docker en une seule commande, sans avoir à construire l'image Docker. De plus, certaines images (comme MariaDB) sont validées par Docker, ce qui garantit que l'image est sécurisée et fonctionnelle.

:::

Je vous propose de lancer la dernière version de MariaDB, nous allons donc utiliser l'image `mariadb:latest`. Vous pouvez également choisir une version spécifique, par exemple `mariadb:10.5`. Dans notre cas :

```bash
docker run -d --name mariadb -p 3306:3306 -v ~/mysql-data:/var/lib/mysql  --env MARIADB_USER=example-user --env MARIADB_PASSWORD=my_cool_secret --env MARIADB_ROOT_PASSWORD=my-secret-pw  mariadb:latest
```

Quelques explications sur cette commande :

- `docker run` : permet de lancer un conteneur Docker
- `-d` : permet de lancer le conteneur en mode détaché, c'est-à-dire que le conteneur va tourner en arrière plan
- `-p 3306:3306` : permet de définir un port de redirection. Dans notre cas, nous redirigeons le port `3306` de notre machine virtuelle vers le port `3306` du conteneur.
- `-v ./mysql-data:/var/lib/mysql` : permet de définir un volume. Dans notre cas, nous définissons un volume qui va permettre de sauvegarder les données de la base de données. Ce volume est lié au dossier `mysql-data` de notre machine virtuelle.
- `--name mariadb` : permet de donner un nom au conteneur
- `--env MARIADB_USER=example-user` : permet de définir une variable d'environnement pour le conteneur. Dans notre cas, nous définissons l'utilisateur de la base de données.
- `--env MARIADB_PASSWORD=my_cool_secret` : permet de définir une variable d'environnement pour le conteneur. Dans notre cas, nous définissons le mot de passe de l'utilisateur de la base de données.
- `MARIADB_ROOT_PASSWORD=my-secret-pw` : permet de définir une variable d'environnement pour le conteneur. Dans notre cas, nous définissons le mot de passe de l'utilisateur `root` de la base de données.
- `mariadb:latest` : permet de définir l'image Docker à utiliser pour le conteneur.

::: danger N'oubliez pas le mot de passe

N'oubliez pas de changer les mots de passe.

:::

### Les volumes

En cours nous avons vu qu'un conteneur Docker est dit `stateless`, c'est-à-dire qu'il sera supprimé à la fin de son utilisation. C'est bien, mais cela veut dire que nous allons perdre toutes les données de notre base de données à la fin de l'utilisation du conteneur.

Bien évidemment, nous ne voulons pas perdre nos données, nous allons donc utiliser un volume. Un volume est un dossier qui est lié à un conteneur Docker. Ce dossier est lié à un dossier de notre machine virtuelle. Ainsi, lorsque nous supprimons le conteneur, le dossier du volume est conservé. Lorsque nous relançons le conteneur, le dossier du volume est utilisé. Pratique, non ?

### Exposer le port 3306

Par défaut, le port 3306 n'est pas accessible. En effet, les conteneurs Docker sont isolés par défaut. Pour pouvoir accéder à notre base de données, nous allons donc devoir exposer le port 3306 de notre conteneur. C'est ce que nous faisons avec l'option `-p 3306:3306`.

Maintenant que votre conteneur est lancé, vous pouvez vous connecter à votre base de données. Pour cela, vous pouvez utiliser un client MySQL comme [DBeaver](https://dbeaver.io/) ou [DataGrip](https://www.jetbrains.com/fr-fr/datagrip/).

Et pourquoi pas PHPMyAdmin ? C'est possible, mais nous allons voir comment lancer un serveur PHP dans un conteneur Docker.

### Point étape !

Et voilà, vous avez maintenant un serveur de base de données. Celui-ci est équivalent à celui que vous auriez pu installer via les dépôts de votre distribution. La grande différence c'est que vous pouvez lancer plusieurs versions de MariaDB sur la même machine, et que vous pouvez lancer plusieurs conteneurs sur la même machine. Et surtout, nous pouvons choisir une version précise simplement, et sans même ajouter de dépôts sur notre serveur.

Autre avantage, avec docker, vous pouvez créer un environnement similaire entre votre machine de développement et votre serveur de production. Vous pouvez ainsi avoir une base de données identique sur votre machine de développement et sur votre serveur de production.

## Lancer un serveur Apache + PHP

Une base de données sans serveur web, c'est dommage… Regardons comment nous pouvons lancer un conteneur PHPMyAdmin grâce à Docker.

### Choisir une version

Comme pour MariaDB, nous allons nous rendre sur le Docker Hub pour trouver une image de PHPMyAdmin. Nous allons utiliser l'image [PHPMyAdmin](https://hub.docker.com/_/phpmyadmin).

### Lancer le conteneur

```bash
docker run -d --name phpmyadmin -d -p 8080:80 phpmyadmin
```

Quelques explications sur cette commande :

- `docker run` : permet de lancer un conteneur Docker
- `-d` : permet de lancer le conteneur en mode détaché, c'est-à-dire que le conteneur va tourner en arrière plan
- `-p 8080:80` : permet de définir un port de redirection. Dans notre cas, nous redirigeons le port `8080` de notre machine virtuelle vers le port `80` du conteneur.
- `--name phpmyadmin` : permet de donner un nom au conteneur
- `phpmyadmin` : permet de définir l'image Docker à utiliser pour le conteneur.

Je vous laisse tester le serveur PHPMyAdmin en vous connectant à l'adresse `http://<ip.de.votre.serveur>:8080`.

## Créer un docker compose pour lancer les deux serveurs

Nous avons vu comment lancer un conteneur Docker de manière unitaire, c'est pratique, mais ce que nous voulons c'est lancer un ensemble de conteneurs Docker. L'objectif étant de créer une architecture, que nous pourrons lancer très rapidement, et qui sera répétable.

### Arrêter les conteneurs précédents

Dans un premier temps je vous propose d'arrêter l'ensemble de conteneurs que nous avons lancé précédemment.

```bash
# Arrêt des conteneurs
docker stop phpmyadmin mariadb

# Suppression
docker rm phpmyadmin mariadb
```

### Créer un fichier docker-compose.yml

Dans le dossier de votre choix, je vous laisse créer un fichier `docker-compose.yml`. Ce fichier va nous permettre de définir l'ensemble des conteneurs que nous allons lancer.

```bash
nano docker-compose.yml
```

Nous allons maintenant définir l'ensemble des conteneurs que nous allons lancer. Pour cela, nous allons utiliser la syntaxe YAML.

```yaml
version: '3.7'

services:
  mariadb:
    image: mariadb:latest
    container_name: mariadb
    restart: always
    environment:
      - MARIADB_USER=example-user
      - MARIADB_PASSWORD=my_cool_secret
      - MARIADB_ROOT_PASSWORD=my-secret-pw
    volumes:
      - ~/mysql-data:/var/lib/mysql
    ports:
      - 3306:3306

  phpmyadmin:
    image: phpmyadmin
    container_name: phpmyadmin
    restart: always
    environment:
      - PMA_HOST=mariadb
      - PMA_PORT=3306
    ports:
      - 8080:80
    depends_on:
      - mariadb
```

Je vous propose de regarder le fichier `docker-compose.yml` ligne par ligne, nous allons le faire ensemble.

### Lancer votre stack

Maintenant que nous avons défini notre stack, nous allons pouvoir la lancer.

```bash
docker-compose up -d
```

### Les logs

Comme pour un serveur classique, nous pouvons consulter les logs de nos conteneurs.

```bash
docker-compose logs -f
```

Cette commande va nous permettre de consulter les logs de nos conteneurs. Nous pouvons également consulter les logs d'un conteneur en particulier.

```bash
docker-compose logs -f mariadb
```

### Arrêter la stack

Pour arrêter la stack, nous allons utiliser la commande `docker-compose down`.

```bash
docker-compose down
```

## C'est à vous, le cas de Redmine

En reprenant le fonctionnement précédent, je vous propose de créer un nouveau service sur votre serveur. Celui-ci devra être un serveur Redmine. Je vous laisse chercher comment faire. Une piste :

- [Redmine](https://hub.docker.com/_/redmine)

## Un autre exemple

Redmine, ce n’est pas forcément très fun… Je vous propose de partir sur un autre usage de Docker, nous allons créer un [`emulatorjs`](https://docs.linuxserver.io/images/docker-emulatorjs).

### Créer un fichier docker-compose.yml

```yaml
---
version: "2.1"
services:
  emulatorjs:
    image: lscr.io/linuxserver/emulatorjs:latest
    container_name: emulatorjs
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Etc/UTC
      - SUBFOLDER=/ #optional
    volumes:
      - ~/emulatorjs-config:/config
      - ~/emulatorjs-data:/data
    ports:
      - 3000:3000
      - 9090:80
    restart: unless-stopped
```

Je vous laisse regarder et tester le serveur.

## Apache + PHP + MySQL

Nous allons maintenant créer un serveur Apache + PHP + MySQL. Pour ça je vous propose de tenter le déploiement du projet suivant :

[Stack applicatif type AP](https://gitlab.com/bts-sio-chevrollier/demo-docker-compose)

1. Récupérer le projet sur votre serveur.
2. Lancer le projet avec la commande `docker-compose up -d`.

Je vous laisse regarder le fichier `docker-compose.yml` et le fichier `Dockerfile` pour comprendre comment fonctionne ce projet.

## Conclusion

Dans ce TP nous avons vu comment Docker facilite la mise en place d'un serveur sur une machine. Nous avons vu comment Docker permet de créer rapidement des infrastructures répétables, et ce quelques soit la version, la configuration, ou l'OS de la machine.

Nous avons vu également comment Docker Compose permet de lancer plusieurs conteneurs en même temps, et de les lier entre eux (exemple : un serveur MySQL et un serveur PHP).