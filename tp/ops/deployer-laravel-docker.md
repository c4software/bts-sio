---
description: Dans le TP Déployer Laravel nous avons vu comment déployer un site Laravel directement sur la machine. Cette fois-ci nous allons voir comment le faire avec Docker.
---

# Déployer un site Laravel avec Docker

Dans le TP [Déployer Laravel](./deployer-laravel.md) nous avons vu comment déployer un site Laravel directement sur la machine. Cette fois-ci nous allons voir comment le faire avec Docker.

::: tip Docker ?
Vous débutez avec Docker ? Je vous conseille plutôt de [démarrer par ici](../docker/introduction.md)
:::

::: details Sommaire
[[toc]]
:::

::: details TL;DR

Vous êtes pressé ? Vous ne voulez pas lire ? 

Installation de Docker sur votre serveur :

```sh
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

Création de votre fichier `Dockerfile` :

```dockerfile
FROM webdevops/php-nginx:8.3-alpine

# Installation dans votre Image du minimum pour que Docker fonctionne
RUN apk add oniguruma-dev libxml2-dev
RUN docker-php-ext-install \
        bcmath \
        ctype \
        fileinfo \
        mbstring \
        pdo_mysql \
        xml

# Installation dans votre image de Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Installation dans votre image de NodeJS
RUN apk add nodejs npm

ENV WEB_DOCUMENT_ROOT /app/public
ENV APP_ENV production
WORKDIR /app
COPY . .

# On copie le fichier .env.example pour le renommer en .env
# Vous pouvez modifier le .env.example pour indiquer la configuration de votre site pour la production
RUN cp -n .env.example .env

# Installation et configuration de votre site pour la production
# https://laravel.com/docs/10.x/deployment#optimizing-configuration-loading
RUN composer install --no-interaction --optimize-autoloader --no-dev
# Generate security key
RUN php artisan key:generate
# Optimizing Configuration loading
RUN php artisan config:cache
# Optimizing Route loading
RUN php artisan route:cache
# Optimizing View loading
RUN php artisan view:cache

# Compilation des assets de Breeze (ou de votre site)
RUN npm install
RUN npm run build

RUN chown -R application:application .
```

Création de votre fichier `docker-compose.yaml` :

```yaml
version: "3.9"
services:
  web:
    build: .
    restart: unless-stopped
    ports:
      - "8080:80"
  db:
    image: mariadb:11.3
    restart: unless-stopped
    ports:
      - "3306:3306"
    environment:
      MARIADB_DATABASE: demo
      MARIADB_USER: demo
      MARIADB_PASSWORD: demo
      MARIADB_ROOT_PASSWORD: root
    volumes:
      - ./data/db:/var/lib/mysql
```

Déploiement de votre site :

```sh
docker compose up -d
```

:::

## Avant-propos

Docker c'est simple ! Les étapes peuvent paraître effrayante, mais non. Pour vous le prouver, voilà une vidéo de la procédure entière (2min top chrono de la création du projet à la mise à disposition sur votre machine) :

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/l6vrilZQ7G4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Votre site Web

Pour tester (et pour être certains d'avoir un projet propre), nous allons créer un nouveau projet. Mais bien évidemment, dans votre cas, vous utiliserez **vos sources** / **votre projet.**

```sh
composer create-project laravel/laravel demo
cd demo
php artisan serve
```

Rendez-vous sur [http://localhost:8000](http://localhost:8000) votre site doit fonctionner correctement.

## Dockeriser votre application

Maintenant que vous avez validé que votre application fonctionne correctement, nous allons la Dockeriser… La Dockeriser signifie finalement que nous allons la Packager pour pouvoir la déployer sur n'importe quel serveur sans avoir à y installer autre chose que `Docker`.

### Créer le Dockerfile

Dockeriser une application requiert un nouveau fichier dans votre code source. Celui-ci doit se nommer `Dockerfile` je vous laisse créer à la racine de votre site (au même endroit que le `.env`) un fichier nommé `Dockerfile` avec comme contenu :

```dockerfile
FROM webdevops/php-nginx:8.3-alpine

# Installation dans votre Image du minimum pour que Docker fonctionne
RUN apk add oniguruma-dev libxml2-dev
RUN docker-php-ext-install \
        bcmath \
        ctype \
        fileinfo \
        mbstring \
        pdo_mysql \
        xml

# Installation dans votre image de Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Installation dans votre image de NodeJS
RUN apk add nodejs npm

ENV WEB_DOCUMENT_ROOT /app/public
ENV APP_ENV production
WORKDIR /app
COPY . .

# On copie le fichier .env.example pour le renommer en .env
# Vous pouvez modifier le .env.example pour indiquer la configuration de votre site pour la production
RUN cp -n .env.example .env

# Installation et configuration de votre site pour la production
# https://laravel.com/docs/10.x/deployment#optimizing-configuration-loading
RUN composer install --no-interaction --optimize-autoloader --no-dev
# Generate security key
RUN php artisan key:generate
# Optimizing Configuration loading
RUN php artisan config:cache
# Optimizing Route loading
RUN php artisan route:cache
# Optimizing View loading
RUN php artisan view:cache

# Compilation des assets de Breeze (ou de votre site)
RUN npm install
RUN npm run build

RUN chown -R application:application .
```

::: tip Dockerfile ?

Ce fichier contient l'ensemble de la configuration pour que Laravel fonctionne correctement. Il est en quelque sorte **générique** et pourra servir, quel que soit votre projet.

C'est donc un outil très très pratique surtout avec ce que l'on appelle des plateformes d'intégration continue avec par exemple **Gitlab-CI**.

**Attention, ce fichier doit être placé à la racine de votre projet, au même niveau que le `.env`.**

:::

::: danger le .env

Vous vous souvenez du `.env` ? Ici nous allons avoir le même problème. Dans le fichier `Dockerfile` je me sers du `.env.example` comme référence de configuration.

Je vous laisse adapter / modifier celui-ci pour **indiquer la bonne configuration de votre projet pour la production**.

:::

### Compiler une première fois votre image

Maintenant que nous avons configuré notre fichier Dockerfile, nous allons tenter de la compiler une première fois pour valider son bon fonctionnement.

L'image que vous allez créer sera identique à ce que vous déploierez à la fin sur votre serveur. Vous pouvez donc tester l'ensemble des fonctionnalités.

Pour compiler une première version de votre application, ça va se passer dans le terminal, dans le dossier où vous avez créé le fichier `Dockerfile`

```sh
docker build -t test-laravel:latest .
```

::: danger C'est long ?

Cette étape est un peu longue, c'est normal, votre machine créer en quelque sorte votre machine. Mais rassurez vous l'objectif final c'est que vous ne fassiez plus cette action.

Pourquoi ? Et bien l'objectif c'est que cette étape soit automatisée :

- À chaque fois que vous commitiez.
- Et faite sur un serveur distant de Gitlab-CI.

:::

Que fait cette commande ?

Cette commande va créer votre image, c'est-à-dire que votre machine va créer un conteneur qui sera paramétré avec l'ensemble de la configuration que vous avez indiquée dans votre fichier `Dockerfile`.

C'est comme une sorte de template réutilisable.

PS: Je vous laisse observer ce que fait votre terminal !

Sur ma machine :

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/CB2l0cYkRJM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Lancer votre image pour tester

Maintenant que vous avez créé votre image, vous pouvez la lancer pour tester que tout fonctionne correctement.

```sh
docker run -p 8080:80 test-laravel:latest
```

Qu'avons nous dans cette commande ?

- `docker run` : C'est la commande qui permet de lancer un conteneur.
- `-p 8080:80` : C'est l'option qui permet de dire que le port `8080` de votre machine sera redirigé vers le port `80` du conteneur.
- `test-laravel:latest` : C'est le nom de l'image que vous avez créée.

Cette commande permet de tester rapidement votre image, c'est pratique ça va vite, mais nous allons voir comment faire mieux. Pour le moment, vous pouvez tester votre site sur [http://localhost:8080](http://localhost:8080).

Pour la suite, nous allons utiliser Docker Compose. C'est un outil qui permet de définir l'ensemble de la configuration de votre application dans un fichier. C'est un peu comme le `Dockerfile` mais en plus complet.

## Docker Compose : prêt à déployer sur votre serveur

Vous avez maintenant « un serveur » qui fonctionne, nous allons ajouter un fichier nommé qui sera utilisé par Docker Compose, cette configuration au format YAML.

Docker Compose vas nous permet de créer de véritable environnement multiconteneur, dans notre cas pour l'instant nous n'aurons que Laravel, mais qui peux le plus peux le moins.

Je vous laisse créer (dans le même dossier que le `Dockerfile`) un fichier nommé `docker-compose.yaml`, pour le contenu le voilà :

```dockerfile
version: "3.9"
services:
  web:
    build: .
    restart: unless-stopped
    ports:
      - "8080:80"
```

Ce fichier indique que vous avez :

- **Un** service.
- Qui expose un port le **8080**. (accessible sur `http://votre.ip:8080`)
- Qui (re)démarrera automatiquement au démarrage de le votre serveur.

::: tip Un instant ?

À votre avis :

- Quelles autres options avez-vous à votre disposition pour le restart ? [C'est par ici.](https://docs.docker.com/config/containers/start-containers-automatically/)
- À quoi correspond "8080:80" ? Pourquoi avons-nous un `80` alors que le site est disponible sur le `8080` ?
- Est-il possible de déclarer plusieurs services ? [C'est par ici.](https://docs.docker.com/compose/compose-file/)

:::

### Tester

Pour tester, c'est encore plus simple !

```sh
docker compose up
```

Patientez quelques instants et votre site sera disponible sur le port [http://localhost:8080](http://localhost:8080).

::: tip C'est ce fichier…

Ce fichier est celui qui nous permettra de lancer facilement votre site sur votre serveur 👌

:::

![Lancement Docker](./img/lancement-docker.png)
![Lancement navigateur](./img/lancement-navigateur.png)


### Ajouter une base de données

Et si nous ajoutions une base de données ? Et bien aucun problème, il suffit d'ajouter un service dans le fichier `docker-compose.yaml` :

```yaml
version: "3.9"
services:
  web:
    build: .
    restart: unless-stopped
    ports:
      - "8080:80"
  db:
    image: mariadb:11.3
    restart: unless-stopped
    ports:
      - "3306:3306"
    environment:
      MARIADB_DATABASE: demo
      MARIADB_USER: demo
      MARIADB_PASSWORD: demo
      MARIADB_ROOT_PASSWORD: root
    volumes:
      - ./data/db:/var/lib/mysql
```

Nous avons maintenant deux services :

- `web` : C'est notre site Laravel.
- `db` : C'est notre base de données.

Pour le moment, nous n'avons pas encore configuré Laravel pour utiliser cette base de données. Si vous souhaitez tester, il faut modifier le fichier `.env` de votre site pour utiliser les informations de connexion de la base de données.

::: tip Le fichier .env

Ici, nous allons donc devoir modifier le `.env.example` pour indiquer la configuration de votre site pour la production. Dans le cas de la base de données, il faut modifier les informations suivantes :

```txt
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=demo
DB_USERNAME=demo
DB_PASSWORD=demo
```

Pourquoi ? Et bien parce que le service `db` est accessible sur le port `3306` et que son nom est `db`. C'est ce que nous avons indiqué dans le fichier `docker-compose.yaml`.

:::

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
mkdir -m 0755 -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update la liste des packages et installation de Docker
apt update
apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
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
docker compose up -d
```

::: tip Un instant !

À votre avis ?

- Pouvez-vous modifier le port d'écoute de votre serveur ? (oui, dans le, `docker-compose.yml` mais comment ?)
- Est-ce que votre service va démarrer automatiquement si vous redémarrez votre machine ?

:::

## Mettre à jour votre site

Pour mettre à jour votre site, il vous suffit :

- Envoyer le code source sur votre serveur (ftp, sftp, git au choix).
- Lancer la commande :

```sh
docker compose up --build -d
```

## C'est à vous

Je vous laisse ajouter une nouvelle page dans votre site. Une page avec les Conditions générales pas exemple. Une fois cette page ajoutée, je vous laisse la mettre en ligne sur votre serveur.

## La suite ?

La suite est peut-être l'automatisation du déploiement de votre site en utilisant [Dokploy par exemple](/tp/devops/paas/dokploy.md). L'objectif est de ne plus avoir à lancer la commande `docker compose up -d` à chaque fois que vous mettez à jour votre site.

Je vous laisse consulter le TP [Dokploy](/tp/devops/paas/dokploy.md) pour en savoir plus.