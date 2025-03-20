---
description: "Aide mémoire pour installer un serveur LAMP (Web) à base de Debian."
---

# Créer un serveur LAMP / WEB (Apache, MariaDB, PHP) avec Debian

Dans cet aide mémoire vous trouverez l'ensemble des commandes et des opérations à réaliser pour installer un serveur LAMP (Web) à base de Debian.

::: tip Documents connexes :

- [Linux à base de Debian](./linux-debian-based.md)
- [Configurer le réseau](./debian-reseau.md)

:::

::: details Sommaire
[[toc]]
:::

::: details Vous souhaitez juste les commandes pour Apache + PHP ?

Voici la procédure de création de la partie PHP + Apache :

```bash
apt update
apt install wget lsb-release apt-transport-https gnupg2 ca-certificates -y
wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
sh -c 'echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list'

# Installer Apache + PHP
apt update
apt install curl zip open-vm-tools apache2 php8.4 php8.4-fpm php8.4-cli php8.4-{bz2,curl,mbstring,intl,pdo,mysql,gd,xml} -y

# Activer PHP dans Apache
a2enmod proxy_fcgi setenvif rewrite headers
a2enconf php8.4-fpm

systemctl restart apache2
systemctl enable apache2

# Vérifier la version de PHP
php -v

# Vérifier l'accès à Apache
curl -s --head http://localhost:80 | grep "HTTP/1.[01] [23].." && echo "Le serveur écoute bien sur le port 80." || echo "Aucun serveur en écoute sur le port 80."
```

:::

## Installer Apache

```bash
apt-get update
apt-get install apache2 -y
```

## Ajouter le dépôt pour PHP 8

```bash
apt-get update
apt-get install wget lsb-release apt-transport-https gnupg2 ca-certificates -y
wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
sh -c 'echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list'
```

::: tip Pourquoi ?
Debian est une distribution stable, mais stabilité ≠ modernité. Pour avoir la dernière version de PHP il nous faut ajouter un dépôt tiers. Ce dépôt est maintenu par Ondřej Surý, un développeur PHP qui travaille pour Debian.
:::

## Installer PHP

```bash
apt update
apt install zip php8.4 php8.4-fpm php8.4-cli php8.4-{bz2,curl,mbstring,intl,pdo,mysql,gd,xml}  -y
```

Démarrez le serveur Apache

```bash
a2enmod proxy_fcgi setenvif rewrite headers
a2enconf php8.4-fpm
systemctl restart apache2
systemctl enable apache2
```

### Vérifie la bonne installation

Et voilà, nous avons la base, votre serveur est prêt à recevoir votre code ! Avant de continuer, vérifiez avec la commande suivante que votre version de PHP est au moins égale à 8.

```bash
php -v
```

```bash
PHP 8.2.3 (cli) (built: Feb 15 2023 00:18:01) (NTS)
Copyright (c) The PHP Group
Zend Engine v4.2.3, Copyright (c) Zend Technologies
    with Zend OPcache v8.2.3, Copyright (c), by Zend Technologies
```

## Installer MariaDB

Évidemment vous n'êtes pas obligé d'installer MariaDB et Apache sur le même serveur. Vous pouvez très bien installer MariaDB sur un autre serveur et vous connecter à distance.

```bash
apt-get update
apt-get install mariadb-server mariadb-client -y
```

Démarrer le serveur MariaDB

```bash
systemctl enable mariadb
systemctl start mariadb
```

## Configurer la base de données

```bash
mysql_secure_installation
```

Cette commande va vous demander de choisir un mot de passe pour l'utilisateur root de la base de données. Elle nous permettra aussi de supprimer les utilisateurs anonymes, de désactiver l'accès à la base de données pour l'utilisateur root à distance et de supprimer la base de données de test.

::: danger Pourquoi est-ce important ?
La base de données est un point d'entrée très important pour votre serveur. Il est donc important de sécuriser l'accès à la base de données.
:::

## Autoriser l'accès au port 3306

Par défaut, le port 3306 est fermé sur Debian. Il faut donc l'ouvrir pour que les applications puissent se connecter à la base de données. La configuration se fait dans le fichier `/etc/mysql/mariadb.conf.d/50-server.cnf`.

```bash
nano /etc/mysql/mariadb.conf.d/50-server.cnf
```

Ajoutez la ligne suivante dans la section `[mysqld]`.

```ini
bind-address = 0.0.0.0
```

Redémarrer le serveur MySQL

```bash
systemctl restart mysql
```

::: tip Pourquoi ?
Par défaut, le serveur MySQL n'écoutera que les connexions locales. Il faut donc autoriser les connexions distantes en modifiant la valeur de `bind-address`. **Si vous n'en avez pas besoin, vous pouvez laisser la valeur par défaut.**

Changer se paramètre sera utile quand vous souhaiterez accéder à la base de données depuis un autre ordinateur (exemple développement en C#).
:::

## Activer la réécriture d'URL

Dans certains cas, il est nécessaire d'activer la réécriture d'URL pour que le serveur puisse fonctionner correctement.

```bash
/usr/sbin/a2enmod rewrite
```

Le module doit être activé dans le fichier de configuration de votre site.

```bash
nano /etc/apache2/sites-available/000-default.conf
```

Ajoutez la ligne suivante dans la section `<VirtualHost *:80>`.

```apache
<Directory /var/www/html>
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>
```

::: tip Rewrite ?
Plus tard nous utiliserons la réécriture d'URL pour personnaliser le lien indépendamment du nom des fichiers sur le disque. Pour faire simple grâce à l'URL Rewrite nous pouvons écrire des belles urls (liens) :

- `qui-sommes-nous.html` => `index.php?page=quisommesnous`
- `presentation.html` => `index.php?page=pres`

Ce ne sont évidemment que des exemples.

:::

## Les virtualHost

```bash
nano /etc/apache2/sites-available/votre-virtual-host.conf
```

```apache
<VirtualHost *:9090>
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/html/votre-dossier

    <Directory /var/www/html/votre-dossier>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

Activer un virtual host :

```bash
a2ensite votre-virtual-host
```

Désactiver un virtual host :

```bash
a2dissite votre-virtual-host
```

## Installer PhpMyAdmin

Pour installer phpMyAdmin, vous pouvez utiliser la commande suivante :

```bash
apt install unzip
cd /var/www/html
wget https://files.phpmyadmin.net/phpMyAdmin/5.2.0/phpMyAdmin-5.2.0-all-languages.zip
unzip phpMyAdmin-5.2.0-all-languages.zip
mv phpMyAdmin-5.2.0-all-languages phpmyadmin
rm phpMyAdmin-5.2.0-all-languages.zip
```

### Créer un virtual host dédié à phpMyAdmin

Pour créer un virtual host, vous pouvez utiliser la commande suivante :

```bash
nano /etc/apache2/sites-available/phpmyadmin.conf
```

Cette commande va créer un fichier `phpmyadmin.conf` dans le dossier `/etc/apache2/sites-available`. Ce fichier va contenir la configuration de notre virtual host.

Ce fichier va contenir la configuration de notre virtual host. Vous pouvez copier-coller le code suivant :

```apache
<VirtualHost *:9090>
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/html/phpmyadmin

    <Directory /var/www/html/phpmyadmin>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

Pour activer le virtual host, vous pouvez utiliser la commande suivante :

```bash
a2ensite phpmyadmin
```

Cette commande va activer le virtual host `phpmyadmin.conf`. Vous pouvez maintenant redémarrer Apache pour que les modifications soient prises en compte :

```bash
systemctl restart apache2
```

::: details Écouter le port 9090

Par défaut, Apache écoute sur le port 80. Si vous souhaitez que phpMyAdmin soit accessible sur un autre port, vous pouvez modifier le fichier `/etc/apache2/ports.conf` :

```bash
nano /etc/apache2/ports.conf
```

Ajoutez la ligne suivante :

```apache
Listen 9090
```

Redémarrez Apache pour que les modifications soient prises en compte :

```bash
systemctl restart apache2
```

:::



## Conclusion

Vous souhaitez une version plus complète ? [Voir le TD](/tp/devops/serveur/debian.md)
