---
description: Dans ce TP, vous allez devoir mettre en place un serveur permettant d'héberger un site Web et une base de données.
---

# TP5. Créer un serveur Web et une base de données.

::: details Sommaire
[[toc]]
:::

## Introduction

Dans les précédents TP, nous avons traité de la création d'une VM, de l'installation d'un serveur Web et d'une base de données. Dans ce TP, vous allez devoir mettre en place un serveur permettant d'héberger un site Web et une base de données. Il n'y aura pas de procédure pas à pas, à vous de mettre en place les éléments vus précédemment.

Vous avez atteint un point étape. Vous avez maintenant la capacité de créer des serveurs Web et des serveurs de base de données.

Ce TP est un donc une synthèse des précédents.

<center><iframe src="https://giphy.com/embed/CjmvTCZf2U3p09Cn0h" width="480" height="452" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></center>

::: tip TP évalué

Nous sommes à un point étape. La réalisation de ce TP sera évaluée. Il sera évalué de la manière suivante :

- VM fonctionnelle : **5 points** (en intégrant les éléments de sécurité).
- Accès à la VM via échange de clés : **2 points**. (La clé publique à ajouter à votre VM est disponible en fin de TP).
- Réalisation des étapes présentées dans le TP : **5 points**.
- Site web 1 fonctionnel : **2.5 points**.
- Site web 2 fonctionnel : **2.5 points**.
- Base de données présente : **2.5 points**.
- PHPMyAdmin présent : **2.5 points**.
- **Fourniture d'un rapport illustrant les différentes étapes** : **2 points**.
- **Fourniture de la fiche serveur** : **2 points**.

:::

Vous avez à votre disposition l'ensemble des documents nécessaires. Vous pouvez également vous aider des TP précédents, et plus particulièrement de :

- [TP1. Créer une VM depuis un modèle.](./tp1alt.md)
- [TP2. Installer un serveur Web.](./tp2.md)
- [TP3. Installer une base de données.](./tp3.md)
- [TP4. Déployer votre code.](./tp4.md)

::: danger Attention

N'oubliez pas de documenter votre travail. Vous devez fournir un rapport illustrant les différentes étapes de ce TP. Vous devez également fournir la fiche serveur.

:::

Ici pas de procédure pas-à-pas. Vous devez réaliser les éléments suivants :

## Partie Serveur

- Créer **une** nouvelle VM à l'aide du modèle (DEBIAN 11.5)
- Nommer votre VM `<VOTRE-NOM>-serveur-tp5` (dans l'interface de VMWare, **mais également dans votre serveur**).
- Votre serveur doit être accessible depuis votre utilisateur.
- Le mot de passe du compte root doit être modifié (et documenté).
- Vous devez accéder à votre serveur via une clé privée (à l'aide de SSH ou Putty).

## Partie Web

- Votre serveur doit posséder un serveur Web (Apache)
- Votre serveur doit posséder un serveur PHP 8 (la version la plus récente disponible sur le dépôt Ondrej).
- Votre serveur doit posséder deux sites :
  - Le premier doit être accessible via le port 80.
  - Le second doit être accessible via le port 8080.

### Le site sur le port 80

Le site sur le port 80 doit être votre blog (réalisé en début de formation). Celui-ci doit être déployé sur votre serveur via Git.

::: tip Hey toi !

Un bonus sera accordé si votre déploiement est automatisé via un cron. **À documenter dans votre rapport**.

:::

### Le site sur le port 8080

Le site sur le port 8080 doit être un site en PHP. Il doit afficher les éléments suivants :

- Un titre principal (`<h1>`) avec dedans écrit "Bienvenue sur mon site".
- Dans un sous-titre (`<h2>`), la date du jour suivit de l'heure.
- Un `<hr>`.
- Un paragraphe (`<p>`) avec dedans écrit "Bonjour, je suis `<VOTRE-NOM>` et je suis en BTS SIO".
- Un pied de page (`<footer>`) contenant le nom de votre serveur et l'adresse IP de celui-ci (obtenue via le PHP).

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

- Votre serveur doit avoir MariaDB installé.
- Votre serveur doit posséder une base de données nommée `tp5`.
- Votre serveur doit posséder un utilisateur nommé `tp5` avec le mot de passe `voici-le-mot-de-passe-de-la-bdd`.
- L'utilisateur `tp5` doit avoir tous les droits sur la base de données `tp5`.
- PhpMyAdmin doit être installé et accessible via **le port 9090**.
- La base de données `tp5` doit contenir les informations du script SQL suivant :

```sql
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
(1, 1, '2023-01-01', 100),
(2, 1, '2023-01-02', 200),
(3, 1, '2023-01-03', 300),
(4, 2, '2023-01-04', 400),
(5, 2, '2023-01-05', 500),
(6, 2, '2023-01-06', 600),
(7, 3, '2023-01-07', 700),
(8, 3, '2023-01-08', 800),
(9, 3, '2023-01-09', 900),
(10, 4, '2023-01-10', 1000),
(11, 4, '2023-01-11', 1100),
(12, 4, '2023-01-12', 1200),
(13, 5, '2023-01-13', 1300),
(14, 5, '2023-01-14', 1400),
(15, 5, '2023-01-15', 1500);

ALTER TABLE `commande` ADD CONSTRAINT `commande_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id`);
```

## Autoriser l'accès à votre serveur

Pour évaluer votre TP, je dois avoir accès à votre serveur. Comme dans le précédent TP je souhaite que vous ajoutiez une clé publique à votre serveur. Pour cela, vous devez :

### Procédure manuelle

- Récupérez ma clé SSH publique (télécharger le fichier [ici](https://gist.githubusercontent.com/c4software/7902465cf82695ab5260a202757fe0ca/raw/dda707234b009333483556da61f8a990e08215ed/id_rsa_etudiant.pub)).
- Ajouter le contenu du fichier `id_rsa_etudiant.pub` dans le fichier `~/.ssh/authorized_keys` de votre utilisateur sur le serveur (exemple : `/home/VOTRE-USER/.ssh/authorized_keys`).
  - Vous pouvez utiliser `nano` ou `vim` pour éditer le fichier.

### Procédure automatique via `curl` <Badge type="tip" text="Meilleure solution" vertical="top" />

```bash
su - # Se connecter en tant que root
apt install curl # Installer curl si ce n'est pas déjà fait
exit # Se déconnecter en tant que root
curl https://gist.githubusercontent.com/c4software/7902465cf82695ab5260a202757fe0ca/raw/dda707234b009333483556da61f8a990e08215ed/id_rsa_etudiant.pub >> ~/.ssh/authorized_keys # Ajouter la clé SSH publique dans le fichier authorized_keys
```

::: tip À la fin de cette étape, votre fichier `authorized_keys` devrait ressembler à ça :

```bash
ssh-rsa VotreClé ...
ssh-rsa MaClé ...
```

:::

## Remise du TP

## Restitution

Pour restituer le projet, merci de me fournir les éléments suivants :

- L'adresse IP de votre serveur ainsi que le nom d'utilisateur de votre serveur.
- Votre fiche serveur.
- Rapport illustrant les différentes étapes.

Le rendu se fera via le formulaire suivant : [Rendre le TP](https://forms.gle/1U7j3Wwku1gpNMDf6)

Bravo, vous avez terminé le TP !

## Script de vérification

Pour valider votre serveur, je vais utiliser un script de vérification. Le voici :

```bash
#!/bin/bash

# Fonction pour se connecter en SSH et exécuter une commande
function ssh_execute {
    ssh -o "PreferredAuthentications=publickey" -o "StrictHostKeyChecking=no" -i ~/.ssh/id_rsa_etudiant "$1"@$2 "$3"
}

# Tableau contenant les utilisateurs et les IPs des serveurs à vérifier
array=(
  "$USER;127.0.0.1"
)

# Itérer sur le tableau et afficher chaque utilisateur et IP séparément
for i in "${array[@]}"
do
    # Séparer la ligne en deux parties
    IFS=';' read -ra parts <<< "$i"
    
    user=${parts[0]}
    target_ip=${parts[1]}

    echo "Validation de la VM $user@$target_ip"

    # Vérifier le nom de la VM
    vm_name_result=$(ssh_execute $user $target_ip "hostname")

    # Vérifier l'OS
    os_result=$(ssh_execute $user $target_ip "lsb_release -ds")

    # Vérifier la mémoire 
    memory_result=$(ssh_execute $user $target_ip "awk '/MemTotal/{print \$2}' /proc/meminfo")

    # Vérifier le CPU
    cpu_result=$(ssh_execute $user $target_ip "nproc")

    # Vérifier le disque
    disk_result=$(ssh_execute $user $target_ip "df -h | grep '/dev/sda1'" | awk '{print $2}')

    # Compter le nombre de clé SSH dans le fichier authorized_keys
    ssh_key_count=$(ssh_execute $user $target_ip "cat ~/.ssh/authorized_keys | wc -l")

    # Verification web
    h1_check=$(ssh_execute $user $target_ip "wget -qO- http://localhost:8080 | grep -q 'h1' && echo 'true' || echo 'false'")
    h2_check=$(ssh_execute $user $target_ip "wget -qO- http://localhost:8080 | grep -q 'h2' && echo 'true' || echo 'false'")
    hr_check=$(ssh_execute $user $target_ip "wget -qO- http://localhost:8080 | grep -q 'hr' && echo 'true' || echo 'false'")
    footer_check=$(ssh_execute $user $target_ip "wget -qO- http://localhost:8080 | grep -q 'footer' && echo 'true' || echo 'false'")
    blog_check=$(ssh_execute $user $target_ip "wget -qO- http://localhost/ | grep -q 'html' && echo 'true' || echo 'false'")
    phpmyadmin_check=$(ssh_execute $user $target_ip "wget -qO- http://localhost:9090/ | grep -q 'html' && echo 'true' || echo 'false'")

    # Vérifier la base de données
    db_check=$(ssh_execute $user $target_ip "mysql -u tp5 -p'voici-le-mot-de-passe-de-la-bdd' -e 'show databases;' | grep -q 'tp5' && echo 'true' || echo 'false'")

    # Vérifier la présence des tables du script SQL
    table_check=$(ssh_execute $user $target_ip "mysql -u tp5 -p'voici-le-mot-de-passe-de-la-bdd' -e 'show tables;' | grep -q 'commande' && echo 'true' || echo 'false'")
    table_check=$(ssh_execute $user $target_ip "mysql -u tp5 -p'voici-le-mot-de-passe-de-la-bdd' -e 'show tables;' | grep -q 'utilisateur' && echo 'true' || echo 'false'")

    # Vérifier la présence du bon nombre de lignes dans la table utilisateur
    table_row_check=$(ssh_execute $user $target_ip "mysql -u tp5 -p'voici-le-mot-de-passe-de-la-bdd' -e 'select count(*) from utilisateur;' | grep -q '5' && echo 'true' || echo 'false'")

    # Vérifier la présence du bon nombre de lignes dans la table commande
    table_row_check=$(ssh_execute $user $target_ip "mysql -u tp5 -p'voici-le-mot-de-passe-de-la-bdd' -e 'select count(*) from commande;' | grep -q '14' && echo 'true' || echo 'false'")

    # Retourner le résultat
    echo "VM $user@$target_ip :"
    echo "  - Nom de la VM : $vm_name_result"
    echo "  - OS : $os_result"
    echo "  - Mémoire : $memory_result"
    echo "  - CPU : $cpu_result"
    echo "  - Disque : $disk_result"
    echo "  - Nombre de clé SSH : $ssh_key_count"
    echo "  - Web : $h1_check $h2_check $hr_check $footer_check $blog_check $phpmyadmin_check"
    echo "  - Base de données : $db_check"
    echo "  - Tables : $table_check"
    echo "  - Lignes : $table_row_check"
    echo ""
done
