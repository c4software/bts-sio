---
aside: false
description: La liste des TP serveur et DevOps dans l'ordre dans lequel je vous conseille de les réaliser.
---

# Les TP serveur / DevOps

Vous trouverez ici la liste des TP serveur et DevOps, dans l'ordre dans lequel je vous conseille de les réaliser. Nous partons de la création d'une machine virtuelle pour aller jusqu'au déploiement automatisé.

## Étape 1 : Le serveur

La base de tout : créer, installer et configurer un serveur. Les TP suivent [le complément de cours Serveur](/tp/devops/serveur/support.md).

1. [TP 1 : Créer une VM sur la ferme](/tp/devops/serveur/tp1.md) (ou [à partir d'un modèle](/tp/devops/serveur/tp1alt.md))
2. [TP 1b : Installer votre premier serveur](/tp/devops/serveur/tp1b.md)
3. [TP 1c : Prendre en main la ligne de commande](/tp/devops/serveur/tp1c.md)
4. [TP 2 : Configurer un serveur Web](/tp/devops/serveur/tp2.md)
5. [TP 3 : Configurer un serveur de base de données](/tp/devops/serveur/tp3.md)
6. [TP 4 : Déployer (et redéployer) son code sur un serveur](/tp/devops/serveur/tp4.md)

::: warning Point étape
[TP 5 : Créer un serveur Web et base de données](/tp/devops/serveur/tp5.md). Un TP évalué pour valider l'ensemble de la partie serveur.
:::

::: tip Les supports associés
[Cours Serveur / DevOps](/cours/serveur.md), [Linux à base Debian](/cheatsheets/serveur/linux-debian-based.md) et [Debian : Apache, PHP, MariaDB](/cheatsheets/serveur/debian-web.md).
:::

## Étape 2 : Docker

La conteneurisation, pour installer des services sans « polluer » le serveur. Les TP suivent [le complément de cours DevOps (Docker + CI/CD)](/tp/devops/support-docker-cicd.md).

1. [Introduction à Docker](/tp/docker/introduction.md)
2. [Déployer Docker sur un serveur](/tp/docker/deployer-docker-sur-un-serveur.md)
3. [Créer des services très rapidement (et simplement)](/tp/docker/creer_server_local.md)
4. [Les Dockerfile's](/tp/docker/dockerfile.md)
5. [Le Docker Compose](/tp/docker/docker_compose.md)

::: tip Les supports associés
[Slides Docker](/cours/docker.md) et [installer Docker sur Debian](/cheatsheets/serveur/debian-docker.md).
:::

## Étape 3 : L'intégration et le déploiement continus

Automatiser les tests et les déploiements à chaque push.

1. [Utiliser Gitlab Pages](/tp/ci/pages.md)
2. [Déployer en continu](/tp/ci/ci-simple.md)
3. [Tester en continu](/tp/ci/ci-test/tests.md)
4. [Packager une application avec Docker](/tp/ci/packager-docker.md)

::: tip Les supports associés
[Slides CI/CD](/cours/cicd.md) et [slides Gitlab-CI](/cours/gitlabci.md).
:::

## Étape 4 : Aller plus loin

Une fois les bases acquises, plusieurs directions possibles selon vos projets :

- [Intégration continue avec Laravel](/tp/ops/deployer-laravel-ci.md)
- [Déploiement automatique avec Kamal](/tp/docker/kamal.md)
- [Déploiement avec Dokploy](/tp/devops/paas/dokploy.md)
- [Déployer une image Docker dans Kubernetes](/tp/ci/kubernetes/deploy-container-in-kubernetes.md)

::: tip Et ensuite ?
L'ensemble des procédures et des TP complémentaires se trouve dans la catégorie [Les serveurs / DevOps](/pages/categories/les-serveurs.md).
:::
