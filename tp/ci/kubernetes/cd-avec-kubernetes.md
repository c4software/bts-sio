# Déploiement continue et Image Docker dans Kubernetes

[Dans le précédent TP](./deploy-container-in-kubernetes.md) nous avons vu que nous pouvions deployer une image Docker produite par Gitlab-CI « directement » dans un cluster Kubernetes. Dans ce TP nous allons voir comment il est possible d'automatiser ce (re)déploiement.

::: details Sommaire
[[toc]]
:::

## Introduction

## Mise en place du CI

- Mettre les fichiers de configuration Kubernetes dans le projet (et parler de helm)
- Parler que le CI **ne vas pas initialiser la stack**, elle sera fait précédemment une première fois.
  - Reparler du secret gitlab et de la ligne commentée
  - Parler que l'on pourrais gérer l'init

## Authentification (aka comment se connecter à votre serveur depuis la CI)

Création d'une variable type file dans GITLAB (paramètre du projet) avec le contenu du fichier `kubeconfig` obtenu lors de la configuration du projet

-> À faire dans gitlab (mettre image)

## Configuration et variable dans la CI

-> Parler de sed pour le remplacement
-> Reparler de helm
-> Reparler de l'auth Kubernetes -> Regitry Gitlab

## Configuration du .gitlab-ci

### Ce n'est que de l'automatisation

### 3 étapes

### Un résultat possible

Exemple de configuration Pages + Docker + Kubernetes

```yaml
stages:
  - build
  - deploy
  - publish

build:
  image: node:latest
  stage: build
  script:
    - npm install
    - npm run gitlab
    - mv public public-vue
    - mv dist public
    - find public -type f -regex '.*\.\(htm\|html\|txt\|text\|js\|css\)$' -exec gzip -f -k {} \;
  artifacts:
    paths:
      - public
  only:
    - master

dockerise:
  image: docker:19.03.12
  stage: deploy
  dependencies:
    - build
  services:
    - docker:19.03.12-dind
  variables:
    IMAGE_TAG: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA
  script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker build -t $IMAGE_TAG .
    - docker push $IMAGE_TAG
  only:
    - master

publish_to_prod:
  image:
    name: bitnami/kubectl:latest
    entrypoint: [""]
  stage: publish
  dependencies:
    - dockerise
  script:
    # Décommenter pour autoriser le kubernetes à s'authentifier pour pull l'image docker
    # - kubectl create secret docker-registry gitlab-registry --docker-server="$CI_REGISTRY" --docker-username="$CI_DEPLOY_USER" --docker-password="$CI_DEPLOY_PASSWORD" --docker-email="$GITLAB_USER_EMAIL" -o yaml --dry-run=client | kubectl apply -f -
    - cat ./kubernetes/deployment.yaml | sed "s/{{CI_COMMIT_SHORT_SHA}}/$CI_COMMIT_SHORT_SHA/g" | kubectl apply -f -
    - kubectl apply -f ./kubernetes/services.yaml
    - kubectl apply -f ./kubernetes/ingress.yaml
  only:
    - master
```
