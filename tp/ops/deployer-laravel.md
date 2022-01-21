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
# Installation des dépendances nécéssaires à l'ajout d'un dépot
apt-get install apt-transport-https gnupg2 ca-certificates -y
```

```sh
# Ajout du dépot Sury
wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
sh -c 'echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list'
```

```sh
# Ajout de PHP et des dépendances nécessaire au bon fonctionnement de Laravel
apt-get update -y
apt-get install libapache2-mod-php php php-common php-xml php-gd php8.0-opcache php-mbstring php-tokenizer php-json php-bcmath php-zip unzip curl -y

# Active la réécriture d'URL necessaire pour Laravel
/usr/sbin/a2enmod rewrite
```

Et voilà, nous avons la base, votre serveur est prêt à recevoir votre code ! Avant de continuer vérifier avec la commande suivante que votre version de PHP est au moins égale à `8`.

```sh
php -v
```

Exemple dans mon cas :

```sh
PHP 8.0.10 (cli) (built: Aug 26 2021 16:06:19) ( NTS )
Copyright (c) The PHP Group
Zend Engine v4.0.10, Copyright (c) Zend Technologies
    with Zend OPcache v8.0.10, Copyright (c), by Zend Technologies
```

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

## Installer votre site

Pour installer votre site, nous avons deux solutions :

- Utiliser un FTP (ou un sftp) et déposer votre code source dans `/var/www/html/votresite/`.
- Cloner le code source avec Git dans le dossier `/var/www/html/`

Cloner ou FTP ? Vous avez le choix !?

Une fois le code déposé sur le serveur :

```sh
cd /var/www/html/votresite/
composer install

chown -R www-data:www-data /var/www/html/votresite
chmod -R 775 /var/www/html/votresite
```

::: danger n'oubliez pas le `.env`

N'oubliez pas pour que votre site fonctionne correctement, vous **devez avoir un `.env`** correctement configuré avec :

- Vos identifiants de la base de données (et le serveur).
- Une clé permettant de protéger la SESSION `php artisan key:generate`.

:::

## Configurer Apache

La dernière étape est la configuration du serveur Apache, habituellement déposer les sources suffit à faire fonctionner un site Internet avec Laravel nous allons avoir une étape supplémentaire :

Pour ça :

```sh
nano /etc/apache2/sites-available/000-default.conf
```

Dans le fichier en question vous devez :

### 1 - **Changer** / **Modifier** le `DocumentRoot` par :

```apacheconf
# Change l'emplacement ou les sources seront chargé
# Laravel possede un dossier public avec dedans un index.php qui
# contient la logique de chargement de VOTRE CODE SOURCE.
# C'est l'equivalent du php artisan serve en quelque sorte
DocumentRoot /var/www/html/votresite/public
```

### 2 - Ajouter **dans** la configuration du `VirtualHost` :

```apacheconf
# Authorise l'execution des fichier .htaccess dans votre site.
<Directory /var/www/html/votresite>
    AllowOverride All
</Directory>
```

::: details Un exemple du résultat

Dans mon cas voilà le résultat :

```apacheconf
<VirtualHost *:80>
    ServerAdmin admin@example.com
    DocumentRoot /var/www/html/votresite/public

    <Directory /var/www/html/votresite>
    Options Indexes MultiViews
    AllowOverride None
    Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

:::

### 3 - Redémarrer votre serveur Apache

```sh
systemctl restart apache2
```

### 4 - Profit !

Voilà ! Votre site est maintenant fonctionnel sur votre serveur.

Félicitation !

<center>
<iframe src="https://giphy.com/embed/NEvPzZ8bd1V4Y" width="459" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
</center>
