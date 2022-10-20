---
description: Un petit TP/Guide rapide pour créer installer et configurer un serveur Apache afin d'y déployer Mini MVC Sample.
---

# Déployer mini-mvc-sample sur Apache

Un petit TP/Guide rapide pour créer installer et configurer un serveur Apache afin d'y déployer Mini MVC Sample. Déployer un site Mini MVC Sample est assez similaire à ce que vous connaissez déjà, cependant il y aura quelques exceptions.

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

Vous devez avoir une version récente de PHP, de base Debian arrive avec une version relativement ancienne de PHP à savoir PHP 7.3 (et des bananes). Pour ça nous allons avoir besoin d'un dépôt externe, celui-ci contiendra la dernière version de PHP.

```sh
# Installation des dépendances nécessaires à l'ajout d'un dépôt
apt-get install lsb-release wget apt-transport-https gnupg2 ca-certificates -y
```

```sh
# Ajout du dépôt Sury
wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
sh -c 'echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list'
```

```sh
# Ajout de PHP et des dépendances nécessaire au bon fonctionnement de Mini MVC Sample
apt-get update -y
apt-get install libapache2-mod-php php php-common php-xml php-gd php8.0-opcache php-mbstring php-tokenizer php-json php-bcmath php-zip unzip curl -y

# Active la réécriture d'URL nécessaire pour Mini MVC Sample
/usr/sbin/a2enmod rewrite
```

Et voilà, nous avons la base, votre serveur est prêt à recevoir votre code ! Avant de continuer, vérifiez avec la commande suivante que votre version de PHP est au moins égale à `8`.

```sh
php -v
```

Exemple dans mon cas :

```sh
PHP 8.1.11 (cli) (built: Sep 29 2022 22:17:15) (NTS)
Copyright (c) The PHP Group
Zend Engine v4.1.11, Copyright (c) Zend Technologies
    with Zend OPcache v8.1.11, Copyright (c), by Zend Technologies
```

::: tip Un instant !

- D'où viennent ces commande ?
- Devez-vous ? Pouvez-vous me faire confiance et les copiez-collez directement ?

:::

## Installer votre site

Pour installer votre site, nous avons deux solutions :

- Utiliser un FTP (ou un sftp) et déposer votre code source dans `/var/www/html/votresite/`.
- Cloner le code source avec Git dans le dossier `/var/www/html/votresite/`

Cloner ou FTP ? Vous avez le choix !?

::: tip Un instant !

- Avez-vous déjà cherché la différence entre FTP ou SFTP ?
- Je pense qu'il serait plus intéressant de passer par GIT, pourquoi selon vous ?

:::

## Configurer Apache

La dernière étape est la configuration du serveur Apache, habituellement déposer les sources suffit à faire fonctionner un site Internet avec Mini MVC Sample nous allons avoir une étape supplémentaire :

Pour ça :

```sh
nano /etc/apache2/sites-available/000-default.conf
```

Dans le fichier en question vous devez :

### 1 - **Changer** / **Modifier** le `DocumentRoot` par :

```apacheconf
DocumentRoot /var/www/html/votresite
```

### 2 - Ajouter **dans** la configuration du `VirtualHost` :

```apacheconf
# Autorise l'exécution des fichiers .htaccess dans votre site.
<Directory /var/www/html/votresite>
    AllowOverride All
</Directory>
```

::: details Un exemple du résultat

Dans mon cas voilà le résultat :

```apacheconf
<VirtualHost *:80>
    ServerAdmin admin@example.com
    DocumentRoot /var/www/html/votresite

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

### 4 - Profit !

Voilà ! Votre site est maintenant fonctionnel sur votre serveur.

Félicitation !

<center>
<iframe src="https://giphy.com/embed/NEvPzZ8bd1V4Y" width="459" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
</center>
