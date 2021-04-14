# Aide mémoire Docker

## Installation

### Windows

```sh
https://www.docker.com/products/docker-desktop
```

### MacOS

```sh
https://download.docker.com/mac/stable/Docker.dmg
```

### Linux

```
curl -sSL https://get.docker.com/ | sh
```

## Les images

### Recherche

```sh
docker search nginx
```

### Récupérer une image

```sh
docker pull nginx
```

## Lancer un conteneur

- Démarre l’image ubuntu:latest
- Déclare le port `80` du conteneur sur le port 3000 de votre machine.
- Monte le dossier courant dans le dossier `/data` du conteneur
- Note: Sur Windows vous devez remplacer `-v ${PWD}:/data` par `-v "C:\Data":/data`

```sh
docker run --name monConteneur -it -p 3000:80 -v ${PWD}:/data ubuntu:latest
```

## Les Logs

### Afficher les logs

```sh
docker logs monConteneur
```

### Afficher et suivre les logs

```sh
docker logs monConteneur -f
```

## Statistiques / Configuration

### Statistique du conteuner

```sh
docker stats monConteneur
```

### Les processus du conteneur

```sh
docker top monConteneur
```

### Le(s) port(s) exposé(s)

```sh
docker port monConteneur
```

### Voir les changements dans le conteneur

```sh
docker diff monConteneur
```

## Les images

### Liste

```sh
docker images
```

### Suppression

```sh
docker rmi nginx
```

### Créer une image depuis un conteneur

```sh
docker commit nginx
```

### Le Dockerfile

#### Dockerfile

```sh
FROM debian:latest

RUN apt-get update && apt-get install -y wget zip python-pip git

# Ajout Yasb
RUN pip install http://github.com/c4software/YASB/archive/master.zip

RUN mkdir /sources/
WORKDIR /sources/
```

#### Build

```sh
docker build  -t exemple/yasb .
```

## Nettoyage

### Suppression des image(s), conteneur(s) non utilisé(s)

```sh
docker system prune
docker volume prune
```
