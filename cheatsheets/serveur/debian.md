# Créer un serveur Web (Apache, MariaDB, PHP) avec Debian

Dans cette aide mémoire vous trouverez l'ensemble des commandes et des opérations à réaliser pour installer un serveur Debian.

## Installer les paquets

```bash
apt-get update
apt-get install apache2 php php-mysql php-pdo php-mbstring php-gd php-zip mariadb-server -y
```

Démarrez le serveur Apache

```bash
systemctl enable apache2
systemctl start apache2
```

Démarrer le serveur MySQL

```bash
systemctl enable mysql
systemctl start mysql
```

::: tip Un peu de détail

- `apt-get install` : permet d'installer un paquet
- `apache2` : Le serveur web Apache
- `mariadb-server` : Le serveur de base de données MariaDB
- `php` : Le langage de programmation PHP
- `php-mysql` : Le module PHP pour se connecter à la base de données
- `php-mbstring` : Le module PHP pour gérer les chaînes de caractères
- `php-gd` : Le module PHP pour gérer les images
- `php-zip` : Le module PHP pour gérer les archives

:::

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
bind-address = 127.0.0.1
```

Redémarrer le serveur MySQL

```bash
systemctl restart mysql
```

::: tip Pourquoi ?
Par défaut, le serveur MySQL n'écoutera que les connexions locales. Il faut donc autoriser les connexions distantes en modifiant la valeur de `bind-address`. Si vous n'en avez pas besoin, vous pouvez laisser la valeur par défaut.

Changer se paramètre sera utile quand vous souhaiterez accéder à la base de données depuis un autre ordinateur (développement en C#).
:::

## Activer la réécriture d'URL

Dans certains cas, il est nécessaire d'activer la réécriture d'URL pour que le serveur puisse fonctionner correctement.

```bash
a2enmod rewrite
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
Plus tard nous utiliserons la réécriture d'URL pour personnaliser le liens indépendantement du nom des fichiers sur le disque.
:::
