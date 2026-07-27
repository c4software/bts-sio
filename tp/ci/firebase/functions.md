---
description: Je vous propose de créer ici la configuration qui vous permettra de déployer en continu sur Firebase.
---

# Déploiement continu d'un projet Firebase (functions, web, …)

Je vous propose de créer ici la configuration qui vous permettra de déployer en continu sur Firebase.

::: details Sommaire
[[toc]]
:::

## Initialiser un projet Firebase (code source)

Client Firebase :

```sh
npm install -g firebase-tools
firebase login
```

## Créer un projet sur Firebase

Nouveau projet API « vide » :

```sh
firebase init functions
```

::: warning Gratuit… Mais pas vraiment
Attention, même si vous n'allez a priori rien payer en restant dans le « free tier », Google a décidé de rendre obligatoire le passage en « pay as you go » pour la partie functions.
:::

## Autoriser le déploiement depuis Gitlab-CI

- Sur votre machine : `firebase login:ci`
- Dans les Settings, partie CI/CD de votre projet, ajoutez une variable `FIREBASE_DEPLOY_KEY` avec le token obtenu.

## Le Gitlab-CI

Dans votre projet, ajoutez le fichier `.gitlab-ci.yml` avec le contenu suivant :

```yaml
image: node:22

cache:
  paths:
    - node_modules/

deploy_production:
  stage: deploy
  environment: Production
  rules:
    - if: $CI_COMMIT_TAG
  script:
    - cd functions/
    - npm install -g firebase-tools
    - npm install
    - firebase deploy --token $FIREBASE_DEPLOY_KEY

test:
  stage: test
  script:
    - cd functions/
    - npm install
    - npm run test
```
