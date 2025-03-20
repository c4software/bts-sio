---
description: Nous l'avons vu en cours, utiliser Laravel permet de gagner du temps lors de la création du site / solution. Déployer un site Laravel est assez similaire à ce que vous connaissez déjà, cependant il y aura quelques exceptions.
---

# Déployer un site Laravel

Nous l'avons vu en cours, utiliser Laravel permet de gagner du temps lors de la création du site / solution. Déployer un site Laravel est assez similaire à ce que vous connaissez déjà, cependant il y aura quelques exceptions.

::: tip TP prévu pour Debian

Le TP est axé sur Debian, mais il devrait fonctionner avec la plupart des distributions.

:::

::: details Sommaire
[[toc]]
:::

## Apache

Première étape (si vous ne l'avez pas déjà) est d'installer Apache :

```sh
apt-get install apache2 -y
```

## PHP 8

Pour faire du Laravel vous devez avoir une version récente de PHP, de base Debian arrive avec une version relativement ancienne de PHP à savoir PHP 7.3 (et des bananes).

Pour ça nous allons avoir besoin d'un dépôt externe, celui-ci contiendra la dernière version de PHP.

```sh
# Installation des dépendances nécessaires à l'ajout d'un dépôt
apt-get install lsb-release wget apt-transport-https gnupg2 ca-certificates -y

# Ajout du dépôt Sury
wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
sh -c 'echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list'

# Ajout de PHP et des dépendances nécessaire au bon fonctionnement de Mini MVC Sample
apt-get update -y
apt-get install apache2 php8.4 php8.4-fpm php8.4-cli php8.4-{bz2,curl,mbstring,intl,pdo,mysql,gd,zip,xml} unzip zip -y

# Activer PHP dans Apache
a2enmod proxy_fcgi setenvif rewrite headers
a2enconf php8.4-fpm

# Active  Apache
systemctl restart apache2
systemctl enable apache2   

# Active la réécriture d'URL nécessaire pour Mini MVC Sample
/usr/sbin/a2enmod rewrite
```

::: tip PHP-FPM ?

PHP-FPM est la nouvelle façon de faire fonctionner PHP sur un serveur. Il a plusieurs avantages :

- Performances accrues.
- Moins de ressources utilisées.
- Permet de faire tourner plusieurs versions de PHP en même temps.
- Rechargement de la configuration sans redémarrage du serveur.

:::

Et voilà, nous avons la base, votre serveur est prêt à recevoir votre code ! Avant de continuer, vérifiez avec la commande suivante que votre version de PHP est au moins égale à `8`.

```sh
php -v
```

Exemple dans mon cas :

```sh
PHP 8.4 (cli) (built: Feb 15 2025 00:18:01) (NTS)
Copyright (c) The PHP Group
Zend Engine v4.2.3, Copyright (c) Zend Technologies
    with Zend OPcache v8.2.3, Copyright (c), by Zend Technologies
```

::: tip Un instant !

- D'où viennent ces commande ?
- Devez-vous ? Pouvez-vous me faire confiance et les copiez-collez directement ?

:::

## Composer

Nous l'avons vu en cours, de base un projet Laravel arrive sans aucune dépendance, il faut les installer avec Composer. Votre serveur va donc également devoir avoir `Composer`. Pour l'installer :

```sh
# Téléchargement de composer.
curl -sS https://getcomposer.org/installer | php

# Installation de composer pour qu'il soit accessible de partout.
mv composer.phar /usr/local/bin/composer
chmod +x /usr/local/bin/composer
```

::: tip Vous avez tout ce qu'il vous faut !
Votre serveur est maintenant prêt ! Il ne nous reste plus qu'à :

- Mettre les sources sur le serveur
- Configurer Apache pour indiquer où son vos sources.

:::

::: tip Un instant !

- Pourquoi ai-je choisi de passer par l'installation hors de `apt-get` ?
- Selon vous, pourquoi est-ce que ça pourrait-être une mauvaise idée ?

:::

## Installer votre site

Pour installer votre site, nous avons deux solutions :

- Utiliser un FTP (ou un sftp) et déposer votre code source dans `/var/www/html/votresite/`.
- Cloner le code source avec Git dans le dossier `/var/www/html/`

Cloner ou FTP ? Vous avez le choix !?

Une fois le code déposé sur le serveur :

```sh
cd /var/www/html/votresite/
composer install --no-interaction --optimize-autoloader --no-dev

chown -R www-data:www-data /var/www/html/votresite
chmod -R 775 /var/www/html/votresite
```

::: danger n'oubliez pas le `.env`

N'oubliez pas pour que votre site fonctionne correctement, vous **devez avoir un `.env`** correctement configuré avec :

- Vos identifiants de la base de données (et le serveur).
- Une clé permettant de protéger vos COOKIES `php artisan key:generate`.

:::

::: tip Un instant !

- Avez-vous déjà cherché la différence entre FTP ou SFTP ?
- Je pense qu'il serait plus intéressant de passer par GIT, pourquoi selon vous ?

:::

## Configurer Apache

La dernière étape est la configuration du serveur Apache, habituellement déposer les sources suffit à faire fonctionner un site Internet avec Laravel nous allons avoir une étape supplémentaire :

Pour ça :

```sh
nano /etc/apache2/sites-available/000-default.conf
```

Dans le fichier en question vous devez :

### 1 - **Changer** / **Modifier** le `DocumentRoot` par :

```txt
# Change l'emplacement où les sources seront chargées
# Laravel possède un dossier public avec dedans un index.php qui
# contient la logique de chargement de VOTRE CODE SOURCE.
# C'est l'équivalent du php artisan serve en quelque sorte
DocumentRoot /var/www/html/votresite/public
```

### 2 - Ajouter **dans** la configuration du `VirtualHost` :

```txt
# Autorise l'exécution des fichiers .htaccess dans votre site.
<Directory /var/www/html/votresite>
    AllowOverride All
</Directory>
```

**Cette partie est importante, elle permet d'activer la réécriture d'URL nécessaire pour Laravel.**, il faut l'ajouter dans la configuration du `VirtualHost` (entre les balises `<VirtualHost>` et `</VirtualHost>`).


::: details Un exemple du résultat

Dans mon cas voilà le résultat :

```txt
<VirtualHost *:80>
    ServerAdmin admin@example.com
    DocumentRoot /var/www/html/votresite/public

    <Directory /var/www/html/votresite>
        AllowOverride all
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

:::

::: tip Un Instant !

Comprendre la configuration c'est important, c'est une partie importante de votre métier (et ça fait partie de la sécurité).

- Comment comprendre ce que vous avez configuré ? [Vous avez de la chance la documentation est en Français](https://httpd.apache.org/docs/2.4/configuring.html)
- Pourquoi vous devez faire attention à ce que vous copiez/collez ?

:::

### 3 - Redémarrer votre serveur Apache

```sh
systemctl restart apache2
```

## NodeJS

### 1 - Installer NodeJS

Si vous avez utilisé Breeze, il vous faudra installer NodeJS pour pouvoir compiler les assets.

```sh
curl -sL https://deb.nodesource.com/setup_20.x | bash -
apt update
apt install -y nodejs
```

### 2 - Compiler les assets

Cette étape va permettre de compiler les assets (CSS, JS, etc.) de votre site pour qu'ils soient utilisables par le navigateur.

```sh
cd /var/www/html/votresite
npm install
npm run build
```

## Profit !

Voilà ! Votre site est maintenant fonctionnel sur votre serveur.

Félicitation !

<center>
<iframe src="https://giphy.com/embed/NEvPzZ8bd1V4Y" width="459" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
</center>
