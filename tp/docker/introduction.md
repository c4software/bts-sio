---
description: Dans ce TP nous allons voir l’installation de Docker et les premiers exemples d’utilisations de votre nouvel environnement.
---

# Introduction à Docker

Dans ce TP nous allons voir l’installation de Docker et les premiers exemples d’utilisations de votre nouvel environnement.

::: details Sommaire
[[toc]]
:::

## Installation de Docker sous Windows

Pour installer Docker rien de plus simple, il suffit d’utiliser l’installeur officiel en le téléchargent sur [le site de Docker.](https://www.docker.com/docker-windows)

## Lancer Docker

Lancer Docker en tant qu’administrateur (et autoriser Hyper-V si celui-ci vous le demande).

## Quota et utilisation

Dans nos différents tests, nous allons utiliser le registry Docker officiel. Celui-ci depuis le mois dernier a mis en place des quotas assez « restrictif » pour les utilisateurs non authentifiés. Il est donc préférable de créer un compte Docker et de vous authentifier sur le registry. Pour cela rien de plus simple, il suffit d’entrer la commande suivante dans une console :

```bash
docker login
```

Il vous sera demandé de vous authentifier avec votre compte Docker. Une fois authentifié, vous pourrez télécharger des images avec une limite beaucoup plus élevée.

## Premier test

Maintenant qu’il est installé sur votre poste, rien de plus simple. Dans une console, entrez la commande suivante :

```bash
docker version
```

Vous devez voir la version de Docker.

- Que constatez-vous ?
- Pourquoi est-ce important d’utiliser une version récente ?

## Second test

Maintenant que nous savons que Docker est correctement installé, testons avec une « machine » fournie par Docker. L’image se nomme `hello-world`, celle-ci ne fait qu’afficher un message de bienvenue. De nouveau, dans la console, entrez la commande suivante :

```bash
docker run hello-world
```

![Docker Hello World](./ressources/hello-world.png)

- Que constatez-vous ?
- Comment être certain que l’image n’a rien fait d’anormal sur notre machine ?

## Les sources de l’image hello world

Maintenant que nous avons lancé notre première « vrai » machine, intéressons-nous à son fonctionnement. Vous avez du constater le terme « Pulling From » c’est l’image ou les morceaux d’image utile au fonctionnement de votre service. Celui-ci est téléchargé directement depuis le « Docker Hub » (il est également possible d’avoir un Hub privé). Vous pouvez voir « les sources » de l’image en question : [ici](https://github.com/docker-library/hello-world), comme beaucoup de projets libres l’image est disponible sur Github.

Surprise ! On retrouve des plateformes (amd64, i686, armXX). Et c’est normal, Docker est multiplate-forme et dans le cas de notre exemple l’exécutable « hello » est codé en C il est donc logique de retrouver l’exécutable pour les différentes plateformes ou l’image doit fonctionner.

Maintenant que nous avons vu le projet, entrons plus en détail, allons voir la définition de notre image le [fichier Dockerfile.](https://github.com/docker-library/hello-world/blob/master/i386/hello-world/Dockerfile)

![Hello World 2](./ressources/hello-world2.png)

Peu d’informations, 3 lignes :

- `FROM scratch` (Image de base, celle utilisée comme référence elle aussi possède un DockerFile).
- `COPY hello /` (ajoute le fichier hello à la racine de votre « machine »).
- `CMD ["/hello"]` (Commande lancée au démarrage de votre image).

PS On créera un DockerFile dans le 2nd TP.

## Pour aller plus loin

Bon, un texte à l’écran c’est bien… Mais si on lançait un système entier ? Ubuntu par exemple. Pour ça rien de plus simple, dans la console lancer :

```bash
docker run -it ubuntu bash
```

![Ubuntu](./ressources/ubuntu.png)

Et voilà, vous avez un Linux complètement opérationnel en quelques minutes sur votre poste Windows. Pratique ! Même si ce n’est pas vraiment le but premier de Docker c’est cool.

Utiliser un peu le shell de votre « nouveau Linux », exemple de commande :

- `uname -a` : Affiche la version du noyau.
- `whoami` : Qui suis-je ? (normalement root, d’ailleurs est-ce normal ?).
- `top` : Affiche les processus en cours.
- `ls /`

Questions :

- D’ailleurs, pourquoi le top ne retourne-t-il que deux processus ?
- Aucune trace des fichiers de votre machine… normale de base rien n’est accessible.

### Créer un fichier dans la machine

Créer un fichier vide avec la commande :

```bash
touch fichier_test
```

Vérifier avec un `ls` que le fichier est bien présent. Vous pouvez quitter votre l’image en saisissant `exit` dans le terminal. Relancer de nouveau l’image avec la commande :

```bash
docker run -it ubuntu bash
```

Faites à nouveau un `ls`, que constatez-vous ? Et bien oui, le fichier n’est plus présent… C’est normal, tous les fichiers créés dans l’image sont non persistants (c’est-à-dire qu’ils sont supprimés à chaque fois que l’image s’arrête).

### Avoir accès aux fichiers de votre machine

Bon, c’est bien, mais si l’on donnait accès à un stockage persistant à notre image. Sur votre machine le Stockage persistant c’est votre disque dur (HDD, SSD, etc.). Avec docker (comme sous Linux d’ailleurs) on parle de monter « un volume », une fois monté ce volume sera accessible comme un dossier (ou un fichier, on y reviendra).

#### Monter un dossier

Pour monter un volume il suffit d’ajouter un `-v` à la commande de lancement, exemple pour avoir le dossier courant :

⚠️⚠️ Attention ! L’accès est en lecture ET en écriture sur **VOTRE MACHINE** donc attention.

Sous Windows :

```bash
docker run -v %cd%:/mnt/ -it ubuntu bash # Monte le dossier courant dans le /mnt du Docker.
```

Sous Unix :

```bash
docker run -v $(pwd):/mnt/ -it ubuntu bash # Monte le dossier courant dans le /mnt du Docker.
```

Lancer la commande, `ls /mnt` vous devriez voir vos fichiers.

#### Monter un fichier

Comme je le disais dans l’introduction avec docker il est possible de rendre accessible le dossier, mais également les fichiers. Pour les fichiers la commande est la même sauf qu’au lieu de spécifier un dossier on spécifie le chemin d’un fichier. Exemple :

Windows :

```bash
docker run -v %cd%/mon_fichier:/mnt/mon_fichier -it ubuntu bash
```

Unix :

```bash
docker run -v $(pwd)/mon_fichier:/mnt/mon_fichier -it ubuntu bash
```

Le fichier est maintenant accessible dans votre image Docker. Il est également possible de limiter l’accès à votre fichier en le montant par exemple en « RO » en français « lecture seulement » :

```bash
docker run -v $(pwd)/mon_fichier:/mnt/mon_fichier:ro -it ubuntu bash
```

Et c’est la que l’on voit la puissance, on verra qu’il sera possible par la suite de créer de vrai « stack » applicative qui définiront l’ensemble des paramètres de notre environnement (cloisonné) et gérant finement les droits d’accès à la configuration par exemple ! Un régal !

## Utiliser Docker pour développer

Docker est un outil intéressant pour développer, il permet de créer des environnements de développement isolés et facilement reproductibles. Vous pouvez avec docker packager une application avec toutes ces dépendances pour la faire fonctionner sur n'importe quel système d'exploitation. Pour vous donner envie d'utiliser Docker, nous allons tester des exemples atypiques.

### Youtube-dl

Youtube-dl est un outil en ligne de commande permettant de télécharger des vidéos sur Youtube et d'autres sites de streaming. Il est disponible sous forme de conteneur Docker, ce qui vous permet de l'utiliser sans avoir à l'installer sur votre système.

```bash
alias ytdl='docker run --rm -v "$(pwd):/downloads" -it jauderho/yt-dlp:latest -x --audio-format mp3 --audio-quality 0 --embed-metadata'
```

Qu'avons-nous ici? 

- `alias ytdl=` : Crée un alias pour la commande, ce qui vous permet de l'utiliser plus facilement. (C'est une commande shell, pas une commande Docker).
- `docker run` : Lance un conteneur Docker.
- `--rm` : Supprime le conteneur après son utilisation.
- `-v "$(pwd):/downloads"` : Monte le répertoire courant dans le conteneur à l'emplacement `/downloads`. Cela vous permet de télécharger des fichiers directement dans votre répertoire de travail.
- `-it` : Lance le conteneur en mode interactif.
- `jauderho/yt-dlp:latest` : Spécifie l'image Docker à utiliser. Dans ce cas, il s'agit de l'image `jauderho/yt-dlp` avec la dernière version.
- `-x --audio-format mp3 --audio-quality 0 --embed-metadata` : Ce sont les options passées à `yt-dlp`, qui est l'outil utilisé pour télécharger les vidéos. Ces options permettent de télécharger la vidéo au format MP3 avec la meilleure qualité audio et d'incorporer les métadonnées.

Si vous souhaitez télécharger une vidéo pour en sauvegarder une copie au format MP3, il vous suffit de lancer la commande suivante :

```bash
ytdl https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

Je vous laisse tester. Vous allez voir que le téléchargement est rapide et que la qualité est au rendez-vous. Vous pouvez également utiliser d'autres options de `yt-dlp` pour personnaliser le téléchargement selon vos besoins.

### Autres exemples

Autre exemple « amusant » : Spotdl, un outil permettant de télécharger des chansons. Il est également disponible sous forme de conteneur Docker.

```bash
alias spotdl='docker run --rm -v "$(pwd):/music" spotdl/spotify-downloader --audio {youtube,youtube-music,soundcloud,bandcamp,piped} --output "{artist}/{album}/{track-number} - {title}.{output-ext}" download'
```

Qu'avons-nous ici?

- `alias spotdl=` : Crée un alias pour la commande, ce qui vous permet de l'utiliser plus facilement. (C'est une commande shell, pas une commande Docker).
- `docker run` : Lance un conteneur Docker.
- `--rm` : Supprime le conteneur après son utilisation.
- `-v "$(pwd):/music"` : Monte le répertoire courant dans le conteneur à l'emplacement `/music`. Cela vous permet de télécharger des fichiers directement dans votre répertoire de travail.
- `spotdl/spotify-downloader` : Spécifie l'image Docker à utiliser. Dans ce cas, il s'agit de l'image `spotdl/spotify-downloader`.
- `--audio {youtube,youtube-music,soundcloud,bandcamp,piped}` : Indique les sources audio à utiliser pour le téléchargement. Vous pouvez choisir parmi plusieurs options.
- `--output "{artist}/{album}/{track-number} - {title}.{output-ext}"` : Spécifie le format de sortie pour les fichiers téléchargés.
- `download` : Indique que vous souhaitez télécharger une chanson.

Si vous souhaitez télécharger une chanson, il vous suffit de lancer la commande suivante :

```bash
spotdl https://open.spotify.com/intl-fr/track/4PTG3Z6ehGkBFwjybzWkR8?si=b667ca05a91e4558
```

L'outil SpotDL va rechercher dans les metadata de la chanson pour la retrouver sur Youtube et la télécharger.

## Allons plus loin

Nous avons ici des petites machines pour jouer… C'est rigolo… Mais Docker est bien plus puissant que ça [la suite c'est par ici](./creer_server_local.md)
