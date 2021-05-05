# Déploiement continue d'un projet Firebase (function, web, …)

Je vous propose de créer ici la configuration qui vous permettra de déployer en continue sur Firebase

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

::: warning Gratuit … Mais pas vraiment
Attention même si vous n'allez pas payer pour utiliser le « free tier » Google à décidé de mettre en place l'obligation de passer en pay as you go pour la partie fonction.
:::

## Autoriser le déploiement depuis Gitlab-CI

- Sur votre machine : `firebase login:ci`
- Dans les SETTINGS partie CI/CD de votre projet, ajouter une variable `FIREBASE_DEPLOY_KEY` avec le token obtenue

## Le Gitlab-ci

Dans votre projet ajouter le fichier `.gitlab-ci.yml` avec le contenu suivant :

```yaml
image: node:15.5.1

cache:
  paths:
    - node_modules/

deploy_production:
  stage: deploy
  environment: Production
  only:
    - tags
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
