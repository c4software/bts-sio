---
description: Ce document s'intéresse uniquement à la création d'un projet OpenFaas (NodeJS + Express), et pas à la création de la stack initiale OpenFaas.
---

# Création d'un projet OpenFaas (Express)

::: details Sommaire
[[toc]]
:::

Ce document s'intéresse uniquement à la création du projet OpenFaas, et pas à la partie « [création de la stack initiale OpenFaas](./openfaas-quicky-installation) ».

## Création du dossier pour le projet

```sh
mkdir exempleValentin && cd exempleValentin
```

## Création du projet

Faas-cli intègre un système de templates qui va nous permettre d'initialiser simplement un projet. Dans notre cas, nous allons créer un projet de type « Docker ».

```sh
faas-cli new --lang dockerfile --prefix c4software exempleValentin
```

::: warning --prefix ?
Le préfixe va nous permettre de créer une image privée sur le Docker Hub, vous devez donc le remplacer par votre nom d'utilisateur Docker.
:::

**Et c'est tout !** Votre stack est maintenant prête, nous allons créer un petit projet NodeJS + Express pour constater la simplicité.

## Init du projet Express

```sh
cd exempleValentin
npm init -y
npm i --save express
```

Nous allons créer un projet, celui-ci va contenir notre code source JavaScript.

## Création de l'index.js

```js
const express = require("express");
const app = express();
const port = 8080;

app.get("/ping", (req, res) => {
  res.send("Ceci est un pong");
});

app.get("/", (req, res) => {
  res.send("YO ! ");
});

app.listen(port, () => {
  console.log("Ready");
});
```

## Dockerfile à modifier

```dockerfile
FROM --platform=${TARGETPLATFORM:-linux/amd64} node:12.13.0-alpine as ship

RUN apk --no-cache add curl ca-certificates \
    && addgroup -S app && adduser -S -g app app
WORKDIR /root/
ENV NPM_CONFIG_LOGLEVEL warn

RUN mkdir -p /home/app

WORKDIR /home/app
COPY package.json ./
RUN npm i

COPY . .

RUN chown app:app -R /home/app && chmod 777 /tmp

USER app

CMD ["node", "index.js"]
```

## Lancer dans OpenFaas

```sh
faas-cli up -f exempleValentin.yml
```

🎉 La fonction est maintenant disponible pour répondre aux requêtes des clients.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/0lODC-vSGHU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Source : [https://www.openfaas.com/blog/serverless-nodejs/](https://www.openfaas.com/blog/serverless-nodejs/)

## Créer une image pour ARM

Dans le premier cas, nous avons réalisé une image à destination de la même architecture. Si vous souhaitez déployer sur une architecture de processeur différente, il faut :

```sh
# Compiler
faas-cli publish -f exempleValentin.yml --platforms linux/arm/v7 # ARM 32 bits
faas-cli publish -f exempleValentin.yml --platforms linux/arm64 # ARM 64 bits
faas-cli publish -f exempleValentin.yml --platforms linux/arm64,linux/arm/v7,linux/amd64 # ARM 64 bits, 32 bits, x86

# Déployer
faas-cli deploy -f exempleValentin.yml
```
