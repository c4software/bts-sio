---
description: Ce document est un complément du cours. Il vous permettra de revenir sur les différentes notions avec différents exemples.
---

# Complément du cours Serveur

## Qu'est-ce qu'un serveur ?

Un serveur est un ordinateur qui fournit des services à d'autres ordinateurs. Il peut s'agir d'un serveur web, d'un serveur de base de données, d'un serveur de fichiers, etc.

Concrètement, un serveur est un ordinateur qui est connecté à un réseau et qui est accessible depuis un autre ordinateur. Il est souvent installé dans un datacenter, c'est-à-dire dans un bâtiment spécialisé qui contient des serveurs. Les serveurs sont souvent installés dans des salles spéciales qui sont climatisées et qui sont surveillées 24h/24 et 7j/7.

Mais sans aller jusque-là, vous pouvez aussi installer un serveur chez vous. Vous pouvez installer un serveur chez vous pour faire des tests, pour héberger un site web, etc. Vous pouvez par exemple utiliser un Raspberry Pi comme serveur, et y installer les services que vous souhaitez (Web, Base de données, Domotique, Fichier).

::: tip Pourquoi installer un serveur chez soi ?

Il est possible d'installer un serveur chez soi pour faire des tests, pour héberger un site web, etc. C'est une bonne idée de faire des tests sur un serveur chez soi avant de mettre en production sur un serveur distant.

Créer un serveur à domicile permet réellement de progresser, car vous devrez gérer l'ensemble du serveur. Vous devrez gérer l'installation, la configuration, la sécurité, etc. C'est une bonne expérience pour apprendre à gérer un serveur.

Voilà à quoi peut ressembler un serveur à domicile (chez moi en l'occurrence) :

![Serveur à domicile](./res/version1.jpg)

:::

Nous pourrions résumer la définition d'un serveur en disant que c'est un ordinateur qui est connecté à un réseau et qui est accessible depuis un autre ordinateur.

## Qu'est-ce qu'un serveur web ?

Un serveur web est un serveur qui permet de servir des pages web. Il permet de servir des pages web statiques (fichiers HTML, CSS, JavaScript, images, etc.) mais aussi des pages web dynamiques (fichiers PHP, Python, Ruby, etc.).

Dans notre cas nous utiliserons Apache pour le serveur web. Apache est un serveur web open-source qui est très utilisé. Il est très puissant et il est très facile à configurer. Il est possible de configurer Apache pour servir des pages web statiques, mais aussi des pages web dynamiques.

Il existe différents serveurs web, Apache est l'un des plus utilisés. Il existe également Nginx, Caddy, etc. Mais Apache est le plus utilisé, donc c'est le serveur web que nous utiliserons.

- Nginx est également un serveur web très puissant, mais il est un peu plus difficile à configurer.
- Caddy est un serveur web qui est très simple à configurer, mais il est moins puissant qu’apache.

![Serveur](./res/serveur.jpg)

## Qu'est-ce qu'un serveur de base de données ?

Un serveur de base de données est un serveur qui permet de stocker des données. Il permet de stocker des données dans des tables, de faire des requêtes SQL, etc.

Dans notre cas nous utiliserons MariaDB pour le serveur de base de données. MariaDB est un serveur de base de données open-source qui est très utilisé. Il est très puissant et il est très facile à configurer. Il est possible de configurer MariaDB pour stocker des données dans des tables, de faire des requêtes SQL, etc. Quel que soit le langage de programmation que vous utilisez, il est possible de se connecter à MariaDB pour stocker et récupérer des données. Par exemple, si vous utilisez PHP, vous pouvez utiliser la librairie PDO pour vous connecter à MariaDB.

::: tip Pourquoi MariaDB et pas MySQL ?

C'est une bonne question… MariaDB est un fork de MySQL, c'est-à-dire que c'est une copie de MySQL. MariaDB a été créé parce que Oracle a racheté MySQL. Oracle a ensuite décidé de rendre MySQL payant. MariaDB est donc une copie de MySQL qui est gratuite. MariaDB est donc une alternative à MySQL.

Ce sont donc deux logiciels équivalents, MariadDB est gratuit et MySQL est pour l'instant également gratuit. Mais le logiciel MySQL pourrait devenir payant à l'avenir d'où l'intérêt de se tourner vers MariaDB.

:::

## Physique ou virtuel ?

Il est possible d'installer un serveur sur un ordinateur physique, mais il est également possible d'installer un serveur sur une machine virtuelle. Une machine virtuelle est un logiciel qui permet de simuler un ordinateur. Il est possible de créer plusieurs machines virtuelles sur un seul ordinateur. Chaque machine virtuelle est indépendante de l'autre, c'est-à-dire que chaque machine virtuelle est comme un ordinateur physique.

Le TP que nous allons faire est sur une machine virtuelle. Mais vous pouvez également installer un serveur sur un ordinateur physique.

## La sécurité

Héberger du contenu nécessite de réfléchir à la sécurité. En effet, il est important de sécuriser son serveur pour éviter que des personnes malveillantes ne puissent accéder à votre serveur et à vos données.

Différents éléments seront à prendre en compte pour sécuriser votre serveur :

- L'accès aux ports de votre serveur.
- Les services présents sur votre serveur.
- Les utilisateurs présents sur votre serveur.
- Les mots de passe d'accès.

::: danger Développeur != À l'arrache

À première vue, vous vous dites que vous n'avez pas besoin de sécuriser votre serveur, car vous êtes le seul à y avoir accès. Mais ce n'est pas une bonne idée. Vous ne savez pas qui peut avoir accès à votre serveur. Il est possible que quelqu'un d'autre ait accès à votre serveur, et que cette personne soit malveillante. Il est donc important de sécuriser votre serveur.

Vous vous dites également que les serveurs ne sont pas votre histoire. Que c'est l'affaire des personnes dans l'option SISR. Malheureusement pour vous dans la réalité des organisations vous serez amené à gérer des serveurs (au moins de développement).

:::

## Un serveur ou plusieurs serveurs ?

Avant d'aller plus loin… Réfléchissez à la question suivante : est-ce que vous allez installer un seul serveur ou plusieurs serveurs ?

L'idée est donc de comprendre pourquoi il est intéressant d'avoir plusieurs serveurs. En effet, il est possible d'avoir un seul serveur qui contient tout. Mais il est également possible d'avoir plusieurs serveurs qui contiennent chacun une partie du serveur. Par exemple, vous pouvez avoir un serveur qui contient le serveur web, un serveur qui contient le serveur de base de données, etc.

### Pourquoi avoir plusieurs serveurs ?

Il y a plusieurs raisons pour avoir plusieurs serveurs :

- Vous pouvez avoir plusieurs serveurs pour répartir la charge.
- Vous pouvez avoir plusieurs serveurs pour avoir une meilleure disponibilité.
- Vous pouvez avoir plusieurs serveurs pour avoir une meilleure sécurité.
- Vous pouvez avoir plusieurs serveurs pour avoir une meilleure maintenance.

## Installation dans un container Docker ou directement sur la machine ?

Il est possible d'installer un serveur dans un container Docker ou directement sur la machine. Dans notre cas nous allons installer un serveur directement sur la machine.

Plus tard nous découvrirons Docker et l'avantage de celui-ci (vous verrez c'est incroyable 🎉). Il est de toute façon primordial de comprendre comment on installe un serveur classique pour comprendre l'usage de Docker.

::: tip Docker c'est vaste
Plus tard dans l'année nous utiliserons Docker pour créer des environnements de type « Conteneurs »… Volontairement j'ai souhaité vous en parler ici. Donc soyez curieux. N'hésiter pas à vous documenter si vous le souhaitez.
:::

## Installation de Debian

Pour créer votre machine, vous allez avoir besoin d'un système d'exploitation. Je vous propose d'utiliser la dernière version de Debian, avant d'aller plus loin posons-nous quelques questions :

- Pourquoi Debian ?
- Pourquoi dans sa dernière version ?

### Procédure d'installation de l'OS

Vous connaissez la procédure d'installation, mais quelques éléments sont importants à signaler :

- **Pas d'interface graphique**.
- Ajuster la configuration de l'adresse IP.
- N'oubliez pas d'installer les VMware Tools.

::: danger Les performances et la virtualisation

Sans les VMware tools semble fonctionner correctement ? Oui… À première vue seulement… En réalité votre machine ne tire pas toutes les performances de l'environnement. Pire, elle peut dégrader les performances de toute la ferme.

Bref, n'oubliez pas d'installer les Tools pour vivre une expérience optimale 👌.

:::

TODO à détailler.

::: tip 👋 Pas d'interface graphique ?
À votre avis, pourquoi ?
:::

### Accéder à votre serveur

Pour accéder à votre serveur, vous pouvez utiliser la Remote Console de VMWare… Mais c'est une solution pas optimale qui sera lente et qui ne vous permettra pas de faire de copier/coller. Je vous propose donc d'utiliser un client SSH.

Un client SSH est un logiciel qui permet de se connecter à un serveur via SSH. SSH est un protocole qui permet de se connecter à un serveur de manière sécurisée. De plus bien configuré avec des clés SSH, vous n'aurez pas besoin de rentrer de mot de passe (c'est magique… et en cybersécurité c'est une bonne chose).

Pour installer un client SSH, vous pouvez utiliser Putty (Windows) ou SSH (macOS).

Installer SSH sur votre serveur Debian :

```bash
sudo apt install openssh-server
```

Je vous laisse valider l'installation du paquet. Une fois l'installation terminée, vous pouvez vous connecter à votre serveur avec SSH.

Avant d'aller plus loin, nous allons générer une clé SSH, elle vous servira de clé pour vous connecter à votre serveur. Mais également aux prochains serveurs que vous allez installer.

Avoir une clé SSH est intéressant, car une clé SSH est plus sécurisée qu'un mot de passe. De plus une clé SSH est un standard, donc vous pouvez l'utiliser pour vous connecter à n'importe quel type de serveur (Linux, mais également GIT, etc.).

::: tip C'est une clé ultra privée
La clé SSH est une clé privée, donc ne la partagez pas avec n'importe qui. Elle vous permet de vous connecter à votre serveur, mais également à d'autres serveurs. Si vous la partagez avec n'importe qui, vous risquez de vous faire pirater votre serveur.

**Avoir la clé == Pouvoir se connecter à votre serveur.**

:::

#### Générer une clef privée/public

Cette opération n'est à réaliser qu'une seule fois (sur chaque machine/session). Au lycée, la clef va s'enregistrer dans votre dossier utilisateur, elle sera donc synchronisée automatiquement avec l'ensemble des ordinateurs sur lesquels vous allez pouvoir vous connecter.

#### Générer la clef

La commande pour générer une clef est la suivante.

::: tip Windows, Linux, macOS ?

La commande sera la même, quel que soit votre système d'exploitation. Cependant, le terminal lui sera différent :

- Windows : `Git Bash` (ou `Git cmd`). ([nécessite Git](https://git-scm.com/downloads))
- macOS : `terminal`.
- Linux : `console`.

:::

```bash
ssh-keygen
```

![Génération d'une clef SSH](./res/ssh-key.jpg)

La commande va générer **deux fichiers** :

- **id_rsa**, est privé. **Vous ne devez jamais le partager**.
- **id_rsa.pub**, est publique, vous pouvez le partager autant que vous voulez ce fichier permettra de vous reconnaître au moment de la connexion.

::: danger Plus de sécurité

Vous pouvez faire « entrée (3×) » pour générer une clef sans mot de passe. Vous pouvez également faire le choix de mettre un mot de passe sur votre clef pour plus de sécurité en cas de perte de celle-ci.

:::

#### Installer la clef sur votre serveur

Pour cela, il vous suffit de faire la commande suivante sur votre ordinateur.

```bash
ssh-copy-id <username>@<ipaddress>
```

⚠️ Vous devez évidemment remplacer `<username>`et `<ipaddress>`par votre utilisateur et votre mot de passe. Exemple :

```bash
ssh-copy-id pi@192.168.1.253
```

::: tip Et voilà !
Rien de plus, à partir de maintenant votre serveur acceptera votre connexion sans vous demander de mot de passe. Pratique non ? (Et surtout très sécurisé)
:::

## Installation de Apache

### Présentation

Apache est un serveur web. Il permet de servir des pages web, mais également des applications web. Il est très utilisé sur le web, car il est gratuit, open source et très performant.

### Installation

Pour installer Apache sur votre serveur, vous pouvez utiliser la commande suivante :

```bash
sudo apt install apache2
```

### Démarrez le serveur

Maintenant que le serveur est installé, il faut le démarrer. Pour cela, vous pouvez utiliser la commande suivante :

```bash
sudo systemctl start apache2
```

### Vérifier que le serveur est démarré

Pour vérifier que le serveur est démarré, vous pouvez utiliser la commande suivante :

```bash
sudo systemctl status apache2
```

### Vérifier que le serveur est accessible

Pour vérifier que le serveur est accessible, il vous suffit d'ouvrir votre navigateur et d'aller sur l'adresse IP de votre serveur. Si vous avez bien suivi les étapes précédentes, vous devriez voir la page d'accueil d'Apache.

![Page d'accueil d'Apache](./res/apache.jpg)

### Démarrer le serveur au démarrage du système

Pour que le serveur se lance automatiquement au démarrage du système, vous pouvez utiliser la commande suivante :

```bash
sudo systemctl enable apache2
```

### Où sont les fichiers du serveur

Les fichiers du serveur sont dans le dossier `/var/www/html`. Vous pouvez y accéder avec la commande suivante :

```bash
cd /var/www/html
```

C'est ici que nous voyons l'avantage de Linux. L'architecture est très simple, et les fichiers sont très facilement accessibles.

### Personnaliser la page d'accueil

Pour personnaliser la page d'accueil, vous pouvez modifier le fichier `index.html` dans le dossier `/var/www/html`. Vous pouvez utiliser la commande suivante pour y accéder :

```bash
nano /var/www/html/index.html
```

Vous pouvez également utiliser FileZilla pour modifier le fichier.

### Déployer votre site web

Je vous laisse créer une petite page web, et la déployer sur votre serveur. Votre site doit respecter les règles suivantes :

- Le fichier doit être nommé `index.html`.
- Posséder un titre (Bienvenue sur mon site).
- Posséder un paragraphe (Ceci est mon site web).
- Posséder une image (Une image de votre choix).
- Posséder un lien vers un autre site (Un lien vers le site de votre choix).

👋 C'est à vous de jouer. 

Une fois votre code réalisé, je vous propose de le déployer sur votre serveur. Pour cela, vous pouvez utiliser FileZilla. Je vous propose de créer un dossier `monsite` dans le dossier `/var/www/html`.

👀 Le dossier est créé ? vous pouvez déposer votre fichier `index.html` dans le dossier `monsite`. Vous pouvez ensuite ouvrir votre navigateur et aller sur l'adresse IP de votre serveur. Vous devriez voir votre site web.

## Installation de PHP

Avoir un serveur web sans PHP, c'est comme avoir un serveur web sans base de données. C'est un peu dommage. PHP est un langage de programmation qui permet de faire des applications web. Il est très utilisé sur le web, car il est gratuit, open source et très performant.

### Installation

Pour installer PHP sur votre serveur, vous pouvez utiliser la commande suivante :

```bash
sudo apt install php php-pdo php-mysql
```

### Vérifier que PHP est installé

Pour vérifier que PHP est installé, vous pouvez utiliser la commande suivante :

```bash
php -v
```

Cette commande va vous afficher la version de PHP installée sur votre serveur.

### Vérifier que Apache + PHP fonctionne

Pour vérifier que Apache + PHP fonctionne, vous pouvez créer un fichier `index.php` dans le dossier `/var/www/html`. Vous pouvez utiliser la commande suivante pour y accéder :

```bash
nano /var/www/html/index.php
```

Dans ce fichier `index.php`, vous pouvez mettre le code suivant :

```php
<?php
phpinfo();
?>
```

Vous pouvez ensuite ouvrir votre navigateur et aller sur l'adresse IP de votre serveur. Si vous avez bien suivi les étapes précédentes, vous devriez voir la page d'information de PHP.

::: tip phpinfo() ?
La fonction `phpinfo()` permet d'afficher les informations de PHP. C'est très pratique pour vérifier que tout fonctionne correctement. Vous pouvez également utiliser cette fonction pour vérifier que les extensions PHP sont bien installées.

Comme par exemple `php-pdo` et `php-mysql` pour la base de données.
:::