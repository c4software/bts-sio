---
description: Dans ce TP évalué, vous allez mettre en place un serveur complet (Web et Base de données MySQL) en appliquant les notions des TP précédents et du cours.
---

# TP5. Créer un serveur Web et une base de données MySQL (Synthèse Évaluée)

::: details Sommaire
[[toc]]
:::

## Introduction

Dans les précédents TP, nous avons traité de la création d'une VM, de l'installation d'un serveur Web (TP2), d'une base de données (TP3 - MariaDB/MySQL) et du déploiement de code (TP4). Le support de cours "Complément Serveur" a également introduit des concepts clés sur l'administration, la sécurité et les bonnes pratiques DevOps.

Ce TP est une **synthèse évaluée** de ces apprentissages. Vous allez devoir mettre en place un serveur fonctionnel hébergeant un site Web et une base de données **MySQL**, en appliquant les configurations et les mesures de sécurité vues précédemment. Il n'y aura pas de procédure pas à pas détaillée, à vous de mobiliser vos connaissances.

Vous avez atteint un point étape. Vous avez maintenant la capacité de créer et configurer des serveurs Web et des serveurs de base de données de manière plus sécurisée et structurée.

<center><iframe src="https://giphy.com/embed/CjmvTCZf2U3p09Cn0h" width="480" height="452" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></center>

::: tip TP évalué - Barème Indicatif (Total 22 points + Bonus)

La réalisation de ce TP sera évaluée.

- **Partie Serveur (9 points)**
  - VM fonctionnelle et correctement nommée : **3 points**.
  - Accès utilisateur fonctionnel (hors root) : **1 point**.
  - Mot de passe root modifié et documenté : **1 point**.
  - Accès SSH via échange de clés **uniquement** (pas de mot de passe) : **2 points**.
  - Configuration SSH sécurisée (`PermitRootLogin no`, `PasswordAuthentication no`) : **2 points**.
- **Partie Web (5 points)**
  - Serveur Apache + PHP fonctionnels (bonne version) : **1 point**.
  - Site web 1 (Blog port 80) fonctionnel et déployé via Git : **2 points**.
  - Site web 2 (PHP port 8080) fonctionnel avec contenu dynamique : **2 points**.
- **Partie Base de Données (6 points)**
  - MySQL installé et fonctionnel : **1 point**.
  - Base de données `tp5` créée et script SQL importé : **1 point**.
  - Utilisateur `tp5` créé avec le bon mot de passe et privilèges sur la BDD `tp5` : **2 points**.
  - PHPMyAdmin installé et accessible sur le port 9090 : **2 points**.
- **Documentation & Restitution (4 points)**
  - Fourniture d'un rapport illustrant les étapes clés (commandes, captures d'écran) : **2 points**.
  - Fourniture de la fiche serveur complète : **2 points**.
- **Bonus Déploiement Automatisé (1 point)**
  - Mise en place d'un cron pour le déploiement Git du blog.

:::

::: danger Attention à la Documentation

N'oubliez pas de documenter votre travail de manière **précise** dans votre rapport (commandes utilisées, configurations modifiées, captures d'écran pertinentes). La fiche serveur doit être **complète**. La qualité de la documentation est essentielle.
:::

Vous avez à votre disposition l'ensemble des documents nécessaires :

- [TP1. Créer une VM depuis un modèle.](./tp1alt.md)
- [TP2. Installer un serveur Web.](./tp2.md)
- [TP3. Installer une base de données.](./tp3.md) (Contient les instructions pour MySQL)
- [TP4. Déployer votre code.](./tp4.md)
- Le support "Complément du cours Serveur".

::: danger Attention

N'oubliez pas de documenter votre travail. Vous devez fournir un rapport illustrant les différentes étapes de ce TP. Vous devez également fournir la fiche serveur.

:::

## Introduction

Dans ce TP, vous aller créer un serveur contenant :

- Un serveur Web Apache avec PHP.
- Un site Web (blog) déployé via Git.
- Un site Web PHP dynamique.
- Une base de données MySQL.

Ici pas de procédure pas-à-pas. Vous devez réaliser les éléments suivants en vous basant sur vos connaissances acquises dans les TP précédents et le support de cours.:

## Partie Serveur

1. **Création et Configuration de base :**
   - Créer **une** nouvelle VM à l'aide du modèle (Debian 13).
   - Nommer votre VM `<VOTRE-NOM>-serveur-tp5` (dans l'interface VMWare **et** comme hostname du serveur).
   - Assurer la connectivité réseau (IP fixe).
   - Créer un utilisateur standard (`<votre-login>`) pour l'administration courante.
   - Modifier le mot de passe du compte `root` (et le documenter de manière sécurisée dans votre fiche serveur).
   - Mettre à jour le système (`apt update && apt upgrade`).
2. **Sécurisation SSH :**
   - Configurer l'accès SSH pour votre utilisateur standard via **échange de clés uniquement**.
   - Modifier le fichier `/etc/ssh/sshd_config` pour :
     - Interdire la connexion root : `PermitRootLogin no`
     - Désactiver l'authentification par mot de passe : `PasswordAuthentication no`
     - Toutes options intéressantes comme vue en cours.
   - Redémarrer le service SSH (`systemctl restart ssh`).
   - **Tester** que vous ne pouvez vous connecter qu'avec votre clé et non en root ou avec un mot de passe.

## Partie Web

1. **Installation Apache & PHP :**
   - Installer Apache2.
   - Installer PHP 8 (la version la plus récente disponible sur le dépôt Ondřej Sury, comme vu en TP2/TP3).
   - Configurer Apache pour utiliser PHP-FPM.
   - Redémarrer Apache.
2. **Configuration des Sites (Virtual Hosts basés sur les ports) :**
   - Configurer Apache pour écouter sur les ports 80, 8080 et 9090 (modifier `/etc/apache2/ports.conf`).
   - Créer les répertoires racines pour les deux sites (ex: `/var/www/site_port_80`, `/var/www/site_port_8080`). Adapter les permissions si nécessaire pour Apache.
   - Créer et activer les fichiers de configuration VirtualHost dans `/etc/apache2/sites-available/`:
     - Un VirtualHost pour le port 80 pointant vers le répertoire du blog.
     - Un VirtualHost pour le port 8080 pointant vers le répertoire du site PHP.
     - Activer les VirtualHosts avec `a2ensite` (ex: `a2ensite site_port_80.conf` et `a2ensite site_port_8080.conf`).
   - Redémarrer Apache après modification de la configuration.
3. **Déploiement des Sites :**
   - **Site port 80 :** Déployer votre blog (réalisé en début de formation) dans le répertoire correspondant via **Git** (`git clone` depuis votre dépôt distant). _Bonus : Mettre en place un cron pour automatiser le `git pull` (à documenter pour le valoriser)._
   - **Site port 8080 :** Créer un fichier `index.php` dans le répertoire correspondant. Ce fichier doit afficher dynamiquement :
     - Un titre principal (`<h1>`) : "Bienvenue sur mon site TP5".
     - Un sous-titre (`<h2>`) : La date et l'heure actuelles du serveur (format libre mais lisible).
     - Une ligne horizontale (`<hr>`).
     - Un paragraphe (`<p>`) : "Bonjour, je suis `<VOTRE-NOM>` et mon serveur s'appelle `<NOM_SERVEUR>` (IP: `<IP_SERVEUR>`)". Utiliser les fonctions PHP pour obtenir le nom d'hôte et l'IP du serveur. Vous pouvez utiliser `gethostname()` pour le nom d'hôte et `$_SERVER['SERVER_ADDR']` pour l'adresse IP.
     - Un pied de page (`<footer>`) : "TP5 Réalisé par `<VOTRE-NOM>` ainsi que le nom et l'adresse IP de votre serveur".

::: details Pour le PHP…

Besoin d'aide pour le PHP ? Voici un exemple de code :

```php
<?php

$date = date("d/m/Y");
$heure = date("H:i:s");
$ip = $_SERVER['SERVER_ADDR'];
$nom = gethostname(); // Pour obtenir le nom de votre serveur
```

:::

## Partie Base de données

1. **Installation et Configuration MySQL :**
   - Installer `mysql-server`. (en utilisant le TP3 comme référence).
   - Exécuter `mysql_secure_installation` pour sécuriser l'installation (définir mot de passe root, supprimer utilisateurs anonymes, etc.).
   - Configurer MySQL pour autoriser la connexion via une IP externe (droit `GRANT` sur `%`).
2. **Création Base de Données et Utilisateur :**
   - Se connecter à MySQL en tant que `root`.
   - Créer la base de données : `CREATE DATABASE tp5;`
   - Créer l'utilisateur : `CREATE USER 'tp5'@'%' IDENTIFIED BY 'voici-le-mot-de-passe-de-la-bdd';` (Le `%` autorise la connexion depuis n'importe quelle IP. C'est nécessaire pour PHPMyAdmin s'il est sur le même serveur mais accédé via le navigateur).
   - Donner les privilèges à l'utilisateur **sur cette base de données spécifique** : `GRANT ALL PRIVILEGES ON tp5.* TO 'tp5'@'%';`
   - Appliquer les changements : `FLUSH PRIVILEGES;`
   - Quitter MySQL.

3. **Installation PHPMyAdmin :**
   - Installer PHPMyAdmin (la méthode manuelle vue en TP3 est recommandée : télécharger l'archive, décompresser dans `/var/www/`, renommer le dossier en `phpmyadmin`).
   - Créer et activer un fichier de configuration VirtualHost Apache pour PHPMyAdmin écoutant sur le **port 9090** et pointant vers le dossier d'installation de PHPMyAdmin.
   - Redémarrer Apache.
   - Tester l'accès à `http://<VOTRE_IP>:9090`. Vous devriez pouvoir vous connecter avec l'utilisateur `tp5` et voir la base de données `tp5` et ses tables.

::: tip Alternatives à PHPMyAdmin
Rappelez-vous (vu en TP3 et dans le cours) que PHPMyAdmin n'est qu'une interface web. Pour administrer une base de données, on peut aussi utiliser :

- La ligne de commande (`mysql`).
- Des clients lourds comme DBeaver, HeidiSQL, TablePlus, etc. (souvent plus performants et pratiques pour le développement).
- Des outils intégrés aux IDE (VSCode, PHPStorm...).
  Il n'est pas toujours nécessaire ni souhaitable d'installer PHPMyAdmin sur un serveur de production.
  :::

3. **Importation des Données :**
   - Importer le script SQL fourni ci-dessous dans la base de données `tp5`.

   ```sql
   -- Assurez-vous d'être connecté à la base de données 'tp5' avant d'exécuter ceci si vous utilisez la ligne de commande.
   -- USE tp5;

   CREATE TABLE `utilisateur` (
     `id` int(11) NOT NULL AUTO_INCREMENT,
     `nom` varchar(255) NOT NULL,
     `prenom` varchar(255) NOT NULL,
     `age` int(11) NOT NULL,
     PRIMARY KEY (`id`)
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

   INSERT INTO `utilisateur` (`id`, `nom`, `prenom`, `age`) VALUES
   (1, 'Doe', 'John', 25),
   (2, 'Doe', 'Jane', 22),
   (3, 'Doe', 'Jack', 18),
   (4, 'Doe', 'Jill', 16),
   (5, 'Doe', 'Joe', 14);

   CREATE TABLE `commande` (
     `id` int(11) NOT NULL AUTO_INCREMENT,
     `id_utilisateur` int(11) NOT NULL,
     `date` date NOT NULL,
     `montant` float NOT NULL,
     PRIMARY KEY (`id`)
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

   INSERT INTO `commande` (`id`, `id_utilisateur`, `date`, `montant`) VALUES
   (1, 1, '2024-01-01', 100),
   (2, 1, '2024-01-02', 200),
   (3, 1, '2024-01-03', 300),
   (4, 2, '2024-01-04', 400),
   (5, 2, '2024-01-05', 500),
   (6, 2, '2024-01-06', 600),
   (7, 3, '2024-01-07', 700),
   (8, 3, '2024-01-08', 800),
   (9, 3, '2024-01-09', 900),
   (10, 4, '2024-01-10', 1000),
   (11, 4, '2024-01-11', 1100),
   (12, 4, '2024-01-12', 1200),
   (13, 5, '2024-01-13', 1300),
   (14, 5, '2024-01-14', 1400),
   (15, 5, '2024-01-15', 1500);

   ALTER TABLE `commande` ADD CONSTRAINT `commande_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id`);
   ```

## Autoriser l'accès pour l'évaluation

Pour évaluer votre TP, je dois avoir accès à votre serveur **via SSH avec mon utilisateur**. Ajoutez ma clé publique à votre serveur pour **votre utilisateur standard** (pas root).

- **Procédure automatique (recommandée) :**

  ```bash
  # Exécutez cette commande en tant que votre utilisateur standard (pas root)
  curl https://gist.githubusercontent.com/c4software/7902465cf82695ab5260a202757fe0ca/raw/dda707234b009333483556da61f8a990e08215ed/id_rsa_etudiant.pub >> ~/.ssh/authorized_keys
  ```

- **Vérification :** Le fichier `~/.ssh/authorized_keys` doit contenir votre clé publique ET la mienne.

## Restitution

Pour restituer le projet, merci de me fournir les éléments suivants via le formulaire indiqué :

1. **Informations d'accès :**
   - L'adresse IP de votre serveur.
   - Le nom d'utilisateur de votre compte standard (celui pour la connexion SSH).
   - Le port SSH si différent de 22.
2. **Fiche serveur :** Complète et à jour.
3. **Rapport illustré :**
   - Documentez les étapes clés avec les commandes utilisées et/ou des captures d'écran pertinentes.
   - **Incluez impérativement :**
     - La configuration réseau (IP/masque/passerelle/DNS).
     - Les commandes/preuves de la configuration SSH sécurisée (`PermitRootLogin no`, `PasswordAuthentication no`).
     - La configuration des VirtualHosts Apache (contenu des fichiers `.conf`).
     - La preuve du déploiement Git (ex: `git log` ou capture d'écran du site).
     - Une capture d'écran du site PHP sur le port 8080 affichant les informations dynamiques.
     - Une capture d'écran de PHPMyAdmin montrant les tables `utilisateur` et `commande` dans la base `tp5`.
     - **Une brève réflexion (2-3 lignes) sur les implications de sécurité des privilèges `GRANT ALL PRIVILEGES ON tp5.*` accordés à l'utilisateur `tp5`.**
     - **Un exemple de ligne de log d'accès Apache (`access.log`) pour une requête vers le site du port 80 ou 8080.**
     - Si bonus cron : la ligne de cron ajoutée.

Le rendu se fera via le formulaire suivant : [Rendre le TP](https://forms.gle/1U7j3Wwku1gpNMDf6)

Bravo, vous avez terminé le TP !

## Script de vérification (Indicatif)

Pour information, voici le type de vérifications qui seront effectuées (le script exact peut varier).

```bash
#!/bin/bash

# Fonction pour se connecter en SSH et exécuter une commande (adapte avec le port si nécessaire)
function ssh_execute {
    ssh -o "PreferredAuthentications=publickey" -o "StrictHostKeyChecking=no" -o "PasswordAuthentication=no" -i ~/.ssh/id_rsa_etudiant "$1"@$2 "$3"
}

# Tableau contenant les utilisateurs et les IPs des serveurs à vérifier (sera rempli avec vos infos)
# Exemple: array=("$USER;$IP")
array=(
    "utilisateur_test;192.168.1.XX"
)

# Itérer sur le tableau
for i in "${array[@]}"
do
    IFS=';' read -ra parts <<< "$i"
    user=${parts[0]}
    target_ip=${parts[1]}
    # PORT_SSH=22 # Adapter si besoin

    echo "Validation de la VM $user@$target_ip"

    # Vérifier connexion SSH sans mot de passe et pas en root (implicite par ssh_execute)
    echo -n "  - Accès SSH via clé OK ? "
    ssh_execute $user $target_ip "echo OK" || echo "KO"

    # Vérifier config SSHD
    echo -n "  - SSHD PermitRootLogin no ? "
    ssh_execute $user $target_ip "sudo grep -E '^PermitRootLogin\s+no' /etc/ssh/sshd_config" && echo "OK" || echo "KO"
    echo -n "  - SSHD PasswordAuthentication no ? "
    ssh_execute $user $target_ip "sudo grep -E '^PasswordAuthentication\s+no' /etc/ssh/sshd_config" && echo "OK" || echo "KO"

    # Vérification web
    echo -n "  - Site Port 80 (Blog) accessible ? "
    curl -s --head http://$target_ip:80 | grep "HTTP/1.[01] [23].." && echo "OK" || echo "KO"
    echo -n "  - Site Port 8080 (PHP) accessible ? "
    curl -s --head http://$target_ip:8080 | grep "HTTP/1.[01] [23].." && echo "OK" || echo "KO"
    echo -n "  - Site Port 8080 contient H1, H2, P, Footer ? "
    curl -s http://$target_ip:8080 | grep -q '<h1>' && curl -s http://$target_ip:8080 | grep -q '<h2>' && curl -s http://$target_ip:8080 | grep -q '<p>' && curl -s http://$target_ip:8080 | grep -q '<footer>' && echo "OK" || echo "KO"
    echo -n "  - PHPMyAdmin Port 9090 accessible ? "
    curl -s --head http://$target_ip:9090 | grep "HTTP/1.[01] [23].." && echo "OK" || echo "KO"

    # Vérifier la base de données MySQL
    echo -n "  - Connexion BDD user tp5 OK ? "
    ssh_execute $user $target_ip "mysql -u tp5 -p'voici-le-mot-de-passe-de-la-bdd' -h 127.0.0.1 -e 'SELECT 1;' > /dev/null 2>&1 && echo OK" || echo "KO"
    echo -n "  - Base tp5 existe ? "
    ssh_execute $user $target_ip "mysql -u tp5 -p'voici-le-mot-de-passe-de-la-bdd' -h 127.0.0.1 -e 'use tp5; show databases;' | grep -q 'tp5' && echo OK" || echo "KO"
    echo -n "  - Tables utilisateur/commande existent ? "
    ssh_execute $user $target_ip "mysql -u tp5 -p'voici-le-mot-de-passe-de-la-bdd' -h 127.0.0.1 -e 'use tp5; show tables;' | grep -q 'commande' && mysql -u tp5 -p'voici-le-mot-de-passe-de-la-bdd' -h 127.0.0.1 -e 'use tp5; show tables;' | grep -q 'utilisateur' && echo OK" || echo "KO"
    echo -n "  - Nombre lignes utilisateur (5) OK ? "
    ssh_execute $user $target_ip "mysql -u tp5 -p'voici-le-mot-de-passe-de-la-bdd' -h 127.0.0.1 -e 'select count(*) from tp5.utilisateur;' --skip-column-names | grep -q '5' && echo OK" || echo "KO"
    echo -n "  - Nombre lignes commande (15) OK ? "
    ssh_execute $user $target_ip "mysql -u tp5 -p'voici-le-mot-de-passe-de-la-bdd' -h 127.0.0.1 -e 'select count(*) from tp5.commande;' --skip-column-names | grep -q '15' && echo OK" || echo "KO"

    echo ""
done
```
