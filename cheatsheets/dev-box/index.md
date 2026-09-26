---
description: "La dev-box : un environnement de développement complet (PHP, Laravel, Python, Node, bases de données, etc.) dans un conteneur Docker, prêt en quelques minutes."
---

# La dev-box : votre environnement de développement dans Docker

Document présentant l'installation et l'utilisation de la dev-box, votre environnement de développement complet dans Docker.

::: details Sommaire
[[toc]]
:::

## Introduction

La dev-box est un environnement de développement complet qui tourne dans **un seul conteneur Docker**. À l'intérieur, vous avez une vraie machine Linux (Arch Linux) dans laquelle vous installez, en une commande, les langages dont vous avez besoin : PHP, Laravel, Python, Node.js, Java, etc.

Vous ne « lancez » pas la dev-box comme un logiciel : vous vous y **connectez en SSH**, exactement comme vous le feriez sur un serveur. Vos fichiers, eux, restent visibles sur votre ordinateur : vous pouvez coder dans le terminal de la dev-box (avec Neovim, déjà configuré) ou avec votre éditeur habituel (VSCode, PhpStorm, etc.).

::: tip Conteneur ou machine virtuelle ?

Un conteneur n'est pas une machine virtuelle : il partage le noyau de votre machine, il est donc beaucoup plus léger. Si la notion est encore floue, l'[aide-mémoire Docker](/cheatsheets/docker/) est un bon point de départ.

:::

### Que contient la dev-box ?

La dev-box contient les éléments suivants :

- Des environnements de développement à installer en une commande (`devbox dev-env`) : PHP et Composer, Laravel, Symfony, Node.js, Python, Java, Go, Rust, .NET, Flutter, des outils audio et vidéo, etc.
- Des bases de données à la demande (`devbox dbs`) : MariaDB, MySQL, PostgreSQL, Redis, MongoDB, SQL Server.
- Docker dans la dev-box : `docker run` et `docker compose` fonctionnent à l'intérieur (grâce à Podman).
- Un terminal prêt à l'emploi : zsh, tmux, Neovim (LazyVim), lazygit, yazi (gestionnaire de fichiers), fzf, etc.
- Un catalogue d'outils en ligne de commande à installer au besoin (`devbox tui`) : btop, lazydocker, pgcli, etc.
- Les agents de code en ligne de commande (Claude Code, Codex, opencode, etc.).

### Pourquoi c'est intéressant ?

- **Le même environnement pour tout le monde.** Fini le « chez moi ça marche » : toute la classe a les mêmes versions.
- **Rien à installer sur votre machine**, à part Docker. L'installation tient en une commande, et vous voulez tout supprimer ? Un dossier à effacer, et c'est tout.
- **Vous installez uniquement ce dont vous avez besoin.** Un menu, vous cochez Laravel et Python, c'est prêt.
- **Vos données survivent.** Votre dossier personnel et vos projets sont stockés dans des volumes : mettre à jour la dev-box ne supprime rien.
- **Vous travaillez comme sur un vrai serveur Linux.** SSH, terminal, services : les réflexes que vous prenez ici sont ceux que vous utiliserez en production (voir par exemple [Installer Docker sur une Debian](/cheatsheets/serveur/debian-docker.md)).
- **Votre environnement vous suit partout.** Avec Tailscale, vous retrouvez la même dev-box depuis le lycée, chez vous ou sur une tablette (voir [Votre dev-box partout avec Tailscale](#votre-dev-box-partout-avec-tailscale)).
- **Une seule commande à retenir : `devbox`.** Elle liste tout ce que la dev-box sait faire, avec un menu.
- **Rien ne se met à jour dans votre dos.** La dev-box vous prévient quand une mise à jour est disponible, c'est vous qui décidez quand l'appliquer.

## Prérequis

Pour fonctionner, vous devez avoir installé Docker et Docker Compose sur votre machine. Pour cela, il vous suffit d'installer Docker Desktop :

- [Installer Docker](https://docs.docker.com/get-docker/)
- Sous Debian (ou un serveur Linux), suivez plutôt l'aide-mémoire [Installer Docker sur une Debian](/cheatsheets/serveur/debian-docker.md).

::: tip Docker Desktop

Il est possible que Docker Desktop vous demande de créer un compte. Vous pouvez le faire, mais ce n'est pas obligatoire.

Il est également possible que Docker Desktop vous demande de mettre à jour votre WSL. Pour cela, il vous suffit de suivre les instructions :

- Ouvrir un terminal (cmd, powershell, etc.)
- Exécuter la commande suivante : `wsl --update`

:::

Vous avez également besoin d'une **clé SSH** : c'est elle qui vous permet d'entrer dans la dev-box, sans mot de passe. Si vous n'en avez pas encore, suivez l'aide-mémoire [La clé SSH](/cheatsheets/ssh-key/) (une seule commande : `ssh-keygen -t ed25519`).

### Sous Windows : WSL 2

Sous Windows, **WSL 2 est obligatoire** : la dev-box s'installe et se lance dans WSL 2 (le Linux intégré à Windows), avec Ubuntu, et pas directement depuis PowerShell ou un autre terminal Windows. Si ce n'est pas déjà fait :

1. Dans un terminal PowerShell, installez Ubuntu : `wsl --install -d Ubuntu`, puis redémarrez si Windows vous le demande.
2. Dans Docker Desktop, ouvrez **Settings**, puis **Resources**, puis **WSL integration**, et activez l'intégration pour Ubuntu.
3. Ouvrez le terminal **Ubuntu** (depuis le menu Démarrer) : c'est dans ce terminal que vous lancerez toutes les commandes de cette page.

Vérifiez que Docker répond bien depuis Ubuntu avec `docker compose version`.

::: warning Restez dans votre dossier Linux

Lancez l'installation depuis votre dossier personnel Linux (`~`, c'est-à-dire `/home/<vous>`), **jamais** depuis `/mnt/c/...` : le disque Windows vu depuis WSL est très lent et ne gère pas les droits des fichiers Linux. L'installation vous prévient d'ailleurs si vous êtes au mauvais endroit.

Votre clé SSH doit aussi exister **côté Ubuntu** : si `ls ~/.ssh/*.pub` ne donne rien dans le terminal Ubuntu, lancez-y `ssh-keygen -t ed25519`.

:::

## Installation & Lancement

L'installation tient en une commande. Pas besoin de Git ni de télécharger le code de la dev-box : un script récupère l'image déjà construite et la démarre pour vous. Dans votre terminal (le terminal Ubuntu sous Windows) :

```bash
curl -fsSL https://raw.githubusercontent.com/c4software/dev-box/main/setup.sh | sh
```

Pas de `curl` sur votre machine ? `wget` fait la même chose :

```bash
wget -qO- https://raw.githubusercontent.com/c4software/dev-box/main/setup.sh | sh
```

Le script vérifie que Docker est bien là, puis vous pose quelques questions. `Entrée` garde la valeur proposée, et tout reste modifiable plus tard dans le fichier `.env`. Si [gum](https://github.com/charmbracelet/gum) est installé sur votre machine, les questions sont plus agréables (une liste pour choisir, un bouton oui / non), mais ce n'est pas nécessaire.

| Question                                 | Ce que je vous conseille de répondre                                                        |
| ---------------------------------------- | ------------------------------------------------------------------------------------------- |
| Install directory                        | `Entrée` : la dev-box s'installe dans `~/dev-box`                                            |
| Unix user inside the box                 | `Entrée` : l'utilisateur `dev`                                                               |
| Timezone                                 | `Entrée` : le fuseau horaire de votre machine                                                |
| Access (tailscale or ssh)                | `ssh` pour commencer (Tailscale est présenté [plus bas](#votre-dev-box-partout-avec-tailscale)) |
| Public key allowed in                    | `Entrée` : le script a trouvé votre clé publique dans `~/.ssh`. Sur un serveur, `github:votre-pseudo` autorise les clés de votre compte GitHub (celles de votre poste, si vous les y avez ajoutées). Sans clé dans `~/.ssh`, le script vous demande directement votre pseudo GitHub (« GitHub user to take the public keys from ») |
| SSH port on this host                    | `Entrée` : le port `2222`                                                                    |
| Address the SSH port listens on          | `Entrée` : `127.0.0.1`, la dev-box n'est accessible que depuis votre machine                 |
| GitHub token                             | Facultatif, voir ci-dessous                                                                 |
| Dev environments                         | Par exemple `laravel python` (voir [Installer vos environnements](#installer-vos-environnements)) |
| Turn podman on?                          | `y` si vous avez besoin des bases de données (voir [les bases de données](#les-bases-de-donnees)) |
| Pull the image and start the box now?    | `Entrée` : oui, le script télécharge l'image et démarre la dev-box                          |

::: tip Et Tailscale ?

Pour démarrer, l'accès `ssh` est le plus simple. Mais gardez Tailscale en tête : avec lui, votre dev-box devient accessible de partout, au lycée, à la maison ou depuis une tablette, avec vos projets et vos serveurs toujours en place, sans rien ouvrir sur votre box Internet. Vous pourrez l'activer à tout moment : tout est expliqué dans [Votre dev-box partout avec Tailscale](#votre-dev-box-partout-avec-tailscale).

:::

Le script écrit ensuite le fichier `~/dev-box/.env` avec vos réponses, puis, après la dernière question, télécharge l'image (environ 2 Go, quelques minutes la première fois) et démarre la dev-box. À la fin, il vous affiche la commande pour vous connecter.

::: details Le token GitHub, c'est quoi ?

Pendant l'installation de ses outils, la dev-box interroge beaucoup GitHub. Sans compte, GitHub limite le nombre de requêtes, et une installation peut échouer à cause de cette limite (surtout si toute la classe partage la même connexion). Un token GitHub **sans aucun droit** (aucune case cochée) suffit à lever cette limite : vous pouvez le créer dans les [paramètres de votre compte GitHub](https://github.com/settings/tokens).

C'est facultatif : vous pouvez laisser vide et l'ajouter plus tard dans le `.env` (`GITHUB_TOKEN=...`).

:::

### Voir votre site depuis le navigateur

::: danger Accès par Tailscale ?

Bonne nouvelle, vous n'avez rien à faire : tous les ports de votre dev-box sont accessibles depuis votre réseau Tailscale (par exemple `http://dev-box:8000` pour un serveur lancé avec `--host=0.0.0.0`). Cette partie ne concerne que l'accès par SSH.

:::

Par défaut, seul le port SSH est ouvert. Pour voir dans votre navigateur les sites que vous lancerez dans la dev-box, il faut rendre le port `8000` accessible. Dans le dossier `~/dev-box`, créez (ou complétez) le fichier `compose.override.yaml` :

```yaml
services:
  dev-box:
    ports:
      - "127.0.0.1:8000:8000"
```

Si vous avez répondu `y` pour Podman, ce fichier existe déjà : ajoutez simplement les deux lignes `ports` sous `dev-box:`, sans toucher au reste.

Cette ligne redirige le port `8000` de votre machine vers le port `8000` de la dev-box : c'est exactement le même principe que dans l'aide-mémoire [Installer Docker sur une Debian](/cheatsheets/serveur/debian-docker.md#heberger-un-site-php). Relancez ensuite la dev-box pour prendre en compte le changement :

```bash
cd ~/dev-box
docker compose up -d
```

### Se connecter

```bash
ssh -p 2222 dev@localhost
```

À la première connexion, SSH vous demande si vous faites confiance à cette machine : répondez `yes`. Et voilà, vous êtes dans la dev-box 🎉

Vous pouvez suivre ce que fait la dev-box avec `docker compose logs -f`, depuis le dossier `~/dev-box` (`Ctrl + C` pour quitter les logs, la dev-box continue de tourner).

::: tip Première utilisation

Lors du premier démarrage, la dev-box prépare votre dossier personnel et installe ses outils (et les environnements demandés) en tâche de fond. Cela peut prendre plusieurs minutes : pas de panique si tout n'est pas encore là à la première connexion.

À la première connexion, la dev-box vous propose une visite guidée de deux minutes. Je vous conseille de l'accepter ; vous pourrez la relancer plus tard avec `devbox tour`.

:::

_Démo, de la commande d'installation à la première connexion (dans la vidéo, l'image était déjà téléchargée, et la visite guidée est remise à plus tard pour aller à l'essentiel) :_

<video controls preload="metadata" poster="./res/dev-box-installation.jpg" src="./res/dev-box-installation.mp4" style="width: 100%; border-radius: 8px;"></video>

::: details Pour aller plus loin : installer depuis le dépôt Git

Le script d'installation est la méthode conseillée. Vous pouvez aussi cloner le dépôt et construire l'image vous-même, par exemple pour tester une modification de la dev-box :

```bash
git clone https://github.com/c4software/dev-box.git
cd dev-box
cp .env.example .env
# Modifiez le .env (TS_DISABLE, SSH_AUTHORIZED_KEYS, etc.), puis :
docker compose up -d --build
```

La construction de l'image prend nettement plus de temps que son téléchargement.

_Démo de cette méthode, de zéro à la première connexion (dans la vidéo, le `.env` pointe sur l'image déjà construite avec `DEVBOX_IMAGE=ghcr.io/c4software/dev-box:latest`, ce qui évite la construction) :_

<video controls preload="metadata" poster="./res/dev-box-creation.jpg" src="./res/dev-box-creation.mp4" style="width: 100%; border-radius: 8px;"></video>

Tous les détails sont dans la page [installation manuelle](https://github.com/c4software/dev-box/blob/main/docs/manual-install.md) du dépôt.

:::

## Installer vos environnements

La dev-box démarre légère : c'est à vous d'installer les langages dont vous avez besoin. Une seule commande :

```bash
devbox dev-env
```

Un menu s'ouvre : choisissez « Install environments », cochez les environnements avec `x`, puis validez avec `Entrée`. Par exemple, pour les TP de cette année : `laravel` (qui installe aussi PHP, Composer et Node.js) et `python`.

Vous préférez sans menu ? C'est la même chose en une ligne :

```bash
devbox dev-env laravel python
```

Quelques commandes utiles :

- `devbox dev-env --list` : la liste des environnements disponibles, ceux installés sont marqués d'une étoile.
- `devbox dev-env --info laravel` : ce que l'environnement installe (et ce qu'une suppression laisse en place).
- `devbox dev-env --remove python` : supprime un environnement (vos projets ne sont jamais touchés).

::: details Que se passe-t-il derrière ?

Les environnements sont installés avec [mise](https://mise.jdx.dev/), un gestionnaire de versions : chaque outil est déclaré dans `~/.config/mise/config.toml`, dans votre dossier personnel. C'est pour cette raison qu'ils survivent à une mise à jour de la dev-box.

PHP fait exception : le compiler prendrait plusieurs minutes, il est donc déjà intégré à l'image (avec Composer, Xdebug et les extensions habituelles). `devbox dev-env php` vérifie simplement qu'il est prêt.

Les environnements donnés lors de l'installation sont notés dans le `.env` (`DEV_ENVS="laravel python"`) : ils sont réinstallés automatiquement s'ils manquent, même sur une dev-box toute neuve. Vous pouvez compléter cette ligne à tout moment (puis `docker compose up -d`). Conséquence : un environnement listé dans `DEV_ENVS` ne peut pas être supprimé avec `--remove`, il faut d'abord le retirer du `.env`.

:::

## Utilisation

_Démo, un projet Laravel (comme dans le TP [Introduction à Laravel](/tp/laravel/introduction.md)) puis Python :_

<video controls preload="metadata" poster="./res/dev-box-utilisation.jpg" src="./res/dev-box-utilisation.mp4" style="width: 100%; border-radius: 8px;"></video>

Dans cette vidéo, je :

1. installe Laravel et Python avec le menu `devbox dev-env` ;
2. crée un projet Laravel avec `composer create-project`, comme dans le TP ;
3. ouvre un second panneau tmux (`Ctrl + Espace` puis `v`) pour lancer le serveur avec `php artisan serve --host=0.0.0.0` ;
4. affiche le site dans le navigateur, sur [http://localhost:8000](http://localhost:8000) ;
5. ajoute une route `/ping` dans `routes/web.php` avec Neovim, puis la teste avec `curl` et dans le navigateur ;
6. crée un petit script Python, toujours avec Neovim, et l'exécute.

Le résultat dans le navigateur de votre machine :

![Le projet Laravel servi par la dev-box, affiché dans le navigateur](./res/dev-box-navigateur.jpg)

::: tip Pourquoi --host=0.0.0.0 ?

Par défaut, `php artisan serve` (comme `php -S`) n'écoute que sur `127.0.0.1`, c'est-à-dire **à l'intérieur** de la dev-box. Avec `--host=0.0.0.0`, le serveur accepte aussi les connexions qui arrivent de l'extérieur du conteneur, donc de votre navigateur.

:::

Les commandes à retenir :

| Commande                   | Ce qu'elle fait                                             |
| -------------------------- | ----------------------------------------------------------- |
| `devbox`                   | Menu avec toutes les commandes de la dev-box                |
| `devbox dev-env`           | Installe ou supprime des environnements (menu)              |
| `devbox dbs mariadb`       | Démarre MariaDB (voir [les bases de données](#les-bases-de-donnees)) |
| `devbox tui`               | Installe des outils en ligne de commande (btop, etc.)       |
| `devbox status`            | État de la dev-box (outils, bases, mises à jour)            |
| `devbox update`            | Met à jour les outils, quand vous le décidez                |
| `devbox tour`              | Relance la visite guidée                                    |
| `devbox override`          | Ce que vous avez modifié, et comment revenir en arrière     |
| `devbox diagnostic`        | Cherche ce qui ne va pas (voir [la FAQ](#quelque-chose-ne-fonctionne-pas-que-faire)) |

### Le terminal : tmux et Neovim

En vous connectant, vous arrivez dans une session [tmux](https://github.com/tmux/tmux/wiki) : si votre connexion SSH coupe, vos commandes (un serveur par exemple) continuent de tourner, et vous les retrouvez à la connexion suivante. Tous les raccourcis tmux commencent par `Ctrl + Espace`, puis :

- `v` : coupe l'écran en deux, un panneau à droite ;
- `o` : passe d'un panneau à l'autre ;
- `z` : met le panneau courant en plein écran (et inversement) ;
- `c` : ouvre une nouvelle fenêtre, `n` et `p` pour passer à la suivante ou à la précédente.

L'éditeur de la dev-box est [Neovim](https://neovim.io/), configuré avec [LazyVim](https://www.lazyvim.org/) : coloration, autocomplétion et analyse du code (PHP, Python, etc.) sont déjà en place. Au tout premier lancement, Neovim télécharge ses extensions : laissez-le travailler une minute.

Vous n'êtes pas à l'aise avec Neovim ? Pas de panique : vos projets sont aussi sur votre machine (voir [Où sont les fichiers ?](#ou-sont-les-fichiers)), vous pouvez donc les ouvrir dans VSCode et garder la dev-box pour les commandes.

### Les bases de données

`devbox dbs` démarre une base de données dans un conteneur, **à l'intérieur** de la dev-box. Pour cela, il faut autoriser la dev-box à lancer ses propres conteneurs (Podman).

Si vous avez répondu `y` à la question « Turn podman on? » de l'installation, c'est déjà fait, passez directement à la commande `devbox dbs mariadb` ci-dessous. Sinon, complétez votre `compose.override.yaml` (dans `~/dev-box`) :

```yaml
services:
  dev-box:
    ports:
      - "127.0.0.1:8000:8000"
    devices:
      - /dev/net/tun
      - /dev/fuse
    security_opt:
      - seccomp=unconfined
      - systempaths=unconfined
      - apparmor=unconfined
```

Puis dans le fichier `.env`, passez `PODMAN_ENABLE` à `true` et relancez avec `docker compose up -d`. En cas d'oubli, pas de panique : `devbox dbs` vous rappelle ces étapes. Ensuite, dans la dev-box :

```bash
devbox dbs mariadb
```

MariaDB est alors disponible sur `127.0.0.1:3306`, avec l'utilisateur `root` et un mot de passe vide :

```php
$pdo = new PDO("mysql:host=127.0.0.1;dbname=ma-base", "root", "");
```

::: details Que se passe-t-il derrière ?

La dev-box est elle-même un conteneur. Pour lancer MariaDB, elle démarre un conteneur **dans** son conteneur, grâce à [Podman](https://podman.io/) (un équivalent de Docker, qui accepte d'ailleurs les mêmes commandes `docker run`, `docker compose`, etc.).

Pour que ça fonctionne, il faut assouplir certaines protections du conteneur (`security_opt`). C'est sans risque pour un environnement de développement sur votre machine, mais c'est pour cette raison que l'option est désactivée par défaut.

:::

## Au-delà de PHP

La dev-box ne se limite pas au développement web en PHP. Voici ce que vous pouvez faire d'autre, sans rien installer sur votre machine.

### D'autres langages

Python, Java, Go, Rust, .NET, Node.js, Bun, Deno, Flutter, Ruby, Elixir, etc. : tout passe par `devbox dev-env`. La démo ci-dessus installe Python à côté de Laravel, et les deux cohabitent sans problème. Pour Python, l'outil [uv](https://docs.astral.sh/uv/) est installé en même temps : il gère vos dépendances et vos environnements virtuels.

### Audio, vidéo et images

`devbox dev-env media` installe de quoi télécharger, convertir et analyser des fichiers audio, vidéo et images : `ffmpeg`, `yt-dlp`, des optimiseurs d'images (`oxipng`, `pngquant`, `jpegoptim`, `cwebp`), `exiftool` (lire ou effacer les métadonnées d'une photo, dont la position GPS) et `mediainfo`. Bonus : avec `ffmpeg` installé, le gestionnaire de fichiers `yazi` affiche l'aperçu des vidéos.

### Réseau, bases de données et Ansible

Vous êtes en SISR ? Les outils de base sont déjà là : `dig`, `nslookup`, `nc`, `whois`, `traceroute`, `ping`, `ip`. `devbox dev-env network` ajoute `nmap`, `tcpdump`, `iperf3`, `mtr` et `doggo` (un `dig` plus lisible). Les commandes qui demandent les droits administrateur passent par `sudo`, sans mot de passe : `sudo nmap -sS 192.168.1.0/24`, `sudo tcpdump -i any port 80`. Attention tout de même, la dev-box est un conteneur : `tcpdump` ne voit que son propre trafic, pas celui de votre ordinateur ni du réseau local.

Pour interroger les bases de [`devbox dbs`](#les-bases-de-donnees), `psql` et `mariadb` sont fournis. `devbox dev-env db-clients` ajoute `mongosh` (MongoDB), `mycli` (MariaDB et MySQL, avec autocomplétion) et `usql` (un seul client pour presque toutes les bases, SQL Server compris).

Enfin, `devbox dev-env ansible` installe Ansible et `ansible-lint` : la dev-box devient votre poste d'administration, et vos cibles sont vos machines virtuelles ou les serveurs du labo, joints en SSH.

### Docker dans la dev-box

Une fois Podman activé (voir [les bases de données](#les-bases-de-donnees)), vous pouvez utiliser les commandes Docker habituelles dans la dev-box : `docker run`, `docker build`, `docker compose up`. C'est idéal pour tester le `docker-compose.yml` d'un projet ou suivre l'[aide-mémoire Docker](/cheatsheets/docker/). La commande `devbox tui lazydocker` vous installe même une interface pour gérer vos conteneurs.

### Des outils en ligne de commande

Certains outils sont déjà là : `lazygit` (Git en mode visuel), `yazi` (un gestionnaire de fichiers, avec aperçu des images), `fzf` (recherche floue), etc. D'autres s'installent à la demande avec `devbox tui` : `btop` (moniteur système), `pgcli` (client PostgreSQL), `atac` (client d'API, un équivalent de Postman), etc.

Besoin d'un paquet Arch Linux qui n'est pas dans le catalogue ? `devbox pkg add <paquet>` l'installe et le réinstalle automatiquement après chaque mise à jour de la dev-box.

### Les agents de code

Claude Code, Codex, opencode, pi et omp sont disponibles directement dans le terminal. `devbox agent` permet de choisir votre agent par défaut, de le lancer dans le dossier courant et de suivre votre consommation.

## Votre dev-box partout avec Tailscale

Jusqu'ici, la dev-box tourne sur votre ordinateur et vous vous y connectez depuis ce même ordinateur. C'est déjà très bien, mais la dev-box a été pensée pour aller plus loin : **une seule dev-box, accessible depuis toutes vos machines**. Elle peut tourner sur votre PC, sur un serveur ou même sur un Raspberry Pi 5, et vous la retrouvez depuis le lycée, depuis chez vous ou depuis une tablette, avec vos projets, vos onglets tmux et vos serveurs toujours en place.

C'est [Tailscale](https://tailscale.com/) qui rend ça possible.

### Tailscale, c'est quoi ?

Tailscale crée un **réseau privé** (un VPN) entre vos appareils, où qu'ils soient. Chaque machine y reçoit un nom : votre dev-box s'appelle simplement `dev-box`. Vous installez Tailscale sur votre ordinateur (ou votre téléphone), la dev-box a déjà Tailscale intégré, et les deux se voient comme s'ils étaient sur le même réseau local.

- **Rien à ouvrir sur votre box Internet** : aucun port n'est publié, la dev-box n'est pas visible depuis Internet.
- **Pas de clé SSH à copier** : c'est votre compte Tailscale qui vous authentifie.
- **Gratuit** pour un usage personnel.

::: tip Et Headscale ?

Tailscale s'appuie sur un serveur de coordination hébergé par l'entreprise Tailscale. [Headscale](https://headscale.net/) est une alternative Open Source à ce serveur, que vous pouvez héberger vous-même. La dev-box fonctionne avec les deux : il suffit de renseigner l'adresse de votre serveur dans `TS_LOGIN_SERVER`.

:::

### Activer Tailscale

Le plus simple est de choisir Tailscale dès l'installation : c'est d'ailleurs la réponse par défaut à la question « Access (tailscale or ssh) ». Le script affiche alors l'adresse à ouvrir dans votre navigateur pour ajouter la dev-box à votre réseau Tailscale.

Vous avez commencé en SSH classique ? Vous pouvez passer à Tailscale à tout moment :

1. Créez un compte sur [tailscale.com](https://tailscale.com/) et installez Tailscale sur votre ordinateur.
2. Dans le fichier `~/dev-box/.env`, passez `TS_DISABLE` à `false`.
3. Relancez la dev-box et affichez les logs :

```bash
docker compose up -d
docker compose logs -f
```

4. Les logs affichent une adresse : ouvrez-la dans votre navigateur pour ajouter la dev-box à votre réseau Tailscale. Cette étape n'est à faire qu'une seule fois.
5. Depuis n'importe quel appareil connecté à votre réseau Tailscale :

```bash
ssh dev@dev-box
```

Selon les réglages de votre compte, Tailscale peut vous demander de confirmer la connexion dans votre navigateur.

### Ce que Tailscale vous apporte en plus

- **Voir vos sites sans rien configurer.** Un serveur lancé avec `--host=0.0.0.0` est directement accessible sur `http://dev-box:8000` depuis toutes vos machines, sans `compose.override.yaml`.
- **Partager un site en cours de développement.** `devbox serve 8000` publie le port sur votre réseau Tailscale et affiche l'adresse à ouvrir, même pour un serveur qui n'écoute que sur `127.0.0.1`. `devbox serve off 8000` arrête le partage.
- **Envoyer des fichiers entre vos machines.** `devbox tailscale send` envoie un fichier vers un autre de vos appareils (un menu vous demande lequel), `devbox tailscale receive` réceptionne ceux qu'on vous envoie dans `~/inbox`. Dans le gestionnaire de fichiers `yazi`, le raccourci `c` puis `t` fait la même chose.

Tous les détails (auth key, Headscale, règles d'accès) sont dans la page [accès à la box](https://github.com/c4software/dev-box/blob/main/docs/access.md) du dépôt.

## Configuration

La configuration de la dev-box se fait en modifiant les fichiers du dossier `~/dev-box` de votre machine :

- `.env` : écrit par le script d'installation avec vos réponses, il contient les réglages de la dev-box (utilisateur, SSH, Tailscale, bases de données, etc.)
- `compose.override.yaml` : contient vos réglages propres à votre machine (ports supplémentaires, dossiers partagés, limites de mémoire, etc.)

Les principales variables du `.env` :

- `DEVBOX_IMAGE` : l'image à utiliser (`ghcr.io/c4software/dev-box:latest`, l'image déjà construite).
- `USER_NAME` : votre nom d'utilisateur dans la dev-box (`dev` par défaut).
- `TZ` : le fuseau horaire.
- `TS_DISABLE` : `true` pour se connecter en SSH classique, `false` pour passer par Tailscale.
- `SSH_AUTHORIZED_KEYS` : la ou les clés publiques autorisées à se connecter (une par ligne).
- `SSH_PORT` : le port SSH sur votre machine (`2222` par défaut).
- `SSH_BIND` : l'adresse sur laquelle ce port écoute (`127.0.0.1` : votre machine uniquement).
- `PROJECTS_DIR` : le dossier de votre machine qui contient vos projets (`./data/projets` par défaut).
- `PODMAN_ENABLE` : `true` pour pouvoir lancer des conteneurs (et donc des bases de données) dans la dev-box.
- `DEV_ENVS` : les environnements à installer automatiquement au démarrage, par exemple `DEV_ENVS="laravel python"`.
- `GITHUB_TOKEN` : le token GitHub facultatif (voir [l'installation](#installation-lancement)).

Après chaque modification, relancez la dev-box avec `docker compose up -d` (depuis `~/dev-box`).

::: tip Qu'est-ce que j'ai changé ?

À force de personnaliser votre dev-box (configuration de Neovim, outils ajoutés, réglages du `.env`, etc.), il est facile d'oublier ce que vous avez modifié. Dans la dev-box, `devbox override` liste tout ce qui diffère de la configuration d'origine, et donne pour chaque point la commande qui permet de revenir en arrière. Elle ne modifie rien : elle se contente d'afficher. `devbox override --diff` montre le détail des modifications dans les fichiers.

C'est la première commande à lancer si votre dev-box ne se comporte pas comme celle de votre voisin.

:::

## Où sont les fichiers ?

Vos projets doivent être placés dans le dossier `~/projets` de la dev-box. Ce dossier correspond au dossier `~/dev-box/data/projets` sur votre machine : c'est **le même dossier**, vu des deux côtés.

Vous pouvez donc ouvrir `~/dev-box/data/projets` dans VSCode sur votre machine, et lancer vos commandes (`php`, `composer`, `npm`, `python`, etc.) dans la dev-box.

Votre dossier personnel (configuration, historique, outils installés) est dans `~/dev-box/data/home`. Ces deux dossiers survivent aux mises à jour de la dev-box.

::: tip Sous Windows

Le dossier est dans Ubuntu (WSL) : depuis l'Explorateur Windows, vous le retrouvez sous **Linux**, puis **Ubuntu**, puis `home/<vous>/dev-box/data/projets`. Pour VSCode, le plus confortable est de lancer `code ~/dev-box/data/projets` depuis le terminal Ubuntu (avec l'extension WSL de VSCode).

:::

::: danger Attention

Le dossier `data` contient tout votre travail. Ne le supprimez pas, et pensez à versionner vos projets avec Git (voir l'[aide-mémoire Git](/cheatsheets/git/)).

:::

## FAQ

### Comment voir mon site dans le navigateur ?

Dans la dev-box, lancez le serveur en écoutant sur toutes les interfaces :

```bash
php artisan serve --host=0.0.0.0   # Laravel
php -S 0.0.0.0:8000                # PHP « classique »
```

Votre site est alors accessible à l'adresse suivante : [http://localhost:8000](http://localhost:8000).

⚠️ Il faut avoir créé le `compose.override.yaml` avec la ligne `ports` (voir [Voir votre site depuis le navigateur](#voir-votre-site-depuis-le-navigateur)). ⚠️

Besoin d'un autre port (par exemple `5173` pour Vite) ? Ajoutez une ligne `- "127.0.0.1:5173:5173"` sous `ports`, puis relancez avec `docker compose up -d`.

### Comment accéder à MariaDB depuis mon PC ?

Si vous souhaitez utiliser un client graphique sur votre machine, comme [DBeaver](https://dbeaver.io/), ouvrez d'abord un tunnel SSH, puis connectez-vous sur `localhost:3306` :

```bash
ssh -p 2222 -L 3306:127.0.0.1:3306 dev@localhost
```

🚨 Les bases ne redémarrent pas toutes seules. Après un redémarrage de votre machine, relancez `devbox dbs mariadb` : vos données sont conservées. 🚨

### Et MySQL, PostgreSQL, MongoDB ?

Même principe : `devbox dbs mysql`, `devbox dbs postgres`, `devbox dbs mongodb`, `devbox dbs redis`, etc. La commande `devbox dbs --list` affiche l'image, le port et l'état de chaque base. Pour PostgreSQL, l'utilisateur est `postgres` (sans mot de passe) ; pour MongoDB, l'utilisateur est `admin` et le mot de passe `admin123`.

MariaDB et MySQL utilisent tous les deux le port `3306` : une seule des deux peut tourner à la fois. `devbox dbs --stop mariadb` arrête une base sans rien supprimer.

### Où est PHPMyAdmin ?

Il n'y en a pas, volontairement. Je vous conseille [DBeaver](https://dbeaver.io/) avec le tunnel SSH ci-dessus : il fonctionne avec toutes les bases de données, pas seulement MySQL.

### Comment tester l'envoi de mails ?

La dev-box ne contient pas de serveur mail, mais vous pouvez démarrer [Mailpit](https://mailpit.axllent.org/) (l'équivalent moderne de MailHog) en une commande, une fois Podman activé :

```bash
docker run -d --name mailpit -p 8025:8025 -p 1025:1025 axllent/mailpit
```

Le serveur SMTP est alors disponible sur le port `1025` de l'adresse `127.0.0.1`, et l'interface web sur le port `8025` (à ajouter dans `ports` du `compose.override.yaml` pour l'ouvrir dans votre navigateur).

### Comment arrêter la dev-box ?

Depuis le dossier `~/dev-box` de votre machine :

```bash
docker compose stop   # Arrête la dev-box
docker compose start  # La redémarre
```

`docker compose down` supprime le conteneur, mais pas vos fichiers : ils sont dans le dossier `data`.

### Comment mettre à jour ?

Deux niveaux de mise à jour :

- Les outils (environnements, Neovim, agents, etc.) : `devbox update` dans la dev-box.
- L'image elle-même (Arch Linux, PHP, etc.) : relancez simplement la commande d'installation sur votre machine. Elle détecte la dev-box existante, télécharge la dernière image et redémarre la dev-box, **sans jamais toucher** à votre `.env`, à votre `compose.override.yaml` ni au dossier `data`. Vous pouvez aussi, depuis `~/dev-box`, lancer `docker compose pull && docker compose up -d`.

La dev-box vous indique à la connexion quand une mise à jour est disponible, et `devbox changelog` vous montre ce qui a changé.

### Comment désinstaller la dev-box ?

Depuis votre machine :

```bash
cd ~/dev-box
docker compose down --rmi all
```

Puis supprimez le dossier `~/dev-box`. Attention : c'est ce dossier qui contient `data`, donc **vos projets et votre dossier personnel**. Sous Linux, certains fichiers appartiennent à `root` : il faut alors `sudo rm -rf ~/dev-box`.

### Quelque chose ne fonctionne pas, que faire ?

Pas de panique, la dev-box sait s'examiner elle-même. Dans l'ordre :

1. `devbox status` affiche l'état général : accès, Podman, outils, environnements en cours d'installation, mises à jour.
2. `devbox diagnostic "votre problème"` lance votre agent de code sur un guide de diagnostic : il rassemble les informations, vous explique ce qui ne va pas et vous propose la correction. Il vous demande toujours votre accord avant de modifier quoi que ce soit. Par exemple : `devbox diagnostic "MariaDB ne démarre pas"`. Sans description, il cherche tout seul ce qui cloche.
3. Vous n'avez pas d'agent configuré, ou le problème persiste ? `devbox diagnostic --report` produit le même état des lieux, sans IA. Enregistrez-le dans un fichier et envoyez-le moi :

```bash
devbox diagnostic --report > ~/diagnostic.txt
```

Le fichier se retrouve sur votre machine dans `~/dev-box/data/home/diagnostic.txt`. Il ne contient aucun secret (ni token, ni clé), vous pouvez l'envoyer tel quel.

Et si vous n'arrivez même plus à vous connecter en SSH ? Depuis votre machine, cette commande vous ouvre un terminal dans la dev-box sans passer par SSH :

```bash
docker exec -it -u dev dev-box zsh -l
```

### Est-ce Open Source ?

Oui la dev-box est Open Source, vous pouvez retrouver le code source sur GitHub :

- [La dev-box](https://github.com/c4software/dev-box) et sa [documentation](https://github.com/c4software/dev-box/tree/main/docs) : [personnalisation](https://github.com/c4software/dev-box/blob/main/docs/customization.md), [commandes](https://github.com/c4software/dev-box/blob/main/docs/commands.md), [dépannage](https://github.com/c4software/dev-box/blob/main/docs/troubleshooting.md)
- [La configuration du terminal (dotarchy)](https://github.com/c4software/dotarchy)

### Comment puis-je contribuer ?

Vous pouvez contribuer de plusieurs manières :

- En utilisant la dev-box et en remontant les bugs.
- En remontant les bugs sur GitHub.
- En proposant des améliorations sur GitHub.
- En proposant des améliorations sur le Slack de la classe.

👋 Si vous avez des questions, n'hésitez pas.

### Comment puis-je vous contacter ?

Vous pouvez me contacter via :

- [Twitter](https://twitter.com/c4software)
