# VM Express : Alpine Linux & Docker

Un petit TP rapide pour créer une VM légère et rapide afin d'héberger un cluster Kubernetes.

::: details Sommaire
[[toc]]
:::

## Introduction

Créer rapidement une VM peut-être intéressant pour par exemple créer rapidement un petit cluster Kubernetes (dans le but de tester la simulation d'un serveur / ordinateur distant). L'idée de ce TP est donc de vous montrer comment vous pouvez grâce à Alpine Linux créer très très rapidement une VM à partir d'un fichier ISO de seulement… 133Mo ! Ici pas d'interface graphique ni de ressources inutiles nous allons créer une « micro vm » avec seulement les éléments nécessaires au bon fonctionnement de notre cluster à savoir « Docker & K3D ».

Alpine Linux est une distribution bien connue des gens créant des conteneurs avec Docker, en effet sa légèreté et sa très petite taille ont font souvent un choix idéal pour ne pas produire des containers inutilement trop gros / avec trop des binaires inutile.

[Pour en savoir plus sur Alpine Linux, rendez-vous sur le site officiel](https://alpinelinux.org/)

## L'ISO

Pour l'ISO le plus simple est de se rendre sur le site officiel dans la [partie Download](https://alpinelinux.org/downloads/)

![Choix](./res/alpine_choice.png)

Dans mon cas (et certainement dans le vôtre aussi), je choisis X86_64 ce qui signifie que je vais installer ma machine virtuelle pour :

- Un ordinateur avec un processeur X86 (Intel ou AMD) de type 64bits.

## L'installation

L'installation d'une Alpine Linux est légèrement différente d'une installation type Debian / Ubuntu ou autre distribution classique. L'ensemble de l'installation est faite en ligne de commande (un peu comme Archlinux ou Gentoo). Écrit comme ça, vous avez peut-être peur ? Mais ne vous inquiétez pas ça va être simple, j'ai même tendance à penser que ça sera plus simple, et plus rapide !

Accrochez-vous… On démarre !

<center>
<iframe src="https://giphy.com/embed/YHvwPgwojjsFa" width="480" height="313" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
</center>

### Premier boot

### Premier reboot

## Docker

## K3D
