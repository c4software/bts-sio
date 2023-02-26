# Serveur / DevOps

## Déployer, automatiser, comprendre

Par [Valentin Brosseau](https://github.com/c4software) / [@c4software](http://twitter.com/c4software)

---

## Sommaire

- DevOps
- Les OS et les développeurs
- Qu'est-ce qu'un serveur (App, Web, BDD)
- La constitution d'un serveur (OS, Services, Applications)
- Les vhosts, les ports, etc.
- L'accès à distance

---

## Sommaire

- Diagnostiquer un problème
- La Sécurité (Ports, Services, Utilisateurs, Sauvegardes)
- Les différents types de serveurs (Physique, Virtuel, Cloud)
- Les environnements (Développement, Recette, Production)
- Les hébergeurs
- Docker

---

## Qu'est-ce que DevOps ?

Aujourd'hui, on parle de DevOps, mais c'est quoi ?

---

- DevOps est une culture, une philosophie, une approche
- DevOps est un ensemble de pratiques, de méthodes, d'outils
- DevOps est une approche centrée sur l'automatisation et l'agilité

---

Avez-vous déjà entendu parler de DevOps ?

---

Demain, vous aurez certainement le titre de DevOps…

Quelles seront vos missions ?

(Psst… c'est un peu fourre-tout)

---

- **Développer** (et maintenir) des applications.
- Choisir la **configuration** de votre serveur.
- **Déployer** votre application sur le serveur.
- **Automatiser** le déploiement de votre application.
- **Diagnostiquer** les **problèmes**.
- **Sécuriser** votre serveur.

---

![Devops Loop](./res/devops_loop.webp)

---

<fieldset>
  <legend>Définition</legend>
  <p>
    Le DevOps <b>s'assure de la qualité</b> de son application, de la  <b>disponibilité</b>, <b>performances</b> et <b>sécurité</b>.
  </p>
</fieldset>

---

## L'environnement de travail des développeurs

Et vous… vous utilisez quoi ?

---

Pourquoi ?

_(C'est une question sérieuse)_

---

Moi je suis développeur, je veux juste coder !

Mais…

---

J'ai besoin d'outils pour développer ?

---

Le plus important ?

- Un éditeur de texte
- Un terminal

---

![Linux, Mac, Windows](./res/tobias01.png)

---

## Windows

- [Visual Studio Code](https://code.visualstudio.com/)
- [Git Bash](https://gitforwindows.org/)
- [Windows Terminal](https://apps.microsoft.com/store/detail/windows-terminal/9N0DX20HK701?hl=fr-fr&gl=fr)
- [Windows Subsystem for Linux (WSL)](https://learn.microsoft.com/fr-fr/windows/wsl/install)

---

## Linux

- [Visual Studio Code](https://code.visualstudio.com/)
- Git : `sudo apt install git`
- Terminal : Intégré

---

## macOS

- [Visual Studio Code](https://code.visualstudio.com/)
- Git : `brew install git` (ou `xcode-select --install`)
- Terminal : Intégré

---

La force de Linux / macOS

- La puissance de la ligne de commande.
- La communauté.
- Les dépôts de paquets.
- L'intégration de Docker.

---

Comment choisir ?

À votre avis ?

---

En entreprise, c'est variable… mais chaque année en stage je constate que les entreprises utilisent :

- Windows (beaucoup).
- Linux (Souvent, Ubuntu).
- macOS (de temps en temps 👋).

---

![Linux, Mac, Windows](./res/os_share.jpg)

_Source: [fossbytes.com](https://fossbytes.com/windows-still-the-leading-os-for-software-development-followed-by-linux/)_

---

<fieldset>
  <legend>Définition</legend>
  <p>
    Choisir son OS pour un développeur est une question de <b>préférence</b> et de <b>confort,</b> mais aussi en fonction du langage de programmation <b>ciblé</b>.
  </p>
</fieldset>

---

## Et pourquoi pas les trois ?

C'est possible via la virtualisation.

Avec par exemple Proxmox.

---

## Avant de commencer

### Qu'est-ce qu'un serveur ?

---

Un serveur est un ordinateur qui fournit des services à d'autres ordinateurs.

- Web
- Base de données
- Fichiers

---

## Concrètement…

C'est un ordinateur qui tourne **24h/24** et **7j/7**.

---

Dans une salle spéciale, souvent climatisée.

---

![Serveur](./res/OVH-gazette.jpg)

_OVH_

---

![Serveur](./res/cloud.jpg)

---

![Serveur](./res/000873331_896x598_c.jpg)

_Google_

---

## On parle souvent de Cloud

Le cloud, c'est « juste » l'ordinateur d'un autre.

---

<fieldset>
  <legend>Définition</legend>
  <p>
    Un serveur est un ordinateur <b>connecté au réseau</b> qui fournit <b>des services</b> à d'<b>autres</b> ordinateurs.
  </p>
</fieldset>

---

## Et si vous pensiez plus petit ?

Les raspberry pi sont des ordinateurs à 35€. Ils peuvent être utilisés comme serveur.

---

![Serveur à domicile](./res/version1.jpg)

---

Créer un serveur à domicile permet réellement de progresser.

- Gérer le serveur
- Gérer l'installation
- Gérer la configuration
- Gérer la sécurité

---

## Un bon moyen de se familiariser avec la notion de serveur.

Essayer d'être curieux, en code oui, mais aussi sur les serveurs.

---

## Un instant…

### Comment se représenter un serveur ?

---

![Serveur](./res/serveur_linux.png)

---

- **Le système d'exploitation** est la couche la plus basse.

C'est la couche qui permet de faire fonctionner le serveur. Dans notre cas Linux.

---

- **Les Ports** : Ce sont des numéros qui permettent d'identifier un service.

Les ports vont permettre de rendre accessible le service depuis l'extérieur (de 1 à 65535).

---

- **Les utilisateurs** : Une machine == au moins un utilisateur le **root**.

Pour respecter les bonnes pratiques, il est préférable de créer un utilisateur dédié à chaque service.

---

- **Les services** : Ce sont définition des applications qui vont tourner en arrière-plan.

Par exemple, un serveur Web, un serveur de base de données, etc.

---

- **Les applications** : Ce sont les binaires qui vont être exécutés.

Par exemple, Apache, MySQL, etc.

---

- **Les Logs** : Ce sont des fichiers (habituellement dans le dossier `/var/log`) qui vont contenir les messages générés par les applications (erreurs, informations, etc.).

---

- **Les données** : Ce sont des fichiers exemple le code source de vos applications, ou encore les données de la base de données.

---

## Plusieurs types de serveurs

- Serveur Web.
- Serveur de base de données.
- Serveurs spécialisés.

---

## Serveur Web

- Serveurs de fichiers.
- Serveurs de code (PHP, Python, Node.js, etc.).

---

## Des logiciels

- Apache
- Nginx
- Autres (Lighttpd, Caddy, etc.)

![Apache Logo](./res/apache_logo.png)
![Nginx Logo](./res/nginx_logo.png)


---

## Un point en commun

**Les virtualhosts**

---

## Virtualhosts

<fieldset>
  <legend>Un virtualhost</legend>
  <p>
    Serveur Web qui peut servir plusieurs sites Web. Il est possible de configurer un virtualhost pour chaque site Web. Chaque virtualhost a son propre nom de domaine, port, logs.
  </p>
</fieldset>

---

## Les ports ? Les noms de domaine ?

- Les ports permettent de rendre accessible le service depuis l'extérieur.
- Les noms de domaine permettent de rendre accessible le service depuis l'intérieur.

---

Deux solutions pour découper notre serveur :

- Un port par site.
- Un nom de domaine par site.

---

## Les ports

- 80 : HTTP
- 443 : HTTPS
- 8080 : HTTP
- 8443 : HTTPS
- …

---

En réalité, votre serveur possède 65 535 ports. Les ports 80, 443, 8080, 8443 sont les ports par défaut, **mais vous pouvez en créer d'autres**.

---

## Les noms de domaine

- Payant (ou interne à l'organisation).
- Permets segmenter les services. (Exemple : `api.example.com`).
- Permets de rendre accessible le service depuis l'intérieur.
- Un nom de domaine = une infinité de sous-domaines sur un port unique (Exemple : `api.example.com`, `api.dev.example.com`, `api.prod.example.com`).

---

<fieldset>
  <legend>Le serveur Web</legend>
  <p>
    Le serveur Web est un logiciel qui permet de servir des fichiers statiques (HTML, CSS, JS, images, etc.) et des fichiers dynamiques (PHP, Python, Node.js, etc.).
  </p>

  <p>
    Il permet **d'héberger** un ou des sites Web. Chaque site sera accessible via un nom de domaine **et/ou** un port.
  </p>
</fieldset>

---

## Serveur de base de données

---

## Des questions ?
