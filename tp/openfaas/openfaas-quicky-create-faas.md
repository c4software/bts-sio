# Création d'un projet OpenFaas (Express)

Ce document s'intéresse uniquement à la partie création du projet openfaas et pas à la partie « [création de la stack inital openfaas](./openfaas-quicky-installation) ».

::: danger WIP
Ce document est en cours de rédaction
:::

## Création dossier pour le projet

```sh
mkdir exempleValentin && cd exempleValentin
```

## Création du projet

```sh
faas-cli new --lang dockerfile --prefix c4software exempleValentin
```

## Init projet express

```sh
cd exempleValentin
npm init -y
pnpm i --save express
```

## Création index.js

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

## Docker à modifier

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

## Lancer dans openfaas

```sh
faas-cli up -f exempleValentin.yml
```

🎉 La fonction est maintenant disponible pour répondre aux requêtes des clients.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/0lODC-vSGHU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Source : https://www.openfaas.com/blog/serverless-nodejs/
