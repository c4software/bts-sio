# Déployer une Image Docker dans Kubernetes

Nous avons vu précédemment qu'il était possible de compiler puis de packager une application grace à Gitlab-CI, dans ce TP nous allons voir comment déployer cette image (**présente dans un registry privée**) dans un cluster Kubernetes

::: details Sommaire
[[toc]]
:::

## Le Cluster

### Introduction

### k3d

#### Accès du cluster à distance

### Les solutions payantes

Alternative payante paas à k3d

## L'application à déployer

### Le projet

### La CI

### L'image Docker

## Le déploiement

### Introduction

### L'authentification avec le Registry Gitlab

### Le deployment.yml

### Le services.yml

### Le ingress.yml

## Déployer une mise à jour

### Votre code et la CI

### Modifier le deployment.yml

## La suite ?

La suite de cette introduction ça va être le déploiement automatisé en cas de mise à jour du projet. [La suite c'est par ici =>](./cd-avec-kubernetes.md)
