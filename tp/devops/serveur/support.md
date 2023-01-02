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

### Comment représenter un serveur

Avant d'aller plus dans le détail, nous pouvons représenter un serveur de la manière suivante :

![Serveur](./res/serveur_linux.png)

Cette représentation est très simple, mais elle permet de comprendre les différents couches d'un serveur. Nous allons voir plus en détail chacune de ces couches.

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

## Les ports

Un port est un canal de communication entre deux ordinateurs. Il est possible d'ouvrir des ports sur votre serveur pour permettre à des ordinateurs distants de communiquer avec votre serveur.

Par exemple, si vous ouvrez le port 80 sur votre serveur, alors les ordinateurs distants pourront communiquer avec votre serveur en utilisant le port 80.

La liste des ports est standardisée. Chaque serveur possède 65535 ports. Les ports vont de 0 à 65535. L

es ports vont de 0 à 1023 sont réservés pour les services système. Les ports qui vont de 1024 à 65535 sont réservés pour les services utilisateurs.

Dans les ports réservés pour les services système, il y a les ports suivants :

- 22 : SSH
- 80 : HTTP
- 443 : HTTPS
- 3306 : MariaDB
- …

Dans les ports réservés pour les services utilisateurs, nous retrouvons souvent les ports suivants :

- 8080 : HTTP
- 8443 : HTTPS

::: tip Port standard ou port personnalisé ?

La liste des ports ci-dessus est la liste des ports standards, vous pouvez bien évidemment les changer. Exemple, pour éviter qu'un pirate ne trouve trop facilement le port SSH de votre machine, il est vivement conseillé de le changer.

:::

La notion de port est **très importante,** car il est possible d'ouvrir des ports sur votre serveur. Il est donc important de réfléchir à la question suivante : quels ports ouvrir sur votre serveur ?

## Les services

Votre serveur exécute des logiciels. Ces logiciels quand ils sont exécutés en arrière-plan sont appelés des services. Nos ordinateurs modernes (serveur ou non) on une puissance de calcul énorme. Il est donc possible d'exécuter plusieurs services en même temps sur un seul ordinateur.

Votre ordinateur est capable sans problème d'exécuter des 100aines de services en même temps. Par exemple :

- Un serveur web
- Un serveur de base de données
- Un serveur de messagerie
- Un serveur de fichiers
- …

Mais il est important de réfléchir à la question suivante : quels services voulez-vous exécuter sur votre serveur ? Et surtout, ne serait-il pas intéressant de les exécuter sur des serveurs différents ? Pour plusieurs raisons :

- Vous pouvez répartir la charge sur plusieurs serveurs.
- Vous pouvez avoir plusieurs serveurs pour des raisons de sécurité.
- Vous pouvez avoir plusieurs serveurs pour des raisons de maintenance.
- …

### Gérer les services

Beaucoup de distribution Linux moderne utilise SystemD pour gérer les services. Il permet de démarrer, d'arrêter, de redémarrer, de recharger, de vérifier l'état des services.

Pour vérifier l'état des services, vous pouvez utiliser la commande suivante :

```bash
systemctl status <nom_du_service>
```

Pour démarrer un service, vous pouvez utiliser la commande suivante :

```bash
systemctl start <nom_du_service>
```

Pour arrêter un service, vous pouvez utiliser la commande suivante :

```bash
systemctl stop <nom_du_service>
```

Pour redémarrer un service, vous pouvez utiliser la commande suivante :

```bash
systemctl restart <nom_du_service>
```

Pour indiquer au système que vous souhaitez démarrer le service au démarrage du système, vous pouvez utiliser la commande suivante :

```bash
systemctl enable <nom_du_service>
```

Et pour le désactiver :

```bash
systemctl disable <nom_du_service>
```

::: tip Les services

Les services sont le cœur du fonctionnement de votre serveur. Votre machine seule ne sert à rien. Il faut lui ajouter des services pour qu'elle soit utile. Par exemple, un serveur web, un serveur de base de données, un serveur de messagerie, un serveur de fichiers, etc.

Les quelques commandes ci-dessus vous permettent de gérer les services de votre serveur.

:::

## Les utilisateurs

Voilà la pierre angulaire de la sécurité de votre serveur. La gestion des utilisateurs est centrale dans l'administration de votre machine. De base sous Linux nous avons :

- Le compte root, il est le compte administrateur de votre machine. Il a tous les droits sur votre machine.
- Le compte utilisateur, il est le compte utilisateur de votre machine. Il n'a pas tous les droits sur votre machine.

À votre avis :

- Est-ce pertinent d'utiliser le compte `root` ? Pourquoi ?
- Quel type de mot de passe doit avoir votre compte `root` ?

Lors d'une connexion à distance, il est important de se connecter avec un compte utilisateur et non avec le compte `root`. Pourquoi ? Parce que le compte `root` a tous les droits sur votre machine. Si un pirate parvient à se connecter à votre machine avec le compte `root`, il aura tous les droits sur votre machine. Il pourra donc faire ce qu'il veut.

::: danger Le compte root

Vous devez donc empêcher l'accès au compte `root` à distance. Pour cela, il faut modifier le fichier de configuration SSH. Pour cela, vous devez modifier le fichier `/etc/ssh/sshd_config` et modifier la ligne suivante :

```bash
PermitRootLogin no
```

Pour éviter tout problème (erreur, sécurité, etc), il est également intéressant d'utiliser le moins possible le compte `root`.
:::

## L'accès à distance

Vous vous doutez que nous n'accédons pas à un serveur comme nous accédons à une machine physique (via un clavier et un souris), nous allons utiliser un accès à distance. Il existe plusieurs méthodes pour accéder à distance à votre serveur :

- SSH
- FTP
- SFTP

Pour prendre la main sur votre serveur, nous allons utiliser le protocole SSH. Le **service** SSH permet de se connecter à distance à votre serveur. Il est très utilisé et très sécurisé.

Il est installé par défaut sur la plupart des distributions Linux. Pour vérifier que le service est bien installé, vous pouvez utiliser la commande suivante :

```bash
systemctl status ssh
```

Pour le démarrer automatiquement au démarrage du système, vous pouvez utiliser la commande suivante :

```bash
systemctl enable ssh
```

### Les clés SSH

Nous avons parlé des utilisateurs, nous avons parlé également des mots de passe. Lors de l'accès à distance à votre serveur, il est intéressant d'utiliser des clés SSH.

Pourquoi ? Parce que les mots de passe sont plus faciles à deviner que les clés SSH.

Une clé SSH est composée de deux parties :

- Une clé privée : elle est stockée sur votre ordinateur. Elle est utilisée pour se connecter à votre serveur.
- Une clé publique : elle est stockée sur votre serveur. Elle est utilisée pour vérifier que vous êtes bien le propriétaire de la clé privée.

![Clé SSH](./res/asymmetric-encryption.png)

Pour générer une clé SSH, vous pouvez utiliser la commande suivante :

```bash
ssh-keygen -t rsa
```

Cette commande va générer deux fichiers :

- `~/.ssh/id_rsa` : la clé privée
- `~/.ssh/id_rsa.pub` : la clé publique

::: danger La clé privée

Cette clé privée doit être protégée. Si quelqu'un a accès à cette clé privée, il pourra se connecter à votre serveur. Il est donc important de la protéger.

:::

### Autoriser une clé SSH

Maintenant que vous avez généré une clé SSH, il faut l'ajouter sur votre serveur. Pour cela, vous devez copier le contenu du fichier `~/.ssh/id_rsa.pub` et le coller dans le fichier `~/.ssh/authorized_keys` sur votre serveur.

Une commande existe pour faire cela automatiquement :

```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub <nom_du_compte>@<adresse_ip_du_serveur>
```

À partir de maintenant vous pouvez vous connecter à votre serveur avec la commande suivante :

```bash
ssh <nom_du_compte>@<adresse_ip_du_serveur>
```

Et aucun mot de passe ne sera demandé.

Pratique, non ?

### Fonctionnement d'une clé SSH

Lorsque vous vous connectez à votre serveur avec la commande `ssh`, le serveur va vérifier que la clé publique que vous avez envoyée correspond à la clé privée que vous avez sur votre ordinateur. Si c'est le cas, vous êtes connecté.

Techniquement il y a plusieurs étapes :

- Le serveur génère une donnée aléatoire et le chiffre avec la clé privée et calcule le hash md5 de la valeur chiffré.
- Le serveur envoie la donnée au client.
- Le client déchiffre le chiffre avec la clé publique.
- Le client renvoie le hash md5 de la valeur déchiffré au serveur.
- Si les deux md5 sont identiques, le serveur accepte la connexion.

![Fonctionnement d'une clé SSH](./res/ssh-key-based-authentication.png)

Nous parlons donc ici d'un chiffrement asymétrique. Il existe également un chiffrement symétrique.

## Les sauvegardes

Qui dit serveur, dit … sauvegarde ! Il est important de sauvegarder son serveur pour éviter de perdre des données. Les sauvegardes ont plusieurs objectifs :

- Sauvegarder les données (évidemment).
- Sauvegarder les fichiers de configuration.
- Sauvegarder les bases de données.

Mais surtout elles doivent être **automatiques** pour ne pas les oublier (via un script mis dans un cron). Les sauvegardes doivent être **régulières** (tous les jours, toutes les semaines, tous les mois …). 

Les sauvegardes doivent être **sécurisées** (chiffrées, stockées sur un autre support …).

### Sauvegarder les données

Pour sauvegarder les données, il existe plusieurs solutions :

- Sauvegarder les données sur un autre serveur.
- Sauvegarder les données sur un disque externe.
- Sauvegarder les données sur un service de stockage en ligne.

Dans tous les cas, il s'agit de sauvegarder les données sur une autre machine que le serveur. Pourquoi ? Parce que si le serveur tombe en panne, vous n'aurez plus accès aux données.

Les sauvegardes sont également un élément sensible de la machine. En effet, elles vont contenir l'ensemble des données de celui-ci (les mots de passe y compris). Elles sont donc très sensibles, et ~peuvent~ doivent être chiffrées pour éviter que des personnes malveillantes ne puissent les récupérer.

### Les types de sauvegardes

Il existe plusieurs types de sauvegardes :

- Sauvegarde complète : sauvegarde de l'ensemble des données.
- Sauvegarde incrémentale : sauvegarde des données modifiées depuis la dernière sauvegarde.
- Sauvegarde différentielle : sauvegarde des données modifiées depuis la dernière sauvegarde complète.

Les sauvegardes incrémentales et différentielles sont plus rapides que les sauvegardes complètes. Mais elles sont plus complexes à mettre en place. En fonction du temps à passer et du volume des données à sauvegarder, vous pouvez choisir l'une ou l'autre.

### Exemple de script de sauvegarde

Voici un exemple de script de sauvegarde complet :

```bash
#!/bin/bash

# Sauvegarde des données
rsync -avz --delete /home/ /media/backup/home/

# Sauvegarde de la base de données
mysqldump -u root -p --all-databases > /media/backup/databases.sql
```

Ce script va sauvegarder les données du dossier `/home` et la base de données dans le dossier `/media/backup`.

Voici un exemple de script de sauvegarde incrémentale :

```bash
#!/bin/bash

# Sauvegarde des données
rsync -avz --delete --link-dest=/media/backup/home/ /home/ /media/backup/home/

# Sauvegarde de la base de données
mysqldump -u root -p --all-databases > /media/backup/databases.sql
```

Ce script va sauvegarder les données du dossier `/home` et la base de données dans le dossier `/media/backup`.

::: Comment l'automatiser ?

Vous pouvez automatiser la sauvegarde en créant un script et en le mettant dans un cron. Voici un exemple de cron :

```bash
0 0 * * * /home/backup.sh
```

Ce cron va exécuter le script `/home/backup.sh` tous les jours à minuit.

:::

## Les logs

Maintenant que nous avons vu comment fonctionnent les rudiments d'un serveur, nous allons nous intéresser aux logs. Les logs sont des fichiers qui contiennent les informations sur les actions effectuées sur le serveur. Ils sont très utiles pour débugger un serveur.

Différents types de logs existent sur votre serveur :

- Les logs du serveur (Apache, Nginx …).
- Les logs des applications (WordPress, …).
- Les logs des bases de données (MySQL, …).

Et plusieurs niveaux de logs existent :

- Les logs d'erreurs (erreurs, alertes …).
- Les logs de débogage (informations …).

En général, les logs d'erreurs sont plus importants que les logs de débogage. En effet, les logs d'erreurs vont vous permettre de débugger votre serveur. Les logs de débogage vont vous permettre de voir ce qui se passe sur votre serveur.

::: tip Point cybersécurité

Les logs sont des fichiers qui contiennent des informations sensibles. Les logs d’Apache ou Nginx contiennent entre autres les accès au votre serveur. Ils sont donc utiles pour observer si vous subissez des attaques. Ils sont également très sensibles, et très attractifs pour des attaquants.

Si votre organisation le permet, les logs peuvent être externalisés pour être centralisés dans un serveur centralisé. Ce qui va permettre de les sécuriser, ainsi que les analyser plus facilement (avec des outils comme Kibana, Graylog…).

:::

### Les logs du serveur

Les logs du serveur sont généralement stockés dans le dossier `/var/log`. Il est possible de les consulter avec la commande `tail` :

```bash
tail -f /var/log/apache2/access.log
```

Cette commande va afficher les logs du serveur Apache en temps réel. Le `-f` permet de suivre les logs en temps réel (sans avoir à relancer la commande).

### Comment les analyser ?

Une partie du travail du DevOps est d'analyser les logs. Il est important de savoir lire les logs, et de savoir les interpréter. Il est également important de savoir les analyser. Il existe plusieurs outils pour analyser les logs :

- tail : affiche les logs en temps réel.
- nano : éditeur de texte.
- vim : éditeur de texte.
- Kibana : outil de visualisation des logs.
- Graylog : outil de centralisation des logs.

Vous pouvez avoir différentes erreurs dans vos logs :

- Des erreurs de configuration serveur. (ex. : mauvaise configuration d’Apache, erreur de type 500).
- Des erreurs d'application. (ex. : erreur dans le code de votre site en PHP, erreur de type 500).
- Des erreurs de type ressource introuvables. (ex : un fichier n'existe pas, erreur de type 404).

### Exemple de logs

Log de type 404 :

```bash
127.0.0.1 - - [28/Jul/2022:10:27:32 -0300] "GET /hidden/ HTTP/1.0" 404 7218
```

Comment lire ce log ? :

- `127.0.0.1` : adresse IP de l'utilisateur ayant fait la requête.
- `28/Jul/2022:10:27:32 -0300` : date et heure de la requête.
- `GET /hidden/ HTTP/1.0` : méthode HTTP, URL, version HTTP.
- `404` : code HTTP. (404 = ressource introuvable)

::: tip Point lecture de log

La lecture de logs est un exercice important. Il faut s'entraîner, ça vous permettra de mieux comprendre ce qui se passe sur votre serveur, et de mieux corriger vos erreurs.

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
