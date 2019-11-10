# Aide mémoire Docker

## Installation

### Windows

```
https://download.docker.com/win/stable/InstallDocker.msi
```

### MacOS

```
https://download.docker.com/mac/stable/Docker.dmg
```

### Linux

```
curl -sSL https://get.docker.com/ | sh
```

## Les images

### Recherche

```
docker search nginx
```

### Récupérer une image

```
docker pull nginx
```

## Lancer un conteneur 

* Démarre l’image ubuntu:latest
* Déclare le port ```80``` du conteneur sur le port 3000 de votre machine.
* Monte le dossier courant dans le dossier ```/data``` du conteneur
* Note: Sur Windows vous devez remplacer ```-v ${PWD}:/data``` par ```-v "C:\Data":/data```

```
docker run --name monConteneur -it -p 3000:80 -v ${PWD}:/data ubuntu:latest
```

## Les Logs

### Afficher les logs

```
docker logs monConteneur
```

### Afficher et suivre les logs

```
docker logs monConteneur -f
```

## Statistiques / Configuration


### Statistique du conteuner

```
docker stats monConteneur
```

### Les processus du conteneur

```
docker top monConteneur
```

### Le(s) port(s) exposé(s)

```
docker port monConteneur
```

### Voir les changements dans le conteneur

```
docker diff monConteneur
```


## Les images

### Liste

```
docker images
```

### Suppression

```
docker rmi nginx
```

### Créer une image depuis un conteneur

```
docker commit nginx
```

### Le Dockerfile

#### Dockerfile
```
FROM     debian:latest

RUN apt-get update && apt-get install -y wget zip python-pip git

# Ajout Yasb
RUN pip install http://github.com/c4software/YASB/archive/master.zip

RUN mkdir /sources/
WORKDIR /sources/
```

#### Build

```
docker build  -t exemple/yasb .
```

## Nettoyage

### Suppression des image(s), conteneur(s) non utilisé(s)

```
docker system prune
```
